"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteAllSessions, deleteSession, getSessionUser } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean; message?: string } | undefined;

const registerSchema = z.object({
  name: z.string().trim().min(2, "Bitte gib deinen Namen an.").max(60),
  email: z.string().trim().toLowerCase().email("Bitte eine gültige E-Mail-Adresse eingeben.").max(200),
  password: z.string().min(8, "Mindestens 8 Zeichen.").max(200),
});

function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) out[String(issue.path[0])] ??= issue.message;
  return out;
}

function safeNext(value: FormDataEntryValue | null) {
  const v = typeof value === "string" ? value : "";
  return v.startsWith("/") && !v.startsWith("//") ? v : "/dashboard";
}

export async function registerAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!(await rateLimit("register", 10, 3600))) return { error: "Zu viele Versuche. Bitte später erneut probieren." };
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };
  const { name, email, password } = parsed.data;

  const exists = await db.user.findUnique({ where: { email } });
  if (exists) return { fieldErrors: { email: "Für diese E-Mail gibt es schon ein Konto." } };

  const user = await db.user.create({ data: { name, email, passwordHash: await hashPassword(password) } });
  await createSession(user.id);
  redirect("/onboarding");
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Bitte eine gültige E-Mail-Adresse eingeben."),
  password: z.string().min(1, "Bitte Passwort eingeben."),
});

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!(await rateLimit("login", 20, 900))) return { error: "Zu viele Anmeldeversuche. Bitte in 15 Minuten erneut probieren." };
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  // Immer hashen, damit die Antwortzeit nicht verrät, ob das Konto existiert.
  const valid = await verifyPassword(parsed.data.password, user?.passwordHash ?? null);
  if (!user || !valid) return { error: "E-Mail oder Passwort ist falsch." };

  await createSession(user.id);
  redirect(safeNext(formData.get("next")));
}

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}

const passwordSchema = z.object({
  current: z.string().min(1, "Bitte aktuelles Passwort eingeben."),
  next: z.string().min(8, "Mindestens 8 Zeichen.").max(200),
});

export async function changePasswordAction(_: FormState, formData: FormData): Promise<FormState> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");
  const parsed = passwordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };
  const user = await db.user.findUniqueOrThrow({ where: { id: sessionUser.id } });
  if (!(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return { fieldErrors: { current: "Das aktuelle Passwort stimmt nicht." } };
  }
  await db.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(parsed.data.next) } });
  await deleteAllSessions(user.id);
  await createSession(user.id);
  return { ok: true, message: "Passwort geändert. Andere Geräte wurden abgemeldet." };
}

export async function deleteAccountAction(_: FormState, formData: FormData): Promise<FormState> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");
  const user = await db.user.findUniqueOrThrow({ where: { id: sessionUser.id } });
  const password = String(formData.get("password") ?? "");
  if (!(await verifyPassword(password, user.passwordHash))) {
    return { fieldErrors: { password: "Passwort stimmt nicht." } };
  }
  await db.user.delete({ where: { id: user.id } });
  await deleteSession();
  redirect("/?geloescht=1");
}
