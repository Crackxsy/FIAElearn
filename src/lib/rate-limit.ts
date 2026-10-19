import "server-only";
import { headers } from "next/headers";
import { db } from "@/lib/db";

/** Einfaches, datenbankgestütztes Rate-Limit (funktioniert auch mit mehreren Instanzen). */
export async function rateLimit(scope: string, limit: number, windowSeconds: number): Promise<boolean> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const key = `${scope}:${ip}`;
  const now = new Date();
  const entry = await db.rateLimit.findUnique({ where: { key } });
  if (!entry || entry.resetAt < now) {
    await db.rateLimit.upsert({
      where: { key },
      create: { key, count: 1, resetAt: new Date(now.getTime() + windowSeconds * 1000) },
      update: { count: 1, resetAt: new Date(now.getTime() + windowSeconds * 1000) },
    });
    return true;
  }
  if (entry.count >= limit) return false;
  await db.rateLimit.update({ where: { key }, data: { count: { increment: 1 } } });
  return true;
}
