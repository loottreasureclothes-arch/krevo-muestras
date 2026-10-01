# Colegio CEPIA · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/FOTOS.md`, `research/colores.md` y `research/_videos/descripciones.txt` (textos literales de sus publicaciones). Lo que no esté ahí, no va. OJO: ya existe otra muestra escolar, Brillantes Inicios (azul rey, amarillo, hojas de libreta, Fredoka, cartilla con palomas). CEPIA es otra cosa: **colegio de 4 niveles desde 1990, verde pizarrón con gis y las líneas de colores de su cancha, letra slab**. Nada de libreta, nada de azul rey como lienzo, nada de palomas de crayón, nada de ladrillos dibujados (eso es de San José Premier).

## El TRABAJO de la página
Que una familia pida informes y venga a conocer el colegio: **fecha de nacimiento del hijo → qué grado le toca → pedir informes o apartar lugar en el Open House → WhatsApp** al 449 978 7180 (`https://wa.me/524499787180?text=...`; es el teléfono de "Informes" que publican; en PENDIENTES va "confirmar WhatsApp oficial") y botón de llamar con `tel:`. Su dominio colegiocepia.org, que todavía anuncian los directorios, ya no existe: quien los busca no llega a nada.

## La promesa (solo ellos la pueden decir)
**"Vienen a crecer en grande."** (literal de su publicación del 31 ago 2026: "Aquí no sólo vienen a la escuela. Vienen a crecer en grande."). Lema del logo: "Educación centrada en la persona". Asociación civil que "nace en Aguascalientes en 1990 con el fin de promover el desarrollo armónico e integral de la niñez" (su Facebook). Inicial, preescolar, primaria y secundaria. "Grupos reducidos y una atención cercana a cada alumno" (subtítulo de su reel).

## Identidad
- Lienzo **verde pizarrón `#16382c`** con textura de gis muy sutil; bandas `#1d4838`. Papel **gis `#f6f3ea`** para fichas y formulario. Color de marca **azul CEPIA `#1E73BB`** (el de las franjas de su edificio) en botones de navegar; segunda línea de titulares en **amarillo gis `#f2c94c`** (del amarillo de su reja y murales) sobre pizarrón, y en azul sobre papel. El naranja de su logo aparece SOLO en el logo (no en la interfaz). Nada de rojo, rosa ni azul rey de lienzo.
- Botones de navegar: azul sólido con texto gis, esquinas de 10 px, mayúsculas espaciadas ("VER NIVELES", "CÓMO LLEGAR"). Secundario contorno gis. **VERDE `#25D366` SOLO** en "Pedir informes por WhatsApp" / "Apartar mi lugar" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Bitter** 800 (slab con oficio de escuela); cuerpo **Atkinson Hyperlegible** 400/700; grados y fechas en **Bitter** 700 itálica. Nada de Fredoka, Nunito, Syne, DM Serif, Archivo, Anton, Barlow, Overpass, Fraunces ni Abril.
- Logo real: `research/fotos/logo-fb.jpg` (206 px, naranja, con el lema cortado al final). Es chico: usarlo a 48–64 px sobre un disco de papel gis en header y pie; NO estirarlo. El nombre "Colegio CEPIA" va compuesto en Bitter. En PENDIENTES: logo en alta. Favicon: recorte del logo sobre papel.

## Lenguaje de formas propio: LA CANCHA Y EL PIZARRÓN
- **Líneas de cancha**: su patio techado tiene líneas curvas de colores (roja, verde, amarilla) pintadas en el piso. Los divisores de sección son esas líneas: dos o tres trazos curvos paralelos de 3 px (amarillo gis, azul, blanco) que cruzan el ancho, como líneas de cancha.
- **Pizarrón**: las fichas importantes tienen marco de madera fino (4 px `#8a6a45`) y repisa de gis abajo; el texto de dato va como escrito con gis (Bitter itálica, color gis, sin tipografía manuscrita).
- Fotos con esquinas de 10 px y una **franja de color de nivel** a la izquierda (inicial amarillo, preescolar azul, primaria blanco gis, secundaria verde claro), para ubicar de qué nivel es cada una.
- Nada de hojas de libreta, espirales, cinta adhesiva, estrellitas, ladrillos ni arcos.

## Header propio: EL PIZARRÓN DEL DÍA
- Barra pizarrón de 60 px con marco de madera abajo. Izquierda: logo en disco + "Colegio CEPIA" en Bitter. Derecha: botón azul "INFORMES" + hamburguesa. En compu, al centro, escrito con gis, la fecha de hoy como en el pizarrón del salón ("Miércoles 30 de septiembre", calculada con la zona America/Mexico_City).
- Al bajar se compacta a 50 px y una línea de cancha amarilla recorre el borde inferior con el avance del scroll (reversible).
- Hamburguesa a pantalla completa pizarrón con letras gis: ¿Qué grado le toca? · Niveles · Open House · El colegio · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): ¿QUÉ GRADO LE TOCA?
Sección `20-grado`. Un pizarrón donde la familia pone la **fecha de nacimiento** de su hijo (`input type=date` o tres selectores día/mes/año) y el pizarrón escribe con gis, en vivo: **"En el ciclo 2026–2027 le toca 2° de preescolar."** (o "Inicial", "4° de primaria", "1° de secundaria"). Cálculo con la regla general de la SEP de edad cumplida al 31 de diciembre del año en que inicia el ciclo: 3 años → 1° de preescolar, 4 → 2°, 5 → 3°, 6 → 1° de primaria … 11 → 6°, 12 → 1° de secundaria, 13 → 2°, 14 → 3°; menos de 3 → Inicial; 15 o más → "Ya terminó la secundaria: no es con nosotros." Debajo, letra chica: "Cálculo con la regla general de edades de la SEP; el colegio confirma el grado." Se puede agregar un segundo hijo ("+ Otro hijo", máximo 4). Botón VERDE "Pedir informes por WhatsApp": `Hola Colegio CEPIA, quiero informes para 2° de preescolar y 4° de primaria, ciclo 2026–2027. ¿Cuándo puedo conocer el colegio? Mi nombre: ___` (omitir renglones vacíos). Guarda `cepia_grado` en localStorage. Sin JS: lista de niveles con las edades y el botón de informes.

## Momento firma: "LA MARCA EN LA PARED"
Sección `30-niveles`. Como las marcas de lápiz con que se mide a un niño en el marco de la puerta: una franja vertical de papel gis a la izquierda con **cuatro marcas hechas a lápiz** (INICIAL · PREESCOLAR · PRIMARIA · SECUNDARIA), y una marca viva que **sube con el scroll** de una a otra (reversible, sin pin); al llegar a cada marca se enciende el bloque de ese nivel con su foto real y lo que ellos publican de ese nivel. Sin regla ni números de centímetros (no es cinta de medir): solo las cuatro rayitas con el nombre del nivel. Titular a dos tonos: **"Aquí vienen / a crecer en grande."** Contenido por nivel (solo lo publicado): Inicial y preescolar (foto `maps-01` del salón de lactantes; plantel Sinaloa y plantel Pabellón de Arteaga) · Primaria (foto `vid-pasillo-mochilas-01` o `vid-patio`; Feria de Ciencias, Campamento Yuca para 5° y 6°) · Secundaria (foto `vid-patio-01`; "Beelingual Demonstration": inglés y francés) · Para todos: LEGO WeDo (robótica con bloques, anunciada para el ciclo 2026–2027) y "grupos reducidos".

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Qué es y desde cuándo, de inmediato | Foto real grande de su edificio (`maps-02.jpg`, ladrillo con franjas azules, 1152 px: en marco, no a sangre si se ve suave) como cartel de dos terceras partes de pantalla en celular. Título que cae y pega, el más grande de la página: **"Vienen a crecer / en grande."** Línea: "Inicial, preescolar, primaria y secundaria · Desde 1990 · Al sur de Aguascalientes". Botón azul "VER NIVELES" + link con flecha "¿Qué grado le toca?". Sin verde. | maps-02 |
| 2 | `20-grado` | El trabajo de la página | Componente firma + botón verde. Título: **"¿Qué grado / le toca?"** | pizarrón |
| 3 | `30-niveles` | "¿Quieres esto?": los 4 niveles a la vista | Momento firma con fotos reales y programas publicados. 0 verdes. | fotos reales por nivel |
| 4 | `40-openhouse` | Motivo para venir YA | Su arte real `fb-banner-openhouse.jpg` en marco de pizarrón: **"Open House Calaveras. / Jueves 29 de octubre, 5:00 p.m."** (dato real de su banner 2026). Cuenta regresiva en gis ("Faltan 29 días") calculada con la fecha real; después del 29 de octubre el bloque cambia solo a "Agenda una visita cuando quieras". Botón VERDE "Apartar mi lugar": `Hola Colegio CEPIA, quiero ir al Open House del jueves 29 de octubre a las 5:00 p.m. Somos ___ personas. Mi nombre: ___`. | banner real |
| 5 | `50-colegio` | Confianza y cómo llegar | **"Sinaloa 623, / Pirámides."** Tira de 4 a 5 fotos reales chicas del plantel (entrada con reja amarilla, patio techado, pasillo con mochilas, vista aérea) con swipe. Ficha de pizarrón: Lunes a viernes 7:30 a 17:00 con estado en vivo "Abierto ahora / Abre mañana 7:30" · 449 978 7180 con `tel:` · cepia_mailus@yahoo.com.mx · "Asociación civil desde 1990" · "Con clave SEP en los cuatro niveles" (las claves van en letra chica: 01PDI0003L, 01PJN0081L, 01PPR0054E, 01PES0055X) · segundo plantel: Pabellón de Arteaga (inicial y preescolar), Manuel M. Ponce 5 · mapa embebido · botón azul "CÓMO LLEGAR" · Facebook con logotipo SVG 44 px. Sin estrellas ni reseñas (no hay). | fotos reales + mapa |
| 6 | `60-cierre` | Último empujón + siguiente paso | Foto aérea real (`vid-aerea-01`, en marco) con la cita de su lema **«Educación centrada / en la persona.»** a dos tonos; pizarrón con el grado calculado y botón verde. Debajo, misma sección, **"Todo listo para completar"** (renglones de gis): WhatsApp oficial de informes · colegiaturas o si prefieren no publicarlas · horarios por nivel · quién dirige hoy · logo en alta · fotos de salones y actividades con autorización de padres · su dominio (colegiocepia.org ya no existe y los directorios lo siguen anunciando) · link de cobro de inscripción. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | vid-aerea |
| F | footer | Contacto real | Logo, Sinaloa 623, teléfono, correo, Facebook con SVG, "Muestra de diseño hecha por KREVO con la información pública de Colegio CEPIA." | |

Ritmo: 1 foto cartel + título · 2 pizarrón herramienta · 3 marcas que suben con fotos por nivel · 4 evento con cuenta regresiva · 5 tira de fotos + ficha + mapa · 6 foto + cita + pizarrón.

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Texto que "se escribe con gis" (aparece letra por letra, 18 ms por letra, máximo 600 ms). Línea de cancha del header ligada al scroll. Marca en la pared que sube con el scroll. Sin pin, sin cortinas, sin video de IA, sin cinta de medir, sin confeti.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos (privacidad de menores)
- Usar: `maps-01` (salón sin personas, 1600), `maps-02` (fachada, 1152), `vid-entrada-01/02`, `vid-reja-01`, `vid-pasillo-mochilas-01`, `vid-patio-01..04`, `vid-aerea-01` (cuadros de 720 px: chicas o en marco, nunca a sangre en compu), los dos banners propios.
- **Menores:** solo tomas de lejos. Con PIL desenfoca cualquier cara de niño que se distinga (aunque sea chica) y NO uses `vid-salon-01` (niños de medio plano) ni las `fbmini-*` (315 px, niños cerca). Anótalo en IMAGENES.md.
- PROHIBIDAS: `maps-03` y `maps-04` (son de otra escuela, Monte Albán), los cuadros de reels con IA o con marca LEGO.
- Nada de IA ni stock. og:image 1200x630 con PIL: maps-02 con velo pizarrón + "Vienen a crecer en grande."

## Lo que NO va
La promo de 40 % en inscripción (decía "últimos días" el 31 de agosto: va en PENDIENTES), colegiaturas, nombres de directoras (datos SEP de 2018), matrícula, el "3.7" de un directorio (es de la escuela vecina), "excelente nivel académico" y "educación de calidad" en títulos (R6), correos del dominio muerto, reseñas o estrellas, contadores, rejilla de íconos, más de 5 verdes, naranja en la interfaz, libreta, ladrillos.

## PENDIENTE-DUEÑO
WhatsApp oficial · colegiaturas y promoción vigente · horarios por nivel · directora general · logo en alta · fotos con autorización · dominio · datos del plantel Pabellón · link de cobro.
