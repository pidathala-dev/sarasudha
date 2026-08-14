import { test, expect } from '@playwright/test';

test.describe('Desktop navigation', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('primary nav links are visible and navigate correctly', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav).toBeVisible();

    await nav.getByRole('link', { name: 'Our Story' }).click();
    await expect(page).toHaveURL(/\/our-story/);
    await expect(page.locator('h1')).toContainText(/chosen/i);
  });

  test('contact CTA is visible in the header', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Contact', exact: true }).first()).toBeVisible();
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('menu toggle opens and closes an accessible panel', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('[data-nav-toggle]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const panel = page.locator('#mobile-nav');
    await expect(panel).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('no horizontal overflow at 360px and 390px', async ({ page }) => {
    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/');
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `horizontal overflow at ${width}px`).toBe(false);
    }
  });
});
