"use client";

import { Check, SkipForward, Undo2 } from "lucide-react";
import { useTransition } from "react";
import { setSessionStatusAction } from "@/app/actions/learning";
import { Button } from "./ui";

export function SessionStatusButtons({ id, status, size = "sm" }: { id: string; status: string; size?: "sm" | "md" }) {
  const [pending, start] = useTransition();
  if (status !== "planned") {
    return (
      <Button variant="ghost" size={size} disabled={pending} onClick={() => start(() => setSessionStatusAction(id, "planned"))}>
        <Undo2 size={14} /> Zurücksetzen
      </Button>
    );
  }
  return (
    <div className="flex gap-1.5">
      <Button variant="ghost" size={size} disabled={pending} onClick={() => start(() => setSessionStatusAction(id, "skipped"))}>
        <SkipForward size={14} /> Überspringen
      </Button>
      <Button variant="secondary" size={size} disabled={pending} onClick={() => start(() => setSessionStatusAction(id, "done"))}>
        <Check size={14} /> Erledigt
      </Button>
    </div>
  );
}
