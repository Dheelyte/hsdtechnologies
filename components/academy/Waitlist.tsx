"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Waitlist: oversized underlined email field; on submit the copy flips to a
 * success state with a ✦ burst. Frontend state only — wire to a backend later.
 */
export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setJoined(true);
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <AnimatePresence mode="wait">
        {!joined ? (
          <motion.form
            key="form"
            onSubmit={submit}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-end gap-6 sm:flex-row"
          >
            <label className="w-full flex-1 text-left">
              <span className="micro mb-3 block text-ink/50">YOUR EMAIL</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@futurebuilder.com"
                className="w-full border-b-2 border-ink/30 bg-transparent pb-3 font-display text-xl outline-none transition-colors placeholder:text-ink/25 focus:border-ink sm:text-2xl"
              />
            </label>
            <button
              type="submit"
              data-cursor="JOIN"
              className="micro group flex shrink-0 items-center gap-3 rounded-full bg-ink px-7 py-4 text-paper transition-colors hover:bg-accent hover:text-ink"
            >
              Be first in class
              <span className="transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden>
                →
              </span>
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="joined"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-4"
            role="status"
          >
            {/* ✦ burst */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 text-ink"
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i / 6) * Math.PI * 2) * 90,
                  y: Math.sin((i / 6) * Math.PI * 2) * 90,
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                aria-hidden
              >
                ✦
              </motion.span>
            ))}
            <p className="font-display text-3xl font-bold sm:text-4xl">
              You&apos;re on the list<span className="marker">.</span>
            </p>
            <p className="mt-3 text-ink/60">See you in class.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
