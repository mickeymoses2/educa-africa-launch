import { Link } from "@tanstack/react-router";
import { IdCard, ArrowRight, GraduationCap } from "lucide-react";
import type { Child } from "@/data/educa";

export function ChildCard({ child }: { child: Child }) {
  return (
    <article className="group rounded-3xl bg-card border border-border shadow-soft hover:shadow-card transition p-5">
      <div className="flex items-start gap-4">
        <div
          className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${child.avatarTone} grid place-items-center text-white font-display font-bold text-lg shadow-soft shrink-0`}
        >
          {child.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-navy text-lg leading-tight truncate">
            {child.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1.5">
            <IdCard className="h-3.5 w-3.5" /> {child.educaId}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium">
              {child.currentClass}
            </span>
            <span className="rounded-full bg-teal/15 text-teal-foreground px-2.5 py-0.5 text-[11px] font-medium">
              {child.curriculum}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Profile completion</span>
          <span className="font-semibold text-navy">{child.completion}%</span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-primary"
            style={{ width: `${child.completion}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Link
          to="/parent/children/$id"
          params={{ id: child.id }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-muted hover:bg-muted/70 text-navy text-sm font-semibold py-2.5 transition"
        >
          View Profile <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/parent/apply"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold text-gold-foreground text-sm font-semibold py-2.5 px-4 hover:brightness-105 transition"
        >
          <GraduationCap className="h-4 w-4" /> Apply
        </Link>
      </div>
    </article>
  );
}