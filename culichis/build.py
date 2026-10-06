#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js} (una sola pagina).
Corre: python3 build.py   (idempotente)"""
import glob, os, re
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'  # rompe la cache del celular en cada cambio

html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))

def IMG(m):
    name,alt,sizes,cls,*ex=(m.group(1).split('|')+['','','',''])[:5]
    fs=sorted(glob.glob(f'img/{name}-*.webp'),key=lambda f:int(f.split('-')[-1][:-5]))
    ws=[int(f.split('-')[-1][:-5]) for f in fs]
    im=Image.open(fs[-1]); w,h=im.size
    ss=', '.join(f'{f} {x}w' for f,x in zip(fs,ws))
    extra=ex[0] if ex else ''
    return f'<img src="{fs[-1]}" srcset="{ss}" sizes="{sizes or "100vw"}" width="{w}" height="{h}" alt="{alt}" class="{cls}" {extra}>'
from urllib.parse import quote
body=re.sub(r'\{\{WA:([^}]*)\}\}',lambda m:'https://wa.me/5214491967475?text='+quote(m.group(1),safe='')+'" data-wa="'+m.group(1).replace('"','&quot;'),body)
body=re.sub(r'\{\{IMG:([^}]*)\}\}',IMG,body)
out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')

tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
