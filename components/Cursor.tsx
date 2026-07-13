"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor (fine pointers only): a small dot plus a trailing ring that
 * morphs into a label ("VIEW", "DRAG", "→"…) over elements with [data-cursor].
 * mix-blend-difference inverts it over light and dark chapters alike.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-live");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = (e.target as HTMLElement).closest?.("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cursor-live");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 rounded-full bg-paper mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full transition-[width,height,background] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          label
            ? "h-14 w-14 bg-accent text-ink"
            : "h-9 w-9 border border-paper/70 mix-blend-difference"
        }`}
      >
        {label && (
          <span className="micro select-none text-[0.55rem] tracking-widest">{label}</span>
        )}
      </div>
    </>
  );
}
