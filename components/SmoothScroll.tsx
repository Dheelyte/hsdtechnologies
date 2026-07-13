"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling for the whole page (respects reduced motion). */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // disarm the CSS hydration guards (see globals.css) the moment React is live
    document.documentElement.classList.add("hydrated");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.11, anchors: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
