#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.html (+ .css/.js). Idempotente.

Orden de secciones de la hoja (HOJA-DIRECCION.md #6): 1 hero, 2 la carta, 3 momento firma,
4 el pan, 5 grupos, 6 resenas+visitanos, 7 todo listo+pie.
Turno 1 (FUNDACION) ya puso: 10-hero, 30-momento, 90-cierre (el "todo listo"; el pie va en
template.html). HUECOS para el turno 2 (catalogo/pedido/visitanos): la carta debe quedar
ANTES de 30-momento (usar un numero entre 10 y 30, p. ej. 20-carta) y el pan/grupos/resenas
DESPUES de 30-momento y antes de 90-cierre (p. ej. 40-pan, 50-grupos, 60-resenas). Quedaron
sueltos de una sesion pausada: sections/40-menu.css/.js (sin .html, no se cargan solos en el
index) y sections/41-pedido.html/.css/.js (el carrito/hoja de pedido, aun no enganchado a
ningun boton) -- revisalos y usalos solo si le sirven a esa hoja; si no, bórralos.
"""
import glob,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
V=lambda f:f'{f}?v={int(os.path.getmtime(f))}'
t=open('template.html').read()
body=''.join(open(f).read().rstrip('\n')+'\n\n' for f in sorted(glob.glob('sections/*.html')))
css=''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js=''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out=t.replace('<!--SECTIONS-->\n',body).replace('<!--SECTION_CSS-->',css.rstrip('\n')).replace('<!--SECTION_JS-->',js.rstrip('\n'))
for f in ['site.css','site.js','../_kit/kit.css','../_kit/kit.js','../_kit/menu.css','../_kit/menu.js']:
    if os.path.exists(f): out=out.replace(f'"{f}"',f'"{V(f)}"')
open('index.html.tmp','w').write(out); os.replace('index.html.tmp','index.html')
print('index.html armado con',len(glob.glob('sections/*.html')),'secciones')
