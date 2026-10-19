import { describe, expect, it } from "vitest";
import { nextReview } from "@/lib/domain/srs";
import { initialMastery, updateMastery } from "@/lib/domain/mastery";
import { addDays, diffDays, toDay } from "@/lib/domain/dates";

describe("Leitner", () => {
  it("steigt 1/3/7/14/30 Tage", () => {
    const day = "2026-10-19";
    let state = nextReview(null, 1, day);
    expect(state).toEqual({ box: 1, due: "2026-10-20" });
    state = nextReview(state.box, 1, day);
    expect(state.due).toBe("2026-10-22");
    state = nextReview(4, 1, day);
    expect(state.due).toBe(addDays(day, 30));
    expect(nextReview(5, 1, day).box).toBe(5);
  });
  it("falsch → Box 1", () => {
    expect(nextReview(4, 0, "2026-10-19").box).toBe(1);
  });
});

describe("Mastery", () => {
  it("bewegt sich Richtung Score", () => {
    expect(updateMastery(0.5, 1, 10)).toBeCloseTo(0.625);
    expect(updateMastery(0.5, 0, 0)).toBeCloseTo(0.3);
  });
  it("Startwert kombiniert Selbsteinschätzung und Test", () => {
    expect(initialMastery(3, 1, null)).toBeGreaterThan(initialMastery(0, 1, null));
    expect(initialMastery(null, null, null)).toBe(0);
  });
});

describe("Datum", () => {
  it("Berlin-Tage über Zeitumstellung", () => {
    expect(diffDays("2026-10-24", "2026-10-26")).toBe(2);
    expect(toDay(new Date("2026-10-18T23:30:00Z"))).toBe("2026-10-19");
  });
});
