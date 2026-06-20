import { useState } from "react";
import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Download, ArrowUpRight, FileCheck2, FileX2, FileClock } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { StatusBadge, type Status } from "@/components/educa/StatusBadge";
import { applications, countByStatus } from "@/data/educa";

export const Route = createFileRoute("/school/applications")({
  head: () => ({ meta: [{ title: "Applications · EDUCA" }] }),
  component: ApplicationsLayout,
});

function ApplicationsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/school/applications/$id");
  if (isChild) return <Outlet />;
  return <ApplicationsList />;
}

const filters: ("All" | Status)[] = [
  "All",
  "Submitted",
  "Under Review",
  "Pending Documents",
  "Accepted",
  "Rejected",
  "Waitlisted",
];

function ApplicationsList() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = applications.filter((a) => {
    const matchStatus = active === "All" ? true : a.status === active;
    const matchQ = !q || a.student.toLowerCase().includes(q.toLowerCase()) || a.id.toLowerCase().includes(q.toLowerCase());
    return matchStatus && matchQ;
  });

  const docIcon = (s: string) =>
    s === "Complete" ? <FileCheck2 className="h-4 w-4 text-success-foreground" /> :
    s === "Pending" ? <FileX2 className="h-4 w-4 text-destructive" /> :
    <FileClock className="h-4 w-4 text-warning-foreground" />;

  return (
    <DashboardShell
      title="Applications"
      subtitle="Review, filter and act on every applicant in one workspace."
      actions={
        <button className="inline-flex items-center gap-2 rounded-xl ring-1 ring-border text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted transition">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      }
    >
      {/* Search + filters */}
      <div className="rounded-2xl bg-card border border-border shadow-soft p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by applicant name or application ID…"
              className="w-full h-11 rounded-xl bg-muted/60 border border-transparent focus:bg-white focus:border-primary outline-none pl-10 pr-3 text-sm transition"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl ring-1 ring-border text-navy px-4 h-11 text-sm font-semibold hover:bg-muted transition">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f === "All" ? applications.length : countByStatus(f);
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive ? "bg-navy text-white shadow-soft" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {f} <span className={`ml-1 ${isActive ? "text-gold" : "opacity-60"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop table */}
      <div className="mt-5 rounded-2xl bg-card border border-border shadow-soft overflow-hidden hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Student</th>
              <th className="text-left px-5 py-3 font-semibold">Parent</th>
              <th className="text-left px-5 py-3 font-semibold">Class</th>
              <th className="text-left px-5 py-3 font-semibold">Submitted</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">Docs</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-muted/30 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-xs font-semibold shrink-0">{a.initials}</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-navy truncate">{a.student}</p>
                      <p className="text-xs text-muted-foreground">{a.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-foreground/80">{a.parent}</td>
                <td className="px-5 py-3.5 text-foreground/80">{a.classApplied}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{a.submitted}</td>
                <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">{docIcon(a.documents)} {a.documents}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link to="/school/applications/$id" params={{ id: a.id }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    View <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-5 grid sm:grid-cols-2 gap-3 md:hidden">
        {filtered.map((a) => (
          <Link
            key={a.id}
            to="/school/applications/$id"
            params={{ id: a.id }}
            className="rounded-2xl bg-card border border-border p-4 shadow-soft hover:shadow-card transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-sm font-semibold shrink-0">{a.initials}</div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-navy truncate">{a.student}</p>
                <p className="text-xs text-muted-foreground">{a.classApplied} · {a.submitted}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <StatusBadge status={a.status} />
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">{docIcon(a.documents)} {a.documents}</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="font-display font-semibold text-navy">No applications match your filters</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different filter or clear your search.</p>
        </div>
      )}
    </DashboardShell>
  );
}