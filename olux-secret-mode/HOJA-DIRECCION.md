# HOJA DE DIRECCIÓN — Olux American Style / secret mode
Aguascalientes · Tanyveth 105-B y Plaza San Rafael · 20 sep 2026
Director de arte: KREVO. El que construye NO decide nada que no esté aquí.

---

## 1. EL TRABAJO

Que alguien que hoy no puede ver ni un solo precio suyo en internet elija una pieza con su precio real y la aparte por WhatsApp: esta página es el reemplazo de la tienda en línea que se les cayó.

No es "presentar la boutique". El dinero de esta página sale de dos botones: **APARTAR** (apartado a dos meses, que es su mecánica real de venta) y **PREGUNTA EL PRECIO**. Todo lo que no empuje a esos dos, sobra.

---

## 2. LA PROMESA

> **Michael Kors, Tommy y DKNY originales en Tanyveth 105-B, apartados a dos meses, con 4.5 estrellas de 18 personas que ya vinieron.**

Nadie a un lado puede decir eso: la calle y el número son suyos, el apartado a 2 meses es su mecánica publicada, las marcas son las que tienen en catálogo y las estrellas son las de su ficha de Google (13 de 5★, 3 de 4★, 1 de 3★, 1 de 1★, sobre 18).

Versión corta para el hero (dos tonos, última línea en color de marca):

```
Originales de marca.
Apartados a dos meses.
```

Eyebrow del hero: `TANYVETH 105-B · AGUASCALIENTES`, precedido del parteaguas (linea de 1 px + travesano), NO de un guion largo.

Renglón que resuelve los dos nombres, debajo del título del hero, en 14 px:
> "Nos buscas como Ólux American Style. El letrero de la calle dice secret mode. Es el mismo local y el mismo WhatsApp."

---

## 3. EL MOMENTO FIRMA

**"El rótulo se prende y la cámara baja al aparador."**
Foto: `research/fotos/fachada-tanyveth-secret-mode-google.jpg` (1600 × 1257, nítida, es su mejor activo). Arranca en la sección 1 y aterriza en la sección 2.

**Beat A — se prende el letrero (una sola vez, 700 ms, al cargar).**
Encima del hero va una COPIA recortada de la misma foto, limitada a la zona real del rótulo: `x 330–560, y 395–565` del original (≈ 20–35 % del ancho, 31–45 % del alto). Esa copia pasa de `clip-path: inset(0 100% 0 0)` a `inset(0 0 0 0)` de izquierda a derecha mientras sube `filter: brightness(1) → brightness(1.55) saturate(1.18)`. Se ilumina el PÍXEL REAL del letrero. **Prohibido dibujar el letrero en SVG o redibujar el logo**: se enciende la foto, no se inventa un rótulo. Easing `--ease-out`. No se repite.

**Beat B — la cámara baja por la fachada (ligado al scroll, reversible, sin pin).**
Del 0 al 60 % del scroll del hero, la foto de fondo mueve `object-position` de `50% 28%` a `50% 86%` y `scale` de 1.06 a 1.00. `scrub: .5`, en celular sin pin (como `01b-mueble`). Recorrido equivalente ≤ 1.2 s. Reversible al subir.

**Beat C — se prenden los tres aparadores (al entrar la sección 2, 420 ms cada uno, 70 ms de separación).**
Los tres marcos suben de `opacity 0 → 1` y el velo oscuro de cada ventana se retira con `clip-path: inset(100% 0 0 0) → inset(0)`. Reversible.

Suma animada por debajo de 1.5 s. Blindaje obligatorio: todo visible a los 1.6 s aunque falle GSAP (no quitar la red del kit).

---

## 4. EL COMPONENTE FIRMA — "Los tres aparadores"

No está en `COMPONENTES-USADOS.md`. Sale del negocio, no de una lista: su fachada real tiene **tres aparadores de planta baja**, y ese es literalmente su aparador de calle. Aquí el aparador es el navegador del catálogo.

**Qué es.** El recorte inferior de la fachada real (`y 800–1257, x 130–1500` del original) a lo ancho, con **tres zonas activas de 1 px de marco** exactamente encima de las tres ventanas reales:

| Zona | Recuadro en el original (1600 × 1257) | Etiqueta |
|---|---|---|
| Izquierda | x 195–505, y 845–1195 | `CARTERAS Y MOCHILAS` |
| Centro | x 615–915, y 850–1190 | `CALZADO` |
| Derecha | x 950–1360, y 848–1195 | `ROPA` |

(coordenadas aproximadas medidas sobre la foto; el que construye las ajusta a ojo a 390 px y las verifica con captura).

**Cómo funciona.** Al tocar una ventana, ESA ventana se prende (velo que se retira + `brightness 1.28`, 320 ms) y las otras dos bajan a `brightness .55`; el marco activo cambia a 1 px en `--brand`. Abajo, la lista del catálogo se filtra a ese grupo con un cruce de 220 ms **sin que la sección brinque de alto** (alto mínimo fijo). La ventana activa viaja al mensaje de WhatsApp ("Hola, vi sus carteras en la página…"). Por defecto arranca con `CALZADO` prendida, que es la única que tiene foto real que enseñar.

**No hay carteles inventados.** La etiqueta es el nombre del grupo del catálogo, NO una descripción de lo que hay dentro de esa ventana. Prohibido escribir pies como "aquí están las carteras".

**Por qué no es el interruptor de doña-petra.** Ahí la unidad era la SUCURSAL y el interruptor cambiaba horario, dirección, teléfono y destino del pedido. Aquí la unidad es el **departamento del catálogo**, no hay estado en vivo ni reloj, y el control no es un interruptor de dos estados pegado al header: son tres huecos de luz sobre su propia fachada, dentro de la sección, que filtran producto. El asunto de los dos nombres se resuelve por **división** (sección 5), no por interruptor.

Renglón para `COMPONENTES-USADOS.md` al terminar:
`olux-secret-mode | Los tres aparadores (las tres ventanas reales de su fachada se prenden una a la vez y filtran el catálogo; la apagada baja a brightness .55) | 20 sep 2026`

---

## 5. HEADER Y FORMAS PROPIAS

### 5.1 El header: "La marquesina de Tanyveth"

Sale de la fachada: azulejo oscuro, letrero iluminado y el **parteluz de aluminio** que divide los aparadores.

- Alto 84 px en celular / 92 px en compu. **Transparente** sobre el hero, con una hairline inferior de 1 px `rgba(244,241,234,.18)`.
- Fila única, de izquierda a derecha:
  1. El logo real `logo-olux-american-style-1080.jpg` a **26 px de alto** con `mix-blend-mode: screen` (el cuadro negro del JPG desaparece sobre el lienzo oscuro; no se recorta ni se deforma).
  2. **EL PARTEAGUAS** (el signo gráfico de este sitio): línea vertical de 1 px y 26 px de alto en `--brand`, con un travesaño horizontal de 10 px a media altura. Es el parteluz de la ventana.
  3. `secret mode` en la serif ITÁLICA minúscula, 15 px, `letter-spacing .06em`, con un subrayado de 2 px y 28 px de ancho en degradado `#2A2D7C → #B75180` (los dos colores reales del neón de su letrero).
- A la derecha: `MENÚ` en texto, 13 px, mayúsculas, `letter-spacing .16em`; y **un solo botón: `APARTAR`**, sólido en `--brand`, rectangular (radio 2 px), 44 px de alto, mayúsculas espaciadas. **Ningún verde en el header.**
- Al pasar 40 px: baja a 54 px, fondo `#17161D` al 92 % con `backdrop-filter: blur(10px)`, el logo baja a 20 px, desaparece `secret mode` y queda el lockup compacto (logo + parteaguas + subrayado de neón). Si hay piezas agregadas, aparece pegada debajo la barra `Mi apartado · N` en `--brand`.
- Menú: panel completo en celular, links numerados `01`–`06` con el parteaguas entre número y texto, foco atrapado, `Escape`, pie con WhatsApp y Llamar.

### 5.2 Lenguaje de formas

- **Radios: 0 px** en fotos, marcos y bandas; **2 px** en botones. Nada redondo, ninguna píldora.
- **Marco de foto (el aparador):** 1 px `rgba(244,241,234,.28)` con inset de 6 px, más una segunda línea de 1 px en `--brand` al 45 % **solo del lado izquierdo** (el perfil del aluminio).
- **Divisor de sección:** 1 px horizontal `rgba(244,241,234,.14)` **interrumpido al centro** por el travesaño vertical de 10 px en `--brand`. Ese divisor es el único separador; **no hay cortinas de color entre secciones**.
- **El "+" de agregar:** cuadrado de 34 × 34, contorno de 1 px en `--brand`, sin relleno; al tocarlo se rellena sólido. Nunca verde.
- **Un solo motivo gráfico en toda la página:** el parteluz (línea + travesaño), siempre a 1 px.

### 5.3 Color (hexadecimales, de `colores.md` y muestreados sobre la foto real)

| Token | Hex | De dónde |
|---|---|---|
| `--canvas` | `#26242E` | azulejo de la fachada (medido `#2B2934`–`#34313C`) |
| `--deep` | `#17161D` | bandas oscuras, pie y velo del hero |
| `--stone` | `#BCAE8B` | cantera real de la planta baja (medida) — eyebrows, números, hairlines |
| `--paper` | `#E9E0CC` | ÚNICA banda clara, solo para leer (sección 6) |
| `--ink` | `#F4F1EA` / `--ink-2` `rgba(244,241,234,.64)` | texto |
| `--brand` | `#C85E8D` | rosa del neón real del letrero (medido `#B75180`, subido para que contraste sobre el lienzo) |
| `--brand-deep` | `#2A2D7C` | azul del mismo neón (medido) — SOLO hairlines y el subrayado, nunca fondo |
| `--wa` | `#25d366` con tinta `#0b3d1f` | solo WhatsApp |

Nada de `#000` ni `#fff` de fondo. Una sola temperatura: fría con el rosa del neón como único acento.

### 5.4 Tipografía (dos familias, nunca Inter)

- **Playfair Display** — titulares y el nombre. Su logo real ES una serif editorial; la itálica minúscula de Playfair hace las veces del `secret mode` manuscrito **sin meter una tercera fuente**.
- **DM Sans** — cuerpo, etiquetas y precios (`font-variant-numeric: tabular-nums`).
- Hero celular `clamp(44px, 12vw, 64px)`; titulares a `max-width: 12ch` con `text-wrap: balance` y un `span` por renglón.

---

## 6. LAS SECCIONES (7, tope 9,000 px en celular)

### 1 · HERO — La fachada real
- **Razón de venta:** en 3 segundos queda probado que es una tienda física, invertida y bonita de Aguascalientes, y queda resuelto el enredo de los dos nombres antes de que el visitante se vaya.
- **Foto grande:** `fachada-tanyveth-secret-mode-google.jpg` a sangre, 100svh, `object-position 50% 28%` (recorte alto: azulejo + letrero). Velo direccional `rgba(10,6,3,.42)` solo del lado del texto + viñeta.
- **Texto:**
  - eyebrow `TANYVETH 105-B · AGUASCALIENTES` con el parteaguas al frente (nunca un guion largo)
  - título: `Originales de marca.` / `Apartados a dos meses.` (segunda línea en `--brand`)
  - renglón de 14 px: "Nos buscas como Ólux American Style. El letrero de la calle dice secret mode. Es el mismo local y el mismo WhatsApp."
  - botones: `VER EL APARADOR` (sólido `--brand`) y `CÓMO LLEGAR` (contorno). **Cero verde aquí.**
- Presupuesto: 844 px.

### 2 · EL APARADOR — catálogo a la vista con precios reales
- **Razón de venta:** ES la página. Su tienda en línea se cayó y hoy nadie puede ver un precio suyo en ningún lado; aquí se ven 15 renglones con precio real y el botón de apartar. Esta sección trae el dinero.
- **Foto grande:** mismo archivo, recorte inferior `y 800–1257, x 130–1500` (las tres ventanas). Es el mismo edificio: el hero enseña el letrero y esta sección enseña la planta baja — la cámara bajó.
- **Foto chica (una sola, enmarcada):** `interior-exhibidor-tenis-google.jpg` recortada a `y 290–830` (queda 576 × 540 **sin nada del texto quemado** de Instagram) y mostrada a **máximo 288 px de ancho** para que no se vea borrosa a 390 @2x. Aparece SOLO cuando la ventana activa es `CALZADO`. **Nunca a sangre, nunca más grande.**
- **Título:** `Tres aparadores.` / `Ábrelos desde aquí.` (segunda línea en `--brand`). Sin eyebrow, sin párrafo, sin botón de sección.
- **Renglón de honestidad, 13 px, bajo el título:** "Precios tal como ustedes los publicaron en su tienda en línea (catálogo de enero de 2026). Los de hoy te los confirmamos por WhatsApp."
- **La lista (precio REAL, `tabular-nums`, un `+` en color de marca por renglón):**

  **CARTERAS Y MOCHILAS**
  | Pieza | Precio | Nota real |
  |---|---|---|
  | Backpack Tommy Hilfiger | $2,290 | 4 modelos a este precio (uno con tarjetero) |
  | Backpack Tommy Hilfiger | $2,390 | |
  | Cartera Michael Kors | $2,590 | 3 modelos a este precio |
  | Cartera Michael Kors | $1,990 | |
  | Cartera Calvin Klein RFID protection | $1,250 | 3 colores a este precio |
  | Cartera Calvin Klein RFID protection | $1,190 | |
  | Cartera Guess | $1,050 | |

  **CALZADO**
  | Pieza | Precio | Nota real |
  |---|---|---|
  | Botas de lluvia Tommy Hilfiger | $2,190 | |
  | Botas niña DKNY | $2,100 | 2 modelos a este precio |
  | Tenis niño Tommy Hilfiger | $1,790 | |
  | Tenis niño Polo Ralph Lauren | $1,350 | |

  **ROPA**
  | Pieza | Precio | Nota real |
  |---|---|---|
  | Blusa Tommy Hilfiger cuello alto | $1,050 | |
  | Blusa DKNY | $850 | |
  | Playera Tommy Hilfiger | $750 | |
  | Vestido Tommy Hilfiger corte cintura baja | **Pregunta el precio** | sí está en su catálogo, sin precio capturado |

- **Sin foto de producto: no existe ni una.** Los renglones van tipográficos (nombre en la serif, precio a la derecha, `+` cuadrado). **Prohibido el recuadro gris, la silueta, el ícono o la foto de banco.**
- **La barra fija `Mi apartado · N`** en `--brand` aparece al agregar. La **hoja** solo lleva el carrito y el cierre; el botón verde de WhatsApp vive ahí dentro. Si hay una pieza sin precio, el total dice "te lo confirmamos por WhatsApp". Nunca "$0".
- Presupuesto: ~2,900 px.

### 3 · CÓMO SE PAGA — apartado, meses y envíos
- **Razón de venta:** una cartera de $2,590 no se compra de impulso; lo que la cierra es "te la aparto dos meses" y "3 o 6 meses sin intereses". Es su mecánica publicada y su ventaja real contra una tienda departamental.
- **Sin foto.** Tres marcos verticales de 1 px (los mismos aparadores, ahora tipográficos), numerados `01 02 03` en `--stone`.
  - `01 APARTADO` — "Te lo apartamos dos meses."
  - `02 TARJETAS` — "3 o 6 meses sin intereses, según el monto de la compra."
  - `03 ENVÍOS` — "Entregas a domicilio y envíos a toda la República."
- **Renglón suelto debajo, en `--brand`:** "Descuentos desde $499 hasta $999 pagando en efectivo." (promoción real publicada en su Facebook).
- **Título:** `Te lo apartamos dos meses.` / `Tarjetas a 3 o 6 meses.` (segunda línea en `--brand`).
- **Un solo verde de la página aquí:** `APARTAR POR WHATSAPP`.
- Presupuesto: ~900 px.

### 4 · LAS RESEÑAS REALES
- **Razón de venta:** sin fotos de producto, la prueba de que sí son originales y sí atienden bien son sus 18 opiniones. Mata la duda antes del botón.
- **Sin foto.** Dato grande **una sola vez**: `4.5` en Playfair gigante con `18 opiniones en Google` debajo. **Nada de fila de contadores.**
- **Título:** `18 opiniones en Google.` / `4.5 estrellas.` (segunda línea en `--brand`).
- **Citas textuales, con nombre:**
  - **Isabel Esparza** ★★★★★ (Google, Local Guide) — "Exelente atención y muy buenos articulos, gran calidad y muy Buenos precios" *(se transcribe tal cual, con sus erratas; es cita)*
  - **Juan Ascencio** ★★★★★ (Google, Local Guide) — "Muy buen surtido y precio"
  - **Oscar Flores** (Google, Local Guide) — "Excelente lugar, un poco caro, pero encuentras ropa y accesorios geniales." **sin estrellitas** (el research no pudo confirmar el número)
  - **Dey Luevano** (recomendación de Facebook, 7 sep 2024) — "Me encantó el trato son muy amables y me encantaron los productos" **sin estrellitas** (Facebook no usa estrellas)
- Solo Isabel y Juan llevan estrellitas. Los otros dos llevan la fuente escrita.
- Presupuesto: ~900 px.

### 5 · DOS NOMBRES, DOS LOCALES — la división
- **Razón de venta:** hoy pierden al cliente que ve "secret mode" en la calle y busca "Olux" en Google (o al revés), y la sucursal de Plaza San Rafael no existe para nadie en internet. Esta sección recupera a los dos.
- **La división (aquí se resuelve de frente, y NO es un interruptor):** una placa oscura a lo ancho partida por **el parteaguas** vertical (línea de 1 px + travesaño, a escala grande: 120 px de alto).
  - Lado izquierdo: `ÓLUX AMERICAN STYLE` en la serif, y debajo en 13 px: "así nos buscas en Google, Facebook, Instagram y TikTok".
  - Lado derecho: `secret mode` en la serif itálica con el subrayado de neón, y debajo: "así dice el letrero de la calle".
  - Cruzando abajo, un solo renglón: **"Mismo local. Mismo teléfono. Las mismas marcas."**
- **Foto chica enmarcada (máximo 240 px de ancho):** `fachada-tanyveth-navidad-olux-google.jpg` recortada a `y 0–560` (se corta la calle y los coches; quedan el logo Ólux completo y la fachada). Pie: "La misma fachada, firmada Ólux." **Nunca a sangre, nunca en el hero** (es foto chica, de temporada y con marca de agua).
- **Los dos locales, tipográficos, uno debajo del otro:**
  - **Tanyveth 105-B**, Fracc. Bona Gens · Tel. 449 104 3645 · 4.5 ★ en Google (18 opiniones) · botón `CÓMO LLEGAR` → `https://www.google.com/maps/search/?api=1&query=21.877047,-102.267484`
  - **Plaza San Rafael**, Av. Convención de 1914 Pte. 1904, Local 16 · botón `CÓMO LLEGAR` (búsqueda por dirección) · renglón honesto: "Sucursal nueva, todavía sin opiniones en Google."
  - Horario, una sola vez para las dos: **Lunes a viernes 11:00 a 19:30 · Sábado y domingo 12:00 a 18:00.**
- **Título:** `Ólux en Google.` / `secret mode en la calle.` / `Es el mismo local.` (última línea en `--brand`).
- **Prohibido** decir cuál nombre "es el bueno", que uno sustituye al otro, o amarrar un nombre a una sucursal. No está confirmado.
- Presupuesto: ~1,500 px.

### 6 · TODO LISTO PARA COMPLETAR
- **Razón de venta:** vende el siguiente paso (y la suscripción). Es la única banda clara de la página, `--paper #E9E0CC`, para que se lea como una carta.
- **Sin foto.** Lista de 6 renglones con casilla cuadrada de 1 px, tomada de PENDIENTE-DUEÑO (punto 9).
- **Título:** `Falta poco.` / `Lo que tú pones.` (segunda línea en `--brand`).
- Presupuesto: ~800 px.

### 7 · CIERRE — el logo a pantalla
- **Razón de venta:** el último toque de apartar, con todo a la mano.
- **Foto:** `logo-olux-american-style-1080.jpg` a **más del 60 % del ancho** con `mix-blend-mode: screen` sobre `--deep` (el cuadro negro del JPG se funde con el fondo; el logo se ve completo, sin recortes).
- **Remate, 3 palabras:** `¿Te lo apartamos?`
- Debajo: horario en dos renglones, los dos teléfonos, y las **redes reales con logotipo SVG de 44 px**: `facebook.com/RopaOluxAmericanStyle`, `instagram.com/olux_american`, `tiktok.com/@oluxamericanstyle`.
- Botón verde final `MANDAR WHATSAPP` → `https://wa.me/524491371706` (probar el link antes de entregar) y `LLAMAR` → `tel:+524491043645`.
- Presupuesto: ~900 px. **Total estimado: ~8,700 px.** Si se pasa, se recorta la sección 3, nunca el catálogo.

---

## 7. EL RITMO

**NO llevan eyebrow → título → párrafo → botón:** las secciones **1, 2, 4, 5 y 7**.
- 1 Hero: eyebrow + título + un renglón + dos botones (no hay párrafo).
- 2 Aparador: título + renglón de honestidad + las tres ventanas + la lista. Sin eyebrow, sin párrafo, sin botón de sección.
- 4 Reseñas: dato grande + citas textuales. Sin eyebrow, sin párrafo, sin botón.
- 5 Dos nombres: la placa partida + bloques de dirección. Sin párrafo; los botones son de `CÓMO LLEGAR`, no de cierre.
- 7 Cierre: logo + pregunta + datos.

**El ritmo clásico se permite SOLO en las secciones 3 y 6**, y nunca quedan pegadas (entre ellas van la 4 y la 5). Nunca tres seguidas con el mismo ritmo.

**Verdes en toda la página: 3 en total.** Uno en la sección 3, uno dentro de la hoja del carrito, uno en el cierre, más el flotante. Todo lo demás (navegar, agregar, cómo llegar, ver más) va en `--brand`, fino, rectangular, mayúsculas espaciadas.

---

## 8. LO QUE NO VA

1. **Ninguna foto de producto.** No existe una sola. Prohibido el recuadro gris, la silueta, el ícono, el "placeholder", la foto de banco y cualquier imagen de IA o Higgsfield. Los renglones sin foto van tipográficos.
2. **Ninguna foto de campaña de Tommy, DKNY, Michael Kors, Calvin Klein, Guess o Polo Ralph Lauren**, aunque estén subidas en su Facebook: es marca ajena y no es de ellos.
3. **Su propio lema queda prohibido como título o subtítulo:** "Calidad, variedad en un solo lugar", "La mejor variedad…". Lleva palabras prohibidas (calidad, todo en un lugar). Tampoco: servicio, tu mejor opción, experiencia única, sin vueltas, lo hacemos posible.
4. **No se enlaza `secretmodelegante.com` ni `facebook.com/RopaOriginalSecretMode`:** los dos están caídos hoy. Solo las tres redes vivas.
5. **No se citan reseñas de Tripadvisor:** ahí el negocio está mal catalogado como restaurante y las reseñas hablan de comida.
6. **No se inventa el mapeo nombre ↔ sucursal**, ni se dice que un nombre reemplaza al otro, ni que "cambiaron de nombre". Solo: mismo local, mismo teléfono, mismas marcas.
7. **Nada de años de antigüedad, historia, ni nombre de dueño:** no hay dato con fuente.
8. **Nada de "envío gratis"**, ni costo de flete, ni "stock disponible": no hay dato.
9. **Fila de contadores: prohibida.** El 4.5 va una sola vez como dato grande. Los 34 mil seguidores de Facebook, si se usan, van como un renglón de texto en el pie — nunca como tercia de números.
10. **Nada de cinta de medir, cortinas de color entre secciones, píldoras, emojis como íconos, guiones largos ni Inter.** (Los guiones largos de ESTA hoja son de la hoja; en la página no va ni uno: donde aquí hay una raya, en la página va el parteaguas o un punto medio `·`.)
11. **La foto navideña y la del exhibidor NUNCA van a sangre ni en el hero** (una es chica y con marca de agua de temporada; la otra trae texto quemado y va recortada). El texto quemado del exhibidor se corta, no se tapa con una caja.
12. **El letrero y el logo no se recortan.** Nada de logo en círculo ni con orla.
13. **La sucursal de Plaza San Rafael no lleva foto** (no existe ninguna). Va tipográfica, con su renglón honesto.
14. **No se esconde el catálogo detrás de un botón.** En la hoja solo el carrito y el cierre.
15. **Ningún "$0".** Donde no hay precio: "Pregunta el precio", y el total "te lo confirmamos por WhatsApp".
16. **Nada verde fuera de los 3 botones de WhatsApp y el flotante.** El "+" de agregar va en `--brand`.

---

## 9. PENDIENTE-DUEÑO (va en `olux-secret-mode/PENDIENTE-DUENO.md`)

**Lo primero, antes de publicar:**
1. **¿Qué nombre va al frente?** Ólux American Style (el de Google con reseñas y el de sus 34 mil seguidores) o secret mode (el del letrero nuevo y su tienda en línea). Mientras no conteste, la página los trae a los dos, dividido y honesto.

**Fotos (lo que más falta):**
2. **Fotos de la mercancía que tienen HOY**, pieza por pieza, fondo liso: sin eso no hay tarjetas de producto y el catálogo se queda tipográfico.
3. Fotos del interior **sin overlays de Instagram** ni texto encima.
4. Foto de la fachada de **Plaza San Rafael** (no existe ninguna en internet).
5. Foto de la fachada de Tanyveth **sin decoración navideña y sin marca de agua**.
6. **El logo en vector (.ai/.eps/.svg) o PNG transparente**; hoy solo hay el JPG con fondo negro.

**Datos:**
7. **Precios de hoy en tienda física.** Los 15 de la página son los últimos que ellos publicaron (catálogo en línea de enero 2026) y hay que confirmarlos o cambiarlos.
8. Precio del **vestido Tommy Hilfiger corte cintura baja** (está en catálogo, sin precio capturado).
9. **Costo de envío** a otras ciudades.
10. **¿El apartado a 2 meses y los 3/6 MSI aplican igual en las dos sucursales?**
11. **CP de Tanyveth:** Google dice 20250, Facebook dice 20255.
12. **Teléfono de la sucursal Plaza San Rafael** (hoy Google le pone el mismo 449 137 1706) y su horario, si es distinto.
13. **Confirmar el WhatsApp** `wa.me/524491371706` (probar que abra la conversación correcta).
14. **¿Van a reactivar secretmodelegante.com?** Si no, esta página pasa a ser su catálogo y entra la suscripción mensual de KREVO (operación, precios, pasarela de pago).
15. **Link de cobro / pasarela** para la tarjeta en línea.
16. **Las otras 13 reseñas de Google** cuyo texto no se pudo sacar en esta pasada, si quiere que salgan más.
