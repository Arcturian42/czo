import type { CaseStudy } from "@/types";

/**
 * Études de cas.
 *
 * ⚠️ Seuls les éléments présents dans le brief sont renseignés.
 * Les détails techniques précis proviennent du document source (non fourni) :
 * ils sont marqués « [À COMPLÉTER] » et listés dans `pendingFields`.
 * Ne rien inventer (chiffres, durées, résultats mesurés).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "iphone-14-pro-chute-cinquieme-etage",
    title: "Un iPhone 14 Pro tombé du cinquième étage, remis en état",
    device: "iPhone 14 Pro",
    summary:
      "Une chute sévère depuis un cinquième étage, un appareil que beaucoup auraient déclaré perdu — et une remise en état grâce à un diagnostic complet.",
    situation:
      "L'appareil est tombé depuis un cinquième étage. Le choc, la hauteur et les dégâts apparents plaçaient d'emblée cette réparation dans les cas complexes.",
    diagnosis:
      "[À COMPLÉTER depuis le document source : composants touchés, résultats des tests, ce qui fonctionnait encore et ce qui était hors service.]",
    intervention:
      "[À COMPLÉTER depuis le document source : pièces remplacées, catégorie de chaque pièce, gestes techniques réalisés, éventuelle microsoudure.]",
    result:
      "L'appareil a été remis en état de fonctionnement. [À COMPLÉTER : fonctions restaurées, points de contrôle validés, réserves éventuelles.]",
    lesson:
      "Un dégât spectaculaire ne signifie pas un appareil perdu. Le diagnostic distingue ce qui est réellement atteint de ce qui semble l'être — et c'est cette distinction qui rend la réparation possible.",
    pendingFields: [
      "Détail du diagnostic (composants touchés)",
      "Liste et catégorie des pièces remplacées",
      "Fonctions restaurées et points de contrôle",
      "Photographies avant / pendant / après",
    ],
    images: [
      { src: null, alt: "iPhone 14 Pro avant intervention", phase: "avant" },
      { src: null, alt: "Diagnostic de l'iPhone 14 Pro en cours", phase: "pendant" },
      { src: null, alt: "iPhone 14 Pro remis en état", phase: "après" },
    ],
  },
  {
    slug: "imac-2011-modernise",
    title: "Un iMac 2011 modernisé pour repartir plusieurs années",
    device: "iMac (2011)",
    summary:
      "Plutôt que de remplacer une machine ancienne, la moderniser : carte graphique adaptée, processeur i7 et compatibilité avec une version récente de macOS.",
    situation:
      "Un iMac de 2011, considéré comme dépassé, mais dont le châssis et l'écran restaient parfaitement exploitables. La question : remplacer, ou prolonger utilement ?",
    diagnosis:
      "[À COMPLÉTER depuis le document source : état initial de la machine, limites constatées, points bloquants pour une version récente de macOS.]",
    intervention:
      "Modernisation de la machine : carte graphique adaptée, processeur i7 et mise en compatibilité avec une version récente de macOS. [À COMPLÉTER : références exactes, stockage, adaptations techniques.]",
    result:
      "Une machine ancienne remise à niveau et de nouveau utilisable au quotidien. [À COMPLÉTER : gains constatés, usages visés.]",
    lesson:
      "Prolonger vaut parfois mieux que remplacer. Quand le châssis et l'écran tiennent, moderniser l'intérieur est souvent plus responsable — et plus économique — que racheter.",
    pendingFields: [
      "État initial et limites constatées",
      "Références exactes des composants (GPU, CPU, stockage)",
      "Version de macOS visée et gains de performance",
      "Photographies avant / pendant / après",
    ],
    images: [
      { src: null, alt: "iMac 2011 avant modernisation", phase: "avant" },
      { src: null, alt: "Modernisation de l'iMac 2011 en cours", phase: "pendant" },
      { src: null, alt: "iMac 2011 modernisé et fonctionnel", phase: "après" },
    ],
  },
];
