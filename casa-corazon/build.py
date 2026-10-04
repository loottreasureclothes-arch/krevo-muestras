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
def _ss(m):
    n=m.group(1)
    ws=sorted(int(re.search(r'-(\d+)\.webp',f).group(1)) for f in glob.glob(f'img/{n}-*.webp'))
    return ', '.join(f'img/{n}-{w}.webp {w}w' for w in ws)
def _src(m):
    n=m.group(1); ws=sorted(int(re.search(r'-(\d+)\.webp',f).group(1)) for f in glob.glob(f'img/{n}-*.webp'))
    return f'img/{n}-{ws[-1]}.webp'
out = re.sub(r'\{\{srcset:([a-z0-9]+)\}\}', _ss, out)
out = re.sub(r'\{\{src:([a-z0-9]+)\}\}', _src, out)
from urllib.parse import quote
out = re.sub(r'\{\{wa:([^}]*)\}\}', lambda m: 'https://wa.me/524492056026?text='+quote(m.group(1)), out)
tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
