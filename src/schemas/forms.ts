import { z } from "zod";

/* ------------------------------------------------------------------ *
 * Enums partagés (client + serveur)
 * ------------------------------------------------------------------ */
export const DEVICE_TYPES = [
  "iphone",
  "autre-smartphone",
  "tablette",
  "macbook",
  "imac",
  "pc",
  "console",
  "audiovisuel",
  "autre",
] as const;

export const DEVICE_LABELS: Record<(typeof DEVICE_TYPES)[number], string> = {
  iphone: "iPhone",
  "autre-smartphone": "Autre smartphone",
  tablette: "Tablette",
  macbook: "MacBook",
  imac: "iMac",
  pc: "PC",
  console: "Console",
  audiovisuel: "Appareil audiovisuel",
  autre: "Autre",
};

export const CAUSES = [
  "chute",
  "liquide",
  "panne-soudaine",
  "usure",
  "reparation-precedente",
  "autre",
] as const;

export const CAUSE_LABELS: Record<(typeof CAUSES)[number], string> = {
  chute: "Une chute",
  liquide: "Un liquide",
  "panne-soudaine": "Une panne soudaine",
  usure: "Une usure progressive",
  "reparation-precedente": "Une réparation précédente",
  autre: "Autre / je ne sais pas",
};

export const NEXT_STEPS = ["orientation", "rappel", "rendez-vous", "depot"] as const;

export const NEXT_STEP_LABELS: Record<(typeof NEXT_STEPS)[number], string> = {
  orientation: "Recevoir une première orientation",
  rappel: "Être rappelé",
  "rendez-vous": "Demander un rendez-vous",
  depot: "Déposer l'appareil",
};

/* ------------------------------------------------------------------ *
 * Fragments réutilisables
 * ------------------------------------------------------------------ */
const nameField = z
  .string()
  .trim()
  .min(2, "Ce champ doit contenir au moins 2 caractères.")
  .max(80, "Ce champ est trop long.");

const emailField = z
  .string()
  .trim()
  .min(1, "L'email est requis.")
  .email("Adresse email invalide.")
  .max(160);

const phoneField = z
  .string()
  .trim()
  .min(6, "Numéro de téléphone invalide.")
  .max(30)
  .regex(/^[+0-9 ().-]+$/, "Numéro de téléphone invalide.");

const consentField = z
  .boolean()
  .refine((v) => v === true, "Votre consentement est nécessaire pour vous recontacter.");

/** Honeypot anti-spam : doit rester vide. */
const honeypotField = z
  .string()
  .max(0, "Champ invalide.")
  .optional()
  .or(z.literal(""));

/* ------------------------------------------------------------------ *
 * Formulaire de diagnostic (multi-étapes)
 * ------------------------------------------------------------------ */
export const diagnosticSchema = z.object({
  deviceType: z.enum(DEVICE_TYPES, {
    message: "Veuillez sélectionner un type d'appareil.",
  }),
  problem: z
    .string()
    .trim()
    .min(2, "Décrivez le problème rencontré.")
    .max(200),
  cause: z.enum(CAUSES, { message: "Veuillez sélectionner ce qui s'est passé." }),
  deviceOn: z.boolean().optional().default(false),
  importantData: z.boolean().optional().default(false),
  exactModel: z.string().trim().max(120).optional().or(z.literal("")),
  incidentDate: z.string().trim().max(40).optional().or(z.literal("")),
  description: z
    .string()
    .trim()
    .max(2000, "La description est trop longue.")
    .optional()
    .or(z.literal("")),
  nextStep: z.enum(NEXT_STEPS, {
    message: "Indiquez la suite souhaitée.",
  }),
  firstName: nameField,
  lastName: nameField,
  phone: phoneField,
  email: emailField,
  consent: consentField,
  // Nombre de photos jointes (les fichiers sont validés côté serveur).
  photoCount: z.number().int().min(0).max(6).optional().default(0),
  website: honeypotField, // honeypot
});

export type DiagnosticInput = z.input<typeof diagnosticSchema>;
export type DiagnosticData = z.output<typeof diagnosticSchema>;

/* ------------------------------------------------------------------ *
 * Formulaire de demande de formation
 * ------------------------------------------------------------------ */
export const TRAINING_PROFILES = [
  "debutant",
  "reconversion",
  "reparateur",
  "entreprise",
] as const;

export const TRAINING_FORMATS = ["presentiel", "distanciel", "hybride", "indifferent"] as const;

export const trainingRequestSchema = z.object({
  profile: z.enum(TRAINING_PROFILES, { message: "Sélectionnez votre profil." }),
  currentLevel: z.enum(["debutant", "intermediaire", "avance"], {
    message: "Indiquez votre niveau actuel.",
  }),
  objectives: z
    .string()
    .trim()
    .min(3, "Précisez vos objectifs.")
    .max(1000),
  deviceType: z.string().trim().max(120).optional().or(z.literal("")),
  skills: z.string().trim().max(500).optional().or(z.literal("")),
  availability: z.string().trim().max(200).optional().or(z.literal("")),
  format: z.enum(TRAINING_FORMATS).optional().default("indifferent"),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  phone: phoneField,
  email: emailField,
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: consentField,
  website: honeypotField,
});

export type TrainingRequestInput = z.input<typeof trainingRequestSchema>;
export type TrainingRequestData = z.output<typeof trainingRequestSchema>;

/* ------------------------------------------------------------------ *
 * Formulaire professionnel (liste d'attente réseau)
 * ------------------------------------------------------------------ */
export const PRO_ACTIVITIES = [
  "reparateur-independant",
  "atelier",
  "formateur",
  "entreprise",
] as const;

export const PRO_INTERESTS = ["formation", "methode", "reseau", "partenariat"] as const;

export const professionalSchema = z.object({
  firstName: nameField,
  lastName: nameField,
  company: z.string().trim().max(120).optional().or(z.literal("")),
  activityType: z.enum(PRO_ACTIVITIES, {
    message: "Sélectionnez votre type d'activité.",
  }),
  yearsOfExperience: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  specialties: z.string().trim().max(300).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  teamSize: z.string().trim().max(40).optional().or(z.literal("")),
  interest: z.enum(PRO_INTERESTS, { message: "Indiquez votre intérêt principal." }),
  phone: phoneField,
  email: emailField,
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: consentField,
  website: honeypotField,
});

export type ProfessionalInput = z.input<typeof professionalSchema>;
export type ProfessionalData = z.output<typeof professionalSchema>;

/* ------------------------------------------------------------------ *
 * Formulaire de contact
 * ------------------------------------------------------------------ */
export const CONTACT_SUBJECTS = [
  "reparation",
  "formation",
  "professionnel",
  "autre",
] as const;

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.enum(CONTACT_SUBJECTS).optional().default("autre"),
  message: z
    .string()
    .trim()
    .min(10, "Votre message est un peu court.")
    .max(2000),
  consent: consentField,
  website: honeypotField,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/* ------------------------------------------------------------------ *
 * Contraintes d'upload (partagées client/serveur)
 * ------------------------------------------------------------------ */
export const UPLOAD_MAX_FILES = 6;
export const UPLOAD_MAX_SIZE_MB = 8;
export const UPLOAD_MAX_SIZE_BYTES = UPLOAD_MAX_SIZE_MB * 1024 * 1024;
export const UPLOAD_ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const UPLOAD_ACCEPTED_EXT = ".jpg,.jpeg,.png,.webp";
