#!/usr/bin/env python3
"""Genera sections/30-carta.html y data/carta.json desde la carta de research/hechos.md,
y el reloj SVG de sections/20-dosxuno.html. Corre: python3 gen.py && python3 build.py"""
import json, math, re, unicodedata, html, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))

def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def peso(n): return '${:,}'.format(n)
E = html.escape

# (nombre, detalle, precio, etiqueta para WhatsApp)
BOTANAS = [
 ("Orden de chistorra","200 g",170,None),("Orden de chistorra con guacamole","200 g",204,None),
 ("Queso fundido","",145,None),("Orden de quesadillas","",132,None),("Aguachile","200 g",228,None),
 ("Orden de guacamole","",143,None),("Frijoles refritos con queso","",74,None),
 ("Alitas adobadas","BBQ o Buffalo · 350 g",224,"Alitas adobadas 350 g"),("Ensalada de la casa","",123,None),
 ("Chiles rellenos de queso (2)","",218,None),("Huesos tuétanos","",242,None),("Frijoles charros","",102,None),
 ("Coctel de camarón","",190,None),("Canasta de chicharrón","",28,None),("Medallones de verduras (6)","",175,None),
 ("Banderillas de pork belly (10)","",172,None),("Tabla de carnes frías","220 g",380,None),
 ("Chilacas La Cantina (2)","",147,None),("Jamón serrano","",212,None),("Aceitunas La Cantina","200 g",112,None)]
SOPAS = [("Sopa de médula","",189,None),("Sopa azteca","",187,None),("Crema de champiñones","",109,None),("Crema de elote","",109,None)]
TACOS = [("Tacos de arrachera","250 g",205,None),("Tacos de sirloin","250 g",205,None),("Tacos de machito","220 g",188,None)]
CARNES = [
 ("Parrillada norteña","2 personas",588,"Parrillada norteña 2 personas"),("Parrillada norteña","4 personas",1026,"Parrillada norteña 4 personas"),
 ("Arrachera","500 g",572,"Arrachera 500 g"),("Arrachera","1 kilo",1026,"Arrachera 1 kilo"),
 ("Tampiqueña La Cantina","220 g",332,None),("Nopal La Cantina","",332,None),("Fajitas de arrachera","220 g",288,None),
 ("New York","",346,None),("T-bone","",346,None),("Top sirloin","",346,None),("Rib-eye","",398,None),
 ("Chicharrón rib-eye","",318,None),("Arrachera con ensalada","",318,None),("Pechuga de pollo a la plancha","",254,None),
 ("Costillas BBQ","450 g",294,None),("Chamorro adobado","",276,None),("Orden de machitos","",254,None),
 ("Salmón a la plancha","",342,None),("Filete de pescado empapelado","",318,None),("Medallón de atún","",291,None)]
INFANTIL = [("Hamburguesa con papas","",159,None),("Salchichas fritas","",144,None),("Dedos de queso (7)","",144,None),
 ("Nuggets de pollo (8)","",145,None),("Banderillas","",149,None),("Papas a la francesa","",112,None)]
CERV_COMP = [
 ("Carrito con 20 cervezas","incluye parrillada para 4 personas",1535,"Carrito con 20 cervezas con parrillada para 4 personas"),
 ("Carrito con 20 cervezas","versión Modelo, Negra, Ultra y Stella",1669,"Carrito con 20 cervezas versión Modelo/Negra/Ultra/Stella"),
 ("Cubeta de 6","Corona, Light, Victoria o Pacífico",345,"Cubeta de 6 Corona/Light/Victoria/Pacífico"),
 ("Cubeta de 6","Negra, Cristal, Modelo, Ultra o Stella",375,"Cubeta de 6 Negra/Cristal/Modelo/Ultra/Stella")]
CERV_355 = [("Corona","",74,None),("Victoria","",74,None),("Pacífico","",74,None),("Corona Light","",74,None),
 ("Ultra","",79,None),("Stella Artois","",79,None),("Modelo Especial","",79,None),("Negra Modelo","",79,None),
 ("Modelo Cristal","",79,None),("Corona Cero","",63,None)]
CERV_VASO = [("Vaso chelado","",20,None),("Vaso michelado","",24,None),("Vaso gringa","",32,None)]
REFRESCOS = [("Agua sabor","",45,None),("Refresco","",51,None),("Limonada o naranjada","500 ml",67,None),
 ("Jarra de limonada o naranjada","2 L",187,None),("Red Bull","",77,None),("Café americano o espresso","",48,None)]
# papel = ingredientes transcritos de su carta (research/fotos/sitio-carta-especialidades.jpg; ver hechos.md)
REPARTO = [("Pedro Infante",152,"Vodka, ron blanco, tequila blanco, ginebra y cola"),
           ("Cantinflas",152,"Bacardí blanco, agua quina, curazao azul"),
           ("Jorge Negrete",152,"Vodka, rompope, zarzamora y leche Clavel"),
           ("Miroslava",152,"Leche Clavel, menta verde y chocolate"),
           ("María Félix",152,"Vodka, amaretto y crema de coco"),
           ("Mezcalada La Cantina",152,"Mezcal, Squirt, limón, jugo de naranja"),
           ("Sangría de cantina",127,"")]
DESC = {"Sara García": "ginebra, Baileys, Kahlúa y leche"}  # solo se muestra; no cambia el id
COCT_SUELTOS = [("Cubanito","",115,None),("Margarita","",132,None),("Sexo en la playa","",138,None),
 ("Pedo de gorila","",155,None),("Orgasmo","",178,None),
 ("Piporro","cerveza, clamato, camarón, apio, pepino",198,None),("Sara García","",198,None)]
CLASICOS = ["Mojito","Tamarindo","Ruso blanco","Vampiro","Alfonso XIII","Piña colada","Medias de seda","Luces de la Habana",
 "Paloma","Tequila sunrise","Bloody Mary","Clamato","Beso de ángel","Bull","Ojos verdes","Desarmador","Almendra colada","Charro negro"]
DESTILADOS = [("Mezcal La Cantina Reserva 1 L","copa",124,"Mezcal La Cantina Reserva 1 L (copa)"),
 ("Mezcal La Cantina Reserva 1 L","botella",1285,"Mezcal La Cantina Reserva 1 L (botella)"),
 ("Torres 10","copa",136,"Torres 10 (copa)"),("Torres 10","botella",1549,"Torres 10 (botella)")]

carta_json = {}
def pfig(k, alt, cap, pos='50% 50%', long=False):
    cl = 'mini' + (' mini--l' if long else '')
    return (f'<figure class="{cl}"><picture><source media="(min-width:860px)" srcset="img/p-{k}-v.webp" width="680" height="850">'
            f'<img src="img/p-{k}-960.webp" srcset="img/p-{k}-480.webp 480w, img/p-{k}-960.webp 960w" sizes="calc(100vw - 40px)" alt="{alt}" width="960" height="480" loading="lazy" style="object-position:{pos}"></picture>'
            f'<figcaption>{cap}</figcaption></figure>')
def fig(name, alt, cap, w, h, pos='50% 50%'):
    return (f'<figure class="mini"><img src="img/{name}-960.webp" srcset="img/{name}-480.webp 480w, img/{name}-960.webp 960w" sizes="(min-width:860px) 560px, calc(100vw - 40px)" alt="{alt}" width="{w}" height="{h}" loading="lazy" style="object-position:{pos}">'
            f'<figcaption class="mq">{cap}</figcaption></figure>')
F_MESA = pfig('mesa','Mesa con totopos en su canasta de La Cantina, salsa roja, limones, aros de calamar y botanas','Botanas en la mesa, sucursal Colosio',long=True)
F_TABLA = pfig('tabla','Tabla de madera con carne asada, chiles toreados y chiles de árbol en su plancha de fierro','De la parrilla','50% 45%')
F_TARRO = pfig('tarro','Tarro de cerveza helada junto a un vaso preparado con sal en el borde','Para acompañar','50% 40%')
F_BOT = pfig('botellas','Botellero de La Cantina de Antaño con tequilas, licores y un radio antiguo','El botellero','40% 50%')
def row(it, dark=False):
    name, det, price, label = it
    iid = slug(name + ' ' + det) if det else slug(name)
    lab = label or name
    carta_json[iid] = {"name": name, "detail": det, "price": price, "label": lab}
    shown = det or DESC.get(name, '')
    small = f'<small>{E(shown)}</small>' if shown else ''
    return (f'<li class="row" data-id="{iid}" data-name="{E(name)}" data-label="{E(lab)}" data-price="{price}">'
            f'<span class="nm">{E(name)}{small}</span><i class="ld" aria-hidden="true"></i><span class="pr">{peso(price)}</span>'
            f'<button class="plus" type="button" aria-label="Agregar {E(lab)} a mi mesa"><span aria-hidden="true">+</span><b class="bdg" hidden>0</b></button></li>')

def pan(figure, body):
    return f'<div class="pan-g">{figure}<div class="pan-l">{body}</div></div>'

def casa():
    """La botella de la casa: su mezcal de marca propia (hechos.md). Mismos ids que antes."""
    def ln(it, shown):
        name, det, price, label = it
        iid = slug(name + ' ' + det); carta_json[iid] = {"name": name, "detail": det, "price": price, "label": label}
        return (f'<li class="row" data-id="{iid}" data-name="{E(name)}" data-label="{E(label)}" data-price="{price}"><span class="nm">{shown}</span><i class="ld" aria-hidden="true"></i><span class="pr">{peso(price)}</span>'
                f'<button class="plus" type="button" aria-label="Agregar {E(label)} a mi mesa"><span aria-hidden="true">+</span><b class="bdg" hidden>0</b></button></li>')
    return ('<div class="lobby casa"><p class="casa-k mq">La botella de la casa</p><h3 class="casa-n">Mezcal La Cantina Reserva</h3>'
            '<p class="casa-d"><span>100&nbsp;% agave espadín, Oaxaca.</span> <span>Su marca propia.</span></p><ul class="rows">'
            + ln(DESTILADOS[0], 'Copa') + ln(DESTILADOS[1], 'Botella 1 L') + '</ul></div>')

def rows(items, title=None):
    t = f'<h3 class="sub">{E(title)}</h3>' if title else ''
    return t + '<ul class="rows">' + ''.join(row(i) for i in items) + '</ul>'

def cred(n, p, papel=''):
    iid = slug(n); carta_json[iid] = {"name": n, "detail": "", "price": p, "label": n}
    pp = f'<span class="papel">{E(papel)}</span>' if papel else ''
    return (f'<li class="cred" data-id="{iid}" data-name="{E(n)}" data-label="{E(n)}" data-price="{p}"><span class="cred-l"><span class="nm">{E(n)}</span><i class="ld" aria-hidden="true"></i><span class="pr">{peso(p)}</span></span>'
            f'<button class="plus" type="button" aria-label="Agregar {E(n)} a mi mesa"><span aria-hidden="true">+</span><b class="bdg" hidden>0</b></button>{pp}</li>')

def reparto():
    estrellas = ''.join(cred(*r) for r in REPARTO[:-1])
    esp = cred(*REPARTO[-1])
    return ('<div class="reparto" data-reparto><p class="rep-pre mq">La Cantina de Antaño presenta</p><h3 class="rep-t">El reparto</h3><p class="rep-s mq">Coctelería de especialidad</p>'
            '<ul class="creds">' + estrellas + '</ul><p class="rep-esp">y la participación especial de</p><ul class="creds">' + esp + '</ul></div>')

def clasicos():
    btns = []
    for n in CLASICOS:
        iid = slug(n); carta_json[iid] = {"name": n, "detail": "", "price": 127, "label": n}
        btns.append(f'<button class="tag" type="button" data-id="{iid}" data-name="{E(n)}" data-label="{E(n)}" data-price="127" aria-label="Agregar {E(n)} a mi mesa">{E(n)}<b class="bdg" hidden>0</b></button>')
    return ('<div class="clas"><h3 class="sub">De siempre · 300 ml · $127 cada uno</h3><div class="tags">' + ''.join(btns) + '</div></div>')

PANELS = [
 ("botanas","Botanas",
  pan(F_MESA, rows(BOTANAS))),
 ("carnes","Carnes", pan(F_TABLA, rows(CARNES))),
 ("tacos","Tacos", '<p class="lead mq">Lo nuevo</p>' + rows(TACOS)),
 ("sopas","Sopas", rows(SOPAS)),
 ("infantil","Infantil", rows(INFANTIL) + '<p class="nota">Pregunta por nuestros postres del día. Áreas infantiles en Colosio, Nacozari y Sta. Anita.</p>'),
 ("cervezas","Cervezas",
  pan(F_TARRO, rows(CERV_COMP,"Para compartir") + rows(CERV_355,"Cerveza 355 ml") + rows(CERV_VASO,"Vasos")
  + '<p class="nota">Cubetas y vasos no aplican al 2x1.</p>')),
 ("cocteles","Cocteles", '<p class="nota rep-ir">Las especialidades de $152 salen en <a href="#reparto">El reparto</a>, al final de la carta.</p>' + clasicos() + rows(COCT_SUELTOS,"Y más") + '<p class="nota">Todos los cocteles son de 300 ml. En toda la coctelería no aplica el 2x1.</p>'),
 ("destilados","Destilados",
  casa() + pan(F_BOT, rows(DESTILADOS[2:],"Copa y botella") +
  '<p class="nota">Tequilas desde $111 hasta $299 la copa: Don Ramón, Centenario, Maestro Tequilero, 1800, 30-30, Don Julio, Herradura y más. Todos los servicios se sirven con 6 refrescos. Carta completa de destilados en la cantina.</p>')),
 ("sinalcohol","Sin alcohol", rows(REFRESCOS) + '<p class="nota">Refrescos y jugos no aplican al 2x1.</p>'),
]

chips = ''.join(
  f'<button class="chip" type="button" role="tab" id="t-{pid}" aria-controls="p-{pid}" aria-selected="{"true" if i==0 else "false"}" tabindex="{0 if i==0 else -1}" data-tab="{pid}">{E(lab)}</button>'
  for i,(pid,lab,_) in enumerate(PANELS))
panels = ''.join(
  f'<div class="tab-panel{" on" if i==0 else ""}" role="tabpanel" id="p-{pid}" aria-labelledby="t-{pid}" data-tab="{pid}"{"" if i==0 else " "}>{body}</div>'
  for i,(pid,lab,body) in enumerate(PANELS))

FR = [("jpani","Fachada de la sucursal J. Pani al atardecer, con luces rosas y su terraza"),
 ("fajitas","Parrillada norteña caliente en su plancha de fierro"),
 ("mesa","Botanas en la mesa: totopos, salsa, limones y chicharrón"),
 ("barra","El botellero de la barra, con su radio antiguo"),
 ("nacozari","Sucursal Nacozari de noche, con su neón"),
 ("tampi","Tampiqueña con guacamole, arroz, frijoles y salsas"),
 ("colosio","Sucursal Colosio de noche, la original de 2001")]
FILM = ('<div class="film" id="film" aria-label="Fotos de La Cantina de Antaño. Desliza para ver más" role="group">'
  '<div class="film-band" aria-hidden="true"></div><div class="film-track" id="film-track" tabindex="0">'
  + ''.join(f'<figure class="fr"><img src="img/fr-{k}.webp" alt="{E(a)}" width="400" height="300" loading="lazy"></figure>' for k, a in FR)
  + '</div><div class="film-band" aria-hidden="true"></div></div>')

REP = reparto()
carta_html = f'''<section class="carta on-crema" id="carta" data-hide-wa aria-labelledby="carta-t">
  {FILM}
  <div class="wrap carta-in">
    <h2 class="tt" id="carta-t" data-drop><span class="ln">La carta,</span><span class="ln">completa.</span></h2>
    <figure class="carta-foto" data-reveal>
      <img src="img/fajitas-960.webp" srcset="img/fajitas-480.webp 480w, img/fajitas-960.webp 960w, img/fajitas-1600.webp 1600w" sizes="(min-width:700px) 50vw, 100vw" alt="Parrillada norteña caliente sobre su plancha de fierro, con chiles toreados y chorizo" width="1600" height="1200">
      <figcaption><b>Parrillada norteña</b><span class="mq">2 personas $588 · 4 personas $1,026</span></figcaption>
    </figure>
  </div>
  <div class="carta-tabs">
  <div class="chips-wrap"><div class="wrap"><div class="chips" role="tablist" aria-label="Categorías de la carta">{chips}</div></div></div>
  <div class="wrap carta-in">
    <div class="panels">{panels}</div>
    <p class="nota carta-nota">Precios de su carta publicada; pueden cambiar. Toca el + para sumar a tu mesa.</p>
  </div>
  </div>
  <div class="rep-band" id="reparto"><div class="wrap">{REP}</div></div>
</section>
'''
open('sections/30-carta.html','w').write(carta_html)
json.dump(carta_json, open('data/carta.json','w'), ensure_ascii=False, indent=1)

# ---------- reloj de pared ----------
cx = cy = 160
def pt(r, deg):
    a = math.radians(deg - 90)
    return cx + r*math.cos(a), cy + r*math.sin(a)
ROM = ["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"]
nums = ''
for i, n in enumerate(ROM):
    x, y = pt(88, i*30)
    nums += f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="middle" dominant-baseline="central" class="cl-n">{n}</text>'
ticks = ''
for i in range(60):
    big = i % 5 == 0
    x1, y1 = pt(108 if not big else 105, i*6); x2, y2 = pt(114, i*6)
    ticks += f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#2a140c" stroke-width="{2 if big else 1}"/>'
circ = 2*math.pi*130
dash = circ*225/360
n1 = pt(119, 45); n1b = pt(141, 45); n2 = pt(119, 270); n2b = pt(141, 270)
clock = f'''<svg class="clock" id="clock" viewBox="0 0 320 320" role="img" aria-label="Reloj de pared con el tramo del 2x1, de la 1:30 p.m. a las 9:00 p.m., pintado en rojo">
  <defs>
    <radialGradient id="cl-face" cx="50%" cy="44%" r="62%"><stop offset="0" stop-color="#f8e2af"/><stop offset="1" stop-color="#e9c483"/></radialGradient>
    <linearGradient id="cl-wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a5532"/><stop offset=".45" stop-color="#4f2a17"/><stop offset="1" stop-color="#25120a"/></linearGradient>
    <radialGradient id="cl-wood2" cx="50%" cy="50%" r="50%"><stop offset=".88" stop-color="#6b3d22" stop-opacity="0"/><stop offset=".93" stop-color="#3a1d0f" stop-opacity=".55"/><stop offset="1" stop-color="#1a0b05" stop-opacity=".8"/></radialGradient>
    <linearGradient id="cl-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2c992"/><stop offset=".5" stop-color="#a08c6e"/><stop offset="1" stop-color="#6e5a3c"/></linearGradient>
    <radialGradient id="cl-pin" cx="38%" cy="34%" r="70%"><stop offset="0" stop-color="#f3dca0"/><stop offset=".45" stop-color="#b8924f"/><stop offset="1" stop-color="#5c4220"/></radialGradient>
    <linearGradient id="cl-glass" x1="0" y1="0" x2=".7" y2=".8"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="cl-sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="2.4" flood-color="#000" flood-opacity=".45"/></filter>
  </defs>
  <circle cx="160" cy="160" r="156" fill="url(#cl-wood)"/>
  <circle cx="160" cy="160" r="156" fill="url(#cl-wood2)"/>
  <g fill="none" stroke="#f5d99c" opacity=".15"><circle cx="160" cy="160" r="153" stroke-width=".8"/><circle cx="160" cy="160" r="150.5" stroke-width=".6"/><circle cx="160" cy="160" r="147.6" stroke-width=".8"/></g>
  <circle cx="160" cy="160" r="144.5" fill="none" stroke="url(#cl-gold)" stroke-width="2.2"/>
  <circle cx="160" cy="160" r="143" fill="#2b150b"/>
  <circle cx="160" cy="160" r="141" fill="url(#cl-face)"/>
  <circle cx="160" cy="160" r="130" fill="none" stroke="#c22d23" stroke-width="20" stroke-dasharray="{dash:.1f} {circ:.1f}" transform="rotate(-45 160 160)" class="cl-band"/>
  <line x1="{n1[0]:.1f}" y1="{n1[1]:.1f}" x2="{n1b[0]:.1f}" y2="{n1b[1]:.1f}" stroke="#2a140c" stroke-width="2"/>
  <line x1="{n2[0]:.1f}" y1="{n2[1]:.1f}" x2="{n2b[0]:.1f}" y2="{n2b[1]:.1f}" stroke="#2a140c" stroke-width="2"/>
  {ticks}{nums}
  <g filter="url(#cl-sh)">
    <g id="cl-h" transform="rotate(270 160 160)"><path d="M156.6 176 L155.4 160 L160 96 L164.6 160 L163.4 176 Z" fill="#1c0e08"/></g>
    <g id="cl-m" transform="rotate(0 160 160)"><path d="M158.2 182 L157.4 160 L160 58 L162.6 160 L161.8 182 Z" fill="#1c0e08"/></g>
    <circle cx="160" cy="160" r="8" fill="url(#cl-pin)" stroke="#3a2510" stroke-width=".8"/><circle cx="160" cy="160" r="2.4" fill="#5c4220"/>
  </g>
  <path d="M 40.6 118 A 128 128 0 0 1 118 40.6 L 124 52 A 116 116 0 0 0 52 124 Z" fill="url(#cl-glass)" opacity=".55" pointer-events="none"/>
  <circle cx="160" cy="160" r="141" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="3"/>
</svg>'''

dos = f'''<section class="dos" id="dosxuno" aria-labelledby="dos-t">
  <div class="tira" aria-hidden="true"></div>
  <div class="wrap dos-in">
    <h2 class="tt dos-tt" id="dos-t" data-drop><span class="ln">2x1 en bebidas.</span><span class="ln">Hasta las 9.</span></h2>
    <figure class="dos-clock" data-reveal>{clock}<figcaption>Lo rojo es el 2x1: de 1:30 p.m. a 9:00 p.m.</figcaption></figure>
    <div class="dos-txt">
      <div class="placa"><p class="dos-live mq" id="dos-live" aria-live="polite">Todos los días de 1:30 p.m. a 9:00 p.m.</p></div>
      <p class="dos-small">No aplica en coctelería ni en vasos, refrescos, jugos, cubetas y cigarros.</p>
      <div class="dos-carro" data-reveal>
        <p>Carrito con 20 cervezas y parrillada para 4: <b class="mq">$1,535.</b></p>
        <button class="lnk" type="button" id="dos-add" data-id="carrito-con-20-cervezas-incluye-parrillada-para-4-personas" data-name="Carrito con 20 cervezas" data-label="Carrito con 20 cervezas con parrillada para 4 personas" data-price="1535"><span class="lnk-t">Agregar a mi mesa</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
      </div>
    </div>
  </div>
</section>
'''
open('sections/20-dosxuno.html','w').write(dos)
print(len(carta_json),'items; carta y reloj generados')

# ---------- 40 · las 4 cantinas ----------
cards = [
 dict(k='colosio', nom='Colosio', tag='La original, 2001', img='f-colosio', w=(480,960), iw=(960,640), alt='Fachada de La Cantina de Antaño Colosio de noche, con su letrero y luces',
      dir='Blvd. Luis Donaldo Colosio Murrieta 117, Jardines de la Concepción I', tel='449 912 8121', tel2='+524499128121',
      hor=['Lunes a domingo','1:30 p.m. a 2:00 a.m.'], rating='4.4 · 2,029 opiniones en Google', extra='Área infantil · valet parking', ll='21.9240532,-102.3116074'),
 dict(k='anita', nom='Sta. Anita', tag='', img='f-anita', w=(480,960), iw=(960,917), alt='Letrero de La Cantina de Antaño Santa Anita visto desde arriba',
      dir='Av. de la Convención de 1914 Ote. 901, Lomas de Santa Anita', tel='449 975 0938', tel2='+524499750938',
      hor=['Lunes a domingo','1:30 p.m. a 2:00 a.m.'], rating='4.3 · 2,090 opiniones en Google', extra='Área infantil', ll='21.8916869,-102.2754623'),
 dict(k='nacozari', nom='Nacozari', tag='', img='f-nacozari', w=(480,960), iw=(960,712), alt='Fachada de La Cantina de Antaño Nacozari de noche, con su techo a dos aguas y su neón',
      dir='Av. Héroe de Nacozari 2500, Jardines del Parque', tel='449 913 4289', tel2='+524499134289',
      hor=['Jueves y viernes','2:00 p.m. a 2:00 a.m.','Resto de la semana','2:00 p.m. a 10:00 p.m.'], rating='4.3 · 2,650 opiniones en Google', extra='Área infantil', ll='21.853804,-102.282404'),
 dict(k='jpani', nom='J. Pani', tag='Perímetro ferial', img='f-jpani', w=(480,960), iw=(960,720), alt='Fachada de La Cantina de Antaño J. Pani al atardecer, con terraza y arcos',
      dir='Arturo J. Pani 110, Barrio de San Marcos', tel='449 918 1964', tel2='+524499181964',
      hor=['Viernes y sábado','12:00 p.m. a 2:00 a.m.','Resto de la semana','1:00 p.m. a 2:00 a.m.'], rating='4.4 · 889 opiniones en Google', extra='', ll='21.8779174,-102.3041462'),
]
arts = []
for c in cards:
    hor = ''.join(f'<div><dt>{c["hor"][i]}</dt><dd>{c["hor"][i+1]}</dd></div>' for i in range(0, len(c['hor']), 2))
    tag = f'<p class="cc-tag mq">{c["tag"]}</p>' if c['tag'] else ''
    extra = f'<p class="cc-ex mq">{c["extra"]}</p>' if c['extra'] else ''
    arts.append(f'''      <article class="lobby cc" data-suc="{c["k"]}" data-reveal>
        <div class="cc-foto marco"><img src="img/{c["img"]}-{c["w"][1]}.webp" srcset="img/{c["img"]}-{c["w"][0]}.webp {c["w"][0]}w, img/{c["img"]}-{c["w"][1]}.webp {c["w"][1]}w" sizes="(min-width:1100px) 280px, 300px" alt="{c["alt"]}" width="{c["iw"][0]}" height="{c["iw"][1]}"></div>
        <h3 class="cc-n">{c["nom"]}</h3>{tag}
        <p class="cc-st mq" data-estado>Horario según su ficha de Google Maps</p>
        <address class="cc-dir">{c["dir"]}<br>Aguascalientes, Ags.</address>
        <a class="tel" href="tel:{c["tel2"]}">{c["tel"]}</a>
        <dl class="cc-h mq">{hor}</dl>
        <p class="cc-r mq"><svg aria-hidden="true"><use href="#i-star"/></svg>{c["rating"]}</p>
        {extra}
        <div class="cc-act">
          <a class="btn btn--red btn--sm" href="tel:{c["tel2"]}">Llamar</a>
          <a class="btn btn--line btn--sm" href="https://www.google.com/maps/dir/?api=1&amp;destination={c["ll"]}" target="_blank" rel="noopener">Cómo llegar</a>
        </div>
        <button class="btn btn--line btn--sm cc-pick" type="button" data-pick="{c["k"]}" aria-pressed="false"><span class="lnk-t">Elegir esta</span></button>
      </article>''')
cant = f'''<section class="cants" id="cantinas" aria-labelledby="cants-t">
  <div class="wrap cants-head">
    <h2 class="tt" id="cants-t" data-drop><span class="ln">Cuatro cantinas.</span><span class="ln">Elige la tuya.</span></h2>
  </div>
  <div class="strip" id="strip">
    <div class="strip-band" aria-hidden="true"></div>
    <div class="car" id="car" tabindex="0" role="group" aria-label="Las 4 cantinas. Desliza para verlas">
{chr(10).join(arts)}
    </div>
    <div class="strip-band" aria-hidden="true"></div>
  </div>
  <p class="wrap cants-nota">Horarios y calificaciones de su ficha de Google Maps; pueden cambiar. Estacionamiento, acceso para silla de ruedas y Wi-Fi en todas las sucursales.</p>
</section>
'''
open('sections/40-cantinas.html','w').write(cant)

# ---------- 60 · opciones de hora ----------
def fmt(min):
    h=(min//60)%24; m=min%60; suf='p.m.' if h>=12 else 'a.m.'; h12=h%12 or 12
    return f'{h12}:{m:02d} {suf}'
opts=''.join(f'<option value="{m//60:02d}:{m%60:02d}"{" selected" if m==1200 else ""}>{fmt(m)}</option>' for m in range(810,1381,30))
cierre = open('sections/60-cierre.tpl').read().replace('<!--HORAS-->', opts)
open('sections/60-cierre.html','w').write(cierre)
