"""Check manuscripts against customer pages and schema; optionally export exact page copy."""
import argparse
import json
import re
from pathlib import Path
from check_seo import Document, normalized
from build_all_product_previews import draft

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT/'content'


def read(path):
    return json.loads(path.read_text(encoding='utf8'))


def readable(node):
    if isinstance(node, str):
        return node
    if node.tag in {'script', 'style'}:
        return ''
    if node.tag == 'br':
        return ' '
    text = normalized(''.join(readable(c) for c in node.children))
    if re.fullmatch('h[1-6]', node.tag):
        return '\n\n'+'#'*(min(int(node.tag[1])+1,6))+' '+text+'\n\n'
    if node.tag == 'summary':
        return '\n\n**'+text+'**\n\n'
    if node.tag == 'li':
        return '\n- '+text+'\n'
    if node.tag == 'p':
        return '\n\n'+text+'\n\n'
    text = ''.join(readable(c) for c in node.children)
    if node.tag in {'div','section','nav','details','ul','ol','main'}:
        return '\n\n'+text.strip()+'\n\n'
    return text


def check(export=False):
    ids=read(CONTENT/'catalog.json')['product_ids']
    faq=read(CONTENT/'copy/en/product-faq.json')['questions']
    common=read(CONTENT/'copy/en/faq.json')['questions']
    display=read(CONTENT/'copy/en/product-display.json')
    catalog_facts=read(CONTENT/'catalog-facts-2026.json')['products']
    assert set(catalog_facts)==set(ids), 'Catalog reconciliation must cover every active product'
    book=['# CELDYQUE — Customer Website Copy', '',
          'Updated: 13 October 2026. Generated from the actual product, common FAQ, shop and homepage files. See docs/deployment-2026-10-13.md for release status.', '',
          'Edit product manuscripts and FAQ JSON, rebuild the pages, then regenerate this file. Manufacturer evidence requests are in OWNER-INPUT-REQUIRED-KO.md, outside the customer copy.', '']
    pages=[]
    total=0
    for pid in ids:
        p=read(CONTENT/'products'/f'{pid}.json')
        path=ROOT/p['identity']['current_url'].lstrip('/')
        doc=Document(path.read_text(encoding='utf8')).root
        main=doc.find('main')[0]; text=normalized(main.text()); source=draft(p)
        for key in ['intro','Where it fits','Ingredient information','Before use','Where to buy','usage_note','Ingredient research']:
            assert normalized(source[key]) in text,(pid,'manuscript mismatch',key)
        for step in source['steps']:assert normalized(step) in text,(pid,'usage mismatch',step)
        assert doc.find('meta',name='description')[0].attrs['content']==source['intro'],(pid,'meta description')
        allowed=set(p['formulation']['selected_ingredients']['value']) | set(catalog_facts[pid]['additional_ingredients'])
        assert set(display[pid]['ingredients']) <= allowed,(pid,'ingredient lacks source')
        for phrase in catalog_facts[pid]['required_copy']:
            assert phrase in source['Ingredient information'] and phrase in text,(pid,'catalog fact missing',phrase)
        if pid=='cleansing-oil':
            assert not re.search(r'\bmugwort\b',text,re.I), 'Cleansing oil must follow the catalog, not the former mugwort tag'
        if pid=='pdrn-25':
            assert p['specifications']['texture']['value']=='Gel' and 'liquid concentrate' not in text
        graph=json.loads(doc.find('script',type='application/ld+json')[0].text())['@graph']
        product=next(n for n in graph if n.get('@type')=='Product')
        if display[pid].get('seo_title'):
            title=display[pid]['seo_title']
            assert doc.find('title')[0].text()==title
            assert doc.find('meta',property='og:title')[0].attrs['content']==title
            assert doc.find('meta',name='twitter:title')[0].attrs['content']==title
            assert next(n for n in graph if n.get('@type')=='WebPage')['name']==title
        if pid=='arbutxa-glow-cream':
            assert not re.search(r'Arbutin\s+(?:7%|70,000)',path.read_text(encoding='utf8'),re.I)
        assert product['description']==source['intro'],(pid,'schema description')
        sources=read(CONTENT/'ingredient-research.json')
        urls=[sources['sources'][sid]['url'] for sid in sources['product_sources'][pid]]
        assert re.findall(r'\]\((https://[^)]+)\)',source['Research sources'])==urls,(pid,'research source mismatch')
        assert next(n for n in graph if n.get('@type')=='WebPage')['citation']==urls,(pid,'schema citations')
        assert all(url in {a.attrs.get('href') for a in main.find('a')} for url in urls),(pid,'invisible citation')
        selected=[q for q in faq if q['question_id'] in p['faq_ids']]
        assert len(selected)==len(doc.find('details',**{'class':'faq-item'})),(pid,'FAQ count')
        schema=next(n for n in graph if n.get('@type')=='FAQPage')['mainEntity']
        for q,s in zip(selected,schema,strict=True):
            card=doc.find('details',id=q['question_id'])[0]
            assert normalized(card.find('summary')[0].text())==q['question']
            assert normalized(card.find('div',**{'class':'faq-answer'})[0].text())==q['answer']
            assert (s['name'],s['acceptedAnswer']['text'])==(q['question'],q['answer'])
        total+=len(selected)
        pages.append((path,doc,main))
    path=ROOT/'faq.html';doc=Document(path.read_text(encoding='utf8')).root
    graph=json.loads(doc.find('script',type='application/ld+json')[0].text())['@graph']
    schema=next(n for n in graph if n.get('@type')=='FAQPage')['mainEntity']
    for q,s in zip(common,schema,strict=True):
        card=doc.find('details',id='question-'+str(q['original_question_number']))[0]
        assert normalized(card.find('span',**{'class':'faq-question'})[0].text())==q['question']
        assert normalized(card.find('div',**{'class':'faq-answer'})[0].find('p')[0].text())==q['answer']
        assert (s['name'],s['acceptedAnswer']['text'])==(q['question'],q['answer'])
    pages.append((path,doc,doc.find('main')[0]))
    path=ROOT/'shop.html';doc=Document(path.read_text(encoding='utf8')).root
    for pid,values in display.items():
        if 'shop_tags' not in values:continue
        card=next(n for n in doc.find('a',**{'class':'p-card'}) if n.attrs['href']=='/product-'+pid+'.html')
        assert [normalized(n.text()) for n in card.find('span',**{'class':'tag'})]==values['shop_tags'],(pid,'shop tags')
    pages.append((path,doc,doc.find('main')[0]))
    assert common[0]['answer']==next(q['answer'] for q in faq if q['question_id']=='volufiline-100-faq-1')
    path=ROOT/'index.html';doc=Document(path.read_text(encoding='utf8')).root
    for item in read(CONTENT/'copy/en/shared-display.json')['index.html']:
        assert item['after'] in doc.text() and item['before'] not in doc.text()
    pages.append((path,doc,doc.find('main')[0]))
    banned=r'\b(?:existing (?:site|page|description|directions|material|information)|current (?:site|page)|this (?:content )?package|Ingredient Summary \d|needs? (?:verification|manufacturer confirmation)|PDRN collection guide|tone-care guide|concentrate and cream guide)\b'
    for path,doc,main in pages:
        assert not re.search(banned,main.text(),re.I),(path.name,'internal editorial text')
        for a in main.find('a'):
            href=a.attrs.get('href','').split('#')[0].split('?')[0]
            if href.startswith('/guide-'):assert (ROOT/href.lstrip('/')).is_file(),(path.name,'unpublished guide')
        body=re.sub(r'\n[ \t]+','\n',readable(main))
        body=re.sub(r'\n{3,}','\n\n',body).strip()
        book.extend(['---','',f'Page: `{path.name}`','',body,''])
    if export:(CONTENT/'CUSTOMER-COPY-EN.md').write_text('\n'.join(book),encoding='utf8')
    print(f'PASS: 14 manuscripts and {total+len(common)} FAQ answers match actual pages and JSON-LD; no editorial placeholders or unpublished-guide references.')


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--export',action='store_true')
    check(parser.parse_args().export)
