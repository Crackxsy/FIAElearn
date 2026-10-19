import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Layers, ListChecks, Star } from "lucide-react";
import { Badge, buttonClass, Card, PageHeader, ProgressBar } from "@/components/ui";
import { StartSimulationButton } from "@/components/start-simulation-button";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { isExamPartId, WRITTEN_PARTS } from "@/lib/domain/exam";

export const metadata: Metadata = { title: "Prüfungsbereich" };

export default async function PartPage({ params }: PageProps<"/lernen/[part]">) {
  const { user } = await requireProfile();
  const { part } = await params;
  if (!isExamPartId(part)) notFound();
  const examPart = await db.examPart.findUnique({
    where: { id: part },
    include: {
      topics: {
        orderBy: { order: "asc" },
        include: { masteries: { where: { userId: user.id } }, learningField: true, _count: { select: { questions: true, flashcards: true } } },
      },
    },
  });
  if (!examPart) notFound();

  return (
    <div>
      <Link href="/lernen" className="mb-4 inline-flex items-center gap-1 text-[14px] text-fg-2 hover:text-fg">
        <ArrowLeft size={15} /> Alle Bereiche
      </Link>
      <PageHeader
        eyebrow={`${examPart.paragraph} · ${examPart.weightPercent} % der Gesamtnote`}
        title={examPart.name}
        description={examPart.description}
        actions={
          <>
            <Link href={`/quiz?part=${examPart.id}`} className={buttonClass("secondary")}>
              <ListChecks size={16} /> Bereichs-Quiz
            </Link>
            {WRITTEN_PARTS.includes(part) && <StartSimulationButton part={part} label="Simulation" />}
            {part === "AP2_PROJEKT" && (
              <Link href="/fachgespraech" className={buttonClass("primary")}>
                Fachgespräch üben
              </Link>
            )}
          </>
        }
      />
      <div className="space-y-3">
        {examPart.topics.map((t) => {
          const m = t.masteries[0];
          const mastery = m?.mastery ?? 0;
          return (
            <Card key={t.id} className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href={`/thema/${t.id}`} className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {t.learningField && <Badge>{t.learningField.id}</Badge>}
                    {t.mustKnow && <Badge tone="warning">Pflichtthema</Badge>}
                    <span className="flex items-center gap-0.5 text-fg-3" title={`Prüfungsrelevanz ${t.weight}/5`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={11} fill={i < t.weight ? "currentColor" : "none"} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-[17px] font-semibold">{t.title}</p>
                  <p className="mt-0.5 text-[14px] text-fg-2">{t.summary}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar value={mastery} tone={mastery >= 0.67 ? "success" : mastery >= 0.4 ? "warning" : "danger"} className="max-w-xs" />
                    <span className="text-[12px] text-fg-3 tabular-nums">{Math.round(mastery * 100)} %</span>
                  </div>
                </Link>
                <div className="flex shrink-0 gap-2">
                  <Link href={`/thema/${t.id}`} className={buttonClass("ghost", "sm")} aria-label="Lektion">
                    <BookOpen size={15} /> Lektion
                  </Link>
                  <Link href={`/karteikarten?topic=${t.id}`} className={buttonClass("ghost", "sm")}>
                    <Layers size={15} /> {t._count.flashcards}
                  </Link>
                  <Link href={`/quiz?topic=${t.id}`} className={buttonClass("secondary", "sm")}>
                    <ListChecks size={15} /> {t._count.questions}
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
