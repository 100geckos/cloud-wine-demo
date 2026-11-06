# Cloudflare Workers static assets

This is a fully static Astro site. It does not need the Astro Cloudflare SSR adapter, a database, or a Worker application server. `wrangler.jsonc` points directly to `dist` and selects the custom `404.html` fallback.

The Worker name is `piedmont-cloudwine-demo`. It has no routes or custom domains configured. `workers_dev: false` and `preview_urls: false` deliberately disable default public URLs. The Gecloid VPS and DNS are unrelated and must not be changed by this workflow.

## Build and validate locally

```powershell
npm ci
npm run check
npm test
npm run build
npm run audit:build
npm run deploy:check
```

`deploy:check` uses Wrangler's `--dry-run`: it verifies packaging and writes ignored output under `artifacts/worker`. It does not upload or publish. If Windows sandbox permissions block Astro's `realpath` operation, repeat the build in a normal authorized terminal.

## Environment

`SITE_URL` is an optional **build-time** HTTPS origin for the preview domain you control. Do not use another business's domain. Set it in a local ignored `.env` file (copy `.env.example`) or in the Cloudflare build settings. A path, credentials, query string, or fragment is rejected. There are no runtime secrets.

When `SITE_URL` is unset, canonical and absolute social image URLs are omitted and `sitemap.xml` has no URL entries. When set, canonical URLs, Open Graph URLs/image, and the five-page sitemap use that origin. The unofficial preview stays `noindex, nofollow` in meta tags, `robots.txt`, and `_headers`, even when a domain is configured. These directives discourage indexing; they are not access control.

## Only after public deployment is approved

1. Authenticate using `npx wrangler login` or a narrowly scoped Cloudflare API token in the terminal environment. Do not place credentials in source files or logs.
2. Confirm the account with `npx wrangler whoami`. Use a separate Worker for this concept.
3. Choose a preview hostname you control. For a `workers.dev` URL, explicitly set `workers_dev: true` after approval. Keep `preview_urls: false` unless version preview URLs are wanted too. For a custom domain, configure a route only after its own DNS approval. Do not guess a hostname or assume Cloud Wine owns a domain.
4. Set `SITE_URL` to that approved origin, rebuild, run the checks above, then `npm run deploy`. This uploads the build. With both public URL settings disabled and no route, it is not a usable public website.
5. Verify real responses for `/`, `/menu/`, `/events/`, `/about/`, `/contact/`, `/preview-notes/`, `/robots.txt`, `/sitemap.xml`, and a missing route. Check the deployed `_headers`, image responses, and mobile experience. Record deployment/version ID.

No deployment or public route has been created as part of this implementation. Authentication is required before account integration. Do not enable automatic deployment just because the GitHub repository is connected.

The static output also contains `/admin/`, but its CMS script runs only on localhost. The local editing proxy is a development tool and is never part of the Worker bundle. A hosted owner editor requires a separate, scoped GitHub authentication setup and a reviewed publishing flow; see [EDITOR.md](EDITOR.md).

## Optional Git integration later

After approval, connect the correct repository in Workers Builds. Use `npm ci && npm run check && npm test && npm run build && npm run audit:build` as the build command and `npx wrangler deploy` as the deploy command. Store `SITE_URL` in the build environment. Set up a daily rebuild if using event dates and needing accurate no-JavaScript output. Do not activate it during the demo build.

## Rollback

Keep a known-good Git revision and Cloudflare deployment/version ID. Use the Cloudflare dashboard's deployment rollback for the relevant Worker. To rebuild an older revision, check it out in a separate checkout, use `npm ci`, validate, and deploy only after approval. Never force-push unrelated history.

References: [Cloudflare static assets](https://developers.cloudflare.com/workers/static-assets/get-started/), [Cloudflare's static Astro guidance](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/astro/), [Astro routing](https://docs.astro.build/en/guides/routing/), [Astro styling](https://docs.astro.build/en/guides/styling/).
