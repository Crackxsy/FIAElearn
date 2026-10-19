import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ChevronRight, Library, LogOut, MessagesSquare, Settings, Timer } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { ThemeSwitcher } from "@/components/theme";
import { logoutAction } from "@/app/actions/auth";
import { requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Mehr" };

const ITEMS = [
  { href: "/simulation", label: "Prüfung simulieren", icon: Timer },
  { href: "/fachgespraech", label: "Fachgespräch-Training", icon: MessagesSquare },
  { href: "/statistik", label: "Statistik", icon: BarChart3 },
  { href: "/quellen", label: "Quellen & Regeln", icon: Library },
  { href: "/einstellungen", label: "Einstellungen", icon: Settings },
];

export default async function MorePage() {
  const { user } = await requireProfile();
  return (
    <div>
      <PageHeader title="Mehr" description={user.email} />
      <Card className="divide-y divide-line">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 px-5 py-4 transition hover:bg-fill">
            <Icon size={19} className="text-accent" />
            <span className="flex-1 font-medium">{label}</span>
            <ChevronRight size={17} className="text-fg-3" />
          </Link>
        ))}
      </Card>
      <Card className="mt-6 flex items-center justify-between p-5">
        <span className="font-medium">Darstellung</span>
        <ThemeSwitcher />
      </Card>
      <form action={logoutAction} className="mt-6">
        <button className="card flex w-full items-center gap-3 px-5 py-4 text-left font-medium text-danger">
          <LogOut size={19} /> Abmelden
        </button>
      </form>
    </div>
  );
}
