import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggleIcon } from "@/components/theme";
import { requireUser } from "@/lib/dal";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <ThemeToggleIcon />
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">{children}</main>
    </div>
  );
}
