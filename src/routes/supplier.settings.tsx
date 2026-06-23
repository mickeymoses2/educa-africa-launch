import { createFileRoute } from "@tanstack/react-router";
import { SupplierShell } from "@/components/educa/SupplierShell";

export const Route = createFileRoute("/supplier/settings")({
  head: () => ({ meta: [{ title: "Settings · EDUCA Supplier" }] }),
  component: () => (
    <SupplierShell title="Supplier Settings" subtitle="Update your business profile, banking and delivery preferences.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Business Profile">
          <Field label="Business Name" defaultValue="Asili Uniforms Ltd" />
          <Field label="Category" defaultValue="Uniforms · Sportswear" />
          <Field label="Contact Email" defaultValue="hello@asiliuniforms.co.ke" />
          <Field label="Phone" defaultValue="+254 722 000 111" />
        </Section>
        <Section title="Delivery & Logistics">
          <Field label="Pickup Location" defaultValue="Industrial Area, Nairobi" />
          <Field label="Delivery Lead Time" defaultValue="2–3 days" />
          <Field label="Service Areas" defaultValue="Nairobi · Kiambu · Machakos" />
        </Section>
        <Section title="Banking (Placeholder)">
          <p className="text-sm text-muted-foreground">Payouts will be managed via EDUCA Pay once enabled.</p>
        </Section>
      </div>
    </SupplierShell>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl bg-card border border-border shadow-soft p-5 space-y-3"><h3 className="font-display font-bold text-navy">{title}</h3>{children}</section>;
}
function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <input defaultValue={defaultValue} className="mt-1.5 w-full h-11 rounded-xl border border-border px-4 text-sm" />
    </label>
  );
}