import { createFileRoute, Link } from "@tanstack/react-router";
import { Receipt as ReceiptIcon, Download } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { EmptyState } from "@/components/educa/EmptyState";
import { receipts } from "@/data/educa";

export const Route = createFileRoute("/parent/receipts")({
  head: () => ({ meta: [{ title: "Digital Receipts · EDUCA Pay" }] }),
  component: ReceiptsPage,
});

function ReceiptsPage() {
  return (
    <PortalShell role="parent" title="Digital Receipts" subtitle="A secure, downloadable record of every EDUCA Pay transaction.">
      {receipts.length === 0 ? (
        <EmptyState icon={ReceiptIcon} title="No receipts yet" description="Receipts will appear here after your first payment." />
      ) : (
        <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left p-4">Receipt #</th><th className="text-left p-4">Purpose</th><th className="text-left p-4">Student</th><th className="text-left p-4">Paid To</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Date</th><th className="p-4" /></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {receipts.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30">
                    <td className="p-4 font-mono text-xs">{r.number}</td>
                    <td className="p-4 font-semibold text-navy">{r.purpose}</td>
                    <td className="p-4">{r.student}</td>
                    <td className="p-4">{r.party}</td>
                    <td className="p-4 font-semibold text-navy">KES {r.amount.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{r.date}</td>
                    <td className="p-4 text-right">
                      <Link to="/parent/receipts/$id" params={{ id: r.id }} className="inline-flex items-center gap-1.5 rounded-lg bg-navy text-white text-xs font-semibold px-3 py-2">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="mt-6 text-xs text-muted-foreground flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> All receipts can be downloaded as PDF from the detail view.</p>
    </PortalShell>
  );
}