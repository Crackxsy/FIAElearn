// IHK-Notenschlüssel (100-Punkte-Schlüssel) und Bestehensregeln nach FIAusbV § 16.
import { AP2_PARTS, EXAM_PARTS, type ExamPartId } from "./exam";

export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export const GRADE_LABELS: Record<Grade, string> = {
  1: "sehr gut",
  2: "gut",
  3: "befriedigend",
  4: "ausreichend",
  5: "mangelhaft",
  6: "ungenügend",
};

/** Untere Punktgrenze je Note (inklusive). */
export const GRADE_THRESHOLDS: Record<Grade, number> = {
  1: 92,
  2: 81,
  3: 67,
  4: 50,
  5: 30,
  6: 0,
};

export function pointsToGrade(points: number): Grade {
  const p = Math.round(clamp(points, 0, 100));
  if (p >= 92) return 1;
  if (p >= 81) return 2;
  if (p >= 67) return 3;
  if (p >= 50) return 4;
  if (p >= 30) return 5;
  return 6;
}

/** Mindestpunktzahl, die für eine Zielnote nötig ist. */
export function minPointsForGrade(grade: Grade): number {
  return GRADE_THRESHOLDS[grade];
}

export type PartPoints = Partial<Record<ExamPartId, number>>;

/** Gewichtetes Gesamtergebnis (AP1 20 %, Projekt 50 %, je 10 %). */
export function weightedTotal(points: PartPoints): number | null {
  let sum = 0;
  let weight = 0;
  for (const [id, value] of Object.entries(points) as [ExamPartId, number][]) {
    if (value == null) continue;
    sum += value * EXAM_PARTS[id].weight;
    weight += EXAM_PARTS[id].weight;
  }
  return weight === 0 ? null : sum / weight;
}

/** Ergebnis von Teil 2 (nur AP2-Bereiche, relativ gewichtet: 50/10/10/10 → 62,5/12,5/12,5/12,5 %). */
export function ap2Result(points: PartPoints): number | null {
  const subset: PartPoints = {};
  for (const id of AP2_PARTS) if (points[id] != null) subset[id] = points[id];
  return weightedTotal(subset);
}

export type PassCheck = {
  passed: boolean;
  total: number | null;
  ap2: number | null;
  rules: { label: string; ok: boolean }[];
  /** Bereiche, in denen eine mündliche Ergänzungsprüfung (§ 17) beantragt werden könnte. */
  oralSupplementCandidates: ExamPartId[];
};

/** Prüft die Bestehensregeln nach § 16 FIAusbV (alle fünf Bereiche müssen bekannt sein). */
export function checkPassing(points: Record<ExamPartId, number>): PassCheck {
  const total = weightedTotal(points);
  const ap2 = ap2Result(points);
  const ap2Values = AP2_PARTS.map((id) => points[id]);
  const atLeastSufficient = ap2Values.filter((p) => p >= 50).length;
  const noneInsufficient = ap2Values.every((p) => p >= 30);

  const rules = [
    { label: "Gesamtergebnis (Teil 1 + Teil 2) mindestens ausreichend", ok: (total ?? 0) >= 50 },
    { label: "Ergebnis von Teil 2 mindestens ausreichend", ok: (ap2 ?? 0) >= 50 },
    { label: "Mindestens 3 der 4 Bereiche von Teil 2 mindestens ausreichend", ok: atLeastSufficient >= 3 },
    { label: "Kein Bereich von Teil 2 ungenügend", ok: noneInsufficient },
  ];

  const oralSupplementCandidates = (["AP2_SOFTWARE", "AP2_ALGO", "AP2_WISO"] as ExamPartId[]).filter(
    (id) => points[id] < 50,
  );

  return {
    passed: rules.every((r) => r.ok),
    total,
    ap2,
    rules,
    oralSupplementCandidates,
  };
}

/**
 * Ergebnis nach einer mündlichen Ergänzungsprüfung (§ 17):
 * bisheriges Ergebnis und mündliche Prüfung im Verhältnis 2 : 1.
 */
export function withOralSupplement(written: number, oral: number): number {
  return (2 * written + oral) / 3;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
