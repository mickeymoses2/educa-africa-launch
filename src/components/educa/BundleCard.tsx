import { Link } from "@tanstack/react-router";
import { Package, ShoppingCart } from "lucide-react";
import type { Bundle } from "@/data/educa";

export function BundleCard({ b }: { b: Bundle }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden flex flex-col group hover:shadow-card transition">
      <div className={`aspect-[5/3] bg-gradient-to-br ${b.gradient} relative grid place-items-center`}>
        <Package className="h-14 w-14 text-white/40" />
        <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold uppercase tracking-wider text-navy rounded-full px-2 py-1">{b.classGrade}</span>
        {b.oldPrice && <span className="absolute top-3 right-3 bg-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-1">Save KES {(b.oldPrice - b.price).toLocaleString()}</span>}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-navy">{b.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{b.schoolHint} · {b.itemsCount} items</p>
        <p className="mt-2 text-sm text-foreground/75 line-clamp-2">{b.description}</p>
        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            <p className="font-display text-xl font-bold text-navy">KES {b.price.toLocaleString()}</p>
            {b.oldPrice && <p className="text-xs text-muted-foreground line-through">KES {b.oldPrice.toLocaleString()}</p>}
          </div>
          <div className="flex gap-1.5">
            <Link to="/marketplace/bundles" className="rounded-xl bg-muted text-navy font-semibold px-3 py-2 text-xs">View</Link>
            <button className="inline-flex items-center gap-1 rounded-xl bg-gold text-gold-foreground font-semibold px-3 py-2 text-xs"><ShoppingCart className="h-3.5 w-3.5" /> Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}