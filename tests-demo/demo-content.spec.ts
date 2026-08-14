import { test, expect } from '@playwright/test';

// Runs against a build with PUBLIC_SHOW_DEMO_CONTENT=true (see npm run test:demo
// and playwright.demo.config.ts) — verifies the demo/preview state still works
// correctly for local development, distinct from the default production build
// covered by tests/launch-state.spec.ts.

test('artists page shows the normal search/filter UI and demo profiles', async ({ page }) => {
  await page.goto('/artists');
  await expect(page.locator('#artist-search-input')).toBeVisible();
  const firstArtistLink = page.locator('main a[href^="/artists/"]').first();
  await expect(firstArtistLink).toBeVisible();
  await firstArtistLink.click();
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByText('This is a demo profile used to preview the layout.')).toBeVisible();
});

test('music page shows filter chips and demo performances', async ({ page }) => {
  await page.goto('/music');
  await expect(page.locator('[data-filters]')).toBeVisible();
  await expect(page.getByText('Demo content').first()).toBeVisible();
});

test('homepage renders featured demo content instead of the launch state', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('The first performance is still ahead of us.')).toHaveCount(0);
  await expect(page.getByText('The first voices are yet to come.')).toHaveCount(0);
});
