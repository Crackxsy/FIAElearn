"use client";

import { CheckCircle2, Circle, CircleCheck, Database, Lightbulb, Play, Square, SquareCheck, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { runSqlAction } from "@/app/actions/learning";
import type { ClientQuestion } from "@/lib/services/questions";
import type { Feedback } from "@/lib/services/progress";
import type { ResultSet, UserAnswer } from "@/lib/domain/scoring";
import { Badge, Button, cx } from "./ui";

export const TYPE_LABELS: Record<ClientQuestion["type"], string> = {
  single: "Single Choice",
  multiple: "Multiple Choice",
  short: "Kurzantwort",
  calculation: "Rechnung",
  code_tracing: "Code lesen",
  sql: "SQL",
  open: "Freitext",
};

export type DraftAnswer = { selected: string[]; text: string };
export const emptyDraft = (): DraftAnswer => ({ selected: [], text: "" });

export function draftToAnswer(q: ClientQuestion, draft: DraftAnswer, selfRating?: "full" | "partial" | "none"): UserAnswer {
  if (q.type === "single" || q.type === "multiple") return { kind: "choice", selected: draft.selected };
  if (q.type === "open") return { kind: "self", rating: selfRating ?? "none", value: draft.text };
  return { kind: "text", value: draft.text };
}

export function isDraftEmpty(q: ClientQuestion, draft: DraftAnswer) {
  if (q.type === "single" || q.type === "multiple") return draft.selected.length === 0;
  return draft.text.trim().length === 0;
}

export function ResultTable({ result, caption }: { result: ResultSet & { truncated?: boolean }; caption?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      {caption && <p className="border-b border-line bg-fill px-3 py-1.5 text-[12px] font-medium text-fg-2">{caption}</p>}
      <div className="max-h-64 overflow-auto">
        <table className="w-full text-left font-mono text-[12.5px]">
          <thead className="sticky top-0 bg-surface">
            <tr>
              {result.columns.map((c, i) => (
                <th key={i} className="border-b border-line px-3 py-1.5 font-semibold whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i} className="odd:bg-fill/40">
                {row.map((v, j) => (
                  <td key={j} className="px-3 py-1 whitespace-nowrap">
                    {v === null ? <span className="text-fg-3">NULL</span> : String(v)}
                  </td>
                ))}
              </tr>
            ))}
            {result.rows.length === 0 && (
              <tr>
                <td className="px-3 py-2 text-fg-3" colSpan={Math.max(1, result.columns.length)}>
                  (keine Zeilen)
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {result.truncated && <p className="border-t border-line px-3 py-1 text-[11px] text-fg-3">Nur die ersten 200 Zeilen.</p>}
    </div>
  );
}

function SqlRunner({ q, sql }: { q: ClientQuestion; sql: string }) {
  const [result, setResult] = useState<Awaited<ReturnType<typeof runSqlAction>> | null>(null);
  const [pending, start] = useTransition();
  if (!q.dataset) return null;
  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={pending || !sql.trim()}
        onClick={() => start(async () => setResult(await runSqlAction(q.dataset!.id, sql)))}
      >
        <Play size={14} /> {pending ? "Läuft …" : "Abfrage testen"}
      </Button>
      {result && (result.ok ? <ResultTable result={result.result} caption="Dein Ergebnis" /> : <p className="rounded-xl bg-danger-soft px-3 py-2 font-mono text-[12.5px] text-danger">{result.error}</p>)}
    </div>
  );
}

export function QuestionView({
  q,
  draft,
  onDraft,
  locked,
  feedback,
  index,
  total,
}: {
  q: ClientQuestion;
  draft: DraftAnswer;
  onDraft: (d: DraftAnswer) => void;
  locked: boolean;
  feedback?: Feedback | null;
  index?: number;
  total?: number;
}) {
  const multiple = q.type === "multiple";
  const correctIds = feedback?.correctOptionIds;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {index != null && total != null && (
          <span className="text-[13px] font-medium text-fg-2">
            Aufgabe {index + 1} / {total}
          </span>
        )}
        <Badge>{TYPE_LABELS[q.type]}</Badge>
        {q.topicTitle && <Badge tone="accent">{q.topicTitle}</Badge>}
        <span className="text-[12px] text-fg-3">
          {q.points} {q.points === 1 ? "Punkt" : "Punkte"}
        </span>
      </div>

      {q.scenario && <p className="rounded-2xl bg-fill px-4 py-3 text-[15px] leading-relaxed text-fg-2">{q.scenario}</p>}
      <p className="text-[18px] leading-relaxed font-medium tracking-[-0.01em] sm:text-[19px]">{q.prompt}</p>
      {multiple && !locked && <p className="-mt-3 text-[13px] text-fg-3">Mehrere Antworten können richtig sein.</p>}

      {q.code && (
        <pre className="overflow-x-auto rounded-2xl border border-line bg-code p-4 font-mono text-[13.5px] leading-[1.6]">
          <code>{q.code}</code>
        </pre>
      )}

      {q.dataset && (
        <details className="rounded-2xl border border-line bg-surface-2 px-4 py-3" open>
          <summary className="flex cursor-pointer items-center gap-2 text-[14px] font-medium">
            <Database size={15} /> Datenbank „{q.dataset.title}“
          </summary>
          <pre className="mt-2 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-fg-2">{q.dataset.description}</pre>
        </details>
      )}

      {(q.type === "single" || q.type === "multiple") && q.options && (
        <div className="space-y-2" role={multiple ? "group" : "radiogroup"}>
          {q.options.map((o) => {
            const selected = draft.selected.includes(o.id);
            const isCorrect = correctIds?.includes(o.id);
            const state = !feedback ? (selected ? "selected" : "idle") : isCorrect ? "correct" : selected ? "wrong" : "idle";
            const Icon = multiple ? (selected ? SquareCheck : Square) : selected ? CircleCheck : Circle;
            return (
              <button
                key={o.id}
                type="button"
                disabled={locked}
                role={multiple ? "checkbox" : "radio"}
                aria-checked={selected}
                onClick={() => {
                  if (multiple) onDraft({ ...draft, selected: selected ? draft.selected.filter((x) => x !== o.id) : [...draft.selected, o.id] });
                  else onDraft({ ...draft, selected: [o.id] });
                }}
                className={cx(
                  "flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15.5px] leading-snug transition",
                  state === "idle" && "border-line bg-surface hover:border-line-strong",
                  state === "selected" && "border-ink bg-surface shadow-card",
                  state === "correct" && "border-success/50 bg-success-soft",
                  state === "wrong" && "border-danger/50 bg-danger-soft",
                  locked && "cursor-default",
                )}
              >
                {state === "correct" ? (
                  <CheckCircle2 size={20} className="mt-px shrink-0 text-success" />
                ) : state === "wrong" ? (
                  <XCircle size={20} className="mt-px shrink-0 text-danger" />
                ) : (
                  <Icon size={20} className={cx("mt-px shrink-0", selected ? "text-fg" : "text-fg-3")} />
                )}
                <span>{o.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {(q.type === "short" || q.type === "calculation" || q.type === "code_tracing") && (
        <div className="flex items-center gap-2">
          <input
            className="input h-12 text-[16px]"
            value={draft.text}
            disabled={locked}
            inputMode={q.type === "calculation" ? "decimal" : undefined}
            placeholder={q.type === "calculation" ? "Ergebnis eingeben" : "Antwort eingeben"}
            onChange={(e) => onDraft({ ...draft, text: e.target.value })}
            autoComplete="off"
            spellCheck={false}
          />
          {q.unit && <span className="shrink-0 text-[15px] text-fg-2">{q.unit}</span>}
        </div>
      )}

      {q.type === "sql" && (
        <div className="space-y-2">
          <textarea
            className="input h-36 resize-y py-3 font-mono text-[14px] leading-relaxed"
            value={draft.text}
            disabled={locked}
            placeholder="SELECT …"
            onChange={(e) => onDraft({ ...draft, text: e.target.value })}
            spellCheck={false}
          />
          {!locked && <SqlRunner q={q} sql={draft.text} />}
        </div>
      )}

      {q.type === "open" && (
        <textarea
          className="input h-40 resize-y py-3 text-[15px] leading-relaxed"
          value={draft.text}
          disabled={locked}
          placeholder="Formuliere deine Antwort in Stichpunkten oder ganzen Sätzen …"
          onChange={(e) => onDraft({ ...draft, text: e.target.value })}
        />
      )}
    </div>
  );
}

export function FeedbackPanel({ feedback, type }: { feedback: Feedback; type: ClientQuestion["type"] }) {
  const tone = feedback.correct ? "success" : feedback.score > 0 ? "warning" : "danger";
  const title = feedback.correct ? "Richtig!" : feedback.score > 0 ? "Teilweise richtig" : "Leider falsch";
  return (
    <div
      className={cx(
        "animate-fade-up space-y-3 rounded-2xl border p-4 sm:p-5",
        tone === "success" && "border-success/40 bg-success-soft",
        tone === "warning" && "border-warning/40 bg-warning-soft",
        tone === "danger" && "border-danger/40 bg-danger-soft",
      )}
      aria-live="polite"
    >
      {type !== "open" && (
        <p className={cx("flex items-center gap-2 text-[16px] font-semibold", { success: "text-success", warning: "text-warning", danger: "text-danger" }[tone])}>
          {feedback.correct ? <CheckCircle2 size={19} /> : <XCircle size={19} />} {title}
          {!feedback.correct && feedback.score > 0 && <span className="text-[13px] font-normal">({Math.round(feedback.score * 100)} %)</span>}
        </p>
      )}
      {feedback.feedback && <p className="text-[14px] font-medium">{feedback.feedback}</p>}
      {!feedback.correct && type !== "single" && type !== "multiple" && type !== "open" && (
        <div>
          <p className="text-[12px] font-semibold tracking-wide text-fg-2 uppercase">Lösung</p>
          {type === "sql" ? (
            <pre className="mt-1 overflow-x-auto rounded-xl bg-surface p-3 font-mono text-[13px]">{feedback.solution}</pre>
          ) : (
            <p className="mt-0.5 font-mono text-[15px]">{feedback.solution}</p>
          )}
        </div>
      )}
      {type === "sql" && feedback.sql && (
        <div className="grid gap-2 lg:grid-cols-2">
          {feedback.sql.actual && <ResultTable result={feedback.sql.actual} caption="Dein Ergebnis" />}
          {feedback.sql.expected && <ResultTable result={feedback.sql.expected} caption="Erwartetes Ergebnis" />}
        </div>
      )}
      {feedback.explanation && (
        <p className="flex gap-2 text-[14.5px] leading-relaxed">
          <Lightbulb size={17} className="mt-0.5 shrink-0 text-fg-2" />
          <span>{feedback.explanation}</span>
        </p>
      )}
      {feedback.steps && feedback.steps.length > 0 && (
        <ol className="ml-6 list-decimal space-y-0.5 text-[14px] text-fg-2">
          {feedback.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Musterlösung für Freitext + Selbstbewertung. */
export function SelfAssess({ model, onRate, disabled }: { model: string; onRate: (r: "full" | "partial" | "none") => void; disabled?: boolean }) {
  return (
    <div className="animate-fade-up space-y-4 rounded-2xl border border-line bg-surface-2 p-4 sm:p-5">
      <div>
        <p className="text-[12px] font-semibold tracking-wide text-fg-2 uppercase">Musterlösung</p>
        <p className="mt-1 text-[15px] leading-relaxed whitespace-pre-line">{model}</p>
      </div>
      <div>
        <p className="mb-2 text-[14px] font-medium">Wie gut war deine Antwort?</p>
        <div className="grid grid-cols-3 gap-2">
          <Button type="button" variant="danger" disabled={disabled} onClick={() => onRate("none")}>
            Nicht gewusst
          </Button>
          <Button type="button" variant="secondary" disabled={disabled} onClick={() => onRate("partial")}>
            Teilweise
          </Button>
          <Button type="button" variant="accent" disabled={disabled} onClick={() => onRate("full")}>
            Gewusst
          </Button>
        </div>
      </div>
    </div>
  );
}
