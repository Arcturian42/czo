import type { Metadata } from "next";
import { Heart, Recycle, GraduationCap, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { FounderSection } from "@/components/marketing/founder-section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "À propos",
  description: `L'histoire de ${siteConfig.brandName} : une expertise née de l'atelier, une méthode de réparation transparente et une volonté de transmettre. Réparation et formation en électronique à ${siteConfig.city}.`,
  path: "/a-propos",
});

const values = [
  { icon: ShieldCheck, title: "Transparence", text: "Expliquer avant d'agir, identifier chaque pièce, obtenir un accord." },
  { icon: Heart, title: "Pédagogie", text: "Transmettre plutôt que garder ; former ceux qui veulent apprendre." },
  { icon: Recycle, title: "Responsabilité", text: "Prolonger les appareils quand c'est pertinent, sans réparation inutile." },
  { icon: GraduationCap, title: "Exigence", text: "Un diagnostic rigoureux et un contrôle qualité systématique." },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Une expertise née de l'atelier"
        intro="Nous ne nous présentons pas comme un réparateur rapide et bon marché, mais comme une méthode : transparente, responsable, pédagogique et transmissible."
        breadcrumbs={[{ label: "À propos", href: "/a-propos" }]}
      />

      <FounderSection variant="full" />

      {/* Valeurs */}
      <Section surface="surface">
        <Container>
          <SectionHeader eyebrow="Nos valeurs" title="Ce qui guide chaque décision" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 50}>
                <Card className="h-full">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Réparer, transmettre, élever les standards
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
            Trois piliers, une même exigence de clarté. Que vous ayez un appareil à
            confier ou une méthode à apprendre, commençons par en parler.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/diagnostic" size="lg">
              Faire réparer un appareil
            </ButtonLink>
            <ButtonLink href="/se-former" variant="outline" size="lg">
              Découvrir les formations
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
