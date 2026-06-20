import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { DashboardShell } from "@/components/educa/DashboardShell";

export const Route = createFileRoute("/school/requirements")({
  head: () => ({ meta: [{ title: "Admission requirements · EDUCA" }] }),
  component: Requirements,
});

const inputCls = "w-full h-11 rounded-xl border border-border bg-white px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

function Requirements() {
  const [visible, setVisible] = useState(true);
  return (
    <DashboardShell title="Admission requirements" subtitle="Set what applicants must submit and which classes you're accepting.">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Required documents</h3>
            <p className="text-sm text-muted-foreground mt-1">Applicants must upload each item before submitting.</p>
            <ul className="mt-4 space-y-2">
              {["Completed application form", "Birth certificate", "Last 2 academic reports", "Immunisation record", "One passport photo"].map((d) => (
                <li key={d} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm font-medium text-navy flex-1">{d}</span>
                  <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
            <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"><Plus className="h-4 w-4" /> Add requirement</button>
          </section>

          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Available classes</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Form 1", "Form 2", "Form 3"].map((c, i) => (
                <button key={c} className={`rounded-full px-3 py-1.5 text-xs font-medium ${i < 6 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{c}</button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Notes for applicants</h3>
            <textarea rows={4} className={inputCls + " h-auto py-3 mt-3"} defaultValue="Applications are reviewed within 7 working days. You'll receive an email update as soon as your application moves to the next stage." />
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Admission term</h3>
            <select className={inputCls + " mt-3"} defaultValue="Term 1 · January 2027">
              <option>Term 1 · January 2027</option>
              <option>Term 2 · May 2027</option>
              <option>Term 3 · September 2027</option>
            </select>
          </section>

          <section className="rounded-2xl bg-card border border-border shadow-soft p-6">
            <h3 className="font-display font-semibold text-navy">Public application form</h3>
            <p className="text-sm text-muted-foreground mt-1">Toggle whether parents can apply from your public profile.</p>
            <button onClick={() => setVisible(v => !v)} className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${visible ? "bg-success/15 text-success-foreground ring-1 ring-success/30" : "bg-muted text-muted-foreground"}`}>
              {visible ? <><Eye className="h-4 w-4" /> Visible to public</> : <><EyeOff className="h-4 w-4" /> Hidden</>}
            </button>
          </section>
        </aside>
      </div>
    </DashboardShell>
  );
}