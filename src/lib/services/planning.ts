import "server-only";
import { db } from "@/lib/db";
import type { StudyProfile } from "@/generated/prisma/client";
import { dayToDate, diffDays, toDay, today, type Day } from "@/lib/domain/dates";
import { decayedMastery, initialMastery } from "@/lib/domain/mastery";
import { buildPlan, type PlannerTopic, type Rhythm } from "@/lib/domain/planner";
import type { ExamPartId, Phase } from "@/lib/domain/exam";

export function examDateFor(profile: Pick<StudyProfile, "phase" | "ap1Date" | "ap2Date">): Day | null {
  const d = profile.phase === "AP1" ? profile.ap1Date : profile.ap2Date;
  return d ? toDay(d) : null;
}

export async function loadPlannerTopics(userId: string): Promise<PlannerTopic[]> {
  const [topics, masteries] = await Promise.all([
    db.topic.findMany({ orderBy: { order: "asc" } }),
    db.topicMastery.findMany({ where: { userId } }),
  ]);
  const byTopic = new Map(masteries.map((m) => [m.topicId, m]));
  const now = today();
  return topics.map((t) => {
    const m = byTopic.get(t.id);
    const days = m?.lastPracticed ? diffDays(toDay(m.lastPracticed), now) : null;
    return {
      id: t.id,
      examPartId: t.examPartId as ExamPartId,
      title: t.title,
      weight: t.weight,
      baseHours: t.baseHours,
      mustKnow: t.mustKnow,
      mastery: decayedMastery(m?.mastery ?? 0, days),
      order: t.order,
    };
  });
}

export type PlanSettings = {
  phase: Phase;
  studyStart: Day;
  examDate: Day | null;
  targetGrade: number;
  rescueMode: boolean;
  rhythm: Rhythm;
  minutesPerSession: number;
  weekdays: number[];
};

export function settingsFromProfile(profile: StudyProfile): PlanSettings {
  return {
    phase: profile.phase as Phase,
    studyStart: toDay(profile.studyStart),
    examDate: examDateFor(profile),
    targetGrade: profile.targetGrade,
    rescueMode: profile.rescueMode,
    rhythm: profile.rhythm as Rhythm,
    minutesPerSession: profile.minutesPerSession,
    weekdays: (profile.weekdays as number[] | null) ?? [],
  };
}

/** selfRatings (je Prüfungsbereich) überschreibt den Startwert – für die Vorschau im Onboarding. */
export async function computePlan(userId: string, settings: PlanSettings, selfRatings?: Partial<Record<ExamPartId, number>>) {
  let topics = await loadPlannerTopics(userId);
  if (selfRatings) {
    topics = topics.map((t) => {
      const r = selfRatings[t.examPartId];
      return r == null ? t : { ...t, mastery: Math.max(t.mastery, initialMastery(r, null, null)) };
    });
  }
  return buildPlan({ ...settings, today: today(), topics });
}

/** Ersetzt alle offenen Sessions ab heute durch einen neu berechneten Plan. */
export async function regeneratePlan(userId: string) {
  const profile = await db.studyProfile.findUnique({ where: { userId } });
  if (!profile) return null;
  const plan = await computePlan(userId, settingsFromProfile(profile));
  const todayDate = dayToDate(today());

  // Bereits erledigte Sessions von heute bleiben; dann wird ab morgen neu geplant.
  const doneToday = await db.studySession.count({ where: { userId, date: todayDate, status: "done" } });
  const sessions = plan.sessions.filter((s) => !(doneToday > 0 && s.day === today()));

  await db.$transaction([
    db.studySession.deleteMany({ where: { userId, status: "planned", date: { gte: todayDate } } }),
    db.studySession.createMany({
      data: sessions.map((s) => ({
        userId,
        date: dayToDate(s.day),
        minutes: s.minutes,
        kind: s.kind,
        examPartId: s.examPartId,
        topicIds: s.topicIds,
        title: s.title,
      })),
    }),
  ]);
  return plan;
}

/**
 * Verpasste Sessions werden als „übersprungen“ markiert und der Rest des Plans
 * neu verteilt – so rutscht nichts Wichtiges hinten runter.
 */
export async function syncPlan(userId: string) {
  const todayDate = dayToDate(today());
  const missed = await db.studySession.updateMany({
    where: { userId, status: "planned", date: { lt: todayDate } },
    data: { status: "skipped" },
  });
  if (missed.count > 0) await regeneratePlan(userId);
  return missed.count;
}
