from PIL import Image
import os
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"
IMG = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/img"

def out(src, dst, w, h=None, q=82):
    im = Image.open(os.path.join(GEN, src)).convert("RGB")
    ow, oh = im.size
    if h is None:
        h = round(oh * w / ow)
    im = im.resize((w, h), Image.LANCZOS)
    p = os.path.join(IMG, dst)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    im.save(p, "WEBP", quality=q, method=6)
    print(dst, im.size, os.path.getsize(p), "bytes")

# HERO (tope celular 370 @2x = 740; compu 520, retina 1040 pero fuente ya x4 llega a 764 max -> topamos a lo que da limpio)
out("hero-x4.png", "hero/hero-m.webp", 740)
out("hero-x4.png", "hero/hero-d.webp", 1040)

# SOFA (tope celular 414 @2x=828; compu 560, retina 1120 -> fuente x4 da 1656 ancho, alcanza)
out("sofa-antes-x4.png", "pruebas/sofa-antes-m.webp", 828)
out("sofa-antes-x4.png", "pruebas/sofa-antes-d.webp", 1120)
out("sofa-despues-x4.png", "pruebas/sofa-despues-m.webp", 828)
out("sofa-despues-x4.png", "pruebas/sofa-despues-d.webp", 1120)

# SILLA METAL y TURQUESA: nativos, solo 1x/ @2x de su propio tamano (sin upscale IA)
out("silla-antes.webp", "pruebas/silla-antes.webp", 250)
out("silla-despues.webp", "pruebas/silla-despues.webp", 300)
out("turq-antes.webp", "pruebas/turq-antes.webp", 225)
out("turq-despues.webp", "pruebas/turq-despues.webp", 225)

# LOGO: 610 nativo aguanta -> chip header y footer
out("logo-src.png", "logo/logo-header.webp", 256, q=90)
out("logo-src.png", "logo/logo-footer.webp", 560, q=90)
