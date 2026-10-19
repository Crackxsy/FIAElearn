import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ListChecks } from "lucide-react";
import { buttonClass, Card, PageHeader } from "@/components/ui";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { addDays, dayToDate, formatDay, toDay, today } from "@/lib/domain/dates";
import { BOX_INTERVALS } from "@/lib/domain/srs";
import { dueCounts } from "@/lib/services/selection";

export const metadata: Metadata = { title: "Wiederholen" };

export default async function ReviewPage() {
  const { user } = await requireProfile();
  const due = await dueCounts(user.id);
  const now = today();
  const upcoming = await db.reviewItem.findMany({
    where: { userId: user.id, dueAt: { gte: dayToDate(addDays(now, 1)), lt: dayToDate(addDays(now, 8)) } },
    select: { dueAt: true },
  });
  const boxes = await db.reviewItem.groupBy({ by: ["box"], where: { userId: user.id }, _count: true });
  const byDay = new Map<string, number>();
  for (const u of upcoming) byDay.set(toDay(u.dueAt), (byDay.get(toDay(u.dueAt)) ?? 0) + 1);
  const max = Math.max(1, ...byDay.values());
  const totalItems = boxes.reduce((s, b) => s + b._count, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Spaced Repetition"
        title="Wiederholen"
        description="Was du falsch hattest oder neu gelernt hast, kommt nach 1, 3, 7, 14 und 30 Tagen wieder – so landet es im Langzeitgedächtnis."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <ListChecks className="text-accent" />
          <p className="mt-3 font-[family-name:var(--font-display)] text-[40px] leading-none font-semibold">{due.questions}</p>
          <p className="mt-1 text-fg-2">Aufgaben fällig</p>
          <Link href="/quiz?mode=review" className={buttonClass(due.questions ? "primary" : "secondary", "md", "mt-5")}>
            Aufgaben wiederholen
          </Link>
        </Card>
        <Card className="p-6">
          <Layers className="text-accent" />
          <p className="mt-3 font-[family-name:var(--font-display)] text-[40px] leading-none font-semibold">{due.cards}</p>
          <p className="mt-1 text-fg-2">Karteikarten fällig</p>
          <Link href="/karteikarten?mode=due" className={buttonClass(due.cards ? "primary" : "secondary", "md", "mt-5")}>
            Karten wiederholen
          </Link>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <p className="title-md">Die nächsten 7 Tage</p>
          <div className="mt-5 flex h-36 items-end gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const d = addDays(now, i + 1);
              const n = byDay.get(d) ?? 0;
              return (
                <div key={d} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[11px] text-fg-3 tabular-nums">{n || ""}</span>
                  <div className="w-full rounded-lg bg-ink/80" style={{ height: `${(n / max) * 96 + 4}px`, opacity: n ? 1 : 0.15 }} />
                  <span className="text-[11px] text-fg-3">{formatDay(d, { weekday: "short" })}</span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="p-6">
          <p className="title-md">Deine Boxen</p>
          <p className="mt-1 text-[13px] text-fg-2">{totalItems} Elemente im System</p>
          <div className="mt-4 space-y-2.5">
            {BOX_INTERVALS.map((interval, i) => {
              const n = boxes.find((b) => b.box === i + 1)?._count ?? 0;
              return (
                <div key={interval} className="flex items-center gap-3 text-[13px]">
                  <span className="w-20 shrink-0 text-fg-2">Box {i + 1}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-fill-strong">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${totalItems ? (n / totalItems) * 100 : 0}%` }} />
                  </div>
                  <span className="w-24 text-right text-fg-3 tabular-nums">
                    {n} · {interval} {interval === 1 ? "Tag" : "Tage"}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <p className="mt-6 text-[13px] text-fg-3">Stand: {formatDay(now)}</p>
    </div>
  );
}
