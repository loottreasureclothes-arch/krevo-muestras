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


if __name__ == "__main__":
    # --- El aparador: las tres ventanas -------------------------------------------------
    # Celular: recorte mas alto (390/212 en vez de 390/130) para que el componente firma no quede
    # de liston. Incluye azulejo arriba y banqueta abajo, con margen a los lados para que NINGUNA
    # ventana toque el borde. Las zonas de CSS estan medidas sobre ESTE recorte.
    recorte("fachada-tanyveth-secret-mode-google.jpg", (135, 565, 1405, 1257), 1270,
            "img/aparador/ventanas-m2.webp")
    # YA HECHOS Y APROBADOS en la ronda 1, este script NO los vuelve a escribir (re-encodear de
    # balde solo cambia bytes y rompe el cache del celular de Emanuel). Recortes, de memoria:
    #   img/aparador/ventanas-d.webp  x130-1500, y800-1257 -> 2200 px de ancho (el liston ancho,
    #                                 en compu si funciona; el inspector verifico que alinea)
    #   img/aparador/calzado.webp     interior-exhibidor-tenis, y290-830 (sin el texto quemado)
    #   img/hero/fachada-m.webp       ~x252-902, alto completo -> 900 x 1740
    #   img/hero/fachada-d.webp       original completo -> 2000 x 1581

    # --- Dos nombres: la fachada firmada Olux (foto chica, enmarcada) -------------------
    # y 18-478: se van los coches, la banqueta, los postes y los edificios vecinos de abajo.
    # No se corta el recuadro del logo Olux (x 14-266, y 27-272): el logo nunca se recorta.
    # La foto navideña SALIO de la pagina el 20 sep 2026 (ronda 3): traia el logo "Olux American
    # Style" quemado en un recuadro blanco encima, tapaba el letrero real y ademas es de temporada.
    # El CHECKLIST prohibe texto quemado. La seccion "Dos nombres" se explica sola con la placa.

    # --- Marca: el logo con alfa (sin cuadro negro, sin mix-blend-mode) ------------------
    logo_alfa(300, "img/brand/logo-alfa-olux-300.webp", banda=(240, 620))  # header: solo "Olux"
    logo_alfa(1200, "img/brand/logo-alfa-1200.webp")                        # cierre: el lockup entero

    # --- Ronda 2 (FEEDBACK-2, 20 sep 2026): "no me gusta la foto de portada" -------------
    # Portada nueva, celular Y compu: ya no la fachada con el letrero (esa se queda abajo, en el
    # aparador y en la seccion de los dos nombres — ahi si le gusto). Se usa el mismo exhibidor
    # real de tenis (interior-exhibidor-tenis-google.jpg) que ya daba calzado.webp, con un recorte
    # MAS ALTO (y280-800, se van los dos overlays de Instagram: "Visitando tu Boutique" arriba y
    # "Envios a toda la Republica" abajo). La fuente mide solo 576 px de ancho: se reescala con
    # LANCZOS (mismo metodo que recorte(), no es IA, es el mismo resize que ya hacia este script)
    # a 900 px para celular y 1440 para compu — se ve un poco mas suave que una foto nativa de ese
    # ancho, pero limpia, sin texto y sin el coche/cables de las otras dos fotos reales que
    # quedaban. img/hero/fachada-m.webp y fachada-d.webp (el hero viejo) YA NO SE USAN: se borraron.
    recorte("interior-exhibidor-tenis-google.jpg", (0, 280, 576, 800), 900, "img/hero/tienda-m.webp")
    recorte("interior-exhibidor-tenis-google.jpg", (0, 280, 576, 800), 1440, "img/hero/tienda-d.webp")

    # --- Ronda 2: fotos reales por aparador para los tres bloques (ya no detras de tabs) -------
    # ROPA: recorte de la ventana derecha de la fachada, mas cerrado que el de la ronda 1 para
    # perder el coche reflejado y quedarse con la ropa colgada (real, aunque es principalmente
    # ropa de nina: es lo que el escaparate real trae hoy).
    recorte("fachada-tanyveth-secret-mode-google.jpg", (1050, 850, 1329, 1195), 560, "img/aparador/ropa.webp")
    # CARTERAS y MOCHILAS: la ventana que le toca (izquierda) es la puerta de vidrio de la entrada
    # y con este angulo solo refleja un coche y la calle, cero producto visible (visto en
    # storefront_wide.jpg). NO se usa: sale un coche en vidrio, igual que la navidena que ya se
    # rechazo. Se deja SIN foto (marcador honesto en el HTML) hasta que el dueno mande una.
    # calzado.webp NO se toca: ya esta bien (aprobado en REVISION-1).
