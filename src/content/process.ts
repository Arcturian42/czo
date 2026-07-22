import type { ProcessStep } from "@/types";

/** Le processus de réparation, du point de vue du client. */
export const repairProcess: ProcessStep[] = [
  {
    number: 1,
    title: "Décrire le problème",
    description:
      "Vous nous expliquez la panne et ce qui s'est passé, en ligne ou en atelier.",
  },
  {
    number: 2,
    title: "Réaliser le diagnostic",
    description:
      "Nous identifions la cause réelle avant d'avancer la moindre solution.",
  },
  {
    number: 3,
    title: "Présenter les options",
    description:
      "Nous vous exposons les solutions possibles, avec leurs avantages et leurs limites.",
  },
  {
    number: 4,
    title: "Obtenir votre accord",
    description:
      "Rien n'est engagé sans votre validation. Aucune réparation supplémentaire par surprise.",
  },
  {
    number: 5,
    title: "Réparer et tester",
    description:
      "Nous intervenons puis contrôlons l'appareil pour valider la réparation.",
  },
  {
    number: 6,
    title: "Assurer le suivi",
    description:
      "Nous restons disponibles après l'intervention, selon le type de réparation.",
  },
];

/** Les problèmes du secteur — ton critique, jamais agressif. */
export const problemPoints: { title: string; description: string }[] = [
  {
    title: "Des pièces de qualité inégale",
    description:
      "Deux « écrans » peuvent tout changer : rendu, durabilité, consommation. Sans information, impossible de comparer.",
  },
  {
    title: "Des diagnostics trop rapides",
    description:
      "Un symptôme n'est pas une cause. Un diagnostic expédié mène souvent à la mauvaise réparation.",
  },
  {
    title: "Des interventions non expliquées",
    description:
      "On récupère un appareil réparé sans savoir ce qui a été fait, ni pourquoi.",
  },
  {
    title: "Le réflexe du remplacement",
    description:
      "On rachète alors qu'on pouvait garder : une dépense en trop, un déchet en plus, de la valeur jetée sans raison.",
  },
  {
    title: "L'absence de suivi",
    description:
      "Une fois l'appareil rendu, plus personne. Pas d'accompagnement, pas de repère.",
  },
  {
    title: "Le manque de standards lisibles",
    description:
      "Aucun repère commun pour comparer les réparateurs sur la transparence et la qualité.",
  },
];
