import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/educa/PortalShell";
import { DepositFlow } from "@/components/educa/DepositFlow";

export const Route = createFileRoute("/student/wallet/deposit")({
  head: () => ({ meta: [{ title: "Request Top-Up · EDUCA" }] }),
  component: () => (
    <PortalShell role="student" title="Request Top-Up" subtitle="Top up your EDUCA Balance via M-Pesa.">
      <DepositFlow walletHomeTo="/student/wallet" accountLabel="your EDUCA Balance" />
    </PortalShell>
  ),
});