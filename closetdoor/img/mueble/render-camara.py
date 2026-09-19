from PIL import Image, ImageDraw, ImageFilter
import os
os.chdir('/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/closetdoor')
src = Image.open('img/hd/cd10-2400.webp').convert('RGB')   # 2400x3096
W,H = src.size

# silueta de la isla + escalón (coordenadas de la foto original)
POLY = [(52,1772),(560,1688),(1452,1820),(1452,2513),(1952,2700),(1990,H),(0,H),(0,1800)]
mask = Image.new('L',(W,H),0)
ImageDraw.Draw(mask).polygon(POLY, fill=255)
# el borde se mete hacia adentro (erosionar) y luego se suaviza: nada de halos
mask = mask.filter(ImageFilter.MinFilter(9)).filter(ImageFilter.GaussianBlur(3))
fg_full = src.copy(); fg_full.putalpha(mask)

OUT='img/mueble'
def save(img, name, q=82):
    img.save(f'{OUT}/{name}', 'WEBP', quality=q, method=6)
    print(name, img.size, os.path.getsize(f'{OUT}/{name}')//1024, 'KB')

# --- compu: banda horizontal 2400x1500 (16:10), y 750..2250 ---
box=(0,750,2400,2250)
wide = src.crop(box); wide_fg = fg_full.crop(box)
save(wide, 'wide-2400.webp')
save(wide.resize((2000,1250), Image.LANCZOS), 'wide-2000.webp')
save(wide.resize((1400,875), Image.LANCZOS), 'wide-1400.webp')
save(wide_fg, 'wide-fg-2400.webp', 80)

# --- celular: vertical, x 120..1880 completo de alto ---
boxm=(120,0,1880,H)
tall = src.crop(boxm); tall_fg = fg_full.crop(boxm)
mw=1100; mh=round(tall.height*mw/tall.width)
save(tall.resize((mw,mh), Image.LANCZOS), 'tall-1100.webp')
save(tall_fg.resize((mw,mh), Image.LANCZOS), 'tall-fg-1100.webp', 80)
