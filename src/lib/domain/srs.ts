// Spaced Repetition nach dem Leitner-Prinzip: Wiederholung nach 1/3/7/14/30 Tagen.
import { addDays, type Day } from "./dates";

export const BOX_INTERVALS = [1, 3, 7, 14, 30] as const;
export const MAX_BOX = BOX_INTERVALS.length;

export type ReviewState = { box: number; due: Day };

/**
 * Nächster Zustand nach einer Antwort.
 * Richtig → eine Box weiter, falsch → zurück in Box 1, teilweise richtig → Box bleibt.
 */
export function nextReview(current: number | null, score: number, day: Day): ReviewState {
  const box = current ?? 0;
  let next: number;
  if (score >= 0.999) next = Math.min(box + 1, MAX_BOX);
  else if (score >= 0.5) next = Math.max(box, 1);
  else next = 1;
  return { box: next, due: addDays(day, BOX_INTERVALS[next - 1]) };
}

/** Lernkarten-Selbsteinschätzung → Score. */
export const CARD_RATINGS = {
  again: 0,
  hard: 0.5,
  good: 1,
} as const;
