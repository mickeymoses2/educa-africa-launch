import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { OrderStatusBadge } from "@/components/educa/OrderStatusBadge";
import { EmptyState } from "@/components/educa/EmptyState";
import { orders } from "@/data/educa";

export const Route = createFileRoute("/parent/orders")({
  head: () => ({ meta: [{ title: "Orders · EDUCA" }] }),
  component: OrdersLayout,
});

function OrdersLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/parent/orders") return <Outlet />;
  return (
    <PortalShell role="parent" title="My Orders" subtitle="Track every marketplace and uniform order placed on EDUCA.">
      {orders.length === 0 ? (
        <EmptyState icon={Package} title="No orders yet" description="Order school essentials or uniforms from the marketplace." />
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {orders.map((o) => (
            <Link key={o.id} to="/parent/orders/$id" params={{ id: o.id }} className="rounded-2xl bg-card border border-border shadow-soft p-5 hover:shadow-card transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{o.number}</p>
                  <p className="font-display font-semibold text-navy mt-0.5">{o.items.map((i) => i.name).join(", ")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{o.supplier} · {o.student} · {o.date}</p>
                </div>
                <OrderStatusBadge status={o.status} />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-display font-bold text-navy">KES {o.amount.toLocaleString()}</p>
                <span className="text-xs font-semibold text-primary">View details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PortalShell>
  );
}