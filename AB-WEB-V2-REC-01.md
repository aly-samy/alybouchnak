# Volume 2 Repository Reconnaissance and Catalog-Integrity Audit
**Report ID:** `AB-WEB-V2-REC-01`
**Target Repository:** `aly-samy/alybouchnak`
**Default Branch:** `master`
**Inspected Commit SHA:** `7729ea094ac67a49cb962c4f41562d7bdaf1d0fe`
**Date of Audit:** 26 August 2026
**Author / Lead Engineer:** Jules, AI Software Engineer
**Authority:** Aly A. Samy, Artist and Repository Owner

---

## 1. Repository Identity and Inspected Commit SHA

- **Repository:** `aly-samy/alybouchnak`
- **Target Branch:** `master`
- **Audit Commit SHA:** `7729ea094ac67a49cb962c4f41562d7bdaf1d0fe`
- **Working Tree State:** Clean baseline. No repository source files were edited, created, or deleted during inspection. Validation commands were isolated to a temporary workspace (`/tmp/test-env`).

---

## 2. Executive Conclusion

The repository currently exhibits a **dual catalog architecture** with a significant divergence between static TypeScript snapshot files (`src/data/*.ts`) and the live Neon PostgreSQL database.

1. **Source of Truth & Production Drift:** The committed TypeScript files in `src/data/` serve as the direct input for static site generation (SSG), sitemap generation (`scripts/generate-sitemap.js`), SEO prerendering (`scripts/prerender-seo.js`), and Vite production bundles (`dist/`). However, the build process includes a `prebuild` hook (`npx tsx scripts/fetch-neon-data.ts`) that attempts to pull data from Neon PostgreSQL. In netlify production builds (with `DATABASE_URL` configured), `prebuild` overwrites `src/data/*.ts` prior to SSG. In environments lacking `DATABASE_URL` (such as local dev or isolated CI without credentials), `prebuild` fails with an unhandled exception, leaving static compilation bound to the committed `src/data/` snapshots.
2. **Catalog Baseline Divergence:** None of the post-Volume-1 releases (Release #1 through #6: *Hobby The Bunny*, *Boss Bath*, *Bock Bock Chicken*, *The Babble Beat*, *Cool Gang (Big W Vibes)*, *My Little Love*) nor any upcoming releases (#7 through #12) exist in the committed `src/data/tracks.ts` or `src/data/albums.ts`. Furthermore, *The Bloom's House: Volume 2* album entity is completely absent from all source and schema files.
3. **Volume 2 Asset Preparedness:** The cover image `public/images/the-blooms-house-volume-2.webp` (322,104 bytes, 4096x4096 WebP) is committed in the repository, but it is **orphaned** (unreferenced in `src/` or `scripts/`). Single cover assets for *Hobby The Bunny*, *Boss Bath*, *The Babble Beat*, *Bock Bock Chicken*, and *Brave Hello* are present in `public/images/`, but single artwork for *Cool Gang*, *My Little Love*, *Who Is Daddy's Favorite?*, *Billy Boy*, *Silly Goodbye Dance*, *Llama (Drama in Pajamas)*, and *Layla's Coming* is absent.
4. **Metadata Integrity & System Pressure Points:** Multiple catalog defects exist in the committed snapshot, including invalid platform URLs (`https://open.spotify.com/album/placeholder`), inconsistent Schema.org `datePublished` values vs. top-level `releaseDate`, single image paths reused across tracks and albums, and strict TypeScript schema requirements for fields like `bpm: number` and streaming platform links.

---

## 3. Source-of-Truth and Production Data-Flow Map

### 3.1 Data Flow Architecture

The data architecture transitions across authoring, build-time fetching, static generation, dynamic runtime, and administrative persistence:

```
+-----------------------------------------------------------------------------------+
|                                  AUTHORING / ADMIN                                |
|  Admin Dashboard (React) -> Netlify Function (neon-crud.ts) -> Neon PostgreSQL DB   |
|  Admin Image Uploads    -> Netlify Function (github-crud.ts) -> GitHub Commit     |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                 BUILD PIPELINE                                    |
|  1. npm run prebuild -> scripts/fetch-neon-data.ts                               |
|     (If DATABASE_URL set: queries Neon DB & overwrites src/data/*.ts)            |
|     (If DATABASE_URL missing: throws Error & fails build)                         |
|  2. node scripts/generate-sitemap.js -> Reads src/data/*.ts -> sitemap.xml        |
|  3. tsc -b && vite build -> Bundles React App + src/data/*.ts into dist/          |
|  4. node scripts/prerender-seo.js -> Reads src/data/*.ts -> HTML SSG Pages        |
|  5. node scripts/optimize-headers.js -> Generates dist/_headers                   |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                PRODUCTION RUNTIME                                 |
|  - Pre-rendered static HTML routes served with pre-baked JSON-LD SEO               |
|  - Client-side React hydrate/mount uses bundled src/data/*.ts data                |
|  - Live site renders ONLY what was generated into dist/ during build             |
+-----------------------------------------------------------------------------------+
```

### 3.2 Audit Findings on Data Flow Questions (Section 5.1)

1. **Canonical Source vs. Stale Snapshot:** `src/data/tracks.ts`, `albums.ts`, `articles.ts`, `playlists.ts`, `themeCollections.ts`, and `faqs.ts` are committed static snapshots. They serve as canonical fallback data during builds where Neon is inaccessible, but are intended to be generated build inputs when `fetch-neon-data.ts` runs.
2. **Remote Data Read & Overwrite Behavior:** `scripts/fetch-neon-data.ts` uses Drizzle ORM (`src/db/index.ts`) to query Neon PostgreSQL (`db.select().from(schema.tracks)`, etc.) and invokes code generation helpers (`src/admin/lib/generateTracks.ts`, `generateAlbums.ts`, etc.) to overwrite `src/data/*.ts` directly using `fs.writeFileSync`.
3. **Public Live Site vs. Committed Snapshot Drift:** If a track or album is added to Neon via the Admin Dashboard but no Netlify rebuild/re-deploy occurs (or if `fetch-neon-data.ts` fails), the live public site will NOT display the new record. The live site reflects only the state of `src/data/*.ts` at the moment `npm run build` executed during the last Netlify deployment.
4. **Admin Application Target:** The Admin Dashboard (`src/admin/`) performs dual writes:
   - Data mutations (Tracks, Albums, Articles, Playlists, FAQs) call `/.netlify/functions/neon-crud`, which writes directly to Neon PostgreSQL.
   - Binary image uploads call `/.netlify/functions/github-crud`, which commits files directly to the GitHub repository via Octokit (`@octokit/rest`).
   - Triggering a redeploy calls `/.netlify/functions/trigger-rebuild`, which sends a POST request to Netlify's build hook URL.
5. **Conflict Resolution (GitHub vs. Neon):** In production builds, **Neon wins** because `prebuild` executes `scripts/fetch-neon-data.ts` before `tsc` and `vite build`, unconditionally overwriting local `src/data/*.ts` files with Neon table rows. If a developer edits `src/data/tracks.ts` manually in Git without updating Neon, the manual Git changes are discarded during the production Netlify build.
6. **Build Reproducibility without Neon:** Builds are **not reproducible** without Neon or modifications to `package.json`. Running `npm run build` triggers `npm run prebuild`, which executes `npx tsx scripts/fetch-neon-data.ts`. Without `DATABASE_URL` set in environment variables, `src/db/index.ts` throws: `Error: No database connection string was provided to neon()`, exiting with code 1 and aborting the build.
7. **Failure Behavior of Neon Fetch:** If `fetch-neon-data.ts` fails (due to invalid credentials, network failure, or missing env vars), `process.exit(1)` is called immediately. Prior data in `src/data/*.ts` is preserved (not emptied), but the build step fails entirely.

---

## 4. Current Catalog Inventory

Below is the complete machine-verifiable inventory of all 24 tracks and 3 albums committed in `src/data/tracks.ts` and `src/data/albums.ts`.

### 4.1 Committed Album Inventory

| ID | Slug | Title | Release Date | Tracks | Duration | UPC | Status | Cover Image Path |
|---|---|---|---|---:|---|---|---|---|
| 1 | `the-blooms-house-volume-1` | The Bloom's House: Volume 1 | 2026-05-29T00:00:00.000Z | 10 | 20:32 | `5063959503706` | coming-soon | `/images/The-Blooms-House-volume-1-Aly-Bouchnak.webp` |
| 2 | `the-blooms-house-classics-party` | The Bloom's House: Party Classics | 2026-04-24T00:00:00.000Z | 6 | 13:47 | `5063941237718` | available | `/images/The-Blooms-House-Party-Classics-Aly-Bouchnak.webp` |
| 3 | `tuned-for-dreams` | Tuned for Dreams | 2026-01-09T00:00:00.000Z | 8 | 25:03 | `5063893028990` | available | `/images/tuned-for-dreams-cover.webp` |

### 4.2 Committed Track Inventory

| ID | Slug | Title | Release Date | Album Association | Duration | ISRC | UPC | Cover Image Path |
|---|---|---|---|---|---|---|---|---|
| 1 | `five-little-monkeys-jungle-party` | Five Little Monkeys (Jungle Party) | 2026-03-20 | Party Classics | 2:25 | `GX8LD2671883` | `5063925856317` | `/images/Five-little-monkeys-jumping-on-the-bed.webp` |
| 2 | `pet-pop-animal-song` | Pet-Pop \| The Animal Song | 2025-12-19 | Volume 1 | 2:10 | `GXHZG2515365` | `5063863307490` | `/images/pet-pop-animal-song-cover.webp` |
| 3 | `boom-teka-boom` | Boom Teka Boom (Wake Up Song) | 2026-01-30 | Volume 1 | 2:09 | `GXJ2E2565871` | `5063893188977` | `/images/boom-teka-boom-cover.webp` |
| 4 | `old-macdonald-farm-party` | Old MacDonald Had a Farm (Farm Party) | 2026-03-06 | Party Classics | 2:14 | `GX8KD2658865` | `5063925085663` | `/images/Old-McDonald-had-a-farm.webp` |
| 5 | `the-wise-mice` | The Wise Mice (Memory Game) | 2026-02-11 | Volume 1 | 2:20 | `GX89G2624756` | `5063907926106` | `/images/the-wise-mice-cover.webp` |
| 6 | `the-yummy-spoon` | The Yummy Spoon (Open Wide) | 2026-03-11 | Volume 1 | 1:41 | `GX89G2661676` | `5063906910496` | `/images/the-yummy-spoon-cover.webp` |
| 7 | `happy-party-edition` | If You're Happy and You Know It (Party Edition) | 2026-04-10 | Party Classics | 2:33 | `GX8LD2681741` | `5063925895088` | `/images/If-you-happy-and-you-know-it.webp` |
| 8 | `nanny-papa` | Nanny & Papa (Funny Bunny Family) | 2026-02-27 | Volume 1 | 2:34 | `GXBDS2573588` | `5063907265434` | `/images/nanny-and-papa-cover.webp` |
| 9 | `alphabet-song` | The Alphabet Song | 2026-04-15 | Party Classics | 2:55 | `GX8LD2663207` | `5063941576312` | `/images/The-Alphabet-Song--Aly-Bouchnak.webp` |
| 10 | `duckie-song` | The Duckie Song | 2026-05-01 | Volume 1 | 2:32 | `GX8LD2660078` | `5063941614571` | `/images/The-Duckie-Song-Aly-Bouchnak.webp` |
| 11 | `zakzooka-the-bear` | Zakzooka The Bear | 2026-05-13 | Volume 1 | 2:21 | `GX8LD2691082` | `5063941025018` | `/images/Zakzooka-The-Bear--Aly-Bouchnak.webp` |
| 12 | `safe-container-calm-bedtime` | The Safe Container \| Calm Bedtime Routine | 2026-01-09 | Tuned for Dreams | 2:44 | `GXJ2E2568126` | `5063893028990` | `/images/The-Safe-Container.webp` |
| 13 | `pendulum-rocking-lullaby` | The Pendulum \| Rocking Lullaby for Baby | 2026-01-09 | Tuned for Dreams | 2:50 | `GXJ2E2572277` | `5063893028990` | `/images/The-Pendulum.webp` |
| 14 | `sacred-shush-baby-shusher` | The Sacred Shush \| Baby Shusher Sound | 2026-01-09 | Tuned for Dreams | 2:45 | `GXJ2E2509998` | `5063893028990` | `/images/The-Sacred-Shush.webp` |
| 15 | `ancient-tongue-deep-sleep-humming` | The Ancient Tongue \| Deep Sleep Humming | 2026-01-09 | Tuned for Dreams | 3:52 | `GXJ2E2555627` | `5063893028990` | `/images/The-Ancient-Tongue.webp` |
| 16 | `infinite-loop-continuous-sleep-aid` | The Infinite Loop \| Continuous Sleep Aid | 2026-01-09 | Tuned for Dreams | 3:32 | `GXJ2E2577222` | `5063893028990` | `/images/The-Infinite-Loop.webp` |
| 17 | `protective-shadow-night-drone` | The Protective Shadow \| Night Drone for Sleep | 2026-01-09 | Tuned for Dreams | 2:45 | `GXJ2E2505077` | `5063893028990` | `/images/The-Protective-Shadow.webp` |
| 18 | `liquid-room-brown-noise-womb` | The Liquid Room \| Brown Noise Womb Sound | 2026-01-09 | Tuned for Dreams | 3:53 | `GXJ2E2518383` | `5063893028990` | `/images/The-Liquid-Room.webp` |
| 19 | `dimming-light-soft-sleepy-music` | The Dimming Light \| Soft Sleepy Music | 2026-01-09 | Tuned for Dreams | 2:42 | `GXJ2E2542577` | `5063893028990` | `/images/The-Dimming-Light.webp` |
| 20 | `the-funny-bunny-jump` | The Funny Bunny Jump (Freeze Dance) | 2026-04-03 | Volume 1 | 1:50 | `GX89G2614392` | `5063907299958` | `/images/the-funny-bunny-jump-cover.webp` |
| 21 | `wheels-on-the-bus-party-ride` | The Wheels on the Bus (Party Ride) | 2026-03-27 | Party Classics | 2:19 | `GX8LD2630428` | `5063907564377` | `/images/The-Wheels-on-the-Bus--Party-Ride.webp` |
| 22 | `body-party-head-shoulders` | The Body Party (Head & Shoulders) | 2026-04-24 | Party Classics | 2:10 | `GX8LD2631231` | `5063941237718` | `/images/head-shoulders-knees-and-toes.webp` |
| 23 | `mary-had-a-little-lamb-school-party` | Mary Had a Little Lamb (School Party) | 2026-02-27 | Party Classics | 2:06 | `GX8KD2657271` | `5063925242516` | `/images/mary-little-lamb-school-party-cover.webp` |
| 24 | `brave-hello` | Brave Hello | 2026-05-22 | Volume 1 | 2:15 | `GX38U2681607` | `5063958741116` | `/images/Brave-Hello--Aly-Bouchnak-Cover.webp` |

---

## 5. Known-Release-to-Repository Reconciliation Matrix

Reconciliation of the 12 items in Mandate Chronology Baseline vs. current repository data state:

| Seq | Target Release / Recording Title | Release Date | Expected ISRC / MBID | Repository Track Record Status | Repository Artwork Status | Inconsistencies & Required Action |
|---:|---|---:|---|---|---|---|
| 1 | Hobby The Bunny | 10 Jun 2026 | `GX38U2666437` | **ABSENT** from `src/data/tracks.ts` | `public/images/Hobby-The-Bunny-Aly-Bouchnak.webp` present (3000x3000, 212 KB) | **Record Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 2 | Boss Bath | 26 Jun 2026 | `GX38U2660781` | **ABSENT** from `src/data/tracks.ts` | `public/images/Boss-Bath-Aly-Bouchnak.webp` present (2048x2048, 241 KB) | **Record Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 3 | Bock Bock Chicken | 10 Jul 2026 | `GX5MY2662913` | **ABSENT** from `src/data/tracks.ts` (Only referenced in `Breadcrumbs.tsx`) | `public/images/bock-bock-chicken-cover.webp` present (500x500, 19 KB) | **Record Absent.** Artwork low-res (500x500). `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 4 | The Babble Beat | 15 Jul 2026 | `GX5MX2639207` | **ABSENT** from `src/data/tracks.ts` | `public/images/The-Babble-Beat-Aly-Bouchnak.webp` present (3000x3000, 241 KB) | **Record Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 5 | Cool Gang (Big W Vibes) | 31 Jul 2026 | `GXBDS2684603` | **ABSENT** from `src/data/tracks.ts` | **ABSENT** from `public/images/` | **Record & Artwork Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 6 | My Little Love | 14 Aug 2026 | `GX5MY2603036` | **ABSENT** from `src/data/tracks.ts` | **ABSENT** from `public/images/` | **Record & Artwork Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 7 | Who Is Daddy's Favorite? | 28 Aug 2026 | `GX5MY2685965` | **ABSENT** from `src/data/tracks.ts` | **ABSENT** from `public/images/` | **Record & Artwork Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 8 | Billy Boy | 11 Sep 2026 | `GXF972681613` | **ABSENT** from `src/data/tracks.ts` | **ABSENT** from `public/images/` | **Record & Artwork Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 9 | Silly Goodbye Dance (See You Later Alligator) | 25 Sep 2026 | ISRC unverified | **ABSENT** from `src/data/tracks.ts` | **ABSENT** from `public/images/` | **Record, Artwork & ISRC Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 10 | Llama (Drama in Pajamas) | 9 Oct 2026 | ISRC unverified | **ABSENT** from `src/data/tracks.ts` | **ABSENT** from `public/images/` | **Record, Artwork & ISRC Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 11 | Layla's Coming | 15 Oct 2026 | `GXJ2E251404` | **ABSENT** from `src/data/tracks.ts` | **ABSENT** from `public/images/` | **Record & Artwork Absent.** `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |
| 12 | The Bloom's House: Volume 2 | 23 Oct 2026 | MBID `70f43dc2-1eb3-4cf4-9b9f-a5c775c6ffe6` | **ABSENT** from `src/data/albums.ts` | `public/images/the-blooms-house-volume-2.webp` present (4096x4096, 322 KB) | **Album Entity Absent.** Orphaned artwork present. `AUTHORITATIVE METADATA REQUIRED` & `EDITORIAL PAYLOAD REQUIRED`. |

---

## 6. Volume 2 Asset Inventory

Audit of all asset files matching Volume 2 or post-Volume-1 recordings in `public/images/`:

| Exact File Path | File Type | Byte Size | Dimensions | Referenced in Source Code | Emitted to `dist/` | Naming Convention & Production Readiness Status |
|---|---|---|---|---|---|---|
| `public/images/the-blooms-house-volume-2.webp` | WebP | 322,104 B | 4096x4096 | **NO** (Orphaned) | YES (Static copy) | Production ready high-res asset (4K). Filename matches kebab-case album slug convention. |
| `public/images/Hobby-The-Bunny-Aly-Bouchnak.webp` | WebP | 212,082 B | 3000x3000 | **NO** (Orphaned) | YES (Static copy) | Production ready (3K). Uses Pascal-Kebab hybrid naming (`Hobby-The-Bunny-Aly-Bouchnak.webp`). |
| `public/images/Boss-Bath-Aly-Bouchnak.webp` | WebP | 241,396 B | 2048x2048 | **NO** (Orphaned) | YES (Static copy) | Production ready (2K). Uses Pascal-Kebab hybrid naming (`Boss-Bath-Aly-Bouchnak.webp`). |
| `public/images/The-Babble-Beat-Aly-Bouchnak.webp` | WebP | 241,962 B | 3000x3000 | **NO** (Orphaned) | YES (Static copy) | Production ready (3K). Uses Pascal-Kebab hybrid naming (`The-Babble-Beat-Aly-Bouchnak.webp`). |
| `public/images/bock-bock-chicken-cover.webp` | WebP | 19,210 B | 500x500 | YES (`Breadcrumbs.tsx`) | YES (Static copy) | Low resolution (500x500). Standard album cover resolution throughout repo is 2048x2048 to 3000x3000. Higher resolution asset required. |
| `public/images/Brave-Hello--Aly-Bouchnak-Cover.webp` | WebP | — | 3000x3000 | YES (`tracks.ts`) | YES (Static copy) | Existing Volume 1 track asset. Double hyphen in filename (`--`). |

---

## 7. Complete Affected-Surface Matrix

Adding *The Bloom's House: Volume 2* and its constituent 11 tracks affects 15 distinct surfaces across the web application:

| Surface / Feature Area | Component File Path | Propagation Mechanism | Required Maintenance Action | Severity |
|---|---|---|---|---|
| Homepage New Releases | `src/sections/NewReleases.tsx` | **Automatic** | Calls `getAllTracks()`, filters by `status !== 'coming-soon'`, sorts by `releaseDate` desc, slices top 6. | Low |
| Homepage Latest Albums | `src/sections/LatestAlbums.tsx` | **Automatic** | Calls `getAllAlbums()`, sorts by `releaseDate` desc. | Low |
| Discography Page | `src/pages/Discography.tsx` | **Automatic / Semi-Manual** | Renders tabbed views of tracks and albums. Evaluates `release.status` dynamically using date bounds. | Medium |
| Dynamic Track Page | `src/pages/DynamicTrackPage.tsx` | **Automatic via Data** | Routes `/track/:slug`. Loads via `getTrackBySlug(slug)`. Requires track record in `tracks.ts`. | **Critical** |
| Dynamic Album Page | `src/pages/DynamicAlbumPage.tsx` | **Automatic via Data** | Routes `/album/:slug`. Loads via `getAlbumBySlug(slug)`. Requires album record in `albums.ts`. | **Critical** |
| Playlists & Filtering | `src/data/playlists.ts`, `src/pages/Playlists.tsx` | **Manually Maintained** | Playlists reference track lists by array of track IDs (`trackIds: number[]`). Volume 2 tracks will not appear in playlists unless updated. | Medium |
| Theme Collections | `src/data/themeCollections.ts`, `src/pages/ThemeCollections.tsx` | **Manually Maintained** | Theme collections reference `trackIds: number[]`. Must manually append Volume 2 track IDs. | Medium |
| Related Tracks / Albums | `src/data/tracks.ts`, `src/data/albums.ts` | **Manually Maintained** | Relies on `relatedTracks: number[]` and `relatedAlbums` objects. Needs explicit ID linkages. | Medium |
| Breadcrumb Navigation | `src/components/Breadcrumbs.tsx` | **Manually Maintained** | Static slug-to-label mapping dictionary in `Breadcrumbs.tsx` lines 34–80. Must manually register new slugs. | High |
| Articles & Press | `src/data/articles.ts` | **Manually Maintained** | Article detail pages reference related tracks/albums by slug or ID. | Low |
| XML Sitemap | `scripts/generate-sitemap.js` | **Generated during Build** | Regex parses `src/data/tracks.ts` and `albums.ts` to output `public/sitemap.xml`. | High |
| News Sitemap | `scripts/generate-sitemap.js` | **Generated during Build** | Filters items released within last 48 hours for `public/news-sitemap.xml`. | Medium |
| Prerender Routes List | `scripts/prerender-seo.js` | **Generated during Build** | Regex parses `src/data/*.ts` to dynamically construct SSG route list for Chromium prerendering. | **Critical** |
| PWA Caching Behavior | `vite.config.ts` | **Generated during Build** | `vite-plugin-pwa` precaches SSG static HTML outputs into service worker manifest. | Medium |
| Schema.org JSON-LD | `src/components/SEO.tsx`, `scripts/prerender-seo.js` | **Generated during Build & Runtime** | Reads `trackSchema` and album structured metadata to inject schema microdata. | High |

---

## 8. Catalog-Integrity Findings with Severity

### Finding 8.1 (Critical): DB-to-Git Pipeline Lockout and Build Failure in Credential-Free Environments
- **Observed Fact:** `npm run build` invokes `npm run prebuild`, which executes `npx tsx scripts/fetch-neon-data.ts`. `src/db/index.ts` instantiates Neon using `process.env.DATABASE_URL`. When `DATABASE_URL` is absent, the script throws an uncaught error and aborts the build process with exit code 1.
- **Impact:** Any CI runner, local development setup, or automated audit tool lacking Neon database credentials cannot execute `npm run build`.
- **Evidence:** Terminal log during build test: `Error: No database connection string was provided to neon()`.
- **Required Decision:** Maintainers must decide whether `fetch-neon-data.ts` should fail gracefully (falling back to committed `src/data/*.ts`) when `DATABASE_URL` is missing.

### Finding 8.2 (High): Missing Breadcrumbs Mapping Dictionary Entries
- **Observed Fact:** `src/components/Breadcrumbs.tsx` contains a hardcoded switch statement / lookup dictionary mapping route slugs to display titles. Lines 74 currently map `bock-bock-chicken`, but entries for *hobby-the-bunny*, *boss-bath*, *the-babble-beat*, *cool-gang*, *my-little-love*, *who-is-daddys-favorite*, *billy-boy*, *silly-goodbye-dance*, *llama-drama-in-pajamas*, *laylas-coming*, and *the-blooms-house-volume-2* are missing.
- **Impact:** Breadcrumbs on future track/album pages will fall back to raw unformatted slugs (e.g., "silly-goodbye-dance").
- **Evidence:** `src/components/Breadcrumbs.tsx` lines 34-80.

### Finding 8.3 (High): Schema.org `datePublished` Mismatch
- **Observed Fact:** In `src/data/tracks.ts`, top-level `releaseDate` uses full ISO string format with timezone (e.g. `"2026-04-03T00:00:00.000Z"`), whereas nested `trackSchema.datePublished` uses date-only format (`"2026-04-03"`). In `src/data/albums.ts`, `releaseDate` is `"2026-05-29T00:00:00.000Z"`, while the top-level `date` field says `"Jan 15, 2026"`.
- **Impact:** Search engines detect conflicting publication dates between HTML microdata and Schema.org JSON-LD, diminishing SEO trust.
- **Evidence:** `src/data/albums.ts` lines 38 & 109; `src/data/tracks.ts` lines 122 & 166.

### Finding 8.4 (Medium): Placeholder Streaming Platform URLs
- **Observed Fact:** Multiple committed tracks in `src/data/tracks.ts` contain placeholder URLs (e.g., `https://open.spotify.com/track/placeholder`, `https://music.apple.com/placeholder`).
- **Impact:** Users clicking streaming buttons on track detail pages encounter 404 pages on external platforms.
- **Evidence:** `src/data/tracks.ts` lines 205–207, 287–289, 461, 545, 629.

### Finding 8.5 (Medium): Low-Resolution Artwork for Bock Bock Chicken
- **Observed Fact:** The asset `public/images/bock-bock-chicken-cover.webp` is 500x500 pixels (19 KB), whereas all other single cover assets are 2048x2048 or 3000x3000 pixels.
- **Impact:** High-DPI screens and hero sections render pixelated cover art for *Bock Bock Chicken*.
- **Evidence:** `file public/images/bock-bock-chicken-cover.webp` -> `VP8 encoding, 500x500`.

---

## 9. Release-Status Logic Findings

Audit of `src/pages/Discography.tsx`, `src/sections/NewReleases.tsx`, `src/sections/LatestAlbums.tsx`, and `src/admin/lib/dateUtils.ts`:

1. **Timezone & Date Evaluation:** Date comparisons (e.g., `new Date(item.releaseDate) <= new Date()`) execute using the client runtime's local timezone. A track scheduled for release on `2026-08-28T00:00:00.000Z` will flip from `Upcoming` to `Released` at midnight local time rather than UTC midnight.
2. **Fourteen-Day Presave Window:** `src/admin/lib/dateUtils.ts` and `src/pages/Discography.tsx` calculate presave eligibility:
   ```ts
   const diffDays = Math.ceil((releaseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
   const isPreSave = diffDays > 0 && diffDays <= 14;
   ```
   If a release date is more than 14 days in the future, it is categorized as `Coming Soon` or `Upcoming` rather than `Pre-Save`.
3. **Card Interactivity for Upcoming Releases:** In `Discography.tsx` and `NewReleases.tsx`, cards for upcoming/unreleased tracks remain fully clickable and navigate to `/track/:slug`. However, if platform URLs are missing or set to `placeholder`, CTA buttons display disabled states or link to root streaming provider pages.
4. **Static Prerender vs. Runtime Recalculation:** Discography track statuses are evaluated **dynamically at runtime** inside React components using `new Date()`. Therefore, even if a page is prerendered during build, client-side hydration automatically updates status badges as time advances past release dates without requiring a site rebuild.
5. **Album vs. constituent Recording Status Mismatch:** An album entity in `albums.ts` has its own top-level `releaseDate` (e.g., 23 October 2026 for Volume 2). Individual tracks have their own `releaseDate` (e.g., 10 June 2026 for *Hobby The Bunny*). If an album status is marked `coming-soon`, its constituent tracks already released prior to October 23 remain marked as `available` / `Released` on their respective track pages.

---

## 10. SEO and Structured-Data Findings

1. **Sitemap Generation (`scripts/generate-sitemap.js`):** The sitemap generator parses `src/data/tracks.ts` and `albums.ts` using regular expressions. It extracts `slug` and `releaseDate` to build `<url>` nodes in `public/sitemap.xml`. If Volume 2 tracks are added to `tracks.ts`, they will be automatically detected and included in `sitemap.xml` during `npm run build`.
2. **Chromium Prerendering (`scripts/prerender-seo.js`):** The SSG script extracts all track and album slugs from `src/data/` files to compile a list of 44 static HTML pages. Each pre-rendered HTML file in `dist/` gets injected with unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, and Schema.org `MusicRecording` or `MusicAlbum` JSON-LD blocks.
3. **Structured Data Completeness:**
   - Track JSON-LD includes `@type: "MusicRecording"`, `name`, `isrcCode`, `duration` (in ISO 8601 format e.g. `PT2M12S`), `byArtist`, `inAlbum`, and `datePublished`.
   - Album JSON-LD includes `@type: "MusicAlbum"`, `name`, `numTracks`, `byArtist`, and `track` array items.
4. **Authority of `public/sitemap.xml`:** The committed `public/sitemap.xml` in Git is **not authoritative**; it is overwritten on every build execution by `node scripts/generate-sitemap.js`.

---

## 11. Performance, UX, and Accessibility Evidence

1. **Image Optimization (`src/components/OptimizedImage.tsx`):** The project uses Netlify Image CDN (`/.netlify/images?url=...`). Cover images rendered with `<OptimizedImage>` automatic resizing prevent oversized image payloads on mobile viewports.
2. **GSAP & ScrollTrigger Impact:** GSAP animation libraries are loaded in a separate vendor chunk (`dist/assets/gsap-DDlvirwQ.js`, 69.89 kB minified / 27.48 kB gzipped). ScrollTrigger instances are properly cleaned up in React `useEffect` hooks across section components.
3. **Accessibility & Motion Cues:** Buttons and interactive elements feature accessible labels and focus outlines. CSS styles honor `@media (prefers-reduced-motion: reduce)` by disabling aggressive transforms and bubbly floating keyframe animations.
4. **Uncommitted/Build Artifact Drift:** The build pipeline writes to `dist/`. `dist/` is listed in `.gitignore`, preventing built artifacts from contaminating Git source history.

---

## 12. Data-Model Pressure Points

Based on inspection of TypeScript interfaces in `src/data/tracks.ts` and `src/data/albums.ts`:

1. **Strict `bpm: number` Field:** `Track` interface requires `bpm: number`. For tracks where exact BPM is unconfirmed prior to release, setting `0` or dummy values creates false catalog metadata.
2. **Mandatory Streaming URLs:** `spotifyUrl`, `appleMusicUrl`, and `youtubeUrl` are non-optional string fields on `Track` and `Album` interfaces. Upcoming tracks prior to DSP distribution must use `placeholder` strings or valid presave links (`push.fm`).
3. **Single Cover Image vs. Album Context:** `Track` interface defines a single `coverImage: string`. It does not separate single/waterfall artwork from album-level artwork.
4. **Single Album Assignment:** `Track.album` and `Track.albumUrl` are single string fields. For tracks appearing on both single releases, waterfall compilations, and full volume albums, the data model supports only one primary album linkage.
5. **Absence of MusicBrainz Identifiers:** The current schema lacks fields for MusicBrainz recording MBID, release MBID, or release-group MBID (e.g. `70f43dc2-1eb3-4cf4-9b9f-a5c775c6ffe6`).

---

## 13. Test and Build Results

Validation commands were executed in an isolated, safe temporary directory (`/tmp/test-env`) to ensure zero mutation of repository state or external databases.

| Command Executed | Environment / Context | Exit Code | Result Summary | Key Log / Error Excerpt |
|---|---|---|---|---|
| `git rev-parse HEAD` | Primary Repo Root | 0 | Success | `7729ea094ac67a49cb962c4f41562d7bdaf1d0fe` |
| `git status` | Primary Repo Root | 0 | Clean | `nothing to commit, working tree clean` |
| `npm run lint` | Isolated `/tmp/test-env` | 1 | Failed (ESLint errors in pre-existing codebase) | 87 problems (82 errors, 5 warnings). Issues include `@typescript-eslint/no-explicit-any`, missing hook dependencies, and `no-case-declarations`. |
| `npx tsc -b` | Isolated `/tmp/test-env` | 0 | **SUCCESS** | Type checking passed cleanly with 0 TypeScript errors across the codebase. |
| `node --test --experimental-strip-types tests/*.ts src/data/*.test.ts` | Isolated `/tmp/test-env` | 1 | 16/17 Passed | Unit tests for `albums.test.ts` (7 tests) and `tracks.test.ts` (9 tests) **PASSED 100%**. `tests/security.test.ts` failed due to missing `.js` extension in ESM import (`../netlify/functions/utils/security`). |
| `npm run build` | Isolated `/tmp/test-env` (No `DATABASE_URL`) | 1 | Failed (Prebuild Neon guard) | `Error: No database connection string was provided to neon()`. Failed in `scripts/fetch-neon-data.ts`. |
| `node scripts/generate-sitemap.js && ./node_modules/.bin/tsc -b && ./node_modules/.bin/vite build && node scripts/prerender-seo.js && node scripts/optimize-headers.js` | Isolated `/tmp/test-env` (Bypassing `prebuild`) | 0 | **SUCCESS** | Generated sitemap (56 URLs), compiled TS, built Vite bundle (2,553 modules), prerendered 44 static HTML pages, and optimized Netlify `_headers`. |

---

## 14. Exact Blockers and Unresolved Facts

The following factual and editorial payload items are missing and must be provided by the Chair / Issuing Advisor prior to implementing Mandate 02:

### 14.1 Missing Factual Information (`AUTHORITATIVE METADATA REQUIRED`)
1. **ISRC for Track #8:** *Silly Goodbye Dance (See You Later Alligator)* — `AUTHORITATIVE METADATA REQUIRED`.
2. **ISRC for Track #9:** *Llama (Drama in Pajamas)* — `AUTHORITATIVE METADATA REQUIRED`.
3. **Confirmed Release Dates:** Exact publication timestamps (`releaseDate`) for Tracks #7–#11 (Who Is Daddy's Favorite?, Billy Boy, Silly Goodbye Dance, Llama, Layla's Coming) — `AUTHORITATIVE METADATA REQUIRED`.
4. **BPM Values:** Exact tempo (BPM) for Tracks #1–#11 of Volume 2 — `AUTHORITATIVE METADATA REQUIRED`.
5. **Streaming Platform URLs:** Spotify, Apple Music, YouTube, Amazon Music, and Push.fm URLs for Volume 2 tracks and the Volume 2 album entity — `AUTHORITATIVE METADATA REQUIRED`.
6. **High-Res Cover Artwork Assets:** Single cover images (2048x2048+ WebP) for *Cool Gang*, *My Little Love*, *Who Is Daddy's Favorite?*, *Billy Boy*, *Silly Goodbye Dance*, *Llama*, *Layla's Coming*, and a high-res replacement for *Bock Bock Chicken* — `AUTHORITATIVE METADATA REQUIRED`.

### 14.2 Missing Editorial Content (`EDITORIAL PAYLOAD REQUIRED`)
1. **Volume 2 Album Editorial:** Subtitle, main description, artist note, science framework text, and educational benefits list for *The Bloom's House: Volume 2* album page — `EDITORIAL PAYLOAD REQUIRED`.
2. **Track Descriptions & Notes:** Subtitles, full descriptions, lyrics, educational benefits, and artist notes for all 11 constituent Volume 2 tracks — `EDITORIAL PAYLOAD REQUIRED`.
3. **SEO Metadata Copy:** Tailored SEO titles, meta descriptions, and keywords for Volume 2 album and track dynamic pages — `EDITORIAL PAYLOAD REQUIRED`.

---

## 15. Recommended Decomposition for Subsequent Implementation Mandate

To ensure a flawless publication without build breaks or SEO regression, implementation should be executed in three sequential sub-phases under the future implementation mandate:

### Phase A: Asset Ingestion and Metadata Schema Preparation
1. Add missing single cover artwork files (WebP, minimum 2048x2048) to `public/images/`.
2. Replace low-res `public/images/bock-bock-chicken-cover.webp` with high-res artwork.
3. Update `src/components/Breadcrumbs.tsx` to register all missing route slug mappings.

### Phase B: Catalog Data Payload Integration
1. Append the 11 Volume 2 track records to `src/data/tracks.ts` with complete ISRCs, BPMs, lyrics, educational benefits, and SEO schema.
2. Append *The Bloom's House: Volume 2* album record to `src/data/albums.ts` with `trackIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]` (or assigned ID range) and full educational framework.
3. Update related tracks, playlists (`src/data/playlists.ts`), and theme collections (`src/data/themeCollections.ts`) to integrate Volume 2 track IDs.
4. Seed or sync the updated catalog into the Neon PostgreSQL database table records to ensure production Netlify `prebuild` steps do not overwrite the new release data.

### Phase C: Verification and Build Validation
1. Run `npx tsc -b` to verify TypeScript type safety.
2. Execute node unit tests (`albums.test.ts`, `tracks.test.ts`).
3. Execute sitemap generation (`node scripts/generate-sitemap.js`) and inspect generated routes in `public/sitemap.xml`.
4. Run full SSG prerender (`node scripts/prerender-seo.js`) and confirm static HTML page output for `/album/the-blooms-house-volume-2` and all 11 track pages in `dist/`.

---

## 16. Evidence Appendix

### Appendix A: Prebuild Script Ingestion Trace (`scripts/fetch-neon-data.ts`)
```ts
// Excerpt from scripts/fetch-neon-data.ts lines 11-20
const tracks = await db.select().from(schema.tracks);
fs.writeFileSync(resolve(process.cwd(), 'src/data/tracks.ts'), generateTracksFile(tracks as any));

const albums = await db.select().from(schema.albums);
fs.writeFileSync(resolve(process.cwd(), 'src/data/albums.ts'), generateAlbumsFile(albums as any));
```

### Appendix B: Neon Database Connection Instantiation (`src/db/index.ts`)
```ts
// Excerpt from src/db/index.ts lines 1-7
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

### Appendix C: Volume 2 Image Asset Proof (`public/images/the-blooms-house-volume-2.webp`)
```bash
$ file public/images/the-blooms-house-volume-2.webp
public/images/the-blooms-house-volume-2.webp: RIFF (little-endian) data, Web/P image, VP8 encoding, 4096x4096, Scaling: [none]x[none], YUV color, decoders should clamp

$ ls -lh public/images/the-blooms-house-volume-2.webp
-rw-rw-r-- 1 jules jules 315K Aug 26 21:26 public/images/the-blooms-house-volume-2.webp
```

### Appendix D: Security Unit Test Import Deficiency (`tests/security.test.ts`)
```ts
// Line 1 of tests/security.test.ts:
import { secureCompare } from '../netlify/functions/utils/security';
// Note: Missing '.js' extension required for Node.js ESM execution (--experimental-strip-types)
// Correct ESM import path: '../netlify/functions/utils/security.js'
```

---
*End of Report AB-WEB-V2-REC-01. No source code, database, deployment, or external service state was modified during this audit.*
