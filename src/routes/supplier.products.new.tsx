import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { SupplierShell } from "@/components/educa/SupplierShell";
import { productCategories } from "@/data/educa";

export const Route = createFileRoute("/supplier/products/new")({
  head: () => ({ meta: [{ title: "Add Product · EDUCA Supplier" }] }),
  component: () => (
    <SupplierShell title="Add a New Product" subtitle="Add product details so schools and parents can discover and buy from you.">
      <Link to="/supplier/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5"><ArrowLeft className="h-4 w-4" /> Back to Products</Link>
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <Section title="Basic Info">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Product Name" />
              <Select label="Category" options={productCategories.map((c) => c.key)} />
              <Field label="Price (KES)" type="number" />
              <Field label="Stock Quantity" type="number" />
            </div>
            <label className="block mt-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Description</span>
              <textarea rows={4} className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm" />
            </label>
          </Section>
          <Section title="Variants">
            <Field label="Sizes (comma separated)" placeholder="S, M, L, XL" />
          </Section>
          <Section title="Logistics">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Supplier Location" defaultValue="Nairobi, Kenya" />
              <Select label="Delivery Options" options={["Home Delivery", "School Pickup", "Supplier Pickup", "All"]} />
            </div>
          </Section>
        </div>
        <aside className="space-y-3 h-fit">
          <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-8 text-center">
            <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-semibold text-navy">Upload product images</p>
            <p className="text-xs text-muted-foreground">PNG or JPG up to 5MB each</p>
            <button className="mt-3 rounded-xl bg-navy text-white text-xs font-semibold px-4 py-2">Choose files</button>
          </div>
          <button className="w-full rounded-xl bg-gold text-gold-foreground font-semibold py-3">Publish Product</button>
          <button className="w-full rounded-xl border border-border font-semibold py-3">Save as Draft</button>
        </aside>
      </div>
    </SupplierShell>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl bg-card border border-border shadow-soft p-5"><h3 className="font-display font-bold text-navy mb-4">{title}</h3>{children}</section>;
}
function Field({ label, type = "text", placeholder, defaultValue }: { label: string; type?: string; placeholder?: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <input type={type} placeholder={placeholder} defaultValue={defaultValue} className="mt-1.5 w-full h-11 rounded-xl border border-border px-4 text-sm" />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <select className="mt-1.5 w-full h-11 rounded-xl border border-border px-3 text-sm">{options.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  );
}