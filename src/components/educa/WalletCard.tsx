import { Link } from "@tanstack/react-router";
import { Wallet, Plus, ArrowUpRight, type LucideIcon } from "lucide-react";
import type { WalletBalance } from "@/data/educa";

export interface WalletAction {
  label: string;
  to: string;
  icon?: LucideIcon;
  variant?: "gold" | "ghost";
}

export function WalletCard({
  data,
  actions,
  compact = false,
}: {
  data: WalletBalance;
  actions: WalletAction[];
  compact?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${data.gradient} text-white p-6 sm:p-7 shadow-card`}>
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden className="absolute -left-8 -bottom-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative grid sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-gold" />
            <p className="text-[11px] uppercase tracking-wider font-semibold text-white/75">{data.title}</p>
          </div>
          <p className="mt-1 text-sm text-white/80">{data.accountName} · <span className="text-white/60">{data.accountType}</span></p>
          <p className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            KES {data.available.toLocaleString()}
          </p>
          {!compact && (
            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
              <Stat label="Pending" value={`KES ${data.pending.toLocaleString()}`} />
              <Stat label={data.extraLabel} value={data.extraValue} />
              {data.linkedLabel && <Stat label={data.linkedLabel} value={data.linkedValue ?? "—"} />}
            </dl>
          )}
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
          {actions.map((a) => {
            const Icon = a.icon ?? Plus;
            const gold = a.variant !== "ghost";
            return (
              <Link
                key={a.label}
                to={a.to}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition whitespace-nowrap ${
                  gold
                    ? "bg-gold text-gold-foreground hover:brightness-105"
                    : "bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/20"
                }`}
              >
                <Icon className="h-4 w-4" /> {a.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider font-semibold text-white/55">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-white inline-flex items-center gap-1">
        {value}
        <ArrowUpRight className="h-3 w-3 text-gold/70" />
      </dd>
    </div>
  );
}