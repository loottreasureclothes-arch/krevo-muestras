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

import urllib.parse
WA = '524499181146'  # PENDIENTE: telefono Maps (Americas), sin WhatsApp publicado
MSG = {
 'WA1': 'Hola Mariscos Los Cabos, vi su página y quiero hacer un pedido.',
 'WA2': 'Hola Mariscos Los Cabos, vi su página. ¿Me pasan el menú con precios?',
 'WA3': 'Hola Mariscos Los Cabos, vi su página. Quiero una torre. ¿Cuánto sale y en qué sucursal la recojo?',
 'WA4': 'Hola Mariscos Los Cabos, vi su página. ¿Tienen mesa hoy en la sucursal Las Flores?',
 'WA5': 'Hola Mariscos Los Cabos, vi su página. Quiero apartar mesa en la terraza. ¿Tienen lugar hoy?',
 'WA6': 'Hola Mariscos Los Cabos, vi su página. ¿Tienen mesa hoy en la sucursal Villa Asunción?',
}
for k, m in MSG.items():
    out = out.replace('%%' + k + '%%', 'https://wa.me/' + WA + '?text=' + urllib.parse.quote(m, safe=''))
    out = out.replace('%%' + k + '_RAW%%', m)

tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
