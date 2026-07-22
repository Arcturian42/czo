import { ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Figure } from "@/components/ui/figure";
import { CircuitMotif } from "./circuit-motif";

const reassurance = [
  "Diagnostic expliqué",
  "Pièces identifiées",
  "Aucune intervention sans accord",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <CircuitMotif className="absolute -right-24 top-8 hidden h-[36rem] w-[36rem] text-primary-100 lg:block" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-primary-50/60 to-transparent" />

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
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {reassurance.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div className="relative">
            <Figure
              src={siteConfig.media.hero}
              alt="Smartphone ouvert et outils de précision sur un plan de travail d'atelier soigné (illustration)."
              ratio="aspect-[4/5]"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="shadow-elevated"
            />
            <div className="absolute -bottom-5 -left-5 hidden max-w-[15rem] rounded-2xl border border-line bg-paper p-4 shadow-card sm:block">
              <p className="text-sm font-medium text-ink">{siteConfig.tagline}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
