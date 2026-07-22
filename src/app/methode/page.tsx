import type { Metadata } from "next";
import { Check, X, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { MethodSteps } from "@/components/marketing/method-steps";
import { ServiceJsonLd } from "@/components/seo/json-ld";
import { commitments, refusedPractices, METHOD_NAME } from "@/content/method";
import { problemPoints } from "@/content/process";

export const metadata: Metadata = buildMetadata({
  title: `${METHOD_NAME} — notre méthode de réparation`,
  description:
    "Notre méthode propriétaire de réparation : diagnostic avant intervention, transparence des pièces, accord du client, contrôle qualité et suivi. Appliquée à l'atelier, enseignée en formation.",
  path: "/methode",
});

export default function MethodePage() {
  return (
    <>
      <ServiceJsonLd
        name={METHOD_NAME}
        description="Méthode de réparation fondée sur le diagnostic, la transparence des pièces, le consentement du client et le contrôle qualité."
        path="/methode"
      />

      <PageHeader
        eyebrow="La méthode"
        title={METHOD_NAME}
        intro="Une manière de réparer transparente, responsable et transmissible. Le bon diagnostic, la bonne pièce, la bonne décision."
        breadcrumbs={[{ label: "La méthode", href: "/methode" }]}
      />

      {/* Origine + constat */}
      <Section>
        <Container size="narrow">
          <SectionHeader
            eyebrow="Pourquoi une méthode"
            title="Née de l'atelier, pas d'un discours marketing."
            intro="À force de voir les mêmes problèmes — diagnostics expédiés, pièces opaques, réparations inutiles — nous avons formalisé une manière de faire. Non pour la garder, mais pour la transmettre."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {problemPoints.slice(0, 4).map((point) => (
              <Reveal key={point.title}>
                <div className="rounded-xl border border-line bg-surface p-5">
                  <h3 className="font-semibold text-ink">{point.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{point.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Les six étapes (variante détaillée) */}
      <MethodSteps variant="full" withCta={false} />

      {/* Nos engagements */}
      <Section surface="surface">
        <Container>
          <SectionHeader
            eyebrow="Nos engagements"
            title="Ce à quoi nous nous tenons, sur chaque réparation."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((commitment, index) => (
              <Reveal key={commitment.title} delay={index * 40}>
                <Card className="h-full">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary-600 text-white">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{commitment.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {commitment.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pratiques refusées */}
      <Section>
        <Container size="narrow">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Ce que nous refusons</h2>
              <ul className="mt-6 space-y-3">
                {refusedPractices.map((practice) => (
                  <li key={practice} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
                      <X className="size-3" aria-hidden="true" />
                    </span>
                    <span className="text-muted">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-ink">Ce que nous garantissons</h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Un diagnostic avant toute intervention.",
                  "La catégorie de chaque pièce, clairement indiquée.",
                  "Votre accord avant toute dépense.",
                  "Un test de l'appareil après réparation.",
                  "Un suivi selon le type d'intervention.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Enseignée & futur réseau */}
      <Section surface="ink">
        <Container size="narrow" className="text-center">
          <p className="eyebrow text-primary-300">Aujourd'hui, demain</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Appliquée. Enseignée. Bientôt partagée.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
            La méthode est appliquée chaque jour à l'atelier de {siteConfig.city}, enseignée
            dans nos formations, et destinée à devenir le socle d'un futur réseau de
            professionnels partageant les mêmes standards.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/diagnostic" size="lg">
              Faire diagnostiquer mon appareil
            </ButtonLink>
            <ButtonLink href="/se-former" variant="outline" size="lg" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/40">
              Apprendre la méthode
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
