import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Home", to: "/" as const },
  { label: "Browse Schools", to: "/schools" as const },
  { label: "Marketplace", to: "/marketplace" as const },
  { label: "For Schools", to: "/school/onboarding" as const },
  { label: "For Suppliers", to: "/supplier" as const },
  { label: "Parents", to: "/parent" as const },
  { label: "Students", to: "/student" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between gap-6">
        <Logo tone="light" />

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-full hover:bg-white/5 transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-white/90 hover:text-white px-4 py-2 transition">
            Login
          </Link>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
          >
            Get Started
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden h-10 w-10 grid place-items-center rounded-xl bg-white/10 text-white hover:bg-white/15"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mx-5 mt-3 rounded-2xl bg-navy/95 backdrop-blur-md border border-white/10 p-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-white/85 hover:text-white rounded-lg hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-white/10 mt-2">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center text-sm font-medium text-white/90 px-4 py-2.5 rounded-lg bg-white/5">
              Login
            </Link>
            <Link
              to="/get-started"
              onClick={() => setOpen(false)}
              className="flex-1 text-center rounded-lg bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}