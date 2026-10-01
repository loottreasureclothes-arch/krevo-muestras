# Grupo Traffic Logix (GTLO) · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: otras muestras de esta tanda ya usan negro con rojo (Forza), carbón con acero (JAS INOX), marino con dorado (San José) y un avioncito que avanza en el header (Hodo). Aquí manda **asfalto y amarillo de carretera, con señales de tránsito**.

## El TRABAJO de la página
Que una empresa (RH, compras) o una persona pida cotización de transporte en 1 toque: **tipo de servicio → cuántos pasajeros → días y horarios o fecha → WhatsApp 449 468 3835** (`https://wa.me/524494683835?text=...`; es el que publican en su Wix y Facebook como "llámanos o manda WhatsApp"). Hoy su "página" es un Wix gratis con el anuncio de Wix arriba, errores de ortografía y el contacto roto (404).

## La promesa (solo ellos la pueden decir)
**"Transportarte es nuestra especialidad."** (su lema: "Transportarte es nuestra especialidad y pasión"). Transporte de personal, aeropuerto, turismo y ejecutivo; "unidades monitoreadas por GPS las 24 horas", "atención las 24 horas, los 365 días"; 4.9 en Google (11 opiniones); un cliente escribió "sus camiones siempre los tiene impecables".

## Identidad
- Lienzo **asfalto `#1f2124`** con textura de grano muy sutil. Color de marca **amarillo carretera `#FCCC24`** (el amarillo de su logo): botones de navegar amarillos con texto negro, segunda línea de titulares, líneas de carril. Blanco señal `#f5f5f0` para texto y señales informativas. El logo multicolor se usa tal cual, sin sacar de ahí más colores de interfaz: NADA de naranja, ni rojo, ni azul, ni verde como color de interfaz (el verde queda solo para WhatsApp).
- Botones de navegar: amarillo sólido con texto negro, esquinas de 8 px y filete interior negro de 1.5 px a 3 px del borde (como señal de tránsito), mayúsculas espaciadas ("VER SERVICIOS", "CÓMO LLEGAR"). Secundario contorno amarillo. **VERDE `#25D366` SOLO** en "Cotizar por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Overpass** 800/900 (tipografía de señalización de carretera); cuerpo **Overpass** 400/600; números económicos, horas y pasajeros en **Overpass Mono**. Nada de Barlow, Anton, DM Serif, Fraunces, Abril ni Fredoka.
- Logo real: `research/fotos/wix_logo_gtlo.jpg` (2200x1700, fondo blanco: quitar el blanco con PIL → PNG) y `fb_logo.jpg` (sobre azul marino). En header va el PNG sin fondo sobre asfalto (si los colores se pierden sobre oscuro, ponerlo en una señal blanca con esquinas de 8 px). Favicon: recorte del logo.

## Lenguaje de formas propio: SEÑAL Y CARRIL
- **Señal informativa**: panel con esquinas de 8 px, filete interior a 3 px del borde, flecha de salida en una esquina. Es el contenedor de servicios, datos y reseña.
- **Línea de carril**: divisores de guiones amarillos (36 px de guion, 24 px de hueco).
- **Número económico**: placa chica en Overpass Mono con los números reales que se ven en sus unidades (114, 121, 123, 126) como etiqueta de las fotos (`UNIDAD 126`).
- Nada de boletos, casilleros, cotas ni lobby cards.

## Header propio: EL PÓRTICO
- Barra asfalto de 60 px como pórtico de carretera: izquierda logo; centro (compu) tres señales chicas blancas "PERSONAL · AEROPUERTO · TURISMO · EJECUTIVO" que son links de ancla reales; derecha una señal amarilla **"ABIERTO 24 H"** (estática, dato real) + botón amarillo "COTIZAR" + hamburguesa.
- Borde inferior: línea de carril amarilla cuyos guiones **avanzan** con el scroll (background-position ligado al scroll, reversible) y un odómetro chico en Overpass Mono a la derecha que cuenta el avance de la página de `KM 000` a `KM 100`. Se compacta a 50 px al bajar.
- Hamburguesa a pantalla completa asfalto con señales apiladas: Servicios · Cotizar · Flotilla · Base · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): LA SEÑAL DE TU RUTA
Sección `30-senal`, el cotizador. A la izquierda el formulario corto; a la derecha (arriba en celular, pegada mientras se llena) una **señal de pórtico de carretera** dibujada en SVG/HTML que se va componiendo en vivo con lo que la persona elige, como si se rotulara:
1. Servicio (fichas señal): Personal empresarial · Aeropuerto · Turismo · Ejecutivo.
2. Pasajeros: campo numérico con − / + (1 a 200, sin decir cuántas unidades ni qué capacidad tiene cada una: eso no está publicado).
3. Si es Personal: días (L M M J V S D como casillas) y turnos (Matutino · Vespertino · Nocturno, selección múltiple). Si es otro: fecha (`input type=date`) y hora (`input type=time`), origen y destino (texto libre).
4. La señal muestra, con flecha de salida: `PERSONAL EMPRESARIAL ↗ 45 PASAJEROS · L A V · 3 TURNOS` o `AEROPUERTO ↗ 6 PASAJEROS · 12 OCT 05:30 · AGS → GDL`. Cada renglón entra con un "clac" de 140 ms (translateY 6 px).
5. Botón VERDE "Cotizar por WhatsApp": `Hola GTLO, quiero cotizar transporte de personal para 45 pasajeros, de lunes a viernes, turnos matutino, vespertino y nocturno. Empresa: ___. Mi nombre: ___` (omitir renglones vacíos). Línea fija: "Te confirmamos precio y disponibilidad por WhatsApp." Nunca precio ni "$0".
Sin JS el formulario se usa igual. Guarda `gtlo_ruta` en localStorage.

## Momento firma: "EL CONVOY"
Sección `40-flotilla`. Sobre una banda de asfalto con línea de carril, **cuatro siluetas de sus unidades en línea (SVG de trazo: Hiace, Urvan, Sprinter, Suburban) entran rodando desde la izquierda una tras otra ligadas al scroll** (translateX según el avance de la sección, ruedas que giran con `rotate`, reversible, sin pin) hasta formarse en fila, cada una con su etiqueta real (`TOYOTA HIACE`, `NISSAN URVAN`, `MERCEDES SPRINTER`, `SUBURBAN EJECUTIVA`). Encima el titular a dos tonos **"Siempre / impecables."** y debajo la cita literal: "sus camiones siempre los tiene impecables" · Erik Mendozasantos, en Google, con 5 estrellas, y en chico "4.9 en Google · 11 opiniones" con link. Debajo, foto real grande de la fila de vans (`wix_fila_vans_hiace_urvan.jpeg` o `wix_nissan_urvan_flotilla.jpg`). Con reduced-motion el convoy ya está formado.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Qué hacen, con sus unidades reales | Foto real grande `wix_nissan_urvan_flotilla.jpg` (1440 px) 70 svh con velo asfalto abajo. Título que cae y pega: **"Transportarte es / nuestra especialidad."** (segunda línea amarilla). Línea en Overpass Mono: "PERSONAL · AEROPUERTO · TURISMO · EJECUTIVO · 24 H". Botón amarillo "VER SERVICIOS" + link con flecha "Cotizar mi ruta". Sin verde. | urvan + flotilla |
| 2 | `20-servicios` | "¿Quieres esto?": los 4 servicios a la vista | **"Cuatro rutas. / Una llamada."** Cuatro señales grandes (1 columna en celular, 2 en compu), cada una con foto real, nombre y su texto literal recortado del Wix (corrigiendo la ortografía: "los trayectos de tu personal"), más "Cotizar" (amarillo contorno) que preselecciona el servicio: **Personal empresarial** (foto `wix_fila_vans_hiace_urvan`) · **Aeropuerto** (foto `fb_09`, Sprinter con puerta abierta; recortar placas) · **Turismo** (foto `wix_urvan_sierra` o `fb_01`; "operadores capacitados y seguro viajero con cobertura amplia", literal) · **Ejecutivo** (foto `wix_suburban_ejecutivo`). 0 verdes. | 4 fotos reales |
| 3 | `30-senal` | El trabajo de la página | La señal de tu ruta (componente firma) + botón verde. Título: **"Rotula / tu ruta."** | señal SVG |
| 4 | `40-flotilla` | Confianza | Momento firma (convoy) + cita real + foto de la fila. Debajo, cuatro renglones tipográficos (no rejilla de íconos) con sus propios textos: "GPS las 24 horas, en tiempo real." · "La limpieza e imagen de nuestras unidades es una prioridad." (literal) · "Puntualidad." · "Atención las 24 horas, los 365 días." | fila de vans |
| 5 | `50-base` | Dónde están | **"Base en / La Estación."** Señal con: Fray Bartolomé de las Casas 127, Barrio de la Estación, 20259 · Abierto las 24 horas · 449 468 3835 con `tel:` · grupo.traffic.logix@gmail.com · mapa embebido · botón amarillo "CÓMO LLEGAR". Facebook, Instagram y YouTube con logotipo SVG 44 px; link "Ver su video en YouTube" (https://www.youtube.com/watch?v=X0Phkte3K2U). | mapa en señal |
| 6 | `60-cierre` | Último empujón + siguiente paso | La señal ya rotulada con lo que eligió: **"Tu ruta / ya está rotulada."** (si no eligió: "Falta elegir servicio.") + botón verde. Debajo, misma sección, **"Todo listo para completar"**: dominio propio (hoy es un Wix gratis con el anuncio de Wix arriba y el contacto roto) · cuál de sus 3 teléfonos es el oficial · cuántas unidades y capacidad de cada tipo · clientes o industrias que se puedan nombrar · permisos y póliza que quieran presumir · fotos de interiores y operadores · confirmar "más de 15 años" · link de cobro para anticipos. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | |
| F | footer | Contacto real | Logo, dirección, teléfono, correo, redes con SVG, "Muestra de diseño hecha por KREVO con las fotos públicas de Grupo Traffic Logix." | |

Ritmo: 1 foto + título · 2 cuatro señales con foto · 3 herramienta con señal viva · 4 convoy + cita + foto · 5 señal + mapa · 6 señal rotulada.

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Guiones del carril que avanzan y odómetro en el header. Renglones de la señal con "clac". Convoy ligado al scroll. Sin pin, sin cortinas, sin video de IA, sin cinta de medir.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos
- Reales grandes: `wix_nissan_urvan_flotilla.jpg` (1440), `fb_09.jpg` (1600), `fb_01.jpg` (1262), `wix_suburban_ejecutivo.png` (1268), `wix_hiace_detalle_logo.jpg` (1356), `wix_fila_vans_hiace_urvan.jpeg` (1194), `wix_urvan_sierra.jpeg` (900). Las de Instagram (640) solo chicas.
- **Tapar o recortar con PIL**: placas de las unidades, la marca Marriott (fb_04, fb_07, fb_08: mejor no usarlas), el logo Continental, caras de pasajeros en fb_09 (desenfocar).
- PROHIBIDO usar las de stock del Wix (`wix_carretera_stock`, `wix_aeropuerto_stock`, `wix_playa_stock`) y los carteles gráficos de Instagram.
- Nada de IA. og:image 1200x630 con PIL: urvan con flotilla + logo + "Transportarte es nuestra especialidad."

## Lo que NO va
"Más de 15 años" como hecho nuestro (si se usa, entre comillas y como "según su sitio"; mejor dejarlo en PENDIENTES), número de unidades, capacidades por vehículo, clientes (Marriott, Continental, estadio Akron), permisos SCT, "transporte escolar" (solo lo dice un directorio), misión y visión, palabras "excelencia", "calidad", "líder" (R6), los otros dos teléfonos, el correo personal del cartel, contadores, rejilla de íconos, más de 5 verdes, naranja, fotos de stock.

## PENDIENTE-DUEÑO
Teléfono oficial · dominio · número de unidades y capacidad · clientes nombrables · permisos y póliza · zonas y rutas · antigüedad real · fotos de interiores, operadores y base · quién dirige.
