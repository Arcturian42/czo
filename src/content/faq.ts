import type { FaqItem } from "@/types";

/**
 * FAQ — réponses directes, pédagogiques, sans promesse absolue.
 * Les valeurs chiffrées renvoient vers un diagnostic plutôt que d'inventer un prix.
 */
export const faqItems: FaqItem[] = [
  {
    category: "reparation",
    question: "Combien coûte une réparation ?",
    answer:
      "Le prix dépend de l'appareil, de la panne et de la catégorie de pièce choisie. Nous établissons un devis clair après diagnostic, et aucune dépense n'est engagée sans votre accord.",
  },
  {
    category: "reparation",
    question: "Combien de temps prend un diagnostic ?",
    answer:
      "La durée varie selon l'appareil et la complexité de la panne. Nous vous communiquons un délai indicatif dès la prise en charge.",
  },
  {
    category: "reparation",
    question: "Utilisez-vous des pièces d'origine ?",
    answer:
      "Selon les cas et les modèles, nous utilisons des pièces d'origine, reconditionnées d'origine ou compatibles. Nous identifions toujours la catégorie de la pièce et vous expliquons les compromis avant de choisir ensemble.",
  },
  {
    category: "reparation",
    question: "Vais-je perdre mes données ?",
    answer:
      "Notre objectif est de préserver vos données. Nous vous conseillons toujours une sauvegarde préalable lorsque c'est possible, et nous vous prévenons si une intervention présente un risque pour vos données.",
  },
  {
    category: "reparation",
    question: "Réparez-vous les appareils endommagés par l'eau ?",
    answer:
      "Souvent, oui, mais chaque cas est particulier. Un contact liquide demande un diagnostic spécifique : nous évaluons la faisabilité avant de vous proposer une solution.",
  },
  {
    category: "reparation",
    question: "La réparation est-elle garantie ?",
    answer:
      "Une garantie écrite est fournie selon le type d'intervention. Sa durée et son périmètre vous sont précisés avant la réparation.",
  },
  {
    category: "reparation",
    question: "Est-il toujours préférable de réparer ?",
    answer:
      "Non. Parfois, remplacer l'appareil est plus pertinent techniquement ou économiquement. Quand c'est le cas, nous vous le disons clairement plutôt que de vous vendre une réparation.",
  },
  {
    category: "reparation",
    question: "Réparez-vous les appareils anciens ?",
    answer:
      "Oui, lorsque c'est pertinent. Prolonger un appareil ancien — voire le moderniser — est souvent une bonne décision quand le châssis et l'écran restent exploitables.",
  },
  {
    category: "formation",
    question: "Peut-on apprendre à réparer sans expérience ?",
    answer:
      "Oui. Nos parcours pour débutants ne demandent aucun prérequis technique : on part des bases, avec de la pratique encadrée sur des cas réels.",
  },
  {
    category: "formation",
    question: "Quel niveau faut-il pour suivre une formation ?",
    answer:
      "Cela dépend du parcours. Nous proposons des niveaux du débutant à l'avancé, y compris pour les réparateurs déjà en activité qui veulent approfondir.",
  },
  {
    category: "formation",
    question: "Les formations délivrent-elles une certification ?",
    answer:
      "Nos formations délivrent une attestation de formation à la méthode et une validation interne. Elles ne constituent pas une certification professionnelle reconnue par l'État.",
  },
  {
    category: "reseau",
    question: "Comment rejoindre le futur réseau ?",
    answer:
      "Nous préparons un réseau de professionnels partageant les mêmes standards de diagnostic, de transparence et de qualité. Vous pouvez dès maintenant rejoindre la liste d'attente professionnelle pour être informé du lancement.",
  },
];
