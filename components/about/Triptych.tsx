"use client";

import { useState } from "react";

const PILLARS = [
  {
    stat: "100%",
    label: "Client-Focused",
    proof: "Every decision starts with your goals — no house style forced on your business, no one-size-fits-all packages.",
  },
  {
    stat: "FAST",
    label: "Delivery Times",
    proof: "Clear scope, a five-step process, and momentum from day one. We ship, then we keep shipping.",
  },
  {
    stat: "24/7",
    label: "Support",
    proof: "Sites don't sleep and neither do problems. From 48-hour to priority 6-hour response, someone always answers.",
  },
] as const;

/** Interactive triptych: the hovered/tapped pillar expands — and inverts to ink. */
export default function Triptych() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3 md:h-96 md:flex-row">
      {PILLARS.map((pillar, i) => {
        const active = open === i;
        return (
          <button
            key={pillar.label}
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => setOpen(null)}
            onClick={() => setOpen(active ? null : i)}
            data-cursor="OPEN"
            aria-expanded={active}
            style={{ flexGrow: open === null ? 1 : active ? 2.4 : 0.7, transition: "flex-grow 0.7s var(--ease)" }}
            className={`relative min-w-0 overflow-hidden rounded-xl border p-7 text-left transition-colors duration-500 md:basis-0 ${
              active ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper text-ink"
            }`}
          >
            <p
              className={`font-display text-5xl font-bold tracking-tight md:text-6xl ${
                active ? "text-accent" : "text-stroke"
              }`}
            >
              {pillar.stat}
            </p>
            <p className={`micro mt-3 ${active ? "text-paper/60" : "text-ink/60"}`}>
              {pillar.label.toUpperCase()}
            </p>
            {/* proof text: always visible on mobile; hover/tap-revealed on md+ */}
            <p
              className={`mt-5 max-w-xs text-sm leading-relaxed transition-all duration-500 ${
                active
                  ? "translate-y-0 text-paper/70 opacity-100"
                  : "translate-y-0 text-ink/60 opacity-100 md:translate-y-3 md:opacity-0"
              }`}
            >
              {pillar.proof}
            </p>
            <span
              className={`absolute bottom-6 right-6 transition-transform duration-500 ${
                active ? "rotate-45 text-accent" : ""
              }`}
              aria-hidden
            >
              +
            </span>
          </button>
        );
      })}
    </div>
  );
}
