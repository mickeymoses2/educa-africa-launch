import { createFileRoute, Link } from "@tanstack/react-router";
import { Shirt } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";

export const Route = createFileRoute("/student/uniforms")({
  head: () => ({ meta: [{ title: "Uniforms · EDUCA" }] }),
  component: () => (
    <PortalShell role="student" title="School Uniforms" subtitle="Browse and request approved uniform items for your school.">
      <div className="rounded-3xl bg-card border border-border shadow-soft p-8 text-center">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-gold/15 text-gold-foreground grid place-items-center"><Shirt className="h-7 w-7" /></div>
        <h2 className="mt-4 font-display text-xl font-bold text-navy">Need a uniform?</h2>
        <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">Ask your parent or guardian to place an order, or browse approved suppliers on the marketplace.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <Link to="/marketplace" className="rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3">Browse Marketplace</Link>
          <Link to="/parent/uniforms" className="rounded-xl border border-border font-semibold px-5 py-3">View Order Flow</Link>
        </div>
      </div>
    </PortalShell>
  ),
});