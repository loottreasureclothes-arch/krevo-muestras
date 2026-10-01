#!/usr/bin/env python3
"""Genera la huella (retícula de puntos con presión) y la mete entre <!--FOOT--> y <!--/FOOT--> de sections/40-pisada.html.
Pie derecho visto desde arriba: dedo gordo arriba a la izquierda, arco a la izquierda, borde externo a la derecha.
Cada punto trae data-t = milisegundo en que aparece: umbral de presión que baja dentro de cada ventana (talon, metatarsos, apoyo lateral, dedos)."""
import math, os, re
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/..')
# (region, cx, cy, rx, ry, rot)
SH = [
 ('h', 158, 370, 56, 62, -6),
 ('l', 192, 258, 31, 96, 10),
 ('b', 142, 176, 82, 45, -8),
 ('t', 88, 96, 26, 34, -12),
 ('t', 134, 66, 15, 22, -4),
 ('t', 164, 72, 13.5, 19, 0),
 ('t', 191, 86, 12, 16, 6),
 ('t', 214, 107, 10, 13, 12),
]
WIN = {'h': (0.00, 0.35), 'b': (0.20, 0.60), 'l': (0.45, 0.80), 't': (0.65, 1.00)}
TOTAL = 1080  # ms, el ultimo punto empieza aqui y dura 120 ms: todo queda en 1.2 s
STEP = 6.2
def pressure(x, y):
    """Union suave entre talon, apoyo lateral y metatarsos (la tinta se corre de uno a otro como en una pisada real); los dedos van sueltos."""
    best, reg, soft = 0.0, None, 0.0
    for r, cx, cy, rx, ry, rot in SH:
        a = math.radians(rot)
        dx, dy = x - cx, y - cy
        u = dx * math.cos(a) + dy * math.sin(a)
        v = -dx * math.sin(a) + dy * math.cos(a)
        d2 = (u / rx) ** 2 + (v / ry) ** 2
        p = 1 - d2
        if p > best: best, reg = p, r
        if r != 't': soft += math.exp(7 * p)
    if reg != 't' and soft > 0:
        best = max(best, math.log(soft) / 7 - 0.12)
    return best, reg
dots = []
y = 8.0
row = 0
while y < 432:
    x = 8.0 + (STEP / 2 if row % 2 else 0)
    while x < 292:
        p, reg = pressure(x, y)
        if p > 0.07:
            rr = 0.7 + 2.3 * (p ** 0.62)
            s, e = WIN[reg]
            t = int((s + (1 - min(1, p)) * (e - s)) * TOTAL)
            dots.append((x, y, rr, t))
        x += STEP
    y += STEP * 0.866
    row += 1
out = ['<g class="dots">']
for x, y, r, t in dots:
    out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.2f}" data-t="{t}"/>')
out.append('</g>')
svg = ''.join(out)
f = 'sections/40-pisada.html'
h = open(f).read()
h = re.sub(r'<!--FOOT-->.*?<!--/FOOT-->', lambda m: '<!--FOOT-->' + svg + '<!--/FOOT-->', h, flags=re.S)
open(f, 'w').write(h)
print('puntos', len(dots), 'bytes', len(svg))
