"""Build a local, non-publishing content review from English copy and product data.

No production HTML, tracking, service worker, sitemap or deployment setting is changed.
Run: python -B scripts/build_content_preview.py
"""
from pathlib import Path
import html
import hashlib
import json
import re
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / 'content'
OUTPUT = ROOT / 'preview' / 'content'


def read(name):
    return json.loads((CONTENT / name).read_text(encoding='utf-8'))


def esc(value):
    return html.escape(str(value), quote=True)


def inline(text):
    # Support only the Markdown constructs authored in this package; raw HTML is escaped.
    tokens = []
    def link(match):
        label, url = match.groups()
        if not (url.startswith(('https://', 'http://', '#')) or re.fullmatch(r'[\w./-]+(?:#[\w-]+)?', url)):
            raise ValueError('Unsupported Markdown URL: ' + url)
        tokens.append(f'<a href="{esc(url)}">{esc(label)}</a>')
        return f'LINKTOKEN{len(tokens)-1}ENDTOKEN'
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link, text)
    text = esc(text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    for i, token in enumerate(tokens):
        text = text.replace(f'LINKTOKEN{i}ENDTOKEN', token)
    return text


def markdown(text, remove_title=False):
    """Small deterministic renderer for our paragraphs, headings, lists and tables."""
    lines = text.splitlines()
    if remove_title and lines and lines[0].startswith('# '):
        lines = lines[1:]
    result = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                cells = [x.strip() for x in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-+:?', x) for x in cells):
                    rows.append(cells)
                i += 1
            result.append('<div class="table-scroll" tabindex="0" role="region" aria-label="Comparison table"><table><thead><tr>' + ''.join('<th scope="col">' + inline(x) + '</th>' for x in rows[0]) + '</tr></thead><tbody>')
            for row in rows[1:]:
                result.append('<tr>' + ''.join('<td>' + inline(x) + '</td>' for x in row) + '</tr>')
            result.append('</tbody></table></div>')
            continue
        heading = re.match(r'^(#{1,3}) (.+)$', line)
        if heading:
            n = len(heading[1])
            result.append(f'<h{n}>{inline(heading[2])}</h{n}>')
            i += 1
            continue
        if re.match(r'^(?:- |\d+\. )', line):
            tag = 'ul' if line.startswith('- ') else 'ol'
            result.append('<' + tag + '>')
            while i < len(lines) and re.match(r'^(?:- |\d+\. )', lines[i].strip()):
                result.append('<li>' + inline(re.sub(r'^(?:- |\d+\. )', '', lines[i].strip())) + '</li>')
                i += 1
            result.append('</' + tag + '>')
            continue
        paragraph = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r'^(?:#|\||- |\d+\. )', lines[i].strip()):
            paragraph.append(lines[i].strip())
            i += 1
        result.append('<p>' + inline(' '.join(paragraph)) + '</p>')
    return '\n'.join(result)


def shell(title, body, active=''):
    nav = [('shop.html', 'Products'), ('guides.html', 'Guides'), ('about.html', 'About'), ('store.html', 'Store'), ('faq.html', 'FAQ')]
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>{esc(title)} | CELDYQUE content preview</title>
<link rel="stylesheet" href="preview.css?v={hashlib.sha256((OUTPUT/'preview.css').read_bytes()).hexdigest()[:12]}"></head><body>
<a class="skip" href="#main">Skip to content</a>
<aside class="preview-notice">CONTENT REVIEW · ENGLISH DRAFTS <span>Product facts await label verification. This is a local preview.</span><a href="application.html">View application plan ↗</a></aside>
<header class="site-nav"><a class="wordmark" href="index.html">CELDYQUÉ</a><nav aria-label="Primary navigation">{''.join(f'<a href="{url}"'+(' aria-current="page"' if url==active else '')+f'>{label}</a>' for url,label in nav)}</nav><a class="review-link" href="review.html">Review desk ↗</a></header>
<main id="main">{body}</main>
<footer><a class="wordmark" href="index.html">CELDYQUÉ</a><p>Product information, clearly connected.</p><nav aria-label="Footer"><a href="contact.html">Contact</a><a href="application.html">How this applies</a><a href="review.html">Source & review status</a></nav><small>Draft review only · No analytics · No live deployment</small></footer>
</body></html>'''


def faq_html(questions):
    return '<div class="faq-list">' + ''.join(f'<details id="{esc(q["question_id"])}"><summary>{esc(q["question"])}</summary><p>{esc(q["answer"])}</p></details>' for q in questions) + '</div>'


def img_path(product):
    return '../../' + quote(product['media']['primary_image'].lstrip('/'), safe='/')


def name(product):
    return product['identity']['name']['value']


def product_card(product):
    spec = product['specifications']
    return f'''<a class="product-card" href="{esc(product['identity']['current_url'].lstrip('/'))}" data-category="{esc(spec['category']['value'])}">
<div class="product-image"><img src="{img_path(product)}" alt="{esc(product['media']['alt'])}" loading="lazy"></div>
<div class="card-copy"><span class="eyebrow">{esc(spec['format']['value'])}</span><h3>{esc(name(product))}</h3><p>{esc(spec['size']['value'])}</p><span class="card-arrow" aria-hidden="true">↗</span></div></a>'''


def guide_card(guide):
    return f'<a class="guide-card" href="{guide["proposed_url"].lstrip("/")}"><span class="eyebrow">Product guide</span><h3>{esc(guide["title"])}</h3><p>{esc(guide["summary"])}</p><span>Read the guide ↗</span></a>'


def build():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    products = [read('products/' + p + '.json') for p in read('catalog.json')['product_ids']]
    by = {p['product_id']: p for p in products}
    guides = read('guides.json')['guides']
    by_guide = {g['guide_id']: g for g in guides}
    product_faq = read('copy/en/product-faq.json')['questions']
    shared_faq = read('copy/en/faq.json')['questions']
    questions = {q['question_id']: q for q in product_faq}
    def write(filename, title, body, active=''):
        (OUTPUT / filename).write_text(shell(title, body, active), encoding='utf-8')

    hero = '''<section class="home-hero"><div><span class="eyebrow">The content collection · 2026</span><h1>A clearer way<br>to choose skincare.</h1><p>The same CELDYQUE products, organized around the details that help you choose: format, ingredients, directions and useful comparisons.</p><div class="actions"><a class="button" href="shop.html">Explore all 14 products</a><a class="text-link" href="application.html">See where the content goes ↗</a></div></div><div class="hero-visual">'''
    hero += f'<img src="{img_path(by["pdrn-12-egf"])}" alt="PDRN serum product image"><span>PDRN COLLECTION<br>Concentrate · Serum · Cream</span></div></section>'
    hero += '<section class="section"><div class="section-title"><div><span class="eyebrow">Start with a question</span><h2>More useful comparisons.</h2></div><a href="guides.html">All guides ↗</a></div><div class="guide-grid">'+''.join(guide_card(g) for g in guides[:3])+'</div></section>'
    hero += '<section class="section"><div class="section-title"><div><span class="eyebrow">Three products, three roles</span><h2>The PDRN collection.</h2></div><a href="guide-pdrn-comparison.html">Compare the collection ↗</a></div><div class="product-grid three">'+''.join(product_card(by[i]) for i in ['pdrn-25','pdrn-12-egf','pdrn-12-egf-cream'])+'</div></section>'
    hero += '<section class="quiet-band"><span class="eyebrow">Preview scope</span><h2>Content first. Design later.</h2><p>This review uses existing product images and a restrained layout to show the information hierarchy. It is not a final visual redesign.</p><a href="review.html">Review the source material ↗</a></section>'
    write('index.html','Content collection',hero)

    shop = '<section class="page-head"><span class="eyebrow">The collection</span><h1>Find your format.</h1><p>Fourteen products. Start with the step you need, then read the product details.</p></section>'
    cats = [('all','All products'),('Face Serum','Serums & concentrates'),('Cream','Creams'),('Cleanser','Cleansers'),('Scalp Serum','Scalp care')]
    shop += '<section class="section"><div class="filters" role="group" aria-label="Product category">'+''.join(f'<button type="button" data-filter="{c}" aria-pressed="{str(c=="all").lower()}">{t}</button>' for c,t in cats)+'</div><p id="catalog-count" class="small" aria-live="polite">14 products</p><div class="product-grid">'+''.join(product_card(p) for p in products)+'</div></section>'
    shop += '''<script>document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{let count=0;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.getElementById('catalog-count').textContent=count+' products';}));</script>'''
    write('shop.html','All products',shop,'shop.html')

    for p in products:
        pid = p['product_id']
        spec = p['specifications']
        copy = (CONTENT / p['copy_file']).read_text(encoding='utf-8')
        intro = copy.split('\n\n')[1]
        detail_copy = '\n\n'.join(copy.split('\n\n')[2:])
        body = f'''<div class="breadcrumbs"><a href="shop.html">Products</a><span>/</span>{esc(spec['format']['value'])}</div>
<section class="product-hero"><div class="product-stage"><img src="{img_path(p)}" alt="{esc(p['media']['alt'])}" fetchpriority="high"></div><div class="product-intro"><span class="eyebrow">{esc(spec['format']['value'])}</span><h1>{esc(name(p))}</h1><p class="lead">{esc(intro)}</p><dl class="specs"><div><dt>Size</dt><dd>{esc(spec['size']['value'])}</dd></div><div><dt>Routine step</dt><dd>{esc(spec['routine_step']['value'])}</dd></div><div><dt>Format</dt><dd>{esc(spec['texture']['value'])}</dd></div></dl><div class="actions"><a class="button" href="{esc(p['retailers'][0]['purchase_urls'][0])}" target="_blank" rel="noopener noreferrer">View on Amazon ↗</a><a class="text-link" href="#product-information">Read product information ↓</a></div><p class="small">Purchases and current availability are handled by the retailer.</p></div></section>
<section class="product-details section" id="product-information"><aside class="detail-nav"><span class="eyebrow">Product information</span><a href="#product-information">Overview & directions</a><a href="#ingredient-detail">Ingredients</a><a href="#product-questions">Product questions</a><a href="review.html#{pid}">Review status ↗</a></aside><div class="prose">{markdown(detail_copy)}'''
        ingredients = p['formulation']['selected_ingredients']['value']
        body += '<section id="ingredient-detail"><h2>Selected ingredients</h2><p>'+esc(', '.join(ingredients))+'.</p><details class="ingredient-disclosure"><summary>Complete ingredient declaration</summary><p>A verified full INCI declaration has not been supplied for this draft. Use the current product packaging. This ingredient summary must not be presented as the complete formula.</p></details></section>'
        body += '<section id="product-questions"><h2>Product questions</h2>'+faq_html([questions[i] for i in p['faq_ids']])+'</section></div></section>'
        if p['guide_ids']:
            body += '<section class="section"><div class="section-title"><h2>A useful next read.</h2></div><div class="guide-grid">'+''.join(guide_card(by_guide[g]) for g in p['guide_ids'])+'</div></section>'
        if p['related_product_ids']:
            body += '<section class="section"><div class="section-title"><h2>Compare the formats.</h2></div><div class="product-grid three">'+''.join(product_card(by[i]) for i in p['related_product_ids'])+'</div></section>'
        write(p['identity']['current_url'].lstrip('/'),name(p),body,'shop.html')

    write('guides.html','Product guides','<section class="page-head"><span class="eyebrow">A little more context</span><h1>Choose with clarity.</h1><p>Compare formats, understand directions and find the product details behind the names.</p></section><section class="section"><div class="guide-grid">'+''.join(guide_card(g) for g in guides)+'</div></section>','guides.html')
    for g in guides:
        body = '<article class="article prose"><span class="eyebrow">CELDYQUE product guide</span>'+markdown((CONTENT/g['copy_file']).read_text(encoding='utf-8'))+'</article>'
        body += '<section class="section"><div class="section-title"><h2>Products in this guide.</h2></div><div class="product-grid three">'+''.join(product_card(by[i]) for i in g['product_ids'])+'</div></section>'
        write(g['proposed_url'].lstrip('/'),g['title'],body,'guides.html')

    body = '<section class="page-head"><span class="eyebrow">Product & shopping help</span><h1>Good questions.<br>Clearer answers.</h1><p>Ingredient information, product formats, routines and retailer support.</p></section><section class="article faq-page"><label class="search-label" for="faq-search">Search questions</label><input id="faq-search" class="faq-search" type="search" placeholder="Try PDRN, ingredients or delivery"><p id="faq-count" class="small" aria-live="polite">21 questions</p>'+faq_html(shared_faq)+'</section>'
    body += '''<script>document.getElementById('faq-search').addEventListener('input',e=>{const query=e.target.value.trim().toLowerCase();let count=0;document.querySelectorAll('.faq-list details').forEach(item=>{item.hidden=!item.textContent.toLowerCase().includes(query);if(item.hidden)item.open=false;else count++;});document.getElementById('faq-count').textContent=count?count+' questions':'No matching questions. Try a different word.';});</script>'''
    write('faq.html','Frequently asked questions',body,'faq.html')
    for key in ['about','contact','store','brand-film']:
        body='<article class="article prose">'+markdown((CONTENT/f'copy/en/pages/{key}.md').read_text(encoding='utf-8'))+'</article>'
        if key=='store':
            body += '<section class="section retailer-grid">'+''.join(f'<a class="guide-card" href="{esc(r["url"])}" target="_blank" rel="noopener noreferrer"><span class="eyebrow">Retailer destination</span><h2>{esc(r["label"])}</h2><span>Visit retailer ↗</span></a>' for r in read('retailers.json')['retailers'])+'</section>'
        if key=='brand-film':
            doc=(ROOT/'brand-film.html').read_text(encoding='utf-8')
            video=re.search(r'<source[^>]+src="([^"]+)"',doc)
            if video:
                body += f'<section class="section"><video controls preload="metadata" class="film"><source src="../../{esc(video[1].lstrip("/"))}" type="video/mp4"></video></section>'
        write(key+'.html',key.replace('-',' ').title(),body,key+'.html')

    body='''<section class="page-head"><span class="eyebrow">Website application</span><h1>The material becomes<br>a connected website.</h1><p>Existing product URLs and retailer links stay in place. The change is a shared source of product information and clearer paths through it.</p></section><section class="section application-grid"><article class="guide-card"><span class="eyebrow">01 · Source material</span><h2>One record per product.</h2><p>Identity, selected ingredients, directions, provenance and unresolved questions are stored together. No invented full INCI or approval.</p></article><article class="guide-card"><span class="eyebrow">02 · Page content</span><h2>Short overview. Useful detail.</h2><p>Product summary and specifications lead. Directions, selected ingredients and expandable answers follow.</p></article><article class="guide-card"><span class="eyebrow">03 · Connected guides</span><h2>Compare products in context.</h2><p>Product pages link to substantive guides. Guides link back to the exact products.</p></article></section>'''
    body += '<section class="section"><div class="section-title"><div><span class="eyebrow">Before / proposed</span><h2>Review the content in context.</h2></div></div><div class="table-scroll"><table><thead><tr><th>Page</th><th>Current local page</th><th>Proposed content</th><th>Main change</th></tr></thead><tbody>'
    changes={'pdrn-25':'Define the role of the concentrate without ranking percentages.','pdrn-12-egf':'Separate serum format from unverified PDRN-complex claims.','pdrn-12-egf-cream':'Explain the moisturizer step and link the collection comparison.','volufiline-100':'Put mixing directions before performance language.'}
    for p in products:
        file=p['identity']['current_url'].lstrip('/')
        body+=f'<tr><td>{esc(name(p))}</td><td><a href="../../{file}" target="_blank" rel="noopener">Current page ↗</a></td><td><a href="{file}">Content preview ↗</a></td><td>{esc(changes.get(p["product_id"],"Clearer format, directions, ingredient limits and product questions."))}</td></tr>'
    body+='</tbody></table></div></section><section class="quiet-band"><span class="eyebrow">Next step after review</span><h2>Verify, approve, then apply.</h2><p>Manufacturer and label checks come before public release. The preview deliberately has no production schema, analytics or service worker. The current deployment script excludes this preview and its source content.</p><a href="review.html">See what needs confirmation ↗</a></section>'
    write('application.html','Website application plan',body)

    body='<section class="page-head"><span class="eyebrow">Internal review desk</span><h1>What is known.<br>What needs confirmation.</h1><p>Existing-site facts are imported observations, not verified manufacturer specifications. All new copy is an English editorial draft.</p><div class="review-stats"><span><strong>14</strong> product records</span><span><strong>5</strong> guides</span><span><strong>80</strong> draft answers</span><span><strong>0</strong> approved for release</span></div></section>'
    body+='<section class="section"><div class="guide-grid"><a class="guide-card" href="../../content/CONTENT-PACK-EN.md"><h2>Complete English material</h2><p>Product records, drafts, questions and guides in one Markdown book.</p></a><a class="guide-card" href="../../docs/website-application-plan-en.md"><h2>Application plan</h2><p>File mapping, review gates and implementation sequence.</p></a><a class="guide-card" href="../../content/REVIEW-QUEUE-EN.md"><h2>Evidence requests</h2><p>Product-by-product open questions and claims held for review.</p></a></div></section>'
    for p in products:
        body+=f'<section class="review-product article" id="{p["product_id"]}"><span class="eyebrow">Draft · {esc(p["product_id"])}</span><h2>{esc(name(p))}</h2><p>Full INCI: not supplied. Manufacturer verification: pending. Publication approval: pending.</p><ul>'+''.join('<li>'+esc(q['question'])+'</li>' for q in p['open_questions'])+'</ul><p><strong>Claims held from new promotional copy:</strong> '+esc('; '.join(c['claim'] for c in p['claims_held_for_review']))+f'</p><a href="{p["identity"]["current_url"].lstrip("/")}">View this product draft ↗</a></section>'
    write('review.html','Review desk',body)
    (OUTPUT/'robots.txt').write_text('User-agent: *\nDisallow: /\n',encoding='utf-8')
    build_book(products,guides,product_faq,shared_faq)
    print(f'Built {len(list(OUTPUT.glob("*.html")))} draft preview pages at {OUTPUT}')


def build_book(products,guides,product_faq,shared_faq):
    qby={q['question_id']:q for q in product_faq}
    book=['# CELDYQUE — English Content Pack', '', 'Prepared: 12 October 2026', '', '**Status: complete editorial draft; not approved for public release.** Existing website statements are imported observations. No manufacturer labels, complete INCI declarations or finished-product evidence have been supplied for verification.', '', 'This readable book is generated from the product JSON records, English Markdown copy and FAQ JSON. Edit those source files, then run `python -B scripts/build_content_preview.py`. Do not maintain a second set of facts in this generated book.', '', '## Contents', '', '- [Product materials](#product-materials)', '- [Comparison and usage guides](#comparison-and-usage-guides)', '- [Shared website copy](#shared-website-copy)', '- [Common FAQ](#common-faq)', '', '<a id="product-materials"></a>', '', '## Product materials', '']
    queue=['# CELDYQUE — Review Queue', '', 'Prepared: 12 October 2026. All items remain open until suitable evidence and a real reviewer are recorded.', '', 'No product is blocked from being reviewed in the preview. Missing evidence prevents publication approval, not preparation of draft content.', '']
    for p in products:
        pid=p['product_id'];body=(CONTENT/p['copy_file']).read_text(encoding='utf-8')
        book+=['---','',f'### {name(p)}','',f'- Product ID: `{pid}`',f'- Existing URL: `{p["identity"]["current_url"]}`',f'- Size: {p["specifications"]["size"]["value"]}',f'- ASIN: `{p["identity"]["asin"]["value"]}`',f'- Provenance: `{p["identity"]["name"]["evidence_ids"][0]}`; source section and status are recorded in `products/{pid}.json`.', '- Full INCI: not supplied / needs verification.', '- Selected ingredients from current site: '+', '.join(p['formulation']['selected_ingredients']['value'])+'.', '- Observed concentration labels: '+('; '.join(p['formulation']['concentration_labels']['value']) or 'No numerical concentration recorded in this summary')+'.', '', '**English page draft**','', re.sub(r'^(#{1,3}) ',lambda m:'#'*(len(m[1])+2)+' ',body,flags=re.M),'', '#### Product questions','']
        for qid in p['faq_ids']:
            q=qby[qid];book += [f'**{q["question"]}**','',q['answer'],'']
        book += ['#### Items to confirm','']+['- '+q['question'] for q in p['open_questions']]+['','#### Claims held for evidence','']+['- '+v['claim'] for v in p['claims_held_for_review']]+['']
        queue += [f'## {name(p)}', '', f'Product ID: `{pid}` · Existing page: `{p["identity"]["current_url"]}`', '']+['- [ ] '+q['question'] for q in p['open_questions']]+['- [ ] Approve the exact English wording after fact verification.','','Held claims: '+ '; '.join(c['claim'] for c in p['claims_held_for_review'])+'.','']
    book+=['<a id="comparison-and-usage-guides"></a>','','## Comparison and usage guides','']
    for g in guides:
        book += ['---','',f'Proposed URL: `{g["proposed_url"]}` · Status: draft','',re.sub(r'^(#{1,3}) ',lambda m:'#'*(len(m[1])+2)+' ',(CONTENT/g['copy_file']).read_text(encoding='utf-8'),flags=re.M),'']
    book+=['<a id="shared-website-copy"></a>','','## Shared website copy','']
    for file in sorted((CONTENT/'copy/en/pages').glob('*.md')):
        book+=['---','',f'Source: `copy/en/pages/{file.name}`','',re.sub(r'^(#{1,3}) ',lambda m:'#'*(len(m[1])+2)+' ',file.read_text(encoding='utf-8'),flags=re.M),'']
    book+=['<a id="common-faq"></a>','','## Common FAQ','']
    for q in shared_faq:
        book += [f'### {q["question"]}', '',q['answer'],'',f'Question ID: `{q["question_id"]}` · Status: draft','']
    # Markdown links in copy are preview-relative; make the generated book links usable.
    text='\n'.join(book)
    text=re.sub(r'\]\(([\w-]+\.html(?:#[\w-]+)?)\)',r'](../preview/content/\1)',text)
    (CONTENT/'CONTENT-PACK-EN.md').write_text(text,encoding='utf-8')
    (CONTENT/'REVIEW-QUEUE-EN.md').write_text('\n'.join(queue),encoding='utf-8')


if __name__=='__main__':
    build()
