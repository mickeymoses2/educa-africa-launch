import { Link } from "@tanstack/react-router";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/educa";
import { useCart } from "@/hooks/useCart";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden flex flex-col group">
      <Link to="/marketplace/products/$id" params={{ id: p.id }} className={`block aspect-[4/3] bg-gradient-to-br ${p.gradient} relative`}>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-6xl text-white/30 group-hover:scale-105 transition">{p.name.split(" ")[0][0]}</span>
        </div>
        {p.schoolApproved && (
          <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold uppercase tracking-wider text-teal-foreground rounded-full px-2 py-1">School-Approved</span>
        )}
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{p.category}</p>
        <h3 className="mt-1 font-semibold text-navy line-clamp-2">{p.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{p.supplier}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="font-semibold text-navy">{p.rating}</span>
          <span>· {p.reviews} reviews</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <p className="font-display font-bold text-navy">KES {p.price.toLocaleString()}</p>
            <p className={`text-[11px] font-semibold ${p.stock > 20 ? "text-success-foreground" : "text-warning-foreground"}`}>
              {p.stock > 20 ? "In stock" : `Only ${p.stock} left`}
            </p>
          </div>
          <button
            onClick={() => add({ productId: p.id, name: p.name, supplier: p.supplier, price: p.price, quantity: 1, size: p.sizes[0], gradient: p.gradient })}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gold text-gold-foreground text-xs font-semibold px-3 py-2 hover:brightness-105"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}