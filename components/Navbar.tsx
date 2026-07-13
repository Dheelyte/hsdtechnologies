"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Abstract gradient per section shown as the hover preview in the fullscreen menu. */
const PREVIEWS: Record<string, string> = {
  "#home": "radial-gradient(circle at 30% 30%, #c6ff3d 0%, transparent 55%), linear-gradient(135deg, #12121c, #0a0a0f)",
  "#about": "radial-gradient(circle at 70% 30%, #f4f1ea22 0%, transparent 50%), linear-gradient(200deg, #12121c, #0a0a0f)",
  "#services": "conic-gradient(from 200deg at 60% 40%, #c6ff3d22, #6d5cff44, #0a0a0f)",
  "#plans": "linear-gradient(160deg, #c6ff3d 0%, #12121c 45%, #0a0a0f 100%)",
  "#process": "repeating-linear-gradient(45deg, #12121c 0 22px, #0a0a0f 22px 44px), radial-gradient(circle at 70% 70%, #c6ff3d33, transparent)",
  "#academy": "radial-gradient(ellipse at 50% 100%, #6d5cff55 0%, transparent 60%), #0a0a0f",
  "#team": "radial-gradient(circle at 25% 75%, #c6ff3d44 0%, transparent 50%), linear-gradient(160deg, #16162a, #0a0a0f)",
  "#contact": "linear-gradient(120deg, #0a0a0f 40%, #c6ff3d 140%)",
};

/** Running local time for Lagos — rendered client-side only (hydration-safe). */
export function LagosTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Lagos",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>LAGOS — {time}</span>;
}

/**
 * Top bar: transparent + mix-blend-difference over content (readable on light
 * AND dark chapters), morphing into a dark glass pill once scrolled. Hides on
 * scroll-down so it never collides with sticky in-page headers.
 * The menu opens as a fullscreen dark takeover with staggered oversized links.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > 400 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* mix-blend-difference must live on the fixed element itself — a child
          blend gets isolated by the header's own stacking context and turns
          invisible over same-colored backgrounds. */}
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !open ? "-translate-y-full" : ""
        } ${scrolled ? "" : "mix-blend-difference"}`}
      >
        <div
          className={`mx-auto flex items-center justify-between text-paper transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "mt-3 max-w-3xl rounded-full border border-paper/15 bg-ink/85 px-6 py-3 backdrop-blur-xl mx-4 sm:mx-auto"
              : "max-w-none border border-transparent bg-transparent px-6 py-5 md:px-10"
          }`}
        >
          <Link
            href="#home"
            data-cursor="HOME"
            className="font-display text-lg font-bold tracking-tight"
            aria-label="HSD Technologies — home"
          >
            HSD<span className={scrolled ? "text-accent" : ""} aria-hidden>✦</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="#contact"
              data-cursor="→"
              className="micro hidden rounded-full border border-paper/30 px-5 py-2.5 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink sm:inline-block"
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setOpen(true)}
              data-cursor="OPEN"
              aria-label="Open menu"
              aria-expanded={open}
              className="group micro flex items-center gap-3"
            >
              Menu
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span className="h-px w-6 bg-paper transition-all duration-300 group-hover:w-4" />
                <span className="h-px w-6 bg-paper transition-all duration-300" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ————— fullscreen takeover menu ————— */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grain fixed inset-0 z-[85] overflow-y-auto bg-ink text-paper"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* hover preview */}
            <div
              aria-hidden
              className="pointer-events-none fixed right-[8%] top-1/2 hidden h-64 w-52 -translate-y-1/2 rotate-3 rounded-lg opacity-0 transition-opacity duration-300 lg:block"
              style={{
                background: hovered ? PREVIEWS[hovered] : undefined,
                opacity: hovered ? 1 : 0,
              }}
            />

            <div className="flex min-h-svh flex-col px-6 py-6 md:px-10">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold tracking-tight">
                  HSD<span className="text-accent" aria-hidden>✦</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  data-cursor="CLOSE"
                  aria-label="Close menu"
                  className="micro flex items-center gap-2"
                >
                  Close <span aria-hidden>✕</span>
                </button>
              </div>

              <nav className="my-auto py-14" aria-label="Sections">
                <ul>
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.href} className="overflow-hidden border-b border-paper/10">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ duration: 0.7, delay: 0.08 + i * 0.055, ease: EASE }}
                      >
                        <Link
                          href={link.href}
                          data-cursor="GO"
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setHovered(link.href)}
                          onMouseLeave={() => setHovered(null)}
                          className="group flex items-baseline gap-4 py-3 md:gap-8 md:py-4"
                        >
                          <span className="micro text-paper/30">{link.num}</span>
                          <span className="font-display text-4xl font-bold uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-5xl md:text-7xl">
                            {link.name}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="micro flex flex-wrap items-center justify-between gap-3 text-paper/50">
                <a href={`mailto:${SITE.email}`} className="draw-underline">
                  {SITE.email}
                </a>
                <span>{SITE.handle}</span>
                <LagosTime />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
