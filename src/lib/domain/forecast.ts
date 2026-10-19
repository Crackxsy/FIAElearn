// Notenprognose aus dem Wissensstand. Es ist eine Schätzung – keine offizielle Bewertung.
import { checkPassing, pointsToGrade, type Grade } from "./grading";
import { EXAM_PARTS, partsForPhase, type ExamPartId, type Phase } from "./exam";

export type ForecastTopic = { examPartId: ExamPartId; weight: number; mastery: number; attempts: number };

export type PartForecast = {
  examPartId: ExamPartId;
  points: number;
  grade: Grade;
  /** Anteil der Themen, zu denen es schon echte Antworten gibt (0..1) */
  confidence: number;
};

export function forecastPart(topics: ForecastTopic[]): Omit<PartForecast, "examPartId"> {
  if (!topics.length) return { points: 0, grade: 6, confidence: 0 };
  const weightSum = topics.reduce((s, t) => s + t.weight, 0);
  const points = (topics.reduce((s, t) => s + t.mastery * t.weight, 0) / weightSum) * 100;
  const confidence = topics.filter((t) => t.attempts > 0).length / topics.length;
  return { points: Math.round(points), grade: pointsToGrade(points), confidence: Math.round(confidence * 100) / 100 };
}

export function forecastAll(topics: ForecastTopic[], phase: Phase) {
  const parts = partsForPhase(phase);
  const perPart: PartForecast[] = parts.map((id) => ({
    examPartId: id,
    ...forecastPart(topics.filter((t) => t.examPartId === id)),
  }));

  if (phase === "AP1") {
    const ap1 = perPart[0];
    return { perPart, overallPoints: ap1.points, overallGrade: ap1.grade, passing: null };
  }

  const points = Object.fromEntries(perPart.map((p) => [p.examPartId, p.points])) as Record<ExamPartId, number>;
  // Für die AP2-Prognose fehlt AP1 – wir nehmen den AP1-Wissensstand, falls vorhanden, sonst 67 (befriedigend).
  const ap1Topics = topics.filter((t) => t.examPartId === "AP1");
  points.AP1 = ap1Topics.length && ap1Topics.some((t) => t.attempts > 0) ? forecastPart(ap1Topics).points : 67;
  const passing = checkPassing(points);
  const overall = passing.total ?? 0;
  return { perPart, overallPoints: Math.round(overall), overallGrade: pointsToGrade(overall), passing };
}

export function partLabel(id: ExamPartId) {
  return EXAM_PARTS[id].short;
}
