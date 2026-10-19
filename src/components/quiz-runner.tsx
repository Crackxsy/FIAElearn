"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, RotateCcw, SkipForward, Trophy, XCircle } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { revealModelAction, setSessionStatusAction, submitAnswerAction } from "@/app/actions/learning";
import type { ClientQuestion } from "@/lib/services/questions";
import type { Feedback } from "@/lib/services/progress";
import type { AttemptContext } from "@/lib/services/progress";
import { draftToAnswer, emptyDraft, FeedbackPanel, isDraftEmpty, QuestionView, SelfAssess, type DraftAnswer } from "./question";
import { Button, buttonClass, Card, cx, ProgressBar, Ring } from "./ui";

type Result = { questionId: string; score: number; correct: boolean; skipped?: boolean };

export function QuizRunner({
  questions,
  context,
  backHref,
  backLabel = "Zurück",
  sessionId,
  onComplete,
  hideFeedback = false,
  finishLabel,
  timerSeconds,
}: {
  questions: ClientQuestion[];
  context: AttemptContext;
  backHref: string;
  backLabel?: string;
  sessionId?: string;
  onComplete?: (results: Result[]) => void | Promise<void>;
  hideFeedback?: boolean;
  finishLabel?: string;
  /** Sprechzeit-Timer (Fachgespräch-Training) */
  timerSeconds?: number;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<DraftAnswer>(emptyDraft());
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);

  const q = questions[index];

  useEffect(() => {
    startedAt.current = Date.now();
  }, [index]);

  function next(result?: Result) {
    const all = result ? [...results, result] : results;
    if (result) setResults(all);
    setFeedback(null);
    setModel(null);
    setDraft(emptyDraft());
    setError(null);
    if (index + 1 >= questions.length) {
      setDone(true);
      if (onComplete) start(async () => void (await onComplete(all)));
      if (sessionId) start(async () => void (await setSessionStatusAction(sessionId, "done")));
    } else {
      setIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function submit(selfRating?: "full" | "partial" | "none") {
    if (!q) return;
    setError(null);
    start(async () => {
      try {
        const fb = await submitAnswerAction({
          questionId: q.id,
          answer: draftToAnswer(q, draft, selfRating),
          context,
          durationMs: Date.now() - startedAt.current,
        });
        const result = { questionId: q.id, score: fb.score, correct: fb.correct };
        if (hideFeedback || q.type === "open") next(result);
        else {
          setFeedback(fb);
          setResults((r) => [...r, result]);
        }
      } catch {
        setError("Antwort konnte nicht gespeichert werden. Bitte erneut versuchen.");
      }
    });
  }

  function reveal() {
    start(async () => {
      const r = await revealModelAction(q.id);
      setModel(r?.model ?? "");
    });
  }

  // Enter = prüfen / weiter
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Enter" || e.shiftKey || pending || done) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA") return;
      if (feedback) {
        e.preventDefault();
        next();
      } else if (q && q.type !== "open" && !isDraftEmpty(q, draft)) {
        e.preventDefault();
        submit();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!questions.length) {
    return (
      <Card className="p-8 text-center">
        <p className="title-md">Keine Aufgaben gefunden</p>
        <p className="mt-2 text-fg-2">Für diese Auswahl gibt es gerade nichts zu tun.</p>
        <Link href={backHref} className={buttonClass("primary", "md", "mt-6")}>
          {backLabel}
        </Link>
      </Card>
    );
  }

  if (done) {
    const answered = results.filter((r) => !r.skipped);
    const score = answered.length ? answered.reduce((s, r) => s + r.score, 0) / answered.length : 0;
    const correct = answered.filter((r) => r.correct).length;
    if (hideFeedback) {
      return (
        <Card className="p-8 text-center">
          <p className="title-md">{pending ? "Wird ausgewertet …" : "Fertig!"}</p>
        </Card>
      );
    }
    return (
      <div className="animate-fade-up space-y-6">
        <Card className="flex flex-col items-center p-8 text-center">
          <Ring value={score} size={120} stroke={10} tone={score >= 0.8 ? "success" : score >= 0.5 ? "warning" : "danger"}>
            <span className="font-[family-name:var(--font-display)] text-[30px] font-semibold">{Math.round(score * 100)}%</span>
          </Ring>
          <p className="title-lg mt-5">{score >= 0.8 ? "Stark!" : score >= 0.5 ? "Gut dabei!" : "Dranbleiben!"}</p>
          <p className="mt-1 text-fg-2">
            {correct} von {answered.length} richtig · Fehler kommen automatisch in deine Wiederholung.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="secondary" onClick={() => router.refresh()}>
              <RotateCcw size={16} /> Neue Runde
            </Button>
            <Link href={backHref} className={buttonClass("primary")}>
              {finishLabel ?? backLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </Card>
        <Card className="divide-y divide-line">
          {questions.map((qq, i) => {
            const r = results.find((x) => x.questionId === qq.id);
            return (
              <div key={qq.id} className="flex items-start gap-3 px-5 py-3">
                {r?.skipped || !r ? (
                  <SkipForward size={18} className="mt-0.5 shrink-0 text-fg-3" />
                ) : r.correct ? (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                ) : (
                  <XCircle size={18} className="mt-0.5 shrink-0 text-danger" />
                )}
                <p className="text-[14px] leading-snug">
                  <span className="text-fg-3">{i + 1}. </span>
                  {qq.prompt}
                </p>
              </div>
            );
          })}
        </Card>
      </div>
    );
  }

  const answeredCorrect = results.filter((r) => r.correct).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <ProgressBar value={(index + (feedback ? 1 : 0)) / questions.length} tone="ink" />
        {!hideFeedback && (
          <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-fg-2">
            <Trophy size={14} /> {answeredCorrect}
          </span>
        )}
      </div>

      {timerSeconds && model == null && <SpeakTimer key={q.id} seconds={timerSeconds} />}
      <Card className="p-5 sm:p-7">
        <QuestionView key={q.id} q={q} draft={draft} onDraft={setDraft} locked={!!feedback || model != null || pending} feedback={feedback} index={index} total={questions.length} />
      </Card>

      {feedback && <FeedbackPanel feedback={feedback} type={q.type} />}
      {model != null && <SelfAssess model={model} onRate={(r) => submit(r)} disabled={pending} />}
      {error && <p className="rounded-xl bg-danger-soft px-3 py-2 text-[14px] text-danger">{error}</p>}

      <div className={cx("flex items-center justify-between gap-3", feedback && "sticky bottom-20 lg:bottom-4")}>
        {!feedback && model == null ? (
          <Button variant="ghost" onClick={() => next({ questionId: q.id, score: 0, correct: false, skipped: true })} disabled={pending}>
            <SkipForward size={16} /> Überspringen
          </Button>
        ) : (
          <span />
        )}
        {feedback ? (
          <Button size="lg" onClick={() => next()} className="shadow-float">
            {index + 1 >= questions.length ? "Auswertung" : "Weiter"} <ArrowRight size={16} />
          </Button>
        ) : q.type === "open" ? (
          model == null && (
            <Button size="lg" onClick={reveal} disabled={pending}>
              <Eye size={16} /> Musterlösung zeigen
            </Button>
          )
        ) : (
          <Button size="lg" onClick={() => submit()} disabled={pending || isDraftEmpty(q, draft)}>
            {pending ? "Prüfe …" : hideFeedback ? "Antwort speichern" : "Prüfen"}
          </Button>
        )}
      </div>
    </div>
  );
}

function SpeakTimer({ seconds }: { seconds: number }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  const over = elapsed > seconds;
  return (
    <Card className="flex items-center gap-4 p-4">
      <Ring value={Math.min(1, elapsed / seconds)} size={52} stroke={5} tone={over ? "danger" : "accent"}>
        <span className="text-[12px] font-semibold tabular-nums">
          {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
        </span>
      </Ring>
      <p className="flex-1 text-[14px] text-fg-2">
        {over ? "Zeit um – im Fachgespräch kurz und präzise bleiben!" : `Antworte laut, als säßest du vor dem Prüfungsausschuss (Ziel: unter ${Math.round(seconds / 60)} Min.).`}
      </p>
      <Button size="sm" variant={running ? "secondary" : "primary"} onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : elapsed ? "Weiter" : "Start"}
      </Button>
    </Card>
  );
}
