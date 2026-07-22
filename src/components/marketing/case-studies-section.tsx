import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { caseStudies } from "@/content/cases";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";

/** Aperçu des réalisations sur la page d'accueil. */
export function CaseStudiesSection() {
  return (
    <Section id="realisations">
      <Container>
        <SectionHeader
          eyebrow="Réalisations"
          title="Des cas concrets, pas des promesses."
          intro="Deux exemples de réparations complexes menées avec méthode. Certains détails techniques restent à compléter depuis nos dossiers."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} delay={index * 80}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <ButtonLink href="/realisations" variant="outline">
            Voir toutes les réalisations
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
