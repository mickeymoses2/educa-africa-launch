import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { SchoolCard } from "@/components/educa/SchoolCard";
import { featuredSchools } from "@/data/educa";

export const Route = createFileRoute("/student/schools")({
  head: () => ({ meta: [{ title: "Find Schools · EDUCA Student" }] }),
  component: StudentSchoolsPage,
});

function StudentSchoolsPage() {
  return (
    <PortalShell
      role="student"
      title="Find Schools"
      subtitle="Discover schools that match your curriculum and learning goals."
    >
      <div className="rounded-3xl bg-card border border-border shadow-soft p-4 mb-6">
        <div className="flex items-center gap-2 rounded-2xl bg-muted/60 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search by name, county, curriculum or level"
            className="flex-1 bg-transparent outline-none text-sm py-2"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...featuredSchools, ...featuredSchools].slice(0, 6).map((s, i) => (
          <SchoolCard key={`${s.name}-${i}`} school={s} />
        ))}
      </div>
    </PortalShell>
  );
}