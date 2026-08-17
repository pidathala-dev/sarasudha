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

test.describe('Heritage chronology (1997–2010) — Heritage is the canonical home', () => {
  test('heritage page timeline reflects the fuller chronology', async ({ page }) => {
    await page.goto('/heritage');
    await expect(page.locator('body')).toContainText('1997');
    await expect(page.locator('body')).toContainText('495th Vardhanti');
    await expect(page.locator('body')).toContainText('593rd Jayanti');
    await expect(page.locator('body')).toContainText('2010');
  });

  test('our-story does not repeat the detailed 1997/1998/2001/2010 chronology', async ({ page }) => {
    await page.goto('/our-story');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('22 May 1997');
    expect(bodyText).not.toContain('495th Vardhanti');
    expect(bodyText).not.toContain('593rd Jayanti');
    expect(bodyText).not.toContain('3 August 2010');
  });

  test('our-story does not repeat the Sarala/Sudha meanings outside The Name section', async ({ page }) => {
    await page.goto('/our-story');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('Sarasudha began with two names');
    // The meanings are explained in full exactly once, in The Name section. The hero is allowed
    // one brief passing mention ("ideas of simplicity, sincerity and sweetness") per the "hero
    // mentions the names briefly" rule — so each word may appear at most twice sitewide (hero +
    // The Name), never a third time (which would mean some other section re-explained them).
    const lowerBody = bodyText.toLowerCase();
    expect(lowerBody.match(/simplicity/g)?.length ?? 0).toBeLessThanOrEqual(2);
    expect(lowerBody.match(/nectar/g)?.length ?? 0).toBeLessThanOrEqual(2);
  });

  test('registration number is not visually duplicated on the heritage page', async ({ page }) => {
    await page.goto('/heritage');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.match(/217\/1984/g)?.length ?? 0).toBe(1);
  });

  test('no claim of continuous legal activity is introduced on either page', async ({ page }) => {
    for (const path of ['/our-story', '/heritage']) {
      await page.goto(path);
      const bodyText = (await page.locator('body').innerText()).toLowerCase();
      expect(bodyText).not.toContain('registered society since 1984');
      expect(bodyText).not.toContain('legally the same organisation');
      expect(bodyText).not.toContain('remained legally active');
      expect(bodyText).not.toContain('operated continuously');
    }
  });

  test('the ambiguous 2005 entry does not appear publicly', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.locator('body')).not.toContainText('2005');
    await page.goto('/heritage');
    await expect(page.locator('body')).not.toContainText('2005');
  });

  test('our-story bridges to the heritage archive rather than retelling it', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.getByRole('link', { name: 'Explore the Heritage Archive' })).toHaveAttribute('href', '/heritage');
    await expect(page.getByRole('link', { name: 'Explore the Heritage', exact: true })).toHaveAttribute(
      'href',
      '/heritage'
    );
  });

  test('heritage page ends with an archive-specific CTA distinct from Our Story', async ({ page }) => {
    await page.goto('/heritage');
    await expect(page.getByRole('link', { name: 'Share Archival Material' })).toHaveAttribute(
      'href',
      '/participate?path=archive'
    );
  });

  test('no horizontal overflow at 360px on either page', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 844 });
    for (const path of ['/our-story', '/heritage']) {
      await page.goto(path);
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `overflow on ${path}`).toBe(false);
    }
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

test.describe('First real historical photograph archive entries', () => {
  test('heritage page lists the two real archive entries with links to their detail pages', async ({ page }) => {
    await page.goto('/heritage');
    await expect(page.getByRole('link', { name: /Mandapam Inauguration, Cuddapah/ })).toHaveAttribute(
      'href',
      '/heritage/1997-mandapam-inauguration-cuddapah'
    );
    await expect(page.getByRole('link', { name: /Tallapaka — 1997/ })).toHaveAttribute(
      'href',
      '/heritage/1997-tallapaka'
    );
  });

  test('the P. Ramachandran archive entry is not published while the portrait is unresolved', async ({ page }) => {
    await page.goto('/heritage');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('P. Ramachandran');
    const response = await page.goto('/heritage/p-ramachandran');
    expect(response?.status()).toBe(404);
  });

  test('Cuddapah 1997 Mandapam inauguration detail page renders and does not claim the statue was installed that day', async ({
    page,
  }) => {
    const response = await page.goto('/heritage/1997-mandapam-inauguration-cuddapah');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Mandapam Inauguration');
    const bodyText = (await page.locator('body').innerText()).toLowerCase();
    expect(bodyText).not.toContain('unveiled');
    expect(bodyText).not.toContain('statue was installed');
    await expect(page.locator('body')).toContainText('22 May 1997');
  });

  test('Tallapaka 1997 detail page renders and links back to the Cuddapah entry for the same day', async ({ page }) => {
    const response = await page.goto('/heritage/1997-tallapaka');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Tallapaka');
    await expect(page.getByRole('link', { name: '1997 Mandapam inauguration in Cuddapah' })).toHaveAttribute(
      'href',
      '/heritage/1997-mandapam-inauguration-cuddapah'
    );
  });

  test('our-story mentions P. Ramachandran as plain text, not linked to an unpublished entry', async ({ page }) => {
    await page.goto('/our-story');
    await expect(page.locator('body')).toContainText('P. Ramachandran, the owner\'s father, was among its early leaders.');
    await expect(page.getByRole('link', { name: 'P. Ramachandran' })).toHaveCount(0);
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('Andhra Pradesh Tourism');
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
