// Auswertung der Antworten je Fragetyp. Reine Funktionen – SQL wird separat ausgeführt.

export type QuestionType = "single" | "multiple" | "short" | "calculation" | "code_tracing" | "sql" | "open";

export type ChoiceAnswer = { correct: string[] };
export type TextAnswer = { accepted: string[] };
export type NumberAnswer = { value: number; tolerance?: number; unit?: string };
export type SqlAnswer = { dataset: string; solution: string; check?: string; ordered?: boolean };
export type OpenAnswer = { model: string };
export type AnswerKey = ChoiceAnswer | TextAnswer | NumberAnswer | SqlAnswer | OpenAnswer;

/** Was der Client schickt. */
export type UserAnswer =
  | { kind: "choice"; selected: string[] }
  | { kind: "text"; value: string }
  | { kind: "self"; rating: "full" | "partial" | "none"; value?: string };

export type ScoreResult = { score: number; correct: boolean; feedback?: string };

export function scoreChoice(key: ChoiceAnswer, selected: string[], multiple: boolean): ScoreResult {
  const correctSet = new Set(key.correct);
  const picked = new Set(selected);
  if (!multiple) {
    const ok = picked.size === 1 && correctSet.has([...picked][0]);
    return { score: ok ? 1 : 0, correct: ok };
  }
  let hits = 0;
  let wrong = 0;
  for (const id of picked) {
    if (correctSet.has(id)) hits++;
    else wrong++;
  }
  // Teilpunkte: richtige minus falsche Kreuze, nie negativ.
  const score = Math.max(0, (hits - wrong) / correctSet.size);
  const ok = hits === correctSet.size && wrong === 0;
  return { score: round(score), correct: ok };
}

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[„“”"'`´]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[.!;]+$/g, "")
    .trim();
}

export function scoreText(key: TextAnswer, value: string): ScoreResult {
  const input = normalizeText(value);
  const compact = input.replace(/\s/g, "");
  const ok = key.accepted.some((a) => {
    const n = normalizeText(a);
    return n === input || n.replace(/\s/g, "") === compact;
  });
  return { score: ok ? 1 : 0, correct: ok };
}

/** Akzeptiert "1.024,5", "1024.5", "1 024,5 MiB" usw. */
export function parseNumber(raw: string): number | null {
  let s = raw.trim().replace(/\s+/g, "");
  s = s.replace(/[^\d.,\-eE+]/g, "");
  if (!s) return null;
  const hasComma = s.includes(",");
  const hasDot = s.includes(".");
  if (hasComma && hasDot) {
    // Das zuletzt vorkommende Zeichen ist das Dezimaltrennzeichen.
    if (s.lastIndexOf(",") > s.lastIndexOf(".")) s = s.replace(/\./g, "").replace(",", ".");
    else s = s.replace(/,/g, "");
  } else if (hasComma) {
    s = s.replace(",", ".");
  } else if (hasDot && /^\-?\d{1,3}(\.\d{3})+$/.test(s)) {
    // "1.024" mit genau drei Nachkommastellen → deutsches Tausendertrennzeichen
    s = s.replace(/\./g, "");
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function scoreNumber(key: NumberAnswer, raw: string): ScoreResult {
  const n = parseNumber(raw);
  if (n == null) return { score: 0, correct: false, feedback: "Bitte eine Zahl eingeben." };
  const tolerance = key.tolerance ?? Math.max(0.005, Math.abs(key.value) * 0.001);
  const ok = Math.abs(n - key.value) <= tolerance;
  if (ok) return { score: 1, correct: true };
  // Typischer Fehler: Faktor 1000 vs. 1024 oder 8 (Bit/Byte)
  const ratio = key.value !== 0 ? n / key.value : 0;
  let feedback: string | undefined;
  if ([8, 1 / 8].some((r) => Math.abs(ratio - r) < 0.01)) feedback = "Achtung Bit vs. Byte (Faktor 8)!";
  else if ([1.024, 1 / 1.024, 1.048576, 1 / 1.048576].some((r) => Math.abs(ratio - r) < 0.002))
    feedback = "Achtung Dezimal- vs. Binärpräfix (1000 vs. 1024)!";
  return { score: 0, correct: false, feedback };
}

export function scoreSelf(rating: "full" | "partial" | "none"): ScoreResult {
  const score = rating === "full" ? 1 : rating === "partial" ? 0.5 : 0;
  return { score, correct: rating === "full" };
}

export type ResultSet = { columns: string[]; rows: unknown[][] };

/** Vergleicht zwei Ergebnismengen (Spaltennamen egal, Reihenfolge nur wenn verlangt). */
export function compareResultSets(expected: ResultSet, actual: ResultSet, ordered: boolean): ScoreResult {
  if (expected.columns.length !== actual.columns.length) {
    return {
      score: 0,
      correct: false,
      feedback: `Erwartet werden ${expected.columns.length} Spalte(n), deine Abfrage liefert ${actual.columns.length}.`,
    };
  }
  if (expected.rows.length !== actual.rows.length) {
    return {
      score: 0,
      correct: false,
      feedback: `Erwartet werden ${expected.rows.length} Zeile(n), deine Abfrage liefert ${actual.rows.length}.`,
    };
  }
  const norm = (row: unknown[]) =>
    JSON.stringify(row.map((v) => (typeof v === "number" ? Math.round(v * 100) / 100 : v)));
  const e = expected.rows.map(norm);
  const a = actual.rows.map(norm);
  if (!ordered) {
    e.sort();
    a.sort();
  }
  const ok = e.every((row, i) => row === a[i]);
  if (ok) return { score: 1, correct: true };
  if (ordered && [...e].sort().join() === [...a].sort().join()) {
    return { score: 0.5, correct: false, feedback: "Die richtigen Daten, aber falsch sortiert (ORDER BY prüfen)." };
  }
  return { score: 0, correct: false, feedback: "Die Werte stimmen nicht mit dem erwarteten Ergebnis überein." };
}

function round(v: number) {
  return Math.round(v * 1000) / 1000;
}
