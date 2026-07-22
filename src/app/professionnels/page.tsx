import type { Metadata } from "next";
import { Check, Users, Compass, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ProfessionalWaitlistForm } from "@/components/forms/professional-waitlist-form";

export const metadata: Metadata = buildMetadata({
  title: "Espace professionnel & futur réseau",
  description:
    "Réparateurs indépendants, ateliers, formateurs et entreprises : rejoignez la liste d'attente du futur réseau de réparateurs partageant les mêmes standards de diagnostic, de transparence et de qualité.",
  path: "/professionnels",
});

const audience = [
  "Réparateurs indépendants",
  "Ateliers",
  "Formateurs",
  "Entreprises",
];

const pillars = [
  {
    icon: Compass,
    title: "Une méthode commune",
    text: "Un diagnostic rigoureux et des gestes partagés, plutôt que des pratiques disparates.",
  },
  {
    icon: ShieldCheck,
    title: "Des standards de transparence",
    text: "Pièces identifiées, options expliquées, accord du client avant toute dépense.",
  },
  {
    icon: Users,
    title: "Un accompagnement",
    text: "Formation, entraide et contrôle qualité pour progresser ensemble.",
  },
];

export default function ProfessionnelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vous êtes réparateur ?"
        title="Construisons un réseau plus transparent"
        intro="Nous préparons un réseau de professionnels partageant les mêmes standards de diagnostic, de transparence et de qualité. Il n'existe pas encore — rejoignez la liste d'attente pour le construire avec nous."
        breadcrumbs={[{ label: "Professionnels", href: "/professionnels" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Badge tone="primary" className="gap-2">
                <Users className="size-3.5" aria-hidden="true" />
                En préparation
              </Badge>
              <h2 className="mt-5 text-2xl font-semibold text-ink sm:text-3xl">
                Ce que nous préparons
              </h2>
              <div className="mt-8 space-y-6">
                {pillars.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{title}</h3>
                      <p className="mt-1 text-muted">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
                <p className="text-sm font-medium text-ink">À qui s'adresse la liste d'attente</p>
                <ul className="mt-4 grid grid-cols-2 gap-2.5">
                  {audience.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="size-4 shrink-0 text-primary-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="rejoindre" className="scroll-mt-28">
              <div className="rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
                <SectionHeader
                  as="h2"
                  title="Rejoindre la liste d'attente"
                  intro="Aucun engagement. Nous vous informerons en priorité du lancement."
                  className="max-w-none"
                />
                <div className="mt-8">
                  <ProfessionalWaitlistForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
