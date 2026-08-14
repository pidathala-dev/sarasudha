// One-off generator for original abstract SVG placeholder art used across
// the site's demo content (performances, artists, archive). Run with
// `node scripts/generate-motifs.mjs`. Not part of the build pipeline.
import { writeFileSync, mkdirSync } from 'node:fs';

const palette = {
  maroon: '#4A1528',
  wine: '#2D101B',
  goldAntique: '#C89A46',
  goldWarm: '#D7B36A',
  teal: '#397A76',
  cream: '#F6EFE3',
  warmWhite: '#FFFDF8',
  ink: '#251C1B',
};

const W = 960;
const H = 540;

function svgWrap(id, bg, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg[0]}" />
      <stop offset="100%" stop-color="${bg[1]}" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#grad-${id})" />
  ${content}
</svg>`;
}

// Flowing string / raga curve motif
function stringMotif(id, bg, stroke) {
  let paths = '';
  for (let i = 0; i < 6; i++) {
    const yOffset = 90 + i * 62;
    const amp = 46 + i * 6;
    paths += `<path d="M -40 ${yOffset} C ${W * 0.25} ${yOffset - amp}, ${W * 0.5} ${yOffset + amp}, ${W * 0.75} ${yOffset - amp * 0.6}, ${W + 40} ${yOffset + amp * 0.4}" fill="none" stroke="${stroke}" stroke-width="1.4" opacity="${0.16 + i * 0.05}" />`;
  }
  return svgWrap(id, bg, paths);
}

// Waveform / sound bars motif
function waveformMotif(id, bg, stroke) {
  let bars = '';
  const n = 46;
  for (let i = 0; i < n; i++) {
    const x = (W / n) * i + 8;
    const h = 40 + Math.abs(Math.sin(i * 0.4)) * 260 + Math.cos(i * 0.15) * 40;
    const y = H / 2 - h / 2;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(W / n) * 0.45}" height="${h.toFixed(1)}" rx="3" fill="${stroke}" opacity="${0.22 + (i % 5) * 0.04}" />`;
  }
  return svgWrap(id, bg, bars);
}

// Veena-inspired curvature: long resonant curve with tuning pegs suggestion
function veenaMotif(id, bg, stroke) {
  const curve = `<path d="M 60 460 C 220 480, 300 320, 260 200 C 230 100, 340 40, 480 60" fill="none" stroke="${stroke}" stroke-width="6" opacity="0.5" stroke-linecap="round"/>`;
  let strings = '';
  for (let i = 0; i < 4; i++) {
    strings += `<line x1="${520 + i * 90}" y1="70" x2="${900 - i * 14}" y2="${470 - i * 8}" stroke="${stroke}" stroke-width="1.2" opacity="${0.28 + i * 0.08}" />`;
  }
  let dots = '';
  for (let i = 0; i < 5; i++) {
    dots += `<circle cx="${480 + i * 4}" cy="${60 + i * 2}" r="4" fill="${stroke}" opacity="0.6" />`;
  }
  return svgWrap(id, bg, curve + strings + dots);
}

// Notation / rhythm dots motif
function notationMotif(id, bg, stroke) {
  let elements = '';
  const rows = 5;
  const cols = 12;
  for (let r = 0; r < rows; r++) {
    const y = 70 + r * 90;
    elements += `<line x1="40" y1="${y}" x2="${W - 40}" y2="${y}" stroke="${stroke}" stroke-width="1" opacity="0.14" />`;
    for (let c = 0; c < cols; c++) {
      if ((r + c) % 3 === 0) continue;
      const x = 60 + c * 76 + (r % 2) * 20;
      const yy = y + Math.sin(c * 0.8 + r) * 22;
      const r2 = 5 + ((r + c) % 3) * 1.6;
      elements += `<circle cx="${x}" cy="${yy.toFixed(1)}" r="${r2}" fill="${stroke}" opacity="${0.3 + ((r + c) % 4) * 0.08}" />`;
    }
  }
  return svgWrap(id, bg, elements);
}

// Rhythm / tala cycle motif — concentric arcs
function rhythmMotif(id, bg, stroke) {
  let arcs = '';
  const cx = W * 0.7;
  const cy = H * 0.5;
  for (let i = 0; i < 7; i++) {
    const r = 40 + i * 34;
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="1.4" opacity="${0.32 - i * 0.03}" />`;
  }
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * 60;
    const y1 = cy + Math.sin(angle) * 60;
    const x2 = cx + Math.cos(angle) * 260;
    const y2 = cy + Math.sin(angle) * 260;
    arcs += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="1" opacity="0.14" />`;
  }
  return svgWrap(id, bg, arcs);
}

// Flowing raga gradient ribbon
function ribbonMotif(id, bg, stroke) {
  let ribbons = '';
  for (let i = 0; i < 4; i++) {
    const y = 100 + i * 100;
    ribbons += `<path d="M -40 ${y} Q ${W * 0.3} ${y - 120}, ${W * 0.5} ${y} T ${W + 40} ${y - 40}" fill="none" stroke="${stroke}" stroke-width="${10 - i * 1.6}" opacity="${0.18 + i * 0.06}" stroke-linecap="round" />`;
  }
  return svgWrap(id, bg, ribbons);
}

mkdirSync('public/images/motifs', { recursive: true });
mkdirSync('public/images/artists', { recursive: true });
mkdirSync('public/images/archive', { recursive: true });

const sets = [
  ['performance-carnatic', stringMotif, [palette.maroon, palette.wine], palette.goldWarm],
  ['performance-light', ribbonMotif, [palette.teal, palette.wine], palette.goldWarm],
  ['performance-young', waveformMotif, [palette.wine, palette.maroon], palette.goldAntique],
  ['performance-ragam', veenaMotif, [palette.wine, palette.maroon], palette.goldWarm],
  ['ragam-conversation', notationMotif, [palette.maroon, palette.wine], palette.goldWarm],
  ['hero-motif', stringMotif, [palette.wine, palette.maroon], palette.goldWarm],
  ['ragam-hero', veenaMotif, [palette.wine, '#1c0a12'], palette.goldWarm],
  ['heritage-motif', rhythmMotif, [palette.maroon, palette.wine], palette.goldAntique],
];

for (const [name, fn, bg, stroke] of sets) {
  writeFileSync(`public/images/motifs/${name}.svg`, fn(name, bg, stroke));
}

const artistBgs = [
  [palette.maroon, palette.wine],
  [palette.teal, '#1f4a47'],
  [palette.wine, palette.maroon],
  [palette.maroon, '#3a1020'],
];
const artistFns = [stringMotif, waveformMotif, notationMotif, rhythmMotif];
for (let i = 0; i < 4; i++) {
  writeFileSync(
    `public/images/artists/artist-${i + 1}.svg`,
    artistFns[i](`artist-${i + 1}`, artistBgs[i], palette.goldWarm)
  );
}

const archiveKinds = [
  ['photograph', notationMotif, [palette.cream, '#e7dcc4']],
  ['programme', ribbonMotif, [palette.cream, '#e7dcc4']],
  ['clipping', waveformMotif, [palette.cream, '#e7dcc4']],
  ['recording', rhythmMotif, [palette.cream, '#e7dcc4']],
];
for (const [name, fn, bg] of archiveKinds) {
  writeFileSync(`public/images/archive/${name}.svg`, fn(name, bg, palette.maroon));
}

console.log('Generated motif SVGs.');
