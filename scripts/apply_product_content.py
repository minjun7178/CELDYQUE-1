"""Promote reviewed product previews locally; never commit, push or deploy."""
import argparse
import hashlib
import html
import json
from pathlib import Path
import re
import zipfile

from check_seo import Document, normalized
from build_all_product_previews import Editor

ROOT = Path(__file__).resolve().parents[1]
RECORD = ROOT / 'docs/before-after-backup.json'


def digest(data):
    return hashlib.sha256(data).hexdigest()


def promote(original, preview, title_override=None):
    old = Document(original).root
    result = re.sub(r' data-preview-changed="true"', '', preview)
    result = result.replace('/assets/site.js?v=20260910-preview-optimization', '/assets/site.js?v=20261013-product-content')
    result = re.sub(r'<title>.*?</title>', lambda _: '<title>'+html.escape(title_override or old.find('title')[0].text())+'</title>', result, count=1, flags=re.S)
    robots = old.find('meta', name='robots')[0].attrs['content']
    result = re.sub(r'<meta\s+[^>]*name="robots"[^>]*>', lambda _: '<meta name="robots" content="'+robots+'" />', result)
    doc = Document(result).root
    intro = normalized(doc.find('p', **{'class':'desc-text'})[0].text())
    # Use the visible introduction for machine-readable descriptions too.
    result = re.sub(r'(<meta\s+(?:name="(?:description|twitter:description)"|property="og:description")\s+content=")[^"]*', lambda m: m[1]+html.escape(intro, quote=True), result)
    graphs = [json.loads(s.text()) for s in old.find('script', type='application/ld+json')]
    assert len(graphs) == 1
    graph = graphs[0]
    for node in graph['@graph']:
        if node.get('@type') in ('Product', 'WebPage'):
            node['description'] = intro
        if node.get('@type') == 'WebPage':
            if title_override: node['name']=title_override
            box=doc.find('section', **{'class':'ingredients-box'})
            if not box: box=doc.find('div', **{'class':'ingredients-box'})
            node['citation']=[a.attrs['href'] for a in box[0].find('a') if a.attrs.get('href','').startswith('https://')]
        if node.get('@type') == 'FAQPage':
            node['mainEntity'] = [{'@type':'Question', 'name':normalized(d.find('summary')[0].text()),
                'acceptedAnswer':{'@type':'Answer', 'text':normalized(d.find('div', **{'class':'faq-answer'})[0].text())}}
                for d in doc.find('details', **{'class':'faq-item'})]
    schema = '<script type="application/ld+json">\n'+json.dumps(graph, ensure_ascii=False, indent=2).replace('<', '\\u003c')+'\n</script>\n'
    assert not doc.find('script', type='application/ld+json')
    result = result.replace('</head>', schema+'</head>', 1)
    style_start = result.index('<style>')
    result = re.sub(r'(?m)^[ \t]+$', '', result[:style_start]) + result[style_start:]
    assert 'data-preview-changed' not in result and 'Local preview' not in result
    return result


def promote_common_faq(original):
    questions = json.loads((ROOT/'content/copy/en/faq.json').read_text(encoding='utf8'))['questions']
    editor = Editor(original)
    for q in questions:
        card = editor.one(id='question-'+str(q['original_question_number']))
        editor.put(editor.one(card, cls='faq-question'), q['question'])
        editor.put(editor.one(editor.one(card, cls='faq-answer'), tag='p'), q['answer'])
    result = editor.finish().replace(' data-preview-changed="true"', '')
    result = result.replace('/assets/site.js?v=20260910-preview-optimization', '/assets/site.js?v=20261013-product-content')
    old = Document(original).root
    graph = json.loads(old.find('script', type='application/ld+json')[0].text())
    faq = next(n for n in graph['@graph'] if n.get('@type') == 'FAQPage')
    faq['mainEntity'] = [{'@type':'Question','name':q['question'],'acceptedAnswer':{'@type':'Answer','text':q['answer']}} for q in questions]
    schema = '<script type="application/ld+json">\n'+json.dumps(graph, ensure_ascii=False, indent=2).replace('<', '\\u003c')+'\n</script>'
    return re.sub(r'<script type="application/ld\+json">.*?</script>', lambda _: schema, result, count=1, flags=re.S)


def promote_shop(original):
    display = json.loads((ROOT/'content/copy/en/product-display.json').read_text(encoding='utf8'))
    editor = Editor(original)
    for pid, values in display.items():
        if 'shop_tags' not in values:
            continue
        card = next(n for n in editor.doc.find(cls='p-card') if n.attrs['href']=='/product-'+pid+'.html')
        for node, label in zip(card.find(cls='tag'), values['shop_tags'], strict=True):
            editor.put(node, label)
    result = editor.finish().replace(' data-preview-changed="true"', '')
    return result.replace('/assets/site.js?v=20260910-preview-optimization', '/assets/site.js?v=20261013-product-content')


def run(apply=False):
    record = json.loads(RECORD.read_text(encoding='utf8'))
    backup = Path(record['backup_directory'])
    catalog = json.loads((ROOT/'preview/all-products/catalog.json').read_text(encoding='utf8'))
    display = json.loads((ROOT/'content/copy/en/product-display.json').read_text(encoding='utf8'))
    outputs = {}
    with zipfile.ZipFile(backup/'before.zip') as archive:
        for product in catalog:
            name = product['url'].lstrip('/')
            source = archive.read(name)
            assert digest(source) == record['files'][name]['before_sha256']
            draft = (ROOT/'preview/all-products'/name).read_text(encoding='utf8')
            outputs[name] = promote(source.decode('utf8'), draft, display[product['id']].get('seo_title')).encode('utf8')
        sitemap = archive.read('sitemap.xml').decode('utf8')
        outputs['faq.html'] = promote_common_faq(archive.read('faq.html').decode('utf8').replace('\r\n','\n')).encode('utf8')
        outputs['shop.html'] = promote_shop(archive.read('shop.html').decode('utf8').replace('\r\n','\n')).encode('utf8')
        home=archive.read('index.html').decode('utf8').replace('\r\n','\n')
        replacements=json.loads((ROOT/'content/copy/en/shared-display.json').read_text(encoding='utf8'))['index.html']
        for item in replacements:
            assert home.count(item['before'])==1, 'Homepage copy anchor changed'
            home=home.replace(item['before'],item['after'])
        outputs['index.html']=home.replace('/assets/site.js?v=20260910-preview-optimization','/assets/site.js?v=20261013-product-content').encode('utf8')
        search_catalog=[]
        for product in catalog:
            pid=product['id']
            entry={key:product[key] for key in ['id','name','url','image','subtitle']}
            entry['tags']=list(dict.fromkeys(product['tags']+[s.lower() for s in display[pid]['ingredients']]+[s.lower() for s in display[pid].get('shop_tags',[])]))
            search_catalog.append(entry)
        runtime=archive.read('assets/site.js').decode('utf8').replace('\r\n','\n')
        start=runtime.index('const DEFAULT_CATALOG = [');end=runtime.index('\n];',start)+3
        outputs['assets/site.js']=(runtime[:start]+'const DEFAULT_CATALOG = '+json.dumps(search_catalog,ensure_ascii=False,indent=2)+';'+runtime[end:]).encode('utf8')
        for path in [p['url'] for p in catalog]+['/faq.html','/shop.html','/']:
            url = 'https://celdyque.com'+path
            pattern = r'(<loc>'+re.escape(url)+r'</loc>\s*<lastmod>)[^<]+'
            sitemap, count = re.subn(pattern, lambda m: m[1]+'2026-10-13', sitemap)
            assert count == 1, url
        outputs['sitemap.xml'] = sitemap.encode('utf8')
    # Refuse to overwrite unrelated edits; validate all files before writing any.
    for name, data in outputs.items():
        known = record['files'][name]
        assert digest((ROOT/name).read_bytes()) in {known['before_sha256'], known.get('after_sha256'), digest(data)}, 'Unrecognized local edits: '+name
    if apply:
        for name, data in outputs.items():
            (ROOT/name).write_bytes(data)
            record['files'][name]['after_sha256'] = digest(data)
        RECORD.write_text(json.dumps(record, indent=2), encoding='utf8')
        (backup/'manifest.json').write_text(json.dumps(record, indent=2), encoding='utf8')
    print(('APPLIED' if apply else 'DRY RUN')+': 14 product pages, common FAQ, shop tags, homepage wording and sitemap. No deployment.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--apply', action='store_true')
    run(parser.parse_args().apply)
