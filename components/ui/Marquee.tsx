type Props = {
  items: readonly string[];
  className?: string;
  /** CSS duration, e.g. "26s" */
  speed?: string;
  separator?: string;
  reverse?: boolean;
};

/** Infinite CSS marquee — content duplicated once, track slides -50%. */
export default function Marquee({
  items,
  className = "",
  speed = "28s",
  separator = "✦",
  reverse = false,
}: Props) {
  const row = (hidden: boolean) => (
    <span className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-5">{item}</span>
          <span className="text-accent" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-speed": speed } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
