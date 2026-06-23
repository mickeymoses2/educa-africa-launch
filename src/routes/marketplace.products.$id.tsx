import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Star, Truck, ShieldCheck, ShoppingCart } from "lucide-react";
import { products } from "@/data/educa";
import { useCart } from "@/hooks/useCart";

export const Route = createFileRoute("/marketplace/products/$id")({
  head: () => ({ meta: [{ title: "Product · EDUCA Marketplace" }] }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const p = products.find((x) => x.id === id);
  if (!p) throw notFound();
  const [size, setSize] = useState(p.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  return (
    <div>
      <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back to Marketplace</Link>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className={`aspect-square rounded-3xl bg-gradient-to-br ${p.gradient} grid place-items-center relative overflow-hidden`}>
            <span className="font-display text-9xl text-white/30">{p.name[0]}</span>
            {p.schoolApproved && <span className="absolute top-5 left-5 bg-white text-[10px] font-bold uppercase tracking-wider text-teal-foreground rounded-full px-3 py-1.5">School-Approved</span>}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${p.gradient} opacity-60 grid place-items-center text-white/40 font-display text-2xl`}>{p.name[0]}</div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{p.category} · {p.supplier}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy">{p.name}</h1>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="font-semibold text-navy">{p.rating}</span>
            <span className="text-muted-foreground">· {p.reviews} reviews</span>
          </div>
          <p className="mt-4 font-display text-4xl font-bold text-navy">KES {p.price.toLocaleString()}</p>
          <p className={`mt-1 text-sm font-semibold ${p.stock > 20 ? "text-success-foreground" : "text-warning-foreground"}`}>{p.stock > 20 ? "In stock · Ships in 2–4 days" : `Only ${p.stock} left`}</p>
          <p className="mt-6 text-sm text-foreground/80">{p.description}</p>

          {p.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`h-10 min-w-12 px-3 rounded-xl border-2 text-sm font-semibold ${size === s ? "border-primary bg-primary/5 text-navy" : "border-border bg-white text-foreground/70"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Quantity</p>
            <div className="inline-flex items-center rounded-xl border border-border overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 grid place-items-center hover:bg-muted">−</button>
              <input value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className="h-11 w-14 text-center font-semibold outline-none" />
              <button onClick={() => setQty(qty + 1)} className="h-11 w-11 grid place-items-center hover:bg-muted">+</button>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-2">
            <button
              onClick={() => add({ productId: p.id, name: p.name, supplier: p.supplier, price: p.price, quantity: qty, size, gradient: p.gradient })}
              className="rounded-xl bg-gold text-gold-foreground font-semibold py-3 inline-flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => { add({ productId: p.id, name: p.name, supplier: p.supplier, price: p.price, quantity: qty, size, gradient: p.gradient }); navigate({ to: "/marketplace/checkout" }); }}
              className="rounded-xl bg-navy text-white font-semibold py-3"
            >
              Buy Now
            </button>
          </div>

          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <li className="rounded-xl bg-muted/40 p-3 flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Home delivery available</li>
            <li className="rounded-xl bg-muted/40 p-3 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Verified EDUCA supplier</li>
          </ul>
        </div>
      </div>
    </div>
  );
}