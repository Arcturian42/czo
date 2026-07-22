import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { GoldSeam } from "@/components/ui/gold-seam";
import { methodSteps, METHOD_NAME } from "@/content/method";

/**
 * Les six étapes de la méthode propriétaire.
 * `variant="full"` affiche le détail de chaque étape (page /methode).
 */
export function MethodSteps({
  variant = "home",
  withCta = true,
}: {
  variant?: "home" | "full";
  withCta?: boolean;
}) {
  return (
    <Section id="methode">
      <Container>
        <SectionHeader
          eyebrow={METHOD_NAME}
          title="Une méthode en six étapes, appliquée et transmise."
          intro="Appliquée aujourd'hui dans l'atelier, enseignée dans nos formations, et destinée demain à devenir un standard partagé par un réseau de professionnels."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {methodSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.key} delay={index * 60}>
                <Card interactive className="relative h-full overflow-hidden">
                  {/* Chaque étape est une jointure d'or de la méthode. */}
                  <GoldSeam className="absolute inset-x-0 top-0" />
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm font-medium text-accent-500">
                      0{step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.description}</p>

                  {variant === "full" && step.detail ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted/90">
                      {step.detail}
                    </p>
                  ) : null}

                  <div className="mt-5 border-t border-line pt-4">
                    <Badge tone="primary">Bénéfice · {step.benefit}</Badge>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {withCta ? (
          <Reveal className="mt-10">
            <ButtonLink href="/methode" variant="outline">
              Découvrir la méthode en détail
            </ButtonLink>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
