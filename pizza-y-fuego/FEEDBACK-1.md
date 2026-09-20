# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **esta bien**, menos una seccion.

## Arreglar
1. **QUITAR la seccion "Lena, ladrillo y fuego".** "Esa si se ve fea la foto, y luego que le pusiste horno de lena, hay una animacion medio fea. Yo creo que ese lo quitas."
2. **En su lugar va la UBICACION, con el mapa grande.** "Se me hace que no pusiste el mapa, no pusiste la ubicacion. En lugar de lena y fuego puedes poner la ubicacion, en el mapa grande."
3. **Dejar lo de "pizza para tus reuniones".** "Y ya, no se necesita otra cosa."
4. **El menu hamburguesa no lleva a ninguna pagina.** Ver la nota global. Aqui ademas aplica lo de la pagina de carta aparte.

## Lo demas
"Pizzas, pastas, reuniones, toma tu pedido... esta bien."

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
