from PIL import Image
import os
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"
IMG = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/img"
logo = Image.open(f"{GEN}/logo-src.png").convert("RGB")
# recorta solo el icono (la ola), sin el texto EVERCLEAN, para favicon cuadrado
w,h = logo.size
icon = logo.crop((int(w*0.18), int(h*0.05), int(w*0.86), int(h*0.62)))
# fondo marino solido, icono centrado
bg = Image.new("RGB", (600,600), (0,0,45))
ic = icon.resize((520, int(520*icon.size[1]/icon.size[0])), Image.LANCZOS)
bg.paste(ic, ((600-ic.size[0])//2, (600-ic.size[1])//2 - 20))
for size, name in [(32,"favicon-32.png"),(180,"apple-touch-icon.png"),(512,"og-icon.png")]:
    bg.resize((size,size), Image.LANCZOS).save(f"{IMG}/{name}")
    print(name, size)
