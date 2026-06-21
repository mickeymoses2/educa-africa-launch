import { useState } from "react";
import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { GraduationCap, Inbox } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { ApplicationCard } from "@/components/educa/ApplicationCard";
import { EmptyState } from "@/components/educa/EmptyState";
import { myApplications } from "@/data/educa";
import type { Status } from "@/components/educa/StatusBadge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/applications")({
  head: () => ({ meta: [{ title: "My Applications · EDUCA" }] }),
  component: AppsLayout,
});

function AppsLayout() {
  const matches = useMatches();
  if (matches.some((m) => m.routeId === "/parent/applications/$id")) return <Outlet />;
  return <AppsList />;
}

const filters: ("All" | Status)[] = [
  "All",
  "Submitted",
  "Under Review",
  "Pending Documents",
  "Accepted",
  "Rejected",
  "Waitlisted",
];

function AppsList() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list =
    active === "All" ? myApplications : myApplications.filter((a) => a.status === active);

  return (
    <PortalShell
      role="parent"
      title="My Applications"
      subtitle="Track every school application from submission to decision."
      actions={
        <Link
          to="/parent/apply"
          className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
        >
          <GraduationCap className="h-4 w-4" /> New Application
        </Link>
      }
    >
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition border",
              active === f
                ? "bg-navy text-white border-navy"
                : "bg-card text-muted-foreground border-border hover:text-navy",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No applications yet"
          description="Start a new application to find the perfect school for your child."
          action={
            <Link
              to="/parent/apply"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow"
            >
              <GraduationCap className="h-4 w-4" /> Start Application
            </Link>
          }
        />
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {list.map((a) => (
            <ApplicationCard key={a.id} app={a} />
          ))}
        </div>
      )}
    </PortalShell>
  );
}