"use client";

import { Check, LifeBuoy } from "lucide-react";
import { useActionState, useMemo, useState, useTransition } from "react";
import { changePasswordAction, deleteAccountAction, type FormState } from "@/app/actions/auth";
import { updateProfileAction } from "@/app/actions/onboarding";
import type { Phase } from "@/lib/domain/exam";
import type { PlanSettings } from "@/lib/services/planning";
import { PlanPreviewCard, Segmented, TargetGradePicker, TimeFields, usePlanPreview } from "./plan-settings";
import { Button, Card, cx, Label } from "./ui";

export type SettingsInitial = {
  name: string;
  phase: Phase;
  trainingStart: string;
  ap1Date: string;
  ap2Date: string;
  studyStart: string;
  targetGrade: number;
  rescueMode: boolean;
  rhythm: PlanSettings["rhythm"];
  minutesPerSession: number;
  weekdays: number[];
};

export function ProfileSettings({ initial, today }: { initial: SettingsInitial; today: string }) {
  const [v, setV] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = (patch: Partial<SettingsInitial>) => {
    setSaved(false);
    setV((x) => ({ ...x, ...patch }));
  };

  const studyStart = v.studyStart < today ? today : v.studyStart;
  const settings: PlanSettings = useMemo(
    () => ({
      phase: v.phase,
      studyStart,
      examDate: (v.phase === "AP1" ? v.ap1Date : v.ap2Date) || null,
      targetGrade: v.targetGrade,
      rescueMode: v.rescueMode,
      rhythm: v.rhythm,
      minutesPerSession: v.minutesPerSession,
      weekdays: v.weekdays,
    }),
    [v, studyStart],
  );
  const { preview, pending: previewPending } = usePlanPreview(settings);

  function save() {
    setError(null);
    start(async () => {
      try {
        await updateProfileAction({
          settings,
          name: v.name,
          trainingStart: v.trainingStart || null,
          ap1Date: v.ap1Date || null,
          ap2Date: v.ap2Date || null,
        });
        setSaved(true);
      } catch {
        setError("Speichern fehlgeschlagen – bitte Eingaben prüfen (z. B. Termin nach Lernstart).");
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card id="ziele" className="scroll-mt-20 space-y-6 p-5 sm:p-6">
        <h2 className="title-md">Prüfung &amp; Ziele</h2>
        <label className="block">
          <Label>Name</Label>
          <input className="input" value={v.name} onChange={(e) => set({ name: e.target.value })} />
        </label>
        <div>
          <Label>Aktueller Prüfungsteil</Label>
          <Segmented<Phase> value={v.phase} onChange={(phase) => set({ phase })} options={[{ value: "AP1", label: "AP1" }, { value: "AP2", label: "AP2" }]} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <Label>Termin AP1</Label>
            <input type="date" className="input" value={v.ap1Date} onChange={(e) => set({ ap1Date: e.target.value })} />
          </label>
          <label className="block">
            <Label>Termin AP2</Label>
            <input type="date" className="input" value={v.ap2Date} onChange={(e) => set({ ap2Date: e.target.value })} />
          </label>
          <label className="block">
            <Label hint="optional">Ausbildungsbeginn</Label>
            <input type="date" className="input" value={v.trainingStart} onChange={(e) => set({ trainingStart: e.target.value })} />
          </label>
          <label className="block">
            <Label>Lernstart</Label>
            <input type="date" className="input" value={studyStart} min={today} onChange={(e) => set({ studyStart: e.target.value })} />
          </label>
        </div>
        <div>
          <Label>Zielnote</Label>
          <TargetGradePicker value={v.targetGrade} onChange={(targetGrade) => set({ targetGrade })} />
        </div>
        <button
          type="button"
          onClick={() => set({ rescueMode: !v.rescueMode })}
          className={cx("flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition", v.rescueMode ? "border-warning bg-warning-soft" : "border-line hover:border-line-strong")}
          aria-pressed={v.rescueMode}
        >
          <LifeBuoy className="mt-0.5 shrink-0 text-warning" />
          <span className="flex-1">
            <span className="block font-medium">Rettungsmodus {v.rescueMode ? "an" : "aus"}</span>
            <span className="block text-[14px] text-fg-2">Nur Pflichtthemen mit den meisten Punkten, Ziel „sicher bestehen“ (Note 4). Ideal, wenn die Zeit knapp ist.</span>
          </span>
          <span className={cx("mt-1 h-6 w-10 shrink-0 rounded-full p-0.5 transition", v.rescueMode ? "bg-warning" : "bg-fill-strong")}>
            <span className={cx("block h-5 w-5 rounded-full bg-white shadow transition", v.rescueMode && "translate-x-4")} />
          </span>
        </button>
      </Card>

      <div id="plan" className="grid scroll-mt-20 gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card className="self-start p-5 sm:p-6">
          <h2 className="title-md mb-5">Lernzeit</h2>
          <TimeFields settings={settings} onChange={(p) => set(p as Partial<SettingsInitial>)} />
        </Card>
        <PlanPreviewCard
          preview={preview}
          pending={previewPending}
          current={settings}
          onApply={(rhythm, minutesPerSession) => set({ rhythm, minutesPerSession, weekdays: rhythm === "WEEKLY" && !v.weekdays.length ? [6] : v.weekdays })}
          onRescue={() => set({ rescueMode: true })}
        />
      </div>

      <div className="glass sticky bottom-20 z-10 flex items-center justify-end gap-3 rounded-2xl border border-line p-3 lg:bottom-4">
        {error && <p className="flex-1 text-[13px] text-danger">{error}</p>}
        {saved && (
          <p className="flex flex-1 items-center gap-1.5 text-[13px] text-success">
            <Check size={15} /> Gespeichert – dein Plan wurde neu berechnet.
          </p>
        )}
        <Button onClick={save} disabled={pending}>
          {pending ? "Speichert …" : "Speichern & Plan neu berechnen"}
        </Button>
      </div>
    </div>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePasswordAction, undefined);
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <Label>Aktuelles Passwort</Label>
          <input type="password" name="current" autoComplete="current-password" className="input" required />
          {state?.fieldErrors?.current && <p className="mt-1 text-[13px] text-danger">{state.fieldErrors.current}</p>}
        </label>
        <label className="block">
          <Label hint="mind. 8 Zeichen">Neues Passwort</Label>
          <input type="password" name="next" autoComplete="new-password" className="input" required minLength={8} />
          {state?.fieldErrors?.next && <p className="mt-1 text-[13px] text-danger">{state.fieldErrors.next}</p>}
        </label>
      </div>
      {state?.message && <p className="text-[13px] text-success">{state.message}</p>}
      <Button type="submit" variant="secondary" disabled={pending}>
        Passwort ändern
      </Button>
    </form>
  );
}

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(deleteAccountAction, undefined);
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <Button variant="danger" onClick={() => setOpen(true)}>
        Konto löschen …
      </Button>
    );
  }
  return (
    <form action={action} className="space-y-3">
      <p className="text-[14px] text-fg-2">Alle Daten (Fortschritt, Plan, Simulationen) werden endgültig gelöscht. Bestätige mit deinem Passwort.</p>
      <input type="password" name="password" autoComplete="current-password" className="input max-w-sm" placeholder="Passwort" required />
      {state?.fieldErrors?.password && <p className="text-[13px] text-danger">{state.fieldErrors.password}</p>}
      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Abbrechen
        </Button>
        <Button type="submit" variant="danger" disabled={pending}>
          Endgültig löschen
        </Button>
      </div>
    </form>
  );
}
