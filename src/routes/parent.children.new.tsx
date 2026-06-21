import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ImagePlus, Save, GraduationCap } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";

export const Route = createFileRoute("/parent/children/new")({
  head: () => ({ meta: [{ title: "Add Child · EDUCA" }] }),
  component: AddChildPage,
});

function AddChildPage() {
  return (
    <PortalShell
      role="parent"
      title="Add a Child Profile"
      subtitle="Create a verified learner profile that travels with your child through their education journey."
    >
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <form className="space-y-6">
          <FormCard
            title="Basic Student Information"
            description="Your child's personal details."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" placeholder="Brian Mwangi" />
              <Field label="Date of birth" type="date" />
              <Select label="Gender">
                <option>Female</option>
                <option>Male</option>
                <option>Prefer not to say</option>
              </Select>
              <Field label="Nationality" placeholder="Kenyan" />
            </div>
            <div className="mt-4">
              <span className="text-sm font-semibold text-navy">Student photo</span>
              <div className="mt-1.5 flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-muted border border-dashed border-border grid place-items-center text-muted-foreground">
                  <ImagePlus className="h-6 w-6" />
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Upload photo
                </button>
              </div>
            </div>
          </FormCard>

          <FormCard
            title="Education Information"
            description="Current schooling and what you're applying for."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Current school" placeholder="Kileleshwa Primary" />
              <Field label="Current class / grade" placeholder="Grade 6" />
              <Field label="Desired class / grade" placeholder="Form 1" />
              <Select label="Education level">
                <option>Pre-Primary</option>
                <option>Primary</option>
                <option>Junior Secondary</option>
                <option>Senior Secondary</option>
              </Select>
              <Select label="Preferred curriculum">
                <option>CBC</option>
                <option>8-4-4</option>
                <option>Cambridge / IGCSE</option>
                <option>IB</option>
                <option>American</option>
              </Select>
            </div>
          </FormCard>

          <FormCard
            title="Guardian Link"
            description="This child will be linked to your account."
          >
            <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-white font-semibold">
                GM
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy text-sm">Grace Mwangi</p>
                <p className="text-xs text-muted-foreground">Parent · Nairobi, Kenya</p>
              </div>
              <span className="ml-auto text-[11px] font-semibold uppercase tracking-wider rounded-full bg-success/15 text-success-foreground px-2 py-1">
                Linked
              </span>
            </div>
          </FormCard>

          <FormCard
            title="Additional Information"
            description="Optional but helpful for school matching."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Birth certificate number" placeholder="Optional" />
              <Field label="Special needs information" placeholder="Optional" />
            </div>
            <div className="mt-4">
              <label className="block">
                <span className="text-sm font-semibold text-navy">Medical notes</span>
                <textarea
                  rows={3}
                  placeholder="Allergies, ongoing conditions, etc. (optional)"
                  className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
                />
              </label>
            </div>
          </FormCard>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-muted text-navy font-semibold py-3 px-5 hover:bg-muted/70 transition"
            >
              <Save className="h-4 w-4" /> Save Profile
            </button>
            <Link
              to="/parent/apply"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold py-3 px-5 shadow-glow hover:brightness-105 transition"
            >
              <GraduationCap className="h-4 w-4" /> Save and Start Application
            </Link>
          </div>
        </form>

        {/* Preview */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Profile Preview
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-teal grid place-items-center text-white font-display font-bold text-lg">
                ?
              </div>
              <div>
                <p className="font-display font-semibold text-navy">Your child's name</p>
                <p className="text-xs text-muted-foreground">EDUCA-STU-000125 (auto-generated)</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Profile completion</span>
                <span className="font-semibold text-navy">25%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-teal to-primary" style={{ width: "25%" }} />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Complete more sections to unlock faster admissions and school recommendations.
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-navy text-white p-4 text-xs">
            <p className="font-semibold text-gold mb-1">Why EDUCA ID?</p>
            <p className="text-white/75 leading-relaxed">
              Every learner gets a unique ID that follows them across schools and applications —
              just like a passport for education.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-8 flex justify-end">
        <Link
          to="/parent/children"
          className="text-sm text-muted-foreground hover:text-navy inline-flex items-center gap-1"
        >
          Back to children <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </PortalShell>
  );
}

function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
      <h3 className="font-display font-semibold text-navy">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </label>
  );
}

function Select({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <select className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
        {children}
      </select>
    </label>
  );
}