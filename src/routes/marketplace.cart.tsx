import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/educa/EmptyState";
import { useCart } from "@/hooks/useCart";

export const Route = createFileRoute("/marketplace/cart")({
  head: () => ({ meta: [{ title: "Cart · EDUCA Marketplace" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, update, remove, subtotal } = useCart();
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-navy">Your Cart</h1>
      <p className="text-sm text-muted-foreground mt-1">{items.length} item{items.length !== 1 && "s"}</p>
      <div className="mt-6">
        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Browse the marketplace and add school essentials to get started."
            action={<Link to="/marketplace" className="rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3">Browse Products</Link>}
          />
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="rounded-2xl bg-card border border-border shadow-soft divide-y divide-border">
              {items.map((l) => (
                <div key={`${l.productId}-${l.size}`} className="p-4 flex items-center gap-4">
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${l.gradient} grid place-items-center text-white/40 font-display text-2xl`}>{l.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy truncate">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.supplier}{l.size && ` · ${l.size}`}</p>
                    <div className="mt-2 inline-flex items-center rounded-lg border border-border overflow-hidden">
                      <button onClick={() => update(l.productId, l.size, l.quantity - 1)} className="h-8 w-8">−</button>
                      <span className="h-8 w-10 grid place-items-center text-sm font-semibold">{l.quantity}</span>
                      <button onClick={() => update(l.productId, l.size, l.quantity + 1)} className="h-8 w-8">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-navy">KES {(l.price * l.quantity).toLocaleString()}</p>
                    <button onClick={() => remove(l.productId, l.size)} className="mt-2 inline-flex items-center gap-1 text-xs text-destructive font-semibold"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="rounded-2xl bg-navy text-white p-6 h-fit sticky top-20">
              <h3 className="font-display font-bold">Order Summary</h3>
              <div className="mt-4 space-y-2 text-sm">
                <Row k="Subtotal" v={`KES ${subtotal.toLocaleString()}`} />
                <Row k="Delivery" v="Calculated at checkout" />
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-white/70">Total</span>
                <span className="font-display text-2xl font-bold">KES {subtotal.toLocaleString()}</span>
              </div>
              <Link to="/marketplace/checkout" className="mt-5 block w-full rounded-xl bg-gold text-gold-foreground text-center font-semibold py-3">Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between text-white/80"><span>{k}</span><span className="font-semibold text-white">{v}</span></div>;
}