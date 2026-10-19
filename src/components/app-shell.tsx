"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  House,
  Library,
  LogOut,
  MessagesSquare,
  MoreHorizontal,
  RotateCcw,
  Settings,
  Timer,
  LifeBuoy,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./logo";
import { ThemeToggleIcon } from "./theme";
import { cx } from "./ui";
import { logoutAction } from "@/app/actions/auth";

const NAV = [
  { href: "/dashboard", label: "Übersicht", icon: House },
  { href: "/plan", label: "Lernplan", icon: CalendarDays },
  { href: "/lernen", label: "Lernen", icon: BookOpen },
  { href: "/wiederholen", label: "Wiederholen", icon: RotateCcw, badge: true },
  { href: "/simulation", label: "Prüfung simulieren", icon: Timer },
  { href: "/fachgespraech", label: "Fachgespräch", icon: MessagesSquare },
  { href: "/statistik", label: "Statistik", icon: BarChart3 },
  { href: "/quellen", label: "Quellen & Regeln", icon: Library },
  { href: "/einstellungen", label: "Einstellungen", icon: Settings },
];

const MOBILE = [
  { href: "/dashboard", label: "Übersicht", icon: House },
  { href: "/plan", label: "Plan", icon: CalendarDays },
  { href: "/lernen", label: "Lernen", icon: BookOpen },
  { href: "/wiederholen", label: "Wiederholen", icon: RotateCcw, badge: true },
  { href: "/mehr", label: "Mehr", icon: MoreHorizontal },
];

function isActive(pathname: string, href: string) {
  if (href === "/lernen") return pathname.startsWith("/lernen") || pathname.startsWith("/thema") || pathname.startsWith("/quiz") || pathname.startsWith("/karteikarten");
  if (href === "/mehr") return ["/simulation", "/fachgespraech", "/statistik", "/quellen", "/einstellungen", "/mehr"].some((p) => pathname.startsWith(p));
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({
  children,
  userName,
  dueCount,
  rescueMode,
}: {
  children: ReactNode;
  userName: string;
  dueCount: number;
  rescueMode: boolean;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-dvh">
      {/* Desktop-Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-line bg-surface-2/80 px-3 py-5 backdrop-blur-xl lg:flex">
        <Link href="/dashboard" className="mb-6 px-3">
          <Logo />
        </Link>
        {rescueMode && (
          <Link href="/einstellungen#ziele" className="mx-2 mb-4 flex items-center gap-2 rounded-xl bg-warning-soft px-3 py-2 text-[13px] font-medium text-warning">
            <LifeBuoy size={16} /> Rettungsmodus aktiv
          </Link>
        )}
        <nav className="flex flex-1 flex-col gap-0.5">
          {NAV.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={cx(
                  "group flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] transition",
                  active ? "bg-fill-strong font-medium text-fg" : "text-fg-2 hover:bg-fill hover:text-fg",
                )}
              >
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                <span className="flex-1">{label}</span>
                {badge && dueCount > 0 && (
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[11px] leading-none font-semibold text-white">{dueCount > 99 ? "99+" : dueCount}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 flex items-center gap-2 border-t border-line px-2 pt-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-ink-fg">
            {userName.slice(0, 1).toUpperCase()}
          </div>
          <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{userName}</span>
          <ThemeToggleIcon />
          <form action={logoutAction}>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-2 transition hover:bg-fill hover:text-fg" aria-label="Abmelden">
              <LogOut size={17} />
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile-Kopfzeile */}
      <header className="glass sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line px-4 lg:hidden">
        <Link href="/dashboard">
          <Logo size={20} />
        </Link>
        <div className="flex items-center gap-1">
          {rescueMode && (
            <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-1 text-[11px] font-semibold text-warning">
              <LifeBuoy size={12} /> Rettung
            </span>
          )}
          <ThemeToggleIcon />
        </div>
      </header>

      <main className="lg:pl-[264px]">
        <div className="mx-auto w-full max-w-[1120px] px-4 pt-6 pb-28 sm:px-6 lg:px-10 lg:pt-10 lg:pb-16">{children}</div>
      </main>

      {/* Mobile-Tabbar */}
      <nav className="glass fixed inset-x-0 bottom-0 z-30 border-t border-line pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {MOBILE.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(pathname, href);
            return (
              <Link key={href} href={href} className={cx("relative flex flex-col items-center gap-0.5 py-2 text-[10.5px] font-medium", active ? "text-accent" : "text-fg-3")}>
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                {label}
                {badge && dueCount > 0 && (
                  <span className="absolute top-1 left-1/2 ml-2 min-w-4 rounded-full bg-danger px-1 text-center text-[10px] leading-4 font-semibold text-white">{dueCount > 99 ? "99+" : dueCount}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
