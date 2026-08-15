/**
 * Instagram profile reference content. Edit this file, then re-run
 * `npm run social:instagram:profile` to regenerate the avatar (the avatar
 * doesn't depend on this text, but this file stays the single place the
 * bio/handle copy lives so PROFILE_SETUP.md and any future scripts read
 * the same values).
 */
export const profile = {
  handle: '@sarasudha.in',
  name: 'Sarasudha | Music & Culture',
  bio: [
    'Carnatic · Light · Contemporary',
    'Rooted in tradition. Open to every note.',
    'A new chapter in a musical journey begun in 1984.',
    '↓ Explore Sarasudha',
  ],
  link: 'https://sarasudha.in',
  category: 'Arts & entertainment (Musician/band, or Media/news company as an alternate)',
  accountType: 'Business',
};

/**
 * Alternate bios, kept alongside the recommended one above so the choice is
 * visible in one place. `profile.bio` is the recommendation; these are
 * documented options if the owner prefers a different length or emphasis.
 * See profile/PROFILE_SETUP.md for the full comparison.
 */
export const bioAlternates = [
  {
    label: 'Shorter',
    lines: [
      'Music across generations.',
      'Carnatic · Light Music · Contemporary',
      'Inspired by a cultural journey since 1984.',
      'sarasudha.in',
    ],
    note: 'Trims to four short lines for a punchier read; states the link directly instead of a directional arrow.',
  },
  {
    label: 'Invitation-forward',
    lines: [
      'A new space for Carnatic, light & contemporary music.',
      'Rooted in tradition. Open to every note.',
      '↓ Join us as we begin.',
    ],
    note: 'Leans into the early-stage honesty explicitly — best if the account wants to lead with "help us build this" from line one.',
  },
];
