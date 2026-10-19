"use client";

import { ChevronLeft, ChevronRight, Flag, Timer } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { finishSimulationAction, saveSimAnswerAction } from "@/app/actions/simulation";
import type { ClientQuestion } from "@/lib/services/questions";
import { draftToAnswer, emptyDraft, isDraftEmpty, QuestionView, type DraftAnswer } from "./question";
import { Button, Card, cx } from "./ui";

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function SimulationRunner({
  simId,
  questions,
  endsAt,
  initial,
}: {
  simId: string;
  questions: ClientQuestion[];
  endsAt: string;
  initial: Record<string, DraftAnswer>;
}) {
  const [index, setIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, DraftAnswer>>(initial);
  const [left, setLeft] = useState(() => new Date(endsAt).getTime() - Date.now());
  const [saving, startSave] = useTransition();
  const [finishing, startFinish] = useTransition();
  const dirty = useRef<Set<string>>(new Set());
  const q = questions[index];
  const draft = drafts[q.id] ?? emptyDraft();

  const save = useCallback(
    (id: string) => {
      const question = questions.find((x) => x.id === id);
      const d = drafts[id];
      if (!question || !d || !dirty.current.has(id)) return Promise.resolve();
      dirty.current.delete(id);
      // Freitext wird als Text gespeichert und nach der Abgabe selbst bewertet.
      const answer = question.type === "open" ? { kind: "self" as const, rating: "none" as const, value: d.text } : draftToAnswer(question, d);
      return saveSimAnswerAction(simId, id, answer).then(() => undefined);
    },
    [drafts, questions, simId],
  );

  const finish = useCallback(() => {
    startFinish(async () => {
      await Promise.all([...dirty.current].map((id) => save(id)));
      await finishSimulationAction(simId);
    });
  }, [save, simId]);

  useEffect(() => {
    const t = setInterval(() => setLeft(new Date(endsAt).getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, [endsAt]);

  const finishedRef = useRef(false);
  useEffect(() => {
    if (left <= 0 && !finishedRef.current) {
      finishedRef.current = true;
      finish();
    }
  }, [left, finish]);

  // Autospeichern nach kurzer Pause
  useEffect(() => {
    const t = setTimeout(() => startSave(() => save(q.id)), 800);
    return () => clearTimeout(t);
  }, [draft, q.id, save]);

  function go(i: number) {
    startSave(() => save(q.id));
    setIndex(Math.max(0, Math.min(questions.length - 1, i)));
    window.scrollTo({ top: 0 });
  }

  const answered = questions.filter((x) => drafts[x.id] && !isDraftEmpty(x, drafts[x.id])).length;
  const warn = left < 5 * 60_000;

  return (
    <div className="space-y-5">
      <div className="glass sticky top-14 z-20 -mx-4 flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:-mx-6 sm:px-6 lg:top-0 lg:-mx-10 lg:px-10">
        <span className={cx("flex items-center gap-2 font-mono text-[20px] font-semibold tabular-nums", warn && "text-danger")}>
          <Timer size={18} /> {fmt(left)}
        </span>
        <span className="text-[13px] text-fg-2">
          {answered}/{questions.length} bearbeitet {saving && "· speichert …"}
        </span>
        <Button size="sm" onClick={finish} disabled={finishing}>
          <Flag size={14} /> {finishing ? "Wird ausgewertet …" : "Abgeben"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((x, i) => {
          const has = drafts[x.id] && !isDraftEmpty(x, drafts[x.id]);
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => go(i)}
              className={cx(
                "h-8 w-8 rounded-lg text-[12px] font-semibold transition",
                i === index ? "bg-ink text-ink-fg" : has ? "bg-accent-soft text-accent" : "bg-fill text-fg-2 hover:bg-fill-strong",
              )}
              aria-label={`Aufgabe ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <Card className="p-5 sm:p-7">
        <QuestionView
          key={q.id}
          q={q}
          draft={draft}
          onDraft={(d) => {
            dirty.current.add(q.id);
            setDrafts((all) => ({ ...all, [q.id]: d }));
          }}
          locked={finishing}
          index={index}
          total={questions.length}
        />
      </Card>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => go(index - 1)} disabled={index === 0}>
          <ChevronLeft size={16} /> Zurück
        </Button>
        {index < questions.length - 1 ? (
          <Button onClick={() => go(index + 1)}>
            Weiter <ChevronRight size={16} />
          </Button>
        ) : (
          <Button onClick={finish} disabled={finishing}>
            <Flag size={15} /> Abgeben
          </Button>
        )}
      </div>
    </div>
  );
}
