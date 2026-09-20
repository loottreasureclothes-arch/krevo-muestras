from PIL import Image
import os
SRC = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/research/fotos"
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"
os.makedirs(GEN, exist_ok=True)

def sv(im, name):
    p = os.path.join(GEN, name)
    im.save(p, quality=95)
    print(name, im.size)

# HERO: recorte x 95-368 (tira watermark izq), altura completa 368
hero = Image.open(f"{SRC}/hero-candidato_limpieza-vapor-sofa_ig.jpg")
hero_c = hero.crop((95, 0, 368, 368))
sv(hero_c, "hero-src.png")

# SOFA SECCIONAL 414x414 -> antes (y0-207, quita label) / despues (y207-414, quita label+logo)
sofa = Image.open(f"{SRC}/catalogo_sofa-seccional-antes-despues_fb.jpg")
sofa_antes = sofa.crop((0, 44, 414, 207))
sofa_despues = sofa.crop((0, 283, 414, 414))
sv(sofa_antes, "sofa-antes-src.png")
sv(sofa_despues, "sofa-despues-src.png")

# SILLA METAL 640x640 -> antes (silla sucia, izq, sin label) / despues (silla limpia, der, sin label ni logo)
silla = Image.open(f"{SRC}/catalogo_silla-metal-antes-despues_ig.jpg")
silla_antes = silla.crop((10, 185, 265, 640))
silla_despues = silla.crop((340, 0, 640, 455))
sv(silla_antes, "silla-antes.webp")
sv(silla_despues, "silla-despues.webp")

# COLLAGE SILLAS 640x633 -> cuadrante superior izq (turquesa): antes / despues
col = Image.open(f"{SRC}/catalogo_collage-sillas-antes-despues_ig.jpg")
turq_antes = col.crop((95, 15, 320, 150))
turq_despues = col.crop((95, 235, 320, 315))
sv(turq_antes, "turq-antes.webp")
sv(turq_despues, "turq-despues.webp")

# LOGO 610x580 (recorta el marco gris claro exterior, deja el logo con su fondo blanco)
logo = Image.open(f"{SRC}/logo_everclean_extraido-flyer.jpg")
logo_c = logo.crop((18, 15, 592, 565))
sv(logo_c, "logo-src.png")
