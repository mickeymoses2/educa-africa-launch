import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, GraduationCap, Building2, CheckCircle2, ShieldCheck, Sparkles, Store, Truck } from "lucide-react";
import { Logo } from "@/components/educa/Logo";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Join EDUCA Africa · Choose how you'll get started" },
      { name: "description", content: "Join EDUCA Africa as a parent, student or school. One account. One platform. Everything Education." },
    ],
  }),
  component: GetStartedPage,
});

const roles = [
  {
    id: "parent",
    icon: Users,
    title: "Join as a Parent / Guardian",
    description: "Manage your children's profiles, search schools, track applications, documents, fees and academic information.",
    cta: "Continue as Parent",
    to: "/register?role=parent" as const,
    tone: "from-primary/15 to-primary/0",
    iconBg: "bg-primary text-primary-foreground",
    perks: ["Link or create student profiles", "Apply to multiple schools", "Track fees & documents"],
  },
  {
    id: "student",
    icon: GraduationCap,
    title: "Join as a Student",
    description: "Create your EDUCA ID, manage your profile, explore schools and track your applications.",
    cta: "Continue as Student",
    to: "/register?role=student" as const,
    tone: "from-teal/20 to-teal/0",
    iconBg: "bg-teal text-teal-foreground",
    perks: ["Your verified EDUCA ID", "One profile, many schools", "Lifetime academic record"],
  },
  {
    id: "school",
    icon: Building2,
    title: "Join as a School",
    description: "Create your school profile, receive applications and manage admissions from one premium workspace.",
    cta: "Continue as School",
    to: "/register?role=school" as const,
    tone: "from-gold/25 to-gold/0",
    iconBg: "bg-gold text-gold-foreground",
    perks: ["A polished public profile", "Online admissions workspace", "Verified school badge"],
  },
];

const partnerRoles = [
  {
    id: "supplier",
    icon: Store,
    title: "Join as a Supplier",
    description: "Sell school uniforms, books, stationery and learning materials to schools and families.",
    cta: "Continue as Supplier",
    to: "/supplier" as const,
    tone: "from-info/15 to-info/0",
    iconBg: "bg-info text-info-foreground",
    perks: ["Get listed in school marketplaces", "Manage products and orders", "Connect with logistics partners"],
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Become a Logistics Partner",
    description: "Deliver school supplies, uniforms, books and learning materials to parents and schools.",
    cta: "Continue as Logistics Partner",
    to: "/logistics/register" as const,
    tone: "from-teal/15 to-teal/0",
    iconBg: "bg-navy text-white",
    perks: ["Earn from every completed delivery", "Manage jobs in one dashboard", "Grow with the marketplace"],
  },
];

function GetStartedPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
          <Logo tone="light" />
          <Link to="/login" className="text-sm font-medium text-white/85 hover:text-white">
            Already have an account? <span className="text-gold font-semibold">Sign in</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white pb-32">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8 pt-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3.5 py-1.5 text-xs font-medium text-white/90">
            <Sparkles className="h-3 w-3 text-gold" /> Welcome to EDUCA Africa
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            How would you like to <span className="text-gold">get started?</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Choose the experience that fits you best. You'll always have access to all your information from one EDUCA account.
          </p>
        </div>
      </section>

      {/* Role cards */}
      <section className="relative -mt-24 pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <article
              key={r.id}
              className={`group relative overflow-hidden rounded-3xl bg-card border border-border shadow-card p-7 hover:-translate-y-1.5 hover:shadow-glow transition-all`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${r.tone} opacity-60 pointer-events-none`} />
              <div className="relative">
                <div className={`h-14 w-14 rounded-2xl grid place-items-center ${r.iconBg} shadow-soft`}>
                  <r.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-xl font-bold text-navy">{r.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.description}</p>

                <ul className="mt-5 space-y-2">
                  {r.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  search={{ role: r.id }}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3 text-sm group-hover:bg-gold group-hover:text-gold-foreground transition"
                >
                  {r.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-3xl px-5 mt-14 text-center">
          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-teal" />
            Your account is protected with enterprise-grade encryption.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Just want to look around first?{" "}
            <Link to="/schools" className="font-semibold text-primary hover:underline">
              Browse schools without an account →
            </Link>
          </p>
        </div>

        {/* Partner roles */}
        <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-20">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Partner with EDUCA</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">Power the EDUCA Marketplace</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">Join as a supplier or logistics partner and grow your business with thousands of schools and families.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {partnerRoles.map((r) => (
              <article key={r.id} className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-card p-7 hover:-translate-y-1.5 hover:shadow-glow transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${r.tone} opacity-60 pointer-events-none`} />
                <div className="relative">
                  <div className={`h-14 w-14 rounded-2xl grid place-items-center ${r.iconBg} shadow-soft`}><r.icon className="h-6 w-6" /></div>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                  <ul className="mt-5 space-y-2">
                    {r.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-foreground/80"><CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" /> {p}</li>
                    ))}
                  </ul>
                  <Link to={r.to} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3 text-sm group-hover:bg-gold group-hover:text-gold-foreground transition">
                    {r.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}