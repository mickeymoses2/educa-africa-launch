import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, ShieldCheck, ArrowRight, SlidersHorizontal, Building2 } from "lucide-react";
import { Navbar } from "@/components/educa/Navbar";
import { Footer } from "@/components/educa/Footer";
import { EmptyState } from "@/components/educa/EmptyState";
import { featuredSchools } from "@/data/educa";

export const Route = createFileRoute("/schools/")({
  head: () => ({
    meta: [
      { title: "Browse Schools · EDUCA Africa" },
      { name: "description", content: "Discover vetted schools across Africa. Filter by curriculum, level, location and admission availability." },
      { property: "og:title", content: "Browse Schools · EDUCA Africa" },
      { property: "og:description", content: "Explore a growing directory of African schools — no account required." },
    ],
  }),
  component: PublicSchoolsPage,
});

const filters = [
  { label: "County", options: ["All counties", "Nairobi", "Mombasa", "Kisumu", "Eldoret", "Lagos", "Kigali"] },
  { label: "Level", options: ["All levels", "Pre-Primary", "Primary", "Secondary"] },
  { label: "Curriculum", options: ["All curricula", "CBC", "8-4-4", "Cambridge", "IB"] },
  { label: "Type", options: ["Day & Boarding", "Day", "Boarding"] },
  { label: "Gender", options: ["Mixed", "Boys only", "Girls only"] },
];

function PublicSchoolsPage() {
  const [query, setQuery] = useState("");
  const all = [...featuredSchools, ...featuredSchools];
  const list = all.filter((s) =>
    !query ? true : `${s.name} ${s.location} ${s.curriculum}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white pt-32 pb-20">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-xs font-medium">
            <Building2 className="h-3 w-3 text-gold" /> Public School Directory
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Discover the right school <span className="text-gold">for your family.</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Browse vetted schools across Africa — no account required. When you're ready, create an EDUCA account to apply online.
          </p>

          <div className="mt-8 max-w-2xl mx-auto flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-card">
            <div className="flex-1 flex items-center gap-2 pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by school name, county, curriculum or level"
                className="flex-1 bg-transparent outline-none text-sm py-2.5 text-navy placeholder:text-muted-foreground"
              />
            </div>
            <button className="rounded-xl bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-105 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 -mt-10 relative">
        <div className="rounded-3xl bg-card border border-border shadow-card p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-navy">
            <SlidersHorizontal className="h-3.5 w-3.5 text-primary" /> Refine results
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
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
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-navy">{list.length}</span> schools found
          </p>
          <Link to="/get-started" className="text-sm font-semibold text-primary hover:underline">
            Create account to apply →
          </Link>
        </div>

        {list.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No schools found"
            description="Try adjusting your filters or search criteria."
          />
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {list.map((s, i) => {
              const id = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <article
                  key={`${s.name}-${i}`}
                  className="group overflow-hidden rounded-3xl bg-card shadow-card border border-border/60 hover:-translate-y-1 transition"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.image} alt={s.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                      <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium">{s.level}</span>
                      <span className="rounded-full bg-teal/15 text-teal-foreground px-2.5 py-0.5 text-[11px] font-medium">{s.curriculum}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Link
                        to="/schools/$id"
                        params={{ id }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-muted hover:bg-muted/70 text-navy text-sm font-semibold py-2.5 transition"
                      >
                        View School <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/schools/$id"
                        params={{ id }}
                        className="rounded-xl bg-gold text-gold-foreground text-sm font-semibold py-2.5 px-4 hover:brightness-105 transition"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}