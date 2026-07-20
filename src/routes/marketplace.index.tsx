import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles, Star, TrendingUp, ShoppingBag, Truck, ArrowRight, Package, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/educa/ProductCard";
import { BundleCard } from "@/components/educa/BundleCard";
import { DealCard } from "@/components/educa/DealCard";
import { SupplierStoreCard } from "@/components/educa/SupplierStoreCard";
import { productCategories, products, bundles, deals, suppliers, shopSchools } from "@/data/educa";
import heroImg from "@/assets/marketplace-hero.jpg";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({ meta: [{ title: "EDUCA Marketplace · Shop School Essentials" }] }),
  component: MarketplaceHome,
});

const quickChips = ["Uniforms", "Books", "Stationery", "Shoes", "School Bags", "Sportswear", "Learning Materials"];

function MarketplaceHome() {
  const featured = products.filter((p) => p.featured);
  const popular = products.slice().sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const [selectedSchool, setSelectedSchool] = useState<string | null>("ss-1");
  const navigate = useNavigate();

  return (
    <div className="space-y-14">
      {/* Hero with image + overlay */}
      <section className="relative overflow-hidden rounded-3xl">
        <img src={heroImg} alt="School shopping essentials" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1024} />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative p-6 sm:p-10 md:p-14 max-w-3xl text-white min-h-[480px] sm:min-h-[520px] flex flex-col justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/20 ring-1 ring-teal/30 text-teal px-3 py-1 text-xs font-bold uppercase tracking-wider w-fit">
            <Sparkles className="h-3.5 w-3.5" /> EDUCA Marketplace
          </span>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Shop Everything Your Child <span className="text-gold">Needs for School</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl">
            Find uniforms, books, stationery, school bags, shoes and approved school supplies from trusted EDUCA suppliers.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              navigate({ to: "/marketplace/search", search: { q: String(fd.get("q") ?? ""), category: "all", supplier: "all", school: "all", availability: "all", delivery: "all", min: 0, max: 0, sort: "popular" } });
            }}
            className="mt-6 relative max-w-2xl"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/60" />
            <input
              name="q"
              placeholder="Search uniforms, books, stationery, bags, shoes or school supplies…"
              className="w-full h-14 rounded-2xl bg-white text-navy pl-12 pr-32 text-sm font-medium outline-none focus:ring-2 focus:ring-gold shadow-card"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gold text-gold-foreground font-semibold px-4 py-2.5 text-sm inline-flex items-center gap-1.5">
              <Search className="h-4 w-4" /> Search
            </button>
          </form>
          <div className="mt-3">
            <Link to="/marketplace/search" search={{ q: "", category: "all", supplier: "all", school: "all", availability: "all", delivery: "all", min: 0, max: 0, sort: "popular" }} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/85 hover:text-white">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Advanced filters — shop by school, supplier, delivery & more
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/marketplace" className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3 text-sm shadow-glow">
              <ShoppingBag className="h-4 w-4" /> Start Shopping
            </Link>
            <a href="#shop-by-school" className="inline-flex items-center gap-2 rounded-xl bg-white text-navy font-semibold px-5 py-3 text-sm">
              Shop By School
            </a>
            <Link to="/supplier" className="inline-flex items-center gap-2 rounded-xl ring-1 ring-white/30 hover:bg-white/10 text-white font-semibold px-5 py-3 text-sm">
              Become A Supplier
            </Link>
          </div>
          <div className="mt-5 -mx-2 px-2 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {quickChips.map((c) => (
                <Link
                  key={c}
                  to="/marketplace/search"
                  search={{ q: "", category: c === "School Bags" ? "School Bags" : c === "Learning Materials" ? "Learning Materials" : c, supplier: "all", school: "all", availability: "all", delivery: "all", min: 0, max: 0, sort: "popular" }}
                  className="whitespace-nowrap rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-white px-4 py-2 text-xs font-semibold hover:bg-white/15"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop by school */}
      <section id="shop-by-school">
        <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Shop by school</h2>
            <p className="text-sm text-muted-foreground">Pick your child's school to see approved items.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search schools…" className="h-10 rounded-xl border border-border pl-9 pr-3 text-sm bg-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shopSchools.map((s) => (
            <button key={s.id} onClick={() => setSelectedSchool(s.id)} className={`text-left rounded-2xl border-2 p-4 bg-card shadow-soft transition ${selectedSchool === s.id ? "border-primary" : "border-border hover:border-primary/40"}`}>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} grid place-items-center text-white font-display font-bold`}>{s.initials}</div>
              <p className="mt-3 font-display font-semibold text-navy">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.town}</p>
              <span className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${selectedSchool === s.id ? "text-primary" : "text-muted-foreground"}`}>
                {selectedSchool === s.id ? "Selected" : "Select school"} <ArrowRight className="h-3 w-3" />
              </span>
            </button>
          ))}
        </div>
        {selectedSchool && (
          <div className="mt-6">
            <h3 className="font-display text-base font-semibold text-navy mb-3">
              Recommended items for {shopSchools.find((s) => s.id === selectedSchool)?.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.filter((p) => p.schoolApproved).map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        )}
      </section>

      {/* Bundles */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-navy inline-flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> School shopping bundles</h2>
            <p className="text-sm text-muted-foreground">Curated packs by class — uniforms, books and supplies in one box.</p>
          </div>
          <Link to="/marketplace/bundles" className="text-sm font-semibold text-primary inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bundles.slice(0, 3).map((b) => <BundleCard key={b.id} b={b} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-navy mb-4">Featured categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {productCategories.map((c) => (
            <Link key={c.key} to="/marketplace" className="rounded-2xl bg-card border border-border shadow-soft p-4 hover:shadow-card transition flex flex-col gap-1">
              <span className="text-3xl">{c.emoji}</span>
              <p className="font-display font-semibold text-navy mt-1">{c.key}</p>
              <p className="text-xs text-muted-foreground">{c.description}</p>
              <p className="text-[11px] font-semibold text-primary mt-1">{products.filter((p) => p.category === c.key).length} products</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-navy inline-flex items-center gap-2"><Star className="h-5 w-5 text-gold fill-gold" /> Featured products</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-navy mb-4">Recommended for Brian Mwangi · Grade 6</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.filter((p) => p.schoolApproved).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Approved suppliers */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-navy">Approved school suppliers</h2>
          <Link to="/supplier" className="text-sm font-semibold text-primary inline-flex items-center gap-1">Become a supplier <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.slice(0, 6).map((s) => <SupplierStoreCard key={s.id} s={s} />)}
        </div>
      </section>

      {/* Deals */}
      <section>
        <h2 className="font-display text-xl font-bold text-navy mb-4">Back-to-school offers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((d) => <DealCard key={d.id} d={d} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-navy mb-4 inline-flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Popular school essentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popular.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Logistics partner CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-primary to-teal text-white p-8 md:p-12">
        <div aria-hidden className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-white/15 text-gold px-3 py-1 text-xs font-bold uppercase tracking-wider"><Truck className="h-3.5 w-3.5" /> Deliver With EDUCA</span>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold leading-tight">Are you a delivery business, rider group or logistics provider?</h2>
            <p className="mt-2 text-white/80 max-w-xl">Join EDUCA and deliver school supplies to parents and schools. Earn from every completed delivery, manage jobs from one dashboard, and serve suppliers in your operating area.</p>
          </div>
          <Link to="/logistics/register" className="rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3 text-sm shadow-glow whitespace-nowrap inline-flex items-center gap-2">
            Become A Logistics Partner <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}