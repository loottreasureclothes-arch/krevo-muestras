#!/usr/bin/env python3
"""Genera img/: logo limpio, favicon, posters webp (480/960/1600, subidos x4 con Real-ESRGAN) y og.jpg.
Las PNG x4 viven en el scratchpad (SCR/up). Corre: python3 gen/imagenes.py"""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCR = '/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/epica-work'
IMG = os.path.join(HERE, 'img'); os.makedirs(IMG, exist_ok=True)

# ---------- logo ----------
logo = Image.open(os.path.join(SCR, 'logo-clean.png')).convert('RGBA')
mark = logo.crop((0, 0, 421, 266))                       # marca + "Épica" sin el subtitulo borroso
mark.save(os.path.join(IMG, 'logo.png'), optimize=True)
# ---------- favicon: la "É" roja ----------
glyph = logo.crop((6, 98, 126, 232))
a = np.asarray(glyph).copy()
a[..., 0], a[..., 1], a[..., 2] = 0xC8, 0x1A, 0x27       # rojo telon un poco mas vivo para 32 px
glyph = Image.fromarray(a)
def icon(size, pad):
    bg = Image.new('RGB', (size, size), (11, 10, 10))
    g = glyph.copy(); s = (size - 2 * pad) / max(g.size)
    g = g.resize((max(1, int(g.width * s)), max(1, int(g.height * s))), Image.LANCZOS)
    bg.paste(g, ((size - g.width) // 2, (size - g.height) // 2), g)
    return bg
icon(32, 3).save(os.path.join(IMG, 'favicon-32.png'), optimize=True)
icon(180, 30).save(os.path.join(IMG, 'apple-touch-icon.png'), optimize=True)

# ---------- posters ----------
POSTERS = {  # slug -> ig-XX
    'off-shakespeare-19': '10', 'off-shakespeare-26': '02', 'herencia': '04', 'gigolo-25': '03', 'gigolo-18': '12',
    'jean-20': '07', 'jean-27-poesia': '01', 'mariquita': '08', 'pau-duran': '09', 'poesia-eviterna': '11',
}
WIDTHS = [480, 960, 1600]
info = {}
for slug, n in POSTERS.items():
    src = Image.open(os.path.join(SCR, 'up', f'ig-{n}.png')).convert('RGB')
    ws = []
    for w in WIDTHS:
        w2 = min(w, src.width)
        if w2 in ws: continue
        h = round(src.height * w2 / src.width)
        im = src.resize((w2, h), Image.LANCZOS)
        if w2 <= 480: im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=40, threshold=2))
        out = os.path.join(IMG, f'p-{slug}-{w2}.webp'); im.save(out, 'WEBP', quality=82, method=6)
        ws.append(w2)
    info[slug] = (ws, src.width, src.height)
    print(slug, ws, src.size)

# ---------- og.jpg 1200x630 ----------
W, H = 1200, 630
og = Image.new('RGB', (W, H), (11, 10, 10))
order = ['p-jean-20-960.webp', 'p-mariquita-960.webp', 'p-gigolo-25-960.webp', 'p-pau-duran-960.webp', 'p-off-shakespeare-19-960.webp', 'p-poesia-eviterna-960.webp']
x = -40
for i, f in enumerate(order):
    p = Image.open(os.path.join(IMG, f)).convert('RGB')
    p = p.resize((260, int(p.height * 260 / p.width)), Image.LANCZOS)
    p = ImageEnhance.Brightness(p).enhance(0.55)
    p = p.convert('RGBA').rotate([4, -3, 3, -4, 2, -2][i], expand=True, resample=Image.BICUBIC)
    og.paste(p, (x + i * 215, [-30, 300, -60, 280, -20, 310][i]), p)
og = og.convert('RGBA')
veil = Image.new('RGBA', (W, H), (11, 10, 10, 0))
g = ImageDraw.Draw(veil)
for yy in range(H):  # degradado oscuro de abajo a arriba + lateral izquierdo
    g.line([(0, yy), (W, yy)], fill=(11, 10, 10, int(150 + 90 * yy / H)))
og = Image.alpha_composite(og, veil)
d = ImageDraw.Draw(og)
GF = '/System/Library/Fonts/Supplemental/'
serif = ImageFont.truetype(GF + 'Georgia Bold.ttf', 88)
serif_i = ImageFont.truetype(GF + 'Georgia Bold Italic.ttf', 88)
mono = ImageFont.truetype(GF + 'Courier New Bold.ttf', 30)
lg = logo.crop((0, 0, 421, 266)).resize((190, int(266 * 190 / 421)), Image.LANCZOS)
og.paste(lg, (70, 56), lg)
d.text((70, 250), 'Comida, teatro', font=serif, fill=(241, 231, 210))
d.text((70, 350), 'y café.', font=serif_i, fill=(216, 36, 47))
d.rectangle([70, 486, 76, 520], fill=(179, 18, 31))
d.text((96, 486), 'ALLENDE 333 · BARRIO DE SAN MARCOS · AGUASCALIENTES', font=mono, fill=(201, 162, 74))
og.convert('RGB').save(os.path.join(IMG, 'og.jpg'), quality=86, optimize=True)
import json; json.dump(info, open(os.path.join(SCR, 'posters.json'), 'w'))
print('ok')
