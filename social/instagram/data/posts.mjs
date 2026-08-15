/**
 * The six Sarasudha Instagram launch posts. Each entry drives both the
 * square feed export and the vertical Story export via scripts/render.mjs.
 *
 * Line breaks are authored by hand (not auto-wrapped) so the editorial
 * composition stays deliberate at both aspect ratios — see README.md
 * "Editing content" for how to add a seventh post later.
 */
export const posts = [
  {
    id: '01-introducing-sarasudha',
    layout: 'intro',
    background: 'dark',
    eyebrow: 'CARNATIC · LIGHT · CONTEMPORARY',
    wordmark: true, // renders the two-tone "Sara/sudha" wordmark instead of plain headline text
    tagline: 'Rooted in tradition. Open to every note.',
    cta: 'sarasudha.in',
  },
  {
    id: '02-the-name',
    layout: 'name',
    background: 'light',
    eyebrow: 'THE NAME',
    beats: [
      { word: 'Sarala', meaning: 'Simplicity · Sincerity · Grace' },
      { word: 'Sudha', meaning: 'Nectar · Sweetness · Richness' },
    ],
    closing: 'Two names. One musical expression.',
  },
  {
    id: '03-rooted-in-1984',
    layout: 'heritage',
    background: 'dark',
    eyebrow: 'HERITAGE',
    headlineLines: ['Rooted in 1984.'],
    registration: {
      name: 'Annamacharya Kalabharati',
      meta: 'Cuddapah · Regn. No. 217/1984',
    },
    bodyLines: ['Sarasudha is a new chapter', 'inspired by that cultural journey.'],
  },
  {
    id: '04-one-tradition-many-expressions',
    layout: 'scope',
    background: 'alt',
    eyebrow: 'ONE TRADITION, MANY EXPRESSIONS',
    headlineLines: ['Music does not stop at', 'the boundaries we give it.'],
    items: ['Carnatic', 'Light Music', 'Devotional', 'Contemporary'],
  },
  {
    id: '05-preserve-perform-pass-on',
    layout: 'pillars',
    background: 'alt',
    eyebrow: 'OUR INTENT',
    headlineLines: ['Preserve. Perform.', 'Pass on.'],
    subline: 'A space for memory, music and the next generation.',
    pillars: ['Preserve', 'Perform', 'Pass On'],
  },
  {
    id: '06-be-part-of-what-comes-next',
    layout: 'cta',
    background: 'dark',
    eyebrow: 'PARTICIPATE',
    headlineLines: ['Be part of what', 'comes next.'],
    sublineLines: ['For musicians, collaborators,', 'archive contributors and listeners.'],
    cta: 'sarasudha.in/participate',
  },
];
