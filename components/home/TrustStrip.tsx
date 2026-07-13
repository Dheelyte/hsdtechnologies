"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 100, suffix: "%", label: "CLIENT-FOCUSED", note: "Your goals set the brief. Always." },
  { value: null, text: "FAST", suffix: ".", label: "DELIVERY TIMES", note: "Momentum from day one to launch." },
  { value: 24, suffix: "/7", label: "SUPPORT", note: "We answer when it matters." },
] as const;

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    const DURATION = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / DURATION, 1);
      // expo-out
      setValue(Math.round(target * (1 - Math.pow(2, -10 * p))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

/** Dark chapter: three enormous stat lockups with slot-machine count-ups. */
export default function TrustStrip() {
  return (
    <section data-chapter className="grain relative bg-ink px-6 py-20 text-paper md:px-10 md:py-28">
      <div className="grid gap-14 md:grid-cols-3 md:gap-0 md:divide-x md:divide-paper/10">
        {STATS.map((stat) => (
          <div key={stat.label} className="md:px-10 md:first:pl-0 md:last:pr-0">
            <p className="font-display text-7xl font-bold tracking-tight md:text-8xl">
              {stat.value !== null ? (
                <CountUp target={stat.value} suffix={stat.suffix} />
              ) : (
                <>
                  {stat.text}
                  <span className="text-accent">{stat.suffix}</span>
                </>
              )}
            </p>
            <p className="micro mt-4 text-paper/50">{stat.label}</p>
            <p className="mt-2 text-sm text-paper/40">{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
