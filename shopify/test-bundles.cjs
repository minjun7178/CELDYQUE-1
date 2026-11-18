const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const data = require('./bundle-catalog.json');
const audit = require('./amazon-store-audit-2026-11-18.json');
const singles = require('./catalog.json');
const read = p => fs.readFileSync(path.join(__dirname,p),'utf8');
test('all 13 approved Amazon sets retain price and exact component quantities',()=>{
  assert.equal(data.offers.length,13);
  assert.equal(data.offers.filter(o=>o.type==='multipack').length,5);
  for(const o of data.offers){
    const source=audit.products.find(p=>p.asin===o.asin);
    assert.equal(o.priceUsd,source.official_price_usd);
    assert.deepEqual(o.components.map(c=>({product_id:c.id,quantity:c.quantity})),source.components);
    assert(o.components.every(c=>singles.some(p=>p.id===c.id)));
    assert.equal(o.amazonSellerSku,null);
    assert(o.devSku.startsWith('DEV-BUNDLE-'));
  }
});
test('new product import cannot overwrite single handles; uses isolated manual stock',()=>{
  const csv=read('dev-bundles-13.csv');
  assert.equal(new Set(data.offers.map(o=>o.handle)).size,13);
  for(const s of singles) assert(!csv.includes('"'+s.handle+'"'));
  assert.equal((csv.match(/"shopify","10","deny","manual"/g)||[]).length,13);
  for(const o of data.offers) assert(csv.includes('"'+o.priceUsd.toFixed(2)+'"'));
});
test('native form binds the selected product variant and backend prices; cart exposes composition',()=>{
  const form=read('theme/snippets/buy-form.liquid');
  assert(form.includes("form 'product', product"));
  assert(form.includes('name="id" value="{{ variant.id }}"'));
  assert(!form.includes('name="price"'));
  assert(read('theme/sections/main-cart.liquid').includes("render 'bundle-contents', product: item.product"));
  assert(read('theme/snippets/bundle-option-card.liquid').includes('offer_product.price | money_with_currency'));
  for(const o of data.offers){
    assert(read('theme/snippets/pilot-product.liquid').includes("when '"+o.handle+"'"));
    assert(read('theme/snippets/bundle-contents.liquid').includes("when '"+o.handle+"'"));
  }
});
test('related option lookups stay within the 20 all_products limit even with all 14 base products',()=>{
  for(const p of [...singles,...data.offers]){
    const base=p.components?p.components[0]:p;
    const related=data.offers.filter(o=>o.components.some(c=>c.id===base.id));
    assert(14+related.length<=20,p.handle);
  }
  assert(read('theme/snippets/bundle-listing.liquid').includes('collections.all.products'));
});
