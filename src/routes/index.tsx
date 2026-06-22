import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  UserPlus,
  FileCheck,
  TrendingUp,
  Compass,
  ClipboardList,
  IdCard,
  Users,
  Building2,
  Sparkles,
  Eye,
  Inbox,
  Layers,
  CheckCircle2,
  Play,
} from "lucide-react";
import { Navbar } from "@/components/educa/Navbar";
import { Footer } from "@/components/educa/Footer";
import { SchoolCard } from "@/components/educa/SchoolCard";
import { featuredSchools } from "@/data/educa";
import heroImg from "@/assets/hero-students.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDUCA Africa — Africa's Educational Operating System" },
      {
        name: "description",
        content:
          "EDUCA Africa connects learners, parents, schools and institutions across the continent. Discover schools, apply online and manage admissions on one trusted platform.",
      },
      { property: "og:title", content: "EDUCA Africa — Africa's Educational Operating System" },
      {
        property: "og:description",
        content: "Everything Education. One Platform. Learn. Apply. Pay. Grow.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PlatformOverview />
      <HowItWorks />
      <WhyEduca />
      <FeaturedSchools />
      <CtaBanner />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Background flourishes */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3.5 py-1.5 text-xs font-medium text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            Now live across 12 African countries
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.05] tracking-tight">
            Africa's Educational <span className="text-gold">Operating System</span>
          </h1>
          <p className="mt-5 text-xl sm:text-2xl text-white/85 font-medium leading-snug max-w-2xl">
            One learner. One account. One educational journey.
          </p>
          <p className="mt-5 text-base text-white/65 leading-relaxed max-w-xl">
            EDUCA connects learners, parents, schools and institutions across the continent —
            powering discovery, admissions and lifelong learning records on a single trusted
            platform.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/schools"
              className="group inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
            >
              <Search className="h-4 w-4" /> Find a School
            </Link>
            <Link
              to="/school/onboarding"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-navy px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition"
            >
              <Building2 className="h-4 w-4" /> Join as a School
            </Link>
            <Link
              to="/get-started"
              className="group inline-flex items-center gap-2 rounded-full ring-1 ring-white/20 hover:bg-white/5 text-white px-5 py-3.5 text-sm font-medium transition"
            >
              <Play className="h-3.5 w-3.5" /> Get Started
            </Link>
          </div>

          {/* Stats */}
          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 max-w-2xl">
            {[
              ["10M+", "Learners"],
              ["500K+", "Educators"],
              ["50K+", "Institutions"],
              ["200+", "Partners"],
            ].map(([v, l]) => (
              <div key={l} className="border-l border-white/15 pl-4">
                <dt className="font-display text-2xl sm:text-3xl font-bold text-white">{v}</dt>
                <dd className="text-xs text-white/60 mt-1">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img src={heroImg} alt="African students learning" className="w-full h-[460px] lg:h-[560px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/60 via-navy/10 to-transparent" />
          </div>

          {/* Floating cards */}
          <div className="absolute -left-4 sm:-left-8 top-8 rounded-2xl bg-white text-navy p-3.5 pr-5 shadow-card flex items-center gap-3 max-w-[220px]">
            <div className="h-10 w-10 rounded-xl bg-teal/15 grid place-items-center text-teal-foreground">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Application</p>
              <p className="text-sm font-semibold">Accepted at Kilimani Academy</p>
            </div>
          </div>
          <div className="absolute -right-2 sm:-right-6 bottom-10 rounded-2xl bg-white text-navy p-4 shadow-card max-w-[240px]">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Live applications</p>
            <p className="font-display text-2xl font-bold mt-1">1,284</p>
            <div className="mt-2 flex -space-x-2">
              {["AO", "ZD", "BM", "+"].map((x, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-full grid place-items-center text-[11px] font-semibold ring-2 ring-white ${
                    i === 3 ? "bg-gold text-gold-foreground" : "bg-primary text-white"
                  }`}
                >
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformOverview() {
  const features = [
    { icon: Search, title: "School Discovery", desc: "Find vetted schools by curriculum, level, location and fees.", highlight: true },
    { icon: ClipboardList, title: "Admissions", desc: "Apply, track status and submit documents end-to-end online.", highlight: true },
    { icon: IdCard, title: "Student Profiles", desc: "One verified learner profile that grows with your child.", highlight: true },
    { icon: Users, title: "Parent Access", desc: "Monitor applications, fees and progress in real time.", highlight: true },
    { icon: Building2, title: "Institutions", desc: "Premium dashboards for schools and education networks.", highlight: true },
    { icon: Sparkles, title: "Future Expansion", desc: "Payments, scholarships, jobs, transport — coming soon.", highlight: false },
  ];

  return (
    <section className="relative -mt-12 lg:-mt-16 z-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="rounded-[2rem] bg-card shadow-card p-6 sm:p-10 lg:p-14 border border-border/60">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">The Platform</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-navy leading-tight">
              One Platform. Endless Possibilities.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We're launching with school discovery and admissions, then expanding into the full
              educational lifecycle — all on one identity.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group rounded-2xl p-6 border transition ${
                  f.highlight
                    ? "bg-white border-border hover:border-primary/40 hover:shadow-card"
                    : "bg-muted/50 border-dashed border-border"
                }`}
              >
                <div
                  className={`h-12 w-12 rounded-xl grid place-items-center mb-4 ${
                    f.highlight ? "bg-primary/10 text-primary" : "bg-white text-muted-foreground"
                  }`}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-navy">{f.title}</h3>
                  {!f.highlight && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full bg-gold/30 text-gold-foreground px-2 py-0.5">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Compass, title: "Search schools", desc: "Browse a vetted directory of schools across Africa." },
    { icon: UserPlus, title: "Create learner profile", desc: "Build one verified profile that travels with your child." },
    { icon: FileCheck, title: "Apply online", desc: "Submit applications and required documents in minutes." },
    { icon: TrendingUp, title: "Track admissions", desc: "Follow status updates and decisions in real time." },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">How it works</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-navy">
            From discovery to acceptance — in four steps.
          </h2>
        </div>
        <ol className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-gold/25 text-gold-foreground grid place-items-center font-display font-bold">
                  {i + 1}
                </span>
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-navy text-lg">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-border" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyEduca() {
  const benefits = [
    { icon: Eye, title: "Increase visibility", desc: "Get discovered by thousands of qualified parents searching daily." },
    { icon: Inbox, title: "Manage applications", desc: "All inquiries and documents centralised in one premium workspace." },
    { icon: Layers, title: "Digitize admissions", desc: "Replace paper forms with smart, multi-step digital flows." },
    { icon: Sparkles, title: "Elevate your brand", desc: "A polished public profile that reflects your institution's standard." },
  ];
  return (
    <section className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">For schools</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-navy leading-tight">
            Run a modern admissions office — without the overhead.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            EDUCA gives your school a beautiful public profile and a powerful private workspace to
            manage every applicant from inquiry to enrolment.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
                <div className="h-10 w-10 rounded-xl bg-teal/15 grid place-items-center text-teal-foreground">
                  <b.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-3 font-semibold text-navy">{b.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/school"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
            >
              Open the School Workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Mock dashboard card preview */}
        <div className="relative">
          <div className="rounded-3xl bg-navy p-3 shadow-2xl rotate-[0.6deg]">
            <div className="rounded-2xl bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Admissions overview</p>
                  <p className="font-display font-semibold text-navy">Kilimani Academy</p>
                </div>
                <span className="text-xs rounded-full bg-success/15 text-success-foreground px-2.5 py-1 font-medium">Live</span>
              </div>
              <div className="grid grid-cols-3 divide-x divide-border">
                {[
                  ["128", "Submitted"],
                  ["46", "Under review"],
                  ["34", "Accepted"],
                ].map(([v, l]) => (
                  <div key={l} className="p-4">
                    <p className="font-display text-2xl font-bold text-navy">{v}</p>
                    <p className="text-xs text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 space-y-3 bg-muted/30">
                {[
                  { n: "Amara Okonkwo", c: "Grade 6", s: "Under Review", tone: "bg-primary/10 text-primary" },
                  { n: "Zola Dlamini", c: "Grade 4", s: "Accepted", tone: "bg-success/15 text-success-foreground" },
                  { n: "Brian Mwangi", c: "Form 1", s: "Submitted", tone: "bg-info/10 text-info" },
                ].map((r) => (
                  <div key={r.n} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-border">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-xs font-semibold">
                      {r.n.split(" ").map((p) => p[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy truncate">{r.n}</p>
                      <p className="text-xs text-muted-foreground">{r.c}</p>
                    </div>
                    <span className={`text-[11px] rounded-full px-2 py-0.5 font-medium ${r.tone}`}>{r.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-gold text-gold-foreground p-4 shadow-card max-w-[200px] -rotate-2">
            <p className="text-xs font-semibold uppercase tracking-wide">Profile views</p>
            <p className="font-display text-2xl font-bold mt-1">+38%</p>
            <p className="text-xs">vs last term</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedSchools() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Discover</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-navy">
              Featured schools on EDUCA
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              A growing directory of vetted institutions — explore profiles, requirements and apply
              online.
            </p>
          </div>
          <button className="self-start inline-flex items-center gap-2 rounded-full ring-1 ring-border hover:bg-muted text-navy px-5 py-2.5 text-sm font-semibold transition">
            Browse all schools <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSchools.map((s) => (
            <SchoolCard key={s.name} school={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="px-5 lg:px-8 pb-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy text-white p-10 lg:p-16">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-24 -right-12 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 h-80 w-80 rounded-full bg-teal/25 blur-3xl" />
        </div>
        <div className="relative grid lg:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl">
              Ready to <span className="text-gold">Transform Education</span>?
            </h2>
            <p className="mt-3 text-white/75 max-w-xl">
              Whether you run a school or you're searching for the right one, EDUCA is the platform
              powering Africa's next generation of learners.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/school" className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3.5 text-sm font-semibold shadow-glow hover:brightness-105 transition">
              Register as a School
            </Link>
            <button className="inline-flex items-center gap-2 rounded-full bg-white text-navy px-6 py-3.5 text-sm font-semibold hover:bg-white/90 transition">
              Find a School
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
