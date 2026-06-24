import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, Smartphone, Building2, CreditCard, ArrowRight, ArrowLeft } from "lucide-react";
import { Stepper } from "./Stepper";

const STEPS = ["Amount", "Method", "Phone", "Confirmation"];

export function DepositFlow({
  walletHomeTo,
  accountLabel,
}: {
  walletHomeTo: string;
  accountLabel: string;
}) {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("5000");
  const [purpose, setPurpose] = useState("");
  const [method, setMethod] = useState<"M-Pesa" | "Bank Transfer" | "Card">("M-Pesa");
  const [phone, setPhone] = useState("+254 722 110 220");
  const [result, setResult] = useState<"success" | "failed" | null>(null);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-card border border-border shadow-soft p-5 sm:p-6">
        <Stepper steps={STEPS} current={step} />
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-soft p-6 sm:p-8">
        {step === 0 && (
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-navy">How much would you like to deposit?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Funds will be added to {accountLabel}.</p>
            <label className="block mt-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Amount (KES)</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                inputMode="numeric"
                className="mt-1.5 w-full h-14 rounded-2xl border border-border bg-white px-5 text-2xl font-display font-bold text-navy outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {[500, 1000, 2500, 5000, 10000, 25000].map((v) => (
                <button key={v} type="button" onClick={() => setAmount(String(v))} className="rounded-full bg-muted text-foreground/80 px-4 py-1.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary">
                  KES {v.toLocaleString()}
                </button>
              ))}
            </div>
            <label className="block mt-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Purpose (optional)</span>
              <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Term 2 fees top-up" className="mt-1.5 w-full h-11 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary" />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-navy">Choose payment method</h2>
            <p className="mt-1 text-sm text-muted-foreground">Deposit KES {Number(amount).toLocaleString()} using:</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <MethodChoice icon={Smartphone} label="M-Pesa" active={method === "M-Pesa"} onClick={() => setMethod("M-Pesa")} desc="Instant via STK push" />
              <MethodChoice icon={Building2} label="Bank Transfer" active={method === "Bank Transfer"} onClick={() => setMethod("Bank Transfer")} desc="Coming soon" soon />
              <MethodChoice icon={CreditCard} label="Card" active={method === "Card"} onClick={() => setMethod("Card")} desc="Coming soon" soon />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-bold text-navy">Confirm phone number</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll send an M-Pesa prompt to this number.</p>
            <label className="block mt-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Phone Number</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 w-full h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary" />
            </label>
            <label className="block mt-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Confirm Phone Number</span>
              <input defaultValue={phone} className="mt-1.5 w-full h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary" />
            </label>
            <div className="mt-6 rounded-xl bg-navy/5 border border-border p-4 text-xs text-muted-foreground">
              You'll receive a prompt to enter your M-Pesa PIN. <span className="font-semibold text-navy">This is a demo — no real money is moved.</span>
            </div>
          </div>
        )}

        {step === 3 && result === null && (
          <div className="text-center py-6">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 grid place-items-center text-primary animate-pulse">
              <Smartphone className="h-7 w-7" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-navy">Waiting for M-Pesa confirmation…</h2>
            <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">Check your phone {phone} for the STK push. Use the demo buttons below to continue.</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button onClick={() => setResult("success")} className="rounded-xl bg-success/90 text-white font-semibold px-5 py-2.5 text-sm">Simulate Successful Deposit</button>
              <button onClick={() => setResult("failed")} className="rounded-xl bg-destructive text-white font-semibold px-5 py-2.5 text-sm">Simulate Failed Deposit</button>
            </div>
          </div>
        )}

        {step === 3 && result === "success" && (
          <div className="text-center py-6 max-w-md mx-auto">
            <div className="mx-auto h-20 w-20 rounded-full bg-success/15 grid place-items-center"><CheckCircle2 className="h-10 w-10 text-success-foreground" /></div>
            <h2 className="mt-5 font-display text-3xl font-bold text-navy">Deposit Successful</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your wallet has been topped up.</p>
            <dl className="mt-6 rounded-2xl bg-card border border-border p-5 text-left text-sm space-y-3">
              <Row k="Amount Deposited" v={`KES ${Number(amount).toLocaleString()}`} />
              <Row k="Transaction Code" v={`MPX${Math.floor(Math.random() * 9e6) + 1e6}`} mono />
              <Row k="Date" v={new Date().toLocaleString()} />
              <Row k="Method" v={method} />
              {purpose && <Row k="Purpose" v={purpose} />}
            </dl>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <Link to={walletHomeTo} className="rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-3">Back to Wallet</Link>
            </div>
          </div>
        )}

        {step === 3 && result === "failed" && (
          <div className="text-center py-6 max-w-md mx-auto">
            <div className="mx-auto h-20 w-20 rounded-full bg-destructive/15 grid place-items-center"><XCircle className="h-10 w-10 text-destructive" /></div>
            <h2 className="mt-5 font-display text-2xl font-bold text-navy">Deposit Failed</h2>
            <p className="mt-2 text-sm text-muted-foreground">The M-Pesa request was cancelled or timed out. No funds were moved.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <button onClick={() => { setResult(null); setStep(2); }} className="rounded-xl bg-navy text-white font-semibold px-5 py-3">Try Again</button>
              <Link to={walletHomeTo} className="rounded-xl bg-muted text-navy font-semibold px-5 py-3">Cancel</Link>
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="mt-8 flex items-center justify-between">
            <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-xl bg-muted text-foreground/80 font-semibold px-4 py-2.5 text-sm disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground font-semibold px-5 py-2.5 text-sm shadow-glow">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MethodChoice({ icon: Icon, label, active, onClick, desc, soon }: { icon: any; label: string; active: boolean; onClick: () => void; desc: string; soon?: boolean }) {
  return (
    <button onClick={onClick} className={`rounded-2xl border-2 p-5 text-left transition relative ${active ? "border-primary bg-primary/5" : "border-border bg-white hover:border-primary/40"}`}>
      <Icon className={`h-6 w-6 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <p className="mt-3 font-display font-semibold text-navy">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      {soon && <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-gold/30 text-gold-foreground px-2 py-0.5 rounded-full">Soon</span>}
    </button>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={`font-semibold text-navy ${mono ? "font-mono" : ""}`}>{v}</dd>
    </div>
  );
}