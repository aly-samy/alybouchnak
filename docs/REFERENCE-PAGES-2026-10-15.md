# EPK, FAQ and discography update — 15 October 2026

Production: https://alybouchnak.com

Netlify deploy: `6ad0c975a3f2ee8fcda8954c`

## Content and discovery

- Replaced the incomplete EPK with short and extended artist biographies, a dynamically generated release catalog, the complete recording identifier table, official profiles and press contact.
- Clearly distinguished Aly Bouchnak (the artist) from The Bloom’s House (the music world and release series). Kept the 2025 and 2026 Bock Bock Chicken recordings separate.
- Replaced 44 repetitive FAQ entries with 23 focused answers about the artist, releases, recordings, lyrics, streaming, everyday listening, press and permissions. Added links to the exact source pages and stable question anchors.
- Removed hidden voice-assistant tuning text and unsupported popularity, precise-tempo, clinical-effect and development claims from the EPK and FAQ.
- Included full FAQ answers, biographies, release links and identifier tables in the initial HTML. FAQPage and ProfilePage structured data describe the visible content; schema is not presented as a promise of rich results or AI citations.
- Updated llms.txt with a directory linking artist information, direct answers and the three discography collections.
- Built EPK and FAQ content around normal readable information and source links. These changes improve access and answer grounding; they do not control model training or guarantee indexing or citations.

## Discography navigation

`/discography` is now a short overview linking to three dedicated collections:

- `/discography/latest-albums`: full-length albums, including announced releases.
- `/discography/bouncy-beats`: daytime albums, EPs and singles.
- `/discography/tuned-for-dreams`: the Tuned for Dreams album and its eight recordings, matched by album membership rather than inferred from moods or routine labels.

The pages share navigation with an announced current page, labeled search/year/type controls, result counts, clear-filter behavior, and working browser history. Recording detail pages remain accessible for upcoming releases. Canonicals, CollectionPage/ItemList schema, breadcrumbs and sitemap entries cover all three routes.

## Content maintenance

- FAQs remain editable in Neon. The update was applied in one transaction with a concurrency check and a private backup. No other CMS table was changed.
- FAQ resource links are in `src/data/faq-links.json`; preserve their relationship to FAQ IDs when editing questions.
- Press biographies and contact information are in `src/data/press-kit.json`.
- `scripts/generate-catalog-summaries.js` generates `catalog-reference.json` and lightweight card summaries from the actual catalog, avoiding a second hard-coded release registry and keeping full lyrics out of these page bundles.
- Private backups and browser reports are under `D:\Unfict-web\deployment-private` and the isolated audit folder; they are not published or committed.

## Validation

- Production build passed; all 37 automated tests passed, including initial HTML/schema agreement, link targets, and correct release membership.
- Focused ESLint checks passed for the three pages, shared discography logic and fragment scrolling component.
- The hosted preview passed checks at 1440 px and 390 px for six pages, search/reset, type filtering, collection navigation, browser back, current-page announcement, direct FAQ fragments, and JavaScript-disabled content.
- The redesigned FAQ passed Lighthouse accessibility-tree, button-name, llms.txt and ARD schema checks. The select-name audit was not applicable on FAQ.
- Production passed the same 12 responsive page checks and interactive/crawler checks, plus 27 existing endpoint, browser admin-login, recording and discovery checks. No page JavaScript errors or broken images were observed.
- The new discography page passed Lighthouse accessibility-tree, button-name and select-name checks, all scoring 1.0.
- No GitHub push was made. The earlier pending approval to publish the source remains outstanding; an automated rebuild from the older remote source can replace these fixes.

## Primary guidance

- https://developers.google.com/search/docs/appearance/ai-features
- https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- https://schema.org/FAQPage
- https://schema.org/ProfilePage
- https://schema.org/CollectionPage
