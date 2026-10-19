import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { getProfile, requireUser } from "@/lib/dal";
import { today } from "@/lib/domain/dates";

export const metadata: Metadata = { title: "Einrichtung" };

export default async function OnboardingPage({ searchParams }: PageProps<"/onboarding">) {
  const user = await requireUser();
  const profile = await getProfile(user.id);
  const { neu } = await searchParams;
  if (profile?.onboardingDone && neu !== "1") redirect("/dashboard");
  return <OnboardingWizard today={today()} name={user.name} />;
}
