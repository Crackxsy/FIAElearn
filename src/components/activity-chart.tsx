"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { day: string; label: string; minutes: number; questions: number; correct: number };

function TooltipBox({ active, payload }: { active?: boolean; payload?: { payload: Point }[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 text-[12px] shadow-float">
      <p className="font-semibold">{p.label}</p>
      <p className="text-fg-2">{p.minutes} Min. Lernzeit</p>
      <p className="text-fg-2">
        {p.questions} Aufgaben{p.questions ? ` · ${Math.round((p.correct / p.questions) * 100)} % richtig` : ""}
      </p>
    </div>
  );
}

export function ActivityChart({ data }: { data: Point[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }} barCategoryGap={3}>
          <CartesianGrid vertical={false} stroke="var(--line)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "var(--fg-3)", fontSize: 11 }} interval={4} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--fg-3)", fontSize: 11 }} allowDecimals={false} />
          <Tooltip content={<TooltipBox />} cursor={{ fill: "var(--fill)" }} />
          <Bar dataKey="minutes" name="Lernzeit (Min.)" fill="var(--accent)" radius={[4, 4, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
