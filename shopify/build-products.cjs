// Expand the original one-product builder with per-product markup and styles.
// All source HTML/CSS is read-only; only shopify/theme is generated.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(__dirname, 'theme');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => fs.writeFileSync(path.join(out, file), text.trim() + '\n');
const products = [
  {id:'arbutxa-glow-cream',handle:'test-celdyque-arbutxa-glow-cream-50-ml',image:'images/제품/Mask group-5.webp'},
  {id:'pdrn-12-egf',handle:'test-celdyque-pdrn-12-egf-peptide-serum-30-ml',image:'images/제품/Mask group.webp'}
];
const links = html => html.replace(/href="(?:https:\/\/celdyque.com)?\/([^"]*\.html[^"\s]*)"/g, (match, url) => {
  const file = url.split(/[?#]/)[0], suffix = url.slice(file.length);
  if (file === 'shop.html') return suffix === '?cat=cleanser' ? 'href="https://celdyque.com/shop.html?cat=cleanser"' : 'href="{{ routes.all_products_collection_url }}' + suffix + '"';
  if (file === 'index.html') return 'href="{{ routes.root_url }}"';
  const entry = products.find(p => file === 'product-' + p.id + '.html');
  return entry ? 'href="{{ all_products[\'' + entry.handle + '\'].url }}' + suffix + '"' : 'href="https://celdyque.com/' + url + '"';
});
for (const p of products) {
  const source = read('product-' + p.id + '.html');
  write('assets/product-' + p.id + '.css', source.match(/<style>([\s\S]*?)<\/style>/)[1]);
  fs.copyFileSync(path.join(root,p.image),path.join(out,'assets',p.id+'.webp'));
  let body = source.match(/<main class="container">([\s\S]*?)<\/main>/)[1];
  body = body.replaceAll('src="/'+p.image+'"','src="{{ \''+p.id+'.webp\' | asset_url }}"');
  let cta = 0;
  body = body.replace(/<a\s+href="https:\/\/www\.amazon\.com\/[\s\S]*?<\/a>/g, () => ++cta === 1 ? "{% render 'buy-form', product: product %}" : '<a href="#pilot-buy" class="btn-buy">Choose quantity &amp; add to cart &rarr;</a>');
  if(cta !== 2) throw new Error('Unexpected purchase link count for '+p.id);
  body = links(body).replace('Shop this product using the retailer links below. Check your retailer for prices, availability, delivery and returns.','Add this product to your cart and continue to Shopify checkout. This development store uses test prices and test payments only.');
  const graph = JSON.parse(source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const faq = graph['@graph']?.find(x => x['@type'] === 'FAQPage');
  if(faq) { delete faq['@id']; faq['@context']='https://schema.org'; }
  write('snippets/product-'+p.id+'.liquid','<main id="MainContent" class="container"><p class="pilot-notice">Development preview · Test product, price and shipping · No real payments</p>\n'+body+'\n</main>\n<script type="application/ld+json">{{ product | structured_data }}</script>\n'+(faq?'<script type="application/ld+json">'+JSON.stringify(faq)+'</script>':''));
}
write('snippets/pilot-product.liquid',"{% case product.handle %}\n"+products.map(p=>"{% when '"+p.handle+"' %}{% render 'product-"+p.id+"', product: product %}").join('\n')+'\n{% else %}<main id="MainContent" class="container pilot-cart"><h1>{{ product.title | escape }}</h1><p>This product is not in the development preview yet.</p><a href="{{ routes.all_products_collection_url }}">View test products</a></main>{% endcase %}');
write('snippets/product-styles.liquid',"{% case product.handle %}\n"+products.map(p=>"{% when '"+p.handle+"' %}{{ 'product-"+p.id+".css' | asset_url | stylesheet_tag }}").join('\n')+"\n{% else %}{{ 'product-arbutxa-glow-cream.css' | asset_url | stylesheet_tag }}{% endcase %}");
for(const name of ['site-header','site-footer']) {
  const file='snippets/'+name+'.liquid';
  let html=links(fs.readFileSync(path.join(out,file),'utf8'));
  // The original pilot mapped Products to root. Both root and collection now list the test products.
  write(file,html);
}
const layoutPath=path.join(out,'layout/theme.liquid');
write('layout/theme.liquid',fs.readFileSync(layoutPath,'utf8')
  .replace("{{ 'product.css' | asset_url | stylesheet_tag }}","{% if request.page_type == 'index' or request.page_type == 'collection' %}{{ 'shop.css' | asset_url | stylesheet_tag }}{% else %}{% render 'product-styles', product: product %}{% endif %}")
  .replace('<body class="product">','<body class="{% if request.page_type == \'index\' or request.page_type == \'collection\' %}shop{% else %}product{% endif %}">'));
const shop=read('shop.html');
write('assets/shop.css',shop.match(/<style>([\s\S]*?)<\/style>/)[1]);
fs.copyFileSync(path.join(root,'images/water-forms-beautiful-light-patterns.webp'),path.join(out,'assets/collection-water.webp'));
const originalCards=[...shop.replace(/<!--[\s\S]*?-->/g,'').matchAll(/<a class="p-card"[\s\S]*?<\/a>/g)].map(m=>m[0]);
const cards=products.map(p=>{
  let card=originalCards.find(x=>x.includes('/product-'+p.id+'.html'));
  if(!card) throw new Error('Missing original card: '+p.id);
  card=links(card.replaceAll('src="/'+p.image+'"','src="{{ \''+p.id+'.webp\' | asset_url }}"'));
  return "{% assign card_product = all_products['"+p.handle+"'] %}{% if card_product != blank %}"+card+'{% endif %}';
}).join('\n');
write('sections/pilot-home.liquid',[
  '<main id="MainContent" class="page-wrap"><div class="page-container">',
  '<section class="top-frame full-bleed"><div class="shop-hero" aria-label="Products collection banner"><img src="{{ \'collection-water.webp\' | asset_url }}" alt="Light patterns on water" width="1920" height="838" loading="eager" fetchpriority="high"></div></section>',
  '<p class="pilot-notice">Development preview · Two test products · Test prices and payments only · No Amazon fulfillment</p>',
  '<section class="shop-section"><div class="shop-layout"><aside class="shop-side"><div class="shop-breadcrumb">Products</div><h1 class="shop-title">All Products</h1><div class="filter-list" role="group" aria-label="Product category filter"><button type="button" class="filter-btn active" data-filter="all" aria-pressed="true">All</button><button type="button" class="filter-btn" data-filter="serum" aria-pressed="false">Serum</button><button type="button" class="filter-btn" data-filter="cream" aria-pressed="false">Cream</button></div></aside>',
  '<div class="shop-main"><div class="products-grid" id="productsGrid">'+cards+'</div></div></div></section></div></main>',
  '{% schema %}{"name":"Original product listing","settings":[]}{% endschema %}'
].join('\n'));
write('templates/collection.json',JSON.stringify({sections:{main:{type:'pilot-home'}},order:['main']},null,2));
write('sections/main-product.liquid',"{% render 'pilot-product', product: product %}\n{% schema %}{\"name\":\"Original product design\",\"settings\":[]}{% endschema %}");
write('templates/404.liquid','<main id="MainContent" class="container pilot-cart"><h1 class="serif">Page not found</h1><p>This development preview includes two products.</p><a class="btn-buy" href="{{ routes.all_products_collection_url }}">View test products</a></main>');
write('templates/search.liquid',fs.readFileSync(path.join(out,'templates/search.liquid'),'utf8').replace('This preview contains ArbutXA Glow Cream only.','This development preview contains two products.'));
console.log('Expanded original-design preview to '+products.length+' products.');
