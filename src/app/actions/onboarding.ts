"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/dal";
import { dayToDate, isValidDay } from "@/lib/domain/dates";
import { initialMastery } from "@/lib/domain/mastery";
import { evaluatePlacement } from "@/lib/domain/placement";
import type { ExamPartId } from "@/lib/domain/exam";
import { computePlan, regeneratePlan, type PlanSettings } from "@/lib/services/planning";

const day = z.string().refine(isValidDay, "Ungültiges Datum");

const settingsSchema = z.object({
  phase: z.enum(["AP1", "AP2"]),
  studyStart: day,
  examDate: day.nullable(),
  targetGrade: z.number().int().min(1).max(4),
  rescueMode: z.boolean(),
  rhythm: z.enum(["DAILY", "EVERY_2", "EVERY_3", "WEEKLY"]),
  minutesPerSession: z.number().int().min(10).max(240),
  weekdays: z.array(z.number().int().min(0).max(6)).max(7),
});

/** Live-Vorschau für Onboarding und Einstellungen (speichert nichts). */
export async function previewPlanAction(settings: PlanSettings, selfRatings?: Record<string, number>) {
  const user = await requireUser();
  const s = settingsSchema.parse(settings);
  const ratings = selfRatings ? z.record(z.string(), z.number().int().min(0).max(3)).parse(selfRatings) : undefined;
  const plan = await computePlan(user.id, s, ratings as Partial<Record<ExamPartId, number>> | undefined);
  const { sessions, ...summary } = plan;
  return {
    ...summary,
    preview: sessions.slice(0, 7),
    kinds: {
      learn: sessions.filter((x) => x.kind === "learn" || x.kind === "rescue").length,
      review: sessions.filter((x) => x.kind === "review").length,
      simulation: sessions.filter((x) => x.kind === "simulation").length,
    },
  };
}

const onboardingSchema = z.object({
  settings: settingsSchema,
  trainingStart: day.nullable(),
  ap1Date: day.nullable(),
  ap2Date: day.nullable(),
  selfRatings: z.record(z.string(), z.number().int().min(0).max(3)),
  takePlacement: z.boolean(),
});

export async function saveOnboardingAction(input: z.infer<typeof onboardingSchema>) {
  const user = await requireUser();
  const data = onboardingSchema.parse(input);
  const s = data.settings;

  const profileData = {
    phase: s.phase,
    trainingStart: data.trainingStart ? dayToDate(data.trainingStart) : null,
    studyStart: dayToDate(s.studyStart),
    ap1Date: data.ap1Date ? dayToDate(data.ap1Date) : null,
    ap2Date: data.ap2Date ? dayToDate(data.ap2Date) : null,
    targetGrade: s.targetGrade,
    rhythm: s.rhythm,
    minutesPerSession: s.minutesPerSession,
    weekdays: s.weekdays,
    rescueMode: s.rescueMode,
    onboardingDone: true,
  };
  await db.studyProfile.upsert({ where: { userId: user.id }, create: { userId: user.id, ...profileData }, update: profileData });

  // Selbsteinschätzung je Prüfungsbereich → Startwert für alle Themen dieses Bereichs.
  const topics = await db.topic.findMany({ select: { id: true, examPartId: true } });
  for (const t of topics) {
    const rating = data.selfRatings[t.examPartId];
    if (rating == null) continue;
    const mastery = initialMastery(rating, null, null);
    await db.topicMastery.upsert({
      where: { userId_topicId: { userId: user.id, topicId: t.id } },
      create: { userId: user.id, topicId: t.id, selfRating: rating, mastery },
      update: { selfRating: rating, mastery },
    });
  }

  await regeneratePlan(user.id);
  redirect(data.takePlacement ? "/einstufung" : "/dashboard?willkommen=1");
}

/** Wertet den Einstufungstest aus und setzt die Startwerte neu. */
export async function finishPlacementAction(questionIds: string[], startedAt: string) {
  const user = await requireUser();
  const ids = z.array(z.string().max(100)).max(60).parse(questionIds);
  const since = new Date(z.string().datetime().parse(startedAt));

  const attempts = await db.attempt.findMany({
    where: { userId: user.id, context: "placement", questionId: { in: ids }, createdAt: { gte: since } },
    include: { question: { include: { topic: { select: { examPartId: true } } } } },
    orderBy: { createdAt: "desc" },
  });
  const latest = new Map<string, (typeof attempts)[number]>();
  for (const a of attempts) if (!latest.has(a.questionId)) latest.set(a.questionId, a);
  // Unbeantwortete Fragen zählen als 0.
  const questions = await db.question.findMany({ where: { id: { in: ids } }, include: { topic: { select: { examPartId: true } } } });
  const result = evaluatePlacement(
    questions.map((q) => ({
      topicId: q.topicId,
      examPartId: q.topic.examPartId as ExamPartId,
      score: latest.get(q.id)?.score ?? 0,
    })),
  );

  const topics = await db.topic.findMany({ include: { masteries: { where: { userId: user.id } } } });
  for (const t of topics) {
    const partScore = result.perPart[t.examPartId as ExamPartId];
    if (partScore == null) continue;
    const m = t.masteries[0];
    const topicScore = result.perTopic[t.id] ?? null;
    const mastery = initialMastery(m?.selfRating ?? null, topicScore, partScore);
    await db.topicMastery.upsert({
      where: { userId_topicId: { userId: user.id, topicId: t.id } },
      create: { userId: user.id, topicId: t.id, mastery, placementScore: topicScore },
      update: { mastery, placementScore: topicScore },
    });
  }

  await db.studyProfile.update({
    where: { userId: user.id },
    data: { placementDone: true, placementScore: result.overall },
  });
  await regeneratePlan(user.id);
  revalidatePath("/dashboard");
  return result;
}

export async function setRescueModeAction(enabled: boolean) {
  const user = await requireUser();
  await db.studyProfile.update({ where: { userId: user.id }, data: { rescueMode: z.boolean().parse(enabled) } });
  await regeneratePlan(user.id);
  revalidatePath("/", "layout");
}

const profileSchema = z.object({
  settings: settingsSchema,
  trainingStart: day.nullable(),
  ap1Date: day.nullable(),
  ap2Date: day.nullable(),
  name: z.string().trim().min(2).max(60),
});

export async function updateProfileAction(input: z.infer<typeof profileSchema>) {
  const user = await requireUser();
  const data = profileSchema.parse(input);
  const s = data.settings;
  await db.$transaction([
    db.user.update({ where: { id: user.id }, data: { name: data.name } }),
    db.studyProfile.update({
      where: { userId: user.id },
      data: {
        phase: s.phase,
        trainingStart: data.trainingStart ? dayToDate(data.trainingStart) : null,
        studyStart: dayToDate(s.studyStart),
        ap1Date: data.ap1Date ? dayToDate(data.ap1Date) : null,
        ap2Date: data.ap2Date ? dayToDate(data.ap2Date) : null,
        targetGrade: s.targetGrade,
        rhythm: s.rhythm,
        minutesPerSession: s.minutesPerSession,
        weekdays: s.weekdays,
        rescueMode: s.rescueMode,
      },
    }),
  ]);
  await regeneratePlan(user.id);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function regeneratePlanAction() {
  const user = await requireUser();
  await regeneratePlan(user.id);
  revalidatePath("/plan");
  revalidatePath("/dashboard");
}
