import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Upload, Eye, Save, MapPin, Phone, Mail, Globe } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";

export const Route = createFileRoute("/school/profile")({
  head: () => ({ meta: [{ title: "School Profile · EDUCA" }] }),
  component: ProfileEditor,
});

const inputCls =
  "w-full h-11 rounded-xl border border-border bg-white px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card border border-border shadow-soft p-6 sm:p-7">
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
        {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

function ProfileEditor() {
  return (
    <DashboardShell
      title="School profile"
      subtitle="Edit how your school appears to parents and applicants on EDUCA."
      actions={
        <>
          <Link
            to="/school/preview"
            className="inline-flex items-center gap-2 rounded-xl ring-1 ring-border text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted transition"
          >
            <Eye className="h-4 w-4" /> Public preview
          </Link>
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition">
            <Save className="h-4 w-4" /> Save changes
          </button>
        </>
      }
    >
      {/* Cover & logo */}
      <Section title="Branding" desc="Your logo and hero image power your public profile.">
        <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 via-teal/15 to-gold/15 h-44 sm:h-56 border border-border overflow-hidden grid place-items-center">
          <button className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur text-navy px-4 py-2 text-sm font-semibold shadow-soft">
            <Camera className="h-4 w-4" /> Replace cover image
          </button>
        </div>
        <div className="-mt-12 ml-6 flex items-end gap-4">
          <div className="h-24 w-24 rounded-2xl bg-white border-4 border-white shadow-card grid place-items-center font-display font-bold text-2xl text-navy">
            KA
          </div>
          <button className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Upload className="h-4 w-4" /> Upload new logo
          </button>
        </div>
      </Section>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Section title="About the school">
            <Field label="School name"><input className={inputCls} defaultValue="Kilimani Academy" /></Field>
            <div className="mt-4">
              <Field label="About">
                <textarea rows={5} className={inputCls + " h-auto py-3"} defaultValue="Kilimani Academy is a modern co-educational institution combining the Kenyan CBC with Cambridge international pathways. We nurture curious, confident learners ready for a global future." />
              </Field>
            </div>
          </Section>

          <Section title="Curriculum & facilities">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Curriculum"><input className={inputCls} defaultValue="CBC · IGCSE" /></Field>
              <Field label="School level"><input className={inputCls} defaultValue="Primary & Secondary" /></Field>
            </div>
            <div className="mt-4">
              <span className="text-sm font-semibold text-navy">Facilities</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Science labs", "Library", "Sports field", "Swimming pool", "Dining hall", "ICT lab"].map((f) => (
                  <span key={f} className="rounded-full bg-teal/15 text-teal-foreground px-3 py-1 text-xs font-medium">{f}</span>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Fees overview">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Pre-Primary"><input className={inputCls} defaultValue="KES 180,000 / term" /></Field>
              <Field label="Primary"><input className={inputCls} defaultValue="KES 220,000 / term" /></Field>
              <Field label="Secondary"><input className={inputCls} defaultValue="KES 280,000 / term" /></Field>
            </div>
          </Section>

          <Section title="Admission requirements">
            <textarea rows={4} className={inputCls + " h-auto py-3"} defaultValue="Completed application form, birth certificate, last 2 academic reports, immunisation record, and one passport photo." />
          </Section>

          <Section title="School gallery">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-video rounded-xl bg-gradient-to-br from-muted to-primary/10 border border-border" />
              ))}
              <button className="aspect-video rounded-xl border-2 border-dashed border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 grid place-items-center text-sm font-semibold text-primary transition">
                + Add photo
              </button>
            </div>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Location">
            <Field label="Address"><input className={inputCls} defaultValue="Kilimani, Nairobi" /></Field>
            <div className="mt-4 h-44 rounded-xl bg-gradient-to-br from-primary/10 via-teal/10 to-gold/10 border border-border grid place-items-center text-muted-foreground">
              <div className="text-center"><MapPin className="h-6 w-6 mx-auto" /><p className="text-xs mt-2">Map preview</p></div>
            </div>
          </Section>

          <Section title="Contact">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-primary" /><input className={inputCls} defaultValue="+254 700 000 000" /></div>
              <div className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-primary" /><input className={inputCls} defaultValue="admissions@kilimani.ac.ke" /></div>
              <div className="flex items-center gap-2.5"><Globe className="h-4 w-4 text-primary" /><input className={inputCls} defaultValue="kilimani.ac.ke" /></div>
            </div>
          </Section>

          <Section title="Public preview" desc="See your live profile.">
            <Link to="/school/preview" className="block text-center w-full rounded-xl bg-navy text-white px-4 py-3 text-sm font-semibold hover:brightness-110 transition">
              Open public profile
            </Link>
          </Section>
        </div>
      </div>
    </DashboardShell>
  );
}