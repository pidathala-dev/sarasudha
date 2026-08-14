# Sarasudha

**sarasudha.in** — a music and cultural platform bridging Carnatic tradition, light music, devotional
music and contemporary expression.

> Rooted in tradition. Open to every note.

Sarasudha brings together Carnatic tradition, light music and contemporary expression — creating a
space for artists, audiences and generations to connect through music. It carries forward a cultural
journey that began with **Annamacharya Kalabharati** in Cuddapah in 1984, and hosts **Sarasudha
Ragam**, its classical/Carnatic vertical.

This is the Phase 1 production build: a static, content-driven marketing and discovery site. It is
not (yet) a streaming service, a learning platform, or a full CMS — see [Roadmap](#roadmap) for what
comes next.

---

## Contents

- [What Sarasudha is](#what-sarasudha-is)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Running locally](#running-locally)
- [Repository structure](#repository-structure)
- [Editing content](#editing-content)
  - [Adding an artist](#adding-an-artist)
  - [Adding a performance](#adding-a-performance)
  - [Adding an event](#adding-an-event)
  - [Adding an archive entry](#adding-an-archive-entry)
  - [Demo content and `showDemoContent`](#demo-content-and-showdemocontent)
- [Replacing logos and brand assets](#replacing-logos-and-brand-assets)
- [Updating contact information](#updating-contact-information)
- [The contact form](#the-contact-form)
- [Environment variables](#environment-variables)
- [Production build](#production-build)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Analytics](#analytics)
- [Security & privacy notes](#security--privacy-notes)
- [GoDaddy deployment](#godaddy-deployment)
- [Roadmap](#roadmap)

---

## What Sarasudha is

Sarasudha is a **music + culture + performance + artist discovery platform**, not a Carnatic academy
and not a Spotify-style streaming service. It spans:

- Carnatic music
- Light music
- Devotional music
- Contemporary interpretations
- Young / emerging musicians
- Musical storytelling and artist conversations
- Live performances
- Cultural archives

**Sarasudha Ragam** (`/ragam`) is a programme within Sarasudha dedicated to Carnatic performance and
heritage — a vertical, not a separate master brand. Future verticals (light music, young performers,
archives) can be added the same way without restructuring the site.

The 1984 heritage (Annamacharya Kalabharati, Cuddapah) is referenced carefully. Statements about
legal/registration status are deliberately withheld until verified — see
[`docs/HERITAGE_VERIFICATION.md`](docs/HERITAGE_VERIFICATION.md) (internal, not linked from the
public site) for exactly what's outstanding and where those claims live in the codebase.

## Architecture

- **Static-first.** Every page is pre-rendered at build time to plain HTML/CSS with minimal JS. No
  Node server is required in production — the output is a `dist/` folder you upload to any static
  host (see [GoDaddy deployment](#godaddy-deployment)).
- **Content collections, not hard-coded pages.** Artists, performances, events and archive items live
  as Markdown files with typed frontmatter (Zod-validated) under `src/content/`. Pages query these
  collections; adding content never requires touching a `.astro` template.
- **Design tokens.** All colour, type, spacing and motion values are CSS custom properties in
  `src/styles/tokens.css`. Components consume tokens, never raw hex values.
- **Component system.** A small, deliberately non-exhaustive set of shared Astro components (see
  `src/components/`) covers navigation, cards, hero sections, forms and media embeds. No UI
  framework (React/Vue/etc.) is used — interactivity that genuinely needs it (mobile nav, filters,
  the contact form, YouTube click-to-load) is a small vanilla `<script>` per component.

## Tech stack

| Concern            | Choice                                   |
| ------------------- | ----------------------------------------- |
| Framework           | [Astro](https://astro.build) (static output) |
| Language             | TypeScript                                |
| Content              | Astro Content Collections (Zod schemas)   |
| Styling              | Plain CSS with design tokens (no Tailwind/Bootstrap/MUI) |
| Fonts                | Self-hosted via `@fontsource` (Fraunces + Inter) |
| Sitemap              | `@astrojs/sitemap`                        |
| Tests                | Playwright (smoke, navigation, accessibility, link-check) |
| Lint                 | ESLint + `eslint-plugin-astro` + `typescript-eslint` |

## Running locally

Requires Node.js 20+.

```bash
npm install          # install dependencies
npm run dev           # start the dev server at http://localhost:4321
npm run typecheck     # astro check (types + template diagnostics)
npm run lint          # eslint
npm run build          # typecheck + production build to dist/
npm run preview        # serve the built dist/ locally, as production would
npm test               # build, then run the Playwright suite against the preview server
```

## Repository structure

```
src/
  components/     Shared UI: Header, Footer, Logo, cards, forms, motifs, etc.
  config/         site.ts (nav, feature flags), contact.ts (contact details)
  content/        Markdown content collections: artists, performances, events, archive
  content.config.ts  Zod schemas for each collection
  layouts/        BaseLayout.astro (head/meta/JSON-LD, header, footer, skip link)
  lib/            seo.ts (meta/JSON-LD helpers), contactForm.ts (submission interface)
  pages/          One file per route (see Information Architecture below)
  styles/         tokens.css (design tokens), global.css (base styles, utilities)
public/
  brand/          Logo/favicon assets (see below)
  images/         Generated placeholder/motif art used by demo content
docs/
  CONTENT_GUIDE.md          Editorial tone and content-writing guidance
  BRAND_GUIDE.md             Positioning, colour, type, spacing, imagery, logo, Ragam treatment
  HERITAGE_VERIFICATION.md   Internal — facts still pending documentary verification
tests/            Playwright specs (routes, navigation, accessibility, link-check)
scripts/          One-off content/asset generation scripts (not part of the build)
```

### Information architecture

| Route | Page |
| ----- | ---- |
| `/` | Home |
| `/our-story` | Our Story |
| `/music` | Music (editorial discovery, filterable) |
| `/ragam` | Sarasudha Ragam |
| `/artists`, `/artists/[slug]` | Artists index + profile |
| `/events` | Events (upcoming/past) |
| `/heritage` | Heritage / Archive |
| `/participate` | Participate (Perform / Attend / Contribute / Support) |
| `/contact` | Contact |
| `/privacy`, `/terms` | Legal |

## Editing content

Content is edited by adding or changing Markdown files — no code changes required. Each collection is
schema-validated (`src/content.config.ts`); `npm run build` will fail with a clear error if a required
field is missing or malformed.

### Adding an artist

1. Create `src/content/artists/<slug>.md`.
2. Fill in frontmatter (see any existing file for the full shape): `name`, `slug` (used in the URL —
   `/artists/<slug>`), `photo`, `photoAlt`, `genre` (array, from the shared tag list), `instruments`,
   `location`, `bio`, `social` (optional links), `featuredPerformances` (array of performance
   filenames without `.md`), `featured` (boolean — shows on the homepage), `isDemoContent: false`.
3. Write a short body below the frontmatter if you want additional profile copy (rendered on the
   artist's page).
4. Add a portrait image to `public/images/artists/` (or wherever `photo` points) — see
   [Replacing logos and brand assets](#replacing-logos-and-brand-assets) for image guidance.

### Adding a performance

Create `src/content/performances/<slug>.md` with `title`, `artist`, `genre`, `date`, `thumbnail`,
`thumbnailAlt`, `description`, optionally `youtubeUrl` and/or `audioUrl`, `featured`, and
`isDemoContent: false`. Performances appear on `/music`, and on `/ragam` automatically if their
`genre` includes `Carnatic`.

**Do not embed or link to copyrighted recordings you don't have rights to.** The demo entries use
original placeholder art precisely to avoid this.

### Adding an event

Create `src/content/events/<slug>.md` with `title`, `date`, `startTime`, `venue`, `city`,
`description`, `eventType`, `status` (`upcoming` / `completed` / `cancelled`), and
`isDemoContent: false`. Do not add fictional or unconfirmed real-world events — see
[Demo content](#demo-content-and-showdemocontent).

### Adding an archive entry

Create `src/content/archive/<slug>.md` with `title`, `category` (one of the seven archive
categories), `description`, optional `image`, `pendingDigitisation` (defaults `true`), and
`isDemoContent: false`. Do not fabricate archival documents or historical facts — write only what is
verifiably true, and flag anything uncertain in
[`docs/HERITAGE_VERIFICATION.md`](docs/HERITAGE_VERIFICATION.md).

### Demo content and `showDemoContent`

Every collection entry has an `isDemoContent` flag. The site-wide switch lives in
`src/config/site.ts`:

```ts
export const showDemoContent = import.meta.env.PUBLIC_SHOW_DEMO_CONTENT !== 'false';
```

Set `PUBLIC_SHOW_DEMO_CONTENT=false` (see `.env.example`) for a production build once real content
exists, and demo-flagged entries stop rendering everywhere automatically — no per-page changes
needed. Pages that show demo events/performances also render a labelled "Demo content" note on each
card while demo content is on.

## Replacing logos and brand assets

No official Sarasudha logo exists in this repository yet. The `<Logo />` component
(`src/components/Logo.astro`) checks for real assets first and falls back to a typographic wordmark
("**Sara**sudha", with the two halves in different brand colours) if none are found — so dropping in
real files never requires a code or layout change.

Expected locations (create `public/brand/` if it doesn't exist):

| File | Used for |
| ---- | -------- |
| `public/brand/primary-logo.svg` | Default header logo |
| `public/brand/logo-light.svg` | Logo on dark backgrounds (footer) |
| `public/brand/ragam-logo.svg` | Sarasudha Ragam wordmark, if a distinct mark is created |
| `public/brand/favicon.svg` | Browser tab icon (a typographic "S" fallback ships today) |
| `public/brand/social-card.png` | Open Graph / social preview image (1200×630 recommended) |

If `social-card.png` is absent, `og:image`/`twitter:image` tags are simply omitted rather than
pointing at a broken file — add the file and they appear automatically.

## Updating contact information

All contact details live in one file: `src/config/contact.ts`. No email address, phone number, or
social handle has been invented for this build — every field starts as `null` and is only shown once
filled in (components omit missing channels gracefully rather than rendering broken links).

```ts
export const contact: ContactDetails = {
  email: null,
  location: null,
  instagram: null,
  youtube: null,
  facebook: null,
  whatsapp: null, // full https://wa.me/<number> link
};
```

## The contact form

`/contact` has a complete, validated form UI (name, email, phone, reason, message, consent — see
`src/components/FormField.astro`), but **Phase 1 ships with no backend**. The integration contract is
documented in `src/lib/contactForm.ts`:

- If `PUBLIC_CONTACT_FORM_ENDPOINT` is unset, the form validates and previews the submission but
  **does not claim to send it** — a visible notice says so on the page.
- If set, the form `POST`s a JSON payload (`ContactFormPayload`) to that endpoint and reports success
  or failure based on the response.

To go live, point `PUBLIC_CONTACT_FORM_ENDPOINT` at a real endpoint (Formspree, a serverless
function, etc.) that accepts that payload shape.

**Anti-spam architecture:** the form includes an invisible honeypot field (`companyWebsite`) —
real visitors never see or fill it; submissions where it's non-empty are silently dropped
client-side. If you wire up a real backend, add server-side honeypot/rate-limit checks there too —
client-side checks alone are not sufficient spam protection.

## Environment variables

See `.env.example` for the full, commented list. Summary:

| Variable | Purpose | Default |
| -------- | ------- | ------- |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | Contact form submission URL | unset (demo mode) |
| `PUBLIC_SHOW_DEMO_CONTENT` | Show/hide demo-flagged content | `true` |
| `PUBLIC_ANALYTICS_PROVIDER`, `PUBLIC_ANALYTICS_ID` | Optional analytics | unset (no analytics loads) |

None are required for `npm run dev` or `npm run build` to work.

## Production build

```bash
npm run build
```

This runs `astro check` (typecheck) and then `astro build`, producing a fully static site in
`dist/` — plain HTML, CSS, JS, images, `sitemap-index.xml`/`sitemap-0.xml`, and `robots.txt`. Nothing
in `dist/` requires a Node process to serve; any static file host works.

`npm run preview` serves that `dist/` folder locally so you can sanity-check the production build
before deploying.

## Testing

```bash
npm test
```

`pretest` runs `npm run build` automatically, then Playwright runs against the built site via
`astro preview`. The suite covers:

- **`tests/routes.spec.ts`** — every primary route returns 200, renders exactly one `<h1>`, has a
  branded `<title>`, throws no console errors, and an unknown route returns a proper 404.
- **`tests/navigation.spec.ts`** — desktop nav links work, the mobile menu opens/closes accessibly
  (correct `aria-expanded`, closes on Escape), and there's no horizontal overflow at 360px/390px.
- **`tests/accessibility.spec.ts`** — an automated `axe-core` WCAG 2.1 A/AA scan on every primary
  route, failing on any `serious`/`critical` violation.
- **`tests/links.spec.ts`** — crawls the built `dist/` output for every internal `href` and fails if
  any doesn't resolve to a real file (a lightweight broken-link check).
- **Content schema validation** happens implicitly: `astro build` fails immediately if any Markdown
  frontmatter doesn't match its Zod schema in `src/content.config.ts`.

Playwright uses whatever Chromium build `npx playwright install` downloads for your machine. If
you're running in an environment with a pre-installed browser at a different path (as this project
was originally developed in), set `PLAYWRIGHT_CHROMIUM_PATH` to that executable and
`playwright.config.ts` will use it automatically; otherwise it's ignored.

## Accessibility

Target: WCAG 2.2 AA. Implemented: semantic landmarks and heading order, a skip-to-content link,
visible focus rings everywhere (`:focus-visible`, never removed), keyboard-operable navigation
(including the mobile menu), labelled form fields, `prefers-reduced-motion` support throughout,
alt-text on every meaningful image (decorative motifs are `aria-hidden`), and design tokens chosen to
clear 4.5:1 text contrast (see `docs/BRAND_GUIDE.md` for why some brand accent colours have a
separate, darker "text-safe" token). This is verified on every route by the automated Playwright/axe
suite (`tests/accessibility.spec.ts`) — run `npm test` to check the current state.

## SEO

- Unique `<title>`, meta description and canonical URL per page (`src/lib/seo.ts`).
- Open Graph + Twitter Card metadata on every page.
- `Organization` JSON-LD sitewide; `Event` JSON-LD on `/events`; `Person` JSON-LD on artist profiles.
- `sitemap-index.xml` generated automatically by `@astrojs/sitemap` at build time.
- `public/robots.txt` allows all crawling and points to the sitemap.
- Clean URLs (`/music`, not `/music.html`), directory-style build output.

## Analytics

**No analytics runs by default.** No script is loaded, and no cookies are set, until
`PUBLIC_ANALYTICS_PROVIDER`/`PUBLIC_ANALYTICS_ID` are explicitly configured (see
`.env.example`). There is currently no analytics integration wired up — this is a placeholder for a
future, deliberately opt-in integration; if you add one, load it conditionally on those variables so
the "nothing runs until configured" guarantee holds.

## Security & privacy notes

- No secrets are committed to this repository; all external endpoints are environment-configured.
- No third-party scripts load by default (no analytics, no trackers, no ad tech).
- YouTube embeds use `youtube-nocookie.com`, load only on click (no autoplay, no request until the
  visitor asks for it).
- External links use `rel="noopener noreferrer"`.
- The contact form has no working backend until one is explicitly configured (see above) — nothing
  pretends to submit when it can't.
- Suggested CSP starting point once you control the hosting response headers: default-src 'self';
  img-src 'self' data:; style-src 'self' 'unsafe-inline' (inline `<style>` is used by Astro's scoped
  CSS); frame-src https://www.youtube-nocookie.com; script-src 'self'. Adjust as needed for whatever
  analytics/form endpoint you eventually add.
- See `/privacy` and `/terms` for the user-facing policies; neither claims a specific compliance
  status (e.g. GDPR/DPDP) that hasn't been assessed.

## GoDaddy deployment

This is a static site — the production artifact is the `dist/` folder from `npm run build`. It does
**not** need a Node.js server to run in production, which makes it compatible with conventional
shared/cPanel hosting, not just Node-capable hosts.

> **Important:** GoDaddy "Website Builder" is a different product from web hosting that serves
> arbitrary static files. If your `sarasudha.in` domain currently only has Website Builder or is just
> a registered domain with no hosting plan, you need a hosting plan (GoDaddy cPanel/Linux hosting, or
> any other static host) that gives you `public_html`/FTP/File Manager access before these steps
> apply. This project does not make any DNS changes automatically — that's a manual step you control.

1. **Install dependencies** (once, or after `package.json` changes): `npm install`
2. **Local development**: `npm run dev` → http://localhost:4321
3. **Production build**: `npm run build` → outputs to `dist/`
4. **Preview the production build locally**: `npm run preview`
5. **Files to upload**: the *entire contents* of `dist/` (not the `dist` folder itself — its
   contents: `index.html`, per-route folders, `_astro/`, `images/`, `brand/`, `robots.txt`,
   `sitemap-index.xml`, `sitemap-0.xml`, etc.)
6. **Upload to `public_html`**: via GoDaddy's File Manager or an FTP/SFTP client, upload everything
   from step 5 into `public_html` (or the subfolder your hosting plan maps to `sarasudha.in`),
   preserving folder structure. If a previous release exists, see rollback below before overwriting.
7. **Domain mapping**: ensure `sarasudha.in` (and `www.sarasudha.in`, if used) points at this hosting
   account — either it's already the account's primary domain, or you add it as an Addon
   Domain/Domain pointing to `public_html` in cPanel. This is a manual DNS/hosting-panel step; this
   project doesn't perform it.
8. **HTTPS**: enable a free SSL certificate for the domain in the hosting panel (GoDaddy/cPanel
   typically offers AutoSSL/Let's Encrypt) and force HTTPS redirects, either via the panel's
   "Force HTTPS" toggle or an `.htaccess` rule if you manage one.
9. **Cache headers**: if your hosting exposes `.htaccess` (Apache, which is standard on
   cPanel), a reasonable starting point is long-lived caching for hashed `_astro/` assets and short
   caching for HTML:
   ```apache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType text/html "access plus 0 seconds"
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType image/svg+xml "access plus 1 year"
   </IfModule>
   ```
10. **Replacing a production release**: build fresh (`npm run build`), then upload the new `dist/`
    contents over the old ones. Uploading to a fresh timestamped folder (e.g. `releases/2026-08-14/`)
    and repointing `public_html` via a symlink, where your hosting plan supports it, avoids a
    half-uploaded state being briefly live; otherwise, uploading during low-traffic hours and keeping
    a local zip of the previous `dist/` (see rollback) is the simpler path on plain shared hosting.
11. **Rollback**: keep the previous `dist/` build (e.g. zip it before each deploy:
    `cd dist && zip -r ../dist-YYYY-MM-DD.zip .`). To roll back, delete the current `public_html`
    contents (or the affected files) and re-upload the previous zip's contents.

## Roadmap

Deliberately **not** built in Phase 1, to avoid over-engineering ahead of real need — architected so
they can be added without a rewrite:

- **Phase 2**: artist onboarding, a real CMS/editing workflow, event registration, a newsletter,
  YouTube channel integration, a searchable archive, a Telugu-language version.
- **Phase 3**: user accounts, artist dashboards, original Sarasudha productions, playlists,
  masterclass/learning content, memberships, sponsorships, donations.
- **Phase 4**: mobile/PWA, personalised discovery, a larger digital archive, community features.

---

Also see: [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) (editorial tone) and
[`docs/BRAND_GUIDE.md`](docs/BRAND_GUIDE.md) (positioning, colour, type, Ragam treatment).
