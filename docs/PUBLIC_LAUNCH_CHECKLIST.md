# Public launch checklist

The concrete go-live checklist for `sarasudha.in`. Work through it in order;
nothing here should be checked off until it's actually true in production,
not just true locally.

## 1. Content honesty

- [ ] `PUBLIC_SHOW_DEMO_CONTENT` is **not** set to `true` in the production
      build environment (it defaults to `false` — see `src/config/site.ts`
      and `.github/workflows/deploy-pages.yml`).
- [ ] No fabricated artists, performances, events, testimonials,
      partnerships, or archive entries exist anywhere in
      `src/content/*/*.md` with `isDemoContent: false`. Every non-demo
      content file describes something real.
- [ ] `npm run launch:check` passes (scans the built `dist/` output for
      demo/placeholder text leakage, broken internal links, missing
      canonical tags, and missing core routes — see
      `scripts/launch-check.mjs`).

## 2. Build & test

- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm test` passes (build, then the full Playwright suite: routes,
      navigation, accessibility, heritage/typography, broken links).
- [ ] `npm run build` succeeds with a plain environment (no
      `PUBLIC_SHOW_DEMO_CONTENT` override) — this is what production
      actually ships.

## 3. Domain & infrastructure

- [ ] `https://sarasudha.in` resolves and serves the current build.
- [ ] HTTPS is enforced (`http://` redirects to `https://`).
- [ ] Redirect rules in [`DOMAIN_REDIRECTS.md`](./DOMAIN_REDIRECTS.md) are
      live and verified with `curl -I`.
- [ ] `robots.txt` and `sitemap-index.xml` are reachable at their expected
      URLs and reference `sarasudha.in`.

## 4. Search visibility

- [ ] Steps in [`SEARCH_LAUNCH.md`](./SEARCH_LAUNCH.md) are complete:
      Google Search Console and Bing Webmaster Tools verified, sitemap
      submitted.

## 5. Contact & communication channels

- [ ] `src/config/contact.ts` reflects real, working contact details —
      or is deliberately left `null` for any channel that genuinely
      doesn't exist yet (never a placeholder value).
- [ ] If `PUBLIC_CONTACT_FORM_ENDPOINT` is configured, a real test
      submission has been sent through `/contact` and received.
- [ ] If it is **not** configured, the "this form doesn't send yet" notice
      on `/contact` is still accurate and visible.
- [ ] Every link rendered by `SocialLinks` (`src/components/SocialLinks.astro`)
      goes to a real, live account — no placeholder or parked handles.

## 6. Legal & policy accuracy

- [ ] `/privacy` and `/terms` still match actual site behaviour (analytics
      status, contact form status, any newsletter/backend claims).
- [ ] The "Historical claims" section in `/terms` and the registration
      number treatment sitewide still match
      [`HERITAGE_VERIFICATION.md`](./HERITAGE_VERIFICATION.md)'s current
      verification status — re-check this file before launch in case the
      registration/legal status has since been confirmed or changed.
- [ ] No page implies Sarasudha is legally the same organisation as the
      1984 Annamacharya Kalabharati, and no specific title is given to
      P. Ramachandran beyond "among its early leaders" (see
      [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md)).

## 7. Accessibility & quality

- [ ] `tests/accessibility.spec.ts` (axe-core WCAG 2.1 AA scan) passes on
      every primary route, including the zero-content launch states.
- [ ] Visual QA has been done at mobile (360/390/430px) and desktop
      (1024/1280/1440/1920px) breakpoints, with particular attention to the
      zero-content pages (Home's "Beginning" section, Artists, Music,
      Events, Ragam, Participate).
- [ ] No console errors, font 404s, or unjustified `href="#"` links on any
      route.

## 8. Post-launch

- [ ] Confirm the GitHub Pages deploy workflow (or whichever hosting path
      is live) is green after the launch commit.
- [ ] Re-check Search Console's Coverage report about a week after
      submission.
- [ ] As real artists, performances, events, or archive material are
      added, confirm the corresponding zero-content "launch state" section
      automatically switches back to its normal UI (this is built-in
      behaviour — every zero-state page checks `collection.length > 0` — but
      verify it visually the first time real content is added).
