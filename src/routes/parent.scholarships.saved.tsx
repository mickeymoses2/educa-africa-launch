import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, ArrowLeft } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { EmptyState } from "@/components/educa/EmptyState";
import { ScholarshipCard } from "@/components/educa/ScholarshipCard";
import { scholarships } from "@/data/educa";

export const Route = createFileRoute("/parent/scholarships/saved")({
  head: () => ({ meta: [{ title: "Saved Scholarships · EDUCA" }] }),
  component: SavedPage,
});

function SavedPage() {
  const saved = scholarships.filter((s) => s.saved);
  return (
    <PortalShell role="parent" title="Saved Scholarships" subtitle="Opportunities you've bookmarked for later.">
      <Link to="/parent/scholarships" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> All Scholarships</Link>
      {saved.length === 0 ? (
        <EmptyState icon={Bookmark} title="No scholarships saved yet" description="Bookmark scholarships from the directory to revisit them here." />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {saved.map((s) => <ScholarshipCard key={s.id} s={s} basePath="/parent/scholarships" />)}
        </div>
      )}
    </PortalShell>
  );
}