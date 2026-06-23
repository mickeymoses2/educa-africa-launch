import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { OrderStatusBadge } from "@/components/educa/OrderStatusBadge";
import { OrderTimeline } from "@/components/educa/OrderTimeline";
import { orders } from "@/data/educa";

const actions = [
  { label: "Confirm Order", next: "Payment Received" as const },
  { label: "Mark Processing", next: "Processing" as const },
  { label: "Mark Ready for Pickup", next: "Ready for Pickup" as const },
  { label: "Mark Out for Delivery", next: "Out for Delivery" as const },
  { label: "Mark Delivered", next: "Delivered" as const },
];

export const Route = createFileRoute("/supplier/orders/$id")({
  head: () => ({ meta: [{ title: "Order · EDUCA Supplier" }] }),
  component: () => {
    const { id } = Route.useParams();
    const o = orders.find((x) => x.id === id);
    if (!o) throw notFound();
    return (
      <SupplierShell title={`Order ${o.number}`} subtitle={`${o.customer} · ${o.date}`} actions={<OrderStatusBadge status={o.status} />}>
        <Link to="/supplier/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back to Orders</Link>
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h3 className="font-display font-semibold text-navy mb-4">Items ({o.items.length})</h3>
              <ul className="divide-y divide-border">
                {o.items.map((i) => (
                  <li key={i.productId} className="py-3 flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${i.gradient} grid place-items-center text-white/40 font-display`}>{i.name[0]}</div>
                    <div className="flex-1"><p className="font-semibold text-navy">{i.name}</p><p className="text-xs text-muted-foreground">Qty {i.quantity}{i.size && ` · ${i.size}`}</p></div>
                    <span className="font-semibold">KES {(i.price * i.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-xl font-bold text-navy">KES {o.amount.toLocaleString()}</span>
              </div>
            </section>
            <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h3 className="font-display font-semibold text-navy mb-4">Order Timeline</h3>
              <OrderTimeline status={o.status} />
            </section>
          </div>
          <aside className="space-y-3 h-fit">
            <div className="rounded-2xl bg-card border border-border shadow-soft p-5 text-sm space-y-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Customer</p>
              <p className="font-display font-semibold text-navy">{o.customer}</p>
              <p className="text-muted-foreground">{o.student} · {o.school}</p>
              <p className="text-muted-foreground">{o.delivery}{o.address ? ` · ${o.address}` : ""}</p>
            </div>
            <div className="rounded-2xl bg-navy text-white p-5">
              <p className="text-xs uppercase tracking-wider text-white/60 mb-3">Update Status</p>
              <div className="space-y-2">
                {actions.map((a) => (
                  <button key={a.label} className="w-full rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold py-2.5 text-left px-4">
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </SupplierShell>
    );
  },
});