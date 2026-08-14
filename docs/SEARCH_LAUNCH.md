# Search engine launch checklist

Steps to get `sarasudha.in` properly indexed once it's ready for public
search visibility. No verification tokens, property IDs, or credentials are
included here — each step below produces its own real token when you
actually run it; nothing here is a placeholder standing in for a real one.

## Prerequisites

- [ ] The site is deployed and reachable at `https://sarasudha.in` (see
      README → [GoDaddy deployment](../README.md#godaddy-deployment) or the
      GitHub Pages workflow).
- [ ] `https://sarasudha.in/robots.txt` returns `Allow: /` and references
      the sitemap (already the case — see `public/robots.txt`).
- [ ] `https://sarasudha.in/sitemap-index.xml` resolves and lists real
      pages (generated automatically by `@astrojs/sitemap` at build time).
- [ ] The redirect policy in [`DOMAIN_REDIRECTS.md`](./DOMAIN_REDIRECTS.md)
      is live, so search engines only ever see one canonical host.

## Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
   and add a property for `sarasudha.in`.
2. Verify ownership using one of Search Console's own methods — typically
   either:
   - **DNS verification**: add the TXT record Search Console gives you to
     the domain's DNS (at the registrar/DNS host, not in this repository).
   - **HTML file upload**: Search Console generates a real verification
     file to upload to `public/` (e.g. `public/googleXXXXXXXX.html`) — do
     this only when you have the actual file Google issues; do not invent
     a filename ahead of time.
3. Once verified, submit the sitemap: Search Console → Sitemaps →
   `https://sarasudha.in/sitemap-index.xml`.
4. Use "URL Inspection" → "Request Indexing" on the homepage and a couple
   of key pages (`/our-story`, `/participate`) to speed up initial
   crawling.
5. Check the **Coverage** and **Enhancements** reports after a few days for
   crawl errors or structured data issues.

## Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters) and add
   `sarasudha.in`.
2. Bing Webmaster Tools can import a verified Google Search Console
   property directly — the fastest path if step above is already done —
   or verify independently via DNS/meta tag/XML file, the same pattern as
   Google.
3. Submit `https://sarasudha.in/sitemap-index.xml` under Sitemaps.

## Structured data

`Organization` JSON-LD is emitted sitewide (see `src/lib/seo.ts` →
`organizationSchema()`); `Event` JSON-LD appears on `/events` once real,
non-demo events exist; `Person` JSON-LD appears on artist profile pages
once real, non-demo artists exist. Validate with
[Google's Rich Results Test](https://search.google.com/test/rich-results)
once real content is live — the schema is intentionally minimal (no
fabricated `sameAs`, ratings, or review counts) and should stay that way
until there's something real to describe.

## After launch

- [ ] Re-check Search Console's Coverage report roughly a week after
      submission for crawl errors.
- [ ] Keep the sitemap accurate — it regenerates automatically on every
      build, so this should stay true without manual effort.
- [ ] Do not add or simulate reviews, ratings, or engagement metrics in
      structured data to influence search appearance — none of that exists
      yet, and fabricating it would violate Google's structured data
      guidelines as well as this project's content honesty principle (see
      [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md)).
