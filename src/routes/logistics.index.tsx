import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, CheckCircle2, Clock, AlertTriangle, ArrowRight, Send, DollarSign } from "lucide-react";
import { LogisticsShell } from "@/components/educa/LogisticsShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { DeliveryRequestCard } from "@/components/educa/DeliveryRequestCard";
import { DeliveryStatusBadge } from "@/components/educa/DeliveryStatusBadge";
import { deliveries, walletBalances } from "@/data/educa";

export const Route = createFileRoute("/logistics/")({
  head: () => ({ meta: [{ title: "Logistics Dashboard · EDUCA" }] }),
  component: () => {
    const pending = deliveries.filter((d) => d.status === "Pending Assignment");
    const active = deliveries.filter((d) => ["Assigned", "Picked Up", "In Transit"].includes(d.status));
    return (
      <LogisticsShell title="Welcome back, SwiftEdu" subtitle="Track new delivery requests, active jobs and earnings — all in one place.">
        <WalletCard
          data={walletBalances.logistics}
          actions={[
            { label: "Request Payout", to: "/logistics/wallet/deposit", icon: Send },
            { label: "View Earnings", to: "/logistics/earnings", icon: DollarSign, variant: "ghost" },
          ]}
        />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="New Requests" value={pending.length} icon={Truck} tone="gold" />
          <SummaryCard label="Active Deliveries" value={active.length} icon={Clock} tone="primary" />
          <SummaryCard label="Completed Today" value={6} icon={CheckCircle2} tone="success" />
          <SummaryCard label="Failed / Delayed" value={0} icon={AlertTriangle} tone="muted" />
        </div>

        <section className="mt-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-navy">Available delivery requests</h2>
              <p className="text-sm text-muted-foreground">Accept jobs near your operating area.</p>
            </div>
            <Link to="/logistics/deliveries" className="text-sm font-semibold text-primary inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pending.map((d) => <DeliveryRequestCard key={d.id} d={d} />)}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-navy mb-4">Active deliveries</h2>
          <div className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border">
            {active.map((d) => (
              <Link key={d.id} to="/logistics/deliveries/$id" params={{ id: d.id }} className="flex items-center gap-3 p-4 hover:bg-muted/30">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Truck className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy">{d.number} · {d.customer}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.pickup} → {d.dropoff}</p>
                </div>
                <span className="hidden sm:inline text-xs text-muted-foreground">ETA {d.eta}</span>
                <DeliveryStatusBadge status={d.status} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid lg:grid-cols-3 gap-4">
          <EarningTile label="Today" value="KES 1,250" sub="6 deliveries" />
          <EarningTile label="This Week" value="KES 8,420" sub="38 deliveries" />
          <EarningTile label="This Month" value="KES 34,180" sub="126 deliveries" />
        </section>
      </LogisticsShell>
    );
  },
});

function EarningTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}