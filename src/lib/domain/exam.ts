// Prüfungsstruktur nach FIAusbV 2020 (§§ 8–17), Fachrichtung Anwendungsentwicklung.

export type ExamPartId =
  | "AP1"
  | "AP2_PROJEKT"
  | "AP2_SOFTWARE"
  | "AP2_ALGO"
  | "AP2_WISO";

export type Phase = "AP1" | "AP2";

export const EXAM_PARTS: Record<
  ExamPartId,
  { name: string; short: string; weight: number; durationMin: number | null; phase: Phase }
> = {
  AP1: { name: "Einrichten eines IT-gestützten Arbeitsplatzes", short: "AP1", weight: 20, durationMin: 90, phase: "AP1" },
  AP2_PROJEKT: { name: "Planen und Umsetzen eines Softwareprojektes", short: "Projekt", weight: 50, durationMin: null, phase: "AP2" },
  AP2_SOFTWARE: { name: "Planen eines Softwareproduktes", short: "Software", weight: 10, durationMin: 90, phase: "AP2" },
  AP2_ALGO: { name: "Entwicklung und Umsetzung von Algorithmen", short: "Algorithmen", weight: 10, durationMin: 90, phase: "AP2" },
  AP2_WISO: { name: "Wirtschafts- und Sozialkunde", short: "WiSo", weight: 10, durationMin: 60, phase: "AP2" },
};

export const AP2_PARTS: ExamPartId[] = ["AP2_PROJEKT", "AP2_SOFTWARE", "AP2_ALGO", "AP2_WISO"];
export const WRITTEN_PARTS: ExamPartId[] = ["AP1", "AP2_SOFTWARE", "AP2_ALGO", "AP2_WISO"];

export function partsForPhase(phase: Phase): ExamPartId[] {
  return phase === "AP1" ? ["AP1"] : AP2_PARTS;
}

export function isExamPartId(value: string): value is ExamPartId {
  return value in EXAM_PARTS;
}
