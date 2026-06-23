import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShoppingBag, Truck, Building2, Store } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { children } from "@/data/educa";

export const Route = createFileRoute("/marketplace/checkout")({
  head: () => ({ meta: [{ title: "Checkout · EDUCA Marketplace" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [delivery, setDelivery] = useState<"Home Delivery" | "School Pickup" | "Supplier Pickup">("Home Delivery");
  const [method, setMethod] = useState<"M-Pesa" | "Pay Later">("M-Pesa");

  if (placed) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="mx-auto h-20 w-20 rounded-full bg-success/15 grid place-items-center"><CheckCircle2 className="h-10 w-10 text-success-foreground" /></div>
        <h1 className="mt-5 font-display text-3xl font-bold text-navy">Order Placed Successfully</h1>
        <p className="mt-2 text-sm text-muted-foreground">Order number <span className="font-mono font-semibold text-navy">ORD-9{Math.floor(Math.random() * 900) + 100}</span>. We'll notify you once your items ship.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <Link to="/parent/orders" className="rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3">Track Order</Link>
          <Link to="/marketplace" className="rounded-xl border border-border font-semibold px-5 py-3">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-2xl font-bold text-navy">Your cart is empty</h1>
        <Link to="/marketplace" className="mt-4 inline-block rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3">Browse Products</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-navy">Checkout</h1>
      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">
          <Section title="Customer Details">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full Name" defaultValue="Grace Mwangi" />
              <Field label="Phone" defaultValue="+254 722 110 220" />
              <Field label="Email" defaultValue="grace.m@mail.com" />
              <Field label="City" defaultValue="Nairobi" />
            </div>
          </Section>
          <Section title="Student / School Link">
            <div className="grid sm:grid-cols-2 gap-3">
              <SelectField label="Student" options={children.map((c) => c.name)} />
              <Field label="School" defaultValue="Kilimani Academy" />
            </div>
          </Section>
          <Section title="Delivery or Pickup">
            <div className="grid sm:grid-cols-3 gap-2">
              <Choice icon={Truck} active={delivery === "Home Delivery"} label="Home Delivery" onClick={() => setDelivery("Home Delivery")} />
              <Choice icon={Building2} active={delivery === "School Pickup"} label="School Pickup" onClick={() => setDelivery("School Pickup")} />
              <Choice icon={Store} active={delivery === "Supplier Pickup"} label="Supplier Pickup" onClick={() => setDelivery("Supplier Pickup")} />
            </div>
          </Section>
          <Section title="Payment Method">
            <div className="grid sm:grid-cols-2 gap-2">
              <Choice icon={CheckCircle2} active={method === "M-Pesa"} label="M-Pesa" onClick={() => setMethod("M-Pesa")} />
              <Choice icon={CheckCircle2} active={method === "Pay Later"} label="Pay Later (Coming Soon)" onClick={() => setMethod("Pay Later")} />
            </div>
          </Section>
        </div>
        <aside className="rounded-2xl bg-card border border-border shadow-soft p-5 h-fit sticky top-20">
          <h3 className="font-display font-bold text-navy">Order Summary</h3>
          <ul className="mt-4 divide-y divide-border">
            {items.map((l) => (
              <li key={`${l.productId}-${l.size}`} className="py-3 flex items-center justify-between text-sm">
                <span>{l.name} <span className="text-xs text-muted-foreground">× {l.quantity}</span></span>
                <span className="font-semibold">KES {(l.price * l.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-2xl font-bold text-navy">KES {subtotal.toLocaleString()}</span>
          </div>
          <button onClick={() => { clear(); setPlaced(true); }} className="mt-5 w-full rounded-xl bg-gold text-gold-foreground font-semibold py-3">Place Order</button>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card border border-border shadow-soft p-5">
      <h3 className="font-display font-bold text-navy mb-4">{title}</h3>
      {children}
    </section>
  );
}
function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <input defaultValue={defaultValue} className="mt-1.5 w-full h-11 rounded-xl border border-border px-4 text-sm" />
    </label>
  );
}
function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <select className="mt-1.5 w-full h-11 rounded-xl border border-border px-3 text-sm">{options.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  );
}
function Choice({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-xl border-2 p-4 text-left text-sm font-semibold flex items-center gap-2 transition ${active ? "border-primary bg-primary/5 text-navy" : "border-border text-foreground/70 hover:border-primary/40"}`}>
      <Icon className="h-4 w-4 text-primary" /> {label}
    </button>
  );
}