#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js} (una sola pagina).
Corre: python3 build.py   (idempotente)"""
import glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'  # rompe la cache del celular en cada cambio

html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))

out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')

import re
from PIL import Image
def IMG(m):
    key,alt,cls,sizes,eager=(m.group(1).split('|')+['','','',''])[:5]
    ws=sorted(int(re.search(r'-(\d+)\.webp',f).group(1)) for f in glob.glob(f'img/{key}-*.webp'))
    src=f'img/{key}-{ws[-1]}.webp'
    w,h=Image.open(src).size
    ss=', '.join(f'img/{key}-{x}.webp {x}w' for x in ws)
    return f'<img src="{src}" srcset="{ss}" sizes="{sizes or "100vw"}" width="{w}" height="{h}" alt="{alt}"' + (f' class="{cls}"' if cls else '') + (' fetchpriority="high"' if eager=='eager' else ' loading="lazy" decoding="async"') + '>'
from urllib.parse import quote
out = re.sub(r'href="wa:([^"]*)"', lambda m: 'href="https://wa.me/524492570789?text='+quote(m.group(1).replace('&amp;','&'),safe='')+'"', out)
out = re.sub(r'\[\[([^\]]+)\]\]', IMG, out)
tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
