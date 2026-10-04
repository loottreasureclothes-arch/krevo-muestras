#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js} (una sola pagina).
Corre: python3 build.py   (idempotente)"""
import glob, os, re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'  # rompe la cache del celular en cada cambio

def pic(m):
    name, alt, sizes, cls, prio = (m.group(1).split('|') + ['', '', '', ''])[:5]
    ws = sorted(int(re.search(r'-(\d+)\.webp$', f).group(1)) for f in glob.glob(f'img/{name}-*.webp'))
    ss = ', '.join(f'img/{name}-{w}.webp {w}w' for w in ws)
    from PIL import Image
    w0, h0 = Image.open(f'img/{name}-{ws[-1]}.webp').size
    ld = '' if prio == 'eager' else ' loading="lazy"'
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="img/{name}-{ws[min(1,len(ws)-1)]}.webp" srcset="{ss}" sizes="{sizes or "100vw"}" width="{w0}" height="{h0}" alt="{alt}"{ld} decoding="async">'
html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
body = re.sub(r'\{\{pic:([^}]*)\}\}', pic, body)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))

out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')

tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
