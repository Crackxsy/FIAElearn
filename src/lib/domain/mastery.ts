// Wissensstand je Thema (0..1).

/** Selbsteinschätzung 0–3 → Startwert. */
export const SELF_RATING_MASTERY = [0, 0.2, 0.45, 0.7] as const;

export const SELF_RATING_LABELS = [
  "Nie gehört",
  "Schon mal gehört",
  "Kann ich teilweise",
  "Sitzt sicher",
] as const;

/** Lernrate: neuere Antworten zählen stärker. */
const ALPHA = 0.25;

export function updateMastery(current: number, score: number, attempts: number): number {
  // Die ersten Antworten bewegen den Wert stärker, damit man schnell sieht, wo man steht.
  const alpha = attempts < 3 ? 0.4 : ALPHA;
  return round(current + alpha * (score - current));
}

/**
 * Startwert aus Selbsteinschätzung und Einstufungstest.
 * topicScore = Ergebnis der Einstufungsfragen genau dieses Themas,
 * partScore = Ergebnis im gesamten Prüfungsbereich (Fallback).
 */
export function initialMastery(selfRating: number | null, topicScore: number | null, partScore: number | null): number {
  const self = selfRating == null ? null : SELF_RATING_MASTERY[Math.max(0, Math.min(3, selfRating))];
  if (topicScore != null) {
    return round(self == null ? topicScore * 0.85 : 0.45 * self + 0.55 * topicScore * 0.85);
  }
  if (partScore != null) {
    return round(self == null ? partScore * 0.6 : 0.6 * self + 0.4 * partScore * 0.6);
  }
  return round(self ?? 0);
}

/** Wissensstand verfällt leicht, wenn lange nicht geübt wurde (Vergessenskurve, gedämpft). */
export function decayedMastery(mastery: number, daysSincePractice: number | null): number {
  if (daysSincePractice == null || daysSincePractice <= 7) return mastery;
  const factor = Math.max(0.75, 1 - (daysSincePractice - 7) * 0.005);
  return round(mastery * factor);
}

function round(v: number) {
  return Math.round(Math.min(1, Math.max(0, v)) * 1000) / 1000;
}
