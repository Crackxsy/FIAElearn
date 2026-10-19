"use client";

import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore, type ReactNode } from "react";
import { cx } from "./ui";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}

const subscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

const OPTIONS = [
  { value: "light", label: "Hell", icon: Sun },
  { value: "dark", label: "Dunkel", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  return (
    <div className="inline-flex rounded-full bg-fill p-0.5" role="radiogroup" aria-label="Darstellung">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cx(
              "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium transition",
              active ? "bg-surface text-fg shadow-card" : "text-fg-2 hover:text-fg",
            )}
          >
            <Icon size={14} strokeWidth={2} />
            {!compact && label}
          </button>
        );
      })}
    </div>
  );
}

export function ThemeToggleIcon() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-2 transition hover:bg-fill hover:text-fg"
      aria-label={dark ? "Helles Design" : "Dunkles Design"}
    >
      {mounted ? dark ? <Sun size={18} /> : <Moon size={18} /> : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}
