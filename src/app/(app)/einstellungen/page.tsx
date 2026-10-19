import type { Metadata } from "next";
import Link from "next/link";
import { Download, RotateCcw } from "lucide-react";
import { buttonClass, Card, PageHeader, SectionTitle } from "@/components/ui";
import { ThemeSwitcher } from "@/components/theme";
import { DeleteAccountForm, PasswordForm, ProfileSettings } from "@/components/settings-form";
import { requireProfile } from "@/lib/dal";
import { today, toDay } from "@/lib/domain/dates";
import type { Phase } from "@/lib/domain/exam";
import type { Rhythm } from "@/lib/domain/planner";

export const metadata: Metadata = { title: "Einstellungen" };

export default async function SettingsPage() {
  const { user, profile } = await requireProfile();
  const d = (x: Date | null) => (x ? toDay(x) : "");
  return (
    <div>
      <PageHeader title="Einstellungen" description="Ändere Termine, Zielnote und Lernzeit – dein Plan rechnet sich danach automatisch neu." />
      <ProfileSettings
        today={today()}
        initial={{
          name: user.name,
          phase: profile.phase as Phase,
          trainingStart: d(profile.trainingStart),
          ap1Date: d(profile.ap1Date),
          ap2Date: d(profile.ap2Date),
          studyStart: d(profile.studyStart),
          targetGrade: profile.targetGrade,
          rescueMode: profile.rescueMode,
          rhythm: profile.rhythm as Rhythm,
          minutesPerSession: profile.minutesPerSession,
          weekdays: (profile.weekdays as number[] | null) ?? [],
        }}
      />

      <div className="mt-10 space-y-8">
        <section>
          <SectionTitle>Darstellung</SectionTitle>
          <Card className="flex items-center justify-between p-5">
            <span className="text-[15px]">Design</span>
            <ThemeSwitcher />
          </Card>
        </section>

        <section>
          <SectionTitle>Wissensstand</SectionTitle>
          <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <p className="flex-1 text-[14px] text-fg-2">Einstufungstest wiederholen oder die Einrichtung komplett neu durchlaufen.</p>
            <Link href="/einstufung" className={buttonClass("secondary")}>
              Einstufungstest
            </Link>
            <Link href="/onboarding?neu=1" className={buttonClass("ghost")}>
              <RotateCcw size={15} /> Einrichtung
            </Link>
          </Card>
        </section>

        <section>
          <SectionTitle>Konto</SectionTitle>
          <Card className="space-y-6 p-5 sm:p-6">
            <p className="text-[14px] text-fg-2">Angemeldet als {user.email}</p>
            <PasswordForm />
            <div className="border-t border-line pt-6">
              <p className="mb-3 font-medium">Deine Daten (DSGVO)</p>
              <div className="flex flex-wrap gap-2">
                <a href="/api/export" className={buttonClass("secondary")}>
                  <Download size={15} /> Daten exportieren (JSON)
                </a>
                <DeleteAccountForm />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
