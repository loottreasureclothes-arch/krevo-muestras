# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **le gustó.** "Sí, pues así como Rosita." No hay que rehacerla.

## Arreglar
1. **La barra de categorías se traba al bajar.** En la zona de chips (Todos, Cuchareables, Rebanadas, Cajas, Regalo, Pan) "se traba un poco, se queda despegado del header". Es el sticky: la barra se despega del header en vez de quedarse pegada abajo de el. Tiene que ir pegada al header, sin brincos y sin hueco, todo el recorrido del catalogo.
2. **El menu hamburguesa no lleva a ninguna pagina.** Ver la nota global.

## Lo que ya esta bien (no tocar)
- El look completo, la medalla del GIPAN, los precios reales, "Hoy ya esta hecho. Llevatelo." y "Tu pones la fecha. Yo pongo el pastel."
- La foto de la vitrina: dijo que es basica pero que esta bien. NO la cambies.

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
