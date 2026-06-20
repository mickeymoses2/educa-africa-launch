import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({
  steps,
  current,
  onStep,
}: {
  steps: string[];
  current: number;
  onStep?: (i: number) => void;
}) {
  return (
    <ol className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex-1 flex items-center gap-3 sm:gap-2">
            <button
              type="button"
              onClick={() => onStep?.(i)}
              className={cn(
                "h-9 w-9 shrink-0 rounded-full grid place-items-center font-semibold text-sm ring-2 transition",
                done && "bg-teal text-white ring-teal",
                active && "bg-primary text-primary-foreground ring-primary shadow-glow",
                !done && !active && "bg-white text-muted-foreground ring-border",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </button>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-xs uppercase tracking-wide font-semibold",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                Step {i + 1}
              </p>
              <p className={cn("text-sm font-medium truncate", active ? "text-navy" : "text-foreground/80")}>
                {label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden sm:block h-px flex-1 bg-border mx-2" />
            )}
          </li>
        );
      })}
    </ol>
  );
}