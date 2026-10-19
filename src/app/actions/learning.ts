"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/dal";
import { addStudyMinutes, recordAnswer, recordCard, type AttemptContext } from "@/lib/services/progress";
import { runSql, validateUserSql } from "@/lib/sql-sandbox";
import { CARD_RATINGS } from "@/lib/domain/srs";

const answerSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("choice"), selected: z.array(z.string().max(4)).max(8) }),
  z.object({ kind: z.literal("text"), value: z.string().max(4000) }),
  z.object({ kind: z.literal("self"), rating: z.enum(["full", "partial", "none"]), value: z.string().max(4000).optional() }),
]);

const contexts = ["placement", "quiz", "review", "rescue", "session"] as const;

export async function submitAnswerAction(input: {
  questionId: string;
  answer: unknown;
  context: AttemptContext;
  durationMs?: number;
}) {
  const user = await requireUser();
  const answer = answerSchema.parse(input.answer);
  const context = z.enum(contexts).parse(input.context);
  const feedback = await recordAnswer({
    userId: user.id,
    questionId: z.string().max(100).parse(input.questionId),
    answer,
    context,
    durationMs: z.number().int().nonnegative().optional().parse(input.durationMs),
  });
  if (!feedback) throw new Error("Frage nicht gefunden");
  return feedback;
}

export async function runSqlAction(datasetId: string, sql: string) {
  await requireUser();
  const invalid = validateUserSql(sql);
  if (invalid) return { ok: false as const, error: invalid };
  return runSql(z.string().max(40).parse(datasetId), [sql]);
}

export async function rateCardAction(cardId: string, rating: keyof typeof CARD_RATINGS) {
  const user = await requireUser();
  const score = CARD_RATINGS[z.enum(["again", "hard", "good"]).parse(rating)];
  const next = await recordCard(user.id, z.string().max(100).parse(cardId), score);
  return next;
}

export async function addMinutesAction(minutes: number) {
  const user = await requireUser();
  await addStudyMinutes(user.id, z.number().min(0).max(240).parse(minutes));
}

export async function setSessionStatusAction(sessionId: string, status: "done" | "skipped" | "planned") {
  const user = await requireUser();
  const s = z.enum(["done", "skipped", "planned"]).parse(status);
  const session = await db.studySession.findFirst({ where: { id: z.string().parse(sessionId), userId: user.id } });
  if (!session) return;
  await db.studySession.update({
    where: { id: session.id },
    data: { status: s, completedAt: s === "done" ? new Date() : null },
  });
  if (s === "done" && session.status !== "done") await addStudyMinutes(user.id, Math.round(session.minutes * 0.25));
  revalidatePath("/dashboard");
  revalidatePath("/plan");
}

/** Musterlösung einer Freitext-Aufgabe (nur für den Typ „open“). */
export async function revealModelAction(questionId: string) {
  await requireUser();
  const q = await db.question.findUnique({ where: { id: z.string().max(100).parse(questionId) } });
  if (!q || q.type !== "open") return null;
  return { model: (q.answer as { model: string }).model, explanation: q.explanation };
}
