# CELDYQUE English Content Package

Prepared: 12 October 2026.

This package organizes all 14 active products and provides English editorial drafts, five guides, shared website copy and a working local application preview. **Draft preparation is complete; manufacturer verification is not.** On 13 October 2026, the user authorized applying the reviewed After content to local production source. All 14 product pages are integrated and backed up. The user authorized catalog-based finalization and deployment on 13 October 2026; see [current release status](../docs/deployment-2026-10-13.md). See the [integration and rollback record](../docs/after-integration-review-2026-10-13.md).

## Current customer copy — 13 October 2026

Follow-up: existing usage amounts, recorded frequencies and Volufiline/PDRN-complex explanations have been restored. Existing information is not treated as missing merely because it lacks independent manufacturer verification. Ingredient research copy and source links are visible on all 14 local product pages. See `ingredient-research.json` and `existing-information-audit.json`.

- [Customer website copy](CUSTOMER-COPY-EN.md): exact text exported from the 14 local product pages, common FAQ and shop.
- [Owner input required (Korean)](OWNER-INPUT-REQUIRED-KO.md): labels, INCI, directions and unresolved product facts.
- [Customer copy review](../docs/customer-copy-review-2026-10-13.md): synchronization checks and scope.

The older CONTENT-PACK-EN.md remains an internal compilation of imported evidence and draft guides. It is not the final customer manuscript.

## Start here

1. [Complete English content book](CONTENT-PACK-EN.md): all product materials, draft copy, product questions, guides and common FAQ in one readable Markdown file.
2. [Review queue](REVIEW-QUEUE-EN.md): product-specific evidence requests and claims held from new promotional copy.
3. [Website application plan](../docs/website-application-plan-en.md): exactly where the material goes and how to release it later.
4. [Local preview](../preview/content/index.html): navigable product pages, comparisons, filters and FAQ.
5. [Application comparison](../preview/content/application.html): links to current local pages and proposed versions of all 14 products.
6. [Review and validation log](../docs/content-review-log.md): completed checks and remaining fact review.
7. [Design-preserving integration plan](../docs/design-preserving-content-plan-en.md): the current implementation direction, retaining the original site's components and layout.
8. [All 14 products in the original designs](../preview/all-products/README.md): completed local Before / After integration, available at http://127.0.0.1:8028/review.html while its preview server is running. Updated 13 October 2026; not deployed.

## What is included

| Material | Count / role | Source |
|---|---|---|
| Product records | 14 active products | `products/*.json` |
| Product page drafts | 14 English drafts | `copy/en/products/*.md` |
| Product questions | 59 customer-facing answers (facts pending verification) | `copy/en/product-faq.json` |
| Common FAQ | 21 customer-facing answers (facts pending verification) | `copy/en/faq.json` |
| Guides | 5 complete English drafts | `copy/en/guides/*.md` |
| Shared-page copy | Home, About, Contact, Store, Brand Film | `copy/en/pages/*.md` |
| Brand and retailers | Identity, support details, existing links | `brand.json`, `retailers.json` |
| Evidence index | Source files, commit, hashes, scope | `evidence-index.json` |
| Media inventory | 126 local files plus 38 remote image URLs | `media.json` |
| Page register | 26 existing HTML files, including inactive/utility pages | `page-register.json` |
| Preview | 29 local HTML pages | `../preview/content/` |

The 80 answers are an editorial revision of the previous site's 65 question entries; this is not a claim that 80 distinct search intents or verified answers exist. New product questions clarify format, ingredient limits and usage rather than repeating promotional claims.

## Source-of-truth rules

- `catalog-facts-2026.json` records the owner-designated catalog facts and page references; it supersedes conflicting historical website text.
- `release-approval-2026-10-13.json` records the actual publication authorization without claiming manufacturer testing.

- Product identities, observed facts, retailer URLs, source references and unresolved questions belong in `products/*.json`.
- Selected ingredient display and corrected shop tags belong in `copy/en/product-display.json`.
- Product narrative belongs in `copy/en/products/*.md`.
- Product FAQ belongs only in `copy/en/product-faq.json`; the renderer and readable book insert it from that file.
- Common FAQ belongs only in `copy/en/faq.json`.
- Guide and shared-page narrative belong in their Markdown files. `guides.json` defines guide relationships and proposed URLs.
- The readable content book, review queue and HTML preview are generated views. Rebuild them after editing their sources.
- Product directions are carried as traceable facts and restated in the draft. Changes to those facts require a matching editorial review; no generator can validate a medical or manufacturing claim.

The records intentionally retain `imported`, `needs_verification` or `conflicting` status. `null` means unknown, not absent from the product. No product has an approved full INCI list in this package. No source hash or code check is proof of efficacy, concentration, certification or label accuracy.

## Synchronize customer pages

```sh
python -B scripts/build_all_product_previews.py
python -B scripts/apply_product_content.py --apply
python -B scripts/build_content_preview.py
python -B scripts/check_customer_copy.py --export
python -B scripts/check_content_package.py
python -B scripts/check_seo.py
```

These commands update local files only. `--apply` does not deploy. The original Before backup is retained; unrecognized changes are not overwritten.

## Build and inspect

From the repository root:

```sh
python -B scripts/build_content_preview.py
python -B scripts/check_content_package.py
python -B -m http.server 8026 --bind 127.0.0.1
```

Open [the local review](http://127.0.0.1:8026/preview/content/index.html). The preview also works as local files for ordinary browsing; use HTTP for a consistent browser review and video behavior.

The build uses the Python standard library. It does not install dependencies, call a model, change production files, publish pages or contact analytics providers. Existing local product images are referenced instead of copied.

## Reading the preview

- **Products:** all 14 products, with category filters and a separate scalp-care category.
- **Guides:** five complete comparisons or usage guides.
- **FAQ:** searchable common questions with expandable answers.
- **Application plan:** current-page versus proposed-page links for all 14 products.
- **Review desk:** unresolved questions and the English source documents.

The layout is a content application study using the existing product photographs and restrained typography. It is not a final redesign. No new product imagery, customer testimonials, prices, reviews or certifications have been fabricated.

All preview pages have `noindex,nofollow`, and load no tracking or service worker. They contain no production structured-data claims. These directives do not make a page private; keep the preview local or access-controlled. The existing deployment script does not copy `content/`, `docs/` or `preview/`. A public Git repository still exposes tracked files, so do not add confidential supplier documents here.

## What needs to happen before release

Existing directions and several concentration explanations are already available and retained. Use OWNER-INPUT-REQUIRED-KO.md for the narrowed list of genuinely missing or conflicting facts. Full INCI remains unavailable. Ingredient literature is used as ingredient context, not a CELDYQUE clinical trial. Do not bulk-change evidence status to manufacturer approved.

The implementation document separates these remaining checks from work already completed. Search Console is treated as already connected based on the user's confirmation; account performance and indexing have not been inspected in this package.
