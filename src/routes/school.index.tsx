import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Inbox,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  Pencil,
  ListChecks,
  ImagePlus,
  Eye,
  TrendingUp,
} from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { StatusBadge } from "@/components/educa/StatusBadge";
import { applications, countByStatus } from "@/data/educa";

export const Route = createFileRoute("/school/")({
  head: () => ({ meta: [{ title: "Overview · EDUCA School Workspace" }] }),
  component: SchoolOverview,
});

function SchoolOverview() {
  const recent = applications.slice(0, 5);
  return (
    <DashboardShell
      title="Good morning, Kilimani Academy 👋"
      subtitle="Here's what's happening across your admissions today."
      actions={
        <>
          <Link
            to="/school/onboarding"
            className="inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-border text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted transition"
          >
            Continue Onboarding
          </Link>
          <Link
            to="/school/applications"
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
          >
            Review Applications
          </Link>
        </>
      }
    >
      {/* Profile completion */}
      <div className="rounded-2xl bg-gradient-to-r from-navy to-primary text-white p-6 sm:p-7 shadow-card mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-white/70 font-semibold">Profile completion</p>
            <h2 className="font-display text-2xl font-bold mt-1">Your school profile is 78% complete</h2>
            <p className="text-white/75 text-sm mt-1">Add fees overview and 3 more gallery photos to publish your public profile.</p>
          </div>
          <Link
            to="/school/profile"
            className="self-start inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
          >
            Complete profile <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 h-2.5 rounded-full bg-white/15 overflow-hidden">
          <div className="h-full bg-gold rounded-full" style={{ width: "78%" }} />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Total applications" value={applications.length * 16} delta="+12% this week" icon={Inbox} tone="primary" />
        <SummaryCard label="Pending review" value={countByStatus("Under Review") + countByStatus("Submitted")} icon={Clock} tone="gold" />
        <SummaryCard label="Accepted" value={countByStatus("Accepted") * 8} delta="+4 today" icon={CheckCircle2} tone="success" />
        <SummaryCard label="Rejected" value={countByStatus("Rejected") * 3} icon={XCircle} tone="destructive" />
      </div>

      {/* Two-column */}
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border shadow-soft">
          <div className="p-5 flex items-center justify-between border-b border-border">
            <h3 className="font-display font-semibold text-navy">Recent applications</h3>
            <Link to="/school/applications" className="text-sm font-semibold text-primary inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {recent.map((a) => (
              <li key={a.id} className="p-4 flex items-center gap-4 hover:bg-muted/40 transition">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-sm font-semibold shrink-0">
                  {a.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy truncate">{a.student}</p>
                  <p className="text-xs text-muted-foreground">{a.classApplied} · Submitted {a.submitted}</p>
                </div>
                <StatusBadge status={a.status} />
                <Link
                  to="/school/applications/$id"
                  params={{ id: a.id }}
                  className="hidden sm:inline-flex text-sm font-semibold text-primary hover:underline shrink-0"
                >
                  Open
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
          <h3 className="font-display font-semibold text-navy">Quick actions</h3>
          <p className="text-sm text-muted-foreground mt-1">Keep your profile sharp and admissions moving.</p>
          <div className="mt-4 space-y-2.5">
            {[
              { icon: Pencil, label: "Edit school profile", to: "/school/profile" as const },
              { icon: ListChecks, label: "Review applications", to: "/school/applications" as const },
              { icon: ImagePlus, label: "Upload gallery photos", to: "/school/gallery" as const },
              { icon: Eye, label: "Preview public profile", to: "/school/preview" as const },
              { icon: TrendingUp, label: "View reports", to: "/school/reports" as const },
            ].map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="flex items-center gap-3 px-3 py-3 rounded-xl bg-muted/40 hover:bg-primary/5 hover:ring-1 hover:ring-primary/20 transition group"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <a.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-navy flex-1">{a.label}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}