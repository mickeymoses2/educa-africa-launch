import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/educa/Logo";
import { useCart } from "@/hooks/useCart";

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [{ title: "EDUCA Marketplace" }] }),
  component: MarketplaceLayout,
});

function MarketplaceLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo tone="dark" />
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link to="/marketplace" className={`px-3 py-2 rounded-lg font-medium ${pathname === "/marketplace" ? "text-primary bg-primary/5" : "text-foreground/70 hover:text-foreground"}`}>Browse</Link>
              <Link to="/parent/orders" className="px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground font-medium">My Orders</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/parent" className="hidden md:inline-flex text-sm font-medium text-foreground/70 hover:text-foreground px-3 py-2 rounded-lg">
              <span className="inline-flex items-center gap-1.5"><ArrowLeft className="h-4 w-4" /> Back to Portal</span>
            </Link>
            <Link to="/marketplace/cart" className="relative inline-flex items-center gap-2 rounded-xl bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-navy/90">
              <ShoppingCart className="h-4 w-4" /> Cart
              {count > 0 && <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-gold text-gold-foreground text-[10px] font-bold px-1.5">{count}</span>}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-20"><Outlet /></main>
    </div>
  );
}