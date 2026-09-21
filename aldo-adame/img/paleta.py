#!/usr/bin/env python3
"""Mide la paleta real de cada evento de Aldo Adame.

Ningun color se escoge a ojo ni se inventa. Por cada material se define un
RECUADRO sobre una de sus fotos reales de `research/fotos/` (coordenadas en
fraccion del ancho y del alto, para poder volver a verificarlo sobre la foto
original). Dentro de ese recuadro se cuantiza a 6 colores y se toma:
  modo "sat"  -> el mas saturado con peso (encuentra el amaranto entre el verde,
                 la esmeralda entre la plata, el globo salvia entre los blancos)
  modo "area" -> el de mas superficie (para lienzos: lino, cal, cantera)

Uso:  python3 img/paleta.py            imprime el JSON que vive en sections/20-bodas.js
      python3 img/paleta.py --prueba   guarda prueba-paleta.jpg con el recuadro
                                       recortado junto a su chip, para revisar a ojo
"""
from PIL import Image
import json, os, sys

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
R = os.path.join(BASE, 'research', 'fotos')

F23 = "23-jacquelineramiro-calesa-novios.jpg"
F24 = "24-jacquelineramiro-plaza-patria.jpg"
F11 = "11-ariannaalejandro-restaurant-losolivos-d.jpg"
F16 = "16-ariannaalejandro-novios-noche.jpg"
F18 = "18-ariannaalejandro-mesa-rattan-a.jpg"
F25 = "25-aovallesmarisol-tierratinta-a.jpg"
F02 = "02-vanyaguayo-almudena-wimbletwo-a.jpg"

# evento -> [(material, archivo, (x0, y0, x1, y1), modo)]
MUESTRAS = {
    "jr": [
        ("Cielo de mayo",  F23, (0.05, 0.030, 0.40, 0.120), "area"),
        ("Cantera rosa",   F23, (0.05, 0.285, 0.40, 0.345), "sat"),
        ("Encaje marfil",  F23, (0.52, 0.760, 0.72, 0.860), "claro"),
        ("Piedra de rio",  F23, (0.05, 0.800, 0.35, 0.930), "area"),
        ("Negro charro",   F23, (0.400, 0.560, 0.470, 0.660), "area"),
    ],
    "aa": [
        ("Lino verde olivo", F18, (0.28, 0.695, 0.42, 0.755), "area"),
        ("Amaranto seco",    F11, (0.42, 0.120, 0.64, 0.230), "sat"),
        ("Copa ambar",       F11, (0.03, 0.320, 0.19, 0.470), "claro"),
        ("Lisianthus crema", F16, (0.58, 0.310, 0.80, 0.430), "area"),
        ("Rosa durazno",     F16, (0.36, 0.480, 0.56, 0.600), "claro"),
    ],
    "tt": [
        ("Palma verde",     F25, (0.20, 0.020, 0.45, 0.090), "sat"),
        ("Luz de vela",     F25, (0.80, 0.080, 0.94, 0.160), "claro"),
        ("Nube de gypso",   F25, (0.30, 0.400, 0.55, 0.520), "area"),
        ("Lino de mesa",    F25, (0.78, 0.760, 0.96, 0.900), "claro"),
        ("Noche de vinedo", F25, (0.05, 0.300, 0.22, 0.480), "area"),
    ],
    "wt": [
        ("Globo blush",   F02, (0.12, 0.250, 0.24, 0.400), "claro"),
        ("Globo salvia",  F02, (0.858, 0.578, 0.908, 0.628), "sat"),
        ("Crema kiosco",  F02, (0.24, 0.380, 0.34, 0.520), "area"),
        ("Toldo a rayas", F02, (0.405, 0.095, 0.620, 0.175), "claro"),
        ("Verde cancha",  F02, (0.05, 0.900, 0.30, 0.980), "area"),
    ],
}

_cache = {}


def _abrir(archivo):
    im = _cache.get(archivo)
    if im is None:
        im = Image.open(os.path.join(R, archivo)).convert('RGB')
        _cache[archivo] = im
    return im


def recorte(archivo, caja):
    im = _abrir(archivo)
    x0, y0, x1, y1 = caja
    return im.crop((round(im.width * x0), round(im.height * y0),
                    round(im.width * x1), round(im.height * y1)))


def muestra(archivo, caja, modo):
    c = recorte(archivo, caja)
    c.thumbnail((200, 200))
    q = c.quantize(colors=6, method=Image.MEDIANCUT)
    pal = q.getpalette()[:18]
    total = sum(n for n, _ in q.getcolors()) or 1
    cand = []
    for n, idx in q.getcolors():
        rgb = tuple(pal[idx * 3:idx * 3 + 3])
        peso = n / total
        sat = (max(rgb) - min(rgb)) / 255.0
        lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255.0
        cand.append((peso, sat, lum, rgb))
    if modo == "sat":
        cand.sort(key=lambda v: -(v[1] * (v[0] ** 0.35)))
    elif modo == "claro":          # el mas saturado de la parte iluminada del recuadro
        claros = [c for c in cand if c[2] > 0.42] or cand
        claros.sort(key=lambda v: -(v[1] * (v[0] ** 0.35)))
        return claros[0][3]
    else:
        cand.sort(key=lambda v: -v[0])
    return cand[0][3]


def paletas():
    return {ev: [{"n": n, "c": '#%02X%02X%02X' % muestra(a, b, m)}
                 for n, a, b, m in lista] for ev, lista in MUESTRAS.items()}


def prueba(destino):
    """Hoja de revision: el recuadro real recortado y, al lado, el chip que salio."""
    from PIL import ImageDraw
    filas = [(ev, n, a, b, m) for ev, l in MUESTRAS.items() for n, a, b, m in l]
    AN, AL = 300, 96
    hoja = Image.new('RGB', (AN, AL * len(filas)), (250, 247, 242))
    d = ImageDraw.Draw(hoja)
    for i, (ev, n, a, b, m) in enumerate(filas):
        y = i * AL
        c = recorte(a, b)
        c.thumbnail((110, AL - 12))
        hoja.paste(c, (4, y + 6))
        col = muestra(a, b, m)
        d.rectangle([120, y + 6, 190, y + AL - 8], fill=col)
        d.text((196, y + 30), '%s %s' % (ev, n), fill=(14, 26, 43))
        d.text((196, y + 46), '#%02X%02X%02X %s' % (col + (m,)), fill=(110, 100, 90))
    hoja.save(destino, quality=92)
    return destino


if __name__ == '__main__':
    if '--prueba' in sys.argv:
        print(prueba(sys.argv[sys.argv.index('--prueba') + 1]
                     if len(sys.argv) > sys.argv.index('--prueba') + 1 else 'prueba-paleta.jpg'))
    else:
        print(json.dumps(paletas(), indent=1, ensure_ascii=False))
