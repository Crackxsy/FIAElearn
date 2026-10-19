"use client";

import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, Gauge, GraduationCap, LifeBuoy, Target, Timer } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { saveOnboardingAction } from "@/app/actions/onboarding";
import { EXAM_PARTS, partsForPhase, type Phase } from "@/lib/domain/exam";
import { SELF_RATING_LABELS } from "@/lib/domain/mastery";
import type { PlanSettings } from "@/lib/services/planning";
import { PlanPreviewCard, Segmented, TargetGradePicker, TimeFields, usePlanPreview } from "./plan-settings";
import { Button, cx, Label, ProgressBar } from "./ui";

const STEPS = [
  { title: "Deine Prüfung", icon: GraduationCap },
  { title: "Zeitraum", icon: CalendarDays },
  { title: "Zielnote", icon: Target },
  { title: "Wissensstand", icon: Gauge },
  { title: "Lernzeit", icon: Timer },
];

const SIHK_TERMINE = "https://www.ihk.de/blueprint/servlet/haihk24/bildung/abschlusspruefungen/anmeldefristenabschlusspruefung-808126";

export function OnboardingWizard({ today, name }: { today: string; name: string }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("AP1");
  const [trainingStart, setTrainingStart] = useState<string>("");
  const [ap1Date, setAp1Date] = useState<string>("");
  const [ap2Date, setAp2Date] = useState<string>("");
  const [studyStart, setStudyStart] = useState<string>(today);
  const [targetGrade, setTargetGrade] = useState(2);
  const [rescueMode, setRescueMode] = useState(false);
  const [rhythm, setRhythm] = useState<PlanSettings["rhythm"]>("EVERY_2");
  const [minutesPerSession, setMinutes] = useState(45);
  const [weekdays, setWeekdays] = useState<number[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [saving, startSaving] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const parts = partsForPhase(phase);
  const examDate = phase === "AP1" ? ap1Date : ap2Date;

  const settings: PlanSettings = useMemo(
    () => ({
      phase,
      studyStart: studyStart || today,
      examDate: examDate || null,
      targetGrade,
      rescueMode,
      rhythm,
      minutesPerSession,
      weekdays,
    }),
    [phase, studyStart, today, examDate, targetGrade, rescueMode, rhythm, minutesPerSession, weekdays],
  );
  const effectiveRatings = useMemo(() => Object.fromEntries(parts.map((p) => [p, ratings[p] ?? 0])), [parts, ratings]);
  const { preview, pending } = usePlanPreview(settings, effectiveRatings, step >= 4);

  const lowKnowledge = parts.every((p) => (ratings[p] ?? 0) <= 1);

  const canNext =
    (step === 0 && !!phase) ||
    (step === 1 && !!studyStart && (!examDate || examDate > studyStart)) ||
    step === 2 ||
    (step === 3 && parts.every((p) => ratings[p] != null)) ||
    step === 4;

  function finish(takePlacement: boolean) {
    setError(null);
    startSaving(async () => {
      try {
        await saveOnboardingAction({
          settings,
          trainingStart: trainingStart || null,
          ap1Date: ap1Date || null,
          ap2Date: ap2Date || null,
          selfRatings: effectiveRatings,
          takePlacement,
        });
      } catch (e) {
        if (e && typeof e === "object" && "digest" in e && String((e as { digest: string }).digest).startsWith("NEXT_REDIRECT")) throw e;
        setError("Speichern hat nicht geklappt. Bitte prüfe deine Angaben.");
      }
    });
  }

  return (
    <div className="pt-6">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-[13px] text-fg-2">
          <span>
            Schritt {step + 1} von {STEPS.length + 1}
          </span>
          <span>{step < STEPS.length ? STEPS[step].title : "Los geht’s"}</span>
        </div>
        <ProgressBar value={(step + 1) / (STEPS.length + 1)} tone="ink" />
      </div>

      <div key={step} className="animate-fade-up">
        {step === 0 && (
          <section>
            <h1 className="title-xl">Hi {name}! Wofür lernst du gerade?</h1>
            <p className="mt-2 text-[16px] text-fg-2">Wir richten deinen Plan genau auf diesen Prüfungsteil aus. Du kannst später jederzeit wechseln.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {(["AP1", "AP2"] as Phase[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPhase(p)}
                  className={cx("card p-6 text-left transition", phase === p ? "ring-2 ring-ink" : "hover:shadow-float")}
                >
                  <p className="font-[family-name:var(--font-display)] text-[32px] font-semibold">{p}</p>
                  <p className="mt-1 font-medium">{p === "AP1" ? "Teil 1 – IT-Arbeitsplatz einrichten" : "Teil 2 – Projekt, Software, Algorithmen, WiSo"}</p>
                  <p className="mt-2 text-[14px] text-fg-2">
                    {p === "AP1" ? "90 Min. schriftlich · 20 % der Gesamtnote · meist nach ca. 1,5 Jahren" : "4 Bereiche · 80 % der Gesamtnote · am Ende der Ausbildung"}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <h1 className="title-xl">Wann ist deine Prüfung?</h1>
            <p className="mt-2 text-[16px] text-fg-2">
              Den Termin legt die SIHK zu Hagen fest. Wir übernehmen ihn nicht automatisch – bitte trage den Termin aus deiner Einladung bzw. von der SIHK-Seite ein.
            </p>
            <a href={SIHK_TERMINE} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-accent">
              SIHK: Prüfungstermine &amp; Anmeldefristen <ExternalLink size={14} />
            </a>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <Label hint={phase === "AP1" ? "dein Ziel" : "optional"}>Termin AP1 (schriftlich)</Label>
                <input type="date" className="input" value={ap1Date} min={phase === "AP1" ? today : undefined} onChange={(e) => setAp1Date(e.target.value)} />
              </label>
              <label className="block">
                <Label hint={phase === "AP2" ? "dein Ziel" : "optional"}>Termin AP2 (schriftlich)</Label>
                <input type="date" className="input" value={ap2Date} min={phase === "AP2" ? today : undefined} onChange={(e) => setAp2Date(e.target.value)} />
              </label>
              <label className="block">
                <Label hint="optional">Beginn der Ausbildung</Label>
                <input type="date" className="input" value={trainingStart} onChange={(e) => setTrainingStart(e.target.value)} />
              </label>
              <label className="block">
                <Label>Ab wann willst du lernen?</Label>
                <input type="date" className="input" value={studyStart} min={today} onChange={(e) => setStudyStart(e.target.value)} />
              </label>
            </div>
            {!examDate && (
              <p className="mt-4 rounded-xl bg-fill px-3 py-2 text-[13px] text-fg-2">
                Noch kein Termin? Kein Problem – wir planen erst einmal 8 Wochen und du trägst den Termin später in den Einstellungen nach.
              </p>
            )}
            {examDate && studyStart && examDate <= studyStart && (
              <p className="mt-4 rounded-xl bg-danger-soft px-3 py-2 text-[13px] text-danger">Der Lernstart muss vor dem Prüfungstermin liegen.</p>
            )}
          </section>
        )}

        {step === 2 && (
          <section>
            <h1 className="title-xl">Welche Note willst du ungefähr?</h1>
            <p className="mt-2 text-[16px] text-fg-2">Je besser die Zielnote, desto sicherer muss jedes Thema sitzen – und desto mehr Zeit planen wir ein.</p>
            <div className="mt-8">
              <TargetGradePicker value={targetGrade} onChange={setTargetGrade} />
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h1 className="title-xl">Wie fit bist du schon?</h1>
            <p className="mt-2 text-[16px] text-fg-2">Ehrlich sein lohnt sich – danach kannst du das mit einem kurzen Einstufungstest bestätigen.</p>
            <div className="mt-8 space-y-4">
              {parts.map((p) => (
                <div key={p} className="card p-4 sm:p-5">
                  <p className="font-medium">{EXAM_PARTS[p].short === "AP1" ? "AP1 – IT-Arbeitsplatz" : EXAM_PARTS[p].name}</p>
                  <Segmented<number>
                    className="mt-3"
                    value={ratings[p] ?? -1}
                    onChange={(v) => setRatings((r) => ({ ...r, [p]: v }))}
                    options={SELF_RATING_LABELS.map((label, i) => ({ value: i, label }))}
                  />
                </div>
              ))}
            </div>
            {lowKnowledge && parts.every((p) => ratings[p] != null) && (
              <button
                type="button"
                onClick={() => setRescueMode((v) => !v)}
                className={cx(
                  "mt-5 flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
                  rescueMode ? "border-warning bg-warning-soft" : "border-line hover:border-line-strong",
                )}
              >
                <LifeBuoy className="mt-0.5 shrink-0 text-warning" />
                <span>
                  <span className="block font-medium">Rettungsmodus {rescueMode ? "aktiv" : "aktivieren?"}</span>
                  <span className="block text-[14px] text-fg-2">
                    Fast nichts gelernt? Kein Drama. Wir konzentrieren uns auf die Pflichtthemen mit den meisten Punkten – Ziel: sicher bestehen.
                  </span>
                </span>
              </button>
            )}
          </section>
        )}

        {step === 4 && (
          <section>
            <h1 className="title-xl">Wie viel Zeit hast du?</h1>
            <p className="mt-2 text-[16px] text-fg-2">Wir rechnen live aus, ob das für deine Zielnote reicht – und empfehlen dir einen Rhythmus.</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <div className="card self-start p-5">
                <TimeFields
                  settings={settings}
                  onChange={(p) => {
                    if (p.rhythm) setRhythm(p.rhythm);
                    if (p.minutesPerSession) setMinutes(p.minutesPerSession);
                    if (p.weekdays) setWeekdays(p.weekdays);
                  }}
                />
              </div>
              <PlanPreviewCard
                preview={preview}
                pending={pending}
                current={settings}
                onApply={(r, m) => {
                  setRhythm(r);
                  setMinutes(m);
                  if (r === "WEEKLY" && !weekdays.length) setWeekdays([6]);
                }}
                onRescue={() => setRescueMode(true)}
              />
            </div>
          </section>
        )}

        {step === 5 && (
          <section>
            <h1 className="title-xl">Fast geschafft!</h1>
            <p className="mt-2 text-[16px] text-fg-2">
              Willst du einen kurzen Einstufungstest machen (ca. 15–20 Minuten)? Dann startet dein Plan genau bei deinem echten Wissensstand.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button type="button" disabled={saving} onClick={() => finish(true)} className="card p-6 text-left transition hover:shadow-float disabled:opacity-50">
                <Gauge className="text-accent" />
                <p className="mt-3 text-[18px] font-semibold">Einstufungstest machen</p>
                <p className="mt-1 text-[14px] text-fg-2">Empfohlen. Gemischte Fragen aus allen Bereichen, danach passt sich der Plan an.</p>
              </button>
              <button type="button" disabled={saving} onClick={() => finish(false)} className="card p-6 text-left transition hover:shadow-float disabled:opacity-50">
                <ArrowRight />
                <p className="mt-3 text-[18px] font-semibold">Direkt loslegen</p>
                <p className="mt-1 text-[14px] text-fg-2">Wir nutzen deine Selbsteinschätzung. Den Test kannst du später nachholen.</p>
              </button>
            </div>
            {saving && <p className="mt-4 text-[14px] text-fg-2">Dein Lernplan wird erstellt …</p>}
            {error && <p className="mt-4 rounded-xl bg-danger-soft px-3 py-2 text-[14px] text-danger">{error}</p>}
          </section>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || saving}>
          <ArrowLeft size={16} /> Zurück
        </Button>
        {step < 5 && (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
            Weiter <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
