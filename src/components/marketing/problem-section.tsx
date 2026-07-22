import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { problemPoints } from "@/content/process";

/** Section « Le problème » — ton critique mais jamais agressif. */
export function ProblemSection() {
  return (
    <Section surface="surface">
      <Container>
        <SectionHeader
          eyebrow="Le constat"
          title="Le problème n'est pas seulement la panne. C'est le manque de transparence."
          intro="Le secteur souffre moins d'un déficit de compétences que d'un déficit de clarté. Voici ce que nous voyons trop souvent."
        />

        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {problemPoints.map((point, index) => (
            <Reveal
              as="article"
              key={point.title}
              delay={index * 60}
              className="relative pl-6"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-[calc(100%-0.5rem)] w-px bg-line-strong"
              />
              <span
                aria-hidden="true"
                className="absolute -left-[3px] top-1.5 size-[7px] rounded-full bg-accent-500"
              />
              <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{point.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
