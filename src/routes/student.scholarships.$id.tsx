import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, ExternalLink } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { scholarships } from "@/data/educa";

export const Route = createFileRoute("/student/scholarships/$id")({
  head: () => ({ meta: [{ title: "Scholarship · EDUCA" }] }),
  component: () => {
    const { id } = Route.useParams();
    const s = scholarships.find((x) => x.id === id);
    if (!s) throw notFound();
    return (
      <PortalShell role="student" title={s.title} subtitle={s.provider}>
        <Link to="/student/scholarships" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back</Link>
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <article className="rounded-3xl bg-card border border-border shadow-soft p-6 space-y-5">
            <p className="text-sm">{s.description}</p>
            <div>
              <h3 className="font-display font-semibold text-navy mb-2">Eligibility</h3>
              <p className="text-sm text-foreground/80">{s.eligibility}</p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-navy mb-2">Required documents</h3>
              <ul className="grid sm:grid-cols-2 gap-2">{s.documents.map((d) => <li key={d} className="rounded-xl bg-muted/40 px-4 py-2.5 text-sm">{d}</li>)}</ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-navy mb-2">How to apply</h3>
              <p className="text-sm text-foreground/80">{s.instructions}</p>
            </div>
          </article>
          <aside className="space-y-3 h-fit">
            <a className="block rounded-2xl bg-gold text-gold-foreground text-center font-semibold py-3"><span className="inline-flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Apply Externally</span></a>
            <button className="block w-full rounded-2xl bg-navy text-white font-semibold py-3"><span className="inline-flex items-center gap-2"><Bookmark className="h-4 w-4" /> Save</span></button>
          </aside>
        </div>
      </PortalShell>
    );
  },
});