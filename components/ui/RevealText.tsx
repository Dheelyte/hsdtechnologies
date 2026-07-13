"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  text: string;
  delay?: number;
  className?: string;
};

/**
 * Word-by-word masked slide-up reveal.
 * The InView sensor sits on the OUTER wrapper (never inside the overflow-hidden
 * masks — an observer inside a clipped box can never report visibility).
 */
export default function RevealText({ text, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="reveal-guard inline-block"
            initial={{ y: "112%" }}
            animate={inView ? { y: 0 } : { y: "112%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
