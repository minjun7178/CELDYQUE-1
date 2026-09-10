const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Keep the check independent of third-party fonts, images, and analytics.
  await page.route(/https:\/\//, route => route.abort());
});

test('mobile menu and product search remain usable when the footer fails', async ({ page }) => {
  await page.route('**/partials/footer.html*', route => route.abort());
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.locator('#mobileMenu')).toHaveAttribute('aria-hidden', 'false');
  await page.getByRole('button', { name: 'Close menu', exact: true }).click();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('#globalSearchInput').fill('volufiline');
  await expect(page.locator('#globalSuggestionList a').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#globalSearchModal')).toHaveAttribute('aria-hidden', 'true');
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  await page.getByRole('button', { name: 'Analytics settings', exact: true }).click();
  await expect(page.locator('#analytics-consent')).toBeVisible();
});

test('a stalled footer does not delay search initialization', async ({ page }) => {
  let release;
  const pending = new Promise(resolve => { release = resolve; });
  await page.route('**/partials/footer.html*', async route => {
    await pending;
    await route.abort().catch(() => {});
  });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#globalSearchInput')).toBeAttached({ timeout: 2500 });
  } finally { release(); }
});

test('a missing header keeps working navigation and search', async ({ page }) => {
  await page.route('**/partials/header.html*', route => route.fulfill({ status: 404, body: 'Missing' }));
  await page.goto('/');
  await expect(page.locator('.fallback-header')).toBeVisible();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.locator('#globalSearchInput')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('.fallback-header').getByRole('link', { name: 'Products', exact: true }).click();
  await expect(page).toHaveURL(/\/shop\.html$/);
});

test('each philosophy slide changes the image actually selected by the browser', async ({ page }) => {
  await page.goto('/');
  const slides = [['②', '7'], ['③', '15'], ['④', '14'], ['①', '10']];
  for (const [name, image] of slides) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect.poll(() => page.locator('#philosophyImage').evaluate(img => img.currentSrc))
      .toContain(`/images/${image}.webp`);
  }
});

test('mobile catalog selects a smaller optimized product image', async ({ page }) => {
  await page.goto('/shop.html');
  const product = page.locator('img[src="/images/제품/ms14-lower.webp"]');
  await product.scrollIntoViewIfNeeded();
  await expect.poll(() => product.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect.poll(() => product.evaluate(img => img.currentSrc)).toContain('ms14-lower-320.webp');
});

test('old product URL opens the maintained product page', async ({ page }) => {
  await page.goto('/product-detail.html');
  await expect(page).toHaveURL(/\/product-volufiline-100\.html$/);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('primary navigation still opens the product catalog', async ({ page }) => {
    await page.goto('/');
    await page.locator('.fallback-header').getByRole('link', { name: 'Products', exact: true }).click();
    await expect(page).toHaveURL(/\/shop\.html$/);
  });
});
