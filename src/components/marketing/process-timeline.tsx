import { Check } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { repairProcess } from "@/content/process";

/** Processus de réparation, du point de vue du client. */
export function ProcessTimeline({
  withHeader = true,
  surface = "surface",
}: {
  withHeader?: boolean;
  surface?: "paper" | "surface";
}) {
  return (
    <Section id="processus" surface={surface}>
      <Container>
        {withHeader ? (
          <SectionHeader
            eyebrow="Comment ça se passe"
            title="Un processus clair, sans mauvaise surprise."
            intro="Aucune réparation supplémentaire n'est réalisée sans votre accord. Vous gardez la main à chaque étape."
          />
        ) : null}

        <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {repairProcess.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 50} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-600 text-sm font-semibold text-white">
                  {step.number}
                </span>
                {index < repairProcess.length - 1 ? (
                  <span aria-hidden="true" className="mt-1 hidden w-px flex-1 bg-line-strong sm:block" />
                ) : null}
              </div>
              <div className="pb-2">
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-800">
            <Check className="size-4" aria-hidden="true" />
            Aucune dépense supplémentaire sans votre accord.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
