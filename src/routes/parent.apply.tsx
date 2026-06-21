import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Save,
  Building2,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { Stepper } from "@/components/educa/Stepper";
import { FileUploadCard } from "@/components/educa/FileUploadCard";
import { children, documents, featuredSchools } from "@/data/educa";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/apply")({
  head: () => ({ meta: [{ title: "New Application · EDUCA" }] }),
  component: ApplyPage,
});

const steps = [
  "Select Student",
  "School & Class",
  "Previous Education",
  "Documents",
  "Special Information",
  "Review & Submit",
];

function ApplyPage() {
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [studentId, setStudentId] = useState(children[0]?.id ?? "");
  const [schoolName, setSchoolName] = useState(featuredSchools[0].name);

  const student = children.find((c) => c.id === studentId);

  if (submitted) {
    return (
      <PortalShell role="parent" title="Application Submitted" subtitle="">
        <div className="max-w-xl mx-auto text-center rounded-3xl bg-card border border-border shadow-card p-10">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-success/15 grid place-items-center text-success-foreground">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold text-navy">
            Application Submitted Successfully
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your application has been sent to {schoolName} for review. You can track progress from
            your applications dashboard.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/parent/applications"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
            >
              View Application Status <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/parent/schools"
              className="inline-flex items-center gap-2 rounded-xl bg-muted text-navy px-5 py-3 text-sm font-semibold hover:bg-muted/70 transition"
            >
              Find More Schools
            </Link>
          </div>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell
      role="parent"
      title="New Admission Application"
      subtitle="Complete each step to submit a polished application — you can save your progress any time."
      actions={
        <button className="inline-flex items-center gap-2 rounded-full bg-muted text-navy px-4 py-2.5 text-sm font-semibold hover:bg-muted/70 transition">
          <Save className="h-4 w-4" /> Save draft
        </button>
      }
    >
      <div className="rounded-3xl bg-card border border-border shadow-soft p-5 sm:p-6 mb-6">
        <Stepper steps={steps} current={current} onStep={setCurrent} />
      </div>

      <div className="rounded-3xl bg-card border border-border shadow-soft p-6 sm:p-8">
        {current === 0 && (
          <Step title="Who is this application for?" desc="Select a child profile linked to your account.">
            <div className="grid sm:grid-cols-2 gap-3">
              {children.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setStudentId(c.id)}
                  className={cn(
                    "text-left rounded-2xl border p-4 transition flex items-center gap-4",
                    studentId === c.id
                      ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${c.avatarTone} grid place-items-center text-white font-display font-bold`}>
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-navy">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.educaId} · {c.currentClass}</p>
                  </div>
                  {studentId === c.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </button>
              ))}
              <Link
                to="/parent/children/new"
                className="rounded-2xl border border-dashed border-border bg-muted/40 p-4 flex items-center gap-3 hover:bg-muted/60 transition"
              >
                <div className="h-12 w-12 rounded-xl bg-white border border-border grid place-items-center text-primary">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">Add new child</p>
                  <p className="text-xs text-muted-foreground">Create a learner profile</p>
                </div>
              </Link>
            </div>
          </Step>
        )}

        {current === 1 && (
          <Step title="Choose school and class" desc="Pick the school and the class you'd like to apply for.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="School" value={schoolName} onChange={setSchoolName}>
                {featuredSchools.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </Select>
              <Select label="Class / grade applying for">
                {["Grade 1", "Grade 4", "Grade 6", "Form 1", "Form 2"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
              <Select label="Admission term">
                <option>Term 1 · 2027</option>
                <option>Term 2 · 2027</option>
                <option>Term 3 · 2027</option>
              </Select>
              <Select label="Boarding preference">
                <option>Day</option>
                <option>Boarding</option>
                <option>No preference</option>
              </Select>
            </div>
          </Step>
        )}

        {current === 2 && (
          <Step title="Previous education" desc="Share your child's most recent schooling.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Previous school" placeholder="Kileleshwa Primary" />
              <Field label="Current class / grade" placeholder="Grade 6" />
            </div>
            <div className="mt-4 grid gap-4">
              <TextArea label="Academic summary" placeholder="Top of class in mathematics; strong in sciences." />
              <TextArea label="Reason for transfer (optional)" placeholder="Looking for a boarding programme closer to family." />
            </div>
          </Step>
        )}

        {current === 3 && (
          <Step title="Upload required documents" desc="You can replace these later from the Documents page.">
            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((d) => (
                <FileUploadCard key={d.id} doc={d} />
              ))}
            </div>
          </Step>
        )}

        {current === 4 && (
          <Step title="Special information" desc="Optional but helps the school prepare for your child.">
            <div className="grid sm:grid-cols-2 gap-4">
              <TextArea label="Special needs information" placeholder="Any learning support requirements." />
              <TextArea label="Medical information" placeholder="Allergies, medications, conditions." />
              <Field label="Emergency contact name" placeholder="Faith Mwangi" />
              <Field label="Emergency contact phone" placeholder="+254 722 110 220" />
            </div>
            <div className="mt-4">
              <TextArea label="Additional notes" placeholder="Anything else you'd like the school to know." />
            </div>
          </Step>
        )}

        {current === 5 && (
          <Step title="Review and submit" desc="Confirm everything is correct before sending to the school.">
            <div className="grid md:grid-cols-2 gap-4">
              <Summary title="Student" value={student?.name ?? "—"} sub={student?.educaId} />
              <Summary title="School" value={schoolName} sub="Nairobi, Kenya" />
              <Summary title="Class applied for" value="Form 1" sub="Term 1 · 2027" />
              <Summary
                title="Documents"
                value={`${documents.filter((d) => d.status !== "Missing").length}/${documents.length} uploaded`}
                sub="You can update later"
              />
              <Summary title="Parent" value="Grace Mwangi" sub="grace.m@email.com" />
              <Summary title="Application fee" value="Free" sub="EDUCA covers application fees" />
            </div>

            <div className="mt-6 rounded-2xl bg-gold/15 border border-gold/30 p-4 flex gap-3">
              <Sparkles className="h-5 w-5 text-gold-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-navy">
                After submitting, the school will be notified instantly. You'll receive updates in
                your Notifications and via email.
              </p>
            </div>
          </Step>
        )}
      </div>

      {/* Sticky action bar */}
      <div className="sticky bottom-0 lg:static mt-6 flex items-center justify-between gap-3 bg-card/95 backdrop-blur lg:bg-transparent border-t border-border lg:border-0 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 py-4 lg:py-0">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-muted text-navy px-5 py-3 text-sm font-semibold hover:bg-muted/70 transition disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {current < steps.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
          >
            <Building2 className="h-4 w-4" /> Submit Application
          </button>
        )}
      </div>
    </PortalShell>
  );
}

function Step({ title, desc, children: kids }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
      {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
      <div className="mt-6">{kids}</div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <input
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </label>
  );
}

function TextArea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <textarea
        rows={3}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      />
    </label>
  );
}

function Select({
  label,
  children,
  value,
  onChange,
}: {
  label: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition"
      >
        {children}
      </select>
    </label>
  );
}

function Summary({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-muted/60 p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{title}</p>
      <p className="mt-1 font-display font-semibold text-navy">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}