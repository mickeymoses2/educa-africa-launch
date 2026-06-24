import { Star, MapPin, Truck, Clock, CheckCircle2 } from "lucide-react";
import type { LogisticsPartner } from "@/data/educa";

export function LogisticsPartnerCard({
  p,
  selected,
  onSelect,
}: {
  p: LogisticsPartner;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-2xl border-2 p-4 sm:p-5 transition w-full ${
        selected ? "border-primary bg-primary/5 shadow-glow" : "border-border bg-white hover:border-primary/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${p.gradient} grid place-items-center text-white font-display font-semibold shrink-0`}>
          {p.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-display font-semibold text-navy">{p.name}</p>
            {p.official && <span className="text-[10px] font-bold uppercase tracking-wider bg-teal/15 text-teal-foreground rounded-full px-2 py-0.5">EDUCA Partner</span>}
          </div>
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {p.location} · {p.distanceKm} km from supplier</p>
        </div>
        {selected && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <Field icon={Clock} label="ETA" value={p.eta} />
        <Field icon={Truck} label="Vehicle" value={p.vehicle} />
        <Field icon={Star} label="Rating" value={`${p.rating}`} />
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Fee</p>
          <p className="font-display font-bold text-navy">{p.fee === 0 ? "Free" : `KES ${p.fee}`}</p>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Coverage: {p.coverage}</p>
    </button>
  );
}

function Field({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground inline-flex items-center gap-1"><Icon className="h-3 w-3" /> {label}</p>
      <p className="font-semibold text-navy text-sm truncate">{value}</p>
    </div>
  );
}