import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

export const getProfile = cache(async (userId: string) => db.studyProfile.findUnique({ where: { userId } }));

/** Nutzer + abgeschlossenes Onboarding, sonst Weiterleitung. */
export async function requireProfile() {
  const user = await requireUser();
  const profile = await getProfile(user.id);
  if (!profile || !profile.onboardingDone) redirect("/onboarding");
  return { user, profile };
}
