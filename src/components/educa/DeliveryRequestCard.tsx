import { MapPin, Package, ArrowRight } from "lucide-react";
import type { Delivery } from "@/data/educa";

export function DeliveryRequestCard({ d, onAccept, onReject }: { d: Delivery; onAccept?: () => void; onReject?: () => void }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Order {d.orderRef}</p>
          <p className="font-display font-bold text-navy">{d.number}</p>
        </div>
        <p className="font-display text-xl font-bold text-navy">KES {d.fee.toLocaleString()}</p>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Pickup</p>
            <p className="text-navy font-semibold">{d.supplier}</p>
            <p className="text-xs text-muted-foreground">{d.pickup}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ArrowRight className="h-4 w-4 text-gold mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Drop-off · {d.distanceKm} km</p>
            <p className="text-navy font-semibold">{d.customer}</p>
            <p className="text-xs text-muted-foreground">{d.dropoff}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 pt-1">
          <Package className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">{d.packageType} · {d.itemsSummary}</p>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <button onClick={onAccept} className="flex-1 rounded-xl bg-gold text-gold-foreground font-semibold py-2.5 text-sm">Accept</button>
        <button onClick={onReject} className="rounded-xl bg-muted text-foreground/80 font-semibold py-2.5 text-sm px-4">Reject</button>
      </div>
    </div>
  );
}