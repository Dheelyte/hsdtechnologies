import ParticleField from "@/components/ParticleField";
import Karaoke from "@/components/ui/Karaoke";
import FlipClock from "@/components/academy/FlipClock";
import Waitlist from "@/components/academy/Waitlist";
import { ACADEMY_OFFERS, ACADEMY_VISION } from "@/lib/data";

/** Academy chapter: starfield teaser + countdown, vision, ticket deck, waitlist. */
export default function AcademySection() {
  return (
    <div id="academy" className="scroll-mt-10">
      {/* ————— dark starfield band: shimmer + countdown ————— */}
      <section
        data-chapter
        className="grain relative flex flex-col items-center justify-center overflow-hidden bg-ink px-6 py-24 text-center text-paper md:py-32"
      >
        <ParticleField className="absolute inset-0 h-full w-full" mode="drift" count={140} />
        <div className="relative z-10 flex flex-col items-center gap-7">
          <p className="micro flex items-center gap-3 rounded-full border border-accent/40 px-5 py-2.5 text-accent">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
            ✦ COMING SOON ✦
          </p>
          <h2 className="shimmer-text font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight md:text-8xl">
            HSD Academy
          </h2>
          <p className="max-w-md text-paper/60 md:text-lg">
            Empowering the next generation of web developers and designers.
          </p>
          <div className="mt-3">
            <FlipClock />
          </div>
          <p className="micro text-paper/35">FIRST COHORT — TARGETING LATE 2026</p>
        </div>
      </section>

      {/* ————— the vision ————— */}
      <section data-chapter className="bg-paper px-6 py-20 text-ink md:px-10 md:py-28">
        <p className="micro mb-10 text-ink/50">{"// THE ACADEMY VISION"}</p>
        <Karaoke
          mode="brighten"
          text="Talent is everywhere. Opportunity should be too."
          className="max-w-5xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
        />

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <p className="text-ink/60 md:col-span-4">
            HSD Academy is our upcoming educational arm — designed to
            democratize access to quality web development and design education
            across Africa and beyond.
          </p>
          <ul className="md:col-span-7 md:col-start-6">
            {ACADEMY_VISION.map((item, i) => (
              <li
                key={item}
                className={`flex items-baseline gap-5 border-t border-ink/15 py-4 last:border-b ${
                  i % 2 === 1 ? "md:pl-16" : ""
                }`}
              >
                <span className="micro text-ink/40">0{i + 1}</span>
                <span className="font-display text-lg font-bold md:text-xl">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ————— what's coming: ticket deck + waitlist ————— */}
      <section data-chapter className="relative overflow-hidden border-t border-ink/10 bg-paper py-20 text-ink md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 px-6 md:px-10">
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
            What&apos;s <span className="text-stroke">coming</span>
          </h3>
          <p className="micro text-ink/40">DRAG / SWIPE THE DECK →</p>
        </div>

        <div
          data-cursor="DRAG"
          className="no-scrollbar flex snap-x gap-6 overflow-x-auto px-6 pb-6 md:px-10"
        >
          {ACADEMY_OFFERS.map((offer, i) => (
            <article
              key={offer.code}
              className="ticket group relative w-80 shrink-0 snap-start bg-ink p-7 text-paper transition-transform duration-500 hover:-translate-y-2 md:w-96"
            >
              <div className="micro flex items-center justify-between text-accent">
                <span>{offer.code} {"//"} ADMIT ONE</span>
                <span aria-hidden>✦</span>
              </div>
              <div className="my-6 border-t border-dashed border-paper/20" aria-hidden />
              <p className="micro text-paper/35">MODULE 0{i + 1}</p>
              <h4 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
                {offer.name}
              </h4>
              <p className="mt-4 text-sm leading-relaxed text-paper/55">{offer.desc}</p>
              <div className="my-6 border-t border-dashed border-paper/20" aria-hidden />
              <p className="micro flex justify-between text-paper/35">
                <span>SEAT — TBA</span>
                <span>COHORT 01</span>
              </p>
            </article>
          ))}
        </div>

        {/* waitlist */}
        <div className="mt-16 border-t border-ink/10 px-6 pt-16 md:px-10">
          <p className="micro mb-4 text-center text-ink/50">✦ THE WAITLIST IS OPEN</p>
          <h3 className="mb-10 text-center font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
            Class of <span className="marker inline-block -rotate-1 italic">first</span>
          </h3>
          <Waitlist />
        </div>
      </section>
    </div>
  );
}
