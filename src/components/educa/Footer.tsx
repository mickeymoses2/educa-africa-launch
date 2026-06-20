import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80 pt-20 pb-10 mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid gap-12 lg:grid-cols-4">
        <div className="space-y-5 lg:col-span-1">
          <Logo tone="light" />
          <p className="text-sm leading-relaxed text-white/65">
            EDUCA Africa is the continental operating system for education — connecting learners,
            parents, schools and institutions across one trusted platform.
          </p>
          <div className="flex gap-2">
            {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-full bg-white/5 hover:bg-gold hover:text-gold-foreground transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            {["School Discovery", "Admissions", "Student Profiles", "Parent Access", "Institutions"].map(
              (x) => (
                <li key={x}>
                  <a href="#" className="hover:text-gold transition">{x}</a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {["About EDUCA", "Our Vision", "Press", "Careers", "Partners"].map((x) => (
              <li key={x}>
                <a href="#" className="hover:text-gold transition">{x}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-teal" /> Nairobi · Lagos · Kigali</li>
            <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-teal" /> hello@educa.africa</li>
            <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-teal" /> +254 700 000 000</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/55">
        <p>© {new Date().getFullYear()} EDUCA Africa. All rights reserved.</p>
        <p className="font-display tracking-tight text-white/80">Everything Education. One Platform.</p>
      </div>
    </footer>
  );
}