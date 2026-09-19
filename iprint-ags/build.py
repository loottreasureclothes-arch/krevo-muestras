#!/usr/bin/env python3
"""Arma las páginas con el mismo template.html (header, footer, botón flotante):
  index.html    = template + sections/NN-*.html (en orden) + sus .css/.js
  comparar.html = template + sections-comparar/NN-*.html + sus .css/.js (antes/después de la web)
Corre: python3 build.py   (idempotente)"""
import glob,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T=open('template.html').read()
BASE='https://loottreasureclothes-arch.github.io/krevo-muestras/iprint-ags/'

def assemble(t,folder):
    html=sorted(glob.glob(f'{folder}/*.html'))
    body=''.join(open(f).read().rstrip('\n')+'\n\n' for f in html)
    V=lambda f:f'{f}?v={int(os.path.getmtime(f))}'  # rompe la caché del celular en cada cambio
    css=''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob(f'{folder}/*.css')))
    js=''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob(f'{folder}/*.js')))
    out=t.replace('<!--SECTIONS-->\n',body).replace('<!--SECTION_CSS-->',css.rstrip('\n')).replace('<!--SECTION_JS-->',js.rstrip('\n'))
    return out,len(html)

def bust(out):
    for f in ['site.css','site.js','../_kit/kit.css','../_kit/kit.js']:
        if os.path.exists(f): out=out.replace(f'"{f}"',f'"{f}?v={int(os.path.getmtime(f))}"')
    return out

def write(name,out):
    out=bust(out)
    tmp=name+'.tmp'; open(tmp,'w').write(out); os.replace(tmp,name)

out,n=assemble(T,'sections')
write('index.html',out)
print('index.html armado con',n,'secciones')

if glob.glob('sections-comparar/*.html'):
    t=T
    t=re.sub(r'(<a class="cd-skip" href=")#[\w-]+(")',r'\1#comparar\2',t)
    # links "#x" del template -> index.html#x (no toca <use href="#i-...">)
    t=re.sub(r'(<a\b[^>]*?\shref=")#([\w-]*)(")',lambda m:f'{m.group(1)}index.html#{m.group(2) or "top"}{m.group(3)}',t)
    t=re.sub(r'<title>.*?</title>','<title>Antes y después de su página | iPrint Aguascalientes</title>',t,count=1,flags=re.S)
    t=re.sub(r'(<meta name="description" content=")[^"]*(")',r'\1Comparativo de la página actual de iPrint Aguascalientes contra la nueva muestra de KREVO: WhatsApp, catálogo, cotizador y Google.\2',t,count=1)
    t=t.replace(f'<link rel="canonical" href="{BASE}">',f'<link rel="canonical" href="{BASE}comparar.html">')
    t=t.replace(f'<meta property="og:url" content="{BASE}">',f'<meta property="og:url" content="{BASE}comparar.html">')
    t=re.sub(r'<link rel="preload" as="image" href="img/hero/[^>]*>\n','',t)
    t=re.sub(r'<script type="application/ld\+json">.*?</script>\n','',t,count=1,flags=re.S)
    t=t.replace('<meta name="format-detection" content="telephone=no">','<meta name="format-detection" content="telephone=no">\n<meta name="robots" content="noindex">')
    t=t.replace('<body data-hero-dark>','<body data-hero-dark data-page="comparar">')
    out,n=assemble(t,'sections-comparar')
    write('comparar.html',out)
    print('comparar.html armado con',n,'secciones')
