"""Validate the content package and its local preview, without external requests.

This checks consistency and completeness, not the truth of manufacturer claims.
Use --release-ready to audit whether actual publication approvals exist.
"""
from pathlib import Path
from urllib.parse import urlparse, unquote
import argparse
import hashlib
import json
import re
import sys
import subprocess

from check_seo import Document

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / 'content'
PREVIEW = ROOT / 'preview' / 'content'


def load(path):
    return json.loads(path.read_text(encoding='utf-8'))


def check(release_ready=False):
    failures=[]
    def expect(condition,message):
        if not condition: failures.append(message)
    catalog=load(CONTENT/'catalog.json')['product_ids']
    products=[load(CONTENT/'products'/f'{pid}.json') for pid in catalog]
    guides=load(CONTENT/'guides.json')['guides']
    evidence={e['evidence_id']:e for e in load(CONTENT/'evidence-index.json')['sources']}
    faq=load(CONTENT/'copy/en/product-faq.json')['questions']
    common=load(CONTENT/'copy/en/faq.json')['questions']
    qids={q['question_id'] for q in faq+common}
    expect(len(catalog)==len(set(catalog))==14,'Expected 14 unique active product IDs')
    expect(len(list((CONTENT/'products').glob('*.json')))==14,'Unexpected product-record count')
    expect(len(guides)==5,'Expected five guide drafts')
    expect(len(faq)==59 and len(common)==21,'Expected 59 product and 21 common answers')
    expect(len(qids)==80,'FAQ IDs must be unique')
    for e in evidence.values():
        path=ROOT/e['path']
        expect(path.is_file(),f'Missing evidence source: {path}')
        if path.is_file():
            captured = path.read_bytes()
            if hashlib.sha256(captured).hexdigest() != e['sha256'] and e.get('source_commit'):
                # Evidence describes the imported revision, not subsequent website edits.
                result = subprocess.run(['git', 'show', e['source_commit']+':'+e['path']], cwd=ROOT, capture_output=True)
                expect(result.returncode == 0, f'Imported evidence revision unavailable: {path}')
                captured = result.stdout
                if hashlib.sha256(captured).hexdigest() != e['sha256']:
                    captured = captured.replace(b'\r\n', b'\n').replace(b'\n', b'\r\n')
            expect(hashlib.sha256(captured).hexdigest()==e['sha256'],f'Imported source hash mismatch: {path}')
    def provenance(value,context):
        if isinstance(value,dict):
            for eid in value.get('evidence_ids',[]): expect(eid in evidence,f'{context}: unresolved evidence {eid}')
            for v in value.values(): provenance(v,context)
        elif isinstance(value,list):
            for v in value: provenance(v,context)
    for p in products:
        pid=p['product_id'];provenance(p,pid)
        expect(pid in catalog,f'Unknown product {pid}')
        expect(p['publication_status'] in ['draft','approved'],f'{pid}: invalid publication status')
        src=ROOT/p['identity']['current_url'].lstrip('/')
        expect(src.is_file(),f'{pid}: existing product URL missing')
        doc=Document(src.read_text(encoding='utf-8')).root
        g=[n for script in doc.find('script',type='application/ld+json') for n in json.loads(script.text()).get('@graph',[])]
        original=next(n for n in g if n.get('@type')=='Product')
        expect(p['identity']['asin']['value']==original['identifier']['value'],f'{pid}: ASIN changed')
        expect(p['identity']['canonical']==original['url'],f'{pid}: canonical changed')
        expect(p['specifications']['size']['value']==original['size'],f'{pid}: imported size changed')
        original_links={a.attrs.get('href') for a in doc.find('a')}
        for r in p['retailers']:
            for url in r['purchase_urls']: expect(url in original_links,f'{pid}: purchase parameters changed')
        expect((CONTENT/p['copy_file']).is_file(),f'{pid}: missing English draft')
        expect((ROOT/p['media']['primary_image'].lstrip('/')).is_file(),f'{pid}: primary image missing')
        expect(all(i in catalog for i in p['related_product_ids']),f'{pid}: invalid related product')
        expect(all(i in {g['guide_id'] for g in guides} for i in p['guide_ids']),f'{pid}: unknown guide')
        expect(all(i in qids for i in p['faq_ids']),f'{pid}: missing FAQ')
        expect(p['formulation']['full_inci']['value'] is None or p['formulation']['full_inci']['status'] in ['verified','approved'],f'{pid}: invented or unchecked full INCI')
        if release_ready:
            expect(p['publication_status']=='approved' and p['approved_by'] and p['approved_on'],f'{pid}: real publication approval is pending')
            expect(p['directions']['manufacturer_confirmed'],f'{pid}: manufacturer directions unconfirmed')
            expect(all(q['status']=='resolved' for q in p['open_questions']),f'{pid}: unresolved factual questions')
    for g in guides:
        provenance(g,g['guide_id'])
        expect((CONTENT/g['copy_file']).is_file(),f'{g["guide_id"]}: guide copy missing')
        expect(all(p in catalog for p in g['product_ids']),f'{g["guide_id"]}: unknown product')
        if release_ready: expect(g['status']=='approved' and g['approved_on'],f'{g["guide_id"]}: guide approval pending')
    for q in faq+common:
        provenance(q,q['question_id'])
        expect(bool(q['question'].strip() and q['answer'].strip()),f'{q["question_id"]}: empty Q&A')
        if release_ready: expect(q['status']=='approved',f'{q["question_id"]}: FAQ approval pending')

    pages=list(PREVIEW.glob('*.html'))
    expect(len(pages)==29,'Expected 29 preview pages')
    for path in pages:
        text=path.read_text(encoding='utf-8');doc=Document(text).root
        expect(len(doc.find('h1'))==1,f'{path.name}: expected one H1')
        expect(any('noindex' in n.attrs.get('content','') for n in doc.find('meta',name='robots')),f'{path.name}: noindex missing')
        expect(not doc.find('script',type='application/ld+json'),f'{path.name}: draft must not emit production schema')
        expect('googletagmanager.com' not in text and 'serviceWorker.register' not in text,f'{path.name}: tracking or service worker found')
        expect('local preview' in text,f'{path.name}: draft notice missing')
        for n in doc.find('a')+doc.find('img')+doc.find('link')+doc.find('source'):
            url=n.attrs.get('href',n.attrs.get('src',''))
            parsed=urlparse(url)
            if parsed.scheme or parsed.netloc: continue
            target=(path.parent/unquote(parsed.path)).resolve() if parsed.path else path
            expect(target.is_file(),f'{path.name}: broken local target {url}')
            if target.is_file() and parsed.fragment and target.suffix=='.html':
                target_doc=Document(target.read_text(encoding='utf-8')).root
                expect(bool(target_doc.find(id=unquote(parsed.fragment))),f'{path.name}: missing fragment {url}')
        ids=re.findall(r'\bid="([^"]+)"',text)
        expect(len(ids)==len(set(ids)),f'{path.name}: duplicate HTML ID')
    for p in products:
        preview=(PREVIEW/p['identity']['current_url'].lstrip('/')).read_text(encoding='utf-8')
        doc=Document(preview).root
        for qid in p['faq_ids']:
            q=next(q for q in faq if q['question_id']==qid)
            details=doc.find('details',id=qid)
            expect(len(details)==1 and q['answer'] in details[0].text(),f'{p["product_id"]}: FAQ content mismatch')
        expect(all(url in {a.attrs.get('href') for a in doc.find('a')} for url in p['retailers'][0]['purchase_urls'][:1]),f'{p["product_id"]}: preview purchase link missing')
    book=CONTENT/'CONTENT-PACK-EN.md'
    expect(book.is_file(),'Readable English content book missing')
    for file in [CONTENT/'README.md',book,CONTENT/'REVIEW-QUEUE-EN.md',ROOT/'docs/website-application-plan-en.md']:
        text=file.read_text(encoding='utf-8')
        expect('\ufffd' not in text,f'{file.name}: invalid replacement character')
        for link in re.findall(r'\]\(([^)]+)\)',text):
            parsed=urlparse(link)
            if parsed.scheme or link.startswith('#'): continue
            expect((file.parent/unquote(parsed.path)).is_file(),f'{file.name}: missing document link {link}')
    if failures:
        for failure in failures: print('FAIL:',failure)
        print(f'{len(failures)} checks failed.')
        return 1
    print(f'PASS: {len(products)} product records, {len(guides)} guides, {len(qids)} answers, {len(pages)} preview pages.')
    print('PASS: source hashes, identity and purchase URLs, provenance, local links, FAQ parity and preview isolation.')
    print('NOT VERIFIED: manufacturer facts, full INCI, claim evidence, publication approval or live search performance.')
    return 0


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--release-ready',action='store_true',help='Also require real product, guide and FAQ approvals; expected to fail for this draft.')
    sys.exit(check(parser.parse_args().release_ready))
