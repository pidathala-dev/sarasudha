#!/usr/bin/env node
/**
 * Production launch QA scan. Run after `npm run build` (which defaults to a
 * demo-off build — see src/config/site.ts). Scans the built dist/ output for
 * signs of demo/placeholder content leaking into a production build, and
 * does a handful of cheap structural sanity checks (sitemap, canonical
 * tags, core routes present). This intentionally does not replace the
 * Playwright suite (tests/) — it's a fast, no-browser-required last line
 * of defence, meant to run as part of `npm run launch:check`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!existsSync(distDir)) {
  console.error('launch:check — dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

/** @type {string[]} */
const failures = [];
/** @type {string[]} */
const warnings = [];

function walk(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const allFiles = walk(distDir);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

if (htmlFiles.length === 0) {
  failures.push('No HTML files found in dist/ — build may have failed silently.');
}

// ---------------------------------------------------------------------------
// 1. Demo/placeholder content leakage.
// ---------------------------------------------------------------------------
// These markers only ever render when a collection entry's isDemoContent
// flag is true and showDemoContent is on (see the `*__demo-flag` classes in
// MusicCard/EventCard/ArtistCard and `artist-profile__demo` on the artist
// detail page). Matching the CSS class rather than the visible copy avoids
// false positives on legitimate content that happens to mention "demo" —
// e.g. the /terms page's own "Demo content" policy heading — while still
// catching the actual leaked badge regardless of future copy edits.
const forbiddenMarkers = [
  'music-card__demo-flag',
  'event-card__demo-flag',
  'artist-card__demo-flag',
  'artist-profile__demo',
];
const forbiddenPhrases = ['Lorem ipsum', 'lorem ipsum'];

for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf-8');
  // Scoped component CSS is inlined into every page's <style> block
  // regardless of whether the conditional element it targets actually
  // rendered, so a class-name marker check must look only at the body
  // markup — otherwise every page that merely imports MusicCard/EventCard/
  // ArtistCard would false-positive on their (unused) demo-flag selector.
  const bodyOnly = content.replace(/<style[\s\S]*?<\/style>/g, '');
  for (const marker of forbiddenMarkers) {
    if (bodyOnly.includes(marker)) {
      failures.push(`Demo-content marker "${marker}" found in ${path.relative(distDir, file)} — a demo-flagged record rendered in this build.`);
    }
  }
  for (const phrase of forbiddenPhrases) {
    if (bodyOnly.includes(phrase)) {
      failures.push(`Placeholder text "${phrase}" found in ${path.relative(distDir, file)}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Canonical + title sanity on every page.
// ---------------------------------------------------------------------------
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf-8');
  const rel = path.relative(distDir, file);

  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonicalMatch) {
    failures.push(`Missing canonical link in ${rel}`);
  } else if (!canonicalMatch[1].startsWith('https://sarasudha.in')) {
    failures.push(`Canonical link in ${rel} does not point at https://sarasudha.in (found ${canonicalMatch[1]})`);
  }

  const titleMatch = content.match(/<title>([^<]*)<\/title>/);
  if (!titleMatch || titleMatch[1].trim().length === 0) {
    failures.push(`Missing or empty <title> in ${rel}`);
  }

  const h1Count = (content.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) {
    warnings.push(`${rel} has ${h1Count} <h1> elements (expected exactly 1)`);
  }
}

// ---------------------------------------------------------------------------
// 3. Sitemap present and points at the right domain.
// ---------------------------------------------------------------------------
const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
if (!existsSync(sitemapIndex)) {
  failures.push('sitemap-index.xml not found in dist/');
} else {
  const sitemapContent = readFileSync(sitemapIndex, 'utf-8');
  if (!sitemapContent.includes('sarasudha.in')) {
    failures.push('sitemap-index.xml does not reference sarasudha.in');
  }
}

if (!existsSync(path.join(distDir, 'robots.txt'))) {
  failures.push('robots.txt not found in dist/');
}

// ---------------------------------------------------------------------------
// 4. Core routes smoke test — every primary page built successfully.
// ---------------------------------------------------------------------------
const coreRoutes = [
  '',
  'our-story',
  'music',
  'ragam',
  'artists',
  'events',
  'heritage',
  'participate',
  'contact',
  'privacy',
  'terms',
];

for (const route of coreRoutes) {
  const indexPath = path.join(distDir, route, 'index.html');
  if (!existsSync(indexPath)) {
    failures.push(`Expected route missing: /${route} (no ${path.relative(distDir, indexPath)})`);
  }
}

// ---------------------------------------------------------------------------
// 5. Lightweight internal link check — local hrefs resolve to a real file.
// ---------------------------------------------------------------------------
const hrefPattern = /href="(\/[^"#?]*)/g;
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf-8');
  const rel = path.relative(distDir, file);
  let match;
  while ((match = hrefPattern.exec(content))) {
    const href = match[1];
    if (href.startsWith('//')) continue; // protocol-relative external link
    const targetPath = href.endsWith('/') || href === '' ? path.join(href, 'index.html') : href;
    const resolved = path.join(distDir, targetPath);
    if (!existsSync(resolved) && !existsSync(resolved + '.html')) {
      failures.push(`Broken internal link ${href} referenced in ${rel}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Report.
// ---------------------------------------------------------------------------
console.log(`launch:check — scanned ${htmlFiles.length} HTML file(s) in dist/`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const warning of warnings) console.log(`  ⚠ ${warning}`);
}

if (failures.length > 0) {
  console.log(`\n${failures.length} failure(s):`);
  for (const failure of failures) console.log(`  ✗ ${failure}`);
  console.log('\nlaunch:check FAILED.');
  process.exit(1);
}

console.log('\nlaunch:check passed — no placeholder leakage, broken links, or structural issues found.');
