import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { LogoMark } from "@/components/logo";
import { getSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Registrieren" };

export default async function RegisterPage() {
  if (await getSessionUser()) redirect("/dashboard");
  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-16">
      <LogoMark size={40} className="mx-auto text-fg" />
      <h1 className="title-lg mt-5 text-center">Konto erstellen</h1>
      <p className="mt-2 mb-8 text-center text-fg-2">Kostenlos. Danach richten wir in drei Minuten deinen Lernplan ein.</p>
      <AuthForm mode="register" />
      <p className="mt-6 text-center text-[12px] leading-relaxed text-fg-3">
        Wir speichern nur, was für deinen Lernfortschritt nötig ist. Du kannst deine Daten jederzeit exportieren und dein Konto löschen.
      </p>
    </div>
  );
}
