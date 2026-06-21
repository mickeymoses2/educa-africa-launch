import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GraduationCap, IdCard, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { ApplicationCard } from "@/components/educa/ApplicationCard";
import { FileUploadCard } from "@/components/educa/FileUploadCard";
import { children, myApplications, documents } from "@/data/educa";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/children/$id")({
  head: () => ({ meta: [{ title: "Student Profile · EDUCA" }] }),
  loader: ({ params }) => {
    const child = children.find((c) => c.id === params.id);
    if (!child) throw notFound();
    return { child };
  },
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Student profile not found.</div>
  ),
  component: StudentProfilePage,
});

const tabs = ["Overview", "Applications", "Documents", "Education History"] as const;
type Tab = (typeof tabs)[number];

function StudentProfilePage() {
  const { child } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("Overview");
  const apps = myApplications.filter((a) => a.studentId === child.id);

  return (
    <PortalShell
      role="parent"
      title={child.name}
      subtitle={`${child.educaId} · ${child.currentClass} · ${child.curriculum}`}
      actions={
        <Link
          to="/parent/apply"
          className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
        >
          <GraduationCap className="h-4 w-4" /> Start Application
        </Link>
      }
    >
      {/* Header card */}
      <div className="rounded-3xl bg-navy text-white p-6 sm:p-8 relative overflow-hidden mb-6">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
        </div>
        <div className="relative grid grid-cols-[auto_minmax(0,1fr)] sm:flex sm:items-center gap-5">
          <div
            className={`h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-br ${child.avatarTone} grid place-items-center text-white font-display font-bold text-3xl shrink-0 ring-2 ring-white/20`}
          >
            {child.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wider text-white/60 font-semibold flex items-center gap-1.5">
              <IdCard className="h-3.5 w-3.5" /> {child.educaId}
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold truncate">{child.name}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <Tag>{child.currentClass}</Tag>
              <Tag>{child.curriculum}</Tag>
              <Tag>{child.gender}</Tag>
            </div>
          </div>
          <div className="hidden sm:block min-w-[180px]">
            <p className="text-xs uppercase tracking-wider text-white/60 font-semibold">
              Profile completion
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-3xl font-bold text-gold">{child.completion}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-gold"
                style={{ width: `${child.completion}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className="flex gap-1 overflow-x-auto -mb-px">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition",
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-navy",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "Overview" && (
        <div className="grid lg:grid-cols-3 gap-5">
          <InfoCard title="Personal Details">
            <Row icon={Calendar} label="Date of birth" value={child.dob} />
            <Row icon={IdCard} label="Gender" value={child.gender} />
            <Row icon={MapPin} label="Nationality" value="Kenyan" />
          </InfoCard>
          <InfoCard title="Education Details">
            <Row label="Current school" value={child.currentSchool} />
            <Row label="Current class" value={child.currentClass} />
            <Row label="Desired class" value={child.desiredClass} />
            <Row label="Curriculum" value={child.curriculum} />
          </InfoCard>
          <InfoCard title="Guardian Details">
            <Row label="Name" value={child.guardian} />
            <Row icon={Mail} label="Email" value="grace.m@email.com" />
            <Row icon={Phone} label="Phone" value="+254 722 110 220" />
          </InfoCard>

          <div className="lg:col-span-3 rounded-3xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Recent Activity</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3"><span className="h-2 w-2 rounded-full bg-teal mt-2 shrink-0" /> Application to Kilimani Academy moved to <strong className="text-navy">Under Review</strong>.</li>
              <li className="flex gap-3"><span className="h-2 w-2 rounded-full bg-gold mt-2 shrink-0" /> Mwangaza Boarding requested an updated report card.</li>
              <li className="flex gap-3"><span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" /> Profile completion increased to {child.completion}%.</li>
            </ul>
          </div>
        </div>
      )}

      {tab === "Applications" && (
        <div className="grid lg:grid-cols-2 gap-4">
          {apps.length > 0 ? (
            apps.map((a) => <ApplicationCard key={a.id} app={a} />)
          ) : (
            <p className="text-sm text-muted-foreground">No applications yet for this child.</p>
          )}
        </div>
      )}

      {tab === "Documents" && (
        <div className="grid md:grid-cols-2 gap-4">
          {documents.map((d) => (
            <FileUploadCard key={d.id} doc={d} />
          ))}
        </div>
      )}

      {tab === "Education History" && (
        <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
          <p className="font-display text-base font-semibold text-navy">Education timeline coming soon.</p>
          <p className="mt-1.5">You'll be able to track every school and milestone here.</p>
        </div>
      )}
    </PortalShell>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-0.5 text-[11px] font-medium">
      {children}
    </span>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
      <h3 className="font-display font-semibold text-navy">{title}</h3>
      <div className="mt-4 space-y-3 text-sm">{children}</div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon?: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground inline-flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5" />} {label}
      </span>
      <span className="font-semibold text-navy text-right">{value}</span>
    </div>
  );
}