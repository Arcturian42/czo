/** Navigation principale, secondaire et pied de page. */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Navigation principale (en-tête desktop + menu mobile). */
export const mainNav: NavItem[] = [
  { label: "La méthode", href: "/methode", description: "Notre façon de réparer" },
  { label: "Réparer", href: "/reparer", description: "Faire diagnostiquer un appareil" },
  { label: "Se former", href: "/se-former", description: "Apprendre à réparer" },
  { label: "Réalisations", href: "/realisations", description: "Études de cas" },
  { label: "À propos", href: "/a-propos", description: "Qui nous sommes" },
];

/** CTA permanents. */
export const primaryCta: NavItem = { label: "Faire diagnostiquer", href: "/diagnostic" };
export const secondaryCta: NavItem = { label: "Apprendre à réparer", href: "/se-former" };

/** Liens du pied de page, regroupés par colonne. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Réparer",
    items: [
      { label: "Faire diagnostiquer", href: "/diagnostic" },
      { label: "Nos réparations", href: "/reparer" },
      { label: "La méthode", href: "/methode" },
      { label: "Réalisations", href: "/realisations" },
    ],
  },
  {
    title: "Se former",
    items: [
      { label: "Les parcours", href: "/se-former" },
      { label: "Demande de formation", href: "/demande-formation" },
      { label: "Espace professionnel", href: "/professionnels" },
    ],
  },
  {
    title: "En savoir plus",
    items: [
      { label: "À propos", href: "/a-propos" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Informations légales",
    items: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/politique-confidentialite" },
    ],
  },
];
