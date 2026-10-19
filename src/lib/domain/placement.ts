// Einstufungstest: Fragenauswahl und Auswertung.
import { partsForPhase, type ExamPartId, type Phase } from "./exam";

export type PlacementCandidate = {
  id: string;
  topicId: string;
  examPartId: ExamPartId;
  difficulty: number;
  topicWeight: number;
};

/**
 * Wählt bis zu `limit` Fragen: möglichst ein Thema pro Frage, wichtige Themen zuerst,
 * gemischte Schwierigkeit, gleichmäßig über die Prüfungsbereiche verteilt.
 */
export function selectPlacementQuestions(
  candidates: PlacementCandidate[],
  phase: Phase,
  limit = 24,
  random: () => number = Math.random,
): string[] {
  const parts = partsForPhase(phase);
  const pool = candidates.filter((c) => parts.includes(c.examPartId));
  const byPart = new Map<ExamPartId, PlacementCandidate[]>();
  for (const p of parts) {
    const list = pool
      .filter((c) => c.examPartId === p)
      .map((c) => ({ c, r: random() }))
      .sort((a, b) => b.c.topicWeight - a.c.topicWeight || a.r - b.r)
      .map((x) => x.c);
    // pro Thema zunächst nur eine Frage
    const seen = new Set<string>();
    const first: PlacementCandidate[] = [];
    const rest: PlacementCandidate[] = [];
    for (const c of list) (seen.has(c.topicId) ? rest : (seen.add(c.topicId), first)).push(c);
    byPart.set(p, [...first, ...rest]);
  }
  const picked: string[] = [];
  let round = 0;
  while (picked.length < limit) {
    let added = false;
    for (const p of parts) {
      const list = byPart.get(p)!;
      if (round < list.length && picked.length < limit) {
        picked.push(list[round].id);
        added = true;
      }
    }
    if (!added) break;
    round++;
  }
  return picked;
}

export type PlacementResult = {
  overall: number;
  perPart: Partial<Record<ExamPartId, number>>;
  perTopic: Record<string, number>;
  recommendRescue: boolean;
  level: "Einsteiger" | "Grundlagen vorhanden" | "Fortgeschritten" | "Prüfungsreif";
};

export function evaluatePlacement(
  answers: { topicId: string; examPartId: ExamPartId; score: number }[],
): PlacementResult {
  const perTopicSum: Record<string, { s: number; n: number }> = {};
  const perPartSum: Partial<Record<ExamPartId, { s: number; n: number }>> = {};
  for (const a of answers) {
    perTopicSum[a.topicId] ??= { s: 0, n: 0 };
    perTopicSum[a.topicId].s += a.score;
    perTopicSum[a.topicId].n++;
    perPartSum[a.examPartId] ??= { s: 0, n: 0 };
    perPartSum[a.examPartId]!.s += a.score;
    perPartSum[a.examPartId]!.n++;
  }
  const perTopic = Object.fromEntries(Object.entries(perTopicSum).map(([k, v]) => [k, v.s / v.n]));
  const perPart = Object.fromEntries(
    Object.entries(perPartSum).map(([k, v]) => [k, v!.s / v!.n]),
  ) as Partial<Record<ExamPartId, number>>;
  const overall = answers.length ? answers.reduce((s, a) => s + a.score, 0) / answers.length : 0;
  const level =
    overall < 0.3 ? "Einsteiger" : overall < 0.55 ? "Grundlagen vorhanden" : overall < 0.8 ? "Fortgeschritten" : "Prüfungsreif";
  return { overall, perPart, perTopic, recommendRescue: overall < 0.4, level };
}
