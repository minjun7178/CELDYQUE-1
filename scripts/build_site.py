"""Stage only website files, excluding development tools and reports."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'site-dist'


def build():
    # A fresh destination prevents obsolete files from surviving a repeated build.
    OUTPUT.mkdir(exist_ok=False)
    for page in ROOT.glob('*.html'):
        shutil.copy2(page, OUTPUT / page.name)
    for name in ['CNAME', 'robots.txt', 'sitemap.xml', 'sw.js']:
        shutil.copy2(ROOT / name, OUTPUT / name)
    for name in ['assets', 'images', 'videos', 'partials']:
        shutil.copytree(ROOT / name, OUTPUT / name)
    print(f'Website staged at {OUTPUT}')


if __name__ == '__main__':
    build()
