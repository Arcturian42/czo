import type { Metadata } from "next";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PendingNote } from "@/components/ui/pending-note";
import { CaseStudyGallery } from "@/components/case-studies/case-study-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { caseStudies } from "@/content/cases";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations & études de cas",
  description:
    "Des réparations complexes menées avec méthode : un iPhone 14 Pro tombé du cinquième étage remis en état, un iMac 2011 modernisé. Situation, diagnostic, intervention, résultat.",
  path: "/realisations",
});

const detailSections: { key: keyof (typeof caseStudies)[number]; label: string }[] = [
  { key: "situation", label: "Situation" },
  { key: "diagnosis", label: "Diagnostic" },
  { key: "intervention", label: "Intervention" },
  { key: "result", label: "Résultat" },
];

export default function RealisationsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: caseStudies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: study.title,
      url: absoluteUrl(`/realisations#${study.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />

      <PageHeader
        eyebrow="Réalisations"
        title="Des cas concrets, expliqués"
        intro="Nous privilégions les preuves aux promesses. Voici comment nous abordons les réparations complexes — avec la transparence sur ce qu'il reste à documenter."
        breadcrumbs={[{ label: "Réalisations", href: "/realisations" }]}
      />

      <Section>
        <Container>
          <div className="space-y-16 md:space-y-24">
            {caseStudies.map((study) => (
              <Reveal as="article" key={study.slug} id={study.slug} className="scroll-mt-28">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <Badge tone="primary">{study.device}</Badge>
                    <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                      {study.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted">{study.summary}</p>
                    <div className="mt-6">
                      <CaseStudyGallery study={study} />
                    </div>
                  </div>

                  <div>
                    <dl className="space-y-6">
                      {detailSections.map((section) => (
                        <div key={section.key} className="border-l-2 border-primary-100 pl-5">
                          <dt className="font-mono text-xs uppercase tracking-wider text-primary-700">
                            {section.label}
                          </dt>
                          <dd className="mt-1.5 leading-relaxed text-muted">
                            {study[section.key] as string}
                          </dd>
                        </div>
                      ))}
                      <div className="rounded-2xl bg-surface p-5">
                        <dt className="font-semibold text-ink">Ce que ce cas enseigne</dt>
                        <dd className="mt-1.5 leading-relaxed text-muted">{study.lesson}</dd>
                      </div>
                    </dl>

                    {study.pendingFields && study.pendingFields.length > 0 ? (
                      <PendingNote className="mt-6" items={study.pendingFields} />
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-line bg-surface p-8 text-center md:mt-24">
            <h2 className="text-xl font-semibold text-ink">Un cas similaire au vôtre ?</h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Décrivez votre appareil : nous vous dirons franchement si la réparation
              est pertinente. Atelier à {siteConfig.city}.
            </p>
            <div className="mt-6">
              <ButtonLink href="/diagnostic" size="lg">
                Faire diagnostiquer mon appareil
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
