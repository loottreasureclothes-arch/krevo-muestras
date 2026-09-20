"""Exporta los recortes corregidos (REVISION-1). Cada par sale con las dos mitades EN LA MISMA
PROPORCION. Nada a sangre, nada inventado."""
from PIL import Image
import os
B = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
G, I = os.path.join(B, "gen"), os.path.join(B, "img")

def out(src, dst, w=None, q=84):
    im = Image.open(os.path.join(G, src)).convert("RGB")
    if w and w != im.width:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    p = os.path.join(I, dst)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    im.save(p, "WEBP", quality=q, method=6)
    print(dst, im.size, round(im.width / im.height, 3), os.path.getsize(p), "bytes")

# Par 1 (grande, sofa seccional) — x4 autorizado por la hoja para esta foto clave
out("p1-antes-x4.png", "pruebas/sofa-antes.webp", 496, q=86)
out("p1-despues-x4.png", "pruebas/sofa-despues.webp", 496, q=86)
# Par 2 (silla de metal) — nativo, sin upscale
out("p2-antes.png", "pruebas/silla-antes.webp", 280)
out("p2-despues.png", "pruebas/silla-despues.webp", 280)
# Par 3 (silla negra del collage) — nativo
out("p3-antes.png", "pruebas/negro-antes.webp", 282)
out("p3-despues.png", "pruebas/negro-despues.webp", 236)
# Catalogo
out("cat-salas-x4.png", "catalogo/salas.webp", 800)
out("cat-sillas.png", "catalogo/sillas.webp", 296)
out("cat-colchon.png", "catalogo/colchon.webp", 364)
# Logotipo recortado al borde del logotipo
out("logo-tight.png", "logo/logo-header.webp", 192, q=92)
out("logo-tight.png", "logo/logo-footer.webp", 480, q=92)
