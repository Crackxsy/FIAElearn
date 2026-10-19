import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Layers, ListChecks, MessagesSquare, RotateCcw, Target } from "lucide-react";
import { Badge, buttonClass, Card, PageHeader } from "@/components/ui";
import { SessionStatusButtons } from "@/components/session-actions";
import { SESSION_KIND } from "@/components/session-meta";
import { StartSimulationButton } from "@/components/start-simulation-button";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { formatDay, toDay } from "@/lib/domain/dates";
import { EXAM_PARTS, WRITTEN_PARTS, type ExamPartId } from "@/lib/domain/exam";

export const metadata: Metadata = { title: "Lerneinheit" };

function Step({ n, icon: Icon, title, text, href, cta }: { n: number; icon: typeof BookOpen; title: string; text: string; href: string; cta: string }) {
  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4 sm:flex-1">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-fill">
          <Icon size={20} />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-ink-fg">{n}</span>
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-[14px] text-fg-2">{text}</p>
        </div>
      </div>
      <Link href={href} className={buttonClass("primary", "md")}>
        {cta}
      </Link>
    </Card>
  );
}

export default async function SessionPage({ params }: PageProps<"/session/[id]">) {
  const { user } = await requireProfile();
  const { id } = await params;
  const session = await db.studySession.findFirst({ where: { id, userId: user.id } });
  if (!session) notFound();

  const topicIds = (session.topicIds as string[]) ?? [];
  const topics = await db.topic.findMany({ where: { id: { in: topicIds } }, include: { _count: { select: { flashcards: true, questions: true } } } });
  const meta = SESSION_KIND[session.kind] ?? SESSION_KIND.learn;
  const perTopicMinutes = session.minutes / Math.max(1, topics.length);
  const quizCount = (m: number) => Math.max(4, Math.min(15, Math.round(m / 4)));
  let n = 0;

  return (
    <div>
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1 text-[14px] text-fg-2 hover:text-fg">
        <ArrowLeft size={15} /> Übersicht
      </Link>
      <PageHeader
        eyebrow={`${formatDay(toDay(session.date), { weekday: "long", day: "numeric", month: "long" })} · ${session.minutes} Minuten`}
        title={session.title}
        actions={<SessionStatusButtons id={session.id} status={session.status} size="md" />}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        <Badge tone={meta.tone}>{meta.label}</Badge>
        {session.status === "done" && <Badge tone="success">erledigt</Badge>}
      </div>

      <div className="space-y-3">
        {(session.kind === "learn" || session.kind === "rescue") &&
          topics.map((t) => (
            <div key={t.id} className="space-y-3">
              <p className="eyebrow pt-2">{t.title}</p>
              <Step n={++n} icon={BookOpen} title="Lektion lesen" text={`${t.summary}`} href={`/thema/${t.id}?session=${session.id}`} cta="Lesen" />
              <Step
                n={++n}
                icon={Layers}
                title="Karteikarten"
                text={`${t._count.flashcards} Karten – Begriffe sicher abrufen`}
                href={`/karteikarten?topic=${t.id}&session=${session.id}`}
                cta="Lernen"
              />
              <Step
                n={++n}
                icon={ListChecks}
                title="Übungsaufgaben"
                text={`${quizCount(perTopicMinutes * 0.6)} Aufgaben mit Lösungsweg`}
                href={`/quiz?topic=${t.id}&count=${quizCount(perTopicMinutes * 0.6)}&session=${session.id}`}
                cta="Üben"
              />
            </div>
          ))}

        {session.kind === "review" && session.examPartId === "AP2_PROJEKT" && (
          <Step n={++n} icon={MessagesSquare} title="Fachgespräch trainieren" text="Fragen laut beantworten, dann mit der Musterlösung vergleichen." href="/fachgespraech" cta="Trainieren" />
        )}
        {session.kind === "review" && (
          <>
            <Step n={++n} icon={RotateCcw} title="Fällige Wiederholungen" text="Karten und Aufgaben, die heute dran sind." href="/wiederholen" cta="Wiederholen" />
            <Step
              n={++n}
              icon={Target}
              title="Schwächen trainieren"
              text="Aufgaben aus deinen schwächsten Themen."
              href={`/quiz?mode=weak&count=${quizCount(session.minutes * 0.5)}&session=${session.id}`}
              cta="Üben"
            />
          </>
        )}

        {session.kind === "simulation" && session.examPartId && WRITTEN_PARTS.includes(session.examPartId as ExamPartId) && (
          <Card className="p-6">
            <p className="font-semibold">Prüfungssimulation {EXAM_PARTS[session.examPartId as ExamPartId].short}</p>
            <p className="mt-1 text-[14px] text-fg-2">
              Unter Zeitdruck, ohne Hilfe, mit Auswertung nach IHK-Punkteschlüssel. Dauer: {Math.min(session.minutes, EXAM_PARTS[session.examPartId as ExamPartId].durationMin ?? 60)} Minuten.
            </p>
            <div className="mt-4">
              <StartSimulationButton part={session.examPartId} minutes={session.minutes} />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
