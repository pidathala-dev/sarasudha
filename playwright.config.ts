import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

// Some CI/sandbox environments pre-install a specific Chromium build outside
// Playwright's usual cache and expose its path via PLAYWRIGHT_CHROMIUM_PATH.
// Falls back to Playwright's own managed browser (the normal `npx playwright
// install` flow) when that variable isn't set or the path doesn't exist.
const preinstalledChromium = process.env.PLAYWRIGHT_CHROMIUM_PATH;
const chromiumExecutablePath =
  preinstalledChromium && existsSync(preinstalledChromium) ? preinstalledChromium : undefined;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
  },
  webServer: {
    // Serves the already-built dist/ with a plain static server rather than
    // `astro preview`: Astro's preview command daemonizes itself (forks and
    // returns immediately), which Playwright's webServer treats as the
    // process having crashed. `serve` stays attached in the foreground.
    command: 'npm run test:serve',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(chromiumExecutablePath && { launchOptions: { executablePath: chromiumExecutablePath } }),
      },
    },
  ],
});
