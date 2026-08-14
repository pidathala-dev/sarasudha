# Domain & redirect policy

Documentation only — this file describes what should be true of DNS/hosting
configuration around `sarasudha.in`. It does not make any DNS or hosting
changes itself, and none of the values below are assumed to already be
configured; verify each with the `curl` commands given.

## Canonical domain

**`https://sarasudha.in`** is the one canonical URL for the site. It is what
`astro.config.mjs` (`site:`), `src/config/site.ts` (`site.url`), every
canonical `<link>` tag, the sitemap, and `robots.txt` all point at. Every
other domain or variant a visitor might type should redirect here — never
serve duplicate content on more than one host.

## Required redirects

| From | To | Type |
| ---- | -- | ---- |
| `http://sarasudha.in` | `https://sarasudha.in` | 301, permanent |
| `http://www.sarasudha.in` | `https://sarasudha.in` | 301, permanent |
| `https://www.sarasudha.in` | `https://sarasudha.in` | 301, permanent |
| Any other registered alternate domain (`.com`, `.org`, `.net`, misspellings) that the organisation owns | `https://sarasudha.in` | 301, permanent |

Use **301 (permanent)**, not 302, so search engines consolidate ranking
signal onto the canonical domain rather than treating it as a temporary
redirect.

### `www` policy

This project treats the bare apex domain (`sarasudha.in`) as canonical and
`www.sarasudha.in` as a redirect-only alias. If that changes, `site.url` in
`astro.config.mjs` and `src/config/site.ts` must be updated together — the
canonical URL, sitemap, and OG tags all derive from that single value.

## How to configure

Exact steps depend on the hosting provider (see the [GoDaddy deployment
section](../README.md#godaddy-deployment) in the README, or your CDN/host's
own redirect rules):

- **GoDaddy cPanel/shared hosting**: an `.htaccess` `RewriteRule` in
  `public_html`, or the hosting panel's "Domain redirects" tool if it's
  hosting the `www` and apex separately.
- **A CDN/edge host (Cloudflare, etc.)**: a redirect/page rule at the edge is
  usually preferable — it avoids an extra origin hop.
- **GitHub Pages** (used for the `sarasudha.in` custom domain today, see
  `.github/workflows/deploy-pages.yml` and `public/CNAME`): GitHub Pages
  auto-redirects `http` → `https` and serves only the domain in `CNAME`
  (`sarasudha.in`), but does **not** redirect `www` → apex on its own — a
  `www` CNAME record pointed at GitHub Pages will serve the *same* site on
  both hosts unless a redirect is added upstream (e.g. at the DNS/registrar
  level with a domain forwarding rule, or a small edge redirect).

## Verifying a redirect is live

```bash
curl -sI http://sarasudha.in | head -5
curl -sI http://www.sarasudha.in | head -5
curl -sI https://www.sarasudha.in | head -5
```

Each should return a `301` (or `308`) status with a `Location:` header of
exactly `https://sarasudha.in/` — not a `200`, and not a redirect to any
other host.

## Not yet configured

As of this document, redirect rules above are a checklist, not a confirmed
live state — mark each row done only after verifying it with `curl -I` as
shown above. Do not assume any row is done because it "should" be; hosting
changes happen outside this repository and must be checked independently.
