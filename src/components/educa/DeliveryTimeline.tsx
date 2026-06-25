import { Check, Circle } from "lucide-react";
import { deliveryStages, type DeliveryStatus } from "@/data/educa";
import { cn } from "@/lib/utils";

export function DeliveryTimeline({ status }: { status: DeliveryStatus }) {
  if (status === "Failed") {
    return <div className="rounded-2xl bg-destructive/10 text-destructive p-4 text-sm font-semibold">Delivery failed — needs attention.</div>;
  }
  const stages: DeliveryStatus[] = ["Pending Assignment", ...deliveryStages];
  const idx = stages.indexOf(status);
  return (
    <ol className="space-y-4">
      {stages.map((stage, i) => {
        const done = i <= idx;
        const active = i === idx;
        return (
          <li key={stage} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn("h-8 w-8 rounded-full grid place-items-center ring-2", done ? "bg-teal text-white ring-teal" : "bg-white text-muted-foreground ring-border")}>
                {done ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
              </div>
              {i < stages.length - 1 && <div className={cn("w-px flex-1 my-1", done ? "bg-teal/50" : "bg-border")} />}
            </div>
            <div className="pb-4">
              <p className={cn("text-sm font-semibold", active ? "text-navy" : done ? "text-foreground" : "text-muted-foreground")}>{stage}</p>
              {active && <p className="text-xs text-muted-foreground mt-0.5">Current — updated moments ago</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}