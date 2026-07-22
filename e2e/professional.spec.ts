import { test, expect } from "@playwright/test";

test("parcours professionnel : liste d'attente réseau", async ({ page }) => {
  await page.goto("/professionnels");

  await page.getByLabel("Prénom").fill("Alex");
  await page.getByLabel(/^Nom/).fill("Martin");
  await page.getByLabel("Type d'activité").selectOption("atelier");
  await page.getByLabel("Téléphone").fill("06 00 00 00 00");
  await page.getByLabel("Email").fill("pro@example.com");
  await page.getByLabel(/J'accepte d'être recontacté/).check();

  await page.getByRole("button", { name: /Rejoindre la liste d'attente/ }).click();

  await expect(page.getByRole("heading", { name: /Inscription enregistrée/i })).toBeVisible();
});
