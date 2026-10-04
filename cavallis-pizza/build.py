#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js}. Corre: python3 build.py (idempotente).
Reemplaza {{wa:texto}} por el href real de wa.me (ya codificado) y {{WA}} por el numero."""
import glob, os, re
from urllib.parse import quote
os.chdir(os.path.dirname(os.path.abspath(__file__)))
WA = '524499134949'  # Maps: 449 913 4949 (sin confirmar que sea WhatsApp; ver PENDIENTES.md)
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'

html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
out = re.sub(r'\{\{wa:(.*?)\}\}', lambda m: f'https://wa.me/{WA}?text=' + quote(m.group(1), safe=''), out)
out = out.replace('{{WA}}', WA)
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')
open('index.html.tmp', 'w').write(out)
os.replace('index.html.tmp', 'index.html')
print('index.html armado con', len(html), 'secciones')
