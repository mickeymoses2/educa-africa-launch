import { cn } from "@/lib/utils";
import { payStatusBadge, type PayStatus } from "@/data/educa";

export function PayStatusBadge({ status, className }: { status: PayStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", payStatusBadge[status], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}