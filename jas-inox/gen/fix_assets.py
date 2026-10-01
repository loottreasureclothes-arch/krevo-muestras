#!/usr/bin/env python3
"""Correccion 1 (30 sep 2026): fotos limpias sin marcas de agua ni texto de Instagram.
Todo local y sin IA generativa: recorte con PIL + inpaint local de OpenCV (cv2.inpaint, TELEA) solo sobre
la zona del texto -> Real-ESRGAN x4 (realesrgan-x4plus -s 4, corrido desde tools/realesrgan) -> webp.
Uso: python3 gen/fix_assets.py prep   (recortes + inpaint en _work/fix/*.png)
     python3 gen/fix_assets.py up     (Real-ESRGAN x4 -> _work/fix/up/)
     python3 gen/fix_assets.py emit   (webp 480/960/1600 + og.jpg)"""
import os, sys, subprocess, numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
F, FIX, UP, OUT = 'research/fotos/', '_work/fix/', '_work/fix/up/', 'img/'
ESR = os.path.expanduser('~/Prospeccion-Web-Ags/tools/realesrgan')

def wm_mask(img, box, thr=10, k=9, grow=2):
    """Mascara de la marca de agua dentro de box: pixeles que se separan del fondo local (letras claras con sombra)."""
    g = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY).astype(np.int16)
    bg = cv2.medianBlur(g.astype(np.uint8), k).astype(np.int16)
    m = (np.abs(g - bg) > thr).astype(np.uint8) * 255
    keep = np.zeros_like(m); x0, y0, x1, y1 = box; keep[y0:y1, x0:x1] = 255
    m = cv2.bitwise_and(m, keep)
    if grow: m = cv2.dilate(m, np.ones((2 * grow + 1, 2 * grow + 1), np.uint8))
    return cv2.bitwise_and(m, keep)

def rect_mask(shape, boxes):
    m = np.zeros(shape[:2], np.uint8)
    for x0, y0, x1, y1 in boxes: m[y0:y1, x0:x1] = 255
    return m

def sky_fill(img, mask, region):
    """Cielo liso: ajusta un degradado cuadratico a los pixeles de cielo vecinos (azules, fuera de la mascara)
    y rellena la mascara con el + grano fino. Sin IA; el inpaint TELEA dejaba bandas en el cielo."""
    x0, y0, x1, y1 = region
    sub = img[y0:y1, x0:x1].astype(float); m = mask[y0:y1, x0:x1] > 0
    yy, xx = np.mgrid[0:sub.shape[0], 0:sub.shape[1]]
    r, g, b = sub[..., 0], sub[..., 1], sub[..., 2]
    ok = (~m) & (b > r + 40) & (b > 120)
    xn, yn = xx / max(1, xx.max()), yy / max(1, yy.max())
    A = np.stack([np.ones_like(xn), xn, yn, xn * xn, yn * yn, xn * yn], -1)
    rng = np.random.default_rng(7)
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A[ok], sub[..., c][ok], rcond=None)
        fit = np.einsum('ijk,k->ij', A, coef) + rng.normal(0, 1.4, xx.shape)
        ch = sub[..., c]; ch[m] = fit[m]
    img[y0:y1, x0:x1] = np.clip(sub, 0, 255).astype(np.uint8)
    return img

def inpaint(img, mask, r=4):
    return cv2.inpaint(img, mask, r, cv2.INPAINT_TELEA)

# (salida, foto, recorte final, lista de zonas: ('wm', box, thr) mascara por contraste | ('rect', box) zona completa)
JOBS = {
    # REF. 04: mesa con tarja (ig-12, panel superior derecho); "JAS" fantasma sobre la puerta
    'tarja':      ('ig-12.jpg', (434, 24, 600, 212), [('wm', (474, 124, 512, 172), 9)]),
    # REF. 05: tarja con gabinete (ig-12, panel inferior izquierdo); "JAS" del costado oscuro con inpaint; la marca de la izquierda dejaba mancha: recorte desde x=74
    'tarja-gab':  ('ig-12.jpg', (74, 428, 188, 618), [('wm', (132, 534, 176, 582), 8), ('wm', (42, 476, 88, 524), 8)]),
    # REF. 03: mesa larga con cajones (ig-12, fila 2 derecha). El inpaint de las marcas sobre puertas y cajon dejaba
    # mancha: se RECORTA el tramo central (sin las dos marcas de la mesa); solo la cola de la marca de la pared se pinta.
    'cajones':    ('ig-12.jpg', (340, 262, 504, 406), [('wm', (318, 230, 364, 272), 10)]),
    # FIG. 04 grande: la pieza de JAS emplayada entrando al trailer (ig-05, panel sup. izq.)
    'carga':      ('ig-05.jpg', (3, 4, 220, 312), [('wm', (74, 66, 112, 106), 7), ('rect', (131, 182, 142, 218))]),
    # FIG. 05: trailer en Tijuana sin "TIJUANA", pin ni rayitas (cielo liso)
    'truck-tj':   ('ig-05.jpg', (268, 374, 473, 640), [('sky', (344, 366, 400, 412)), ('sky', (403, 368, 456, 426)), ('sky', (333, 421, 472, 463))]),
    # Banda a sangre: redilas en la pickup frente al taller (letrero real JAS INOX en la pared)
    'banda':      ('ig-06.jpg', (0, 2, 232, 318), []),
    # Hero (igual que antes: ig-07 panel inferior) para og.jpg
    'hero':       ('ig-07.jpg', (45, 285, 328, 627), []),
    # Correccion 2: FIG. 05 sin gente. Mismo panel de ig-05 hasta y=222 (fuera la nuca del trabajador y las manos
    # del montacargas) y hasta x=210 (fuera la gorra del de la derecha). Queda emplaye + caja del trailer + cielo.
    'carga2':     ('ig-05.jpg', (3, 4, 210, 222), [('wm', (74, 66, 112, 106), 7), ('rect', (131, 182, 142, 218))]),
    # Correccion 2: frente del taller (ig-07, panel de arriba): la barra frente al letrero JAS INOX, sin usar hasta hoy
    'frente':     ('ig-07.jpg', (48, 14, 326, 247), []),
}
R2 = ['carga2', 'frente']

def prep(names=None):
    os.makedirs(FIX, exist_ok=True)
    for name, (src, crop, zones) in JOBS.items():
        if names and name not in names: continue
        img = np.asarray(Image.open(F + src).convert('RGB')).copy()
        mask = np.zeros(img.shape[:2], np.uint8)
        sky = np.zeros(img.shape[:2], np.uint8)
        for z in zones:
            if z[0] == 'wm': mask |= wm_mask(img, z[1], z[2])
            elif z[0] == 'sky': sky |= rect_mask(img.shape, [z[1]])
            else: mask |= rect_mask(img.shape, [z[1]])
        if sky.any():
            ys, xs = np.nonzero(sky)
            img = sky_fill(img, sky, (max(0, xs.min() - 30), max(0, ys.min() - 4), min(img.shape[1], xs.max() + 20), min(img.shape[0], ys.max() + 30)))
            mask |= sky
        elif mask.any(): img = inpaint(img, mask, 4)
        x0, y0, x1, y1 = crop
        Image.fromarray(img[y0:y1, x0:x1]).save(FIX + name + '.png')
        Image.fromarray(mask[y0:y1, x0:x1]).save(FIX + name + '-mask.png')
        print('prep', name, x1 - x0, y1 - y0, 'mask px', int((mask[y0:y1, x0:x1] > 0).sum()))

def up(names=None):
    os.makedirs(UP, exist_ok=True)
    for name in names or JOBS:
        src = os.path.abspath(FIX + name + '.png'); dst = os.path.abspath(UP + name + '.png')
        subprocess.run(['./realesrgan-ncnn-vulkan', '-i', src, '-o', dst, '-n', 'realesrgan-x4plus', '-s', '4'], cwd=ESR, check=True, capture_output=True)
        print('x4', name, Image.open(dst).size)

def detex(name):
    """x4 con un poco de la textura original encima (Lanczos) para que el acero no se vea de cera."""
    a = Image.open(UP + name + '.png').convert('RGB')
    b = Image.open(FIX + name + '.png').convert('RGB').resize(a.size, Image.LANCZOS)
    m = Image.blend(a, b, 0.22)
    return m.filter(ImageFilter.UnsharpMask(radius=1.6, percent=40, threshold=2))

def emit_one(name, im, widths):
    ws = sorted({w for w in widths if w <= im.width} | ({im.width} if im.width < max(widths) else set()))
    for w in ws:
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(f'{OUT}{name}-{w}.webp', 'WEBP', quality=80, method=6)
    print('emit', name, ws, im.size)

def og():
    W, H = 1200, 630
    canvas = Image.new('RGBA', (W, H), (20, 21, 23, 255))
    # lamina cepillada
    br = Image.new('RGBA', (W, H)); d0 = ImageDraw.Draw(br)
    for y in range(0, H, 3): d0.line([(0, y), (W, y)], fill=(255, 255, 255, 10))
    canvas.alpha_composite(br)
    ph = detex('hero')
    k = H / ph.height
    ph = ph.resize((round(ph.width * k), H), Image.LANCZOS)
    ph = ImageEnhance.Brightness(ph).enhance(0.95).convert('RGBA')
    px = W - ph.width
    canvas.alpha_composite(ph, (px, 0))
    # velo solo a la izquierda de la foto (se funde con el carbon)
    grad = Image.new('RGBA', (W, H)); gp = grad.load()
    for x in range(px, min(W, px + 230)):
        t = 1 - (x - px) / 230
        for y in range(H): gp[x, y] = (20, 21, 23, int(255 * t ** 1.4))
    canvas.alpha_composite(grad)
    # marco acero de la foto con corte
    d = ImageDraw.Draw(canvas)
    logo = Image.open(OUT + 'logo-cromo.png').convert('RGBA')
    lg = logo.resize((132, round(logo.height * 132 / logo.width)), Image.LANCZOS)
    canvas.alpha_composite(lg, (64, 52))
    f1 = ImageFont.truetype('/System/Library/Fonts/Supplemental/Impact.ttf', 78)
    f2 = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf', 28)
    d.text((64, 262), 'ACERO INOXIDABLE', font=f1, fill=(244, 245, 247))
    tmp = Image.new('L', (W, H), 0)
    ImageDraw.Draw(tmp).text((64, 356), 'A TU MEDIDA.', font=f1, fill=255)
    g = Image.new('RGBA', (W, H)); gpix = g.load()
    for y in range(H):
        t = min(1, max(0, (y - 362) / 92))
        c = (int(242 - 88 * t), int(243 - 85 * t), int(245 - 79 * t), 255)
        for x in range(64, 720): gpix[x, y] = c
    canvas.paste(g, (0, 0), tmp)
    d.rectangle((64, 486, 290, 488), fill=(201, 204, 209))
    d.text((66, 510), 'TALLER EN AGUASCALIENTES  ·  ENTREGAS EN TODO MÉXICO', font=f2, fill=(201, 204, 209))
    canvas.convert('RGB').save(OUT + 'og.jpg', quality=88)
    print('og', canvas.size)

def emit():
    emit_one('hero', detex('hero'), [480, 960, 1600])
    emit_one('tarja', detex('tarja'), [480, 960])
    emit_one('tarja-gab', detex('tarja-gab'), [480, 960])
    emit_one('cajones', detex('cajones'), [480, 960])
    emit_one('carga', detex('carga'), [480, 960, 1600])
    emit_one('truck-tj', detex('truck-tj'), [480, 960])
    emit_one('banda', detex('banda'), [480, 960])
    og()

def thumbs():
    """Correccion 2: miniaturas 4:5 (144x180) para la tira del pie, sacadas de las webp ya publicadas."""
    T = [('carrito', 'carrito-a-960', (0.5, 0.55)), ('remolque', 'carrito-c-960', (0.5, 0.6)), ('redilas', 'redilas-b-960', (0.5, 0.45)),
         ('trailer', 'truck-tj-820', (0.6, 0.6)), ('campana', 'campana-960', (0.5, 0.25)), ('barra', 'frente-1112', (0.5, 0.6)),
         ('vitrina', 'hero-1132', (0.5, 0.5))]
    for name, src, (fx, fy) in T:
        im = Image.open(OUT + src + '.webp').convert('RGB')
        tw = min(im.width, round(im.height * 4 / 5)); th = round(tw * 5 / 4)
        x = round((im.width - tw) * fx); y = round((im.height - th) * fy)
        im.crop((x, y, x + tw, y + th)).resize((144, 180), Image.LANCZOS).save(f'{OUT}th-{name}.webp', 'WEBP', quality=82, method=6)
        print('thumb', name)

def r2():
    prep(R2); up(R2)
    emit_one('carga2', detex('carga2'), [480, 960])
    emit_one('frente', detex('frente'), [480, 960, 1600])
    thumbs()

if __name__ == '__main__':
    for step in sys.argv[1:] or ['prep']:
        {'prep': prep, 'up': up, 'emit': emit, 'og': og, 'r2': r2, 'thumbs': thumbs}[step]()
