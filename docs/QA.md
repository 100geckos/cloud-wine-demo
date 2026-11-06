# Quality verification

Verified November 5, 2026. This records a local demonstration build, not production traffic or measured field Core Web Vitals.

## Automated checks

- Dependency install: succeeded. npm reported zero known dependency vulnerabilities at installation time.
- `npm run check`: zero errors, warnings, or hints.
- `npm test`: four tests pass: all JSON schemas; event verification/expiry/sort; exact end boundary and daylight saving offsets; invalid event/link rejection.
- `npm run build`: seven static HTML pages plus robots.txt, sitemap.xml, optimized photos, local fonts, CSS, and minimal interaction scripts.
- `npm run audit:build`: all 138 local link/asset references resolved, including anchors. Checks unique titles, descriptions, single H1, main landmarks, no duplicate IDs, image alt/dimensions, noindex, valid JSON-LD. This is a focused static check, not a full accessibility certification.
- `npm run deploy:check`: Wrangler static-assets dry run succeeds. No upload, bindings, Worker account integration, or public URL was created.
- Configured-domain build checked with a temporary `https://preview.example` value: canonical and Open Graph image URLs are emitted and the sitemap contains five URLs. Default domain-free output was then rebuilt and revalidated.

Windows filesystem sandboxing blocked Astro's `realpath` on `public/` and Wrangler's default log directory. The production build and packaging check succeeded in an authorized normal terminal. Dependency downloads likewise needed permitted network access.

## Browser checks

- Inspected the desktop home design in Opera and the built-in browser.
- Six content pages at 320, 768, and 1440 CSS pixels: no horizontal overflow, one H1 per page, no failed loaded images.
- Mobile 390px: navigation expands; Escape closes it; menu link navigates successfully.
- Menu categories: Small bites shows only that category and updates `#bites`; All offerings restores three sections.
- Gallery: opens as a native dialog, Escape closes it, focus returns to the originating photo button.
- Directions URLs point to the verified Asheboro street address; telephone action and source-linked Facebook URL are present. No test call or message was sent.

## Accessibility and performance provisions

Semantic landmarks, visible keyboard focus, skip link, active navigation state, button-expanded/pressed states, live filter announcements, dialog focus handling, alt text, reserved image dimensions, reduced-motion CSS, local fonts, responsive WebP sources, and lazy below-fold images are implemented. Hero image loads eagerly with high priority. All content remains navigable without JavaScript; menu filtering and the lightbox are enhancements.

The full build is about 1.5 MiB across all pages and responsive asset variants; this is not the transfer size of any one page. No measured Lighthouse score or real-world Core Web Vitals claim is made. Production headers, caching, real network performance, screen-reader experience, and any external social/map destination require final deployment/owner review. Facebook posts could not be inspected. Hours and exact menu data remain pending.

## Intentional limitations

- No CMS admin is installed; structured file editing and a handoff guide are provided.
- Calendar expiry works in the browser; no-JavaScript static copies need rebuilding after dates expire. No scheduled deployment has been activated.
- `SITE_URL` must be configured before useful absolute canonical, social-image URLs, and sitemap entries are generated. Demo noindex remains on.
- Cloudflare is unauthenticated and public routes are disabled.
- No fake contact form, reservation confirmation, sales claims, reviews, or unverified menu pricing.
