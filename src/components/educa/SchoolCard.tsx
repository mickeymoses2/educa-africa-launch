import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface SchoolCardData {
  name: string;
  location: string;
  level: string;
  curriculum: string;
  boarding: "Boarding" | "Day" | "Boarding & Day";
  description: string;
  image: string;
  initials: string;
}

export function SchoolCard({ school }: { school: SchoolCardData }) {
  const id = school.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <article className="group overflow-hidden rounded-3xl bg-card shadow-card hover:-translate-y-1 transition-all duration-300 border border-border/60">
      <div className="relative h-44 overflow-hidden">
        <img
          src={school.image}
          alt={school.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-navy shadow-soft">
          {school.boarding}
        </span>
        <div className="absolute -bottom-6 left-5 h-14 w-14 rounded-2xl bg-white shadow-card grid place-items-center font-display font-bold text-navy text-lg border border-border">
          {school.initials}
        </div>
      </div>
      <div className="p-5 pt-9">
        <h3 className="font-display font-semibold text-lg text-navy leading-tight">{school.name}</h3>
        <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {school.location}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium">{school.level}</span>
          <span className="rounded-full bg-teal/15 text-teal-foreground px-2.5 py-0.5 text-[11px] font-medium">{school.curriculum}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{school.description}</p>
        <Link
          to="/schools/$id"
          params={{ id }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all"
        >
          View School <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}