import type { PartTier } from "@/types";

/**
 * Comparatif pédagogique des niveaux de pièces (écrans notamment).
 * Objectif : expliquer les compromis, pas vendre une gamme.
 */
export const partTiers: PartTier[] = [
  {
    key: "originale",
    name: "Pièce d'origine",
    rendering: "Rendu identique à l'appareil neuf.",
    price: "Le plus élevé",
    durability: "Longévité de référence.",
    consumption: "Consommation d'origine.",
    tradeoffs: "Disponibilité parfois limitée selon le modèle.",
    bestFor:
      "Appareils récents, usage exigeant, volonté de conserver l'appareil longtemps.",
  },
  {
    key: "reconditionnee",
    name: "Reconditionnée d'origine",
    rendering: "Dalle d'origine remise à neuf, rendu très proche du neuf.",
    price: "Élevé",
    durability: "Très bonne, proche de l'origine.",
    consumption: "Comparable à l'origine.",
    tradeoffs: "Disponibilité variable, léger surcoût vs. compatible.",
    bestFor:
      "Retrouver un rendu d'origine à un coût légèrement inférieur au neuf.",
    highlighted: true,
  },
  {
    key: "oled-compatible",
    name: "OLED compatible",
    rendering: "Contrastes profonds, très bon rendu des couleurs.",
    price: "Intermédiaire",
    durability: "Bonne, selon la qualité du fournisseur.",
    consumption: "Maîtrisée grâce à la technologie OLED.",
    tradeoffs: "Écarts possibles de calibration selon les lots.",
    bestFor:
      "Bon compromis rendu / prix sur les modèles conçus pour l'OLED.",
  },
  {
    key: "lcd-compatible",
    name: "LCD compatible",
    rendering: "Rendu correct, noirs moins profonds qu'un OLED.",
    price: "Le plus accessible",
    durability: "Correcte pour un usage standard.",
    consumption: "Légèrement supérieure à l'OLED (rétroéclairage).",
    tradeoffs: "Rendu et luminosité en retrait sur certains modèles.",
    bestFor:
      "Budget maîtrisé, usage courant, prolonger un appareil sans surcoût.",
  },
];

export const PARTS_INTRO =
  "Toutes les pièces ne se valent pas — et aucune n'est « la meilleure » dans l'absolu. Le bon choix dépend de votre appareil, de votre usage et de votre budget. Nous identifions toujours la catégorie de la pièce utilisée.";
