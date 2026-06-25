import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Plus, ArrowDownToLine, Receipt, ShoppingBag } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { TransactionList } from "@/components/educa/TransactionList";
import { walletBalances, walletTransactions } from "@/data/educa";

export const Route = createFileRoute("/parent/wallet")({
  head: () => ({ meta: [{ title: "EDUCA Wallet · Parent" }] }),
  component: ParentWallet,
});

function ParentWallet() {
  // Detect deposit subroute
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isDeposit = path.includes("/parent/wallet/deposit");
  if (isDeposit) return <Outlet />;
  return (
    <PortalShell role="parent" title="EDUCA Wallet" subtitle="Top up, pay fees, shop the marketplace and view every transaction in one place.">
      <WalletCard
        data={walletBalances.parent}
        actions={[
          { label: "Deposit Money", to: "/parent/wallet/deposit", icon: Plus },
          { label: "Pay Fees", to: "/parent/payments", icon: Receipt, variant: "ghost" },
          { label: "Shop Now", to: "/marketplace", icon: ShoppingBag, variant: "ghost" },
        ]}
      />
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <Stat label="This Month" value="KES 28,400" sub="Spend" />
        <Stat label="Top Category" value="School Fees" sub="65% of spend" />
        <Stat label="Active Auto-Pay" value="0" sub="Coming soon" />
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl font-bold text-navy">Transactions</h2>
          <button className="text-xs font-semibold text-primary inline-flex items-center gap-1"><ArrowDownToLine className="h-3 w-3" /> Export</button>
        </div>
        <TransactionList items={walletTransactions.parent} />
      </div>
    </PortalShell>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}