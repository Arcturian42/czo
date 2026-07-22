import { Users, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { GoldSeam } from "@/components/ui/gold-seam";
import { CircuitMotif } from "./circuit-motif";

/**
 * Section « Futur réseau ».
 * Formulation prudente : le réseau n'existe pas encore, il se prépare.
 */
export function ProfessionalNetworkCTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-12 text-white md:px-14 md:py-16">
            <CircuitMotif className="absolute -right-10 -top-8 h-72 w-72 text-white/[0.06]" />
            <div className="relative max-w-2xl">
              <Badge tone="onDark" className="gap-2">
                <Users className="size-3.5" aria-hidden="true" />
                En préparation
              </Badge>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Vers un réseau de{" "}
                <span className="metal-text">réparateurs</span> plus transparents
              </h2>
              {/* Le fil d'or : la méthode commune qui relie chaque réparateur. */}
              <GoldSeam glow bold length="short" className="mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Nous préparons un réseau de professionnels formés et accompagnés
                autour d'une méthode commune de diagnostic, de transparence et de
                contrôle qualité. Il n'existe pas encore — vous pouvez le construire
                avec nous.
              </p>
              <div className="mt-8">
                <ButtonLink href="/professionnels" size="lg">
                  Rejoindre la liste d'attente professionnelle
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
