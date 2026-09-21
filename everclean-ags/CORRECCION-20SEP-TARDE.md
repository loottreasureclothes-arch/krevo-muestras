# Corrección 20 sep 2026 (tarde) — Everclean

Encargo de Emanuel, por voz: *"Copia la de Limpio Suprime para Everclean. Está fatal la de Everclean."*

La página se **rehízo completa**. Se conservaron el lienzo marino, el cian de su logo, Archivo +
Instrument Sans y el arco de ola del header (eso ya era suyo y el revisor externo lo calificó bien);
lo que se tomó de `limpio-suprime/` fue el **nivel de terminado y el orden**, no el dibujo.

Respaldo de la versión anterior:
`/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/corr/everclean-ags/respaldo/`

---

## 1. Qué se copió de Limpio Suprime (y qué NO)

| De Limpio Suprime se tomó | Cómo quedó en Everclean |
|---|---|
| Hero de foto a sangre con el titular encima | Igual, pero el velo entra desde la izquierda en compu (Limpio lo trae desde abajo) |
| Cotizador en tarjeta sobre banda de papel | Tarjeta blanca recta sobre papel **azulado**, no crema |
| Lista de servicios clicable con "Pregunta el precio" | Igual, pero con "+" que suma al carrito en vez de preseleccionar |
| Banda de cierre a sangre con el botón verde | Igual |
| Sección "Todo listo para completar" | Igual, pero lista numerada, sin burbujas que se palomean |
| Pie oscuro con teléfono grande | Igual |

**Lo que NO se copió, para que no se vean hermanas (R11):** los discos redondos con foto, el jalador
que pasa sobre la foto, el piso de mosaicos, el amarillo guante, Gabarito/Figtree, los radios
grandes y la barra-burbuja del header. Everclean quedó con **rectángulos de radio 2 px, reglas finas
cian, etiquetas en caja oscura sobre la foto y el arco de ola** — lenguaje propio.

## 2. Estructura nueva (6 secciones)

1. `10-hero` — foto a sangre, "Trabajamos los domingos. Y vamos hasta tu casa."
2. `20-lavamos` — las 9 piezas a la vista: 3 con foto real + 6 en lista tipográfica, todas con
   "Pregunta el precio" y "+". Barra sticky "Mi visita (n)" en color de marca.
3. `30-pruebas` — el antes y después grande + el colchón real.
4. `50-visita` — banda de papel: carrito, colonia, día, cada cuándo y el botón verde.
5. `60-cierre` — "Así la entregamos" con el botón verde.
6. `70-completar` — las 6 cosas que faltan del dueño.

Alto: 7,399 px en celular (tope 9,000). Primera carga ≈ 150 KB; todas las imágenes juntas, 508 KB.

## 3. Lo obligatorio del encargo

- **Fuera las 6 tarjetas "FOTO PENDIENTE".** Ya no existe el concepto: las 6 piezas sin foto van en
  lista tipográfica limpia y el rótulo dice **"Y también lavamos"**. El cliente nunca lee que al
  negocio le faltan fotos (eso vive donde debe, en `70-completar`).
- **Fuera los sellos inventados.** "Personal capacitado y confiable" y "Productos de limpieza
  ecológicos" no están en `research/` y se borraron. En su lugar quedaron tres que sí están:
  *Trabajan los domingos* · *Servicio a domicilio gratis* · *Van hasta tu casa, en Aguascalientes*.
  Verificado: 0 apariciones en `index.html`.
- **Antes/después con etiquetas y bien empatado.** Dos paneles separados por un canal de 8 px, cada
  uno con su etiqueta (**ANTES** en caja marino, **DESPUÉS** en cian). Se recortó el mismo trozo del
  mismo sofá en las dos mitades del collage original (`x 170–325` de 414 px), así que el rincón, el
  piso de loseta y el encuadre coinciden. Ya no hay costura invisible ni mueble imposible.
- **El botón que cierra la venta es `<a href="wa.me/...?text=...">` real**, con el `?text=` ya
  encodeado en el HTML; el JS solo reescribe el `href`. **Cero `window.open` en toda la página.**
  El logotipo de WhatsApp no se encoge nunca: `.ec-btn svg{flex:none}` (medido: 19 × 19 px a 390 px).
- **Teléfono 449 192 5369**, verificado contra `research/hechos.md` (el que Facebook lista como
  oficial). Los 5 `wa.me` y los 3 `tel:` apuntan al mismo número, ninguno a los otros dos.
- **Verde solo para WhatsApp:** 4 botones verdes (menú, `#s-vis-send`, cierre, pie) más el flotante.
  Todo lo demás — incluidos los "+" — va en cian de marca.
- **Nunca "$0":** no hay un solo precio en la página. 9 renglones dicen "Pregunta el precio" y el
  total dice *"te lo confirmamos por WhatsApp"*.

## 4. Fotos: se rehicieron todas

13 fotos suyas, casi todas collages chicos de Instagram y Facebook con texto quemado. Se recortó el
área limpia de cada una, se subió con **Real-ESRGAN local `-s 4`** y se bajó con PIL. Cero Higgsfield,
cero créditos.

| Archivo | Sale de | Qué es |
|---|---|---|
| `hero/hero-m.webp`, `hero-d.webp` | `hero-candidato_limpieza-vapor-sofa_ig.jpg` | **Provisional** — ver `IMAGEN-HERO.md` |
| `lavamos/salas.webp` | mitad "después" del seccional | Sala lavada |
| `lavamos/colchones.webp` | `catalogo_colchon-limpio-despues_fb.jpg` | Colchón limpio |
| `lavamos/sillas.webp` | `catalogo_silla-metal-antes-despues_ig.jpg` | Silla lavada |
| `pruebas/antes.webp`, `despues.webp` | el mismo collage del seccional | El par del antes/después |
| `pruebas/colchon.webp` | `relleno_colchon-manchas-antes_ig.jpg` | El colchón manchado |
| `cotiza/casa.webp` | `hero-candidato_limpieza-exterior-sofa_ig.jpg` | Sillón lavado en el patio |
| `cierre/final.webp` | mitad "después" del seccional, apaisada | "Así la entregamos" |

En todos los recortes se dejó fuera el texto quemado, los teléfonos del flyer y el logo de la
plantilla. El pie dice la verdad: *"Las fotos son de Everclean, mejoradas en resolución."*

**El logo ya no va en un recuadro blanco.** Se le quitó el fondo (alfa por luminancia), se pasó el
"EVER" azul marino a blanco y se dejó el "CLEAN" en cian, así que se lee completo sobre el marino,
sin caja ni borde y sin la franja gris que traía el archivo. `logo-header.webp` (25 KB) y
`logo-claro.webp` (67 KB). El favicon, el apple-touch-icon y la `og.jpg` se rehicieron con esa marca.

## 5. Un bug de verdad que estaba tumbando media hoja de estilo

**Los selectores tipo `#10-hero` son inválidos en CSS** (un identificador no puede empezar con
dígito), así que el navegador tiraba el bloque completo — incluidos el alto del hero, los fondos de
sección y las sombras. Estaban así las 6 secciones. Se cambiaron a `section[id="10-hero"]`.
Queda anotado en `sections/10-hero.css` para que no se repita. Esto explica por qué el hero se veía
aplastado aunque el CSS "decía" otra cosa.

## 6. Lo demás de la revisión externa que se aplicó

- Los `wa.me` salen del servidor **con el mensaje ya escrito** (antes el `?text=` se lo ponía el JS).
- Se agregó **la frecuencia** ("¿Cada cuándo?": una vez / cada 3 meses / cada mes), con la nota
  *"Lo confirmamos contigo por WhatsApp"* porque no hay frecuencias confirmadas en `research/`.
- Los tres botones de día son **tres columnas iguales** y el primero dice "L a V".
- El flotante ya no tapa nada: se esconde con `data-ec-hide-wa` sobre el CTA del hero, las fichas,
  la lista, el colchón, el lado de la visita y el pie. Y el hero trae 82 px de aire abajo para que
  tampoco estorbe **si el JS no corre**.
- El resumen vacío ya no manda de regreso arriba: trae 4 atajos (+ Sala, + Colchón, + Sillas, + Auto).
- "Si el domicilio gratis es siempre o solo promoción" entró como punto 05 de `70-completar`.
- El marco que se desbordaba de la foto se fue con el componente viejo.

## 7. Verificación

| Prueba | Resultado |
|---|---|
| `python3 build.py` | 6 secciones |
| `krevo-shot` **m** (390) | alertas **[]** · alto 7,399 px |
| `krevo-shot` **t** (893) | alertas **[]** · alto 6,119 px |
| `krevo-shot` **d** (1440) | alertas **[]** · alto 6,525 px |
| `tapados.mjs` m / t / d | **0 tapados y 0 desbordes** en los tres |
| Consola / 404 / scroll horizontal | 0 / 0 / no |
| Carrito | suma, resta, borra al llegar a 0, y la barra sticky sigue el total |
| Mensaje de WhatsApp | arma piezas + cantidades + zona + día + frecuencia, **sin renglones vacíos** |
| Botones verdes | 4 + flotante, todos abren `wa.me` de verdad |
| Menú | abre, atrapa el foco, cierra con Esc, y "Agregar" cierra y baja a la visita |
| Sin JavaScript | la página se ve completa: nada invisible, nada en blanco |
| Guiones largos / emojis como icono / Inter | 0 / 0 / no (Archivo + Instrument Sans) |

Hojas de contacto:
`…/scratchpad/corr/everclean-ags/HOJA-ENTREGA-M.jpg`, `-T.jpg` (893 px) y `-D.jpg`.

## 8. Lo que NO se pudo hacer (y por qué)

1. **La foto del banner sigue siendo provisional.** Es su foto real subida de resolución, pero nace
   de un cuadro de video de 209 × 368 px y a 1440 px se ve suave. **No la genero yo**: el encargo
   por escrito quedó en `IMAGEN-HERO.md` para el orquestador. Es el punto más flojo de la página.
2. **No hay foto propia de tapete, carriola, cama de perro, sofá cama ni interior de auto.** Las
   únicas que existen vienen dentro de collages con texto quemado, y una de ellas trae marca de agua
   de **PixVerse.ai** (video hecho con IA, no un trabajo real). Por eso esas 6 piezas van en lista
   tipográfica y no en ficha con foto. Está pedido como punto 03 de `70-completar`.
3. **El colchón no tiene par antes/después de verdad.** El "antes" manchado y el "después" limpio son
   **dos colchones distintos** (uno con círculos, otro acolchado). Presentarlos como par sería
   mentir, así que el manchado va solo, etiquetado *"Antes · colchón matrimonial"*, y el limpio va en
   la ficha del catálogo. La segunda pareja que sí existe (la silla de metal) tampoco se usó como
   antes/después: el "antes" es de frente y el "después" en ángulo, no empatan — esa foto se usó
   solo como catálogo de "Sillas".
4. **El logotipo sigue siendo el sacado del flyer.** La versión clara se ve bien, pero nace de un
   JPG de baja resolución. El original en PNG o SVG está pedido como punto 04.
5. **No hay precios, ni horario exacto, ni dirección.** No existen en ninguna fuente; van como
   puntos 01 y 05 de `70-completar`. Tampoco se puso botón de Maps: el negocio **no tiene ficha de
   Google Maps** (verificado en `research/hechos.md`).
6. **Sigue sin confirmarse cuál de los 3 teléfonos es el vivo.** Se usó el oficial de Facebook
   (449 192 5369) en los 8 enlaces, y los tres se listan en el punto 02.
7. **No se hizo git** (lo publica el orquestador) y no se tocó ninguna otra carpeta de
   `krevo-muestras/`, ni `_kit/`, ni el servidor del puerto 8770.

---

# RONDA 2 — corrección sobre la revisión externa de la tarde

Lista de trabajo: `~/Prospeccion-Web-Ags/revisiones-externas/everclean-ags-tarde.md` (7.8/10, "publicable hoy: NO").
Se repasó punto por punto el apartado "3. Lo que falta para el 10". Capturas y pruebas de esta ronda:
`…/scratchpad/corr2/everclean-ags/` (`HOJA-OK-M.jpg`, `-T.jpg` 893 px, `-D.jpg`, `func.mjs`, `nojs.mjs`, `reduce.mjs`,
`fn3-m/m-carrito.png`, `fn-*/{preset}-par-mitad.png` y `-par-final.png`).

## Punto por punto

| # del inspector | Estado | Qué se hizo |
|---|---|---|
| 1. La foto del banner | **YA VENÍA HECHA · NO SE TOCÓ** | `img/hero/hero-m.webp` y `hero-d.webp` ya son la foto definitiva del orquestador (técnico lavando a vapor un sillón dentro de una casa). Por orden expresa no se tocaron, y la etiqueta "Imagen ilustrativa" se queda. |
| 2. Que el antes/después embone + el componente firma | **HECHO** | Las dos se recortaron de nuevo del mismo collage (`research/fotos/catalogo_sofa-seccional-antes-despues_fb.jpg`) **ancladas en el mismo punto**: la esquina del seccional, el zoclo y la línea de loseta caen en el mismo lugar en las dos (ANTES `x 179–326 / y 71–181`, DESPUÉS `x 170–327 / y 265–383`, la segunda a escala 1.076 porque la cámara estaba más lejos). Se fueron la franja blanca del collage, el rótulo "DESPUÉS" quemado y el escudo de EVERCLEAN. Subidas con Real-ESRGAN local dos pasadas y bajadas a 900×675 cada una. **Y se construyó el componente firma que registra `COMPONENTES-USADOS.md`:** las dos mitades entran desde arriba y abajo (celular) o desde los lados (720 px arriba), embonan y dejan una **costura cian de 3 px** al centro. 580 ms, IntersectionObserver, respeta `prefers-reduced-motion`. |
| 3. Agrandar el antes/después en celular | **HECHO** | Apilado a ancho completo: cada panel pasó de **175 × 169 px a 358 × 269 px** a 390. A 893 y 1440 siguen lado a lado (427×320 y 587×440). Las etiquetas ANTES/DESPUÉS ahora van **encima de la foto** para que la costura quede entre foto y foto, no entre foto y rótulo. |
| 4. Los 44 px | **HECHO** | `.s-vis-item-btn` 40→44, los atajos 40→44, `.ec-brand` con `min-height:44px`, y de paso `.ec-nav a` y `.ec-cotizar` (estaban en 40 a 1440). Medido con CDP: **0 elementos tocables por debajo de 44 px en 390, 893 y 1440**. |
| 5. Cambiar `img/cotiza/casa.webp` | **HECHO** | Se borró. En su lugar `img/cotiza/domicilio.webp` (900×675): el sillón blanco sobre el pasto con la manguera gris del equipo y el técnico a un lado, del mismo `hero-candidato_limpieza-exterior-sofa_ig.jpg`. El `alt` ya no habla de una casa que no aparece. |
| 6. Cambiar `img/lavamos/sillas.webp` | **HECHO** | Recorte nuevo al asiento de tela (`catalogo_silla-metal-antes-despues_ig.jpg`, panel "Después", `x 330–620 / y 130–420`), 760×760. **De 98 KB a 36 KB.** |
| 7. Subir el cotizador al nivel de Limpio Suprime | **HECHO (en su propio idioma)** | Los cuatro botones planos se volvieron **tres fichas con foto real** (Sala, Colchón, Sillas) de 102×135 con su "+" cian, más el enlace "Ver las nueve piezas que lavan". Y entró la **elección de tamaño**: al agregar sala aparece *¿De cuántas plazas?* (2 / 3 / Seccional) y al agregar colchón *¿De qué medida?* (Individual / Matrimonial / King size). No es un precio ni un dato del negocio: es una pregunta que viaja en el mensaje — `· Salas y sillones (Seccional) x2`. Si no se elige, no se escribe nada. NO se copiaron los discos, el deslizador de m² ni la retícula de Limpio (R11). |
| 8. Quitar "Imagen ilustrativa" del hero | **NO — a propósito** | La foto del banner **sí es de IA** (la definitiva del orquestador), así que la etiqueta es la verdad y se queda. Lo que se arregló fue la contradicción: el pie decía *"Las fotos son de Everclean, mejoradas en resolución"* y ahora dice *"Las fotos de los trabajos son de Everclean, mejoradas en resolución. La del banner es ilustrativa y va marcada."* |
| 9. Romper la repetición del sofá beige | **HECHO** | `img/cierre/final.webp` ya no es el seccional: es el **love seat de otro cliente**, recortado limpio del `catalogo_collage-sala-loveseat-antes-despues_ig.jpg` (sin el escudo, sin el rótulo quemado, sin la franja verde), 1400×690 y 10 KB. Ya son **seis trabajos distintos** a la vista (seccional, colchón limpio, silla, colchón manchado, sillón sobre el pasto, love seat) contra los tres de antes. De paso `img/lavamos/colchones.webp` se rehizo incluyendo la cabecera de la cama: antes era un rectángulo blanco que no se leía. |
| 10. `img/logo/logo-header.webp` | **HECHO** | De 306×210 px y 25 KB a **120×82 px y 7 KB**, con `width`/`height` corregidos en `template.html`. |

## Un detalle de CSS que vale anotar

El atributo `height="200"` del HTML es una **pista de presentación** que le gana a `aspect-ratio`: las fichas
con foto del cotizador salían de 200 px de alto aunque el CSS pedía 1/1. Se arregla con `height:auto` en la
imagen. Queda anotado dentro de `sections/50-visita.css`.

## Sobre `COMPONENTES-USADOS.md`

**No se tocó** (no es carpeta mía). Y ya no hace falta corregirlo: el renglón de everclean-ags
("El par que embona — las dos mitades de su foto real se juntan y dejan costura") **ahora sí existe en la
página**, con la costura cian visible al centro. El registro quedó verdadero.

## Verificación de esta ronda

| Prueba | m (390) | t (893) | d (1440) |
|---|---|---|---|
| `krevo-shot` alertas | **[]** | **[]** | **[]** |
| Alto | 7,934 px | 5,988 px | 6,359 px |
| Tocables menores a 44 px | **0** | **0** | **0** |
| Flotante tapando algo (10 alturas, con piezas en el carrito) | **0** | **0** | **0** |
| Consola / 404 / scroll horizontal | 0 / 0 / no | 0 / 0 / no | 0 / 0 / no |
| El par a media animación (200 ms) | entrando, opacidad 0.99, costura al 9% | entrando | entrando |
| El par ya embonado | 358×269 + 358×269, hueco 3 px | 427×320, costura 3×320 | 587×440, costura 3×440 |

- **Carrito:** suma, resta, borra al llegar a 0, los tamaños se prenden y se apagan, y el mensaje sale
  *"· Salas y sillones (Seccional) x2 · Colchones (King size) x1 / Zona: Bosques del Prado / Día que me queda:
  Domingo / Cada cuándo: Cada 3 meses"*, sin renglones vacíos. Con el carrito vacío el mensaje no trae la lista.
- **WhatsApp:** los 5 `<a href="wa.me/...?text=">` salen del servidor ya escritos, **0 `window.open`**, los 3 `tel:` al 449 192 5369.
- **Menú:** abre, manda el foco al botón de cerrar y cierra con el botón y con Esc.
- **Sin JavaScript:** página completa, 7,988 px, **0 bloques invisibles**, el par ya embonado y los `wa.me` con mensaje.
- **`prefers-reduced-motion: reduce`:** el par entra derecho (`is-in` sin armar), 0 bloques invisibles.
- **Peso de imágenes:** 536 KB en total (antes 508 KB, con el banner nuevo que pesa 198 KB de los dos archivos).

## Lo que NO se pudo (y por qué)

1. **La foto del banner no se juzga ni se cambia:** es la definitiva del orquestador y la orden fue no tocarla.
   Si algún día entra una foto real de ellos trabajando, hay que quitar la etiqueta "Imagen ilustrativa"
   (`sections/10-hero.html`, `.s-hero-ilustrativa`) y ajustar de vuelta el pie de `template.html`.
2. **No hay foto propia de tapete, carriola, cama de perro, sofá cama ni interior de auto.** La única del
   interior de auto vive en un collage donde otra celda trae marca de agua de **PixVerse.ai**, así que no se usó.
   Por eso las fichas con foto del cotizador son tres y no cinco. Sigue pedido como punto 03 de `#70-completar`.
3. **El colchón sigue sin par antes/después de verdad** (el manchado y el limpio son dos colchones distintos).
   El manchado va solo y etiquetado, como en la ronda 1.
4. **Las fotos nacen de collages de Instagram de 360–640 px.** Real-ESRGAN las salva para el tamaño en que se
   muestran, pero en pantalla grande el par y el love seat se ven suaves. Con fotos originales del dueño esto sube solo.
5. **No se hizo git** (lo publica el orquestador), no se tocó ninguna otra carpeta de `krevo-muestras/`,
   ni `_kit/`, ni `COMPONENTES-USADOS.md`, ni el servidor del 8770.
