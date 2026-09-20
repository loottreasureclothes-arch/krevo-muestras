# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **le gusto el diseno**, pero trae fallas de navegacion y las fotos se ven mal.

## Arreglar
1. **Las fotos de la carta se ven SUPER MAL en celular.** "Como que estan agrandadas, como que se hacen grandes como por la computadora, y salen un poco chuecas." Son fotos escaladas de mas o con la proporcion rota. Hay que servir el tamano correcto para 390 px y respetar la proporcion.
2. **Zoom raro al hacer scroll.** "Le das para abajo y hacen como un zoom raro, como que hubo un pedo ahi de que quiso hacer una animacion y le salio mal." Quita o arregla esa animacion de las fotos del catalogo.
3. **"Jardin" queda empalmado con "Petra"** en el header, en celular. Se encima el nombre de la casa con el logo.
4. **Header transparente.** Es gusto suyo de siempre: el header va transparente arriba y se vuelve solido al bajar.
5. **JARDIN | MARAVILLAS tiene que verse desde el inicio**, no aparecer hasta que bajas. Hoy aparece encimado sobre las fotos cuando ya bajaste.
6. **El menu hamburguesa no lleva a ninguna pagina.** Ver la nota global. Aqui ademas aplica lo de la pagina de carta aparte.

## Lo que ya esta bien (no tocar)
- El interruptor de las dos casas. El concepto le gusto.
- "Una mesa de Petra cuesta $228." "Eso esta bueno."
- La carta: enmoladas, sopes, todo eso.

## Pendiente de limpieza
La carpeta trae **307 MB de fotos y la pagina solo usa 1.8 MB**. Hay que borrar los originales que no se usan (van a GitHub y no los ve nadie).

---

# NOTA GLOBAL (aplica a TODAS las muestras)

**1. El menu hamburguesa.** Emanuel: "Es que como que no las haces funcionales de la hamburguesa, guey. No te manda para ninguna pagina."
Hoy los enlaces del menu son anclas que bajan dentro de la MISMA pagina. El espera que lo lleven a una pagina.
- Como minimo: que cada renglon del menu se vea y se sienta como navegacion de verdad (estado activo, cierre del panel, el scroll cae en el lugar correcto sin que el header tape el titulo).
- En RESTAURANTES: "Carta" / "Menu" abre **su propia pagina** (`menu.html`), no un ancla.

**2. Pagina de menu aparte, en todos los restaurantes.** Emanuel, sobre Tierra Santa: "Cuando te metas a menu, debes de mandarlos como a otra landing page de puro menu, para que se vea mas chido. Y que sea una landing page especifica para menu, y echarle mas ganas. Asi en todos los restaurantes."
Aplica a: tierra-santa, los-arroyo, pizza-y-fuego, la-cochera, dona-petra, los-abolengos, pozoleria-la-chata, susheria-galerias, lamexico.
La pagina de menu lleva el mismo header y los mismos colores, la carta completa por categorias, el pedido, y un boton de regreso claro.

**3. Peso y carga.** No es GitHub: el HTML llega en 0.24 s. Es el peso de las fotos. En toda muestra: `loading="lazy"` y `decoding="async"` en todo lo que no se ve en el primer pantallazo, tamanos servidos para 390 px, y borrar de `img/` lo que la pagina no referencia.
