import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, ExternalLink, Calendar, GraduationCap, Globe2, Coins } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { scholarships } from "@/data/educa";

export const Route = createFileRoute("/parent/scholarships/$id")({
  head: () => ({ meta: [{ title: "Scholarship · EDUCA" }] }),
  component: ScholarshipDetail,
});

function ScholarshipDetail() {
  const { id } = Route.useParams();
  const s = scholarships.find((x) => x.id === id);
  if (!s) throw notFound();
  return (
    <PortalShell role="parent" title={s.title} subtitle={s.provider}>
      <Link to="/parent/scholarships" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back to Scholarships</Link>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <article className="rounded-3xl bg-card border border-border shadow-soft p-6 lg:p-8 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Pill icon={GraduationCap} label={s.level} />
            <Pill icon={Calendar} label={`Deadline ${s.deadline}`} />
            <Pill icon={Globe2} label={s.country} />
            <Pill icon={Coins} label={`${s.fundingType} Funding`} />
          </div>
          <Section title="About this scholarship">{s.description}</Section>
          <Section title="Eligibility">{s.eligibility}</Section>
          <Section title="Funding amount">{s.amount ?? "See application instructions."}</Section>
          <div>
            <h3 className="font-display font-semibold text-navy mb-2">Required documents</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {s.documents.map((d) => (
                <li key={d} className="rounded-xl bg-muted/40 px-4 py-2.5 text-sm">{d}</li>
              ))}
            </ul>
          </div>
          <Section title="Application instructions">{s.instructions}</Section>
        </article>
        <aside className="space-y-3 h-fit">
          <a className="block rounded-2xl bg-gold text-gold-foreground text-center font-semibold py-3 hover:brightness-105">
            <span className="inline-flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Apply Externally</span>
          </a>
          <button className="block w-full rounded-2xl bg-navy text-white font-semibold py-3">
            <span className="inline-flex items-center gap-2"><Bookmark className="h-4 w-4" /> {s.saved ? "Saved" : "Save Scholarship"}</span>
          </button>
          <div className="rounded-2xl border border-border bg-card p-5 text-sm">
            <p className="font-display font-semibold text-navy">Need help applying?</p>
            <p className="text-muted-foreground mt-1">EDUCA Africa support can review your documents before submission.</p>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}

function Pill({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground/80">
      <Icon className="h-3.5 w-3.5 text-primary" /> {label}
    </span>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display font-semibold text-navy mb-2">{title}</h3>
      <p className="text-sm text-foreground/80 leading-relaxed">{children}</p>
    </div>
  );
}