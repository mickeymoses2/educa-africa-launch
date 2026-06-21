import { Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, Calendar } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { MyApplication } from "@/data/educa";

export function ApplicationCard({ app }: { app: MyApplication }) {
  return (
    <article className="rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:flex sm:items-start sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 shrink-0 rounded-xl bg-white border border-border grid place-items-center font-display font-bold text-navy text-sm">
            {app.schoolInitials}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              {app.id}
            </p>
            <h3 className="font-display font-semibold text-navy truncate">{app.school}</h3>
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" /> {app.location}
            </p>
          </div>
        </div>
        <StatusBadge status={app.status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-muted/60 px-3 py-2">
          <p className="text-muted-foreground">Student</p>
          <p className="font-semibold text-navy truncate">{app.student}</p>
        </div>
        <div className="rounded-lg bg-muted/60 px-3 py-2">
          <p className="text-muted-foreground">Class</p>
          <p className="font-semibold text-navy">{app.classApplied}</p>
        </div>
        <div className="rounded-lg bg-muted/60 px-3 py-2">
          <p className="text-muted-foreground inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Submitted
          </p>
          <p className="font-semibold text-navy">{app.submitted}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground truncate">
          <span className="font-semibold text-navy">Next:</span> {app.nextAction}
        </p>
        <Link
          to="/parent/applications/$id"
          params={{ id: app.id }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all whitespace-nowrap"
        >
          View <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}