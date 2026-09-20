# HOJA DE DIRECCION - Tania Reposteria Brunch & Cakes (Aguascalientes)

Escrita 20 sep 2026. Manda sobre cualquier texto viejo. Quien construye NO decide nada de aqui:
si algo no esta en esta hoja o en `research/`, se omite y se anota en `PENDIENTE-DUENO.md`.

**Ojo de identidad:** este negocio es **Tania Reposteria Brunch & Cakes**, de **Tania Gutierrez**,
Instagram **@1taniareposteria**, TikTok **@taniareposteria**, WhatsApp **449 413 6499**.
NO es "Tarela Reposteria" (Tania Aguilar) ni el Instagram @taniareposteria (aficionada, 163 seguidores).
Ningun dato de esos dos entra a la pagina.

Base a clonar: `krevo-muestras/pizza-y-fuego/` (solo `build.py`, `template.html` y el armado de
`sections/NN-slug.{html,css,js}` + `_kit/`). Se copia la MECANICA, no el look: tokens, header,
tipografias, formas y colores se rehacen completos con lo de abajo. No se toca `_kit/`,
ni otras muestras, ni el servidor local http://localhost:8770/ , ni Chromes ajenos.

---

## 1. EL TRABAJO

Que una persona que necesita pastel para una fecha **mande por WhatsApp su pedido con tamano,
sabor y dia**, y que quien solo pasaba se lleve hoy mismo un cuchareable, una caja o un pan
con precio a la vista.

No es presentar a Tania. Es llenar su agenda del horno y vaciar su vitrina.

---

## 2. LA PROMESA

> **"Amo lo que hago, como lo hago y el porque lo hago."** Lo firma Tania Gutierrez en Praga 504,
> y en abril de 2024 los panaderos de GIPAN le dieron el primer lugar al mejor pastel de Aguascalientes.

Esa frase es suya, textual, de su pagina de Facebook. El premio es de El Sol del Centro (22 abr 2024).
La de al lado no puede decir ninguna de las dos. Esa es la promesa que carga el hero y el cierre.

Frases verdaderas que se pueden usar en la pagina (y ninguna mas):
- "Primer lugar, Gran Primer Concurso de Pasteleria GIPAN. Isla San Marcos, abril 2024."
- "4.8 en Google con 21 resenas."
- "Praga 504, Fracc. del Valle 2da. Secc."
- "Lunes a viernes 10:00 a 20:00. Sabado 10:00 a 14:00. Domingo cerrado."
- "Agenda tu pastel" (su propio CTA en TikTok).

---

## 3. EL MOMENTO FIRMA

**El plato giratorio de la repostera.**

- **Donde:** seccion 3, "Encarga tu pastel".
- **Foto real:** `05-rappi-pastel-chocolate-flores.jpg` (1542x2048, cenital, pastel de chocolate con
  flores comestibles sobre marmol). Es la unica foto tomada desde arriba y por eso es la unica que
  puede girar sin verse falsa.
- **Que pasa:** el pastel esta montado en un disco (circulo perfecto, borde 1px `#C9A49A`, sombra de
  contacto suave). Al entrar la seccion al viewport, el disco **gira 18 grados y se asienta**
  (0.8 s, `cubic-bezier(.23,1,.32,1)`), y el titulo cae encima en dos tonos. Despues, **cada paso del
  pedido lo vuelve a girar 120 grados** (0.55 s) mientras alrededor del borde se va escribiendo, en
  mayusculas espaciadas de 11 px siguiendo la curva, lo que el cliente ya eligio:
  `20 CM · CHOCOLATE SIN HUEVO · 14 DE OCTUBRE`.
- **Como se dispara:** IntersectionObserver (`rootMargin: 0 0 -25% 0`) para la entrada;
  los giros de los pasos van por evento del formulario, no por scroll.
- **Reversible, sin pin, sin scrub largo.** Nada dura mas de 0.9 s. Con `prefers-reduced-motion`
  o sin JS, el disco aparece ya girado y la leyenda del borde se ve como texto normal debajo.
- **Blindaje:** el CSS base es el estado final visible + `setTimeout(1600)` que lo fuerza.

---

## 4. EL COMPONENTE FIRMA

**"El platon giratorio del pedido"** (no esta en `COMPONENTES-USADOS.md`).

Sale del negocio, no de una lista: Tania trabaja sobre base giratoria de reposteria (se ve el
platon dorado en `23-tiktok-pastel-charro-herradura.jpg`) y su logo es un circulo. El pedido de
pastel no es un formulario: es **poner el pastel en el platon y darle vuelta**.

Como se comporta:
1. Tres pasos, uno a la vez, alrededor del disco: **Tamano → Sabor → Fecha**.
2. Tamano: los que Tania confirme. Mientras no los de, van como texto libre
   "Para cuantas personas" + la linea **"Pregunta el precio"**. NUNCA "$0".
3. Sabor: solo los reales de `research/VENDE.md` (vainilla 3 leches, chocolate sin huevo,
   zanahoria, naranja con nuez y mousse de cajeta, red velvet, Oreo).
4. Fecha: `<input type="date">` con `min` = hoy. **No se dice cuantos dias pide de anticipacion**
   (no lo sabemos); debajo va "Tania te confirma la fecha por WhatsApp".
5. Boton final VERDE unico de la seccion: **ENVIAR MI PEDIDO POR WHATSAPP** a
   `wa.me/524494136499` con el mensaje armado:
   `Hola Tania, quiero encargar un pastel. Tamano: __ . Sabor: __ . Fecha: __ . ¿Me confirmas precio?`
6. Total del resumen: **"Te lo confirmamos por WhatsApp"**, nunca un numero inventado.

---

## 5. HEADER Y FORMAS PROPIAS

Todo sale de dos cosas reales: **el logo** (circulo rosa palo, rodillo negro horizontal con batidor
blanco, serif romana en mayusculas) y **su letrero** (placa redonda "BRUNCH & CAKES / BAKERY /
TANIA REPOSTERIA" + la palabra REPOSTERIA pintada en vertical sobre la columna blanca).

**Header (de este sitio y de ningun otro): "el rodillo".**
- Barra fija de 56 px en `#141110`, sin blur, de borde a borde.
- Logo circular de 40 px pegado a la izquierda, con 16 px de aire.
- A su derecha arranca **una barra horizontal de 3 px con las puntas redondeadas** (es el rodillo del
  logo) que cruza todo el ancho y muere en el boton.
- Derecha: boton rectangular **ENCARGAR** relleno `#F0D8D0`, letra `#111111`, 11 px, mayusculas,
  `letter-spacing:.14em`, radio 2 px. A su lado, la hamburguesa con la palabra **CARTA** (nunca "Menu").
- Al pasar 40 px: la barra baja a 46 px, el circulo del logo a 30 px, el rodillo se adelgaza a 1 px
  y queda `#F0D8D0` al 35 %. Transicion 220 ms. Sobre el hero es transparente con el rodillo visible.
- Nada de header serif centrado, ni linea dorada, ni barra con linea lima: eso ya es de otras muestras.

**Lenguaje de formas.**
- Dos formas y nada mas: **circulo perfecto** (sellos, el "+" de agregar, el platon, el avatar de
  resena) y **rectangulo de esquina recta, radio 2 px** (fotos, botones, tarjetas de producto).
- **Divisor entre secciones: un arco de 1px de 120 px de ancho, centrado** (el alambre del batidor).
  Prohibida la linea recta de borde a borde y prohibida cualquier banda de color que cruce al hacer
  scroll.
- **Marco de foto (motivo unico: el liston de sus cajas):** filete de 1 px `#C9A49A` separado 8 px de
  la imagen, y un nudito de liston en SVG de 14 px, trazo 1.5 px, en la esquina superior izquierda.
  Un solo grosor de trazo en toda la pagina. **Nada de cinta de medir.**
- Fotos de menos de 1,000 px de ancho: SIEMPRE dentro de ese marco, jamas a sangre.

**Colores (de `research/colores.md`).**
| Uso | Hex |
|---|---|
| Lienzo (casi toda la pagina) | `#141110` negro tinta calido |
| Banda de papel para leer (tienda, formulario, "todo listo") | `#F8F5F3` y `#EFE9E6` |
| Marca / acento unico | `#F0D8D0` rosa empolvado del logo |
| Marca profunda (botones y filetes sobre papel) | `#C9A49A` |
| Tinta | `#111111` |
| Verde WhatsApp (solo lo que manda WhatsApp + flotante) | `#25d366`, letra `#0b3d1f` |
Prohibido el turquesa del mural del local: no es color de marca.

**Tipografia.** Display **Marcellus** (romana, es la del logo) para titulos y precios en `tabular-nums`;
texto **DM Sans** 400/500. Nunca Inter, Poppins ni Montserrat. Sin manuscrita. Eyebrow 11 px,
mayusculas, `letter-spacing:.14em`, con una raya al inicio: "— AGUASCALIENTES".

**Botones.** Navegar y acciones normales: relleno `#F0D8D0` con letra `#111111` (o contorno 1 px
rosa sobre negro), rectangulares, finos, 48 px de alto, mayusculas espaciadas, maximo 3 palabras.
El "+" de agregar va en color de marca. **VERDE solo en 3 lugares de toda la pagina**: enviar el
pedido del platon, enviar el pedido del carrito y cotizar el evento. Mas el flotante. Nada mas.

---

## 6. LAS SECCIONES (6)

Presupuesto de alto en celular 390: **8,700 px en total**. Si algo no cabe, se recorta la seccion 4.

### 1 — HERO. "El pastel que ya se hizo para alguien."
- **Razon de venta:** en 3 segundos tiene que quedar claro que aqui se encarga un pastel para una
  fecha y que esta senora gana concursos. Sin eso, el visitante se va a Facebook y no vuelve.
- **Foto grande:** `23-tiktok-pastel-charro-herradura.jpg` a sangre, 100 svh (recortar las franjas
  negras de TikTok arriba y abajo; queda 1080x1450 aprox., alcanza para 390@2x). Es su video mas visto
  (22,000 vistas) y tiene sol de verdad.
- **Texto:**
  - Eyebrow: `— AGUASCALIENTES · PRAGA 504`
  - Titulo (dos tonos, ultima linea en `#F0D8D0`):
    **"Amo lo que hago,**
    **como lo hago**
    **y el porque lo hago."**
  - Bajada, una linea: "Tania Gutierrez, primer lugar del concurso de pasteleria GIPAN 2024."
  - Botones: **ENCARGA TU PASTEL** (marca, ancla a la seccion 3) y **VER LA VITRINA** (contorno,
    ancla a la seccion 2). **Cero verde aqui.**
- **Sello:** placa circular de 84 px arriba a la derecha, imitando su letrero BAKERY:
  `PRIMER LUGAR / GIPAN 2024 / AGUASCALIENTES`, borde 1 px rosa. No es contador, es un sello.
- Foto fija, no video. No hay suficientes fotos buenas para un loop decente.

### 2 — LA VITRINA DE HOY (catalogo a la vista, estilo tienda). Va PEGADA al hero.
- **Razon de venta:** es la unica seccion que cobra hoy mismo. Sus precios ya son publicos en Rappi;
  aqui se los llevan sin comision de app. Si esto se esconde, la pagina no vende nada este martes.
- **Foto grande:** `02-maps-vitrina-pan-artesanal.jpg` (900x1600, su vitrina real) a 60 svh dentro del
  marco de liston, con el pie encimado `01 / VITRINA · Praga 504`.
- **Titulo:** **"Hoy ya esta hecho. / Llevatelo."** (segunda linea en rosa).
- **Banda de papel `#F8F5F3`.** Chips pegados arriba: `Cuchareables · Rebanadas · Cajas de regalo ·
  Pan · Temporada`. Por defecto se ven TODOS. Tarjetas uniformes, 2 columnas en celular, 4 en compu:
  foto 1:1, nombre, precio en `tabular-nums` y un "+" circular en color de marca.
- **Precios REALES (Rappi, 19 sep 2026) y foto asignada. Ningun otro precio entra a la pagina:**

  | Producto | Precio | Foto |
  |---|---|---|
  | Pastel cuchareable (vainilla 3 leches) | $87 | `25-tiktok-cuchareables-vasos-logo.jpg` |
  | Cuchareable de chocolate con Oreo | $87 | marcador honesto |
  | Tiramisu | $89 | `06-rappi-tiramisu-cuchareable.jpg` |
  | Duo de cuchareables | $159 | marcador honesto |
  | Cuchareable para compartir | $250 | `13-rappi-cuchareables-surtidos.jpg` |
  | Rebanada de vainilla 3 leches | $59 | `10-rappi-pastel-3-leches-fresas.jpg` |
  | Rebanada de chocolate (sin huevo) | $69 | marcador honesto |
  | Rebanada de zanahoria | $65 | `09-rappi-rebanada-zanahoria.jpg` |
  | Rebanada de panque | $55 | `17-rappi-panque.jpg` |
  | Cheesecake NY (rebanada) | $115 | `15-rappi-cheesecake-ny.jpg` |
  | Brownie | $60 | `14-rappi-brownies-nuez.jpg` |
  | Macarons, 7 piezas | $240 | `11-rappi-macarons-caja.jpg` |
  | NY Cookies, 6 piezas | $295 | `12-rappi-ny-cookies-caja.jpg` |
  | Docena de cookies | $540 | marcador honesto |
  | Rafaelos artesanales, 5 piezas | $150 | `08-rappi-rafaelos-caja.jpg` |
  | Tarta de temporada 13 cm (calabaza) | $85 | marcador honesto |
  | Pan de caja de masa madre, 850 g | $100 | `16-rappi-pan-de-caja-masa-madre-etiqueta.jpg` |
  | Galletas de calabaza (temporada) | Pregunta el precio | `07-rappi-galletas-calabaza-halloween.jpg` |

  **Marcador honesto** = cuadro `#EFE9E6` con la silueta del logo al 12 % y la linea
  "Foto original pendiente". Ninguna foto se repite en toda la pagina.
- **Linea de honestidad obligatoria, 12 px, debajo de los chips:**
  "Precios tomados de su tienda en Rappi el 19 de septiembre de 2026. Tania los confirma."
- **Carrito:** barra fija "Mi pedido · 3" en color de marca cuando hay algo. La HOJA trae cantidades,
  forma de pago ("Efectivo en el local", "Transferencia", "Tarjeta en linea: te mandamos el link") y
  el **boton VERDE** que manda todo a `wa.me/524494136499`. Total siempre real; si hay un item sin
  precio, el total dice "te lo confirmamos por WhatsApp".
- **Ritmo:** sin eyebrow, sin parrafo. Titulo, chips, rejilla. Se acabo.

### 3 — ENCARGA TU PASTEL (el platon giratorio). Aqui esta el momento firma.
- **Razon de venta:** el pastel de diseno es su ticket alto y hoy se pierde en el chat. Esta seccion
  convierte "cuanto cuesta un pastel" en un mensaje con tamano, sabor y fecha ya escritos.
- **Foto grande:** `05-rappi-pastel-chocolate-flores.jpg` sobre el disco giratorio (ver punto 3).
- **Titulo:** **"Tu pones la fecha. / Yo pongo el pastel."**
- **Prueba pegada al lado: UNA sola foto chica, en marco, nunca a sangre:**
  `26-tiktok-pastel-trailer-fondant.jpg` (576 px de ancho, por eso va chica), con el pie
  "Trailer de fondant, por encargo". No se rellena con fotos que no sean pastel de diseno:
  el resto de los pasteles de diseno ya estan repartidos (23 en el hero, 05 en el platon).
- **Resena real, con estrellitas, debajo del platon** (textual, sin inventar nada):
  "Excelente calidad y precio. Muy recomendables los panes y los pasteles. Ademas te lo pueden
  disenar con el tema o personaje que tu elijas." — **Pedro Antonio Venegas Morales**, 5 estrellas, Google.
- Un solo boton verde: el del paso final.
- **Ritmo:** sin eyebrow-titulo-parrafo-boton. Es titulo + herramienta.

### 4 — MESAS DE POSTRES Y BRUNCH PARA EVENTOS
- **Razon de venta:** es el pedido mas grande que recibe (inauguraciones, cumpleanos, 25 aniversario)
  y ella misma pide "agenda tu fecha con anticipacion". Sin esta seccion se queda solo el ticket chico.
- **Foto grande:** `21-tiktok-mesa-postres-crepas.jpg` (1080x1920) a 60 svh, pie encimado
  `02 / MESA DE POSTRES`.
- **Fotos chicas (maximo 2, en marco):** `20-tiktok-catering-mesa-evento.jpg` y
  `18-tiktok-brunch-mesa-jardin.jpg`.
- **Titulo:** **"Tu mesa de postres, / montada por ella."**
- **Lista real, sin precios** (solo lo que existe en `research/hechos.md`): mesa de postres, barra de
  crepas dulces y saladas, canapes, charcuteria, clericot, brunch para evento, bebidas.
- **Cotizador de 2 campos** dentro de un bloque de papel: "¿Que festejas?" + "¿Cuantos invitados?"
  → boton VERDE **COTIZAR MI EVENTO** con el mensaje armado. Precio: "Pregunta el precio".
- Nada del menu de brunch de 2023 con precios. Esos precios NO se publican (ver PENDIENTE-DUENO).

### 5 — PRAGA 504 (el local y lo que dicen)
- **Razon de venta:** la ficha de Google manda a un sitio caido (ola.click, error 404): cada persona
  que busca "pasteleria Aguascalientes" hoy se pierde. Aqui aterriza, ve el arco blanco, la hora y llama.
- **Foto grande:** `04-maps-fachada-bakery-reposteria.jpg` en marco (recortada al arco + la placa
  redonda BAKERY + la palabra REPOSTERIA vertical; **fuera el letrero turquesa del vecino de arriba a
  la izquierda y el rojo del borde derecho**). No va a sangre: es foto de celular.
- **Foto chica:** `03-maps-interior-barra-mural.jpg` (la barra con bancos altos).
- **Titulo:** **"El arco blanco / de Praga 504."**
- **Datos en renglones, tal cual:** Praga 504, Fracc. del Valle 2da. Secc., C.P. 20089, Aguascalientes ·
  Lunes a viernes 10:00 a 20:00 · Sabado 10:00 a 14:00 · Domingo cerrado · 449 413 6499.
  Botones en color de marca: **COMO LLEGAR** (Google Maps) y **LLAMAR**. Sin verde.
- **Estrellas reales:** "4.8 en Google · 21 resenas" y tres resenas con nombre y 5 estrellitas:
  Juan Pedroza, Teresa Rios, Miguel Angel Rios. Textuales, sin el emoji de la de Teresa.
  Prohibido cualquier otro contador.
- **Ritmo:** sin parrafo. Foto, renglones, resenas.

### 6 — TODO LISTO PARA COMPLETAR + PIE
- **Razon de venta:** es el siguiente paso comercial de KREVO (la pagina se vende una vez, la tienda
  se cobra mensual). Aqui se ve que falta poco para cobrar en linea.
- **Banda de papel.** Titulo: **"Para encender tu tienda / nos faltan tres cosas."**
  Lista: 1) precios de pastel por tamano y porciones, 2) fotos originales en alta (pasteles enteros,
  brunch servido y el pastel ganador del GIPAN), 3) link de cobro para tarjeta en linea.
- **Cierre:** logo a mas del 60 % del ancho sobre `#141110` y la frase **"Agenda tu pastel."**
  con el boton verde flotante ya visible.
- **Pie:** redes REALES con logotipo SVG de 44 px: Facebook `facebook.com/taniareposteria`,
  Instagram `@1taniareposteria`, TikTok `@taniareposteria`. Nada de YouTube, nada de correo.

---

## 7. EL RITMO (para que no haya 3 secciones iguales)

| Seccion | Patron |
|---|---|
| 1 Hero | Foto a sangre + sello redondo + titulo de 3 renglones. Sin parrafo. |
| 2 Vitrina | **NO lleva eyebrow-titulo-parrafo-boton.** Titulo + chips + rejilla de tienda. |
| 3 Platon | **NO lleva el patron.** Titulo + herramienta giratoria + una resena. |
| 4 Eventos | Unica con eyebrow → titulo → 2 lineas → boton. Es la excepcion permitida. |
| 5 Praga 504 | **NO lleva el patron.** Foto en marco + renglones de datos + estrellas. |
| 6 Completar | Banda de papel con lista numerada + cierre de logo. Sin foto. |

Maximo 2 patrones iguales seguidos: aqui no hay ni dos.

---

## 8. LO QUE NO VA

- `01-maps-pastel-chocolate-milkyway-fresas.jpg`: marca ajena (Milky Way) a la vista. **Fuera.**
- `27-tiktok-pastel-chihiro-sin-cara.jpg`: texto quemado encima y personaje con derechos. **Fuera.**
- `19-tiktok-brunch-montaje-vasos-fruta.jpg` y `22-tiktok-cheesecake-mango-fresa.jpg`: traen marca de
  agua de TikTok. **Fuera.**
- `28-tiktok-tania-hogaza-masa-madre.jpg`: es ella, persona real y con logo ajeno en la sudadera.
  No se publica sin su permiso.
- Precios del menu de brunch 2023 (chilaquiles $75, pan frances $69, bagels $59 a $65). No se publican.
- Cualquier "$0". Si no hay precio: "Pregunta el precio" y total "te lo confirmamos por WhatsApp".
- Ano de fundacion, dias de anticipacion, anticipo, numero de pasteles entregados, "mas de X clientes".
  Nada de eso existe con fuente.
- La direccion de Rappi (Buenos Aires 302) y el horario de Rappi. Solo va Praga 504 y el horario de Maps.
- El correo `taniareposteria@gmail.com`.
- Cinta de medir, cortinas de color entre secciones, pildoras, emojis como iconos, guiones largos,
  Inter, fondo blanco plano, contadores, rejillas de tarjetas iguales con icono.
- Higgsfield, imagenes de IA y video de IA. **Puras fotos reales de estas 28.**
- Turquesa del mural como color de marca.
- Pin de scroll, scrub largo, cualquier animacion de mas de 1.2 s.

---

## 9. PENDIENTE-DUENO (va tambien en `PENDIENTE-DUENO.md`)

1. Precios de pastel entero por tamano y porciones (hoy no hay ni uno publico).
2. Dias de anticipacion y si pide anticipo.
3. Direccion vigente: Praga 504 (Maps) o Buenos Aires 302 (Rappi). ¿Son dos puntos?
4. ¿El brunch sigue en carta en el local o solo para eventos? Precios 2026.
5. Fotos originales en alta: pasteles enteros por tamano, brunch servido en plato, el pastel que gano
   el GIPAN 2024, y foto suya con permiso para publicarla.
6. Permiso para usar sus resenas de Facebook y llegar a 8 o 10.
7. Link de cobro con tarjeta (Mercado Pago, Stripe o Clip) para prender la tienda.
8. Arreglar el link de su ficha de Google Maps, que hoy manda a `tania-reposteria.ola.click` (404).
