"use client";

import { useEffect, useState } from "react";

/** Change the Academy launch target here. */
const LAUNCH = new Date("2026-10-01T09:00:00+01:00");

type Parts = { days: string; hrs: string; min: string; sec: string };

function partsUntil(target: Date): Parts {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hrs = Math.floor((diff % 86_400_000) / 3_600_000);
  const min = Math.floor((diff % 3_600_000) / 60_000);
  const sec = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return { days: pad(days), hrs: pad(hrs), min: pad(min), sec: pad(sec) };
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-16 rounded-lg border border-paper/15 bg-ink-2 py-4 text-center font-display text-3xl font-bold tabular-nums text-paper md:w-20 md:text-4xl">
        {value}
        {/* flip-clock hinge */}
        <span className="absolute inset-x-0 top-1/2 h-px bg-ink" aria-hidden />
      </div>
      <span className="micro text-paper/40">{label}</span>
    </div>
  );
}

/** Flip-clock countdown to the Academy launch. Renders after mount (hydration-safe). */
export default function FlipClock() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(partsUntil(LAUNCH));
    const id = setInterval(() => setParts(partsUntil(LAUNCH)), 1000);
    return () => clearInterval(id);
  }, []);

  if (!parts) {
    return <div className="h-[7.5rem]" aria-hidden />;
  }

  return (
    <div className="flex items-start gap-3 md:gap-4" role="timer" aria-label="Countdown to launch">
      <Unit value={parts.days} label="DAYS" />
      <span className="pt-5 text-paper/30" aria-hidden>:</span>
      <Unit value={parts.hrs} label="HRS" />
      <span className="pt-5 text-paper/30" aria-hidden>:</span>
      <Unit value={parts.min} label="MIN" />
      <span className="pt-5 text-paper/30" aria-hidden>:</span>
      <Unit value={parts.sec} label="SEC" />
    </div>
  );
}
