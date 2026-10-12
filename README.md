# Aly Bouchnak — official artist website

React, TypeScript and Vite website for alybouchnak.com, hosted on Netlify with a Neon-backed editorial dashboard.

## Local development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

The public website runs without database credentials using the checked-in content snapshot. Netlify functions and administrative login require the configured server environment.

## Build and verify

```sh
npm run build
npm test
npm run preview
```

When `DATABASE_URL` is configured, prebuild refreshes editorial content from Neon, reconciles it with the verified MusicBrainz snapshot and artist-approved content, then generates lightweight card summaries. The build writes crawlable HTML, JSON-LD, sitemaps, Markdown and JSON discovery resources to `dist`.

## Update the catalog

- Verified release and recording metadata: `src/data/musicbrainz-catalog.json`.
- Artist-approved lyrics and descriptions: `src/data/artist-catalog.ts`.
- Artist entity information: `src/data/artist.ts`.
- The generated `tracks.ts`, `albums.ts` and `catalog-summaries.ts` are reconciled during prebuild.

```sh
npm run catalog:refresh
npm run build
npm test
```

The refresh command reads public MusicBrainz data and reports missing artwork. It preserves known platform links and covers. Review future releases and any gaps before deployment. Artist overrides take precedence over corresponding Neon fields; this does not synchronize new catalog entries into the live CMS database.

## Server-only configuration

Configure `ADMIN_PASSWORD` in Netlify for admin login and API authorization. Use `GITHUB_TOKEN` for GitHub write features. Never place passwords or private keys in browser-exposed `VITE_` variables. Browser exposure is limited to intentionally public values.

See [the audit and deployment notes](docs/WEBSITE-AUDIT-2026-10-12.md) for the required credential migration, verification details and remaining content gaps.
