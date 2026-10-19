"use client";

import { useEffect, useRef } from "react";
import { addMinutesAction } from "@/app/actions/learning";

/** Schreibt die Lesezeit einer Lektion gut (maximal 20 Minuten pro Aufruf). */
export function LessonTimer() {
  const start = useRef(0);
  useEffect(() => {
    start.current = Date.now();
    const flush = () => {
      const minutes = Math.min(20, Math.round((Date.now() - start.current) / 60_000));
      if (minutes >= 1) {
        start.current = Date.now();
        void addMinutesAction(minutes);
      }
    };
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      flush();
    };
  }, []);
  return null;
}
