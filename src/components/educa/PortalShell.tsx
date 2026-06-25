import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Search,
  Inbox,
  FileText,
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
  IdCard,
  GraduationCap,
  Home,
  Building2,
  Wallet,
  Receipt,
  Award,
  ShoppingBag,
  Shirt,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

type NavItem = {
  label: string;
  to: string;
  icon: typeof Home;
  exact?: boolean;
  badge?: number;
};

const parentNav: NavItem[] = [
  { label: "Dashboard", to: "/parent", icon: LayoutDashboard, exact: true },
  { label: "My Children", to: "/parent/children", icon: Users },
  { label: "Find Schools", to: "/schools", icon: Search },
  { label: "Applications", to: "/parent/applications", icon: Inbox, badge: 3 },
  { label: "Documents", to: "/parent/documents", icon: FileText },
  { label: "EDUCA Wallet", to: "/parent/wallet", icon: Wallet },
  { label: "Fees", to: "/parent/fees", icon: FileText },
  { label: "Payments", to: "/parent/payments", icon: Wallet, badge: 2 },
  { label: "Receipts", to: "/parent/receipts", icon: Receipt },
  { label: "Scholarships", to: "/parent/scholarships", icon: Award },
  { label: "Marketplace", to: "/marketplace", icon: ShoppingBag },
  { label: "Uniform Orders", to: "/parent/uniforms", icon: Shirt },
  { label: "Orders", to: "/parent/orders", icon: Package },
  { label: "Notifications", to: "/parent/notifications", icon: Bell, badge: 2 },
  { label: "Settings", to: "/parent/settings", icon: Settings },
];

const studentNav: NavItem[] = [
  { label: "Dashboard", to: "/student", icon: LayoutDashboard, exact: true },
  { label: "My Profile", to: "/student/profile", icon: IdCard },
  { label: "Find Schools", to: "/schools", icon: Search },
  { label: "Applications", to: "/student/applications", icon: Inbox },
  { label: "Documents", to: "/student/documents", icon: FileText },
  { label: "My Balance", to: "/student/wallet", icon: Wallet },
  { label: "Fees", to: "/student/fees", icon: FileText },
  { label: "Scholarships", to: "/student/scholarships", icon: Award },
  { label: "Marketplace", to: "/marketplace", icon: ShoppingBag },
  { label: "Orders", to: "/student/orders", icon: Package },
  { label: "Notifications", to: "/student/notifications", icon: Bell, badge: 2 },
];

const parentMobileTabs: NavItem[] = [
  { label: "Home", to: "/parent", icon: Home, exact: true },
  { label: "Schools", to: "/schools", icon: Search },
  { label: "Wallet", to: "/parent/wallet", icon: Wallet },
  { label: "Shop", to: "/marketplace", icon: ShoppingBag },
  { label: "Profile", to: "/parent/settings", icon: Settings },
];

const studentMobileTabs: NavItem[] = [
  { label: "Home", to: "/student", icon: Home, exact: true },
  { label: "Schools", to: "/schools", icon: Search },
  { label: "ID", to: "/student/profile", icon: IdCard },
  { label: "Shop", to: "/marketplace", icon: ShoppingBag },
  { label: "Orders", to: "/student/orders", icon: Package },
];

export function PortalShell({
  role,
  title,
  subtitle,
  actions,
  children,
}: {
  role: "parent" | "student";
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = role === "parent" ? parentNav : studentNav;
  const mobileTabs = role === "parent" ? parentMobileTabs : studentMobileTabs;
  const userName = role === "parent" ? "Grace Mwangi" : "Brian Mwangi";
  const userMeta = role === "parent" ? "Parent · Nairobi" : "EDUCA-STU-000123";
  const initials = role === "parent" ? "GM" : "BM";

  return (
    <div className="min-h-screen bg-muted/40 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 bg-sidebar text-sidebar-foreground flex-col fixed inset-y-0 left-0">
        <SidebarInner nav={nav} role={role} pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-sidebar text-sidebar-foreground flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-lg bg-white/5 text-white"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarInner
              nav={nav}
              role={role}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex-1 lg:pl-72 min-w-0 pb-20 lg:pb-0">
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
                placeholder="Search schools, applications, documents…"
                className="w-full h-10 rounded-xl bg-muted/60 border border-transparent focus:border-primary focus:bg-white outline-none pl-9 pr-3 text-sm transition"
              />
            </div>

            <div className="flex-1 md:hidden" />

            <div className="flex items-center gap-2">
              <Link
                to={role === "parent" ? "/parent/notifications" : "/student/notifications"}
                className="h-10 w-10 grid place-items-center rounded-xl hover:bg-muted relative"
              >
                <Bell className="h-5 w-5 text-foreground/70" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold ring-2 ring-white" />
              </Link>
              <div className="hidden sm:flex items-center gap-2 pl-2 ml-1 border-l border-border">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white text-sm font-semibold">
                  {initials}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-navy">{userName}</p>
                  <p className="text-[11px] text-muted-foreground">{userMeta}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 pt-7 pb-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">{title}</h1>
              {subtitle && (
                <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
          </div>
        </div>

        <main className="px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-navy text-white/80 border-t border-white/10">
        <ul className="grid grid-cols-5">
          {mobileTabs.map((t) => {
            const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <li key={t.to}>
                <Link
                  to={t.to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium",
                    active ? "text-gold" : "text-white/65 hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function SidebarInner({
  nav,
  role,
  pathname,
  onNavigate,
}: {
  nav: NavItem[];
  role: "parent" | "student";
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Logo tone="light" />
      </div>
      <div className="px-4 py-5">
        <Link
          to={role === "parent" ? "/parent/apply" : "/student/schools"}
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-gold text-gold-foreground font-semibold text-sm py-2.5 hover:brightness-105 transition"
        >
          {role === "parent" ? (
            <>
              <GraduationCap className="h-4 w-4" /> Start Application
            </>
          ) : (
            <>
              <Building2 className="h-4 w-4" /> Find a School
            </>
          )}
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-0.5">
        <p className="px-3 pt-2 pb-2 text-[11px] uppercase tracking-wider text-white/40 font-semibold">
          {role === "parent" ? "Parent Workspace" : "Student Workspace"}
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
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition",
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
        <p className="text-xs font-semibold text-gold">EDUCA Tip</p>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">
          {role === "parent"
            ? "Complete your child's profile to unlock faster admissions."
            : "Keep your documents up to date to apply with one tap."}
        </p>
      </div>
    </>
  );
}