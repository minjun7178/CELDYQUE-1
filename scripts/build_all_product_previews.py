"""Apply the English drafts to original product designs in an isolated preview."""
from pathlib import Path
import hashlib
import html
import json
import re
from build_pdrn_design_preview import ROOT, Positions, sanitize, original_bytes

OUT = ROOT/'preview/all-products'
CONTENT = ROOT/'content'


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def paragraphs(text):
    return [p.strip() for p in text.strip().split('\n\n') if p.strip()]


def draft(p):
    text = (CONTENT/p['copy_file']).read_text(encoding='utf-8')
    chunks = re.split(r'^## (.+)\n', text, flags=re.M)
    data = {chunks[i]:chunks[i+1].strip() for i in range(1,len(chunks),2)}
    data['intro'] = paragraphs(chunks[0])[1]
    data['steps'] = re.findall(r'^\d+\. (.+)$', data['How to use'], re.M)
    data['usage_note'] = ' '.join(line.strip() for line in data['How to use'].splitlines() if line.strip() and not re.match(r'^\d+\.',line))
    assert len(data['steps']) == 3, p['product_id']
    return data


class Editor:
    def __init__(self, original):
        self.source = original
        self.doc = Positions(original).root
        self.edits, self.changes = [], []

    def one(self, scope=None, tag=None, cls=None, id=None):
        matches = (scope or self.doc).find(tag,cls,id)
        assert len(matches)==1,(tag,cls,id,len(matches))
        return matches[0]

    def put(self, node, value, raw=False):
        old=self.source[node.inner:node.end].strip()
        if (old==value if raw else ' '.join(html.unescape(old).split())==' '.join(value.split())):
            return
        self.edits.extend([(node.inner-1,node.inner-1,' data-preview-changed="true"'),(node.inner,node.end,value if raw else html.escape(value))])
        self.changes.append({'tag':node.tag,'class':node.attrs.get('class'),'id':node.attrs.get('id'),'before':old,'after':value})

    def text(self, scope, cls, value):
        self.put(self.one(scope,cls=cls),value)

    def finish(self):
        ordered=sorted(self.edits)
        assert all(a[1]<=b[0] for a,b in zip(ordered,ordered[1:])), 'Overlapping replacements'
        result=self.source
        for start,end,value in reversed(ordered):result=result[:start]+value+result[end:]
        return result


# Short, product-specific labels fit the existing visual components. Narrative and
# directions are read from the authored Markdown, not invented from ingredient names.
PRESENTATION = {
 'pdrn-12-egf': ('After cleansing. Before moisturizer.', 'Serum', ['PDRN','EGF','Volufiline','Niacinamide','Peptides','Ceramide','Panthenol','30 ml']),
 'pdrn-25': ('A concentrate in the PDRN collection.', 'Concentrate', ['PDRN','EGF','Panthenol','30 ml','Gel format','Before moisturizer']),
 'pdrn-12-egf-cream': ('The cream step in the PDRN collection.', 'Cream', ['PDRN','EGF','Volufiline','Niacinamide','Ceramide','Panthenol','Squalane','50 ml']),
 'bakuchiol-30000': ('A mix-in format for your moisturizer.', 'Mix-in', ['Bakuchiol','Mix-in format','1–2 drops','30 ml','Liquid concentrate','Mix in your palm','Check the label']),
 'bakuchiol-volume-collagen-cream': ('Bakuchiol in a cream format.', 'Cream', ['Bakuchiol','Volufiline','Collagen','EGF peptide','Ceramide','Panthenol','Cica','50 ml']),
 'blue-copper-peptide-bakuchiol-serum': ('A peptide serum before moisturizer.', 'Serum', ['Copper peptide','Bakuchiol','Peptides','Niacinamide','Panthenol','Beta-Glucan','Allantoin','30 ml']),
 'arbutxa-glow-cream': ('The cream step after your serum.', 'Cream', ['Arbutin 5%','Alpha-Arbutin 2%','TXA 5%','Niacinamide 2%','Cream format','After serum','Centella','50 ml']),
 'glutathione-30000': ('A serum format in the tone-care collection.', 'Serum', ['Glutathione','Niacinamide','Panthenol','Ceramide NP','Resveratrol','Hyaluronic Acid','Serum format','30 ml']),
 'niacinamide-20-advanced': ('A serum step between toner and cream.', 'Serum', ['Niacinamide','Rose Water','Glycerin','Green Tea','Beta-Glucan','Hyaluronate','Serum format','30 ml']),
 'azelaic-12': ('After toner. Before moisturizer.', 'Serum', ['Azelaic Acid','Tranexamic Acid','Salicylic Acid','Niacinamide','Panthenol','Centella','Ceramide NP','30 ml']),
 'gentle-cleanser': ('Wet, lather, then rinse.', 'Cleanser', ['Rinse-off','Foaming wash','Centella','Tea Tree','Glycerin','Niacinamide','Allantoin','150 ml']),
 'cleansing-oil': ('Massage, emulsify, then rinse.', 'Cleansing oil', ['Cleansing oil','Centella','Tea Tree','Green Tea','Heartleaf','LHA','Rinse off','200 ml']),
 '9-peptide-scalp-serum': ('Targeted application for the scalp.', 'Scalp care', ['Roll-on','Leave-on','Scalp care','Rosemary','Caffeine','Peptides','Panthenol','40 ml']),
 'volufiline-100': ('An oil-based addition to your moisturizer.', 'Mix-in', ['Volufiline','Oil-based','Mix-in format','1–2 drops','10 ml','Label directions'])
}


def field(p,key):return p['specifications'][key]['value']


def local_only(source,label):
    source=sanitize(source,label)
    source=re.sub(r'<meta\s+[^>]*name="robots"[^>]*>', '<meta name="robots" content="noindex,nofollow" />',source,flags=re.I)
    return source


def common_top(e,p,d):
    top=e.one(cls='product-top');labels=PRESENTATION[p['product_id']][2]
    e.text(top,'product-kicker',field(p,'format'))
    e.text(top,'subtitle',field(p,'format')+' · '+field(p,'size'))
    e.text(top,'desc-text',d['intro'])
    for node,label in zip(top.find(cls='badge'),labels,strict=True):e.put(node,label)
    features=[field(p,'texture')+' format', 'Routine: '+field(p,'routine_step')]+d['steps']
    e.put(e.one(top,cls='features-list'),'\n'.join('<li>'+html.escape(x)+'</li>' for x in features),raw=True)


def usage(e,d,volufiline=False):
    section=e.one(cls='usage-section')
    for card,step in zip(section.find(cls='step-card'),d['steps'],strict=True):e.put(e.one(card,tag='p'),step)
    note=d['usage_note']
    if volufiline:e.text(section,'usage-sub',note)
    else:e.put(section.find(tag='p')[-1],note)


def research_html(d):
    refs=re.findall(r'\[([^\]]+)\]\((https://[^)]+)\)',d['Research sources'])
    assert refs, 'Ingredient context must have source links'
    links=' · '.join('<a href="'+html.escape(url,quote=True)+'" style="text-decoration:underline">'+html.escape(label)+'</a>' for label,url in refs)
    return '<strong>About the ingredients:</strong> '+html.escape(d['Ingredient research'])+'<br /><small>Research cited here concerns ingredients or other formulations, not a clinical trial of this CELDYQUE product. '+links+'</small>'


def faq(e,p,d,questions,products,volufiline=False):
    section=e.one(cls='faq-section')
    e.put(e.one(e.one(section,cls='section-head'),tag='p'),'Format, directions and ingredient information for this product.')
    selected=[q for q in questions if q['question_id'] in p['faq_ids']]
    contents=[]
    for q in selected:
        contents.append('<details class="faq-item" id="'+q['question_id']+'"><summary>'+html.escape(q['question'])+'</summary><div class="faq-answer">'+html.escape(q['answer'])+'</div></details>')
    related=p['related_product_ids'][:2]
    links=['<a href="/faq.html" style="text-decoration:underline">More product questions</a>']
    links += ['<a href="'+products[i]['identity']['current_url']+'" style="text-decoration:underline">'+html.escape(products[i]['identity']['name']['value'])+'</a>' for i in related]
    contents.append('<p style="margin-top:24px">'+' · '.join(links)+'</p>')
    e.put(e.one(section,cls='faq-list'),'\n'.join(contents),raw=True)
    bottom=e.one(cls='bottom-cta')
    e.put(e.one(bottom,tag='p'),d['Where to buy'])
    return selected


def standard(e,p,d):
    pid=p['product_id'];heading,short,_=PRESENTATION[pid]
    common_top(e,p,d)
    banner=e.one(cls='banner-inner')
    e.text(banner,'banner-tag',field(p,'format')+' · '+field(p,'size').split('/')[0].strip())
    e.put(e.one(banner,tag='h2'),heading)
    e.put(e.one(banner,tag='p'),d['Where it fits'])
    grids=e.doc.find(cls='detail-grid')
    for index,grid in enumerate(grids):
        block=e.one(grid,cls='detail-text')
        e.put(e.one(block,tag='h3'),'Where it fits.' if index==0 else 'Read the complete formula.')
        stats=([(field(p,'size').split('/')[0].strip(),'Listed size'),(short,'Product format'),('Label','Directions first')] if index==0 else [('Format','Routine role'),('INCI','Full ingredient list'),('Label','Current instructions')])
        for item,(num,label) in zip(block.find(cls='stat-item'),stats,strict=True):
            e.text(item,'num',num);e.text(item,'label',label)
        texts=[d['Where it fits'],d['intro']] if index==0 else [d['Ingredient information'],'Selected ingredients are a summary. Check the complete declaration on your packaging when comparing formulas.']
        for node,text in zip(block.find(tag='p'),texts,strict=True):e.put(node,text)
        overlay=e.one(grid,cls='visual-copy')
        e.put(e.one(overlay,tag='h4'),heading if index==0 else 'Ingredients in context.')
        e.put(e.one(overlay,tag='p'),('Use the application method and routine step for this specific product.' if index==0 else 'Explore selected ingredients below and check your packaging for the complete ingredient list.'))
        e.put(e.one(overlay,cls='ev-chips'),''.join('<span>'+html.escape(t)+'</span>' for t in ([short,field(p,'size').split('/')[0].strip(),'Directions'] if index==0 else ['Formula','INCI','Label'])),raw=True)
    section=e.one(cls='benefit-section');head=e.one(section,cls='section-head')
    e.text(head,'eyebrow','Product at a Glance')
    e.put(e.one(head,tag='h2'),'The details that help you choose.')
    e.put(e.one(head,tag='p'),'Product format, application and label information in one place.')
    cards=[('Product Format',field(p,'format')+'.'),('Listed Size',field(p,'size')+'.'),('First Step',d['steps'][0]),('Application',d['steps'][1]),('Finish the Step',d['steps'][2]),('Before Use','Read the complete ingredients and precautions on your current packaging.')]
    for card,(title,body) in zip(section.find(cls='benefit-card'),cards,strict=True):
        e.put(e.one(card,tag='h3'),title);e.put(e.one(card,tag='p'),body)
    section=e.one(cls='peptide-section')
    e.put(e.one(section,tag='h2'),'Selected Ingredient Information')
    e.text(section,'sub','These selected names do not replace the complete INCI declaration on your packaging.')
    ingredients=read(CONTENT/'copy/en/product-display.json')[pid]['ingredients']
    groups=[ingredients[i:i+2] for i in range(0,len(ingredients),2)]
    # Six existing cards: up to five short ingredient groups and one scope note.
    if len(groups)>5:groups=groups[:4]+[sum(groups[4:],[])]
    entries=[]
    for i,group in enumerate(groups):
        entries.append((group[0], ('Also listed: '+', '.join(group[1:])+'.') if len(group)>1 else 'See the complete ingredient list on your packaging.'))
    extras=[('Full INCI','Check the complete ingredient declaration on the current packaging.'),('Formula Details',d['Ingredient information']),('Product Format',field(p,'format')+'.'),('Label First','Follow the directions and precautions for your specific product.')]
    entries=(entries+extras)[:6]
    assert len(entries)==6
    for card,(title,body) in zip(section.find(cls='peptide-card'),entries,strict=True):
        e.text(card,'p-name',title);e.text(card,'p-desc',body)
    usage(e,d)
    box=e.one(cls='ingredients-box')
    e.put(e.one(box,tag='h3'),'Ingredient Information')
    # This unclassed intro and badge row can carry old claim language too.
    e.put(box.find(tag='p')[0],'Selected ingredients · Complete list on packaging')
    e.put(e.one(box,cls='freefrom'),'<span>Selected summary</span><span>Check packaging</span>',raw=True)
    ing=e.one(box,cls='ing-list')
    texts=['<strong>Selected ingredients:</strong> '+html.escape('; '.join(ingredients))+'.',html.escape(d['Ingredient information']),'<strong>Format:</strong> '+html.escape(field(p,'texture'))+'.',research_html(d)]
    for node,body in zip(ing.find(tag='p'),texts,strict=True):e.put(node,body,raw=True)
    e.text(ing,'caution',d['Before use'])


def volufiline(e,p,d):
    common_top(e,p,d)
    facts=[('Oil-based','Product Format','A concentrate designed to mix with compatible skincare.'),('Label','Full Ingredients','Read the complete ingredient declaration on your packaging.'),('1–2','Drops per Use','Mix in your palm immediately before application, following the label.'),('10 ml','Bottle Size','10 ml / 0.33 fl oz.')]
    for card,(n,t,b) in zip(e.doc.find(cls='fact-card'),facts,strict=True):
        e.text(card,'fact-num',n);e.text(card,'fact-title',t);e.text(card,'fact-desc',b)
    origin=e.one(cls='origin-copy')
    e.text(origin,'eyecap-dark','Product Information')
    e.put(e.one(origin,tag='h2'),'Your product.<br />Your label.',raw=True)
    e.put(e.one(origin,tag='p'),d['Ingredient information'])
    section=e.one(cls='formula-section');head=e.one(section,cls='section-head')
    e.text(head,'eyebrow','Oil-Based Format')
    e.put(e.one(head,tag='h2'),'A mix-in step by design.')
    e.put(e.one(head,tag='p'),d['Where it fits'])
    for card,(title,body,highlight) in zip(section.find(cls='formula-card'),[
        ('Oil-Based Concentrate',d['Ingredient information'],'Check the full ingredient list before use.'),
        ('Mix Before Application',d['intro'],'Use the method and amount on your current packaging.')],strict=True):
        e.put(e.one(card,tag='h3'),title);e.put(e.one(card,tag='p'),body);e.text(card,'formula-highlight',highlight)
    e.text(section.find(cls='formula-card')[0],'formula-index','01 · INGREDIENT SUMMARY')
    usage(e,d,True)
    e.text(e.one(cls='usage-section'),'mix-equation','COMPATIBLE SKINCARE + 1–2 DROPS · MIX IN YOUR PALM BEFORE USE')
    section=e.one(cls='areas-section');head=e.one(section,cls='section-head')
    e.text(head,'eyebrow','Application Checklist')
    e.put(e.one(head,tag='h2'),'Before you apply.')
    e.put(e.one(head,tag='p'),'Use only on the areas and with the mixing method described on your current packaging.')
    items=[('Choose the Area','Follow the application areas identified on your product label.'),('Mix in Your Palm','Prepare the mixture immediately before application.'),('Use a Compatible Base','Use cream, lotion or compatible serum according to the directions.'),('Read the Precautions','Patch test before first use and avoid direct eye contact.')]
    for card,(title,body) in zip(section.find(cls='area-card'),items,strict=True):e.put(e.one(card,tag='h3'),title);e.put(e.one(card,tag='p'),body)
    section=e.one(cls='benefits-section');head=e.one(section,cls='section-head')
    e.text(head,'eyebrow','Product at a Glance');e.put(e.one(head,tag='h2'),'Mix before application.');e.put(e.one(head,tag='p'),d['intro'])
    cards=[('Mix-in Format',d['steps'][0]),('Prepare the Mixture',d['steps'][1]),('Oil-Type Concentrate','A different application format from a ready-to-use face serum.'),('Follow Your Label',d['steps'][2])]
    for card,(title,body) in zip(section.find(cls='benefit-card'),cards,strict=True):e.put(e.one(card,tag='h3'),title);e.put(e.one(card,tag='p'),body)
    box=e.one(cls='ingredients-box');e.text(box,'ingredient-label','Oil-Based Concentrate')
    ing=e.one(box,cls='ing-list')
    for node,body in zip(ing.find(tag='p'),[html.escape(d['Ingredient information']),'For the complete and most current ingredient declaration, refer to the INCI list printed on your packaging.',research_html(d)],strict=True):e.put(node,body,raw=True)
    e.text(ing,'caution',d['Before use'])


def validate(original,result):
    a=Positions(original).root;b=Positions(result).root
    assert [original[n.inner:n.end] for n in a.find(tag='style')]==[result[n.inner:n.end] for n in b.find(tag='style')], 'CSS changed'
    for tag in ['img','section']:
        assert [n.attrs for n in a.find(tag=tag)]==[n.attrs for n in b.find(tag=tag)],tag+' changed'
    assert [n.attrs for n in a.find(cls='btn-buy')]==[n.attrs for n in b.find(cls='btn-buy')],'Purchase links changed'
    assert len(b.find(tag='h1'))==1
    assert not [n for n in b.find(tag='script') if n.attrs.get('type')=='application/ld+json']
    assert any(n.attrs.get('name')=='robots' and n.attrs.get('content')=='noindex,nofollow' for n in b.find(tag='meta'))


def build():
    OUT.mkdir(parents=True,exist_ok=True);(OUT/'before').mkdir(exist_ok=True);(OUT/'changes').mkdir(exist_ok=True)
    ids=read(CONTENT/'catalog.json')['product_ids']
    products={i:read(CONTENT/f'products/{i}.json') for i in ids}
    questions=read(CONTENT/'copy/en/product-faq.json')['questions']
    catalog=[]
    for pid,p in products.items():
        page=p['identity']['current_url'].lstrip('/');original=original_bytes(page).decode('utf-8').replace('\r\n', '\n')
        e=Editor(original);d=draft(p)
        (volufiline if pid=='volufiline-100' else standard)(e,p,d)
        faq(e,p,d,questions,products,pid=='volufiline-100')
        result=e.finish();changes=e.changes
        seo_title=read(CONTENT/'copy/en/product-display.json')[pid].get('seo_title')
        if seo_title:
            result=re.sub(r'<title>.*?</title>',lambda _:'<title>'+html.escape(seo_title)+'</title>',result,count=1,flags=re.S)
            result=re.sub(r'(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*',lambda m:m[1]+html.escape(seo_title,quote=True),result)
        result=re.sub(r'(<meta\s+(?:name="(?:description|twitter:description)"|property="og:description")\s+content=")[^"]*',lambda m:m[1]+html.escape(d['intro'],quote=True),result)
        result=local_only(result,'Draft')
        validate(original,result)
        (OUT/page).write_text(result,encoding='utf-8')
        (OUT/'before'/page).write_text(local_only(original,'Original'),encoding='utf-8')
        (OUT/'changes'/f'{pid}.json').write_text(json.dumps({'source':page,'source_sha256':hashlib.sha256(original_bytes(page)).hexdigest(),'status':'draft','changes':changes},ensure_ascii=False,indent=2),encoding='utf-8')
        catalog.append({'id':pid,'name':p['identity']['name']['value'],'url':'/'+page,'before':'/before/'+page,'subtitle':field(p,'format')+' · '+field(p,'size'),'image':'/'+p['media']['primary_image'].lstrip('/'),'tags':[pid,field(p,'format').lower(),field(p,'category').lower()], 'changed_areas':len(changes),'faq_count':len(Positions(result).root.find(cls='faq-item'))})
    (OUT/'catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
    # Keep the older single-product comparison synchronized with the same sources.
    pilot=ROOT/'preview/pdrn-serum';pilot.mkdir(exist_ok=True)
    pilot_page='product-pdrn-12-egf.html'
    for target,source in [(pilot_page,OUT/pilot_page),('before.html',OUT/'before'/pilot_page),('changes.json',OUT/'changes/pdrn-12-egf.json')]:
        (pilot/target).write_bytes(source.read_bytes())
    # A preview-only copy of the existing search runtime; production source stays intact.
    script=(ROOT/'assets/site.js').read_text(encoding='utf-8').split('/* ===== Partials inject ===== */',1)[1]
    start=script.index('const DEFAULT_CATALOG = [');end=script.index('\n];',start)+3
    script=script[:start]+'const DEFAULT_CATALOG = '+json.dumps(catalog,ensure_ascii=False)+';'+script[end:]
    (OUT/'site-preview.js').write_text(script,encoding='utf-8')
    print('PASS: 14 original-design product previews. Original CSS, images, section order and exact purchase links preserved.')
    print('FAQ entries:',sum(p['faq_count'] for p in catalog))


if __name__=='__main__':build()
