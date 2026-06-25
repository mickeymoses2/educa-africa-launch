import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ClipboardList, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, Send } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { OrderStatusBadge } from "@/components/educa/OrderStatusBadge";
import { orders, products, walletBalances } from "@/data/educa";

export const Route = createFileRoute("/supplier/")({
  head: () => ({ meta: [{ title: "Supplier Dashboard · EDUCA" }] }),
  component: () => {
    const mine = orders.filter((o) => o.supplierId === "sup-001");
    const lowStock = products.filter((p) => p.stock < 80).slice(0, 4);
    return (
      <SupplierShell title="Welcome back, Asili Uniforms" subtitle="A quick view of your products, orders and sales on EDUCA Marketplace.">
        <div className="mb-8">
          <WalletCard
            data={walletBalances.supplier}
            actions={[
              { label: "Request Payout", to: "/supplier/wallet/deposit", icon: Send },
              { label: "View Sales", to: "/supplier/sales", icon: TrendingUp, variant: "ghost" },
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard label="Total Products" value={products.filter((p) => p.supplierId === "sup-001").length} icon={Package} tone="primary" />
          <SummaryCard label="Pending Orders" value={mine.filter((o) => ["Pending Payment","Payment Received","Processing"].includes(o.status)).length} icon={ClipboardList} tone="gold" />
          <SummaryCard label="Completed Orders" value={mine.filter((o) => o.status === "Delivered").length} icon={CheckCircle2} tone="teal" />
          <SummaryCard label="Sales This Month" value="KES 142K" delta="+22% MoM" icon={TrendingUp} tone="success" />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-navy">Recent orders</h3>
              <Link to="/supplier/orders" className="text-xs font-semibold text-primary inline-flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>
            </div>
            <ul className="divide-y divide-border">
              {mine.slice(0, 4).map((o) => (
                <li key={o.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy">{o.number}</p>
                    <p className="text-xs text-muted-foreground">{o.customer} · KES {o.amount.toLocaleString()}</p>
                  </div>
                  <OrderStatusBadge status={o.status} />
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
            <h3 className="font-display font-semibold text-navy mb-4 inline-flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-gold-foreground" /> Low stock</h3>
            <ul className="divide-y divide-border">
              {lowStock.map((p) => (
                <li key={p.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <span className="text-xs font-bold text-warning-foreground">{p.stock} left</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SupplierShell>
    );
  },
});