"""Regenerate responsive product WebPs from original images (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ['ms13.jpg', 'ms14.png', 'ms14-lower.png', 'ms15.png', 'ms15-lower.png']


def main():
    for name in SOURCES:
        source = ROOT / 'images' / '제품' / name
        with Image.open(source) as opened:
            original = ImageOps.exif_transpose(opened)
            profile = original.info.get('icc_profile')
            options = {'icc_profile': profile} if profile else {}
            for width in sorted({320, *[w for w in (640, 960) if w < original.width], original.width}):
                height = round(original.height * width / original.width)
                resized = original.resize((width, height), Image.Resampling.LANCZOS) if width != original.width else original
                suffix = '' if width == original.width else f'-{width}'
                output = source.with_name(source.stem + suffix + '.webp')
                resized.save(output, 'WEBP', quality=90, method=6, **options)
            output = source.with_suffix('.webp')
            print(f'{name}: {source.stat().st_size:,} -> {output.stat().st_size:,} bytes')


if __name__ == '__main__':
    main()
