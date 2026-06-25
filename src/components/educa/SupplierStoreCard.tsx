import { Link } from "@tanstack/react-router";
import { Star, ShieldCheck, Truck } from "lucide-react";
import type { Supplier } from "@/data/educa";

export function SupplierStoreCard({ s }: { s: Supplier }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-5 flex flex-col">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-teal grid place-items-center text-white font-display font-semibold shrink-0">
          {s.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display font-semibold text-navy truncate">{s.name}</h3>
            {s.official && <ShieldCheck className="h-4 w-4 text-teal-foreground shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground">{s.location}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="inline-flex items-center gap-1 text-xs font-semibold text-navy"><Star className="h-3 w-3 fill-gold text-gold" /> {s.rating}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-foreground/75 line-clamp-2">{s.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="text-[10px] uppercase tracking-wider font-semibold bg-muted text-foreground/70 rounded-full px-2 py-1">{s.category}</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold bg-teal/15 text-teal-foreground rounded-full px-2 py-1 inline-flex items-center gap-1"><Truck className="h-3 w-3" /> {s.delivery}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{s.productsCount} products</p>
        <Link to="/marketplace" className="rounded-xl bg-navy text-white text-xs font-semibold px-3 py-2">View Store</Link>
      </div>
    </div>
  );
}