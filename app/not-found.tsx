import ParticleField from "@/components/ParticleField";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-paper px-6 text-center text-ink">
      <ParticleField className="absolute inset-0 h-full w-full" mode="repel" count={90} theme="light" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <p
          className="glitch font-display text-[38vw] font-bold leading-none tracking-tight md:text-[22vw]"
          data-text="404"
        >
          404
        </p>
        <p className="max-w-md text-ink/60 md:text-lg">
          This page doesn&apos;t exist. Yet. Building things that don&apos;t
          exist is kind of our thing.
        </p>
        <MagneticButton href="/">Take me home</MagneticButton>
        <p className="micro text-ink/40">ERROR ✦ SIGNAL LOST ✦ HSD TECHNOLOGIES</p>
      </div>
    </section>
  );
}
