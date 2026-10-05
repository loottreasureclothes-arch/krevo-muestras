#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js} (una sola pagina).
Corre: python3 build.py   (idempotente)"""
import glob, os, re
from PIL import Image
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'  # rompe la cache del celular en cada cambio


def imgs(h):
    """<img data-i="nombre" ...> -> src/srcset/width/height desde img/nombre-*.webp"""
    def rep(m):
        n = m.group(1)
        fs = sorted(glob.glob(f'img/{n}-*.webp'), key=lambda f: int(f.rsplit('-', 1)[1].split('.')[0]))
        ws = [int(f.rsplit('-', 1)[1].split('.')[0]) for f in fs]
        w0, h0 = Image.open(fs[-1]).size
        mid = fs[min(1, len(fs) - 1)]
        ss = ', '.join(f'{f} {w}w' for f, w in zip(fs, ws))
        return f'<img srcset="{ss}" src="{mid}" width="{w0}" height="{h0}" decoding="async"'
    return re.sub(r'<img data-i="([a-z0-9]+)"', rep, h)

html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))

T = imgs(T)
body = imgs(body)
out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')

tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
