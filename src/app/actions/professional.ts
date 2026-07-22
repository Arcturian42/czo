"use server";

import { professionalSchema, PRO_ACTIVITIES, PRO_INTERESTS } from "@/schemas/forms";
import {
  sendEmail,
  getAdminRecipient,
  emailLayout,
  detailsTable,
} from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import {
  getClientKey,
  zodFieldErrors,
  type ActionResult,
  RATE_LIMIT_MESSAGE,
  GENERIC_ERROR,
} from "@/lib/form";
import { siteConfig } from "@/config/site";

const ACTIVITY_LABELS: Record<(typeof PRO_ACTIVITIES)[number], string> = {
  "reparateur-independant": "Réparateur indépendant",
  atelier: "Atelier",
  formateur: "Formateur",
  entreprise: "Entreprise",
};

const INTEREST_LABELS: Record<(typeof PRO_INTERESTS)[number], string> = {
  formation: "Formation",
  methode: "Méthode",
  reseau: "Futur réseau",
  partenariat: "Partenariat",
};

export async function submitProfessional(raw: unknown): Promise<ActionResult> {
  const parsed = professionalSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Formulaire invalide.", fieldErrors: zodFieldErrors(parsed.error) };
  }
  const data = parsed.data;
  if (data.website) return { ok: true, message: "Inscription enregistrée." };

  const key = await getClientKey("professional");
  if (!rateLimit(key, { limit: 5, windowMs: 60_000 }).success) {
    return { ok: false, error: RATE_LIMIT_MESSAGE };
  }

  try {
    await sendEmail({
      to: getAdminRecipient(),
      replyTo: data.email,
      subject: `Liste d'attente pro — ${ACTIVITY_LABELS[data.activityType]}`,
      html: emailLayout(
        "Nouvelle inscription à la liste d'attente professionnelle",
        detailsTable([
          ["Prénom", data.firstName],
          ["Nom", data.lastName],
          ["Entreprise", data.company ?? ""],
          ["Type d'activité", ACTIVITY_LABELS[data.activityType]],
          ["Années d'expérience", data.yearsOfExperience ?? ""],
          ["Spécialités", data.specialties ?? ""],
          ["Ville", data.city ?? ""],
          ["Taille de l'équipe", data.teamSize ?? ""],
          ["Intérêt principal", INTEREST_LABELS[data.interest]],
          ["Téléphone", data.phone],
          ["Email", data.email],
          ["Message", data.message ?? ""],
        ]),
      ),
    });

    await sendEmail({
      to: data.email,
      subject: `Bienvenue sur la liste d'attente professionnelle · ${siteConfig.brandName}`,
      html: emailLayout(
        "Votre inscription est enregistrée",
        `<p style="margin:0 0 12px;line-height:1.6">Bonjour,</p><p style="margin:0 0 12px;line-height:1.6">Merci de votre intérêt pour notre futur réseau de professionnels. Vous serez informé en priorité de son lancement et des prochaines étapes.</p>`,
      ),
    });

    return {
      ok: true,
      message: "Inscription enregistrée. Vous serez informé en priorité du lancement.",
    };
  } catch (err) {
    console.error("[professional:exception]", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
