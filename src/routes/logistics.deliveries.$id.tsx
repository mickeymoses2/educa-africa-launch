import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone, Camera, AlertTriangle, CheckCircle2 } from "lucide-react";
import { LogisticsShell } from "@/components/educa/LogisticsShell";
import { DeliveryStatusBadge } from "@/components/educa/DeliveryStatusBadge";
import { DeliveryTimeline } from "@/components/educa/DeliveryTimeline";
import { deliveries, type DeliveryStatus } from "@/data/educa";

export const Route = createFileRoute("/logistics/deliveries/$id")({
  head: () => ({ meta: [{ title: "Delivery · Logistics" }] }),
  component: () => {
    const { id } = Route.useParams();
    const d = deliveries.find((x) => x.id === id);
    if (!d) throw notFound();
    const [status, setStatus] = useState<DeliveryStatus>(d.status);
    const actions: { label: string; to: DeliveryStatus }[] = [
      { label: "Accept Delivery", to: "Assigned" },
      { label: "Mark Picked Up", to: "Picked Up" },
      { label: "Mark In Transit", to: "In Transit" },
      { label: "Mark Delivered", to: "Delivered" },
    ];
    return (
      <LogisticsShell title={`Delivery ${d.number}`} subtitle={`Order ${d.orderRef}`} actions={<DeliveryStatusBadge status={status} />}>
        <Link to="/logistics/deliveries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back to Deliveries</Link>
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h3 className="font-display font-semibold text-navy mb-4">Pickup & Drop-off</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Pickup</p>
                  <p className="font-semibold text-navy">{d.supplier}</p>
                  <p className="text-muted-foreground">{d.pickup}</p>
                  <a className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Phone className="h-3 w-3" /> {d.supplierPhone}</a>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Drop-off</p>
                  <p className="font-semibold text-navy">{d.customer}</p>
                  <p className="text-muted-foreground">{d.dropoff}</p>
                  <a className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Phone className="h-3 w-3" /> {d.customerPhone}</a>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-3 text-sm">
                <p><span className="text-muted-foreground">Distance:</span> <span className="font-semibold text-navy">{d.distanceKm} km</span></p>
                <p><span className="text-muted-foreground">Fee:</span> <span className="font-semibold text-navy">KES {d.fee}</span></p>
                <p><span className="text-muted-foreground">ETA:</span> <span className="font-semibold text-navy">{d.eta}</span></p>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{d.packageType} · {d.itemsSummary}</p>
            </section>

            <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h3 className="font-display font-semibold text-navy mb-4">Update status</h3>
              <div className="flex flex-wrap gap-2">
                {actions.map((a) => (
                  <button key={a.to} onClick={() => setStatus(a.to)} className={`rounded-xl text-sm font-semibold px-4 py-2.5 ${status === a.to ? "bg-success text-white" : "bg-gold text-gold-foreground hover:brightness-105"}`}>
                    {status === a.to ? <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> {a.label}</span> : a.label}
                  </button>
                ))}
                <button onClick={() => setStatus("Failed")} className="rounded-xl bg-destructive/10 text-destructive font-semibold px-4 py-2.5 text-sm inline-flex items-center gap-1"><AlertTriangle className="h-4 w-4" /> Report Issue</button>
              </div>
              <div className="mt-5 rounded-xl border-2 border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                <Camera className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                Upload proof of delivery photo
                <p className="mt-1 text-xs">(Placeholder — drag & drop or tap to upload)</p>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Customer confirmation code</span>
                  <input placeholder="6-digit code" className="mt-1.5 w-full h-11 rounded-xl border border-border px-3 text-sm" />
                </label>
              </div>
            </section>

            <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h3 className="font-display font-semibold text-navy mb-4">Delivery Timeline</h3>
              <DeliveryTimeline status={status} />
            </section>
          </div>
          <aside className="space-y-3 h-fit">
            <div className="rounded-2xl bg-navy text-white p-5 text-sm">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-white/60">Payout for this delivery</p>
              <p className="font-display text-3xl font-bold mt-1">KES {d.fee.toLocaleString()}</p>
              <p className="text-xs text-white/70 mt-1">Paid out after delivery is confirmed.</p>
            </div>
          </aside>
        </div>
      </LogisticsShell>
    );
  },
});