import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container } from "@/components/ui/section";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/content/faq";
import type { FaqItem } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Questions fréquentes",
  description:
    "Prix, délais, pièces, données, garantie, formations, futur réseau : les réponses claires aux questions les plus fréquentes sur la réparation et la formation.",
  path: "/faq",
});

const GROUPS: { key: FaqItem["category"]; title: string }[] = [
  { key: "reparation", title: "Réparation" },
  { key: "formation", title: "Formation" },
  { key: "reseau", title: "Futur réseau" },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHeader
        eyebrow="FAQ"
        title="Questions fréquentes"
        intro="Des réponses directes, sans promesse absolue. Une question qui n'y figure pas ? Écrivez-nous."
        breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
      />

      <Section>
        <Container size="narrow">
          <div className="space-y-12">
            {GROUPS.map((group) => {
              const items = faqItems.filter((f) => f.category === group.key);
              if (items.length === 0) return null;
              return (
                <div key={group.key}>
                  <h2 className="mb-5 text-xl font-semibold text-ink">{group.title}</h2>
                  <Accordion>
                    {items.map((item) => (
                      <AccordionItem key={item.question} question={item.question}>
                        {item.answer}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl border border-line bg-surface p-8 text-center">
            <h2 className="text-xl font-semibold text-ink">Une autre question ?</h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Nous répondons volontiers. Décrivez votre situation, nous vous orientons.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Nous contacter
              </ButtonLink>
              <ButtonLink href="/diagnostic" variant="outline" size="lg">
                Faire diagnostiquer un appareil
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
