#!/usr/bin/env python3
"""Genera sections/25-menu.html (menú de mesa) desde la carta real de research/menu-precios.md.
Nombres e ingredientes: DiDi (vigente) + mantel-menú del local (2024). SIN precios: los de DiDi son de app y los del mantel
ya son viejos (PENDIENTE-DUEÑO). Cada platillo lleva data-price="0", enseña los tamaños y dice "Pregunta el precio";
el pedido pide el total por WhatsApp. Regla: nunca se pinta un $0 ni un total en cero.
Para poner precios: llena el tercer campo (número) y vuelve a correr este script y build.py."""
import html, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAM = [["Chica 25 cm", 0], ["Mediana 32 cm", 0], ["Grande 36 cm", 0]]


def corto(opts):
    """Etiquetas cortas SOLO para el renglón visible de tamaños (el pedido y el WhatsApp
    siguen usando la etiqueta completa: "Grande 36 cm")."""
    ls = [o[0] for o in opts]
    if len(ls) > 1 and all(l.endswith(" cm") for l in ls):
        return [ls[0]] + [l[:-3] for l in ls[1:]]
    return ls

# (id, nombre, descripción, foto, opciones)
CARTA = [
    ('m-pizzas', 'Pizzas a la leña', 'Chica 25 cm, mediana 32 cm o grande 36 cm. ¿Un ingrediente extra? Escríbelo en la nota del pedido.', [
        ('margherita', 'Margherita', 'Mozzarella y albahaca.', None, TAM),
        ('fuego', 'Fuego', 'Pepperoni y chile.', None, TAM),
        ('hawaiana', 'Hawaiana', 'Jamón y piña.', 'hawaiana', TAM),
        ('mexicana', 'Mexicana', 'Chorizo, cebolla, chile y granos de elote.', 'mexicana', TAM),
        ('quattro-stagioni', '4 Stagioni', 'Jamón, champiñones, aceitunas negras y alcachofas.', 'quattro-stagioni', TAM),
        ('prosciutto-funghi', 'Prosciutto e Funghi', 'Jamón y champiñones.', None, TAM),
        ('tonno-cipolla', 'Tonno e Cipolla', 'Atún y cebolla.', None, TAM),
        ('vegetariana', 'Vegetariana', 'Calabaza, champiñones, morrón y cebolla.', None, TAM),
        ('tedesca', 'Tedesca', 'Salchicha y jamón.', None, TAM),
        ('picante', 'Picante', 'Salami, aceitunas negras y chile.', None, TAM),
        ('capricciosa', 'Capricciosa', 'Jamón, aceitunas y champiñones.', None, TAM),
        ('napoletana', 'Napoletana', 'Anchoas, alcaparras y aceitunas.', None, TAM),
        ('4-quesos', '4 Quesos', 'Cuatro quesos.', None, TAM),
        ('mare-monti', 'Mare e Monti', 'Camaroncitos y champiñones.', None, TAM),
        ('ferrarese', 'Ferrarese', 'Pepperoni, jamón y salami.', None, TAM),
        ('salmon', 'Salmón', 'Salmón ahumado y alcaparras.', None, TAM),
        ('iberica', 'Ibérica', 'Jamón serrano.', None, TAM),
    ]),
    ('m-entradas', 'Entradas', 'Brusquetas: las tapas italianas, en pan caliente recién salido del horno.', [
        ('brusquetas-miste', 'Brusquetas Miste', 'Surtido de 4: 2 pomodoro, 1 tonnata y 1 de salmón.', 'brusquetas-miste', None),
        ('brusqueta-pomodoro', 'Brusqueta Pomodoro', '4 piezas. Pan artesanal con jitomate, aceite de olivo y albahaca.', 'brusqueta-pomodoro', None),
        ('brusqueta-tonnata', 'Brusqueta Tonnata', '4 piezas. Salsa de atún con alcaparras y mayonesa.', None, None),
        ('brusqueta-salmon', 'Brusqueta de Salmón', '4 piezas. Queso crema y salmón ahumado.', None, None),
        ('provoleta', 'Queso Provoleta', 'Rueda de queso horneada.', None, None),
    ]),
    ('m-ensaladas', 'Ensaladas', '', [
        ('caprese', 'Insalata Caprese', 'Jitomate, mozzarella y albahaca.', 'caprese', None),
        ('nostra', 'Insalata Nostra', 'Lechuga, jitomate, pepino, morrón, aceitunas negras, champiñones y parmesano.', None, None),
        ('mista', 'Insalata Mista', 'Lechuga, pepino, jitomate y aceitunas.', None, None),
        ('caesar', 'Insalata Caesar', 'Con o sin pechuga de pollo.', None, [["Sin pollo", 0], ["Con pollo", 0]]),
        ('verduras-vapor', 'Verduras al Vapor', 'Chayote, brócoli y zanahoria.', None, None),
    ]),
    ('m-pastas', 'Pastas y lasaña', '', [
        ('lasagna', 'Lasagna Bolognese', 'Carne molida, mozzarella, parmesano y jitomate, gratinada en cazuela.', 'lasagna', None),
        ('spaghetti-bolognese', 'Spaghetti Bolognese', 'Con salsa bolognesa.', 'spaghetti-bolognese', None),
        ('fusilli-amatriciana', 'Fusilli Amatriciana', 'Salsa de jitomate, tocino y cebolla.', 'fusilli-amatriciana', None),
        ('spaghetti-frutti-di-mare', 'Spaghetti Frutti di Mare', 'Camarón, calamar, surimi, mejillón y pulpo con chile guajillo y ajo.', 'spaghetti-frutti-di-mare', None),
        ('spaghetti-zucchini', 'Spaghetti Zucchini', 'Calabacitas, ajo, aceite de oliva, chile en polvo y parmesano.', 'spaghetti-zucchini', None),
        ('spaghetti-carbonara', 'Spaghetti Carbonara', 'Crema, huevo, tocino y cebolla.', None, None),
        ('spaghetti-mozzarella', 'Spaghetti Mozzarella', 'Salsa de jitomate, mozzarella, chile en polvo y pimienta.', None, None),
        ('spaghetti-puttanesca', 'Spaghetti Puttanesca', '', None, None),
        ('fusilli-4-quesos', 'Fusilli Cuatro Quesos', 'Gorgonzola, parmesano, añejo y mozzarella.', None, None),
        ('fusilli-salmon', 'Fusilli de Salmón', 'Crema, salmón ahumado, cebolla y perejil.', None, None),
        ('fusilli-mare-monti', 'Fusilli Mare e Monti', 'Camarones, champiñones, salsa de jitomate y crema.', None, None),
        ('fusilli-gamberetti', 'Fusilli ai Gamberetti', 'Camarones, ajo, chile y orégano.', None, [["Con crema", 0], ["Sin crema", 0]]),
        ('ravioli', 'Ravioli di Carne', 'En salsa pomodoro.', None, None),
    ]),
    ('m-carnes', 'Carnes', '', [
        ('arrachera', 'Arrachera', '250 g.', None, None),
        ('pollo-rosmarino', 'Pollo al Rosmarino', '250 g.', None, None),
        ('pollo-mozzarella', 'Pollo alla Mozzarella', '', None, None),
    ]),
    ('m-postres', 'Postres y café', '', [
        ('pizza-nutella', 'Pizza de Nutella', '', None, None),
        ('helado-amaretto', 'Helado de Amaretto', '', None, None),
        ('pasteles', 'Pasteles de la casa', 'Selección de pasteles de la casa.', None, None),
        ('cafe', 'Café', 'Americano o espresso.', None, [["Americano", 0], ["Espresso", 0]]),
        ('cappuccino', 'Cappuccino', '', None, None),
    ]),
    ('m-bebidas', 'Bebidas y vino', 'Pregunta por nuestra cava.', [
        ('limonada', 'Limonada natural', 'Vaso o jarra.', None, [["Vaso", 0], ["Jarra 1 L", 0], ["Jarra 2 L", 0]]),
        ('limonada-mineral', 'Limonada mineral', 'Vaso o jarra.', None, [["Vaso", 0], ["Jarra 1 L", 0], ["Jarra 2 L", 0]]),
        ('naranjada', 'Naranjada', 'De temporada.', None, [["Vaso", 0], ["Jarra 1 L", 0], ["Jarra 2 L", 0]]),
        ('te-jazmin', 'Té de jazmín', '500 ml, con oolong y limón natural.', None, None),
        ('refresco', 'Refresco', 'Coca-Cola o Sprite, 355 ml.', None, [["Coca-Cola", 0], ["Sprite", 0]]),
        ('agua', 'Agua', 'Natural o mineral.', None, [["Natural", 0], ["Mineral", 0]]),
        ('cerveza', 'Cerveza', 'Corona, Victoria, Modelo Especial o Negra Modelo.', None, [["Corona", 0], ["Victoria", 0], ["Modelo Especial", 0], ["Negra Modelo", 0]]),
        ('vino-casa', 'Vino de la casa', 'Tinto o blanco.', None, [["Copa", 0], ["Garrafa ½ L", 0], ["Botella", 0]]),
    ]),
]

CHIP = {'m-pizzas': 'Pizzas', 'm-entradas': 'Entradas', 'm-ensaladas': 'Ensaladas', 'm-pastas': 'Pastas',
        'm-carnes': 'Carnes', 'm-postres': 'Postres y café', 'm-bebidas': 'Bebidas y vino'}

e = lambda s: html.escape(s, quote=True)
out = []
out.append('''  <!-- 25 MENÚ DE MESA · paso 3 (opciones) y 4 (personalizar). Generado por gen/menu.py (no editar a mano).
       Carta real (DiDi + mantel del local). Sin precios: cada platillo dice "Pregunta el precio" y el pedido pide el total por WhatsApp.
       Nunca se pinta un $0 (PENDIENTE-DUEÑO: precios de mostrador 2026). En cuanto lleguen, data-price deja de ser 0 y el total se arma solo. -->
  <section class="pf-mm" id="menu" data-hide-wa aria-labelledby="pf-mm-title">
    <div class="k-wrap pf-mm-head">
      <p class="pf-mm-eyebrow"><span class="pf-mm-mesa" id="pf-mm-mesa" hidden></span><span>Menú de la casa</span></p>
      <h2 class="pf-h2 pf-h2--xl pf-mm-title" id="pf-mm-title">Arma tu pedido.</h2>
      <p class="pf-mm-lead">Toca un platillo, elige tamaño y mándalo por WhatsApp directo al restaurante. ¿Ya estás en tu mesa? Enséñaselo a tu mesero.</p>
    </div>
    <div class="k-wrap pf-mm-find"><label class="pf-mm-search" for="pf-mm-q"><span class="pf-mm-search-ic" aria-hidden="true"></span><input id="pf-mm-q" type="search" placeholder="Busca: lasaña, fuego, caprese" autocomplete="off" enterkeyhint="search" aria-label="Busca un platillo o bebida"><button class="pf-mm-search-x" type="button" aria-label="Borrar búsqueda" hidden>&times;</button></label><p class="pf-mm-noresult" hidden></p></div>''')
out.append('    <nav class="pf-mm-chips" aria-label="Categorías del menú"><div class="pf-mm-chips-in">' +
           ''.join('<a class="pf-mm-chip" href="#%s">%s</a>' % (cid, e(CHIP[cid])) for cid, *_ in CARTA) + '</div></nav>')
out.append('    <div class="k-wrap pf-mm-body">')
for cid, ctitle, cnote, items in CARTA:
    out.append('    <section class="pf-mm-cat" id="%s" aria-labelledby="%s-t">' % (cid, cid))
    out.append('      <header class="pf-mm-chead"><h3 class="pf-mm-ctitle" id="%s-t">%s</h3>%s</header>' % (cid, e(ctitle), ('<p class="pf-mm-cnote">%s</p>' % e(cnote)) if cnote else ''))
    out.append('      <div class="pf-mm-list">')
    for iid, name, desc, foto, opts in items:
        cls = 'pf-mm-card' + ('' if foto else ' pf-mm-card--tx') + (' pf-mm-card--multi' if opts else '')
        attrs = 'data-id="%s" data-name="%s" data-price="0" data-desc="%s"' % (iid, e(name), e(desc))
        if foto:
            attrs += ' data-img="img/menu/%s.webp"' % foto
        if opts:
            attrs += " data-opts='%s'" % e(json.dumps(opts, ensure_ascii=False))
        sizes = ('<span class="pf-mm-sizes">%s</span>' % ' · '.join(e(o) for o in corto(opts))) if opts else ''
        ph = ('\n          <figure class="pf-mm-ph"><img src="img/menu/t/%s.webp" alt="%s de Pizza y Fuego" width="320" height="320" loading="lazy" decoding="async"></figure>' % (foto, e(name))) if foto else ''
        out.append('''        <article class="%s" %s>
          <button class="pf-mm-hit" type="button" aria-label="Ver %s"></button>%s
          <div class="pf-mm-tx"><h4 class="pf-mm-name"><span>%s</span><span class="pf-mm-ask">Pregunta el precio</span></h4>%s%s</div>
          <div class="pf-mm-ctl"></div>
        </article>''' % (cls, attrs, e(name), ph, e(name), ('<p class="pf-mm-desc">%s</p>' % e(desc)) if desc else '', sizes))
    out.append('      </div>')
    out.append('    </section>')
out.append('    <p class="pf-mm-legal">Carta de referencia. <b>Pregunta el precio por WhatsApp</b>: te confirmamos el total, la disponibilidad y el tiempo antes de que pagues.</p>')
out.append('    </div>')
out.append('  </section>')
open(os.path.join(ROOT, 'sections', '20-menu.html'), 'w').write('\n'.join(out) + '\n')
print('20-menu.html:', sum(len(c[3]) for c in CARTA), 'platillos')
