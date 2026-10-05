#!/usr/bin/env python3
"""UNA hoja de contacto barata para mirar con Read.
Uso:  hoja.py <carpeta-shots> <salida.jpg>            (usa m-*.png y d-*.png de krevo-shot)
      hoja.py --varias <salida.jpg> slug1 slug2 ...  (primeras pantallas de celular de varios sitios, del scratchpad de pulido)
Máximo 1600 px de lado, JPEG 70: cuesta una fracción de mirar capturas sueltas."""
import sys, glob, os
from PIL import Image, ImageDraw
MAX = 1600
def tira(fs, h):
    ims = []
    for f in fs:
        im = Image.open(f).convert('RGB'); ims.append(im.resize((max(1, int(im.width * h / im.height)), h)))
    if not ims: return None
    out = Image.new('RGB', (sum(i.width for i in ims) + 4 * (len(ims) - 1), h), (40, 40, 40)); x = 0
    for i in ims: out.paste(i, (x, 0)); x += i.width + 4
    return out
def guardar(filas, salida):
    filas = [f for f in filas if f]
    if not filas: sys.exit("no hay capturas m-*.png ni d-*.png en esa carpeta")
    W = max(f.width for f in filas); H = sum(f.height for f in filas) + 8 * (len(filas) - 1)
    out = Image.new('RGB', (W, H), (20, 20, 20)); y = 0
    for f in filas: out.paste(f, (0, y)); y += f.height + 8
    out.thumbnail((MAX, MAX)); out.save(salida, quality=70); print(salida, out.size)
num = lambda f: int(''.join(c for c in os.path.basename(f).split('-')[-1] if c.isdigit()) or 0)
if sys.argv[1] == '--varias':
    salida, slugs = sys.argv[2], sys.argv[3:]; base = '/tmp/tuberia'
    fs = []
    for s in slugs:
        c = sorted(glob.glob(f'{base}/{s}-pul*/s/m-0[0-2].png') or glob.glob(f'{base}/{s}-*/s/m-0[0-2].png'))
        fs += c[:2]
    guardar([tira(fs[i:i + 8], 700) for i in range(0, len(fs), 8)], salida)
else:
    d, salida = sys.argv[1], sys.argv[2]
    m = sorted([f for f in glob.glob(f'{d}/m-*.png') if 'vuelta' not in f], key=num)
    k = sorted([f for f in glob.glob(f'{d}/d-*.png') if 'vuelta' not in f], key=num)
    filas = [tira(m[i:i + 7], 640) for i in range(0, len(m), 7)] + [tira(k[i:i + 3], 420) for i in range(0, len(k), 3)]
    guardar(filas, salida)
