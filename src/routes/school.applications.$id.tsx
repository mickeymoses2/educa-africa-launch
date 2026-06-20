import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, FileText, Download, Eye, Mail, Phone, Check, X, Clock, FileQuestion, UserMinus } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { StatusBadge } from "@/components/educa/StatusBadge";
import { applications } from "@/data/educa";

export const Route = createFileRoute("/school/applications/$id")({
  head: () => ({ meta: [{ title: "Application Details · EDUCA" }] }),
  component: ApplicationDetail,
});

function ApplicationDetail() {
  const { id } = useParams({ from: "/school/applications/$id" });
  const app = applications.find((a) => a.id === id) ?? applications[0];

  const timeline = [
    { label: "Application submitted", at: app.submitted, done: true },
    { label: "Documents received", at: "20 Jun 2026", done: true },
    { label: "Under review", at: "21 Jun 2026", done: app.status !== "Submitted" },
    { label: "Decision", at: "Pending", done: ["Accepted", "Rejected", "Waitlisted"].includes(app.status) },
  ];

  return (
    <DashboardShell
      title={app.student}
      subtitle={`Application ${app.id} · ${app.classApplied}`}
      actions={
        <Link
          to="/school/applications"
          className="inline-flex items-center gap-2 rounded-xl ring-1 ring-border text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted transition"
        >
          <ArrowLeft className="h-4 w-4" /> All applications
        </Link>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Student summary */}
          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-xl font-bold shrink-0">
                {app.initials}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold text-navy">{app.student}</h3>
                <p className="text-sm text-muted-foreground">Applying for <span className="font-semibold text-navy">{app.classApplied}</span></p>
                <p className="text-sm text-muted-foreground">Previous school: {app.previousSchool}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
          </section>

          {/* Parent details */}
          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Parent / Guardian</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <Info label="Full name" value={app.parent} />
              <Info label="Relationship" value="Parent" />
              <Info label="Email" value={app.email} icon={<Mail className="h-4 w-4 text-primary" />} />
              <Info label="Phone" value={app.phone} icon={<Phone className="h-4 w-4 text-primary" />} />
            </div>
          </section>

          {/* Documents */}
          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-navy">Uploaded documents</h3>
              <span className="text-xs font-semibold text-muted-foreground">{app.documents}</span>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {[
                "Application form.pdf",
                "Birth certificate.pdf",
                "Academic report 2024.pdf",
                "Immunisation record.pdf",
              ].map((d) => (
                <div key={d} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><FileText className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy truncate">{d}</p>
                    <p className="text-xs text-muted-foreground">PDF · 240 KB</p>
                  </div>
                  <button className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white"><Eye className="h-4 w-4 text-muted-foreground" /></button>
                  <button className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white"><Download className="h-4 w-4 text-muted-foreground" /></button>
                </div>
              ))}
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Admissions notes</h3>
            <textarea
              rows={4}
              placeholder="Add a note for your admissions team…"
              className="mt-3 w-full rounded-xl border border-border bg-muted/30 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </section>
        </div>

        {/* Sticky side panel */}
        <aside className="space-y-4">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current status</p>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge status={app.status} />
                <span className="text-xs text-muted-foreground">Updated today</span>
              </div>

              <h4 className="mt-5 text-sm font-semibold text-navy">Timeline</h4>
              <ol className="mt-3 space-y-3">
                {timeline.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={`h-6 w-6 rounded-full grid place-items-center ${t.done ? "bg-teal text-white" : "bg-muted text-muted-foreground"}`}>
                        {t.done ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                      </span>
                      {i < timeline.length - 1 && <span className={`flex-1 w-px my-1 ${t.done ? "bg-teal" : "bg-border"}`} />}
                    </div>
                    <div className="pb-3">
                      <p className="text-sm font-semibold text-navy">{t.label}</p>
                      <p className="text-xs text-muted-foreground">{t.at}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <h4 className="text-sm font-semibold text-navy">Quick actions</h4>
              <div className="mt-3 space-y-2">
                <ActionBtn icon={Clock} label="Mark under review" tone="primary" />
                <ActionBtn icon={FileQuestion} label="Request documents" tone="warning" />
                <ActionBtn icon={Check} label="Accept applicant" tone="success" />
                <ActionBtn icon={UserMinus} label="Waitlist" tone="muted" />
                <ActionBtn icon={X} label="Reject" tone="destructive" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-navy">{icon}{value}</p>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, tone }: { icon: typeof Check; label: string; tone: "primary" | "success" | "warning" | "destructive" | "muted" }) {
  const tones = {
    primary: "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
    success: "bg-success/15 text-success-foreground hover:bg-success hover:text-white",
    warning: "bg-warning/20 text-warning-foreground hover:bg-warning hover:text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground",
    muted: "bg-muted text-foreground/80 hover:bg-navy hover:text-white",
  } as const;
  return (
    <button className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${tones[tone]}`}>
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}