#!/usr/bin/env python3
"""Genera las tarjetas de producto (125 del catálogo + 12 del slider del hero) a partir de
sections/03-catalogo-data.js. NUNCA se escriben a mano: este script las arma y las inyecta
entre marcadores HTML en sections/01-hero.html y sections/03-catalogo.html.
Corre ANTES de build.py:  python3 gen_cards.py && python3 build.py
Idempotente: se puede correr las veces que haga falta si cambian los datos."""
import json
import os
import re
import html

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DATA_FILE = "sections/03-catalogo-data.js"
HERO_FILE = "sections/01-hero.html"
CAT_FILE = "sections/03-catalogo.html"

# Orden curado de "Lo más pedido" (12 piezas): mismo orden en el slider del hero y en el
# chip "Lo más pedido" del catálogo. El número es el rango (0 = primero) para data-top.
TOP12 = [71, 31, 30, 21, 33, 6, 14, 35, 76, 101, 111, 55]

# Líneas donde "medidas especiales bajo pedido" aplica de forma clara (hechos.md #47-48:
# medida estándar con especiales bajo pedido; equipales a medida para restaurantes y
# espacios exclusivos). Asientos individuales y complementos (buró, biombo, camas ya con
# tamaño estándar) se dejan sin la etiqueta para no repetirla de más.
MEDIDA_LINES = {"cantineros", "comedores", "mesas", "barras", "salas"}

# Hueco de las 9 piezas que todavia no tienen foto: silueta del logo en muy bajo contraste y
# "Foto en camino". Nunca el cuadro rayado (salian 6 seguidos en el chip Comedores).
NOIMG = ('<img class="eq-pcard-noimg-logo" src="img/logo.png" alt="" aria-hidden="true" '
         'width="420" height="174" loading="lazy" decoding="async">'
         '<span class="eq-pcard-noimg-t">Foto en camino'
         '<small>Pregúntanos por WhatsApp</small></span>')


def load_data():
    raw = open(DATA_FILE, encoding="utf-8").read()
    m = re.search(r"window\.EQ_CATALOGO\s*=\s*(\[.*\])\s*;", raw, re.S)
    if not m:
        raise SystemExit("No pude leer window.EQ_CATALOGO de " + DATA_FILE)
    return json.loads(m.group(1))


def money(n):
    return "${:,}".format(int(n))


def price_txt(p):
    """Rango completo: solo para la hoja de detalle, ahi si cabe."""
    if len(p) > 1 and p[1] != p[0]:
        return money(p[0]) + " a " + money(p[1])
    return money(p[0])


def price_card(p):
    """En la tarjeta SIEMPRE el formato corto ("desde $5,800 + IVA"): el rango partia el
    "+ IVA" a otra linea en la mitad de las piezas y se veia descuidado (REVISION-10 #6)."""
    if len(p) > 1 and p[1] != p[0]:
        return "desde " + money(p[0])
    return money(p[0])


def esc(s):
    return html.escape(s or "", quote=True)


def tag_for(i, c, top_rank):
    if top_rank is not None:
        return "Más pedido"
    if c in MEDIDA_LINES:
        return "A medida"
    return None


def check_img(path):
    if path and not os.path.exists(path):
        print("AVISO: falta la imagen " + path)


def catalog_card(i, item, top_rank):
    n, c, p, m, img = item["n"], item["c"], item["p"], item.get("m") or "", item.get("img")
    tag = tag_for(i, c, top_rank)
    top_attr = ' data-top="{}"'.format(top_rank) if top_rank is not None else ""
    if img:
        check_img(img)
        ph = ('<img class="eq-pcard-img" src="{img}" alt="{n} de Equipales Imperial" '
              'width="600" height="600" loading="lazy" decoding="async">').format(img=esc(img), n=esc(n))
        ph_cls = "eq-pcard-ph"
    else:
        ph = NOIMG
        ph_cls = "eq-pcard-ph is-noimg"
    tag_html = '<span class="eq-pcard-tag">{}</span>'.format(tag) if tag else ""
    return (
        '<li class="eq-pcard" data-c="{c}" data-i="{i}"{top_attr}{noimg_attr}>\n'
        '  <div class="{ph_cls}">{ph}{tag_html}</div>\n'
        '  <div class="eq-pcard-body">\n'
        '    <h3 class="eq-pcard-name">{n}</h3>\n'
        '    <p class="eq-pcard-price eq-price">{price} <small>+ IVA</small></p>\n'
        '    <p class="eq-pcard-meta">{m}</p>\n'
        '    <div class="eq-pcard-row">\n'
        '      <button type="button" class="eq-pcard-add" data-i="{i}" aria-pressed="false" '
        'aria-label="Agregar {n} a mi pedido"><svg aria-hidden="true"><use href="#i-plus"/></svg>'
        '<span class="eq-pcard-add-t">Agregar</span></button>\n'
        '      <button type="button" class="eq-pcard-view" data-open="{i}" aria-label="Ver {n}">Ver</button>\n'
        '    </div>\n'
        '  </div>\n'
        '</li>'
    ).format(c=esc(c), i=i, top_attr=top_attr, noimg_attr=("" if img else ' data-noimg="1"'),
              ph_cls=ph_cls, ph=ph, tag_html=tag_html, n=esc(n), price=price_card(p), m=esc(m))


def hero_card(i, item):
    n, c, p, img = item["n"], item["c"], item["p"], item.get("img")
    if img:
        check_img(img)
        ph = ('<img class="eq-pcard-img" src="{img}" alt="{n} de Equipales Imperial" '
              'width="600" height="600" loading="lazy" decoding="async">').format(img=esc(img), n=esc(n))
        ph_cls = "eq-pcard-ph"
    else:
        ph = NOIMG
        ph_cls = "eq-pcard-ph is-noimg"
    return (
        '<li class="eq-pcard" data-c="{c}" data-i="{i}">\n'
        '  <div class="{ph_cls}">{ph}<span class="eq-pcard-tag">Más pedido</span></div>\n'
        '  <div class="eq-pcard-body">\n'
        '    <h3 class="eq-pcard-name">{n}</h3>\n'
        '    <div class="eq-pcard-row">\n'
        '      <p class="eq-pcard-price eq-price">desde {price} <small>+ IVA</small></p>\n'
        '      <button type="button" class="eq-pcard-add eq-pcard-add--icon" data-i="{i}" '
        'aria-pressed="false" aria-label="Agregar {n} a mi pedido"><svg aria-hidden="true">'
        '<use href="#i-plus"/></svg></button>\n'
        '    </div>\n'
        '  </div>\n'
        '</li>'
    ).format(c=esc(c), i=i, ph_cls=ph_cls, ph=ph, n=esc(n), price=money(p[0]))


def inject(path, marker, block):
    src = open(path, encoding="utf-8").read()
    start, end = "<!--{}:START-->".format(marker), "<!--{}:END-->".format(marker)
    pat = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    if not pat.search(src):
        raise SystemExit("No encontré los marcadores {} en {}".format(marker, path))
    out = pat.sub(start + "\n" + block + "\n" + end, src)
    open(path, "w", encoding="utf-8").write(out)


def main():
    data = load_data()
    if len(data) != 125:
        print("AVISO: se esperaban 125 piezas y hay {}".format(len(data)))
    top_rank = {idx: rank for rank, idx in enumerate(TOP12)}

    cat_cards = [catalog_card(i, item, top_rank.get(i)) for i, item in enumerate(data)]
    inject(CAT_FILE, "CARDS:CATALOGO", "\n".join(cat_cards))
    print("Catálogo: {} tarjetas escritas en {}".format(len(cat_cards), CAT_FILE))

    hero_cards = [hero_card(i, data[i]) for i in TOP12]
    inject(HERO_FILE, "CARDS:HERO", "\n".join(hero_cards))
    print("Hero: {} tarjetas escritas en {}".format(len(hero_cards), HERO_FILE))


if __name__ == "__main__":
    main()
