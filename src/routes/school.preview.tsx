import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Globe, Phone, Mail, Check, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/educa/Navbar";
import { Footer } from "@/components/educa/Footer";
import school1 from "@/assets/school-1.jpg";

export const Route = createFileRoute("/school/preview")({
  head: () => ({ meta: [{ title: "Kilimani Academy · EDUCA" }] }),
  component: PublicPreview,
});

function PublicPreview() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-sm px-5 py-2.5 pt-24">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <p className="font-medium">👀 You're viewing a preview of your public profile.</p>
          <Link to="/school/profile" className="font-semibold inline-flex items-center gap-1 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to editor
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="h-72 sm:h-96 overflow-hidden">
          <img src={school1} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
        </div>
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="-mt-20 rounded-3xl bg-card border border-border shadow-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-white border-4 border-white shadow-card grid place-items-center font-display font-bold text-3xl text-navy shrink-0">
              KA
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 text-success-foreground px-2.5 py-1 text-xs font-semibold"><span className="h-1.5 w-1.5 rounded-full bg-current" /> Applications open</span>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-navy">Kilimani Academy</h1>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-4 w-4" /> Kilimani, Nairobi · Kenya</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">Primary & Secondary</span>
                <span className="rounded-full bg-teal/15 text-teal-foreground px-3 py-1 text-xs font-medium">CBC · IGCSE</span>
                <span className="rounded-full bg-gold/20 text-gold-foreground px-3 py-1 text-xs font-medium">Boarding & Day</span>
              </div>
            </div>
            <button className="self-stretch sm:self-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-gold-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 lg:px-8 mt-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <article>
            <h2 className="font-display text-2xl font-bold text-navy">About</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Kilimani Academy is a modern co-educational institution combining the Kenyan CBC with Cambridge international pathways. We nurture curious, confident learners ready for a global future, with a strong commitment to character, sports and the creative arts.
            </p>
          </article>

          <article>
            <h2 className="font-display text-2xl font-bold text-navy">Facilities</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {["Modern science laboratories", "Olympic-size swimming pool", "ICT and innovation lab", "Library & resource centre", "Sports field & gymnasium", "Music & performing arts studio"].map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                  <span className="h-7 w-7 rounded-lg bg-teal/15 text-teal-foreground grid place-items-center"><Check className="h-4 w-4" /></span>
                  <span className="text-sm font-medium text-navy">{f}</span>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="font-display text-2xl font-bold text-navy">Fees overview</h2>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[["Pre-Primary", "KES 180,000"], ["Primary", "KES 220,000"], ["Secondary", "KES 280,000"]].map(([l, v]) => (
                <div key={l} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">{l}</p>
                  <p className="mt-1 font-display text-xl font-bold text-navy">{v}</p>
                  <p className="text-xs text-muted-foreground">per term</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="font-display text-2xl font-bold text-navy">Admission requirements</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["Completed application form", "Birth certificate copy", "Last 2 academic reports", "Immunisation record", "One passport photo"].map((r) => (
                <li key={r} className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> {r}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2 className="font-display text-2xl font-bold text-navy">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video rounded-xl bg-gradient-to-br from-muted to-primary/10 border border-border" />
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sticky top-24">
            <h3 className="font-display font-semibold text-navy">Contact the school</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-navy"><Phone className="h-4 w-4 text-primary" /> +254 700 000 000</li>
              <li className="flex items-center gap-2.5 text-navy"><Mail className="h-4 w-4 text-primary" /> admissions@kilimani.ac.ke</li>
              <li className="flex items-center gap-2.5 text-navy"><Globe className="h-4 w-4 text-primary" /> kilimani.ac.ke</li>
            </ul>
            <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold shadow-glow hover:brightness-105">
              Apply Now
            </button>
            <button className="mt-2 w-full rounded-xl ring-1 ring-border text-navy px-4 py-3 text-sm font-semibold hover:bg-muted">
              Save for later
            </button>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}