import { createFileRoute } from "@tanstack/react-router";
import { Wallet, ArrowDown, CheckCircle2, Clock } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { PayStatusBadge } from "@/components/educa/PayStatusBadge";
import { receipts } from "@/data/educa";

export const Route = createFileRoute("/school/payments")({
  head: () => ({ meta: [{ title: "Payments · EDUCA School" }] }),
  component: () => (
    <DashboardShell title="Incoming Payments" subtitle="Track fees, application fees and other payments received via EDUCA Pay.">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Collected This Term" value="KES 4.2M" delta="+18% vs last term" icon={ArrowDown} tone="primary" />
        <SummaryCard label="Cleared Payments" value="312" icon={CheckCircle2} tone="teal" />
        <SummaryCard label="Pending Reconciliation" value="14" icon={Clock} tone="gold" />
      </div>
      <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          <h3 className="font-display font-semibold text-navy">Recent payments</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-4">Receipt #</th><th className="text-left p-4">Paid By</th><th className="text-left p-4">Student</th><th className="text-left p-4">Purpose</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Date</th><th className="text-left p-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {receipts.map((r) => (
              <tr key={r.id} className="hover:bg-muted/30">
                <td className="p-4 font-mono text-xs">{r.number}</td>
                <td className="p-4">{r.paidBy}</td>
                <td className="p-4 font-semibold text-navy">{r.student}</td>
                <td className="p-4">{r.purpose}</td>
                <td className="p-4 font-semibold">KES {r.amount.toLocaleString()}</td>
                <td className="p-4 text-muted-foreground">{r.date}</td>
                <td className="p-4"><PayStatusBadge status="Paid" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  ),
});