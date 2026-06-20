import { Link } from "@tanstack/react-router";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const text = tone === "light" ? "text-white" : "text-navy";
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-teal grid place-items-center shadow-glow">
        <span className="font-display font-bold text-white text-lg leading-none">E</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-white/10" />
      </div>
      <div className={`flex flex-col leading-none ${text}`}>
        <span className="font-display font-bold text-base tracking-tight">EDUCA</span>
        <span className="text-[10px] font-medium opacity-70 tracking-[0.18em] uppercase">Africa</span>
      </div>
    </Link>
  );
}