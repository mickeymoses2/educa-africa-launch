import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, UserPlus, Users, GraduationCap, Building2 } from "lucide-react";
import { Logo } from "@/components/educa/Logo";

type Role = "parent" | "student" | "school";

export const Route = createFileRoute("/register")({
  validateSearch: (s: Record<string, unknown>): { role?: Role } => {
    const role = s.role;
    if (role === "parent" || role === "student" || role === "school") return { role };
    return {};
  },
  head: () => ({
    meta: [
      { title: "Create your EDUCA account · EDUCA Africa" },
      {
        name: "description",
        content:
          "Create a free EDUCA account to discover schools, manage your child's profile and apply online — all from one trusted platform.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [role, setRole] = useState<Role>(search.role ?? "parent");
  const [step, setStep] = useState<"form" | "welcome">("form");

  const heading = role === "parent" ? "Create a parent account" : role === "student" ? "Create your student account" : "Register your school";
  const next = role === "parent" ? "/parent/children/new" : role === "student" ? "/student/profile" : "/school/onboarding";

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-background">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between bg-navy text-white p-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        </div>

        <div className="relative">
          <Logo tone="light" />
        </div>

        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-gold" /> {role === "parent" ? "Parent Account" : role === "student" ? "Student Account" : "School Account"}
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight">
            One account for your <span className="text-gold">child's entire</span> education journey.
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Manage school applications, student profiles and admissions from a single, secure
            EDUCA account.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Discover vetted schools across Africa",
              "Apply online and track every status",
              "Upload documents once, reuse anywhere",
              "Receive real-time admission updates",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-teal mt-0.5 shrink-0" />
                <span className="text-white/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-3 text-xs text-white/55">
          <ShieldCheck className="h-4 w-4 text-teal" />
          Your information is encrypted and protected at all times.
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col">
        <header className="lg:hidden bg-navy text-white p-5 flex items-center justify-between">
          <Logo tone="light" />
          <Link to="/get-started" className="text-xs text-white/70 hover:text-white">
            ← Change role
          </Link>
        </header>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            {step === "form" ? (
              <>
                <Link to="/get-started" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-navy">
                  <ArrowLeft className="h-3.5 w-3.5" /> Choose a different role
                </Link>
                <h1 className="mt-3 font-display text-3xl font-bold text-navy">{heading}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Already have one?{" "}
                  <Link to="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                  </Link>
                </p>

                <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-2xl bg-muted p-1.5 text-xs font-semibold">
                  {([
                    { id: "parent", label: "Parent", icon: Users },
                    { id: "student", label: "Student", icon: GraduationCap },
                    { id: "school", label: "School", icon: Building2 },
                  ] as { id: Role; label: string; icon: typeof Users }[]).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl py-2 transition ${role === r.id ? "bg-white text-navy shadow-soft" : "text-muted-foreground hover:text-navy"}`}
                    >
                      <r.icon className="h-3.5 w-3.5" /> {r.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("welcome");
                  }}
                  className="mt-7 space-y-4"
                >
                  {role === "parent" && <ParentFields />}
                  {role === "student" && <StudentFields />}
                  {role === "school" && <SchoolFields />}

                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" className="mt-0.5 rounded border-border" defaultChecked />
                    <span>
                      I agree to the <a className="text-primary hover:underline">Terms of Service</a>{" "}
                      and <a className="text-primary hover:underline">Privacy Policy</a>.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold py-3 shadow-glow hover:brightness-105 transition"
                  >
                    Create my account <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-teal/15 grid place-items-center text-teal-foreground">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h1 className="mt-5 font-display text-3xl font-bold text-navy">
                  Account created successfully.
                </h1>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                  {role === "parent" && "Let's set up your child's education profile so you can start applying to schools."}
                  {role === "student" && "We've generated your EDUCA ID. Complete your profile to start exploring schools."}
                  {role === "school" && "Continue onboarding to publish your public school profile."}
                </p>
                {role === "student" && (
                  <div className="mt-5 rounded-2xl bg-navy text-white p-5 text-left">
                    <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">Your EDUCA ID</p>
                    <p className="mt-1.5 font-display text-2xl font-bold text-gold tracking-wide">EDUCA-KE-2025-000123</p>
                    <p className="mt-1 text-xs text-white/70">Keep this safe — it's your unique learner identity.</p>
                  </div>
                )}
                <div className="mt-7 grid gap-3">
                  <button
                    onClick={() => navigate({ to: next })}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold py-3 shadow-glow hover:brightness-105 transition"
                  >
                    <UserPlus className="h-4 w-4" /> Continue Setup
                  </button>
                  <Link
                    to={role === "parent" ? "/parent" : role === "student" ? "/student" : "/school"}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-muted text-navy font-semibold py-3 hover:bg-muted/70 transition"
                  >
                    Skip for now, go to dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ParentFields() {
  return (
    <>
      <Field label="Full name" placeholder="Grace Mwangi" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone number" placeholder="+254 7…" type="tel" />
        <Field label="Email address" placeholder="you@email.com" type="email" />
      </div>
      <Field label="Password" placeholder="At least 8 characters" type="password" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Location" placeholder="Nairobi, Kenya" />
        <SelectField label="Relationship to student">
          <option>Parent</option>
          <option>Guardian</option>
          <option>Grandparent</option>
          <option>Sibling</option>
        </SelectField>
      </div>
    </>
  );
}

function StudentFields() {
  return (
    <>
      <Field label="Full name" placeholder="Brian Mwangi" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Date of birth" type="date" />
        <Field label="Phone or email" placeholder="you@email.com" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Current school" placeholder="Kileleshwa Primary" />
        <Field label="Current grade / class" placeholder="Grade 6" />
      </div>
      <Field label="Password" placeholder="At least 8 characters" type="password" />
    </>
  );
}

function SchoolFields() {
  return (
    <>
      <Field label="School name" placeholder="Kilimani Academy" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Contact person" placeholder="Jane Otieno" />
        <Field label="Phone number" placeholder="+254 7…" type="tel" />
      </div>
      <Field label="School email" placeholder="admissions@school.edu" type="email" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="County" placeholder="Nairobi" />
        <Field label="Town / city" placeholder="Westlands" />
      </div>
      <Field label="Password" placeholder="At least 8 characters" type="password" />
    </>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
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

function SelectField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <select className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
        {children}
      </select>
    </label>
  );
}