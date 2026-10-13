# CELDYQUE — Applying the English Content to the Website

Prepared: 12 October 2026. Status: working preview and release plan; not a live deployment.

**Updated design direction:** The user requested maximum preservation of the current website design. The [design-preserving integration plan](design-preserving-content-plan-en.md) now governs layout and implementation decisions. The existing content preview is an editorial prototype, not the target visual design. Use the current production components for integration; do not copy the prototype's replacement layout or navigation.

## 1. What has been prepared

The content source now contains 14 product records, 14 product-page drafts, 56 product answers, 21 common answers, five guides and five shared-page drafts. The records preserve current product URLs, ASINs and exact Amazon Attribution purchase destinations.

Existing product information is labeled as an observation from the current site. Full INCI, concentration definitions, certification evidence and manufacturer verification remain outstanding where no source has been supplied. No draft is labeled as approved for publication.

The review site contains 29 HTML pages: a home application study, product catalog, 14 product details, guide index, five guides, FAQ, About, Contact, Store, Brand Film, an application comparison and a review desk.

Read [the English package](../content/CONTENT-PACK-EN.md), [the review queue](../content/REVIEW-QUEUE-EN.md) and [the preview](../preview/content/index.html).

## 2. How material becomes a page

```text
Product record                        English narrative and FAQ
identity / format / source / links    product Markdown / FAQ JSON
                    \                /
                     preview renderer
                           |
            static HTML product + guide links
                           |
             future approved production template
```

The preview is generated from real source files rather than a screenshot or a disconnected mockup. Changing an English product draft and rebuilding changes the corresponding preview. Product cards read their names, format, size and images from the product record. FAQ answers are rendered from their canonical JSON source.

The existing production `build_site.py` is unchanged. It still copies the existing site files. The new preview renderer writes only to `preview/content/` and regenerates the readable Markdown book and review queue in `content/`.

## 3. Application map

| Existing or proposed location | Content source | What the user sees | Treatment |
|---|---|---|---|
| Home | `copy/en/pages/home.md`, product and guide records | Short introduction, product discovery and useful guide entry points | The working home layout uses a concise application-study variant; final production wording comes from the home draft |
| `shop.html` | 14 product records | Consistent product cards, size, format, categories | Preserve all existing product destinations |
| Existing `product-*.html` | Matching product JSON + Markdown + product FAQ JSON | Overview, specifications, directions, selected ingredients, expandable questions, related guides | Replace editorial content only after verification and review; preserve URL and purchase parameters |
| Proposed `guides.html` | `guides.json` | An index of five useful guides | New linked page, not an orphan landing page |
| Proposed five `guide-*.html` pages | Guide Markdown + product relations | Comparisons and usage explanations with links back to products | Add only when supporting product facts are ready |
| `faq.html` | `copy/en/faq.json` | Searchable common answers | Preserve useful old anchors with aliases when moving to new question IDs |
| `about.html` | `copy/en/pages/about.md`, `brand.json` | Clear brand description and navigation | Unsupported research/clinical assertions omitted from the new draft |
| `store.html` | Store Markdown + `retailers.json` | Four existing retailer destinations and purchase responsibilities | Verify current official relationships before release |
| `contact.html` | Contact Markdown + brand support facts | Support information and order routing | Reconcile exact contact details before release |
| `brand-film.html` | Film Markdown + existing video | Brand-film context, not product-test evidence | Preserve the current file; do not invent an upload date |
| Search modal | Future export from product records | Consistent names and factual aliases | Retain current interface; remove unsupported efficacy tags after review |
| Structured data | Future approved export from product records and visible copy | Machine-readable representation of the same content | Not emitted as production markup in this draft preview |

## 4. Product-page placement

1. **Hero:** existing product image, official name, format, size and short explanation. Keep the existing product-specific purchase link.
2. **Specifications:** format and routine step derived from the same record used by the catalog.
3. **Directions:** short, product-specific steps. Verify against current packaging before publication.
4. **Ingredients:** distinguish a selected summary from a complete INCI declaration. Show a complete list only when provided and checked.
5. **Questions:** expandable, keyboard-accessible answers from the product FAQ source.
6. **Comparison:** a link to the relevant guide. The guide uses the actual product formats and explains comparison limits.
7. **Related products:** only relevant alternatives or companion formats, not a requirement to buy the full collection.

The current preview carries review notes in a separate review desk and a clear global draft notice. Some proposed consumer answers explain genuine information limits, such as an undefined concentration basis. Those answers should be revised after the missing information is obtained, not silently converted into positive claims.

## 5. Guide and product relationships

| Guide | Linked products | Purpose |
|---|---|---|
| PDRN collection comparison | PDRN concentrate, PDRN serum, PDRN cream | Explain format and routine differences without ranking unverified percentages |
| Volufiline use | Volufiline concentrate | Explain mixing directions and what the product name does not establish |
| Bakuchiol comparison | Bakuchiol concentrate, bakuchiol cream | Distinguish a mix-in product from a moisturizer |
| Cleansing routine | Cleansing oil, Gentle Cleanser | Explain application and rinse-off differences |
| Tone-care comparison | ArbutXA, Glutathione, Niacinamide | Compare product roles and formulas without unsupported performance rankings |

Blue Copper, Azelaic and Scalp Serum receive full product materials and FAQs. They do not receive thin standalone guides merely to make the page counts symmetrical.

## 6. What the preview intentionally does not do

- It does not replace the production home, catalog or product files.
- It does not implement or publish new Google tags, analytics events or Search Console configuration.
- It does not claim all imported product facts are verified.
- It does not output new prices, stock, reviews, medical claims or a fabricated full ingredient list.
- It does not install a service worker or track review traffic.
- It does not implement the existing site's search modal or consent system a second time. Those existing systems remain part of the later integration.
- It does not expose supplier-only documents. The evidence index refers to existing repository sources, not confidential manufacturing files.

## 7. Review and release sequence

### Step A — Review the material

Read the combined English pack first. Confirm official names, bottle sizes, selected ingredients, directions and concentration terminology. Use `REVIEW-QUEUE-EN.md` as the checklist. Prioritize the three PDRN products, then extend the same checks to the remaining 11.

Record evidence, the actual reviewer and review date for each material fact. Separate formula verification from approval of the final English wording. Do not infer certification or supplier authenticity from existing copy.

### Step B — Review the application

Open `preview/content/application.html`. Each row links to the current local product page and the proposed content page. Review a full journey: Shop → PDRN serum → comparison guide → PDRN cream → FAQ.

Check that the content answers real customer questions and that the shorter layout does not hide essential directions or precautions. Review the product and guide pages on desktop and mobile.

### Step C — Prepare a production change

Apply approved copy to the current product layout or a separately approved new design. Keep the existing URLs. Generate cards, search aliases and JSON-LD from the same approved records, and make visible copy consistent with them.

Add the approved guide URLs to the site navigation and sitemap. The five guides plus a guide index would add six URLs if all are approved, but the final sitemap count depends on the decisions for existing upcoming and inactive pages.

Keep the existing `product-detail.html` behavior until there is an explicit migration decision. Do not treat its meta refresh as an HTTP 301. Review Coming Soon, Retinal and utility pages separately.

### Step D — Verify and publish the concrete change

Run HTML, SEO, unit and browser checks on the actual production change. Verify the complete ingredient declarations, claim evidence, structured-data parity, product and guide links, query filters, old FAQ anchors, image descriptions and Amazon Attribution parameters.

The current site has working analytics-consent behavior. Preserve it when integrating new templates. Update cache versions as necessary and check production service-worker behavior after release.

Publishing is a separate action from this content preparation and preview. This package has not changed the live site or pushed a deployment.

### Step E — Measure

Use the already-connected Search Console property for indexing and search-performance comparisons. Keep branded and non-branded queries separate. Use GA4 to observe available, consented visits and outbound clicks; an outbound click is not a sale.

For AI visibility, record service, date, language, search mode, question, product mentions, cited URLs and factual accuracy. A single answer or source citation is not a universal ranking. No automated monitoring has been scheduled by this task.

## 8. Acceptance criteria

- All 14 products retain their current URL, identity and exact purchase destinations.
- All published facts have an appropriate source and a completed content review.
- Full INCI lists are accurately labeled and complete where promised.
- Concentration numbers have a clear, correct basis; source conflicts are resolved rather than hidden.
- Product copy, FAQ, catalog, search and JSON-LD do not contradict each other.
- Every new guide has meaningful content and normal links from relevant pages.
- The public layout remains usable when answers are collapsed and on a narrow screen.
- Preview-only material, unresolved internal notes and restricted source documents are excluded from the production artifact.
- Account-based results are reported from actual account data, not inferred from code presence.

## 9. Commands for this review package

```sh
python -B scripts/build_content_preview.py
python -B scripts/check_content_package.py
python -B -m http.server 8026 --bind 127.0.0.1
```

Open [the preview](http://127.0.0.1:8026/preview/content/index.html) or [the application comparison](http://127.0.0.1:8026/preview/content/application.html).
