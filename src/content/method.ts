import {
  Search,
  Stethoscope,
  MessagesSquare,
  Scale,
  Wrench,
  Activity,
} from "lucide-react";
import type { Commitment, MethodStep } from "@/types";

/** Nom provisoire de la méthode propriétaire. */
export const METHOD_NAME = "La Méthode Juste";

/**
 * Les six étapes de la méthode.
 * Appliquée aujourd'hui à l'atelier, enseignée en formation,
 * destinée demain à devenir un standard partagé.
 */
export const methodSteps: MethodStep[] = [
  {
    number: 1,
    key: "comprendre",
    title: "Comprendre",
    description:
      "Nous écoutons votre usage, l'historique de l'appareil et ce qui s'est passé avant de toucher quoi que ce soit.",
    benefit: "Vous êtes entendu, pas expédié.",
    detail:
      "Le contexte oriente le diagnostic : une chute, un contact liquide ou une usure lente n'appellent pas les mêmes vérifications.",
    icon: Search,
  },
  {
    number: 2,
    key: "diagnostiquer",
    title: "Diagnostiquer",
    description:
      "Nous identifions la cause réelle de la panne, et pas seulement le symptôme visible.",
    benefit: "On répare le bon problème.",
    detail:
      "Mesures, tests fonctionnels et inspection des composants permettent de distinguer la panne d'origine d'un effet secondaire.",
    icon: Stethoscope,
  },
  {
    number: 3,
    key: "expliquer",
    title: "Expliquer",
    description:
      "Nous vous présentons ce que nous avons trouvé, dans un langage clair, avec les options possibles.",
    benefit: "Vous décidez en connaissance de cause.",
    detail:
      "Chaque option est présentée avec ses avantages, ses limites et ses risques éventuels.",
    icon: MessagesSquare,
  },
  {
    number: 4,
    key: "comparer",
    title: "Comparer",
    description:
      "Nous comparons les pièces et les solutions : d'origine, reconditionnées, compatibles, ou remplacement de l'appareil.",
    benefit: "La bonne pièce pour votre usage.",
    detail:
      "La catégorie de chaque pièce est identifiée. Réparer n'est pas toujours la meilleure décision : nous le disons quand c'est le cas.",
    icon: Scale,
  },
  {
    number: 5,
    key: "reparer",
    title: "Réparer et contrôler",
    description:
      "Nous intervenons uniquement après votre accord, puis nous testons l'appareil avant de vous le rendre.",
    benefit: "Aucune dépense sans votre accord.",
    detail:
      "Un contrôle fonctionnel valide l'intervention. Rien n'est facturé au-delà de ce qui a été validé ensemble.",
    icon: Wrench,
  },
  {
    number: 6,
    key: "suivre",
    title: "Suivre",
    description:
      "Après la réparation, nous restons disponibles et assurons un suivi selon le type d'intervention.",
    benefit: "Vous n'êtes pas seul après coup.",
    detail:
      "Le suivi et la garantie écrite dépendent de la nature de la réparation ; ils vous sont précisés avant intervention.",
    icon: Activity,
  },
];

/** Les engagements de la méthode (page /methode). */
export const commitments: Commitment[] = [
  {
    title: "Diagnostiquer avant de remplacer",
    description:
      "Nous ne remplaçons pas une pièce sans un diagnostic raisonnable de la cause.",
  },
  {
    title: "Expliquer les options",
    description:
      "Nous présentons les différentes solutions plutôt qu'une seule voie imposée.",
  },
  {
    title: "Identifier les pièces",
    description:
      "Nous indiquons la catégorie de chaque pièce utilisée : d'origine, reconditionnée ou compatible.",
  },
  {
    title: "Obtenir votre accord",
    description:
      "Aucune dépense supplémentaire n'est engagée sans votre validation préalable.",
  },
  {
    title: "Signaler les risques",
    description:
      "Nous vous alertons sur les risques éventuels d'une intervention avant de la réaliser.",
  },
  {
    title: "Savoir dire non",
    description:
      "Quand la réparation n'est pas pertinente, nous vous le disons plutôt que de la vendre.",
  },
  {
    title: "Tester après intervention",
    description:
      "Chaque appareil est contrôlé après réparation avant de vous être rendu.",
  },
  {
    title: "Assurer un suivi",
    description:
      "Nous restons joignables après la réparation, selon le type d'intervention.",
  },
  {
    title: "Respecter vos données",
    description:
      "La confidentialité de vos données personnelles est une règle, pas une option.",
  },
];

/** Pratiques que la méthode refuse. */
export const refusedPractices: string[] = [
  "Remplacer une pièce sans diagnostic préalable.",
  "Facturer une intervention non validée par le client.",
  "Présenter une pièce compatible comme une pièce d'origine.",
  "Réaliser une réparation quand elle n'a pas de sens économique ou technique.",
  "Garder le silence sur un risque connu.",
];
