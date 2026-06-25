import { createFileRoute } from "@tanstack/react-router";
import { LogisticsShell } from "@/components/educa/LogisticsShell";

export const Route = createFileRoute("/logistics/settings")({
  head: () => ({ meta: [{ title: "Settings · Logistics" }] }),
  component: () => (
    <LogisticsShell title="Settings" subtitle="Manage your partner profile, capacity and payout details.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Business Profile">
          <Field label="Business name" defaultValue="SwiftEdu Deliveries" />
          <Field label="Contact person" defaultValue="Daniel Kamau" />
          <Field label="Phone number" defaultValue="+254 722 880 110" />
          <Field label="Email" defaultValue="ops@swiftedu.co.ke" />
        </Section>
        <Section title="Capacity & Coverage">
          <Field label="Vehicle type" defaultValue="Motorbike" />
          <Field label="Number of riders" defaultValue="12" />
          <Field label="Delivery capacity" defaultValue="Up to 15kg per trip" />
          <Field label="Operating areas" defaultValue="Nairobi, Kiambu" />
        </Section>
        <Section title="Payout Account">
          <Field label="Bank" defaultValue="Equity Bank" />
          <Field label="Account number" defaultValue="0100200300400" />
          <Field label="Account name" defaultValue="SwiftEdu Deliveries Ltd" />
        </Section>
      </div>
    </LogisticsShell>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card border border-border shadow-soft p-6 space-y-4">
      <h3 className="font-display font-bold text-navy">{title}</h3>
      {children}
    </section>
  );
}
function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <input defaultValue={defaultValue} className="mt-1.5 w-full h-11 rounded-xl border border-border px-4 text-sm" />
    </label>
  );
}