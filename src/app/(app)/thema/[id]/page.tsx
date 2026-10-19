import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Layers, ListChecks, Sparkles } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { LessonTimer } from "@/components/lesson-timer";
import { Badge, Card, ProgressBar } from "@/components/ui";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { EXAM_PARTS, type ExamPartId } from "@/lib/domain/exam";

export async function generateMetadata({ params }: PageProps<"/thema/[id]">): Promise<Metadata> {
  const { id } = await params;
  const t = await db.topic.findUnique({ where: { id }, select: { title: true } });
  return { title: t?.title ?? "Thema" };
}

const LABEL_TONE = { "Offizielle Prüfungsregel": "accent", "Offizieller Lehrplan": "success", Lernmaterial: "neutral" } as const;

export default async function TopicPage({ params, searchParams }: PageProps<"/thema/[id]">) {
  const { user } = await requireProfile();
  const { id } = await params;
  const { session } = await searchParams;
  const topic = await db.topic.findUnique({
    where: { id },
    include: {
      lesson: true,
      learningField: true,
      masteries: { where: { userId: user.id } },
      _count: { select: { questions: true, flashcards: true } },
    },
  });
  if (!topic || !topic.lesson) notFound();
  const sourceIds = (topic.lesson.sourceIds as string[]) ?? [];
  const sources = await db.source.findMany({ where: { id: { in: sourceIds } } });
  const keyPoints = (topic.lesson.keyPoints as string[]) ?? [];
  const mastery = topic.masteries[0]?.mastery ?? 0;
  const sessionParam = typeof session === "string" ? `&session=${session}` : "";
  const part = EXAM_PARTS[topic.examPartId as ExamPartId];

  return (
    <div className="mx-auto max-w-3xl">
      <LessonTimer />
      <Link href={typeof session === "string" ? `/session/${session}` : `/lernen/${topic.examPartId}`} className="mb-4 inline-flex items-center gap-1 text-[14px] text-fg-2 hover:text-fg">
        <ArrowLeft size={15} /> {typeof session === "string" ? "Zur Lerneinheit" : part.name}
      </Link>
      <div className="flex flex-wrap gap-2">
        <Badge tone="accent">{part.short}</Badge>
        {topic.learningField && <Badge>{topic.learningField.id} · {topic.learningField.title}</Badge>}
        {topic.mustKnow && <Badge tone="warning">Pflichtthema</Badge>}
      </div>
      <h1 className="title-xl mt-3">{topic.title}</h1>
      <p className="mt-2 text-[17px] text-fg-2">{topic.summary}</p>
      <div className="mt-4 flex items-center gap-3">
        <ProgressBar value={mastery} className="max-w-[200px]" tone={mastery >= 0.67 ? "success" : mastery >= 0.4 ? "warning" : "danger"} />
        <span className="text-[13px] text-fg-3">Dein Stand: {Math.round(mastery * 100)} %</span>
      </div>

      <Card className="mt-8 p-5 sm:p-6">
        <p className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
          <Sparkles size={16} className="text-accent" /> Das Wichtigste in Kürze
        </p>
        <ul className="space-y-2">
          {keyPoints.map((k) => (
            <li key={k} className="flex gap-2.5 text-[15px] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {k}
            </li>
          ))}
        </ul>
      </Card>

      <article className="mt-8">
        <Markdown source={topic.lesson.content} />
      </article>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <Link href={`/karteikarten?topic=${topic.id}${sessionParam}`} className="card flex items-center gap-4 p-5 transition hover:shadow-float">
          <Layers className="text-accent" />
          <div>
            <p className="font-semibold">Karteikarten</p>
            <p className="text-[13px] text-fg-2">{topic._count.flashcards} Karten</p>
          </div>
        </Link>
        <Link href={`/quiz?topic=${topic.id}${sessionParam}`} className="card flex items-center gap-4 p-5 transition hover:shadow-float">
          <ListChecks className="text-accent" />
          <div>
            <p className="font-semibold">Übungsaufgaben</p>
            <p className="text-[13px] text-fg-2">{topic._count.questions} Aufgaben mit Lösung</p>
          </div>
        </Link>
      </div>

      {sources.length > 0 && (
        <section className="mt-10">
          <p className="eyebrow mb-3">Quellen</p>
          <div className="space-y-2">
            {sources.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="card flex items-start gap-3 p-4 transition hover:shadow-float">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={LABEL_TONE[s.label as keyof typeof LABEL_TONE] ?? "neutral"}>{s.label}</Badge>
                    <span className="text-[12px] text-fg-3">{s.id}</span>
                  </div>
                  <p className="mt-1.5 text-[14px] font-medium">{s.name}</p>
                </div>
                <ExternalLink size={15} className="mt-1 shrink-0 text-fg-3" />
              </a>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-fg-3">Lektion: eigene Zusammenfassung (Lernmaterial), kein Volltext der Quellen. Bei Abweichungen gilt die offizielle Quelle.</p>
        </section>
      )}
    </div>
  );
}
