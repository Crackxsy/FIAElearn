import "server-only";
import { randomUUID } from "node:crypto";

/** Eindeutiger Schlüssel pro Server-Render – setzt Client-Runner bei „Neue Runde“ zurück. */
export function renderNonce() {
  return randomUUID();
}
