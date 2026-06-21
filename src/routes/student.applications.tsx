import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/educa/PortalShell";
import { ApplicationCard } from "@/components/educa/ApplicationCard";
import { children, myApplications } from "@/data/educa";

export const Route = createFileRoute("/student/applications")({
  head: () => ({ meta: [{ title: "My Applications · EDUCA Student" }] }),
  component: StudentAppsPage,
});

function StudentAppsPage() {
  const me = children[0];
  const apps = myApplications.filter((a) => a.studentId === me.id);
  return (
    <PortalShell
      role="student"
      title="My Applications"
      subtitle="Every school you've applied to, in one place."
    >
      <div className="grid lg:grid-cols-2 gap-4">
        {apps.map((a) => (
          <ApplicationCard key={a.id} app={a} />
        ))}
      </div>
    </PortalShell>
  );
}