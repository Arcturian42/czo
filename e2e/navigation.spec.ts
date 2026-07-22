import { test, expect } from "@playwright/test";

test.describe("navigation mobile", () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test("ouvre le menu et navigue vers La méthode", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu principal" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("link", { name: "La méthode" }).click();

    await expect(page).toHaveURL(/\/methode$/);
    await expect(page.getByRole("heading", { level: 1, name: /Méthode Juste/i })).toBeVisible();
  });

  test("barre d'actions fixe visible sur mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /Diagnostic/ }).first()).toBeVisible();
  });
});

test("affiche une étude de cas", async ({ page }) => {
  await page.goto("/realisations");

  await expect(
    page.getByRole("heading", { name: /iPhone 14 Pro tombé du cinquième étage/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /iMac 2011 modernisé/i }),
  ).toBeVisible();
});
