#!/usr/bin/env python3
"""Genera el SVG estático del goniómetro (escala 0 a 10) y lo mete entre <!--DIAL--> y <!--/DIAL--> de sections/30-cita.html"""
import math, os, re
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..')
CX, CY = 180, 196
def pt(r, deg):  # deg medido desde el brazo fijo (izquierda) pasando por arriba
    phi = math.radians(180 - deg)
    return CX + r * math.cos(phi), CY - r * math.sin(phi)
o = []
o.append('<svg class="gon" id="gon" viewBox="0 26 360 206" aria-hidden="true" focusable="false">')
o.append('<path class="gon-body" d="M16 196 A164 164 0 0 1 344 196 L344 216 Q344 226 334 226 L26 226 Q16 226 16 216 Z"/>')
o.append('<path class="gon-ring" d="M76 196 A104 104 0 0 1 284 196"/>')
# marcas
for k in range(0, 101):
    deg = k * 1.8
    if k % 10 == 0: r0, cls = 148, 'tk-a'
    elif k % 5 == 0: r0, cls = 153, 'tk-b'
    else: r0, cls = 157, 'tk-c'
    x0, y0 = pt(r0, deg); x1, y1 = pt(161, deg)
    o.append(f'<path class="{cls}" d="M{x0:.1f} {y0:.1f}L{x1:.1f} {y1:.1f}"/>')
o.append('<path id="gon-sector" class="gon-sector" d="M180 196Z"/>')
# brazo fijo
o.append('<g class="gon-fixed"><rect x="74" y="192.5" width="106" height="7" rx="3.5"/></g>')
# numeros
for i in range(11):
    x, y = pt(133, i * 18)
    o.append(f'<g class="nm" data-v="{i}"><circle cx="{x:.1f}" cy="{y:.1f}" r="14"/><text x="{x:.1f}" y="{y+0.5:.1f}">{i}</text></g>')
# brazo movil
o.append('<g class="gon-hint"><path class="h-arc" d="M107.2 143.1A90 90 0 0 1 143.4 113.8"/><path class="h-head" d="M148.6 111.6L136.8 110.4L141.2 121.0Z"/></g>')
o.append('<g id="gon-arm" class="gon-arm" transform="rotate(22 180 196)"><rect x="74" y="192.5" width="106" height="7" rx="3.5"/><path class="arm-line" d="M96 196H170"/><g class="grip"><circle cx="90" cy="196" r="16"/><path d="M84 190V202M90 188V204M96 190V202"/></g></g>')
o.append('<g class="gon-pivot"><circle cx="180" cy="196" r="11"/><path d="M174 196H186"/></g>')
o.append('</svg>')
svg = ''.join(o)
f = 'sections/30-cita.html'
h = open(f).read()
h = re.sub(r'<!--DIAL-->.*?<!--/DIAL-->', lambda m: '<!--DIAL-->' + svg + '<!--/DIAL-->', h, flags=re.S)
open(f, 'w').write(h)
print('dial ok', len(svg))
