import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/educa/PortalShell";
import { NotificationCard } from "@/components/educa/NotificationCard";
import { notifications } from "@/data/educa";

export const Route = createFileRoute("/student/notifications")({
  head: () => ({ meta: [{ title: "Notifications · EDUCA Student" }] }),
  component: StudentNotifPage,
});

function StudentNotifPage() {
  return (
    <PortalShell
      role="student"
      title="Notifications"
      subtitle="Updates about your applications, schools and profile."
    >
      <div className="grid gap-3">
        {notifications.map((n) => (
          <NotificationCard key={n.id} n={n} />
        ))}
      </div>
    </PortalShell>
  );
}