import { createFileRoute } from "@tanstack/react-router";
import { Plus, Wallet } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";

export const Route = createFileRoute("/school/fees")({
  head: () => ({ meta: [{ title: "Fee Structure · EDUCA School Workspace" }] }),
  component: SchoolFeesPage,
});

const initial = [
  { grade: "Grade 1 – 3", tuition: 55000, boarding: 0, other: 4000 },
  { grade: "Grade 4 – 6", tuition: 65000, boarding: 0, other: 5000 },
  { grade: "Form 1 – 2", tuition: 85000, boarding: 35000, other: 7500 },
  { grade: "Form 3 – 4", tuition: 95000, boarding: 38000, other: 8500 },
];

function SchoolFeesPage() {
  return (
    <DashboardShell
      title="Fee Structure"
      subtitle="Define tuition and other charges per class or grade. Visible on your public school profile."
      actions={
        <button className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition">
          <Plus className="h-4 w-4" /> Add Fee Tier
        </button>
      }
    >
      <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          <h3 className="font-display font-semibold text-navy">Fee tiers</h3>
          <span className="ml-auto text-[11px] font-semibold uppercase tracking-wider rounded-full bg-gold/20 text-gold-foreground px-2.5 py-1">Payments — Coming Soon</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-4 font-semibold">Class / Grade</th>
                <th className="text-left p-4 font-semibold">Tuition (KES)</th>
                <th className="text-left p-4 font-semibold">Boarding (KES)</th>
                <th className="text-left p-4 font-semibold">Other Charges (KES)</th>
                <th className="text-left p-4 font-semibold">Total / Term</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {initial.map((r) => (
                <tr key={r.grade} className="hover:bg-muted/30">
                  <td className="p-4 font-semibold text-navy">{r.grade}</td>
                  <td className="p-4"><Cell value={r.tuition} /></td>
                  <td className="p-4"><Cell value={r.boarding} /></td>
                  <td className="p-4"><Cell value={r.other} /></td>
                  <td className="p-4 font-semibold text-navy">{(r.tuition + r.boarding + r.other).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
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