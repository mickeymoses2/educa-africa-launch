import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { ReceiptDocument } from "@/components/educa/ReceiptDocument";
import { receipts } from "@/data/educa";

export const Route = createFileRoute("/parent/receipts/$id")({
  head: () => ({ meta: [{ title: "Receipt · EDUCA Pay" }] }),
  component: ReceiptDetail,
});

function ReceiptDetail() {
  const { id } = Route.useParams();
  const r = receipts.find((x) => x.id === id);
  if (!r) throw notFound();
  return (
    <PortalShell
      role="parent"
      title={`Receipt ${r.number}`}
      subtitle={`Issued ${r.date}`}
      actions={
        <>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold"><Printer className="h-4 w-4" /> Print</button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold"><Download className="h-4 w-4" /> Download PDF</button>
        </>
      }
    >
      <Link to="/parent/receipts" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5">
        <ArrowLeft className="h-4 w-4" /> Back to Receipts
      </Link>
      <div className="max-w-3xl">
        <ReceiptDocument r={r} />
      </div>
    </PortalShell>
  );
}