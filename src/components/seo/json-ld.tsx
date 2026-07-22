import { siteConfig, isPlaceholder } from "@/config/site";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/** Injecte un bloc JSON-LD (contenu contrôlé côté serveur). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Ajoute une clé seulement si la valeur n'est pas un placeholder / vide. */
function withReal<T>(value: T, key: string): Record<string, T> | Record<string, never> {
  return isPlaceholder(value) ? {} : { [key]: value };
}

/**
 * LocalBusiness / ProfessionalService.
 * N'émet que des données réelles : les placeholders sont omis
 * pour ne jamais publier de fausses coordonnées ou notes.
 */
export function LocalBusinessJsonLd() {
  const address = {
    "@type": "PostalAddress",
    ...withReal(siteConfig.address, "streetAddress"),
    ...withReal(siteConfig.city, "addressLocality"),
    ...withReal(siteConfig.postalCode, "postalCode"),
    ...withReal(siteConfig.region, "addressRegion"),
    addressCountry: "FR",
  };

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: isPlaceholder(siteConfig.brandName) ? "Atelier de réparation" : siteConfig.brandName,
    description: siteConfig.shortPitch,
    slogan: siteConfig.tagline,
    url: SITE_URL,
    image: absoluteUrl("/opengraph-image"),
    address,
    areaServed: isPlaceholder(siteConfig.city) ? undefined : siteConfig.city,
    ...withReal(siteConfig.phone, "telephone"),
    ...withReal(siteConfig.email, "email"),
    knowsAbout: [
      "Réparation de smartphones",
      "Réparation d'ordinateurs et de Mac",
      "Réparation de consoles",
      "Microsoudure",
      "Récupération de données",
      "Formation à la réparation",
    ],
  };

  // Note et avis : uniquement si des valeurs réelles existent (jamais inventées).
  if (
    typeof siteConfig.googleRating === "number" &&
    typeof siteConfig.googleReviewsCount === "number"
  ) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: siteConfig.googleRating,
      reviewCount: siteConfig.googleReviewsCount,
    };
  }

  return <JsonLd data={data} />;
}

/** WebSite (identité du site). */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: siteConfig.brandName,
        url: SITE_URL,
        inLanguage: "fr-FR",
        publisher: { "@id": `${SITE_URL}/#business` },
      }}
    />
  );
}

/** Service (réparation). */
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: name,
        name,
        description,
        url: absoluteUrl(path),
        areaServed: isPlaceholder(siteConfig.city) ? undefined : siteConfig.city,
        provider: { "@id": `${SITE_URL}/#business` },
      }}
    />
  );
}

/** Course (formation) — sans certification reconnue. */
export function CourseJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name,
        description,
        url: absoluteUrl(path),
        inLanguage: "fr-FR",
        provider: {
          "@type": "Organization",
          name: siteConfig.brandName,
          "@id": `${SITE_URL}/#business`,
        },
      }}
    />
  );
}
