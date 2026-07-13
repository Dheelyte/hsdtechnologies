"use client";

import { ReactNode, useRef } from "react";

/** Section wrapper: a soft accent wash follows the cursor, illuminating the story. */
export default function Spotlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--sy", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 hidden md:block"
        style={{
          background:
            "radial-gradient(560px circle at var(--sx, 50%) var(--sy, 30%), rgba(198, 255, 61, 0.22), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}
