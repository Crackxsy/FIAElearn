import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Settings2, XCircle } from "lucide-react";
import { Badge, buttonClass, Card, cx, PageHeader } from "@/components/ui";
import { RegenerateButton } from "@/components/regenerate-button";
import { SessionStatusButtons } from "@/components/session-actions";
import { SESSION_KIND } from "@/components/session-meta";
import { db } from "@/lib/db";
import { requireProfile } from "@/lib/dal";
import { addDays, dayToDate, formatDay, startOfWeek, toDay, today } from "@/lib/domain/dates";
import { RHYTHM_LABELS, type Rhythm } from "@/lib/domain/planner";
import { computePlan, settingsFromProfile, syncPlan } from "@/lib/services/planning";
import { getSessionStats } from "@/lib/services/overview";

export const metadata: Metadata = { title: "Lernplan" };

function hours(min: number) {
  return `${Math.round((min / 60) * 10) / 10} Std.`.replace(".", ",");
}

export default async function PlanPage({ searchParams }: PageProps<"/plan">) {
  const { user, profile } = await requireProfile();
  const { alle } = await searchParams;
  await syncPlan(user.id);
  const now = today();
  const [plan, sessions, stats] = await Promise.all([
    computePlan(user.id, settingsFromProfile(profile)),
    db.studySession.findMany({
      where: { userId: user.id, date: { gte: dayToDate(addDays(now, -7)) } },
      orderBy: [{ date: "asc" }, { kind: "asc" }],
    }),
    getSessionStats(user.id),
  ]);

  const horizon = alle === "1" ? null : addDays(now, 56);
  const visible = sessions.filter((s) => !horizon || toDay(s.date) <= horizon);
  const weeks = new Map<string, typeof visible>();
  for (const s of visible) {
    const w = startOfWeek(toDay(s.date));
    if (!weeks.has(w)) weeks.set(w, []);
    weeks.get(w)!.push(s);
  }
  const hidden = sessions.length - visible.length;

  return (
    <div>
      <PageHeader
        eyebrow={`${profile.phase} · ${RHYTHM_LABELS[profile.rhythm as Rhythm]} · ${profile.minutesPerSession} Min.`}
        title="Dein Lernplan"
        description="Verpasste Einheiten werden automatisch neu verteilt. Ändere Rhythmus, Zielnote oder Termin in den Einstellungen – der Plan rechnet sich sofort neu."
        actions={
          <>
            <RegenerateButton />
            <Link href="/einstellungen#plan" className={buttonClass("ghost")}>
              <Settings2 size={15} /> Anpassen
            </Link>
          </>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-[13px] text-fg-2">Bedarf bis zur Zielnote</p>
          <p className="mt-1 text-[26px] font-semibold tracking-tight">{hours(plan.requiredMinutes)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-[13px] text-fg-2">Eingeplant</p>
          <p className="mt-1 text-[26px] font-semibold tracking-tight">{hours(plan.availableMinutes)}</p>
          {plan.ratio != null && (
            <Badge tone={plan.status === "gut" ? "success" : plan.status === "knapp" ? "warning" : "danger"} className="mt-1">
              {Math.round(plan.ratio * 100)} % abgedeckt
            </Badge>
          )}
        </Card>
        <Card className="p-5">
          <p className="text-[13px] text-fg-2">Empfehlung</p>
          {plan.recommended ? (
            <>
              <p className="mt-1 text-[20px] font-semibold tracking-tight">{plan.recommended.label}</p>
              <p className="text-[13px] text-fg-2">je {plan.recommended.minutes} Min.</p>
            </>
          ) : (
            <p className="mt-1 text-fg-2">–</p>
          )}
        </Card>
        <Card className="p-5">
          <p className="text-[13px] text-fg-2">Durchgezogen</p>
          <p className="mt-1 text-[26px] font-semibold tracking-tight">{stats.rate == null ? "–" : `${Math.round(stats.rate * 100)} %`}</p>
          <p className="text-[13px] text-fg-2">
            {stats.done} erledigt · {stats.skipped} verpasst
          </p>
        </Card>
      </div>

      {plan.suggestRescue && !profile.rescueMode && (
        <Card className="mb-8 border-warning/40 bg-warning-soft p-5">
          <p className="font-semibold">Die eingeplante Zeit reicht nicht für deine Zielnote.</p>
          <p className="mt-1 text-[14px] text-fg-2">
            Erhöhe die Lernzeit, senke die Zielnote oder aktiviere den Rettungsmodus in den{" "}
            <Link href="/einstellungen#ziele" className="font-medium text-accent">
              Einstellungen
            </Link>
            .
          </p>
        </Card>
      )}

      <div className="space-y-8">
        {[...weeks.entries()].map(([week, list]) => {
          const total = list.reduce((s, x) => s + x.minutes, 0);
          return (
            <section key={week}>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="title-md">
                  {week <= now && addDays(week, 6) >= now ? "Diese Woche" : `Woche ab ${formatDay(week, { day: "numeric", month: "long" })}`}
                </h2>
                <span className="text-[13px] text-fg-3">
                  {list.length} Einheiten · {hours(total)}
                </span>
              </div>
              <Card className="divide-y divide-line">
                {list.map((s) => {
                  const day = toDay(s.date);
                  const meta = SESSION_KIND[s.kind] ?? SESSION_KIND.learn;
                  const Icon = meta.icon;
                  const isToday = day === now;
                  return (
                    <div key={s.id} className={cx("flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5", isToday && "bg-accent-soft/50")}>
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="w-14 shrink-0 text-center">
                          <p className="text-[11px] font-semibold text-fg-3 uppercase">{formatDay(day, { weekday: "short" })}</p>
                          <p className={cx("text-[20px] leading-tight font-semibold", isToday && "text-accent")}>{formatDay(day, { day: "numeric" })}</p>
                        </div>
                        <Icon size={18} className="shrink-0 text-fg-3" />
                        <div className="min-w-0">
                          <p className={cx("truncate text-[15px] font-medium", s.status !== "planned" && "text-fg-3")}>{s.title}</p>
                          <p className="text-[12px] text-fg-3">
                            {meta.label} · {s.minutes} Min.
                            {s.status === "done" && (
                              <span className="ml-2 inline-flex items-center gap-1 text-success">
                                <CheckCircle2 size={12} /> erledigt
                              </span>
                            )}
                            {s.status === "skipped" && (
                              <span className="ml-2 inline-flex items-center gap-1">
                                <XCircle size={12} /> übersprungen
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        {day >= now && <SessionStatusButtons id={s.id} status={s.status} />}
                        {s.status === "planned" && day <= now && (
                          <Link href={`/session/${s.id}`} className={buttonClass("primary", "sm")}>
                            Start <ArrowRight size={14} />
                          </Link>
                        )}
                        {s.status === "planned" && day > now && (
                          <Link href={`/session/${s.id}`} className={buttonClass("ghost", "sm")}>
                            Vorziehen
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Card>
            </section>
          );
        })}
        {weeks.size === 0 && <Card className="p-6 text-fg-2">Noch keine Einheiten geplant. Tippe auf „Plan neu berechnen“.</Card>}
        {hidden > 0 && (
          <div className="text-center">
            <Link href="/plan?alle=1" className={buttonClass("secondary")}>
              Alle {hidden} weiteren Einheiten anzeigen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
