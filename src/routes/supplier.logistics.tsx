import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Star } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { LogisticsPartnerCard } from "@/components/educa/LogisticsPartnerCard";
import { logisticsPartners, deliveries } from "@/data/educa";

export const Route = createFileRoute("/supplier/logistics")({
  head: () => ({ meta: [{ title: "Logistics · Supplier" }] }),
  component: () => (
    <SupplierShell title="Logistics Partners" subtitle="Connect your products to trusted EDUCA logistics partners near your shop." actions={
      <Link to="/logistics/register" className="rounded-xl bg-gold text-gold-foreground font-semibold text-sm px-4 py-2.5">Invite a partner</Link>
    }>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Active Partners", "4"],
          ["Pickups This Week", "26"],
          ["Avg. Pickup Time", "42 min"],
          ["On-Time Rate", "97%"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-2xl bg-card border border-border shadow-soft p-5">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{l}</p>
            <p className="mt-1 font-display text-2xl font-bold text-navy">{v}</p>
          </div>
        ))}
      </div>
      <h2 className="font-display text-xl font-bold text-navy mb-3">Nearby logistics partners</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {logisticsPartners.map((p) => <LogisticsPartnerCard key={p.id} p={p} />)}
      </div>

      <h2 className="font-display text-xl font-bold text-navy mt-10 mb-3">Recent pickups</h2>
      <div className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border">
        {deliveries.slice(0, 4).map((d) => (
          <div key={d.id} className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Truck className="h-5 w-5" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy">{d.number} · {d.orderRef}</p>
              <p className="text-xs text-muted-foreground">{d.itemsSummary} → {d.dropoff}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-gold text-gold" /> 4.8</span>
          </div>
        ))}
      </div>
    </SupplierShell>
  ),
});