# Aldo Adame — Hoja de dirección

Fecha: 21 sep 2026. Fuente única de datos: `research/hechos.md`, `research/FOTOS.md`, `research/VENDE.md`,
`research/servicios.md`, `research/colores.md`, `research/resenas.md`. Nada fuera de ahí entra a la página.

---

## 1. El trabajo de esta página, en una frase

Que la novia que ya lo vio en Instagram entienda en 30 segundos **cómo se ven de verdad sus bodas, en qué
venues las monta y con qué fotógrafos trabaja**, y le deje su fecha de 2027 por correo sin tener que mandar un DM.

Hoy Aldo tiene dominio (aldoadame.com) y correo, pero la página dice "Próximamente": quien lo busca en Google
no encuentra nada y se regresa a Instagram, donde su trabajo está revuelto entre 2,102 publicaciones.

## 2. A quién le habla

A la novia (o la pareja, o la mamá) que ya está comparando **dos o tres diseñadores de bodas** de Aguascalientes
y que va a gastar mucho dinero. No busca precio: busca **nivel y prueba**. Las tres preguntas que trae en la
cabeza, en este orden:

1. ¿Sus bodas se ven como las que yo quiero? → el tablero de cada boda, con fotos grandes.
2. ¿Ha montado en MI venue? → la lista de venues reales con nombre.
3. ¿Me queda fecha? → "NOW BOOKING 2027", que es lo que él mismo dice en su bio.

Nada de menú, carrito ni precios: no los publica y no se inventan.

## 3. El cierre: por CORREO (no hay WhatsApp)

`research/hechos.md` es explícito: **no se encontró ningún teléfono ni WhatsApp público**. Se buscó en el perfil,
en las destacadas, en bodas.com.mx, en Zankyou y con búsqueda directa. Entonces:

- El botón de cierre es un `<a href="mailto:aldoadame@aldoadame.com?subject=...&body=...">` REAL, con el mensaje
  base escrito en el HTML. En **color de marca (azul marino)**, nunca verde.
- **No hay botón flotante** de WhatsApp en ninguna parte de la página.
- Junto al correo va el enlace a su Instagram real (@aldoadameg), que es como lo contratan hoy.
- En "Lo que necesitamos de ti" se le pide a Aldo **su WhatsApp** para poner el botón verde cuando lo dé.

## 4. Secciones (6, tope 7) y el px de cada una en celular

| # | Sección | Qué hace por la venta | Foto grande | Alto aprox. 390 px |
|---|---|---|---|---|
| 10 | `#hero` | Ponerlo en alto en 3 segundos con su mejor foto y su propia frase de agenda | `23-jacquelineramiro-calesa-novios` (hero-m / hero-d) | ~850 |
| 20 | `#bodas` | **El trabajo a la vista justo después del hero.** Componente firma: el tablero de cada boda | 4 tableros, una foto grande cada uno | ~2,700 |
| 30 | `#diseno` | Qué diseña, por tipo de evento (Bodas · Ramo de novia · Eventos), como él mismo lo tiene ordenado en sus destacadas | `18-mesa-rattan-a`, `27-florales-a`, `02-wimbletwo` (recortada al montaje) | ~2,100 |
| 40 | `#venues` | Confianza dura: los venues donde ya montó + lo que dicen sus fotógrafos + la revista | `25-tierratinta-a` | ~1,500 |
| 50 | `#agenda` | El cierre: formulario corto de 5 campos que arma el correo | — (banda oscura) | ~1,250 |
| 60 | `#completar` | Lo que necesitamos de él (fotos originales, WhatsApp, servicios, zonas) + pie | — | ~900 |

**Total estimado: ~9,300 px.** Objetivo medido con `krevo-shot`: **≤ 9,000 px**. Si se pasa, se recorta el
tablero 4 (Almudena) a formato chico y se aprieta `#diseno`.

Ritmo (R3): hero foto → tablero interactivo → banda OSCURA con tres tipos de trabajo → banda hueso con lista de
venues y dos citas → banda OSCURA con formulario → hueso con la lista de pendientes. Nunca dos secciones seguidas
con eyebrow-título-párrafo-botón.

**Página aparte:** `portafolio.html` con **las 30 fotos reales**, agrupadas por evento, con crédito de fotógrafo
y link al post de origen. Mismo header y mismo pie. La landing enseña 11; el portafolio las enseña todas.

## 5. Header propio y lenguaje de formas propio

**Header (R11).** Nada de logo + hamburguesa. Tres columnas en una sola línea de 56/64 px sobre fondo transparente:
`ALDO ADAME` a la izquierda en versalitas espaciadas (0.28em), la nav de 4 anclas al centro (solo ≥900 px), y a la
derecha una sola acción: `AGENDA 2027`, rectangular, en azul marino. **Debajo del header corre una línea de 1 px
que se llena de terracota conforme bajas la página** (avance de lectura). En celular no hay panel ni hoja: la nav
se convierte en una tira horizontal de anclas con scroll que vive dentro de la misma línea de 1 px. Se compacta a
48 px al pasar de 40 px de scroll y el fondo pasa a hueso con blur.

**Lenguaje de formas: el passepartout.** Todo es una lámina montada, como en el portafolio impreso de un diseñador:

- Radio **0 px** en absolutamente todo (botones, marcos, chips). Nada redondo.
- Toda foto vive dentro de un **marco de hueso con una línea de 1 px de azul marino metida 10 px** (passepartout).
  El marco lleva color de fondo, así nunca queda un hueco blanco si la foto tarda.
- Divisores: línea de **1 px** y nada más. Un solo grosor en toda la página.
- Numeración editorial `01 —`, `02 —` en terracota, tamaño 11 px, versalitas espaciadas.
- Los pies de foto van **debajo del marco, alineados a la izquierda**, en 11 px, con el crédito del fotógrafo.

**Tipografía.** Dos familias, ninguna repetida en las otras muestras:
- Display: **Cormorant Garamond** 300/400/500 (serif de alto contraste, fina). Bodoni Moda ya la usa
  mimo-beauty-room y Marcellus tania-reposteria: quedan descartadas.
- Texto y versalitas: **Jost** 300/400/500 (geométrica fina; no se usa en ninguna otra muestra).
- Nunca Inter, Poppins, Montserrat.
- Escala: hero celular `clamp(40px, 11.5vw, 58px)`, compu `clamp(64px, 5.6vw, 116px)`. Titulares a dos tonos:
  la última línea en terracota.

**Color** (todo medido de sus fotos reales, `research/colores.md`; ninguno inventado):

| Token | Valor | De dónde sale |
|---|---|---|
| `--paper` | `#FAF7F2` | lino y carpas blancas |
| `--paper-2` | `#F1E9DE` | crema/marfil de las flores |
| `--ink` / `--brand` | `#0E1A2B` | azul marino del monograma "AA" |
| `--accent` | `#B5622E` | amaranto seco / óxido de los arreglos |
| `--olive` | `#8A9A6E` | mantel verde olivo de Arianna y Alejandro |
| `--blush` | `#E8B4A0` | rosas durazno de los centros |

Botones de navegar y de acción: **azul marino sólido, rectangulares, 48–52 px, versalitas 0.16em**. Secundario de
contorno de 1 px. Terciario: texto con flecha. **Cero verde en toda la página** (no hay WhatsApp).

## 6. Componente firma: **el tablero de cada boda**

Lo que un *event designer* de verdad le entrega a una novia antes de la boda es un **tablero**: los nombres, la
fecha, el venue, y los colores exactos del evento. Esta página lo convierte en la forma de ver su portafolio.

Cómo funciona:

- Cuatro pestañas con el nombre real del evento, en Cormorant: **Jacqueline & Ramiro · Arianna y Alejandro ·
  Tierra Tinta · Almudena's WimbleTwo**.
- Al abrir un tablero, **la banda entera se repinta** con la paleta de ESE evento (fondo, línea, número) en un
  cruce de 420 ms, y **los cinco chips de color entran uno por uno, 70 ms aparte**. Los chips no son botones: son
  la prueba. Cada uno lleva el nombre del material del que se midió: "lino verde olivo", "amaranto seco",
  "copa ámbar", "lisianthus crema", "cantera rosa".
- Los colores **se miden con PIL de las fotos reales de ese evento** (`tools`-style, script propio en
  `img/paleta.py`), no se escogen a ojo.
- Cada tablero trae: nombres, cuándo se publicó (o la fecha real cuando existe), venue con nombre,
  crédito del fotógrafo, **una foto grande + dos chicas**, y el link "Ver las N fotos de esta boda →" al portafolio.

Por qué NO es un efecto por el efecto: el chip de color es literalmente la herramienta de su oficio, y el
tablero contesta de un golpe las tres preguntas de la novia (cómo se ve, dónde fue, quién lo fotografió).

**Distinto de lo ya usado** (`COMPONENTES-USADOS.md`): muebles-del-alba usa cuadritos que CAMBIAN la foto de un
producto y olux usa tres ventanas que FILTRAN un catálogo — ahí el chip es el control. Aquí el chip es la
**salida**: el visitante elige un evento y la paleta se derrama como resultado, repintando la banda.

## 7. Animaciones (pocas, R3 del motion)

1. **Títulos que caen** por línea (máscara, 700 ms, 90 ms por línea, `--ease-out`). Una vez.
2. **El tablero**: repintado de banda 420 ms + chips que entran escalonados 70 ms.
3. **La línea de avance** del header (solo `transform: scaleX`, sin librería).

Nada más. Sin GSAP (una librería de 110 KB para tres animaciones no se justifica: IntersectionObserver propio del
kit + listener de scroll). Sin pin, sin cortinas de color, sin scroll eterno. Blindaje: el CSS base es el estado
final; se esconde solo con `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`.

## 8. Qué foto va dónde (por nombre de archivo)

| Dónde | Archivo original | Tratamiento | Crédito |
|---|---|---|---|
| `#hero` | `23-jacquelineramiro-calesa-novios.jpg` (2160×2700) | recorte m 780×1620 y d 2000×1389 | Florencia Macías |
| `#bodas` tablero 1 grande | `22-jacquelineramiro-calenda-charros.jpg` | 1200 | Florencia Macías |
| `#bodas` tablero 1 chicas | `23`, `24-jacquelineramiro-plaza-patria.jpg` (joyería, 640² → Real-ESRGAN x4) | 800 / 800 | Florencia Macías |
| `#bodas` tablero 2 grande | `12-ariannaalejandro-montaje-a.jpg` | 1200 | — (post propio) |
| `#bodas` tablero 2 chicas | `16`, `11` | 800 | — |
| `#bodas` tablero 3 grande | `25-aovallesmarisol-tierratinta-a.jpg` | 1200 | Javier Padilla |
| `#bodas` tablero 3 chicas | `26` | 800 | Javier Padilla |
| `#bodas` tablero 4 grande | `02-vanyaguayo-almudena-wimbletwo-a.jpg` **recortada al montaje** (sin la familia) | 1200 | Vanya Aguayo |
| `#diseno` Bodas | `18-ariannaalejandro-mesa-rattan-a.jpg` | 1200 | — |
| `#diseno` Ramo / flor | `27-ariannaalejandro-florales-a.jpg` | 1200 | — |
| `#diseno` Eventos | `02` recorte b (el pastel y los globos) | 1200 | Vanya Aguayo |
| `#venues` | `25` o `28-ariannaalejandro-florales-b.jpg` (la pista de mosaico) | 1600 | Javier Padilla / — |
| `#completar` retrato | `01-rosaledastudio-retrato-aldo-bn.jpg` **recortada** para quitar el texto amarillo quemado | 800 | Rosa Leda Studio |
| `portafolio.html` | las 30 (se excluye `31-perfil-instagram`, 150×150) | 800 + 1600 | según tabla |

Reglas de imagen: todas en **webp con srcset a su talla real** (400/800/1200/1600), `width` y `height` reales en
el HTML, **sin `loading="lazy"` en el hero ni en la primera foto del tablero**, y relleno de color de fondo en
todo marco. Nada de IA: **este cliente tiene fotos profesionales** y no hace falta `IMAGEN-HERO.md`.

## 9. Titulares con SU voz (R6)

Todo sale de su bio, de sus destacadas, de los captions de sus fotógrafos o de los nombres reales de los venues.

- Hero: **"Diseño de bodas. / Reservando 2027."** (es literal su bio: "event design" + "NOW BOOKING 2027").
- Pie del hero: "Jacqueline & Ramiro · Hacienda El Saucillo · 02 de mayo de 2026 · foto: Florencia Macías."
- `#bodas`: **"Cuatro tableros. Cuatro paletas."**
- `#diseno`: **"Weddings. Bridal bouquet. Events."** (los nombres exactos de sus destacadas).
- `#venues`: **"Ya montó en tu venue."**
- Cita grande: *"A wedding that felt deeply Mexican, beautifully personal, and impossible to forget."* — Florencia
  Macías, sobre Jacqueline & Ramiro.
- Segunda cita: *"Cada detalle de la boda fue cuidado con un detalle que te hacía sentir muy especial."* — Javier
  Padilla (se transcribe tal cual, con su error de tipeo original en el caption, sin corregir).
- Revista: *"Aldo Adame transformando espacios en momentos únicos"* — La Sala 424, edición BODAS.
- `#agenda`: **"Ya está reservando 2027."**
- `#completar`: **"Lo que necesitamos de ti."**

Prohibidas y no usadas: calidad, servicio, tu mejor opción, experiencia única, todo en un lugar, sin vueltas,
lo hacemos posible. Sin guiones largos, sin emojis, sin exclamaciones.

## 10. El formulario (5 campos) y el correo que arma

Campos: **tipo de evento** (Boda / Ramo de novia / Evento social / Otro), **fecha tentativa** (`type="date"`),
**ciudad o venue** (texto libre, con los cuatro venues reales como `datalist`), **número de invitados**
(`type="number"`), **nombre**.

El `<a>` ya trae en el HTML un `mailto:` real y completo con asunto y cuerpo base. El JS **solo reescribe el
`href` en el click, sin `preventDefault`**. Renglones vacíos se omiten (nada de "Invitados: ___").

Asunto base: `Agenda 2027 - Aldo Adame`
Cuerpo base: `Hola Aldo, vi tu pagina y quiero platicar una fecha.`

Con el formulario lleno queda, por ejemplo:

```
Asunto: Boda - 12 de septiembre de 2027 - Hacienda El Saucillo
Cuerpo:
Hola Aldo, vi tu pagina y quiero platicar una fecha.

Tipo de evento: Boda
Fecha tentativa: 12 de septiembre de 2027
Ciudad o venue: Hacienda El Saucillo
Invitados: 180
Mi nombre: Jacqueline
```

## 11. SEO y tarjeta

- `<title>`: "Diseño de bodas en Aguascalientes | Aldo Adame"
- `description` (≤155): "Aldo Adame, event design en Aguascalientes. Bodas en Hacienda El Saucillo, Tierra Tinta,
  Los Olivos y Kalamata. Reservando 2027."
- `canonical`: `https://loottreasureclothes-arch.github.io/krevo-muestras/aldo-adame/`
- `og.jpg` 1200×630: su monograma "AA" tipográfico en Cormorant sobre la foto del hero, con la línea "Reservando 2027".
- Favicon 32 y apple-touch 180: monograma "AA" azul marino sobre hueso.
- JSON-LD `Person`: nombre, `jobTitle` "Event designer", `email`, `url`, `image`, `areaServed` Aguascalientes,
  `sameAs` Instagram y aldoadame.com. **Sin dirección, sin teléfono, sin `aggregateRating`** (no existen).
- **Estrellas: ninguna.** No hay reseñas numéricas en ningún lado; solo citas textuales con nombre y fuente.

## 12. Prueba anti-genérico (8 preguntas, contestadas)

1. **Tapando el logo, ¿podría ser de otro diseñador de bodas?** No. Trae cuatro bodas con nombre propio, cuatro
   venues con nombre, cuatro fotógrafos acreditados y la paleta medida de sus propias fotos.
2. **¿Tres secciones seguidas con ritmo eyebrow-título-párrafo-botón?** No: tablero interactivo → banda oscura de
   tres tipos → lista de venues con citas → formulario. Solo `#diseno` y `#completar` tienen ese ritmo y no van pegadas.
3. **¿El hero es foto + velo + título + 2 botones sin nada propio?** No. **No lleva velo**: el titular va en azul
   marino sobre el cielo pálido de la foto. Trae el nombre de la pareja, el de la hacienda, la fecha real y el
   crédito de la fotógrafa.
4. **¿Más de 8 botones verdes?** No: **cero**. No hay WhatsApp confirmado.
5. **¿Fila de contadores o rejilla de tarjetas iguales con ícono?** No. Cero contadores, cero íconos decorativos.
6. **¿Falta el componente firma o se repite?** No: el tablero de cada boda no está en `COMPONENTES-USADOS.md`.
7. **¿Algún título usa palabra prohibida?** No. Todos salen de su bio, de sus destacadas o de captions reales.
8. **¿Pasa de 7 secciones o de 9,000 px?** 6 secciones. El alto se mide con `krevo-shot` y se recorta hasta bajar
   de 9,000.

## 13. Lo que NO va

Menú de navegación con hamburguesa y submenús. Carrito. Precios (no los publica). Paquetes (no los publica).
Años de trayectoria (no los declara). Número de bodas realizadas. Estrellas y calificaciones. Teléfono y WhatsApp
inventados. Contadores. Cinta de medir. Cortinas de color entre secciones. Mapa (no tiene dirección pública).
Cualquier imagen de IA. Link de cobro y mensualidades.

---

## 14. Cómo quedó (medido, 21 sep 2026)

Medido con `krevo-shot` en los tres anchos, **cero alertas** en los tres y en las dos páginas:

| Ancho | Alto | Alertas |
|---|---|---|
| 390 × 844 (celular) | **8,836 px** (tope 9,000) | ninguna |
| 893 × 802 (tablet) | 6,990 px | ninguna |
| 1440 × 900 (compu) | 7,571 px | ninguna |
| `portafolio.html` 390 | 5,422 px | ninguna |
| `portafolio.html` 1440 | 5,220 px | ninguna |

Sin scroll horizontal, consola limpia, cero 404, cero cargas fallidas y **cero bloques invisibles**
después de 1.9 s (ni al bajar ni al volver arriba) en los tres anchos.

Diferencias contra el plan de arriba, ya aplicadas:

- **El corte de compu es 820 px, no 900.** A 893 la página se veía todavía en una columna; bajando el
  corte, la tablet entra al layout de dos columnas y baja de 11,067 a 6,990 px.
- **Las dos citas viven dentro de la columna derecha de `#venues`**, junto a la lista de venues. Con la
  foto de la pista a la izquierda ocupando toda la altura, la derecha quedaba con un hueco muerto.
- **`#diseno` en celular** va con la primera pieza a todo lo ancho y las otras dos abajo en dos columnas
  (collage de anchos desiguales), no las tres apiladas: así cabe en el tope de 9,000 px.
- **El titular del hero lleva el terracota OSCURO** (`--accent-ink`, `#8E4820`). El claro se perdía sobre
  la cantera pálida de la foto en los tres anchos.
- **El portafolio trae 29 fotos**, no 30: el retrato de Aldo no es de un evento y vive en `#venues`.
- **Las dos fotos del WimbleTwo van recortadas al montaje** en las dos páginas: las originales tienen a la
  familia y al personaje de Minnie, que es marca ajena. Se dice en el encabezado del grupo.
- **No hizo falta `IMAGEN-HERO.md`.** `23-jacquelineramiro-calesa-novios.jpg` (2160×2700) aguantó los dos
  recortes del hero sin IA.
