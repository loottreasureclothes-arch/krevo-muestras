#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js}.
Tokens en las secciones: {{img:nombre|alt|clase|sizes|eager}}  {{wa:plaza|mensaje}}
Corre: python3 build.py   (idempotente)"""
import glob, os, re, urllib.parse
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
WA = {'plaza': '524499790707', 'meridian': '524496880101'}
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'

def img(m):
    parts = m.group(1).split('|') + [''] * 5
    name, alt, cls, sizes, eager = parts[:5]
    ws = sorted(int(re.search(r'-(\d+)\.webp$', f).group(1)) for f in glob.glob(f'img/{name}-*.webp'))
    if not ws: raise SystemExit('falta img ' + name)
    big = Image.open(f'img/{name}-{ws[-1]}.webp'); W, H = big.size
    srcset = ', '.join(f'img/{name}-{w}.webp {w}w' for w in ws)
    src = f'img/{name}-{min(ws, key=lambda w: abs(w-960))}.webp'
    h = round(H * ws[-1] / W)
    lazy = '' if eager else ' loading="lazy"'
    pri = ' fetchpriority="high"' if eager else ''
    return (f'<img src="{src}" srcset="{srcset}" sizes="{sizes or "100vw"}" width="{ws[-1]}" height="{h}" '
            f'alt="{alt}" class="{cls}" decoding="async"{lazy}{pri}>')

def wa(m):
    k, msg = m.group(1).split('|', 1)
    return f'https://wa.me/{WA[k]}?text=' + urllib.parse.quote(msg, safe='')

html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
out = re.sub(r'\{\{img:([^}]*)\}\}', img, out)
out = re.sub(r'\{\{wa:([^}]*)\}\}', wa, out)
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')
open('index.html.tmp', 'w').write(out)
os.replace('index.html.tmp', 'index.html')
print('index.html armado con', len(html), 'secciones')
