import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { StatusBadge } from "@/components/educa/StatusBadge";
import { applications, countByStatus, pipelineStages } from "@/data/educa";

export const Route = createFileRoute("/school/pipeline")({
  head: () => ({ meta: [{ title: "Admissions pipeline · EDUCA" }] }),
  component: Pipeline,
});

function Pipeline() {
  const total = applications.length;
  return (
    <DashboardShell title="Admissions pipeline" subtitle="A live view of every stage of your admissions funnel.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {pipelineStages.map((s) => {
          const count = countByStatus(s.status);
          const pct = Math.round((count / total) * 100);
          return (
            <div key={s.status} className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <StatusBadge status={s.status} />
              <p className="mt-4 font-display text-3xl font-bold text-navy">{count}</p>
              <p className="text-xs text-muted-foreground">{s.description}</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1.5 text-[11px] font-medium text-muted-foreground">{pct}% of total</p>
            </div>
          );
        })}
      </div>

      <section className="mt-8 rounded-2xl bg-card border border-border shadow-soft p-6">
        <h3 className="font-display font-semibold text-navy">Conversion overview</h3>
        <div className="mt-4 flex items-end gap-2 h-48">
          {pipelineStages.map((s) => {
            const count = countByStatus(s.status);
            const h = Math.max(10, (count / total) * 100);
            return (
              <div key={s.status} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-gradient-to-t from-primary to-teal" style={{ height: `${h}%` }} />
                <p className="text-[11px] text-muted-foreground text-center leading-tight">{s.status}</p>
              </div>
            );
          })}
        </div>
      </section>
    </DashboardShell>
  );
}