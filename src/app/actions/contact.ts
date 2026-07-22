"use server";

import { contactSchema, CONTACT_SUBJECTS } from "@/schemas/forms";
import {
  sendEmail,
  getAdminRecipient,
  emailLayout,
  detailsTable,
  escapeHtml,
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

const SUBJECT_LABELS: Record<(typeof CONTACT_SUBJECTS)[number], string> = {
  reparation: "Réparation",
  formation: "Formation",
  professionnel: "Professionnel / réseau",
  autre: "Autre",
};

export async function submitContact(raw: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Formulaire invalide.", fieldErrors: zodFieldErrors(parsed.error) };
  }
  const data = parsed.data;

  // Honeypot : un bot remplit le champ caché → on simule un succès.
  if (data.website) return { ok: true, message: "Message envoyé." };

  const key = await getClientKey("contact");
  if (!rateLimit(key, { limit: 5, windowMs: 60_000 }).success) {
    return { ok: false, error: RATE_LIMIT_MESSAGE };
  }

  try {
    const subjectLabel = SUBJECT_LABELS[data.subject];
    const admin = getAdminRecipient();

    await sendEmail({
      to: admin,
      replyTo: data.email,
      subject: `Nouveau message — ${subjectLabel}`,
      html: emailLayout(
        "Nouveau message de contact",
        detailsTable([
          ["Nom", data.name],
          ["Email", data.email],
          ["Téléphone", data.phone ?? ""],
          ["Sujet", subjectLabel],
          ["Message", data.message],
        ]),
      ),
    });

    await sendEmail({
      to: data.email,
      subject: `Nous avons bien reçu votre message · ${siteConfig.brandName}`,
      html: emailLayout(
        "Merci pour votre message",
        `<p style="margin:0 0 12px;line-height:1.6">Bonjour ${escapeHtml(
          data.name,
        )},</p><p style="margin:0 0 12px;line-height:1.6">Nous avons bien reçu votre message et reviendrons vers vous dès que possible.</p>`,
      ),
    });

    return { ok: true, message: "Message envoyé. Nous vous répondrons rapidement." };
  } catch (err) {
    console.error("[contact:exception]", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
