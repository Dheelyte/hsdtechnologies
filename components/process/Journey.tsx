"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PROCESS } from "@/lib/data";
import { PROCESS_ANIMS } from "@/components/process/MicroAnims";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-driven journey: an SVG line snakes left-right down the page, drawing
 * itself as you scroll. Each phase node carries a ghosted numeral and a looping
 * micro-animation on a dark device chip. A fixed mini-map tracks the phase —
 * shown only while the journey itself is on screen (one-page layout).
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 75%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  // track which phase is centered
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = nodeRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    nodeRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // the mini-map is fixed — only show it while the journey itself is on screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setMapVisible(entry.isIntersecting),
      { rootMargin: "-25% 0px -25% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    nodeRefs.current[i]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  };

  return (
    <div ref={ref} className="relative px-6 pb-24 pt-10 md:px-10">
      {/* snaking line (desktop) */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M 15 1 C 60 5, 85 9, 80 19 C 75 29, 25 31, 20 39 C 15 47, 75 51, 80 59 C 85 67, 25 71, 20 79 C 15 87, 60 91, 70 99"
          fill="none"
          stroke="rgba(10,10,15,0.08)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M 15 1 C 60 5, 85 9, 80 19 C 75 29, 25 31, 20 39 C 15 47, 75 51, 80 59 C 85 67, 25 71, 20 79 C 15 87, 60 91, 70 99"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
          className="guard-path"
        />
      </svg>
      {/* vertical line (mobile) — draws itself with scroll like the desktop snake */}
      <div className="absolute bottom-0 left-[11px] top-0 w-px bg-ink/10 md:hidden" aria-hidden />
      <motion.div
        style={{ scaleY: pathLength }}
        className="absolute bottom-0 left-[10.5px] top-0 w-0.5 origin-top bg-ink md:hidden"
        aria-hidden
      />

      {/* fixed mini-map */}
      <nav
        aria-label="Process phases"
        className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 transition-opacity duration-500 lg:flex ${
          mapVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {PROCESS.map((step, i) => (
          <button
            key={step.num}
            onClick={() => jumpTo(i)}
            data-cursor="JUMP"
            aria-label={`Jump to phase ${step.num} — ${step.name}`}
            className={`micro flex items-center gap-2 transition-colors duration-300 ${
              active === i ? "text-ink" : "text-ink/30 hover:text-ink/70"
            }`}
          >
            <span
              className={`h-px transition-all duration-500 ${
                active === i ? "w-8 bg-ink" : "w-4 bg-ink/30"
              }`}
              aria-hidden
            />
            {step.num}
          </button>
        ))}
      </nav>

      {/* phase nodes */}
      <ol>
        {PROCESS.map((step, i) => {
          const Anim = PROCESS_ANIMS[i];
          const right = i % 2 === 1;
          return (
            <li key={step.num}>
              <motion.section
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className={`reveal-guard relative flex min-h-[62vh] flex-col justify-center pl-8 md:min-h-[65vh] md:w-1/2 md:pl-0 ${
                  right ? "md:ml-auto md:pr-10" : "md:pl-10"
                }`}
              >
                {/* ghosted numeral */}
                <span
                  className="text-stroke pointer-events-none absolute -top-16 left-0 -z-10 font-display text-[9rem] font-bold opacity-15 md:-left-8 md:text-[13rem]"
                  aria-hidden
                >
                  {step.num}
                </span>
                {/* mobile node dot */}
                <span
                  className="absolute left-[-19px] top-2 h-[15px] w-[15px] rounded-full border-2 border-ink bg-accent md:hidden"
                  aria-hidden
                />
                <p className="micro flex items-center gap-2 text-ink/50">
                  <span className="inline-block h-3 w-1.5 bg-accent" aria-hidden />
                  PHASE {step.num}
                </p>
                <h3 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
                  {step.name}
                </h3>
                <p className="mt-4 max-w-sm text-ink/60">{step.desc}</p>
                {/* micro-animation on a dark "device" chip for contrast */}
                <div className="mt-9 inline-block self-start rounded-xl bg-ink p-6 text-paper shadow-[6px_6px_0_0_var(--accent)]">
                  <Anim />
                </div>
              </motion.section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
