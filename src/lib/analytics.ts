/**
 * Analytics léger et respectueux de la vie privée.
 *
 * Règle stricte : on ne transmet JAMAIS de données personnelles, de
 * descriptions libres, de photos ni de données relatives aux appareils.
 * Seuls des évènements génériques (et éventuellement un numéro d'étape) sont émis.
 *
 * L'implémentation pousse vers `window.dataLayer` (GTM) si présent, et émet
 * un CustomEvent `analytics` pour brancher n'importe quel outil ultérieurement.
 */
export type AnalyticsEvent =
  | "cta_reparer"
  | "cta_se_former"
  | "diagnostic_start"
  | "diagnostic_step"
  | "diagnostic_abandon"
  | "diagnostic_submit"
  | "training_request_submit"
  | "professional_submit"
  | "phone_click"
  | "case_study_view"
  | "method_view"
  | "parts_comparison_interact";

type SafePayload = { step?: number };

export function track(event: AnalyticsEvent, payload: SafePayload = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });
  window.dispatchEvent(new CustomEvent("analytics", { detail: { event, ...payload } }));
}
