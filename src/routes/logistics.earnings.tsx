import { createFileRoute } from "@tanstack/react-router";
import { LogisticsShell } from "@/components/educa/LogisticsShell";
import { TransactionList } from "@/components/educa/TransactionList";
import { walletTransactions } from "@/data/educa";

export const Route = createFileRoute("/logistics/earnings")({
  head: () => ({ meta: [{ title: "Earnings · Logistics" }] }),
  component: () => (
    <LogisticsShell title="Earnings" subtitle="A breakdown of your delivery income across periods.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Today", "KES 1,250", "6 deliveries"],
          ["This Week", "KES 8,420", "38 deliveries"],
          ["This Month", "KES 34,180", "126 deliveries"],
          ["Pending Payout", "KES 4,200", "Next batch · Friday"],
        ].map(([l, v, s]) => (
          <div key={l} className="rounded-2xl bg-card border border-border shadow-soft p-5">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{l}</p>
            <p className="mt-1 font-display text-2xl font-bold text-navy">{v}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s}</p>
          </div>
        ))}
      </div>
      <h2 className="font-display text-xl font-bold text-navy mb-3">Recent earnings</h2>
      <TransactionList items={walletTransactions.logistics} />
    </LogisticsShell>
  ),
});