#!/usr/bin/env python3
"""Tapa las caritas de emoji (arte de Apple que traian las fotos originales de IG) con el sol de
Brillantes: disco amarillo #ffc63a con 12 rayos cortos redondeados (mismo dibujo que #i-sun del header).
Lee los maestros x4 SIN tocar (_build/src/*-master.webp, salida original de Real-ESRGAN) y escribe
img/hero-*.webp e img/sala-*.webp. Idempotente: siempre parte del maestro.
Corre: python3 _build/soles.py"""
import math, os
from PIL import Image, ImageDraw, ImageFilter
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
SUN = (255, 198, 58); DEEP = (233, 164, 0)
SS = 4  # supermuestreo para bordes suaves

# (cx, cy, r) en pixeles del maestro de 1600 px. r cubre toda la carita (con orejas y copete).
CARAS = {
    'hero': [(334, 386, 70), (446, 314, 64), (603, 292, 53), (707, 258, 58),
             (1460, 462, 58), (1518, 584, 70), (1480, 758, 72)],
    'sala': [(519, 284, 188), (1158, 874, 212)],
}

def sol(img, cx, cy, r, ray=(1.14, 1.42, .17)):
    W, H = img.size
    pad = int(r * 1.7)
    x0, y0 = max(0, cx - pad), max(0, cy - pad)
    x1, y1 = min(W, cx + pad), min(H, cy + pad)
    w, h = x1 - x0, y1 - y0
    lay = Image.new('RGBA', (w * SS, h * SS), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    ox, oy = (cx - x0) * SS, (cy - y0) * SS
    R = r * SS
    # sombra suave (sticker pegado)
    sh = Image.new('RGBA', lay.size, (0, 0, 0, 0)); ds = ImageDraw.Draw(sh)
    ds.ellipse([ox - R * 1.02, oy - R * 1.02 + R * .07, ox + R * 1.02, oy + R * 1.02 + R * .07], fill=(10, 20, 70, 70))
    sh = sh.filter(ImageFilter.GaussianBlur(R * .08))
    lay = Image.alpha_composite(sh, lay); d = ImageDraw.Draw(lay)
    # rayos cortos
    sw = max(2, int(R * ray[2]))
    for k in range(12):
        a = math.radians(k * 30 + 15)
        r0, r1 = R * ray[0], R * ray[1]
        p0 = (ox + r0 * math.cos(a), oy + r0 * math.sin(a)); p1 = (ox + r1 * math.cos(a), oy + r1 * math.sin(a))
        d.line([p0, p1], fill=SUN + (255,), width=sw)
        for p in (p0, p1):
            d.ellipse([p[0] - sw / 2, p[1] - sw / 2, p[0] + sw / 2, p[1] + sw / 2], fill=SUN + (255,))
    # disco con filo dorado
    d.ellipse([ox - R, oy - R, ox + R, oy + R], fill=DEEP + (255,))
    e = R * .06
    d.ellipse([ox - R + e, oy - R + e, ox + R - e, oy + R - e], fill=SUN + (255,))
    # brillo
    b = R * .34
    d.ellipse([ox - R * .52 - b / 2, oy - R * .52 - b / 2, ox - R * .52 + b / 2, oy - R * .52 + b / 2], fill=(255, 231, 160, 190))
    lay = lay.resize((w, h), Image.LANCZOS)
    img.alpha_composite(lay, (x0, y0))

# en la sala las caritas son enormes: rayos mas cortos y delgados para que el sol no mande
RAYOS = {'hero': (1.14, 1.42, .17), 'sala': (1.08, 1.26, .11)}

def run(name, widths):
    m = Image.open(f'_build/src/{name}-master.webp').convert('RGBA')
    for c in CARAS[name]:
        sol(m, *c, ray=RAYOS[name])
    m = m.convert('RGB')
    for wd in widths:
        im = m if wd == m.width else m.resize((wd, round(m.height * wd / m.width)), Image.LANCZOS)
        im.save(f'img/{name}-{wd}.webp', 'WEBP', quality=82, method=6)
    return m

# Correccion 4: la sala "Cunitas, sillas altas y su maestra" va recortada a la maestra y las dos cunitas junto a ella.
# Recorte sobre el maestro x4 (x 525-1350, y 100-1205): deja fuera la mancha del logo borrado (abajo a la izquierda)
# y las otras 5 caritas, asi bastan 2 soles chicos de rayos cortos. Se afina poquito (unsharp) y lleva grano fino
# para que no se vea plastica. Sale chica, en marco de foto pegada (la fuente son ~240 px reales de ancho).
SALAS_BOX = (525, 100, 1350, 1205)
SALAS_CARAS = [(603, 292, 53), (707, 258, 58)]

def salas(widths=(480, 825)):
    from PIL import ImageFilter
    m = Image.open('_build/src/hero-master.webp').convert('RGBA')
    for cx, cy, r in SALAS_CARAS:
        sol(m, cx, cy, r, ray=(1.08, 1.24, .12))
    c = m.crop(SALAS_BOX).convert('RGB')
    c = c.filter(ImageFilter.UnsharpMask(radius=1.6, percent=55, threshold=2))
    g = Image.effect_noise(c.size, 9).convert('L')
    c = Image.blend(c, Image.merge('RGB', (g, g, g)), .035)
    for wd in widths:
        im = c if wd == c.width else c.resize((wd, round(c.height * wd / c.width)), Image.LANCZOS)
        im.save(f'img/salas-{wd}.webp', 'WEBP', quality=84, method=6)
    return c

if __name__ == '__main__':
    run('hero', [480, 960, 1600]).save('_build/src/hero-soles.png')
    run('sala', [480, 960, 1600])
    print('salas', salas().size)
    print('soles listos')
