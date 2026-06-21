import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  MapPin,
  Calendar,
  FileText,
  CheckCircle2,
  UploadCloud,
  MessageSquare,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { StatusBadge } from "@/components/educa/StatusBadge";
import { ApplicationTimeline } from "@/components/educa/ApplicationTimeline";
import { FileUploadCard } from "@/components/educa/FileUploadCard";
import { documents, myApplications } from "@/data/educa";

export const Route = createFileRoute("/parent/applications/$id")({
  head: () => ({ meta: [{ title: "Application Details · EDUCA" }] }),
  loader: ({ params }) => {
    const app = myApplications.find((a) => a.id === params.id);
    if (!app) throw notFound();
    return { app };
  },
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Application not found.</div>
  ),
  component: AppDetailsPage,
});

function AppDetailsPage() {
  const { app } = Route.useLoaderData();
  const isAccepted = app.status === "Accepted";
  const needsDocs = app.status === "Pending Documents";

  return (
    <PortalShell role="parent" title={`Application ${app.id}`} subtitle={`${app.school} · ${app.classApplied}`}>
      <Link
        to="/parent/applications"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy mb-5"
      >
        <ArrowLeft className="h-4 w-4" /> Back to applications
      </Link>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="space-y-6">
          {/* Acceptance / docs banner */}
          {isAccepted && (
            <div className="rounded-3xl bg-gradient-to-br from-success/15 to-teal/15 border border-success/30 p-6 flex flex-wrap items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white grid place-items-center text-success-foreground">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-bold text-navy">Congratulations!</h3>
                <p className="text-sm text-muted-foreground">
                  Your application has been accepted by {app.school}.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition">
                <GraduationCap className="h-4 w-4" /> View Admission Instructions
              </button>
            </div>
          )}
          {needsDocs && (
            <div className="rounded-3xl bg-warning/15 border border-warning/30 p-6 flex flex-wrap items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white grid place-items-center text-warning-foreground">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-bold text-navy">Action Needed</h3>
                <p className="text-sm text-muted-foreground">
                  {app.school} has requested additional documents.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-navy/90 transition">
                <UploadCloud className="h-4 w-4" /> Upload Documents
              </button>
            </div>
          )}

          {/* Overview */}
          <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy text-lg">Application Overview</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <Info label="Student" value={app.student} />
              <Info label="School" value={app.school} icon={MapPin} sub={app.location} />
              <Info label="Class applied for" value={app.classApplied} />
              <Info label="Date submitted" value={app.submitted} icon={Calendar} />
              <Info label="Parent" value="Grace Mwangi" sub="grace.m@email.com" />
              <Info label="Application ID" value={app.id} />
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy text-lg">Status Timeline</h3>
            <div className="mt-5">
              <ApplicationTimeline />
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy text-lg">Uploaded Documents</h3>
            <div className="mt-4 grid md:grid-cols-2 gap-3">
              {documents.slice(0, 4).map((d) => (
                <FileUploadCard key={d.id} doc={d} />
              ))}
            </div>
          </div>

          {/* Notes from school */}
          <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy text-lg inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" /> Notes from school
            </h3>
            <div className="mt-4 rounded-2xl bg-muted/60 p-4 text-sm text-foreground/80">
              "Thank you for applying. Our admissions team will be in touch within 5 working days
              after document verification."
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Current status
            </p>
            <div className="mt-3"><StatusBadge status={app.status} /></div>
            <p className="mt-4 text-sm">
              <span className="font-semibold text-navy">Next step:</span>{" "}
              <span className="text-muted-foreground">{app.nextAction}</span>
            </p>
          </div>

          <div className="rounded-3xl bg-card border border-border shadow-soft p-5 space-y-2">
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white px-4 py-3 text-sm font-semibold hover:bg-navy/90 transition">
              <MessageSquare className="h-4 w-4" /> Contact School
            </button>
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-muted text-navy px-4 py-3 text-sm font-semibold hover:bg-muted/70 transition">
              <FileText className="h-4 w-4" /> Download Summary
            </button>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}

function Info({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: typeof MapPin;
}) {
  return (
    <div className="rounded-xl bg-muted/60 p-3.5">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </p>
      <p className="mt-1 font-semibold text-navy inline-flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5" />} {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}