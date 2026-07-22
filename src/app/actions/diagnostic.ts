"use server";

import {
  diagnosticSchema,
  DEVICE_LABELS,
  CAUSE_LABELS,
  NEXT_STEP_LABELS,
} from "@/schemas/forms";
import {
  sendEmail,
  getAdminRecipient,
  emailLayout,
  detailsTable,
  escapeHtml,
} from "@/lib/email";
import { validateUploads, storeUploads } from "@/lib/storage";
import { rateLimit } from "@/lib/rate-limit";
import {
  getClientKey,
  zodFieldErrors,
  type ActionResult,
  RATE_LIMIT_MESSAGE,
  GENERIC_ERROR,
} from "@/lib/form";
import { siteConfig } from "@/config/site";

/** Action serveur du formulaire de diagnostic (FormData : champs + photos). */
export async function submitDiagnostic(formData: FormData): Promise<ActionResult> {
  const files = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const raw = {
    deviceType: formData.get("deviceType"),
    problem: formData.get("problem"),
    cause: formData.get("cause"),
    deviceOn: formData.get("deviceOn") === "true",
    importantData: formData.get("importantData") === "true",
    exactModel: formData.get("exactModel") ?? "",
    incidentDate: formData.get("incidentDate") ?? "",
    description: formData.get("description") ?? "",
    nextStep: formData.get("nextStep"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    consent: formData.get("consent") === "true",
    photoCount: files.length,
    website: formData.get("website") ?? "",
  };

  const parsed = diagnosticSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Formulaire invalide.", fieldErrors: zodFieldErrors(parsed.error) };
  }
  const data = parsed.data;
  if (data.website) return { ok: true, message: "Demande envoyée." };

  const key = await getClientKey("diagnostic");
  if (!rateLimit(key, { limit: 5, windowMs: 60_000 }).success) {
    return { ok: false, error: RATE_LIMIT_MESSAGE };
  }

  // Validation serveur des fichiers (type, taille, nombre).
  const uploads = validateUploads(files);
  if (!uploads.ok) {
    return { ok: false, error: uploads.error, fieldErrors: { photos: uploads.error } };
  }

  try {
    const reference = `DIAG-${Date.now().toString(36).toUpperCase()}`;
    const stored = await storeUploads(uploads.files, reference);

    const photoLines =
      stored.length === 0
        ? "Aucune photo"
        : stored
            .map((f) => (f.url ? `${f.name} (${f.url})` : `${f.name} — non stockée`))
            .join(" · ");

    await sendEmail({
      to: getAdminRecipient(),
      replyTo: data.email,
      subject: `Diagnostic ${reference} — ${DEVICE_LABELS[data.deviceType]}`,
      html: emailLayout(
        `Nouvelle demande de diagnostic (${escapeHtml(reference)})`,
        detailsTable([
          ["Appareil", DEVICE_LABELS[data.deviceType]],
          ["Modèle exact", data.exactModel ?? ""],
          ["Problème", data.problem],
          ["Cause", CAUSE_LABELS[data.cause]],
          ["Appareil encore allumé", data.deviceOn ? "Oui" : "Non"],
          ["Données importantes", data.importantData ? "Oui" : "Non"],
          ["Date approximative", data.incidentDate ?? ""],
          ["Description", data.description ?? ""],
          ["Suite souhaitée", NEXT_STEP_LABELS[data.nextStep]],
          ["Photos", photoLines],
          ["Prénom", data.firstName],
          ["Nom", data.lastName],
          ["Téléphone", data.phone],
          ["Email", data.email],
        ]),
      ),
    });

    await sendEmail({
      to: data.email,
      subject: `Votre demande de diagnostic ${reference} · ${siteConfig.brandName}`,
      html: emailLayout(
        "Nous avons bien reçu votre demande",
        `<p style="margin:0 0 12px;line-height:1.6">Bonjour ${escapeHtml(
          data.firstName,
        )},</p><p style="margin:0 0 12px;line-height:1.6">Votre demande de diagnostic (référence <strong>${escapeHtml(
          reference,
        )}</strong>) a bien été enregistrée. Nous reviendrons vers vous pour vous présenter un premier avis et les options possibles — sans aucune intervention sans votre accord.</p>`,
      ),
    });

    return {
      ok: true,
      message: `Votre demande est envoyée (réf. ${reference}). Nous revenons vers vous rapidement.`,
    };
  } catch (err) {
    console.error("[diagnostic:exception]", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
