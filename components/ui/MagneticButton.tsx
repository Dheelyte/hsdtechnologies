"use client";

import { MouseEvent, ReactNode, useRef, useState } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "outline";
  cursorLabel?: string;
};

/**
 * Magnetic CTA: pulls toward the cursor; on hover the label rolls up and a
 * duplicate rolls in (split-flap). Falls back to a plain button on touch.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "solid",
  cursorLabel = "→",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.35,
    });
  };

  const styles =
    variant === "solid"
      ? "bg-accent text-ink hover:bg-ink hover:text-paper"
      : "border border-current text-inherit hover:border-accent hover:text-accent";

  const inner = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className={`micro inline-block rounded-full px-7 py-4 transition-[background,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles} ${className}`}
    >
      <span className="roll">
        <span className="roll-inner">
          <span>{children}</span>
          <span className="roll-dup" aria-hidden>{children}</span>
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} data-cursor={cursorLabel} onClick={onClick} className="inline-block">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} data-cursor={cursorLabel} className="inline-block">
      {inner}
    </button>
  );
}

/** Small text link with a sliding arrow. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-cursor="→"
      className={`micro group inline-flex items-center gap-3 ${className}`}
    >
      <span className="roll">
        <span className="roll-inner">
          <span>{children}</span>
          <span className="roll-dup" aria-hidden>{children}</span>
        </span>
      </span>
      <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
        →
      </span>
    </Link>
  );
}
