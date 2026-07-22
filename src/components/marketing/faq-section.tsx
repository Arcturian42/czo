import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { faqItems } from "@/content/faq";
import type { FaqItem } from "@/types";

/** Section FAQ + données structurées FAQPage. */
export function FaqSection({
  items = faqItems,
  limit,
  withHeader = true,
  withCta = true,
  emitJsonLd = true,
}: {
  items?: FaqItem[];
  limit?: number;
  withHeader?: boolean;
  withCta?: boolean;
  emitJsonLd?: boolean;
}) {
  const shown = limit ? items.slice(0, limit) : items;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: shown.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section id="faq">
      <Container size="narrow">
        {emitJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ) : null}

        {withHeader ? (
          <SectionHeader
            align="center"
            eyebrow="Questions fréquentes"
            title="Vous vous posez sûrement ces questions."
          />
        ) : null}

        <Reveal className="mt-10">
          <Accordion>
            {shown.map((item) => (
              <AccordionItem key={item.question} question={item.question}>
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {withCta ? (
          <Reveal className="mt-8 text-center">
            <ButtonLink href="/faq" variant="outline">
              Voir toutes les questions
            </ButtonLink>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
