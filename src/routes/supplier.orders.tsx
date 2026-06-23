import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { OrderStatusBadge } from "@/components/educa/OrderStatusBadge";
import { EmptyState } from "@/components/educa/EmptyState";
import { orders } from "@/data/educa";

export const Route = createFileRoute("/supplier/orders")({
  head: () => ({ meta: [{ title: "Orders · EDUCA Supplier" }] }),
  component: () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    if (pathname !== "/supplier/orders") return <Outlet />;
    return (
      <SupplierShell title="Customer Orders" subtitle="Process, fulfil and ship orders placed through EDUCA Marketplace.">
        {orders.length === 0 ? (
          <EmptyState icon={ClipboardList} title="No orders yet" description="Once shoppers place an order, it will appear here." />
        ) : (
          <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left p-4">Order #</th><th className="text-left p-4">Customer</th><th className="text-left p-4">Student / School</th><th className="text-left p-4">Items</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Status</th><th className="p-4" /></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30">
                    <td className="p-4 font-mono text-xs">{o.number}</td>
                    <td className="p-4 font-semibold text-navy">{o.customer}</td>
                    <td className="p-4 text-xs text-muted-foreground">{o.student} · {o.school}</td>
                    <td className="p-4">{o.items.length}</td>
                    <td className="p-4 font-semibold">KES {o.amount.toLocaleString()}</td>
                    <td className="p-4"><OrderStatusBadge status={o.status} /></td>
                    <td className="p-4 text-right"><Link to="/supplier/orders/$id" params={{ id: o.id }} className="rounded-lg bg-navy text-white text-xs font-semibold px-3 py-2">Manage</Link></td>
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