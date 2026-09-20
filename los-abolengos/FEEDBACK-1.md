# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **esta buena.** "Sí, sí, está buena la chingadera." Solo detalles.

## Arreglar
1. **Todos los platillos con la misma dignidad.** "Se me hace raro que pones Especialidades y aparecen enfrijoladas Allende y tamachile con foto, y abajo sale menudo Abolengo y birria de res estilo bajio sin nada. Por que unos si los muestras bien chido y otros no? Pues todos muestralos bien." O todos con foto, o todos como carta tipografica pareja. Nada de unos con tarjeta grande y otros como renglon pelon dentro de la misma categoria.
2. **Dale mas visibilidad al menu.**
3. **"Pide tu cotizacion": los cuadros salen mal.** "El de fecha esta como salido, el recuadrito." El campo de fecha se sale de su caja. Emparejar los campos (personas, fecha, hora, espacio) para que midan y se alineen igual.
4. **Ancla rota:** el menu manda a #visitanos y ese id NO existe en la pagina.
5. **El menu hamburguesa no lleva a ninguna pagina.** Ver la nota global.

## Lo que ya esta bien (no tocar)
- El hero de las cinco horas, "Ver la carta" y "Apartar para manana".
- Como llegar y Llamar: "todo esta bien ahi".

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
