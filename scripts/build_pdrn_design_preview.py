"""Render one draft into the ORIGINAL product template; never edit production files."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import html
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'preview' / 'pdrn-serum'
PAGE = 'product-pdrn-12-egf.html'
VOID = {'img', 'meta', 'link', 'br', 'input', 'hr', 'source', 'wbr', 'area', 'base', 'embed', 'col', 'param', 'track'}


def original_bytes(page):
    """Keep the imported Before stable even after After reaches production source."""
    current = (ROOT/page).read_bytes()
    evidence_path = ROOT/'content/evidence-index.json'
    if evidence_path.is_file():
        evidence = next((e for e in json.loads(evidence_path.read_text(encoding='utf8'))['sources'] if e['path'] == page), None)
        if evidence and hashlib.sha256(current).hexdigest() != evidence['sha256']:
            current = subprocess.check_output(['git', 'show', evidence['source_commit']+':'+page], cwd=ROOT)
            if hashlib.sha256(current).hexdigest() != evidence['sha256']:
                # Git normalizes LF; the captured Windows checkout used CRLF.
                current = current.replace(b'\r\n', b'\n').replace(b'\n', b'\r\n')
            assert hashlib.sha256(current).hexdigest() == evidence['sha256'], 'Imported Before hash mismatch'
    return current


class Element:
    def __init__(self, tag, attrs, start, inner):
        self.tag, self.attrs, self.start, self.inner = tag, dict(attrs), start, inner
        self.end = inner
        self.children = []

    def find(self, tag=None, cls=None, id=None):
        matches = []
        for child in self.children:
            if (tag is None or child.tag == tag) and (cls is None or cls in child.attrs.get('class', '').split()) and (id is None or id == child.attrs.get('id')):
                matches.append(child)
            matches.extend(child.find(tag, cls, id))
        return matches


class Positions(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.lines = [0]
        for match in re.finditer('\n', source):
            self.lines.append(match.end())
        self.root = Element('', [], 0, 0)
        self.stack = [self.root]
        self.feed(source)

    def pos(self):
        row, col = self.getpos()
        return self.lines[row-1] + col

    def handle_starttag(self, tag, attrs):
        item = Element(tag, attrs, self.pos(), self.pos()+len(self.get_starttag_text()))
        self.stack[-1].children.append(item)
        if tag not in VOID:
            self.stack.append(item)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.stack.pop()

    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack[i].end = self.pos()
                self.stack = self.stack[:i]
                break


def sanitize(source, label):
    source = re.sub(r'<script type="application/ld\+json">.*?</script>', '', source, flags=re.S)
    source = re.sub(r'(<meta name="robots" content=")[^"]+', r'\1noindex,nofollow', source)
    return source.replace('<title>', '<title>['+label+' · Local preview] ', 1)


def build():
    # Use the shared manuscript renderer; the old pilot has no separate copy.
    from build_all_product_previews import build as build_all
    build_all()


if __name__ == '__main__':
    build()
