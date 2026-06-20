import { createFileRoute } from "@tanstack/react-router";
import { Download, Inbox, CheckCircle2, Clock, XCircle, BarChart3 } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { applications, countByStatus, pipelineStages } from "@/data/educa";

export const Route = createFileRoute("/school/reports")({
  head: () => ({ meta: [{ title: "Reports · EDUCA" }] }),
  component: Reports,
});

function Reports() {
  const byClass: Record<string, number> = {};
  applications.forEach((a) => { byClass[a.classApplied] = (byClass[a.classApplied] ?? 0) + 1; });
  const classes = Object.entries(byClass);
  const max = Math.max(...classes.map(([, v]) => v));

  return (
    <DashboardShell
      title="Reports"
      subtitle="Institutional snapshots — exportable for board and ministry reporting."
      actions={
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105">
          <Download className="h-4 w-4" /> Download report
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Total applications" value={applications.length} icon={Inbox} tone="primary" />
        <SummaryCard label="Accepted" value={countByStatus("Accepted")} icon={CheckCircle2} tone="success" />
        <SummaryCard label="Pending" value={countByStatus("Submitted") + countByStatus("Under Review")} icon={Clock} tone="gold" />
        <SummaryCard label="Rejected" value={countByStatus("Rejected")} icon={XCircle} tone="destructive" />
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-navy">Status breakdown</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-5 space-y-3">
            {pipelineStages.map((s) => {
              const c = countByStatus(s.status);
              const pct = Math.round((c / applications.length) * 100);
              return (
                <div key={s.status}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-navy">{s.status}</span>
                    <span className="text-muted-foreground">{c} · {pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-teal" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
          <h3 className="font-display font-semibold text-navy">Applications by class</h3>
          <div className="mt-5 space-y-3">
            {classes.map(([cls, c]) => (
              <div key={cls}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-navy">{cls}</span>
                  <span className="text-muted-foreground">{c}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${(c / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl bg-card border border-border shadow-soft p-6">
        <h3 className="font-display font-semibold text-navy">Recent activity</h3>
        <ul className="mt-4 divide-y divide-border">
          {applications.slice(0, 5).map((a) => (
            <li key={a.id} className="py-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-xs font-semibold">{a.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-navy"><span className="font-semibold">{a.student}</span> · {a.classApplied}</p>
                <p className="text-xs text-muted-foreground">{a.submitted} · status {a.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </DashboardShell>
  );
}