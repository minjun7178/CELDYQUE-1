"""Guard image transfer budgets, local variants, and legacy indexing decisions."""
import re
import unittest
from check_seo import ROOT, Document, local_path


class OptimizationTests(unittest.TestCase):
    def test_responsive_product_variants_exist_and_stay_small(self):
        checked = 0
        for path in ROOT.glob('*.html'):
            doc = Document(path.read_text(encoding='utf-8')).root
            for img in doc.find('img'):
                src = img.attrs.get('src', '')
                if not re.search(r'/ms1[345](?:-lower)?\.webp$', src):
                    continue
                checked += 1
                self.assertLess(local_path(src).stat().st_size, 150_000, src)
                self.assertTrue(img.attrs.get('sizes'), path.name)
                candidates = img.attrs.get('srcset', '').split(', ')
                self.assertGreaterEqual(len(candidates), 2, src)
                for candidate in candidates:
                    url, width = candidate.rsplit(' ', 1)
                    self.assertRegex(width, r'^\d+w$')
                    self.assertTrue(local_path(url).is_file(), url)
                    self.assertLess(local_path(url).stat().st_size, 150_000, url)
        self.assertGreaterEqual(checked, 8)

    def test_preload_uses_the_same_responsive_selection_as_product_image(self):
        for name in ['product-9-peptide-scalp-serum.html', 'product-bakuchiol-volume-collagen-cream.html', 'product-blue-copper-peptide-bakuchiol-serum.html']:
            doc = Document((ROOT / name).read_text(encoding='utf-8')).root
            preload = doc.find('link', rel='preload', **{'as': 'image'})[0].attrs
            hero = next(img.attrs for img in doc.find('img') if img.attrs.get('fetchpriority') == 'high')
            self.assertEqual(preload['href'], hero['src'])
            self.assertEqual(preload['imagesrcset'], hero['srcset'])
            self.assertEqual(preload['imagesizes'], hero['sizes'])

    def test_non_search_pages_explicitly_opt_out(self):
        for name in ['임시.html', 'tiktok-callback.html']:
            doc = Document((ROOT / name).read_text(encoding='utf-8')).root
            self.assertIn('noindex', doc.find('meta', name='robots')[0].attrs['content'])

    def test_legacy_redirect_and_canonical_agree(self):
        doc = Document((ROOT / 'product-detail.html').read_text(encoding='utf-8')).root
        target = '/product-volufiline-100.html'
        self.assertEqual(doc.find('link', rel='canonical')[0].attrs['href'], 'https://celdyque.com' + target)
        self.assertEqual(doc.find('meta', **{'http-equiv': 'refresh'})[0].attrs['content'], '0; url=' + target)
        self.assertTrue(doc.find('a', href=target))
        self.assertFalse(doc.find('script', type='application/ld+json'))

    def test_all_shared_header_mounts_have_navigation_without_javascript(self):
        for path in ROOT.glob('*.html'):
            doc = Document(path.read_text(encoding='utf-8')).root
            for header in doc.find('div', id='siteHeader'):
                self.assertTrue(header.find('a', href='/shop.html'), path.name)
                self.assertTrue(header.find('a', href='/faq.html'), path.name)


if __name__ == '__main__':
    unittest.main()
