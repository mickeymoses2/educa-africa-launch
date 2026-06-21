import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/educa/PortalShell";
import { FileUploadCard } from "@/components/educa/FileUploadCard";
import { documents } from "@/data/educa";

export const Route = createFileRoute("/student/documents")({
  head: () => ({ meta: [{ title: "Documents · EDUCA Student" }] }),
  component: StudentDocsPage,
});

function StudentDocsPage() {
  return (
    <PortalShell
      role="student"
      title="My Documents"
      subtitle="Keep your education documents organised and ready for any application."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {documents.map((d) => (
          <FileUploadCard key={d.id} doc={d} />
        ))}
      </div>
    </PortalShell>
  );
}