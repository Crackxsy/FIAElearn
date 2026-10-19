import { describe, expect, it } from "vitest";
import { compareResultSets, parseNumber, scoreChoice, scoreNumber, scoreText } from "@/lib/domain/scoring";

describe("Choice", () => {
  it("single", () => {
    expect(scoreChoice({ correct: ["b"] }, ["b"], false).correct).toBe(true);
    expect(scoreChoice({ correct: ["b"] }, ["a"], false).score).toBe(0);
  });
  it("multiple mit Teilpunkten", () => {
    expect(scoreChoice({ correct: ["a", "c"] }, ["a", "c"], true)).toMatchObject({ score: 1, correct: true });
    expect(scoreChoice({ correct: ["a", "c"] }, ["a"], true)).toMatchObject({ score: 0.5, correct: false });
    expect(scoreChoice({ correct: ["a", "c"] }, ["a", "b"], true).score).toBe(0);
  });
});

describe("Text", () => {
  it("ignoriert Groß/Klein, Umlaute, Leerzeichen", () => {
    expect(scoreText({ accepted: ["Prüfsumme"] }, "  pruefsumme ").correct).toBe(true);
    expect(scoreText({ accepted: ["1 2 3"] }, "123").correct).toBe(true);
  });
});

describe("Zahlen", () => {
  it.each([
    ["1.024", 1024], ["1024", 1024], ["3,5", 3.5], ["1.234,5", 1234.5], ["1,234.5", 1234.5], ["12,5 MiB", 12.5], ["-2", -2],
  ])("%s → %d", (raw, n) => expect(parseNumber(raw)).toBe(n));
  it("Toleranz und Hinweis Bit/Byte", () => {
    expect(scoreNumber({ value: 100, tolerance: 0.5 }, "100,4").correct).toBe(true);
    expect(scoreNumber({ value: 100 }, "800").feedback).toMatch(/Bit/);
  });
});

describe("SQL-Ergebnismengen", () => {
  const exp = { columns: ["a", "b"], rows: [[1, "x"], [2, "y"]] };
  it("ungeordnet gleich", () => {
    expect(compareResultSets(exp, { columns: ["c", "d"], rows: [[2, "y"], [1, "x"]] }, false).correct).toBe(true);
  });
  it("geordnet falsch sortiert → halbe Punkte", () => {
    expect(compareResultSets(exp, { columns: ["a", "b"], rows: [[2, "y"], [1, "x"]] }, true).score).toBe(0.5);
  });
  it("Spaltenanzahl falsch", () => {
    expect(compareResultSets(exp, { columns: ["a"], rows: [[1], [2]] }, false).correct).toBe(false);
  });
});
