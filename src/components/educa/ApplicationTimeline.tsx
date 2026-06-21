import { Check, Clock, FileText, GraduationCap, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
  date?: string;
  state: "done" | "current" | "upcoming";
  icon: typeof Check;
};

export function ApplicationTimeline({ steps }: { steps?: Step[] }) {
  const data: Step[] = steps ?? [
    { title: "Application Submitted", description: "Your application reached the school.", date: "18 Jun 2026", state: "done", icon: Send },
    { title: "Documents Received", description: "All required documents verified.", date: "19 Jun 2026", state: "done", icon: FileText },
    { title: "Under Review", description: "Admissions team is assessing the application.", date: "20 Jun 2026", state: "current", icon: Clock },
    { title: "Decision Pending", description: "Final review by the head of admissions.", state: "upcoming", icon: Check },
    { title: "Final Decision", description: "You'll be notified once a decision is made.", state: "upcoming", icon: GraduationCap },
  ];

  return (
    <ol className="relative">
      {data.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
            {i < data.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[19px] top-10 bottom-0 w-px",
                  s.state === "done" ? "bg-teal" : "bg-border",
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 h-10 w-10 shrink-0 rounded-full grid place-items-center ring-4 ring-background",
                s.state === "done" && "bg-teal text-white",
                s.state === "current" && "bg-primary text-primary-foreground shadow-glow",
                s.state === "upcoming" && "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={cn(
                    "font-display font-semibold",
                    s.state === "upcoming" ? "text-muted-foreground" : "text-navy",
                  )}
                >
                  {s.title}
                </p>
                {s.date && (
                  <span className="text-[11px] text-muted-foreground rounded-full bg-muted px-2 py-0.5">
                    {s.date}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}