from PIL import Image
import os
SRC = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/research/fotos"
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"

def sv(im, name):
    p = os.path.join(GEN, name)
    im.save(p, quality=95)
    print(name, im.size)

sofa = Image.open(f"{SRC}/catalogo_sofa-seccional-antes-despues_fb.jpg")
sofa_antes = sofa.crop((0, 66, 414, 207))
sv(sofa_antes, "sofa-antes-src.png")

silla = Image.open(f"{SRC}/catalogo_silla-metal-antes-despues_ig.jpg")
silla_antes = silla.crop((10, 210, 260, 640))
sv(silla_antes, "silla-antes.webp")
