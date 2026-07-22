import { test, expect } from "@playwright/test";

test("parcours formation : demande de formation", async ({ page }) => {
  await page.goto("/demande-formation");

  await page.getByLabel("Votre profil").selectOption("debutant");
  await page.getByLabel("Niveau actuel").selectOption("debutant");
  await page.getByLabel("Vos objectifs").fill("Apprendre à réparer des smartphones.");
  await page.getByLabel("Téléphone").fill("06 00 00 00 00");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel(/J'accepte d'être recontacté/).check();

  await page.getByRole("button", { name: /Envoyer ma demande/ }).click();

  await expect(page.getByRole("heading", { name: /Demande envoyée/i })).toBeVisible();
});
