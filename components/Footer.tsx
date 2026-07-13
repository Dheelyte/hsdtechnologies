"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "@/components/ui/Marquee";
import { NAV_LINKS, SITE, SERVICES } from "@/lib/data";

/**
 * Footer as a destination: giant headline that fills with the accent color as
 * you scroll into it, opposing service marquees, and the contact block.
 */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  const serviceNames = SERVICES.map((s) => s.name);

  return (
    <footer ref={ref} className="grain relative overflow-hidden bg-ink text-paper">
      {/* opposing marquees */}
      <div className="border-b border-paper/10 py-4" aria-hidden>
        <Marquee items={serviceNames} className="micro text-paper/40" speed="30s" />
        <Marquee items={[...serviceNames].reverse()} className="micro mt-2 text-paper/25" speed="34s" reverse />
      </div>

      {/* giant CTA headline with scroll fill */}
      <div className="px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <p className="micro mb-6 text-paper/40">✦ READY WHEN YOU ARE</p>
        <Link href="#contact" data-cursor="TALK" className="block">
          <span className="relative block font-display text-[9.5vw] font-bold uppercase leading-[1.02] tracking-tight md:text-[6.5vw]">
            <span className="text-paper/25">Let&apos;s build something great</span>
            <motion.span
              aria-hidden
              style={{ clipPath: clip }}
              className="absolute inset-0 text-accent"
            >
              Let&apos;s build something great
            </motion.span>
          </span>
        </Link>

        <div className="mt-16 grid gap-10 border-t border-paper/10 pt-10 md:grid-cols-3">
          <div className="micro space-y-3 text-paper/50">
            <p className="text-paper/30">{"// CONTACT"}</p>
            <a
              href={`mailto:${SITE.email}`}
              data-cursor="MAIL"
              className="draw-underline block font-display text-lg normal-case tracking-normal text-paper"
            >
              {SITE.email}
            </a>
            <p>{SITE.handle.toUpperCase()}</p>
            <p suppressHydrationWarning>
              LAGOS —{" "}
              {new Intl.DateTimeFormat("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Africa/Lagos",
              }).format(new Date())}
            </p>
          </div>

          <nav aria-label="Sitemap" className="micro">
            <p className="mb-3 text-paper/30">{"// SITEMAP"}</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="GO"
                    className="text-paper/70 transition-colors hover:text-accent"
                  >
                    {link.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="micro flex flex-col justify-between gap-6 text-right text-paper/50 md:items-end">
            <p>
              EST. 2025 ✦ LAGOS, NIGERIA
              <br />
              BUILDING DIGITAL FUTURES
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-cursor="TOP"
              className="text-paper/70 transition-colors hover:text-accent"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>

        <div className="micro mt-10 flex flex-wrap justify-between gap-3 border-t border-paper/10 pt-6 text-paper/30">
          <p>© {new Date().getFullYear()} HSD TECHNOLOGIES — ALL RIGHTS RESERVED</p>
          <p>ONE SOLUTION AT A TIME ✦</p>
        </div>
      </div>
    </footer>
  );
}
