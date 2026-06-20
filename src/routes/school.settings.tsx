import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/educa/DashboardShell";

export const Route = createFileRoute("/school/settings")({
  head: () => ({ meta: [{ title: "Settings · EDUCA" }] }),
  component: Settings,
});

const inputCls = "w-full h-11 rounded-xl border border-border bg-white px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function Settings() {
  return (
    <DashboardShell title="Settings" subtitle="Account preferences and admissions defaults.">
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
          <h3 className="font-display font-semibold text-navy">Account</h3>
          <div className="mt-4 space-y-4">
            <div><label className="text-sm font-semibold text-navy">Admin name</label><input className={inputCls + " mt-1.5"} defaultValue="Jane Wanjiru" /></div>
            <div><label className="text-sm font-semibold text-navy">Email</label><input className={inputCls + " mt-1.5"} defaultValue="jane@kilimani.ac.ke" /></div>
          </div>
        </section>
        <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
          <h3 className="font-display font-semibold text-navy">Notifications</h3>
          <p className="text-sm text-muted-foreground mt-1">Choose how we notify your admissions team.</p>
          <div className="mt-4 space-y-3">
            {["New applications", "Document uploads", "Weekly summary email"].map((l, i) => (
              <div key={l} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
                <span className="text-sm font-medium text-navy">{l}</span>
                <div className={`h-6 w-11 rounded-full ${i < 2 ? "bg-primary" : "bg-border"} relative`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${i < 2 ? "left-5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}