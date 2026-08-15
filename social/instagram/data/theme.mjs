/**
 * Brand tokens mirrored from src/styles/tokens.css and src/components/Logo.astro.
 * Keep these in sync with the website — this is the single source of truth for
 * colour/type values used across every Instagram asset.
 */
export const color = {
  maroon: '#4a1528',
  wine: '#2d101b',
  goldAntique: '#c89a46',
  goldWarm: '#d7b36a',
  goldText: '#7a5a1e',
  teal: '#397a76',
  tealText: '#2a5f5b',
  cream: '#f6efe3',
  warmWhite: '#fffdf8',
  ink: '#251c1b',
  textMuted: '#5b5350',
  textInverseMuted: '#d8cdc8',
  borderOnLight: 'rgba(37,28,27,0.12)',
  borderOnDark: 'rgba(255,253,248,0.22)',
};

export const font = {
  display: 'Source Serif 4',
  displayWeight: 500,
  displayRegularWeight: 400,
  body: 'Inter',
  bodyWeight: 400,
  bodyMedium: 500,
  bodySemibold: 600,
};

/** Wordmark treatment matching Logo.astro exactly. */
export const wordmark = {
  onLight: { sara: color.maroon, sudha: color.goldText },
  onDark: { sara: color.warmWhite, sudha: color.goldWarm },
};

export const site = {
  domain: 'sarasudha.in',
  url: 'https://sarasudha.in',
};
