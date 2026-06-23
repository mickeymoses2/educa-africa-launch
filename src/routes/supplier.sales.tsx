import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ShoppingBag, Award, ClipboardList } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { products, orders } from "@/data/educa";

export const Route = createFileRoute("/supplier/sales")({
  head: () => ({ meta: [{ title: "Sales · EDUCA Supplier" }] }),
  component: () => {
    const best = products.slice().sort((a, b) => b.reviews - a.reviews).slice(0, 5);
    return (
      <SupplierShell title="Sales Report" subtitle="An overview of your sales performance this month.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard label="Revenue (Month)" value="KES 142,300" delta="+22% MoM" icon={TrendingUp} tone="success" />
          <SummaryCard label="Orders" value={orders.length} icon={ClipboardList} tone="primary" />
          <SummaryCard label="Avg Order Value" value="KES 3,540" icon={ShoppingBag} tone="teal" />
          <SummaryCard label="Best Seller" value="Cotton Shirt" icon={Award} tone="gold" />
        </div>
        <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
          <h3 className="font-display font-semibold text-navy mb-4">Best-selling products</h3>
          <ul className="space-y-3">
            {best.map((p) => {
              const pct = Math.round((p.reviews / best[0].reviews) * 100);
              return (
                <li key={p.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">{p.name}</span>
                    <span className="text-muted-foreground">{p.reviews} sold</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-teal" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </SupplierShell>
    );
  },
});