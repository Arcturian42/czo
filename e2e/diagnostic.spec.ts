import { test, expect } from "@playwright/test";

test("parcours diagnostic : soumission multi-étapes", async ({ page }) => {
  await page.goto("/diagnostic");

  // Étape 1 — Appareil
  await expect(page.getByRole("heading", { name: /Décrivez votre appareil/i })).toBeVisible();
  await page.getByText("iPhone", { exact: true }).click();
  await page.getByRole("button", { name: "Continuer" }).click();

  // Étape 2 — Problème
  await page.getByLabel("Décrivez le problème").fill("Écran cassé après une chute");
  await page.getByRole("button", { name: "Continuer" }).click();

  // Étape 3 — Cause
  await page.getByText("Une chute", { exact: true }).click();
  await page.getByRole("button", { name: "Continuer" }).click();

  // Étape 4 — Détails (facultatif)
  await page.getByRole("button", { name: "Continuer" }).click();

  // Étape 5 — Photos (facultatif)
  await page.getByRole("button", { name: "Continuer" }).click();

  // Étape 6 — Suite
  await page.getByText("Être rappelé", { exact: true }).click();
  await page.getByRole("button", { name: "Continuer" }).click();

  // Étape 7 — Coordonnées
  await page.getByLabel("Prénom").fill("Camille");
  await page.getByLabel(/^Nom/).fill("Durand");
  await page.getByLabel("Téléphone").fill("06 00 00 00 00");
  await page.getByLabel("Email").fill("camille.durand@example.com");
  await page.getByLabel(/J'accepte d'être recontacté/).check();

  await page.getByRole("button", { name: /Envoyer ma demande/ }).click();

  await expect(
    page.getByRole("heading", { name: /Demande de diagnostic envoyée/i }),
  ).toBeVisible();
});
