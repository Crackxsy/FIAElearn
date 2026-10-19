"use client";

import { RefreshCw } from "lucide-react";
import { useTransition } from "react";
import { regeneratePlanAction } from "@/app/actions/onboarding";
import { Button } from "./ui";

export function RegenerateButton() {
  const [pending, start] = useTransition();
  return (
    <Button variant="secondary" disabled={pending} onClick={() => start(() => regeneratePlanAction())}>
      <RefreshCw size={15} className={pending ? "animate-spin" : ""} /> {pending ? "Berechne …" : "Plan neu berechnen"}
    </Button>
  );
}
