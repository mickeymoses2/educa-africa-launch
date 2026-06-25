import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Truck, CheckCircle2, DollarSign, MapPin, BarChart3, Store } from "lucide-react";
import { Logo } from "@/components/educa/Logo";

export const Route = createFileRoute("/logistics/register")({
  head: () => ({
    meta: [
      { title: "Become an EDUCA Logistics Partner" },
      { name: "description", content: "Join EDUCA Africa as a logistics partner and deliver school supplies, uniforms and books across the continent." },
    ],
  }),
  component: LogisticsRegister,
});

function LogisticsRegister() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-background">
      <aside className="relative hidden lg:flex flex-col justify-between bg-navy text-white p-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
        </div>
        <div className="relative"><Logo tone="light" /></div>
        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-gold" /> EDUCA Logistics
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight">Become an <span className="text-gold">EDUCA Logistics Partner</span></h2>
          <p className="mt-4 text-white/70 leading-relaxed">Help deliver school supplies, uniforms, books and learning materials to parents and schools across Africa.</p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              { icon: Truck, label: "Access a steady stream of school deliveries" },
              { icon: DollarSign, label: "Earn from every completed order" },
              { icon: Store, label: "Serve suppliers in your operating area" },
              { icon: BarChart3, label: "Track deliveries and earnings in one dashboard" },
              { icon: MapPin, label: "Grow with the EDUCA marketplace" },
            ].map((b) => (
              <li key={b.label} className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-white/10 grid place-items-center text-gold shrink-0"><b.icon className="h-4 w-4" /></div>
                <span className="text-white/85">{b.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex items-center gap-3 text-xs text-white/55"><ShieldCheck className="h-4 w-4 text-teal" /> Vetted partner program · End-to-end encrypted.</div>
      </aside>
      <main className="flex flex-col">
        <header className="lg:hidden bg-navy text-white p-5 flex items-center justify-between">
          <Logo tone="light" />
          <Link to="/get-started" className="text-xs text-white/70">← Change role</Link>
        </header>
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-xl">
            {done ? (
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-teal/15 grid place-items-center text-teal-foreground"><CheckCircle2 className="h-7 w-7" /></div>
                <h1 className="mt-5 font-display text-3xl font-bold text-navy">Application submitted</h1>
                <p className="mt-2 text-sm text-muted-foreground">We'll review your details and activate your logistics partner account within 24 hours.</p>
                <div className="mt-6 grid gap-3">
                  <button onClick={() => navigate({ to: "/logistics" })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold py-3 shadow-glow"><Truck className="h-4 w-4" /> Preview Logistics Dashboard</button>
                  <Link to="/" className="text-sm text-muted-foreground">← Back to homepage</Link>
                </div>
              </div>
            ) : (
              <>
                <Link to="/get-started" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-navy"><ArrowLeft className="h-3.5 w-3.5" /> Choose a different role</Link>
                <h1 className="mt-3 font-display text-3xl font-bold text-navy">Create logistics partner account</h1>
                <p className="mt-2 text-sm text-muted-foreground">Already a partner? <Link to="/login" className="font-semibold text-primary">Sign in</Link></p>
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-6 space-y-4">
                  <Field label="Business / Partner name" placeholder="SwiftEdu Deliveries" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Contact person" placeholder="Daniel Kamau" />
                    <Field label="Phone number" placeholder="+254 7…" type="tel" />
                  </div>
                  <Field label="Email" placeholder="ops@partner.co" type="email" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="County" placeholder="Nairobi" />
                    <Field label="Town / city" placeholder="Westlands" />
                  </div>
                  <Field label="Operating areas" placeholder="Nairobi, Kiambu, Thika" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <SelectField label="Vehicle type">
                      <option>Motorbike</option><option>Van</option><option>Van / Bike</option><option>Bicycle</option>
                    </SelectField>
                    <Field label="Number of riders / drivers" type="number" placeholder="12" />
                  </div>
                  <Field label="Delivery capacity" placeholder="Up to 15kg per trip" />
                  <Field label="Business registration number (optional)" placeholder="BRS/2024/000123" />
                  <div className="rounded-xl border-2 border-dashed border-border p-5 text-center text-xs text-muted-foreground">
                    Upload ID / business document (placeholder)
                  </div>
                  <Field label="Password" placeholder="At least 8 characters" type="password" />
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold py-3 shadow-glow">
                    Create Logistics Partner Account <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <input type={type} placeholder={placeholder} className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition" />
    </label>
  );
}
function SelectField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <select className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">{children}</select>
    </label>
  );
}