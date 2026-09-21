#!/usr/bin/env python3
"""Arma la TIENDA (sections/20-tienda.html) y catalogo.html desde research/catalogo-172.json.

De donde salen los datos (nada aqui esta inventado):
  research/catalogo-172.json  Las 172 fichas de producto de SU PROPIA tienda en linea
                              (secretmodelegante.com, WooCommerce) rescatadas del archivo de
                              internet el 20 sep 2026. Trae nombre, precio y categorias/tallas
                              tal como ellos los publicaron.
  FOTO                        Las 12 fotos de producto REALES rescatadas del mismo archivo.
                              Cada pareja foto<->producto esta justificada en
                              research/FOTOS-PRODUCTO.md. Las que no se pudieron casar con
                              certeza van con precio None -> "Pregunta el precio".

Regla dura: NUNCA un precio inventado y NUNCA "$0". Sin precio => "Pregunta el precio" en la
tarjeta y "te lo confirmamos por WhatsApp" en el total del encargo.

Correr: python3 build_tienda.py && python3 build.py
"""
import json, os, re, html

os.chdir(os.path.dirname(os.path.abspath(__file__)))
WA = "524491371706"
CAT = json.load(open("research/catalogo-172.json", encoding="utf-8"))

# ---------------------------------------------------------------- fotos reales
# slug de la foto -> (nombre exacto del producto en SU catalogo, precio, tallas/colores)
# La justificacion de cada pareja esta en research/FOTOS-PRODUCTO.md.
FOTO = {
    "vestido-tommy-rojo":    ("Vestido Tommy Hilfiger corte cintura baja", 1690, "Tallas S, M, L, XL"),
    "vestido-negro":         ("Vestido Tommy Hilfiger camisero", 1590, "Tallas S, L"),
    "vestido-lentejuela":    ("Vestido Polo Ralph corte tubo con lentejuelas", 2200, "Talla 6"),
    "vestido-ondas":         ("Vestido Marella corte A", 850, "Talla 6"),
    "cartera-michael-kors":  ("Cartera Michael Kors", 2590, "4 modelos a este precio"),
    "chamarra-guess-roja":   ("Chamarra Guess capitonada para caballero", 3590, "Talla S"),
    "chamarra-guess-azul":   ("Chamarra Guess", 3690, "Talla M"),
    "crema-vanilla-sparkle": ("Crema Victoria's Secret Vanilla Sparkle", 290, "236 ml"),
    "crema-floating-neroli": ("Crema Victoria's Secret Floating Neroli", 290, "236 ml"),
    "lentes-guess-carey":    ("Lentes de sol Guess", None, "Armazón carey"),
    "lentes-guess-gris":     ("Lentes de sol Guess", None, "Armazón gris"),
    "playera-tommy-jeans":   ("Playera Tommy Jeans", None, "Con bucket hat Tommy"),
}

# Producto (slug de SU propia URL) -> foto. Se casa por slug y no por nombre porque su catalogo
# escribe "Victoria´s" con acento agudo y "Camisero" con mayuscula: casar por texto falla.
FOTO_SLUG = {
    "chamarra-guess-capitonadas-para-caballero": "chamarra-guess-roja",
    "chamarra-guess": "chamarra-guess-azul",
    "crema-victorias-secret-4": "crema-vanilla-sparkle",
    "crema-victorias-secret-floating-neroli": "crema-floating-neroli",
    "vestido-marella-corte-a": "vestido-ondas",
    "vestido-tubo-con-lentejuelas-polo-ralph": "vestido-lentejuela",
    "vestido-camisero-tommy-hilfiger": "vestido-negro",
    "vestido-cintura-baja-tommy-hilfiger": "vestido-tommy-rojo",
    "cartera-michael-kors-4": "cartera-michael-kors",
}
# Se quedan FUERA del catalogo a proposito: lentes-guess-carey, lentes-guess-gris y
# playera-tommy-jeans. Su catalogo trae tres "Lentes de sol Guess" ($1,990, $1,990 y $2,250) y en la
# foto de la playera salen dos piezas: pegarle la foto a una ficha concreta seria afirmar un precio
# que no se sabe. En la principal salen con foto y "Pregunta el precio", que si es cierto.

MARCAS = ["Tommy Hilfiger", "Michael Kors", "Calvin Klein", "Victoria´s Secret", "GUESS",
          "DKNY", "Ralph Lauren", "Nautica", "GBG", "Disney"]
TALLAS = re.compile(r"^(XS|S|M|L|XL|T\d+|\d{1,2}(\.\d)?)$")


def marca(p):
    for m in MARCAS:
        if m in p["cats"]:
            return m.replace("´", "'")
    for m in MARCAS:
        if m.lower().replace("´", "'") in p["name"].lower():
            return m.replace("´", "'")
    return ""


def tallas(p):
    t = [c for c in p["cats"] if TALLAS.match(c)]
    col = [c for c in p["cats"] if c not in t and c not in MARCAS
           and c not in ("Mujer", "Hombre", "Niña", "Niño", "Accesorios", "Vestidos",
                         "Backpack", "Cross Body", "Sin categorizar")]
    out = []
    if t:
        t = sorted(t, key=lambda x: (len(x), x))
        out.append(("Tallas " if len(t) > 1 else "Talla ") + ", ".join(t[:6]))
    if col:
        out.append(", ".join(col[:3]))
    return " · ".join(out)


ART = {"botas": "las", "tenis": "los", "lentes": "los", "carteras": "las", "cartera": "la",
       "chamarra": "la", "crema": "la", "playera": "la", "blusa": "la", "sudadera": "la",
       "mochila": "la", "gorra": "la", "bolsa": "la", "sandalias": "las", "pantalon": "el",
       "vestido": "el", "sueter": "el", "suéter": "el", "backpack": "la", "crossbody": "la",
       "bucket": "el", "pants": "los", "short": "el", "falda": "la", "abrigo": "el",
       "camisa": "la", "conjunto": "el", "set": "el", "traje": "el"}


def articulo(nombre):
    w = nombre.split()[0].lower().strip(",.")
    if w in ART:
        return ART[w]
    if w.endswith("as"):
        return "las"
    if w.endswith("os") or w.endswith("es"):
        return "los"
    if w.endswith("a"):
        return "la"
    return "el"


def money(n):
    return "$" + format(n, ",d")


def wa_pieza(nombre, precio):
    """El mensaje que Emanuel dicto: 'Hola, te encargo las Botas de lluvia Tommy Hilfiger de $2,190.'"""
    a = articulo(nombre)
    if precio:
        return f"Hola, te encargo {a} {nombre} de {money(precio)}."
    return f"Hola, te encargo {a} {nombre}. ¿Me pasas el precio?"


def wa_href(msg):
    from urllib.parse import quote
    return f"https://wa.me/{WA}?text={quote(msg)}"


def esc(s):
    return html.escape(str(s), quote=True)


# ---------------------------------------------------------------- tarjeta
def tarjeta(p, foto=None, meta=None, lazy=True, idx=0):
    nombre = p["name"] if isinstance(p, dict) else p
    precio = p["price"] if isinstance(p, dict) else None
    meta = meta if meta is not None else (tallas(p) if isinstance(p, dict) else "")
    mk = marca(p) if isinstance(p, dict) else ""
    msg = wa_pieza(nombre, precio)
    lz = ' loading="lazy"' if lazy else ''
    if foto:
        img = (f'<img src="img/prod/{foto}-380.webp" '
               f'srcset="img/prod/{foto}-380.webp 380w, img/prod/{foto}-760.webp 760w" '
               f'sizes="(min-width:1000px) 300px, (min-width:760px) 23vw, 45vw" '
               f'width="380" height="380" alt="{esc(nombre)}"{lz} decoding="async">')
    else:
        img = (f'<span class="os-p-sin" aria-hidden="true">'
               f'<b>{esc(mk or "Ólux")}</b><i>Foto pendiente</i></span>')
    precio_html = (f'<p class="os-p-price">{money(precio)}</p>' if precio
                   else '<p class="os-p-price os-p-price--ask">Pregunta el precio</p>')
    return f'''      <li class="os-p">
        <div class="os-p-foto">{img}
          <button class="os-p-add" type="button" data-add data-name="{esc(nombre)}" data-price="{precio or ''}" aria-label="Agregar {esc(nombre)} a mi encargo"><span aria-hidden="true">+</span></button>
        </div>
        <p class="os-p-name">{esc(nombre)}</p>
        {f'<p class="os-p-meta">{esc(meta)}</p>' if meta else ''}
        {precio_html}
        <a class="os-p-btn" href="{wa_href(msg)}" target="_blank" rel="noopener" data-wa-pieza>Encargar</a>
      </li>'''


# ---------------------------------------------------------------- reparto
def con_foto(slug):
    n, pr, mt = FOTO[slug]
    return dict(name=n, price=pr, cats=[], _foto=slug, _meta=mt)


def buscar(pred, n, usados):
    out = []
    for p in CAT:
        if len(out) >= n:
            break
        if id(p) in usados or not pred(p):
            continue
        usados.add(id(p))
        out.append(p)
    return out


USADOS = set()


def panel_html(titulo, texto, href, cta):
    return ('      <li class="os-p os-p--panel">\n'
            f'        <b>{esc(titulo)}</b>\n'
            f'        <p>{esc(texto)}</p>\n'
            f'        <a class="os-t-vermas" href="{href}">{esc(cta)}<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>\n'
            '      </li>')


# Los tres recortes REALES de su exhibidor de tenis (Google Maps), subidos x4 con Real-ESRGAN
# local por build_img.py. No se le pega ninguno a una ficha concreta: es el aparador, no la pieza.
EXHIB = [("par-1", "Tenis blancos y negros en su exhibidor"),
         ("par-2", "Tenis azul marino con franja en su exhibidor"),
         ("par-3", "Tenis rosa y crema en su exhibidor")]


def bloque_calzado(num, items, ancla, n_total_pares, ver_mas):
    """Calzado: el UNICO bloque del que el archivo de internet no conservo ni una foto de pieza
    (reverificado el 20 sep por la tarde: 24 imagenes del dominio, 14 de producto, cero de
    calzado, y las fotos de las fichas dan 404 una por una). Asi que NO va como lista de texto
    —que es lo que Emanuel rechazo— sino como el resto de la tienda: primero sus tenis de
    verdad, en tres recortes de su exhibidor real; luego el renglon honesto de que la foto
    pieza por pieza se pide por WhatsApp; y hasta abajo la rejilla con marca, talla y precio.
    El renglon de "sin foto" NUNCA va arriba: primero se ven los tenis."""
    fotos = "\n".join(
        f'''      <li><img src="img/calzado/{s}-380.webp" srcset="img/calzado/{s}-380.webp 380w, img/calzado/{s}-760.webp 760w" sizes="(min-width:760px) 260px, 30vw" width="380" height="380" alt="{esc(a)}" loading="lazy" decoding="async"></li>'''
        for s, a in EXHIB)
    cards = "\n".join(tarjeta(p) for p in items)
    return f'''  <div class="os-t-block" id="{ancla}">
    <p class="os-t-eyebrow"><span class="os-parteluz os-parteluz--sm" aria-hidden="true"></span>{num} · Calzado · {n_total_pares} pares</p>
    <ul class="os-t-exhib" aria-label="El exhibidor de tenis de su local">
{fotos}
    </ul>
    <p class="os-t-exhib-pie">Fotos de su exhibidor real, en el local de Tanyveth.</p>
    <p class="os-t-sinfoto">Sin foto todavía: pregúntanos y te la mandamos por WhatsApp.</p>
    <ul class="os-t-grid">
{cards}
    </ul>
    <a class="os-t-vermas" href="{ver_mas[0]}">{esc(ver_mas[1])}<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
  </div>
'''


def bloque(titulo, num, items, ancla, ver_mas=None, foto_bloque=None, panel=None):
    cards = []
    for i, it in enumerate(items):
        f = it.get("_foto")
        cards.append(tarjeta(it, foto=f, meta=it.get("_meta"), idx=i))
    if panel:
        cards.append(panel_html(*panel))
    fb = ""
    if foto_bloque:
        fb = f'''    <figure class="os-frame os-t-blockfoto">
      <img src="{foto_bloque[0]}" width="{foto_bloque[1]}" height="{foto_bloque[2]}" alt="{esc(foto_bloque[3])}" loading="lazy" decoding="async">
      <figcaption>{esc(foto_bloque[4])}</figcaption>
    </figure>
'''
    vm = (f'    <a class="os-t-vermas" href="{ver_mas[0]}">{esc(ver_mas[1])}<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>\n'
          if ver_mas else '')
    return f'''  <div class="os-t-block" id="{ancla}">
    <p class="os-t-eyebrow"><span class="os-parteluz os-parteluz--sm" aria-hidden="true"></span>{num} · {esc(titulo)}</p>
{fb}    <ul class="os-t-grid">
{chr(10).join(cards)}
    </ul>
{vm}  </div>
'''


def banda(m, d, wm, hm, alt, frase, pie):
    return f'''  <figure class="os-t-banda">
    <picture>
      <source media="(min-width: 700px)" srcset="{d}">
      <img src="{m}" width="{wm}" height="{hm}" alt="{esc(alt)}" loading="lazy" decoding="async">
    </picture>
    <figcaption><b>{esc(frase)}</b><span>{esc(pie)}</span></figcaption>
  </figure>
'''


GRUPOS = [
    # OJO con el orden: cada pieza cae en el PRIMER grupo que la acepta. "Niñas y niños" tiene que ir
    # antes que "Calzado" porque casi todo lo de niño son tenis: si Calzado va primero se los come y
    # el grupo de niños queda vacio (y la liga #c-ninos de la portada no lleva a ningun lado).
    ("c-ninos", "Niñas y niños", lambda p: "Niña" in p["cats"] or "Niño" in p["cats"]),
    ("c-mujer", "Dama", lambda p: "Mujer" in p["cats"] and not p["name"].lower().startswith(("tenis", "botas")) and "Victoria´s Secret" not in p["cats"]),
    ("c-calzado", "Calzado", lambda p: p["name"].lower().startswith(("tenis", "botas"))),
    ("c-accesorios", "Carteras, mochilas y lentes", lambda p: ("Accesorios" in p["cats"] or "Backpack" in p["cats"] or "Cross Body" in p["cats"]) and not p["name"].lower().startswith(("tenis", "botas"))),
    ("c-hombre", "Caballero", lambda p: "Hombre" in p["cats"]),
    ("c-vs", "Cremas Victoria's Secret", lambda p: "Victoria´s Secret" in p["cats"]),
]


# Se reparten las 172 piezas UNA sola vez: el catalogo las pinta y la portada usa los conteos para
# que los enlaces "Ver los N" digan el numero real y no uno escrito a mano.
GRUPO_ITEMS, _puesto = {}, set()
for _gid, _gname, _pred in GRUPOS:
    GRUPO_ITEMS[_gid] = [p for p in CAT if id(p) not in _puesto and _pred(p)]
    _puesto.update(id(p) for p in GRUPO_ITEMS[_gid])
GRUPO_RESTO = [p for p in CAT if id(p) not in _puesto]
N = {g: len(v) for g, v in GRUPO_ITEMS.items()}


# ---- slider de destacados (las 6 piezas con foto real Y precio real)
DEST = ["vestido-tommy-rojo", "chamarra-guess-roja", "cartera-michael-kors",
        "vestido-lentejuela", "chamarra-guess-azul", "crema-vanilla-sparkle"]
slides = []
for i, s in enumerate(DEST):
    n, pr, mt = FOTO[s]
    msg = wa_pieza(n, pr)
    slides.append(f'''      <li class="os-t-slide">
        <div class="os-t-slide-foto"><img src="img/prod/{s}-760.webp" width="760" height="760" alt="{esc(n)}"{' loading="lazy"' if i else ''} decoding="async"></div>
        <p class="os-t-slide-name">{esc(n)}</p>
        <p class="os-t-slide-meta">{esc(mt)}</p>
        <p class="os-t-slide-price">{money(pr)}</p>
        <div class="os-t-slide-cta">
          <a class="os-p-btn" href="{wa_href(msg)}" target="_blank" rel="noopener" data-wa-pieza>Encargar</a>
          <button class="os-p-add os-p-add--inline" type="button" data-add data-name="{esc(n)}" data-price="{pr}" aria-label="Agregar {esc(n)} a mi encargo"><span aria-hidden="true">+</span></button>
        </div>
      </li>''')

# ---- bloques
b_cart = [con_foto("cartera-michael-kors"), con_foto("lentes-guess-carey"), con_foto("lentes-guess-gris")]
b_cart += buscar(lambda p: "Backpack" in p["cats"] or "Cross Body" in p["cats"], 1, USADOS)

# Calzado: cuatro pares elegidos a mano para que se vean las cuatro marcas y el rango de precio
# real (de $1,890 a $4,200). Los datos salen tal cual de su catalogo; aqui solo se escoge cuales.
CALZ_SLUGS = ["botas-de-lluvia-tommy-hilfiger", "tenis-michael-kors",
              "tenis-calvin-klein", "tenis-guess-2"]
_por_slug = {p["slug"]: p for p in CAT}
b_calz = [_por_slug[s] for s in CALZ_SLUGS if s in _por_slug]
assert len(b_calz) == len(CALZ_SLUGS), "slug de calzado que ya no existe en el catalogo"
USADOS.update(id(p) for p in b_calz)

b_ropa = [con_foto("vestido-tommy-rojo"), con_foto("vestido-negro"),
          con_foto("vestido-lentejuela"), con_foto("vestido-ondas")]

b_vs = [con_foto("crema-vanilla-sparkle"), con_foto("crema-floating-neroli")]


n_cremas = sum(1 for p in CAT if "Victoria´s Secret" in p["cats"])
n_total = len(CAT)

TIENDA = f'''<!-- 20-tienda: LA TIENDA. Reescrita el 20 sep 2026 (tarde) sobre FEEDBACK-2: Emanuel pidio
     "que se vea como tienda en linea, como Muebles del Alba: slides, productos, secciones, y todo
     para WhatsApp: te encargo esto, te encargo esto". Orden exacto que dicto: slider de producto
     arriba -> productos con su precio por seccion -> otro banner -> otro tipo de producto -> y asi.
     GENERADO por build_tienda.py desde research/catalogo-172.json (su propio catalogo, 172 piezas
     con precio real) + las 12 fotos de producto reales rescatadas del archivo de internet.
     NO editar a mano: cambia build_tienda.py y vuelve a correrlo. -->
<section class="os-t" id="tienda" data-hide-wa aria-label="La tienda: piezas con precio real">
  <div class="k-wrap os-t-head">
    <p class="os-eyebrow"><span class="os-parteluz os-parteluz--sm" aria-hidden="true"></span>{n_total} piezas de su catálogo</p>
    <h2 class="os-d os-t-h">
      <span class="os-fall" data-fall data-reveal-delay="0">Cada pieza con su precio.</span>
      <span class="os-fall" data-fall data-reveal-delay="100"><em>La encargas por WhatsApp.</em></span>
    </h2>
    <p class="os-t-honest">Los precios son los que ustedes publicaron en su tienda en línea (catálogo de enero de 2026). Los de hoy te los confirmamos por WhatsApp.</p>
  </div>

  <div class="os-t-slider-wrap">
    <ul class="os-t-slider" id="os-slider" aria-label="Piezas destacadas">
{chr(10).join(slides)}
    </ul>
    <div class="os-t-slider-nav">
      <button class="os-t-arrow" type="button" data-slide="-1" aria-controls="os-slider" aria-label="Ver la pieza anterior"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <span class="os-t-dots" id="os-slider-dots" aria-hidden="true">{''.join('<i></i>' for _ in slides)}</span>
      <button class="os-t-arrow" type="button" data-slide="1" aria-controls="os-slider" aria-label="Ver la siguiente pieza"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
    </div>
  </div>

  <div class="k-wrap os-t-blocks">
{bloque("Carteras, mochilas y lentes", "01", b_cart, "t-carteras",
        ver_mas=("catalogo.html#c-accesorios", f"Ver los {N['c-accesorios']} accesorios"))}
{banda("img/banda/tommy-m.webp", "img/banda/tommy-d.webp", 840, 800,
       "Tejido real de un suéter Tommy Hilfiger de su tienda",
       "Tommy, DKNY, Michael Kors, Calvin Klein, Guess.",
       "Originales. Foto suya, de su propia mercancía.")}
{bloque_calzado("02", b_calz, "t-calzado", N['c-calzado'],
        ver_mas=("catalogo.html#c-calzado", f"Ver los {N['c-calzado']} pares, con talla y precio"))}
  </div>

  <ul class="os-t-cats" data-hide-wa aria-label="Por quién lo buscas">
    <li><a href="catalogo.html#c-mujer"><img src="img/cat/mujer-640.webp" width="640" height="748" alt="Dama" loading="lazy" decoding="async"><span>Dama</span></a></li>
    <li><a href="catalogo.html#c-accesorios"><img src="img/cat/accesorios-640.webp" width="640" height="748" alt="Accesorios" loading="lazy" decoding="async"><span>Accesorios</span></a></li>
    <li><a href="catalogo.html#c-ninos"><img src="img/cat/ninos-640.webp" width="640" height="748" alt="Niñas y niños" loading="lazy" decoding="async"><span>Niñas y niños</span></a></li>
  </ul>

  <div class="k-wrap os-t-blocks" data-hide-wa>
{bloque("Ropa de dama", "03", b_ropa, "t-ropa",
        ver_mas=("catalogo.html#c-mujer", f"Ver las {N['c-mujer']} piezas de dama"))}
{banda("img/banda/rayas-m.webp", "img/banda/rayas-d.webp", 840, 610,
       "Detalle de una prenda de rayas de su tienda",
       "Envíos a toda la República.",
       "Y entregas a domicilio aquí en Aguascalientes.")}
{bloque(f"Cremas Victoria's Secret", "04", b_vs, "t-vs",
        panel=(f"{n_cremas} fragancias.", "Todas a $290, las mismas que traen de temporada.",
               "catalogo.html#c-vs", f"Ver las {n_cremas}"))}
    <a class="os-btn os-btn--brand os-t-todo" href="catalogo.html">Ver el catálogo completo ({n_total} piezas)</a>
  </div>
</section>
'''

CART_SHEET = f'''<div class="os-cart-sheet" id="os-cart-sheet" role="dialog" aria-modal="true" aria-label="Mi encargo" aria-hidden="true">
  <div class="os-cart-scrim" aria-hidden="true"></div>
  <div class="os-cart-panel">
    <div class="os-cart-panel-head">
      <h3 class="os-d os-cart-panel-h">Mi encargo</h3>
      <button class="os-cart-close" type="button" aria-label="Cerrar"><span></span><span></span></button>
    </div>

    <p class="os-cart-empty" id="os-cart-empty">Todavía no agregas nada. Toca el <b>+</b> de cualquier pieza.</p>
    <ul class="os-cart-items" id="os-cart-items"></ul>

    <div class="os-cart-pay">
      <p class="os-cart-pay-t">Forma de pago</p>
      <p class="os-cart-pay-note">Apartado a dos meses · Tarjetas a 3 o 6 meses · Tarjeta en línea: te mandamos el link.</p>
    </div>

    <div class="os-cart-total" id="os-cart-total">
      <span>Total</span>
      <strong id="os-cart-total-n">Te lo confirmamos por WhatsApp</strong>
    </div>

    <a class="os-btn os-btn--wa os-cart-send" id="os-cart-send" href="https://wa.me/{WA}">
      <svg aria-hidden="true"><use href="#i-wa"/></svg>Mandar mi encargo
    </a>
  </div>
</div>
'''

open("sections/20-tienda.html", "w", encoding="utf-8").write(TIENDA + "\n" + CART_SHEET)
print("sections/20-tienda.html:", len(TIENDA), "bytes")


secs, indice = [], []
for gid, gname, pred in GRUPOS:
    items = GRUPO_ITEMS[gid]
    if not items:
        continue
    cards = [tarjeta(p, foto=FOTO_SLUG.get(p["slug"])) for p in items]
    indice.append(f'<a href="#{gid}">{esc(gname)} <b>{len(items)}</b></a>')
    secs.append(f'''  <section class="os-t-block os-cat-block" id="{gid}" data-hide-wa aria-label="{esc(gname)}">
    <p class="os-t-eyebrow"><span class="os-parteluz os-parteluz--sm" aria-hidden="true"></span>{esc(gname)} · {len(items)} piezas</p>
    <ul class="os-t-grid">
{chr(10).join(cards)}
    </ul>
  </section>''')
resto = GRUPO_RESTO
if resto:
    cards = [tarjeta(p, foto=FOTO_SLUG.get(p["slug"])) for p in resto]
    indice.append(f'<a href="#c-mas">Más piezas <b>{len(resto)}</b></a>')
    secs.append(f'''  <section class="os-t-block os-cat-block" id="c-mas" data-hide-wa aria-label="Más piezas">
    <p class="os-t-eyebrow"><span class="os-parteluz os-parteluz--sm" aria-hidden="true"></span>Más piezas · {len(resto)}</p>
    <ul class="os-t-grid">
{chr(10).join(cards)}
    </ul>
  </section>''')

tpl = open("template.html", encoding="utf-8").read()
tpl = tpl.replace("<title>Ólux American Style · secret mode · Tanyveth 105-B, Aguascalientes</title>",
                  f"<title>Catálogo completo · {n_total} piezas · Ólux American Style · secret mode</title>")
tpl = tpl.replace('<meta name="description" content="Michael Kors, Tommy y DKNY originales en Tanyveth 105-B, Aguascalientes. Apartado a dos meses. 4.5 estrellas de 18 personas que ya vinieron. Pide por WhatsApp.">',
                  f'<meta name="description" content="Las {n_total} piezas de Ólux American Style · secret mode con su precio real: Tommy Hilfiger, Michael Kors, Calvin Klein, Guess y DKNY. Apartado a dos meses. Encárgalo por WhatsApp.">')
tpl = tpl.replace('<link rel="canonical" href="https://loottreasureclothes-arch.github.io/krevo-muestras/olux-secret-mode/">',
                  '<link rel="canonical" href="https://loottreasureclothes-arch.github.io/krevo-muestras/olux-secret-mode/catalogo.html">')
# OJO: solo los <a href="#..."> de navegacion. Nunca los <use href="#i-wa"/> de los iconos SVG,
# que tambien empiezan con href="#" y se quedarian rotos.
tpl = re.sub(r'(<a\b[^>]*?\bhref=")#(?!\s)', r'\1index.html#', tpl)
tpl = tpl.replace('<a class="os-logo" href="index.html#inicio"', '<a class="os-logo" href="index.html"')
tpl = tpl.replace('<a class="os-skip" href="index.html#tienda">Saltar a la tienda</a>',
                  '<a class="os-skip" href="#c-mujer">Saltar al catálogo</a>')
tpl = tpl.replace('<link rel="preload" as="image" href="img/hero/banner-m.webp" media="(max-width: 899px)" fetchpriority="high">\n', '')
tpl = tpl.replace('<link rel="preload" as="image" href="img/hero/banner-d.webp" media="(min-width: 900px)" fetchpriority="high">\n', '')

V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'
cuerpo = f'''<section class="os-cat-head" aria-label="Catálogo completo">
  <div class="k-wrap">
    <p class="os-eyebrow"><span class="os-parteluz os-parteluz--sm" aria-hidden="true"></span>Catálogo completo</p>
    <h1 class="os-d os-cat-h">{n_total} piezas.<br><em>Todas con su precio.</em></h1>
    <p class="os-t-honest">Tal como ustedes las publicaron en su tienda en línea (catálogo de enero de 2026). Lo que hay hoy en el local te lo confirmamos por WhatsApp.</p>
    <nav class="os-cat-indice" aria-label="Ir a una sección">{''.join(indice)}</nav>
  </div>
</section>

<div class="k-wrap os-t-blocks">
{chr(10).join(secs)}
</div>
'''
body = tpl.split("<!--SECTIONS-->")[0] + cuerpo + tpl.split("<!--SECTIONS-->")[1]
body = body.replace("<!--SECTION_CSS-->", f'<link rel="stylesheet" href="{V("sections/20-tienda.css")}">')
body = body.replace("<!--SECTION_JS-->", f'<script src="{V("sections/20-tienda.js")}" defer></script>')
for f in ["site.css", "site.js", "../_kit/kit.css", "../_kit/kit.js"]:
    if os.path.exists(f):
        body = body.replace(f'"{f}"', f'"{V(f)}"')
# la hoja del encargo es la misma de la tienda (mismo JS, mismo carrito)
body = body.replace("</main>", "</main>\n" + CART_SHEET)
open("catalogo.html.tmp", "w", encoding="utf-8").write(body)
os.replace("catalogo.html.tmp", "catalogo.html")
print("catalogo.html:", len(body), "bytes ·", sum(len(re.findall(r'<li class="os-p">', s)) for s in secs), "piezas")
