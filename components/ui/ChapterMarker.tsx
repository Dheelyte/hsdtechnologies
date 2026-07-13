type Props = {
  num: string;
  title: string;
  className?: string;
};

/** "▌ 01 SECTION TITLE" chapter marker, echoing the printed portfolio. */
export default function ChapterMarker({ num, title, className = "" }: Props) {
  return (
    <p className={`micro flex items-center gap-3 ${className}`}>
      <span className="inline-block h-4 w-2 bg-accent" aria-hidden />
      <span className="opacity-60">{num}</span>
      <span className="font-medium">{title}</span>
    </p>
  );
}
