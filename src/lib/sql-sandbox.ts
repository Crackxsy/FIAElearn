import "server-only";
import { Worker } from "node:worker_threads";
import { createRequire } from "node:module";
import path from "node:path";
import { SQL_DATASETS } from "@/content/sql-datasets";
import type { ResultSet } from "@/lib/domain/scoring";

// SQL von Lernenden läuft in einem eigenen Worker-Thread mit einer frischen
// In-Memory-SQLite-Datenbank. Der Worker wird nach TIMEOUT_MS hart beendet.

const TIMEOUT_MS = 2000;
const MAX_ROWS = 200;
const MAX_LENGTH = 4000;

const FORBIDDEN = /\b(attach|detach|pragma|vacuum|load_extension|reindex|analyze)\b/i;
const ALLOWED_START = /^\s*(select|with|insert|update|delete|create\s+table|create\s+view|alter\s+table|drop\s+table|drop\s+view)\b/i;

const WORKER_SOURCE = `
const { parentPort, workerData } = require("node:worker_threads");
const Database = require(workerData.sqlitePath);
function exec(sqlList) {
  const db = new Database(":memory:");
  db.exec(workerData.setup);
  let last = null;
  for (const sql of sqlList) {
    const stmt = db.prepare(sql);
    if (stmt.reader) {
      const rows = stmt.raw().all();
      last = { columns: stmt.columns().map((c) => c.name), rows };
    } else {
      const info = stmt.run();
      last = { columns: ["geänderte Zeilen"], rows: [[info.changes]] };
    }
  }
  db.close();
  return last;
}
try {
  parentPort.postMessage({ ok: true, result: exec(workerData.statements) });
} catch (e) {
  parentPort.postMessage({ ok: false, error: String(e && e.message ? e.message : e) });
}
`;

let sqlitePath: string | null = null;
function resolveSqlite() {
  if (!sqlitePath) {
    const req = createRequire(path.join(process.cwd(), "package.json"));
    sqlitePath = req.resolve("better-sqlite3");
  }
  return sqlitePath;
}

export type SqlRun = { ok: true; result: ResultSet & { truncated?: boolean } } | { ok: false; error: string };

export function validateUserSql(sql: string): string | null {
  const trimmed = sql.trim().replace(/;\s*$/, "");
  if (!trimmed) return "Bitte eine SQL-Anweisung eingeben.";
  if (trimmed.length > MAX_LENGTH) return "Die Anweisung ist zu lang.";
  if (FORBIDDEN.test(trimmed)) return "Diese Anweisung ist in der Übungsumgebung nicht erlaubt.";
  if (!ALLOWED_START.test(trimmed)) return "Erlaubt sind SELECT, INSERT, UPDATE, DELETE, CREATE/ALTER/DROP TABLE.";
  return null;
}

/** Führt Anweisungen nacheinander auf einer frischen Kopie des Datensatzes aus; liefert das letzte Ergebnis. */
export function runSql(datasetId: string, statements: string[]): Promise<SqlRun> {
  const dataset = SQL_DATASETS[datasetId];
  if (!dataset) return Promise.resolve({ ok: false, error: "Unbekannter Datensatz." });
  const cleaned = statements.map((s) => s.trim().replace(/;\s*$/, ""));

  return new Promise((resolve) => {
    const worker = new Worker(WORKER_SOURCE, {
      eval: true,
      workerData: { sqlitePath: resolveSqlite(), setup: dataset.setup, statements: cleaned },
      resourceLimits: { maxOldGenerationSizeMb: 64, maxYoungGenerationSizeMb: 16 },
    });
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, error: "Zeitlimit überschritten – die Abfrage ist zu aufwendig." });
    }, TIMEOUT_MS);
    worker.once("message", (msg: { ok: boolean; result?: ResultSet; error?: string }) => {
      clearTimeout(timer);
      worker.terminate();
      if (!msg.ok || !msg.result) {
        resolve({ ok: false, error: translateError(msg.error ?? "Unbekannter Fehler") });
        return;
      }
      const truncated = msg.result.rows.length > MAX_ROWS;
      resolve({ ok: true, result: { ...msg.result, rows: msg.result.rows.slice(0, MAX_ROWS), truncated } });
    });
    worker.once("error", (err) => {
      clearTimeout(timer);
      resolve({ ok: false, error: translateError(err.message) });
    });
  });
}

function translateError(message: string) {
  if (/more than one statement/i.test(message)) return "Bitte nur eine einzelne SQL-Anweisung eingeben.";
  if (/no such table/i.test(message)) return `Tabelle nicht gefunden (${message.replace(/.*no such table:\s*/i, "")}).`;
  if (/no such column/i.test(message)) return `Spalte nicht gefunden (${message.replace(/.*no such column:\s*/i, "")}).`;
  if (/syntax error/i.test(message)) return `Syntaxfehler: ${message}`;
  return message;
}
