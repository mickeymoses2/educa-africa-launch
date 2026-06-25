import { createFileRoute } from "@tanstack/react-router";
import { LogisticsShell } from "@/components/educa/LogisticsShell";
import { DepositFlow } from "@/components/educa/DepositFlow";

export const Route = createFileRoute("/logistics/wallet/deposit")({
  head: () => ({ meta: [{ title: "Request Payout · Logistics" }] }),
  component: () => (
    <LogisticsShell title="Request Payout" subtitle="Move your earnings to your bank account.">
      <DepositFlow walletHomeTo="/logistics/wallet" accountLabel="your logistics payout account" />
    </LogisticsShell>
  ),
});






























