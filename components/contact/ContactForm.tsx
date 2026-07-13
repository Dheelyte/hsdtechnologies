"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/data";
import { PLAN_EVENT } from "@/lib/planSelect";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICE_TILES = [
  "Web Development",
  "Website Maintenance",
  "Social Media",
  "Branding & Identity",
  "Not sure yet",
] as const;

const PLAN_CHIPS = ["Basic", "Standard", "Premium", "Advise me"] as const;

const PLACEHOLDER = "Tell us about your project — goals, timeline, anything on your mind…";

function toChip(planId: string | null): string {
  if (!planId) return "";
  return PLAN_CHIPS.find((p) => p.toLowerCase() === planId.toLowerCase()) ?? "";
}

/** The message placeholder types itself out like a live demo. */
function useTypingPlaceholder(active: boolean) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(PLACEHOLDER);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setText(PLACEHOLDER.slice(0, i));
      if (i >= PLACEHOLDER.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [active]);
  return text;
}

/**
 * Conversational multi-step quote form:
 * 1. what do you need (multi-select tiles) → 2. which plan (chips, pre-fillable
 * via the plan-select event) → 3. name/email/message → success panel.
 * Frontend state only — wire the submit to email/backend later.
 */
export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [plan, setPlan] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const typingPlaceholder = useTypingPlaceholder(step === 2);

  // Pre-select a plan chosen via a "Get a Quote" CTA elsewhere on the page.
  useEffect(() => {
    let storedId: string | null = null;
    try {
      storedId = sessionStorage.getItem("hsd-plan");
    } catch {
      /* storage blocked */
    }
    const stored = toChip(storedId);
    if (stored) setPlan((p) => p || stored);

    const onSelect = (e: Event) => {
      const chip = toChip((e as CustomEvent<string>).detail);
      if (chip) setPlan(chip);
    };
    window.addEventListener(PLAN_EVENT, onSelect);
    return () => window.removeEventListener(PLAN_EVENT, onSelect);
  }, []);

  const toggleService = (tile: string) => {
    setServices((prev) =>
      prev.includes(tile) ? prev.filter((s) => s !== tile) : [...prev, tile]
    );
  };

  const canContinue =
    step === 0 ? services.length > 0 : step === 1 ? plan !== "" : name !== "" && email.includes("@");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    setSent(true);
  };

  const stepMotion = {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
    transition: { duration: 0.5, ease: EASE },
  };

  if (sent) {
    return (
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex min-h-[26rem] flex-col items-center justify-center rounded-xl bg-accent p-10 text-center text-ink"
        role="status"
      >
        <p className="font-display text-5xl font-bold uppercase tracking-tight md:text-6xl">
          Message sent ✦
        </p>
        <p className="mt-4 max-w-xs text-ink/70">
          We reply within 24 hours. Meanwhile — {SITE.handle} is always open.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grain relative rounded-xl bg-ink p-7 text-paper shadow-[10px_10px_0_0_var(--accent)] md:p-9"
    >
      {/* progress */}
      <div className="mb-8 flex items-center gap-4">
        <span className="micro text-paper/40">STEP {step + 1} / 3</span>
        <div className="h-px flex-1 bg-paper/10">
          <div
            className="h-full bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[19rem] overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.fieldset key="step-0" {...stepMotion}>
              <legend className="font-display text-2xl font-bold md:text-3xl">
                What do you need<span className="text-accent">?</span>
              </legend>
              <p className="micro mt-2 text-paper/40">PICK AS MANY AS APPLY</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {SERVICE_TILES.map((tile) => {
                  const on = services.includes(tile);
                  return (
                    <button
                      key={tile}
                      type="button"
                      onClick={() => toggleService(tile)}
                      data-cursor="PICK"
                      aria-pressed={on}
                      className={`rounded-lg border px-5 py-4 text-sm transition-all duration-300 ${
                        on
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-paper/20 hover:border-paper/60"
                      }`}
                    >
                      {on && <span aria-hidden>✦ </span>}
                      {tile}
                    </button>
                  );
                })}
              </div>
            </motion.fieldset>
          )}

          {step === 1 && (
            <motion.fieldset key="step-1" {...stepMotion}>
              <legend className="font-display text-2xl font-bold md:text-3xl">
                Which plan are you eyeing<span className="text-accent">?</span>
              </legend>
              <p className="micro mt-2 text-paper/40">WE&apos;LL CONFIRM FIT ON THE CALL</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {PLAN_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setPlan(chip)}
                    data-cursor="PICK"
                    aria-pressed={plan === chip}
                    className={`rounded-full border px-6 py-3.5 text-sm transition-all duration-300 ${
                      plan === chip
                        ? "border-accent bg-accent text-ink"
                        : "border-paper/20 hover:border-paper/60"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </motion.fieldset>
          )}

          {step === 2 && (
            <motion.div key="step-2" {...stepMotion} className="space-y-6">
              <p className="font-display text-2xl font-bold md:text-3xl">
                Almost there<span className="text-accent">.</span>
              </p>
              <label className="block">
                <span className="micro mb-2 block text-paper/40">YOUR NAME</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada from Lagos"
                  className="w-full border-b border-paper/30 bg-transparent pb-2.5 outline-none transition-colors placeholder:text-paper/25 focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="micro mb-2 block text-paper/40">EMAIL</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full border-b border-paper/30 bg-transparent pb-2.5 outline-none transition-colors placeholder:text-paper/25 focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="micro mb-2 block text-paper/40">THE PROJECT (OPTIONAL)</span>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={typingPlaceholder}
                  className="w-full resize-none border-b border-paper/30 bg-transparent pb-2.5 outline-none transition-colors placeholder:text-paper/25 focus:border-accent"
                />
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* nav */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          data-cursor="BACK"
          className={`micro text-paper/50 transition-opacity hover:text-paper ${
            step === 0 ? "pointer-events-none opacity-0" : ""
          }`}
        >
          ← Back
        </button>
        {step < 2 ? (
          <button
            type="button"
            onClick={() => canContinue && setStep((s) => s + 1)}
            data-cursor="NEXT"
            disabled={!canContinue}
            className="micro group flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-ink transition-all hover:bg-accent disabled:opacity-30"
          >
            Continue
            <span className="transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden>
              →
            </span>
          </button>
        ) : (
          <button
            type="submit"
            data-cursor="SEND"
            disabled={!canContinue}
            className="micro group flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-ink transition-all hover:bg-paper disabled:opacity-30"
          >
            Send it ✦
          </button>
        )}
      </div>
    </form>
  );
}
