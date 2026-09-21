#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.{html,css,js}
y portafolio.html desde la MISMA plantilla (mismo header y mismo pie).

index.html y portafolio.html NO se editan a mano: se regeneran con este script.
A cada css/js se le pega ?v=<mtime> para que el celular no sirva la version vieja.
"""
import glob, os, re, html

os.chdir(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://loottreasureclothes-arch.github.io/krevo-muestras/aldo-adame/"

V = lambda f: '%s?v=%d' % (f, int(os.path.getmtime(f)))


def versiona(txt):
    for f in ['site.css', 'site.js', 'portafolio.css', 'portafolio.js',
              '../_kit/kit.css', '../_kit/kit.js']:
        if os.path.exists(f):
            txt = txt.replace('"%s"' % f, '"%s"' % V(f))
    return txt


# --------------------------------------------------------------- index.html
plantilla = open('template.html').read()

cuerpo = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in sorted(glob.glob('sections/*.html')))
css = ''.join('<link rel="stylesheet" href="%s">\n' % V(f) for f in sorted(glob.glob('sections/*.css')))
js = ''.join('<script src="%s" defer></script>\n' % V(f) for f in sorted(glob.glob('sections/*.js')))

idx = plantilla.replace('<!--SECTIONS-->\n', cuerpo)
idx = idx.replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
idx = versiona(idx)
open('index.html.tmp', 'w').write(idx)
os.replace('index.html.tmp', 'index.html')


# ----------------------------------------------------------- portafolio.html
# (numero de foto, texto alternativo, pie)  — descritas mirando cada foto,
# no copiando la tabla: en research/FOTOS.md hay dos descripciones cambiadas.
AA_CRED = None  # las 22 de Arianna y Alejandro las publico el mismo Aldo, sin credito
GRUPOS = [
    ("jr", "Jacqueline &amp; Ramiro",
     "02 de mayo de 2026 · Hacienda El Saucillo", "Florencia Macías", [
        (23, "Los novios abrazados frente a la fachada de la Hacienda El Saucillo, él de charro completo", "Frente a la hacienda"),
        (22, "Collage de cuatro fotos de la calenda: charros a caballo, la silla de montar bordada, la calle vista desde arriba y los novios en calesa", "La calenda de charros"),
        (24, "Aretes, collar y anillos de la novia sobre tela azul pálido y encaje", "Los detalles de la novia"),
     ]),
    ("aa", "Arianna y Alejandro",
     "Publicada en junio de 2026 · Los Olivos Restaurant y Kalamata Jardín", None, [
        (12, "Salón de vidrio y acero negro con mesas redondas vestidas y un aro de velas colgando", "El pabellón"),
        (13, "El mismo salón desde otro ángulo, con las mesas ya puestas", "El pabellón, del otro lado"),
        (16, "Centro de mesa con dalias crema, rosas durazno, vela delgada y la tarjeta de la mesa diez", "La mesa 10"),
        (11, "Amaranto seco color óxido cayendo sobre la mesa, entre copas ámbar y vajilla blanca", "Amaranto y copa ámbar"),
        (10, "Mesas largas de madera con sillas de respaldo ovalado dentro del pabellón de vidrio", "Mesas de madera"),
        (18, "Mesas redondas con mantel verde olivo y sillas de madera curvada, bajo lámparas con flecos entre los árboles", "Mantel verde olivo"),
        (19, "Vista amplia del jardín arbolado con varias mesas del mismo montaje", "Todo el jardín"),
        (20, "Lámparas colgantes de tela entre los pinos, sobre las mesas vestidas", "Lámparas en los pinos"),
        (21, "Mesa larga entre la vegetación, con lámpara colgante encima", "Mesa entre las plantas"),
        (17, "Mesas redondas en el jardín con lámparas colgantes de flecos", "Jardín de tarde"),
        (27, "Arreglo floral con anturios coral, lisianthus blanco y rosa y amaranto seco colgando, junto a una mesa de lino blanco", "El arreglo grande"),
        (28, "Pista de mosaico verde y crema sobre el pasto, con la mesa de novios vestida al fondo", "La pista de mosaico"),
        (4, "Plato blanco con servilleta de lino, copas transparentes y ámbar y un centro floral en la mesa del banquete", "El cubierto"),
        (5, "Mesas vestidas bajo la carpa, sobre un tapete, con el jardín al fondo", "Bajo la carpa"),
        (6, "Interior del venue con estructura de acero y la mesa de novios con flores colgantes", "La mesa de novios"),
        (7, "Mesa larga con flores abundantes y copas, bajo la pérgola de madera y vidrio", "La pérgola"),
        (8, "Mesas montadas en el jardín arbolado, antes de que lleguen los invitados", "Antes de que lleguen"),
        (9, "Pabellón de vidrio y acero con mesas largas vestidas y vista al jardín", "El pabellón de vidrio"),
        (14, "Mesa de banquete larga con velas, flores y el menú impreso en cada lugar", "El menú en su lugar"),
        (15, "Detalle de la misma mesa larga desde el otro extremo", "La mesa larga"),
        (29, "Mesa larga bajo los árboles con lámparas colgantes encendidas", "Ya de tarde"),
        (30, "Jardín con mesas redondas vestidas y lámparas colgantes", "El último ángulo"),
     ]),
    ("tt", "Viñedo Tierra Tinta",
     "Fotos publicadas el 16 de julio de 2026 · Wedding planner con Rosa Leda Studio", "Javier Padilla", [
        (25, "Los novios de espaldas en su mesa de honor de noche, con lámparas de mimbre colgando y una nube de gypsophila atrás", "La mesa de honor"),
        (26, "Invitados riendo en la mesa de noche, entre velas y flores", "A media cena"),
     ]),
    ("wt", "Almudena's WimbleTwo",
     "Publicado en agosto de 2026 · Segundo cumpleaños, tema tenis · recortadas al montaje", "Vanya Aguayo", [
        (2, "Pastel de dos pisos sobre un pedestal blanco, junto a un racimo de globos salvia, blush y crema", "El pastel"),
        (3, "Arco de globos en blush, crema y salvia junto al pedestal verde y una raqueta, en el piso de la cancha", "El arco de globos"),
     ]),
]

MEDIDAS = {}
for f in glob.glob('img/portafolio/*-500.webp'):
    n = os.path.basename(f)[:2]
    try:
        from PIL import Image
        with Image.open(f) as im:
            MEDIDAS[n] = im.size
    except Exception:
        MEDIDAS[n] = (500, 625)

piezas = ['<section class="pf-intro"><div class="aa-wrap">',
          '<p class="aa-eyebrow">Portafolio completo</p>',
          '<h1 class="aa-h" data-caer><span class="l"><i>Veintinueve fotos</i></span>'
          '<span class="l l--acc"><i>de cuatro eventos.</i></span></h1>',
          '<p class="aa-lead">Todo lo que Aldo Adame y sus fotógrafos tienen publicado de estos cuatro '
          'eventos, junto y en orden. Cada foto lleva el crédito de quien la tomó.</p>',
          '<p class="pf-vuelta"><a class="aa-link" href="index.html">Volver a la página'
          '<svg aria-hidden="true"><use href="#i-arrow"/></svg></a></p>',
          '</div></section>']

for slug, titulo, bajada, credito, fotos in GRUPOS:
    piezas.append('<section class="pf-g" id="%s" aria-labelledby="pf-%s">' % (slug, slug))
    piezas.append('<div class="aa-wrap">')
    piezas.append('<div class="pf-g__cab"><h2 class="pf-g__h" id="pf-%s">%s</h2>'
                  '<p class="pf-g__b">%s</p>%s</div>'
                  % (slug, titulo, bajada,
                     ('<p class="pf-g__c">Fotografía: %s</p>' % credito) if credito else
                     '<p class="pf-g__c">Publicadas por el propio Aldo Adame</p>'))
    piezas.append('<div class="pf-rejilla">')
    for num, alt, pie in fotos:
        s = '%02d' % num
        w, h = MEDIDAS.get(s, (500, 625))
        piezas.append(
            '<figure class="aa-marco pf-it">'
            '<button type="button" class="pf-zoom" data-big="img/portafolio/%s-1400.webp" '
            'data-pie="%s" aria-label="Ver más grande: %s">'
            '<img src="img/portafolio/%s-500.webp" width="%d" height="%d" loading="lazy" '
            'decoding="async" alt="%s"></button>'
            '<figcaption>%s</figcaption></figure>'
            % (s, html.escape(pie, quote=True), html.escape(pie, quote=True),
               s, w, h, html.escape(alt, quote=True), pie))
    piezas.append('</div></div></section>')

piezas.append(
    '<div class="pf-visor" id="pf-visor" role="dialog" aria-modal="true" aria-label="Foto ampliada" hidden>'
    '<button type="button" class="pf-visor__x" id="pf-x" aria-label="Cerrar">Cerrar</button>'
    '<img id="pf-visor-img" src="" alt="">'
    '<p class="pf-visor__pie" id="pf-visor-pie"></p></div>')

pf = plantilla.replace('<!--SECTIONS-->\n', '\n'.join(piezas) + '\n')
pf = pf.replace('<!--SECTION_CSS-->', '<link rel="stylesheet" href="portafolio.css">')
pf = pf.replace('<!--SECTION_JS-->', '<script src="portafolio.js" defer></script>')
pf = pf.replace('<title>Diseño de bodas en Aguascalientes | Aldo Adame</title>',
                '<title>Portafolio de bodas y eventos | Aldo Adame</title>')
pf = pf.replace('content="Aldo Adame, event design en Aguascalientes. Bodas en Hacienda El Saucillo, '
                'Tierra Tinta, Los Olivos y Kalamata. Reservando 2027."',
                'content="Las 29 fotos de cuatro eventos de Aldo Adame: Hacienda El Saucillo, Los Olivos, '
                'Kalamata y Viñedo Tierra Tinta, con crédito de cada fotógrafo."')
pf = pf.replace('<link rel="canonical" href="%s">' % BASE,
                '<link rel="canonical" href="%sportafolio.html">' % BASE)
pf = pf.replace('<meta property="og:url" content="%s">' % BASE,
                '<meta property="og:url" content="%sportafolio.html">' % BASE)
pf = pf.replace('<meta property="og:title" content="Aldo Adame · Diseño de bodas en Aguascalientes">',
                '<meta property="og:title" content="Aldo Adame · Portafolio de bodas y eventos">')
# el hero no existe en el portafolio: fuera el preload y el salto al formulario
pf = re.sub(r'<link rel="preload" as="image" href="img/hero/[^>]*>\n', '', pf)
pf = pf.replace('<a class="aa-skip" href="#agenda">Saltar a agendar tu fecha</a>',
                '<a class="aa-skip" href="#jr">Saltar a las fotos</a>')
pf = pf.replace('<a class="aa-btn aa-btn--brand aa-header__cta" href="#agenda">Agenda 2027</a>',
                '<a class="aa-btn aa-btn--brand aa-header__cta" href="index.html#agenda">Agenda 2027</a>')
for a, b in (('#bodas', 'index.html#bodas'), ('#diseno', 'index.html#diseno'),
             ('#venues', 'index.html#venues'), ('#agenda', 'index.html#agenda')):
    pf = pf.replace('href="%s"' % a, 'href="%s"' % b)
pf = pf.replace('<a href="portafolio.html">Portafolio</a>',
                '<a href="portafolio.html" aria-current="page">Portafolio</a>')
pf = versiona(pf)
open('portafolio.html.tmp', 'w').write(pf)
os.replace('portafolio.html.tmp', 'portafolio.html')

print('index.html armado con %d secciones · portafolio.html con %d fotos'
      % (len(glob.glob('sections/*.html')), sum(len(g[4]) for g in GRUPOS)))
