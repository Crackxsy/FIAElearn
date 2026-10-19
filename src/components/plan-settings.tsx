"use client";

import { AlertTriangle, CheckCircle2, Clock, LifeBuoy, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { previewPlanAction } from "@/app/actions/onboarding";
import type { PlanSettings } from "@/lib/services/planning";
import { RHYTHM_LABELS, type Rhythm } from "@/lib/domain/planner";
import { GRADE_LABELS, type Grade } from "@/lib/domain/grading";
import { EXAM_PARTS, type ExamPartId } from "@/lib/domain/exam";
import { Badge, Button, cx, Label } from "./ui";

export type Preview = Awaited<ReturnType<typeof previewPlanAction>>;

const WEEKDAYS = [
  { v: 1, l: "Mo" },
  { v: 2, l: "Di" },
  { v: 3, l: "Mi" },
  { v: 4, l: "Do" },
  { v: 5, l: "Fr" },
  { v: 6, l: "Sa" },
  { v: 0, l: "So" },
];

export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  className?: string;
}) {
  return (
    <div className={cx("flex w-full rounded-xl bg-fill p-1", className)} role="radiogroup">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cx(
            "flex-1 rounded-lg px-2 py-2 text-[13.5px] font-medium transition",
            value === o.value ? "bg-surface text-fg shadow-card" : "text-fg-2 hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function TargetGradePicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const hints: Record<number, string> = {
    1: "92+ Punkte – sehr viel Übung, alles muss sitzen",
    2: "81+ Punkte – solide in allen Bereichen",
    3: "67+ Punkte – gutes Grundverständnis",
    4: "50+ Punkte – sicher bestehen",
  };
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {[1, 2, 3, 4].map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onChange(g)}
          className={cx(
            "rounded-2xl border p-4 text-left transition",
            value === g ? "border-ink bg-surface shadow-card" : "border-line bg-surface-2 hover:border-line-strong",
          )}
        >
          <span className="block font-[family-name:var(--font-display)] text-[30px] leading-none font-semibold">{g}</span>
          <span className="mt-1 block text-[13px] font-medium">{GRADE_LABELS[g as Grade]}</span>
          <span className="mt-1 block text-[12px] leading-snug text-fg-3">{hints[g]}</span>
        </button>
      ))}
    </div>
  );
}

export function TimeFields({
  settings,
  onChange,
}: {
  settings: PlanSettings;
  onChange: (patch: Partial<PlanSettings>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Wie oft willst du lernen?</Label>
        <Segmented<Rhythm>
          value={settings.rhythm}
          onChange={(rhythm) => onChange({ rhythm, weekdays: rhythm === "WEEKLY" && !settings.weekdays.length ? [6] : settings.weekdays })}
          options={(Object.keys(RHYTHM_LABELS) as Rhythm[]).map((r) => ({ value: r, label: RHYTHM_LABELS[r] }))}
        />
      </div>
      {settings.rhythm === "WEEKLY" && (
        <div>
          <Label hint="mehrere möglich">An welchen Tagen?</Label>
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((d) => {
              const on = settings.weekdays.includes(d.v);
              return (
                <button
                  key={d.v}
                  type="button"
                  onClick={() => {
                    const next = on ? settings.weekdays.filter((x) => x !== d.v) : [...settings.weekdays, d.v];
                    onChange({ weekdays: next.length ? next : [d.v] });
                  }}
                  className={cx(
                    "h-10 w-12 rounded-xl text-[14px] font-medium transition",
                    on ? "bg-ink text-ink-fg" : "bg-fill text-fg-2 hover:bg-fill-strong",
                  )}
                  aria-pressed={on}
                >
                  {d.l}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div>
        <Label hint={`${settings.minutesPerSession} Minuten`}>Zeit pro Lerneinheit</Label>
        <input
          type="range"
          min={10}
          max={240}
          step={5}
          value={settings.minutesPerSession}
          onChange={(e) => onChange({ minutesPerSession: Number(e.target.value) })}
          className="w-full accent-[var(--accent)]"
          aria-label="Minuten pro Lerneinheit"
        />
        <div className="mt-1 flex justify-between text-[12px] text-fg-3">
          <span>10 Min.</span>
          <span>1 Std.</span>
          <span>2 Std.</span>
          <span>4 Std.</span>
        </div>
      </div>
    </div>
  );
}

/** Ruft die Planvorschau verzögert auf, sobald sich Einstellungen ändern. */
export function usePlanPreview(settings: PlanSettings, selfRatings?: Record<string, number>, enabled = true) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [pending, startTransition] = useTransition();
  const key = JSON.stringify([settings, selfRatings]);
  const latest = useRef(key);
  useEffect(() => {
    if (!enabled) return;
    latest.current = key;
    const t = setTimeout(() => {
      startTransition(async () => {
        const result = await previewPlanAction(settings, selfRatings);
        if (latest.current === key) setPreview(result);
      });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);
  return { preview, pending };
}

function hours(min: number) {
  const h = min / 60;
  return h >= 10 ? `${Math.round(h)} Std.` : `${(Math.round(h * 10) / 10).toLocaleString("de-DE")} Std.`;
}

export function PlanPreviewCard({
  preview,
  pending,
  current,
  onApply,
  onRescue,
}: {
  preview: Preview | null;
  pending: boolean;
  current: PlanSettings;
  onApply?: (rhythm: Rhythm, minutes: number) => void;
  onRescue?: () => void;
}) {
  if (!preview) {
    return <div className="card h-48 animate-pulse bg-surface-2" />;
  }
  if (preview.status === "vorbei") {
    return (
      <div className="card p-5">
        <p className="font-medium">Der Prüfungstermin liegt in der Vergangenheit oder vor dem Lernstart.</p>
        <p className="mt-1 text-[14px] text-fg-2">Bitte passe die Termine an.</p>
      </div>
    );
  }
  const status = {
    gut: { tone: "success" as const, icon: CheckCircle2, text: "Gut machbar" },
    knapp: { tone: "warning" as const, icon: Clock, text: "Knapp – plane etwas mehr Zeit ein" },
    kritisch: { tone: "danger" as const, icon: AlertTriangle, text: "Kritisch – die Zeit reicht so nicht" },
    offen: { tone: "neutral" as const, icon: Clock, text: "Ohne Termin: Plan für 8 Wochen" },
    vorbei: { tone: "neutral" as const, icon: Clock, text: "" },
  }[preview.status];
  const StatusIcon = status.icon;
  const ratio = preview.ratio ?? 0;

  return (
    <div className={cx("card p-5 transition sm:p-6", pending && "opacity-70")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone={status.tone}>
          <StatusIcon size={13} /> {status.text}
        </Badge>
        {preview.daysLeft != null && <span className="text-[13px] text-fg-2">noch {preview.daysLeft} Tage bis zur Prüfung</span>}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[13px] text-fg-2">Du brauchst ca.</p>
          <p className="font-[family-name:var(--font-display)] text-[28px] font-semibold tracking-tight">{hours(preview.requiredMinutes)}</p>
          <p className="text-[12px] text-fg-3">für Zielnote {current.rescueMode ? "4 (Rettung)" : current.targetGrade}</p>
        </div>
        <div>
          <p className="text-[13px] text-fg-2">Du hast eingeplant</p>
          <p className="font-[family-name:var(--font-display)] text-[28px] font-semibold tracking-tight">{hours(preview.availableMinutes)}</p>
          <p className="text-[12px] text-fg-3">{preview.sessionsCount} Lerneinheiten</p>
        </div>
      </div>

      {preview.ratio != null && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-fill-strong">
            <div
              className={cx("h-full rounded-full transition-[width] duration-500", ratio >= 1 ? "bg-success" : ratio >= 0.8 ? "bg-warning" : "bg-danger")}
              style={{ width: `${Math.min(1, ratio) * 100}%` }}
            />
          </div>
          <p className="mt-1.5 text-[12px] text-fg-3">{Math.round(ratio * 100)} % des Bedarfs abgedeckt</p>
        </div>
      )}

      <div className="mt-6">
        <p className="mb-2 flex items-center gap-1.5 text-[14px] font-medium">
          <Sparkles size={15} className="text-accent" /> Empfehlung für dich
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {preview.options.map((o) => {
            const recommended = preview.recommended?.rhythm === o.rhythm;
            const active = current.rhythm === o.rhythm && current.minutesPerSession === o.minutes;
            return (
              <button
                key={o.rhythm}
                type="button"
                disabled={!onApply}
                onClick={() => onApply?.(o.rhythm, Math.min(240, o.minutes))}
                className={cx(
                  "flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition",
                  active ? "border-ink" : recommended ? "border-accent/50 bg-accent-soft" : "border-line hover:border-line-strong",
                )}
              >
                <span>
                  <span className="block text-[14px] font-medium">
                    {o.label}
                    {o.rhythm === "WEEKLY" && current.weekdays.length > 1 ? ` (${current.weekdays.length}×/Woche)` : ""}
                  </span>
                  <span className="block text-[12px] text-fg-3">{o.verdict}</span>
                </span>
                <span className="text-right">
                  <span className="block font-semibold tabular-nums">{o.minutes > 240 ? `${hours(o.minutes)}` : `${o.minutes} Min.`}</span>
                  {recommended && <span className="block text-[11px] font-semibold text-accent">empfohlen</span>}
                </span>
              </button>
            );
          })}
        </div>
        {onApply && <p className="mt-2 text-[12px] text-fg-3">Tippe auf eine Option, um sie zu übernehmen.</p>}
      </div>

      {preview.droppedTopicIds.length > 0 && !current.rescueMode && (
        <p className="mt-4 rounded-xl bg-warning-soft px-3 py-2 text-[13px] text-warning">
          Mit dieser Zeit passen {preview.droppedTopicIds.length} weniger wichtige Themen nicht in den Plan. Wir priorisieren automatisch die Themen mit den meisten Punkten.
        </p>
      )}

      {preview.suggestRescue && onRescue && (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-warning/40 bg-warning-soft p-4 sm:flex-row sm:items-center">
          <LifeBuoy className="shrink-0 text-warning" />
          <p className="flex-1 text-[14px]">
            <strong>Rettungsmodus empfohlen.</strong> Konzentriere dich auf die Pflichtthemen mit den meisten Punkten, um sicher zu bestehen.
          </p>
          <Button type="button" size="sm" onClick={onRescue}>
            Aktivieren
          </Button>
        </div>
      )}

      {Object.keys(preview.requiredByPart).length > 1 && (
        <div className="mt-6 space-y-2">
          <p className="text-[13px] font-medium text-fg-2">Lernbedarf je Bereich</p>
          {(Object.entries(preview.requiredByPart) as [ExamPartId, number][]).map(([id, min]) => (
            <div key={id} className="flex items-center gap-3 text-[13px]">
              <span className="w-24 shrink-0 text-fg-2">{EXAM_PARTS[id].short}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-fill-strong">
                <div className="h-full rounded-full bg-ink" style={{ width: `${(min / Math.max(1, Math.max(...Object.values(preview.requiredByPart)))) * 100}%` }} />
              </div>
              <span className="w-16 text-right tabular-nums">{hours(min)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
