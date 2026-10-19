import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <LogoMark size={44} className="text-fg" />
      <h1 className="title-xl mt-6">404 – nicht gefunden</h1>
      <p className="mt-2 text-fg-2">Diese Seite gibt es nicht (mehr).</p>
      <Link href="/dashboard" className={buttonClass("primary", "md", "mt-8")}>
        Zur Übersicht
      </Link>
    </div>
  );
}
