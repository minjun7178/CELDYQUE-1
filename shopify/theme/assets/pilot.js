// No production analytics, service worker, or external commerce requests in this pilot.
(() => {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  const button = document.getElementById('mobileMenuBtn');
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  let previousFocus;
  function close() {
    menu?.classList.remove('active'); overlay?.classList.remove('active'); modal?.classList.remove('open');
    menu?.setAttribute('aria-hidden', 'true'); modal?.setAttribute('aria-hidden', 'true');
    button?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open');
    previousFocus?.focus();
  }
  button?.addEventListener('click', () => {
    if (button.getAttribute('aria-expanded') === 'true') return close();
    previousFocus = button; menu.classList.add('active'); overlay.classList.add('active');
    menu.setAttribute('aria-hidden', 'false'); button.setAttribute('aria-expanded', 'true');
  });
  overlay?.addEventListener('click', close);
  document.querySelector('[data-open-search]')?.addEventListener('click', e => {
    close(); previousFocus = e.currentTarget; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); input.focus();
  });
  document.getElementById('closeBtn')?.addEventListener('click', close);
  document.getElementById('closeBtn')?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') close(); });
  document.getElementById('clearBtn')?.addEventListener('click', () => { input.value=''; input.focus(); });
  document.getElementById('clearRecentBtn')?.setAttribute('hidden','');
  const base = window.Shopify?.routes?.root || '/';
  function search() { window.location.assign(base + 'search?type=product&q=' + encodeURIComponent(input.value)); }
  input?.addEventListener('keydown', e => { if(e.key === 'Enter') search(); });
  document.getElementById('viewAllBtn')?.addEventListener('click', search);
  document.getElementById('goShopBtn')?.addEventListener('click', () => window.location.assign(base));
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') close();
    const scope = modal?.classList.contains('open') ? modal : menu?.classList.contains('active') ? menu : null;
    if(e.key !== 'Tab' || !scope) return;
    const focusable = [...scope.querySelectorAll('a[href],button:not([disabled]),input,[tabindex="0"]')].filter(el=>el.getClientRects().length);
    if(!focusable.length) return;
    if(e.shiftKey && document.activeElement===focusable[0]) { e.preventDefault(); focusable.at(-1).focus(); }
    else if(!e.shiftKey && document.activeElement===focusable.at(-1)) {e.preventDefault(); focusable[0].focus();}
  });
})();
