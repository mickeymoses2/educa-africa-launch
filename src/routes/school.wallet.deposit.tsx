import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { DepositFlow } from "@/components/educa/DepositFlow";

export const Route = createFileRoute("/school/wallet/deposit")({
  head: () => ({ meta: [{ title: "Request Payout · School Wallet" }] }),
  component: () => (
    <DashboardShell title="Request Payout" subtitle="Move funds from your EDUCA school balance to your bank account.">
      <DepositFlow walletHomeTo="/school/wallet" accountLabel="your school payout account" />
    </DashboardShell>
  ),
});