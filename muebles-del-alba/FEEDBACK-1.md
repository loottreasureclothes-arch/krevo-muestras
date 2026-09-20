# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **hay que rearmarla como tienda en linea, tipo Boxroom Shop.** El contenido esta bien; el acomodo no.

## El acomodo que pidio, en orden
1. Arriba: **slider/banner de productos** con su boton ("Ver catalogo" / "Compra ahora"). Dos o tres sillones.
2. Luego: **los productos con su precio**, todo el piso.
3. Luego: **otro banner** y **otro tipo de producto**.
4. Luego: **otro banner** y **otro tipo de producto**. Y asi.
   Textual: "sliders, sin circulitos... y luego ya empiezan los productos, todo el piso con su precio... y luego otro banner y otro tipo de producto."

## Arreglar
1. **Sin circulitos.** Nada de puntitos de paginacion en los sliders.
2. **Fotos completas, NO recortadas en arco.** "Hay muchas fotillos que recortas como en arquito. Mejor foto completa." Quitar todos los marcos de arco.
3. **Los chips (Todos / Salas / Esquineras / Comedores) tienen que marcar cual esta puesto** y mostrar **10 piezas por grupo**, no 4 ni 8.
4. **El menu hamburguesa no lleva a ninguna pagina.** Ver la nota global.
5. **Peso: 7.9 MB de fotos.** Carga lento. Las de abajo con loading=lazy y bajarles el tamano.

## Lo que ya esta bien (no tocar)
- Los cuadritos de color que cambian la foto del mueble. "Eso si esta bien."
- "Lo que ves aqui, te lo llevas hoy." "Eso esta bien."
- Los paquetes (Pa' que te duermas / te independices / te alcance / Capitoneado / Plus): le chocan un poco los nombres pero son de ellos. "Si ellos lo pusieron, pues tu sabras... no esta tan mal tampoco eso." SE QUEDAN, pero NO mandan: mandan los productos.

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
