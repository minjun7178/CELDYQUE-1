# CELDYQUE — Content Integration with the Existing Design

Prepared: 12 October 2026. Updated: 13 October 2026. Status: all 14 product pages integrated into local production source with a verified Before backup; not deployed. Shared-page and guide integration remains planned. See the [integration and rollback record](after-integration-review-2026-10-13.md).

## Decision

Use the current production pages as the visual and interaction baseline. Integrate the English content into their existing sections. Preserve the typography, colors, photography, image framing, navigation, buttons, spacing system and responsive behavior wherever the content permits.

This decision takes precedence over layout proposals in the earlier [application plan](website-application-plan-en.md). The existing `preview/content/` site remains a content-reading prototype; its simplified layout, font choices and navigation are not the implementation target. The [English material](../content/CONTENT-PACK-EN.md) remains the editorial source.

Success means the website still looks recognizably the same while product information becomes clearer and consistent. Natural changes to paragraph height are acceptable. Preserving design does not require preserving unsupported claims or filling every old card with new claims.

## 1. What the current code already provides

| Area | Observed implementation | Integration decision |
|---|---|---|
| Shared design | `assets/site.css`; Inter body type, existing serif headings in page styles, pill header and shared footer | Reuse current assets and page styles |
| Home | Video hero, image grid, philosophy, Featured Skincare and Inside CELDYQUE | Keep section order, photography and visual emphasis |
| Catalog | Existing product grid and All / Serum / Cream / Cleanser controls in `shop.html` | Update approved names and facts inside existing cards; keep filter behavior |
| Thirteen product pages | `product-top`, banner, detail grids, benefit cards, ingredient cards, usage, ingredients, FAQ and bottom CTA | Map content into these sections rather than replace the page template |
| Volufiline page | Additional quick facts, origin, formula and application-area sections; five FAQ items | Maintain its individual structure; use a separate section mapping |
| Shared FAQ | Search, topic select, topic chips, 21 questions, `details` disclosures and hash navigation | Replace answer content in place; retain controls, categories and links |
| Header | Products / About / Store / FAQ, retailer links, search and mobile menu | Preserve the top-level menu and retailer placement |
| Footer | Five columns, including Community / FAQ | Add Product Guides under Community using the existing link style |

These findings come from the local source code. A fresh screenshot baseline of the original site is part of implementation, not a claim that the new integration is already visually tested.

## 2. Change boundaries

### Preserve

- Existing product URLs, product images, image aspect ratios and gallery treatment.
- Header width, menu hierarchy, retailer buttons, search modal and mobile navigation.
- Current homepage video and image-led composition.
- Product section order, background treatments, title styles, card shapes and purchase-button positions.
- Amazon destinations including their attribution parameters, analytics consent and existing interaction events.
- Existing FAQ search/filter controls and meaningful fragment URLs.

### Edit inside existing components

- Product summaries, fact labels, directions, ingredient descriptions and answers.
- Promotional headlines and image-overlay text when the wording exceeds the available evidence.
- Product names and sizes across cards, search results and page metadata after identity review.
- Relevant internal links, image descriptions and structured data to match approved visible content.

### Add only where the current structure cannot carry the information

- A short comparison-guide link in the existing product FAQ or learning area.
- A full-ingredient disclosure inside the existing ingredients section once a verified complete list is supplied.
- A guide index and five guide pages styled with the existing header, footer, fonts, colors and content widths.

Do not move the long content book wholesale onto each page. Keep the useful short answer on the product page and put extended comparisons on the guide page.

## 3. Product-page content placement

| Current component | Material to apply | Layout treatment |
|---|---|---|
| `.product-kicker` | Accurate product format or routine role | Same small label, short wording |
| Product H1 | Reviewed current product name | Same type scale; review intentional line breaks on mobile |
| `.subtitle`, `.desc-text` | Short identity, format, size and overview from the product record and draft | One concise subtitle and one short paragraph; target approximately current occupied space |
| `.active-badges`, `.features-list` | Verified ingredient names and useful product facts | Retain visual style; reduce unsupported/redundant items instead of inventing replacements |
| `.banner-section`, `.details-section` | Supported formula explanation and product context | Keep images, alternating columns and overlays; revise text in place |
| `.benefit-section` | Only supportable benefit wording; otherwise useful format/usage information | Preserve card style; allow fewer cards or a more accurate section heading |
| `.peptide-section` | Relevant selected ingredients | Keep card layout; use an appropriate heading for each formula, such as Selected Ingredients |
| `.usage-section`, `.steps-grid` | Product-specific application steps | Retain numbered-step design; include essential mixing instructions and precautions visibly |
| `.ingredients-box`, `.ing-list` | Clearly labeled selected ingredients plus verified full INCI when available | Keep the existing box; optional native disclosure inside it for a long full list |
| `.faq-section`, `.faq-item` | Relevant answers from the canonical product FAQ source | Existing disclosure styling; maintain useful old topics or record where they move |
| Existing learning link / end of FAQ | One relevant guide link and, where useful, a related product link | Ordinary existing link style; no large new card grid |
| `.bottom-cta` | Short reviewed purchase invitation | Existing background, button and exact retailer URL |

For Volufiline, update `.quick-facts`, `.origin-banner`, `.formula-section`, `.areas-section` and `.benefits-section` individually. Supplier-origin and efficacy statements need their own evidence. Keep the existing learning strip and add its guide link there. Do not remove the fifth existing FAQ merely because the new draft initially contains four answers; review each question and retain or relocate useful material.

### Concrete pilot: PDRN serum

Retain the existing bottle image, two-column hero, badges, detail imagery, usage cards, FAQ styling and dark bottom CTA.

| Current wording / area | Proposed treatment |
|---|---|
| Hero label: “Microneedling-Friendly Serum” | Draft replacement: “Face Serum”; confirm final wording during product review |
| Hero description | Use the prepared short overview, fitted to the existing text area |
| “120,000 ppm PDRN complex” versus “PDRN 120,000 ppm” | Resolve the substance and measurement basis before publishing a factual concentration explanation |
| “Post-Care Friendly” benefit card | Remove the unsupported procedural-suitability claim; reuse the card only if a useful supported fact is available |
| Ingredient section's “search-friendly” explanation | Rewrite for shoppers; keep the same section and typography |
| Existing three FAQ rows | Review against the four prepared product answers; merge/retain useful topics without introducing a new FAQ widget |
| End of FAQ | Small link: “Compare the three PDRN products” |

Draft provenance phrases such as “the current site says” belong in the review documents. Resolve the underlying fact before producing final consumer copy. Where a limitation genuinely helps the customer, explain it plainly; never turn an unknown into a positive claim.

## 4. Other pages

| Page | Planned change | Visible impact |
|---|---|---|
| Home | Correct product names and unsupported statements inside current sections. Add “Product Guides” to the existing `.home-discovery` link row once guides are ready. Keep both current Inside CELDYQUE cards in this phase. | Text edits and one small link; same hero, images and section order |
| Shop | Synchronize names, sizes, aliases and category records with approved product data. Keep current filter UI and card markup. | Small text edits; no new catalog layout |
| FAQ | Update the 21 answers in the existing topic groups. Add relevant guide links within answers. Preserve search, select, chips, question IDs and expand/collapse behavior. | Familiar page, clearer answers |
| About | Fit reviewed brand wording to the existing hero, mission and philosophy panels. | Text edits within current panels |
| Contact | Reconcile company, email, hours and seller details in current information blocks. | Factual corrections |
| Store | Review retailer descriptions and official relationships; preserve the four destination cards and exact URLs. | Text edits |
| Brand film | Update surrounding explanatory copy only where needed. | Existing video and layout |
| Footer | Add Product Guides under Community; review the existing research/efficacy sentence. | One link and a short copy revision |

Scalp care needs a correct product category in the records. A new visible Scalp Care filter is a separately identified optional change, not part of this minimal-design phase. Document how it behaves in the current All/Serum filters before changing category logic.

## 5. New guides in the existing visual language

Create `/guides.html` and the five proposed guide URLs already registered in `content/guides.json`. They use the real shared header/footer and current typefaces. Reuse existing heading, link and article-card patterns; scope any necessary new table/prose CSS to guide pages.

A guide has a title, short answer, readable sections, a compact comparison table where useful, and ordinary links to the relevant products. Use the existing product photographs if needed; no new visual identity or illustration system is required.

Keep tables scrollable inside their own region on mobile. Link guides from related product answers, the FAQ, the home discovery row and the footer. The existing top-level navigation does not need an extra Guides item in this phase.

## 6. Content and engineering workflow

1. **Freeze the original visual baseline.** Capture the home, catalog, FAQ, PDRN serum and Volufiline pages at the same desktop and mobile widths used for comparison. Note open/closed FAQ and consent-banner states.
2. **Map source fields to existing sections.** Create a per-product map with source content, target section, old/new wording, review status and any intentional visual difference. Record both the shared thirteen-page pattern and the Volufiline exception.
3. **Create a separate preview of the original site.** Preserve root-relative paths by serving a complete staged site on its own local root. Do not replace the original preview's simplified template and call it a design-preserving result. Keep review notes outside the consumer layout and disable tracking/service workers in this staging environment.
4. **Apply one PDRN pilot and the Volufiline exception.** Fit the drafted English into existing components. Produce same-size before/after captures and a short change list. Resolve clipping, title wrapping and mobile spacing without redesigning the components.
5. **Extend the mapping to all 14 products.** Keep editorial source files canonical. Use controlled build-time rendering into explicitly identified content regions; avoid broad regular-expression replacements across whole pages or loading primary copy only after JavaScript runs.
6. **Update shared FAQ and discovery links.** Keep `question-1` through `question-21` as rendered IDs using `original_question_number` from the FAQ source. Preserve existing section IDs and `data-cat` values. The content source can keep its internal `common-XX` keys without breaking public fragments.
7. **Add the five guides and their index.** Render them with the existing site shell and review the link journey from product to guide and back.
8. **Align metadata and machine-readable data.** Derive published facts and FAQ answers from the same approved content used in the visible page. Preserve current canonicals and entity identifiers. Add only the final approved new URLs to the sitemap.
9. **Stage a production artifact and inspect it.** Include only approved public pages and required assets; exclude internal records, review notes and prototypes. Re-run current checks and compare the visual baseline before any release.

All steps after this plan are future implementation work. The current task creates the plan; it does not modify the production pages or publish them.

## 7. File-level scope

| Files | Expected work |
|---|---|
| `content/products/*.json`, `content/copy/en/**` | Resolve facts and adapt approved copy to current section sizes; retain provenance |
| Existing `product-*.html` | Targeted text, FAQ, link and metadata updates inside existing markup |
| `index.html`, `shop.html`, `about.html`, `contact.html`, `store.html`, `brand-film.html` | Small content substitutions inside existing components |
| `faq.html` | Answer updates with existing IDs, categories and controls preserved |
| `partials/footer.html` | Existing Community-column guide link and reviewed brand sentence |
| `partials/header.html`, `assets/faq.js` | Expected to remain structurally unchanged; change only if an actual integration issue requires it |
| `assets/site.js` | Synchronize product search data without changing the search interface |
| `assets/site.css`, `assets/home.css`, page-local style blocks | Preserve by default; only narrowly scoped overflow/accessibility fixes where necessary |
| New guide HTML and scoped guide CSS | Inherit existing site visual language |
| Content-rendering/staging scripts, `sitemap.xml`, cache configuration | Add deterministic approved-content output and appropriate final guide/cache entries during implementation |

The current `scripts/build_site.py` copies all root HTML. Therefore draft guide files must stay outside the production root until ready, or a deliberate approved-page allowlist must be implemented before staging. `noindex` alone is not an exclusion from deployment or a privacy control.

## 8. Acceptance criteria

- Original fonts, color values, hero imagery, header, footer columns, purchase buttons and product-section order remain recognizable and consistent in same-size screenshots.
- Text wraps naturally with no clipped content; primary purchase actions remain reasonably close to their baseline position. Essential directions are not truncated or hidden to meet a height target.
- Newly added consumer content is visible in ordinary page use, including accessible expandable answers. Review-only notes are excluded from public output.
- Old FAQ fragments still reveal the right question after filtering; keyboard use, mobile menu, product search and catalog filters remain functional.
- Product identity, size, directions, claims, retailer URLs and structured data agree across all places they appear.
- Existing HTML/SEO/unit checks pass; representative browser checks cover the changed pages and mobile behavior. Run targeted checks again after relevant fixes.
- Each product can be reviewed independently. Missing manufacturer evidence remains an explicit pending item rather than delaying preparation of every other product's draft.
- Deployment and content verification remain separate from the completed editorial prototype. No AI recommendation or ranking outcome is promised by this layout change.

## Next concrete deliverable

A local preview of the **existing PDRN serum page and existing Volufiline page with the English material integrated**, plus before/after screenshots. This establishes the minimal-change pattern before extending it to all 14 products and the shared pages.
