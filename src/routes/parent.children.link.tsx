import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, IdCard, CheckCircle2, Copy } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";

export const Route = createFileRoute("/parent/children/link")({
  head: () => ({ meta: [{ title: "Link Student · EDUCA" }] }),
  component: LinkStudentPage,
});

function LinkStudentPage() {
  const [linked, setLinked] = useState(false);
  const navigate = useNavigate();

  return (
    <PortalShell
      role="parent"
      title="Link an existing student"
      subtitle="If your child already has an EDUCA ID, connect them instantly to your account."
    >
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="rounded-3xl bg-card border border-border shadow-soft p-6 sm:p-8">
          {linked ? (
            <div className="text-center py-6">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-teal/15 grid place-items-center text-teal-foreground">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-navy">Student linked successfully</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">EDUCA-STU-000123 is now linked to your account.</p>
              <div className="mt-6 flex justify-center gap-2">
                <Link to="/parent/children" className="inline-flex items-center gap-2 rounded-xl bg-navy text-white font-semibold px-5 py-2.5 text-sm">
                  View children
                </Link>
                <button
                  onClick={() => navigate({ to: "/parent/apply" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-2.5 text-sm shadow-glow"
                >
                  Start Application <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLinked(true);
              }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                  <IdCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy">Student EDUCA ID</h3>
                  <p className="text-xs text-muted-foreground">We'll verify the student belongs to your family.</p>
                </div>
              </div>

              <Field label="EDUCA ID" placeholder="EDUCA-STU-000123" />
              <Field label="Student date of birth" type="date" />
              <Field label="Student last name (for verification)" placeholder="Mwangi" />

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded border-border" />
                <span>I confirm I am the parent or legal guardian of this student.</span>
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold py-3 shadow-glow hover:brightness-105 transition"
              >
                Link Student <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-sm text-muted-foreground">
                No EDUCA ID yet?{" "}
                <Link to="/parent/children/new" className="font-semibold text-primary hover:underline">
                  Register student manually
                </Link>
              </p>
            </form>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-navy text-white p-5">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-gold">EDUCA ID</p>
            <p className="mt-1.5 font-display text-lg font-bold leading-tight">One ID. Every school.</p>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              The EDUCA ID is a verified identifier that travels with the learner — just like a passport for education.
            </p>
          </div>
          <div className="rounded-3xl bg-card border border-border shadow-soft p-5">
            <h4 className="font-display font-semibold text-navy text-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-teal" /> How to find an EDUCA ID
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>• Ask the student to open their EDUCA profile</li>
              <li>• Format: <span className="font-mono text-navy">EDUCA-KE-2025-000123</span></li>
              <li className="flex items-center gap-1.5">
                <Copy className="h-3 w-3" /> Tap "Copy ID" inside the student app
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
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