import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { children } from "@/data/educa";

export const Route = createFileRoute("/parent/fees")({
  head: () => ({ meta: [{ title: "Fees Overview · EDUCA" }] }),
  component: ParentFeesPage,
});

const rows = [
  { student: "Brian Mwangi", school: "Kilimani Academy", term: "Term 2 · 2026", total: 95000, paid: 60000, status: "Partial" },
  { student: "Amani Mwangi", school: "Savannah Heights School", term: "Term 2 · 2026", total: 65000, paid: 65000, status: "Paid" },
];

function ParentFeesPage() {
  const total = rows.reduce((s, r) => s + r.total, 0);
  const paid = rows.reduce((s, r) => s + r.paid, 0);
  const balance = total - paid;

  return (
    <PortalShell role="parent" title="Fees Overview" subtitle="A quick view of your children's fees and balances. Payments coming soon.">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Total Fees" value={`KES ${total.toLocaleString()}`} icon={Wallet} tone="primary" />
        <SummaryCard label="Amount Paid" value={`KES ${paid.toLocaleString()}`} icon={CheckCircle2} tone="teal" />
        <SummaryCard label="Outstanding Balance" value={`KES ${balance.toLocaleString()}`} icon={Clock} tone="gold" />
      </div>

      <div className="rounded-3xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-semibold text-navy">Fees by child</h3>
          <span className="text-[11px] font-semibold uppercase tracking-wider rounded-full bg-gold/20 text-gold-foreground px-2.5 py-1">Payments — Coming Soon</span>
        </div>
        <div className="divide-y divide-border">
          {rows.map((r) => {
            const pct = Math.round((r.paid / r.total) * 100);
            return (
              <div key={r.student} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-navy">{r.student}</p>
                    <p className="text-xs text-muted-foreground">{r.school} · {r.term}</p>
                  </div>
                  <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${r.status === "Paid" ? "bg-success/15 text-success-foreground" : "bg-warning/20 text-warning-foreground"}`}>
                    {r.status}
                  </span>
                </div>
                <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                  <Metric label="Total" value={`KES ${r.total.toLocaleString()}`} />
                  <Metric label="Paid" value={`KES ${r.paid.toLocaleString()}`} />
                  <Metric label="Balance" value={`KES ${(r.total - r.paid).toLocaleString()}`} />
                </div>
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal to-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{pct}% paid this term</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link to="/parent/children" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Manage children <ArrowUpRight className="h-4 w-4" />
      </Link>
      <p className="sr-only">{children.length} children</p>
    </PortalShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/50 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <p className="mt-1 font-display font-bold text-navy">{value}</p>
    </div>
  );
}