// Inhaltsformat für Seed-Daten. Alle Aufgaben sind eigene Übungsaufgaben –
// keine Original-IHK-Prüfungsaufgaben (siehe resources.txt, Regeln 04/05).
import type { ExamPartId } from "@/lib/domain/exam";
import type { AnswerKey, QuestionType } from "@/lib/domain/scoring";

export type QuestionSeed = {
  type: QuestionType;
  difficulty: number;
  prompt: string;
  scenario?: string;
  code?: string;
  codeLang?: string;
  options?: { id: string; text: string }[];
  answer: AnswerKey;
  explanation: string;
  steps?: string[];
  mistakes?: string[];
  minutes?: number;
  points?: number;
  sources?: string[];
  placement?: boolean;
};

export type CardSeed = { front: string; back: string; mustKnow?: boolean };

export type TopicSeed = {
  id: string;
  part: ExamPartId;
  lf?: string;
  title: string;
  summary: string;
  weight: number;
  hours: number;
  difficulty: number;
  mustKnow?: boolean;
  lesson: { content: string; keyPoints: string[]; sources: string[] };
  questions: QuestionSeed[];
  cards: CardSeed[];
};

type Extra = Partial<Omit<QuestionSeed, "type" | "prompt" | "answer" | "explanation" | "options">>;

const LETTERS = "abcdefgh";
const opts = (texts: string[]) => texts.map((text, i) => ({ id: LETTERS[i], text }));

export const q = {
  single: (prompt: string, options: string[], correct: number, explanation: string, extra: Extra = {}): QuestionSeed => ({
    type: "single",
    difficulty: 2,
    prompt,
    options: opts(options),
    answer: { correct: [LETTERS[correct]] },
    explanation,
    ...extra,
  }),
  multi: (prompt: string, options: string[], correct: number[], explanation: string, extra: Extra = {}): QuestionSeed => ({
    type: "multiple",
    difficulty: 2,
    prompt,
    options: opts(options),
    answer: { correct: correct.map((i) => LETTERS[i]) },
    explanation,
    ...extra,
  }),
  short: (prompt: string, accepted: string[], explanation: string, extra: Extra = {}): QuestionSeed => ({
    type: "short",
    difficulty: 2,
    prompt,
    answer: { accepted },
    explanation,
    ...extra,
  }),
  calc: (
    prompt: string,
    value: number,
    explanation: string,
    extra: Extra & { unit?: string; tolerance?: number } = {},
  ): QuestionSeed => {
    const { unit, tolerance, ...rest } = extra;
    return {
      type: "calculation",
      difficulty: 3,
      prompt,
      answer: { value, unit, tolerance },
      explanation,
      minutes: 3,
      ...rest,
    };
  },
  trace: (prompt: string, code: string, accepted: string[], explanation: string, extra: Extra = {}): QuestionSeed => ({
    type: "code_tracing",
    difficulty: 3,
    prompt,
    code,
    codeLang: "pseudocode",
    answer: { accepted },
    explanation,
    minutes: 3,
    ...extra,
  }),
  sql: (
    prompt: string,
    dataset: string,
    solution: string,
    explanation: string,
    extra: Extra & { check?: string; ordered?: boolean } = {},
  ): QuestionSeed => {
    const { check, ordered, ...rest } = extra;
    return {
      type: "sql",
      difficulty: 3,
      prompt,
      answer: { dataset, solution, check, ordered: ordered ?? /order\s+by/i.test(solution) },
      explanation,
      minutes: 4,
      ...rest,
    };
  },
  open: (prompt: string, model: string, explanation = "", extra: Extra = {}): QuestionSeed => ({
    type: "open",
    difficulty: 3,
    prompt,
    answer: { model },
    explanation,
    minutes: 4,
    ...extra,
  }),
};

export const card = (front: string, back: string, mustKnow = false): CardSeed => ({ front, back, mustKnow });
