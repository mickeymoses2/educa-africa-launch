import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Upload, Check, Image as ImageIcon, FileText } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { Stepper } from "@/components/educa/Stepper";

export const Route = createFileRoute("/school/onboarding")({
  head: () => ({ meta: [{ title: "School Onboarding · EDUCA" }] }),
  component: Onboarding,
});

const steps = [
  "Basic info",
  "Institutional details",
  "Branding & media",
  "Admissions",
  "Review & submit",
];

function Onboarding() {
  const [current, setCurrent] = useState(0);

  return (
    <DashboardShell
      title="School Onboarding"
      subtitle="Set up your school profile in a few guided steps. You can return and edit anytime."
      actions={
        <Link
          to="/school"
          className="inline-flex items-center gap-2 rounded-xl ring-1 ring-border text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to overview
        </Link>
      }
    >
      <div className="rounded-2xl bg-card border border-border shadow-soft p-6 sm:p-8">
        <Stepper steps={steps} current={current} onStep={setCurrent} />
      </div>

      <div className="mt-6 rounded-2xl bg-card border border-border shadow-soft p-6 sm:p-8">
        {current === 0 && <StepBasic />}
        {current === 1 && <StepInstitutional />}
        {current === 2 && <StepBranding />}
        {current === 3 && <StepAdmissions />}
        {current === 4 && <StepReview />}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Step {current + 1} of {steps.length} · Autosaved
          </p>
          <div className="flex gap-2">
            <button
              disabled={current === 0}
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              className="inline-flex items-center gap-2 rounded-xl ring-1 ring-border text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted transition disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {current < steps.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
                className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-105 transition">
                <Check className="h-4 w-4" /> Submit for review
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </label>
  );
}

const inputCls =
  "w-full h-11 rounded-xl border border-border bg-white px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";
const selectCls = inputCls + " appearance-none";

function StepHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-bold text-navy">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

function StepBasic() {
  return (
    <>
      <StepHeader title="Basic school information" desc="Tell parents the essentials." />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="School name"><input className={inputCls} defaultValue="Kilimani Academy" /></Field>
        <Field label="School type">
          <select className={selectCls} defaultValue="Mixed">
            <option>Boys</option><option>Girls</option><option>Mixed</option>
          </select>
        </Field>
        <Field label="School level">
          <select className={selectCls} defaultValue="Primary & Secondary">
            <option>Pre-Primary</option><option>Primary</option><option>Secondary</option><option>Primary & Secondary</option>
          </select>
        </Field>
        <Field label="Curriculum">
          <select className={selectCls} defaultValue="CBC · IGCSE">
            <option>CBC</option><option>8-4-4</option><option>British</option><option>IB</option><option>CBC · IGCSE</option>
          </select>
        </Field>
        <Field label="County / City"><input className={inputCls} defaultValue="Nairobi" /></Field>
        <Field label="Phone"><input className={inputCls} defaultValue="+254 700 000 000" /></Field>
        <Field label="Email"><input type="email" className={inputCls} defaultValue="admissions@kilimani.ac.ke" /></Field>
        <Field label="Website"><input className={inputCls} defaultValue="https://kilimani.ac.ke" /></Field>
      </div>
    </>
  );
}

function Toggle({ label, on = false }: { label: string; on?: boolean }) {
  const [v, setV] = useState(on);
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3">
      <span className="text-sm font-medium text-navy">{label}</span>
      <button
        type="button"
        onClick={() => setV((s) => !s)}
        className={`relative h-6 w-11 rounded-full transition ${v ? "bg-primary" : "bg-border"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${v ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

function StepInstitutional() {
  const facilities = ["Science labs", "Library", "Sports field", "Swimming pool", "Dining hall", "ICT lab", "Music room", "Boarding houses"];
  return (
    <>
      <StepHeader title="Institutional details" desc="Help parents understand what makes you unique." />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Boarding or day">
          <select className={selectCls} defaultValue="Boarding & Day"><option>Boarding</option><option>Day</option><option>Boarding & Day</option></select>
        </Field>
        <Field label="Public or private">
          <select className={selectCls} defaultValue="Private"><option>Public</option><option>Private</option></select>
        </Field>
        <Toggle label="Faith-based institution" />
        <Toggle label="Special needs support" on />
      </div>
      <div className="mt-5">
        <Field label="Short description" hint="A 1–2 sentence summary shown on your public profile.">
          <textarea rows={4} className={inputCls + " h-auto py-3"} defaultValue="A modern co-educational academy combining the Kenyan CBC with Cambridge international pathways." />
        </Field>
      </div>
      <div className="mt-5">
        <span className="text-sm font-semibold text-navy">Facilities</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {facilities.map((f, i) => (
            <button
              key={f}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                i < 5 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function UploadBox({ icon: Icon, title, hint }: { icon: typeof Upload; title: string; hint: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition p-6 text-center cursor-pointer">
      <div className="mx-auto h-12 w-12 rounded-xl bg-white border border-border grid place-items-center text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-sm font-semibold text-navy">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{hint}</p>
    </div>
  );
}

function StepBranding() {
  return (
    <>
      <StepHeader title="Branding & media" desc="Bring your school's identity to life." />
      <div className="grid sm:grid-cols-3 gap-4">
        <UploadBox icon={Upload} title="School logo" hint="PNG or SVG · square, min 512×512" />
        <UploadBox icon={ImageIcon} title="Cover image" hint="JPG · 1600×900 recommended" />
        <UploadBox icon={ImageIcon} title="Gallery photos" hint="Up to 20 photos" />
      </div>
    </>
  );
}

function StepAdmissions() {
  return (
    <>
      <StepHeader title="Admissions details" desc="Tell parents what's required and which classes are open." />
      <div className="grid gap-5">
        <Field label="Admission requirements" hint="Listed on your public profile.">
          <textarea rows={4} className={inputCls + " h-auto py-3"} defaultValue="Completed application form, birth certificate, last 2 academic reports, immunisation record, and one passport photo." />
        </Field>
        <Field label="Available entry classes">
          <div className="flex flex-wrap gap-2">
            {["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Form 1", "Form 2"].map((c, i) => (
              <button key={c} className={`rounded-full px-3 py-1.5 text-xs font-medium ${i % 2 === 0 ? "bg-teal/20 text-teal-foreground" : "bg-muted text-muted-foreground"}`}>{c}</button>
            ))}
          </div>
        </Field>
        <Field label="Application status">
          <div className="flex gap-2">
            <button className="rounded-xl bg-success/15 text-success-foreground px-4 py-2 text-sm font-semibold ring-1 ring-success/30">Open</button>
            <button className="rounded-xl bg-muted text-muted-foreground px-4 py-2 text-sm font-semibold">Closed</button>
          </div>
        </Field>
      </div>
    </>
  );
}

function StepReview() {
  return (
    <>
      <StepHeader title="Review & submit" desc="A snapshot of your profile before it's published." />
      <div className="rounded-2xl bg-gradient-to-r from-navy to-primary text-white p-6">
        <p className="text-xs uppercase tracking-wider text-white/70 font-semibold">Profile completion</p>
        <p className="font-display text-3xl font-bold mt-1">92%</p>
        <div className="mt-4 h-2 rounded-full bg-white/15 overflow-hidden">
          <div className="h-full bg-gold" style={{ width: "92%" }} />
        </div>
      </div>
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {[
          ["Basic info", "Complete"],
          ["Institutional details", "Complete"],
          ["Branding & media", "1 item missing"],
          ["Admissions", "Complete"],
        ].map(([label, status]) => (
          <div key={label} className="rounded-xl border border-border bg-muted/30 p-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy">{label}</p>
              <p className="text-xs text-muted-foreground">{status}</p>
            </div>
            <Check className="h-5 w-5 text-success-foreground" />
          </div>
        ))}
      </div>
    </>
  );
}