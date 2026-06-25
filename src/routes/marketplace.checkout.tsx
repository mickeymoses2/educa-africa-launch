import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShoppingBag, Truck, Building2, Store, ArrowLeft, ArrowRight, Wallet, Smartphone, Clock } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Stepper } from "@/components/educa/Stepper";
import { LogisticsPartnerCard } from "@/components/educa/LogisticsPartnerCard";
import { children, logisticsPartners, walletBalances } from "@/data/educa";

export const Route = createFileRoute("/marketplace/checkout")({
  head: () => ({ meta: [{ title: "Checkout · EDUCA Marketplace" }] }),
  component: CheckoutPage,
});

const STEPS = ["Cart Review", "Customer & Student", "Delivery Option", "Logistics Partner", "Payment Method", "Review & Place"];

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState<"Home Delivery" | "School Pickup" | "Supplier Pickup" | "Scheduled Delivery">("Home Delivery");
  const [method, setMethod] = useState<"Wallet" | "M-Pesa" | "Pay Later">("Wallet");
  const [partnerId, setPartnerId] = useState<string>(logisticsPartners[0].id);

  const walletAvailable = walletBalances.parent.available;
  const needsPartner = delivery === "Home Delivery" || delivery === "Scheduled Delivery";
  const deliveryFee = needsPartner ? logisticsPartners.find((p) => p.id === partnerId)?.fee ?? 0 : 0;
  const serviceFee = 50;
  const total = subtotal + deliveryFee + serviceFee;
  const walletInsufficient = method === "Wallet" && walletAvailable < total;

  const next = () => {
    let n = step + 1;
    if (n === 3 && !needsPartner) n = 4; // skip partner step if pickup
    setStep(Math.min(STEPS.length - 1, n));
  };
  const back = () => {
    let n = step - 1;
    if (n === 3 && !needsPartner) n = 2;
    setStep(Math.max(0, n));
  };

  if (placed) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="mx-auto h-20 w-20 rounded-full bg-success/15 grid place-items-center"><CheckCircle2 className="h-10 w-10 text-success-foreground" /></div>
        <h1 className="mt-5 font-display text-3xl font-bold text-navy">Order Placed Successfully</h1>
        <p className="mt-2 text-sm text-muted-foreground">Order number <span className="font-mono font-semibold text-navy">ORD-9{Math.floor(Math.random() * 900) + 100}</span>. {needsPartner ? `${logisticsPartners.find((p) => p.id === partnerId)?.name} will pick up your order soon.` : "Your order is ready to be processed."}</p>
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
      <div className="mt-6 rounded-2xl bg-card border border-border shadow-soft p-5">
        <Stepper steps={STEPS} current={step} onStep={(i) => setStep(i)} />
      </div>
      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">
          {step === 0 && (
            <Section title="Cart Review">
              <ul className="divide-y divide-border">
                {items.map((l) => (
                  <li key={`${l.productId}-${l.size}`} className="py-3 flex items-center gap-3">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${l.gradient} grid place-items-center text-white/40 font-display text-lg`}>{l.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy truncate">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{l.supplier} · Qty {l.quantity}{l.size && ` · ${l.size}`}</p>
                    </div>
                    <span className="font-semibold text-navy">KES {(l.price * l.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {step === 1 && (
            <>
              <Section title="Customer Details">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Full Name" defaultValue="Grace Mwangi" />
                  <Field label="Phone" defaultValue="+254 722 110 220" />
                  <Field label="Email" defaultValue="grace.m@mail.com" />
                  <Field label="County" defaultValue="Nairobi" />
                  <Field label="Town / City" defaultValue="Kilimani" />
                  <Field label="Delivery Address" defaultValue="Apt 4B, Kilimani Apartments" />
                </div>
              </Section>
              <Section title="Student / School Link">
                <div className="grid sm:grid-cols-3 gap-3">
                  <SelectField label="Student" options={children.map((c) => c.name)} />
                  <Field label="Class / Grade" defaultValue="Grade 6" />
                  <Field label="School" defaultValue="Kilimani Academy" />
                </div>
              </Section>
            </>
          )}
          {step === 2 && (
            <Section title="Delivery or Pickup">
              <div className="grid sm:grid-cols-2 gap-2">
                <Choice icon={Truck} active={delivery === "Home Delivery"} label="Home Delivery" desc="Delivered to your address by a logistics partner" onClick={() => setDelivery("Home Delivery")} />
                <Choice icon={Clock} active={delivery === "Scheduled Delivery"} label="Scheduled Delivery" desc="Pick a delivery slot that suits you" onClick={() => setDelivery("Scheduled Delivery")} />
                <Choice icon={Building2} active={delivery === "School Pickup"} label="School Pickup" desc="Free — we drop off at the school office" onClick={() => setDelivery("School Pickup")} />
                <Choice icon={Store} active={delivery === "Supplier Pickup"} label="Supplier Pickup" desc="Free — collect at the supplier shop" onClick={() => setDelivery("Supplier Pickup")} />
              </div>
            </Section>
          )}
          {step === 3 && needsPartner && (
            <Section title="Choose Delivery Partner">
              <p className="text-sm text-muted-foreground mb-4">Verified logistics partners near your supplier:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {logisticsPartners.map((p) => (
                  <LogisticsPartnerCard key={p.id} p={p} selected={partnerId === p.id} onSelect={() => setPartnerId(p.id)} />
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-1.5"><Truck className="h-3 w-3" /> Delivery is handled by verified EDUCA logistics partners near the supplier.</p>
            </Section>
          )}
          {step === 4 && (
            <Section title="Payment Method">
              <div className="grid sm:grid-cols-3 gap-2">
                <Choice icon={Wallet} active={method === "Wallet"} label={`EDUCA Wallet`} desc={`Balance: KES ${walletAvailable.toLocaleString()}`} onClick={() => setMethod("Wallet")} />
                <Choice icon={Smartphone} active={method === "M-Pesa"} label="M-Pesa" desc="Pay via STK push" onClick={() => setMethod("M-Pesa")} />
                <Choice icon={CheckCircle2} active={method === "Pay Later"} label="Pay Later" desc="Coming soon" onClick={() => setMethod("Pay Later")} />
              </div>
              {walletInsufficient && (
                <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/20 p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-destructive">Insufficient wallet balance</p>
                    <p className="text-xs text-muted-foreground">You need KES {(total - walletAvailable).toLocaleString()} more to pay using your wallet.</p>
                  </div>
                  <Link to="/parent/wallet/deposit" className="rounded-xl bg-gold text-gold-foreground font-semibold px-4 py-2.5 text-sm whitespace-nowrap">Deposit Money</Link>
                </div>
              )}
            </Section>
          )}
          {step === 5 && (
            <Section title="Review & Place Order">
              <Review label="Delivery" value={delivery} />
              {needsPartner && <Review label="Logistics Partner" value={logisticsPartners.find((p) => p.id === partnerId)?.name ?? "—"} />}
              <Review label="Payment Method" value={method === "Wallet" ? "EDUCA Wallet" : method} />
              <Review label="Items" value={`${items.length} product${items.length !== 1 ? "s" : ""}`} />
              <p className="mt-4 text-xs text-muted-foreground">By placing this order you agree to EDUCA's marketplace terms. Refunds available per supplier policy.</p>
            </Section>
          )}

          <div className="flex items-center justify-between gap-3">
            <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-xl bg-muted text-foreground/80 font-semibold px-4 py-2.5 text-sm disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-2.5 text-sm shadow-glow">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => { if (!walletInsufficient) { clear(); setPlaced(true); } }}
                disabled={walletInsufficient}
                className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-2.5 text-sm shadow-glow disabled:opacity-50"
              >
                Place Order <CheckCircle2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <aside className="rounded-2xl bg-card border border-border shadow-soft p-5 h-fit sticky top-20">
          <h3 className="font-display font-bold text-navy">Order Summary</h3>
          <ul className="mt-4 divide-y divide-border max-h-48 overflow-y-auto">
            {items.map((l) => (
              <li key={`${l.productId}-${l.size}`} className="py-3 flex items-center justify-between text-sm">
                <span>{l.name} <span className="text-xs text-muted-foreground">× {l.quantity}</span></span>
                <span className="font-semibold">KES {(l.price * l.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1.5 text-sm pt-3 border-t border-border">
            <Line k="Subtotal" v={`KES ${subtotal.toLocaleString()}`} />
            <Line k={needsPartner ? "Delivery fee" : "Pickup"} v={needsPartner ? `KES ${deliveryFee.toLocaleString()}` : "Free"} />
            <Line k="Service fee" v={`KES ${serviceFee}`} />
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-2xl font-bold text-navy">KES {total.toLocaleString()}</span>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground inline-flex items-center gap-1.5"><Truck className="h-3 w-3" /> Powered by EDUCA Logistics Partners</p>
        </aside>
      </div>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{k}</span><span className="font-semibold text-navy">{v}</span></div>;
}
function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <span className="font-semibold text-navy">{value}</span>
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
function Choice({ icon: Icon, label, desc, active, onClick }: { icon: any; label: string; desc?: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-xl border-2 p-4 text-left transition ${active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
        <span className="text-sm font-semibold text-navy">{label}</span>
      </div>
      {desc && <p className="mt-1 text-xs text-muted-foreground">{desc}</p>}
    </button>
  );
}