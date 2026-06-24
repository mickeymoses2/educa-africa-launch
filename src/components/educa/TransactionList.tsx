import type { WalletTransaction } from "@/data/educa";
import { TxStatusBadge } from "./TxStatusBadge";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export function TransactionList({ items }: { items: WalletTransaction[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-border shadow-soft p-8 text-center text-sm text-muted-foreground">
        No transactions yet.
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
      {/* Desktop table */}
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left font-semibold px-5 py-3">Transaction</th>
            <th className="text-left font-semibold px-5 py-3">Type</th>
            <th className="text-left font-semibold px-5 py-3">Date</th>
            <th className="text-right font-semibold px-5 py-3">Amount</th>
            <th className="text-left font-semibold px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((t) => (
            <tr key={t.id} className="hover:bg-muted/30">
              <td className="px-5 py-4">
                <p className="font-semibold text-navy">{t.description}</p>
                <p className="text-xs text-muted-foreground font-mono">{t.id}</p>
              </td>
              <td className="px-5 py-4 text-foreground/80">{t.type}</td>
              <td className="px-5 py-4 text-muted-foreground">{t.date}</td>
              <td className={`px-5 py-4 text-right font-semibold ${t.amount < 0 ? "text-destructive" : "text-success-foreground"}`}>
                {t.amount < 0 ? "-" : "+"}KES {Math.abs(t.amount).toLocaleString()}
              </td>
              <td className="px-5 py-4"><TxStatusBadge status={t.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile cards */}
      <ul className="md:hidden divide-y divide-border">
        {items.map((t) => (
          <li key={t.id} className="p-4 flex items-center gap-3">
            <div className={`h-10 w-10 shrink-0 rounded-xl grid place-items-center ${t.amount < 0 ? "bg-destructive/10 text-destructive" : "bg-success/15 text-success-foreground"}`}>
              {t.amount < 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-navy text-sm truncate">{t.description}</p>
              <p className="text-xs text-muted-foreground">{t.type} · {t.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold text-sm ${t.amount < 0 ? "text-destructive" : "text-success-foreground"}`}>
                {t.amount < 0 ? "-" : "+"}KES {Math.abs(t.amount).toLocaleString()}
              </p>
              <TxStatusBadge status={t.status} className="mt-1" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}