# Piedmont Digital: content editing path

Recommendation: keep the public site static, then add a separate **Decap CMS editor** using file collections mapped to these JSON files. Validate content in CI and require a preview before publishing. This is an architecture recommendation, not an installed or authenticated CMS.

| Option    | Fit                                                                                | Operational tradeoff                                                                                                                                                                       |
| --------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Decap CMS | Forms for hours, menu items, events, images; writes to Git without a site database | GitHub backend requires repository push access and an OAuth service. On Cloudflare, plan a separate scoped authentication service rather than assume Netlify authentication exists.        |
| Keystatic | Schema-based editing with local/GitHub storage and an Astro integration            | Its deployed Astro editor needs server code, Node APIs, and an adapter. Prototype the chosen version on Workers before committing to compatibility.                                        |
| TinaCMS   | Visual editing may be useful when owners want to edit directly in a page           | Current Astro visual editing adds server endpoints and a Cloudflare adapter. More moving pieces than this file-based demo; assess hosting/auth costs only when visual editing is required. |

For the future client portal, use one repository and Worker per client, one versioned template, scoped per-client authorization, preview/approve/publish states, and a revision trail. Keep GitHub credentials on the server. A first portal can link into a Decap editor; a later portal can present its own forms using the same content contract. A common login alone does not provide tenant isolation: authorize every content and deployment operation against the assigned client repository.

The current JSON content and Zod schemas are the boundary. Add a new client by copying the template, replacing the business/branding data and images, and validating links and research. Site-specific editorial page copy can be changed independently in the Astro pages. The layout is reusable, not a completed multi-tenant SaaS platform.

No Supabase, paid CMS, customer database, login, or subscription is needed for this initial demonstration. Start with one real owner's editing workflow before building a client portal.

Official documentation checked November 5, 2026:

- [Decap GitHub backend](https://decapcms.org/docs/github-backend/)
- [Keystatic Astro installation and deployment](https://keystatic.com/docs/installation-astro)
- [TinaCMS with Astro](https://tina.io/docs/frameworks/astro)
- [TinaCMS Cloudflare Workers deployment](https://tina.io/docs/tinacloud/deployment-options/cloudflare-workers)
