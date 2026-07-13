"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import Marquee from "@/components/ui/Marquee";
import MagneticButton, { ArrowLink } from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const TICKER = [
  "WEB DEVELOPMENT",
  "BRANDING",
  "SOCIAL MEDIA",
  "MAINTENANCE",
  "HSD ACADEMY",
] as const;

const line = (delay: number) => ({
  initial: { y: "112%" },
  animate: { y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // WOW: the outlined line fills with ink as you scroll the first 100vh
  const clip = useTransform(scrollYProgress, [0.02, 0.6], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const scrollFade = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      data-chapter
      className="grain relative flex min-h-svh flex-col justify-end overflow-hidden bg-paper"
    >
      <ParticleField className="absolute inset-0 h-full w-full" mode="repel" theme="light" />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-28 md:px-10">
        <div className="micro mb-8 flex items-center justify-between text-ink/50">
          <span>{"// DIGITAL SOLUTIONS AGENCY"}</span>
          <span className="hidden sm:block">EST. 2025 ✦ LAGOS</span>
        </div>

        <h1 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-ink">
          <span className="block overflow-hidden">
            <motion.span {...line(0.1)} className="reveal-guard block text-[13.5vw] md:text-[10.5vw]">
              Building
            </motion.span>
          </span>
          <span className="relative block overflow-hidden">
            <motion.span {...line(0.22)} className="reveal-guard block">
              <span className="text-stroke block text-[13.5vw] md:text-[10.5vw]">Digital</span>
              <motion.span
                aria-hidden
                style={{ clipPath: clip }}
                className="absolute inset-0 block text-[13.5vw] text-ink md:text-[10.5vw]"
              >
                Digital
              </motion.span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              {...line(0.34)}
              className="reveal-guard marker inline-block -rotate-1 pr-[0.06em] text-[13.5vw] italic md:text-[10.5vw]"
            >
              Futures
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="reveal-guard mt-10 flex flex-wrap items-center gap-6 md:mt-12"
        >
          <p className="max-w-xs text-sm leading-relaxed text-ink/60 md:max-w-sm md:text-base">
            One solution at a time — websites, brands, and audiences built to
            convert. The site you&apos;re on right now? We built it too.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <MagneticButton href="#contact">Start your project</MagneticButton>
            <ArrowLink href="#services" className="text-ink/70">
              Explore services
            </ArrowLink>
          </div>
        </motion.div>
      </div>

      {/* bottom edge: scroll cue + ticker */}
      <div className="relative z-10 mt-14">
        <motion.div
          style={{ opacity: scrollFade }}
          className="micro mb-5 flex items-center gap-3 px-6 text-ink/40 md:px-10"
          aria-hidden
        >
          [ SCROLL ]
          <span className="relative h-px w-16 overflow-hidden bg-ink/20">
            <motion.span
              className="absolute inset-y-0 w-8 bg-ink"
              animate={{ x: [-32, 64] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
        <div className="border-t border-ink/10 py-4">
          <Marquee items={TICKER} className="micro text-ink/60" speed="26s" separator="✦" />
        </div>
      </div>
    </section>
  );
}
