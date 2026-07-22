"use server";

import { trainingRequestSchema } from "@/schemas/forms";
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

const PROFILE_LABELS: Record<string, string> = {
  debutant: "Je débute",
  reconversion: "Reconversion",
  reparateur: "Réparateur en activité",
  entreprise: "Entreprise",
};

export async function submitTrainingRequest(raw: unknown): Promise<ActionResult> {
  const parsed = trainingRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Formulaire invalide.", fieldErrors: zodFieldErrors(parsed.error) };
  }
  const data = parsed.data;
  if (data.website) return { ok: true, message: "Demande envoyée." };

  const key = await getClientKey("training");
  if (!rateLimit(key, { limit: 5, windowMs: 60_000 }).success) {
    return { ok: false, error: RATE_LIMIT_MESSAGE };
  }

  try {
    await sendEmail({
      to: getAdminRecipient(),
      replyTo: data.email,
      subject: `Demande de formation — ${PROFILE_LABELS[data.profile] ?? data.profile}`,
      html: emailLayout(
        "Nouvelle demande de formation",
        detailsTable([
          ["Profil", PROFILE_LABELS[data.profile] ?? data.profile],
          ["Niveau actuel", data.currentLevel],
          ["Objectifs", data.objectives],
          ["Type d'appareil", data.deviceType ?? ""],
          ["Compétences recherchées", data.skills ?? ""],
          ["Disponibilité", data.availability ?? ""],
          ["Format préféré", data.format ?? ""],
          ["Ville", data.city ?? ""],
          ["Téléphone", data.phone],
          ["Email", data.email],
          ["Message", data.message ?? ""],
        ]),
      ),
    });

    await sendEmail({
      to: data.email,
      subject: `Votre demande de formation · ${siteConfig.brandName}`,
      html: emailLayout(
        "Merci pour votre demande",
        `<p style="margin:0 0 12px;line-height:1.6">Bonjour,</p><p style="margin:0 0 12px;line-height:1.6">Nous avons bien reçu votre demande de formation et reviendrons vers vous pour vous orienter vers le parcours le plus adapté.</p>`,
      ),
    });

    return { ok: true, message: "Demande envoyée. Nous revenons vers vous rapidement." };
  } catch (err) {
    console.error("[training:exception]", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
