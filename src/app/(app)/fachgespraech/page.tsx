import { renderNonce } from "@/lib/nonce";
import type { Metadata } from "next";
import { MessagesSquare } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { QuizRunner } from "@/components/quiz-runner";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { shuffle, toClientQuestion } from "@/lib/services/questions";

export const metadata: Metadata = { title: "Fachgespräch-Training" };

export default async function OralPage() {
  await requireProfile();
  const open = await db.question.findMany({
    where: { type: "open", topic: { examPartId: { in: ["AP2_PROJEKT", "AP2_SOFTWARE", "AP2_ALGO"] } } },
    include: { topic: { select: { title: true, examPartId: true } } },
  });
  // Projektfragen zuerst, dann gemischte Fachfragen
  const project = shuffle(open.filter((q) => q.topic.examPartId === "AP2_PROJEKT")).slice(0, 5);
  const other = shuffle(open.filter((q) => q.topic.examPartId !== "AP2_PROJEKT")).slice(0, 3);
  const questions = [...project, ...other].map((q) => toClientQuestion(q, q.topic.title));

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="AP2 · Projekt"
        title="Fachgespräch-Training"
        description="Präsentation max. 15 Minuten, zusammen mit dem Fachgespräch max. 30 Minuten. Die Fragen gehen von deinem Projekt aus und vertiefen Fachwissen."
      />
      <Card className="mb-6 flex gap-3 p-5">
        <MessagesSquare className="mt-0.5 shrink-0 text-accent" />
        <p className="text-[14px] leading-relaxed text-fg-2">
          So geht’s: Timer starten, die Frage <strong className="text-fg">laut</strong> beantworten (ideal mit Bezug zu deinem eigenen Projekt), dann die Musterlösung ansehen und
          ehrlich bewerten. Tipp: Struktur „Antwort – Begründung – Beispiel aus dem Projekt“. Keine amtliche Bewertung.
        </p>
      </Card>
      <QuizRunner key={renderNonce()} questions={questions} context="quiz" backHref="/fachgespraech" backLabel="Neue Runde" finishLabel="Neue Runde" timerSeconds={120} />
    </div>
  );
}
