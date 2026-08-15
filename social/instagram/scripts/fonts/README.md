# Fonts

TTF conversions of the two brand typefaces already used by the website
(`@fontsource/source-serif-4`, `@fontsource/inter`), used only by
`../render.mjs` to rasterise Instagram assets. Both are open source under
the SIL Open Font License — redistributing a format-converted copy inside
this repository is permitted.

| File | Source |
| ---- | ------ |
| `SourceSerif4-Regular.ttf` | `@fontsource/source-serif-4` 400 normal |
| `SourceSerif4-Medium.ttf` | `@fontsource/source-serif-4` 500 normal |
| `Inter-Regular.ttf` | `@fontsource/inter` 400 normal |
| `Inter-Medium.ttf` | `@fontsource/inter` 500 normal |
| `Inter-SemiBold.ttf` | `@fontsource/inter` 600 normal |

These exist only because this environment's SVG rasteriser doesn't reliably
honour embedded `@font-face` webfonts (see `../../README.md` → "How
rendering works" for the full explanation and how to regenerate these from
a newer `@fontsource` release if needed).
