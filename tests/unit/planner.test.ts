import { describe, expect, it } from "vitest";
import { buildPlan, sessionDays, type PlannerInput, type PlannerTopic } from "@/lib/domain/planner";
import { addDays } from "@/lib/domain/dates";

const topics: PlannerTopic[] = Array.from({ length: 12 }, (_, i) => ({
  id: `t${i}`,
  examPartId: "AP1",
  title: `Thema ${i}`,
  weight: (i % 5) + 1,
  baseHours: 4,
  mustKnow: i % 3 === 0,
  mastery: 0,
  order: i,
}));

const base: PlannerInput = {
  today: "2026-10-19",
  studyStart: "2026-10-19",
  examDate: addDays("2026-10-19", 90),
  phase: "AP1",
  targetGrade: 3,
  rescueMode: false,
  rhythm: "DAILY",
  minutesPerSession: 45,
  weekdays: [],
  topics,
};

describe("sessionDays", () => {
  it("Rhythmen", () => {
    expect(sessionDays("2026-10-19", "2026-10-29", "DAILY", [])).toHaveLength(10);
    expect(sessionDays("2026-10-19", "2026-10-29", "EVERY_2", [])).toHaveLength(5);
    expect(sessionDays("2026-10-19", "2026-10-29", "EVERY_3", [])).toHaveLength(4);
    // 19.10.2026 ist ein Montag → Samstage: 24.10.
    expect(sessionDays("2026-10-19", "2026-10-29", "WEEKLY", [6])).toEqual(["2026-10-24"]);
  });
});

describe("buildPlan", () => {
  it("genug Zeit → gut, alle Themen geplant, Simulationen am Ende", () => {
    const plan = buildPlan(base);
    expect(plan.status).toBe("gut");
    expect(plan.droppedTopicIds).toHaveLength(0);
    expect(plan.sessions).toHaveLength(90);
    expect(plan.sessions.some((s) => s.kind === "simulation")).toBe(true);
    const lastLearn = plan.sessions.filter((s) => s.kind === "learn").at(-1)!;
    const firstSim = plan.sessions.find((s) => s.kind === "simulation")!;
    expect(lastLearn.day < firstSim.day).toBe(true);
    for (const t of topics) expect(plan.sessions.some((s) => s.topicIds.includes(t.id))).toBe(true);
  });

  it("wenig Zeit → kritisch, Rettungsmodus empfohlen, Themen priorisiert", () => {
    const plan = buildPlan({ ...base, examDate: addDays(base.today, 14), rhythm: "WEEKLY", weekdays: [6], minutesPerSession: 60 });
    expect(plan.status).toBe("kritisch");
    expect(plan.suggestRescue).toBe(true);
    expect(plan.droppedTopicIds.length).toBeGreaterThan(0);
  });

  it("Rettungsmodus plant nur Pflicht-/Kernthemen", () => {
    const plan = buildPlan({ ...base, rescueMode: true });
    const planned = new Set(plan.sessions.flatMap((s) => s.topicIds));
    for (const id of planned) {
      const t = topics.find((x) => x.id === id)!;
      expect(t.mustKnow || t.weight >= 4).toBe(true);
    }
    expect(plan.sessions.some((s) => s.kind === "rescue")).toBe(true);
  });

  it("höhere Zielnote braucht mehr Zeit", () => {
    expect(buildPlan({ ...base, targetGrade: 1 }).requiredMinutes).toBeGreaterThan(buildPlan({ ...base, targetGrade: 4 }).requiredMinutes);
  });

  it("Empfehlung liefert alle Rhythmen", () => {
    const plan = buildPlan(base);
    expect(plan.options.map((o) => o.rhythm)).toEqual(["DAILY", "EVERY_2", "EVERY_3", "WEEKLY"]);
    expect(plan.recommended).not.toBeNull();
  });

  it("Prüfung vorbei", () => {
    expect(buildPlan({ ...base, examDate: "2026-10-01" }).status).toBe("vorbei");
  });

  it("Start in der Zukunft", () => {
    const plan = buildPlan({ ...base, studyStart: addDays(base.today, 30) });
    expect(plan.sessions[0].day).toBe(addDays(base.today, 30));
  });
});
