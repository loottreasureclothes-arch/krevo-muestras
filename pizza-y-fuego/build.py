#!/usr/bin/env python3
"""Arma las páginas desde template.html:
  index.html = template + sections/*.html (todas, en orden) + sus .css/.js
  menu.html  = template + sections/20-menu.* + sections/21-pedido.* (la carta completa y el pedido,
               como página propia con el mismo header y botón de regreso: FEEDBACK-1 20 sep 2026
               y NOTA GLOBAL "Carta/Menú abre su propia página, no un ancla").
El template trae 3 placeholders que cada página resuelve distinto:
  {{MENU}} = ir a "la carta completa" (nav Menú, Pedir, hamburguesa)   -> menu.html en index / #menu en menu.html
  {{CAT}}  = ir a una categoría del menú (subcategorías del hamburguesa) -> menu.html# en index / # en menu.html
  {{HOME}} = ir a una sección que solo vive en index (logo, Visítanos, Reunión, Nosotros) -> '' en index / index.html en menu.html
Corre: python3 build.py (idempotente; cualquier agente puede correrlo)."""
import glob, os, re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()
BASE = 'https://loottreasureclothes-arch.github.io/krevo-muestras/pizza-y-fuego/'
V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'


def assemble(t, files_html, files_css, files_js):
    body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in files_html)
    css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in files_css)
    js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in files_js)
    out = t.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
    return out, len(files_html)


def bust(out):
    for f in ['site.css', 'site.js', '../_kit/kit.css', '../_kit/kit.js']:
        if os.path.exists(f):
            out = out.replace(f'"{f}"', f'"{V(f)}"')
    return out


def write(name, out):
    out = bust(out)
    tmp = name + '.tmp'
    open(tmp, 'w').write(out)
    os.replace(tmp, name)


# 1) index.html: todas las secciones (sin el menú completo, que vive en su propia página).
t_index = T.replace('{{MENU}}', 'menu.html').replace('{{CAT}}', 'menu.html#').replace('{{HOME}}', '')
html = sorted(glob.glob('sections/*.html'))
css = sorted(glob.glob('sections/*.css'))
js = sorted(glob.glob('sections/*.js'))
out, n = assemble(t_index, html, css, js)
write('index.html', out)
print('index.html armado con', n, 'secciones')

# 2) menu.html: solo la carta (20-menu) + el pedido (21-pedido), mismo header/colores, botón de regreso claro.
menu_files = ['sections/20-menu.html', 'sections/21-pedido.html']
if all(os.path.exists(f) for f in menu_files):
    t = T.replace('{{MENU}}', '#menu').replace('{{CAT}}', '#').replace('{{HOME}}', 'index.html')
    t = re.sub(r'<title>.*?</title>', '<title>Menú y pedido | Pizza y Fuego</title>', t, count=1, flags=re.S)
    t = re.sub(
        r'(<meta name="description" content=")[^"]*(")',
        r'\1La carta completa de Pizza y Fuego: pizzas a la leña, pastas, entradas y bebidas. Arma tu pedido y mándalo directo por WhatsApp.\2',
        t, count=1,
    )
    t = t.replace(f'<link rel="canonical" href="{BASE}">', f'<link rel="canonical" href="{BASE}menu.html">')
    t = t.replace(f'<meta property="og:url" content="{BASE}">', f'<meta property="og:url" content="{BASE}menu.html">')
    t = re.sub(r'(<meta property="og:title" content=")[^"]*(")', r'\1Menú · Pizza y Fuego\2', t, count=1)
    t = re.sub(r'(<meta name="twitter:title" content=")[^"]*(")', r'\1Menú · Pizza y Fuego\2', t, count=1)
    # el precarga del hero no aplica aquí (menu.html no tiene hero)
    t = re.sub(r'<link rel="preload" as="image" href="img/hero/[^\n]*>\n', '', t)
    t = t.replace('<body data-hero-dark>', '<body data-page="menu">')
    # botón de regreso claro, arriba de la carta
    t = t.replace(
        '<main id="inicio">\n<!--SECTIONS-->',
        '<main id="inicio">\n<div class="k-wrap pf-back-wrap"><a class="pf-back" href="index.html"><svg aria-hidden="true"><use href="#i-arrow"/></svg>Regresar a Pizza y Fuego</a></div>\n<!--SECTIONS-->',
    )
    css2 = ['sections/20-menu.css', 'sections/21-pedido.css']
    js2 = ['sections/20-menu.js', 'sections/21-pedido.js']
    out, n = assemble(t, menu_files, css2, js2)
    write('menu.html', out)
    print('menu.html armado con', n, 'secciones')
