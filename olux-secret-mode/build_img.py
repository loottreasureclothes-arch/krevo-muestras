#!/usr/bin/env python3
"""Genera los derivados de img/ desde research/fotos/. Idempotente: se puede correr las veces que sea.

Todos los recortes estan medidos sobre el ORIGINAL y anotados aqui, para que el siguiente que toque
la pagina no tenga que adivinar (ese fue el bug de la ronda 1: letrero.webp salia con letras cortadas
ya en el archivo fuente).

  fachada-tanyveth-secret-mode-google.jpg  1600 x 1257
    letrero real (rotulo "SM secret mode")  x 302-548, y 410-555
    ventana izquierda (CARTERAS)            x 176-507, y 845-1195
    ventana centro   (CALZADO)              x 615-906, y 850-1190
    ventana derecha  (ROPA)                 x 952-1329, y 848-1195

  NO se recorta ningun letrero ni logo: el encendido del rotulo (Beat A del hero) ya NO usa un
  archivo aparte, lo hace el propio hero con una segunda capa de la MISMA fachada y un clip-path
  calculado en JS (sections/10-hero.js). Por eso aqui no se genera letrero.webp.
"""
import os
from PIL import Image

os.chdir(os.path.dirname(os.path.abspath(__file__)))
FOTOS = "research/fotos/"


def sal(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return path


def recorte(src, box, ancho, dest, calidad=86):
    im = Image.open(FOTOS + src).convert("RGB")
    c = im.crop(box)
    if ancho and c.width != ancho:
        c = c.resize((ancho, round(c.height * ancho / c.width)), Image.LANCZOS)
    c.save(sal(dest), quality=calidad, method=6)
    print(dest, c.size)


def logo_alfa(ancho, dest, banda=None):
    """El logo real es un JPG de letras blancas sobre cuadro negro. Se le quita el negro pasando la
    luminancia a canal alfa (letras blancas puras, fondo transparente) y se recorta a la mancha de
    tinta, para que a 26 px de alto en el header se vea el nombre y no un cuadro.

    Renglones de tinta medidos sobre el JPG de 1080: acento de la O y 254-329, cuerpo de "Olux"
    344-600, "AMERICAN STYLE" 655-711. banda=(y0,y1) deja solo uno de esos renglones (el header
    lleva solo "Olux": a 26 px de alto el renglon chico se vuelve una mancha ilegible)."""
    im = Image.open(FOTOS + "logo-olux-american-style-1080.jpg").convert("L")
    if banda:
        im = im.crop((0, banda[0], im.width, banda[1]))
    caja = im.point(lambda v: 255 if v > 40 else 0).getbbox()
    a = im.crop(caja)
    blanco = Image.new("RGB", a.size, (255, 255, 255))
    out = blanco.convert("RGBA")
    out.putalpha(a.point(lambda v: min(255, int(v * 1.12))))
    k = ancho / out.width
    out = out.resize((ancho, max(1, round(out.height * k))), Image.LANCZOS)
    out.save(sal(dest), lossless=False, quality=92, method=6)
    print(dest, out.size, "recorte de tinta", caja)


def tenis_x4():
    """Sube x4 con Real-ESRGAN local (gratis, sin IA generativa) el exhibidor real de tenis y
    devuelve la imagen de 2304 x 4096. Se cachea en /tmp para no repetir los 40 s."""
    import subprocess, tempfile
    cache = os.path.join(tempfile.gettempdir(), "olux-tenis-x4.png")
    if not os.path.exists(cache):
        tool = os.path.abspath("../../tools/realesrgan")
        subprocess.run([os.path.join(tool, "realesrgan-ncnn-vulkan"),
                        "-i", os.path.abspath(FOTOS + "interior-exhibidor-tenis-google.jpg"),
                        "-o", cache, "-n", "realesrgan-x4plus", "-s", "4", "-m", "models"],
                       cwd=tool, check=True, capture_output=True)
    return Image.open(cache).convert("RGB")


def recorte_tenis(im4, box, dest, anchos=(760, 380)):
    """box va en coordenadas del ORIGINAL de 576 x 1024; se recorta sobre el x4."""
    c = im4.crop(tuple(v * 4 for v in box))
    for a in anchos:
        d = dest.replace("{a}", str(a))
        c.resize((a, round(c.height * a / c.width)), Image.LANCZOS).save(sal(d), quality=84, method=6)
        print(d, a)


if __name__ == "__main__":
    # --- Calzado: tres recortes REALES de su exhibidor de tenis (ronda 2 del 20 sep, tarde) ----
    # El inspector tumbo la seccion "02 Calzado" por ser lista de texto sin una sola foto. Se
    # volvio a barrer el archivo de internet (CDX de imagenes de secretmodelegante.com): siguen
    # siendo 24 imagenes en total, 14 de producto, NINGUNA de calzado, y las fotos de las fichas
    # dan 404 una por una (reverificado hoy con IMG_8698.jpg y sus miniaturas). Asi que la unica
    # foto real de calzado que existe es SU exhibidor, el de Google Maps. De ahi salen tres
    # recortes cerrados a pares concretos, subidos x4 con Real-ESRGAN local.
    # Cajas medidas sobre el ORIGINAL 576 x 1024. Texto quemado del sticker de Instagram:
    # "Visitando tu Boutique" y=130-180, "Ubicados en Aguascalientes" y=205-240,
    # "Envios a toda la Republica" y=845-880. Zona limpia: y 250-835. Las tres cajas caen dentro.
    _im4 = tenis_x4()
    recorte_tenis(_im4, (60, 420, 250, 610), "img/calzado/par-1-{a}.webp")   # blanco y negro
    recorte_tenis(_im4, (40, 640, 230, 830), "img/calzado/par-2-{a}.webp")   # azul marino con franja
    recorte_tenis(_im4, (350, 250, 540, 440), "img/calzado/par-3-{a}.webp")  # rosa y crema

    # --- Dos nombres: la fachada firmada Olux (foto chica, enmarcada) -------------------
    # y 18-478: se van los coches, la banqueta, los postes y los edificios vecinos de abajo.
    # No se corta el recuadro del logo Olux (x 14-266, y 27-272): el logo nunca se recorta.
    # La foto navideña SALIO de la pagina el 20 sep 2026 (ronda 3): traia el logo "Olux American
    # Style" quemado en un recuadro blanco encima, tapaba el letrero real y ademas es de temporada.
    # El CHECKLIST prohibe texto quemado. La seccion "Dos nombres" se explica sola con la placa.

    # --- Marca: el logo con alfa (sin cuadro negro, sin mix-blend-mode) ------------------
    logo_alfa(300, "img/brand/logo-alfa-olux-300.webp", banda=(240, 620))  # header: solo "Olux"
    logo_alfa(1200, "img/brand/logo-alfa-1200.webp")                        # cierre: el lockup entero

    # --- El banner del hero: NO lo genera este script ------------------------------------
    # img/hero/banner-m.webp (900 x 812) y banner-d.webp (1440 x 1300) los pone el ORQUESTADOR
    # a mano, con el encargo de IMAGEN-HERO.md. Este script no los toca.
    #
    # BORRADOS en la ronda 2 del 20 sep (tarde) porque no los referenciaba ningun HTML ni CSS y
    # se iban a publicar de a gratis (769 KB): img/aparador/ (ventanas-m2, ventanas-d, calzado,
    # ropa — el aparador detras de tabs ya no existe) y img/hero/tienda-m.webp / tienda-d.webp
    # (la portada provisional, que el orquestador ya reemplazo por banner-*.webp).
    # CARTERAS y MOCHILAS: la ventana que les tocaba en la fachada es la puerta de vidrio de la
    # entrada y con ese angulo solo refleja un coche y la calle, cero producto visible. No se usa.
