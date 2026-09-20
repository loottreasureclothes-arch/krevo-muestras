# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **esta bien.** Solo dos cambios.

## Arreglar
1. **Poner llegada y salida, como los hoteles.** "Yo le pondria llegada y salida, como adentro siempre ponen como diagonales, como 00/00/0000 salida 00/00/0000, ya le pones y cambia." O sea: dos campos de fecha con la mascara de diagonales visible, que al llenarlos actualicen lo que se ve (noches y lo que sigue).
2. **Quitar "imagen ilustrativa".** "Para que le pones imagen ilustrativa, no le pongas imagen ilustrativa a las cosas." Fuera esa etiqueta de toda la pagina.
3. **El menu hamburguesa no lleva a ninguna pagina.** Ver la nota global.

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
