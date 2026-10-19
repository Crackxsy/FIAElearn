"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/dal";
import { EXAM_PARTS, WRITTEN_PARTS, type ExamPartId } from "@/lib/domain/exam";
import { pointsToGrade } from "@/lib/domain/grading";
import type { UserAnswer } from "@/lib/domain/scoring";
import { persistAttempt, scoreQuestion } from "@/lib/services/progress";
import { shuffle } from "@/lib/services/questions";

export type SimEntry = { answer?: UserAnswer; score?: number | null; correct?: boolean; feedback?: string };
export type SimAnswers = Record<string, SimEntry>;

const GRACE_MS = 60_000;

const answerSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("choice"), selected: z.array(z.string().max(4)).max(8) }),
  z.object({ kind: z.literal("text"), value: z.string().max(4000) }),
  z.object({ kind: z.literal("self"), rating: z.enum(["full", "partial", "none"]), value: z.string().max(4000).optional() }),
]);

export async function startSimulationAction(partId: string, minutes?: number) {
  const user = await requireUser();
  const part = z.enum(WRITTEN_PARTS as [ExamPartId, ...ExamPartId[]]).parse(partId);
  const fullDuration = EXAM_PARTS[part].durationMin ?? 60;
  const duration = Math.min(fullDuration, Math.max(15, minutes ?? fullDuration));

  const pool = await db.question.findMany({ where: { topic: { examPartId: part } }, include: { topic: true } });
  // Zeitbudget ca. 85 %, je Thema höchstens 2 Aufgaben → breite Abdeckung wie in der echten Prüfung.
  const budget = duration * 0.85;
  const perTopic = new Map<string, number>();
  const picked: typeof pool = [];
  let used = 0;
  for (const q of shuffle(pool).sort((a, b) => b.topic.weight - a.topic.weight + (Math.random() - 0.5) * 3)) {
    if ((perTopic.get(q.topicId) ?? 0) >= 2) continue;
    if (used + q.estimatedMinutes > budget) continue;
    picked.push(q);
    used += q.estimatedMinutes;
    perTopic.set(q.topicId, (perTopic.get(q.topicId) ?? 0) + 1);
  }
  // Nach Thema gruppiert wie Handlungsschritte einer Prüfung
  picked.sort((a, b) => a.topic.order - b.topic.order);

  const sim = await db.examSimulation.create({
    data: {
      userId: user.id,
      examPartId: part,
      endsAt: new Date(Date.now() + duration * 60_000),
      questionIds: picked.map((q) => q.id),
      answers: {},
    },
  });
  redirect(`/simulation/${sim.id}`);
}

async function loadOwnSimulation(userId: string, simId: string) {
  const sim = await db.examSimulation.findFirst({ where: { id: z.string().max(40).parse(simId), userId } });
  if (!sim) throw new Error("Simulation nicht gefunden");
  return sim;
}

export async function saveSimAnswerAction(simId: string, questionId: string, answer: unknown) {
  const user = await requireUser();
  const sim = await loadOwnSimulation(user.id, simId);
  if (sim.finishedAt) return { ok: false, reason: "beendet" };
  if (Date.now() > sim.endsAt.getTime() + GRACE_MS) return { ok: false, reason: "zeit" };
  const ids = sim.questionIds as string[];
  if (!ids.includes(questionId)) return { ok: false, reason: "frage" };
  const answers = (sim.answers as SimAnswers | null) ?? {};
  answers[questionId] = { answer: answerSchema.parse(answer) };
  await db.examSimulation.update({ where: { id: sim.id }, data: { answers } });
  return { ok: true };
}

function computeResult(questions: { id: string; points: number }[], answers: SimAnswers) {
  let earned = 0;
  let max = 0;
  let pending = 0;
  for (const q of questions) {
    const entry = answers[q.id];
    if (entry?.score === null) {
      pending++;
      continue;
    }
    max += q.points;
    earned += (entry?.score ?? 0) * q.points;
  }
  const pct = max ? (earned / max) * 100 : 0;
  return { pct: Math.round(pct * 10) / 10, pending };
}

export async function finishSimulationAction(simId: string) {
  const user = await requireUser();
  const sim = await loadOwnSimulation(user.id, simId);
  if (sim.finishedAt) redirect(`/simulation/${sim.id}`);

  const ids = sim.questionIds as string[];
  const questions = await db.question.findMany({ where: { id: { in: ids } } });
  const answers = (sim.answers as SimAnswers | null) ?? {};

  for (const q of questions) {
    const entry = answers[q.id] ?? {};
    if (q.type === "open") {
      // Offene Aufgaben bewertet man anschließend selbst mit der Musterlösung.
      answers[q.id] = { ...entry, score: entry.answer ? null : 0, correct: false };
      continue;
    }
    if (!entry.answer) {
      answers[q.id] = { score: 0, correct: false, feedback: "nicht bearbeitet" };
      continue;
    }
    const fb = await scoreQuestion(q, entry.answer);
    answers[q.id] = { answer: entry.answer, score: fb.score, correct: fb.correct, feedback: fb.feedback };
    await persistAttempt({ userId: user.id, question: q, answer: entry.answer, context: "simulation", score: fb.score, correct: fb.correct });
  }

  const { pct, pending } = computeResult(questions, answers);
  await db.examSimulation.update({
    where: { id: sim.id },
    data: { answers, finishedAt: new Date(), scorePct: pct, grade: pending ? null : pointsToGrade(pct) },
  });
  revalidatePath("/simulation");
  redirect(`/simulation/${sim.id}`);
}

export async function gradeOpenSimAction(simId: string, questionId: string, rating: "full" | "partial" | "none") {
  const user = await requireUser();
  const sim = await loadOwnSimulation(user.id, simId);
  if (!sim.finishedAt) return;
  const r = z.enum(["full", "partial", "none"]).parse(rating);
  const answers = (sim.answers as SimAnswers | null) ?? {};
  const entry = answers[questionId];
  if (!entry || entry.score !== null) return;
  const score = r === "full" ? 1 : r === "partial" ? 0.5 : 0;
  answers[questionId] = { ...entry, score, correct: score === 1 };

  const question = await db.question.findUnique({ where: { id: questionId } });
  if (question && entry.answer) {
    await persistAttempt({ userId: user.id, question, answer: entry.answer, context: "simulation", score, correct: score === 1 });
  }
  const questions = await db.question.findMany({ where: { id: { in: sim.questionIds as string[] } }, select: { id: true, points: true } });
  const { pct, pending } = computeResult(questions, answers);
  await db.examSimulation.update({
    where: { id: sim.id },
    data: { answers, scorePct: pct, grade: pending ? null : pointsToGrade(pct) },
  });
  revalidatePath(`/simulation/${sim.id}`);
}
