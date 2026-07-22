import { ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { GoldSeam } from "@/components/ui/gold-seam";
import { GoldSeamCanvas } from "./gold-seam-canvas";

const reassurance = [
  "Diagnostic expliqué",
  "Pièces identifiées",
  "Aucune intervention sans accord",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="absolute inset-x-0 top-0 -z-10 h-[460px] bg-gradient-to-b from-primary-50/70 to-transparent" />

      <Container className="relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow">
              Réparation et formation en électronique à {siteConfig.city}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Une autre manière de réparer — et de former ceux qui réparent.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Nous réparons smartphones, ordinateurs, consoles et appareils
              électroniques selon une méthode fondée sur le diagnostic, la
              transparence des pièces et la prolongation utile des équipements.
              Cette même méthode est transmise aux particuliers et aux
              professionnels.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/diagnostic" size="lg">
                Faire diagnostiquer mon appareil
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/se-former" variant="outline" size="lg">
                Découvrir les formations
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-8 flex flex-wrap items-center gap-2.5">
              {reassurance.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1.5 text-sm text-muted"
                >
                  <ShieldCheck
                    className="size-4 text-primary-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div className="relative">
            {/* Vitrine tech : substrat sombre encadré de métal satiné — l'appareil
                comme carte électronique, traversé par la jointure d'or vivante. */}
            <div className="relative rounded-[calc(1.25rem+5px)] bg-[image:var(--metal-satin)] p-[5px] shadow-elevated">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 100% at 30% 0%, #1c2230 0%, #0f1626 55%, #0b0e15 100%)",
                }}
              >
                <GoldSeamCanvas className="absolute inset-0" />

                {/* Couche HUD — repères techniques, la précision comme signature. */}
                <div className="pointer-events-none absolute inset-0 p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
                  <div className="flex items-start justify-between">
                    <span className="text-accent-300">金継ぎ · Diagnostic</span>
                    <span className="inline-flex items-center gap-1.5 text-titanium">
                      <span className="size-1.5 animate-pulse rounded-full bg-accent-400" />
                      Signal
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                    <span>Réparé, pas remplacé</span>
                    <span className="text-titanium">01 / 金</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte signature : le « fil d'or » kintsugi coiffe l'accroche. */}
            <div className="absolute -bottom-5 -left-5 hidden max-w-[15rem] overflow-hidden rounded-2xl border border-line bg-paper shadow-card sm:block">
              <GoldSeam bold glow />
              <p className="p-4 text-sm font-medium text-ink">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
