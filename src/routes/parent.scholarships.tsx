import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Award, Search, Bookmark } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { ScholarshipCard } from "@/components/educa/ScholarshipCard";
import { scholarships } from "@/data/educa";

export const Route = createFileRoute("/parent/scholarships")({
  head: () => ({ meta: [{ title: "Scholarships · EDUCA" }] }),
  component: ScholarshipsLayout,
});

function ScholarshipsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/parent/scholarships") return <Outlet />;
  return (
    <PortalShell
      role="parent"
      title="Scholarships & Funding Opportunities"
      subtitle="Discover scholarships, bursaries and education funding opportunities across Africa."
      actions={
        <Link to="/parent/scholarships/saved" className="inline-flex items-center gap-2 rounded-xl bg-navy text-white px-4 py-2.5 text-sm font-semibold">
          <Bookmark className="h-4 w-4" /> Saved
        </Link>
      }
    >
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="rounded-2xl bg-card border border-border shadow-soft p-5 h-fit space-y-5">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Search</span>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input placeholder="Title or provider" className="w-full h-10 rounded-xl bg-muted/60 border border-transparent focus:border-primary focus:bg-white outline-none pl-9 pr-3 text-sm" />
            </div>
          </div>
          <Filter label="Level" options={["Any", "Primary", "Secondary", "Tertiary"]} />
          <Filter label="Deadline" options={["Any", "This month", "Next 3 months", "This year"]} />
          <Filter label="Country" options={["Any", "Kenya", "Pan-African", "Uganda", "Tanzania"]} />
          <Filter label="Funding Type" options={["Any", "Full", "Partial", "Bursary", "Grant"]} />
        </aside>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-navy">{scholarships.length} opportunities</h2>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {scholarships.map((s) => <ScholarshipCard key={s.id} s={s} basePath="/parent/scholarships" />)}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

function Filter({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <select className="mt-1.5 w-full h-10 rounded-xl bg-muted/60 border border-transparent focus:border-primary focus:bg-white outline-none px-3 text-sm">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}