#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.html (+ .css/.js). Idempotente.

Huecos para el turno 2 (NO los llena el turno 1): 20-carta (catalogo/menu a la
vista), la hoja del carrito/pedido (vive en <body>, no es una seccion NN) y
60-porton (el componente firma del portón/horario/visitanos). Turno 1 solo
puso 10-hero, 30-firma y 90-cierre.
"""
import glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'
t = open('template.html').read()
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in sorted(glob.glob('sections/*.html')))
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out = t.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js', 'carrito.css', 'carrito.js', '../_kit/kit.css', '../_kit/kit.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')
open('index.html.tmp', 'w').write(out)
os.replace('index.html.tmp', 'index.html')
print('index.html armado con', len(glob.glob('sections/*.html')), 'secciones (turno 1: 10,30,90 · faltan 20 y 60 del turno 2)')
