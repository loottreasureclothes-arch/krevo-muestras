# Taller Industrial Independencia · Hoja de dirección (1 oct 2026)

Esta hoja manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, y donde haya choque manda su sección final "## Barrido Maps (1 oct 2026)". También salen datos de `research/FOTOS.md` y de lo medido con PIL sobre sus fotos. No hay `resenas.md`, `colores.md` ni redes: los colores se midieron aquí (abajo), y las opiniones son solo las tres frases que trae hechos.md. Lo que no esté en research no va.

OJO, ya existen dos muestras industriales cercanas:
- **JAS INOX**: carbón y acero cepillado, Anton, corte diagonal en una esquina, cotas de plano, isométrico con deslizadores y línea de soldadura en el header.
- **Delgado Express**: azul noche con rojo tractocamión y cromo, Archivo expandida, paneles de caja seca, carta porte con sello y placa de número que cambia por sección.

En la cola vienen otros talleres (maquinados-je, maquinados-en-produccion, maquinados-paileria-ags, engo-manufactura). Esta hoja aparta para Independencia el gris de su fresadora, la ranura en T, las bridas, la grúa y el paro de emergencia.

Su look: **el azul de su letrero de Constitución 414 con el gris de su fresadora, letra condensada de rótulo, y todo montado sobre la mesa de la fresadora: ranuras en T y bridas que sujetan cada foto como si fuera una pieza.**

Lo que no va en esta muestra:
- Cotas ni flechas de medida, isométricos, cuadrícula azul de plano (blueprint) ni carta porte.
- Engranes en fila, llaves o tuercas dibujadas, chispas naranjas, cromo, acero cepillado, rojo de fondo ni naranja.

## El TRABAJO de la página
Que el encargado de mantenimiento, el de compras de una planta o el que trae una pieza rota en la mano pida cotización en 1 toque. El camino: **de qué sale la pieza → qué se le hace → material y cantidad → para cuándo → WhatsApp**. Si lo que trae es una máquina parada, pide mantenimiento por el mismo camino.

- WhatsApp: `https://wa.me/524493207238?text=...`. Es el teléfono de su ficha de Google Maps y **NO está confirmado como WhatsApp**: va a PENDIENTES como "confirmar que 449 320 7238 recibe WhatsApp".
- Llamar: `tel:+524493207238`, en el header (paro de emergencia), en el hero y en el cierre.
- El 449 146 6106 (de la base y de Sección Amarilla) NO sale en la página: solo va en PENDIENTES ("¿cuál contesta?").

Hoy no tienen página: Google Maps dice "Agregar sitio web". Fuera de su ficha de Maps solo hay dos fichas de directorio sin fotos ni descripción, y no tienen redes. Su ficha de Maps tiene 4.9 con 8 opiniones y 10 fotos del taller que nadie ve en grande. Ese es el argumento de venta: el taller está bien calificado y bien equipado, pero quien lo busca no se entera.

## La promesa (solo ellos la pueden decir)
**"Se tornea, se fresa y se suelda en Av. Constitución 414."**

De dónde sale cada parte:
- Su letrero dice literal: "MAQUINADO · SOLDADURA Y PAILERÍA · MANTENIMIENTO INDUSTRIAL".
- Sus fotos enseñan un torno de bancada larga, una fresadora con lector digital y una pieza sujeta en la mesa, un taladro radial, una cortadora de plasma CNC, una sierra cinta y una grúa pescante.
- Una opinión en Google dice: «Excelente calidad en los trabajos de maquinado».
- Están en Av. Constitución 414, col. Constitución, y tienen 4.9 con 8 opiniones en Google.

La frase solo nombra procesos que se ven en sus fotos o están escritos en su letrero, más su calle.

## Identidad
- **Colores medidos con PIL** (sobre `taller-06` y `taller-09`, 1 oct 2026):

  | Token | Uso | Valor | De dónde sale |
  |---|---|---|---|
  | `--deep` | Lienzo | `#0A2C42` | Azul marino de las letras de su letrero ("TALLER INDUSTRIAL INDEPENDENCIA", medido `#083149`), apenas levantado |
  | `--deep-2` | Bandas | `#0F3651` | Del mismo marino |
  | `--night` | Sección de la grúa (más honda) | `#061B29` | Del mismo marino |
  | `--paper` | Gris fresadora: bandas de lectura (componente y "Todo listo"), placas de etiquetas y la mesa de las fotos | `#CED6DA` | Brazo de su fresadora en `taller-09`, medido `#ced8e0` |
  | `--paper-2` | Gris fresadora oscuro | `#B7C0C5` | Del mismo gris |
  | `--brand` | Azul TII: botones de navegar con texto `#EEF2F3` (contraste 4.9:1) y segunda línea de titulares sobre papel | `#2B70A9` | Las letras "TII" de su logo en la lona, medido `#2b70a9` |
  | `--brand-light` | Segunda línea de titulares sobre el marino | `#6FA3CF` | El mismo azul, aclarado solo para que se lea |
  | Tinta sobre papel | Texto | `#0A2233` | Del marino |
  | Texto sobre marino | Texto | `#E9EEF0` | |
  | `--paro` | **Rojo de paro** | `#C62828` | El hongo de paro de sus máquinas y tableros |

  - El rojo de paro va SOLO en el hongo del header y en la ficha "Tengo una línea parada" del componente. Nunca de fondo.
  - El engrane del logo se ve salmón deslavado y no se pudo medir limpio (salió `#d7c3bd`). Por eso NO hay naranja en la página.
  - Sin cromo, sin degradados metálicos, sin acero cepillado (eso es de JAS).
- **Botones de navegar: PLACA DE CONTROL.**
  - Forma: rectángulo azul TII con radio de 2 px y dos tornillos (círculos de 4 px gris fresadora) a la izquierda y a la derecha del texto, como placa atornillada al tablero.
  - Texto: mayúsculas en Big Shoulders 700 con espaciado .08em, por ejemplo "ARMAR MI PIEZA", "CÓMO LLEGAR", "LLAMAR".
  - Secundario: contorno gris fresadora de 1.5 px con los mismos tornillos.
  - **VERDE `#25D366` SOLO** en estos botones, que abren wa.me: "Cotizar mi pieza por WhatsApp", "Pedir mantenimiento por WhatsApp", "Mandar foto por WhatsApp" (panel del paro) y el flotante. Texto `#0b3d1f`, glifo oficial. Máximo 1 verde por sección.
- **Tipografías** (Google Fonts, nada de Inter). Ninguna de las tres está en otra muestra (revisado con grep el 1 oct):
  - **Big Shoulders Display** 800/900 para títulos, en mayúsculas, interlineado .9. Es condensada y alta como las letras de su lona.
  - **Schibsted Grotesk** 400/500/700 para cuerpo y subtítulos.
  - **Martian Mono** 400/500 para etiquetas de golpe, números de operación (OP 10), teléfono, dirección y C.P. Las cifras van con `tabular-nums`.
  - Prohibidas en esta página: Anton, Archivo, IBM Plex, Red Hat Mono, Barlow, Oswald, Syne, Space Mono y Chivo.
- **Logo real**: no hay archivo. Solo existe en la lona de su fachada (`taller-06`, zona aprox. x 270 a 560, y 320 a 450): las letras "TII" itálicas azules con un engrane detrás.
  - Recórtalo y endereza la perspectiva con `warpPerspective` de OpenCV.
  - Súbelo con Real-ESRGAN x4 mezclado 50 % con el original más grano fino.
  - Úsalo a 34 a 40 px de alto dentro de una plaquita gris fresadora en el header y en el pie.
  - Si queda sucio, no se usa: el nombre va compuesto en Big Shoulders y el logo se queda solo en la foto de la fachada.
  - Nunca redibujar el engrane ni la "TII".
  - Favicon: "TII" en Big Shoulders 900 `#EEF2F3` sobre azul TII. Son iniciales compuestas, no el logo.
  - En PENDIENTES: logo en alta.

## Lenguaje de formas propio: LA MESA DE LA FRESADORA (ranura en T y brida)
Sale de la mesa de su fresadora (`taller-09` y `taller-10`), con sus ranuras en T y el juego de bridas escalonadas que se ve colgado a la derecha en `taller-09`.

- **Fotos sujetas como pieza.**
  - Cada foto importante va montada sobre una "mesa": debajo lleva una barra gris fresadora de 12 px con tres ranuras en T vistas en corte.
  - Dos **bridas** sujetan las esquinas de arriba de la foto: una barrita de 36x9 px en `--paper-2` con un tornillo de cabeza de 9 px que muerde 6 px sobre la imagen.
  - Las bridas son de CSS o SVG. Nunca se pintan dentro de la foto.
  - Sin radios en fotos, sin sombras blandas. Solo una sombra dura de 2 px hacia abajo.
- **Contenedores** (paneles de papel o de marino): el borde de arriba lleva **una ranura en T recortada**, a 24 px de la orilla izquierda (`clip-path: polygon`, boca de 14 px, cabeza de 30 px, 12 px de hondo). La etiqueta del panel "cuelga" de esa ranura como tornillo T. Radios de 2 px.
- **Divisores**: el perfil de la mesa en corte. Es una barra SVG de 18 px de alto, gris fresadora sobre marino o marino sobre gris, con ranuras en T cada 120 px.
- **Etiquetas de foto: PLACA DE GOLPE.**
  - Placa gris fresadora con dos remaches. El texto va en Martian Mono 500 mayúsculas, tinta marina.
  - Cada letra lleva un desfase al azar de ±0.6 px y un giro de ±1.5°, como número golpeado con punzón. Es la única técnica de texto especial de la página.
  - Describen solo lo que se ve: "FRESADORA CON LECTOR DIGITAL", "PIEZA SUJETA EN LA MESA", "LA NAVE POR DENTRO", "GRÚA PESCANTE", "AV. CONSTITUCIÓN 414".
- Lo único redondo de la página: el hongo de paro, los tornillos y los barrenos.
- Prohibido: engranes decorativos, llaves, tuercas, rayos, chispas, cotas, flechas de medida, cuadrícula de plano, cinta de medir, cortes diagonales de esquina (son de JAS) y remaches en fila de caja seca (son de Delgado).

## Header propio: EL PARO DE EMERGENCIA
- **Barra**: marino de 58 px. El borde de abajo es el perfil de la mesa (6 px gris fresadora con ranuras en T).
  - Izquierda: la plaquita del logo y "TALLER INDUSTRIAL / INDEPENDENCIA" en Big Shoulders 800, a dos renglones.
  - Derecha: el **hongo de paro** y la hamburguesa.
- **El hongo de paro.** Es un círculo rojo de 34 px con anillo más oscuro y un cuello gris fresadora, como el de sus tableros y máquinas. Junto a él va "¿LÍNEA PARADA?" en Martian Mono 11 px; en celular, abajo y en dos renglones chicos.
- **Qué pasa al tocarlo:**
  1. El hongo **se hunde** 3 px y pierde la sombra (120 ms).
  2. Debajo del header baja una tira marina (220 ms) con "Llámanos ahora" y el botón azul "LLAMAR 449 320 7238" (`tel:`).
  3. En la misma tira va el botón verde "Mandar foto por WhatsApp" con el mensaje: "Hola Taller Industrial Independencia, tengo una línea parada. Les mando foto de la pieza o de la máquina."
  4. También deja marcada la urgencia "Tengo una línea parada" en el componente.
- **Para cerrarlo se gira, como un paro de verdad.** El hongo gira 30° y sube (200 ms). También cierran `Escape` y el botón "atrás" de Android (pushState).
- **Por qué sirve.** El cliente de mantenimiento industrial con la máquina parada llega aquí con prisa. Tiene la llamada a un toque desde cualquier punto de la página. No es decoración.
- **Al bajar** el header se compacta a 50 px.
- **Hamburguesa**: pantalla completa marina con ligas en Big Shoulders 900 gris fresadora: El taller · Arma tu pieza · Opiniones · Cómo llegar · WhatsApp (verde).
- No lleva barra de avance, número que cambie por sección, punto de soldadura ni foquitos.

## Componente firma (anotar en COMPONENTES-USADOS.md): DE BARRA A PIEZA
Va en la sección `30-pieza` (`id="pieza"`), sobre una banda gris fresadora.

**La escena.** A la izquierda (arriba en celular) va la **bancada**: un SVG de vista lateral sobre la mesa con ranuras en T. Ahí la **pieza cambia de forma con cada operación que el visitante toca, y suelta su viruta**. A la derecha (abajo en celular) va la **placa de la pieza**: los renglones se golpean con letras de punzón conforme se elige.

**1. ¿De qué sale tu pieza?** Tres fichas:
- **Barra redonda**: en la bancada aparece una barra en bruto (vista lateral, color cascarilla `#5E5659`, medido de la pieza en bruto de `taller-09`) sujeta por un chuck de tres mordazas a la izquierda.
- **Lámina o placa**: aparece una placa vista desde arriba.
- **Es una máquina que reparar**: cambia al camino de mantenimiento (ver abajo).

**2. ¿Qué le hacemos?** Se eligen varias, en orden. Cada ficha lleva una miniatura real de 64 px de SU máquina. A ese tamaño las fotos chicas se ven nítidas.

| Ficha | Miniatura | Qué le pasa a la pieza en el SVG (600 ms, una vez por toque) |
|---|---|---|
| TORNEAR | `taller-01`, torno | Un buril recorre la barra de derecha a izquierda. La mitad derecha baja de diámetro (escalón), queda gris clara con rayitas finas de torneado, y **se desprende una viruta helicoidal** (resorte SVG que se estira y cae) |
| FRESAR | `taller-10`, mesa de fresadora | Aparece un cuñero plano arriba de la barra y saltan 3 rizos cortos |
| BARRENAR | `taller-04`, taladro radial | Aparece un barreno pasado (elipse oscura con su brillo) y una viruta corta y apretada |
| CORTAR CON PLASMA | `taller-02`, plasma CNC | Solo para lámina. Se recorta un círculo con su corona de barrenos, como la pieza de su foto. Destello blanco azulado, sin naranja |
| SOLDAR Y ARMAR | sin miniatura | Para barra o lámina. Aparece un cordón de soldadura (arquitos encimados) que une la pieza con una brida o con otra placa |

- Cada toque agrega un renglón numerado de 10 en 10, como en una hoja de proceso de taller: "OP 10 · TORNEAR", "OP 20 · FRESAR". Si se vuelve a tocar, se quita, la pieza regresa y las OP se renumeran.
- Todo es reversible.

**3. Material.** Fichas: Acero · Acero inoxidable · Aluminio · Bronce · No sé. La barra se tiñe:
- acero `#6E7880`
- inoxidable `#AEB7BD`
- aluminio `#C9CED1`
- bronce `#8C6E4A` (café apagado, nunca naranja)

**4. ¿Cuántas piezas?** Fichas: 1 · 2 a 10 · 11 a 100 · Más de 100.

**5. ¿Qué traes?** Fichas: Plano · La pieza de muestra · Una pieza rota para reponer · Solo la idea.
- Casilla aparte: "Tiene que ajustar con otra pieza". Aquí entra la tolerancia **sin prometer ninguna cifra**.
- Si eligió Plano, en la placa sale "TOLERANCIAS: LAS DEL PLANO".

**6. ¿Para cuándo?** Fichas: Tengo una línea parada (con el rojo de paro) · Esta semana · Sin prisa.

**Nombre**: opcional.

**Camino de mantenimiento** (si en el paso 1 tocó "Es una máquina que reparar"):
- La bancada muestra la miniatura de `taller-05` (tablero) sujeta con bridas.
- Fichas "Preventivo · Correctivo · No sé". Son las palabras literales de una opinión: «mantenimiento preventivo y correctivo».
- Campo "¿Qué hace o qué no hace?" (texto, opcional), "¿Para cuándo?" y nombre.

**El botón.** Un solo botón verde, "Cotizar mi pieza por WhatsApp" (en el camino de mantenimiento dice "Pedir mantenimiento por WhatsApp"). Mensajes literales de ejemplo:
- Pieza: "Hola Taller Industrial Independencia, quiero cotizar una pieza. Sale de: barra redonda. Proceso: OP 10 tornear, OP 20 fresar, OP 30 barrenar. Material: acero. Cantidad: 2 a 10. Traigo: una pieza rota para reponer. Tiene que ajustar con otra pieza. Urgencia: tengo una línea parada. Mi nombre: Luis. Les mando fotos por aquí."
- Mantenimiento: "Hola Taller Industrial Independencia, necesito mantenimiento correctivo para una máquina. Falla: no arranca el motor de la banda. Urgencia: tengo una línea parada. Mi nombre: Luis. Les mando fotos por aquí."
- Renglones vacíos se omiten. Sin elegir nada: "Hola Taller Industrial Independencia, quiero cotizar un trabajo de maquinado."
- El `href` es un `<a>` real que el JS reescribe, sin `preventDefault` ni `window.open`. El `&` va codificado.

**Lo demás:**
- La elección persiste en `sessionStorage` (con try/catch). El cierre la repite en una línea: "Tu pieza: barra de acero, tornear y fresar, 2 a 10."
- **Sin JS** se ve el SVG de una pieza ya terminada (torneada, con cuñero y barreno), los tres oficios del letrero en lista y el botón verde con el mensaje genérico.
- Con reduced-motion: los cambios de forma son instantáneos y la viruta no se anima.
- **No es** el isométrico con cotas de JAS ni la carta porte de Delgado: aquí no hay medidas, sliders, formato ni sello. Lo que manda es la pieza que se transforma operación por operación y suelta viruta.

## Momento firma: LA GRÚA BAJA LA PLACA
Va en la sección `40-grua`, sobre la banda `--night`.

**La foto.** Es `taller-07`, la entrada de la nave con su grúa pescante amarilla y su polipasto de cadena, en vertical.
- Va recortada en x 175 a 899 (724x1600): sin la persona de la izquierda y sin la casa vecina con su número.
- Va montada en la mesa con bridas: en celular a 70 svh, en compu a la izquierda en 5/12.

**El mecanismo.**
- Del gancho real del polipasto, en el recorte en aprox. (45.9 %, 51.3 %), sigue bajando una **cadena SVG**. El constructor la mide sobre la foto y la ata en porcentajes a un contenedor con `aspect-ratio` fijo, para que caiga exacta a 360, 390, 820 y 1440 px.
- De la cadena cuelga una **placa de acero** gris fresadora con cuatro barrenos en las esquinas. Lleva golpeado "4.9" enorme en Big Shoulders 900 y debajo "8 OPINIONES EN GOOGLE" con letras de golpe, más una estrella sólida. Es un dato real y agregado.
- **Con el scroll** la placa baja desde arriba, pegada al polipasto, hasta asentarse en el piso de la nave, en aprox. 78 % del alto de la foto. Al asentarse hace un solo vaivén de 2° y un rebote corto ease-out. Es la excepción permitida de "objeto físico que cae".
- Funciona con rAF, sin pin y sin GSAP obligatorio. Es reversible: al subir, la grúa la levanta.
- Cuando la placa toca el piso, a un lado (debajo en celular) **entran dos etiquetas colgadas** con las frases literales de opiniones en Google:
  - «Excelente calidad en los trabajos de maquinado»
  - «Servicio de calidad y atención personalizada de primera»
- Firma de las dos etiquetas: "Opinión en Google Maps", sin nombre (research no trae nombres) y sin estrellas individuales.
- Link "Leer las 8 opiniones en Google" a `https://www.google.com/maps/search/?api=1&query=Taller+Independencia+Av+Constituci%C3%B3n+414+Aguascalientes`.

**Blindaje.**
- Con reduced-motion se ve la placa asentada y las etiquetas visibles.
- Desde que la sección se asoma, a los 1.6 s queda todo en estado final pase lo que pase.
- La cadena y la placa van en un SVG encima de la foto. Nada de `clip-path` sobre la img.
- **NO citar la reseña de tacos de pescado** (es de otro negocio).

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Qué hacen y dónde, de inmediato | Ver detalle 1 abajo | `taller-09` |
| 2 | `20-taller` | Lo que venden, a la vista: el catálogo es su letrero | Ver detalle 2 abajo | `taller-08` |
| 3 | `30-pieza` | El trabajo de la página | Componente firma "De barra a pieza", con un botón verde | (SVG + miniaturas de 64 px) |
| 4 | `40-grua` | Prueba social real | Ver detalle 4 abajo | `taller-07` |
| 5 | `50-completar` | Lo que falta del dueño | Ver detalle 5 abajo | (sin foto: banda de lectura) |
| 6 | `60-cierre` | Cómo llegar y último empujón | Ver detalle 6 abajo | `taller-06` |
| F | footer | Contacto real | Ver detalle F abajo | |

**1. `10-hero`**
- Título a dos tonos que entra como carro de torno (cada renglón corre 120 px desde la derecha y se asienta, 600 ms, 90 ms entre renglones): **"Se tornea, se fresa / y se suelda aquí."** La segunda línea va en azul TII claro, con una viruta fina de 1.5 px que se dibuja una vez debajo.
- Línea: "Taller Industrial Independencia · Av. Constitución 414, Aguascalientes".
- Renglón literal del letrero en Martian Mono: "MAQUINADO · SOLDADURA Y PAILERÍA · MANTENIMIENTO INDUSTRIAL".
- Dato: estrella + "4.9 en Google · 8 opiniones".
- Botón azul "ARMAR MI PIEZA" (a `#pieza`) + link con flecha "Llamar 449 320 7238" (`tel:`). Sin verde.
- Foto `taller-09` (fresadora con lector digital y la pieza real sujeta en la mesa):
  - Recorte 4:5 que deje ver la pieza y el lector.
  - Va montada en la mesa con bridas y placa de golpe "PIEZA SUJETA EN LA MESA".
  - Tamaño: en celular a 58 svh debajo del texto; en compu a la derecha en 7/12.

**2. `20-taller`**
- Título: **"Tres oficios / bajo un letrero."**
- Catálogo tipográfico con los tres renglones literales de su lona en Big Shoulders 900 enormes (`clamp(2.2rem, 11vw, 5.5rem)`), separados por el perfil de la mesa. Debajo de cada uno, una línea de lo que se ve en sus fotos:
  - **MAQUINADO.** "Torno de bancada larga, fresadora con lector digital y taladro radial."
  - **SOLDADURA Y PAILERÍA.** "Corte de lámina con plasma CNC."
  - **MANTENIMIENTO INDUSTRIAL.** «mantenimiento preventivo y correctivo», con "así lo dice una opinión en Google" en chico.
- Cada renglón lleva un link con flecha "Armar esta pieza" que preselecciona el componente: barra · lámina · máquina que reparar.
- Foto grande `taller-08` (la nave por dentro, con el carro y la sierra cinta):
  - Recortada en y 320 a 1600 para quitar las dos caras del fondo y la máquina de soldar con marca.
  - Placa de golpe "LA NAVE POR DENTRO".
  - En celular va entre el título y la lista; en compu a la derecha.
- 0 verdes.

**4. `40-grua`**
- Título: **"Ocho opiniones en Google. / Promedio: 4.9."**
- Momento firma: la grúa baja la placa y entran las dos etiquetas con las frases literales.
- Link a Google.
- 0 verdes.

**5. `50-completar`**
- Título: **"Lo que falta / para terminarla."**
- Banda gris fresadora (papel de lectura). Panel con ranura en T y renglones en placa de golpe:
  - confirmar que el 449 320 7238 recibe WhatsApp
  - cuál teléfono contesta: 449 320 7238 o 449 146 6106
  - horario completo (Google solo dice que abren a las 8:30 a.m.)
  - logo en alta (hoy solo existe en la lona)
  - fotos de piezas terminadas
  - fotos de trabajos de soldadura y pailería
  - medidas máximas que trabajan en torno y fresadora
  - materiales que trabajan
  - sectores o clientes que atienden, con su permiso
  - año en que abrieron
  - Facebook o Instagram, si lo abren
  - permiso para citar opiniones con nombre
  - link de cobro para anticipos
- "Tarjeta en línea: te mandamos el link."
- "Pásanoslo por el mismo chat donde te llegó esta muestra."
- SIN wa.me del negocio aquí. 0 verdes.

**6. `60-cierre`**
- Título: **"Constitución 414. / Ahí está el letrero."**
- Remate con la foto `taller-06` a todo lo ancho (en compu a 10/12), con el letrero COMPLETO y sin recortar los tres oficios. Va montada en la mesa con bridas y placa de golpe "AV. CONSTITUCIÓN 414".
- Datos en Martian Mono:
  - "Av. Constitución 414, col. Constitución, C.P. 20126, Aguascalientes, Ags."
  - "Abre a las 8:30 a.m., según Google Maps." Sin más horario.
  - "449 320 7238" con `tel:`.
- Mapa embebido buscando "Taller Independencia Av Constitución 414 Aguascalientes", en marco con bridas. Botón azul "CÓMO LLEGAR" a Google Maps.
- Debajo, el resumen guardado de su pieza ("Tu pieza: ..."; sin elegir: link "Arma tu pieza primero") + el botón verde "Cotizar mi pieza por WhatsApp" con el mismo mensaje armado.
- 1 verde.

**F. footer**
- Marino con perfil de mesa arriba.
- Plaquita del logo, "TALLER INDUSTRIAL INDEPENDENCIA", "Maquinado · Soldadura y pailería · Mantenimiento industrial", dirección, 449 320 7238.
- "Muestra de diseño hecha por KREVO con las fotos públicas de Taller Industrial Independencia en Google Maps."
- Sin íconos de redes: no tienen.

Ritmo de la página:
1. Título enorme que entra como carro de torno + la pieza en la mesa.
2. Catálogo tipográfico de los tres oficios + la nave.
3. La pieza que cambia y suelta viruta.
4. La grúa que baja el 4.9.
5. Papel de lectura con placas de golpe.
6. El letrero completo + mapa + último verde.

Nunca dos secciones seguidas con eyebrow → título → párrafo → botón. Botones verdes en toda la página: 2 en secciones + el del panel de paro + el flotante.

## Movimiento
- Títulos: entran como carro de torno (desplazamiento horizontal corto, 600 ms ease-out, una vez).
- Viruta: un subrayado de viruta que se dibuja una vez bajo el hero (500 ms).
- Bridas: aprietan las fotos al entrar (bajan 6 px y se asientan, 220 ms).
- Hongo de paro: se hunde y se gira.
- Componente: cambia de forma por operación (600 ms) y la viruta cae con un rebote corto.
- Grúa: la placa sigue al scroll.
- Prohibido: pin, cortinas de color, parallax de fondo, video, IA, contadores que suben, chispas, glitch, letras al azar.
- Blindaje anti-blanco:
  - `[data-reveal]` visible a los 1.6 s pase lo que pase.
  - `html { scroll-behavior: auto }`.
  - Nada de `clip-path` sobre img lazy.
  - Fotos que venden sin `loading="lazy"`: 09, 08, 07 y 06. Las miniaturas del componente pueden ser lazy.
  - `prefers-reduced-motion` = estado final directo.

## Fotos
**Grandes** (899 o 1600 px de ancho). NO pasar por Real-ESRGAN, ya aguantan a 390 @2x:

| Foto | Sección | Recorte |
|---|---|---|
| `taller-09` | hero | 4:5 sobre la pieza y el lector. Si en la lata roja de la izquierda se lee una marca, recortarla fuera o taparla limpio |
| `taller-08` | taller | y 320 a 1600: sin caras del fondo ni máquina de soldar con marca |
| `taller-07` | grúa | x 175 a 899: sin la persona de la izquierda ni la casa vecina con el número 412 |
| `taller-06` | cierre | Letrero completo con los tres oficios, más algo de cielo y muro. La lona trae su gráfico de soldador y torno: se queda, es su letrero |

**Chicas, solo como miniaturas de 64 px** del componente. Pasan por Real-ESRGAN x4 mezclado 50 % con el original subido con LANCZOS más grano fino, y aun así nunca pasan de 120 px en pantalla:

| Foto | Qué es | Recorte |
|---|---|---|
| `taller-01` | Torno | Recortar fuera la placa de marca de abajo a la izquierda |
| `taller-10` | Mesa de fresadora | |
| `taller-04` | Taladro radial | Recortar fuera el sello de fecha "23/02/2023 10:48" y la placa de marca del cabezal |
| `taller-02` | Plasma CNC | Recortar a la antorcha y el círculo de barrenos, fuera la máquina de soldar con marca del fondo |
| `taller-05` | Tablero | Solo en el camino de mantenimiento; tapar la marca del tablero si se lee |

**Sin uso:**
- `taller-03` (banda transportadora): no se sabe si es de ellos o de un cliente. Se queda fuera.
- PROHIBIDAS: la foto de planta de Expomaquila (stock), cualquier imagen de Agro Industrial Hidráulica, y todo lo hecho con IA o de banco.

**og:image** 1200x630 hecha con PIL:
- `taller-06` (letrero completo) a la derecha, montado con bridas sobre marino.
- A la izquierda "Se tornea, se fresa / y se suelda aquí." en Big Shoulders 900.
- Debajo "Av. Constitución 414 · Aguascalientes" en Martian Mono.

## Lo que NO va
- **Opiniones y teléfonos:**
  - La reseña de tacos de pescado.
  - Nombres de quienes opinaron y estrellas por opinión (no hay datos).
  - El 449 146 6106 en la página.
  - Decir que el 449 320 7238 es WhatsApp confirmado.
- **Datos de otra empresa:** todo lo de Agro Industrial Hidráulica (Tamaulipas 221, 449 917 2158, aihsa.mx).
- **Datos que no existen en research:** años operando, clientes, certificaciones, ISO, capacidades o medidas de máquinas, tolerancias en números, precios, horario de cierre y días, envíos, CNC fuera del plasma.
- **Palabras:** "calidad", "servicio", "líderes", "el mejor", "soluciones integrales" y "todo en un lugar" en títulos. "Calidad" y "servicio" solo pueden salir dentro de las citas literales.
- **Ideas de otras muestras:** cotas, isométricos, deslizadores de medida, carta porte, sellos de "lista para cotizar", placa que cambia por sección, punto de soldadura en el header, acero cepillado, cromo.
- **Adornos y efectos:** engranes, llaves y tuercas dibujadas, chispas naranjas, naranja, cuadrícula de plano, rejilla de íconos, contadores, cortinas de color.
- **Personas:** caras de trabajadores o vecinos.

## PENDIENTE-DUEÑO
- WhatsApp: ¿el 449 320 7238 recibe mensajes?
- Teléfono que contesta (449 320 7238 vs 449 146 6106)
- Horario completo
- Logo en alta
- Fotos de piezas terminadas y de soldadura y pailería
- Máquinas y medidas máximas
- Materiales
- Sectores o clientes, con permiso
- Año de apertura
- Redes, si las abren
- Permiso para citar opiniones con nombre
- Link de cobro
