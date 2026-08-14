import { test, expect } from '@playwright/test';

// This suite runs against the default production build (PUBLIC_SHOW_DEMO_CONTENT
// unset → false, see src/config/site.ts), so it exercises the real, zero-content
// launch state — no demo artists, performances or events. See
// tests-demo/demo-content.spec.ts for coverage of the demo-content-on state.

test.describe('Homepage launch state', () => {
  test('shows "The Beginning" section with working CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('A new space for music is taking shape.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get Involved' })).toHaveAttribute('href', '/participate');
    await expect(page.getByRole('link', { name: 'Read Our Story' })).toHaveAttribute('href', '/our-story');
  });

  test('featured performances and artists sections show an honest invitation, not an empty grid', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('The first performance is still ahead of us.')).toBeVisible();
    await expect(page.getByText('The first voices are yet to come.')).toBeVisible();
  });
});

test.describe('Artists page launch state', () => {
  test('shows the editorial zero-content section, not a search/filter UI', async ({ page }) => {
    await page.goto('/artists');
    await expect(page.getByText('This page is waiting for its first artist.')).toBeVisible();
    await expect(page.locator('#artist-search-input')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Apply to Perform' })).toHaveAttribute(
      'href',
      '/participate?path=perform'
    );
  });
});

test.describe('Music page launch state', () => {
  test('shows editorial category descriptions instead of filter chips', async ({ page }) => {
    await page.goto('/music');
    await expect(page.getByText("The first performance hasn't been recorded yet.")).toBeVisible();
    await expect(page.locator('[data-filters]')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Carnatic' })).toBeVisible();
  });
});

test.describe('Events and Ragam launch state', () => {
  test('events page invites visitors to stay connected or propose an event', async ({ page }) => {
    await page.goto('/events');
    await expect(page.getByText('No gatherings are on the calendar yet.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Propose an Event' })).toHaveAttribute(
      'href',
      '/contact?reason=Event'
    );
  });

  test('ragam page stays substantial with editorial content when empty', async ({ page }) => {
    await page.goto('/ragam');
    await expect(page.getByRole('heading', { name: 'A few terms to start with.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Raga', exact: true })).toBeVisible();
  });
});

test.describe('Participate page — six paths and deep linking', () => {
  test('all six participation paths are present without JavaScript', async ({ page }) => {
    await page.goto('/participate');
    for (const title of ['Perform', 'Collaborate', 'Archive', 'Volunteer', 'Partner', 'Stay Connected']) {
      await expect(page.getByRole('heading', { name: title, level: 3 })).toBeVisible();
    }
  });

  test('?path= query param highlights and scrolls to the matching card', async ({ page }) => {
    await page.goto('/participate?path=archive');
    const card = page.locator('#archive');
    await expect(card).toHaveClass(/is-selected/);
  });
});

test.describe('Heritage archive contribution path', () => {
  test('heritage CTA routes to the archive participation path', async ({ page }) => {
    await page.goto('/heritage');
    await expect(page.getByRole('link', { name: 'Contribute to the Archive' }).first()).toHaveAttribute(
      'href',
      '/participate?path=archive'
    );
  });
});
