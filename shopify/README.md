# CELDYQUE original-design Shopify pilot

## Isolation

- Branch: `codex/shopify-liquid-pilot` in a dedicated Git worktree.
- Target: `celdyque-dev-test.myshopify.com` only.
- Theme is custom, based on the existing ArbutXA HTML/CSS. No Horizon dependency.
- Do not publish to the production website, push `main`, change DNS, or connect Amazon fulfillment.
- Upload as an **unpublished** theme. Existing Horizon stays intact.
- All pages contain `noindex,nofollow`; the development store stays password protected.

## Files

- `build-theme.cjs`: copies the approved product markup and original styles into theme structure.
- `theme/`: deployable theme. `assets/pilot.css` and `pilot.js` contain the small commerce additions.
- `theme/snippets/pilot-product.liquid`: existing product content.
- `theme/snippets/buy-form.liquid`: Shopify variant, price, availability, quantity, native product form.
- `theme/sections/main-cart.liquid`: Shopify native cart and checkout handoff.

Run from this worktree root:

```powershell
node shopify/build-theme.cjs
npx.cmd --yes @shopify/cli@latest theme check --path shopify/theme
npx.cmd --yes @shopify/cli@latest theme package --path shopify/theme
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

Checkout is Shopify hosted. Its layout is not controlled by this Liquid product template. Search uses Shopify's native product search; the existing header appearance is retained. Customer accounts and Amazon MCF are subsequent integrations, not implemented in this pilot.

Original Google Fonts and three Unsplash images are preserved. Shopify Theme Check reports six `RemoteAsset` performance warnings and zero errors; these remote assets should be reviewed during full migration.

## Current verification status

Dev product 15658664296559 is saved and active, with the existing product image, USD 19.99 price, and 10 test units. US test market 65595277423 is active with TEST Standard Shipping at USD 4.99. Shopify Test payment gateway is active; automatic fulfillment is disabled.

Shopify CLI authentication completed and the theme was uploaded successfully as **unpublished**, ID `189650600047`. Horizon remains the live theme in the dev store. The admin Online Store preferences and editor iframes still render blank in the browser tool.

Preview: https://celdyque-dev-test.myshopify.com/?preview_theme_id=189650600047

The owner entered the existing storefront password directly. On 2026-10-27 browser verification passed for product rendering, add to cart, quantity changes (2 units = USD 39.98), removal/empty cart, native product search, FAQ expansion, and the mobile purchase form/menu at 390px width. The viewport was restored afterward.

Test checkout completed successfully: order **#1001**, Shopify order ID `18957541408879`, confirmation `3CN9FCYX1`. One unit at USD 19.99 plus TEST Standard Shipping at USD 4.99 totals **USD 24.98**. The confirmation page identifies Test Payment Gateway; admin records paid and unfulfilled. The address is deliberately synthetic and produces an address warning; it is not a shipping destination. No real payment or fulfillment took place.

Card input iframes initially remained blank, including after a reload. Opening the same checkout in a fresh tab restored them and allowed the successful test. Keep this observation for browser regression testing; the cause is not established. Evidence screenshots are stored locally in ignored `shopify/evidence/`.

Production checkout and Amazon fulfillment remain unconnected. Customer accounts are not yet implemented or verified. Before launch, replace test prices, shipping rules and address/contact defaults with confirmed business data and configure a real payment provider.

For future updates, target the existing unpublished theme (do not create another one):

```powershell
npx.cmd --yes @shopify/cli@latest theme push --store celdyque-dev-test.myshopify.com --path shopify/theme --theme 189650600047 --strict --no-input
```
