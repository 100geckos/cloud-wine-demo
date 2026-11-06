# Updating the Cloud Wine preview

Business information lives in `src/content/`. For form-based editing, use the [local Decap editor](EDITOR.md). Page templates are in `src/pages/`; you do not need to edit them to update the content below. These are plain JSON files: if editing them directly, use double quotes, put commas between entries, and do not put a comma after the final entry. Keep a copy or use Git's undo before changing anything.

| What to update                            | File                 | Field                      |
| ----------------------------------------- | -------------------- | -------------------------- |
| Name, address, phone, social links, story | `business.json`      | Corresponding named fields |
| Opening hours                             | `business.json`      | `hours`, `hoursNote`       |
| Menu and prices                           | `menu.json`          | `categories[].items`       |
| Events                                    | `events.json`        | `events`                   |
| Notices                                   | `announcements.json` | `announcements`            |
| Colors, headline, photography             | `brand.json`         | `colors`, `hero`, `images` |

## Preview a change

1. Open a content file in your editor and save your change.
2. Run `npm run dev` and open `http://localhost:4321` (reuse the running server if present). Changes refresh automatically.
3. Run `npm run check`, `npm test`, and `npm run build` before committing. Missing required fields, malformed dates, invalid URLs, or negative prices cause a validation failure.
4. For changes to be visible on a hosted site, rebuild and deploy after approval. Saving JSON alone does not change a deployed copy.

## Hours

The hours array is intentionally empty because sources disagree. After the owner confirms them, add entries such as `{ "day": "Monday", "hours": "Closed" }` for each day and replace `hoursNote` with any holiday-hours note. Do not use an old public schedule without checking it.

## Menu items

Add an object to the appropriate category's `items` array. Fields are `name`, optional `description`, optional numeric `price`, `verified`, and an HTTPS `source`. Prices are dollars as numbers, for example `12.5`, without a dollar sign. Omit the price entirely if it has not been confirmed. `verified: false` hides the item. The source should link to an owner-approved public menu or source document.

No example dish or amount has been put into the live content. Until a category contains verified items, its confirmation message remains visible.

## Events

Required fields: `id` (unique lowercase words joined by hyphens), `title`, `description`, `start`, `end`, `verified`, and `source` (HTTPS announcement link). Use full ISO timestamps **including a timezone offset**, for example the format `YYYY-MM-DDTHH:mm:ss-05:00` in Eastern standard time or `-04:00` in daylight time. Confirm the actual offset for the event date. End must follow start. Only verified events appear.

Events that have ended are excluded at build time and hidden in the browser on load, every 30 seconds, and when the tab becomes visible again. In-progress events stay visible. Without JavaScript, a static site needs a rebuild to remove dates that expired after its last build. Before a real launch, schedule a daily rebuild if events are used. No scheduler or deployment has been activated for this demo.

## Announcements

Add `id`, `text`, `end` (ISO timestamp with offset), and `verified`. Confirmed, unexpired announcements appear on the homepage. Expiry is checked at build time and in the browser. Do not use a promotion until its details are confirmed.

## Photos

Upload a licensed JPG, PNG, or WebP through the editor or put it in `src/assets/`, then change the corresponding `file`, `alt`, `caption`, `photographer`, and `source` values in `brand.json`. The editor writes `file` as `/src/assets/filename.jpg`; a manually edited basename also works. Keep the logical image `id` (`wine`, `bar`, or `cocktail`) so the current layouts keep working. Astro creates responsive WebP files during the build. Preserve photo rights/credits. Replace the stock-photo notices only after owner-approved premises photographs are actually supplied.

The local editor is installed. A hosted owner login is a separate authentication and deployment step; see `EDITOR.md` and `CMS-OPTIONS.md`.
