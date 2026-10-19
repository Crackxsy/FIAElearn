"use client";

import { Timer } from "lucide-react";
import { useTransition } from "react";
import { startSimulationAction } from "@/app/actions/simulation";
import { Button } from "./ui";

export function StartSimulationButton({ part, minutes, label = "Simulation starten", variant = "primary" }: { part: string; minutes?: number; label?: string; variant?: "primary" | "secondary" }) {
  const [pending, start] = useTransition();
  return (
    <Button variant={variant} disabled={pending} onClick={() => start(() => startSimulationAction(part, minutes))}>
      <Timer size={16} /> {pending ? "Wird vorbereitet …" : label}
    </Button>
  );
}
