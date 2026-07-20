import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/educa/ProductCard";
import {
  products,
  productCategories,
  suppliers,
  shopSchools,
  type Product,
} from "@/data/educa";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "all").default("all"),
  supplier: fallback(z.string(), "all").default("all"),
  school: fallback(z.string(), "all").default("all"),
  availability: fallback(z.string(), "all").default("all"),
  delivery: fallback(z.string(), "all").default("all"),
  min: fallback(z.number(), 0).default(0),
  max: fallback(z.number(), 0).default(0),
  sort: fallback(z.string(), "popular").default("popular"),
});

export const Route = createFileRoute("/marketplace/search")({
  head: () => ({ meta: [{ title: "Search Marketplace · EDUCA" }] }),
  validateSearch: zodValidator(searchSchema),
  component: SearchPage,
});

function minDays(text: string): number {
  const m = text.match(/\d+/);
  return m ? parseInt(m[0], 10) : 99;
}

function deliveryBucket(supplierId: string): "express" | "standard" | "extended" {
  const s = suppliers.find((x) => x.id === supplierId);
  const d = s ? minDays(s.delivery) : 99;
  if (d <= 2) return "express";
  if (d <= 5) return "standard";
  return "extended";
}

function filterProducts(all: Product[], f: z.infer<typeof searchSchema>) {
  const q = f.q.trim().toLowerCase();
  let out = all.filter((p) => {
    if (q && !(`${p.name} ${p.supplier} ${p.category} ${p.description}`.toLowerCase().includes(q))) return false;
    if (f.category !== "all" && p.category !== f.category) return false;
    if (f.supplier !== "all" && p.supplierId !== f.supplier) return false;
    if (f.school !== "all" && !p.schoolApproved) return false;
    if (f.availability === "in-stock" && p.stock <= 0) return false;
    if (f.availability === "low-stock" && !(p.stock > 0 && p.stock <= 20)) return false;
    if (f.delivery !== "all" && deliveryBucket(p.supplierId) !== f.delivery) return false;
    if (f.min > 0 && p.price < f.min) return false;
    if (f.max > 0 && p.price > f.max) return false;
    return true;
  });
  switch (f.sort) {
    case "price-asc": out = out.slice().sort((a, b) => a.price - b.price); break;
    case "price-desc": out = out.slice().sort((a, b) => b.price - a.price); break;
    case "rating": out = out.slice().sort((a, b) => b.rating - a.rating); break;
    case "newest": out = out.slice().reverse(); break;
    default: out = out.slice().sort((a, b) => b.reviews - a.reviews);
  }
  return out;
}

function SearchPage() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/marketplace/search" });
  const results = useMemo(() => filterProducts(products, s), [s]);

  const update = (patch: Partial<typeof s>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const activeCount = [
    s.q,
    s.category !== "all" ? s.category : "",
    s.supplier !== "all" ? s.supplier : "",
    s.school !== "all" ? s.school : "",
    s.availability !== "all" ? s.availability : "",
    s.delivery !== "all" ? s.delivery : "",
    s.min ? "min" : "",
    s.max ? "max" : "",
  ].filter(Boolean).length;

  const reset = () =>
    navigate({
      search: {
        q: "", category: "all", supplier: "all", school: "all",
        availability: "all", delivery: "all", min: 0, max: 0, sort: "popular",
      },
    });

  return (
    <div>
      {/* Search bar */}
      <div className="rounded-3xl bg-navy text-white p-6 md:p-8 mb-6 relative overflow-hidden">
        <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative">
          <h1 className="font-display text-2xl md:text-3xl font-bold">Find school essentials</h1>
          <p className="mt-1 text-sm text-white/70">Filter by school, category, supplier, availability and delivery speed.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); update({ q: String(fd.get("q") ?? "") }); }}
            className="mt-4 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/60" />
            <input
              name="q"
              defaultValue={s.q}
              key={s.q}
              placeholder="Search uniforms, books, stationery, bags, shoes…"
              className="w-full h-13 rounded-2xl bg-white text-navy pl-12 pr-28 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-gold shadow-card"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gold text-gold-foreground font-semibold px-4 py-2 text-sm">Search</button>
          </form>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Filters sidebar */}
        <aside className="rounded-2xl bg-card border border-border shadow-soft p-5 h-fit lg:sticky lg:top-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-navy inline-flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-primary" /> Filters {activeCount > 0 && <span className="rounded-full bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5">{activeCount}</span>}</h2>
            {activeCount > 0 && <button onClick={reset} className="text-xs font-semibold text-primary inline-flex items-center gap-1"><X className="h-3 w-3" /> Clear</button>}
          </div>

          <FilterGroup label="School">
            <select value={s.school} onChange={(e) => update({ school: e.target.value })} className="w-full rounded-lg border border-border bg-white text-sm px-3 py-2">
              <option value="all">All schools</option>
              {shopSchools.map((sc) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
            </select>
            {s.school !== "all" && <p className="mt-1 text-[11px] text-muted-foreground">Showing school-approved items only.</p>}
          </FilterGroup>

          <FilterGroup label="Category">
            <div className="flex flex-col gap-1.5">
              <RadioRow name="category" value="all" checked={s.category === "all"} label="All categories" onChange={(v) => update({ category: v })} />
              {productCategories.map((c) => (
                <RadioRow key={c.key} name="category" value={c.key} checked={s.category === c.key} label={`${c.emoji} ${c.key}`} onChange={(v) => update({ category: v })} />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Supplier">
            <select value={s.supplier} onChange={(e) => update({ supplier: e.target.value })} className="w-full rounded-lg border border-border bg-white text-sm px-3 py-2">
              <option value="all">All suppliers</option>
              {suppliers.map((sup) => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
            </select>
          </FilterGroup>

          <FilterGroup label="Availability">
            <div className="flex flex-col gap-1.5">
              <RadioRow name="availability" value="all" checked={s.availability === "all"} label="Any" onChange={(v) => update({ availability: v })} />
              <RadioRow name="availability" value="in-stock" checked={s.availability === "in-stock"} label="In stock" onChange={(v) => update({ availability: v })} />
              <RadioRow name="availability" value="low-stock" checked={s.availability === "low-stock"} label="Low stock (≤20)" onChange={(v) => update({ availability: v })} />
            </div>
          </FilterGroup>

          <FilterGroup label="Delivery">
            <div className="flex flex-col gap-1.5">
              <RadioRow name="delivery" value="all" checked={s.delivery === "all"} label="Any speed" onChange={(v) => update({ delivery: v })} />
              <RadioRow name="delivery" value="express" checked={s.delivery === "express"} label="Express · 1–2 days" onChange={(v) => update({ delivery: v })} />
              <RadioRow name="delivery" value="standard" checked={s.delivery === "standard"} label="Standard · 3–5 days" onChange={(v) => update({ delivery: v })} />
              <RadioRow name="delivery" value="extended" checked={s.delivery === "extended"} label="Extended · 5+ days" onChange={(v) => update({ delivery: v })} />
            </div>
          </FilterGroup>

          <FilterGroup label="Price (KES)">
            <div className="grid grid-cols-2 gap-2">
              <input type="number" min={0} placeholder="Min" value={s.min || ""} onChange={(e) => update({ min: Number(e.target.value) || 0 })} className="rounded-lg border border-border bg-white text-sm px-3 py-2" />
              <input type="number" min={0} placeholder="Max" value={s.max || ""} onChange={(e) => update({ max: Number(e.target.value) || 0 })} className="rounded-lg border border-border bg-white text-sm px-3 py-2" />
            </div>
          </FilterGroup>
        </aside>

        {/* Results */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-navy">{results.length}</span> {results.length === 1 ? "result" : "results"}
              {s.q && <> for “<span className="text-navy font-semibold">{s.q}</span>”</>}
            </p>
            <label className="text-sm inline-flex items-center gap-2">
              <span className="text-muted-foreground">Sort by</span>
              <select value={s.sort} onChange={(e) => update({ sort: e.target.value })} className="rounded-lg border border-border bg-white text-sm px-3 py-2 font-medium">
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>

          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {s.q && <Chip label={`“${s.q}”`} onClear={() => update({ q: "" })} />}
              {s.category !== "all" && <Chip label={s.category} onClear={() => update({ category: "all" })} />}
              {s.supplier !== "all" && <Chip label={suppliers.find((x) => x.id === s.supplier)?.name ?? s.supplier} onClear={() => update({ supplier: "all" })} />}
              {s.school !== "all" && <Chip label={shopSchools.find((x) => x.id === s.school)?.name ?? s.school} onClear={() => update({ school: "all" })} />}
              {s.availability !== "all" && <Chip label={s.availability === "in-stock" ? "In stock" : "Low stock"} onClear={() => update({ availability: "all" })} />}
              {s.delivery !== "all" && <Chip label={`Delivery: ${s.delivery}`} onClear={() => update({ delivery: "all" })} />}
              {(s.min > 0 || s.max > 0) && <Chip label={`KES ${s.min || 0}–${s.max || "∞"}`} onClear={() => update({ min: 0, max: 0 })} />}
            </div>
          )}

          {results.length === 0 ? (
            <div className="rounded-2xl bg-card border border-dashed border-border p-12 text-center">
              <p className="font-display text-lg font-bold text-navy">No products match your filters</p>
              <p className="text-sm text-muted-foreground mt-1">Try clearing a filter or searching for something else.</p>
              <button onClick={reset} className="mt-4 rounded-xl bg-navy text-white font-semibold px-4 py-2 text-sm">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}

          <div className="mt-8 text-sm">
            <Link to="/marketplace" className="text-primary font-semibold">← Back to marketplace</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-t border-border first-of-type:border-t-0 first-of-type:pt-0">
      <p className="text-[11px] font-bold uppercase tracking-wider text-navy mb-2">{label}</p>
      {children}
    </div>
  );
}

function RadioRow({ name, value, checked, label, onChange }: { name: string; value: string; checked: boolean; label: string; onChange: (v: string) => void }) {
  return (
    <label className={`flex items-center gap-2 text-sm px-2 py-1.5 rounded-lg cursor-pointer ${checked ? "bg-primary/10 text-navy font-semibold" : "text-foreground/75 hover:bg-muted"}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="accent-primary" />
      <span>{label}</span>
    </label>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-navy text-xs font-semibold px-3 py-1.5">
      {label}
      <button onClick={onClear} className="text-primary hover:text-primary/70"><X className="h-3 w-3" /></button>
    </span>
  );
}