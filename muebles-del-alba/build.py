#!/usr/bin/env python3
"""Arma index.html = template.html + sections/NN-*.html (en orden) + sus .css/.js.
Cada CSS/JS lleva ?v=<mtime> para romper la caché del celular.
research/ no entra: solo se leen template.html, site.* y sections/.
Corre: python3 build.py   (idempotente)

Orden de las 7 secciones de la HOJA-DIRECCION.md (turno 1 = FUNDACION, ya hechas):
  10-hero.*      hecho (turno 1)
  20-catalogo.*  HUECO -> lo hace el turno 2 (catalogo a la vista + interruptor de acabado)
  30-amanece.*   hecho (turno 1, momento firma)
  40-paquetes.*  HUECO -> lo hace el turno 2 (arma tu casa + "Mi casa")
  50-resenas.*   HUECO -> lo hace el turno 2 ("Lo pidio un lunes": citas reales + promesas)
  60-exhibicion.* HUECO -> lo hace el turno 2 (mapa, horario, agendar visita)
  70-cierre.*    hecho (turno 1, banda de logo + Todo listo para completar)
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
print('index.html armado con', len(html), 'secciones')
