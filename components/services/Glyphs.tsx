/**
 * Abstract animated glyphs — one per service. Dark "device" cards that pop
 * against the paper background. Pure CSS loops (see globals.css keyframes).
 */

/** 01 — Web Development: a mini browser window that builds itself on loop. */
export function BrowserGlyph() {
  return (
    <div className="w-64 rounded-xl border border-paper/15 bg-ink-2 p-3 text-paper shadow-2xl">
      <div className="mb-3 flex items-center gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-paper/25" />
        <span className="h-2 w-2 rounded-full bg-paper/25" />
        <span className="h-2 w-2 rounded-full bg-accent/60" />
        <span className="micro ml-2 text-[0.55rem] text-paper/30">hsdtechnologies.com</span>
      </div>
      <div className="space-y-2" aria-hidden>
        <div className="build-el h-5 w-3/4 rounded" style={{ "--d": "0s" } as React.CSSProperties} />
        <div className="build-el h-2.5 w-full rounded" style={{ "--d": "0.25s", "--build-final": "rgba(244,241,234,0.25)" } as React.CSSProperties} />
        <div className="build-el h-2.5 w-5/6 rounded" style={{ "--d": "0.4s", "--build-final": "rgba(244,241,234,0.25)" } as React.CSSProperties} />
        <div className="flex gap-2">
          <div className="build-el h-7 w-24 rounded-full" style={{ "--d": "0.6s" } as React.CSSProperties} />
          <div className="build-el h-7 w-16 rounded-full" style={{ "--d": "0.75s", "--build-final": "rgba(244,241,234,0.2)" } as React.CSSProperties} />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[0.9, 1.05, 1.2].map((d) => (
            <div key={d} className="build-el h-10 rounded" style={{ "--d": `${d}s`, "--build-final": "rgba(198,255,61,0.35)" } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** 02 — Maintenance: a live uptime graph drawing itself with a 99.9% readout. */
export function UptimeGlyph() {
  return (
    <div className="w-64 rounded-xl border border-paper/15 bg-ink-2 p-4 text-paper shadow-2xl">
      <div className="micro flex justify-between text-paper/40">
        <span>UPTIME</span>
        <span className="text-accent">99.9%</span>
      </div>
      <svg viewBox="0 0 240 90" className="mt-2 w-full" aria-hidden>
        <path
          d="M0 70 L20 68 L40 45 L60 52 L80 30 L100 38 L120 22 L140 30 L160 18 L180 26 L200 12 L220 20 L240 8"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          className="uptime-path"
        />
        {[0, 60, 120, 180, 240].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="90" stroke="rgba(244,241,234,0.07)" />
        ))}
      </svg>
      <div className="micro flex justify-between text-[0.55rem] text-paper/25" aria-hidden>
        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span>
      </div>
    </div>
  );
}

/** 03 — Social: chat bubbles orbiting the brand. */
export function SocialGlyph() {
  return (
    <div className="relative flex h-56 w-56 items-center justify-center text-paper">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/50 bg-ink-2 font-display font-bold text-paper">
        HSD
      </div>
      <span className="absolute inset-8 rounded-full border border-dashed border-ink/15" aria-hidden />
      {[
        { label: "♥ 1.2K", d: "0s" },
        { label: "@YOU", d: "-2.6s" },
        { label: "SHARE", d: "-5.3s" },
      ].map((bubble) => (
        <span
          key={bubble.label}
          className="orbit-bubble micro absolute rounded-full border border-paper/20 bg-ink px-3 py-1.5 text-paper/70"
          style={{ "--d": bubble.d } as React.CSSProperties}
          aria-hidden
        >
          {bubble.label}
        </span>
      ))}
    </div>
  );
}

/** 04 — Branding: a morphing logomark blob + palette swatches. */
export function BrandGlyph() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="blob flex h-36 w-36 items-center justify-center bg-accent font-display text-2xl font-bold text-ink">
        H✦
      </div>
      <div className="flex gap-2" aria-hidden>
        {["#C6FF3D", "#F4F1EA", "#12121C", "#6D5CFF"].map((c) => (
          <span key={c} className="h-5 w-9 rounded-sm border border-ink/15" style={{ background: c }} />
        ))}
      </div>
      <p className="micro text-ink/40">IDENTITY SYSTEM v1.0</p>
    </div>
  );
}

export const GLYPHS = [BrowserGlyph, UptimeGlyph, SocialGlyph, BrandGlyph];
