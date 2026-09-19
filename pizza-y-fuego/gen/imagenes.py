#!/usr/bin/env python3
"""Pizza y Fuego: arma todas las imágenes de la página desde research/fotos (reales).
Las chicas de DiDi y el salón pasan antes por Real-ESRGAN x4 (carpeta X4, ver PENDIENTES/INDICE).
Uso: python3 gen/imagenes.py <carpeta_x4>
Comida: sin grading (solo nitidez suave). Salón: un poco más oscuro y cálido (la foto original está sobreexpuesta)."""
import os, sys
from PIL import Image, ImageOps, ImageFilter, ImageEnhance, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'research', 'fotos')
X4 = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'x4')
IMG = os.path.join(ROOT, 'img')


def src(n):
    for f in os.listdir(SRC):
        if f.startswith(n + '-'):
            return os.path.join(SRC, f)
    raise SystemExit('falta ' + n)


def x4(n):
    for f in os.listdir(X4):
        if f.startswith(n + '-'):
            return os.path.join(X4, f)
    return src(n)


def openrgb(p):
    return ImageOps.exif_transpose(Image.open(p)).convert('RGB')


def crop_ar(im, ar, cx=.5, cy=.5, zoom=1.0):
    """Recorte con proporción ar (ancho/alto) centrado en (cx, cy); zoom > 1 acerca."""
    w, h = im.size
    if w / h > ar:
        ch = h / zoom; cw = ch * ar
    else:
        cw = w / zoom; ch = cw / ar
    x = min(max(cx * w - cw / 2, 0), w - cw)
    y = min(max(cy * h - ch / 2, 0), h - ch)
    return im.crop((round(x), round(y), round(x + cw), round(y + ch)))


def fin(im, size, sharp=True):
    im = im.resize(size, Image.LANCZOS)
    if sharp:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=45, threshold=2))
    return im


def save(im, rel, q=80):
    p = os.path.join(IMG, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    if rel.endswith('.jpg'):
        im.save(p, quality=q, optimize=True, progressive=True)
    elif rel.endswith('.png'):
        im.save(p, optimize=True)
    else:
        im.save(p, 'WEBP', quality=q, method=6)
    print(rel, im.size, os.path.getsize(p) // 1024, 'KB')


def warm_dark(im, bright=.86, sat=1.08):
    im = ImageEnhance.Brightness(im).enhance(bright)
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(sat)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.04)))
    b = b.point(lambda v: int(v * .93))
    return Image.merge('RGB', (r, g, b))


# ---------- Hero: pizza con pala (07) ----------
p07 = openrgb(src('07'))
save(fin(crop_ar(p07, 9 / 16, .5, .5), (1080, 1920)), 'hero/hero-m.webp', 82)
save(fin(crop_ar(p07, 16 / 9, .5, .47), (1920, 1080)), 'hero/hero-d.webp', 82)
save(fin(crop_ar(p07, 1200 / 630, .5, .45), (1200, 630)), 'og.jpg', 84)

# ---------- Cine: salón con horno de leña (05, x4) ----------
s05 = warm_dark(openrgb(x4('05')), .8)
W, H = s05.size
save(fin(crop_ar(s05, 16 / 9, .5, .5), (3200, 1800), False), 'cine/salon-d.webp', 78)
save(fin(crop_ar(s05, 9 / 16, .47, .5), (1440, 2560), False), 'cine/salon-m.webp', 78)

# ---------- Cuadritos del hero ----------
save(fin(crop_ar(openrgb(src('09')), 16 / 10, .5, .45), (640, 400)), 'tiles/pizzas.webp', 78)
save(fin(crop_ar(openrgb(src('15')), 16 / 10, .45, .56, 1.0), (640, 400)), 'tiles/pastas.webp', 78)
save(fin(crop_ar(openrgb(src('16')), 16 / 10, .5, .55), (640, 400)), 'tiles/reunion.webp', 78)

# ---------- Menú (fotos reales; las de DiDi mejoradas x4) ----------
MENU = {
    'hawaiana': ('20', .5, .5, 1.04),
    'mexicana': ('21', .5, .5, 1.04),
    'quattro-stagioni': ('22', .5, .5, 1.04),
    'brusquetas-miste': ('24', .5, .5, 1.04),
    'brusqueta-pomodoro': ('25', .5, .5, 1.04),
    'caprese': ('26', .5, .55, 1.08),
    'spaghetti-bolognese': ('27', .5, .5, 1.04),
    'fusilli-amatriciana': ('28', .5, .52, 1.04),
    'spaghetti-frutti-di-mare': ('29', .5, .5, 1.04),
    'spaghetti-zucchini': ('30', .5, .5, 1.04),
    'lasagna': ('13', .45, .5, 1.05),
}
for slug, (n, cx, cy, z) in MENU.items():
    im = crop_ar(openrgb(x4(n)), 1, cx, cy, z)
    save(fin(im, (900, 900)), 'menu/%s.webp' % slug, 80)
    save(fin(im, (320, 320)), 'menu/t/%s.webp' % slug, 76)

# ---------- Quiénes somos ----------
save(fin(crop_ar(openrgb(src('01')), 4 / 3, .5, .5), (1600, 1200)), 'nos/fachada-noche.webp', 80)
save(fin(crop_ar(openrgb(src('12')), 4 / 5, .5, .5), (960, 1200)), 'nos/focaccia.webp', 80)
save(fin(crop_ar(openrgb(src('11')), 16 / 9, .5, .62, 1.3), (1600, 900)), 'nos/num.webp', 70)

# ---------- Galería "Lo que sale del horno" ----------
GAL = {'mesa-mantel': ('10', 4 / 3, .5, .6), 'rebanada': ('17', 3 / 4, .5, .5), 'carnes-frias': ('23', 1, .5, .5),
       'salsas': ('14', 4 / 3, .5, .5), 'entrada': ('06', 4 / 3, .55, .4)}
for slug, (n, ar, cx, cy) in GAL.items():
    im = crop_ar(openrgb(x4(n)), ar, cx, cy, 1.04 if n == '23' else (1.12 if n == '06' else 1.0))
    big = (1400, round(1400 / ar)) if ar >= 1 else (round(1400 * ar), 1400)
    save(fin(im, big), 'gal/%s.webp' % slug, 80)
    save(fin(im, (big[0] // 2, big[1] // 2)), 'gal/t/%s.webp' % slug, 76)

# ---------- Visítanos y cierre ----------
save(fin(crop_ar(openrgb(src('03')), 16 / 10, .5, .42), (1600, 1000)), 'visita/fachada-dia.webp', 80)
p08 = openrgb(src('08'))
save(fin(crop_ar(p08, 9 / 16, .5, .5), (1080, 1920)), 'cierre/cierre-m.webp', 80)
save(fin(crop_ar(p08, 16 / 9, .5, .5), (1920, 1080)), 'cierre/cierre-d.webp', 80)

# ---------- Logo real (sello de Rappi), esquinas limpias en círculo ----------
lg = Image.open(os.path.join(ROOT, 'research', 'logo.png')).convert('RGBA')
S = lg.size[0]
mask = Image.new('L', (S * 2, S * 2), 0)
ImageDraw.Draw(mask).ellipse((6, 6, S * 2 - 6, S * 2 - 6), fill=255)
mask = mask.resize((S, S), Image.LANCZOS)
white = Image.new('RGBA', (S, S), (255, 255, 255, 255))
white.alpha_composite(lg)
white.putalpha(mask)
for px, name in ((176, 'brand/logo-176.webp'), (560, 'brand/logo-560.webp')):
    save(white.resize((px, px), Image.LANCZOS), name, 90)
save(white.resize((32, 32), Image.LANCZOS), 'favicon-32.png')
at = Image.new('RGB', (180, 180), (255, 255, 255))
at.paste(white.resize((172, 172), Image.LANCZOS), (4, 4), white.resize((172, 172), Image.LANCZOS))
save(at, 'apple-touch-icon.png')
