"use client";

import { useTransition } from "react";
import { gradeOpenSimAction } from "@/app/actions/simulation";
import { Button } from "./ui";

export function OpenGrader({ simId, questionId }: { simId: string; questionId: string }) {
  const [pending, start] = useTransition();
  const rate = (r: "full" | "partial" | "none") => start(() => gradeOpenSimAction(simId, questionId, r));
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[13px] font-medium">Selbst bewerten:</span>
      <Button size="sm" variant="danger" disabled={pending} onClick={() => rate("none")}>
        Nicht gewusst
      </Button>
      <Button size="sm" variant="secondary" disabled={pending} onClick={() => rate("partial")}>
        Teilweise
      </Button>
      <Button size="sm" variant="accent" disabled={pending} onClick={() => rate("full")}>
        Gewusst
      </Button>
    </div>
  );
}
