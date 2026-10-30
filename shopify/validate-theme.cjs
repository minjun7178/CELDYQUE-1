// Integration checks against the original site and the generated Shopify theme.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const catalog = require('./catalog.json');
assert.equal(catalog.length, 14);
assert.equal(new Set(catalog.map(p => p.handle)).size, 14);
for (const p of catalog) {
  const source = read('product-' + p.id + '.html');
  const theme = read('shopify/theme/snippets/product-' + p.id + '.liquid');
  const css = read('shopify/theme/assets/product-' + p.id + '.css');
  assert.equal(css.trim(), source.match(/<style[^>]*>([\s\S]*?)<\/style>/)[1].trim(), p.id + ' styles');
  assert.equal((theme.match(/render 'buy-form'/g) || []).length, 1, p.id + ' form');
  const graph = JSON.parse(source.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const faq = graph['@graph'].find(x => x['@type'] === 'FAQPage');
  const schemas = [...theme.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(schemas.filter(m=>m[1].includes('product | structured_data')).length, 1);
  if (faq) assert.deepEqual(JSON.parse(schemas[1][1]).mainEntity, faq.mainEntity, p.id + ' FAQ');
  assert(!/href="https:\/\/www\.amazon\.com\//.test(theme), p.id + ' purchase CTA');
}
const assetMap = require('./asset-map.json');
for (const [source, target] of Object.entries(assetMap)) {
  assert.deepEqual(fs.readFileSync(path.join(root, source)), fs.readFileSync(path.join(__dirname,'theme/assets',target)), source);
}
for (const dir of ['snippets','sections']) {
  for (const file of fs.readdirSync(path.join(__dirname,'theme',dir)).filter(f=>f.endsWith('.liquid'))) {
    const text = read('shopify/theme/'+dir+'/'+file);
    assert(!/\b(?:src|srcset|poster)="\/?(?:images|videos)\//.test(text), file+' local media');
    assert(!/href="https:\/\/celdyque\.com\/(?:about|faq|shop|product-[^"]+)\.html/.test(text), file+' migrated links');
  }
}
const faq = read('shopify/theme/snippets/page-faq.liquid');
const faqSchema = JSON.parse(faq.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
for (const entry of faqSchema.mainEntity) assert(faq.includes(entry.acceptedAnswer.text), 'Visible FAQ differs: '+entry.name);
assert(read('shopify/theme/layout/theme.liquid').includes('noindex,nofollow'));
assert(!read('shopify/theme/sections/pilot-home.liquid').includes('serviceWorker'));
console.log('PASS: 14 product styles/FAQ/form mappings; '+Object.keys(assetMap).length+' unchanged media files; internal links, FAQ schema and dev noindex.');
