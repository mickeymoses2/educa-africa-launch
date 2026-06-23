import { createFileRoute } from "@tanstack/react-router";
import { Plus, Store } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { suppliers } from "@/data/educa";

export const Route = createFileRoute("/school/suppliers")({
  head: () => ({ meta: [{ title: "Approved Suppliers · EDUCA School" }] }),
  component: () => (
    <DashboardShell
      title="Approved Suppliers"
      subtitle="Curate the suppliers parents and students see when ordering uniforms and learning materials for your school."
      actions={<button className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold"><Plus className="h-4 w-4" /> Add Supplier</button>}
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {suppliers.map((s) => (
          <div key={s.id} className="rounded-2xl bg-card border border-border shadow-soft p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-teal grid place-items-center text-white font-semibold">{s.initials}</div>
                <div>
                  <p className="font-display font-semibold text-navy">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.category}</p>
                </div>
              </div>
              {s.official && <span className="text-[10px] font-bold rounded-full bg-gold/20 text-gold-foreground px-2 py-0.5">OFFICIAL</span>}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{s.description}</p>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <Stat label="Products" value={s.productsCount} />
              <Stat label="Rating" value={`★ ${s.rating}`} />
              <Stat label="Status" value={s.status} />
            </dl>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-xl bg-navy text-white text-xs font-semibold py-2"><Store className="h-3.5 w-3.5 inline mr-1" /> View Products</button>
              <button className="rounded-xl border border-border px-3 text-xs font-semibold">Settings</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  ),
});

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-muted/40 py-2"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="font-semibold text-navy">{value}</p></div>
  );
}