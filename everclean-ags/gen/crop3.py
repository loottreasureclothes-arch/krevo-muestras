from PIL import Image
import os
SRC = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/research/fotos"
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"
silla = Image.open(f"{SRC}/catalogo_silla-metal-antes-despues_ig.jpg")
silla_antes = silla.crop((10, 250, 190, 640))
silla_antes.save(f"{GEN}/silla-antes.webp", quality=95)
print(silla_antes.size)
