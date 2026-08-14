import { test, expect } from '@playwright/test';

const primaryRoutes = [
  '/',
  '/our-story',
  '/music',
  '/ragam',
  '/artists',
  '/events',
  '/heritage',
  '/participate',
  '/contact',
  '/privacy',
  '/terms',
];

for (const route of primaryRoutes) {
  test(`${route} renders with a single h1 and no console errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    const response = await page.goto(route);
    expect(response?.status(), `${route} should respond 200`).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Sarasudha/);

    expect(consoleErrors, `console errors on ${route}: ${consoleErrors.join(', ')}`).toHaveLength(0);
  });
}

test('artists page renders — with the launch state when there is no real content yet, or a working profile link once there is', async ({
  page,
}) => {
  await page.goto('/artists');
  const firstArtistLink = page.locator('main a[href^="/artists/"]').first();
  if (await firstArtistLink.count()) {
    await firstArtistLink.click();
    await expect(page.locator('h1')).toHaveCount(1);
  } else {
    // Zero-content launch state — see tests/launch-state.spec.ts for full coverage.
    await expect(page.locator('h1')).toHaveCount(1);
  }
});

test('404 for an unknown route', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
});
