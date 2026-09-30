#!/usr/bin/env python3
"""Genera sections/30-sala.html: plano SVG de la sala (38 lugares, 5 filas curvas, mesitas de 2 y 4 sillas)
y las fichas de la PROGRAMACIÓN SEMANAL real (research/hechos.md). La fecha de cada ficha la calcula
sections/30-sala.js con el día real del visitante (la próxima de ese día de la semana).
Corre: python3 gen/sala.py  (luego python3 build.py)

Corrección 1 (30 sep 2026): cada silla tiene área de toque de 44 px a 390 (r=22.5 en un viewBox de 360
que se pinta a ~354 px) y ninguna área se encima con la de otra silla (paso mínimo 45); sillas con forma
de silla (asiento + respaldo curvo) que miran a su mesa; mesas con borde dorado sólido."""
import os, math
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

HIT = 22.5   # radio del área de toque (44 px a 390 de ancho)
# filas: (letra, y central, separación entre mesas, [sillas por mesa])
ROWS = [
    ('A', 112, 100, [2, 2, 2]),
    ('B', 167, 90, [2, 2, 2, 2]),
    ('C', 216, 110, [2, 2, 2]),
    ('D', 290, 115, [4, 2, 4]),
    ('E', 363, 90, [2, 2, 2, 2]),
]
R = 430  # curvatura: los extremos de cada fila bajan (fila concéntrica al escenario)
CX = 180
P2 = [(-22.5, 0), (22.5, 0)]
P4 = [(0, -32), (32, 0), (0, 32), (-32, 0)]
# silla dibujada mirando hacia -y (la mesa queda "arriba"); se gira para que mire a su mesa
SILLA = ('<g class="ep-silla" transform="rotate({rot:.0f})">'
         '<rect x="-9" y="-8" width="18" height="12" rx="3"/>'
         '<rect x="-10.5" y="5.5" width="21" height="5" rx="2.5"/></g>')
out = []; seats = []
for letra, y0, gap, mesas in ROWS:
    n = len(mesas); k = 0
    for i, sillas in enumerate(mesas):
        dx = (i - (n - 1) / 2) * gap
        x = CX + dx
        y = y0 + (dx * dx) / (2 * R)
        pos = P2 if sillas == 2 else P4
        g = [f'<g transform="translate({x:.1f} {y:.1f})"><circle class="ep-mesa" r="{10 if sillas == 2 else 14}"/>']
        for (sx, sy) in pos:
            k += 1
            sid = f'{letra}{k}'
            rot = math.degrees(math.atan2(-sx, sy))  # dir a la mesa = (-sx,-sy); rot = atan2(dir.x, -dir.y)
            seats.append((sid, x + sx, y + sy))
            g.append(f'<g class="ep-seat" data-seat="{sid}" data-x="{x+sx:.1f}" data-y="{y+sy:.1f}" role="checkbox" aria-checked="false" aria-label="Lugar {sid}" tabindex="0" transform="translate({sx} {sy})"><circle class="ep-hit" r="{HIT}"/>{SILLA.format(rot=rot)}</g>')
        g.append('</g>')
        out.append(''.join(g))
assert len(seats) == 38, len(seats)
# ninguna área de toque se encima con otra
for a in range(len(seats)):
    for b in range(a + 1, len(seats)):
        d = math.hypot(seats[a][1] - seats[b][1], seats[a][2] - seats[b][2])
        assert d >= 2 * HIT - 0.5, (seats[a], seats[b], round(d, 1))
xs = [s[1] for s in seats]; ys = [s[2] for s in seats]
assert min(xs) - HIT >= 0 and max(xs) + HIT <= 360, (min(xs), max(xs))
VB_H = int(math.ceil(max(ys) + HIT + 4))
plano = (f'<svg class="ep-plano-svg" viewBox="0 0 360 {VB_H}" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Plano de la sala, 38 lugares en mesitas">'
         '<path class="ep-escenario" d="M26 6 H334 L350 50 Q180 84 10 50 Z"/>'
         '<path class="ep-escenario-l" d="M40 14 H320 L332 44 Q180 70 28 44 Z"/>'
         '<text class="ep-esc-t" x="180" y="40" text-anchor="middle">ESCENARIO</text>'
         + ''.join(out) + '</svg>')

# Programación semanal real (research/hechos.md, Yahoo "Foro Épica: el ave fénix")
DIAS = [
    ('mie', 'MIÉ', 'Stand-up'),
    ('jue', 'JUE', 'Teatro experimental y arte urbano'),
    ('vie', 'VIE', 'Teatro'),
    ('sab', 'SÁB', 'Teatro'),
    ('dom', 'DOM', 'Teatro infantil y música'),
]
fichas = ''.join(
    f'<button type="button" class="ep-ficha" role="radio" aria-checked="false" data-dia="{k}">'
    f'<span class="ep-ficha-d" data-dia-fecha="{k}">{d}</span><span class="ep-ficha-n">{n}</span>'
    f'<span class="ep-ficha-p">Pregunta el precio</span></button>'
    for k, d, n in DIAS)

ICO = ('<svg class="ep-ley-i" viewBox="-12 -10 24 22" aria-hidden="true"><rect x="-9" y="-8" width="18" height="12" rx="3"/>'
       '<rect x="-10.5" y="5.5" width="21" height="5" rx="2.5"/></svg>')

html = f'''  <section id="sala" class="ep-sec ep-sala" data-hide-wa aria-labelledby="sala-title">
    <div class="ep-wrap">
      <h2 class="ep-h ep-drop" id="sala-title" data-ep-reveal><span class="ep-line"><span class="ep-word" style="--i:0">Aparta tu</span></span><span class="ep-line ep-b"><span class="ep-word" style="--i:1">lugar.</span></span></h2>
      <div class="ep-sala-grid">
        <div class="ep-paso ep-paso-1">
          <p class="ep-paso-t"><b>1</b>Elige la función</p>
          <div class="ep-fichas" role="radiogroup" aria-label="Función de la semana">{fichas}</div>
          <div class="ep-fechas" id="ep-fechas" role="radiogroup" aria-label="Fecha" hidden></div>
        </div>
        <div class="ep-paso ep-paso-2" id="plano">
          <p class="ep-paso-t"><b>2</b>Toca tus lugares</p>
          <div class="ep-cuenta">
            <button type="button" class="ep-step" data-step="-1" aria-label="Quitar un lugar">&minus;</button>
            <output class="ep-cuenta-n" id="ep-cuenta-n" aria-live="polite">Elige cuántos</output>
            <button type="button" class="ep-step" data-step="1" aria-label="Agregar un lugar">+</button>
          </div>
          <p class="ep-pista" id="ep-pista">Toca una silla</p>
          <div class="ep-plano">{plano}</div>
          <p class="ep-leyenda" aria-hidden="true"><span class="ep-ley ep-ley--libre">{ICO}libre</span><span class="ep-ley ep-ley--tuya">{ICO}tuya</span></p>
          <p class="ep-aviso">Los lugares son referencia: el equipo te confirma la mesa por WhatsApp.</p>
        </div>
        <div class="ep-paso ep-paso-3">
          <p class="ep-paso-t"><b>3</b>Tu boleto</p>
          <div class="ep-boleto-wrap">
            <div class="ep-boleto">
              <div class="ep-bol-top"><span>Épica</span><span>Admite <b id="b-n">___</b></span></div>
              <dl class="ep-bol-dl">
                <div><dt>Función</dt><dd id="b-fn" data-empty="Sin elegir">Sin elegir</dd></div>
                <div><dt>Fecha</dt><dd id="b-fecha" data-empty="Sin elegir">Sin elegir</dd></div>
                <div><dt>Lugares</dt><dd id="b-lug" data-empty="Toca el plano">Toca el plano</dd></div>
                <div><dt>Precio</dt><dd id="b-precio" data-empty="Te lo confirmamos por WhatsApp">Te lo confirmamos por WhatsApp</dd></div>
              </dl>
              <label class="ep-bol-nombre"><span>Nombre (opcional)</span><input id="b-nombre" type="text" maxlength="40" autocomplete="name" placeholder="Tu nombre"></label>
            </div>
            <a class="ep-btn ep-btn--wa" id="b-wa" data-wa="Hola Épica, quiero apartar lugares. ¿Qué funciones tienen esta semana?" href="https://wa.me/524491577858?text=Hola%20%C3%89pica%2C%20quiero%20apartar%20lugares.%20%C2%BFQu%C3%A9%20funciones%20tienen%20esta%20semana%3F" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Apartar por WhatsApp</a>
            <p class="ep-falta" id="b-falta">Falta elegir función.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
'''
open(os.path.join(HERE, 'sections', '30-sala.html'), 'w').write(html)
print('sala ok, sillas:', len(seats), 'viewBox alto:', VB_H)
