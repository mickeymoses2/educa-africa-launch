import type { LucideIcon } from "lucide-react";

export function StatPill({ label, value, icon: Icon, tone = "primary" }: { label: string; value: string | number; icon: LucideIcon; tone?: "primary" | "teal" | "gold" | "success" | "destructive" | "info" }) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    teal: "bg-teal/15 text-teal-foreground",
    gold: "bg-gold/20 text-gold-foreground",
    success: "bg-success/15 text-success-foreground",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
  };
  return (
    <div className="rounded-2xl bg-card border border-border shadow-soft p-4 flex items-center gap-3">
      <div className={`h-10 w-10 rounded-xl grid place-items-center ${tones[tone]}`}><Icon className="h-5 w-5" /></div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        <p className="font-display font-bold text-navy text-lg">{value}</p>
      </div>
    </div>
  );
}