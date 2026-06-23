import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Plus, Package } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { products } from "@/data/educa";
import { EmptyState } from "@/components/educa/EmptyState";

export const Route = createFileRoute("/supplier/products")({
  head: () => ({ meta: [{ title: "Products · EDUCA Supplier" }] }),
  component: () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    if (pathname !== "/supplier/products") return <Outlet />;
    const mine = products.filter((p) => p.supplierId === "sup-001" || p.supplierId === "sup-003");
    return (
      <SupplierShell
        title="My Products"
        subtitle="Manage your catalog visible on the EDUCA Marketplace."
        actions={<Link to="/supplier/products/new" className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold"><Plus className="h-4 w-4" /> Add Product</Link>}
      >
        {mine.length === 0 ? (
          <EmptyState icon={Package} title="No products yet" description="Add your first product to start selling on EDUCA Marketplace." />
        ) : (
          <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left p-4">Product</th><th className="text-left p-4">Category</th><th className="text-left p-4">Price</th><th className="text-left p-4">Stock</th><th className="text-left p-4">Status</th><th className="p-4" /></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mine.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td className="p-4 flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${p.gradient} grid place-items-center text-white/40 font-display`}>{p.name[0]}</div>
                      <span className="font-semibold text-navy">{p.name}</span>
                    </td>
                    <td className="p-4 text-muted-foreground">{p.category}</td>
                    <td className="p-4 font-semibold">KES {p.price.toLocaleString()}</td>
                    <td className="p-4">{p.stock}</td>
                    <td className="p-4"><span className="text-[11px] font-bold rounded-full bg-success/15 text-success-foreground px-2 py-0.5">Active</span></td>
                    <td className="p-4 text-right"><button className="text-xs font-semibold text-primary">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SupplierShell>
    );
  },
});