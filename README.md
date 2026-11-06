# Cloud Wine · Piedmont Digital concept

A complete, responsive Astro + Tailwind demonstration for Cloud Wine in Asheboro, North Carolina. **Unofficial, unapproved, and unaffiliated with the business.** Licensed illustrative stock photos are labeled on the site. The preview has no tracking, customer forms, reservations, checkout, or fabricated reviews, prices, or events.

## Preview

```powershell
npm ci
npm run dev
```

Open **http://localhost:4321/**. The dev script runs `astro dev --background` as required by `AGENTS.md`. Manage it with `npm run dev:status`, `npm run dev:logs`, and `npm run dev:stop`. To inspect the exact static build, run `npm run build` then `npm run preview` in a terminal and use the printed URL.

## Included

- Home, menu, events, about, contact, transparency/photo credits, custom 404.
- Responsive navigation, mobile menu, menu-category filters with deep links, accessible gallery dialog, external directions and social links, click-to-call.
- Verified offering categories; confirmation states for menu items, hours, and future events. Directory-listed phone is explicitly qualified.
- Typed reusable Astro components, JSON business content, Zod validation, event expiry handling at build time and in the browser.
- Responsive optimized local WebP images; self-hosted Cormorant Garamond and DM Sans fonts; small vanilla-JavaScript interactions.
- Unique page metadata, structured data, configurable canonical/Open Graph URLs, sitemap, robots, and demo noindex headers.
- Cloudflare Workers static-assets configuration and dry-run packaging. Default public Workers URLs and version preview URLs are disabled; no DNS or Gecloid infrastructure is involved.

## Validate

```powershell
npm run check
npm test
npm run build
npm run audit:build
npm run deploy:check
```

The unit tests cover date boundaries, timezone offsets, content validation, and filtering unverified events. The build audit checks internal links/assets, anchors, page titles, descriptions, image attributes, landmarks, noindex, duplicate IDs, and JSON-LD. Browser verification and its limitations are recorded in `docs/QA.md`.

## Project map

| Location                   | Purpose                                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/*.json`       | Editable business, brand, menu, events, announcements                                                                                        |
| `src/lib/`                 | Content schemas, typed loading, event date rules                                                                                             |
| `src/components/`          | Header, Footer, Hero, SectionHeading, ServiceCard, MenuSection, EventCard, Gallery, ContactSection, CallToAction and small shared components |
| `src/layouts/Layout.astro` | Shared document, metadata, fonts and structured data                                                                                         |
| `src/pages/`               | Pages, robots.txt, sitemap.xml                                                                                                               |
| `src/assets/`              | Licensed source photographs                                                                                                                  |
| `src/styles/global.css`    | Tailwind import, responsive design and reduced-motion styles                                                                                 |
| `public/`                  | Original favicon/social card and Cloudflare response headers                                                                                 |
| `scripts/`, `tests/`       | Build audit, social-card generator and regression tests                                                                                      |
| `wrangler.jsonc`           | Cloudflare static assets config                                                                                                              |

## Editing, research and deployment

- [Content editing guide](docs/CONTENT-EDITING.md)
- [Research and owner information needed](docs/RESEARCH.md)
- [Cloudflare deployment and environment variables](docs/DEPLOYMENT.md)
- [CMS options and reusable platform recommendation](docs/CMS-OPTIONS.md)
- [QA results](docs/QA.md)

Set optional `SITE_URL` to an approved HTTPS origin you control when deployment is authorized; see `.env.example`. It is not needed locally. Without it, no guessed canonical domain is emitted and the sitemap is empty. The demo remains excluded from indexing even when configured.

Future content editing recommendation: a separate Decap CMS editor backed by Git, using these content files and scoped authorization. The initial version has structured-file editing only. No paid CMS or Supabase has been introduced.

Publishing requires explicit approval. `npm run deploy:check` is safe packaging verification; `npm run deploy` uploads to Cloudflare. Do not enable routes, Workers URLs, automatic deployments, or DNS changes without approval.
