import "server-only";
import { headers } from "next/headers";

/** Résultat standard d'une action serveur de formulaire. */
export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/** Identifiant best-effort du client pour la limitation de débit. */
export async function getClientKey(scope: string): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}

export const RATE_LIMIT_MESSAGE =
  "Trop de tentatives. Merci de patienter une minute avant de réessayer.";

export const GENERIC_ERROR =
  "Une erreur est survenue. Merci de réessayer ou de nous contacter directement.";

/** Aplati une erreur Zod en dictionnaire { champ: premier message }. */
export function zodFieldErrors(error: {
  issues: { path: (string | number | symbol)[]; message: string }[];
}): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
