import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/section";
import { PendingNote } from "@/components/ui/pending-note";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Comment ${siteConfig.brandName} traite et protège vos données personnelles.`,
  path: "/politique-confidentialite",
  noindex: true,
});

const sections = [
  {
    title: "Responsable du traitement",
    body: `Les données collectées via ce site sont traitées par ${siteConfig.brandName} ([RAISON SOCIALE], [ADRESSE]). Pour toute question : ${siteConfig.email}.`,
  },
  {
    title: "Données collectées",
    body: "Via nos formulaires (diagnostic, formation, professionnel, contact), nous collectons uniquement les informations que vous fournissez : identité, coordonnées, description de votre besoin et, le cas échéant, photographies de l'appareil.",
  },
  {
    title: "Finalités",
    body: "Vos données servent exclusivement à traiter votre demande, vous recontacter et assurer le suivi. Elles ne sont ni vendues, ni utilisées à des fins publicitaires.",
  },
  {
    title: "Base légale",
    body: "Le traitement repose sur votre consentement (recueilli via les cases dédiées) et, le cas échéant, sur l'exécution de mesures précontractuelles.",
  },
  {
    title: "Destinataires",
    body: "Vos données sont accessibles à l'équipe de l'atelier. Certains sous-traitants techniques (envoi d'emails, hébergement des fichiers) peuvent les traiter pour notre compte, dans le cadre de la réglementation.",
  },
  {
    title: "Durée de conservation",
    body: "Les données sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées selon [POLITIQUE DE RÉTENTION À DÉFINIR]. Les photographies transmises sont supprimées une fois le diagnostic clôturé.",
  },
  {
    title: "Vos droits",
    body: "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition. Pour l'exercer, écrivez-nous à " + siteConfig.email + ". Vous pouvez également saisir la CNIL.",
  },
  {
    title: "Analytics",
    body: "Le cas échéant, nous mesurons l'audience du site à l'aide d'évènements anonymisés. Nous n'envoyons jamais à ces outils vos descriptions libres, vos photos, vos informations personnelles ni les données relatives à vos appareils.",
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader
        title="Politique de confidentialité"
        breadcrumbs={[{ label: "Politique de confidentialité", href: "/politique-confidentialite" }]}
      />

      <Section>
        <Container size="narrow">
          <PendingNote
            className="mb-8"
            title="À valider juridiquement"
            items={[
              "Coordonnées complètes du responsable de traitement",
              "Durées de conservation précises (politique de rétention)",
              "Liste des sous-traitants réellement utilisés",
              "Validation par un professionnel du droit avant mise en ligne",
            ]}
          />

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{section.body}</p>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm text-faint">
            Ce document est un modèle de base et doit être adapté puis validé avant publication.
          </p>
        </Container>
      </Section>
    </>
  );
}
