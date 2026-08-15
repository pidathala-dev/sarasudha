# Sarasudha Instagram launch kit

A self-contained, reusable system for Sarasudha's Instagram launch
(`@sarasudha.in`) — structured content, a deterministic local renderer, and
the exported PNGs themselves. It lives entirely under `social/instagram/`
and doesn't touch the Astro website build (`npm run dev`/`build`/`test`
work exactly as before).

## What this is

Instagram launch assets are generated from plain data files, not designed
one-by-one in an external tool. Editing text means editing a data file and
re-running one command — no design software required, nothing depends on a
SaaS or network access at render time.

## Folder structure

```
social/instagram/
  README.md                    This file.
  CONTENT_CALENDAR.md           2-week launch posting plan.
  MANUAL_SETUP_CHECKLIST.md     Everything a human has to do by hand in the app.
  data/
    theme.mjs                    Brand colours/fonts — mirrors src/styles/tokens.css.
    profile.mjs                   Bio/handle/link reference text.
    posts.mjs                      The six launch posts' content (edit here for new posts).
    highlights.mjs                  The five Highlight covers' content.
  scripts/
    render.mjs                      SVG layout builders + PNG export (sharp).
    export.mjs                       CLI entry point — see "Regenerating assets" below.
    fonts/                            Brand fonts as TTF (see fonts/ note below).
  profile/
    PROFILE_SETUP.md                 Bio/handle/name/link/category reference.
    avatar-1080x1080.png              Exported profile photo.
  feed/                              Exported square (1080×1080) launch posts.
  stories/                           Exported vertical (1080×1920) Story versions.
  highlights/                        Exported Highlight cover images (1080×1080).
  captions/
    launch-captions.md               Full + short caption per post.
    hashtags.md                       Hashtag sets and strategy.
```

Both the source data and the exported PNGs are committed — the images in
`feed/`, `stories/`, `highlights/` and `profile/` are the actual files to
upload to Instagram, not placeholders.

## Regenerating assets

```bash
npm run social:instagram             # everything: profile, highlights, feed, stories
npm run social:instagram:feed        # just the 6 square feed posts
npm run social:instagram:stories     # just the 6 vertical Story versions
npm run social:instagram:highlights  # just the 5 Highlight covers
npm run social:instagram:profile     # just the profile avatar
```

Each command overwrites the corresponding PNGs in place. Nothing else in
the repo is touched.

## Editing content for the launch set

Open `data/posts.mjs`. Each post is a plain object — change `headlineLines`,
`bodyLines`, `eyebrow`, etc., then run `npm run social:instagram:feed` (and
`:stories` if you want the Story version too) to regenerate.

Line breaks in headlines/body copy are **written by hand** (arrays of
strings, one per line), not auto-wrapped — this keeps a small, fixed set of
launch posts editorially precise. If you add a post whose copy is much
longer or shorter than the existing six, check the rendered PNG and adjust
line breaks/font sizes in `scripts/render.mjs` if it looks cramped or too
sparse (see "Adding a future post" below).

## Adding a future post

1. Add a new object to the `posts` array in `data/posts.mjs`, giving it a
   `layout` value matching one of the six existing layouts in
   `scripts/render.mjs` (`intro`, `name`, `heritage`, `scope`, `pillars`,
   `cta`) — reuse whichever is the closest fit content-wise.
2. Run `npm run social:instagram:feed` (and `:stories`) — new PNGs appear
   in `feed/`/`stories/` automatically, named after the post's `id`.
3. Add a caption to `captions/launch-captions.md` and check
   `docs/CONTENT_GUIDE.md` in the main repo before writing anything about
   heritage, dates, or claims that need care.

If a genuinely new *kind* of layout is needed (not a fit for the six
existing ones), add a new builder function to `scripts/render.mjs` next to
the existing ones and register it in the `layouts` map at the bottom of the
file — follow the existing functions' structure (they all take
`(post, { width, height, variant })` and return an SVG string).

## Updating the profile bio

Edit `data/profile.mjs`, then update `profile/PROFILE_SETUP.md` to match
(it's documentation, not generated — keep the two in sync by hand) and
paste the new bio into the Instagram app directly; there's no API
connection to push it automatically (see `MANUAL_SETUP_CHECKLIST.md`).

## How rendering works

`scripts/render.mjs` builds an SVG string per asset (colours and fonts
pulled from `data/theme.mjs`) and rasterises it with `sharp` (already a
project dependency via Astro's image pipeline). Text is set in the real
brand fonts — Source Serif 4 and Inter, converted once from the
`@fontsource` woff2 files already used by the website into TTF (see
`scripts/fonts/`) because the SVG renderer sharp uses in this environment
doesn't reliably honour embedded `@font-face` webfonts. The render script
registers `scripts/fonts/*.ttf` via a throwaway fontconfig config scoped to
the render process only (a temp file, set via `FONTCONFIG_FILE`) — nothing
is installed system-wide, and it doesn't touch `~/.fonts` or
`/usr/share/fonts`.

If you ever need to regenerate `scripts/fonts/*.ttf` from a newer
`@fontsource` version (e.g. after a font upgrade on the website), it's a
one-time step: `pip install fonttools brotli`, then use
`fontTools.ttLib.TTFont` to load the `.woff2` file and `.save()` it with
`font.flavor = None`. This is a source font conversion, not a runtime
dependency — the committed `.ttf` files are all the render script needs.

## Instagram Stories safe-area guidance

Story compositions (`variant: 'story'` in `scripts/render.mjs`) already
keep primary text out of Instagram's reserved UI zones:

- **Top ~250px**: reserved for the profile photo/username/timestamp overlay
  — story layouts start their first text block below this.
- **Bottom ~250px**: reserved for the reply field/sticker tray — CTAs and
  closing lines stay above this margin.

If you hand-edit a story layout, keep new content inside roughly
`y: 250` to `y: 1670` (out of 1920px total height) to stay clear of both.

## Upload order recommendation

See `CONTENT_CALENDAR.md` for the full two-week plan. Short version: profile
setup and Highlights before the first feed post goes live, then the six
feed posts spaced out (not all on day one) with Story reposts and one
poll/question sticker in between to keep the account active without
inventing content.

## What this system deliberately does not do

- No fake artists, performances, events, testimonials, or archive material
  — every launch post is about brand identity, name meaning, heritage (as
  already stated on the website), and participation. See
  `docs/CONTENT_GUIDE.md` in the main repo for the exact claims that need
  care around the 1984 heritage connection.
- No Instagram API integration, scheduling tool, or auto-posting — this
  system produces files; a human uploads them (see
  `MANUAL_SETUP_CHECKLIST.md`).
- No stock photography, AI-generated "musicians," or invented archive
  imagery — every launch asset is typography- and motif-driven, matching
  the website's current logo/brand system (which is itself typographic
  until real photography/logo assets exist).
