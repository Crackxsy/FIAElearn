import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggleIcon } from "@/components/theme";
import { buttonClass } from "@/components/ui";
import { getSessionUser } from "@/lib/auth/session";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="glass sticky top-0 z-30 border-b border-line">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="Startseite">
            <Logo />
          </Link>
          <nav className="flex items-center gap-1.5">
            <ThemeToggleIcon />
            {user ? (
              <Link href="/dashboard" className={buttonClass("primary", "sm")}>
                Zur App
              </Link>
            ) : (
              <>
                <Link href="/login" className={buttonClass("ghost", "sm", "hidden sm:inline-flex")}>
                  Anmelden
                </Link>
                <Link href="/registrieren" className={buttonClass("primary", "sm")}>
                  Kostenlos starten
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-[13px] text-fg-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo size={18} />
          <p className="max-w-xl">
            Alle Übungsaufgaben sind eigene Aufgaben – keine Original-IHK-Prüfungen. Prüfungsregeln nach FIAusbV 2020; Termine und lokale Vorgaben immer bei der SIHK zu Hagen prüfen.
          </p>
        </div>
      </footer>
    </div>
  );
}
