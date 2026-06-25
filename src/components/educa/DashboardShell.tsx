import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  School,
  Images,
  ClipboardList,
  GraduationCap,
  Inbox,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Plus,
  Wallet,
  Shirt,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const nav = [
  { label: "Overview", to: "/school" as const, icon: LayoutDashboard, exact: true },
  { label: "School Profile", to: "/school/profile" as const, icon: School },
  { label: "Gallery", to: "/school/gallery" as const, icon: Images },
  { label: "Admission Requirements", to: "/school/requirements" as const, icon: ClipboardList },
  { label: "Classes & Levels", to: "/school/classes" as const, icon: GraduationCap },
  { label: "Applications", to: "/school/applications" as const, icon: Inbox, badge: 12 },
  { label: "Fee Structures", to: "/school/fees" as const, icon: BarChart3 },
  { label: "School Wallet", to: "/school/wallet" as const, icon: Wallet },
  { label: "Payments", to: "/school/payments" as const, icon: Wallet },
  { label: "Uniform Requirements", to: "/school/uniforms" as const, icon: Shirt },
  { label: "Approved Suppliers", to: "/school/suppliers" as const, icon: Store },
  { label: "Reports", to: "/school/reports" as const, icon: BarChart3 },
  { label: "Settings", to: "/school/settings" as const, icon: Settings },
];

export function DashboardShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/40 flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-72 shrink-0 bg-sidebar text-sidebar-foreground flex-col fixed inset-y-0 left-0">
        <SidebarInner pathname={pathname} />
      </aside>

      {/* Sidebar (mobile drawer) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-sidebar text-sidebar-foreground flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-lg bg-white/5 text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarInner pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:pl-72 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-9 w-9 grid place-items-center rounded-lg bg-muted text-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden md:flex flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search applicants, classes, documents…"
                className="w-full h-10 rounded-xl bg-muted/60 border border-transparent focus:border-primary focus:bg-white outline-none pl-9 pr-3 text-sm transition"
              />
            </div>

            <div className="flex-1 md:hidden" />

            <div className="flex items-center gap-2">
              <button className="h-10 w-10 grid place-items-center rounded-xl hover:bg-muted relative">
                <Bell className="h-5 w-5 text-foreground/70" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold ring-2 ring-white" />
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-2 ml-1 border-l border-border">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-sm font-semibold">
                  KA
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-navy">Kilimani Academy</p>
                  <p className="text-[11px] text-muted-foreground">Admissions Officer · Nairobi</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Page header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-7 pb-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">{title}</h1>
              {subtitle && <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
          </div>
        </div>

        <main className="px-4 sm:px-6 lg:px-8 py-6 pb-20">{children}</main>
      </div>
    </div>
  );
}

function SidebarInner({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Logo tone="light" />
      </div>
      <div className="px-4 py-5">
        <Link
          to="/school/onboarding"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-gold text-gold-foreground font-semibold text-sm py-2.5 hover:brightness-105 transition"
        >
          <Plus className="h-4 w-4" /> New Onboarding
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-0.5">
        <p className="px-3 pt-2 pb-2 text-[11px] uppercase tracking-wider text-white/40 font-semibold">
          Workspace
        </p>
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition group",
                active
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-white/70 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className={cn("h-[18px] w-[18px]", active ? "text-gold" : "text-white/60")} />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-gold text-gold-foreground text-[10px] font-bold px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="m-4 p-4 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-xs font-semibold text-gold">Pro Tip</p>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">
          Complete your school profile to appear in public discovery results.
        </p>
      </div>
    </>
  );
}