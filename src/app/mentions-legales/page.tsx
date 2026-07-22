import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/section";
import { PendingNote } from "@/components/ui/pending-note";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales de ${siteConfig.brandName}.`,
  path: "/mentions-legales",
  noindex: true,
});

const rows: [string, string][] = [
  ["Raison sociale", siteConfig.legalName],
  ["Nom commercial", siteConfig.brandName],
  ["Forme juridique", "SARL"],
  ["Adresse", `${siteConfig.address}, ${siteConfig.postalCode} ${siteConfig.city}`],
  ["Téléphone", siteConfig.phone],
  ["Email", siteConfig.email],
  ["SIRET", "En cours d'immatriculation"],
  ["N° TVA intracommunautaire", "En cours d'immatriculation"],
  ["Directeur de la publication", "[DIRECTEUR DE PUBLICATION]"],
  ["Hébergeur", "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis"],
];

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        title="Mentions légales"
        breadcrumbs={[{ label: "Mentions légales", href: "/mentions-legales" }]}
      />

      <Section>
        <Container size="narrow">
          <PendingNote
            className="mb-8"
            title="Informations légales à compléter"
            items={[
              "Coordonnées légales complètes de l'entreprise (raison sociale, forme, SIRET, TVA)",
              "Directeur de la publication",
              "Coordonnées de l'hébergeur",
            ]}
          />

          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-line">
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row" className="w-2/5 bg-surface px-4 py-3 text-left font-medium text-ink">
                      {label}
                    </th>
                    <td className="px-4 py-3 text-muted">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 space-y-6 text-muted">
            <section>
              <h2 className="text-lg font-semibold text-ink">Propriété intellectuelle</h2>
              <p className="mt-2 leading-relaxed">
                L'ensemble des contenus de ce site (textes, visuels, logo, méthode) est
                protégé. Toute reproduction sans autorisation est interdite.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-ink">Responsabilité</h2>
              <p className="mt-2 leading-relaxed">
                Les informations publiées sont fournies à titre indicatif. La faisabilité
                d'une réparation est confirmée après diagnostic.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-ink">Données personnelles</h2>
              <p className="mt-2 leading-relaxed">
                Le traitement de vos données est décrit dans notre{" "}
                <a href="/politique-confidentialite" className="font-medium text-primary-700 underline underline-offset-2">
                  politique de confidentialité
                </a>
                .
              </p>
            </section>
          </div>

          <p className="mt-10 text-sm text-faint">
            Dernière mise à jour : ce document doit être validé juridiquement avant mise en ligne.
          </p>
        </Container>
      </Section>
    </>
  );
}
