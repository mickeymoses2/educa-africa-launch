import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { PayStatusBadge } from "@/components/educa/PayStatusBadge";
import { payments, receipts } from "@/data/educa";

export const Route = createFileRoute("/student/payments")({
  head: () => ({ meta: [{ title: "My Payments · EDUCA" }] }),
  component: () => {
    const mine = payments.filter((p) => p.student === "Brian Mwangi");
    const total = mine.reduce((s, p) => s + p.amount, 0);
    const paid = mine.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
    return (
      <PortalShell role="student" title="My Payments" subtitle="A read-only view of payments made on your behalf.">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <SummaryCard label="Total" value={`KES ${total.toLocaleString()}`} icon={Wallet} tone="primary" />
          <SummaryCard label="Paid" value={`KES ${paid.toLocaleString()}`} icon={CheckCircle2} tone="teal" />
          <SummaryCard label="Outstanding" value={`KES ${(total - paid).toLocaleString()}`} icon={AlertCircle} tone="gold" />
        </div>
        <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
          <h3 className="font-display font-semibold text-navy mb-4">Recent receipts</h3>
          <ul className="divide-y divide-border">
            {receipts.filter((r) => r.student === "Brian Mwangi").map((r) => (
              <li key={r.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy">{r.purpose}</p>
                  <p className="text-xs text-muted-foreground">{r.party} · {r.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">KES {r.amount.toLocaleString()}</span>
                  <PayStatusBadge status="Paid" />
                </div>
              </li>
            ))}
          </ul>
          <Link to="/student/receipts" className="mt-4 inline-block text-sm font-semibold text-primary">View all receipts →</Link>
        </div>
      </PortalShell>
    );
  },
});