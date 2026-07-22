import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Figure } from "@/components/ui/figure";
import { ServiceExplorer } from "@/components/services/service-explorer";
import { PartsComparison } from "@/components/marketing/parts-comparison";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { FaqSection } from "@/components/marketing/faq-section";
import { DiagnosticForm } from "@/components/forms/diagnostic-form";
import { ServiceJsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/content/faq";

export const metadata: Metadata = buildMetadata({
  title: "Réparer un appareil",
  description: `Réparation de smartphones, Mac, PC, consoles et appareils électroniques à ${siteConfig.city}. Diagnostic avant intervention, pièces identifiées, devis expliqué, aucune réparation sans votre accord.`,
  path: "/reparer",
  keywords: [
    `réparation iPhone ${siteConfig.city}`,
    `réparation Mac ${siteConfig.city}`,
    `remplacement écran iPhone ${siteConfig.city}`,
    `remplacement batterie iPhone ${siteConfig.city}`,
    `récupération de données ${siteConfig.city}`,
    `réparation port HDMI console ${siteConfig.city}`,
  ],
});

// Délais indicatifs — volontairement prudents, à ajuster selon l'atelier.
const delays = [
  { label: "Diagnostic", value: "sous [DÉLAI DE RÉPONSE]" },
  { label: "Réparations courantes", value: "[DÉLAI INDICATIF]" },
  { label: "Cas techniques", value: "sur devis, après étude" },
];

export default function ReparerPage() {
  return (
    <>
      <ServiceJsonLd
        name="Réparation d'appareils électroniques"
        description="Réparation de smartphones, ordinateurs, Mac, consoles et appareils électroniques : diagnostic, pièces identifiées, contrôle qualité et suivi."
        path="/reparer"
      />

      <PageHeader
        eyebrow="Réparer"
        title="Faire réparer un appareil"
        intro="Un réparateur qui explique la panne, les options et les risques avant toute intervention. Décrivez votre appareil, nous préparons un premier avis."
        breadcrumbs={[{ label: "Réparer", href: "/reparer" }]}
      />

      {/* Délais indicatifs */}
      <Section spacing="tight">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {delays.map((d) => (
              <Reveal key={d.label}>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-700">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-muted">{d.label}</p>
                    <p className="font-semibold text-ink">{d.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Les délais sont indicatifs et confirmés après diagnostic. Chaque appareil
            fait l'objet d'une étude de faisabilité.
          </p>

          <Reveal className="mt-8">
            <Figure
              src={siteConfig.media.atelier}
              alt="Gros plan macro d'une carte électronique et de points de microsoudure (illustration)."
              ratio="aspect-[21/9]"
              tone="ink"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </Reveal>
        </Container>
      </Section>

      <ServiceExplorer />
      <ProcessTimeline surface="paper" />
      <PartsComparison />

      {/* Formulaire de diagnostic intégré */}
      <Section surface="surface" id="diagnostic">
        <Container size="narrow">
          <SectionHeader
            align="center"
            eyebrow="Sans engagement"
            title="Décrivez votre appareil"
            intro="Quelques étapes pour nous permettre de préparer un premier avis."
          />
          <div className="mt-10 rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
            <DiagnosticForm />
          </div>
        </Container>
      </Section>

      <FaqSection
        items={faqItems.filter((f) => f.category === "reparation")}
        withCta={false}
      />
    </>
  );
}
