import "server-only";
import { db } from "@/lib/db";
import { addDays, dayToDate, diffDays, today, toDay } from "@/lib/domain/dates";
import { forecastAll } from "@/lib/domain/forecast";
import { partsForPhase, type ExamPartId, type Phase } from "@/lib/domain/exam";

export async function getStreak(userId: string) {
  const days = await db.dailyActivity.findMany({
    where: { userId, OR: [{ questions: { gt: 0 } }, { minutes: { gt: 0 } }] },
    orderBy: { day: "desc" },
    select: { day: true },
    take: 400,
  });
  const set = new Set(days.map((d) => d.day));
  let cursor = today();
  if (!set.has(cursor)) cursor = addDays(cursor, -1);
  let streak = 0;
  while (set.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return { streak, activeToday: set.has(today()) };
}

export async function getForecast(userId: string, phase: Phase) {
  const topics = await db.topic.findMany({ include: { masteries: { where: { userId } } } });
  const input = topics.map((t) => ({
    examPartId: t.examPartId as ExamPartId,
    weight: t.weight,
    mastery: t.masteries[0]?.mastery ?? 0,
    attempts: t.masteries[0]?.attempts ?? 0,
  }));
  return forecastAll(input, phase);
}

export async function getPartProgress(userId: string, phase: Phase) {
  const parts = partsForPhase(phase);
  const topics = await db.topic.findMany({
    where: { examPartId: { in: parts } },
    include: { masteries: { where: { userId } } },
  });
  return parts.map((p) => {
    const list = topics.filter((t) => t.examPartId === p);
    const avg = list.length ? list.reduce((s, t) => s + (t.masteries[0]?.mastery ?? 0), 0) / list.length : 0;
    return { examPartId: p, mastery: avg, topics: list.length };
  });
}

export async function getTodaySessions(userId: string) {
  const d = dayToDate(today());
  return db.studySession.findMany({ where: { userId, date: d }, orderBy: { kind: "asc" } });
}

export async function getUpcomingSessions(userId: string, limit = 5) {
  return db.studySession.findMany({
    where: { userId, status: "planned", date: { gt: dayToDate(today()) } },
    orderBy: { date: "asc" },
    take: limit,
  });
}

export async function getActivity(userId: string, days = 30) {
  const from = addDays(today(), -(days - 1));
  const rows = await db.dailyActivity.findMany({ where: { userId, day: { gte: from } } });
  const map = new Map(rows.map((r) => [r.day, r]));
  return Array.from({ length: days }, (_, i) => {
    const day = addDays(from, i);
    const r = map.get(day);
    return { day, minutes: Math.round(r?.minutes ?? 0), questions: r?.questions ?? 0, correct: r?.correct ?? 0 };
  });
}

export async function getSessionStats(userId: string) {
  const sessions = await db.studySession.findMany({
    where: { userId, date: { lt: dayToDate(addDays(today(), 1)) } },
    select: { status: true },
  });
  const done = sessions.filter((s) => s.status === "done").length;
  const skipped = sessions.filter((s) => s.status === "skipped").length;
  return { done, skipped, rate: done + skipped ? done / (done + skipped) : null };
}

export function daysUntil(date: Date | null) {
  return date ? diffDays(today(), toDay(date)) : null;
}
