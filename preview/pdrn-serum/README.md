# PDRN Serum — Original Design Preview

Prepared: 12 October 2026. Scope: **PDRN 12% + EGF Peptide Serum only**. This is a local draft, not a deployment.

## Open the result

- [Before / After comparison](http://127.0.0.1:8027/review.html)
- [Proposed full page](http://127.0.0.1:8027/product-pdrn-12-egf.html)
- [Original full page](http://127.0.0.1:8027/before.html)

Use the preview server below. The generated HTML retains root-relative asset paths and is not intended to be opened directly as a file or under the earlier content-preview server.

In the comparison view, **After** highlights revised text areas in yellow by default. **Highlight changes** toggles this review overlay; **Next change** moves through the revised areas. Unchanged text is not marked. The overlay is injected only into the comparison frame; the standalone product page keeps the original styling. Highlights identify changed text blocks rather than individual word-level differences, and do not indicate verification or approval.

```sh
python -B scripts/build_pdrn_design_preview.py
python -B scripts/serve_pdrn_preview.py
```

The server binds only to `127.0.0.1:8027`. It overlays the draft onto read-only existing site assets. Other pages linked from the preview are unchanged local reference pages. The production root HTML, shared CSS, shared JavaScript, partials and deployment settings remain unchanged.

## Content changes

- Retained the original page CSS, fonts, photography, image attributes, section order, heading treatment, cards and exact Amazon purchase links.
- Replaced the procedural-use kicker with **Face Serum**.
- Reworked the overview and detail panels around format, application and the serum-versus-moisturizer distinction.
- Replaced unsupported performance cards with useful product facts in the same six-card layout.
- Labeled selected ingredients separately from a complete INCI declaration; kept the unresolved concentration basis explicit.
- Updated the three existing use-step cards and the explanatory note.
- Expanded FAQ to six answers: two revised existing topics and the four answers from `content/copy/en/product-faq.json`.
- Added small links to the existing PDRN FAQ section and PDRN cream page. No new guide or second product was implemented in this pilot.
- Updated this product's search-result subtitle in the preview runtime only. Other search entries retain existing copy. This runtime is shared by both comparison views; their page bodies remain distinct.

The original editorial sources are `content/products/pdrn-12-egf.json`, `content/copy/en/products/pdrn-12-egf.md` and the canonical product FAQ JSON. Layout-specific draft wording is in `scripts/build_pdrn_design_preview.py`. `changes.json` records each body replacement and the original file hash. These presentation adaptations require the same fact/editorial review as the source drafts.

## Preview isolation

Both versions use noindex metadata and the server adds an X-Robots-Tag. Production JSON-LD is omitted in the comparison so the original claims are not carried into the proposed draft's machine-readable data. The draft is therefore **not** a deployable SEO release artifact; generate matching approved metadata/JSON-LD before release.

The local server omits the analytics loader, returns no-op analytics code if requested and blocks worker creation. The production consent implementation is not changed. Existing remote font and photo resources still load as part of the original design. Internal review controls are outside the product page.

## Checks completed

- Build assertions: identical inline CSS, image attributes, section attributes/order and purchase-button attributes; one H1 and six FAQ items.
- Original source SHA-256 remains unchanged after generation. Existing tracked files have no diff.
- All local product-page links, assets and fragment destinations resolve against the preview or unchanged source pages.
- Desktop comparison at 1440 × 1000: same header, gallery, title and purchase-button dimensions/fonts. The shorter copy moves the purchase button upward by approximately 29 px; the centered gallery moves upward by approximately 14 px.
- Mobile at 390 × 844: no document-level horizontal overflow or overflowing main-content elements. The original horizontally scrollable breadcrumb remains.
- Verified How to Use navigation, FAQ expansion, existing search, the updated serum search subtitle, mobile menu, and both comparison buttons.
- No browser console errors reported during the checked interactions.

Screenshots: [before desktop](before-desktop.png), [after desktop](after-desktop.png), [before mobile](before-mobile.png), [after mobile](after-mobile.png), [expanded FAQ](after-faq-desktop.png).

## Still pending

Manufacturer confirmation of the concentration basis, full INCI and final wording. Existing global-footer claims and other product pages are outside this single-page pilot. No live publication, account analytics check or search-ranking validation has been performed.
