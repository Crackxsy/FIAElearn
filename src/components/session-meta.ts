import { BookOpen, LifeBuoy, RotateCcw, Timer, type LucideIcon } from "lucide-react";

export const SESSION_KIND: Record<string, { label: string; icon: LucideIcon; tone: "accent" | "neutral" | "warning" | "success" }> = {
  learn: { label: "Lernen", icon: BookOpen, tone: "accent" },
  rescue: { label: "Crashkurs", icon: LifeBuoy, tone: "warning" },
  review: { label: "Wiederholung", icon: RotateCcw, tone: "neutral" },
  simulation: { label: "Simulation", icon: Timer, tone: "success" },
};
