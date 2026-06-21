import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuickActionCard({
  icon: Icon,
  title,
  description,
  to,
  tone = "primary",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  tone?: "primary" | "teal" | "gold" | "navy";
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    teal: "bg-teal/15 text-teal-foreground",
    gold: "bg-gold/25 text-gold-foreground",
    navy: "bg-navy text-white",
  } as const;

  return (
    <Link
      to={to}
      className="group rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition block"
    >
      <div className={cn("h-12 w-12 rounded-xl grid place-items-center mb-4", tones[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
        Go <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}