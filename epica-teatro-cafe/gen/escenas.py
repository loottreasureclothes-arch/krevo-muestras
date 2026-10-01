#!/usr/bin/env python3
"""Corrección 2: recortes de ESCENA REAL (sin texto quemado) sacados de dos posters de Épica.
- escena-off-shakespeare: actores, mesita de café y maleta roja (ig-10, poster del 19 sep). El "19 de Sep"
  que asomaba arriba a la derecha se borra con cv2.inpaint (relleno local del telón de fondo, sin IA).
- escena-jean: el escenario con el cenital azul y el foco rojo (ig-07), sin las letras de arriba ni las de abajo.
Fuente: las PNG x4 de Real-ESRGAN en SCR/up (mismas de gen/imagenes.py). Corre: python3 gen/escenas.py"""
import os
import numpy as np, cv2
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCR = '/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/epica-work'
IMG = os.path.join(HERE, 'img')
K = 2048 / 960  # las PNG x4 miden 2048 de ancho; las coordenadas se anotan sobre el poster a 960

def export(im, slug, widths):
    for w in widths:
        w2 = min(w, im.width)
        out = im.resize((w2, round(im.height * w2 / im.width)), Image.LANCZOS)
        if w2 <= 800: out = out.filter(ImageFilter.UnsharpMask(radius=0.8, percent=35, threshold=2))
        out.save(os.path.join(IMG, f'{slug}-{w2}.webp'), 'WEBP', quality=84, method=6)
        print(slug, w2, out.size)

# ---------- Off Shakespeare: escena ----------
# Corrección 4: el x4 puro dejaba las caras lisas "de plástico". Se mezcla 45 % Real-ESRGAN con 55 % del
# poster original subido con LANCZOS, más un grano fino (sigma 2.2) para que la piel no se vea encerada.
_up = Image.open(os.path.join(SCR, 'up', 'ig-10.png')).convert('RGB')
_or = Image.open(os.path.join(HERE, 'research', 'fotos', 'ig-10.jpg')).convert('RGB').resize(_up.size, Image.LANCZOS)
a = np.array(Image.blend(_or, _up, 0.45))
x0, y0, x1, y1 = int(20 * K), int(386 * K), int(840 * K), int(985 * K)
c = a[y0:y1, x0:x1].copy()
bx0, by1 = int((620 - 20) * K), int((505 - 386) * K)          # caja de "19 de Sep"
lum = c[0:by1, bx0:].astype(int).sum(2) / 3
m = np.zeros(c.shape[:2], np.uint8)
m[0:by1, bx0:] = (lum > 95).astype(np.uint8) * 255
m = cv2.dilate(m, np.ones((9, 9), np.uint8), iterations=2)
c = cv2.cvtColor(cv2.inpaint(cv2.cvtColor(c, cv2.COLOR_RGB2BGR), m, 15, cv2.INPAINT_TELEA), cv2.COLOR_BGR2RGB)
c = c.astype(float) + np.random.default_rng(10).normal(0, 2.2, c.shape)
export(Image.fromarray(np.clip(c, 0, 255).astype(np.uint8)), 'escena-off-shakespeare', [800, 1280, 1750])

# ---------- Jean de Blues: escenario con el foco ----------
a = Image.open(os.path.join(SCR, 'up', 'ig-07.png')).convert('RGB')
j = a.crop((0, int(432 * K), int(720 * K), int(765 * K)))
export(j, 'escena-jean', [800, 1280, 1536])
print('ok')
