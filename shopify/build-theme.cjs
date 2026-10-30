// Build only the isolated Shopify pilot; never modify the production sources.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(__dirname, 'theme');
for (const dir of ['assets', 'layout', 'templates', 'sections', 'snippets', 'config', 'locales']) fs.mkdirSync(path.join(out, dir), {recursive:true});
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => fs.writeFileSync(path.join(out, file), text.trim() + '\n');
const source = read('product-arbutxa-glow-cream.html');
const externalLinks = html => html.replace(/href="\/(?!\/)([^"]*\.html[^"\s]*)"/g, 'href="https://celdyque.com/$1"');
fs.copyFileSync(path.join(root, 'assets/site.css'), path.join(out, 'assets/site.css'));
write('assets/product.css', source.match(/<style>([\s\S]*?)<\/style>/)[1]);
fs.copyFileSync(path.join(root, 'images/제품/Mask group-5.webp'), path.join(out, 'assets/arbutxa-glow-cream.webp'));
let body = source.match(/<main class="container">([\s\S]*?)<\/main>/)[1];
body = body.replace('src="/images/제품/Mask group-5.webp"', 'src="{{ \'arbutxa-glow-cream.webp\' | asset_url }}"');
let cta = 0;
body = body.replace(/<a\s+href="https:\/\/www\.amazon\.com\/[\s\S]*?<\/a>/g, () => ++cta === 1 ? `{% render 'buy-form', product: product %}` : '<a href="#pilot-buy" class="btn-buy">Choose quantity &amp; add to cart &rarr;</a>');
body = body.replace('Shop this product using the retailer links below. Check your retailer for prices, availability, delivery and returns.', 'Add ArbutXA Glow Cream to your cart and continue to Shopify checkout. This development store uses test prices and test payments only.');
body = externalLinks(body).replace(/href="https:\/\/celdyque.com\/shop.html"/g, 'href="{{ routes.root_url }}"');
write('snippets/pilot-product.liquid', `<main id="MainContent" class="container">
<p class="pilot-notice">Development preview · Test product, price and shipping · No real payments</p>
${body}
</main>
{% if product != blank %}<script type="application/ld+json">{{ product | structured_data }}</script>{% endif %}`);
write('snippets/buy-form.liquid', `
<div id="pilot-buy" class="pilot-buy">
{% if product != blank %}
  {% assign variant = product.selected_or_first_available_variant %}
  <p class="pilot-price">{{ variant.price | money_with_currency }} <span>Test price</span></p>
  {% form 'product', product, id: 'PilotProductForm' %}
    {{ form.errors | default_errors }}
    <input type="hidden" name="id" value="{{ variant.id }}">
    <input type="hidden" name="return_to" value="{{ routes.cart_url }}">
    <div class="pilot-purchase-row">
      <label class="pilot-quantity">Quantity<input type="number" name="quantity" value="1" min="1" step="1" inputmode="numeric" required></label>
      <button type="submit" name="add" class="btn-buy" {% unless variant.available %}disabled{% endunless %}>{% if variant.available %}Add to cart &rarr;{% else %}Sold out{% endif %}</button>
    </div>
  {% endform %}
  <p class="pilot-shipping">US test delivery: $4.99 USD per order. Shipping and any applicable taxes are calculated at checkout.</p>
{% else %}<p>Test product setup is in progress.</p>{% endif %}
</div>`);
let header = externalLinks(read('partials/header.html'));
header = header.replace('href="https://celdyque.com/index.html"', 'href="{{ routes.root_url }}"');
header = header.replace(/href="https:\/\/celdyque.com\/shop.html"/g, 'href="{{ routes.root_url }}"');
header = header.replace('<div class="header-right">', `<div class="header-right">{% render 'account-link' %}<a class="pilot-cart-link" href="{{ routes.cart_url }}" aria-label="Cart, {{ cart.item_count }} items">Cart <span>{{ cart.item_count }}</span></a>`);
header = header.replace('<nav class="mobile-menu-nav">', `<nav class="mobile-menu-nav">
    {% if shop.customer_accounts_enabled %}
    <div class="pilot-mobile-account">
      <a href="{% if customer %}{{ routes.account_url }}{% else %}{{ routes.account_login_url }}{% endif %}" rel="nofollow">{% if customer %}My account{% else %}Sign in / Create account{% endif %}</a>
      <a href="{{ routes.account_url }}" rel="nofollow">View orders</a>
      {% unless customer %}<p>Sign in with an email code. No password needed.</p>{% endunless %}
    </div>
    {% endif %}`);
write('snippets/site-header.liquid', header);
let footer = externalLinks(read('partials/footer.html')).replace('© 2024 CELDYQUE', '© {{ "now" | date: "%Y" }} CELDYQUE');
footer = footer.replace('<li><a href="https://celdyque.com/store.html">Stores</a></li>', `<li><a href="https://celdyque.com/store.html">Stores</a></li>
        {% if shop.customer_accounts_enabled %}
        <li><a href="{% if customer %}{{ routes.account_url }}{% else %}{{ routes.account_login_url }}{% endif %}" rel="nofollow">{% if customer %}My account{% else %}Sign in / Create account{% endif %}</a></li>
        <li><a href="{{ routes.account_url }}" rel="nofollow">View orders</a></li>
        {% endif %}`);
write('snippets/site-footer.liquid', footer);
write('layout/theme.liquid', `<!doctype html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>{{ page_title | escape }} | CELDYQUÉ development preview</title>
  <meta name="description" content="{{ page_description | default: shop.description | strip_html | escape }}">
  <link rel="canonical" href="{{ canonical_url }}">
  {{ content_for_header }}
  {{ 'site.css' | asset_url | stylesheet_tag }}
  {{ 'product.css' | asset_url | stylesheet_tag }}
  {{ 'pilot.css' | asset_url | stylesheet_tag }}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="{{ 'pilot.js' | asset_url }}" defer></script>
</head>
<body class="product">
  <a href="#MainContent" class="pilot-skip">Skip to content</a>
  {% render 'site-header' %}
  {{ content_for_layout }}
  {% render 'site-footer' %}
</body>
</html>`);
write('sections/main-product.liquid', `{% render 'pilot-product', product: product %}
{% schema %}{"name":"ArbutXA original design","settings":[]}{% endschema %}`);
write('sections/pilot-home.liquid', `{% assign pilot_product = all_products['test-celdyque-arbutxa-glow-cream-50-ml'] %}
{% render 'pilot-product', product: pilot_product %}
{% schema %}{"name":"ArbutXA pilot","settings":[]}{% endschema %}`);
write('templates/product.json', JSON.stringify({sections:{main:{type:'main-product'}},order:['main']},null,2));
write('templates/index.json', JSON.stringify({sections:{main:{type:'pilot-home'}},order:['main']},null,2));
write('templates/cart.json', JSON.stringify({sections:{main:{type:'main-cart'}},order:['main']},null,2));
write('templates/404.liquid', `<main id="MainContent" class="container pilot-cart"><h1 class="serif">Page not found</h1><p>This development preview includes one product.</p><a class="btn-buy" href="{{ routes.root_url }}">View ArbutXA Glow Cream</a></main>`);
write('templates/search.liquid', `<main id="MainContent" class="container pilot-cart"><h1 class="serif">Search</h1><form action="{{ routes.search_url }}" method="get"><label>Search products<input type="search" name="q" value="{{ search.terms | escape }}"></label><input type="hidden" name="type" value="product"><button class="btn-buy" type="submit">Search</button></form>{% for item in search.results %}<p><a href="{{ item.url }}">{{ item.title | escape }}</a></p>{% else %}<p>No matching products. This preview contains ArbutXA Glow Cream only.</p>{% endfor %}</main>`);
write('config/settings_schema.json', JSON.stringify([{name:'theme_info',theme_name:'CELDYQUE Original Pilot',theme_version:'0.1.0',theme_author:'CELDYQUE',theme_documentation_url:'https://celdyque.com',theme_support_url:'https://celdyque.com/contact.html'}],null,2));
write('config/settings_data.json', '{"current":{}}');
write('locales/en.default.json', '{"general":{"accessibility":{"skip_to_content":"Skip to content"}}}');
require('./build-site.cjs');
console.log('Built isolated pilot at ' + out);
