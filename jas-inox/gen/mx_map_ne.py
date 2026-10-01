#!/usr/bin/env python3
"""R4: mapa de Mexico COMPLETO para 40-ruta desde Natural Earth (dominio publico).
Fuente: ne_50m_admin_0_countries.geojson (github.com/nvkelso/natural-earth-vector), bajado con curl; solo la
geometria de Mexico se guardo en gen/ne50-mexico.json. Proyeccion equirectangular (cos 23 grados), viewBox 800x570,
simplificada con Douglas-Peucker (cv2.approxPolyDP). Reescribe el <svg> de sections/40-ruta.html.
Corre: python3 gen/mx_map_ne.py"""
import json, math, os, re
import numpy as np, cv2
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
W, H = 800, 570
LON0, LAT1, K, X0, Y0 = -117.4, 33.0, 26.7, 20, 44
CX = math.cos(math.radians(23))
def P(lon, lat): return (X0 + (lon - LON0) * CX * K, Y0 + (LAT1 - lat) * K)
def f(v): return f'{v:.1f}'

g = json.load(open('gen/ne50-mexico.json'))
paths = []
for poly in g['coordinates']:
    ring = np.array([P(lon, lat) for lon, lat in poly[0]], np.float32)
    area = abs(cv2.contourArea(ring))
    if area < 6 or ring[:, 0].min() < 0: continue          # fuera islotes y la Isla Guadalupe (lejos, mar adentro)
    s = cv2.approxPolyDP(ring.reshape(-1, 1, 2), 0.45, True).reshape(-1, 2)
    if len(s) < 3: continue
    paths.append('M' + 'L'.join(f(x) + ',' + f(y) for x, y in s) + 'Z')
MX = ''.join(paths)

# corredor del Pacifico (trazo de referencia, no ruta exacta): Ags, Guadalajara, Tepic, Mazatlan, Culiacan, Los Mochis,
# Cd. Obregon, Hermosillo, Caborca, Sonoyta, Mexicali, Tijuana
RUTA = [(-102.30, 21.88), (-103.35, 20.67), (-104.89, 21.50), (-106.42, 23.22), (-107.39, 24.80), (-108.99, 25.79), (-109.93, 27.49),
        (-110.96, 29.07), (-112.15, 30.71), (-112.85, 31.86), (-115.47, 32.62), (-117.03, 32.53)]
pts = [P(*p) for p in RUTA]
r = f'M{f(pts[0][0])},{f(pts[0][1])}'
for i in range(len(pts) - 1):
    p0 = pts[max(0, i - 1)]; p1 = pts[i]; p2 = pts[i + 1]; p3 = pts[min(len(pts) - 1, i + 2)]
    c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
    c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
    r += f'C{f(c1[0])},{f(c1[1])} {f(c2[0])},{f(c2[1])} {f(p2[0])},{f(p2[1])}'
ax, ay = P(-102.30, 21.88); tx, ty = P(-117.03, 32.53)

svg = f'''<svg viewBox="0 0 {W} {H}" role="img" aria-label="Mapa de México con una línea de 1,900 kilómetros de Aguascalientes a Tijuana" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="rgba(201,204,209,.10)" stroke-width="1.2"/></pattern>
          </defs>
          <path class="mx" d="{MX}"/>
          <path class="mx-h" d="{MX}"/>
          <path class="ruta-base" d="{r}"/>
          <path class="ruta-line" id="ruta-line" pathLength="1" d="{r}"/>
          <g class="ruta-tag"><rect x="{f(ax + 14)}" y="{f(ay - 4)}" width="84" height="32"/><text class="ruta-lb" x="{f(ax + 22)}" y="{f(ay + 20)}">AGS.</text></g>
          <rect class="ruta-pt" x="{f(ax - 5)}" y="{f(ay - 5)}" width="10" height="10" transform="rotate(45 {f(ax)} {f(ay)})"/>
          <g class="ruta-tag"><rect x="{f(tx + 12)}" y="2" width="146" height="32"/><text class="ruta-lb" x="{f(tx + 20)}" y="26">TIJUANA</text></g>
          <rect class="ruta-pt ruta-pt--tj" x="{f(tx - 5)}" y="{f(ty - 5)}" width="10" height="10" transform="rotate(45 {f(tx)} {f(ty)})"/>
          <text class="ruta-k" x="24" y="{H - 102}">De Aguascalientes a Tijuana</text>
          <text class="ruta-km" id="ruta-km" x="20" y="{H - 30}">1,900 km</text>
          <rect class="ruta-head" id="ruta-head" x="-6" y="-6" width="12" height="12" transform="translate({f(ax)} {f(ay)}) rotate(45)"/>
        </svg>'''
p = 'sections/40-ruta.html'; s = open(p).read()
s2 = re.sub(r'<svg viewBox="0 0 \d+ \d+".*?</svg>', lambda m: svg, s, count=1, flags=re.S)
assert s2 != s or svg in s
open(p, 'w').write(s2)
print('mx', len(paths), 'poligonos,', len(MX), 'chars; AGS', f(ax), f(ay), 'TJ', f(tx), f(ty))
