import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CheckCircle2, Clock } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { SummaryCard } from "@/components/educa/SummaryCard";

export const Route = createFileRoute("/student/fees")({
  head: () => ({ meta: [{ title: "My Fees · EDUCA" }] }),
  component: StudentFeesPage,
});

function StudentFeesPage() {
  const total = 95000;
  const paid = 60000;
  const balance = total - paid;

  return (
    <PortalShell role="student" title="My Fees" subtitle="Track your current fees, balance and payment status.">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Current Fees" value={`KES ${total.toLocaleString()}`} icon={Wallet} tone="primary" />
        <SummaryCard label="Balance Due" value={`KES ${balance.toLocaleString()}`} icon={Clock} tone="gold" />
        <SummaryCard label="Payment Status" value="Partial" icon={CheckCircle2} tone="teal" />
      </div>

      <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-navy">Term 2 · 2026</h3>
          <span className="text-[11px] font-semibold uppercase tracking-wider rounded-full bg-gold/20 text-gold-foreground px-2.5 py-1">Payments — Coming Soon</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Kilimani Academy · Form 1</p>

        <div className="mt-5 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal to-primary" style={{ width: "63%" }} />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">63% paid</p>

        <ul className="mt-6 divide-y divide-border text-sm">
          {[
            { label: "Tuition", amount: 75000 },
            { label: "Boarding", amount: 12000 },
            { label: "Activities", amount: 5000 },
            { label: "Books & Materials", amount: 3000 },
          ].map((i) => (
            <li key={i.label} className="py-3 flex items-center justify-between">
              <span className="text-foreground/80">{i.label}</span>
              <span className="font-semibold text-navy">KES {i.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </PortalShell>
  );
}