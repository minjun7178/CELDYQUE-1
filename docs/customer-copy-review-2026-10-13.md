# Customer copy synchronization — 13 October 2026

Local implementation only. No commit, push or deployment was performed for this edit.

## Scope and result

- Rewrote all 14 product manuscripts as direct customer instructions and descriptions.
- Synchronized 59 product FAQ answers and 21 common FAQ answers with visible HTML and FAQPage JSON-LD.
- Product introduction, meta/OG/Twitter description and Product/WebPage schema description use the same copy.
- Removed internal source commentary, undefined ingredient terminology, unverified concentration interpretations, certification/origin assertions and references to unpublished guides from these customer pages.
- Replaced numbered ingredient placeholder titles with selected ingredient names. These remain selected highlights, not verified full INCI lists.
- Corrected contradictory shop tags for ArbutXA, cleansing oil, blue copper peptide serum and scalp serum from `product-display.json`.
- Kept original product CSS, images, section sequence and purchase links. Both current preview collections now derive their PDRN serum copy from the shared manuscript.
- Preserved imported evidence and its pending-verification status. No fact was promoted to manufacturer-approved status.

## Documents to use

- [Current customer copy](../content/CUSTOMER-COPY-EN.md): generated from actual local product, FAQ and shop pages.
- [Owner input required](../content/OWNER-INPUT-REQUIRED-KO.md): Korean checklist of label, formula, directions and concentration evidence.
- [Source and rebuild instructions](../content/README.md).

The earlier `CONTENT-PACK-EN.md` is an internal compilation including imported facts, five unpublished guide drafts and shared-page drafts. It is not the final customer copy. Those guide/shared-page drafts have not been published by this change.

## Validation

- `check_customer_copy.py --export`: manuscript paragraphs, directions, selected ingredient provenance, shop corrections, all 80 FAQ answers and corresponding JSON-LD agree.
- `check_content_package.py`: 14 product records, 5 unpublished guides, 80 answers and 29 reading previews passed provenance and link checks.
- `check_seo.py`: canonical, metadata, robots, local references, JSON-LD, visible FAQ parity and 21-page sitemap passed. No verified live offer prices or review data were invented.
- HTMLHint: 28 files passed.
- Existing Python tests: 28 passed. Existing JavaScript unit tests: 28 passed.
- `git diff --check`: passed; only local Git line-ending notices.
- Restore dry run: all 29 backed-up files recognized.
- Local HTTP preview returned 200. PDRN cream FAQ opens correctly at a 390 px mobile viewport; PDRN cream and blue copper peptide serum had no content extending beyond the mobile viewport. Temporary viewport override reset.
- Desktop and mobile review screenshots: `customer-copy-pdrn-cream-desktop.png`, `customer-copy-pdrn-cream-mobile.png`.

These checks validate implementation consistency, not product efficacy, ingredient accuracy, ranking or AI citation outcomes. Label/INCI/directions and the meaning of product-name concentrations still need manufacturer evidence before treating them as verified.

## Rollback

Original `before.zip`, tag `before-content-after-2026-10-13` and base commit remain unchanged. The manifest tracks the latest local After hashes. A separate `before-customer-edit-20261013.zip` preserves the state immediately before this editorial pass.

```sh
python -B scripts/restore_before_content.py
```

This command is a dry run. `--apply` restores the listed local Before files; it does not publish them. Unrecognized later edits are protected from overwrite. See [original backup record](before-after-backup.json).


## Follow-up: retain existing facts and add ingredient context

- Re-audited all 14 original usage sections and FAQs. Restored explicit amounts and frequencies, including blue copper serum 2–3 drops AM/PM, cleansing oil 2–3 pumps, cleanser AM/PM with dryness adjustment, and scalp serum daily. No missing frequency was invented.
- Restored the existing Volufiline raw-material meaning of 100% and the PDRN serum description of a 120,000 ppm PDRN complex. These remain sourced brand statements, not new manufacturer approvals.
- Authored 14 ingredient-context passages using nine primary research/supplier sources. Existing product designs are preserved. Public links and WebPage citation URLs match; no ingredient study is marked as a CELDYQUE product trial.
- Added `content/ingredient-research.json` for source limitations and `content/existing-information-audit.json` for the retained original details. Updated the owner checklist to distinguish available information from actual gaps.
- Regenerated both preview collections and customer-copy exports. Content/SEO checks, HTMLHint, 28 Python tests, manuscript/80-answer/schema parity and the 29-file rollback dry run passed. Local staging matches current source.
- Browser review confirmed restored blue copper usage and visible research links; 390 px viewport had no horizontal overflow. Screenshot: `ingredient-context-desktop.png`. Viewport reset.
- This follow-up was not deployed. An additional pre-edit ZIP was saved in the existing external backup directory.
