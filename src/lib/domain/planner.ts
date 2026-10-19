// Lernplaner: berechnet Lernbedarf, Machbarkeit, Rhythmus-Empfehlung und einen konkreten Sessionplan.
import { addDays, diffDays, weekday, type Day } from "./dates";
import { EXAM_PARTS, partsForPhase, WRITTEN_PARTS, type ExamPartId, type Phase } from "./exam";

export type Rhythm = "DAILY" | "EVERY_2" | "EVERY_3" | "WEEKLY";

export const RHYTHM_LABELS: Record<Rhythm, string> = {
  DAILY: "Jeden Tag",
  EVERY_2: "Alle 2 Tage",
  EVERY_3: "Alle 3 Tage",
  WEEKLY: "Feste Wochentage",
};

export type PlannerTopic = {
  id: string;
  examPartId: ExamPartId;
  title: string;
  weight: number;
  baseHours: number;
  mustKnow: boolean;
  mastery: number;
  order: number;
};

export type PlannerInput = {
  today: Day;
  studyStart: Day;
  examDate: Day | null;
  phase: Phase;
  targetGrade: number;
  rescueMode: boolean;
  rhythm: Rhythm;
  minutesPerSession: number;
  /** Nur für WEEKLY: 0 = So … 6 = Sa */
  weekdays: number[];
  topics: PlannerTopic[];
};

export type SessionKind = "learn" | "review" | "simulation" | "rescue";

export type PlannedSession = {
  day: Day;
  minutes: number;
  kind: SessionKind;
  examPartId: ExamPartId | null;
  topicIds: string[];
  title: string;
};

export type RhythmOption = {
  rhythm: Rhythm;
  label: string;
  /** Minuten pro Session (bei WEEKLY: pro Woche bei einer Session) */
  minutes: number;
  sessions: number;
  verdict: "entspannt" | "machbar" | "anstrengend" | "unrealistisch";
};

export type FeasibilityStatus = "gut" | "knapp" | "kritisch" | "offen" | "vorbei";

export type PlanResult = {
  status: FeasibilityStatus;
  daysLeft: number | null;
  requiredMinutes: number;
  availableMinutes: number;
  ratio: number | null;
  sessionsCount: number;
  options: RhythmOption[];
  recommended: RhythmOption | null;
  selectedTopicIds: string[];
  droppedTopicIds: string[];
  suggestRescue: boolean;
  targetMastery: number;
  requiredByPart: Partial<Record<ExamPartId, number>>;
  sessions: PlannedSession[];
};

/** Ziel-Wissensstand, um die Wunschnote realistisch zu erreichen (Puffer für Prüfungsstress eingerechnet). */
export const TARGET_MASTERY: Record<number, number> = { 1: 0.95, 2: 0.86, 3: 0.74, 4: 0.6 };
export const RESCUE_TARGET = 0.6;

/** Planungsgewicht je Bereich (das Projekt hängt v. a. vom echten Projekt ab, nicht vom Pauken). */
const PLAN_WEIGHT: Record<ExamPartId, number> = {
  AP1: 1,
  AP2_PROJEKT: 1.4,
  AP2_SOFTWARE: 1.1,
  AP2_ALGO: 1.2,
  AP2_WISO: 1,
};

const REVIEW_OVERHEAD = 0.25;
const SIMULATIONS_PER_PART = 2;
const FINAL_PHASE_DAYS = 14;
const DEFAULT_HORIZON_DAYS = 56;
const MIN_CHUNK = 15;

export function targetMasteryFor(grade: number, rescue: boolean) {
  return rescue ? RESCUE_TARGET : (TARGET_MASTERY[grade] ?? TARGET_MASTERY[3]);
}

export function topicNeedMinutes(topic: PlannerTopic, target: number): number {
  return Math.max(0, target - topic.mastery) * topic.baseHours * 60;
}

function simulationMinutes(phase: Phase): number {
  const parts = partsForPhase(phase).filter((p) => WRITTEN_PARTS.includes(p));
  const sims = parts.reduce((sum, p) => sum + SIMULATIONS_PER_PART * ((EXAM_PARTS[p].durationMin ?? 60) + 30), 0);
  // Fachgesprächstraining für das Projekt
  return sims + (phase === "AP2" ? 3 * 45 : 0);
}

/** Lerntage im Zeitraum [start, end) gemäß Rhythmus. */
export function sessionDays(start: Day, end: Day, rhythm: Rhythm, weekdays: number[]): Day[] {
  const days: Day[] = [];
  const total = diffDays(start, end);
  const step = rhythm === "EVERY_2" ? 2 : rhythm === "EVERY_3" ? 3 : 1;
  const allowed = weekdays.length ? weekdays : [6];
  for (let i = 0; i < total; i += step) {
    const day = addDays(start, i);
    if (rhythm === "WEEKLY" && !allowed.includes(weekday(day))) continue;
    days.push(day);
  }
  return days;
}

function roundUp5(n: number) {
  return Math.max(15, Math.ceil(n / 5) * 5);
}

function verdictFor(minutes: number): RhythmOption["verdict"] {
  if (minutes <= 45) return "entspannt";
  if (minutes <= 90) return "machbar";
  if (minutes <= 150) return "anstrengend";
  return "unrealistisch";
}

export function rhythmOptions(requiredMinutes: number, start: Day, end: Day, weekdays: number[]): RhythmOption[] {
  const list: RhythmOption[] = [];
  for (const rhythm of ["DAILY", "EVERY_2", "EVERY_3", "WEEKLY"] as Rhythm[]) {
    const n = sessionDays(start, end, rhythm, rhythm === "WEEKLY" ? (weekdays.length ? weekdays : [6]) : []).length;
    if (n === 0) continue;
    const minutes = roundUp5(requiredMinutes / n);
    list.push({ rhythm, label: RHYTHM_LABELS[rhythm], minutes, sessions: n, verdict: verdictFor(minutes) });
  }
  return list;
}

/** Bevorzugt den seltensten Rhythmus, bei dem eine Session höchstens ~75 Minuten dauert. */
function pickRecommended(options: RhythmOption[]): RhythmOption | null {
  if (!options.length) return null;
  const order: Rhythm[] = ["EVERY_2", "DAILY", "EVERY_3", "WEEKLY"];
  const comfortable = options
    .filter((o) => o.minutes <= 75)
    .sort((a, b) => order.indexOf(a.rhythm) - order.indexOf(b.rhythm));
  if (comfortable.length) {
    // Täglich kurze Sessions sind besser als selten lange – aber unter 20 Min. lohnt "alle 2 Tage" mehr.
    const daily = comfortable.find((o) => o.rhythm === "DAILY");
    const every2 = comfortable.find((o) => o.rhythm === "EVERY_2");
    if (every2 && every2.minutes >= 30) return every2;
    if (daily) return daily;
    return comfortable[0];
  }
  return options.find((o) => o.rhythm === "DAILY") ?? options[0];
}

/** Wert eines Themas pro Lernminute (für Priorisierung bei Zeitmangel / Rettungsmodus). */
function topicValue(topic: PlannerTopic, need: number) {
  const base = topic.weight * PLAN_WEIGHT[topic.examPartId] * (topic.mustKnow ? 1.6 : 1);
  return base / Math.max(need, 10);
}

export function buildPlan(input: PlannerInput): PlanResult {
  const parts = partsForPhase(input.phase);
  const topics = input.topics.filter((t) => parts.includes(t.examPartId));
  const start = input.studyStart > input.today ? input.studyStart : input.today;
  const target = targetMasteryFor(input.targetGrade, input.rescueMode);

  const hasExam = input.examDate != null;
  const end = hasExam ? (input.examDate as Day) : addDays(start, DEFAULT_HORIZON_DAYS);
  const daysLeft = hasExam ? diffDays(input.today, end) : null;

  const empty = (status: FeasibilityStatus): PlanResult => ({
    status,
    daysLeft,
    requiredMinutes: 0,
    availableMinutes: 0,
    ratio: null,
    sessionsCount: 0,
    options: [],
    recommended: null,
    selectedTopicIds: [],
    droppedTopicIds: [],
    suggestRescue: false,
    targetMastery: target,
    requiredByPart: {},
    sessions: [],
  });
  if (hasExam && diffDays(start, end) <= 0) return empty("vorbei");

  // Rettungsmodus: nur Pflichtthemen und Themen mit hoher Prüfungsrelevanz.
  const candidates = input.rescueMode ? topics.filter((t) => t.mustKnow || t.weight >= 4) : topics;
  const needs = new Map(candidates.map((t) => [t.id, topicNeedMinutes(t, target)]));

  const simMinutes = simulationMinutes(input.phase);
  const learnNeed = [...needs.values()].reduce((a, b) => a + b, 0);
  const requiredMinutes = Math.round(learnNeed * (1 + REVIEW_OVERHEAD) + simMinutes);

  const days = sessionDays(start, end, input.rhythm, input.weekdays);
  const minutes = Math.max(10, input.minutesPerSession);
  const availableMinutes = days.length * minutes;
  const ratio = requiredMinutes > 0 ? availableMinutes / requiredMinutes : null;

  // Auswahl: Wenn die Zeit nicht reicht, gewinnen Themen mit dem meisten Punktenutzen pro Minute.
  const learnCapacity = Math.max(0, (availableMinutes - Math.min(simMinutes, availableMinutes * 0.25)) / (1 + REVIEW_OVERHEAD));
  const ranked = candidates
    .filter((t) => (needs.get(t.id) ?? 0) > 0)
    .sort((a, b) => topicValue(b, needs.get(b.id)!) - topicValue(a, needs.get(a.id)!));
  const selected: PlannerTopic[] = [];
  const dropped: string[] = [];
  let used = 0;
  for (const t of ranked) {
    const need = needs.get(t.id)!;
    if (used + need <= learnCapacity * 1.05 || selected.length === 0) {
      selected.push(t);
      used += need;
    } else if (used < learnCapacity && need > 0) {
      // Teilweise lernen ist besser als gar nicht.
      selected.push(t);
      needs.set(t.id, learnCapacity - used);
      used = learnCapacity;
    } else {
      dropped.push(t.id);
    }
  }
  if (input.rescueMode) dropped.push(...topics.filter((t) => !candidates.includes(t)).map((t) => t.id));

  const requiredByPart: Partial<Record<ExamPartId, number>> = {};
  for (const t of candidates) {
    requiredByPart[t.examPartId] = Math.round((requiredByPart[t.examPartId] ?? 0) + (needs.get(t.id) ?? 0));
  }

  let status: FeasibilityStatus = "offen";
  if (hasExam && ratio != null) status = ratio >= 1 ? "gut" : ratio >= 0.8 ? "knapp" : "kritisch";
  if (hasExam && ratio == null) status = "gut";

  const avgMastery = topics.length ? topics.reduce((s, t) => s + t.mastery, 0) / topics.length : 0;
  const suggestRescue =
    !input.rescueMode && hasExam && ((ratio != null && ratio < 0.6) || (avgMastery < 0.25 && (daysLeft ?? 999) < 45));

  const options = rhythmOptions(requiredMinutes, start, end, input.weekdays);

  const sessions = scheduleSessions({
    days,
    minutes,
    end,
    hasExam,
    phase: input.phase,
    rescue: input.rescueMode,
    topics: selected,
    needs,
    allTopics: topics,
  });

  return {
    status,
    daysLeft,
    requiredMinutes,
    availableMinutes,
    ratio: ratio == null ? null : Math.round(ratio * 100) / 100,
    sessionsCount: days.length,
    options,
    recommended: pickRecommended(options),
    selectedTopicIds: selected.map((t) => t.id),
    droppedTopicIds: dropped,
    suggestRescue,
    targetMastery: target,
    requiredByPart,
    sessions,
  };
}

function scheduleSessions(args: {
  days: Day[];
  minutes: number;
  end: Day;
  hasExam: boolean;
  phase: Phase;
  rescue: boolean;
  topics: PlannerTopic[];
  needs: Map<string, number>;
  allTopics: PlannerTopic[];
}): PlannedSession[] {
  const { days, minutes, end, hasExam, phase, rescue, topics, needs, allTopics } = args;
  const sessions: PlannedSession[] = [];
  const title = (id: string) => allTopics.find((t) => t.id === id)?.title ?? id;

  // Schlussphase: Simulationen + gezielte Wiederholung
  const finalStart = hasExam ? addDays(end, -Math.min(FINAL_PHASE_DAYS, Math.max(3, Math.floor(days.length / 4)))) : end;
  const learnDays = days.filter((d) => d < finalStart);
  const finalDays = days.filter((d) => d >= finalStart);

  // Lernblöcke je Bereich vorbereiten (Lehrplan-Reihenfolge, im Rettungsmodus Pflichtthemen zuerst).
  const queues = new Map<ExamPartId, { id: string; remaining: number }[]>();
  const sorted = [...topics].sort((a, b) =>
    rescue ? Number(b.mustKnow) - Number(a.mustKnow) || a.order - b.order : a.order - b.order,
  );
  for (const t of sorted) {
    const remaining = Math.round(needs.get(t.id) ?? 0);
    if (remaining <= 0) continue;
    if (!queues.has(t.examPartId)) queues.set(t.examPartId, []);
    queues.get(t.examPartId)!.push({ id: t.id, remaining });
  }
  const partRemaining = (p: ExamPartId) => (queues.get(p) ?? []).reduce((s, q) => s + q.remaining, 0);

  let lastPart: ExamPartId | null = null;
  learnDays.forEach((day, index) => {
    const isReviewSlot = (index + 1) % 4 === 0;
    const partsLeft = [...queues.keys()].filter((p) => partRemaining(p) > 0);
    if (isReviewSlot || partsLeft.length === 0) {
      sessions.push({
        day,
        minutes,
        kind: "review",
        examPartId: null,
        topicIds: [],
        title: partsLeft.length === 0 ? "Vertiefen: schwächste Themen + fällige Karten" : "Wiederholung: fällige Karten & Fehler",
      });
      return;
    }
    // Interleaving: Bereich mit dem größten Rest, aber möglichst nicht zweimal hintereinander.
    partsLeft.sort((a, b) => partRemaining(b) * PLAN_WEIGHT[b] - partRemaining(a) * PLAN_WEIGHT[a]);
    const part = partsLeft.length > 1 && partsLeft[0] === lastPart ? partsLeft[1] : partsLeft[0];
    lastPart = part;
    const queue = queues.get(part)!;
    let left = minutes;
    const ids: string[] = [];
    while (left >= MIN_CHUNK && queue.length && ids.length < 2) {
      const head = queue[0];
      const chunk = Math.min(head.remaining, left);
      head.remaining -= chunk;
      left -= chunk;
      ids.push(head.id);
      if (head.remaining < MIN_CHUNK / 2) queue.shift();
    }
    if (!ids.length && queue.length) ids.push(queue[0].id);
    sessions.push({
      day,
      minutes,
      kind: rescue ? "rescue" : "learn",
      examPartId: part,
      topicIds: ids,
      title: `${rescue ? "Crashkurs" : "Lernen"}: ${ids.map(title).join(" + ")}`,
    });
  });

  // Schlussphase: abwechselnd Simulation und Fehler-Wiederholung
  const simParts = partsForPhase(phase).filter((p) => WRITTEN_PARTS.includes(p));
  const projectTraining = phase === "AP2";
  let simIndex = 0;
  finalDays.forEach((day, index) => {
    const isSim = index % 2 === 0 || finalDays.length <= simParts.length;
    if (isSim && simIndex < simParts.length * SIMULATIONS_PER_PART) {
      const part = simParts[simIndex % simParts.length];
      simIndex++;
      const duration = EXAM_PARTS[part].durationMin ?? 60;
      const full = minutes >= duration;
      sessions.push({
        day,
        minutes,
        kind: "simulation",
        examPartId: part,
        topicIds: [],
        title: full
          ? `Prüfungssimulation ${EXAM_PARTS[part].short} (${duration} Min.)`
          : `Teil-Simulation ${EXAM_PARTS[part].short} (${minutes} Min.)`,
      });
    } else if (projectTraining && index % 3 === 1) {
      sessions.push({
        day,
        minutes,
        kind: "review",
        examPartId: "AP2_PROJEKT",
        topicIds: [],
        title: "Fachgespräch-Training + Präsentation üben",
      });
    } else {
      sessions.push({
        day,
        minutes,
        kind: "review",
        examPartId: null,
        topicIds: [],
        title: "Schwächen gezielt wiederholen",
      });
    }
  });

  return sessions;
}
