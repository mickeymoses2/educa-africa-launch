import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  ShieldCheck,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  BookOpen,
  Trophy,
  Bus,
  Beaker,
  Computer,
  Heart,
  Building,
  Calendar,
  Check,
  ArrowRight,
  Users,
  X,
} from "lucide-react";
import { Navbar } from "@/components/educa/Navbar";
import { Footer } from "@/components/educa/Footer";
import { featuredSchools } from "@/data/educa";

export const Route = createFileRoute("/schools/$id")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.school.name ?? "School"} · EDUCA Africa` },
      {
        name: "description",
        content: loaderData?.school.description ?? "Explore school profile on EDUCA Africa.",
      },
      { property: "og:title", content: `${loaderData?.school.name ?? "School"} · EDUCA Africa` },
      { property: "og:description", content: loaderData?.school.description ?? "" },
      { property: "og:image", content: loaderData?.school.image ?? "" },
    ],
  }),
  loader: ({ params }) => {
    const school =
      featuredSchools.find(
        (s) => s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === params.id,
      ) ?? featuredSchools[0];
    return { school };
  },
  component: PublicSchoolProfile,
});

const facilities = [
  { Icon: BookOpen, label: "Library" },
  { Icon: Computer, label: "Computer Lab" },
  { Icon: Trophy, label: "Sports Field" },
  { Icon: Bus, label: "Transport" },
  { Icon: Building, label: "Boarding" },
  { Icon: Beaker, label: "Science Lab" },
  { Icon: Heart, label: "Special Needs Support" },
];

function PublicSchoolProfile() {
  const { school } = Route.useLoaderData();
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24">
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img src={school.image} alt={school.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
        </div>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 -mt-24 relative">
          <div className="rounded-3xl bg-card shadow-card border border-border p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="flex items-center gap-5 min-w-0">
                <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-3xl bg-navy text-white grid place-items-center font-display font-bold text-3xl shadow-card">
                  {school.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <Tag>{school.level}</Tag>
                    <Tag>{school.curriculum}</Tag>
                    <Tag>{school.boarding}</Tag>
                    <Tag className="bg-teal/15 text-teal-foreground">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </Tag>
                  </div>
                  <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy truncate">
                    {school.name}
                  </h1>
                  <p className="text-sm text-muted-foreground inline-flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {school.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setApplyOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
                >
                  <GraduationCap className="h-4 w-4" /> Apply Now
                </button>
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-border text-navy px-5 py-3 text-sm font-semibold hover:bg-muted transition"
                >
                  Save School
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="space-y-6">
          <Card title="About the school">
            <p className="text-sm text-foreground/80 leading-relaxed">{school.description}</p>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
              Our mission is to nurture confident, curious learners ready to lead and serve in a
              global Africa. We balance academic excellence with character, sport and the arts.
            </p>
          </Card>

          <Card title="Facilities">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {facilities.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 rounded-xl bg-muted/60 px-3 py-2.5 text-sm">
                  <div className="h-8 w-8 rounded-lg bg-white border border-border grid place-items-center text-primary">
                    <f.Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-navy">{f.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Admissions">
            <div className="grid sm:grid-cols-2 gap-3">
              <InfoRow label="Available classes" value="Grade 1 – Form 4" />
              <InfoRow label="Admission status" value="Open" tone="success" />
              <InfoRow label="Application deadline" value="30 Aug 2026" icon={Calendar} />
              <InfoRow label="Fees from" value="KES 85,000 / term" />
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-navy">Required documents</h4>
              <ul className="mt-2 grid sm:grid-cols-2 gap-1.5 text-sm">
                {["Birth certificate", "Previous report card", "Passport photo", "Parent/guardian ID", "Transfer letter"].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-foreground/80">
                    <Check className="h-4 w-4 text-teal" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card title="Gallery">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[school.image, ...featuredSchools.map((s) => s.image)].slice(0, 6).map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img src={img} alt="" className="h-full w-full object-cover hover:scale-105 transition" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
            <h4 className="font-display font-semibold text-navy">Contact School</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" /> admissions@{school.name.toLowerCase().split(" ")[0]}.edu</li>
              <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" /> +254 700 123 456</li>
              <li className="flex items-start gap-2.5"><Globe className="h-4 w-4 mt-0.5 text-primary shrink-0" /> www.{school.name.toLowerCase().split(" ")[0]}.edu</li>
              <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {school.location}</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
            <h4 className="font-display font-semibold text-navy">Quick facts</h4>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {[["1,250", "Learners"], ["1:18", "Teacher ratio"], ["2003", "Founded"], ["96%", "Pass rate"]].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-muted/60 p-3">
                  <dt className="text-muted-foreground">{l}</dt>
                  <dd className="font-display text-lg font-bold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl bg-navy text-white p-5 text-sm">
            <p className="font-semibold text-gold">Ready to apply?</p>
            <p className="mt-1 text-white/75 text-xs">Sign in or create an EDUCA account to submit an application.</p>
            <button
              onClick={() => setApplyOpen(true)}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground py-2.5 font-semibold text-xs"
            >
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>
      </section>

      <Footer />

      {applyOpen && <ApplyGate onClose={() => setApplyOpen(false)} schoolName={school.name} />}
    </div>
  );
}

function ApplyGate({ onClose, schoolName }: { onClose: () => void; schoolName: string }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center px-4">
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border shadow-card p-7">
        <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-lg hover:bg-muted">
          <X className="h-4 w-4" />
        </button>
        <div className="h-12 w-12 rounded-2xl bg-gold text-gold-foreground grid place-items-center">
          <GraduationCap className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-navy">
          Apply to {schoolName}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          To submit an application, please create an EDUCA Africa account or sign in.
        </p>
        <div className="mt-6 grid gap-2.5">
          <Link
            to="/register"
            search={{ role: "parent" }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-soft transition"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><Users className="h-4 w-4" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy text-sm">Continue as Parent</p>
              <p className="text-xs text-muted-foreground">Apply on behalf of your child.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
          <Link
            to="/register"
            search={{ role: "student" }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-soft transition"
          >
            <div className="h-10 w-10 rounded-lg bg-teal/15 text-teal-foreground grid place-items-center"><GraduationCap className="h-4 w-4" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy text-sm">Continue as Student</p>
              <p className="text-xs text-muted-foreground">Create your EDUCA ID and apply.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded-xl bg-navy text-white text-sm font-semibold py-3 hover:brightness-110 transition"
          >
            I already have an account — Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
      <h3 className="font-display font-semibold text-navy text-lg">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-muted text-navy px-2.5 py-0.5 text-[11px] font-medium ${className}`}>
      {children}
    </span>
  );
}

function InfoRow({ label, value, tone, icon: Icon }: { label: string; value: string; tone?: "success"; icon?: typeof Calendar }) {
  return (
    <div className="rounded-xl bg-muted/60 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <p className={`mt-1 text-sm font-semibold inline-flex items-center gap-1.5 ${tone === "success" ? "text-success-foreground" : "text-navy"}`}>
        {Icon && <Icon className="h-3.5 w-3.5" />} {value}
      </p>
    </div>
  );
}