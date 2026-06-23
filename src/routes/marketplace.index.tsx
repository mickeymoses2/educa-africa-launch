import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Sparkles, Star, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/educa/ProductCard";
import { productCategories, products } from "@/data/educa";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({ meta: [{ title: "EDUCA Marketplace · Shop School Essentials" }] }),
  component: MarketplaceHome,
});

function MarketplaceHome() {
  const featured = products.filter((p) => p.featured);
  const popular = products.slice().sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-navy text-white p-8 md:p-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 text-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider"><Sparkles className="h-3.5 w-3.5" /> EDUCA Marketplace</span>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight">Everything your child needs for school. One trusted marketplace.</h1>
          <p className="mt-4 text-white/80 max-w-lg">Approved uniforms, books, stationery and gear from vetted suppliers across Africa. Delivered to your home or school.</p>
          <div className="mt-6 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/60" />
            <input placeholder="Search for uniforms, books, bags…" className="w-full h-14 rounded-2xl bg-white text-navy pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-gold" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-navy mb-4">Shop by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {productCategories.map((c) => (
            <Link key={c.key} to="/marketplace" className="rounded-2xl bg-card border border-border shadow-soft p-4 hover:shadow-card transition flex flex-col gap-1">
              <span className="text-3xl">{c.emoji}</span>
              <p className="font-display font-semibold text-navy mt-1">{c.key}</p>
              <p className="text-xs text-muted-foreground">{c.description}</p>
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
        <h2 className="font-display text-xl font-bold text-navy mb-4">Recommended for your school</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.filter((p) => p.schoolApproved).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-navy mb-4 inline-flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Popular school essentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popular.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}