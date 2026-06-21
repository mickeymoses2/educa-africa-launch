import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/educa/PortalShell";
import { StudentIdCard } from "@/components/educa/StudentIdCard";
import { children } from "@/data/educa";

export const Route = createFileRoute("/student/profile")({
  head: () => ({ meta: [{ title: "My Profile · EDUCA Student" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const me = children[0];
  return (
    <PortalShell role="student" title="My Profile" subtitle="Your verified EDUCA learner identity.">
      <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">
        <StudentIdCard child={me} />

        <div className="rounded-3xl bg-card border border-border shadow-soft p-6">
          <h3 className="font-display font-semibold text-navy text-lg">Personal Details</h3>
          <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="Full name" value={me.name} />
            <Field label="Date of birth" value={me.dob} />
            <Field label="Gender" value={me.gender} />
            <Field label="Nationality" value="Kenyan" />
            <Field label="Current school" value={me.currentSchool} />
            <Field label="Current class" value={me.currentClass} />
            <Field label="Curriculum" value={me.curriculum} />
            <Field label="Guardian" value={me.guardian} />
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <p className="mt-1 font-semibold text-navy">{value}</p>
    </div>
  );
}