import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Send, ArrowUpRight, Receipt } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { TransactionList } from "@/components/educa/TransactionList";
import { walletBalances, walletTransactions } from "@/data/educa";

export const Route = createFileRoute("/school/wallet")({
  head: () => ({ meta: [{ title: "School Wallet · EDUCA" }] }),
  component: SchoolWallet,
});

function SchoolWallet() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  if (path.includes("/school/wallet/deposit")) return <Outlet />;
  return (
    <DashboardShell title="School Account Balance" subtitle="Track collected fees, application fees and payouts to your bank.">
      <WalletCard
        data={walletBalances.school}
        actions={[
          { label: "Request Payout", to: "/school/wallet/deposit", icon: Send },
          { label: "View Payments", to: "/school/payments", icon: Receipt, variant: "ghost" },
        ]}
      />
      <div className="mt-8 grid sm:grid-cols-4 gap-4">
        <Stat label="Term Collected" value="KES 4.2M" sub="78% of target" />
        <Stat label="Outstanding" value="KES 1.1M" sub="22% of target" />
        <Stat label="Pending Payouts" value="KES 12,000" sub="Next batch · Friday" />
        <Stat label="Application Fees" value="KES 48,000" sub="June 2026" />
      </div>
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-navy mb-3">Transactions</h2>
        <TransactionList items={walletTransactions.school} />
      </div>
    </DashboardShell>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-navy inline-flex items-center gap-1">{value} <ArrowUpRight className="h-4 w-4 text-success-foreground" /></p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}