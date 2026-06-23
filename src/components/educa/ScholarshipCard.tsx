import { Link } from "@tanstack/react-router";
import { Bookmark, Calendar, Globe2, GraduationCap } from "lucide-react";
import type { Scholarship } from "@/data/educa";

export function ScholarshipCard({ s, basePath }: { s: Scholarship; basePath: "/parent/scholarships" | "/student/scholarships" }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] uppercase tracking-wider font-semibold rounded-full bg-primary/10 text-primary px-2.5 py-1">{s.fundingType} Funding</span>
        <button aria-label="Save scholarship" className={`h-9 w-9 grid place-items-center rounded-xl border ${s.saved ? "bg-gold/10 border-gold/30 text-gold-foreground" : "bg-white border-border text-muted-foreground"} hover:border-gold/40`}>
          <Bookmark className={`h-4 w-4 ${s.saved ? "fill-current" : ""}`} />
        </button>
      </div>
      <h3 className="mt-3 font-display font-semibold text-navy">{s.title}</h3>
      <p className="text-xs text-muted-foreground">{s.provider}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-primary" /> {s.level}</span>
        <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {s.deadline}</span>
        <span className="inline-flex items-center gap-1.5 col-span-2"><Globe2 className="h-3.5 w-3.5 text-primary" /> {s.country}</span>
      </div>
      <p className="mt-3 text-xs rounded-lg bg-muted/60 px-3 py-2 text-foreground/80 line-clamp-2">{s.eligibility}</p>
      <Link
        to={`${basePath}/$id` as "/parent/scholarships/$id"}
        params={{ id: s.id }}
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-navy text-white text-sm font-semibold py-2.5 hover:bg-navy/90 transition"
      >
        View Details
      </Link>
    </div>
  );
}