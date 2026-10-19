import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PlacementRunner } from "@/components/placement-runner";
import { db } from "@/lib/db";
import { getProfile, requireUser } from "@/lib/dal";
import { selectPlacementQuestions } from "@/lib/domain/placement";
import type { ExamPartId, Phase } from "@/lib/domain/exam";
import { toClientQuestion } from "@/lib/services/questions";

export const metadata: Metadata = { title: "Einstufungstest" };

export default async function PlacementPage() {
  const user = await requireUser();
  const profile = await getProfile(user.id);
  if (!profile?.onboardingDone) redirect("/onboarding");
  const phase = profile.phase as Phase;

  const candidates = await db.question.findMany({
    where: { placement: true },
    include: { topic: { select: { examPartId: true, weight: true, title: true } } },
  });
  const ids = selectPlacementQuestions(
    candidates.map((c) => ({ id: c.id, topicId: c.topicId, examPartId: c.topic.examPartId as ExamPartId, difficulty: c.difficulty, topicWeight: c.topic.weight })),
    phase,
    phase === "AP1" ? 18 : 24,
  );
  const byId = new Map(candidates.map((c) => [c.id, c]));
  const questions = ids.map((id) => {
    const c = byId.get(id)!;
    return toClientQuestion(c, c.topic.title);
  });

  return (
    <div className="pt-6">
      <PlacementRunner questions={questions} startedAt={new Date().toISOString()} rescueMode={profile.rescueMode} />
    </div>
  );
}
