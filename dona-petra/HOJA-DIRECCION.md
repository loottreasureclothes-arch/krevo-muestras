# HOJA DE DIRECCION - carpeta `dona-petra/` - marca visible: **PETRA**
Direccion de arte, 20 sep 2026. Manda sobre cualquier texto viejo de esta carpeta.
Todo lo de aqui sale de `research/` con fuente. Lo que no aparece aqui, no se pone.

## AVISO 0: cual de las dos marcas se construye (leelo antes de tocar nada)
`research/hechos.md` seccion 0: hay DOS marcas y **no esta verificado** que sean la misma familia.

1. **Cocina Mexicana Dona Petra** (la de la feria, "desde 1939", "la de la mano sabrosa", logo `research/logo.png`).
2. **Petra - Un pedacito de Mexico en tu mesa** (Galeana Sur 382 junto al Jardin Miguel Hidalgo, y Petra Cenaduria en Paseo de las Maravillas 100; logo `research/logo-petra.png`).

**La muestra se construye 100% como PETRA (marca 2).** Razon, no gusto: de la marca 1 no hay carta, ni precios, ni resenas con texto, ni una sola foto usable (las de la feria son cuadros de video de 2017 con "#75Anos" quemado, o foto de prensa). De Petra si hay carta con 45 platillos y precio, 17 fotos reales y 5 resenas firmadas con 4.9 de 66. Sin eso no se puede cumplir la regla de "productos a la vista con precio real".

**Prohibido mezclar.** En la pagina NO aparece: 1939, "89 anos", "4 generaciones", "la de la mano sabrosa", la fundadora, la Feria de San Marcos como propia, el cabrito, ni el logo circular de colores (`logo.png`). Nada de la feria.

La carpeta se sigue llamando `dona-petra/` (asi esta en el repo y en el lead). En pantalla y en el SEO la marca es **Petra**.

**Pregunta 1 para Emanuel antes de mandarla:** confirmar con el WhatsApp 449 155 4787 a cual de las dos marcas le contestamos. Si resulta ser la de la feria, el esqueleto de esta hoja sirve igual pero hay que pedirle carta, precios y fotos; no se cambia nada por nuestra cuenta.

---

## 1. EL TRABAJO
Que el que llega con hambre arme su pedido con precios a la vista y lo mande por WhatsApp a la sucursal correcta, sin pasar por Rappi ni por Uber.

Eso es todo. Presentar el restaurante no es el trabajo: es el efecto secundario.

## 2. LA PROMESA
> **En Galeana Sur 382 la puerta de madera da al Jardin Miguel Hidalgo: te sientas, te ponen las salsas, las tostadas y el chicharron duro, y los martes las suizas van 2x1.**

Fuentes: letrero de la fachada (foto 03 dice textual "UN PEDACITO DE MEXICO EN TU MESA"), direccion y jardin en `hechos.md` §3, extras de mesa en la resena de Arturo Villanueva (`resenas.md` 1), 2x1 de martes confirmado dos veces (TikTok abr 2025 + resena de Sofia Esquivel 2026).
El de al lado no puede decir ninguna de las tres cosas juntas.

## 3. EL MOMENTO FIRMA - "Una mesa de Petra cuesta $228"
**Donde:** seccion 3.
**Foto:** `research/fotos/02-maps-cenaduria-pozole-verde-horchata.jpg` (1290x1634, sin gente, sin texto quemado), a sangre, 62svh en celular.
**Que pasa:** al entrar la seccion caen tres etiquetas sobre los objetos REALES de la foto, con una linea de 1 px que las une al objeto, y despues cae el total.

| Orden | Ancla aprox. (x%, y% de la foto) | Objeto real | Texto exacto |
|---|---|---|---|
| 1 | 34%, 27% | el vaso de horchata | `Agua de horchata  ·  $49` |
| 2 | 58%, 30% | el vasito de salsa | `"Las salsas, las tostadas y el chicharron duro que te ponen para acompanar."  - Arturo Villanueva, resena de Google` (dos renglones, 12 px, el credito en beige al 60%) |
| 3 | 43%, 62% | el plato de pozole | `Pozole Verde Mediano  ·  $179` |
| 4 | debajo de la foto | - | `Tu mesa: $228` en display grande, la cifra en rosa talavera |

**Disparo:** ScrollTrigger cuando la seccion llega al 45% del viewport. Cada etiqueta 260 ms, ease-out `cubic-bezier(.23,1,.32,1)`, escalonadas 140 ms; el total entra a los 900 ms. **Total 1.16 s, reversible al subir, sin pin.** La linea de 1 px se dibuja con `scaleX`.
**Blindaje:** a los 1.6 s todo visible aunque falle GSAP; con `prefers-reduced-motion` aparece el estado final directo. Las anclas en % se verifican a ojo sobre el recorte final: si el recorte movio el plato, se corrigen los %.
**Cierre del momento:** boton en color de marca `AGREGAR ESTA MESA`, que mete Pozole Verde Mediano y Agua de horchata al pedido y prende la barra "Mi pedido". No es decoracion: es la unica animacion de la pagina que termina en una venta.

## 4. EL COMPONENTE FIRMA - "El cambio de casa" (no esta en COMPONENTES-USADOS.md)
Un interruptor de dos posiciones, **JARDIN | MARAVILLAS**, que vive pegado en el header en cuanto se pasa el hero y manda sobre TODA la pagina.

De donde sale: el problema real de este negocio es que en internet hay cuatro telefonos, dos horarios que no coinciden y una ficha marcada "cerrado" (`hechos.md` §3 y `VENDE.md` 4). El cliente no sabe a cual ir ni si esta abierto. El interruptor es la pagina contestando eso en un toque.

Al cambiar de posicion, en menos de 300 ms y sin recargar:
- cambia el renglon de estado, calculado con los horarios reales del navegador: `Abierto ahora, cierra a las 23:00` / `Cierra en 40 min` / `Hoy descansa`.
- cambia la direccion, el link de Google Maps y el boton de Llamar (Jardin 449 186 6250, Maravillas 449 547 3944).
- cambia el destino del pedido: el mensaje de WhatsApp arranca con `Pedido para Petra Jardin (Galeana Sur 382)` o `Pedido para Petra Cenaduria (Paseo de las Maravillas 100)`. El numero es el mismo (449 155 4787), es el unico WhatsApp que tenemos.
- si es miercoles y esta en MARAVILLAS, sale el aviso `Hoy la Cenaduria descansa. El Jardin abre a las 15:00.` con un link que mueve el interruptor.

Horarios que se programan (y nada mas):
- **Jardin / Galeana Sur 382:** 8:00 a 14:00 y 15:00 a 23:00 (Google Maps, sab 19 sep 2026).
- **Maravillas / Cenaduria:** lun, mar, jue y vie 14:00 a 22:00; sab y dom 14:00 a 22:30; **miercoles cerrado** (Google Maps).

Es el esqueleto de la pagina, no un adorno: aparece en el header, manda en la seccion 6 y arma el mensaje del carrito.

## 5. HEADER Y FORMAS PROPIAS
**De donde salen:** el sello circular del logo (`research/logo-petra.png`), el azulejo de talavera cuadrado de la fachada (foto 03), la flor de talavera rosa de cuatro petalos del logo, y las letras doradas del letrero.

**Header (no se parece a ninguna otra muestra):**
- 56 px celular / 64 px compu. Sobre el hero: **sin barra, transparente**. Al centro el sello circular de Petra a 44 px. A la derecha, una sola accion: `CARTA`, texto beige en marco de 1 px, mayusculas con `letter-spacing: .16em`, 12 px. A la izquierda nada.
- Al pasar 40 px: la barra se pinta `#212C3C` al 94% con blur de 8 px y una linea beige de 1 px abajo; el sello baja a 32 px y se va a la izquierda con la palabra `PETRA` en beige; **al centro aparece el interruptor JARDIN | MARAVILLAS** (la casa activa subrayada en rosa talavera); a la derecha se queda `CARTA`.
- **Sin hamburguesa** (son 7 secciones; `CARTA` es ancla a la seccion 2). El WhatsApp flotante verde del kit se queda abajo a la derecha.
- Cuando hay algo en el pedido, barra fija abajo `Mi pedido · N   ·   $000` en color de marca, con `env(safe-area-inset-bottom)`.

**Lenguaje de formas:**
- **Radio 0** en botones, tarjetas, marcos y chips. Radio 2 px solo en las bandas de papel. **El unico circulo de toda la pagina es el sello de Petra** (header y cierre). Nada de pildoras.
- **Marcos de foto:** las fotos chicas de la carta (600x900) NUNCA van a sangre: van dentro de un marco de 10 px de `#3D4E68` con filo interior beige de 1 px, como un azulejo. Las cuatro fotos grandes (02, 03, 04, 05) si van a sangre, sin marco.
- **Divisor:** linea beige de 1 px al 30% con la flor de talavera de 14 px centrada encima.
- **Un solo motivo grafico:** la flor de talavera de cuatro petalos (SVG, trazo de 1 px). Aparece en el divisor, como vinneta del eyebrow y como palomita de la lista "Todo listo para completar". En ningun otro lado.
- **Botones:** rectangulares, alto 48 a 52 px, mayusculas `.16em`. Primario: relleno beige `#D0C0A0` con tinta `#212C3C`. Secundario: contorno beige de 1 px sobre el lienzo. Terciario: texto beige con flecha. El `+` de Agregar va en beige, NO en verde.

**Color (5 tokens y el verde, nada mas):**
| Token | Hex | Uso |
|---|---|---|
| `--deep` | `#212C3C` | lienzo de toda la pagina (azul noche del logo) |
| `--deep-2` | `#3D4E68` | bandas, marcos de foto, fondo del sello |
| `--paper` | `#EFE7DA` | bandas de lectura: la carta y el carrito |
| `--brand` | `#D0C0A0` | letras del letrero: botones, navegacion, textos |
| `--flor` | `#D050A0` | flor de talavera: ultima linea de los titulos, cifras grandes, subrayado del interruptor |
| `--wa` | `#25d366` | solo lo que manda WhatsApp de verdad |
Nada de fondo blanco ni negro puro. Nada de naranja. `--flor` solo en texto grande (a 3.7:1 no sirve para parrafos).

**Tipografia:** display **Fraunces** 300 (y 700 solo para la cifra 4.9), texto **Instrument Sans** 400/500. Nada de Inter. Titulos `clamp(40px,11.5vw,64px)` en celular y `clamp(64px,5.6vw,104px)` en compu, `line-height:.95`, un `span` por renglon con `nowrap`, **ultima linea en `--flor`**, y caen (y +18 px, 320 ms, escalonados 90 ms).

**Logo:** del `research/logo-petra-banner-fb.jpg` (o del PNG) se recorta el sello y se guarda sin el cuadro claro atras en `img/brand/petra-sello.png`. En el header va sobre transparente; en el cierre va a mas del 60% del ancho sobre la banda `#3D4E68`.

## 6. LAS SECCIONES (7, tope 9,000 px en celular)
Presupuesto de alto en celular entre parentesis. Ninguna foto se repite.

**1. HERO - "Un pedacito de Mexico en tu mesa." (844 px, 100svh)**
Razon de venta: es lo primero que ve el que busco "restaurante mexicano Aguascalientes"; si no sabe donde esta ni que se come, se va.
Foto grande: `03-maps-galeana-fachada-noche.jpg` a sangre (fachada de noche, letras doradas COMPLETAS, sin gente).
Titulo (dos tonos, cae): `Un pedacito de Mexico` / `en tu mesa.` (la segunda linea en `--flor`). Es la frase de su propio letrero.
Debajo, una linea: `Galeana Sur 382, frente al Jardin Miguel Hidalgo. Y la Cenaduria en Paseo de las Maravillas 100.`
Botones: `VER LA CARTA` (primario beige) y `COMO LLEGAR` (contorno). **Cero verde aqui.**
Sin video: se usa foto fija. No hay material para `hero_video.py` sin repetir fotos.

**2. LA CARTA A LA VISTA (2,300 px) - va pegada al hero**
Razon de venta: es la tienda. Sin esto la pagina no cobra y la suscripcion mensual no se vende.
Chips de categoria pegados arriba: `PLATILLOS` `POZOLES` `ENTRADAS` `POSTRES` `BEBIDAS`. Solo se pinta la categoria activa (crossfade), para no pasarse de alto.
Tarjetas uniformes, 2 columnas en celular y 4 en compu: foto real en su marco, nombre, una linea de que lleva, **precio real** en `tabular-nums` y `+ Agregar` en beige.
Las 12 tarjetas con foto real (archivo -> platillo -> precio):
`09-rappi-enchiladas-rojas` Enchiladas Rojas $204 · `07-rappi-enchiladas-verdes` Enchiladas Verdes $204 · `08-rappi-enchiladas-suizas` Enchiladas Suizas $211 · `10-rappi-enchiladas-potosinas` Enchiladas Potosinas $236 · `11-rappi-enmoladas` Enmoladas $236 · `12-rappi-pozole-verde-mediano` Pozole Verde Mediano $179 · `13-rappi-pozole-rojo-mediano` Pozole Rojo Mediano $161 · `14-rappi-flautines` Flautines $179 · `15-rappi-sombrero-de-guacamole` Sombrero de Guacamole $130 · `21-rappi-helado-de-elote` Helado de Elote $89 · `22-rappi-molino-de-viento` Molino de Viento $97 · `23-rappi-corazon-de-petra` Corazon de Petra $89.
Las descripciones se copian tal cual de `research/menu-precios.md`.
Abajo, `TAMBIEN EN LA CARTA`: lista tipografica (nombre a la izquierda, precio a la derecha, `+` beige) con lo que NO tiene foto digna: Mini Guacamaya $89, Tostadas 2 pz $106, Enchiladas en Chile Pasilla $227, Enjitomatadas $219, Enfrijoladas $219, Quesadillas de Cochinita $195, Tacos Dorados $130, Sol de Petra $179, Pozole Rojo Grande $204, Pozole Verde Grande $219, Huaraches $129, Pambazo $129, Mollete $98, Sopes $83, Arroz con Leche $74, Panacota $102, Bomba $114, Limonada $74, Atole $65, Cafe de Olla $57, Agua de Horchata $49, Agua de Jamaica $49.
**Excepcion escrita al tope de "3 fotos chicas":** no aplica al catalogo, que son tarjetas de tienda uniformes. Si aplica a las secciones 1, 3, 4, 5, 6 y 7.
Aqui NO hay foto grande a proposito: la foto grande son los platillos.

**3. EL MOMENTO FIRMA - "Una mesa de Petra cuesta $228." (900 px)**
Razon de venta: ensena el ticket real de una visita. El que ve el total no pregunta "sale caro?" y ademas se lleva dos platillos al carrito de un toque.
Foto grande: `02-maps-cenaduria-pozole-verde-horchata.jpg` a sangre. Detalle completo en el punto 3.
Titulo: `Una mesa de Petra` / `cuesta $228.` (segunda linea en `--flor`).

**4. LOS MARTES (760 px)**
Razon de venta: llena el dia flojo con el platillo que mas piden, y hoy la promo solo se sabe de boca en boca.
Foto grande: `05-maps-cenaduria-enchiladas-terraza.jpg` a sangre (enchiladas rojas en plato azul, jardin desenfocado).
Eyebrow: `MARTES EN PETRA`. Titulo: `Las suizas, o las rojas,` / `van 2x1.` Una linea: `Solo los martes. Enchiladas Suizas $211 o Enchiladas Rojas $204.`
Boton: `AGREGAR SUIZAS` (beige). Cero verde.
Nada de sello ni de platos que chocan: ese componente ya es de la susheria.

**5. LO QUE DICEN (820 px, sin foto)**
Razon de venta: 4.9 de 66 es lo unico que convence al que nunca ha ido, y hoy esa prueba vive escondida en Google.
Sin foto, sin boton: pausa tipografica sobre el lienzo oscuro.
Una sola cifra gigante: `4.9` en Fraunces 700 con la linea `de 66 opiniones en Petra Cenaduria (Google, sep 2026)`.
Tres resenas reales, textuales, con nombre y estrellitas, de `research/resenas.md` (1 Arturo Villanueva, 2 Cristina Salas, 4 Sofia Esquivel). Se recorta el largo, no se reescribe.
**Prohibido:** la fila de contadores, y las 3 resenas de la taqueria del Mercado Teran (no esta confirmado que sean del mismo negocio).

**6. LAS DOS CASAS (1,250 px) - el componente firma en grande**
Razon de venta: el que no encuentra horario correcto no llega. Hay cuatro telefonos en internet y una ficha marcada "cerrado".
Foto grande: `04-maps-cenaduria-letrero-noche.jpg` a sangre (letrero "Petra" retroiluminado completo).
Titulo: `Dos casas.` / `Elige la tuya.`
El interruptor grande con las dos tarjetas: direccion, horario real, estado calculado ahora, `COMO LLEGAR` (contorno, a su link de Maps) y `LLAMAR`.
Dato real permitido en la casa del Jardin: `Se permiten perros` (Google Maps) y la terraza al jardin.
**Unico verde de la seccion:** `PREGUNTA POR TU MESA` (arma el WhatsApp: dia, hora, cuantos y la casa elegida). Va redactado como pregunta, no como promesa: no esta confirmado que tomen reservaciones.

**7. TODO LISTO PARA COMPLETAR + CIERRE (1,100 px)**
Razon de venta: es la venta del siguiente paso (la suscripcion mensual) y deja claro que la muestra ya funciona.
Lista con la flor de palomita: carta y precios de mesa, fotos originales en alta de los platillos, confirmar horarios y a que casa contesta cada telefono, si toman reservaciones y eventos, link de cobro con tarjeta.
Renglon fijo que se queda: `Tarjeta en linea: te mandamos el link.`
Cierre: el sello de Petra a mas del 60% del ancho sobre `#3D4E68`, la frase `Te esperamos en Petra.` y el pie con las redes REALES en SVG de 44 px: Facebook `facebook.com/p/Petra-cocina-mexicana-61571516240963`, Instagram `@petracocinaags` (Jardin) e Instagram `@petra_ags` (Cenaduria), mas WhatsApp. Nada de TikTok ni de Rappi ni de Uber.

**La hoja (sheet), no es seccion:** el carrito. Mi pedido con cantidades, total real, `Para llevar / En el lugar`, forma de pago (`Efectivo` / `Tarjeta en linea: te mandamos el link`), el renglon `El restaurante confirma el total por WhatsApp.` y el **unico boton verde grande: `ENVIAR MI PEDIDO POR WHATSAPP`** a `wa.me/524491554787` con la lista, el total y la casa elegida. Si algun dia falta un precio: `Pregunta el precio` y total `te lo confirmamos por WhatsApp`. Nunca `$0`.

## 7. EL RITMO
Secciones que **NO** llevan eyebrow-titulo-parrafo-boton:
- **2 (carta):** chips + rejilla de tienda + lista tipografica. Sin parrafo.
- **3 (momento firma):** foto a sangre con etiquetas que caen; el titulo va encima de la foto y no hay parrafo.
- **5 (resenas):** cifra gigante + tres citas. Sin eyebrow, sin boton, sin foto.
- **6 (dos casas):** interruptor y dos tarjetas de dato; el texto es horario y direccion, no parrafo.
Con el patron clasico se quedan solo la 1, la 4 y la 7, y nunca van seguidas (1 - 2 - 3 - 4 - 5 - 6 - 7). Alto total con presupuesto: ~7,974 px mas el pie.

## 8. LO QUE NO VA
- Nada de la marca de la feria: 1939, 89 anos, 75 anos, 4 generaciones, "la de la mano sabrosa", la fundadora, Rosa Maria, Salvador, cabrito, huaraches "estilo Mexico" como historia, la Feria de San Marcos o de Leon como suya, `research/logo.png`.
- **Fotos prohibidas:** 01 (cara de una clienta, sin permiso), 06 (local de la feria, otra marca), 25, 26, 27 y 28 (traen subtitulo de TikTok quemado), 29 (foto de prensa), 30 a 36 (cuadros de video con "#75Anos" quemado). 24 (horchata) solo si se ve nitida a 390 @2x; si no, fuera.
- Las fotos de Rappi marcadas "de banco" en `menu-precios.md`: no representan el producto.
- Reservaciones prometidas, banquetes, eventos, catering, envio a domicilio propio: ninguno esta confirmado.
- Logos ni links de Rappi, Uber Eats, Tripadvisor o Wanderlog.
- Las 3 resenas de la taqueria del Mercado Teran.
- Contadores en fila, rejilla de tarjetas con icono, cortina de color entre secciones, pin largo, scroll eterno.
- Cinta de medir (no miden nada), sello de 2x1 que cae (ya es de la susheria), menu "Mostrar a mi mesero" (ya es de La Mexico), letrero que se enciende con el scroll (ya es de iPrint).
- Inter, emojis como iconos, guiones largos, pildoras, naranja, fondo blanco o negro puro, `$0`, mas de un verde por seccion, verde con texto blanco.
- Palabras prohibidas en titulos y subtitulos: calidad, servicio, tu mejor opcion, experiencia unica, todo en un lugar, sin vueltas, lo hacemos posible.
- La palabra "Dona Petra" en pantalla, en el `<title>`, en el og o en el JSON-LD. La marca visible es **Petra**.

## 9. PENDIENTE-DUENO (va tambien en `dona-petra/PENDIENTE-DUENO.md`)
1. A cual de las dos marcas contesta el WhatsApp 449 155 4787 (lo primero de todo).
2. Petra (Jardin y Cenaduria) y Cocina Mexicana Dona Petra, son la misma familia? Quien es el dueno de cada una?
3. Carta y **precios de mesa**: los de la pagina salieron de su carta en Rappi y ahi suele salir mas caro.
4. Fotos originales en alta de los platillos (las de la carta son de 600x900) y del local.
5. Horarios buenos de cada casa y a que telefono contesta cada una (en internet hay cuatro).
6. Sigue el 2x1 de los martes? Aplica en las dos casas?
7. Toman reservaciones? Hacen eventos o banquetes?
8. Link de cobro con tarjeta para dejar el pedido cerrado.
9. Autorizacion para usar las fotos de Google Maps y de la carta, o que mande las suyas.

## 10. SEO (va en la fundacion, no al final)
`<title>`: `Cocina mexicana en Aguascalientes | Petra`.
Meta description (menos de 155): `Enchiladas, pozoles y enmoladas en Aguascalientes. Carta con precios y pedido por WhatsApp. Galeana Sur 382 y Paseo de las Maravillas 100.`
JSON-LD `Restaurant` con las dos sucursales, solo direcciones, telefonos, horarios y redes reales de `hechos.md`. `canonical` a `https://loottreasureclothes-arch.github.io/krevo-muestras/dona-petra/`. `alt` en cada foto. og:image: recorte de `03-maps-galeana-fachada-noche.jpg` con el sello.

## 11. QUE HACER CON `sections/` QUE YA EXISTE
Estaban `25-menu`, `26-pedido` y `60-reserva` de una sesion pausada. Se reusa **solo el motor**: el carrito de `26-pedido` (cantidades, total, mensaje de WhatsApp) y el armado de mensaje de `60-reserva` para `PREGUNTA POR TU MESA`. El look, los colores, el header y el orden se rehacen segun esta hoja; `25-menu` se reemplaza por la carta de tienda de la seccion 2 (tarjetas con foto y precio, no pestanas). Nada de lo viejo manda sobre esta hoja.
