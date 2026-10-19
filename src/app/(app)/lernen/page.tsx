import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge, Card, PageHeader, Ring } from "@/components/ui";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { EXAM_PARTS, partsForPhase, type ExamPartId } from "@/lib/domain/exam";

export const metadata: Metadata = { title: "Lernen" };

export default async function LearnPage() {
  const { user, profile } = await requireProfile();
  const parts = await db.examPart.findMany({
    orderBy: { order: "asc" },
    include: { topics: { include: { masteries: { where: { userId: user.id } } } } },
  });
  const mine = partsForPhase(profile.phase as "AP1" | "AP2");
  const sorted = [...parts].sort((a, b) => Number(mine.includes(b.id as ExamPartId)) - Number(mine.includes(a.id as ExamPartId)) || a.order - b.order);

  return (
    <div>
      <PageHeader eyebrow="Lernpfad" title="Lernen" description="Alle Prüfungsbereiche nach FIAusbV 2020. Jedes Thema hat eine kurze Lektion, Karteikarten und Übungsaufgaben mit Lösungsweg." />
      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((p) => {
          const mastery = p.topics.length ? p.topics.reduce((s, t) => s + (t.masteries[0]?.mastery ?? 0), 0) / p.topics.length : 0;
          const isMine = mine.includes(p.id as ExamPartId);
          return (
            <Link key={p.id} href={`/lernen/${p.id}`} className="card group flex flex-col p-6 transition hover:shadow-float">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={isMine ? "accent" : "neutral"}>{EXAM_PARTS[p.id as ExamPartId].phase === "AP1" ? "Teil 1" : "Teil 2"}</Badge>
                    <Badge>{p.weightPercent} % der Note</Badge>
                  </div>
                  <p className="title-md mt-3">{p.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-fg-3">
                    <Clock size={13} /> {p.durationMin ? `${p.durationMin} Min. schriftlich` : "Projekt + Präsentation + Fachgespräch"} · {p.paragraph}
                  </p>
                </div>
                <Ring value={mastery} size={58} stroke={6} tone={mastery >= 0.67 ? "success" : mastery >= 0.4 ? "warning" : "danger"}>
                  <span className="text-[13px] font-semibold">{Math.round(mastery * 100)}%</span>
                </Ring>
              </div>
              <p className="mt-4 line-clamp-2 flex-1 text-[14px] text-fg-2">{p.description}</p>
              <p className="mt-4 flex items-center gap-1 text-[14px] font-medium text-accent">
                {p.topics.length} Themen <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </p>
            </Link>
          );
        })}
      </div>
      {!sorted.length && <Card className="p-6">Keine Inhalte gefunden. Bitte die Datenbank mit „npm run db:seed“ befüllen.</Card>}
    </div>
  );
}
