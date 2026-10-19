import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";

// DSGVO Art. 15/20: alle eigenen Daten als JSON herunterladen.
export async function GET() {
  const user = await getSessionUser();
  if (!user) return new Response("Nicht angemeldet", { status: 401 });
  const data = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      profile: true,
      masteries: true,
      attempts: true,
      reviewItems: true,
      studySessions: true,
      simulations: true,
      activity: true,
    },
  });
  return new Response(JSON.stringify({ exportedAt: new Date().toISOString(), ...data }, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="fiaelearn-export.json"`,
      "Cache-Control": "no-store",
    },
  });
}
