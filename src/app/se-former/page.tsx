import type { Metadata } from "next";
import { Check, Wrench, Target, Layers, Users2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { TrainingAudiencesSection } from "@/components/marketing/training-audiences-section";
import { TrainingRequestForm } from "@/components/forms/training-request-form";
import { CourseJsonLd } from "@/components/seo/json-ld";
import { CERTIFICATION_NOTE } from "@/content/trainings";

export const metadata: Metadata = buildMetadata({
  title: "Se former à la réparation",
  description:
    "Apprenez une méthode complète de réparation : diagnostic, choix des pièces, gestes techniques, microsoudure, contrôle qualité et relation client. Pour débutants, reconversions, réparateurs et entreprises.",
  path: "/se-former",
  keywords: [
    "formation réparation smartphone",
    "formation réparation iPhone",
    "formation microsoudure",
    "formation réparateur informatique",
  ],
});

const learn = [
  { icon: Target, title: "Diagnostiquer", text: "Identifier la cause réelle d'une panne, avec méthode." },
  { icon: Layers, title: "Choisir les pièces", text: "Comparer les catégories de pièces et leurs compromis." },
  { icon: Wrench, title: "Réaliser les gestes", text: "Du remplacement courant à la microsoudure." },
  { icon: Check, title: "Contrôler la qualité", text: "Tester après intervention et documenter." },
  { icon: Users2, title: "La relation client", text: "Expliquer, conseiller, obtenir un accord éclairé." },
];

export default function SeFormerPage() {
  return (
    <>
      <CourseJsonLd
        name="Formation à la réparation en électronique"
        description="Formation à une méthode complète de réparation : diagnostic, choix des pièces, gestes techniques, contrôle qualité et relation client."
        path="/se-former"
      />

      <PageHeader
        eyebrow="Se former"
        title="Apprendre à réparer, avec méthode"
        intro="Une même méthode, adaptée à votre point de départ : diagnostic, choix des pièces, gestes techniques, contrôle qualité et relation client."
        breadcrumbs={[{ label: "Se former", href: "/se-former" }]}
      />

      {/* Ce que vous apprenez */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Les compétences"
            title="Ce que vous apprenez"
            intro="Pas seulement des gestes : une manière de raisonner, de choisir et d'expliquer."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {learn.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 50}>
                <Card className="h-full">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent-500/10 text-accent-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-muted">{text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Les profils */}
      <TrainingAudiencesSection />

      {/* Format, prérequis, limites */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Format & pratique",
                items: [
                  "Pratique encadrée sur cas réels",
                  "Outils fournis pendant les séances",
                  "Groupes à taille humaine",
                  "Rythme adapté au profil",
                ],
              },
              {
                title: "Prérequis",
                items: [
                  "Aucun pour les parcours débutants",
                  "Niveau intermédiaire à avancé pour la microsoudure",
                  "Intérêt réel pour la manipulation",
                  "Matériel personnel selon le parcours",
                ],
              },
              {
                title: "Limites & honnêteté",
                items: [
                  "Attestation de formation, pas de certification d'État",
                  "La pratique demande de la régularité",
                  "Certains cas complexes se travaillent dans la durée",
                  "Accompagnement après la formation",
                ],
              },
            ].map((col) => (
              <Reveal key={col.title}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-lg font-semibold text-ink">{col.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">{CERTIFICATION_NOTE}</p>
        </Container>
      </Section>

      {/* Demande d'information */}
      <Section surface="surface" id="demande">
        <Container size="narrow">
          <SectionHeader
            align="center"
            eyebrow="Demande d'information"
            title="Trouvons le bon parcours"
            intro="Dites-nous d'où vous partez et ce que vous visez. Nous vous orientons."
          />
          <div className="mt-10 rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
            <TrainingRequestForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
