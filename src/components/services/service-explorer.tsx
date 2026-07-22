import { Info } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { repairCategories, FEASIBILITY_NOTE } from "@/content/services";
import { RepairCategoryCard } from "./repair-category-card";

/** Services de réparation organisés par grandes familles. */
export function ServiceExplorer({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <Section id="services" surface="surface">
      <Container>
        {withHeader ? (
          <SectionHeader
            eyebrow="Ce que nous réparons"
            title="Des smartphones aux cartes électroniques."
            intro="Quatre grandes familles, un même point de départ : le diagnostic. Chaque service peut être confié à l'atelier ou appris en formation."
          />
        ) : null}

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {repairCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 60}>
              <RepairCategoryCard category={category} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="flex items-start gap-2.5 rounded-xl border border-line bg-paper p-4 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-primary-600" aria-hidden="true" />
            {FEASIBILITY_NOTE}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
