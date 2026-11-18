/* Progressive enhancement: native product links still work without JavaScript. */
(() => {
  const buy = document.querySelector('#pilot-buy');
  if (!buy) return;
  const cards = [...buy.querySelectorAll('[data-offer]')];
  const gallery = document.querySelector('[data-pilot-gallery], .product-top .gallery-frame');
  const form = buy.querySelector('form[action*="/cart/add"]');
  const variantInput = form?.querySelector('input[name="id"]');
  const addButton = form?.querySelector('[name="add"]');
  if (!cards.length || !gallery || !variantInput || !addButton) return;

  const originalGallery = [...gallery.childNodes].map(node => node.cloneNode(true));
  const initialHandle = buy.dataset.initialOffer;
  const initialHeading = buy.querySelector('.pilot-offers h3').innerHTML;
  const setPageTitle = document.querySelector('.pilot-set-info h1');
  const originalTitle = setPageTitle?.textContent;
  const templates = new Map([...buy.querySelectorAll('template[data-offer-content]')]
    .map(template => [template.dataset.offerContent, template.content]));
  const price = buy.querySelector('.pilot-price');
  const contents = buy.querySelector('[data-pilot-contents]');
  const quantityLabel = buy.querySelector('[data-pilot-quantity-label]');
  const status = buy.querySelector('[role="status"]');
  const heading = buy.querySelector('.pilot-offers h3');
  const cloneChildren = node => [...node.childNodes].map(child => child.cloneNode(true));

  function select(card) {
    const template = templates.get(card.dataset.offer);
    const nextPrice = template?.querySelector('[data-offer-price]');
    const nextContents = template?.querySelector('[data-offer-contents]');
    const nextGallery = template?.querySelector('[data-offer-gallery]');
    if (!nextPrice || !nextContents || !nextGallery?.children.length || !card.dataset.variant) return false;

    variantInput.value = card.dataset.variant;
    addButton.disabled = card.dataset.available !== 'true';
    addButton.textContent = addButton.disabled ? 'Sold out' : 'Add to cart →';
    quantityLabel.textContent = card.dataset.set === 'true' ? 'Sets' : 'Quantity';
    price.replaceChildren(...cloneChildren(nextPrice));
    contents.replaceChildren(...cloneChildren(nextContents));
    const original = card.dataset.offer === initialHandle;
    gallery.replaceChildren(...(original ? originalGallery.map(node => node.cloneNode(true)) : cloneChildren(nextGallery)));
    gallery.classList.toggle('is-offer-gallery', !original);
    if (original) heading.innerHTML = initialHeading;
    else heading.textContent = 'Set: ' + card.dataset.label;
    if (setPageTitle) setPageTitle.textContent = original ? originalTitle : card.dataset.title;
    cards.forEach(option => {
      const selected = option === card;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    buy.dataset.selectedOffer = card.dataset.offer;
    status.textContent = card.dataset.label + ', ' + price.textContent.trim() + (addButton.disabled ? ', sold out.' : ', selected.');
    return true;
  }

  cards.forEach(card => {
    card.setAttribute('role', 'button');
    card.removeAttribute('aria-current');
    card.setAttribute('aria-pressed', String(card.classList.contains('is-selected')));
    card.addEventListener('click', event => {
      // Preserve the explicit open-in-new-tab action; normal selection never navigates.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (select(card)) event.preventDefault();
    });
    card.addEventListener('keydown', event => {
      if (event.key === ' ') { event.preventDefault(); select(card); }
    });
  });
})();
