import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Award, Bookmark } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { ScholarshipCard } from "@/components/educa/ScholarshipCard";
import { scholarships } from "@/data/educa";

export const Route = createFileRoute("/student/scholarships")({
  head: () => ({ meta: [{ title: "Scholarships · EDUCA" }] }),
  component: () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    if (pathname !== "/student/scholarships") return <Outlet />;
    return (
      <PortalShell
        role="student"
        title="Scholarships & Funding"
        subtitle="Find funding opportunities that match your education journey."
        actions={<Link to="/student/scholarships/saved" className="inline-flex items-center gap-2 rounded-xl bg-navy text-white px-4 py-2.5 text-sm font-semibold"><Bookmark className="h-4 w-4" /> Saved</Link>}
      >
        <div className="flex items-center gap-2 mb-4"><Award className="h-5 w-5 text-primary" /><h2 className="font-display font-semibold text-navy">{scholarships.length} opportunities</h2></div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {scholarships.map((s) => <ScholarshipCard key={s.id} s={s} basePath="/student/scholarships" />)}
        </div>
      </PortalShell>
    );
  },
});