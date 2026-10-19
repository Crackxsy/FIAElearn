"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { rateCardAction, setSessionStatusAction } from "@/app/actions/learning";
import { Badge, Button, buttonClass, Card, cx, ProgressBar } from "./ui";

export type DeckCard = { id: string; front: string; back: string; topicTitle: string; mustKnow: boolean };

export function FlashcardDeck({ cards, backHref, sessionId }: { cards: DeckCard[]; backHref: string; sessionId?: string }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ again: 0, hard: 0, good: 0 });
  const [queue, setQueue] = useState(cards);
  const [pending, start] = useTransition();
  const card = queue[index];
  const done = index >= queue.length;

  function rate(r: "again" | "hard" | "good") {
    if (!card) return;
    start(async () => {
      await rateCardAction(card.id, r);
    });
    setStats((s) => ({ ...s, [r]: s[r] + 1 }));
    // „Nochmal“-Karten kommen in dieser Runde einmal wieder (max. 1× pro Karte).
    if (r === "again" && queue.filter((c) => c.id === card.id).length < 2) setQueue((qq) => [...qq, card]);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  useEffect(() => {
    if (done && sessionId) void setSessionStatusAction(sessionId, "done");
  }, [done, sessionId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && e.key === "1") rate("again");
      else if (flipped && e.key === "2") rate("hard");
      else if (flipped && e.key === "3") rate("good");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!cards.length) {
    return (
      <Card className="p-8 text-center">
        <p className="title-md">Keine Karten fällig 🎉</p>
        <p className="mt-2 text-fg-2">Komm später wieder oder lerne ein neues Thema.</p>
        <Link href={backHref} className={buttonClass("primary", "md", "mt-6")}>
          Zurück
        </Link>
      </Card>
    );
  }

  if (done) {
    const total = stats.again + stats.hard + stats.good;
    return (
      <Card className="animate-fade-up flex flex-col items-center p-8 text-center">
        <p className="title-lg">Runde geschafft!</p>
        <p className="mt-2 text-fg-2">{total} Bewertungen – die Karten kommen nach 1/3/7/14/30 Tagen wieder.</p>
        <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-3">
          <div className="rounded-2xl bg-danger-soft p-3">
            <p className="text-[22px] font-semibold text-danger">{stats.again}</p>
            <p className="text-[12px] text-fg-2">Nochmal</p>
          </div>
          <div className="rounded-2xl bg-warning-soft p-3">
            <p className="text-[22px] font-semibold text-warning">{stats.hard}</p>
            <p className="text-[12px] text-fg-2">Schwer</p>
          </div>
          <div className="rounded-2xl bg-success-soft p-3">
            <p className="text-[22px] font-semibold text-success">{stats.good}</p>
            <p className="text-[12px] text-fg-2">Gewusst</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button variant="secondary" onClick={() => router.refresh()}>
            <RotateCcw size={16} /> Neue Runde
          </Button>
          <Link href={backHref} className={buttonClass("primary")}>
            Weiter <ArrowRight size={16} />
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <ProgressBar value={index / queue.length} tone="ink" />
        <span className="shrink-0 text-[13px] text-fg-2 tabular-nums">
          {index + 1}/{queue.length}
        </span>
      </div>

      <button type="button" className="flip-card block w-full text-left" onClick={() => setFlipped((f) => !f)} aria-label="Karte umdrehen">
        <div className={cx("flip-inner relative min-h-[300px] sm:min-h-[340px]", flipped && "flipped")}>
          <div className="flip-face card absolute inset-0 flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge>{card.topicTitle}</Badge>
              {card.mustKnow && <Badge tone="warning">Must-know</Badge>}
            </div>
            <div className="flex flex-1 items-center justify-center text-center">
              <p className="font-[family-name:var(--font-display)] text-[24px] leading-snug font-semibold tracking-[-0.015em] sm:text-[30px]">{card.front}</p>
            </div>
            <p className="text-center text-[13px] text-fg-3">Tippen oder Leertaste zum Umdrehen</p>
          </div>
          <div className="flip-face flip-back card absolute inset-0 flex flex-col p-6 sm:p-8">
            <p className="eyebrow">{card.front}</p>
            <div className="flex flex-1 items-center justify-center text-center">
              <p className="text-[18px] leading-relaxed sm:text-[21px]">{card.back}</p>
            </div>
          </div>
        </div>
      </button>

      <div className={cx("grid grid-cols-3 gap-2 transition", !flipped && "pointer-events-none opacity-30")} aria-hidden={!flipped}>
        <Button variant="danger" size="lg" disabled={pending || !flipped} onClick={() => rate("again")}>
          Nochmal
        </Button>
        <Button variant="secondary" size="lg" disabled={pending || !flipped} onClick={() => rate("hard")}>
          Schwer
        </Button>
        <Button variant="accent" size="lg" disabled={pending || !flipped} onClick={() => rate("good")}>
          Gewusst
        </Button>
      </div>
      <p className="hidden text-center text-[12px] text-fg-3 sm:block">Tastatur: Leertaste umdrehen · 1 Nochmal · 2 Schwer · 3 Gewusst</p>
    </div>
  );
}
