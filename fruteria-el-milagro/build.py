#!/usr/bin/env python3
"""Arma index.html = template.html + sections/NN-*.html (en orden) + sus .css/.js.
Cada CSS/JS lleva ?v=<mtime> para romper la caché del celular.
research/ no entra: solo se leen template.html, site.* y sections/.
Corre: python3 build.py   (idempotente)

Orden de las 6 secciones de la HOJA-DIRECCION.md (turno 1 = FUNDACION, ya hechas):
  10-hero.*     hecho (turno 1): hero + momento firma "El logo baja al toldo"
  20-catalogo.* HUECO -> lo hace el turno 2 (Seccion 2 "Los paquetes": catalogo a la
                 vista + el pizarron de la banqueta como carrito; API en site.js:
                 FEM.pizarron.add({id,name,price}); CADA renglon debe traer ademas su
                 propio <a href="https://wa.me/524492151585?text=...">Pedir por
                 WhatsApp</a> con el nombre del paquete, por si el JS no corre)
  30-pedido.*   HUECO -> lo hace el turno 2 (Seccion 3 "Pídelo y te llega": banda crema
                 de lectura, horario, el UNICO boton verde "PEDIR POR WHATSAPP" fuera
                 del pizarron)
  40-tienda.*   HUECO -> lo hace el turno 2 (Seccion 4 "Así está la tienda hoy":
                 interior en marco + 3 reseñas reales de resenas.md)
  50-visitanos.* HUECO -> lo hace el turno 2 (Seccion 5 "Tecuexe 201, Local 2":
                 direccion grande, los 2 WhatsApp, boton "CÓMO LLEGAR" a Maps)
  60-cierre.*   hecho (turno 1): logo al 76% + "Todo listo para completar"
No se toca index.html a mano: solo se edita sections/ y este build.py arma el resto."""
import glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()
V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'
html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js', '../_kit/kit.css', '../_kit/kit.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')
tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones:', ', '.join(os.path.basename(f) for f in html))
