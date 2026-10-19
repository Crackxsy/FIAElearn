import type { Metadata } from "next";
import { ActivityChart } from "@/components/activity-chart";
import { Card, PageHeader, ProgressBar, SectionTitle, Stat } from "@/components/ui";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { formatDay } from "@/lib/domain/dates";
import { EXAM_PARTS, partsForPhase, type ExamPartId, type Phase } from "@/lib/domain/exam";
import { getActivity, getForecast, getSessionStats, getStreak } from "@/lib/services/overview";

export const metadata: Metadata = { title: "Statistik" };

export default async function StatsPage() {
  const { user, profile } = await requireProfile();
  const phase = profile.phase as Phase;
  const [activity, streak, sessionStats, forecast, totals, byTopic, topics] = await Promise.all([
    getActivity(user.id, 30),
    getStreak(user.id),
    getSessionStats(user.id),
    getForecast(user.id, phase),
    db.attempt.aggregate({ where: { userId: user.id }, _count: true, _avg: { score: true } }),
    db.attempt.groupBy({ by: ["topicId"], where: { userId: user.id }, _count: true, _avg: { score: true } }),
    db.topic.findMany({ where: { examPartId: { in: partsForPhase(phase) } }, orderBy: { order: "asc" }, include: { masteries: { where: { userId: user.id } } } }),
  ]);
  const minutes30 = activity.reduce((s, a) => s + a.minutes, 0);
  const chartData = activity.map((a) => ({ ...a, label: formatDay(a.day, { day: "numeric", month: "short" }) }));
  const topicStats = new Map(byTopic.map((t) => [t.topicId, t]));

  return (
    <div>
      <PageHeader eyebrow="Fortschritt" title="Statistik" description="Wie viel du lernst, wie sicher du bist und wo es noch hakt." />
      <Card className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4">
        <Stat label="Lernserie" value={`${streak.streak} T.`} hint="Tage in Folge" />
        <Stat label="Lernzeit (30 Tage)" value={`${Math.round((minutes30 / 60) * 10) / 10} h`.replace(".", ",")} />
        <Stat label="Aufgaben gesamt" value={totals._count} hint={totals._avg.score != null ? `${Math.round(totals._avg.score * 100)} % Ø Punkte` : undefined} />
        <Stat label="Plan eingehalten" value={sessionStats.rate == null ? "–" : `${Math.round(sessionStats.rate * 100)} %`} hint={`${sessionStats.done} von ${sessionStats.done + sessionStats.skipped}`} />
      </Card>

      <section className="mt-8">
        <SectionTitle>Lernzeit pro Tag (letzte 30 Tage)</SectionTitle>
        <Card className="p-5">
          <ActivityChart data={chartData} />
        </Card>
      </section>

      <section className="mt-8">
        <SectionTitle>Prognose je Prüfungsbereich</SectionTitle>
        <Card className="divide-y divide-line">
          {forecast.perPart.map((p) => (
            <div key={p.examPartId} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-4 sm:grid-cols-[200px_1fr_auto]">
              <p className="font-medium">{EXAM_PARTS[p.examPartId].short}</p>
              <ProgressBar value={p.points / 100} className="order-3 col-span-2 sm:order-none sm:col-span-1" tone="ink" />
              <p className="text-right text-[14px] tabular-nums">
                {p.points} P. · <span className="font-semibold">Note {p.grade}</span>
                <span className="block text-[11px] text-fg-3">{Math.round(p.confidence * 100)} % der Themen geübt</span>
              </p>
            </div>
          ))}
        </Card>
      </section>

      <section className="mt-8">
        <SectionTitle>Themen im Detail</SectionTitle>
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead className="text-[12px] text-fg-3">
              <tr className="border-b border-line">
                <th className="px-5 py-3 font-medium">Thema</th>
                <th className="px-3 py-3 font-medium">Bereich</th>
                <th className="px-3 py-3 font-medium">Wissensstand</th>
                <th className="px-3 py-3 text-right font-medium">Aufgaben</th>
                <th className="px-5 py-3 text-right font-medium">Ø richtig</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => {
                const m = t.masteries[0]?.mastery ?? 0;
                const st = topicStats.get(t.id);
                return (
                  <tr key={t.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-2.5 font-medium">{t.title}</td>
                    <td className="px-3 py-2.5 text-fg-2">{EXAM_PARTS[t.examPartId as ExamPartId].short}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={m} className="w-24" tone={m >= 0.67 ? "success" : m >= 0.4 ? "warning" : "danger"} />
                        <span className="text-[12px] tabular-nums text-fg-2">{Math.round(m * 100)} %</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{st?._count ?? 0}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums">{st?._avg.score != null ? `${Math.round(st._avg.score * 100)} %` : "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
