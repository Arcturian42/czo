import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { partTiers, PARTS_INTRO } from "@/content/parts";

const rows: { key: keyof (typeof partTiers)[number]; label: string }[] = [
  { key: "rendering", label: "Rendu" },
  { key: "price", label: "Prix" },
  { key: "durability", label: "Durabilité" },
  { key: "consumption", label: "Consommation" },
  { key: "tradeoffs", label: "Compromis" },
  { key: "bestFor", label: "Pertinent pour" },
];

/**
 * Comparatif pédagogique des pièces — cartes verticales (mobile-first),
 * plutôt qu'un tableau horizontal complexe.
 */
export function PartsComparison() {
  return (
    <Section id="pieces">
      <Container>
        <SectionHeader
          eyebrow="Comprendre les pièces"
          title="Toutes les pièces ne se valent pas."
          intro={PARTS_INTRO}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partTiers.map((tier, index) => (
            <Reveal key={tier.key} delay={index * 60}>
              <article
                className={`flex h-full flex-col rounded-2xl border p-6 ${
                  tier.highlighted
                    ? "border-primary-300 bg-primary-50/40 shadow-card"
                    : "border-line bg-paper"
                }`}
              >
                <div className="flex min-h-[1.75rem] items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-ink">{tier.name}</h3>
                  {tier.highlighted ? <Badge tone="primary">Équilibré</Badge> : null}
                </div>

                <dl className="mt-4 space-y-3 text-sm">
                  {rows.map((row) => (
                    <div key={row.key}>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5 text-muted">{tier[row.key]}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
