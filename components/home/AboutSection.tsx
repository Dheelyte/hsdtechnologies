import ChapterMarker from "@/components/ui/ChapterMarker";
import Karaoke from "@/components/ui/Karaoke";
import Marquee from "@/components/ui/Marquee";
import Spotlight from "@/components/about/Spotlight";
import Triptych from "@/components/about/Triptych";

const VALUES = [
  {
    name: "Creative excellence",
    desc: "Design that carries a point of view. If it looks like a template, it goes back.",
  },
  {
    name: "Technical expertise",
    desc: "Modern, fast, SEO-friendly builds — engineering that holds up after launch day.",
  },
  {
    name: "Measurable results",
    desc: "Traffic, conversions, engagement. We aim at numbers that matter, not vanity metrics.",
  },
  {
    name: "True partnership",
    desc: "From first call to ongoing growth — we stay in the room after the site goes live.",
  },
];

/** About chapter: mission karaoke + pillars triptych + values + "currently" ticker. */
export default function AboutSection() {
  return (
    <div id="about" className="scroll-mt-10">
      <Spotlight>
        <section data-chapter className="bg-paper px-6 py-20 text-ink md:px-10 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <ChapterMarker num="01" title="ABOUT HSD TECHNOLOGIES" />
            <p className="micro text-ink/40">WHO WE ARE</p>
          </div>
          <Karaoke
            mode="brighten"
            text="HSD Technologies is a dynamic digital solutions company dedicated to helping businesses and individuals establish a powerful online presence — combining creative excellence with technical expertise to deliver measurable results that matter."
            className="max-w-6xl font-display text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl"
          />
          <div className="mt-16">
            <p className="micro mb-8 text-ink/50">{"// WHAT WE PROMISE"}</p>
            <Triptych />
          </div>
        </section>
      </Spotlight>

      {/* values — dark chapter, sticky two-column */}
      <section data-chapter className="grain relative bg-ink px-6 py-20 text-paper md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="micro mb-4 text-paper/50">{"// WHAT DRIVES US"}</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">
              Four things
              <br />
              we don&apos;t
              <br />
              <span className="italic text-accent">compromise.</span>
            </h2>
          </div>
          <ul>
            {VALUES.map((value, i) => (
              <li key={value.name} className="border-t border-paper/15 py-8 last:border-b">
                <div className="flex items-baseline gap-6">
                  <span className="micro text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {value.name}
                    </h3>
                    <p className="mt-3 max-w-md text-paper/60">{value.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* live "currently" ticker */}
      <div className="border-b border-paper/10 bg-ink py-5 text-paper" aria-hidden>
        <Marquee
          items={["NOW: BUILDING", "DESIGNING", "SHIPPING", "TEACHING (SOON)"]}
          className="micro text-paper/50"
          speed="22s"
        />
      </div>
    </div>
  );
}
