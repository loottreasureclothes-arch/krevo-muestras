#!/usr/bin/env python3
"""Baja en grande las fotos de Maps sacadas con maps_fotos.js y arma _hoja.jpg numerada.
Uso: maps_fotos.py <urls.txt> <carpeta-fotos>   (descarta las de menos de 600 px de lado mayor)"""
import sys, os, subprocess
from PIL import Image, ImageDraw
urls = [u.strip() for u in open(sys.argv[1]) if u.strip().startswith('http')]
out = sys.argv[2]; os.makedirs(out, exist_ok=True); ok = []
for i, u in enumerate(urls, 1):
    f = os.path.join(out, f'maps-{i:02d}.jpg')
    subprocess.run(['curl', '-s', '-m', '20', '-A', 'Mozilla/5.0', '-o', f, u.split('=')[0] + '=s2048'])
    try:
        im = Image.open(f); im.load()
        if max(im.size) < 600: os.remove(f); continue
        ok.append((f, im.size))
    except Exception:
        if os.path.exists(f): os.remove(f)
print(f'{len(ok)} fotos utiles de {len(urls)}')
for f, s in ok: print(os.path.basename(f), s)
th = []
for f, s in ok:
    im = Image.open(f).convert('RGB'); im.thumbnail((260, 260))
    c = Image.new('RGB', (260, 280), (30, 30, 30)); c.paste(im, ((260 - im.width) // 2, 0))
    ImageDraw.Draw(c).text((6, 262), os.path.basename(f), fill=(255, 255, 0)); th.append(c)
if th:
    cols = 6; rows = (len(th) + cols - 1) // cols
    h = Image.new('RGB', (cols * 264, rows * 284), (10, 10, 10))
    for i, c in enumerate(th): h.paste(c, ((i % cols) * 264, (i // cols) * 284))
    h.thumbnail((1600, 1600)); h.save(os.path.join(out, '_hoja-maps.jpg'), quality=70)
