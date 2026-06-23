import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, CheckCircle2, AlertCircle, Receipt as ReceiptIcon, Shirt, ShoppingBag, GraduationCap } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { PaymentCard } from "@/components/educa/PaymentCard";
import { PayStatusBadge } from "@/components/educa/PayStatusBadge";
import { payments, receipts } from "@/data/educa";

export const Route = createFileRoute("/parent/payments")({
  head: () => ({ meta: [{ title: "EDUCA Pay · Payments" }] }),
  component: ParentPaymentsPage,
});

function ParentPaymentsPage() {
  const total = payments.reduce((s, p) => s + p.amount, 0);
  const paid = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const outstanding = total - paid;
  const pendingApp = payments.filter((p) => p.type === "Application Fee" && p.status !== "Paid").reduce((s, p) => s + p.amount, 0);

  const groups = [
    { key: "School Fees", icon: GraduationCap, items: payments.filter((p) => p.type === "School Fees") },
    { key: "Application Fees", icon: ReceiptIcon, items: payments.filter((p) => p.type === "Application Fee") },
    { key: "Uniform Orders", icon: Shirt, items: payments.filter((p) => p.type === "Uniform Order") },
    { key: "Marketplace Orders", icon: ShoppingBag, items: payments.filter((p) => p.type === "Marketplace Order") },
  ];

  return (
    <PortalShell role="parent" title="EDUCA Pay" subtitle="Pay school fees, application fees and orders securely with M-Pesa.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Fees" value={`KES ${total.toLocaleString()}`} icon={Wallet} tone="primary" />
        <SummaryCard label="Amount Paid" value={`KES ${paid.toLocaleString()}`} icon={CheckCircle2} tone="teal" />
        <SummaryCard label="Outstanding" value={`KES ${outstanding.toLocaleString()}`} icon={AlertCircle} tone="gold" />
        <SummaryCard label="Pending Application Fees" value={`KES ${pendingApp.toLocaleString()}`} icon={ReceiptIcon} tone="destructive" />
      </div>

      {groups.map((g) => (
        <section key={g.key} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <g.icon className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-navy">{g.key}</h2>
            <span className="text-xs text-muted-foreground">({g.items.length})</span>
          </div>
          {g.items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">No items in this category.</div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {g.items.map((p) => <PaymentCard key={p.id} item={p} />)}
            </div>
          )}
        </section>
      ))}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-navy">Recent Transactions</h2>
          <Link to="/parent/receipts" className="text-sm font-semibold text-primary">View all receipts →</Link>
        </div>
        <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-4">Date</th><th className="text-left p-4">Purpose</th><th className="text-left p-4">Student</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {receipts.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="p-4 text-muted-foreground">{r.date}</td>
                  <td className="p-4 font-semibold text-navy">{r.purpose}</td>
                  <td className="p-4">{r.student}</td>
                  <td className="p-4 font-semibold text-navy">KES {r.amount.toLocaleString()}</td>
                  <td className="p-4"><PayStatusBadge status="Paid" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PortalShell>
  );
}