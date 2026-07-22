import type { LucideIcon } from "lucide-react";

/** Étape de la méthode propriétaire. */
export type MethodStep = {
  number: number;
  key: string;
  title: string;
  description: string;
  benefit: string;
  detail?: string;
  icon: LucideIcon;
};

/** Engagement de la méthode (page /methode). */
export type Commitment = {
  title: string;
  description: string;
};

/** Catégorie de service de réparation. */
export type RepairCategory = {
  slug: string;
  title: string;
  intro: string;
  icon: LucideIcon;
  services: string[];
};

/** Niveau de pièce dans le comparatif pédagogique. */
export type PartTier = {
  key: string;
  name: string;
  rendering: string;
  price: string;
  durability: string;
  consumption: string;
  tradeoffs: string;
  bestFor: string;
  highlighted?: boolean;
};

/** Étape générique de processus / timeline. */
export type ProcessStep = {
  number: number;
  title: string;
  description: string;
};

/** Étude de cas (réalisation). */
export type CaseStudy = {
  slug: string;
  title: string;
  device: string;
  summary: string;
  situation: string;
  diagnosis: string;
  intervention: string;
  result: string;
  lesson: string;
  /** Champs restant à compléter depuis le document source. */
  pendingFields?: string[];
  images: { src: string | null; alt: string; phase?: "avant" | "pendant" | "après" }[];
};

/** Profil de formation présenté sur la page d'accueil / se-former. */
export type TrainingAudience = {
  key: string;
  title: string;
  audience: string;
  learn: string;
  level: string;
  practice: string;
  icon: LucideIcon;
  cta: { label: string; href: string };
};

/** Programme de formation détaillé (modèle prêt pour /formations/[slug]). */
export type TrainingProgram = {
  slug: string;
  title: string;
  audience: string[];
  level: "debutant" | "intermediaire" | "avance";
  duration: string;
  format: string;
  prerequisites: string[];
  objectives: string[];
  modules: string[];
  equipmentIncluded: string[];
  equipmentRequired: string[];
  maxParticipants?: number;
  price?: number;
  certificationType?: string;
  nextSessions?: string[];
};

/** Question / réponse de la FAQ. */
export type FaqItem = {
  question: string;
  answer: string;
  category: "reparation" | "formation" | "reseau";
};
