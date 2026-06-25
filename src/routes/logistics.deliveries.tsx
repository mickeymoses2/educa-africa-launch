import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { LogisticsShell } from "@/components/educa/LogisticsShell";
import { DeliveryRequestCard } from "@/components/educa/DeliveryRequestCard";
import { DeliveryStatusBadge } from "@/components/educa/DeliveryStatusBadge";
import { deliveries, type Delivery } from "@/data/educa";

export const Route = createFileRoute("/logistics/deliveries")({
  head: () => ({ meta: [{ title: "Deliveries · Logistics" }] }),
  component: () => {
    const [tab, setTab] = useState<"available" | "active" | "completed">("available");
    const filter: Record<string, (d: Delivery) => boolean> = {
      available: (d) => d.status === "Pending Assignment",
      active: (d) => ["Assigned", "Picked Up", "In Transit"].includes(d.status),
      completed: (d) => d.status === "Delivered",
    };
    const list = deliveries.filter(filter[tab]);
    return (
      <LogisticsShell title="Deliveries" subtitle="Manage your delivery pipeline from request to drop-off.">
        <div className="inline-flex bg-muted rounded-xl p-1 mb-6">
          {(["available", "active", "completed"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-semibold rounded-lg capitalize ${tab === t ? "bg-white text-navy shadow-soft" : "text-muted-foreground"}`}>
              {t} ({deliveries.filter(filter[t]).length})
            </button>
          ))}
        </div>
        {tab === "available" && (
          <div className="grid md:grid-cols-2 gap-4">
            {list.map((d) => <DeliveryRequestCard key={d.id} d={d} />)}
          </div>
        )}
        {tab !== "available" && (
          <div className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border">
            {list.map((d) => (
              <Link key={d.id} to="/logistics/deliveries/$id" params={{ id: d.id }} className="flex items-center gap-3 p-4 hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Truck className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy">{d.number} · {d.customer}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.pickup} → {d.dropoff} · KES {d.fee}</p>
                </div>
                <DeliveryStatusBadge status={d.status} />
              </Link>
            ))}
          </div>
        )}
      </LogisticsShell>
    );
  },
});