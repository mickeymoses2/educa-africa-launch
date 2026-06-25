import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  UserPlus,
  GraduationCap,
  UploadCloud,
  Users,
  Inbox,
  FileText,
  Bell,
  ArrowRight,
  Sparkles,
  Plus,
  Receipt,
  ShoppingBag,
} from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { WalletCard } from "@/components/educa/WalletCard";
import { SummaryCard } from "@/components/educa/SummaryCard";
import { QuickActionCard } from "@/components/educa/QuickActionCard";
import { ChildCard } from "@/components/educa/ChildCard";
import { ApplicationCard } from "@/components/educa/ApplicationCard";
import { SchoolCard } from "@/components/educa/SchoolCard";
import { NotificationCard } from "@/components/educa/NotificationCard";
import {
  children,
  myApplications,
  notifications,
  featuredSchools,
  walletBalances,
} from "@/data/educa";

export const Route = createFileRoute("/parent/")({
  head: () => ({ meta: [{ title: "Parent Dashboard · EDUCA Africa" }] }),
  component: ParentDashboard,
});

function ParentDashboard() {
  const greeting = "Good morning, Grace";
  return (
    <PortalShell
      role="parent"
      title={greeting}
      subtitle="Manage your child's education journey from one place."
      actions={
        <Link
          to="/parent/apply"
          className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
        >
          <GraduationCap className="h-4 w-4" /> Start Application
        </Link>
      }
    >
      {/* EDUCA Wallet */}
      <div className="mb-8">
        <WalletCard
          data={walletBalances.parent}
          actions={[
            { label: "Deposit Money", to: "/parent/wallet/deposit", icon: Plus },
            { label: "Pay Fees", to: "/parent/payments", icon: Receipt, variant: "ghost" },
            { label: "Shop Now", to: "/marketplace", icon: ShoppingBag, variant: "ghost" },
          ]}
        />
      </div>

      {/* Search hero */}
      <div className="relative overflow-hidden rounded-3xl bg-navy text-white p-6 sm:p-8 mb-8">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
        </div>
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] font-medium">
            <Sparkles className="h-3 w-3 text-gold" /> Discovery
          </span>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold leading-tight">
            Find the right school for your child.
          </h2>
          <div className="mt-5 flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-card">
            <div className="flex-1 flex items-center gap-2 pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search schools by name, county, curriculum or level"
                className="flex-1 bg-transparent outline-none text-sm py-2.5 text-navy placeholder:text-muted-foreground"
              />
            </div>
            <Link
              to="/schools"
              className="rounded-xl bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-105 transition"
            >
              Search
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickActionCard
          icon={UserPlus}
          title="Add Child"
          description="Create a learner profile linked to your account."
          to="/parent/children/new"
          tone="primary"
        />
        <QuickActionCard
          icon={Search}
          title="Find School"
          description="Discover vetted schools across Africa."
          to="/schools"
          tone="teal"
        />
        <QuickActionCard
          icon={GraduationCap}
          title="Start Application"
          description="Apply to a school in a few simple steps."
          to="/parent/apply"
          tone="gold"
        />
        <QuickActionCard
          icon={UploadCloud}
          title="Upload Documents"
          description="Manage required documents in one place."
          to="/parent/documents"
          tone="navy"
        />
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <SummaryCard label="Linked Children" value={children.length} icon={Users} tone="primary" />
        <SummaryCard label="Active Applications" value={myApplications.length} icon={Inbox} tone="teal" />
        <SummaryCard label="Pending Documents" value={1} icon={FileText} tone="gold" />
        <SummaryCard label="Recent Updates" value={notifications.filter((n) => !n.read).length} icon={Bell} tone="muted" />
      </div>

      {/* My children */}
      <Section
        title="My Children"
        subtitle="Learner profiles linked to your account."
        link={{ to: "/parent/children", label: "Manage all" }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {children.map((c) => (
            <ChildCard key={c.id} child={c} />
          ))}
        </div>
      </Section>

      {/* Recent applications */}
      <Section
        title="Recent Applications"
        subtitle="Track the status of your latest submissions."
        link={{ to: "/parent/applications", label: "View all" }}
      >
        <div className="grid lg:grid-cols-2 gap-4">
          {myApplications.slice(0, 2).map((a) => (
            <ApplicationCard key={a.id} app={a} />
          ))}
        </div>
      </Section>

      {/* Recommended schools */}
      <Section
        title="Recommended Schools"
        subtitle="Curated for your child's curriculum and level."
        link={{ to: "/parent/schools", label: "Explore all" }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSchools.slice(0, 3).map((s) => (
            <SchoolCard key={s.name} school={s} />
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section
        title="Notifications"
        subtitle="Latest updates on your applications."
        link={{ to: "/parent/notifications", label: "See all" }}
      >
        <div className="grid gap-3">
          {notifications.slice(0, 3).map((n) => (
            <NotificationCard key={n.id} n={n} />
          ))}
        </div>
      </Section>
    </PortalShell>
  );
}

function Section({
  title,
  subtitle,
  link,
  children: kids,
}: {
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {link && (
          <Link
            to={link.to}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary whitespace-nowrap hover:gap-2 transition-all"
          >
            {link.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {kids}
    </section>
  );
}