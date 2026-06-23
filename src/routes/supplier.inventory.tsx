import { createFileRoute } from "@tanstack/react-router";
import { Boxes, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { products } from "@/data/educa";

export const Route = createFileRoute("/supplier/inventory")({
  head: () => ({ meta: [{ title: "Inventory · EDUCA Supplier" }] }),
  component: () => (
    <SupplierShell title="Inventory" subtitle="Keep stock levels accurate to avoid overselling and missed orders.">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Total SKUs" value={products.length} icon={Boxes} tone="primary" />
        <SummaryCard label="In Stock" value={products.filter((p) => p.stock > 50).length} icon={CheckCircle2} tone="teal" />
        <SummaryCard label="Low Stock" value={products.filter((p) => p.stock < 50).length} icon={AlertTriangle} tone="gold" />
      </div>
      <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-4">SKU</th><th className="text-left p-4">Product</th><th className="text-left p-4">Category</th><th className="text-left p-4">Stock</th><th className="text-left p-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30">
                <td className="p-4 font-mono text-xs">{p.id.toUpperCase()}</td>
                <td className="p-4 font-semibold text-navy">{p.name}</td>
                <td className="p-4 text-muted-foreground">{p.category}</td>
                <td className="p-4"><input defaultValue={p.stock} type="number" className="w-20 rounded-lg border border-border px-2 py-1 text-sm" /></td>
                <td className="p-4"><span className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${p.stock > 50 ? "bg-success/15 text-success-foreground" : "bg-warning/15 text-warning-foreground"}`}>{p.stock > 50 ? "Healthy" : "Low"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SupplierShell>
  ),
});