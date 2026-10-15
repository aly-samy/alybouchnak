# Production deployment — 12 October 2026

Website: https://alybouchnak.com

Netlify production deploy: `6accd9a9f2adbf59d4776deb`

Deployment logs: https://app.netlify.com/projects/alybouchnak/deploys/6accd9a9f2adbf59d4776deb

## Completed

- Backed up all 11 public Neon tables before mutations, including subscriber and email data. Private backups are in `D:\Unfict-web\deployment-private`; never commit or publicly share them.
- Atomically synchronized tracks and albums by slug, preserving existing IDs, references, and all other tables. Neon now contains 36 tracks and 19 album/EP records; the public catalog represents 31 release groups including 12 singles.
- Merged current CMS content, retaining nine articles, 44 FAQs, three playlists, and four theme collections.
- Configured `DATABASE_URL`, new `ADMIN_PASSWORD`, and migrated the existing GitHub token to `GITHUB_TOKEN`. Removed obsolete `VITE_ADMIN_PASSWORD` and `VITE_GITHUB_TOKEN` from Netlify. The plan does not allow narrow scopes, so Netlify variables use all scopes; Vite's explicit public allowlist prevents these credentials from entering browser bundles.
- Fixed reconciliation of partially populated CMS recordings and missing artwork. Existing recording IDs remain stable.
- Verified the build and all 32 automated tests before deployment. Scanned staged source and deployed assets against known credentials: zero matches.
- Deployed static pages and Netlify functions together, first as a preview, then production.
- Production verification passed 27 checks: discovery resources, sitemap endpoints, custom 404, protected APIs, actual browser admin login, full lyrics, accessible newsletter controls, and desktop/mobile page rendering. No page JavaScript errors, broken images, or horizontal overflow were observed on checked pages.
- Lighthouse 13.5.0 on the live domain scored 1.0 on `agent-accessibility-tree`, `button-name`, `select-name`, `llms-txt`, and `ard-schema`, with no warnings.

## GitHub publication pending explicit authorization

The source changes are committed locally as `7f2d11f`. Newer remote artwork and newsletter additions were merged without conflicts into local commit `e48100e`.

Automatic approval review rejected pushing the default `master` branch because deployment authorization did not explicitly include this remote mutation. No GitHub push was made. The existing GitHub/Netlify rebuild path still points to the earlier source; triggering it before publishing the prepared commits can replace the deployed fixes. Publish the reviewed source after explicit user authorization.

## Retained limitations

The 2025 Bock Bock Chicken recording still lacks approved lyrics. The supplied lyrics apply only to the 2026 recording. The prior audit documents existing lint cleanup and unavailable Genius access.

Private verification artifacts: `verification-preview.json`, `verification-production.json`, and `lighthouse-production.json` under the deployment-private folder. They are excluded from the public site and repository.
