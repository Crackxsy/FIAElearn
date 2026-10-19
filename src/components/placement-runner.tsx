"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Gauge, LifeBuoy } from "lucide-react";
import { useState, useTransition } from "react";
import { finishPlacementAction, setRescueModeAction } from "@/app/actions/onboarding";
import { EXAM_PARTS, type ExamPartId } from "@/lib/domain/exam";
import type { PlacementResult } from "@/lib/domain/placement";
import type { ClientQuestion } from "@/lib/services/questions";
import { QuizRunner } from "./quiz-runner";
import { Button, buttonClass, Card, ProgressBar, Ring } from "./ui";

export function PlacementRunner({ questions, startedAt, rescueMode }: { questions: ClientQuestion[]; startedAt: string; rescueMode: boolean }) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<PlacementResult | null>(null);
  const [pending, start] = useTransition();

  if (!started) {
    return (
      <Card className="p-6 sm:p-8">
        <Gauge className="text-accent" size={28} />
        <h1 className="title-lg mt-4">Einstufungstest</h1>
        <p className="mt-2 text-fg-2">
          {questions.length} gemischte Aufgaben aus allen Bereichen deiner Prüfung. Du bekommst während des Tests kein Feedback – das kommt am Ende. Rate nicht wild:
          „Überspringen“ ist ehrlicher und macht deinen Plan genauer.
        </p>
        <ul className="mt-4 space-y-1 text-[14px] text-fg-2">
          <li>• Dauer: ca. {Math.round(questions.length * 0.9)}–{Math.round(questions.length * 1.4)} Minuten</li>
          <li>• Ergebnis: Wissensstand je Bereich und Thema</li>
          <li>• Falsch beantwortete Aufgaben landen in deiner Wiederholung</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="lg" onClick={() => setStarted(true)}>
            Test starten <ArrowRight size={16} />
          </Button>
          <Link href="/dashboard" className={buttonClass("ghost", "lg")}>
            Später
          </Link>
        </div>
      </Card>
    );
  }

  if (result) {
    const parts = Object.entries(result.perPart) as [ExamPartId, number][];
    return (
      <div className="animate-fade-up space-y-5">
        <Card className="flex flex-col items-center p-8 text-center">
          <Ring value={result.overall} size={128} stroke={11} tone={result.overall >= 0.67 ? "success" : result.overall >= 0.4 ? "warning" : "danger"}>
            <span className="font-[family-name:var(--font-display)] text-[32px] font-semibold">{Math.round(result.overall * 100)}%</span>
          </Ring>
          <p className="eyebrow mt-5">Dein Level</p>
          <p className="title-lg mt-1">{result.level}</p>
          <p className="mt-2 max-w-md text-fg-2">Dein Lernplan wurde mit diesem Ergebnis neu berechnet. Schwache Themen kommen zuerst dran.</p>
        </Card>
        <Card className="space-y-4 p-6">
          {parts.map(([id, v]) => (
            <div key={id}>
              <div className="mb-1.5 flex justify-between text-[14px]">
                <span className="font-medium">{EXAM_PARTS[id].short === "AP1" ? "AP1" : EXAM_PARTS[id].name}</span>
                <span className="tabular-nums text-fg-2">{Math.round(v * 100)} %</span>
              </div>
              <ProgressBar value={v} tone={v >= 0.67 ? "success" : v >= 0.4 ? "warning" : "danger"} />
            </div>
          ))}
        </Card>
        {result.recommendRescue && !rescueMode && (
          <Card className="flex flex-col gap-4 border-warning/40 bg-warning-soft p-5 sm:flex-row sm:items-center">
            <LifeBuoy className="shrink-0 text-warning" size={28} />
            <div className="flex-1">
              <p className="font-semibold">Wir empfehlen den Rettungsmodus</p>
              <p className="text-[14px] text-fg-2">Fokus auf Pflichtthemen mit vielen Punkten. Ziel: sicher bestehen. Du kannst ihn jederzeit wieder ausschalten.</p>
            </div>
            <Button
              disabled={pending}
              onClick={() =>
                start(async () => {
                  await setRescueModeAction(true);
                  router.push("/dashboard");
                })
              }
            >
              Aktivieren
            </Button>
          </Card>
        )}
        <div className="flex justify-end">
          <Link href="/dashboard" className={buttonClass("primary", "lg")}>
            Zu meinem Plan <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <QuizRunner
      questions={questions}
      context="placement"
      backHref="/dashboard"
      hideFeedback
      onComplete={async (results) => {
        const r = await finishPlacementAction(
          results.map((x) => x.questionId).concat(questions.filter((q) => !results.some((x) => x.questionId === q.id)).map((q) => q.id)),
          startedAt,
        );
        setResult(r);
      }}
    />
  );
}
