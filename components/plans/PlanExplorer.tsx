"use client";

import { useState } from "react";
import { PLANS, PlanId } from "@/lib/data";
import { selectPlan } from "@/lib/planSelect";

/**
 * Interactive plan panels: the hovered panel expands while siblings compress.
 * On mobile a segmented control swaps full-width cards.
 */
export default function PlanExplorer({ recommended }: { recommended: PlanId | null }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState(1); // mobile segmented control

  return (
    <div id="plan-explorer" className="scroll-mt-28 px-6 md:px-10">
      {/* mobile segmented control */}
      <div className="mb-6 grid grid-cols-3 gap-1 rounded-full border border-ink/15 p-1 md:hidden" role="tablist" aria-label="Plans">
        {PLANS.map((plan, i) => (
          <button
            key={plan.id}
            role="tab"
            aria-selected={selected === i}
            onClick={() => setSelected(i)}
            className={`micro rounded-full py-2.5 transition-colors duration-300 ${
              selected === i ? "bg-ink text-accent" : "text-ink/60"
            }`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:h-[34rem] md:flex-row">
        {PLANS.map((plan, i) => {
          const featured = plan.id === "standard";
          const isRec = recommended === plan.id;
          const grow = hovered === null ? (featured ? 1.25 : 1) : hovered === i ? 2 : 0.75;
          return (
            <div
              key={plan.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ flexGrow: grow, transition: "flex-grow 0.7s var(--ease)" }}
              className={`relative min-w-0 overflow-hidden rounded-xl border bg-paper p-7 md:flex md:basis-0 md:flex-col ${
                selected === i ? "" : "hidden md:flex"
              } ${
                isRec
                  ? "border-ink shadow-[8px_8px_0_0_var(--accent)]"
                  : featured
                    ? "border-ink/60 shadow-[8px_8px_0_0_rgba(198,255,61,0.55)]"
                    : "border-ink/15 hover:border-ink/50"
              }`}
            >
              {isRec && (
                <span className="micro absolute right-0 top-6 rounded-l-full bg-ink px-4 py-1.5 text-accent">
                  ✦ RECOMMENDED FOR YOU
                </span>
              )}
              {plan.badge && !isRec && (
                <span className="orbit micro absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-ink">
                  {plan.badge}
                </span>
              )}

              <p className="micro text-ink/40">PLAN 0{i + 1}</p>
              <h3 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
                {plan.name}
              </h3>
              <p className="mt-1 italic text-ink/60">{plan.motto}</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">{plan.blurb}</p>

              <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-5 text-sm text-ink/80">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span aria-hidden>✦</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 md:mt-auto">
                <a
                  href="#contact"
                  onClick={() => selectPlan(plan.id)}
                  data-cursor="QUOTE"
                  className="micro group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent hover:text-ink"
                >
                  Get a Quote
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
