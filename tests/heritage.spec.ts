import { test, expect } from '@playwright/test';

test.describe('Heritage & registration number', () => {
  test('our-story page loads and shows the registration number', async ({ page }) => {
    const response = await page.goto('/our-story');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toContainText('217/1984');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('heritage page shows the registration number and the historical/contemporary split', async ({ page }) => {
    await page.goto('/heritage');
    await expect(page.locator('body')).toContainText('217/1984');
    await expect(page.getByText('Historical Archive', { exact: false })).toBeVisible();
    await expect(page.getByText('Contemporary Archive', { exact: false })).toBeVisible();
  });

  test('home page heritage section shows the registration number', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toContainText('217/1984');
  });

  test('the name transformation section states the Sarala/Sudha origin as plain text', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.getByText('Sarasudha is a name inspired by Sarala and Sudha.')).toBeVisible();
  });
});

test.describe('Typography assets', () => {
  test('no font requests 404 on our-story', async ({ page }) => {
    const failedFontRequests: string[] = [];
    page.on('response', (response) => {
      const url = response.url();
      if (/\.(woff2?|ttf|otf)(\?|$)/.test(url) && response.status() >= 400) {
        failedFontRequests.push(`${response.status()} ${url}`);
      }
    });
    await page.goto('/our-story', { waitUntil: 'networkidle' });
    expect(failedFontRequests, failedFontRequests.join('\n')).toHaveLength(0);
  });
});

test.describe('Reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the name transformation is fully visible with reduced motion enabled', async ({ page }) => {
    await page.goto('/our-story');
    const firstBeat = page.locator('.name-beat').first();
    await expect(firstBeat).toBeVisible();
    await expect(firstBeat).toHaveCSS('opacity', '1');
  });
});
