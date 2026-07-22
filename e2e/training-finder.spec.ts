import { test, expect } from "@playwright/test";

test("orientation formation : recommandation puis demande préremplie", async ({ page }) => {
  await page.goto("/se-former");

  // Deux réponses → parcours recommandé.
  await page.getByLabel("Je change de métier").check();
  await page.getByLabel("En faire une activité").check();

  await expect(page.getByText("Parcours recommandé")).toBeVisible();

  // Préremplit la demande avec le profil recommandé (reconversion).
  await page.getByRole("button", { name: /Préremplir ma demande/ }).click();

  await expect(page.getByLabel("Votre profil")).toHaveValue("reconversion");
});
