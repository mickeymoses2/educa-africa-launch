import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BundleCard } from "@/components/educa/BundleCard";
import { bundles } from "@/data/educa";

export const Route = createFileRoute("/marketplace/bundles")({
  head: () => ({ meta: [{ title: "Shopping Bundles · EDUCA Marketplace" }] }),
  component: () => (
    <div>
      <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back to Marketplace</Link>
      <div className="rounded-3xl bg-navy text-white p-8 md:p-10 mb-8 relative overflow-hidden">
        <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
        <h1 className="font-display text-3xl md:text-4xl font-bold">School Shopping Bundles</h1>
        <p className="mt-2 text-white/75 max-w-xl">Save when you shop a complete pack — uniforms, books and supplies curated by class and school type.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bundles.map((b) => <BundleCard key={b.id} b={b} />)}
      </div>
    </div>
  ),
});