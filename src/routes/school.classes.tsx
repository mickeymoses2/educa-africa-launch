import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";

export const Route = createFileRoute("/school/classes")({
  head: () => ({ meta: [{ title: "Classes & Levels · EDUCA" }] }),
  component: Classes,
});

const classes = [
  { level: "Pre-Primary", classes: ["PP1", "PP2"], capacity: 60, enrolled: 48 },
  { level: "Primary", classes: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"], capacity: 240, enrolled: 198 },
  { level: "Secondary", classes: ["Form 1", "Form 2", "Form 3", "Form 4"], capacity: 160, enrolled: 124 },
];

function Classes() {
  return (
    <DashboardShell
      title="Classes & Levels"
      subtitle="Manage the classes you offer and your enrolment capacity."
      actions={
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-glow"><Plus className="h-4 w-4" /> Add class</button>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {classes.map((g) => {
          const pct = Math.round((g.enrolled / g.capacity) * 100);
          return (
            <section key={g.level} className="rounded-2xl bg-card border border-border shadow-soft p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-navy">{g.level}</h3>
                <span className="text-xs font-semibold text-muted-foreground">{g.classes.length} classes</span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold text-navy">{g.enrolled}<span className="text-base font-medium text-muted-foreground"> / {g.capacity}</span></p>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-teal" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.classes.map((c) => <span key={c} className="rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-semibold">{c}</span>)}
              </div>
            </section>
          );
        })}
      </div>
    </DashboardShell>
  );
}