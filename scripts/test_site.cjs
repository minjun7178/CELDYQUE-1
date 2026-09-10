const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const source = readFileSync(path.join(__dirname, '../assets/site.js'), 'utf8');

function fixture(fetch) {
  const events = [];
  const timers = new Set();
  const hosts = { '#siteHeader': { innerHTML: 'basic navigation' }, '#siteFooter': { innerHTML: 'contact/settings' } };
  let bootstrap;
  let initialized = 0;
  const context = {
    AbortController, Event, fetch,
    console: { warn() {} },
    setTimeout(fn) { timers.add(fn); return fn; },
    clearTimeout(fn) { timers.delete(fn); },
    document: {
      getElementById: () => ({}),
      querySelector: selector => hosts[selector],
      addEventListener(name, handler) { if (name === 'DOMContentLoaded') bootstrap = handler; },
      dispatchEvent(event) { events.push(event.type); },
    },
  };
  vm.createContext(context);
  vm.runInContext(source, context);
  context.initCommonUI = () => { initialized++; };
  return { bootstrap, hosts, events, timers, initialized: () => initialized };
}
const ok = html => ({ ok: true, text: async () => html });

test('footer failure cannot prevent header UI initialization', async () => {
  const f = fixture(async url => {
    if (url.includes('footer')) throw new Error('Network failure');
    return ok('loaded header');
  });
  await f.bootstrap();
  assert.equal(f.initialized(), 1);
  assert.equal(f.hosts['#siteHeader'].innerHTML, 'loaded header');
  assert.equal(f.hosts['#siteFooter'].innerHTML, 'contact/settings');
  assert.equal(f.timers.size, 0);
});

test('pending footer does not delay header UI and later signals settings readiness', async () => {
  let completeFooter;
  const f = fixture(url => url.includes('footer') ? new Promise(resolve => { completeFooter = resolve; }) : Promise.resolve(ok('header')));
  await f.bootstrap();
  assert.equal(f.initialized(), 1);
  const eventsBefore = f.events.length;
  completeFooter(ok('footer'));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(f.hosts['#siteFooter'].innerHTML, 'footer');
  assert.ok(f.events.length > eventsBefore);
});

for (const response of [{ ok: false, status: 404 }, ok('   ')]) {
  test(`unavailable header preserves basic navigation (${response.status || 'empty'})`, async () => {
    const f = fixture(async url => url.includes('header') ? response : ok('footer'));
    await f.bootstrap();
    assert.equal(f.hosts['#siteHeader'].innerHTML, 'basic navigation');
    assert.equal(f.initialized(), 1);
  });
}

test('header timeout releases initialization and keeps fallback navigation', async () => {
  const f = fixture((url, { signal }) => url.includes('footer') ? Promise.resolve(ok('footer')) : new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')));
  }));
  const pending = f.bootstrap();
  for (const timer of [...f.timers]) timer();
  await pending;
  assert.equal(f.initialized(), 1);
  assert.equal(f.hosts['#siteHeader'].innerHTML, 'basic navigation');
  assert.equal(f.timers.size, 0);
});

test('philosophy navigation updates the picture source as well as the fallback image', () => {
  const html = readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
    .map(match => match[1]).find(text => text.includes('.philosophy-nav'));
  const pictureSource = { srcset: '/images/10.webp' };
  const img = { src: '/images/10.jpg', closest: () => ({ querySelector: () => pictureSource }) };
  const content = { innerHTML: '' };
  const buttons = [0, 1, 2, 3].map(index => ({
    dataset: { slide: String(index) },
    classList: { add() {}, remove() {} },
    addEventListener(name, callback) { this.click = callback; },
  }));
  vm.runInNewContext(script, {
    document: {
      addEventListener(name, handler) { handler(); },
      querySelectorAll: () => buttons,
      getElementById: id => id === 'philosophyImage' ? img : content,
    },
  });
  for (const index of [1, 2, 3, 0]) {
    buttons[index].click();
    const image = ['10', '7', '15', '14'][index];
    assert.equal(pictureSource.srcset, `/images/${image}.webp`);
    assert.equal(img.src, `/images/${image}.jpg`);
    assert.match(content.innerHTML, /<h3>.+<\/h3>/);
  }
});
