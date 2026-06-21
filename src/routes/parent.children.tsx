import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { UserPlus, Users } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { ChildCard } from "@/components/educa/ChildCard";
import { EmptyState } from "@/components/educa/EmptyState";
import { children } from "@/data/educa";

export const Route = createFileRoute("/parent/children")({
  head: () => ({ meta: [{ title: "My Children · EDUCA" }] }),
  component: ChildrenLayout,
});

function ChildrenLayout() {
  const matches = useMatches();
  const isChild = matches.some(
    (m) => m.routeId === "/parent/children/new" || m.routeId === "/parent/children/$id",
  );
  if (isChild) return <Outlet />;
  return <ChildrenList />;
}

function ChildrenList() {
  return (
    <PortalShell
      role="parent"
      title="My Children"
      subtitle="Create and manage learner profiles connected to your account."
      actions={
        <Link
          to="/parent/children/new"
          className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
        >
          <UserPlus className="h-4 w-4" /> Add Child
        </Link>
      }
    >
      {children.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No child profile added yet"
          description="Add your first child to begin searching and applying to schools."
          action={
            <Link
              to="/parent/children/new"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow"
            >
              <UserPlus className="h-4 w-4" /> Add Child Profile
            </Link>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {children.map((c) => (
            <ChildCard key={c.id} child={c} />
          ))}
        </div>
      )}
    </PortalShell>
  );
}