"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** "brighten": words fade 15%→100% opacity. "accent": words tint to the accent. */
  mode?: "brighten" | "accent";
};

function Word({
  word,
  progress,
  range,
  mode,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  mode: "brighten" | "accent";
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["rgba(198,255,61,0)", "rgba(198,255,61,1)"]);

  return (
    <motion.span
      style={mode === "brighten" ? { opacity } : { color }}
      className="reveal-guard inline-block"
    >
      {word}&nbsp;
    </motion.span>
  );
}

/** Karaoke-style text: words highlight sequentially as they pass the viewport center. */
export default function Karaoke({ text, className = "", mode = "brighten" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  // wide window: words light up progressively while the paragraph crosses
  // the middle band of the viewport, not in one instant
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 35%"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, Math.min((i + 1.5) / words.length, 1)]}
          mode={mode}
        />
      ))}
    </p>
  );
}
