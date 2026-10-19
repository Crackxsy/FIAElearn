// Spielt Taxonomie, Quellen und Lerninhalte in die Datenbank ein (idempotent).
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { EXAM_PARTS } from "../src/lib/domain/exam";
import { EXAM_PART_SEEDS, LEARNING_FIELDS } from "../src/content/taxonomy";
import { SOURCES } from "../src/content/sources";
import { ALL_TOPICS, cardId, questionId } from "../src/content";

const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const db = new PrismaClient({
  adapter: url.startsWith("postgres") ? new PrismaPg({ connectionString: url }) : new PrismaBetterSqlite3({ url }),
});

async function main() {
  for (const p of EXAM_PART_SEEDS) {
    const meta = EXAM_PARTS[p.id];
    const data = {
      name: meta.name,
      short: meta.short,
      durationMin: meta.durationMin,
      weightPercent: meta.weight,
      paragraph: p.paragraph,
      description: p.description,
      order: p.order,
    };
    await db.examPart.upsert({ where: { id: p.id }, create: { id: p.id, ...data }, update: data });
  }

  for (const lf of LEARNING_FIELDS) {
    await db.learningField.upsert({ where: { id: lf.id }, create: lf, update: lf });
  }

  for (const s of SOURCES) {
    const data = { ...s, owner: s.owner ?? null };
    await db.source.upsert({ where: { id: s.id }, create: data, update: data });
  }

  const topicIds = new Set<string>();
  const questionIds = new Set<string>();
  const cardIds = new Set<string>();

  for (const [order, t] of ALL_TOPICS.entries()) {
    topicIds.add(t.id);
    const topicData = {
      examPartId: t.part,
      learningFieldId: t.lf ?? null,
      title: t.title,
      summary: t.summary,
      weight: t.weight,
      baseHours: t.hours,
      difficulty: t.difficulty,
      mustKnow: t.mustKnow ?? false,
      order,
    };
    await db.topic.upsert({ where: { id: t.id }, create: { id: t.id, ...topicData }, update: topicData });

    const lesson = { content: t.lesson.content, keyPoints: t.lesson.keyPoints, sourceIds: t.lesson.sources };
    await db.lesson.upsert({ where: { topicId: t.id }, create: { topicId: t.id, ...lesson }, update: lesson });

    for (const [i, qs] of t.questions.entries()) {
      const id = questionId(t.id, i);
      questionIds.add(id);
      const data = {
        topicId: t.id,
        type: qs.type,
        difficulty: qs.difficulty,
        scenario: qs.scenario ?? null,
        prompt: qs.prompt,
        code: qs.code ?? null,
        codeLang: qs.code ? (qs.codeLang ?? "pseudocode") : null,
        options: qs.options ?? undefined,
        answer: qs.answer,
        explanation: qs.explanation,
        solutionSteps: qs.steps ?? undefined,
        commonMistakes: qs.mistakes ?? undefined,
        estimatedMinutes: qs.minutes ?? (qs.type === "single" || qs.type === "multiple" ? 1.5 : 3),
        points: qs.points ?? (qs.type === "open" || qs.type === "sql" ? 3 : qs.type === "calculation" || qs.type === "code_tracing" ? 2 : 1),
        sourceIds: qs.sources ?? t.lesson.sources,
        placement: qs.placement ?? false,
      };
      await db.question.upsert({ where: { id }, create: { id, ...data }, update: data });
    }

    for (const [i, c] of t.cards.entries()) {
      const id = cardId(t.id, i);
      cardIds.add(id);
      const data = { topicId: t.id, front: c.front, back: c.back, mustKnow: c.mustKnow ?? false };
      await db.flashcard.upsert({ where: { id }, create: { id, ...data }, update: data });
    }
  }

  // Entfernte Inhalte aufräumen (Fortschritt hängt per Cascade daran)
  await db.question.deleteMany({ where: { id: { notIn: [...questionIds] } } });
  await db.flashcard.deleteMany({ where: { id: { notIn: [...cardIds] } } });
  await db.topic.deleteMany({ where: { id: { notIn: [...topicIds] } } });

  console.log(`Seed fertig: ${topicIds.size} Themen, ${questionIds.size} Fragen, ${cardIds.size} Karten, ${SOURCES.length} Quellen.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
