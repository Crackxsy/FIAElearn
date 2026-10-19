import { renderNonce } from "@/lib/nonce";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { EXAM_PARTS, isExamPartId, partsForPhase, type Phase } from "@/lib/domain/exam";
import { dueBoundary } from "@/lib/services/selection";
import { shuffle } from "@/lib/services/questions";

export const metadata: Metadata = { title: "Karteikarten" };

const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default async function CardsPage({ searchParams }: PageProps<"/karteikarten">) {
  const { user, profile } = await requireProfile();
  const sp = await searchParams;
  const topicId = str(sp.topic);
  const part = str(sp.part);
  const mode = str(sp.mode);
  const sessionId = str(sp.session);
  const phaseParts = partsForPhase(profile.phase as Phase);

  let title = "Karteikarten";
  let backHref = "/lernen";
  let where: Parameters<typeof db.flashcard.findMany>[0] = {};

  if (topicId) {
    const topic = await db.topic.findUnique({ where: { id: topicId } });
    title = topic?.title ?? title;
    backHref = `/thema/${topicId}`;
    where = { where: { topicId } };
  } else if (part && isExamPartId(part)) {
    title = EXAM_PARTS[part].name;
    backHref = `/lernen/${part}`;
    where = { where: { topic: { examPartId: part } } };
  } else if (mode === "due") {
    title = "Fällige Karten";
    backHref = "/wiederholen";
    const due = await db.reviewItem.findMany({
      where: { userId: user.id, itemType: "flashcard", dueAt: { lt: dueBoundary() } },
      orderBy: { box: "asc" },
      take: 40,
    });
    where = { where: { id: { in: due.map((d) => d.itemId) } } };
  } else {
    title = "Must-know-Karten";
    backHref = "/dashboard";
    where = { where: { mustKnow: true, topic: { examPartId: { in: phaseParts } } } };
  }
  if (sessionId) backHref = `/session/${sessionId}`;

  const cards = await db.flashcard.findMany({ ...where, include: { topic: { select: { title: true } } } });
  const deck = shuffle(cards)
    .slice(0, 30)
    .map((c) => ({ id: c.id, front: c.front, back: c.back, topicTitle: c.topic.title, mustKnow: c.mustKnow }));

  return (
    <div className="mx-auto max-w-2xl">
      <Link href={backHref} className="mb-4 inline-flex items-center gap-1 text-[14px] text-fg-2 hover:text-fg">
        <ArrowLeft size={15} /> Zurück
      </Link>
      <p className="eyebrow">Karteikarten</p>
      <h1 className="title-lg mt-1 mb-6">{title}</h1>
      <FlashcardDeck key={renderNonce()} cards={deck} backHref={backHref} sessionId={sessionId} />
    </div>
  );
}
