import { describe, expect, it } from "vitest";
import Database from "better-sqlite3";
import { ALL_TOPICS } from "@/content";
import { SOURCES } from "@/content/sources";
import { SQL_DATASETS } from "@/content/sql-datasets";
import { LEARNING_FIELDS } from "@/content/taxonomy";
import { compareResultSets, type AnswerKey } from "@/lib/domain/scoring";

const sourceIds = new Set(SOURCES.map((s) => s.id));
const lfIds = new Set(LEARNING_FIELDS.map((l) => l.id));

function run(dataset: string, statements: string[]) {
  const db = new Database(":memory:");
  db.exec(SQL_DATASETS[dataset].setup);
  let last: { columns: string[]; rows: unknown[][] } | null = null;
  for (const sql of statements) {
    const stmt = db.prepare(sql);
    if (stmt.reader) last = { columns: stmt.columns().map((c) => c.name), rows: stmt.raw().all() as unknown[][] };
    else stmt.run();
  }
  db.close();
  return last;
}

describe("Inhalte", () => {
  it("Themen-IDs eindeutig, Lernfelder und Quellen existieren", () => {
    const ids = ALL_TOPICS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of ALL_TOPICS) {
      if (t.lf) expect(lfIds.has(t.lf), `${t.id}: ${t.lf}`).toBe(true);
      for (const s of t.lesson.sources) expect(sourceIds.has(s), `${t.id}: ${s}`).toBe(true);
      expect(t.questions.length, t.id).toBeGreaterThanOrEqual(4);
      expect(t.cards.length, t.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("jede Prüfungsbereich hat Einstufungsfragen", () => {
    for (const part of ["AP1", "AP2_PROJEKT", "AP2_SOFTWARE", "AP2_ALGO", "AP2_WISO"]) {
      const n = ALL_TOPICS.filter((t) => t.part === part).flatMap((t) => t.questions).filter((q) => q.placement).length;
      expect(n, part).toBeGreaterThanOrEqual(4);
    }
  });

  for (const t of ALL_TOPICS) {
    for (const [i, q] of t.questions.entries()) {
      it(`${t.id} #${i + 1} (${q.type}) ist konsistent`, () => {
        const a = q.answer as AnswerKey;
        for (const s of q.sources ?? []) expect(sourceIds.has(s)).toBe(true);
        if (q.type === "single" || q.type === "multiple") {
          const ids = new Set(q.options!.map((o) => o.id));
          const correct = (a as { correct: string[] }).correct;
          expect(correct.length).toBeGreaterThan(0);
          if (q.type === "single") expect(correct).toHaveLength(1);
          for (const c of correct) expect(ids.has(c)).toBe(true);
        } else if (q.type === "calculation") {
          expect(Number.isFinite((a as { value: number }).value)).toBe(true);
        } else if (q.type === "short" || q.type === "code_tracing") {
          expect((a as { accepted: string[] }).accepted.length).toBeGreaterThan(0);
        } else if (q.type === "sql") {
          const key = a as { dataset: string; solution: string; check?: string };
          expect(SQL_DATASETS[key.dataset]).toBeDefined();
          const stmts = key.check ? [key.solution, key.check] : [key.solution];
          const result = run(key.dataset, stmts);
          expect(result).not.toBeNull();
          expect(result!.rows.length).toBeGreaterThan(0);
          // Musterlösung ist mit sich selbst identisch
          expect(compareResultSets(result!, result!, false).correct).toBe(true);
        } else if (q.type === "open") {
          expect((a as { model: string }).model.length).toBeGreaterThan(20);
        }
      });
    }
  }
});
