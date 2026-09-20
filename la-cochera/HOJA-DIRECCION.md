# HOJA DE DIRECCIÓN — La Cochera Food & Beer (Aguascalientes)

Escrita el 20 sep 2026. Manda sobre cualquier texto viejo. El que construye NO decide nada de aquí:
si un dato no está en `research/`, no va a la página, va a `PENDIENTE-DUENO.md`.

Fuentes usadas: `research/hechos.md`, `research/menu-precios.md`, `research/resenas.md`,
`research/colores.md`, `research/VENDE.md`, `research/FOTOS.md` y las 21 fotos vistas una por una.

---

## 1. EL TRABAJO

**Que el que ya trae hambre entre semana en la noche mande su pedido por WhatsApp directo al 449 468 2926
(no por la app) o se venga a Paseo de la Asunción 403 antes de las 12:30.**

Traducción a dinero: cada pedido que hoy entra por Uber Eats o DiDi deja comisión en la app y llega más caro
al cliente. Y hay una queja real y repetida (Augusto Ramos, 2★) de que al de mesa lo mandan al final porque
las plataformas empujan. Esta página existe para mover ese pedido a WhatsApp y para llenar la banqueta de
miércoles a domingo. Todo lo que no empuje una de esas dos cosas, sobra.

La página NO es para "presentar el negocio". Es la caja registradora.

---

## 2. LA PROMESA

> **Desde 2019, en Paseo de la Asunción 403: hamburguesa de plancha y tarro con los cuernos de la H,
> de miércoles a domingo hasta las 12:30 de la noche.**

Sale entera de `hechos.md` (el año del sello "Desde 2019", la calle, el horario real) y de `VENDE.md`
(el tarro de la casa con la H de cuernos pegada al vidrio, su producto más fotografiado). El de al lado no
la puede decir: nadie más en Aguascalientes sirve en ese tarro ni tiene ese letrero de neón.

Voz de la casa (frases REALES de ellos, se usan tal cual, no se inventan otras):
"Tú nomás escoge." · "Este planazo pa' llevar." · "Bebidas Monstruosas." · "Cremosas y Deliciosas."

---

## 3. EL MOMENTO FIRMA — "La salsa todavía va cayendo"

**Foto:** `research/fotos/gmaps08.jpg` (hamburguesa abierta con tocino, el chorro de salsa congelado EN EL
AIRE arriba, barras de neón azul y naranja al fondo). Es real, del negocio, sin texto quemado y sin gente.

**Sección:** 3, a sangre, pantalla completa.

**Qué pasa:** la foto entra con la mitad de arriba enmascarada. Al entrar la sección, una máscara
(`clip-path: inset()`) baja de arriba hacia abajo y "suelta" el chorro de salsa hasta que toca la carne;
en el mismo tramo la foto va de `scale(1.06)` a `scale(1.00)`. Cuando la máscara llega abajo, caen las dos
líneas del título (60 ms por palabra) y aparece el pie numerado.

**Cómo se dispara:** ScrollTrigger con `scrub: .5`, tramo corto, `start: "top 70%"`, `end: "top 20%"`,
**sin pin**, reversible al subir. Total del beat: **0.9 s** a velocidad normal de scroll (tope 1.5 s).
`prefers-reduced-motion` y JS apagado = foto completa y título ya puestos.

**Por qué vende:** es la foto más apetitosa que tienen y el único movimiento de la página que le mete
hambre al visitante justo antes de que baje al carrito. No es efecto por efecto: enseña el producto
cayendo. Es el ÚNICO momento largo de la página (regla: un solo momento de cine).

**Ojo técnico:** `gmaps08.jpg` mide 720x1280. Antes de usarla, Real-ESRGAN x4
(`~/Prospeccion-Web-Ags/tools/realesrgan/realesrgan-ncnn-vulkan -m ~/Prospeccion-Web-Ags/tools/realesrgan/models`)
y luego `hd_pipeline.py --no-grade` (es comida). Si después de subirla sigue viéndose suave a 390 @2x, NO va
a sangre: va en recuadro con marco crema.

---

## 4. EL COMPONENTE FIRMA — "El portón de la cochera" (tablero de abierto/cerrado en vivo)

No está en `COMPONENTES-USADOS.md` y no se parece a ninguno: no es cámara que entra, ni cinta, ni
antes/después, ni tercia, ni lupa, ni pase de abordar, ni jalador, ni letrero que se enciende.

**De dónde sale:** el negocio se llama Cochera y es literalmente una cochera de calle que abre a las 4 de
la tarde y cierra a las 12:30 de la noche (`hechos.md`, Google Maps). Lunes y martes está cerrada. Lo único
que el cliente necesita saber a las 9 de la noche es: **¿está abierta ahorita?**

**Qué es:** una persiana de lámina dibujada en CSS (rayas horizontales de 1 px, el mismo motivo gráfico de
toda la página) que ocupa el bloque. Al entrar la sección **sube una sola vez** (`transform: translateY`,
900 ms, `--ease-out`, reversible) y deja ver un tablero con:

- Un punto y una palabra en vivo, calculados con la hora del visitante contra el horario real:
  **ABIERTO AHORA · cerramos 12:30** (punto rojo `#F10303` encendido) o
  **CERRADO · abrimos el miércoles a las 4:00** (punto apagado, contorno crema).
- Los 5 renglones del horario real: Miércoles a domingo 4:00 p.m. – 12:30 a.m. / Lunes y martes, cerrado.
- Dirección con letra grande: **Paseo de la Asunción 403, Bulevares 1ra Secc.**
- Dos acciones: `CÓMO LLEGAR` (rojo de marca, abre Google Maps en 21.8536911, -102.3012624) y
  `ESCRIBIR AL 449 468 2926` (el ÚNICO verde de esta sección, sí manda WhatsApp).

**Reglas del componente:** la persiana sube una vez y nunca hace de cortina entre secciones. Sin JS, el
tablero ya está visible y la persiana no existe (CSS base = estado final). El cálculo de horario va en
try/catch y si falla, muestra el horario en texto sin el estado en vivo. Nunca dice "abierto" cuando no lo está.

---

## 5. HEADER Y FORMAS PROPIAS

**De dónde sale el header:** de su letrero. La fachada (`gmaps01.jpg`) es una **caja de luz negra,
rectangular, montada sobre la pared roja**, con las letras COCHERA y la H de cuernos en rojo.
El header de este sitio ES esa caja de luz: nada de barra crema con blur.

- Barra negra `#0B0908` de **64 px** en celular, **72 px** en compu, ancho completo, **cero radio**.
- Logo **alineado a la izquierda**, dentro de una placa negra con **filete crema de 2 px** (la caja de luz),
  alto 40 px. Se usa `research/logo_source.jpg` recortado al lockup; como el logo viene con fondo negro
  sólido `#000000`, se le saca canal alfa con PIL antes de montarlo (umbral sobre luminancia) para que no
  se vea un cuadro negro distinto al fondo.
- A la derecha **una sola acción**: `VER LA CARTA` (rojo `#F10303`, rectangular, mayúsculas con
  `letter-spacing: .14em`, 44 px de alto). En el header **no hay ningún botón verde**.
- Debajo de la barra, una **línea roja de 2 px** (el tubo de neón). Al pasar 40 px de scroll el header
  **no cambia de color**: se compacta a 52 px y la línea roja **crece de 0 a 100 % del ancho en 220 ms**,
  como si el letrero se prendiera. Ese es el único truco del header.
- Hamburguesa con la palabra `MENÚ` a la derecha del icono. Panel a pantalla completa, negro, links
  numerados 01–07 en la condensada, con el pie del panel: WhatsApp, Llamar, Instagram, Facebook.

**Lenguaje de formas (de la cochera, no de una plantilla):**

| Elemento | Regla |
|---|---|
| Radio | **0 px en todo.** Botones, tarjetas, marcos e inputs rectangulares. Es un letrero y una persiana, no una app. |
| Motivo gráfico (uno solo) | **Rayas horizontales de lámina de 1 px** (del portón y de la teja de la fachada), separación 6 px, opacidad 8 %. Se usa como divisor entre secciones y como fondo del tablero del portón. NADA de cinta de medir. |
| Divisores | Línea roja `#F10303` de 1 px con un corte de 12 px al centro. Nunca una banda de color a todo lo ancho (nada de cortinas). |
| Marcos de foto | Filete crema `#FFFFE3` de 2 px pegado a la imagen + segunda línea a 6 px por fuera (el espejo de marco antiguo de la barra, `gmaps18.jpg`). Solo en fotos que NO van a sangre. |
| Pies de foto | Numerados, encimados abajo a la izquierda: `01 / HAMBURGUESAS · Carne de res a la plancha.` |
| Etiquetas (eyebrow) | 11 px, mayúsculas, `letter-spacing: .16em`, crema al 70 %, con una raya corta roja delante: `— LA CARTA`. |

**Color (hex de `colores.md`, muestreados del logo real):**

| Token | Hex | Uso |
|---|---|---|
| `--ink` (lienzo) | `#0B0908` | Fondo de casi toda la página. Negro carbón, NO `#000` plano. |
| `--brand` | `#F10303` | Rojo de los cuernos y la H. Botones de navegación, línea del header, punto de "abierto", última línea de los títulos. |
| `--brand-deep` | `#B8182A` | Rojo del badge oscuro. Bordes, estados `:active`, sombras rojas. |
| `--paper` | `#FFFFE3` | Crema del logo. Todo el texto sobre negro, filetes y marcos. |
| `--paper-band` | `#FFFFE3` | Banda tipo papel de estraza SOLO en el bloque "Todo listo para completar" y en la hoja del carrito. |
| `--wa` | `#25d366` | Solo WhatsApp de verdad. Texto `#0b3d1f`. |

**PROHIBIDO como color de interfaz: el verde del neón de la fachada y el azul/morado del interior.** Viven
dentro de las fotos y ahí se quedan; si el verde del letrero se usa en un botón se rompe la regla de que el
verde = WhatsApp.

**Tipografía (dos familias, de `colores.md`):**
- Display: **Anton** (Google Fonts), mayúsculas, para todos los títulos. Es el peso de cartel de garage del
  logo sin copiarlo. Hero celular `clamp(42px, 12.5vw, 64px)`, compu `clamp(64px, 6vw, 112px)`.
- Texto: **Archivo** 400/500. Nunca Inter, Poppins ni Montserrat.
- Precios en `font-variant-numeric: tabular-nums`.

---

## 6. LAS SECCIONES (7, tope 9,000 px en celular)

Presupuesto de alto en celular por sección, para no pasarse: 844 / 2,900 / 720 / 900 / 1,150 / 800 / 950 ≈ **8,260 px**.
Si una se pasa, se recorta esa, no se agrega otra.

### 01 · HERO — "Se prende la cochera"
- **Foto grande:** `gmaps01.jpg` a sangre, 100svh. **RECORTE OBLIGATORIO:** se corta el tercio izquierdo,
  donde está el letrero del vecino "Consultorio de Psicología" con su teléfono. En el encuadre final tienen
  que quedar COMPLETOS el letrero de neón COCHERA (con la H roja) y la barra "BIENVENIDOS!!". Nada de cortar
  el letrero a la mitad. Empuje lento de cámara en CSS (`scale 1.00 → 1.06` en 8 s, `alternate`), sin video.
- **Título (cae en 2 líneas, la última en rojo):**
  `LA COCHERA SE ABRE` / `A LAS CUATRO.`
- **Bajada (1 renglón):** `Paseo de la Asunción 403. Miércoles a domingo, hasta las 12:30 de la noche.`
- **Chip en vivo** arriba del título: `ABIERTO AHORA` / `HOY CERRADO` (mismo cálculo del portón).
- **Botones:** `VER LA CARTA` (rojo, primario) + `CÓMO LLEGAR` (contorno crema). **Cero verde aquí.**
- **RAZÓN DE VENTA:** en 3 segundos el visitante sabe que existe un lugar real con letrero propio, sabe la
  calle y sabe si está abierto ahorita. Sin esto, el que anda cerca a las 9 de la noche no sale de la cama.

### 02 · LA CARTA A LA VISTA — catálogo estilo tienda (va JUSTO después del hero)
- **Foto grande:** `gmaps16.jpg` **recortada** para dejar fuera la botella de Heinz (marca ajena): se queda
  la hamburguesa con las papas, a sangre, 60svh, con pie `01 / HAMBURGUESAS · Carne de res a la plancha.`
- **Fotos chicas (3, tope):** `gmaps12.jpg` (Hamburguesa Cheese), `gmaps03.jpg` **recortada sin el sobre de
  Heinz** (Alitas con papas), `gmaps14.jpg` (bebida monstruosa / malteada de cereal).
- **Título:** `TÚ NOMÁS` / `ESCOGE.` (frase real de su carta de Instagram, `ig_menu_ago23.jpg`).
- **Estructura:** chips de categoría pegados arriba al hacer scroll — `HAMBURGUESAS · HOT DOGS · SNACKS ·
  PAPAS · BEBIDAS` — y **todas las piezas a la vista**, 2 columnas en celular, 3 en compu. Cada tarjeta:
  foto (o marcador honesto), nombre, la descripción real en 1 renglón, precio y un `+` **en rojo de marca**.
- **Precios (reales, tal cual `menu-precios.md`, nunca redondeados ni inventados):**
  Sencilla $269 · Cheese $169 · Hawaiana $169 · Especial $304 · Cubana $297 · Pizza $268 · Chistorra $268 ·
  Pollo Loco $169 · Pollo Especial $189 · Hot Dog Clásico $149 · Hot Dog Especial $169 · Hot Dog Pizza $149 ·
  Hot Dog Pollo Loco $169 · Dedos de Queso $99 · Alitas con Papas $233 · Boneless con Papas $169 ·
  Papas Francesa $59 · Papas Gajo $69 · Papas Especiales $129 · Papas con Queso $119 · Coca-Cola 355 ml $59.
  **Sin precio publicado:** Michelada y Bebida Monstruosa → dicen `Pregunta el precio`, nunca `$0`.
- **Nota honesta al pie del catálogo (obligatoria, letra chica):** `Precios tomados de su carta de entrega a
  domicilio, leída el 20 de septiembre de 2026. El precio en mesa lo confirma La Cochera por WhatsApp.`
  **No se puede escribir que en mesa sale más barato: eso nadie lo verificó.**
- **Etiqueta real en Alitas y Boneless:** `2X1 MIÉRCOLES Y JUEVES` (texto, no la imagen `gmaps02.jpg`, que
  trae la promo quemada encima).
- **Marcador honesto** donde no hay foto limpia (Hot Dogs, Dedos de Queso, Boneless, las 4 de Papas,
  Michelada): recuadro negro con filete crema y la leyenda `Fotografía original: se la pedimos a La Cochera.`
  Nada de rellenar con fotos de otro platillo ni con imágenes de IA.
- **Barra fija al agregar:** `MI PEDIDO · 3` en rojo de marca, abajo. Abre la **hoja** con el carrito.
- **RAZÓN DE VENTA:** es la sección que cobra. Hoy sus precios solo existen dentro de Uber Eats; aquí el
  cliente arma el pedido completo y se va a WhatsApp sin pagar comisión de app. Sin esta sección no hay venta,
  hay folleto.

### 03 · EL MOMENTO FIRMA — "La salsa todavía va cayendo"
- **Foto grande:** `gmaps08.jpg` a sangre, 100svh (ver §3 para la mecánica y el upscale).
- **Título (2 líneas, última en rojo):** `LA SALSA TODAVÍA` / `VA CAYENDO.`
- **Pie numerado:** `02 / A LA PLANCHA · Tocino, queso asadero y amarillo.` (ingredientes reales del menú.)
- Un solo link con flecha: `Ver las hamburguesas →` (sube al catálogo). **Sin botón verde, sin párrafo.**
- **RAZÓN DE VENTA:** le mete hambre justo antes del carrito. Es el único momento de cine y el que hace que
  la página no se sienta plantilla.

### 04 · EL TARRO DE LA CASA
- **Foto grande:** `gmaps15.jpg` a sangre o casi (mano con el tarro de michelada verde y la H roja pegada al
  vidrio, con el logo circular de la pared detrás). Es su producto más fotografiado.
- **Título (última línea en rojo):** `TODO SE SIRVE` / `EN EL TARRO DE LOS CUERNOS.`
- **Texto:** máximo 2 renglones, con dato real: micheladas, "bebidas monstruosas" y las malteadas de cereal
  (Froot Loops y chocobolas) se sirven en el tarro grande con la H. Nada más.
- **Acción:** un solo link con flecha `Ver bebidas →` que salta al chip BEBIDAS del catálogo.
- **OJO:** el logo circular del fondo **sale cortado** en esa foto. Por eso esta sección NO es donde se
  presenta la marca; el logo completo va en el header y en el cierre. Aquí el protagonista es el tarro.
- **RAZÓN DE VENTA:** el tarro es lo que la gente fotografía y lo que hace que pidan bebida además de
  comida (ticket más alto). Sin esta sección, La Cochera se ve como cualquier hamburguesería.

### 05 · POR DENTRO ES UNA COCHERA (el lugar + la prueba)
- **Foto grande:** `gmaps18.jpg` **recortada a la mitad de arriba** (la moto roja con luces LED, la cabeza de
  toro y el espejo de marco antiguo). **Va en recuadro con marco crema, NO a sangre**: es foto de celular,
  con grano, y en la orilla derecha se asoma la mano de una persona y un espejo de whisky de marca ajena;
  el recorte tiene que dejar fuera las dos cosas y las sillas rotuladas "Modelo".
- **Título (última línea en rojo):** `ADENTRO HAY UNA MOTO` / `Y UNA CABEZA DE TORO.`
- **Dato real, una sola vez y grande:** `DESDE 2019` (del sello de su propia promo).
- **Reseñas reales, con nombre y estrellitas dibujadas (SVG), tal cual `resenas.md`:**
  - **Bitsa DD** ★★★★★ — "Servicio excelente, precios accesibles, el tiempo de espera es mínimo…"
  - **Josealberto** ★★★★★ — "…las hamburguesas son lo mejor y más si está el parrillero de entre semana."
  - **Ramírez Joana** (Facebook, recomienda) — "súper recomendables, servicio bien y sabor ufff deliciosas"
  - Debajo, en un renglón: `4.5 ★ · 569 opiniones en Google.` **Nada de contadores animados ni filas de números inventados.**
- **RAZÓN DE VENTA:** es la prueba de que el lugar existe, es distinto y la gente vuelve. Es lo que hace que
  el que nunca ha ido se anime a manejar hasta la Asunción.

### 06 · EL PORTÓN DE LA COCHERA (componente firma; ver §4)
- **Sin foto grande** (rompe la cadena de imágenes a propósito). Persiana de lámina en CSS + tablero.
- **Título (última línea en rojo):** `AQUÍ CERRAMOS` / `A LAS 12:30.`
- Horario real, dirección real, mapa en marco crema, `CÓMO LLEGAR` (rojo) y `ESCRIBIR AL 449 468 2926`
  (el único verde de la sección).
- Un renglón más, sin adorno: `También hacen eventos privados: cumpleaños y corporativos.` (dato de Google
  Maps) con link de texto a WhatsApp.
- **RAZÓN DE VENTA:** la mitad de las ventas de un bar se deciden por "¿todavía está abierto?". Contestar eso
  en vivo, con la calle y el botón de llegar, convierte curiosos en mesas ocupadas esa misma noche.

### 07 · TODO LISTO PARA COMPLETAR + CIERRE
- **Banda crema tipo papel de estraza** (la única banda clara de la página) con la lista de lo que hace falta
  para que la tienda quede al 100 %: precios de mesa, precio de micheladas y bebidas monstruosas, fotos
  originales de hot dogs, papas, boneless y dedos de queso, cuál dirección y cuál teléfono quedan vigentes,
  y el link de cobro con tarjeta. Encabezado: `LO QUE NECESITAMOS DE LA COCHERA.`
- **Cierre sobre negro:** el logo plano COMPLETO (`logo_source.jpg` con el negro convertido en transparencia)
  ocupando **más del 60 % del ancho**, y debajo el título (última línea en rojo):
  `DESDE 2019,` / `EN LA ASUNCIÓN 403.`
- **Un botón verde, el de verdad:** `PEDIR POR WHATSAPP` (arma el mensaje con lo que traiga el carrito).
- **Pie:** Instagram `@la_cochera_food_and_beer` y Facebook `facebook.com/LaCDToro` con **logotipo SVG de
  44 px** (los de verdad, no emojis), horario en renglones, dirección y teléfono.
- **RAZÓN DE VENTA:** cierra la visita con la acción que deja dinero y, de paso, le vende al dueño el
  siguiente paso (la suscripción mensual: catálogo, precios y cobro con tarjeta).

### Fuera de las 7: LA HOJA DEL CARRITO
Solo `MI PEDIDO` (piezas, cantidades, quitar), forma de pago —efectivo en la cochera o
`Tarjeta en línea: te mandamos el link`— y el botón **verde** `ENVIAR PEDIDO POR WHATSAPP` al 449 468 2926.
Si el pedido trae alguna pieza sin precio publicado, el total dice **`Te lo confirmamos por WhatsApp`**.
**Nunca `$0`.** La hoja se monta en `<body>`, con `history.pushState` para que "atrás" de Android la cierre.

---

## 7. EL RITMO (para que no haya 3 secciones iguales seguidas)

| Sección | Patrón |
|---|---|
| 01 Hero | Título + bajada + 2 botones (patrón normal) |
| 02 Carta | **NO lleva el patrón.** Chips + rejilla de producto. Sin párrafo, sin botón al final: la acción es el `+` de cada pieza. |
| 03 Momento firma | **NO lleva el patrón.** Foto a sangre + 2 líneas + pie numerado + un link con flecha. Sin párrafo, sin botón. |
| 04 El tarro | **NO lleva el patrón.** Foto grande + título + 2 renglones + link con flecha. Sin botón. |
| 05 Por dentro | Patrón normal (eyebrow, título, dato, tarjetas de reseña). Botón: ninguno, solo las reseñas. |
| 06 El portón | **NO lleva el patrón.** Persiana + tablero de datos. Sin eyebrow, sin párrafo. |
| 07 Cierre | Banda de papel con lista + logo gigante + un botón verde. |

Secuencia de fondos, sin cortinas de color: negro → negro con las rayas de lámina → foto a sangre →
foto a sangre → negro con marco → negro con la persiana → **crema** (única) → negro del cierre.

**Botones verdes en toda la página: 3 + el flotante.** (06 escribir, 07 pedir, hoja enviar, flotante.)
Todo lo demás navega en rojo `#F10303` o es link con flecha.

---

## 8. LO QUE NO VA

1. **Higgsfield, imágenes de IA y video de IA: NO.** Puras fotos reales de ellos.
2. **Video de inicio (`hero_video.py`): NO.** Las 4 mejores fotos son de encuadres muy distintos (fachada de
   noche, macro de hamburguesa, mano con tarro) y el loop parpadearía. Hero = foto fija con empuje lento.
3. **Nada de cinta de medir** (no miden nada) **ni cortinas de color entre secciones.**
4. **Fotos que NO se usan y por qué:**
   `gmaps02`, `gmaps04`, `gmaps05`, `gmaps09`, `ig_sep13`, `ig_menu_ago23`, `ig_contacto_ago30` (texto de
   campaña quemado; solo sirvieron de fuente de datos) · `gmaps06` (rostro de una persona en primer plano) ·
   `gmaps07`, `gmaps10` (logo viejo rosa/amarillo, ya no es la marca) · `gmaps11`, `gmaps13`, `gmaps17`
   (clientes reales identificables; solo con permiso escrito del dueño) · `ubereats_storefront` (miniatura
   pixelada) · `ig_ago21` (queda de repuesto si alguna tarjeta se queda sin foto; 512x640, hay que subirla x4).
5. **Nada de inventar:** ni el nombre del dueño, ni por qué se llama Cochera, ni un lema, ni años de
   experiencia, ni "cervezas artesanales" (en `research/` no hay una sola marca de cerveza confirmada), ni
   platillos que no estén en `menu-precios.md` (ojo con "salchi-papas": está en la carta vieja de Instagram
   pero NO en la carta vigente; **no va**).
6. **No se publica la segunda dirección (Av. Independencia 1402) ni el teléfono "Norte" 33 4623 5873:**
   nadie confirmó si siguen vigentes. Una sola dirección y un solo teléfono en la página.
7. **No se dice que en mesa sale más barato que en la app.** No está verificado.
8. **No se muestra el 30 % de descuento de las alitas** (era de ese día en Uber Eats, no es promo del negocio).
   El 2x1 de miércoles y jueves sí, porque es suyo.
9. **Ninguna marca ajena visible:** fuera la botella y el sobre de Heinz, el espejo de whisky, las sillas
   rotuladas "Modelo" y el letrero del "Consultorio de Psicología" del vecino.
10. **Prohibido en títulos y subtítulos:** calidad, servicio, tu mejor opción, experiencia única, todo en un
    lugar, sin vueltas, lo hacemos posible. Tampoco "Nuestro menú", "Sobre nosotros" ni "Contáctanos".
11. Sin guiones largos, sin Inter, sin emojis como iconos, sin píldoras, sin fila de contadores, sin rejilla
    de tarjetitas con icono, sin fondo blanco plano.
12. **Tope duro: 7 secciones y 9,000 px en celular.** Si algo no cabe, se corta; no se agrega una octava.

---

## 9. PENDIENTE-DUEÑO (va también en `la-cochera/PENDIENTE-DUENO.md`)

1. **Precios de mesa.** Los 21 precios de la página salieron de su carta de Uber Eats. ¿Cuáles son los de
   consumo en el lugar? (Y ojo: ahí la **Hamburguesa Sencilla sale en $269 y la Cheese en $169**; se ve
   invertido y así está publicado.)
2. **Precio de la Michelada y de las Bebidas Monstruosas / malteadas de cereal.** Hoy dicen "Pregunta el precio".
3. **¿Una sucursal o dos?** Google dice Paseo de la Asunción 403; Uber Eats dice Av. Independencia 1402.
   ¿Cuál está vigente y cuál es "Norte" y cuál "Sur"?
4. **¿Cuál teléfono se publica?** 449 468 2926 (Sur) o 33 4623 5873 (Norte, lada de Guadalajara).
5. **Horario real de cada sucursal.** Google: miércoles a domingo 4:00 p.m.–12:30 a.m. Uber Eats marca otro.
6. **Fotos originales que faltan:** hot dogs, dedos de queso, boneless, las 4 papas y la michelada, sin texto
   encima. Hoy esas tarjetas llevan marcador honesto.
7. **¿Sigue en la carta la "salchi-papas"?** Aparece en la carta de Instagram de 2023 y no en la vigente.
8. **Permiso para usar las fotos con clientes** (`gmaps06`, `gmaps11`, `gmaps13`, `gmaps17`).
9. **La historia:** quién es la dueña, por qué "Cochera", de dónde salió el tema de motos y toros. Hay 6 años
   de negocio sin contar y ahorita la página no puede inventarlo.
10. **Cervezas:** qué marcas manejan y a qué precio. Se llama "Food & Beer" y no hay una sola cerveza en la carta.
11. **Link de cobro con tarjeta** (para que el pedido se pague en línea, no solo por WhatsApp).
12. **Correo del dueño** si se quiere que el formulario también le llegue por correo.
