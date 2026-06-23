import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Truck, Store } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { OrderStatusBadge } from "@/components/educa/OrderStatusBadge";
import { OrderTimeline } from "@/components/educa/OrderTimeline";
import { orders } from "@/data/educa";

export const Route = createFileRoute("/parent/orders/$id")({
  head: () => ({ meta: [{ title: "Order · EDUCA" }] }),
  component: OrderDetail,
});

function OrderDetail() {
  const { id } = Route.useParams();
  const o = orders.find((x) => x.id === id);
  if (!o) throw notFound();
  return (
    <PortalShell role="parent" title={`Order ${o.number}`} subtitle={`${o.supplier} · ${o.date}`} actions={<OrderStatusBadge status={o.status} />}>
      <Link to="/parent/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back to Orders</Link>
      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6">
          <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
            <h3 className="font-display font-semibold text-navy mb-4">Items</h3>
            <ul className="divide-y divide-border">
              {o.items.map((i) => (
                <li key={i.productId} className="py-3 flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${i.gradient} grid place-items-center text-white/40 font-display`}>{i.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy">{i.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.quantity} {i.size && `· Size ${i.size}`}</p>
                  </div>
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
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Supplier</p>
            <p className="font-display font-semibold text-navy">{o.supplier}</p>
            <p className="text-muted-foreground">{o.student} · {o.school}</p>
          </div>
          <div className="rounded-2xl bg-card border border-border shadow-soft p-5 text-sm">
            <div className="flex items-center gap-2 text-primary"><Truck className="h-4 w-4" /> <span className="font-semibold">{o.delivery}</span></div>
            {o.address && <p className="mt-2 text-muted-foreground">{o.address}</p>}
          </div>
          <div className="rounded-2xl bg-navy text-white p-5 text-sm">
            <div className="flex items-center gap-2 text-gold"><Store className="h-4 w-4" /> <span className="font-semibold">Payment</span></div>
            <p className="mt-2 text-white/80">Paid via M-Pesa</p>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}