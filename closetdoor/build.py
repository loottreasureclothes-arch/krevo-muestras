#!/usr/bin/env python3
"""Arma las páginas con el mismo template.html (header, footer, botón flotante):
  index.html      = template + sections/NN-*.html (en orden) + sus .css/.js
  materiales.html = template + sections-materiales/NN-*.html + sus .css/.js
Corre: python3 build.py   (idempotente; cualquier agente puede correrlo)"""
import glob,os,re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T=open('template.html').read()

def assemble(t,folder):
    html=sorted(glob.glob(f'{folder}/*.html'))
    body=''.join(open(f).read().rstrip('\n')+'\n\n' for f in html)
    V=lambda f:f'{f}?v={int(os.path.getmtime(f))}'  # rompe la caché del celular en cada cambio
    css=''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob(f'{folder}/*.css')))
    js=''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob(f'{folder}/*.js')))
    out=t.replace('<!--SECTIONS-->\n',body).replace('<!--SECTION_CSS-->',css.rstrip('\n')).replace('<!--SECTION_JS-->',js.rstrip('\n'))
    return out,len(html)

def bust(out):
    for f in ['site.css','site.js','../_kit/kit.css','../_kit/kit.js','../_kit/antesdespues.css','../_kit/antesdespues.js']:
        if os.path.exists(f): out=out.replace(f'"{f}"',f'"{f}?v={int(os.path.getmtime(f))}"')
    return out

def write(name,out):
    out=bust(out)
    tmp=name+'.tmp'; open(tmp,'w').write(out); os.replace(tmp,name)

# 1) index.html (igual que siempre)
out,n=assemble(T,'sections')
write('index.html',out)
print('index.html armado con',n,'secciones')

# 2) materiales.html: mismo template; los links "#ancla" del header/footer/menú
#    apuntan a index.html#ancla (se reescribe SOLO el template, antes de meter secciones)
if glob.glob('sections-materiales/*.html'):
    t=T
    # salto de accesibilidad -> al catálogo de esta página
    t=re.sub(r'(<a class="cd-skip" href=")#[\w-]+(")',r'\1#mat-catalogo\2',t)
    # <a ... href="#x"> -> index.html#x  (no toca <use href="#i-...">, ni aria-controls)
    t=re.sub(r'(<a\b[^>]*?\shref=")#(?!mat-catalogo")([\w-]*)(")',lambda m:f'{m.group(1)}index.html#{m.group(2) or "top"}{m.group(3)}',t)
    # rutas propias de la página
    base='https://loottreasureclothes-arch.github.io/krevo-muestras/closetdoor/'
    t=re.sub(r'<title>.*?</title>','<title>Materiales y acabados · Closet&amp;Door</title>',t,count=1,flags=re.S)
    t=re.sub(r'(<meta name="description" content=")[^"]*(")',r'\1Catálogo de materiales Closet&amp;Door: nogal, gris, negro mate, cubiertas, jaladeras y LED. Velos en grande, elige los que te gustan y cotiza por WhatsApp.\2',t,count=1)
    t=t.replace(f'<link rel="canonical" href="{base}">',f'<link rel="canonical" href="{base}materiales.html">')
    t=t.replace(f'<meta property="og:url" content="{base}">',f'<meta property="og:url" content="{base}materiales.html">')
    t=re.sub(r'(<meta property="og:title" content=")[^"]*(")',r'\1Materiales · Closet&amp;Door\2',t,count=1)
    # el precarga de la foto del hero no aplica aquí
    t=re.sub(r'<link rel="preload" as="image" href="img/hero/[^>]*>\n','',t)
    t=t.replace('<body data-hero-dark>','<body data-hero-dark data-page="materiales">')
    out,n=assemble(t,'sections-materiales')
    write('materiales.html',out)
    print('materiales.html armado con',n,'secciones')
