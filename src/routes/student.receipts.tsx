import { createFileRoute, Link } from "@tanstack/react-router";
import { Receipt as ReceiptIcon } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { EmptyState } from "@/components/educa/EmptyState";
import { receipts } from "@/data/educa";

export const Route = createFileRoute("/student/receipts")({
  head: () => ({ meta: [{ title: "My Receipts · EDUCA" }] }),
  component: () => {
    const mine = receipts.filter((r) => r.student === "Brian Mwangi");
    return (
      <PortalShell role="student" title="My Receipts" subtitle="Receipts for payments made towards your education.">
        {mine.length === 0 ? (
          <EmptyState icon={ReceiptIcon} title="No receipts yet" description="Receipts will show up here as soon as a payment is made." />
        ) : (
          <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left p-4">Receipt #</th><th className="text-left p-4">Purpose</th><th className="text-left p-4">Paid To</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Date</th><th /></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mine.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30">
                    <td className="p-4 font-mono text-xs">{r.number}</td>
                    <td className="p-4 font-semibold text-navy">{r.purpose}</td>
                    <td className="p-4">{r.party}</td>
                    <td className="p-4 font-semibold">KES {r.amount.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{r.date}</td>
                    <td className="p-4 text-right">
                      <Link to="/parent/receipts/$id" params={{ id: r.id }} className="rounded-lg bg-navy text-white text-xs font-semibold px-3 py-2">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PortalShell>
    );
  },
});