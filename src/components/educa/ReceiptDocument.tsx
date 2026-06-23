import { Logo } from "./Logo";
import type { Receipt } from "@/data/educa";

export function ReceiptDocument({ r }: { r: Receipt }) {
  return (
    <div className="rounded-3xl bg-white border border-border shadow-card overflow-hidden">
      <div className="bg-navy text-white px-7 py-6 flex items-center justify-between">
        <Logo tone="light" />
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-white/60">Official Receipt</p>
          <p className="font-display font-bold">{r.number}</p>
        </div>
      </div>
      <div className="px-7 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 text-success-foreground px-3 py-1 text-xs font-semibold">● Paid</span>
          <span className="text-xs text-muted-foreground">Issued {r.date}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Paid By" value={r.paidBy} />
          <Field label="Student" value={r.student} />
          <Field label="Paid To" value={r.party} />
          <Field label="Purpose" value={r.purpose} />
          <Field label="Transaction Code" value={r.transactionCode} mono />
          <Field label="Payment Method" value={r.method} />
        </div>
        <div className="rounded-2xl bg-navy text-white px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/60">Amount Paid</p>
            <p className="font-display text-3xl font-bold mt-1">KES {r.amount.toLocaleString()}</p>
          </div>
          <div className="text-right text-xs text-white/70">
            <p>Receipt #{r.number}</p>
            <p className="mt-1">Verified by EDUCA Pay</p>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground border-t border-border pt-4">
          This is a system-generated receipt. EDUCA Africa does not collect or store M-Pesa PINs. Keep this receipt for your records.
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <p className={`mt-1 font-semibold text-navy ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}