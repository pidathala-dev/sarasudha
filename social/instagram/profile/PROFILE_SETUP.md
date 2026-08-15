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
| Category | Arts & entertainment (Musician/band) — Media/news company is a reasonable alternate if Instagram's category picker doesn't offer the first |
| Account type | Business |

## Bio (exact text, 4 lines)

```
Carnatic · Light · Contemporary
Rooted in tradition. Open to every note.
A new chapter in a musical journey begun in 1984.
↓ Explore Sarasudha
```

## Profile image

`avatar-1080x1080.png` in this folder — a bold gold "S" on the brand maroon,
matching `public/brand/favicon.svg` in the main repo. Legible at Instagram's
small circular size, and works whether the surrounding Instagram UI is in
light or dark mode (the avatar itself is a fixed maroon square — mode
doesn't change it).

Regenerate with `npm run social:instagram:profile` after editing
`../scripts/render.mjs` (the avatar doesn't depend on `profile.mjs`'s text,
only on the theme colours in `../data/theme.mjs`).
