# After integration and rollback record

13 October 2026. **Applied to local production source and staged locally. Not committed, pushed or deployed.**

## What changed

- The reviewed After content is now in all 14 active root product HTML files. Original CSS, image attributes, section order, product URLs, identities and retailer purchase parameters are preserved.
- Preview title prefixes, noindex directives and yellow-change markers were removed from those production pages.
- Product and WebPage descriptions now use the visible introduction. FAQPage questions and answers are generated from the actual visible FAQ: 59 answers across 14 products. Original organization, image, breadcrumb and identity records are retained.
- Metadata descriptions and social-sharing descriptions follow the visible introduction. Canonical URLs remain on `https://celdyque.com/`.
- The 14 product sitemap modification dates are 2026-10-13. Robots rules continue to permit Googlebot, Bingbot, OAI-SearchBot and PerplexityBot.
- Site search now uses the same factual names, format and size descriptions as the After preview. Old promotional subtitles were removed. The JavaScript URL and service-worker cache version were updated; other pages received only that JavaScript URL change.
- SEO validation now checks product FAQ parity on every product page, not only the shared FAQ page. Product descriptions must match the visible introduction.
- Content provenance and preview generators keep reading the original imported Git revision, so rebuilding does not silently turn After into Before. Windows line endings are checked against the recorded original hash.

Shared Home, About, catalog card text and common FAQ content have not been editorially rewritten in this pass. New guides remain draft materials.

## Rollback

Original Git tag: `before-content-after-2026-10-13`.

Original commit: `a150659d59365f91bcd3833816bb24130ccfe5ab`.

Independent backup: `C:/Users/USER/Documents/celdyque/CELDYQUE-backups/before-after-20261013-144032/before.zip`.

The ZIP and adjacent manifest cover 29 changed files: 26 production files and three matching validation files. Per-file Before and After SHA-256 values are also recorded in `docs/before-after-backup.json`. Backup files are outside the publishable site.

From the repository root, check whether an exact restore is possible:

```sh
python -X utf8 -B scripts/restore_before_content.py
```

To restore Before when requested:

```sh
python -X utf8 -B scripts/restore_before_content.py --apply
```

The restore script verifies the whole ZIP and all current file hashes before writing. If later edits exist, it stops instead of overwriting them. It changes only listed files, does not delete other work, and does not commit, push or deploy. A real restore was executed successfully in a temporary copy and every restored file matched its Before hash. The working website source remains After.

If After has already been published, restoring source must be followed by a fresh build and deployment to change the live site. Existing local `site-dist` output must also be regenerated; restoring source alone does not replace an already staged artifact. The Git tag provides an independent original revision if the ZIP is unavailable.

## Validation results

- SEO checks passed for all 21 sitemap pages, 14 active products, 64 sitemap image references and one video.
- All 59 product FAQ answers match visible content and JSON-LD; all 14 Product descriptions match the visible introductions.
- HTMLHint: 28 HTML files, zero errors.
- Python regression suite: 28 tests passed.
- JavaScript regression suite: 28 tests passed.
- Content-package check passed: 14 records, five guides, 77 editorial answers and 29 reading-preview pages; historic evidence hashes remain verifiable.
- The actual deployment staging directory contains the same production files as the source and excludes `preview`, `content`, `docs`, scripts and backups.
- Browser review of staged pages: desktop Volufiline FAQ disclosure, mobile PDRN cream layout, menu, search and use-section navigation. Search displays the updated product descriptions. No preview markers remain on production pages.
- Existing automated Playwright browser suite was not run in this session; the focused browser checks above were performed through the in-app browser.

Local staged website: <http://127.0.0.1:8029/product-volufiline-100.html>. This serves `site-dist` as-is. Comparison preview remains at <http://127.0.0.1:8028/review.html>.

## Limits and remaining review

This is a technical integration check, not manufacturer verification or confirmation of live indexing. Complete INCI, percentage definitions and supporting manufacturer documents remain unresolved in the content records. No fabricated price, stock, rating or review was added. Product rich-result eligibility has not been established: Google requires at least one of offers, review or aggregateRating for product snippets. See [Google's product snippet requirements](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).

FAQPage markup is retained as a description of visible content, not as a promise of a Google FAQ search display. Google's current changelog states that FAQ rich results stopped appearing on 7 May 2026. See [Google Search documentation updates](https://developers.google.com/search/updates#may-2026). Matching schema to visible content follows [Google's structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Search Console account ownership, URL Inspection and the live Google Rich Results Test were not checked. They need the published version to assess this release. No sitemap submission or deployment was performed. The repository workflow publishes on a push to main after its checks; nothing was pushed.
