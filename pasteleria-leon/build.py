#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.html (+ .css/.js). Idempotente.

NUNCA se edita index.html a mano. Cada CSS/JS sale con ?v=<mtime> para que el celular
no se quede con la version vieja. menu.html es una pagina aparte, escrita a mano, que
comparte header, pie, carrito y site.css/site.js (a esa si se le pone ?v= aqui tambien).
"""
import glob, os, re

os.chdir(os.path.dirname(os.path.abspath(__file__)))
V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'

t = open('template.html').read()
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in sorted(glob.glob('sections/*.html')))
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))

out = t.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))

SHARED = ['site.css', 'site.js', 'menu.css', '../_kit/kit.css', '../_kit/kit.js',
          'sections/20-catalogo.css', 'sections/20-catalogo.js', 'sections/30-tufoto.css', 'sections/30-tufoto.js']
def bust(html):
    for f in SHARED:
        if os.path.exists(f):
            html = re.sub(r'"' + re.escape(f) + r'(\?v=\d+)?"', '"' + V(f) + '"', html)
    return html

open('index.html.tmp', 'w').write(bust(out))
os.replace('index.html.tmp', 'index.html')
print('index.html armado con', len(glob.glob('sections/*.html')), 'secciones')

if os.path.exists('menu.src.html'):
    open('menu.html.tmp', 'w').write(bust(open('menu.src.html').read()))
    os.replace('menu.html.tmp', 'menu.html')
    print('menu.html armado desde menu.src.html')
