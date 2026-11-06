## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project handoff (November 5, 2026, America/New_York)

This is Piedmont Digital's **unofficial Cloud Wine concept site** for the Asheboro, North Carolina business. Its goals are to give the owners a polished, usable pitch preview and to establish a reusable foundation for future local-business sites. The website has not been reviewed or approved by Cloud Wine. Keep the visible independent-concept disclaimer and illustrative-photo notices until the owners approve replacements. The site is intentionally excluded from search indexing.

The first delivery is implemented and pushed to `main` at `19a3c8d` (`Build Cloud Wine concept with verified content and Cloudflare readiness`). The local content editor was added and pushed at `0e6fecf` (`Add-local-Cloud-Wine-content-editor`). The connected remote is `https://github.com/100geckos/cloud-wine-demo.git`. This is a local/static Cloudflare-ready project; **nothing has been deployed to Cloudflare**, no public route or DNS was changed, and the Gecloid VPS was left untouched. Verify the live Git and account state before any future push or deployment.

At this handoff, `src/content/business.json` had an uncommitted modification that is not part of the documented implementation. Inspect `git status` and the diff before changing or committing it; preserve the user's work. This snapshot may become stale.

## What has been built

- Astro 7 static site with Tailwind 4, responsive editorial design, self-hosted Cormorant Garamond and DM Sans fonts, and a burgundy/charcoal/ivory/gold palette.
- Home, menu, events, about, contact, transparency/photo credits, and custom 404 pages. The static admin route is `/admin/`. `robots.txt` and `sitemap.xml` are generated routes.
- Reusable Astro components for the header/footer, brand, hero, cards, menu, events, gallery, contact block, calls to action, headings, icons, and optimized photos. The mobile menu, menu filters, and gallery dialog have keyboard and focus handling.
- Five editable JSON files in `src/content/`: `business.json`, `menu.json`, `events.json`, `announcements.json`, and `brand.json`. `src/lib/schemas.ts` validates them with Zod; `src/lib/content.ts` loads them; `src/lib/events.ts` filters unverified/expired events. Expiring events and notices are also hidden by browser checks after build.
- Three licensed illustrative Unsplash source photos in `src/assets/`, with photographer credits and source links recorded in `docs/RESEARCH.md` and displayed at `/preview-notes/`. Astro produces responsive WebP variants. These images do not depict Cloud Wine or prove its current offerings.
- Unique page titles/descriptions, structured data based on qualified facts, configurable HTTPS `SITE_URL` for canonical/social URLs and sitemap entries, and site-wide demo `noindex, nofollow` in page metadata, `robots.txt`, and `public/_headers`. Without `SITE_URL`, no guessed canonical domain or populated sitemap is emitted.
- Cloudflare Workers static-assets configuration in `wrangler.jsonc`, with `workers_dev: false`, `preview_urls: false`, no route, no binding, and no runtime secret. `npm run deploy:check` is a dry run; `npm run deploy` uploads and requires the user's separate deployment authorization.
- Original favicon and social card, build audit script, social-card generator, content/date regression tests, and project documentation.

## Factual-content rules

The [research record](docs/RESEARCH.md) is a dated public-source snapshot, not owner approval. Downtown Asheboro lists Cloud Wine at **103 N Fayetteville St, Asheboro, NC**, with specialty wine, craft beer, small bites, and indoor/outdoor seating. Local opening coverage reports cocktails and a lounge. The phone `(336) 610-0420` comes from a public directory and must retain its pending-owner-confirmation label until verified. The linked Facebook profile was identified through the downtown directory; its posts were not verified here.

Current hours conflict across sources, so `hours` is intentionally empty. The current itemized menu, prices, upcoming events, email, and Instagram were not verified and remain absent. Do not invent them, infer an open-now status, copy ratings or reviews, reuse social-media photos without rights, or import facts from another Cloud Wine business. In particular, `thebistrocloudwine.com` belongs to a different business in Colorado. Keep the strict empty states until the owner supplies and approves information. A source URL is required for displayed menu items and events.

## Local editor and content workflow

The Decap CMS editor lives at **http://localhost:4321/admin/**. `src/pages/admin/index.astro` loads a pinned Decap 3.17.3 browser bundle only on localhost. `public/admin/config.yml` defines forms for all five JSON files. `npm run editor:proxy` starts Decap Server 3.11.6 in file-system mode on `127.0.0.1:8081`, allowing only the `http://localhost:4321` browser origin. It has no authentication: run it only locally, leave the terminal open while editing, stop it when done, and never expose its port to a network. The bundle requires internet access.

In the local UI, **Publish now** writes a local JSON file. It does not create a Git commit, push to GitHub, or deploy Cloudflare. Review the site, run checks, and inspect the diff before committing content. The image picker stores JPG/PNG/WebP uploads in `src/assets/`; the content records `/src/assets/<filename>`. Preserve the `wine`, `bar`, and `cocktail` image IDs, image rights, alt text, and credits. See [editor guide](docs/EDITOR.md) and [content editing guide](docs/CONTENT-EDITING.md) for exact fields and steps.

The hosted `/admin/` page intentionally does not load the CMS outside localhost. Hosted owner login has **not** been configured. A future GitHub-backed editor needs scoped authentication (for example, a reviewed OAuth service or chosen hosted Decap backend), editor repository permissions, preview/review behavior, and a deployment policy. Do not remove the localhost guard based only on the repository name in `config.yml`. The broader CMS/client-portal options are in [CMS-OPTIONS.md](docs/CMS-OPTIONS.md).

## Development and verification

Use `npm ci` to install the locked dependencies. `npm run dev` uses the required `astro dev --background`; manage it with `npm run dev:status`, `npm run dev:logs`, and `npm run dev:stop`. Run `npm run editor:proxy` in a separate terminal when editing. Never assume servers from an earlier session are still running; check their status first.

Before committing a content or code change, run:

```powershell
npm run check
npm test
npm run build
npm run audit:build
git diff --check
```

Use `npm run deploy:check` when deployment packaging changes. The last verified implementation had **0 Astro check errors/warnings/hints**, **4 passing tests**, **8 built HTML pages**, **139 resolved local links/assets** in the build audit, and **45 static assets** in the Wrangler dry run. The local editor loaded all five collections; a menu edit was saved through the UI, verified on disk, and restored. Desktop/mobile browser checks covered 320, 768, and 1440 CSS-pixel layouts, menu navigation/filtering, the gallery dialog, and loaded images. These are dated checks, not a guarantee for later changes. There is no measured Lighthouse score or deployed performance result. Full evidence and limitations are in [QA.md](docs/QA.md).

Windows sandboxed builds previously failed on `realpath public/`; the same build succeeded in an authorized normal environment. `npm audit --omit=dev` reported zero production advisories at the editor handoff. The local-only `decap-server` development dependency had four high advisories through its CLI dependencies. Keep it loopback-bound and reassess/update it before using it in a wider environment.

## Deployment boundary and proposed next steps

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for the exact Cloudflare procedure and rollback. There is no Cloudflare authentication, Worker deployment, route, domain, automatic Git deployment, or scheduled rebuild configured. `SITE_URL` is an optional build-time setting in an ignored `.env` file; use only an approved HTTPS origin controlled by the client or Piedmont Digital. The demo's `noindex` is intentional and should remain until an authorized launch decision.

Recommended work order when the user resumes this project:

1. Get owner confirmation for the business name/contact details, current weekly and holiday hours, menu/prices, upcoming events, photo/brand rights, and approval of the final copy. Update the JSON content and public-source/owner provenance; preserve empty states for missing facts.
2. Preview owner-approved content locally through `/admin/`, validate it, and review the pages at desktop and mobile sizes. Do not treat an editor save as a release.
3. If remote owner editing is wanted, choose and implement scoped GitHub authentication, per-editor access, content validation, and preview/approval flow. Test this separately from public deployment. No paid CMS, Supabase, or customer database is currently needed.
4. If a public pitch preview is approved, authenticate Cloudflare, choose an approved preview domain or URL, configure `SITE_URL` and the necessary route/URL switch, run all checks, then deploy and verify actual responses. Do not change DNS or publish merely because the code is ready.
5. For a reusable Piedmont Digital system, turn this repository into a versioned client template with separate repo/Worker per client, scoped per-client authorization, preview/approve/publish states, and a revision trail. Build a broader portal only after one owner editing workflow is proven.

Keep project-specific implementation details in this file and the linked docs. When facts, deployment state, or checks change, update the relevant docs and this handoff so later agents do not treat a dated snapshot as current truth.
