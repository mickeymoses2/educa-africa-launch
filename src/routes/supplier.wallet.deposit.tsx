import { createFileRoute } from "@tanstack/react-router";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { DepositFlow } from "@/components/educa/DepositFlow";

export const Route = createFileRoute("/supplier/wallet/deposit")({
  head: () => ({ meta: [{ title: "Request Payout · Supplier" }] }),
  component: () => (
    <SupplierShell title="Request Payout" subtitle="Move your sales balance to your bank account.">
      <DepositFlow walletHomeTo="/supplier/wallet" accountLabel="your supplier payout account" />
    </SupplierShell>
  ),
});