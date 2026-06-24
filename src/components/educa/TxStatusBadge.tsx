import { txStatusBadge, type TxStatus } from "@/data/educa";
import { cn } from "@/lib/utils";

export function TxStatusBadge({ status, className }: { status: TxStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", txStatusBadge[status], className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}