import Link from "next/link";
import {
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Code2,
  Database,
  Gauge,
  LifeBuoy,
  MessagesSquare,
  RotateCcw,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import { buttonClass, ProgressBar } from "@/components/ui";
import { EXAM_PARTS, type ExamPartId } from "@/lib/domain/exam";

const FEATURES = [
  { icon: CalendarClock, title: "Dein Lernplan", text: "Prüfungstermin, Startdatum und verfügbare Zeit rein – du bekommst einen konkreten Plan und eine Empfehlung: täglich, alle 2 oder 3 Tage oder wöchentlich." },
  { icon: Target, title: "Zielnote wählen", text: "Willst du eine 1 oder reicht sicher bestehen? Der Plan rechnet aus, wie viel Wissen und Zeit du dafür brauchst." },
  { icon: Gauge, title: "Einstufungstest", text: "Ein kurzer Test zeigt, wo du wirklich stehst. Danach startet der Plan nicht bei null, sondern genau bei dir." },
  { icon: LifeBuoy, title: "Rettungsmodus", text: "Kaum was gelernt und die Prüfung ist nah? Der Crashkurs konzentriert sich auf die Themen mit den meisten Punkten pro Minute." },
  { icon: RotateCcw, title: "Wiederholung mit System", text: "Spaced Repetition nach 1/3/7/14/30 Tagen. Fehler kommen automatisch zurück, bis sie sitzen." },
  { icon: Database, title: "SQL live ausführen", text: "SQL-Aufgaben laufen gegen eine echte Übungsdatenbank – du siehst dein Ergebnis sofort im Vergleich zur Lösung." },
  { icon: Timer, title: "Prüfungssimulation", text: "AP1, Software, Algorithmen und WiSo unter echten Zeitbedingungen – mit Notenschlüssel nach IHK-Punkten." },
  { icon: MessagesSquare, title: "Fachgespräch-Training", text: "Typische Fragen zu Projekt, Tests, Sicherheit und Architektur – mit Timer und Musterantworten." },
];

const PARTS: ExamPartId[] = ["AP1", "AP2_PROJEKT", "AP2_SOFTWARE", "AP2_ALGO", "AP2_WISO"];

export default function Landing() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,var(--fill-strong),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <LogoMark size={64} className="animate-fade-up text-fg" />
            <h1 className="mt-6 animate-fade-up font-[family-name:var(--font-display)] text-[52px] leading-none tracking-[-0.04em] sm:text-[84px]">
              <span className="font-extrabold">FIAE</span>
              <span className="font-light text-fg-2">learn</span>
            </h1>
            <p className="mt-5 text-[13px] font-medium tracking-[0.32em] text-fg-2 uppercase sm:text-[15px]">AP1 &amp; AP2 für Fachinformatiker AE</p>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-fg-2 sm:text-[20px]">
              Strukturiert lernen. Verstehen. Bestehen. Dein persönlicher Lernplan für die IHK-Abschlussprüfung – von „fast nichts gelernt“ bis „ich will die 1“.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/registrieren" className={buttonClass("primary", "lg")}>
                Jetzt kostenlos starten
              </Link>
              <Link href="/login" className={buttonClass("secondary", "lg")}>
                Anmelden
              </Link>
            </div>
          </div>

          {/* Schwebende Karten wie im Banner */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, t: "Lernen", s: "Strukturiert. Verständlich. Praxisnah.", v: 0.45 },
              { icon: Code2, t: "Programmieren", s: "Verstehen. Anwenden. Bestehen.", v: 0.62 },
              { icon: TrendingUp, t: "Fortschritt", s: "Schritt für Schritt zum Ziel.", v: 0.74 },
              { icon: CheckCircle2, t: "Bestehen", s: "Mit Struktur. Mit System.", v: 0.88 },
            ].map(({ icon: Icon, t, s, v }, i) => (
              <div key={t} className="card animate-fade-up p-5 shadow-float" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fill">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-[13px] text-fg-2">{s}</p>
                  </div>
                </div>
                <ProgressBar value={v} tone="ink" className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="eyebrow text-center">Alles drin</p>
        <h2 className="title-xl mt-2 text-center">Eine Lernapp, die mitdenkt.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <Icon size={24} className="text-accent" />
              <h3 className="mt-4 text-[17px] font-semibold">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="card overflow-hidden p-6 sm:p-10">
          <p className="eyebrow">FIAusbV 2020 · Anwendungsentwicklung</p>
          <h2 className="title-lg mt-2">So ist die Prüfung aufgebaut</h2>
          <div className="mt-8 space-y-4">
            {PARTS.map((id) => {
              const p = EXAM_PARTS[id];
              return (
                <div key={id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[220px_1fr_auto]">
                  <p className="font-medium">
                    {p.phase === "AP1" ? "Teil 1" : "Teil 2"} · {p.short}
                  </p>
                  <p className="order-3 col-span-2 text-[14px] text-fg-2 sm:order-none sm:col-span-1">{p.name}</p>
                  <div className="flex items-center gap-3">
                    <div className="hidden h-2 w-32 overflow-hidden rounded-full bg-fill-strong sm:block">
                      <div className="h-full rounded-full bg-ink" style={{ width: `${p.weight * 2}%` }} />
                    </div>
                    <span className="w-12 text-right font-semibold tabular-nums">{p.weight} %</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-[13px] text-fg-3">
            Bestanden, wenn Gesamtergebnis und Teil 2 mindestens „ausreichend“, mindestens 3 der 4 Bereiche von Teil 2 mindestens „ausreichend“ und keiner „ungenügend“ sind (§ 16 FIAusbV).
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-4 pb-24 text-center sm:px-6">
        <h2 className="title-xl">Bereit für deine Prüfung?</h2>
        <p className="mx-auto mt-3 max-w-lg text-[17px] text-fg-2">In 3 Minuten eingerichtet. Danach weißt du jeden Tag genau, was zu tun ist.</p>
        <Link href="/registrieren" className={buttonClass("primary", "lg", "mt-8")}>
          Konto erstellen
        </Link>
      </section>
    </>
  );
}
