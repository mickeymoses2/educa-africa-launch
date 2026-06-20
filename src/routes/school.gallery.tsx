import { createFileRoute } from "@tanstack/react-router";
import { Upload, Trash2 } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";

export const Route = createFileRoute("/school/gallery")({
  head: () => ({ meta: [{ title: "Gallery · EDUCA" }] }),
  component: Gallery,
});

function Gallery() {
  return (
    <DashboardShell title="School gallery" subtitle="A premium gallery helps parents picture life on campus.">
      <div className="rounded-2xl bg-card border border-border shadow-soft p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <button className="aspect-video rounded-xl border-2 border-dashed border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 grid place-items-center transition">
            <div className="text-center text-primary"><Upload className="h-6 w-6 mx-auto" /><p className="text-xs font-semibold mt-1">Upload photos</p></div>
          </button>
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="relative aspect-video rounded-xl bg-gradient-to-br from-primary/15 via-teal/10 to-gold/10 border border-border group">
              <button className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-lg bg-white/90 text-destructive opacity-0 group-hover:opacity-100 transition">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}