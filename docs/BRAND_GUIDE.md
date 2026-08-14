# Brand Guide

## Positioning

**Primary positioning:**
> Rooted in tradition. Open to every note.

**Supporting proposition:**
> Sarasudha brings together Carnatic tradition, light music and contemporary expression — creating a
> space for artists, audiences and generations to connect through music.

**Alternative short line** (use selectively, not as a second tagline stacked with the primary):
> Music across generations.

Sarasudha is a music + culture + performance + artist discovery platform. It is broader than a
Carnatic academy and simpler than a streaming service — closer to a cultural publication with a
performance calendar and an artist roster than to either of those.

### Name origin

Sarasudha takes its name from two names in the owner's family: **Sarala** (the owner's mother) and
**Sudha** (the owner's sister). The brand meaning built on top of those names is larger than the two
personal names themselves — it's conceptual guidance for how Sarasudha should feel, not a fact to
recite:

- **Sarala** → interpreted for the brand as **simplicity, sincerity and grace**. Not a literal
  dictionary gloss — the idea is an unforced, natural quality: direct, honest, unornamented.
- **Sudha** → interpreted for the brand as **nectar — sweetness, richness and something worth
  savouring**. The idea of music as life-giving, enriching, worth returning to.
- **Sarasudha** → the combination expressed through music: *Sarala gives Sarasudha its simplicity
  and sincerity. Sudha gives it its sweetness — its nectar. Together, they become Sarasudha: music
  that is rooted, heartfelt and meant to be shared.*

Use this as a conceptual throughline, not a paragraph to paste everywhere. It belongs prominently on
`/our-story` (see "The Name" section) and can be referenced selectively elsewhere, but the platform
must read as bigger than its origin — see `docs/CONTENT_GUIDE.md` → "Don't overuse the family story."

### Brand architecture

- **Master brand**: Sarasudha
- **Classical/Carnatic vertical**: Sarasudha Ragam (`/ragam`) — a programme within Sarasudha, never
  the master brand. Ragam owns performances, classical compositions, lecture-demonstrations, artist
  conversations and heritage music specifically.
- **Future verticals** (not built yet, architecture allows for them): light music, young performers,
  archives. Add them as programmes under Sarasudha the same way Ragam was added — don't invent new
  branded sub-products without a clear reason.

## Colour

### Brand palette (fixed swatches)

| Token | Hex | Role |
| ----- | --- | ---- |
| Deep Maroon | `#4A1528` | Primary anchor — hero, footer, key feature sections |
| Wine | `#2D101B` | Deeper anchor — hero gradients, Ragam sections |
| Antique Gold | `#C89A46` | Decorative accent — borders, dividers, motif art, large/bold UI |
| Warm Gold | `#D7B36A` | Accent on dark backgrounds (eyebrows, buttons on maroon/wine) |
| Muted Teal | `#397A76` | Secondary accent — represents contemporary/fresh expression |
| Cream | `#F6EFE3` | Alternating section background — keeps the site from reading as a wall of maroon |
| Warm White | `#FFFDF8` | Primary background |
| Ink | `#251C1B` | Primary text colour |

**The site is never black.** Maroon/wine anchor hero, footer and key feature moments; cream and warm
white carry most of the page so the palette reads as warm, not heavy. Gold is an accent, not a fill.
Teal is a secondary accent only.

### Text-safe derived tokens

Two of the brand accent colours — Antique Gold and Muted Teal — do **not** meet WCAG AA contrast
(4.5:1) as small/normal-weight text on the light backgrounds (cream/warm white). Rather than lighten
the whole palette (which would blunt the brand), `src/styles/tokens.css` defines darker, text-safe
derivatives used specifically for text on light backgrounds:

| Token | Hex | Use |
| ----- | --- | --- |
| `--color-gold-text` | `#7A5A1E` | Gold-coloured text on light backgrounds (eyebrows, "demo content" labels, numbered indices) |
| `--color-teal-text` | `#2A5F5B` | Teal-coloured text on light backgrounds (the default `.eyebrow`, small tag labels) |

The original brand hexes (`--color-gold-antique`, `--color-teal`) remain the canonical swatches for
decorative use — borders, dividers, backgrounds, motif art, and anywhere else contrast rules for text
don't apply. On dark backgrounds (maroon/wine), `--color-gold-warm` (`#D7B36A`) is used for text and
already clears AA comfortably there.

`--color-text-muted` and `--color-text-inverse-muted` are solid (non-transparent) colours rather than
alpha-blended, specifically so their contrast holds regardless of what's layered behind them —
alpha blending against an unpredictable background (a nested card, a semi-transparent parent) is how
several contrast bugs were introduced during development; keep new muted-text tokens solid.

If you introduce a new decorative colour, check its contrast in both roles (as a large/bold
decorative element vs. as body-sized text) before using it as text — don't assume a brand swatch is
automatically text-safe.

## Typography

Two type families only:

- **Display**: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) — a warm, editorial
  serif with genuinely conventional letterforms, used for headlines, the Ragam wordmark, and pull
  quotes. Self-hosted via `@fontsource`.
- **Body/UI**: [Inter](https://fonts.google.com/specimen/Inter) — a highly legible sans-serif, used
  for everything else. Self-hosted via `@fontsource`.

Both are open-source, self-hosted (no third-party font requests at runtime), loaded with
`font-display: swap`, and limited to the specific weight/style combinations actually used (see
`src/styles/global.css`) to keep the font payload small **and** to avoid font-matching substitution —
importing a partial set of weights/styles doesn't fail loudly, it silently makes the browser
substitute the nearest available face for everything else requested in that family, which is exactly
how the previous display type ended up rendering an unintended, overly heavy italic in several
places. When you add a new weight or style to a component, add the matching `@fontsource` import in
the same change.

### Why Source Serif 4 (replacing Fraunces)

Fraunces was the original Phase 1 display face. It was replaced after the owner reported that
uppercase J and lowercase f looked "crooked" — a diagnosis specimen (rendering the full alphabet
across every weight/style combination actually used on the site) confirmed two compounding causes:

1. **A loading bug**: italic was only imported at one weight (600), so every italic request at any
   other weight — the Quote component, the footer tagline, the Ragam wordmark, "Understanding
   Carnatic Music" term headings — silently substituted that single heaviest italic face, making its
   swashes far more prominent across the site than intended.
2. **A font-design mismatch**: even accounting for (1), Fraunces' italic — and to a lesser extent its
   upright — draws J and f with a pronounced calligraphic hook/swash. That's a legitimate, deliberate
   part of Fraunces' character (it's explicitly a "soft," characterful display face, with a `WONK`
   axis built for exactly this kind of flourish), but it reads as unconventional/unstable at the
   sizes and frequency Sarasudha uses display type, which is the opposite of what the brief now
   requires: **upright, stable, conventional J and f**.

Source Serif 4 was chosen over the other candidates evaluated (Noto Serif, Libre Baskerville) because
it keeps genuine editorial warmth — it's not a neutral/utilitarian face like Noto Serif — while having
completely conventional letterforms and a full, flexible weight range with matching true italics
(unlike Libre Baskerville, which only ships regular/bold/italic and was designed for body text, not a
range of display sizes). It renders cleanly on screen, has no wonky/swash character by design, and
still feels "musical, cultured, editorial, warm, premium" rather than corporate or fashion-fragile.

Do not introduce a third type family. If a section needs more visual distinction, reach for weight,
size, colour or spacing first.

## Spacing

A single spacing scale (`--space-1` through `--space-10` in `src/styles/tokens.css`) drives all
padding/margin/gap. Reach for the nearest existing token rather than a one-off pixel value — new
components should look and breathe consistently with existing ones without visual comparison.

## Imagery

No stock photography, no generic template art. Sarasudha's Phase 1 imagery is original abstract SVG
motif art — string curves, waveform bars, notation-inspired dot grids, veena-inspired curvature,
tala/rhythm arcs — generated from `scripts/generate-motifs.mjs` and used as hero backdrops, card
thumbnails and section backgrounds while real photography/performance media is gathered.

Guidance for real photography, when it arrives:
- Prefer editorial, natural-light photography of real performances and people over posed studio
  shots.
- Crop generously; avoid busy backgrounds competing with the maroon/gold palette.
- Never use a generic full-screen stock photo of "a singer" as a hero image — the brand's visual
  distinctiveness depends on typography and motif, not stock photography.

Avoid visual clichés: no generic temple silhouettes, no excessive mandalas, no kitsch. Classical
ornamentation (in Ragam especially) should be restrained — a gold rule, an italic serif wordmark, a
subtle manuscript-adjacent dot pattern — never a decorative border applied for its own sake.

## Logo handling

No official Sarasudha logo asset exists yet. `src/components/Logo.astro` checks `public/brand/` for
real files first (`primary-logo.svg`, `logo-light.svg`, `ragam-logo.svg`) and falls back to a
typographic wordmark if none are found:

> **Sara**sudha

with "Sara" and "sudha" in distinct brand colours (maroon + gold on light backgrounds; warm white +
gold on dark backgrounds), consistent with the personal origin of the name. This fallback is
deliberately simple — it is not meant to be mistaken for a final logo, only to hold the brand's place
until one exists. See README → "Replacing logos and brand assets" for exactly which files to drop in
and where.

## Ragam treatment

Sarasudha Ragam uses the same design system as the rest of the site — same tokens, same components —
with a deliberately more classical inflection:

- The Ragam wordmark is set in italic Source Serif 4 in warm gold (`ragam-hero` sections use
  `--color-accent-gold-warm` directly against a wine background), rather than the sans-serif/mixed
  colour treatment of the primary Sarasudha wordmark.
- Section eyebrows and index/marker numerals throughout `/ragam` use the gold-text token rather than
  the site's default teal, giving the vertical a warmer, more classical palette bias without
  introducing a new colour.
- A gold top-border rule is used on small info cards (e.g. "Understanding Carnatic Music" terms)
  instead of a full card background — restrained ornamentation, not a decorative frame.

Do not add temple imagery, mandalas, or generic "classical Indian" iconography to Ragam — the
classical feeling comes from typography, colour weighting and restraint, not from decorative motifs
layered on top.
