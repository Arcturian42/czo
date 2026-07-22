import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { trainingAudiences, CERTIFICATION_NOTE } from "@/content/trainings";
import { TrainingAudienceCard } from "@/components/training/training-audience-card";

/** Section formations — quatre profils. */
export function TrainingAudiencesSection({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <Section id="formations" surface="surface">
      <Container>
        {withHeader ? (
          <SectionHeader
            eyebrow="Se former"
            title="Apprendre à réparer, quel que soit votre point de départ."
            intro="Quatre profils, une même méthode. De la découverte à la maîtrise, jusqu'à la formation d'équipes."
          />
        ) : null}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trainingAudiences.map((audience, index) => (
            <Reveal key={audience.key} delay={index * 60}>
              <TrainingAudienceCard audience={audience} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-muted">{CERTIFICATION_NOTE}</p>
          <ButtonLink href="/se-former" className="shrink-0">
            Découvrir les parcours
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
