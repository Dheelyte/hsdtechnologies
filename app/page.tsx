import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import AboutSection from "@/components/home/AboutSection";
import ServicesIndex from "@/components/home/ServicesIndex";
import ServiceScroller from "@/components/services/ServiceScroller";
import PlansClient from "@/components/plans/PlansClient";
import Journey from "@/components/process/Journey";
import AcademySection from "@/components/home/AcademySection";
import TeamSection from "@/components/home/TeamSection";
import ContactSection from "@/components/home/ContactSection";
import ChapterMarker from "@/components/ui/ChapterMarker";
import RevealText from "@/components/ui/RevealText";

export const metadata: Metadata = {
  title: "HSD Technologies — Building Digital Futures",
  description:
    "Digital solutions agency: web development, website maintenance, social media management, and branding & identity. Plans, process, team, and the upcoming HSD Academy — all in one place.",
};

export default function HomePage() {
  return (
    <>
      {/* 00 — HERO */}
      <Hero />
      <TrustStrip />

      {/* 01 — ABOUT: mission, pillars, values, ticker */}
      <AboutSection />

      {/* 02 — SERVICES: hover index + sticky split-screen deep dive */}
      <ServicesIndex />
      <div className="bg-paper text-ink">
        <ServiceScroller />
      </div>

      {/* 03 — PLANS: explorer, quiz, full matrix */}
      <div id="plans" className="scroll-mt-10">
        <section className="bg-paper px-6 pb-14 pt-20 text-ink md:px-10 md:pt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <ChapterMarker num="03" title="SERVICE PLANS" />
            <p className="micro text-ink/40">PRICING ON CONSULTATION — ALWAYS TAILORED</p>
          </div>
          <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight md:text-6xl">
            <RevealText text="Choose your" />{" "}
            <span className="marker inline-block -rotate-1 italic">
              <RevealText text="growth speed." delay={0.15} />
            </span>
          </h2>
        </section>
        <PlansClient />
      </div>

      {/* 04 — PROCESS: the snaking journey */}
      <div id="process" className="scroll-mt-10 bg-paper text-ink">
        <section className="px-6 pb-4 pt-20 md:px-10 md:pt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <ChapterMarker num="04" title="OUR PROCESS" />
            <p className="micro text-ink/40">EVERY ENGAGEMENT, SAME FIVE MOVES</p>
          </div>
          <h2 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight md:text-6xl">
            <RevealText text="Five steps." />{" "}
            <span className="marker inline-block -rotate-1 italic">
              <RevealText text="Zero chaos." delay={0.15} />
            </span>
          </h2>
        </section>
        <div data-chapter>
          <Journey />
        </div>
      </div>

      {/* 05 — ACADEMY: countdown, vision, tickets, waitlist */}
      <AcademySection />

      {/* 06 — TEAM */}
      <TeamSection />

      {/* 07 — CONTACT */}
      <ContactSection />
    </>
  );
}
