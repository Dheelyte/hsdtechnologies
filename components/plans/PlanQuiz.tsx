"use client";

import { useState } from "react";
import { PlanId } from "@/lib/data";

/** Each option index maps to a plan: 0 → basic, 1 → standard, 2 → premium. */
const QUESTIONS = [
  {
    q: "WHERE IS YOUR BUSINESS RIGHT NOW?",
    options: ["Just starting out", "Growing steadily", "Established & scaling"],
  },
  {
    q: "WHAT'S THE MAIN GOAL?",
    options: ["Get online, look credible", "Grow my audience & brand", "A full digital partner"],
  },
  {
    q: "HOW ARE YOU THINKING ABOUT BUDGET?",
    options: ["Keep it lean", "Balanced investment", "Whatever wins"],
  },
] as const;

const PLAN_IDS: PlanId[] = ["basic", "standard", "premium"];

/**
 * "Build my plan" mini-quiz: three questions on tappable chips; the average
 * answer picks the plan and the explorer scrolls into view with a ribbon.
 */
export default function PlanQuiz({ onResult }: { onResult: (plan: PlanId) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);

  const pick = (qi: number, oi: number) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
    if (next.every((a) => a !== null)) {
      const avg = (next as number[]).reduce((a, b) => a + b, 0) / next.length;
      onResult(PLAN_IDS[Math.round(avg)]);
    }
  };

  return (
    <section data-chapter className="grain relative bg-ink px-6 py-20 text-paper md:px-10 md:py-28">
      <p className="micro mb-3 text-accent">✦ 30-SECOND MATCHMAKER</p>
      <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-5xl">
        Not sure? Build <span className="italic text-accent">your</span> plan.
      </h2>
      <p className="mt-4 max-w-md text-paper/60">
        Answer three quick questions and we&apos;ll point at the plan that fits.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        {QUESTIONS.map((question, qi) => (
          <fieldset key={question.q}>
            <legend className="micro mb-4 flex items-center gap-3 text-paper/50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-paper/30 text-[0.65rem]">
                {qi + 1}
              </span>
              {question.q}
            </legend>
            <div className="flex flex-wrap gap-3">
              {question.options.map((option, oi) => (
                <button
                  key={option}
                  onClick={() => pick(qi, oi)}
                  data-cursor="PICK"
                  aria-pressed={answers[qi] === oi}
                  className={`rounded-full border px-5 py-3 text-sm transition-all duration-300 ${
                    answers[qi] === oi
                      ? "border-accent bg-accent text-ink"
                      : "border-paper/25 hover:border-paper"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <p
        className={`micro mt-10 text-accent transition-opacity duration-500 ${
          answers.every((a) => a !== null) ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        ✦ MATCH FOUND — SEE YOUR RECOMMENDED PLAN ABOVE
      </p>
    </section>
  );
}
