// Read-only migration of the approved public sources into the isolated dev theme.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const out = path.join(__dirname, 'theme');
const products = require('./catalog.json');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, value) => fs.writeFileSync(path.join(out, file), (file.endsWith('.liquid') ? value.replace(/[\t ]+$/gm, '') : value).trim() + '\n');
const noComments = value => value.replace(/<!--[\s\S]*?-->/g, '');
const assets = new Map();
function assetName(url) {
  const local = decodeURI(url.replace(/^\//, '').split('?')[0]);
  if (assets.has(local)) return assets.get(local);
  const file = path.resolve(root, local);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) throw new Error('Missing local media: ' + url);
  const ext = path.extname(file);
  const stem = path.basename(file, ext).replace(/[^a-zA-Z0-9-]+/g, '-').slice(0, 45);
  const name = 'media-' + crypto.createHash('sha256').update(local).digest('hex').slice(0, 10) + '-' + stem + ext;
  if (fs.statSync(file).size > 20 * 1024 * 1024) throw new Error('Oversized theme asset: ' + local);
  fs.copyFileSync(file, path.join(out, 'assets', name));
  assets.set(local, name);
  return name;
}
const assetUrl = url => "{{ '" + assetName(url) + "' | asset_url }}";
function media(html) {
  return html.replace(/\b(src|poster)="(\/?(?:images|videos)\/[^"<>]+)"/g, (_, attr, url) => attr + '="' + assetUrl(url) + '"')
    .replace(/\bsrcset="([^"]+)"/g, (match, value) => {
      if (!/^\/?images\//.test(value)) return match;
      return 'srcset="' + value.split(/,\s*/).map(item => {
        const parts = item.match(/^(.*?)(\s+\d+[wx])?$/);
        return assetUrl(parts[1]) + (parts[2] || '');
      }).join(', ') + '"';
    });
}
function route(url) {
  if (/^https?:\/\//.test(url) && !url.startsWith('https://celdyque.com/')) return url;
  const local = url.replace(/^https:\/\/celdyque\.com/, '').replace(/^\//, '');
  const file = local.split(/[?#]/)[0], suffix = local.slice(file.length);
  if (file === '' || file === 'index.html') return '{{ routes.root_url }}' + suffix;
  if (file === 'shop.html') return '{{ routes.all_products_collection_url }}' + suffix;
  if (file === 'about.html' || file === 'faq.html') return '{{ pages[\'' + file.replace('.html','') + '\'].url }}' + suffix;
  const product = products.find(p => file === 'product-' + p.id + '.html' || (file === 'product-detail.html' && p.id === 'volufiline-100'));
  if (product) return '{{ all_products[\'' + product.handle + '\'].url }}' + suffix;
  return 'https://celdyque.com/' + local;
}
function links(html) {
  return html.replace(/href="((?:https:\/\/celdyque\.com\/|\/)?[^"\s]*\.html[^"\s]*|\/)"/g, (_, url) => 'href="' + route(url) + '"');
}
function inlineStyles(source) {
  return [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
}
function structured(source, type) {
  const script = source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!script) return null;
  const data = JSON.parse(script[1]);
  return (data['@graph'] || [data]).find(x => x['@type'] === type);
}
function schemaTag(data) {
  const copy = {...data, '@context':'https://schema.org'};
  delete copy['@id'];
  return '<script type="application/ld+json">' + JSON.stringify(copy) + '</script>';
}
const notice = '<p class="pilot-notice">Development preview · Test products, prices and shipping · No real payments or fulfillment</p>';

// Preserve the body and styles independently for every product, including Volufiline's distinct layout.
for (const p of products) {
  const source = read('product-' + p.id + '.html');
  write('assets/product-' + p.id + '.css', inlineStyles(source));
  let body = source.match(/<main class="container">([\s\S]*?)<\/main>/)[1];
  let count = 0;
  body = body.replace(/<a\s+href="https:\/\/www\.amazon\.com\/[\s\S]*?<\/a>/g, () => ++count === 1 ? "{% render 'buy-form', product: product %}" : '<a href="#pilot-buy" class="btn-buy">Choose quantity &amp; add to cart &rarr;</a>');
  if (count !== 2) throw new Error('Unexpected purchase CTA count: '+p.id+' '+count);
  body = body.replace('Shop this product using the retailer links below. Check your retailer for prices, availability, delivery and returns.', 'Add this product to your cart and continue to Shopify checkout. This development store uses test prices and test payments only.');
  const faq = structured(source, 'FAQPage');
  write('snippets/product-' + p.id + '.liquid', '<main id="MainContent" class="container">' + notice + '\n' + links(media(body)) + '\n</main>\n<script type="application/ld+json">{{ product | structured_data }}</script>\n' + (faq ? schemaTag(faq) : ''));
}
write('snippets/pilot-product.liquid', '{% case product.handle %}\n' + products.map(p => "{% when '"+p.handle+"' %}{% render 'product-"+p.id+"', product: product %}").join('\n') + '\n{% else %}<main id="MainContent" class="container pilot-cart"><h1>{{ product.title | escape }}</h1>{{ product.description }}{% render \'buy-form\', product: product %}</main>{% endcase %}');
write('snippets/product-styles.liquid', '{% case product.handle %}\n' + products.map(p => "{% when '"+p.handle+"' %}{{ 'product-"+p.id+".css' | asset_url | stylesheet_tag }}").join('\n') + "\n{% else %}{{ 'product-arbutxa-glow-cream.css' | asset_url | stylesheet_tag }}{% endcase %}");

// Reuse the commerce/account additions from the base builder, remapping links once.
for (const name of ['site-header','site-footer']) {
  const file = 'snippets/' + name + '.liquid';
  let html = fs.readFileSync(path.join(out,file),'utf8');
  // Base pilot previously sent Products to root because it only had one product.
  html = html.replace(/href="\{\{ routes.root_url \}\}">(Products|All)<\/a>/g, 'href="{{ routes.all_products_collection_url }}">$1</a>');
  write(file, links(html));
}

// Full original Products listing, including its banner, grid, spacing and all category filters.
const shop = noComments(read('shop.html'));
let listing = shop.match(/<div class="page-wrap">([\s\S]*?)\s*<script>/)[1];
listing = listing.replace(/<div id="siteHeader">[\s\S]*?<\/header><\/div>/, '')
  .replace(/<div id="siteFooter">[\s\S]*?<\/footer><\/div>/, '')
  .replace(/<div id="(?:searchModal|mobileMenuOverlay|mobileMenu)"><\/div>/g, '')
  .replace('<main class="shop-main">','<div class="shop-main">').replace('</main>','</div>');
// The captured listing includes its original outer closing div; restore the opening tag.
listing = '<main id="MainContent"><div class="page-wrap">' + listing + '</main>';
listing = listing.replace('<section class="shop-section">', notice + '<section class="shop-section">');
// Align the legacy collection label with the approved product title, without editing the public source.
listing = listing.replace('Niacinamide 20%<br/>Advanced Serum', 'Niacinamide 20%<br/>Pore Minimizer Serum');
write('assets/shop.css', inlineStyles(shop));
write('sections/original-collection.liquid', links(media(listing)) + '\n{% schema %}{"name":"Original Products listing","settings":[]}{% endschema %}');
write('templates/collection.json', JSON.stringify({sections:{main:{type:'original-collection'}},order:['main']},null,2));

// Homepage: keep the video, card layouts, philosophy slider and footer placement.
const home = read('index.html');
let homeBody = home.match(/<main[\s\S]*?<\/main>/)[0].replace('id="main-content"','id="MainContent"');
homeBody = homeBody.replace(/<div id="siteHeader">[\s\S]*?<\/header><\/div>/, "<div id=\"siteHeader\">{% render 'site-header' %}</div>")
  .replace(/<div id="siteFooter">[\s\S]*?<\/footer><\/div>/, "<div id=\"siteFooter\">{% render 'site-footer' %}</div>")
  .replace(/<div id="(?:mobileMenuOverlay|mobileMenu)"><\/div>/g, '');
let slider = [...home.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('philosophy-nav'));
slider = slider.replace(/"(\/images\/[^"\n]+)"/g, (_,url)=>'"'+assetUrl(url)+'"');
slider = links(slider);
fs.copyFileSync(path.join(root,'assets/home.css'),path.join(out,'assets/home.css'));
write('sections/pilot-home.liquid', links(media(noComments(homeBody))) + '\n<script>' + slider + '</script>\n{% schema %}{"name":"Original homepage","settings":[]}{% endschema %}');

// Original informational pages dispatch by stable page handle; no changes to the live theme needed.
const about = read('about.html');
let aboutBody = about.slice(about.indexOf('<section class="brand-hero">'), about.indexOf('<div id="siteFooter">'));
write('assets/about.css', inlineStyles(about));
write('snippets/page-about.liquid', '<main id="MainContent">' + links(media(aboutBody)) + '</main>');
const faqSource = read('faq.html');
let faqBody = faqSource.match(/<main[\s\S]*?<\/main>/)[0].replace('id="main-content"','id="MainContent"');
const shoppingAnswers = [
  ['Use the retailer links on our Where to Buy page or the Amazon link on the relevant product page. Available products, destinations, prices and delivery estimates are set by the retailer and may change.', 'In this development preview, add a test product to your cart and continue to Shopify test checkout. For real purchases, use the retailer links on the existing CELDYQUE website.'],
  ['This website provides product information and links to retailers. Purchases are completed with the selected retailer. Check that retailer for the current shipping, payment and return terms, and contact them about an existing order.', 'This development store uses test payments and test shipping rates only. No real payment or shipment is made. Actual shipping and return policies will be confirmed before launch. For existing retailer orders, contact the retailer that handled the purchase.']
];
let faqData = structured(faqSource,'FAQPage');
for (const [before,after] of shoppingAnswers) {
  if (!faqBody.includes(before)) throw new Error('FAQ commerce text changed at source');
  faqBody = faqBody.replace(before,after);
  faqData = JSON.parse(JSON.stringify(faqData).replace(before,after));
}
write('assets/faq.css',inlineStyles(faqSource));
fs.copyFileSync(path.join(root,'assets/faq.js'),path.join(out,'assets/faq.js'));
write('snippets/page-faq.liquid',links(faqBody) + '\n' + schemaTag(faqData));
write('sections/original-page.liquid', "{% case page.handle %}{% when 'about' %}{% render 'page-about' %}{% when 'faq' %}{% render 'page-faq' %}{% else %}<main id=\"MainContent\" class=\"container pilot-cart\"><h1>{{ page.title | escape }}</h1>{{ page.content }}</main>{% endcase %}\n{% schema %}{\"name\":\"Original content page\",\"settings\":[]}{% endschema %}");
write('templates/page.json',JSON.stringify({sections:{main:{type:'original-page'}},order:['main']},null,2));

// Keep each page's original fonts/styles separate from product styles.
const styles = [
  "{% case request.page_type %}",
  "{% when 'index' %}{{ 'home.css' | asset_url | stylesheet_tag }}",
  "{% when 'collection' %}{{ 'shop.css' | asset_url | stylesheet_tag }}",
  "{% when 'page' %}{% case page.handle %}{% when 'about' %}{{ 'about.css' | asset_url | stylesheet_tag }}{% when 'faq' %}{{ 'faq.css' | asset_url | stylesheet_tag }}<script src=\"{{ 'faq.js' | asset_url }}\" defer></script>{% else %}{% render 'product-styles', product: product %}{% endcase %}",
  "{% else %}{% render 'product-styles', product: product %}{% endcase %}"
].join('\n');
let layout = fs.readFileSync(path.join(out,'layout/theme.liquid'),'utf8');
layout = layout.replace("{{ 'product.css' | asset_url | stylesheet_tag }}", styles)
  .replace('<body class="product">','<body class="{% case request.page_type %}{% when \'index\' %}home{% when \'collection\' %}shop{% when \'page\' %}content-page{% else %}product{% endcase %}">')
  .replace("{% render 'site-header' %}","{% unless request.page_type == 'index' %}{% render 'site-header' %}{% endunless %}")
  .replace("{% render 'site-footer' %}","{% unless request.page_type == 'index' %}{% render 'site-footer' %}{% endunless %}")
  .replace('Inter:wght@400;500;600;700;800','Inter:wght@300;400;500;600;700;800');
write('layout/theme.liquid',layout);
write('templates/404.liquid','<main id="MainContent" class="container pilot-cart"><h1 class="serif">Page not found</h1><a class="btn-buy" href="{{ routes.all_products_collection_url }}">View test products</a></main>');
write('templates/search.liquid',fs.readFileSync(path.join(out,'templates/search.liquid'),'utf8').replace('This preview contains ArbutXA Glow Cream only.','Try a product name or ingredient.'));
fs.writeFileSync(path.join(__dirname,'asset-map.json'),JSON.stringify(Object.fromEntries(assets),null,2)+'\n');
fs.writeFileSync(path.join(__dirname,'url-map.json'),JSON.stringify(Object.fromEntries([['/index.html','/'],['/shop.html','/collections/all'],['/about.html','/pages/about'],['/faq.html','/pages/faq'],...products.map(p=>['/product-'+p.id+'.html','/products/'+p.handle])]),null,2)+'\n');
console.log('Built all '+products.length+' products, homepage, Products, About and FAQ; '+assets.size+' original media assets.');
