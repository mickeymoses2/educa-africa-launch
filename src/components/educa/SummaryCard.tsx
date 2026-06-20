import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SummaryCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  tone?: "primary" | "teal" | "gold" | "muted" | "success" | "destructive";
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    teal: "bg-teal/15 text-teal-foreground",
    gold: "bg-gold/20 text-gold-foreground",
    muted: "bg-muted text-muted-foreground",
    success: "bg-success/15 text-success-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-card transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-navy tracking-tight">{value}</p>
          {delta && <p className="mt-1 text-xs text-success-foreground font-medium">{delta}</p>}
        </div>
        <div className={cn("h-11 w-11 shrink-0 rounded-xl grid place-items-center", tones[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}