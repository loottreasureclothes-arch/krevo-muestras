# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **RECHAZADA.** "Everclean esta muy fea, a diferencia de Limpio Suprime. Limpio Suprime esta mucho mas chida que Everclean. Mucho mas."

## Lo que hay que hacer
Ponerla al nivel de `krevo-muestras/limpio-suprime/` (https://loottreasureclothes-arch.github.io/krevo-muestras/limpio-suprime/), que es del mismo giro y le gusto mucho mas.

Primero **estudia limpio-suprime a fondo**: abrela, capturala con krevo-shot en celular, mira la hoja de contacto y escribe que tiene ella que a Everclean le falta (ritmo, tamano de fotos, tipografia, como presenta el servicio, el cierre). De ahi sale el plan.

**NO la copies calcada:** el header, el color y el componente firma tienen que seguir siendo propios de Everclean, si no truena la prueba anti-generico. Lo que hay que igualar es el NIVEL DE TERMINADO, no el dibujo.

**NO toques la carpeta limpio-suprime:** es del socio.

## Lo unico que se salva tal cual
El antes y despues de sus propios muebles. Eso es de ellos y es real.

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
