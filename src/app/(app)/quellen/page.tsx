import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Badge, Card, PageHeader, SectionTitle } from "@/components/ui";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { EXAM_PARTS, type ExamPartId } from "@/lib/domain/exam";

export const metadata: Metadata = { title: "Quellen & Regeln" };

const GROUPS = ["Offizielle Prüfungsregel", "Offizieller Lehrplan", "Lernmaterial"] as const;
const TONE = { "Offizielle Prüfungsregel": "accent", "Offizieller Lehrplan": "success", Lernmaterial: "neutral" } as const;

export default async function SourcesPage() {
  await requireProfile();
  const [sources, parts, fields] = await Promise.all([
    db.source.findMany({ orderBy: { id: "asc" } }),
    db.examPart.findMany({ orderBy: { order: "asc" } }),
    db.learningField.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="Transparenz"
        title="Quellen & Prüfungsregeln"
        description="Grundlage ist die FIAusbV 2020 (bundesweit). Die SIHK zu Hagen regelt lokale Abläufe wie Termine, Projektantrag und Dokumentationsvorgaben – diese bitte immer tagesaktuell dort prüfen."
      />

      <Card className="mb-8 p-5 text-[14px] leading-relaxed text-fg-2">
        <p>
          <strong className="text-fg">Wichtig:</strong> Alle Aufgaben in FIAElearn sind <strong className="text-fg">eigene Übungsaufgaben</strong> – keine Original-IHK-Prüfungen, keine
          Inhalte aus kostenpflichtigen Prüfungskatalogen. Originalprüfungen gibt es legal z. B. beim u-form Verlag. Die Notenprognose ist eine Schätzung aus deinem Übungsstand,
          keine offizielle Bewertung. Prüfungstermine werden nicht automatisch übernommen.
        </p>
      </Card>

      <section className="mb-10">
        <SectionTitle>Prüfungsaufbau (FIAusbV §§ 8–17)</SectionTitle>
        <Card className="divide-y divide-line">
          {parts.map((p) => (
            <div key={p.id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="w-48 shrink-0">
                <p className="font-semibold">{EXAM_PARTS[p.id as ExamPartId].phase === "AP1" ? "Teil 1" : "Teil 2"} · {p.short}</p>
                <p className="text-[12px] text-fg-3">
                  {p.paragraph} · {p.weightPercent} %
                </p>
              </div>
              <p className="text-[14px] text-fg-2">{p.description}</p>
            </div>
          ))}
          <div className="px-5 py-4 text-[14px] text-fg-2">
            <strong className="text-fg">Bestehen (§ 16):</strong> Gesamtergebnis und Ergebnis von Teil 2 mindestens „ausreichend“, in mindestens drei der vier Bereiche von Teil 2
            mindestens „ausreichend“, in keinem Bereich von Teil 2 „ungenügend“. <strong className="text-fg">Mündliche Ergänzungsprüfung (§ 17)</strong> unter Voraussetzungen möglich
            für Software, Algorithmen oder WiSo – nicht für das Projekt.
          </div>
        </Card>
      </section>

      <section className="mb-10">
        <SectionTitle>Lernfelder (KMK-Rahmenlehrplan)</SectionTitle>
        <Card className="divide-y divide-line">
          {fields.map((f) => (
            <div key={f.id} className="flex gap-4 px-5 py-3">
              <span className="w-12 shrink-0 font-mono text-[13px] font-semibold">{f.id}</span>
              <div>
                <p className="text-[14px] font-medium">{f.title}</p>
                <p className="text-[12px] text-fg-3">
                  {f.description} · {f.examHint}
                </p>
              </div>
            </div>
          ))}
        </Card>
        <p className="mt-2 text-[12px] text-fg-3">LF1–LF6 werden vor AP1 unterrichtet. Lernfelder sind keine 1:1-Gliederung des Prüfungskatalogs.</p>
      </section>

      {GROUPS.map((g) => (
        <section key={g} className="mb-10">
          <SectionTitle>{g}</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {sources
              .filter((s) => s.label === g)
              .map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="card flex flex-col p-5 transition hover:shadow-float">
                  <div className="flex items-center gap-2">
                    <Badge tone={TONE[g]}>{s.id}</Badge>
                    <Badge>{s.priority}</Badge>
                    <ExternalLink size={14} className="ml-auto text-fg-3" />
                  </div>
                  <p className="mt-3 font-medium">{s.name}</p>
                  <p className="mt-1 flex-1 text-[13px] text-fg-2">{s.use}</p>
                  <p className="mt-2 text-[11px] text-fg-3">Zugang: {s.access}</p>
                </a>
              ))}
          </div>
        </section>
      ))}
      <p className="text-[12px] text-fg-3">Recherchestand der Quellenliste: 19.10.2026. Bei Widersprüchen gilt die jeweils aktuelle offizielle Quelle.</p>
    </div>
  );
}
