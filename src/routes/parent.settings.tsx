import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/educa/PortalShell";

export const Route = createFileRoute("/parent/settings")({
  head: () => ({ meta: [{ title: "Account Settings · EDUCA" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <PortalShell
      role="parent"
      title="Account Settings"
      subtitle="Manage your profile, notifications and security preferences."
    >
      <div className="grid lg:grid-cols-2 gap-5">
        <Card title="Profile">
          <Field label="Full name" value="Grace Mwangi" />
          <Field label="Email" value="grace.m@email.com" />
          <Field label="Phone" value="+254 722 110 220" />
          <Field label="Location" value="Nairobi, Kenya" />
        </Card>
        <Card title="Notifications">
          <Toggle label="Email updates on applications" on />
          <Toggle label="SMS alerts for urgent updates" on />
          <Toggle label="Weekly school recommendations" />
          <Toggle label="Marketing & product news" />
        </Card>
        <Card title="Security">
          <Field label="Password" value="••••••••••" />
          <Toggle label="Two-factor authentication" />
        </Card>
        <Card title="Linked accounts">
          <p className="text-sm text-muted-foreground">
            Connect your student or partner accounts to share access. Coming soon.
          </p>
        </Card>
      </div>
    </PortalShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
      <h3 className="font-display font-semibold text-navy text-lg">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <input
        defaultValue={value}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </label>
  );
}

function Toggle({ label, on = false }: { label: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/40 px-4 py-3">
      <span className="text-sm font-medium text-navy">{label}</span>
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${on ? "bg-teal" : "bg-border"}`}
      >
        <span className={`h-5 w-5 rounded-full bg-white shadow transition transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </span>
    </div>
  );
}