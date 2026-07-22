import { Stethoscope, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

/** CTA final — double orientation réparation / formation. */
export function FinalCTA() {
  return (
    <section className="border-t border-line bg-surface">
      <Container className="py-16 text-center md:py-24">
        <Reveal>
          <p className="eyebrow">Passons à l'action</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Comprendre. Choisir. Réparer.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Décrivez votre appareil ou votre objectif de formation. Nous vous
            orienterons vers la solution la plus adaptée.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/diagnostic" size="lg">
              <Stethoscope className="size-4" aria-hidden="true" />
              Faire diagnostiquer un appareil
            </ButtonLink>
            <ButtonLink href="/se-former" variant="outline" size="lg">
              <GraduationCap className="size-4" aria-hidden="true" />
              Trouver une formation
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
