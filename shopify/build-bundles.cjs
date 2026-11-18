// Dev-only offer presentation. These are independent test products, NOT shared-inventory bundles.
const fs = require('node:fs');
const path = require('node:path');
const catalog = require('./catalog.json');
const audit = require('./amazon-store-audit-2026-11-18.json');
const assets = require('./asset-map.json');
const out = path.join(__dirname, 'theme');
const write = (file, text) => fs.writeFileSync(path.join(out, file), text.trim() + '\n');
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const offers = audit.products.filter(p => ['multipack', 'mixed_bundle'].includes(p.type)).map(p => ({
  asin: p.asin, handle: 'test-celdyque-set-' + p.asin.toLowerCase(), name: p.name,
  type: p.type, priceUsd: p.official_price_usd, amazonUrl: p.amazon_url,
  amazonSellerSku: null, devSku: 'DEV-BUNDLE-' + p.asin,
  inventoryModel: 'independent-test-stock-not-amazon-linked',
  components: p.components.map(c => ({...c, ...catalog.find(s => s.id === c.product_id)}))
}));
if (offers.length !== 13) throw new Error('Expected 13 approved additional offers');
const composition = o => o.components.map(c => `${c.quantity} × ${c.name} (${c.size.split(' / ')[0]})`).join(' + ');
const image = c => `<img src="{{ '${assets[c.image]}' | asset_url }}" width="480" height="480" loading="lazy" alt="${esc(c.name)}">`;
fs.writeFileSync(path.join(__dirname, 'bundle-catalog.json'), JSON.stringify({
  approvedDate: '2026-11-18', scope: 'Dev UI and native cart only', currency: 'USD',
  warning: 'DEV-BUNDLE-* identifiers are placeholders, not Amazon MSKUs. Component stock is NOT deducted. No MCF integration or real fulfillment.', offers
}, null, 2) + '\n');

// Import only NEW dev products. Never import this over the existing single products.
const headers = ['Handle','Title','Body (HTML)','Vendor','Type','Tags','Published','Option1 Name','Option1 Value','Variant SKU','Variant Inventory Tracker','Variant Inventory Qty','Variant Inventory Policy','Variant Fulfillment Service','Variant Price','Variant Requires Shipping','Variant Taxable','Image Src','Image Alt Text','Status'];
const csv = row => row.map(s => '"' + String(s).replaceAll('"','""') + '"').join(',');
const rows = offers.map(o => [o.handle, '[TEST] CELDYQUE ' + o.name,
  '<p>' + esc(composition(o)) + '</p><p>Development test set. No real payment or fulfillment.</p>',
  'CELDYQUE','Test Set','dev-bundle-prototype, amazon-' + o.asin,'TRUE','Title','Default Title',o.devSku,
  'shopify',10,'deny','manual',o.priceUsd.toFixed(2),'TRUE','TRUE',
  'https://celdyque.com/' + encodeURI(o.components[0].image),o.components[0].name,'active']);
fs.writeFileSync(path.join(__dirname,'dev-bundles-13.csv'), '\uFEFF' + [headers,...rows].map(csv).join('\r\n') + '\r\n');

function card(handle, title, detail) {
  return `{% render 'bundle-option-card', product: product, handle: '${handle}', title: '${title.replaceAll("'", '&#39;')}', detail: '${detail.replaceAll("'", '&#39;')}' %}`;
}
const setLabels = {
  B0DHK1ZPV6: 'Volufiline + Serum', B0HCMSRJB7: 'Volufiline + Cream',
  B0HCMZJDDB: 'Serum + Cream', B0HGD7BQ3W: 'Serum + Cream',
  B0G4R7N24X: '12% Serum + Cream', B0G7CPYW4V: '25% Serum + Cream',
  B0G8GK8FX4: '2 Serums + Cream', B0G6HS2JNG: 'Oil + Cleanser'
};
const optionTitle = o => o.type === 'multipack' ? '2-Pack' : o.asin === 'B0G8GK8FX4' ? 'Trio' : 'Bundle';
const optionDetail = o => o.type === 'multipack' ? '2 × ' + o.components[0].size.split(' / ')[0] : setLabels[o.asin];
write('snippets/bundle-option-card.liquid', `{% assign offer_product = all_products[handle] %}
{% if offer_product != blank %}{% assign offer_variant = offer_product.selected_or_first_available_variant %}
<a class="pilot-offer{% if product.handle == handle %} is-selected{% endif %}" href="{{ offer_product.url }}#pilot-buy" data-offer="{{ handle | escape }}" data-variant="{{ offer_variant.id }}" data-title="{{ offer_product.title | remove: '[TEST] CELDYQUE ' | escape }}" data-available="{{ offer_variant.available }}" data-set="{% if offer_product.tags contains 'dev-bundle-prototype' %}true{% else %}false{% endif %}" data-label="{{ title | escape }} · {{ detail | escape }}" {% if product.handle == handle %}aria-current="page"{% endif %}>
<strong>{{ title | escape }}</strong><span>{{ detail | escape }}</span><b>{{ offer_product.price | money }}</b>{% unless offer_variant.available %}<small>Sold out</small>{% endunless %}</a>
<template data-offer-content="{{ handle | escape }}"><div data-offer-price>{{ offer_variant.price | money_with_currency }} <span>{% if offer_product.tags contains 'dev-bundle-prototype' %}per set{% else %}each{% endif %}</span></div><div data-offer-contents>{% render 'bundle-contents', product: offer_product %}</div><div data-offer-gallery>{% render 'bundle-gallery', product: offer_product %}</div></template>{% endif %}`);
let selector = '{% case product.handle %}\n';
for (const p of [...catalog, ...offers]) {
  // On set pages offer alternatives for the first component; no global 27-product all_products lookup.
  const base = p.components ? p.components[0] : p;
  const related = offers.filter(o => o.components.some(c => c.id === base.id));
  if (!related.length) continue;
  const selected = p.components ? optionTitle(p) + (p.type === 'multipack' ? '' : ' · ' + optionDetail(p)) : '1-Pack';
  selector += `{% when '${p.handle}' %}<nav class="pilot-offers" aria-label="Choose your set"><h3><span>Set:</span> ${esc(selected)}</h3><div class="pilot-offer-grid">`;
  selector += card(base.handle, '1-Pack', base.size.split(' / ')[0]);
  selector += related.map(o => card(o.handle, optionTitle(o), optionDetail(o))).join('\n');
  selector += '</div></nav>\n';
}
write('snippets/bundle-options.liquid', selector + '{% endcase %}');
write('snippets/bundle-contents.liquid', '{% case product.handle %}\n' + offers.map(o =>
  `{% when '${o.handle}' %}<div class="pilot-set-contents"><strong>Included per set</strong><ul>${o.components.map(c=>`<li>${c.quantity} × ${esc(c.name)} · ${esc(c.size.split(' / ')[0])}</li>`).join('')}</ul></div>`).join('\n') + '\n{% endcase %}');
write('snippets/bundle-gallery.liquid', '{% case product.handle %}\n' + catalog.map(c =>
  `{% when '${c.handle}' %}<div class="pilot-single-gallery">${image(c)}</div>`).join('\n') + '\n' + offers.map(o =>
  `{% when '${o.handle}' %}<div class="pilot-set-gallery">${o.components.map(c => `<figure>${image(c)}<figcaption>${c.quantity} × ${esc(c.name)}<span>${esc(c.size.split(' / ')[0])} each</span></figcaption></figure>`).join('')}</div>`).join('\n') + '\n{% endcase %}');
write('snippets/bundle-product.liquid', `<main id="MainContent" class="container pilot-set-page">
<p class="pilot-notice">Development preview · Test stock only · No real payments or fulfillment</p>
<a class="pilot-continue" href="{{ routes.all_products_collection_url }}">← All products</a>
<div class="pilot-set-hero"><div data-pilot-gallery>{% render 'bundle-gallery', product: product %}</div><div class="pilot-set-info">
<p class="pilot-set-eyebrow">CELDYQUÉ · SETS &amp; MULTIPACKS</p><h1 class="serif">{{ product.title | remove: '[TEST] CELDYQUE ' | escape }}</h1>
{% render 'buy-form', product: product %}
<p class="pilot-set-note">One set contains the quantities listed above. Follow the directions on each individual product.</p>
</div></div></main><script type="application/ld+json">{{ product | structured_data }}</script>`);
let dispatcher = fs.readFileSync(path.join(out,'snippets/pilot-product.liquid'),'utf8');
dispatcher = dispatcher.replace('{% else %}', offers.map(o=>`{% when '${o.handle}' %}{% render 'bundle-product', product: product %}`).join('\n') + '\n{% else %}');
write('snippets/pilot-product.liquid',dispatcher);
write('snippets/buy-form.liquid', `<div id="pilot-buy" class="pilot-buy" data-initial-offer="{{ product.handle | escape }}">
{% if product != blank %}
{% assign variant = product.selected_or_first_available_variant %}
<p class="pilot-price">{{ variant.price | money_with_currency }} <span>{% if product.tags contains 'dev-bundle-prototype' %}per set{% else %}each{% endif %}</span></p>
{% render 'bundle-options', product: product %}
<div data-pilot-contents>{% render 'bundle-contents', product: product %}</div>
<p class="pilot-selection-status" role="status" aria-live="polite" aria-atomic="true"></p>
{% form 'product', product, id: 'PilotProductForm' %}
{{ form.errors | default_errors }}
<input type="hidden" name="id" value="{{ variant.id }}"><input type="hidden" name="return_to" value="{{ routes.cart_url }}">
<div class="pilot-purchase-row"><label class="pilot-quantity"><span data-pilot-quantity-label>{% if product.tags contains 'dev-bundle-prototype' %}Sets{% else %}Quantity{% endif %}</span><input type="number" name="quantity" value="1" min="1" step="1" inputmode="numeric" required></label>
<button type="submit" name="add" class="btn-buy" {% unless variant.available %}disabled{% endunless %}>{% if variant.available %}Add to cart →{% else %}Sold out{% endif %}</button></div>
{% endform %}<p class="pilot-shipping">US test delivery: $4.99 USD per order. Shipping and any applicable taxes are calculated at checkout.</p>
{% else %}<p>Test product setup is in progress.</p>{% endif %}</div>`);
// Use the collection loop rather than all_products to avoid Shopify's per-page handle lookup limit.
write('snippets/bundle-listing.liquid', `<section class="pilot-bundle-listing" aria-labelledby="sets-heading"><h2 id="sets-heading" class="serif">Sets &amp; multipacks</h2><p>Choose a pair, a routine, or a second bottle.</p><div class="pilot-set-list-grid">
{% for set_product in collections.all.products limit: 50 %}{% if set_product.tags contains 'dev-bundle-prototype' %}
<article><a href="{{ set_product.url }}">{% render 'bundle-gallery', product: set_product %}<h3>{{ set_product.title | remove: '[TEST] CELDYQUE ' | escape }}</h3><p>{{ set_product.price | money_with_currency }}</p></a></article>
{% endif %}{% endfor %}</div></section>`);
let collection = fs.readFileSync(path.join(out,'sections/original-collection.liquid'),'utf8');
write('sections/original-collection.liquid', collection.replace('</main>',"{% render 'bundle-listing' %}</main>"));
console.log('Built 13 dev set offers, related selectors, composition gallery and new-products-only CSV.');
