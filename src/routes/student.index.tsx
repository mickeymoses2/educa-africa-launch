import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Inbox, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { StudentIdCard } from "@/components/educa/StudentIdCard";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { ApplicationCard } from "@/components/educa/ApplicationCard";
import { SchoolCard } from "@/components/educa/SchoolCard";
import { NotificationCard } from "@/components/educa/NotificationCard";
import { children, myApplications, notifications, featuredSchools, documents } from "@/data/educa";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Student Dashboard · EDUCA" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const me = children[0];
  const apps = myApplications.filter((a) => a.studentId === me.id);
  const uploaded = documents.filter((d) => d.status !== "Missing").length;

  return (
    <PortalShell
      role="student"
      title={`Hi, ${me.name.split(" ")[0]}`}
      subtitle="Track your applications, manage documents and explore schools — all from your EDUCA workspace."
    >
      {/* Top grid: ID card + summary */}
      <div className="grid lg:grid-cols-[420px_1fr] gap-5 mb-8 items-start">
        <StudentIdCard child={me} />
        <div className="grid sm:grid-cols-2 gap-4 h-full">
          <SummaryCard label="Profile" value={`${me.completion}%`} icon={CheckCircle2} tone="teal" />
          <SummaryCard label="Applications" value={apps.length} icon={Inbox} tone="primary" />
          <SummaryCard label="Documents" value={`${uploaded}/${documents.length}`} icon={FileText} tone="gold" />
          <SummaryCard label="New updates" value={notifications.filter((n) => !n.read).length} icon={Sparkles} tone="muted" />
        </div>
      </div>

      {/* Applications */}
      <Section
        title="Your Applications"
        link={{ to: "/student/applications", label: "View all" }}
      >
        <div className="grid lg:grid-cols-2 gap-4">
          {apps.map((a) => (
            <ApplicationCard key={a.id} app={a} />
          ))}
        </div>
      </Section>

      {/* Documents checklist */}
      <Section
        title="Document Checklist"
        link={{ to: "/student/documents", label: "Manage documents" }}
      >
        <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
          <ul className="divide-y divide-border">
            {documents.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-8 w-8 rounded-lg grid place-items-center ${
                      d.status === "Missing"
                        ? "bg-muted text-muted-foreground"
                        : "bg-success/15 text-success-foreground"
                    }`}
                  >
                    {d.status === "Missing" ? <FileText className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy text-sm truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.status === "Missing" ? "Not uploaded" : d.fileName}</p>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                    d.status === "Missing"
                      ? "bg-warning/20 text-warning-foreground"
                      : "bg-success/15 text-success-foreground"
                  }`}
                >
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Recommended schools */}
      <Section
        title="Recommended for You"
        link={{ to: "/student/schools", label: "Explore schools" }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSchools.slice(0, 3).map((s) => (
            <SchoolCard key={s.name} school={s} />
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" link={{ to: "/student/notifications", label: "See all" }}>
        <div className="grid gap-3">
          {notifications.slice(0, 3).map((n) => (
            <NotificationCard key={n.id} n={n} />
          ))}
        </div>
      </Section>
    </PortalShell>
  );
}

function Section({
  title,
  link,
  children: kids,
}: {
  title: string;
  link?: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
        {link && (
          <Link
            to={link.to}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            {link.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {kids}
    </section>
  );
}