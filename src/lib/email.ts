import "server-only";
import { Resend } from "resend";
import { siteConfig, isPlaceholder } from "@/config/site";

/**
 * Couche email pluggable, activée par variables d'environnement.
 * Si RESEND_API_KEY est absent, les envois sont journalisés en console
 * (mode développement) — le site reste fonctionnel sans configuration.
 */
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM =
  process.env.EMAIL_FROM || `${siteConfig.brandName} <onboarding@resend.dev>`;
const ADMIN_TO =
  process.env.EMAIL_ADMIN ||
  (isPlaceholder(siteConfig.email) ? "" : siteConfig.email);

export type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendResult = { ok: boolean; skipped?: boolean; error?: string };

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailArgs): Promise<SendResult> {
  if (!resend || !to) {
    // Fallback honnête : rien n'est envoyé, mais on trace l'intention.
    console.info("[email:skipped] Aucun fournisseur configuré", { to, subject });
    return { ok: true, skipped: true };
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
      replyTo,
    });
    if (error) {
      console.error("[email:error]", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email:exception]", err);
    return { ok: false, error: "Échec de l'envoi." };
  }
}

export function getAdminRecipient(): string {
  return ADMIN_TO;
}

/** Gabarit HTML minimal et sobre pour les emails transactionnels. */
export function emailLayout(title: string, bodyHtml: string): string {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f7f8fb;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#0f1626">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e9ef;border-radius:16px;overflow:hidden">
    <div style="background:#0f1626;padding:20px 24px;color:#fff;font-size:16px;font-weight:600">${escapeHtml(
      siteConfig.brandName,
    )}</div>
    <div style="padding:24px">
      <h1 style="margin:0 0 16px;font-size:18px;color:#0f1626">${escapeHtml(title)}</h1>
      ${bodyHtml}
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e6e9ef;color:#8a94a3;font-size:12px">${escapeHtml(
      siteConfig.tagline,
    )}</div>
  </div>
</body></html>`;
}

/** Échappe le HTML pour intégrer des données utilisateur dans les emails. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Construit un tableau clé/valeur HTML pour le récapitulatif admin. */
export function detailsTable(rows: [string, string][]): string {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows
    .filter(([, v]) => v && v.trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;color:#8a94a3;vertical-align:top;width:40%">${escapeHtml(
          k,
        )}</td><td style="padding:8px 0;color:#0f1626">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
}
