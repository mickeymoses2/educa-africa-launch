import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Building2, GraduationCap, Users, ShieldCheck, Sparkles, Store, Truck } from "lucide-react";
import { Logo } from "@/components/educa/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in to EDUCA Africa" },
      { name: "description", content: "Sign in to your EDUCA account as a parent, student or school." },
    ],
  }),
  component: LoginPage,
});

type Role = "parent" | "student" | "school" | "supplier" | "logistics";

const roleCards: { id: Role; icon: typeof Users; title: string; desc: string; redirect: string }[] = [
  { id: "parent", icon: Users, title: "Parent / Guardian", desc: "Manage children, applications and fees.", redirect: "/parent" },
  { id: "student", icon: GraduationCap, title: "Student", desc: "Your EDUCA ID, profile and applications.", redirect: "/student" },
  { id: "school", icon: Building2, title: "School", desc: "Admissions workspace and school profile.", redirect: "/school" },
  { id: "supplier", icon: Store, title: "Supplier", desc: "Manage products, orders and marketplace sales.", redirect: "/supplier" },
  { id: "logistics", icon: Truck, title: "Logistics Partner", desc: "Accept and track school deliveries.", redirect: "/logistics" },
];

function LoginPage() {
  const [role, setRole] = useState<Role | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr] bg-background">
      {/* Brand side */}
      <aside className="relative hidden lg:flex flex-col justify-between bg-navy text-white p-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        </div>
        <div className="relative">
          <Logo tone="light" />
        </div>
        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-gold" /> Welcome back
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight">
            Your <span className="text-gold">education workspace</span> awaits.
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            One account. One platform. Everything education — applications, documents, fees and updates from your schools.
          </p>
        </div>
        <div className="relative flex items-center gap-3 text-xs text-white/55">
          <ShieldCheck className="h-4 w-4 text-teal" />
          Secured by EDUCA · Encrypted end-to-end.
        </div>
      </aside>

      {/* Form / role panel */}
      <main className="flex flex-col">
        <header className="lg:hidden bg-navy text-white p-5 flex items-center justify-between">
          <Logo tone="light" />
          <Link to="/" className="text-xs text-white/70 hover:text-white">← Home</Link>
        </header>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            {!role ? (
              <>
                <h1 className="font-display text-3xl font-bold text-navy">Login as</h1>
                <p className="mt-2 text-sm text-muted-foreground">Select your account type to continue.</p>

                <div className="mt-7 space-y-3">
                  {roleCards.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className="group w-full text-left flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-card transition"
                    >
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition">
                        <r.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-semibold text-navy">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </button>
                  ))}
                </div>

                <p className="mt-7 text-sm text-muted-foreground text-center">
                  Don't have an account?{" "}
                  <Link to="/get-started" className="font-semibold text-primary hover:underline">
                    Create one
                  </Link>
                </p>
                <p className="mt-3 text-xs text-center">
                  <Link to="/" className="text-muted-foreground hover:text-navy">← Back to homepage</Link>
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={() => setRole(null)}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy"
                >
                  <ArrowLeft className="h-4 w-4" /> Change account type
                </button>
                <h1 className="mt-4 font-display text-3xl font-bold text-navy">
                  Sign in as {roleCards.find((r) => r.id === role)!.title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your credentials to access your workspace.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate({ to: roleCards.find((r) => r.id === role)!.redirect });
                  }}
                  className="mt-6 space-y-4"
                >
                  <Field label="Email or phone number" placeholder="you@email.com" />
                  <Field label="Password" type="password" placeholder="Your password" />

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-muted-foreground">
                      <input type="checkbox" defaultChecked className="rounded border-border" /> Remember me
                    </label>
                    <a className="font-semibold text-primary hover:underline cursor-pointer">Forgot password?</a>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold py-3 shadow-glow hover:brightness-105 transition"
                  >
                    Login <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground text-center">
                  New to EDUCA?{" "}
                  <Link to="/get-started" className="font-semibold text-primary hover:underline">
                    Create an account
                  </Link>
                </p>
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
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </label>
  );
}