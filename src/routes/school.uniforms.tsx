import { createFileRoute } from "@tanstack/react-router";
import { Plus, Shirt } from "lucide-react";
import { DashboardShell } from "@/components/educa/DashboardShell";
import { uniformRequirements } from "@/data/educa";

export const Route = createFileRoute("/school/uniforms")({
  head: () => ({ meta: [{ title: "Uniform Requirements · EDUCA School" }] }),
  component: () => (
    <DashboardShell
      title="Uniform Requirements"
      subtitle="Define required and optional uniform items per class. Parents will see this when placing uniform orders."
      actions={<button className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold"><Plus className="h-4 w-4" /> Add Requirement</button>}
    >
      <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Shirt className="h-4 w-4 text-primary" />
          <h3 className="font-display font-semibold text-navy">Requirements by class</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-4">Class</th><th className="text-left p-4">Item</th><th className="text-left p-4">Required</th><th className="text-left p-4">Gender</th><th className="text-left p-4">Qty</th><th className="text-left p-4">Notes</th><th className="p-4" /></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {uniformRequirements.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="p-4 font-semibold text-navy">{u.classGrade}</td>
                  <td className="p-4">{u.item}</td>
                  <td className="p-4"><span className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${u.required ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{u.required ? "Required" : "Optional"}</span></td>
                  <td className="p-4">{u.gender}</td>
                  <td className="p-4">{u.quantity}</td>
                  <td className="p-4 text-muted-foreground">{u.notes || "—"}</td>
                  <td className="p-4 text-right"><button className="text-xs font-semibold text-primary">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  ),
});