#!/usr/bin/env python3
"""Correccion 2: fotos reales nuevas de la ficha de Google Maps (research/fotos/maps-NN.jpg) y posts del IG.
Solo recortes y escalado con PIL (la maestra chica se subio x4 con Real-ESRGAN -s 4: _build/src/maestra-master.webp).
Nada de IA generativa. Corre: python3 _build/fotos2.py (idempotente)."""
import os
from PIL import Image, ImageEnhance
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
F = 'research/fotos/'

def out(im, name, widths, q=80):
    im = im.convert('RGB')
    for w in widths:
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(f'img/{name}-{w}.webp', quality=q, method=6)
    print(name, im.size, '->', widths)

# Recepcion (maps-03, 1600x2133): mostrador y logo dorado. Recorte cuadrado que deja fuera a la persona del pasillo.
r = Image.open(F + 'maps-03.jpg')
out(r.crop((600, 470, 1600, 1470)), 'recepcion', [480, 1000])
# Maestra en el pasillo (maps-04, video del propietario): sin el logo encimado de arriba; x4 ya hecho.
m = Image.open('_build/src/maestra-master.webp')
out(m.crop((0, 0, m.width, round(m.width * 1.32))), 'maestra', [360, 720])
# Fachada (maps-06, 1600x1200): mural con el logo y el porton.
fa = Image.open(F + 'maps-06.jpg')
out(fa.crop((0, 140, 1600, 1110)), 'fachada', [480, 960, 1400])
# Salon con mesitas (maps-01, 1080): sin el recuadro de logo y QR de abajo a la derecha.
s = Image.open(F + 'maps-01.jpg')
out(s.crop((0, 40, 1080, 840)), 'salon', [480, 900])
# Posts del IG para la tira del cierre (512x640): cuadro arriba de la franja de WhatsApp, logos e IMSS.
# Correccion 3: sale ig-01 (cuadro amarillo con letra ilegible a 390 px) y entra ig-06 (la libretita: Cartilla Nacional de Salud), y 20-532.
for n, box in [('06', (0, 20, 512, 532)), ('04', (0, 0, 512, 512)), ('02', (0, 0, 512, 512))]:
    p = Image.open(F + f'ig-{n}.jpg')
    out(p.crop(box), f'post-{n}', [480])
