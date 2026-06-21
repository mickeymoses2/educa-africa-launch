import { IdCard, QrCode } from "lucide-react";
import type { Child } from "@/data/educa";

export function StudentIdCard({ child }: { child: Child }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-navy text-white p-6 shadow-card">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal/25 blur-3xl" />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-teal grid place-items-center">
            <span className="font-display font-bold text-white text-sm">E</span>
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-white/80">
            EDUCA · Student ID
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider rounded-full bg-gold text-gold-foreground px-2 py-0.5 font-bold">
          Active
        </span>
      </div>

      <div className="relative mt-7 flex items-center gap-4">
        <div
          className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${child.avatarTone} grid place-items-center text-white font-display font-bold text-2xl ring-2 ring-white/20`}
        >
          {child.initials}
        </div>
        <div className="min-w-0">
          <p className="font-display text-xl font-bold leading-tight truncate">{child.name}</p>
          <p className="text-xs text-white/65 mt-1 flex items-center gap-1.5">
            <IdCard className="h-3.5 w-3.5" /> {child.educaId}
          </p>
          <p className="text-xs text-white/65">{child.currentClass} · {child.curriculum}</p>
        </div>
      </div>

      <div className="relative mt-7 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">Guardian</p>
          <p className="text-sm font-semibold text-white">{child.guardian}</p>
        </div>
        <div className="h-16 w-16 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center">
          <QrCode className="h-9 w-9 text-white/80" />
        </div>
      </div>
    </div>
  );
}