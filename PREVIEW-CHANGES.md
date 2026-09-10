# Preview optimization review

Branch: `codex/site-preview`. Baseline: `9593fe150633cc4492c08586fb5a59b2a2d3b7bc`.
Review URL: http://127.0.0.1:8001/

## Changes to review

- Home: use the four philosophy buttons. Both the text and selected picture now change.
- Products: compare the copper peptide serum and bakuchiol cream images. Their full-size catalog images total 111,682 bytes, down from 3,169,434 bytes (96.5% less). Responsive variants also cover smaller screens. Original source images remain available for comparison and social metadata.
- Navigation: header and footer load independently, with a five-second request timeout. Static navigation/contact links remain available if JavaScript or a partial request fails. Footer analytics settings are revealed even if the footer finishes after the header.
- Legacy product URL: `/product-detail.html` immediately redirects to `/product-volufiline-100.html` using a static-host-compatible meta refresh, with the same canonical destination. This is not an HTTP 301. The old sample product markup and unverified price are removed.
- Search indexing: the temporary opening page and TikTok callback have `noindex`; their URLs still work. Active product URLs and purchase links are unchanged.
- Deployment checks: HTML validation now fails the job on errors, dependencies are pinned, and regression checks cover request failures, image transfer budgets, responsive preloads, and indexing. Seven browser interaction checks are wired into CI. Deployment stages only site assets, excluding development tools and test reports. A preview PR cannot cancel a main deployment.

## Checks

```text
npm ci
npm run lint:html
python -B scripts/check_seo.py
python -B -m unittest discover -s scripts -p "test_*.py"
npm run test:unit
npx playwright install chromium
npm run test:browser
```

Browser screen review is left to the owner as requested. All seven browser interaction tests passed locally in headless Chromium on 2026-09-10, in addition to 56 unit/static tests and HTML/SEO validation. A release should also check production service-worker caching because the local preview server intentionally bypasses it.

The owner approved merging and deploying the reviewed version on 2026-09-10 after all 63 tests passed. The pre-release production commit is `9593fe150633cc4492c08586fb5a59b2a2d3b7bc`; retain it as the rollback reference. Future changes still require separate review and release approval.
