#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.html (+ .css/.js). Idempotente.

TURNO 1 (FUNDACION, hecho): 10-hero (hero + Beat A/B del momento firma), 70-cierre.
TURNO 2 (PENDIENTE, huecos marcados — crear estos archivos en sections/ con este mismo numero):
  20-aparador.{html,css,js}   EL APARADOR: catalogo a la vista (Carteras y mochilas / Calzado / Ropa)
                              + el componente firma "Los tres aparadores" (HOJA-DIRECCION.md §4) +
                              Beat C del momento firma (HOJA §3) al entrar esta seccion.
  30-pago.{html,css}          COMO SE PAGA: apartado 2 meses, MSI, envios. id="pago"
  40-resenas.{html,css}       LAS RESEÑAS REALES (research/resenas.md). id="resenas"
  50-nombres.{html,css,js}    DOS NOMBRES, DOS LOCALES: la division Olux/secret mode. id="nombres"
  60-completar.{html,css}     TODO LISTO PARA COMPLETAR (banda --paper). id="completar"
Los huecos ya estan en el menu del header (template.html) apuntando a #aparador #pago #resenas
#nombres #completar. Alto total en celular, tope 9,000 px (HOJA-DIRECCION.md §6)."""
import glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'
t = open('template.html').read()
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in sorted(glob.glob('sections/*.html')))
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out = t.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js', '../_kit/kit.css', '../_kit/kit.js']:
    if os.path.exists(f): out = out.replace(f'"{f}"', f'"{V(f)}"')
open('index.html.tmp', 'w').write(out); os.replace('index.html.tmp', 'index.html')
print('index.html armado con', len(glob.glob('sections/*.html')), 'secciones (10-hero, 70-cierre; faltan 20/30/40/50/60 del turno 2)')
