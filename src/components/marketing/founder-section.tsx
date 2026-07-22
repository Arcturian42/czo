import { Section, Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { PendingNote } from "@/components/ui/pending-note";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * Section « À propos » / fondateur.
 * L'expertise est valorisée par les cas, le processus et la précision —
 * pas par un diplôme. Les détails biographiques viennent du document source.
 */
export function FounderSection({
  variant = "home",
}: {
  variant?: "home" | "full";
}) {
  return (
    <Section id="a-propos">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <ImagePlaceholder
              ratio="aspect-[4/5]"
              label="Portrait du fondateur à intégrer (atelier, geste technique)."
              className="lg:sticky lg:top-28"
            />
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow">À propos</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Une expertise née de l'atelier, pas d'un discours.
            </h2>

            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                {siteConfig.brandName} est né d'une conviction simple : un appareil
                mérite un vrai diagnostic avant d'être réparé ou remplacé, et le
                client mérite qu'on lui explique.
              </p>
              <p>
                Le fondateur a construit son savoir-faire sur le terrain, au contact
                des pannes réelles — des plus courantes aux plus techniques, jusqu'à
                la microsoudure et la modernisation d'appareils anciens. C'est cette
                expérience qui a donné naissance à notre méthode.
              </p>
              <p>
                La pédagogie en est le prolongement naturel : transmettre une manière
                de faire rigoureuse et transparente, pour que d'autres réparent mieux.
              </p>
            </div>

            {variant === "home" ? (
              <div className="mt-8">
                <ButtonLink href="/a-propos" variant="outline">
                  En savoir plus sur notre histoire
                </ButtonLink>
              </div>
            ) : (
              <PendingNote
                className="mt-8"
                items={[
                  "Parcours détaillé et expérience de terrain du fondateur",
                  "Spécialités précises et années d'expérience vérifiées",
                  "Anecdotes fondatrices et naissance de la méthode",
                  "Valeurs personnelles et rapport à la réparation",
                ]}
              />
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
