# All-product design-preserving preview

Updated: 13 October 2026. **Comparison preview; not deployed.** The reviewed After content has also been applied to local production source, with a verified Before backup. See the [integration and rollback record](../../docs/after-integration-review-2026-10-13.md). This directory remains a separate noindex comparison view.

All 14 active products are available in their original page designs. The existing PDRN serum pilot is retained; the other 13 products now incorporate the prepared English content. Shared pages and guides have not been integrated in this pass.

## Open and compare

Open <http://127.0.0.1:8028/review.html>. Choose a product, switch Before / After, toggle yellow highlights, or use Next change to jump through revised blocks. Highlights identify changed blocks, not individual word differences. Open full page shows the selected version without the review toolbar.

The older port 8027 preview contains only the PDRN serum pilot. Port 8028 is the complete collection.

## Build and serve

From the repository root:

```sh
python -X utf8 -B scripts/build_all_product_previews.py
python -X utf8 -B scripts/serve_product_previews.py
```

Keep the server process running while reviewing. It binds only to 127.0.0.1. If the browser reports connection refused, restart the server command.

## Source and output

- Product facts and unresolved evidence: `content/products/*.json`.
- English narrative and directions: `content/copy/en/products/*.md`.
- Canonical product questions: `content/copy/en/product-faq.json`.
- Original design source: repository-root product HTML, read without changes.
- Draft pages: this directory's 14 product HTML files.
- Before pages: `before/`.
- Exact replacements and original SHA-256 hashes: `changes/`.
- Review product selector and draft search: `catalog.json` and `site-preview.js`.

Narrative is mapped into the existing introduction, cards, ingredient sections, usage steps, precautions, FAQ and purchase area. Volufiline has a separate mapping for its original individual layout. Metadata descriptions also use draft text. Shared CSS, image attributes, section order and purchase links are preserved. Longer text can naturally change section height.

The product pages contain 59 FAQ answers: the 56 canonical answers, two retained/revised pilot questions, and one retained/revised Volufiline origin question. No full INCI list or manufacturer evidence has been invented. Concentration definitions, complete formulas and other unresolved facts still require review before publication.

## Validation completed

- Build assertions passed for all 14 pages: identical original CSS, image attributes, section attributes/order and purchase buttons; one H1; no production JSON-LD; noindex.
- All 28 Before / After HTTP routes returned 200 with noindex headers.
- Original source hashes remain unchanged; Git reports no tracked production changes.
- All 56 canonical FAQ answers match their source, and all 39 usage steps for the 13 newly integrated products are present. The previously reviewed serum pilot retains its existing wording.
- Existing content-package validation passed for 14 records, five guides, 77 editorial answers and 29 simplified preview pages.
- Browser check at 390 × 844: all 14 product bodies fit their viewport without document-level horizontal overflow. Original breadcrumb strips may scroll internally.
- Visually reviewed Volufiline and PDRN cream on desktop, plus long-name serum and scalp usage cards on mobile; checked product selection, Before / After, highlighting and Next change.
- Screenshots: `review-desktop.png` and `review-mobile.png`.

## Preview isolation

The server overlays the draft pages and references existing assets read-only. It disables analytics, blocks workers, returns noindex headers and a disallow-all robots response, and does not expose content records or the rest of the workspace. The original HTML, deployment settings and sitemap remain unchanged. Search uses the draft catalog in both comparison modes. Navigation to other shared pages displays unchanged local references. This is a content/design review, not a deployed SEO or structured-data release.
