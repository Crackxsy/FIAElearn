import "server-only";
import { db } from "@/lib/db";
import { addDays, dayToDate, today } from "@/lib/domain/dates";
import { partsForPhase, type ExamPartId, type Phase } from "@/lib/domain/exam";
import { shuffle, toClientQuestion, type ClientQuestion } from "./questions";

export type QuizMode = "topic" | "part" | "weak" | "mixed" | "review" | "session";

/** Ende des heutigen Tages – alles, was bis dahin fällig ist. */
export const dueBoundary = () => dayToDate(addDays(today(), 1));

/**
 * Wählt Fragen: bevorzugt noch nie oder zuletzt falsch beantwortete Aufgaben,
 * damit Wiederholung dort ansetzt, wo es hakt.
 */
export async function selectQuestions(args: {
  userId: string;
  phase: Phase;
  mode: QuizMode;
  topicIds?: string[];
  partId?: ExamPartId;
  count: number;
}): Promise<ClientQuestion[]> {
  const { userId, phase, mode, count } = args;
  let topicFilter: string[] | undefined = args.topicIds;

  if (mode === "review") {
    const due = await db.reviewItem.findMany({
      where: { userId, itemType: "question", dueAt: { lt: dueBoundary() } },
      orderBy: [{ box: "asc" }, { dueAt: "asc" }],
      take: count,
    });
    const questions = await db.question.findMany({
      where: { id: { in: due.map((d) => d.itemId) } },
      include: { topic: { select: { title: true } } },
    });
    return shuffle(questions).map((q) => toClientQuestion(q, q.topic.title));
  }

  if (mode === "weak") {
    const topics = await db.topic.findMany({
      where: { examPartId: { in: partsForPhase(phase) } },
      include: { masteries: { where: { userId } } },
    });
    topicFilter = topics
      .map((t) => ({ id: t.id, score: (t.masteries[0]?.mastery ?? 0) - t.weight * 0.03 }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 5)
      .map((t) => t.id);
  }

  const where =
    topicFilter && topicFilter.length
      ? { topicId: { in: topicFilter } }
      : args.partId
        ? { topic: { examPartId: args.partId } }
        : { topic: { examPartId: { in: partsForPhase(phase) } } };

  const questions = await db.question.findMany({ where, include: { topic: { select: { title: true } } } });
  const attempts = await db.attempt.findMany({
    where: { userId, questionId: { in: questions.map((q) => q.id) } },
    orderBy: { createdAt: "desc" },
    select: { questionId: true, correct: true },
  });
  const last = new Map<string, boolean>();
  for (const a of attempts) if (!last.has(a.questionId)) last.set(a.questionId, a.correct);

  // Priorität: zuletzt falsch (0) → nie beantwortet (1) → zuletzt richtig (2), innerhalb zufällig.
  const ranked = shuffle(questions).sort((a, b) => rank(last.get(a.id)) - rank(last.get(b.id)));
  const picked = ranked.slice(0, count);
  return shuffle(picked).map((q) => toClientQuestion(q, q.topic.title));
}

function rank(lastCorrect: boolean | undefined) {
  if (lastCorrect === false) return 0;
  if (lastCorrect === undefined) return 1;
  return 2;
}

export async function dueCounts(userId: string) {
  const boundary = dueBoundary();
  const [questions, cards] = await Promise.all([
    db.reviewItem.count({ where: { userId, itemType: "question", dueAt: { lt: boundary } } }),
    db.reviewItem.count({ where: { userId, itemType: "flashcard", dueAt: { lt: boundary } } }),
  ]);
  return { questions, cards, total: questions + cards };
}
