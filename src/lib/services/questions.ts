import "server-only";
import type { Question } from "@/generated/prisma/client";
import { SQL_DATASETS } from "@/content/sql-datasets";
import type { QuestionType } from "@/lib/domain/scoring";

/** Frage ohne Lösung – das wird an den Browser geschickt. */
export type ClientQuestion = {
  id: string;
  topicId: string;
  topicTitle?: string;
  type: QuestionType;
  difficulty: number;
  scenario: string | null;
  prompt: string;
  code: string | null;
  codeLang: string | null;
  options: { id: string; text: string }[] | null;
  unit?: string;
  dataset?: { id: string; title: string; description: string };
  points: number;
};

export function toClientQuestion(q: Question, topicTitle?: string): ClientQuestion {
  const answer = q.answer as Record<string, unknown>;
  const datasetId = q.type === "sql" ? (answer.dataset as string) : null;
  const dataset = datasetId ? SQL_DATASETS[datasetId] : null;
  return {
    id: q.id,
    topicId: q.topicId,
    topicTitle,
    type: q.type as QuestionType,
    difficulty: q.difficulty,
    scenario: q.scenario,
    prompt: q.prompt,
    code: q.code,
    codeLang: q.codeLang,
    options: (q.options as { id: string; text: string }[] | null) ?? null,
    unit: q.type === "calculation" ? ((answer.unit as string | undefined) ?? undefined) : undefined,
    dataset: dataset ? { id: dataset.id, title: dataset.title, description: dataset.description } : undefined,
    points: q.points,
  };
}

export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Lesbare Musterlösung (für Auswertungen). */
export function solutionText(q: Question): string {
  const a = q.answer as Record<string, unknown>;
  switch (q.type) {
    case "single":
    case "multiple": {
      const options = (q.options as { id: string; text: string }[] | null) ?? [];
      const correct = (a.correct as string[]) ?? [];
      return options.filter((o) => correct.includes(o.id)).map((o) => o.text).join(" · ");
    }
    case "calculation": {
      const v = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 4 }).format(a.value as number);
      return a.unit ? `${v} ${a.unit}` : v;
    }
    case "sql":
      return a.solution as string;
    case "open":
      return a.model as string;
    default:
      return ((a.accepted as string[]) ?? [])[0] ?? "";
  }
}
