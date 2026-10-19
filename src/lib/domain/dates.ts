// Kalendertage werden als "YYYY-MM-DD" (Europe/Berlin) behandelt,
// damit Lernpläne unabhängig von der Server-Zeitzone stabil bleiben.

export const TIME_ZONE = "Europe/Berlin";

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export type Day = string;

export function toDay(date: Date): Day {
  return dayFormatter.format(date);
}

export function today(now: Date = new Date()): Day {
  return toDay(now);
}

/** Mittag UTC – liegt in jeder europäischen Zeitzone am selben Kalendertag. */
export function dayToDate(day: Day): Date {
  return new Date(`${day}T12:00:00Z`);
}

export function addDays(day: Day, n: number): Day {
  const d = dayToDate(day);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function diffDays(from: Day, to: Day): number {
  return Math.round((dayToDate(to).getTime() - dayToDate(from).getTime()) / 86_400_000);
}

/** 0 = Sonntag … 6 = Samstag */
export function weekday(day: Day): number {
  return dayToDate(day).getUTCDay();
}

export function isValidDay(value: string): value is Day {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(dayToDate(value).getTime());
}

export function formatDay(day: Day, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Intl.DateTimeFormat("de-DE", { ...opts, timeZone: "UTC" }).format(dayToDate(day));
}

/** Montag der Woche, in der `day` liegt. */
export function startOfWeek(day: Day): Day {
  const wd = weekday(day);
  return addDays(day, wd === 0 ? -6 : 1 - wd);
}
