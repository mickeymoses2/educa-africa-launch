import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { NotificationCard } from "@/components/educa/NotificationCard";
import { notifications } from "@/data/educa";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/notifications")({
  head: () => ({ meta: [{ title: "Notifications · EDUCA" }] }),
  component: NotificationsPage,
});

const tabs = ["All", "Unread"] as const;

function NotificationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = tab === "All" ? notifications : notifications.filter((n) => !n.read);

  return (
    <PortalShell
      role="parent"
      title="Notifications"
      subtitle="Real-time updates on your applications and school activity."
      actions={
        <button className="inline-flex items-center gap-2 rounded-full bg-muted text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted/70 transition">
          <CheckCheck className="h-4 w-4" /> Mark all as read
        </button>
      }
    >
      <div className="flex gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold border transition",
              tab === t
                ? "bg-navy text-white border-navy"
                : "bg-card text-muted-foreground border-border hover:text-navy",
            )}
          >
            {t}
            {t === "Unread" && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-gold text-gold-foreground text-[10px] font-bold">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {list.map((n) => (
          <NotificationCard key={n.id} n={n} />
        ))}
      </div>
    </PortalShell>
  );
}