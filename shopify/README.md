# CELDYQUE original-design Shopify pilot

## GitHub dev deployment — 2026-10-30

The isolated branch includes `.github/workflows/shopify-dev.yml`, which validates committed theme files and targets only unpublished dev theme `189650600047`. Production workflow `deploy.yml` is unchanged. The GitHub `shopify-dev` environment allows only `codex/shopify-liquid-pilot`. With explicit owner approval, the official Theme Access app was installed on the dev store and a dedicated credential saved as environment secret `SHOPIFY_DEV_THEME_TOKEN`. No personal CLI session or token is committed. [Actions run 41009715069, attempt 2](https://github.com/minjun7178/CELDYQUE-1/actions/runs/41009715069) successfully validated, checked the unpublished target, backed it up and uploaded the theme. The first attempt correctly stopped before upload because the credential was absent. See [deployment instructions](GITHUB-DEV-DEPLOY-KO.md).

## Isolation

- Branch: `codex/shopify-liquid-pilot` in a dedicated Git worktree.
- Target: `celdyque-dev-test.myshopify.com` only.
- Theme is custom, based on the existing homepage, Products, About, FAQ and all 14 product HTML/CSS. No Horizon dependency.
- Do not publish to the production website, push `main`, or change DNS. On 2026-10-30 the owner authorized the official Amazon MCF app in this Dev store for inventory synchronization only; no fulfillment requests or automatic order submission are authorized.
- Upload as an **unpublished** theme. Existing Horizon stays intact.
- All pages contain `noindex,nofollow`; the development store stays password protected.

## Files

- `build-theme.cjs`: copies the approved product markup and original styles into theme structure.
- `theme/`: deployable theme. `assets/pilot.css` and `pilot.js` contain the small commerce additions.
- `build-site.cjs`: all 14 product mappings, original homepage/listing/About/FAQ, media and URL migration.
- `catalog.json`, `asset-map.json`, `url-map.json`: migration manifests.
- `validate-theme.cjs`: checks source CSS/FAQ/media parity, links, forms and dev isolation.
- `dev-products-remaining-12.csv`: completed one-time import; do not re-import to overwrite existing test inventory.
- `theme/snippets/pilot-product.liquid`: handle-based dispatcher; `product-*.liquid` retain each product’s content.
- `theme/snippets/buy-form.liquid`: Shopify variant, price, availability, quantity, native product form.
- `theme/sections/main-cart.liquid`: Shopify native cart and checkout handoff.

Run from this worktree root:

```powershell
node shopify/build-theme.cjs
npx.cmd --yes @shopify/cli@5.0.0 theme check --path shopify/theme
npx.cmd --yes @shopify/cli@5.0.0 theme package --path shopify/theme
```

The builder preserves hand-authored `main-cart.liquid`, `pilot.css`, and `pilot.js`.
The ZIP is local and ignored by Git. Upload it using the development store theme library.

## Test data

- Product handle: `test-celdyque-arbutxa-glow-cream-50-ml`
- Product: `[TEST] CELDYQUE ArbutXA Glow Cream — 50 ml`
- Intended test price: USD 19.99; intended test shipping: USD 4.99 per order to the US.
- Test stock: 10 units; not an Amazon inventory claim.
- No production selling price, Seller SKU, shipping weight, real payment gateway, or Amazon fulfillment is configured by this theme.

## Scope and known limitations

This pilot preserves one product page. Other brand, FAQ and retailer links still point to the existing public site. The theme home displays the same pilot product for convenient preview; it is not the migrated production home page. Product copy is fixed to ArbutXA for now; adding more products requires separating shared layout from product-specific content.

Checkout is Shopify hosted. Its layout is not controlled by this Liquid product template. Search uses Shopify's native product search; the existing header appearance is retained. Amazon MCF is not connected. Customer account implementation and verification status are recorded below.

Original Google Fonts and three Unsplash images are preserved. Shopify Theme Check reports six `RemoteAsset` performance warnings and zero errors; these remote assets should be reviewed during full migration.

## Current verification status

Dev product 15658664296559 is saved and active, with the existing product image, USD 19.99 price, and 10 test units. US test market 65595277423 is active with TEST Standard Shipping at USD 4.99. Shopify Test payment gateway is active; automatic fulfillment is disabled.

Shopify CLI authentication completed and the theme was uploaded successfully as **unpublished**, ID `189650600047`. Horizon remains the live theme in the dev store. The admin Online Store preferences and editor iframes still render blank in the browser tool.

Preview: https://celdyque-dev-test.myshopify.com/?preview_theme_id=189650600047

The owner entered the existing storefront password directly. On 2026-10-27 browser verification passed for product rendering, add to cart, quantity changes (2 units = USD 39.98), removal/empty cart, native product search, FAQ expansion, and the mobile purchase form/menu at 390px width. The viewport was restored afterward.

Test checkout completed successfully: order **#1001**, Shopify order ID `18957541408879`, confirmation `3CN9FCYX1`. One unit at USD 19.99 plus TEST Standard Shipping at USD 4.99 totals **USD 24.98**. The confirmation page identifies Test Payment Gateway; admin records paid and unfulfilled. The address is deliberately synthetic and produces an address warning; it is not a shipping destination. No real payment or fulfillment took place.

Card input iframes initially remained blank, including after a reload. Opening the same checkout in a fresh tab restored them and allowed the successful test. Keep this observation for browser regression testing; the cause is not established. Evidence screenshots are stored locally in ignored `shopify/evidence/`.

Production checkout and Amazon fulfillment remain unconnected. Before launch, replace test prices, shipping rules and address/contact defaults with confirmed business data and configure a real payment provider.

## Customer accounts — 2026-10-30

The Dev store already has Shopify customer accounts and sign-in links enabled. Its native account destination is `https://shopify.com/81818353775/account`. Use Shopify's passwordless email-code flow: first successful sign-in creates a customer profile if one does not exist; returning customers see orders associated with that email. Do not build or store passwords in this theme.

The local theme adds an accessible header account icon, mobile Sign in / Create account and View orders links, footer account links, and a cart order-history link. Links use Liquid `routes.account_login_url` / `routes.account_url`, guarded by `shop.customer_accounts_enabled`. Signed-in header text changes to Account. The builder preserves these additions. Shopify hosts login, profile, order history and logout; Liquid styles do not control those hosted screens.

Theme Check passed with zero errors and the same six existing RemoteAsset warnings. After owner reauthentication, the account links were uploaded to the existing unpublished Dev theme. The owner completed customer email-code login. The theme header link opened the native English Orders page with US market context; returning to the storefront changed Sign in to Account.

A new test order **#1002**, confirmation `2FE300YJM`, was placed under that authenticated test customer using Test Payment Gateway and a synthetic US address. The USD 24.98 order appeared in that customer's order history, and its detail page showed the correct item, USD 19.99 subtotal, USD 4.99 delivery and confirmed status. Profile, address display and sign-out controls were accessible. Logout was not executed, preserving the owner's current test session. No real payment or fulfillment was requested. The synthetic address is saved in this Dev-only customer profile and is not production customer data.

Desktop header and signed-in state were visually checked. Mobile account links are implemented, but the viewport override did not change browser dimensions in this verification run, so a new mobile visual pass is still pending. Earlier cart/mobile verification is a separate test, not evidence for these new account links.

CLI commands are now pinned to the verified 5.0.0 version to avoid unplanned version changes from `@latest`. CLI requested authentication after the earlier run; the exact cause was not established and must not be described as confirmed token expiry. Reuse the cached session. Shopify also supports a separate Theme Access credential for noninteractive theme work; no new access credential has been issued or stored by this task.

References: https://shopify.dev/docs/storefronts/themes/sign-in and https://help.shopify.com/en/manual/customers/customer-accounts

## Amazon MCF inventory-only setup — 2026-10-30

The owner authorized installing Amazon's official `Amazon MCF and Buy with Prime` app in the Dev store and checking inventory synchronization. Keep automatic fulfillment disabled. Do not submit existing test orders #1001 or #1002, create real Amazon fulfillment orders, or enable Prime services. Shopify test payment does not establish an Amazon fulfillment sandbox.

The Dev store's General settings were read directly: `Do not automatically fulfill any of the order's line items` is selected. No setting change was needed.

Installation is **not completed** and inventory synchronization is **not verified**. Shopify's app installation screen blocks installation pending store/organization owner identity verification. The owner was asked to complete the Shopify/Stripe identity flow directly; no identity documents were uploaded by the agent. The install screen also states that this app does not support market-based shipping and requires returning to legacy shipping profiles. That conversion warns that market shipping changes will be lost; its confirmation was cancelled without changing settings, pending identity verification.

Pre-conversion UI record: United States — TEST market `65595277423` is active, USD, with one enabled shipping option `TEST Standard Shipping`, USD 4.99, all products, `Shop location`. South Korea also has Standard and Express options (their prices were not inspected). Preserve/recreate these settings before completing any required shipping migration. The install page remains open for identity verification. Local evidence: `shopify/evidence/mcf-identity-required.png` (ignored).

Owner check: Shopify Settings > Users lists `ChoSJ` as both organization owner and store owner; the user detail shows ownership of two stores. This is an account display name, not verification of the legal identity of the company's representative. The owner requested deferring identity verification and Amazon setup until the representative is available, preferring representative ownership. No account, ownership, shipping or authentication changes were made.

Next Amazon step (on hold at the owner's request): after owner verification, preserve remaining shipping settings, perform the required Dev-only shipping migration, complete installation, and inspect Amazon connection/order submission controls before connecting real inventory. Verify automatic order submission is disabled at every relevant layer. Map only the pilot SKU after confirming its Amazon Seller SKU, and do not infer stock from the synthetic Shopify quantity.

Independent preparation: approved English copy already exists for 14 products under `content/products` and `content/copy/en/products`. The current Liquid pilot has only one product and hard-coded ArbutXA copy. Recommended next implementation is shared product templates with product-specific data, followed by the remaining product pages and collection navigation in the Dev-only unpublished theme. Preserve approved copy and SEO data; do not guess actual prices, Amazon Seller SKUs, shipping weights or inventory. Keep all actual fulfillment disabled. Mobile account UI verification remains pending.

For future updates, target the existing unpublished theme (do not create another one):

```powershell
npx.cmd --yes @shopify/cli@5.0.0 theme push --store celdyque-dev-test.myshopify.com --path shopify/theme --theme 189650600047 --strict --no-input
```

## Two-product original-design preview — 2026-10-30

ArbutXA and PDRN 12% + EGF Peptide Serum now use their own original HTML/CSS in unpublished theme 189650600047. The dev landing page is the original Products listing limited to these two products; the full original homepage and remaining 12 products are not migrated yet. About/FAQ/contact and unmigrated product links remain explicit links to the existing site. Cleanser navigation stays on the existing site until that category is migrated.

The shared purchase form reads the current Shopify variant, price and availability. Cart thumbnails now use each line item’s Shopify image. PDRN was registered with test price USD 19.99, synthetic stock 10 and the original official product image. No actual SKU or production weight was invented. All existing styles and both source FAQ entities were checked against the original files. The dev theme remains noindex and password protected.

Browser checks: both products add successfully; ArbutXA × 1 plus PDRN × 2 gives USD 59.97 subtotal, USD 4.99 TEST shipping and USD 64.96 at Shopify Test Payment Gateway checkout. This new mixed cart was not paid and no fulfillment was requested. Product-specific images load correctly. Serum filtering and PDRN FAQ expansion work. At 390px, PDRN has no horizontal overflow and the purchase form, account icon, mobile account/order menu are visible; viewport was reset. Nine Theme Check warnings concern retained external Google Fonts/Unsplash assets; zero errors. Remaining visual/performance, sold-out/overstock regressions and other site pages belong to the expansion stage.

Local proof: `shopify/evidence/pdrn-mobile-purchase.png` and `shopify/evidence/pdrn-desktop-purchase.png` (ignored). Preview: https://celdyque-dev-test.myshopify.com/products/test-celdyque-pdrn-12-egf-peptide-serum-30-ml?preview_theme_id=189650600047

## Full requested migration completed — 2026-10-30

The owner authorized the remaining 12 products plus homepage, About and FAQ, retaining the existing design in Dev only. All 14 test products now exist. CSV import completed with 12 products/12 images, overwrite OFF and new publication limited to Online Store. New products use USD 19.99 and synthetic stock 10, inventory tracked and overselling denied; actual SKUs/weights remain unconfirmed. Existing two products and their quantities were not overwritten.

Original homepage video, hero grid, philosophy slider, featured products and footer placement are retained. Original Products page has all 14 entries and Serum/Cream/Cleanser filters. About and FAQ are native page handles dispatched by the custom theme, with their original layouts. FAQ search/filter script is retained. Only two FAQ shopping answers were changed to accurately describe dev test checkout and unconfirmed future shipping/returns; FAQ schema matches these visible answers. Store, Contact, Coming Soon and standalone Brand Film remain links to the existing website, outside this request.

Verification: all 14 product routes, names, main images and enabled cart forms checked in the browser; no Liquid errors. Source product CSS and FAQ data match for every product; 63 media files match byte-for-byte. Original 18 HTML source hashes remain unchanged. Theme Check has zero errors and 39 RemoteAsset warnings for original external imagery/fonts. Homepage/About videos play, philosophy slider text/image changes, FAQ PDRN search yields three entries, and filters show two cleansers/three creams. At 390px, homepage/listing/About/FAQ have no horizontal overflow; the distinct Volufiline purchase layout was checked. Viewport restored.

Added new Niacinamide test product to the existing cart: subtotal USD 79.96, TEST shipping USD 4.99, total USD 84.95 at Test Payment Gateway. No new payment/order submission or Amazon fulfillment. Full performance benchmarks, all sold-out/overselling edge cases and pixel-perfect visual comparisons were not performed.

Before-migration theme ZIP: `shopify/evidence/before-full-migration-theme.zip`. Full proof and checks are in ignored `shopify/evidence/`. The store still uses live Horizon; our target 189650600047 remains a draft. Production website, main and DNS were not changed. The full migration and deployment workflow were subsequently committed and pushed only to `codex/shopify-liquid-pilot` in commit `95d1b06`; no PR or main merge was created.

Preview: https://celdyque-dev-test.myshopify.com/?preview_theme_id=189650600047
