import { defineConfig, devices } from "@playwright/test";

/**
 * Configuration Playwright pour les parcours essentiels.
 *
 * Par défaut, un serveur de production est démarré automatiquement
 * (build + start). Pour réutiliser un serveur déjà lancé, définissez
 * `PLAYWRIGHT_BASE_URL`. Dans un environnement où le binaire Chromium est
 * fourni séparément, renseignez `E2E_CHROMIUM` avec son chemin.
 */
const PORT = Number(process.env.PORT || 3400);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${PORT}`;
const executablePath = process.env.E2E_CHROMIUM || undefined;

export default defineConfig({
  testDir: "./e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `pnpm build && pnpm start --port ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
