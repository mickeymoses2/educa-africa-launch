import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Send, DollarSign } from "lucide-react";
import { LogisticsShell } from "@/components/educa/LogisticsShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { TransactionList } from "@/components/educa/TransactionList";
import { walletBalances, walletTransactions } from "@/data/educa";

export const Route = createFileRoute("/logistics/wallet")({
  head: () => ({ meta: [{ title: "Delivery Earnings · Logistics" }] }),
  component: LogisticsWallet,
});

function LogisticsWallet() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  if (path.includes("/logistics/wallet/deposit")) return <Outlet />;
  return (
    <LogisticsShell title="Delivery Earnings" subtitle="Withdraw your balance to your bank account.">
      <WalletCard
        data={walletBalances.logistics}
        actions={[
          { label: "Request Payout", to: "/logistics/wallet/deposit", icon: Send },
          { label: "View Earnings", to: "/logistics/earnings", icon: DollarSign, variant: "ghost" },
        ]}
      />
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-navy mb-3">Transactions</h2>
        <TransactionList items={walletTransactions.logistics} />
      </div>
    </LogisticsShell>
  );
}