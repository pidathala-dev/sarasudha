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

test.describe('Heritage chronology (1997–2010)', () => {
  test('our-story renders the 1997 Mandapam milestone with its opening date', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.getByRole('heading', { name: 'Built with the community.' })).toBeVisible();
    await expect(page.locator('body')).toContainText('22 May');
  });

  test('our-story renders the 1998 Vardhanti and 2001 Jayanti milestones', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.locator('body')).toContainText('495th Vardhanti');
    await expect(page.locator('body')).toContainText('593rd Jayanti');
  });

  test('our-story renders the 2010 statue-protection milestone', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.locator('body')).toContainText('3 August 2010');
    await expect(page.getByRole('heading', { name: 'Preserving what remained' })).toBeVisible();
  });

  test('heritage page timeline reflects the fuller chronology', async ({ page }) => {
    await page.goto('/heritage');
    await expect(page.locator('body')).toContainText('1997');
    await expect(page.locator('body')).toContainText('495th Vardhanti');
    await expect(page.locator('body')).toContainText('593rd Jayanti');
    await expect(page.locator('body')).toContainText('2010');
  });

  test('no claim of continuous legal activity is introduced', async ({ page }) => {
    await page.goto('/our-story');
    const bodyText = (await page.locator('body').innerText()).toLowerCase();
    expect(bodyText).not.toContain('registered society since 1984');
    expect(bodyText).not.toContain('legally the same organisation');
    expect(bodyText).not.toContain('remained legally active');
    expect(bodyText).not.toContain('operated continuously');
  });

  test('the ambiguous 2005 entry does not appear publicly', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.locator('body')).not.toContainText('2005');
    await page.goto('/heritage');
    await expect(page.locator('body')).not.toContainText('2005');
  });

  test('the archive CTA in the heritage chronology section links to the archive participation path', async ({
    page,
  }) => {
    await page.goto('/our-story');
    await expect(page.getByRole('link', { name: 'Contribute to the Archive' })).toHaveAttribute(
      'href',
      '/participate?path=archive'
    );
  });

  test('no horizontal overflow on the expanded timeline at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 844 });
    await page.goto('/our-story');
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasOverflow).toBe(false);
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
