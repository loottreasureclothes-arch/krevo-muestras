#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js} (una sola pagina).
Corre: python3 build.py   (idempotente)"""
import glob, os, urllib.parse
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

WA = '524494991972'
def wa(t): return f'https://wa.me/{WA}?text=' + urllib.parse.quote(t, safe='')
TOK = {
 '{{WA_PEDIR}}': wa('Hola Mariscos El Pescadito, quiero hacer un pedido. ¿Qué me recomiendan hoy?'),
 '{{WA_VISITA}}': wa('Hola Mariscos El Pescadito, ¿a qué hora cierran hoy?'),
 '{{WA_PAGINA}}': wa('Hola Mariscos El Pescadito, vi su página y tengo una pregunta.'),
}
for k, v in TOK.items(): out = out.replace(k, v)

tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
