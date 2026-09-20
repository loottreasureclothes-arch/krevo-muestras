"""Recortes nuevos (correccion 20 sep 2026, REVISION-1 cambios 2, 3, 6 y 13).
Reglas: las dos mitades de cada par salen EXACTAMENTE del mismo tamano, sin la banda
blanca de la plantilla del diptico, sin etiquetas quemadas y sin el logotipo pegado.
Nada de IA generativa: solo recorte de sus propias fotos (Real-ESRGAN x4 unicamente en
el sofa seccional, que es una de las 3 fotos clave que autoriza la hoja)."""
from PIL import Image
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "research", "fotos")
GEN = os.path.join(BASE, "gen")

def cut(src, box, name, mode="PNG"):
    im = Image.open(os.path.join(SRC, src)).convert("RGB").crop(box)
    p = os.path.join(GEN, name)
    im.save(p, quality=96)
    print(name, im.size, box)
    return im

SOFA = "catalogo_sofa-seccional-antes-despues_fb.jpg"      # 414x414
SILLA = "catalogo_silla-metal-antes-despues_ig.jpg"        # 640x640
COLL = "catalogo_collage-sillas-antes-despues_ig.jpg"      # 640x633
LOGO = "logo_everclean_extraido-flyer.jpg"                 # 610x580

# --- PAR 1 (grande): sala seccional. Franja limpia x196-320 en las dos mitades:
#     a la izquierda de 196 vive la etiqueta ANTES/DESPUES, a la derecha de 320 el logotipo.
#     Las dos mitades terminan en la misma linea (el sofa apoya al ras del borde de abajo).
cut(SOFA, (196, 24, 320, 190), "p1-antes.png")
cut(SOFA, (196, 224, 320, 390), "p1-despues.png")
# --- Catalogo "Salas y sillones": encuadre MAS ABIERTO del mismo seccional limpio (16:9),
#     recorte distinto al del momento firma para no quemarlo.
cut(SOFA, (70, 250, 319, 390), "cat-salas.png")

# --- PAR 2 (chico): silla de metal. El logotipo cubre hasta y=257 en la mitad de arriba.
cut(SILLA, (20, 260, 300, 632), "p2-antes.png")
cut(SILLA, (340, 72, 620, 444), "p2-despues.png")

# --- PAR 3 (chico): silla negra del collage (cuadrante de abajo a la derecha).
#     Es el unico par del collage que es vertical: embona bien y no se estira.
#     El logotipo llega a y=365 y las etiquetas empiezan en y=570.
cut(COLL, (337, 372, 478, 566), "p3-antes.png")
cut(COLL, (487, 372, 628, 566), "p3-despues.png")

# --- Catalogo "Sillas": cuadrante de las sillas turquesa YA LIMPIAS (4:3). No se usa en ningun
#     otro lado de la pagina.
cut(COLL, (125, 158, 290, 282), "cat-sillas.png")

# --- Logotipo al borde del logotipo (sin el marco gris del flyer)
cut(LOGO, (66, 138, 520, 450), "logo-tight.png")
