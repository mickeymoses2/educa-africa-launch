import { cn } from "@/lib/utils";

export type Status =
  | "Submitted"
  | "Under Review"
  | "Pending Documents"
  | "Accepted"
  | "Rejected"
  | "Waitlisted";

const styles: Record<Status, string> = {
  Submitted: "bg-info/10 text-info ring-info/20",
  "Under Review": "bg-primary/10 text-primary ring-primary/20",
  "Pending Documents": "bg-warning/15 text-warning-foreground ring-warning/30",
  Accepted: "bg-success/15 text-success-foreground ring-success/30",
  Rejected: "bg-destructive/10 text-destructive ring-destructive/20",
  Waitlisted: "bg-muted text-muted-foreground ring-border",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}