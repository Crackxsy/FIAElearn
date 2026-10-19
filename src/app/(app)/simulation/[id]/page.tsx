import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CircleDashed, MinusCircle, XCircle } from "lucide-react";
import { Badge, Card, PageHeader, Ring } from "@/components/ui";
import { OpenGrader } from "@/components/open-grader";
import { SimulationRunner } from "@/components/simulation-runner";
import type { DraftAnswer } from "@/components/question";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { EXAM_PARTS, type ExamPartId } from "@/lib/domain/exam";
import { GRADE_LABELS, type Grade } from "@/lib/domain/grading";
import type { UserAnswer } from "@/lib/domain/scoring";
import { solutionText, toClientQuestion } from "@/lib/services/questions";
import type { SimAnswers } from "@/app/actions/simulation";

export const metadata: Metadata = { title: "Simulation" };

function answerText(a: UserAnswer | undefined, options: { id: string; text: string }[] | null) {
  if (!a) return "—";
  if (a.kind === "choice") return options?.filter((o) => a.selected.includes(o.id)).map((o) => o.text).join(" · ") || "—";
  return (a.kind === "text" ? a.value : (a.value ?? "")) || "—";
}

export default async function SimulationPage({ params }: PageProps<"/simulation/[id]">) {
  const { user } = await requireProfile();
  const { id } = await params;
  const sim = await db.examSimulation.findFirst({ where: { id, userId: user.id } });
  if (!sim) notFound();
  const ids = sim.questionIds as string[];
  const found = await db.question.findMany({ where: { id: { in: ids } }, include: { topic: { select: { title: true } } } });
  const questions = ids.map((qid) => found.find((q) => q.id === qid)).filter((q): q is NonNullable<typeof q> => !!q);
  const answers = (sim.answers as SimAnswers | null) ?? {};
  const part = EXAM_PARTS[sim.examPartId as ExamPartId];

  if (!sim.finishedAt) {
    const initial: Record<string, DraftAnswer> = {};
    for (const [qid, entry] of Object.entries(answers)) {
      const a = entry.answer;
      if (!a) continue;
      initial[qid] = a.kind === "choice" ? { selected: a.selected, text: "" } : { selected: [], text: a.kind === "text" ? a.value : (a.value ?? "") };
    }
    return (
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Simulation · {part.short}</p>
        <h1 className="title-lg mt-1 mb-4">{part.name}</h1>
        <SimulationRunner simId={sim.id} questions={questions.map((q) => toClientQuestion(q, q.topic.title))} endsAt={sim.endsAt.toISOString()} initial={initial} />
      </div>
    );
  }

  const pct = sim.scorePct ?? 0;
  const pending = Object.values(answers).filter((a) => a.score === null).length;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/simulation" className="mb-4 inline-flex items-center gap-1 text-[14px] text-fg-2 hover:text-fg">
        <ArrowLeft size={15} /> Alle Simulationen
      </Link>
      <PageHeader eyebrow={`Auswertung · ${part.short}`} title={part.name} />
      <Card className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8">
        <Ring value={pct / 100} size={128} stroke={11} tone={pct >= 67 ? "success" : pct >= 50 ? "warning" : "danger"}>
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-[32px] leading-none font-semibold">{Math.round(pct)}</p>
            <p className="text-[11px] text-fg-3">von 100</p>
          </div>
        </Ring>
        <div className="text-center sm:text-left">
          {sim.grade ? (
            <>
              <p className="eyebrow">Note</p>
              <p className="title-xl">
                {sim.grade} <span className="text-[22px] font-medium text-fg-2">{GRADE_LABELS[sim.grade as Grade]}</span>
              </p>
            </>
          ) : (
            <p className="title-md">Bewerte noch {pending} Freitext-{pending === 1 ? "Antwort" : "Antworten"}, dann steht deine Note.</p>
          )}
          <p className="mt-2 text-[14px] text-fg-2">
            IHK-Schlüssel: 92 → 1 · 81 → 2 · 67 → 3 · 50 → 4 · 30 → 5. Übungsbewertung, keine offizielle Note.
          </p>
        </div>
      </Card>

      <div className="mt-8 space-y-3">
        {questions.map((q, i) => {
          const entry = answers[q.id];
          const score = entry?.score;
          const Icon = score == null ? CircleDashed : score >= 1 ? CheckCircle2 : score > 0 ? MinusCircle : XCircle;
          const tone = score == null ? "text-fg-3" : score >= 1 ? "text-success" : score > 0 ? "text-warning" : "text-danger";
          return (
            <Card key={q.id} className="p-5">
              <div className="flex items-start gap-3">
                <Icon size={20} className={`mt-0.5 shrink-0 ${tone}`} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[12px] text-fg-3">Aufgabe {i + 1}</span>
                    <Badge>{q.topic.title}</Badge>
                    <span className="text-[12px] text-fg-3">
                      {score == null ? "?" : Math.round(score * q.points * 10) / 10}/{q.points} P.
                    </span>
                  </div>
                  <p className="font-medium">{q.prompt}</p>
                  <div className="grid gap-2 text-[14px] sm:grid-cols-2">
                    <div className="rounded-xl bg-fill p-3">
                      <p className="text-[11px] font-semibold tracking-wide text-fg-3 uppercase">Deine Antwort</p>
                      <p className="mt-1 font-mono text-[13px] break-words whitespace-pre-wrap">{answerText(entry?.answer, q.options as { id: string; text: string }[] | null)}</p>
                    </div>
                    <div className="rounded-xl bg-success-soft p-3">
                      <p className="text-[11px] font-semibold tracking-wide text-fg-3 uppercase">Lösung</p>
                      <p className="mt-1 font-mono text-[13px] break-words whitespace-pre-wrap">{solutionText(q)}</p>
                    </div>
                  </div>
                  {entry?.feedback && <p className="text-[13px] text-fg-2">{entry.feedback}</p>}
                  <p className="text-[13px] text-fg-2">{q.explanation}</p>
                  {q.type === "open" && score === null && <OpenGrader simId={sim.id} questionId={q.id} />}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
