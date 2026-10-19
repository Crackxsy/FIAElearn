import { describe, expect, it } from "vitest";
import { ap2Result, checkPassing, pointsToGrade, weightedTotal, withOralSupplement } from "@/lib/domain/grading";

describe("pointsToGrade (IHK-Schlüssel)", () => {
  it.each([
    [100, 1], [92, 1], [91, 2], [81, 2], [80, 3], [67, 3], [66, 4], [50, 4], [49, 5], [30, 5], [29, 6], [0, 6],
  ])("%i Punkte → Note %i", (points, grade) => {
    expect(pointsToGrade(points)).toBe(grade);
  });
});

describe("Gewichtung", () => {
  it("rechnet AP1 20 %, Projekt 50 %, je 10 %", () => {
    const total = weightedTotal({ AP1: 80, AP2_PROJEKT: 70, AP2_SOFTWARE: 60, AP2_ALGO: 50, AP2_WISO: 90 });
    expect(total).toBeCloseTo(0.2 * 80 + 0.5 * 70 + 0.1 * 60 + 0.1 * 50 + 0.1 * 90);
  });
  it("Teil 2 wird relativ gewichtet", () => {
    expect(ap2Result({ AP2_PROJEKT: 80, AP2_SOFTWARE: 40, AP2_ALGO: 40, AP2_WISO: 40 })).toBeCloseTo((80 * 50 + 120 * 10) / 80);
  });
});

describe("Bestehensregeln § 16", () => {
  it("besteht mit einem mangelhaften Bereich", () => {
    const r = checkPassing({ AP1: 60, AP2_PROJEKT: 70, AP2_SOFTWARE: 45, AP2_ALGO: 60, AP2_WISO: 60 });
    expect(r.passed).toBe(true);
    expect(r.oralSupplementCandidates).toEqual(["AP2_SOFTWARE"]);
  });
  it("fällt durch bei ungenügend", () => {
    const r = checkPassing({ AP1: 90, AP2_PROJEKT: 90, AP2_SOFTWARE: 25, AP2_ALGO: 90, AP2_WISO: 90 });
    expect(r.passed).toBe(false);
  });
  it("fällt durch bei zwei mangelhaften AP2-Bereichen", () => {
    const r = checkPassing({ AP1: 90, AP2_PROJEKT: 90, AP2_SOFTWARE: 45, AP2_ALGO: 45, AP2_WISO: 90 });
    expect(r.passed).toBe(false);
  });
  it("mündliche Ergänzung 2:1", () => {
    expect(withOralSupplement(45, 60)).toBeCloseTo(50);
  });
});
