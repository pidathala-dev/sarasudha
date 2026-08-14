import { test, expect } from '@playwright/test';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');

function findHtmlFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  let files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files = files.concat(findHtmlFiles(fullPath));
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function resolvesToFile(hrefPath: string): boolean {
  const clean = hrefPath.split('?')[0].split('#')[0];
  if (clean === '' || clean === '/') return existsSync(path.join(distDir, 'index.html'));
  const withoutTrailingSlash = clean.endsWith('/') ? clean.slice(0, -1) : clean;
  const candidates = [
    path.join(distDir, withoutTrailingSlash, 'index.html'),
    path.join(distDir, `${withoutTrailingSlash}.html`),
    path.join(distDir, withoutTrailingSlash),
  ];
  return candidates.some((candidate) => existsSync(candidate));
}

test('no broken internal links in the static build', () => {
  test.skip(!existsSync(distDir), 'dist/ not found — run `npm run build` first.');

  const htmlFiles = findHtmlFiles(distDir);
  expect(htmlFiles.length).toBeGreaterThan(0);

  const broken: { file: string; href: string }[] = [];
  const hrefPattern = /href="(\/[^"]*)"/g;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf-8');
    let match: RegExpExecArray | null;
    while ((match = hrefPattern.exec(html))) {
      const href = match[1];
      if (href.startsWith('//')) continue; // protocol-relative external link
      if (!resolvesToFile(href)) {
        broken.push({ file: path.relative(distDir, file), href });
      }
    }
  }

  expect(broken, JSON.stringify(broken, null, 2)).toHaveLength(0);
});
