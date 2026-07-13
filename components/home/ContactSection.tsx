import ChapterMarker from "@/components/ui/ChapterMarker";
import RevealText from "@/components/ui/RevealText";
import ContactForm from "@/components/contact/ContactForm";
import CopyEmail from "@/components/contact/CopyEmail";
import { LagosTime } from "@/components/Navbar";
import { SITE } from "@/lib/data";

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/hsdtechnologies" },
  { name: "X / Twitter", href: "https://x.com/hsdtechnologies" },
  { name: "LinkedIn", href: "https://linkedin.com/company/hsdtechnologies" },
  { name: "Facebook", href: "https://facebook.com/hsdtechnologies" },
];

/** Contact chapter: statement + the conversational multi-step form. */
export default function ContactSection() {
  return (
    <section
      id="contact"
      data-chapter
      className="grain relative scroll-mt-10 bg-paper px-6 py-20 text-ink md:px-10 md:py-28"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
        {/* ————— left: statement ————— */}
        <div>
          <ChapterMarker num="07" title="CONTACT & NEXT STEPS" className="mb-8" />
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.98] tracking-tight md:text-6xl xl:text-7xl">
            <RevealText text="Let's build" />
            <span className="marker my-1 inline-block -rotate-1 italic">
              <RevealText text="something" delay={0.15} />
            </span>
            <br />
            <span className="relative inline-block">
              <RevealText text="great" delay={0.3} />
              <span className="relative inline-block">
                .
                {/* orbiting ✦ around the full stop */}
                <span className="orbit absolute -right-1 top-1 inline-block text-[0.35em]" aria-hidden>
                  ✦
                </span>
              </span>
            </span>
          </h2>
          <p className="mt-8 max-w-sm text-ink/60">
            Ready to grow your digital presence? Three quick steps and your
            project is on our desk.
          </p>

          <div className="micro mt-14 space-y-5 text-ink/60">
            <p className="text-ink/40">{"// OTHER CHANNELS"}</p>
            <CopyEmail />
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="→"
                  className="draw-underline transition-colors hover:text-ink"
                >
                  {social.name}
                </a>
              ))}
            </div>
            <p className="text-ink/40">
              {SITE.handle} ✦ <LagosTime />
            </p>
          </div>
        </div>

        {/* ————— right: the conversation ————— */}
        <div className="lg:pt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
