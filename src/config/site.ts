/**
 * Configuration centrale de la marque.
 *
 * ⚠️ Les valeurs entre crochets `[...]` sont des PLACEHOLDERS à remplacer.
 * Elles proviennent du document source (non fourni au moment du build).
 * Remplacez-les ici : elles se propagent dans tout le site (SEO, JSON-LD,
 * en-tête, pied de page, formulaires, mentions légales, etc.).
 *
 * Ne jamais inventer de chiffres, d'avis ou de certifications :
 * laissez le placeholder tant que la donnée réelle n'est pas connue.
 */

export const siteConfig = {
  brandName: "Kinto",
  legalName: "[RAISON SOCIALE]",
  tagline: "Le bon diagnostic. La bonne pièce. La bonne décision.",
  shortPitch:
    "Réparation et formation en électronique fondées sur le diagnostic, la transparence des pièces et la prolongation utile des équipements.",

  city: "[VILLE]",
  region: "[RÉGION]",
  phone: "[TÉLÉPHONE]",
  email: "[EMAIL]",
  address: "[ADRESSE]",
  postalCode: "[CODE POSTAL]",
  country: "France",

  // Délais / mesures — placeholders tant que non confirmés.
  responseTime: "[DÉLAI DE RÉPONSE]",
  warrantyDuration: "[DURÉE DE GARANTIE]",

  // Chiffres de réassurance — NE PAS inventer. Laisser `null` masque l'élément.
  repairsCount: null as number | null, // [NOMBRE DE RÉPARATIONS]
  googleRating: null as number | null, // [NOTE GOOGLE]
  googleReviewsCount: null as number | null,
  yearsOfExperience: null as number | null, // années vérifiées

  // Réseaux & liens externes (optionnels)
  social: {
    instagram: "" as string,
    facebook: "" as string,
    linkedin: "" as string,
    googleMaps: "" as string,
  },

  // Horaires d'ouverture — placeholders structurés (jour → plage).
  openingHours: [
    { days: "Lundi – Vendredi", hours: "[HORAIRES]" },
    { days: "Samedi", hours: "[HORAIRES]" },
    { days: "Dimanche", hours: "Fermé" },
  ],

  // URL canonique du site en production.
  url: "https://www.example.com",
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Indique si une valeur est encore un placeholder non renseigné.
 * Utile pour masquer proprement un bloc ou afficher une pastille « à compléter ».
 */
export function isPlaceholder(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "string" && /^\[.*\]$/.test(value.trim()))
  );
}

/** Version « tel: » du téléphone (sans espaces) — vide si placeholder. */
export function telHref(): string {
  return isPlaceholder(siteConfig.phone)
    ? ""
    : `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
}
