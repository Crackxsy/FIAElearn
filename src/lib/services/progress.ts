import "server-only";
import { db } from "@/lib/db";
import type { Question } from "@/generated/prisma/client";
import { today } from "@/lib/domain/dates";
import { updateMastery } from "@/lib/domain/mastery";
import { nextReview } from "@/lib/domain/srs";
import { dayToDate } from "@/lib/domain/dates";
import {
  compareResultSets,
  scoreChoice,
  scoreNumber,
  scoreSelf,
  scoreText,
  type ChoiceAnswer,
  type NumberAnswer,
  type OpenAnswer,
  type ResultSet,
  type ScoreResult,
  type SqlAnswer,
  type TextAnswer,
  type UserAnswer,
} from "@/lib/domain/scoring";
import { runSql, validateUserSql } from "@/lib/sql-sandbox";

export type AttemptContext = "placement" | "quiz" | "review" | "simulation" | "rescue" | "session";

export type Feedback = ScoreResult & {
  explanation: string;
  solution: string;
  correctOptionIds?: string[];
  steps?: string[];
  mistakes?: string[];
  sql?: { expected: ResultSet | null; actual: ResultSet | null; error?: string };
};

/** Bewertet eine Antwort, ohne etwas zu speichern. */
export async function scoreQuestion(question: Question, answer: UserAnswer): Promise<Feedback> {
  const base = {
    explanation: question.explanation,
    steps: (question.solutionSteps as string[] | null) ?? undefined,
    mistakes: (question.commonMistakes as string[] | null) ?? undefined,
  };

  switch (question.type) {
    case "single":
    case "multiple": {
      const key = question.answer as ChoiceAnswer;
      const selected = answer.kind === "choice" ? answer.selected : [];
      const options = (question.options as { id: string; text: string }[]) ?? [];
      const result = scoreChoice(key, selected, question.type === "multiple");
      return {
        ...result,
        ...base,
        correctOptionIds: key.correct,
        solution: options.filter((o) => key.correct.includes(o.id)).map((o) => o.text).join(" · "),
      };
    }
    case "short":
    case "code_tracing": {
      const key = question.answer as TextAnswer;
      const result = scoreText(key, answer.kind === "text" ? answer.value : "");
      return { ...result, ...base, solution: key.accepted[0] };
    }
    case "calculation": {
      const key = question.answer as NumberAnswer;
      const result = scoreNumber(key, answer.kind === "text" ? answer.value : "");
      const formatted = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 4 }).format(key.value);
      return { ...result, ...base, solution: key.unit ? `${formatted} ${key.unit}` : formatted };
    }
    case "sql": {
      const key = question.answer as SqlAnswer;
      const input = answer.kind === "text" ? answer.value : "";
      const invalid = validateUserSql(input);
      const expectedRun = await runSql(key.dataset, key.check ? [key.solution, key.check] : [key.solution]);
      const expected = expectedRun.ok ? expectedRun.result : null;
      if (invalid) {
        return { score: 0, correct: false, feedback: invalid, ...base, solution: key.solution, sql: { expected, actual: null, error: invalid } };
      }
      const actualRun = await runSql(key.dataset, key.check ? [input, key.check] : [input]);
      if (!actualRun.ok) {
        return {
          score: 0,
          correct: false,
          feedback: actualRun.error,
          ...base,
          solution: key.solution,
          sql: { expected, actual: null, error: actualRun.error },
        };
      }
      const result = expected
        ? compareResultSets(expected, actualRun.result, key.ordered ?? false)
        : { score: 0, correct: false, feedback: "Musterlösung konnte nicht ausgeführt werden." };
      return { ...result, ...base, solution: key.solution, sql: { expected, actual: actualRun.result } };
    }
    case "open": {
      const key = question.answer as OpenAnswer;
      const rating = answer.kind === "self" ? answer.rating : "none";
      return { ...scoreSelf(rating), ...base, solution: key.model };
    }
    default:
      return { score: 0, correct: false, ...base, solution: "" };
  }
}

/** Speichert eine Antwort und aktualisiert Wissensstand, Wiederholung und Tagesaktivität. */
export async function recordAnswer(args: {
  userId: string;
  questionId: string;
  answer: UserAnswer;
  context: AttemptContext;
  durationMs?: number;
}): Promise<Feedback | null> {
  const question = await db.question.findUnique({ where: { id: args.questionId } });
  if (!question) return null;
  const feedback = await scoreQuestion(question, args.answer);
  await persistAttempt({ ...args, question, score: feedback.score, correct: feedback.correct });
  return feedback;
}

export async function persistAttempt(args: {
  userId: string;
  question: Question;
  answer: UserAnswer;
  context: AttemptContext;
  durationMs?: number;
  score: number;
  correct: boolean;
}) {
  const { userId, question, score, correct, context } = args;
  const day = today();
  const durationMs = args.durationMs != null ? Math.max(0, Math.min(args.durationMs, 15 * 60_000)) : null;

  await db.$transaction(async (tx) => {
    await tx.attempt.create({
      data: {
        userId,
        questionId: question.id,
        topicId: question.topicId,
        correct,
        score,
        answer: args.answer,
        durationMs,
        context,
      },
    });

    if (context !== "placement") {
      const current = await tx.topicMastery.findUnique({
        where: { userId_topicId: { userId, topicId: question.topicId } },
      });
      const mastery = updateMastery(current?.mastery ?? 0, score, current?.attempts ?? 0);
      await tx.topicMastery.upsert({
        where: { userId_topicId: { userId, topicId: question.topicId } },
        create: { userId, topicId: question.topicId, mastery, attempts: 1, correct: correct ? 1 : 0, lastPracticed: new Date() },
        update: { mastery, attempts: { increment: 1 }, correct: { increment: correct ? 1 : 0 }, lastPracticed: new Date() },
      });
    }

    const existing = await tx.reviewItem.findUnique({
      where: { userId_itemType_itemId: { userId, itemType: "question", itemId: question.id } },
    });
    // Richtige Antworten beim ersten Kontakt kommen erst später wieder; Fehler sofort ins System.
    const next = nextReview(existing?.box ?? null, score, day);
    await tx.reviewItem.upsert({
      where: { userId_itemType_itemId: { userId, itemType: "question", itemId: question.id } },
      create: { userId, itemType: "question", itemId: question.id, topicId: question.topicId, box: next.box, dueAt: dayToDate(next.due), lastResult: correct },
      update: { box: next.box, dueAt: dayToDate(next.due), lastResult: correct },
    });

    const minutes = durationMs ? Math.round((durationMs / 60_000) * 100) / 100 : 1;
    await tx.dailyActivity.upsert({
      where: { userId_day: { userId, day } },
      create: { userId, day, minutes, questions: 1, correct: correct ? 1 : 0 },
      update: { minutes: { increment: minutes }, questions: { increment: 1 }, correct: { increment: correct ? 1 : 0 } },
    });
  });
}

/** Karteikarte bewerten (Leitner + leichter Einfluss auf den Wissensstand). */
export async function recordCard(userId: string, cardId: string, score: number) {
  const card = await db.flashcard.findUnique({ where: { id: cardId } });
  if (!card) return null;
  const day = today();
  return db.$transaction(async (tx) => {
    const existing = await tx.reviewItem.findUnique({
      where: { userId_itemType_itemId: { userId, itemType: "flashcard", itemId: cardId } },
    });
    const next = nextReview(existing?.box ?? null, score, day);
    await tx.reviewItem.upsert({
      where: { userId_itemType_itemId: { userId, itemType: "flashcard", itemId: cardId } },
      create: { userId, itemType: "flashcard", itemId: cardId, topicId: card.topicId, box: next.box, dueAt: dayToDate(next.due), lastResult: score >= 1 },
      update: { box: next.box, dueAt: dayToDate(next.due), lastResult: score >= 1 },
    });
    const current = await tx.topicMastery.findUnique({ where: { userId_topicId: { userId, topicId: card.topicId } } });
    const m = current?.mastery ?? 0;
    // Karten zählen nur halb so stark wie Aufgaben.
    const mastery = Math.round((m + (updateMastery(m, score, current?.attempts ?? 0) - m) * 0.5) * 1000) / 1000;
    await tx.topicMastery.upsert({
      where: { userId_topicId: { userId, topicId: card.topicId } },
      create: { userId, topicId: card.topicId, mastery, lastPracticed: new Date() },
      update: { mastery, lastPracticed: new Date() },
    });
    await tx.dailyActivity.upsert({
      where: { userId_day: { userId, day } },
      create: { userId, day, minutes: 0 },
      update: {},
    });
    return next;
  });
}

/** Lernzeit gutschreiben (z. B. Lektion gelesen, Session abgeschlossen). */
export async function addStudyMinutes(userId: string, minutes: number) {
  const day = today();
  const m = Math.max(0, Math.min(240, Math.round(minutes)));
  await db.dailyActivity.upsert({
    where: { userId_day: { userId, day } },
    create: { userId, day, minutes: m },
    update: { minutes: { increment: m } },
  });
}
