/**
 * Sarasudha Instagram asset renderer.
 *
 * Builds an SVG string per post/layout, then rasterises it to PNG with
 * sharp. Text is set in the real brand fonts (Source Serif 4 + Inter,
 * converted from the @fontsource woff2 files already used by the website
 * — see fonts/README.md) via a throwaway fontconfig config scoped to this
 * script, so nothing is installed system-wide and nothing here depends on
 * a design SaaS or network access at render time.
 *
 * Layouts are deliberately hand-built per post "type" (intro/name/
 * heritage/scope/pillars/cta) rather than a generic templating DSL —
 * six fixed layouts is simple enough that a bespoke abstraction would be
 * over-engineering; adding a 7th post that reuses an existing layout is
 * just a new entry in data/posts.mjs.
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import { color, font } from '../data/theme.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fontsDir = path.join(__dirname, 'fonts');

// ---------------------------------------------------------------------------
// Font setup — scoped fontconfig, no system-wide install.
// ---------------------------------------------------------------------------
function ensureFontsRegistered() {
  const cacheDir = path.join(os.tmpdir(), 'sarasudha-instagram-fontcache');
  mkdirSync(cacheDir, { recursive: true });
  const confPath = path.join(os.tmpdir(), 'sarasudha-instagram-fonts.conf');
  const conf = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
  <dir>${fontsDir}</dir>
  <cachedir>${cacheDir}</cachedir>
</fontconfig>`;
  writeFileSync(confPath, conf, 'utf-8');
  process.env.FONTCONFIG_FILE = confPath;
}
ensureFontsRegistered();

// ---------------------------------------------------------------------------
// Small SVG helpers.
// ---------------------------------------------------------------------------
function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** One or more literal lines of text as stacked <tspan>s (no auto-wrap — see posts.mjs). */
function textLines({ x, y, lines, fontFamily, weight, size, lineHeight, fill, anchor = 'start', letterSpacing }) {
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="${x}" y="${y + i * lineHeight}">${esc(line)}</tspan>`
    )
    .join('');
  const ls = letterSpacing ? ` letter-spacing="${letterSpacing}"` : '';
  return `<text font-family="${fontFamily}" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}"${ls}>${tspans}</text>`;
}

function eyebrow({ x, y, text, fill, anchor = 'start', size = 28 }) {
  return textLines({
    x,
    y,
    lines: [text],
    fontFamily: font.body,
    weight: font.bodySemibold,
    size,
    lineHeight: size,
    fill,
    anchor,
    letterSpacing: size * 0.14,
  });
}

/** Two-tone "Sara" + "sudha" wordmark matching src/components/Logo.astro exactly. */
function wordmarkGlyph({ x, y, size, onDark }) {
  const saraFill = onDark ? color.warmWhite : color.maroon;
  const sudhaFill = onDark ? color.goldWarm : color.goldText;
  return `<text font-family="${font.display}" font-weight="${font.displayWeight}" font-size="${size}" y="${y}">
    <tspan x="${x}" fill="${saraFill}">Sara</tspan><tspan fill="${sudhaFill}">sudha</tspan>
  </text>`;
}

/** Faint concentric-arc motif, echoing the site's PageHero wave background. */
function motif({ cx, cy, stroke, opacity = 0.35 }) {
  const radii = [180, 300, 420, 540];
  return `<g fill="none" stroke="${stroke}" stroke-width="1.5" opacity="${opacity}">
    ${radii.map((r) => `<circle cx="${cx}" cy="${cy}" r="${r}" />`).join('')}
  </g>`;
}

function goldRule({ x, y, width = 96 }) {
  return `<rect x="${x}" y="${y}" width="${width}" height="4" rx="2" fill="${color.goldAntique}" />`;
}

function pillButton({ x, y, text, width, height = 96, bg, fg }) {
  return `<g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" fill="${bg}" />
    ${textLines({
      x: x + width / 2,
      y: y + height / 2 + 14,
      lines: [text],
      fontFamily: font.body,
      weight: font.bodySemibold,
      size: 30,
      lineHeight: 30,
      fill: fg,
      anchor: 'middle',
    })}
  </g>`;
}

function bgRect({ width, height, fill }) {
  return `<rect x="0" y="0" width="${width}" height="${height}" fill="${fill}" />`;
}

// ---------------------------------------------------------------------------
// Layout builders. Each returns a full SVG string for the given canvas size.
// `variant` is 'feed' (square) or 'story' (portrait) — story compositions
// get extra top/bottom breathing room for Instagram's UI safe zones.
// ---------------------------------------------------------------------------
const PAD = 96;

function frame(width, height, variant, background, body) {
  const bg = background === 'dark' ? color.maroon : background === 'alt' ? color.cream : color.warmWhite;
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${bgRect({ width, height, fill: bg })}
    ${body}
  </svg>`;
}

function layoutIntro(post, { width, height, variant }) {
  const onDark = post.background === 'dark';
  const cy = variant === 'story' ? height * 0.42 : height / 2;
  const body = `
    ${motif({ cx: width * 0.82, cy: height * 0.18, stroke: color.goldWarm, opacity: 0.25 })}
    ${eyebrow({ x: PAD, y: cy - 180, text: post.eyebrow, fill: color.goldWarm })}
    ${wordmarkGlyph({ x: PAD, y: cy - 30, size: variant === 'story' ? 168 : 148, onDark })}
    ${textLines({
      x: PAD,
      y: cy + 90,
      lines: [post.tagline],
      fontFamily: font.body,
      weight: font.bodyMedium,
      size: 34,
      lineHeight: 44,
      fill: color.textInverseMuted,
    })}
    ${pillButton({ x: PAD, y: height - PAD - 96, text: post.cta, width: 320, bg: color.goldAntique, fg: color.wine })}
  `;
  return frame(width, height, variant, post.background, body);
}

function layoutName(post, { width, height, variant }) {
  const [sarala, sudha] = post.beats;
  const cx = width / 2;
  const isStory = variant === 'story';
  // Everything below is spaced proportionally from a single starting y and a
  // single step, so the whole composition grows/shrinks with the canvas
  // instead of leaving a large unplanned gap before the closing line.
  let y = isStory ? height * 0.19 : height * 0.14;
  const stepBeat = isStory ? height * 0.135 : 190;
  const operatorGap = isStory ? 70 : 40;

  const beat = (label, meaning, wordColor) => {
    const block = `
      ${textLines({ x: cx, y, lines: [label], fontFamily: font.display, weight: font.displayWeight, size: isStory ? 96 : 84, lineHeight: isStory ? 96 : 84, fill: wordColor, anchor: 'middle' })}
      ${textLines({ x: cx, y: y + (isStory ? 52 : 46), lines: [meaning.toUpperCase()], fontFamily: font.body, weight: font.bodySemibold, size: isStory ? 25 : 22, lineHeight: isStory ? 25 : 22, fill: color.tealText, anchor: 'middle', letterSpacing: 1.5 })}
    `;
    y += stepBeat;
    return block;
  };

  const eyebrowBlock = eyebrow({ x: cx, y: isStory ? height * 0.1 : 90, text: post.eyebrow, fill: color.tealText, anchor: 'middle' });
  const saraBlock = beat(sarala.word, sarala.meaning, color.maroon);
  const plus = textLines({ x: cx, y: y - stepBeat + 100, lines: ['+'], fontFamily: font.display, weight: font.displayWeight, size: 56, lineHeight: 56, fill: color.goldAntique, anchor: 'middle' });
  y += operatorGap;
  const sudhaBlock = beat(sudha.word, sudha.meaning, color.goldText);
  const equals = textLines({ x: cx, y: y - stepBeat + 100, lines: ['='], fontFamily: font.display, weight: font.displayWeight, size: 56, lineHeight: 56, fill: color.goldAntique, anchor: 'middle' });
  y += operatorGap + (isStory ? 40 : 20);
  const wordmarkY = y + (isStory ? 90 : 60);
  const wordmarkBlock = wordmarkGlyphCentered({ cx, y: wordmarkY, size: isStory ? 128 : 100 });
  const closing = textLines({
    x: cx,
    y: wordmarkY + (isStory ? 160 : 120),
    lines: [post.closing],
    fontFamily: font.body,
    weight: font.bodyMedium,
    size: isStory ? 34 : 30,
    lineHeight: isStory ? 34 : 30,
    fill: color.textMuted,
    anchor: 'middle',
  });

  const body = `${eyebrowBlock}${saraBlock}${plus}${sudhaBlock}${equals}${wordmarkBlock}${closing}`;
  return frame(width, height, variant, post.background, body);
}

/**
 * Centered variant of the two-tone wordmark, used mid-composition.
 * text-anchor="middle" centers the run as a whole as long as only the
 * *first* tspan carries an x — later tspans with no x just continue the
 * same text run, so the two colours still measure and center as one word.
 */
function wordmarkGlyphCentered({ cx, y, size }) {
  return `<text x="${cx}" y="${y}" font-family="${font.display}" font-weight="${font.displayWeight}" font-size="${size}" text-anchor="middle">
    <tspan fill="${color.maroon}">Sara</tspan><tspan fill="${color.goldText}">sudha</tspan>
  </text>`;
}

function layoutHeritage(post, { width, height, variant }) {
  let y = variant === 'story' ? height * 0.3 : height * 0.28;
  const body = `
    ${motif({ cx: width * 0.15, cy: height * 0.85, stroke: color.goldAntique, opacity: 0.2 })}
    ${eyebrow({ x: PAD, y, text: post.eyebrow, fill: color.goldWarm })}
    ${textLines({
      x: PAD,
      y: y + 90,
      lines: post.headlineLines,
      fontFamily: font.display,
      weight: font.displayWeight,
      size: 76,
      lineHeight: 88,
      fill: color.warmWhite,
    })}
    ${goldRule({ x: PAD, y: y + 90 + post.headlineLines.length * 88 + 40 })}
    ${textLines({
      x: PAD,
      y: y + 90 + post.headlineLines.length * 88 + 100,
      lines: [post.registration.name],
      fontFamily: font.display,
      weight: font.displayWeight,
      size: 40,
      lineHeight: 40,
      fill: color.warmWhite,
    })}
    ${textLines({
      x: PAD,
      y: y + 90 + post.headlineLines.length * 88 + 146,
      lines: [post.registration.meta.toUpperCase()],
      fontFamily: font.body,
      weight: font.bodySemibold,
      size: 22,
      lineHeight: 22,
      fill: color.goldWarm,
      letterSpacing: 1.2,
    })}
    ${textLines({
      x: PAD,
      y: y + 90 + post.headlineLines.length * 88 + 240,
      lines: post.bodyLines,
      fontFamily: font.body,
      weight: font.bodyMedium,
      size: 30,
      lineHeight: 42,
      fill: color.textInverseMuted,
    })}
  `;
  return frame(width, height, variant, post.background, body);
}

function layoutScope(post, { width, height, variant }) {
  let y = variant === 'story' ? height * 0.16 : height * 0.12;
  const headlineBlock = `
    ${eyebrow({ x: PAD, y, text: post.eyebrow, fill: color.tealText })}
    ${textLines({
      x: PAD,
      y: y + 90,
      lines: post.headlineLines,
      fontFamily: font.display,
      weight: font.displayWeight,
      size: 58,
      lineHeight: 68,
      fill: color.ink,
    })}
  `;
  let listY = y + 90 + post.headlineLines.length * 68 + 90;
  const rowStep = variant === 'story' ? 150 : 120;
  const rows = post.items
    .map((item, i) => {
      const row = `
        <line x1="${PAD}" y1="${listY - 46}" x2="${width - PAD}" y2="${listY - 46}" stroke="${color.borderOnLight}" stroke-width="1.5" />
        ${textLines({ x: PAD, y: listY, lines: [String(i + 1).padStart(2, '0')], fontFamily: font.display, weight: font.displayWeight, size: 32, lineHeight: 32, fill: color.goldText })}
        ${textLines({ x: PAD + 100, y: listY, lines: [item], fontFamily: font.display, weight: font.displayWeight, size: 42, lineHeight: 42, fill: color.ink })}
      `;
      listY += rowStep;
      return row;
    })
    .join('');
  const body = `${headlineBlock}${rows}`;
  return frame(width, height, variant, post.background, body);
}

function layoutPillars(post, { width, height, variant }) {
  let y = variant === 'story' ? height * 0.22 : height * 0.2;
  const headlineBlock = `
    ${eyebrow({ x: PAD, y, text: post.eyebrow, fill: color.goldText })}
    ${textLines({
      x: PAD,
      y: y + 90,
      lines: post.headlineLines,
      fontFamily: font.display,
      weight: font.displayWeight,
      size: 66,
      lineHeight: 78,
      fill: color.maroon,
    })}
    ${textLines({
      x: PAD,
      y: y + 90 + post.headlineLines.length * 78 + 56,
      lines: [post.subline],
      fontFamily: font.body,
      weight: font.bodyMedium,
      size: 32,
      lineHeight: 42,
      fill: color.textMuted,
    })}
  `;
  const pillarsY = variant === 'story' ? height - 460 : height - 300;
  const colWidth = (width - PAD * 2) / 3;
  const pillars = post.pillars
    .map((p, i) => {
      const x = PAD + i * colWidth;
      return `
        ${textLines({ x, y: pillarsY, lines: [String(i + 1).padStart(2, '0')], fontFamily: font.display, weight: font.displayWeight, size: 30, lineHeight: 30, fill: color.goldText })}
        ${textLines({ x, y: pillarsY + 50, lines: [p], fontFamily: font.display, weight: font.displayWeight, size: 38, lineHeight: 38, fill: color.maroon })}
      `;
    })
    .join('');
  const body = `${headlineBlock}${pillars}`;
  return frame(width, height, variant, post.background, body);
}

function layoutCta(post, { width, height, variant }) {
  let y = variant === 'story' ? height * 0.34 : height * 0.28;
  const body = `
    ${motif({ cx: width * 0.9, cy: height * 0.9, stroke: color.goldWarm, opacity: 0.25 })}
    ${eyebrow({ x: PAD, y, text: post.eyebrow, fill: color.goldWarm })}
    ${textLines({
      x: PAD,
      y: y + 90,
      lines: post.headlineLines,
      fontFamily: font.display,
      weight: font.displayWeight,
      size: 66,
      lineHeight: 78,
      fill: color.warmWhite,
    })}
    ${textLines({
      x: PAD,
      y: y + 90 + post.headlineLines.length * 78 + 56,
      lines: post.sublineLines,
      fontFamily: font.body,
      weight: font.bodyMedium,
      size: 32,
      lineHeight: 44,
      fill: color.textInverseMuted,
    })}
    ${pillButton({ x: PAD, y: height - PAD - 96, text: post.cta, width: 460, bg: color.goldAntique, fg: color.wine })}
  `;
  return frame(width, height, variant, post.background, body);
}

const layouts = {
  intro: layoutIntro,
  name: layoutName,
  heritage: layoutHeritage,
  scope: layoutScope,
  pillars: layoutPillars,
  cta: layoutCta,
};

export function buildPostSvg(post, opts) {
  const builder = layouts[post.layout];
  if (!builder) throw new Error(`Unknown layout "${post.layout}" for post ${post.id}`);
  return builder(post, opts);
}

// ---------------------------------------------------------------------------
// Profile avatar + highlight covers.
// ---------------------------------------------------------------------------
export function buildAvatarSvg({ width = 1080, height = 1080 } = {}) {
  const size = Math.min(width, height);
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${bgRect({ width, height, fill: color.maroon })}
    <text x="${width / 2}" y="${height / 2 + size * 0.16}" text-anchor="middle" font-family="${font.display}" font-weight="600" font-size="${size * 0.5}" fill="${color.goldWarm}">S</text>
  </svg>`;
}

export function buildHighlightSvg(highlight, { width = 1080, height = 1080 } = {}) {
  const size = Math.min(width, height);
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${bgRect({ width, height, fill: color.maroon })}
    ${motif({ cx: width / 2, cy: height / 2, stroke: color.goldWarm, opacity: 0.18 })}
    <text x="${width / 2}" y="${height / 2 + size * 0.14}" text-anchor="middle" font-family="${font.display}" font-weight="500" font-size="${size * 0.36}" fill="${color.goldWarm}">${esc(highlight.initial)}</text>
  </svg>`;
}

// ---------------------------------------------------------------------------
// Rasterisation.
// ---------------------------------------------------------------------------
export async function renderSvgToPng(svg, outPath, { width, height }) {
  mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg), { density: 220 })
    .resize(width, height)
    .png()
    .toFile(outPath);
}

export { PAD };
