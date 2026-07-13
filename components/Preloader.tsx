"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function hasSeenPreloader(): boolean {
  try {
    return !!sessionStorage.getItem("hsd-preloaded");
  } catch {
    return true; // storage blocked → never risk trapping the visitor
  }
}

/**
 * First-visit preloader: H / S / D letters assemble with a 0→100 counter,
 * then the screen splits open. sessionStorage-gated, ~2.2s, skippable by click.
 *
 * Fail-safes: the overlay carries a pure-CSS `preloader-failsafe` animation that
 * dissolves it after ~4s even if hydration never happens, and a JS timeout
 * forces the exit if the rAF counter stalls.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"boot" | "run" | "exit" | "done">("boot");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (hasSeenPreloader()) {
      setPhase("done");
      return;
    }
    try {
      sessionStorage.setItem("hsd-preloaded", "1");
    } catch {
      /* ignore */
    }
    setPhase("run");

    const t0 = performance.now();
    const DURATION = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / DURATION, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPhase("exit");
    };
    raf = requestAnimationFrame(tick);

    // belt-and-suspenders: if anything stalls the counter, force the exit
    const failsafe = setTimeout(() => {
      setPhase((p) => (p === "run" || p === "boot" ? "exit" : p));
    }, 3000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, []);

  if (phase === "done") return null;

  const splitting = phase === "exit";

  return (
    <AnimatePresence>
      {phase !== ("done" as string) && (
        <motion.div
          key="preloader"
          className="preloader-failsafe fixed inset-0 z-[100]"
          onClick={() => setPhase("exit")}
          aria-hidden
        >
          {/* top panel */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-paper"
            animate={splitting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            onAnimationComplete={() => splitting && setPhase("done")}
          />
          {/* bottom panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-paper"
            animate={splitting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          {/* content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            animate={splitting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex gap-3 overflow-hidden font-display text-6xl font-bold tracking-tight md:text-8xl">
              {["H", "S", "D"].map((l, i) => (
                <motion.span
                  key={l}
                  initial={{ y: "120%", rotate: 8 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                  className={i === 2 ? "marker" : "text-ink"}
                >
                  {l}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 180 }}
                transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                className="self-start text-2xl text-ink md:text-3xl"
              >
                ✦
              </motion.span>
            </div>
            <div className="micro flex w-48 items-center justify-between text-ink/50 md:w-64">
              <span>LOADING</span>
              <span className="tabular-nums text-ink">{count}%</span>
            </div>
            <div className="h-px w-48 bg-ink/10 md:w-64">
              <div
                className="h-full bg-ink transition-[width] duration-100 ease-linear"
                style={{ width: `${count}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
