# Cloud Wine content editor

The Decap editor is available on this computer at **http://localhost:4321/admin/**. It edits the same five JSON files used by the Astro site. The local proxy is restricted to `127.0.0.1:8081`, accepts only `http://localhost:4321` as its browser origin, and writes files without creating Git commits. It has no login, so stop it when you are not editing and do not expose port 8081 to a network.

## Start editing

From this repository, in separate terminals:

```powershell
npm ci
npm run dev
npm run editor:proxy
```

`npm run dev` starts Astro in background mode. Leave `npm run editor:proxy` open while editing. Open the exact editor URL above and click **Login**; the local mode does not use a GitHub account. If the editor says **Login with GitHub**, the local proxy is not reachable. Check that `npm run editor:proxy` reports `listening on 127.0.0.1:8081`, then reload the editor. The editor bundle is pinned to Decap 3.17.3 on jsDelivr and needs internet access.

Choose **Site content** to edit Business details, Menu, Events, Notices, or Brand and photography. Use **Publish now** to save a local file. The site at http://localhost:4321/ refreshes after a save. Here, “Publish” means **write to the local repo only**. It does not push to GitHub or deploy Cloudflare.

Check the website after every change, then run:

```powershell
npm run check
npm test
npm run build
npm run audit:build
git diff -- src/content src/assets
```

Only commit approved facts and licensed photos. Menu items must have an HTTPS source and `Verified` enabled before appearing. Events and notices require full ISO dates with the correct Eastern time offset; the editor uses text fields so the offset is explicit. Hours and prices remain blank until the owner confirms them. The JSON schemas reject invalid links, dates, negative prices, and missing core fields during `npm run check` or `npm run build`.

## Photos

The image picker saves uploads in `src/assets/` and the content file records `/src/assets/<filename>`. Upload only JPG, PNG, or WebP under 5 MB, use a short lowercase hyphenated filename, and enter alt text, photographer/owner, and an HTTPS license or permission source. Keep exactly one each of the `wine`, `bar`, and `cocktail` image IDs. Astro optimizes the selected image during build. Replace the on-site illustrative-photo disclosure only after actual owner-approved photos are supplied and the page copy is reviewed.

## Hosted editing

The `/admin/` page is included in the static build, but its CMS script runs only on localhost. A hosted GitHub login needs a GitHub OAuth app and a scoped authentication service or a chosen hosted Decap backend, plus repository write permissions for each editor. The current `config.yml` identifies the correct repository and `main` branch, but it does **not** make hosted login functional. Do not remove the localhost guard until authentication, account scope, preview/review flow, and deployment permissions have been configured and tested. No Cloudflare deployment, OAuth app, account, token, route, or DNS change was made for this editor.

Decap's local proxy and GitHub backend references: [local proxy](https://decapcms.org/docs/decap-proxy/), [GitHub backend](https://decapcms.org/docs/github-backend/), [file collections](https://decapcms.org/docs/collection-file/).
