import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/educa/PortalShell";
import { DepositFlow } from "@/components/educa/DepositFlow";

export const Route = createFileRoute("/parent/wallet/deposit")({
  head: () => ({ meta: [{ title: "Deposit Money · EDUCA Wallet" }] }),
  component: () => (
    <PortalShell role="parent" title="Deposit Money" subtitle="Add funds to your EDUCA Wallet via M-Pesa.">
      <DepositFlow walletHomeTo="/parent/wallet" accountLabel="your EDUCA Wallet" />
    </PortalShell>
  ),
});