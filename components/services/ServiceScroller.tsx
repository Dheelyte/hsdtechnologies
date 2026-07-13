"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { GLYPHS } from "@/components/services/Glyphs";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Each service "owns" a temperature — darkened for legibility on paper. */
const SERVICE_ACCENTS = ["#7ca300", "#b8860b", "#7c4dcc", "#0e7a9e"] as const;

/**
 * Sticky split-screen scroller: pinned left column with a morphing numeral and
 * per-service glyph; right column scrolls through each service's full content.
 * On mobile the glyph renders inline within each block.
 */
export default function ServiceScroller() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = blockRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    blockRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const ActiveGlyph = GLYPHS[active];

  return (
    <div className="grid lg:grid-cols-[42%_58%]">
      {/* ————— pinned left column ————— */}
      <div className="hidden lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 border-r border-ink/10 px-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="reveal-guard font-display text-[10rem] font-bold leading-none"
              style={{
                WebkitTextStroke: `2px ${SERVICE_ACCENTS[active]}`,
                color: "transparent",
              }}
              aria-hidden
            >
              {SERVICES[active].num}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`glyph-${active}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="reveal-guard"
            >
              <ActiveGlyph />
            </motion.div>
          </AnimatePresence>

          <div className="micro flex gap-4 text-ink/40" aria-hidden>
            {SERVICES.map((s, i) => (
              <span key={s.id} className={i === active ? "text-ink" : ""}>
                {s.num}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ————— scrolling right column ————— */}
      <div>
        {SERVICES.map((service, i) => {
          const accent = SERVICE_ACCENTS[i];
          const Glyph = GLYPHS[i];
          return (
            <section
              key={service.id}
              id={service.id}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              data-chapter
              className="flex min-h-screen scroll-mt-20 flex-col justify-center border-t border-ink/10 px-6 py-20 first:border-t-0 md:px-10 lg:py-0"
            >
              <p className="micro" style={{ color: accent }}>
                {service.num} / SERVICE
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink md:text-6xl">
                {service.name}
              </h2>
              <p className="mt-5 max-w-md text-ink/60">{service.short}</p>

              {/* stamped feature tags */}
              <ul className="mt-9 flex max-w-xl flex-wrap gap-3">
                {service.features.map((feature, j) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, y: 16, rotate: -2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: j * 0.08, ease: EASE }}
                    className="reveal-guard micro rounded-full border px-4 py-2.5 text-ink/75"
                    style={{ borderColor: `${accent}66` }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* inline glyph on mobile/tablet */}
              <div className="mt-10 lg:hidden">
                <Glyph />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
