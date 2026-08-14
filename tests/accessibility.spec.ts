import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/our-story', '/music', '/ragam', '/artists', '/events', '/heritage', '/participate', '/contact'];

for (const route of routes) {
  test(`${route} has no critical/serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    expect(
      seriousOrCritical,
      seriousOrCritical.map((v) => `${v.id}: ${v.description} (${v.nodes.length} nodes)`).join('\n')
    ).toHaveLength(0);
  });
}
