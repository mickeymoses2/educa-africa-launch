import type { Deal } from "@/data/educa";
import { Sparkles } from "lucide-react";

export function DealCard({ d }: { d: Deal }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${d.gradient} text-white p-5 relative overflow-hidden`}>
      <div aria-hidden className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white/15 ring-1 ring-white/25 rounded-full px-2 py-1">
          <Sparkles className="h-3 w-3 text-gold" /> {d.badge}
        </span>
        <h3 className="mt-3 font-display font-bold text-lg">{d.title}</h3>
        <p className="text-sm text-white/80 mt-1">{d.description}</p>
      </div>
    </div>
  );
}