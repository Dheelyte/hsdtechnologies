"use client";

import { motion } from "framer-motion";
import { TEAM } from "@/lib/data";
import ChapterMarker from "@/components/ui/ChapterMarker";

const EASE = [0.16, 1, 0.3, 1] as const;
const TILTS = ["md:-rotate-1", "md:rotate-0 md:mt-10", "md:rotate-1"];

/** The team — three dark cards on light, each with a morphing monogram blob. */
export default function TeamSection() {
  return (
    <section
      id="team"
      data-chapter
      className="scroll-mt-10 bg-paper px-6 py-20 text-ink md:px-10 md:py-28"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <ChapterMarker num="06" title="THE TEAM" />
        <p className="micro text-ink/40">THREE OF US ✦ EVERY DISCIPLINE COVERED</p>
      </div>
      <h2 className="max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">
        Small team.
        <br />
        <span className="marker inline-block -rotate-1 italic">Zero hand-offs.</span>
      </h2>
      <p className="mt-5 max-w-md text-ink/60">
        You talk directly to the people doing the work — no account layers, no
        lost context, no &quot;let me check with the team.&quot;
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TEAM.map((member, i) => (
          <motion.article
            key={member.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.14, ease: EASE }}
            className={`reveal-guard group rounded-xl bg-ink p-7 text-paper transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:rotate-0 hover:shadow-[8px_8px_0_0_var(--accent)] ${TILTS[i]}`}
          >
            <div className="flex items-start justify-between">
              <div className="blob flex h-16 w-16 items-center justify-center bg-accent font-display text-lg font-bold text-ink transition-transform duration-500 group-hover:scale-110">
                {member.num}
              </div>
              <span className="micro text-paper/35">TEAM / {member.num}</span>
            </div>
            {member.name && <p className="micro mt-6 text-accent">{member.name}</p>}
            <h3 className={`font-display text-2xl font-bold leading-tight tracking-tight ${member.name ? "mt-2" : "mt-6"}`}>
              {member.role}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">{member.blurb}</p>
            <ul className="mt-6 flex flex-wrap gap-2 border-t border-paper/15 pt-5">
              {member.focus.map((skill) => (
                <li
                  key={skill}
                  className="micro rounded-full border border-paper/25 px-3 py-1.5 text-paper/70 transition-colors duration-300 group-hover:border-accent/60"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
