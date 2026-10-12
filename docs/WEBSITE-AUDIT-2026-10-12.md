# Aly Bouchnak website audit — October 12, 2026

The local website was updated against the public MusicBrainz catalog and Apple Music metadata. Artist-supplied lyrics were added separately so a Neon rebuild cannot erase them. The existing visual identity and public release URLs were retained.

## Catalog

- 31 official release groups: 4 albums, 15 EPs and 12 singles.
- 36 recording pages. MusicBrainz contains 37 recording references, including two references with the same Body Party ISRC; both album references use the same page.
- All album and EP track lists preserve MusicBrainz ordering and counts.
- Both Bock Bock Chicken recordings have separate pages and ISRCs. The supplied lyrics apply only to the 2026 recording, GX5MY2662913.
- Lyrics and descriptive metadata were added for 11 recordings from the artist's messages. The artist also supplied GXFHP2678212 for Silly Goodbye Dance and GXFHP2629495 for Llama.
- Cover artwork was recovered from the Cover Art Archive, existing site assets and the supplied Songs Project directory. No release artwork is currently missing.
- Layla's Coming (October 15) and Volume 2 (October 23) are upcoming as of the audit date.
- The original 2025 Bock Bock Chicken lyric text remains unavailable. Its page preserves verified metadata without inventing lyrics. Unprovided BPM and age recommendations remain unset.

The three source layers are deliberate:

1. Neon supplies the existing editorial content when DATABASE_URL is configured.
2. `src/data/musicbrainz-catalog.json` supplies verified releases, recording identifiers, dates, artwork and ordered track membership.
3. `src/data/artist-catalog.ts` supplies the artist-approved lyrics, descriptions, routine labels and missing ISRCs.

The snapshot and artist file are applied after Neon generates its data modules. Changes to those authoritative fields should be made in the corresponding source file. This update does not insert the new releases into the live Neon database.

## Performance and readability

- Card views use a small catalog-summary module instead of downloading full lyrics, notes and schemas.
- The PWA precaches the application shell, then caches additional chunks when visited. The audit build's initial all-chunk precache was about 1.6 MiB; the revised shell is about 632 KiB.
- A mismatched Cloudflare image preload was removed from the Netlify-hosted app.
- Images use direct local assets in development and fall back to those assets if the Netlify Image CDN fails.
- Homepage card animation no longer creates horizontal scrolling. Reduced-motion preferences are respected by the page and section animation effects.
- Array sorting no longer mutates the shared release data. Discography item keys are stable and separate album IDs from recording IDs.
- Release type comes from MusicBrainz instead of being guessed from track count.
- Full lyrics are displayed, empty age badges are omitted, and future releases are labeled with a release date rather than claiming they are released.
- Spotify embeds preserve whether a verified link points to an album or track.

## SEO and agent discovery

- 84 indexable pages are generated with visible HTML. Release titles containing apostrophes and long content are read from actual data modules, replacing the fixed-window regex parser.
- Every generated page has its own canonical, social metadata and parseable JSON-LD.
- Album schema and static HTML contain the full ordered track list. Artist identity consistently uses Person and verified ISNI/IPI metadata.
- Sitemaps reference built routes and do not fabricate future last-modified dates. A sitemap index is generated.
- Missing routes return a custom 404 on Netlify; administrative and subscription-management routes retain their SPA behavior and are marked noindex.
- `llms.txt` is Markdown with an H1, summary, canonical links and source links.
- Both `/.well-known/ard.json` and compatibility `ai-catalog.json` paths contain actual JSON manifests. They describe a read-only resource directory at `/music-discovery.json`, with structured artist, album and recording data. `/music-catalog.json` provides the Schema.org graph.
- Newsletter selects have associated labels; the icon-only footer submit button has an accessible name. Forms have distinct names for agent and assistive-technology navigation.

The unscored WebMCP notices in the supplied report are not failed audits. This music website does not claim to expose MCP servers or autonomous form-submission tools.

## Security and deployment requirements

The old admin password was referenced through `VITE_ADMIN_PASSWORD` in browser code. Vite replaces exposed environment variables in the client bundle. Login now validates a submitted credential against server-only `ADMIN_PASSWORD` in a Netlify function.

Before deploying:

1. Set a new, rotated `ADMIN_PASSWORD` in Netlify's server environment. Remove `VITE_ADMIN_PASSWORD`.
2. If GitHub write features are used, configure server-only `GITHUB_TOKEN`; remove `VITE_GITHUB_TOKEN`. Existing owner/repository names may remain public.
3. Keep `DATABASE_URL` server/build-only. Existing Mailgun and rebuild settings remain required by their respective functions.
4. Deploy the updated source and Netlify functions together. Verify admin login and a known and unknown release URL on the hosted site.

Administrative Neon CRUD reads and mutations, including subscriber records, now require authorization. GitHub writes and subscriber administrative updates or deletion by ID also require authorization. Public subscription and email-only opt-out retain their existing behavior. Browser environment exposure is explicitly limited to intended public values. Stored rich text is sanitized before rendering. Secret scanning is enabled, and the CSP allows the site's intended integrations without unsafe-eval.

The unused legacy Spotify client-credentials helper cannot embed a secret anymore. A server proxy is required if that helper is used in a future feature.

## Verification

- Production TypeScript/Vite build passed using the checked-in content snapshot.
- All 32 automated catalog, SEO and admin-authentication tests passed, including repeated prerendering and subscriber API authorization.
- Desktop (1440 px) and mobile (390 px) checks passed on the homepage, discography, Hobby The Bunny EP and Silly Goodbye Dance recording. No broken images, horizontal scrolling or page JavaScript errors were observed. Full lyrics, mobile navigation, SPA canonical updates, newsletter accessible names and HTML sanitization were checked.
- Lighthouse 13.5.0 passed all five targeted checks with score 1.0: accessibility tree, button names, select labels, llms.txt and ARD manifest validation. See `validation-2026-10-12.json` for the compact results.
- Lint comparison found 82 existing errors in the original checkout and 82 in the updated source, with no additional errors. Existing type/style and React lint cleanup remains separate from the verified functional fixes.
- Live Neon, Mailgun, GitHub mutations and hosted Netlify login were not exercised. No source was pushed to GitHub and no production deployment was performed.

## Sources

- [MusicBrainz artist and release catalog](https://musicbrainz.org/artist/aaec4457-1558-4400-a316-72e14f698922)
- [Apple Music artist](https://music.apple.com/us/artist/aly-bouchnak/1840274949)
- [Cover Art Archive](https://coverartarchive.org/)
- Artist messages and the supplied local Songs Project directory. Genius could not be fetched, so no lyrics or descriptions were inferred from inaccessible pages.
- [Vite environment variable exposure](https://vite.dev/guide/env-and-mode)
- [Netlify redirect shadowing and 404 behavior](https://docs.netlify.com/manage/routing/redirects/redirect-options/)
- [llms.txt format](https://llmstxt.org/)
- [ARD specification](https://agenticresourcediscovery.org/spec/)
