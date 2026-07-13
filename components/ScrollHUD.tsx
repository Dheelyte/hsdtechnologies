"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Scroll progress line along the top edge + the current chapter counter
 * ("04 / 18") fixed in the corner, driven by [data-chapter] sections.
 */
export default function ScrollHUD() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [chapter, setChapter] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const scan = () => {
      const sections = Array.from(document.querySelectorAll("[data-chapter]"));
      setTotal(sections.length);
      if (!sections.length) return () => {};
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setChapter(sections.indexOf(entry.target) + 1);
            }
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      sections.forEach((s) => io.observe(s));
      return () => io.disconnect();
    };
    // wait a tick for the page tree to settle
    const t = setTimeout(scan, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[82] h-0.5 origin-left bg-paper mix-blend-difference"
      />
      {total > 0 && (
        <div
          aria-hidden
          className="micro fixed bottom-5 right-6 z-[82] hidden text-paper mix-blend-difference md:block"
        >
          <span className="text-accent">{String(chapter).padStart(2, "0")}</span>
          {" / "}
          {String(total).padStart(2, "0")}
        </div>
      )}
    </>
  );
}
