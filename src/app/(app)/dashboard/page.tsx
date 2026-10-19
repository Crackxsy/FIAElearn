import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Flame,
  Gauge,
  Layers,
  LifeBuoy,
  RotateCcw,
  Shuffle,
  Target,
  Timer,
  XCircle,
} from "lucide-react";
import { Badge, buttonClass, Card, ProgressBar, Ring, SectionTitle } from "@/components/ui";
import { SessionStatusButtons } from "@/components/session-actions";
import { SESSION_KIND } from "@/components/session-meta";
import { requireProfile } from "@/lib/dal";
import { formatDay, toDay, TIME_ZONE } from "@/lib/domain/dates";
import { EXAM_PARTS, type Phase } from "@/lib/domain/exam";
import { GRADE_LABELS } from "@/lib/domain/grading";
import { getForecast, getPartProgress, getStreak, getTodaySessions, getUpcomingSessions, daysUntil } from "@/lib/services/overview";
import { computePlan, settingsFromProfile, syncPlan } from "@/lib/services/planning";
import { dueCounts } from "@/lib/services/selection";
import { db } from "@/lib/db";
import { today } from "@/lib/domain/dates";

export const metadata: Metadata = { title: "Übersicht" };

function greeting() {
  const hour = Number(new Intl.DateTimeFormat("de-DE", { hour: "numeric", hourCycle: "h23", timeZone: TIME_ZONE }).format(new Date()));
  if (hour < 11) return "Guten Morgen";
  if (hour < 18) return "Hallo";
  return "Guten Abend";
}

export default async function Dashboard({ searchParams }: PageProps<"/dashboard">) {
  const { user, profile } = await requireProfile();
  const { willkommen } = await searchParams;
  const missed = await syncPlan(user.id);
  const phase = profile.phase as Phase;
  const examDate = phase === "AP1" ? profile.ap1Date : profile.ap2Date;

  const [forecast, streak, todaySessions, upcoming, due, parts, plan, activityToday] = await Promise.all([
    getForecast(user.id, phase),
    getStreak(user.id),
    getTodaySessions(user.id),
    getUpcomingSessions(user.id, 5),
    dueCounts(user.id),
    getPartProgress(user.id, phase),
    computePlan(user.id, settingsFromProfile(profile)),
    db.dailyActivity.findUnique({ where: { userId_day: { userId: user.id, day: today() } } }),
  ]);
  const days = daysUntil(examDate);
  const targetPoints = { 1: 92, 2: 81, 3: 67, 4: 50 }[profile.rescueMode ? 4 : profile.targetGrade] ?? 67;

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow">{formatDay(today(), { weekday: "long", day: "numeric", month: "long" })}</p>
        <h1 className="title-xl mt-1">
          {greeting()}, {user.name}.
        </h1>
        {willkommen && <p className="mt-2 text-fg-2">Dein Lernplan ist fertig. Los geht’s mit der ersten Einheit!</p>}
        {missed > 0 && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-fill px-3 py-1 text-[13px] text-fg-2">
            <CalendarDays size={14} /> {missed} verpasste {missed === 1 ? "Einheit wurde" : "Einheiten wurden"} automatisch neu eingeplant.
          </p>
        )}
      </header>

      {profile.rescueMode && (
        <Card className="flex items-start gap-4 border-warning/40 bg-warning-soft p-5">
          <LifeBuoy className="mt-0.5 shrink-0 text-warning" />
          <div>
            <p className="font-semibold">Rettungsmodus aktiv – Ziel: sicher bestehen</p>
            <p className="mt-0.5 text-[14px] text-fg-2">
              Du lernst nur die Pflichtthemen mit den meisten Punkten. Kurz, fokussiert, jeden Tag ein bisschen. Mach heute deine Einheit – auch 20 Minuten zählen.
            </p>
          </div>
        </Card>
      )}

      {!profile.placementDone && (
        <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <Gauge className="shrink-0 text-accent" size={28} />
          <div className="flex-1">
            <p className="font-semibold">Mach den Einstufungstest</p>
            <p className="text-[14px] text-fg-2">15–20 Minuten, danach passt sich dein Plan an deinen echten Wissensstand an.</p>
          </div>
          <Link href="/einstufung" className={buttonClass("primary", "md")}>
            Starten
          </Link>
        </Card>
      )}

      {/* Kennzahlen */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="flex items-center gap-2 text-[14px] text-fg-2">
            <CalendarDays size={16} /> {phase} Prüfung
          </p>
          {days != null && examDate ? (
            <>
              <p className="mt-2 font-[family-name:var(--font-display)] text-[44px] leading-none font-semibold tracking-tight">
                {days}
                <span className="ml-1.5 text-[17px] font-medium text-fg-2">{days === 1 ? "Tag" : "Tage"}</span>
              </p>
              <p className="mt-2 text-[13px] text-fg-3">{formatDay(toDay(examDate), { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-[17px] font-medium">Noch kein Termin</p>
              <Link href="/einstellungen" className="mt-2 inline-block text-[14px] font-medium text-accent">
                Termin eintragen →
              </Link>
            </>
          )}
          {plan.status !== "vorbei" && plan.ratio != null && (
            <div className="mt-4">
              <Badge tone={plan.status === "gut" ? "success" : plan.status === "knapp" ? "warning" : "danger"}>
                {plan.status === "gut" ? "Im Plan" : plan.status === "knapp" ? "Knapp" : "Zeit reicht nicht"}
              </Badge>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <p className="flex items-center gap-2 text-[14px] text-fg-2">
            <Target size={16} /> Notenprognose
          </p>
          <div className="mt-3 flex items-center gap-4">
            <Ring value={forecast.overallPoints / 100} size={78} stroke={8} tone={forecast.overallPoints >= targetPoints ? "success" : forecast.overallPoints >= 50 ? "warning" : "danger"}>
              <span className="font-[family-name:var(--font-display)] text-[26px] font-semibold">{forecast.overallGrade}</span>
            </Ring>
            <div>
              <p className="font-semibold">{GRADE_LABELS[forecast.overallGrade]}</p>
              <p className="text-[13px] text-fg-2">≈ {forecast.overallPoints} Punkte</p>
              <p className="mt-1 text-[12px] text-fg-3">Ziel: Note {profile.rescueMode ? "4" : profile.targetGrade} ({targetPoints}+)</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="flex items-center gap-2 text-[14px] text-fg-2">
            <Flame size={16} /> Lernserie
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[44px] leading-none font-semibold tracking-tight">
            {streak.streak}
            <span className="ml-1.5 text-[17px] font-medium text-fg-2">{streak.streak === 1 ? "Tag" : "Tage"}</span>
          </p>
          <p className="mt-2 text-[13px] text-fg-3">
            Heute: {activityToday?.questions ?? 0} Aufgaben · {Math.round(activityToday?.minutes ?? 0)} Min.
            {!streak.activeToday && streak.streak > 0 && " – heute lernen, um die Serie zu halten!"}
          </p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Heute */}
        <section>
          <SectionTitle
            action={
              <Link href="/plan" className="text-[14px] font-medium text-accent">
                Ganzer Plan
              </Link>
            }
          >
            Heute
          </SectionTitle>
          {todaySessions.length ? (
            <div className="space-y-3">
              {todaySessions.map((s) => {
                const meta = SESSION_KIND[s.kind] ?? SESSION_KIND.learn;
                const Icon = meta.icon;
                return (
                  <Card key={s.id} className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-fill">
                        <Icon size={21} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone={meta.tone}>{meta.label}</Badge>
                          <span className="text-[13px] text-fg-3">{s.minutes} Min.</span>
                          {s.status === "done" && (
                            <Badge tone="success">
                              <CheckCircle2 size={12} /> erledigt
                            </Badge>
                          )}
                          {s.status === "skipped" && (
                            <Badge>
                              <XCircle size={12} /> übersprungen
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1.5 text-[17px] font-semibold">{s.title}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      <SessionStatusButtons id={s.id} status={s.status} />
                      {s.status === "planned" && (
                        <Link href={`/session/${s.id}`} className={buttonClass("primary", "md")}>
                          Starten <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-6">
              <p className="font-semibold">Heute ist kein Lerntag in deinem Plan.</p>
              <p className="mt-1 text-[14px] text-fg-2">Lust auf 10 Minuten extra? Wiederholungen bringen am meisten.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/wiederholen" className={buttonClass("primary", "sm")}>
                  Wiederholen
                </Link>
                <Link href="/quiz?mode=weak" className={buttonClass("secondary", "sm")}>
                  Schwächen trainieren
                </Link>
              </div>
            </Card>
          )}

          <div className="mt-8">
            <SectionTitle>Schnellstart</SectionTitle>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { href: "/wiederholen", icon: RotateCcw, label: "Wiederholen", hint: due.total ? `${due.total} fällig` : "alles erledigt" },
              { href: "/quiz?mode=weak", icon: Target, label: "Schwächen", hint: "gezielt üben" },
              { href: "/quiz?mode=mixed", icon: Shuffle, label: "Zufallsmix", hint: "10 Aufgaben" },
              { href: "/karteikarten?mode=mustknow", icon: Layers, label: "Must-know", hint: "Karteikarten" },
            ].map(({ href, icon: Icon, label, hint }) => (
              <Link key={href} href={href} className="card p-4 transition hover:shadow-float">
                <Icon size={20} className="text-accent" />
                <p className="mt-3 text-[15px] font-semibold">{label}</p>
                <p className="text-[12px] text-fg-3">{hint}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Fortschritt */}
        <section className="space-y-6">
          <div>
            <SectionTitle
              action={
                <Link href="/statistik" className="text-[14px] font-medium text-accent">
                  Details
                </Link>
              }
            >
              Wissensstand
            </SectionTitle>
            <Card className="space-y-4 p-5">
              {parts.map((p) => {
                const fc = forecast.perPart.find((x) => x.examPartId === p.examPartId);
                return (
                  <Link key={p.examPartId} href={`/lernen/${p.examPartId}`} className="block">
                    <div className="mb-1.5 flex items-center justify-between text-[14px]">
                      <span className="font-medium">{EXAM_PARTS[p.examPartId].short}</span>
                      <span className="text-fg-2 tabular-nums">
                        {Math.round(p.mastery * 100)} % {fc && <span className="text-fg-3">· Note {fc.grade}</span>}
                      </span>
                    </div>
                    <ProgressBar value={p.mastery} tone={p.mastery >= 0.67 ? "success" : p.mastery >= 0.45 ? "warning" : "danger"} />
                  </Link>
                );
              })}
              {forecast.passing && (
                <div className="border-t border-line pt-4">
                  <p className="mb-2 text-[13px] font-medium text-fg-2">Bestehensregeln (Prognose)</p>
                  <ul className="space-y-1.5">
                    {forecast.passing.rules.map((r) => (
                      <li key={r.label} className="flex items-start gap-2 text-[13px]">
                        {r.ok ? <CheckCircle2 size={15} className="mt-px shrink-0 text-success" /> : <XCircle size={15} className="mt-px shrink-0 text-danger" />}
                        {r.label}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[11px] text-fg-3">Schätzung aus deinem Übungsstand – keine offizielle Bewertung. AP1 fließt mit Übungsstand oder 67 Punkten ein.</p>
                </div>
              )}
            </Card>
          </div>

          <div>
            <SectionTitle>Als Nächstes</SectionTitle>
            <Card className="divide-y divide-line">
              {upcoming.length ? (
                upcoming.map((s) => {
                  const meta = SESSION_KIND[s.kind] ?? SESSION_KIND.learn;
                  const Icon = meta.icon;
                  return (
                    <div key={s.id} className="flex items-center gap-3 px-5 py-3">
                      <Icon size={17} className="shrink-0 text-fg-3" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-medium">{s.title}</p>
                        <p className="text-[12px] text-fg-3">
                          {formatDay(toDay(s.date), { weekday: "short", day: "numeric", month: "short" })} · {s.minutes} Min.
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="px-5 py-4 text-[14px] text-fg-2">Keine weiteren Einheiten geplant.</p>
              )}
            </Card>
          </div>

          <Link href="/simulation" className="card flex items-center gap-4 p-5 transition hover:shadow-float">
            <Timer className="shrink-0 text-accent" />
            <div className="flex-1">
              <p className="font-semibold">Prüfung simulieren</p>
              <p className="text-[13px] text-fg-2">Unter echten Zeitbedingungen mit IHK-Notenschlüssel</p>
            </div>
            <ArrowRight size={18} className="text-fg-3" />
          </Link>
        </section>
      </div>
    </div>
  );
}
