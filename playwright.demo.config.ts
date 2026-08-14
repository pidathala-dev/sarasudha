import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Runs the demo-content-on test suite (tests-demo/) against a build made
 * with PUBLIC_SHOW_DEMO_CONTENT=true — see `npm run test:demo`. Kept as a
 * separate config/directory (rather than testIgnore filtering within the
 * main suite) so a plain `npm test` never accidentally depends on demo
 * content being present.
 */
export default defineConfig({
  ...baseConfig,
  testDir: './tests-demo',
});
