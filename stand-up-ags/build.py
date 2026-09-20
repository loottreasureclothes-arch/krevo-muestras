#!/usr/bin/env python3
"""Arma index.html con template.html (header, menu, footer, boton flotante) +
sections/NN-*.html en orden, cada uno con su .css/.js.
Corre: python3 build.py   (idempotente)

FUNDACION (turno 1, 20 sep 2026) ya puso:
  sections/01-hero.*   -> Hero "Te lo entregamos de pie"
  sections/03-firma.*  -> Momento firma "Del plano al 3D" (planta que se levanta)

PENDIENTE turno 2 (huecos marcados, en este orden dentro de sections/):
  sections/02-catalogo.*  -> "Las 15 medidas que arman" (rejilla de plantas SVG
                              + chips + hoja de cotizacion). Usa SU.plantaHTML()
                              de site.js, el mismo generador del momento firma.
  sections/04-ebesa.*     -> "Quien abrio con nosotros" (pase de lista + 3 fotos
                              chicas ya procesadas en img/hd/su02..su04-*.webp +
                              resenas reales de research/resenas.md)
  sections/05-fecha.*     -> "Tu feria tiene fecha" (3 campos + 1 boton verde a
                              WhatsApp con IP.openWa equivalente = SU.openWa)
  sections/06-visitanos.* -> Visitanos + "Todo listo para completar" (PENDIENTE-DUENO.md)
No toques template.html, site.css ni site.js salvo para AGREGAR (no borrar) lo
que tu seccion necesite; el header, menu, footer y el generador de plantas ya
estan resueltos aqui."""
import glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()

def assemble(t, folder):
    html = sorted(glob.glob(f'{folder}/*.html'))
    body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
    V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'  # rompe la cache del celular en cada cambio
    css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob(f'{folder}/*.css')))
    js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob(f'{folder}/*.js')))
    out = t.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
    return out, len(html)

def bust(out):
    for f in ['site.css', 'site.js', '../_kit/kit.css', '../_kit/kit.js']:
        if os.path.exists(f):
            out = out.replace(f'"{f}"', f'"{f}?v={int(os.path.getmtime(f))}"')
    return out

def write(name, out):
    out = bust(out)
    tmp = name + '.tmp'
    open(tmp, 'w').write(out)
    os.replace(tmp, name)

out, n = assemble(T, 'sections')
write('index.html', out)
print('index.html armado con', n, 'secciones')
