import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { LogisticsShell } from "@/components/educa/LogisticsShell";

export const Route = createFileRoute("/logistics/routes")({
  head: () => ({ meta: [{ title: "Routes · Logistics" }] }),
  component: () => (
    <LogisticsShell title="Operating routes" subtitle="Manage the areas you cover and your typical delivery times.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Nairobi CBD", town: "Nairobi", time: "Same day · 2-4 hrs" },
          { name: "Westlands & Parklands", town: "Nairobi", time: "Same day · 1-2 hrs" },
          { name: "Kilimani · Lavington", town: "Nairobi", time: "Same day · 2-3 hrs" },
          { name: "Karen · Langata", town: "Nairobi", time: "Same day · 3-4 hrs" },
          { name: "Kiambu Town", town: "Kiambu", time: "Next day" },
          { name: "Thika Road Corridor", town: "Nairobi · Kiambu", time: "Same day · scheduled" },
        ].map((r) => (
          <div key={r.name} className="rounded-2xl bg-card border border-border shadow-soft p-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><MapPin className="h-5 w-5" /></div>
              <div>
                <p className="font-display font-semibold text-navy">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.town}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Typical delivery: <span className="font-semibold text-navy">{r.time}</span></p>
          </div>
        ))}
      </div>
    </LogisticsShell>
  ),
});