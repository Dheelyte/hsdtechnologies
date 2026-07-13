"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { PLAN_MATRIX, PLANS } from "@/lib/data";
import { selectPlan } from "@/lib/planSelect";

/** Ink checkmark that draws itself when scrolled into view. */
function Check() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <svg
      ref={ref}
      viewBox="0 0 20 20"
      className={`mx-auto h-5 w-5 ${inView ? "in-view" : ""}`}
      aria-label="Included"
      role="img"
    >
      <path
        d="M4 10.5 8.5 15 16 6"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="check-path"
      />
    </svg>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check />;
  if (value === false)
    return (
      <span className="text-ink/20" aria-label="Not included">
        —
      </span>
    );
  return <span className="text-sm text-ink/80">{value}</span>;
}

export default function PlanMatrix() {
  return (
    <section data-chapter className="relative bg-paper px-6 py-20 text-ink md:px-10 md:py-28">
      <p className="micro mb-3 text-ink/50">{"// THE FULL BREAKDOWN"}</p>
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
        Plan vs plan <span className="text-stroke">vs plan</span>
      </h2>

      {/* ————— desktop matrix ————— */}
      <div className="mt-12 hidden md:block">
        {/* sticky plan headers */}
        <div className="sticky top-0 z-20 grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-4 border-b border-ink/20 bg-paper/95 py-4 backdrop-blur">
          <span className="micro self-end text-ink/40">FEATURE</span>
          {PLANS.map((plan) => (
            <div key={plan.id} className="text-center">
              {plan.badge && <p className="micro mb-1 text-ink/50">{plan.badge}</p>}
              <p className="font-display text-xl font-bold uppercase">{plan.name}</p>
            </div>
          ))}
        </div>

        {PLAN_MATRIX.map((group) => (
          <div key={group.category}>
            <h3 className="micro mt-10 mb-2 flex items-center gap-3">
              <span className="inline-block h-3.5 w-1.5 bg-accent" aria-hidden />
              {group.category.toUpperCase()}
            </h3>
            {group.rows.map((row, ri) => (
              <div
                key={ri}
                className="grid grid-cols-[1.2fr_1fr_1fr_1fr] items-center gap-4 border-b border-ink/10 py-3.5 transition-colors duration-200 hover:bg-accent/15"
              >
                <span className="text-sm text-ink/45">
                  {row.label ?? <span className="micro text-ink/25">·</span>}
                </span>
                {row.values.map((value, vi) => (
                  <div key={vi} className="text-center">
                    <Cell value={value} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        {/* CTA row */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-4 py-8">
          <span />
          {PLANS.map((plan) => (
            <div key={plan.id} className="text-center">
              <a
                href="#contact"
                onClick={() => selectPlan(plan.id)}
                data-cursor="QUOTE"
                className="micro inline-block rounded-full border border-ink/30 px-5 py-3 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-accent"
              >
                Get a Quote
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ————— mobile: per-plan accordions ————— */}
      <div className="mt-10 space-y-4 md:hidden">
        {PLANS.map((plan, pi) => (
          <details key={plan.id} className="group rounded-lg border border-ink/20">
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg font-bold uppercase">
                {plan.name}
                {plan.badge && <span className="micro ml-3 text-ink/50">{plan.badge}</span>}
              </span>
              <span className="transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-ink/10 px-5 py-4">
              {PLAN_MATRIX.map((group) => (
                <div key={group.category} className="mb-5">
                  <h4 className="micro mb-2 flex items-center gap-2">
                    <span className="inline-block h-3 w-1 bg-accent" aria-hidden />
                    {group.category.toUpperCase()}
                  </h4>
                  <ul className="space-y-1.5 text-sm text-ink/70">
                    {group.rows.map((row, ri) => {
                      const value = row.values[pi];
                      if (value === false) return null;
                      return (
                        <li key={ri} className="flex gap-2">
                          <span aria-hidden>✓</span>
                          {value === true ? row.label : value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <a
                href="#contact"
                onClick={() => selectPlan(plan.id)}
                className="micro mt-2 inline-block rounded-full bg-ink px-5 py-3 text-paper"
              >
                Get a Quote →
              </a>
            </div>
          </details>
        ))}
      </div>

      {/* stamped annotation */}
      <p className="micro mx-auto mt-16 max-w-md -rotate-1 border-2 border-dashed border-ink/40 bg-accent/20 p-5 text-center leading-relaxed text-ink/80">
        ★ ALL PLANS CAN BE CUSTOMIZED. SERVICES CAN BE BUNDLED OR TAKEN
        INDIVIDUALLY. PRICING PROVIDED UPON CONSULTATION.
      </p>
    </section>
  );
}
