# Instagram profile setup reference

Source of truth for the profile text lives in `../data/profile.mjs` — edit
that file if any of this changes, so the avatar script and this document
never drift apart.

| Field | Value |
| ----- | ----- |
| Handle | `@sarasudha.in` |
| Display name | `Sarasudha \| Music & Culture` |
| Bio | See below |
| Website link | `https://sarasudha.in` |
| Link text cue | Instagram's single link field has no separate label to set — the bio's closing line ("↓ Explore Sarasudha") does that job instead |
| Category | Arts & entertainment (Musician/band) — Media/news company is a reasonable alternate if Instagram's category picker doesn't offer the first |
| Account type | Business |

## Bio — recommended (exact text, 4 lines)

```
Carnatic · Light · Contemporary
Rooted in tradition. Open to every note.
A new chapter in a musical journey begun in 1984.
↓ Explore Sarasudha
```

Leads with scope, states the brand line, references the heritage honestly,
closes with a directional cue to the bio link.

## Bio — alternates

Documented in `../data/profile.mjs` (`bioAlternates`) alongside the
recommendation above, so all options stay in one place.

**Shorter** (four short lines, states the link directly):

```
Music across generations.
Carnatic · Light Music · Contemporary
Inspired by a cultural journey since 1984.
sarasudha.in
```

**Invitation-forward** (leads with "help us build this" from line one):

```
A new space for Carnatic, light & contemporary music.
Rooted in tradition. Open to every note.
↓ Join us as we begin.
```

## Profile image

`avatar-1080x1080.png` in this folder — a bold gold "S" on the brand maroon,
matching `public/brand/favicon.svg` in the main repo. Legible at Instagram's
small circular size, and works whether the surrounding Instagram UI is in
light or dark mode (the avatar itself is a fixed maroon square — mode
doesn't change it).

**Why a single initial, not the full wordmark:** the site's actual
"Sarasudha" wordmark (`src/components/Logo.astro` — the same treatment used
on the Heritage page) is nine letters wide in a serif face; shrunk to
Instagram's circular avatar size that lockup blurs into illegibility. The
"S" is pulled directly from that same wordmark's colour and letterform
(Source Serif 4, the gold used for "sudha") rather than a new symbol
invented for social — it's the same mark already serving as the site's
browser-tab favicon.

Regenerate with `npm run social:instagram:profile` after editing
`../scripts/render.mjs` (the avatar doesn't depend on `profile.mjs`'s text,
only on the theme colours in `../data/theme.mjs`).
