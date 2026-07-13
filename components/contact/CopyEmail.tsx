"use client";

import { useState } from "react";
import { SITE } from "@/lib/data";

/** Email address that copies itself to the clipboard with a "Copied ✦" toast. */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <span className="relative inline-block">
      <button
        onClick={copy}
        data-cursor="COPY"
        className="draw-underline block font-display text-xl normal-case tracking-normal text-ink md:text-2xl"
      >
        {SITE.email}
      </button>
      <span
        role="status"
        className={`micro absolute -top-7 left-0 rounded-full bg-ink px-3 py-1 text-accent transition-all duration-300 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        COPIED ✦
      </span>
    </span>
  );
}
