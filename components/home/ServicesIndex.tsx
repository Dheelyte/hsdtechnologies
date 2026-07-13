"use client";

import { MouseEvent, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SERVICES } from "@/lib/data";
import ChapterMarker from "@/components/ui/ChapterMarker";

/** Abstract preview art per service (no stock photos — brand gradients). */
const PREVIEW_BG = [
  "linear-gradient(135deg, #c6ff3d 0%, #12121c 70%)",
  "radial-gradient(circle at 30% 30%, #c6ff3d55, transparent 60%), #12121c",
  "conic-gradient(from 120deg at 50% 50%, #6d5cff44, #c6ff3d33, #0a0a0f)",
  "repeating-linear-gradient(45deg, #12121c 0 14px, #0a0a0f 14px 28px), radial-gradient(circle at 70% 30%, #c6ff3d44, transparent)",
];

/**
 * Hover-reveal index: full-width rows that invert to ink on hover while a
 * floating preview card follows (and tilts with) the cursor.
 */
export default function ServicesIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const tilt = useMotionValue(0);
  const springTilt = useSpring(tilt, { stiffness: 120, damping: 16 });
  const lastX = useRef(0);

  const onMove = (e: MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left + 24);
    y.set(e.clientY - rect.top - 90);
    // tilt with cursor velocity
    const vx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    tilt.set(Math.max(-12, Math.min(12, vx * 0.6)));
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      data-chapter
      onMouseMove={onMove}
      className="relative scroll-mt-10 bg-paper px-6 py-20 text-ink md:px-10 md:py-28"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <ChapterMarker num="02" title="OUR CORE SERVICES" />
        <p className="micro text-ink/40">FOUR WAYS WE MOVE YOU FORWARD</p>
      </div>

      {/* floating preview card (desktop only) */}
      <motion.div
        aria-hidden
        style={{ x: springX, y: springY, rotate: springTilt }}
        className={`pointer-events-none absolute left-0 top-0 z-20 hidden h-44 w-60 transition-opacity duration-300 lg:block ${
          hovered !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="relative h-full w-full rounded-lg border border-ink/10 shadow-2xl"
          style={{ background: PREVIEW_BG[hovered ?? 0] }}
        >
          <span className="micro absolute bottom-3 left-4 text-paper/80">
            {hovered !== null ? SERVICES[hovered].num : ""} ✦ HSD
          </span>
        </div>
      </motion.div>

      <ul>
        {SERVICES.map((service, i) => (
          <li key={service.id} className="border-t border-ink/10 last:border-b">
            <Link
              href={`#${service.id}`}
              data-cursor="VIEW"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group flex items-baseline gap-5 py-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:gap-10 md:py-8 ${
                hovered === i ? "bg-ink px-4 text-paper md:py-12" : ""
              } ${hovered !== null && hovered !== i ? "opacity-30" : ""}`}
            >
              <span className={`micro ${hovered === i ? "text-paper/40" : "text-ink/40"}`}>
                {service.num}
              </span>
              <span
                className={`font-display text-3xl font-bold uppercase leading-none tracking-tight transition-colors duration-300 sm:text-4xl md:text-6xl ${
                  hovered === i ? "text-accent" : ""
                }`}
              >
                {service.name}
              </span>
              <span
                className={`ml-auto hidden max-w-56 text-right text-xs leading-relaxed md:block ${
                  hovered === i ? "text-paper/60" : "text-ink/50"
                }`}
              >
                {service.short}
              </span>
              <span
                className={`hidden transition-transform duration-500 group-hover:translate-x-2 md:block ${
                  hovered === i ? "text-accent" : "text-ink"
                }`}
                aria-hidden
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
