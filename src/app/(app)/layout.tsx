import { AppShell } from "@/components/app-shell";
import { requireProfile } from "@/lib/dal";
import { dueCounts } from "@/lib/services/selection";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await requireProfile();
  const due = await dueCounts(user.id);
  return (
    <AppShell userName={user.name} dueCount={due.total} rescueMode={profile.rescueMode}>
      {children}
    </AppShell>
  );
}
