import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-muted/30 p-10 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-white border border-border grid place-items-center text-primary shadow-soft">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}