import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, MessagesSquare } from "lucide-react";
import { Badge, Card, PageHeader, SectionTitle } from "@/components/ui";
import { StartSimulationButton } from "@/components/start-simulation-button";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { formatDay, toDay } from "@/lib/domain/dates";
import { EXAM_PARTS, partsForPhase, WRITTEN_PARTS, type ExamPartId, type Phase } from "@/lib/domain/exam";
import { GRADE_LABELS, type Grade } from "@/lib/domain/grading";

export const metadata: Metadata = { title: "Prüfung simulieren" };

export default async function SimulationsPage() {
  const { user, profile } = await requireProfile();
  const mine = partsForPhase(profile.phase as Phase);
  const parts = [...WRITTEN_PARTS].sort((a, b) => Number(mine.includes(b)) - Number(mine.includes(a)));
  const history = await db.examSimulation.findMany({ where: { userId: user.id }, orderBy: { startedAt: "desc" }, take: 20 });

  return (
    <div>
      <PageHeader
        eyebrow="Unter Prüfungsbedingungen"
        title="Prüfung simulieren"
        description="Echte Zeitvorgabe, kein Feedback bis zur Abgabe, Auswertung nach dem 100-Punkte-Schlüssel der IHK. Die Aufgaben sind eigene Übungsaufgaben – das Format der echten Prüfung kann abweichen."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {parts.map((p) => {
          const meta = EXAM_PARTS[p];
          return (
            <Card key={p} className="flex flex-col p-6">
              <div className="flex flex-wrap gap-2">
                <Badge tone={mine.includes(p) ? "accent" : "neutral"}>{meta.phase === "AP1" ? "Teil 1" : "Teil 2"}</Badge>
                <Badge>
                  <Clock size={12} /> {meta.durationMin} Min.
                </Badge>
              </div>
              <p className="title-md mt-3 flex-1">{meta.name}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <StartSimulationButton part={p} label="Volle Simulation" />
                <StartSimulationButton part={p} minutes={30} label="30-Min.-Sprint" variant="secondary" />
              </div>
            </Card>
          );
        })}
        <Link href="/fachgespraech" className="card flex flex-col p-6 transition hover:shadow-float">
          <Badge tone="accent">Teil 2 · Projekt</Badge>
          <p className="title-md mt-3 flex-1">Präsentation &amp; Fachgespräch</p>
          <p className="mt-2 text-[14px] text-fg-2">Kein schriftlicher Teil – trainiere stattdessen typische Fachgesprächsfragen mit Timer.</p>
          <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-accent">
            <MessagesSquare size={15} /> Zum Training <ArrowRight size={14} />
          </span>
        </Link>
      </div>

      <div className="mt-10">
        <SectionTitle>Bisherige Simulationen</SectionTitle>
        {history.length ? (
          <Card className="divide-y divide-line">
            {history.map((s) => (
              <Link key={s.id} href={`/simulation/${s.id}`} className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-fill">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{EXAM_PARTS[s.examPartId as ExamPartId].name}</p>
                  <p className="text-[12px] text-fg-3">{formatDay(toDay(s.startedAt), { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                {s.finishedAt ? (
                  <div className="text-right">
                    <p className="font-semibold tabular-nums">{Math.round(s.scorePct ?? 0)} Punkte</p>
                    <p className="text-[12px] text-fg-3">{s.grade ? `Note ${s.grade} · ${GRADE_LABELS[s.grade as Grade]}` : "Freitext noch bewerten"}</p>
                  </div>
                ) : (
                  <Badge tone="warning">läuft</Badge>
                )}
              </Link>
            ))}
          </Card>
        ) : (
          <Card className="p-6 text-[14px] text-fg-2">Noch keine Simulation gemacht. Tipp: In den letzten zwei Wochen vor der Prüfung plant dein Lernplan Simulationen automatisch ein.</Card>
        )}
      </div>
    </div>
  );
}
