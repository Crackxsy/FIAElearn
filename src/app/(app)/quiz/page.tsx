import { renderNonce } from "@/lib/nonce";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/quiz-runner";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { EXAM_PARTS, isExamPartId, type Phase } from "@/lib/domain/exam";
import { selectQuestions, type QuizMode } from "@/lib/services/selection";

export const metadata: Metadata = { title: "Üben" };

const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default async function QuizPage({ searchParams }: PageProps<"/quiz">) {
  const { user, profile } = await requireProfile();
  const sp = await searchParams;
  const topicId = str(sp.topic);
  const part = str(sp.part);
  const sessionId = str(sp.session);
  const requested = str(sp.mode) as QuizMode | undefined;
  const count = Math.max(3, Math.min(30, Number(str(sp.count)) || 10));

  let mode: QuizMode = "mixed";
  let title = "Zufallsmix";
  let backHref = "/dashboard";
  let topicIds: string[] | undefined;
  let partId = undefined as Parameters<typeof selectQuestions>[0]["partId"];

  if (topicId) {
    const topic = await db.topic.findUnique({ where: { id: topicId } });
    if (topic) {
      mode = "topic";
      topicIds = [topic.id];
      title = topic.title;
      backHref = `/thema/${topic.id}`;
    }
  } else if (part && isExamPartId(part)) {
    mode = "part";
    partId = part;
    title = EXAM_PARTS[part].name;
    backHref = `/lernen/${part}`;
  } else if (requested === "weak") {
    mode = "weak";
    title = "Schwächen trainieren";
  } else if (requested === "review") {
    mode = "review";
    title = "Fällige Aufgaben";
    backHref = "/wiederholen";
  }
  if (sessionId) backHref = `/session/${sessionId}`;

  const questions = await selectQuestions({ userId: user.id, phase: profile.phase as Phase, mode, topicIds, partId, count: mode === "review" ? 30 : count });
  const context = mode === "review" ? "review" : sessionId ? "session" : profile.rescueMode ? "rescue" : "quiz";

  return (
    <div className="mx-auto max-w-3xl">
      <Link href={backHref} className="mb-4 inline-flex items-center gap-1 text-[14px] text-fg-2 hover:text-fg">
        <ArrowLeft size={15} /> Zurück
      </Link>
      <p className="eyebrow">Üben</p>
      <h1 className="title-lg mt-1 mb-6">{title}</h1>
      <QuizRunner key={renderNonce()} questions={questions} context={context} backHref={backHref} sessionId={sessionId} />
      <p className="mt-8 text-center text-[12px] text-fg-3">Eigene Übungsaufgaben – keine Original-IHK-Prüfungsaufgaben.</p>
    </div>
  );
}
