import { createFileRoute } from "@tanstack/react-router";
import { UploadCloud } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { FileUploadCard } from "@/components/educa/FileUploadCard";
import { documents } from "@/data/educa";

export const Route = createFileRoute("/parent/documents")({
  head: () => ({ meta: [{ title: "Documents · EDUCA" }] }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const uploaded = documents.filter((d) => d.status !== "Missing").length;
  const pct = Math.round((uploaded / documents.length) * 100);

  return (
    <PortalShell
      role="parent"
      title="Documents"
      subtitle="Upload and manage documents required for school applications."
      actions={
        <button className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:brightness-105 transition">
          <UploadCloud className="h-4 w-4" /> Upload New
        </button>
      }
    >
      <div className="rounded-3xl bg-navy text-white p-6 mb-6 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal/25 blur-3xl" />
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60 font-semibold">
              Document completion
            </p>
            <p className="mt-1 font-display text-3xl font-bold">{uploaded} of {documents.length} uploaded</p>
            <p className="mt-1 text-sm text-white/70">Supported formats: PDF, JPG, PNG. Max 5MB per file.</p>
          </div>
          <div className="w-full max-w-xs">
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-gold"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/70 text-right">{pct}% complete</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {documents.map((d) => (
          <FileUploadCard key={d.id} doc={d} />
        ))}
      </div>
    </PortalShell>
  );
}