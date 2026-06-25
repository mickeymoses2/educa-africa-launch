import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Send, TrendingUp } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { TransactionList } from "@/components/educa/TransactionList";
import { walletBalances, walletTransactions } from "@/data/educa";

export const Route = createFileRoute("/supplier/wallet")({
  head: () => ({ meta: [{ title: "Supplier Wallet · EDUCA" }] }),
  component: SupplierWallet,
});

function SupplierWallet() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  if (path.includes("/supplier/wallet/deposit")) return <Outlet />;
  return (
    <SupplierShell title="Supplier Wallet" subtitle="Track your sales balance, pending orders and bank payouts.">
      <WalletCard
        data={walletBalances.supplier}
        actions={[
          { label: "Request Payout", to: "/supplier/wallet/deposit", icon: Send },
          { label: "View Sales", to: "/supplier/sales", icon: TrendingUp, variant: "ghost" },
        ]}
      />
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-navy mb-3">Transactions</h2>
        <TransactionList items={walletTransactions.supplier} />
      </div>
    </SupplierShell>
  );
}