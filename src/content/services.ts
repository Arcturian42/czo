import { Smartphone, Laptop, Gamepad2, CircuitBoard } from "lucide-react";
import type { RepairCategory } from "@/types";

/**
 * Grandes familles de réparation.
 * Rappel : chaque appareil fait l'objet d'une étude de faisabilité —
 * toutes les réparations ne sont pas systématiquement possibles.
 */
export const repairCategories: RepairCategory[] = [
  {
    slug: "smartphones-tablettes",
    title: "Smartphones et tablettes",
    intro:
      "Écran, batterie, connectique ou carte mère : nous diagnostiquons avant d'intervenir.",
    icon: Smartphone,
    services: [
      "Écrans",
      "Batteries",
      "Connecteurs de charge",
      "Caméras",
      "Haut-parleurs",
      "Microphones",
      "Boutons",
      "Dommages liquides",
      "Carte mère",
      "Récupération de données",
    ],
  },
  {
    slug: "mac-ordinateurs",
    title: "Mac et ordinateurs",
    intro:
      "Du remplacement simple à la rénovation d'un ancien appareil, avec un diagnostic clair.",
    icon: Laptop,
    services: [
      "Écran",
      "Batterie",
      "Clavier",
      "Connecteurs",
      "Stockage",
      "Refroidissement",
      "Alimentation",
      "Carte mère",
      "Optimisation",
      "Récupération de données",
      "Rénovation d'anciens appareils",
    ],
  },
  {
    slug: "consoles",
    title: "Consoles",
    intro:
      "Ports, alimentation, surchauffe ou manettes : les pannes courantes comme les cas techniques.",
    icon: Gamepad2,
    services: [
      "Port HDMI",
      "Port USB",
      "Alimentation",
      "Surchauffe",
      "Ventilateurs",
      "Lecteurs",
      "Stockage",
      "Manettes",
      "Joysticks",
      "Cartes électroniques",
    ],
  },
  {
    slug: "electronique-audiovisuel",
    title: "Électronique et audiovisuel",
    intro:
      "Microsoudure, adaptation de composants et diagnostic sur cartes électroniques.",
    icon: CircuitBoard,
    services: [
      "Composants",
      "Connecteurs",
      "Contrôleurs",
      "Alimentations",
      "Cartes électroniques",
      "Microsoudure",
      "Diagnostic",
      "Adaptation de composants",
    ],
  },
];

/** Mention de faisabilité affichée sous les services. */
export const FEASIBILITY_NOTE =
  "Chaque appareil fait l'objet d'une étude de faisabilité. Nous ne prétendons pas que toutes les réparations sont systématiquement possibles.";
