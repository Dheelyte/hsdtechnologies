"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
};

type Props = {
  className?: string;
  /** "repel": particles part around the cursor. "drift": slow starfield. */
  mode?: "repel" | "drift";
  count?: number;
  /** "light": ink particles for light sections. "dark": paper particles for dark sections. */
  theme?: "light" | "dark";
};

/** Lightweight 2D canvas particle field. Pauses offscreen; static under reduced motion. */
export default function ParticleField({
  className = "",
  mode = "repel",
  count = 110,
  theme = "dark",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (mode === "drift" ? 0.12 : 0.25),
        vy: (Math.random() - 0.5) * (mode === "drift" ? 0.12 : 0.25),
        r: Math.random() * 1.6 + 0.5,
        accent: Math.random() < 0.12,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;

          if (mode === "repel") {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist2 = dx * dx + dy * dy;
            const range = 120;
            if (dist2 < range * range && dist2 > 0.01) {
              const dist = Math.sqrt(dist2);
              const force = ((range - dist) / range) * 1.6;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.accent
          ? theme === "light"
            ? "rgba(124, 163, 0, 0.7)"
            : "rgba(198, 255, 61, 0.65)"
          : theme === "light"
            ? "rgba(10, 10, 15, 0.22)"
            : "rgba(244, 241, 234, 0.28)";
        ctx.fill();
      }
      if (!reduced && running) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    resize();
    seed();
    draw();

    // pause when offscreen
    const io = new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning && !reduced) raf = requestAnimationFrame(draw);
      if (!running) cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    window.addEventListener("resize", resize);
    if (mode === "repel") window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mode, count, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
