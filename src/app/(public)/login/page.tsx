import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { LogoMark } from "@/components/logo";
import { getSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Anmelden" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (await getSessionUser()) redirect("/dashboard");
  const { next } = await searchParams;
  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-16">
      <LogoMark size={40} className="mx-auto text-fg" />
      <h1 className="title-lg mt-5 text-center">Willkommen zurück</h1>
      <p className="mt-2 mb-8 text-center text-fg-2">Melde dich an und lerne dort weiter, wo du aufgehört hast.</p>
      <AuthForm mode="login" next={typeof next === "string" ? next : undefined} />
    </div>
  );
}
