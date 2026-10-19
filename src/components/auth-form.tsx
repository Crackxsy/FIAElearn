"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, registerAction, type FormState } from "@/app/actions/auth";
import { Button, Label } from "./ui";

export function AuthForm({ mode, next }: { mode: "login" | "register"; next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(mode === "login" ? loginAction : registerAction, undefined);
  const fe = state?.fieldErrors ?? {};
  return (
    <form action={action} className="space-y-4" noValidate>
      {next && <input type="hidden" name="next" value={next} />}
      {mode === "register" && (
        <label className="block">
          <Label>Name</Label>
          <input name="name" autoComplete="given-name" className="input" placeholder="Wie sollen wir dich nennen?" required />
          {fe.name && <p className="mt-1 text-[13px] text-danger">{fe.name}</p>}
        </label>
      )}
      <label className="block">
        <Label>E-Mail</Label>
        <input name="email" type="email" autoComplete="email" className="input" placeholder="du@beispiel.de" required />
        {fe.email && <p className="mt-1 text-[13px] text-danger">{fe.email}</p>}
      </label>
      <label className="block">
        <Label hint={mode === "register" ? "mind. 8 Zeichen" : undefined}>Passwort</Label>
        <input
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="input"
          required
          minLength={mode === "register" ? 8 : undefined}
        />
        {fe.password && <p className="mt-1 text-[13px] text-danger">{fe.password}</p>}
      </label>
      {state?.error && <p className="rounded-xl bg-danger-soft px-3 py-2 text-[14px] text-danger">{state.error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Einen Moment …" : mode === "login" ? "Anmelden" : "Konto erstellen"}
      </Button>
      <p className="text-center text-[14px] text-fg-2">
        {mode === "login" ? (
          <>
            Noch kein Konto?{" "}
            <Link href="/registrieren" className="font-medium text-accent">
              Registrieren
            </Link>
          </>
        ) : (
          <>
            Schon registriert?{" "}
            <Link href="/login" className="font-medium text-accent">
              Anmelden
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
