/* Load the first-party consent UI independently of header/footer requests. */
if (!document.getElementById('site-analytics-loader')) {
  const analyticsScript = document.createElement('script');
  analyticsScript.id = 'site-analytics-loader';
  analyticsScript.src = '/assets/analytics.js?v=20260908-company';
  analyticsScript.async = true;
  document.head.appendChild(analyticsScript);
}

/* ===== Partials inject ===== */
async function inject(selector, url) {
  const host = document.querySelector(selector);
  if (!host) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    if (!html.trim()) throw new Error('Empty partial');
    host.innerHTML = html;
    return true;
  } catch (error) {
    // Keep the static navigation/contact links when a partial is unavailable.
    console.warn(`Could not load ${url}; keeping fallback.`, error.message);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/* ===== Scroll lock (menu + modal 공용) ===== */
let scrollY = 0;
let lockCount = 0;

function lockBody() {
  lockCount += 1;
  if (lockCount !== 1) return;
  scrollY = window.scrollY || 0;
  document.body.style.top = `-${scrollY}px`;
  document.body.classList.add("menu-open");
}

function unlockBody() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0) return;
  document.body.classList.remove("menu-open");
  const y = Math.abs(parseInt(document.body.style.top || "0", 10)) || scrollY;
  document.body.style.top = "";
  window.scrollTo(0, y);
}

/* ===== Search Catalog (전체 제품 데이터) ===== */
const DEFAULT_CATALOG = [
  {
    "id": "volufiline-100",
    "name": "Volufiline 100% Concentrate",
    "url": "/product-volufiline-100.html",
    "image": "/images/제품/Mask group-1.webp",
    "subtitle": "Mix-in concentrate · 10 ml / 0.33 fl oz",
    "tags": [
      "volufiline-100",
      "mix-in concentrate",
      "face serum",
      "volufiline raw material"
    ]
  },
  {
    "id": "pdrn-25",
    "name": "PDRN 250,000ppm Concentrate",
    "url": "/product-pdrn-25.html",
    "image": "/images/제품/Mask group-3.webp",
    "subtitle": "Concentrate · 30 ml / 1 fl oz",
    "tags": [
      "pdrn-25",
      "concentrate",
      "face serum",
      "sodium dna / pdrn",
      "rh-oligopeptide-1 / egf",
      "panthenol",
      "water",
      "propylene glycol",
      "butylene glycol"
    ]
  },
  {
    "id": "pdrn-12-egf",
    "name": "PDRN 12% + EGF Peptide Serum",
    "url": "/product-pdrn-12-egf.html",
    "image": "/images/제품/Mask group.webp",
    "subtitle": "Face serum · 30 ml / 1 fl oz",
    "tags": [
      "pdrn-12-egf",
      "face serum",
      "sodium dna / pdrn",
      "niacinamide",
      "volufiline",
      "egf",
      "acetyl hexapeptide-8",
      "ceramide",
      "panthenol",
      "hyaluronic acid complex"
    ]
  },
  {
    "id": "pdrn-12-egf-cream",
    "name": "PDRN 12% + EGF Peptide Cream",
    "url": "/product-pdrn-12-egf-cream.html",
    "image": "/images/제품/Mask group-6.webp",
    "subtitle": "Moisturizer · 50 ml / 1.7 fl oz",
    "tags": [
      "pdrn-12-egf-cream",
      "moisturizer",
      "cream",
      "sodium dna / pdrn",
      "volufiline",
      "niacinamide",
      "ceramide np",
      "panthenol",
      "hyaluronic acid",
      "sh-oligopeptide-1 / egf",
      "jojoba seed oil",
      "squalane"
    ]
  },
  {
    "id": "bakuchiol-30000",
    "name": "Bakuchiol 30,000ppm Serum",
    "url": "/product-bakuchiol-30000.html",
    "image": "/images/제품/test.webp",
    "subtitle": "Mix-in serum · 30 ml / 1 fl oz",
    "tags": [
      "bakuchiol-30000",
      "mix-in serum",
      "face serum",
      "bakuchiol",
      "butylene glycol",
      "water",
      "1,2-hexanediol"
    ]
  },
  {
    "id": "bakuchiol-volume-collagen-cream",
    "name": "Bakuchiol Volume Collagen Cream",
    "url": "/product-bakuchiol-volume-collagen-cream.html",
    "image": "/images/제품/ms14.png",
    "subtitle": "Moisturizer · 50 ml / 1.7 fl oz",
    "tags": [
      "bakuchiol-volume-collagen-cream",
      "moisturizer",
      "cream",
      "bakuchiol",
      "volufiline",
      "hydrolyzed collagen",
      "snail secretion filtrate",
      "egf peptide",
      "hyaluronic acid",
      "ceramide",
      "panthenol",
      "cica"
    ]
  },
  {
    "id": "blue-copper-peptide-bakuchiol-serum",
    "name": "Blue Copper Peptide Bakuchiol Serum",
    "url": "/product-blue-copper-peptide-bakuchiol-serum.html",
    "image": "/images/제품/ms15.png",
    "subtitle": "Face serum · 30 ml / 1.01 fl oz",
    "tags": [
      "blue-copper-peptide-bakuchiol-serum",
      "face serum",
      "copper tripeptide-1",
      "bakuchiol",
      "acetyl hexapeptide-8",
      "sh-oligopeptide-1",
      "palmitoyl tripeptide-1",
      "palmitoyl tetrapeptide-7",
      "niacinamide",
      "hydrolyzed hyaluronic acid",
      "hydrolyzed collagen",
      "beta-glucan",
      "panthenol",
      "allantoin",
      "betaine",
      "matrixyl 3000",
      "argireline",
      "copper peptide",
      "peptides",
      "egf"
    ]
  },
  {
    "id": "arbutxa-glow-cream",
    "name": "ArbutXA Glow Cream",
    "url": "/product-arbutxa-glow-cream.html",
    "image": "/images/제품/Mask group-5.webp",
    "subtitle": "Moisturizer · 50 ml / 1.7 fl oz",
    "tags": [
      "arbutxa-glow-cream",
      "moisturizer",
      "cream",
      "arbutin",
      "alpha-arbutin",
      "tranexamic acid",
      "niacinamide",
      "centella asiatica extract",
      "houttuynia cordata extract",
      "green tea leaf extract",
      "hyaluronic acid complex",
      "ceramide np",
      "adenosine",
      "arbutin 5%",
      "alpha-arbutin 2%",
      "txa 5%"
    ]
  },
  {
    "id": "glutathione-30000",
    "name": "Glutathione Glow Serum 30,000 ppm",
    "url": "/product-glutathione-30000.html",
    "image": "/images/제품/Mask group-2.webp",
    "subtitle": "Face serum · 30 ml / 1 fl oz",
    "tags": [
      "glutathione-30000",
      "face serum",
      "glutathione",
      "niacinamide",
      "hyaluronic acid complex",
      "ceramide np",
      "panthenol",
      "resveratrol",
      "hydrolyzed vegetable proteins",
      "adenosine"
    ]
  },
  {
    "id": "niacinamide-20-advanced",
    "name": "Niacinamide 20% Pore Minimizer Serum",
    "url": "/product-niacinamide-20-advanced.html",
    "image": "/images/제품/Mask group-8.webp",
    "subtitle": "Face serum · 30 ml / 1 fl oz",
    "tags": [
      "niacinamide-20-advanced",
      "face serum",
      "rosa damascena flower water",
      "niacinamide",
      "glycerin",
      "butylene glycol",
      "green tea leaf extract",
      "hydrolyzed sodium hyaluronate",
      "beta-glucan"
    ]
  },
  {
    "id": "azelaic-12",
    "name": "Azelaic Acid 12% Topical Serum",
    "url": "/product-azelaic-12.html",
    "image": "/images/제품/Mask group-7.webp",
    "subtitle": "Face serum · 30 ml / 1 fl oz",
    "tags": [
      "azelaic-12",
      "face serum",
      "azelaic acid",
      "tranexamic acid",
      "salicylic acid",
      "niacinamide",
      "centella asiatica extract",
      "panthenol",
      "ceramide np",
      "hyaluronic acid"
    ]
  },
  {
    "id": "gentle-cleanser",
    "name": "Gentle Cleanser Purifying Touch",
    "url": "/product-gentle-cleanser.html",
    "image": "/images/제품/Mask group-11.webp",
    "subtitle": "Rinse-off cleanser · 150 ml / 5.07 fl oz",
    "tags": [
      "gentle-cleanser",
      "rinse-off cleanser",
      "cleanser",
      "centella asiatica extract",
      "tea tree extract",
      "green tea leaf powder",
      "sodium cocoyl isethionate",
      "glycerin",
      "sodium hyaluronate",
      "hydrolyzed collagen",
      "niacinamide",
      "allantoin",
      "aha / bha / pha"
    ]
  },
  {
    "id": "cleansing-oil",
    "name": "Pore Purifying Cleansing Oil",
    "url": "/product-cleansing-oil.html",
    "image": "/images/제품/Mask group-9.webp",
    "subtitle": "Rinse-off cleansing oil · 200 ml / 6.76 fl oz",
    "tags": [
      "cleansing-oil",
      "rinse-off cleansing oil",
      "cleanser",
      "glycine soja / soybean oil",
      "capryloyl salicylic acid / lha",
      "centella asiatica extract",
      "tea tree extract",
      "green tea extract",
      "jojoba seed oil",
      "squalane",
      "panthenol",
      "heartleaf",
      "centella",
      "green tea",
      "lha"
    ]
  },
  {
    "id": "9-peptide-scalp-serum",
    "name": "9-Peptide Scalp Care Serum Roll-On",
    "url": "/product-9-peptide-scalp-serum.html",
    "image": "/images/제품/ms13.jpg",
    "subtitle": "Leave-on scalp serum · 40 ml / 1.35 fl oz",
    "tags": [
      "9-peptide-scalp-serum",
      "leave-on scalp serum",
      "scalp serum",
      "rosemary extract",
      "caffeine",
      "dexpanthenol",
      "sodium dna / pdrn",
      "hydrolyzed sponge",
      "biotin",
      "zinc pca",
      "peptide complex",
      "niacinamide",
      "bha",
      "roll-on",
      "rosemary",
      "scalp care"
    ]
  }
];

function getCatalog() {
  return Array.isArray(window.PRODUCT_CATALOG) ? window.PRODUCT_CATALOG : DEFAULT_CATALOG;
}

/* ===== String Highlight Helper ===== */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlight(text, query) {
  const t = String(text);
  const q = String(query || "").trim();
  if (!q) return escapeHtml(t);
  const idx = t.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return escapeHtml(t);
  const before = escapeHtml(t.slice(0, idx));
  const mid = escapeHtml(t.slice(idx, idx + q.length));
  const after = escapeHtml(t.slice(idx + q.length));
  return `${before}<span style="text-decoration:underline; text-underline-offset:3px">${mid}</span>${after}`;
}


/* ===== UI Initialization (Mobile Menu & Search Modal) ===== */
function initCommonUI() {
  document.querySelectorAll('.fallback-header [data-open-search]').forEach(button => { button.hidden = false; });
  // Legacy pages still contain empty menu/modal mounts. Keep the injected shared UI only.
  for (const id of ['mobileMenuOverlay', 'mobileMenu', 'searchModal']) {
    document.querySelectorAll('#' + id).forEach((node, index) => { if (index > 0) node.remove(); });
  }

  // --- 1. Mobile Menu Logic ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  function openMenu() {
    mobileMenuBtn?.classList.add('active');
    mobileMenuBtn?.setAttribute('aria-label', 'Close menu');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('active');
    mobileMenu?.setAttribute('aria-hidden', 'false');
    mobileMenuOverlay?.classList.add('active');
    mobileMenuOverlay?.setAttribute('aria-hidden', 'false');
    lockBody();
    mobileMenu?.querySelector('a')?.focus();
  }
  function closeMenu() {
    mobileMenuBtn?.classList.remove('active');
    mobileMenuBtn?.setAttribute('aria-label', 'Open menu');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('active');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    mobileMenuOverlay?.classList.remove('active');
    mobileMenuOverlay?.setAttribute('aria-hidden', 'true');
    unlockBody();
  }
  function toggleMenu() {
    if (mobileMenu?.classList.contains('active')) closeMenu();
    else openMenu();
  }

  mobileMenuBtn?.addEventListener('click', toggleMenu);
  mobileMenuOverlay?.addEventListener('click', closeMenu);
  mobileMenu?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && mobileMenu?.classList.contains('active')) closeMenu();
  });

  // --- 2. Global Search Modal Injection & Logic ---
  // 만약 이미 모달이 없다면 HTML을 동적으로 삽입합니다.
  if (!document.getElementById('globalSearchModal')) {
    const searchModalHTML = `
      <div class="search-modal" id="globalSearchModal" aria-hidden="true">
        <div class="search-shell" role="dialog" aria-modal="true" aria-label="Search">
          <div class="search-top">
            <div class="search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <div class="search-input-wrap">
              <input type="search" class="search-input" placeholder="Search products..." id="globalSearchInput" autocomplete="off">
            </div>
            <div class="search-actions">
              <button type="button" class="header-search-btn" id="globalSearchCloseBtn" aria-label="Close search" title="Close search">&times;</button>
            </div>
          </div>
          <div class="search-hint">
            <div>Type to search</div>
            <div><span class="kbd">Esc</span> to close</div>
          </div>
          <div class="search-body">
            <div class="search-pane">
              <div class="pane-title">
                <h3>Results</h3>
                <span id="globalResultCount" style="font-size:0.85rem; color:#888;">0 items</span>
              </div>
              <div class="suggestions" id="globalSuggestionList" role="listbox"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchModalHTML);
  }

  // 모달 요소 연결
  const modal = document.getElementById('globalSearchModal');
  const input = document.getElementById('globalSearchInput');
  const list = document.getElementById('globalSuggestionList');
  const count = document.getElementById('globalResultCount');
  const closeBtn = document.getElementById('globalSearchCloseBtn');
  let searchReturnFocus = null;

  // data-open-search 속성이 있는 버튼(헤더 돋보기 등) 클릭 시 모달 열기
  document.addEventListener('click', (e) => {
    const searchTrigger = e.target.closest('[data-open-search]');
    if (searchTrigger) {
      e.preventDefault();
      if (mobileMenu?.classList.contains('active')) closeMenu();
      searchReturnFocus = searchTrigger;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      lockBody();
      input.value = '';
      renderResults([]);
      setTimeout(() => input.focus(), 100);
    }
  });

  function closeSearch() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    unlockBody();
    searchReturnFocus?.focus();
    searchReturnFocus = null;
  }

  closeBtn?.addEventListener('click', closeSearch);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });
  document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeSearch();
    else if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMenu();
      mobileMenuBtn?.focus();
    }
    // Ctrl+K 단축키로 모달 열기
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (!modal?.classList.contains("open")) {
        document.querySelector('[data-open-search]')?.click();
      }
    }
    if (e.key === 'Tab' && modal?.classList.contains('open')) {
      const focusable = [...modal.querySelectorAll('input, button, a[href]')]
        .filter(element => !element.hidden && element.getClientRects().length);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
  });

  // 실시간 검색 필터링 로직
  input?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderResults([]);
      return;
    }
    const catalog = getCatalog();
    const matches = catalog.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.subtitle.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
    renderResults(matches, query);
  });

  // 검색 결과 렌더링
  function renderResults(items, query = "") {
    if (!count || !list) return;
    count.innerText = `${items.length} items`;
    list.innerHTML = '';
    
    if (items.length === 0 && input.value.trim() !== '') {
        list.innerHTML = '<div style="padding:20px; text-align:center; color:#888;">No products found.</div>';
        return;
    }
    
    items.forEach(item => {
      const el = document.createElement('a');
      el.className = 'suggestion-item';
      el.href = item.url;
      el.innerHTML = `
        <div class="s-img"><img src="${item.image}" alt=""></div>
        <div class="s-info">
          <div class="s-name">${highlight(item.name, query)}</div>
          <div class="s-sub">${escapeHtml(item.subtitle)}</div>
        </div>
      `;
      list.appendChild(el);
    });
  }
}

/* ===== Bootstrap ===== */
document.addEventListener("DOMContentLoaded", async () => {
  // Footer loading must never delay or prevent menu/search initialization.
  void inject("#siteFooter", "/partials/footer.html?v=20260910-preview-optimization")
    .then(() => document.dispatchEvent(new Event('site:ready')));
  await inject("#siteHeader", "/partials/header.html?v=20260910-preview-optimization");
  initCommonUI();
  document.dispatchEvent(new Event('site:ready'));
});
