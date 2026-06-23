import { createFileRoute } from "@tanstack/react-router";
import { Plus, Wallet, FileText } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { feeStructures } from "@/data/educa";

export const Route = createFileRoute("/school/fees")({
  head: () => ({ meta: [{ title: "Fee Structure · EDUCA School Workspace" }] }),
  component: SchoolFeesPage,
});

function SchoolFeesPage() {
  return (
    <DashboardShell
      title="Fee Structure"
      subtitle="Define tuition and other charges per class or grade. Visible on your public school profile."
      actions={
        <button className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition">
          <Plus className="h-4 w-4" /> Add Fee Structure
        </button>
      }
    >
      <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          <h3 className="font-display font-semibold text-navy">Fee structures</h3>
          <span className="ml-auto text-[11px] font-semibold uppercase tracking-wider rounded-full bg-teal/20 text-teal-foreground px-2.5 py-1">Term 2 · 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-4 font-semibold">Class / Grade</th>
                <th className="text-left p-4 font-semibold">Tuition</th>
                <th className="text-left p-4 font-semibold">Boarding</th>
                <th className="text-left p-4 font-semibold">Activity</th>
                <th className="text-left p-4 font-semibold">Transport</th>
                <th className="text-left p-4 font-semibold">Other</th>
                <th className="text-left p-4 font-semibold">Total / Term</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {feeStructures.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="p-4 font-semibold text-navy">{r.grade}</td>
                  <td className="p-4"><Cell value={r.tuition} /></td>
                  <td className="p-4"><Cell value={r.boarding} /></td>
                  <td className="p-4"><Cell value={r.activity} /></td>
                  <td className="p-4"><Cell value={r.transport} /></td>
                  <td className="p-4"><Cell value={r.other} /></td>
                  <td className="p-4 font-semibold text-navy">{(r.tuition + r.boarding + r.activity + r.transport + r.other).toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button className="text-xs font-semibold text-primary">Edit</button>
                    <button className="ml-3 text-xs font-semibold text-destructive">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-card border border-border shadow-soft p-5">
        <h3 className="font-display font-semibold text-navy flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Application Fee Setup</h3>
        <p className="text-sm text-muted-foreground mt-1">Define the fee applicants must pay before their application is reviewed.</p>
        <div className="mt-5 grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Application Fee (KES)</span>
            <input defaultValue={1500} type="number" className="mt-1.5 w-full h-11 rounded-xl border border-border px-4 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Payment required before review</span>
            <select className="mt-1.5 w-full h-11 rounded-xl border border-border px-3 text-sm"><option>Yes</option><option>No</option></select>
          </label>
          <label className="block sm:col-span-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Payment instructions</span>
            <textarea rows={3} placeholder="e.g. Pay via EDUCA Pay and submit your reference number." className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm" />
          </label>
        </div>
      </div>
    </DashboardShell>
  );
}

function Cell({ value }: { value: number }) {
  return (
    <input
      defaultValue={value}
      type="number"
      className="w-32 rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  );
}