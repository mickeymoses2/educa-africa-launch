import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { CheckCircle2, XCircle, Smartphone, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { PortalShell } from "@/components/educa/PortalShell";
import { Stepper } from "@/components/educa/Stepper";

const searchSchema = z.object({
  step: z.coerce.number().min(1).max(5).default(1),
  ref: z.string().default("FEE-0000"),
  amount: z.coerce.number().default(0),
  type: z.string().default("School Fees"),
  student: z.string().default("Brian Mwangi"),
  school: z.string().default("Kilimani Academy"),
});

export const Route = createFileRoute("/parent/payments/pay")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Pay with M-Pesa · EDUCA Pay" }] }),
  component: PayPage,
});

const steps = ["Summary", "M-Pesa Number", "Confirm", "Success", "Failed"];

function PayPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState("");

  const go = (step: number) => navigate({ to: "/parent/payments/pay", search: { ...search, step } });

  const stepIdx = Math.min(search.step - 1, 3); // visual stepper only shows first 4

  return (
    <PortalShell role="parent" title="EDUCA Pay" subtitle="Secure mobile payment powered by M-Pesa.">
      <Link to="/parent/payments" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mb-5">
        <ArrowLeft className="h-4 w-4" /> Back to Payments
      </Link>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="rounded-3xl bg-card border border-border shadow-soft p-6 lg:p-8">
          <Stepper steps={steps.slice(0, 4)} current={stepIdx} />
          <div className="mt-8">
            {search.step === 1 && (
              <div>
                <h2 className="font-display text-xl font-bold text-navy">Payment Summary</h2>
                <p className="text-sm text-muted-foreground mt-1">Review the details before continuing.</p>
                <dl className="mt-6 rounded-2xl bg-navy text-white p-6 space-y-3">
                  <Row k="Student" v={search.student} />
                  <Row k="School / Party" v={search.school} />
                  <Row k="Payment Type" v={search.type} />
                  <Row k="Reference" v={search.ref} mono />
                  <div className="border-t border-white/15 pt-3 mt-3 flex items-end justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/60">Amount</span>
                    <span className="font-display text-3xl font-bold">KES {search.amount.toLocaleString()}</span>
                  </div>
                </dl>
                <button onClick={() => go(2)} className="mt-6 w-full inline-flex items-center justify-center rounded-xl bg-gold text-gold-foreground font-semibold py-3 hover:brightness-105">Continue</button>
              </div>
            )}
            {search.step === 2 && (
              <div>
                <h2 className="font-display text-xl font-bold text-navy">Enter M-Pesa Number</h2>
                <p className="text-sm text-muted-foreground mt-1">We'll send an STK Push to this phone.</p>
                <div className="mt-6 space-y-4 max-w-md">
                  <Field label="Phone Number" value={phone} onChange={setPhone} placeholder="07XX XXX XXX" />
                  <Field label="Confirm Phone Number" value={confirm} onChange={setConfirm} placeholder="07XX XXX XXX" />
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> EDUCA never stores your M-Pesa PIN.</div>
                <div className="mt-6 flex gap-2">
                  <button onClick={() => go(1)} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold">Back</button>
                  <button onClick={() => go(3)} className="flex-1 rounded-xl bg-gold text-gold-foreground font-semibold py-3 hover:brightness-105">Send STK Push</button>
                </div>
              </div>
            )}
            {search.step === 3 && (
              <div className="text-center py-6">
                <div className="mx-auto h-20 w-20 rounded-full bg-success/15 grid place-items-center">
                  <Loader2 className="h-8 w-8 text-success-foreground animate-spin" />
                </div>
                <h2 className="mt-5 font-display text-xl font-bold text-navy">Waiting for confirmation</h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">STK Push sent to <span className="font-semibold text-navy">{phone || "07XX XXX XXX"}</span>. Enter your M-Pesa PIN on your phone to complete payment.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-center">
                  <button onClick={() => go(4)} className="rounded-xl bg-success text-white font-semibold px-5 py-3 hover:brightness-105">Simulate Successful Payment</button>
                  <button onClick={() => go(5)} className="rounded-xl bg-destructive/10 text-destructive font-semibold px-5 py-3">Simulate Failed Payment</button>
                </div>
              </div>
            )}
            {search.step === 4 && (
              <div className="text-center py-6">
                <div className="mx-auto h-20 w-20 rounded-full bg-success/15 grid place-items-center">
                  <CheckCircle2 className="h-10 w-10 text-success-foreground" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-navy">Payment Successful</h2>
                <p className="mt-2 text-sm text-muted-foreground">Your payment has been received and a receipt has been generated.</p>
                <div className="mt-6 max-w-md mx-auto rounded-2xl bg-muted/40 p-5 text-left space-y-2 text-sm">
                  <Row k="Amount Paid" v={`KES ${search.amount.toLocaleString()}`} />
                  <Row k="Transaction Code" v="RJK7H2L9X1" mono />
                  <Row k="Payment Date" v={new Date().toLocaleString()} />
                  <Row k="Student" v={search.student} />
                  <Row k="School / Party" v={search.school} />
                  <Row k="Receipt Number" v="RCPT-2026-0001" mono />
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                  <Link to="/parent/receipts/$id" params={{ id: "rc-001" }} className="rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3">View Receipt</Link>
                  <Link to="/parent/payments" className="rounded-xl border border-border font-semibold px-5 py-3">Back to Payments</Link>
                </div>
              </div>
            )}
            {search.step === 5 && (
              <div className="text-center py-6">
                <div className="mx-auto h-20 w-20 rounded-full bg-destructive/10 grid place-items-center">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-navy">Payment Failed</h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">We couldn't complete this payment. The request may have timed out or been cancelled.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                  <button onClick={() => go(2)} className="rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3">Try Again</button>
                  <button onClick={() => go(2)} className="rounded-xl border border-border font-semibold px-5 py-3">Change Phone Number</button>
                  <button className="rounded-xl border border-border font-semibold px-5 py-3">Contact Support</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <aside className="rounded-3xl bg-navy text-white p-6 shadow-card h-fit">
          <div className="flex items-center gap-2 text-white/80"><Smartphone className="h-4 w-4 text-gold" /> <span className="text-xs uppercase tracking-wider font-semibold">Paying With</span></div>
          <h3 className="mt-2 font-display text-xl font-bold">M-Pesa</h3>
          <p className="mt-1 text-sm text-white/70">Fast, secure mobile money used by 50M+ Kenyans.</p>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0" /> Instant transaction confirmation</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0" /> Digital receipt sent to your inbox</li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold shrink-0" /> EDUCA never stores your PIN</li>
          </ul>
        </aside>
      </div>
    </PortalShell>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-white/60 text-xs uppercase tracking-wider">{k}</span>
      <span className={`font-semibold ${mono ? "font-mono" : ""}`}>{v}</span>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1.5 w-full h-12 rounded-xl border border-border bg-white px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}