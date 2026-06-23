import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ShoppingCart, Shirt } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { Stepper } from "@/components/educa/Stepper";
import { children, suppliers } from "@/data/educa";
import { useCart } from "@/hooks/useCart";

export const Route = createFileRoute("/parent/uniforms")({
  head: () => ({ meta: [{ title: "Order School Uniforms · EDUCA" }] }),
  component: UniformsPage,
});

const steps = ["Student", "School", "Class", "Items", "Measurements", "Supplier", "Review"];

const items = [
  { id: "u1", name: "Shirt", required: true, price: 850, gradient: "from-primary to-teal" },
  { id: "u2", name: "Skirt", required: true, price: 1200, gradient: "from-teal to-gold" },
  { id: "u3", name: "Trouser", required: true, price: 1200, gradient: "from-navy to-primary" },
  { id: "u4", name: "Sweater", required: true, price: 1800, gradient: "from-navy to-teal" },
  { id: "u5", name: "Blazer", required: true, price: 3500, gradient: "from-navy to-gold" },
  { id: "u6", name: "PE Kit", required: false, price: 2600, gradient: "from-teal to-primary" },
  { id: "u7", name: "Socks", required: true, price: 320, gradient: "from-info to-primary" },
  { id: "u8", name: "Tie", required: true, price: 320, gradient: "from-navy to-gold" },
  { id: "u9", name: "Belt", required: false, price: 480, gradient: "from-gold to-primary" },
  { id: "u10", name: "Shoes", required: true, price: 2100, gradient: "from-navy to-teal" },
];

const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Form 1", "Form 2", "Form 3", "Form 4"];
const uniformSuppliers = suppliers.filter((s) => s.category.includes("Uniform"));

function UniformsPage() {
  const [step, setStep] = useState(0);
  const [studentId, setStudentId] = useState(children[0].id);
  const [grade, setGrade] = useState("Grade 6");
  const [selected, setSelected] = useState<Record<string, { qty: number; size: string }>>({});
  const [supplierId, setSupplierId] = useState(uniformSuppliers[0].id);
  const { add } = useCart();

  const student = children.find((c) => c.id === studentId)!;
  const supplier = suppliers.find((s) => s.id === supplierId)!;
  const total = Object.entries(selected).reduce((s, [id, v]) => s + items.find((i) => i.id === id)!.price * v.qty, 0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggle = (id: string) => setSelected((m) => ({ ...m, [id]: m[id] ? undefined as any : { qty: 1, size: "M" } }));

  return (
    <PortalShell role="parent" title="School Uniform Ordering" subtitle="Order approved school uniforms based on your selected school and class.">
      <div className="rounded-3xl bg-card border border-border shadow-soft p-6 lg:p-8">
        <Stepper steps={steps} current={step} onStep={setStep} />
        <div className="mt-8">
          {step === 0 && (
            <Block title="Select Student">
              <div className="grid sm:grid-cols-2 gap-3">
                {children.map((c) => (
                  <button key={c.id} onClick={() => setStudentId(c.id)} className={`rounded-2xl border-2 p-4 text-left transition ${studentId === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${c.avatarTone} grid place-items-center text-white font-semibold`}>{c.initials}</div>
                      <div>
                        <p className="font-semibold text-navy">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.currentClass} · {c.currentSchool}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Block>
          )}
          {step === 1 && (
            <Block title="Select School">
              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-5">
                <p className="font-display font-semibold text-navy">{student.currentSchool}</p>
                <p className="text-xs text-muted-foreground">Current school for {student.name}</p>
              </div>
              <input placeholder="Or search for another school…" className="mt-3 w-full h-11 rounded-xl border border-border px-4 text-sm" />
            </Block>
          )}
          {step === 2 && (
            <Block title="Select Class / Grade">
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full max-w-sm h-11 rounded-xl border border-border px-4">
                {grades.map((g) => <option key={g}>{g}</option>)}
              </select>
            </Block>
          )}
          {step === 3 && (
            <Block title="Select Uniform Items">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((i) => {
                  const sel = selected[i.id];
                  return (
                    <div key={i.id} className={`rounded-2xl border-2 overflow-hidden transition ${sel ? "border-primary" : "border-border"}`}>
                      <div className={`aspect-[4/3] bg-gradient-to-br ${i.gradient} grid place-items-center text-white/40 font-display text-5xl`}>{i.name[0]}</div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-navy">{i.name}</p>
                          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${i.required ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{i.required ? "Required" : "Optional"}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">KES {i.price.toLocaleString()}</p>
                        {sel && (
                          <div className="mt-3 flex gap-2">
                            <select value={sel.size} onChange={(e) => setSelected((m) => ({ ...m, [i.id]: { ...sel, size: e.target.value } }))} className="flex-1 h-9 rounded-lg border border-border px-2 text-sm">
                              {["XS","S","M","L","XL","XXL"].map((s) => <option key={s}>{s}</option>)}
                            </select>
                            <input type="number" min={1} value={sel.qty} onChange={(e) => setSelected((m) => ({ ...m, [i.id]: { ...sel, qty: Number(e.target.value) } }))} className="w-16 h-9 rounded-lg border border-border px-2 text-sm" />
                          </div>
                        )}
                        <button onClick={() => toggle(i.id)} className={`mt-3 w-full rounded-lg text-xs font-semibold py-2 ${sel ? "bg-muted text-foreground" : "bg-gold text-gold-foreground"}`}>
                          {sel ? "Remove" : "Add to order"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Block>
          )}
          {step === 4 && (
            <Block title="Enter Measurements">
              <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
                {["Height (cm)", "Chest (cm)", "Waist (cm)", "Hip (cm)", "Shoe size", "General size"].map((l) => (
                  <label key={l} className="block">
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{l}</span>
                    <input className="mt-1.5 w-full h-11 rounded-xl border border-border px-4 text-sm" />
                  </label>
                ))}
              </div>
            </Block>
          )}
          {step === 5 && (
            <Block title="Choose Supplier">
              <div className="grid sm:grid-cols-2 gap-3">
                {uniformSuppliers.map((s) => (
                  <button key={s.id} onClick={() => setSupplierId(s.id)} className={`text-left rounded-2xl border-2 p-5 transition ${supplierId === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display font-semibold text-navy">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.location}</p>
                      </div>
                      {s.official && <span className="text-[10px] font-bold rounded-full bg-gold/20 text-gold-foreground px-2 py-0.5">OFFICIAL</span>}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span>★ {s.rating}</span>
                      <span>Delivery {s.delivery}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Block>
          )}
          {step === 6 && (
            <Block title="Review & Add to Cart">
              <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                <div className="space-y-3">
                  <Row k="Student" v={student.name} />
                  <Row k="School" v={student.currentSchool} />
                  <Row k="Grade" v={grade} />
                  <Row k="Supplier" v={supplier.name} />
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Items</p>
                    {Object.entries(selected).filter(([, v]) => v).map(([id, v]) => {
                      const i = items.find((x) => x.id === id)!;
                      return (
                        <div key={id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <span>{i.name} <span className="text-xs text-muted-foreground">· {v.size} × {v.qty}</span></span>
                          <span className="font-semibold">KES {(i.price * v.qty).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-2xl bg-navy text-white p-5 h-fit">
                  <p className="text-xs uppercase tracking-wider text-white/60">Total</p>
                  <p className="font-display text-3xl font-bold mt-1">KES {total.toLocaleString()}</p>
                  <button
                    onClick={() => {
                      Object.entries(selected).filter(([, v]) => v).forEach(([id, v]) => {
                        const i = items.find((x) => x.id === id)!;
                        add({ productId: i.id, name: i.name, supplier: supplier.name, price: i.price, quantity: v.qty, size: v.size, gradient: i.gradient });
                      });
                      setStep(0);
                    }}
                    className="mt-5 w-full rounded-xl bg-gold text-gold-foreground font-semibold py-3 inline-flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </button>
                  <Link to="/marketplace/checkout" className="mt-2 block text-center rounded-xl bg-white/10 text-white font-semibold py-3">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </Block>
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <button onClick={back} disabled={step === 0} className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold disabled:opacity-40">Back</button>
          {step < steps.length - 1 && (
            <button onClick={next} className="rounded-xl bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold">Continue</button>
          )}
        </div>
      </div>
    </PortalShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2"><Shirt className="h-5 w-5 text-primary" /> {title}</h2>
      {children}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3 text-sm">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{k}</span>
      <span className="font-semibold text-navy">{v}</span>
    </div>
  );
}