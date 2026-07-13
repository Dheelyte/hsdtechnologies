"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Looping micro-animations for the five process phases.
 * All designed for a dark "device chip" background (accent-on-ink).
 */

/** 01 Discover — a scanning radar sweep. */
export function RadarAnim() {
  return (
    <div className="relative h-28 w-28" aria-hidden>
      <div className="absolute inset-0 rounded-full border border-paper/20" />
      <div className="absolute inset-4 rounded-full border border-paper/15" />
      <div className="absolute inset-8 rounded-full border border-paper/10" />
      <div className="radar-sweep absolute inset-0 rounded-full" />
      <span className="absolute left-[68%] top-[30%] h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="absolute left-[35%] top-[62%] h-1 w-1 rounded-full bg-accent/60" />
    </div>
  );
}

/** 02 Strategize — blueprint nodes connecting themselves. */
export function BlueprintAnim() {
  return (
    <svg viewBox="0 0 160 110" className="h-28 w-40" aria-hidden>
      {[
        [20, 20],
        [140, 30],
        [40, 90],
        [120, 85],
        [80, 55],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="var(--ink)" stroke="var(--accent)" strokeWidth="1.5" />
      ))}
      {[
        "M20 20 L80 55",
        "M140 30 L80 55",
        "M40 90 L80 55",
        "M120 85 L80 55",
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="rgba(244,241,234,0.4)"
          strokeWidth="1"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.35, 0.8, 1], delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

const CODE_LINES = [
  "const site = new HSD.Project();",
  "site.design({ bold: true });",
  "site.build(\"fast\");",
  "await site.review(client);",
] as const;

/** 03 Build — code lines typing themselves. */
export function CodeAnim() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [chars, setChars] = useState(0);
  const total = CODE_LINES.join("\n").length;

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setChars((c) => (c >= total ? 0 : c + 1));
    }, 55);
    return () => clearInterval(id);
  }, [inView, total]);

  let remaining = chars;
  return (
    <div ref={ref} className="micro w-56 space-y-1.5 text-left text-[0.6rem] normal-case tracking-normal text-paper/70" aria-hidden>
      {CODE_LINES.map((codeLine, i) => {
        const visible = codeLine.slice(0, Math.max(0, remaining));
        remaining -= codeLine.length;
        const isTyping = remaining < 0 && remaining > -codeLine.length - 1;
        return (
          <p key={i} className={isTyping ? "caret" : ""}>
            <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>{" "}
            {visible}
          </p>
        );
      })}
    </div>
  );
}

/** 04 Launch — a deploy bar hitting 100% then a ✦ burst. */
export function LaunchAnim() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [pct, setPct] = useState(0);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          setBurst(true);
          setTimeout(() => setBurst(false), 900);
          return 0;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="relative w-52" aria-hidden>
      <div className="micro mb-2 flex justify-between text-paper/40">
        <span>DEPLOY</span>
        <span className={pct >= 100 ? "text-accent" : ""}>{pct >= 100 ? "LIVE ✦" : `${pct}%`}</span>
      </div>
      <div className="h-2 rounded-full bg-paper/10">
        <div className="h-full rounded-full bg-accent transition-[width] duration-100" style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      {burst &&
        [...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute right-0 top-0 text-accent"
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
            animate={{
              opacity: 0,
              x: Math.cos((i / 6) * Math.PI * 2) * 34,
              y: Math.sin((i / 6) * Math.PI * 2) * 34,
              scale: 1.1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ✦
          </motion.span>
        ))}
    </div>
  );
}

/** 05 Grow — a chart line climbing past its container. */
export function GrowthAnim() {
  return (
    <svg viewBox="0 0 200 100" className="h-24 w-52" aria-hidden>
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(244,241,234,0.1)" />
      ))}
      <motion.path
        d="M0 92 L40 80 L70 84 L110 55 L140 62 L175 25 L200 2"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 3.5, times: [0, 0.6, 1], repeat: Infinity }}
      />
      <motion.circle
        r="4"
        fill="var(--accent)"
        initial={{ cx: 200, cy: 2, opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{ duration: 3.5, times: [0, 0.55, 0.65, 1], repeat: Infinity }}
        cx="200"
        cy="2"
      />
    </svg>
  );
}

export const PROCESS_ANIMS = [RadarAnim, BlueprintAnim, CodeAnim, LaunchAnim, GrowthAnim];
