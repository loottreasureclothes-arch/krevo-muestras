#!/usr/bin/env python3
"""Genera img/ para JAS INOX desde research/ (recortes -> Real-ESRGAN x4 -> webp srcset, logo cromo, favicon, og).
Real-ESRGAN se corre aparte desde su carpeta (ver IMAGENES.md): necesita cwd = tools/realesrgan."""
import os, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
UP, OUT = '_work/up/', 'img/'
os.makedirs(OUT, exist_ok=True)

def emit(name, im, widths):
    im = im.convert('RGB')
    ws = sorted({w for w in widths if w <= im.width} | ({im.width} if im.width < max(widths) else set()))
    for w in ws:
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(f'{OUT}{name}-{w}.webp', 'WEBP', quality=80, method=6)
    print(name, ws, im.size)

# ---------- fotos (ya recortadas y subidas x4 en _work/up) ----------
emit('hero', Image.open(UP + 'hero.png'), [480, 960, 1600])
for n in ['carrito-a', 'carrito-c', 'cajones', 'tarja', 'mesa-larga', 'campana', 'redilas-b']:
    emit(n, Image.open(UP + n + '.png'), [480, 960])
for n in ['truck-ags', 'truck-tj']:
    emit(n, Image.open(UP + n + '.png'), [480, 960])

# ---------- logo: fondo blanco fuera, version cromo para carbon ----------
src = Image.open('research/logo-fb.jpg').convert('RGB')
crop = src.crop((552, 511, 1493, 1459))
a = np.asarray(crop).astype(float)
L = a.mean(axis=2)
H, W = L.shape
yy = np.arange(H)[:, None] * np.ones((1, W))
inox = yy > 735
alpha = np.zeros_like(L)
rgb = np.zeros_like(a)
# INOX + registrada: gris acero claro, alfa por oscuridad
steel = np.array([201, 204, 209.0])
m = inox
alpha[m] = np.clip((250 - L[m]) / 190, 0, 1)
rgb[m] = steel
# JAS: cara (gris cromo) y extrusion (oscura -> acero medio para que se lea sobre carbon)
j = ~inox
from PIL import ImageFilter as _IF
dk = Image.fromarray(((L < 78) & j).astype(np.uint8) * 255).filter(_IF.MaxFilter(3))
dark = j & (np.asarray(dk) > 0)
face = j & ~dark
alpha[dark] = 1
rgb[dark] = np.array([92, 96, 104.0])
alpha[face] = np.clip((252 - L[face]) / 22, 0, 1)
rgb[face] = np.clip(a[face] * 1.12 + 6, 0, 255)
out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
logo = Image.fromarray(out)
logo.save(OUT + 'logo-cromo-full.png')
lw = 720
logo_s = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
logo_s.save(OUT + 'logo-cromo.png', optimize=True)
print('logo', logo_s.size)

# ---------- favicon: la J ----------
J = logo.crop((8, 28, 262, 706))
def icon(size, pad):
    bg = Image.new('RGBA', (size, size), (20, 21, 23, 255))
    inner = size - 2 * pad
    k = inner / max(J.size)
    j2 = J.resize((max(1, round(J.width * k)), max(1, round(J.height * k))), Image.LANCZOS)
    bg.alpha_composite(j2, ((size - j2.width) // 2, (size - j2.height) // 2))
    return bg.convert('RGB')
icon(32, 3).save(OUT + 'favicon-32.png')
icon(180, 22).save(OUT + 'apple-touch-icon.png')

# ---------- og 1200x630 ----------
ph = Image.open(UP + 'mesa-larga.png').convert('RGB')
r = 1200 / ph.width
ph = ph.resize((1200, round(ph.height * r)), Image.LANCZOS)
if ph.height < 630:
    ph = ph.resize((round(ph.width * 630 / ph.height), 630), Image.LANCZOS)
bgim = ph.crop(((ph.width - 1200) // 2, (ph.height - 630) // 2, (ph.width - 1200) // 2 + 1200, (ph.height - 630) // 2 + 630))
bgim = ImageEnhance.Brightness(bgim).enhance(.55)
canvas = bgim.convert('RGBA')
grad = Image.new('RGBA', (1200, 630))
gp = grad.load()
for x in range(1200):
    t = max(0, 1 - x / 820)
    for y in range(630):
        gp[x, y] = (20, 21, 23, int(235 * t ** .8))
canvas.alpha_composite(grad)
d = ImageDraw.Draw(canvas)
lg = logo.resize((150, round(logo.height * 150 / logo.width)), Image.LANCZOS)
canvas.alpha_composite(lg, (64, 58))
f1 = ImageFont.truetype('/System/Library/Fonts/Supplemental/Impact.ttf', 92)
f2 = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf', 30)
d.text((64, 268), 'ACERO INOXIDABLE', font=f1, fill=(244, 245, 247))
# segunda linea cromo (degradado vertical)
tmp = Image.new('L', (1200, 630), 0)
ImageDraw.Draw(tmp).text((64, 372), 'A TU MEDIDA.', font=f1, fill=255)
g = Image.new('RGBA', (1200, 630))
gpix = g.load()
for y in range(630):
    t = min(1, max(0, (y - 380) / 100))
    c = (int(242 - (242 - 154) * t), int(243 - (243 - 158) * t), int(245 - (245 - 166) * t), 255)
    for x in range(64, 700):
        gpix[x, y] = c
canvas.paste(g, (0, 0), tmp)
d.text((66, 520), 'AGUASCALIENTES  ·  ENTREGAS EN TODO MÉXICO', font=f2, fill=(201, 204, 209))
d.rectangle((64, 492, 300, 494), fill=(201, 204, 209))
canvas.convert('RGB').save(OUT + 'og.jpg', quality=88)
print('og ok')
