import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { PaymentItem } from "@/data/educa";
import { PayStatusBadge } from "./PayStatusBadge";

export function PaymentCard({ item }: { item: PaymentItem }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{item.type}</p>
          <h3 className="mt-1 font-display font-semibold text-navy truncate">{item.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.student} · {item.school}</p>
        </div>
        <PayStatusBadge status={item.status} />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-navy">KES {item.amount.toLocaleString()}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Due {item.dueDate} · Ref {item.reference}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1 border-t border-border">
        <Link
          to="/parent/payments/pay"
          search={{ ref: item.reference, amount: item.amount, type: item.type, student: item.student, school: item.school, step: 1 }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold text-gold-foreground text-sm font-semibold py-2.5 hover:brightness-105 transition"
        >
          Pay Now <ArrowRight className="h-4 w-4" />
        </Link>
        <button className="rounded-xl border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted">
          Details
        </button>
      </div>
    </div>
  );
}