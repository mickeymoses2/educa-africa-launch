import { useState } from "react";
import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Map, List, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { featuredSchools } from "@/data/educa";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/schools")({
  head: () => ({ meta: [{ title: "Find Schools · EDUCA" }] }),
  component: SchoolsLayout,
});

function SchoolsLayout() {
  const matches = useMatches();
  if (matches.some((m) => m.routeId === "/parent/schools/$id")) return <Outlet />;
  return <SchoolsPage />;
}

const filters = [
  { label: "County", options: ["All counties", "Nairobi", "Mombasa", "Kisumu", "Eldoret"] },
  { label: "Level", options: ["All levels", "Pre-Primary", "Primary", "Secondary"] },
  { label: "Curriculum", options: ["All curricula", "CBC", "8-4-4", "Cambridge", "IB"] },
  { label: "Type", options: ["Day & Boarding", "Day", "Boarding"] },
  { label: "Sector", options: ["All", "Public", "Private"] },
];

function SchoolsPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const list = [...featuredSchools, ...featuredSchools].slice(0, 6);

  return (
    <PortalShell
      role="parent"
      title="Find the Right School"
      subtitle="Search and compare schools based on location, level, curriculum and admission availability."
    >
      {/* Search */}
      <div className="rounded-3xl bg-card border border-border shadow-soft p-4 sm:p-5 mb-5">
        <div className="flex items-center gap-2 rounded-2xl bg-muted/60 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search schools by name, county, curriculum or level"
            className="flex-1 bg-transparent outline-none text-sm py-2"
          />
          <button className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white border border-border text-navy px-3 py-2 text-xs font-semibold hover:bg-muted">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {filters.map((f) => (
            <select
              key={f.label}
              className="rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-medium text-navy outline-none focus:border-primary"
            >
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-navy">{list.length}</span> schools found
        </p>
        <div className="inline-flex rounded-xl bg-muted p-1 text-xs font-semibold">
          <button
            onClick={() => setView("list")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition",
              view === "list" ? "bg-white text-navy shadow-soft" : "text-muted-foreground",
            )}
          >
            <List className="h-3.5 w-3.5" /> List
          </button>
          <button
            onClick={() => setView("map")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition",
              view === "map" ? "bg-white text-navy shadow-soft" : "text-muted-foreground",
            )}
          >
            <Map className="h-3.5 w-3.5" /> Map
          </button>
        </div>
      </div>

      {view === "map" ? (
        <div className="rounded-3xl border border-dashed border-border bg-muted/40 h-96 grid place-items-center text-center px-6">
          <div>
            <Map className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="mt-3 font-display font-semibold text-navy">Map view coming soon</p>
            <p className="text-sm text-muted-foreground mt-1">
              We're building an interactive map to discover schools by neighbourhood.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((s, i) => (
            <article
              key={`${s.name}-${i}`}
              className="group overflow-hidden rounded-3xl bg-card shadow-card border border-border/60 hover:-translate-y-1 transition"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={s.image} alt={s.name} className="h-full w-full object-cover group-hover:scale-105 transition" />
                <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-navy">
                  {s.boarding}
                </span>
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-teal text-teal-foreground px-2.5 py-1 text-[11px] font-semibold">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
                <div className="absolute -bottom-6 left-5 h-14 w-14 rounded-2xl bg-white shadow-card grid place-items-center font-display font-bold text-navy text-lg border border-border">
                  {s.initials}
                </div>
              </div>
              <div className="p-5 pt-9">
                <h3 className="font-display font-semibold text-lg text-navy">{s.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {s.location}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium">
                    {s.level}
                  </span>
                  <span className="rounded-full bg-teal/15 text-teal-foreground px-2.5 py-0.5 text-[11px] font-medium">
                    {s.curriculum}
                  </span>
                  <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-[11px] font-medium">
                    Private
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    to="/parent/schools/$id"
                    params={{ id: slug(s.name) }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-muted hover:bg-muted/70 text-navy text-sm font-semibold py-2.5 transition"
                  >
                    View School <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/parent/apply"
                    className="rounded-xl bg-gold text-gold-foreground text-sm font-semibold py-2.5 px-4 hover:brightness-105 transition"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PortalShell>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}