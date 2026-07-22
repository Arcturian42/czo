import { Sparkles, RefreshCw, Wrench, Briefcase } from "lucide-react";
import type { TrainingAudience, TrainingProgram } from "@/types";

/**
 * Quatre profils de formation.
 * Aucune promesse de certification professionnelle reconnue :
 * on parle d'attestation, de validation interne, de formation à la méthode.
 */
export const trainingAudiences: TrainingAudience[] = [
  {
    key: "debutant",
    title: "Je débute",
    audience: "Vous partez de zéro et voulez apprendre les bases avec méthode.",
    learn:
      "Diagnostic, gestes fondamentaux, choix des pièces et sécurité de travail.",
    level: "Aucun prérequis technique.",
    practice: "Manipulation guidée sur des cas simples et réels.",
    icon: Sparkles,
    cta: { label: "Découvrir les parcours", href: "/se-former#debutant" },
  },
  {
    key: "reconversion",
    title: "Je veux me reconvertir",
    audience:
      "Vous envisagez la réparation comme nouvelle activité ou nouveau métier.",
    learn:
      "Une méthode complète : diagnostic, pièces, gestes techniques, contrôle qualité et relation client.",
    level: "Débutant à intermédiaire.",
    practice: "Cas progressifs, du plus courant au plus technique.",
    icon: RefreshCw,
    cta: { label: "Découvrir les parcours", href: "/se-former#reconversion" },
  },
  {
    key: "reparateur",
    title: "Je suis déjà réparateur",
    audience:
      "Vous exercez déjà et voulez fiabiliser votre diagnostic et vos gestes avancés.",
    learn:
      "Approfondissement : microsoudure, cas complexes, méthode de diagnostic, transparence client.",
    level: "Intermédiaire à avancé.",
    practice: "Cas complexes et techniques de niveau atelier.",
    icon: Wrench,
    cta: { label: "Découvrir les parcours", href: "/se-former#reparateur" },
  },
  {
    key: "entreprise",
    title: "Je représente une entreprise",
    audience:
      "Vous souhaitez former une équipe à une méthode commune et lisible.",
    learn:
      "Une base partagée : diagnostic, standards de transparence, contrôle qualité, relation client.",
    level: "Adapté au niveau de l'équipe.",
    practice: "Format sur mesure, en groupe.",
    icon: Briefcase,
    cta: { label: "Découvrir les parcours", href: "/se-former#entreprise" },
  },
];

/**
 * Modèle de programme détaillé, prêt pour une future route /formations/[slug].
 * Les valeurs concrètes (prix, sessions) restent à définir : ne rien inventer.
 */
export const trainingPrograms: TrainingProgram[] = [
  {
    slug: "fondamentaux-reparation-smartphone",
    title: "Fondamentaux de la réparation smartphone",
    audience: ["Débutants", "Reconversion"],
    level: "debutant",
    duration: "[DURÉE]",
    format: "Présentiel à [VILLE] · pratique encadrée",
    prerequisites: ["Aucun prérequis technique", "Intérêt pour la manipulation"],
    objectives: [
      "Diagnostiquer une panne courante avec méthode",
      "Choisir la bonne catégorie de pièce",
      "Réaliser les gestes de remplacement essentiels",
      "Contrôler et tester après intervention",
    ],
    modules: [
      "Sécurité et poste de travail",
      "Méthode de diagnostic",
      "Écrans et batteries",
      "Connectique et boutons",
      "Contrôle qualité et relation client",
    ],
    equipmentIncluded: ["Outils fournis pendant la formation", "Consommables de base"],
    equipmentRequired: ["[À DÉFINIR]"],
    certificationType: "Attestation de formation à la méthode",
  },
];

/** Formulations autorisées pour parler de validation (jamais « certification reconnue »). */
export const CERTIFICATION_NOTE =
  "Nos formations délivrent une attestation de formation à la méthode et une validation interne. Elles ne constituent pas une certification professionnelle reconnue par l'État.";
