#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js} (una sola pagina).
Tokens: {{wa:mensaje}} -> link wa.me; {{img:nombre|alt|clase|eager}} -> <img srcset>; {{WAN}} -> numero.
Corre: python3 build.py   (idempotente)"""
import glob, os, re
from urllib.parse import quote
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
WA = ''  # PENDIENTE: poner 52XXXXXXXXXX cuando el dueno confirme su WhatsApp (ver PENDIENTES.md)
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'

def wa(m):
    return f'https://wa.me/{WA}?text=' + quote(m.group(1).strip(), safe='')

def img(m):
    p = (m.group(1).split('|') + ['', '', ''])[:4]
    name, alt, cls, eager = p
    files = sorted(glob.glob(f'img/{name}-*.webp'), key=lambda f: int(re.search(r'-(\d+)\.webp', f).group(1)))
    ws = [(int(re.search(r'-(\d+)\.webp', f).group(1)), f) for f in files]
    w, h = Image.open(ws[-1][1]).size
    ss = ', '.join(f'{f} {w_}w' for w_, f in ws)
    lz = '' if eager else ' loading="lazy"'
    return f'<img src="{ws[-1][1]}" srcset="{ss}" sizes="(min-width:900px) 50vw, 100vw" width="{w}" height="{h}" alt="{alt}" class="{cls}"{lz} decoding="async">'

html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))

out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
out = re.sub(r'\{\{wa:(.*?)\}\}', wa, out, flags=re.S)
out = re.sub(r'\{\{img:(.*?)\}\}', img, out)
out = out.replace('{{WAN}}', WA)
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')
tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
