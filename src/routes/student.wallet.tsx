import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Plus, Send, ShoppingBag } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { TransactionList } from "@/components/educa/TransactionList";
import { walletBalances, walletTransactions } from "@/data/educa";

export const Route = createFileRoute("/student/wallet")({
  head: () => ({ meta: [{ title: "EDUCA Balance · Student" }] }),
  component: StudentWallet,
});

function StudentWallet() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  if (path.includes("/student/wallet/deposit")) return <Outlet />;
  return (
    <PortalShell role="student" title="My EDUCA Balance" subtitle="Use your education balance to shop school essentials and pay fees.">
      <WalletCard
        data={walletBalances.student}
        actions={[
          { label: "Request Top-Up", to: "/student/wallet/deposit", icon: Send },
          { label: "Use Balance", to: "/marketplace", icon: ShoppingBag, variant: "ghost" },
        ]}
      />
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-navy mb-3">Recent Activity</h2>
        <TransactionList items={walletTransactions.student} />
      </div>
    </PortalShell>
  );
}