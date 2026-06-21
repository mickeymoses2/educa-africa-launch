import {
  Bell,
  CheckCircle2,
  FileText,
  Clock,
  Send,
  Sparkles,
  UserCheck,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/data/educa";

const map: Record<AppNotification["type"], { Icon: typeof Bell; tone: string }> = {
  submitted: { Icon: Send, tone: "bg-info/10 text-info" },
  review: { Icon: Clock, tone: "bg-primary/10 text-primary" },
  documents: { Icon: FileText, tone: "bg-warning/20 text-warning-foreground" },
  accepted: { Icon: CheckCircle2, tone: "bg-success/15 text-success-foreground" },
  rejected: { Icon: XCircle, tone: "bg-destructive/10 text-destructive" },
  profile: { Icon: UserCheck, tone: "bg-teal/15 text-teal-foreground" },
  recommendation: { Icon: Sparkles, tone: "bg-gold/25 text-gold-foreground" },
};

export function NotificationCard({ n }: { n: AppNotification }) {
  const { Icon, tone } = map[n.type];
  return (
    <article
      className={cn(
        "rounded-2xl border p-4 sm:p-5 flex gap-4 transition",
        n.read ? "bg-card border-border" : "bg-white border-primary/20 shadow-soft",
      )}
    >
      <div className={cn("h-11 w-11 shrink-0 rounded-xl grid place-items-center", tone)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-display font-semibold text-navy">{n.title}</h4>
          {!n.read && <span className="h-2 w-2 rounded-full bg-gold" aria-label="Unread" />}
          <span className="ml-auto text-[11px] text-muted-foreground">{n.time}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.description}</p>
        {n.action && (
          <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all">
            {n.action}
          </button>
        )}
      </div>
    </article>
  );
}