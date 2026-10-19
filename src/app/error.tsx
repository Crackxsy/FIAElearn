"use client";

import { Button } from "@/components/ui";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-4 text-center">
      <h1 className="title-lg">Da ist etwas schiefgelaufen.</h1>
      <p className="mt-2 text-fg-2">Bitte versuche es erneut. Dein Fortschritt ist gespeichert.</p>
      <Button className="mt-6" onClick={reset}>
        Erneut versuchen
      </Button>
    </div>
  );
}
