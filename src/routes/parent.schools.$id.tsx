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
} from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { featuredSchools } from "@/data/educa";

export const Route = createFileRoute("/parent/schools/$id")({
  head: () => ({ meta: [{ title: "School Profile · EDUCA" }] }),
  loader: ({ params }) => {
    const school =
      featuredSchools.find(
        (s) => s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === params.id,
      ) ?? featuredSchools[0];
    return { school };
  },
  component: SchoolProfilePage,
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

function SchoolProfilePage() {
  const { school } = Route.useLoaderData();
  return (
    <PortalShell role="parent" title={school.name} subtitle={school.location}>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl shadow-card mb-6">
        <div className="h-56 sm:h-72 relative">
          <img src={school.image} alt={school.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 text-white">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-white text-navy grid place-items-center font-display font-bold text-2xl shadow-card">
                {school.initials}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Tag>{school.level}</Tag>
                  <Tag>{school.curriculum}</Tag>
                  <Tag>{school.boarding}</Tag>
                  <Tag className="bg-teal text-teal-foreground ring-0">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </Tag>
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold truncate">{school.name}</h2>
                <p className="text-sm text-white/80 inline-flex items-center gap-1 mt-1">
                  <MapPin className="h-3.5 w-3.5" /> {school.location}
                </p>
              </div>
            </div>
            <Link
              to="/parent/apply"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
            >
              <GraduationCap className="h-4 w-4" /> Apply Now
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-6">
          {/* About */}
          <Section title="About the school">
            <p className="text-sm text-foreground/80 leading-relaxed">{school.description}</p>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
              Our mission is to nurture confident, curious learners who are ready to lead and serve
              in a global Africa. We balance academic excellence with character, sport and the arts.
            </p>
          </Section>

          {/* Facilities */}
          <Section title="Facilities">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {facilities.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 rounded-xl bg-muted/60 px-3 py-2.5 text-sm"
                >
                  <div className="h-8 w-8 rounded-lg bg-white border border-border grid place-items-center text-primary">
                    <f.Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-navy">{f.label}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Admissions */}
          <Section title="Admissions">
            <div className="grid sm:grid-cols-2 gap-3">
              <InfoRow label="Available classes" value="Grade 1 – Form 4" />
              <InfoRow label="Admission status" value="Open" tone="success" />
              <InfoRow label="Application deadline" value="30 Aug 2026" icon={Calendar} />
              <InfoRow label="Fees from" value="KES 85,000 / term" />
            </div>
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-navy">Required documents</h4>
              <ul className="mt-2 grid sm:grid-cols-2 gap-1.5 text-sm">
                {[
                  "Birth certificate",
                  "Previous report card",
                  "Passport photo",
                  "Parent/guardian ID",
                  "Transfer letter",
                ].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-foreground/80">
                    <Check className="h-4 w-4 text-teal" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* Gallery */}
          <Section title="Gallery">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[school.image, ...featuredSchools.map((s) => s.image)].slice(0, 6).map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img src={img} alt="" className="h-full w-full object-cover hover:scale-105 transition" />
                </div>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <div className="rounded-3xl bg-navy text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal/25 blur-3xl" />
            </div>
            <div className="relative">
              <h3 className="font-display text-2xl font-bold">Ready to apply to {school.name}?</h3>
              <p className="text-white/70 mt-2 text-sm max-w-md mx-auto">
                Start a new application in minutes. You can save progress and resume any time.
              </p>
              <Link
                to="/parent/apply"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
              >
                Start Application <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
            <h4 className="font-display font-semibold text-navy">Contact School</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                admissions@{school.name.toLowerCase().split(" ")[0]}.edu
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" /> +254 700 123 456
              </li>
              <li className="flex items-start gap-2.5">
                <Globe className="h-4 w-4 mt-0.5 text-primary shrink-0" /> www.{school.name.toLowerCase().split(" ")[0]}.edu
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {school.location}
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
            <h4 className="font-display font-semibold text-navy">Quick facts</h4>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {[
                ["1,250", "Learners"],
                ["1:18", "Teacher ratio"],
                ["2003", "Founded"],
                ["96%", "Pass rate"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-muted/60 p-3">
                  <dt className="text-muted-foreground">{l}</dt>
                  <dd className="font-display text-lg font-bold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
      <h3 className="font-display font-semibold text-navy text-lg">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-white/15 ring-1 ring-white/20 px-2.5 py-0.5 text-[11px] font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function InfoRow({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone?: "success";
  icon?: typeof Calendar;
}) {
  return (
    <div className="rounded-xl bg-muted/60 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <p
        className={`mt-1 text-sm font-semibold inline-flex items-center gap-1.5 ${
          tone === "success" ? "text-success-foreground" : "text-navy"
        }`}
      >
        {Icon && <Icon className="h-3.5 w-3.5" />} {value}
      </p>
    </div>
  );
}