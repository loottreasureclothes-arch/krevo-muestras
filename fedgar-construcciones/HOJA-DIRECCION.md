# Fedgar Construcciones · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: ya existe otra constructora, San José Premier (marino y dorado, serif DM Serif, interruptor una/dos plantas, casa que se arma con ladrillos). Fedgar es otra cosa: **despacho de arquitectura y obra, verde azulado profundo con cantera, letra geométrica, arcos**. Nada de ladrillos, nada de marino, nada de dorado, nada de serif.

## El TRABAJO de la página
Que alguien con un proyecto (casa, nave, oficinas, local) pida una primera cita: **qué quiere construir → dónde y de qué tamaño → si ya tiene terreno y proyecto → WhatsApp 449 393 2124** (`https://wa.me/524493932124?text=...`; es el que ELLOS publican en su sitio). Y enseñar su portafolio real, que hoy está escondido en un Wix a medio hacer (páginas con el texto de plantilla "Esta es la página de tu Proyecto…", redes que llevan a Wix, teléfono vacío, fotos de banco mezcladas con sus obras).

## La promesa (solo ellos la pueden decir)
**"Residencias, naves y oficinas."** con sus obras con nombre: AMBAR, CISNE, MANANTIAL, PPGLZ, TAPIA, más Naves, Oficinas y Locales comerciales. Texto propio literal (página Historia): "Somos un equipo multidisciplinario con una sólida trayectoria de más de 30 años en los sectores público y privado." Y de su Visión: "Crear espacios que representen la mejor versión de quienes los habitan."

## Identidad
- Lienzo **verde azulado profundo `#0d2e36`** (su `#176677` llevado a oscuro) con bandas `#123b45`. Papel **cantera `#ece3d4`** (la piedra de sus fachadas) para láminas y formulario. Color de marca **verde azulado `#2a94a8`** (su tono, aclarado para que contraste sobre oscuro) en botones de navegar y segunda línea de titulares; sobre cantera, la segunda línea va en `#176677`. Tinta `#10181a`. NADA de dorado, marino, rojo ni naranja.
- Botones de navegar: verde azulado sólido con texto cantera, **esquinas superiores en arco** (radio 999px arriba, 0 abajo, como puerta de medio punto) en los botones principales; secundarios rectos de contorno. Mayúsculas espaciadas ("VER OBRAS", "CÓMO LLEGAR"). **VERDE `#25D366` SOLO** en "Pedir cita por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Syne** 700/800 (geométrica con carácter); cuerpo **Figtree** 400/600; claves de proyecto y datos de lámina en **Space Mono**. Nada de DM Serif, Archivo, Anton, Barlow, Overpass, Fraunces, Abril ni Fredoka.
- Logo real: `research/fotos/logo-web-01.png` (arco de pincel negro, fondo transparente, 1008x563). Sobre el lienzo oscuro se usa invertido a cantera (PIL: invertir conservando el alfa); sobre cantera va negro. Junto al arco, "FEDGAR" en Syne 800. Favicon: el arco.

## Lenguaje de formas propio: ARCO Y LÁMINA
- **Arco**: su logo es una bóveda. Las fotos protagonistas van en marcos con la parte superior en arco de medio punto (`border-radius: 999px 999px 0 0`), y el divisor de secciones es un arco fino de trazo (SVG) en vez de línea recta.
- **Lámina de presentación**: tarjeta cantera con margen de plano y **cajetín** abajo a la derecha (recuadro con renglones: PROYECTO · TIPO · LÁMINA 02/08 · FEDGAR), como las láminas que entrega un despacho.
- Claves en Space Mono (`ED-01 AMBAR`, `NV-02 NAVE`).
- Nada de ladrillos, cotas, casilleros, señales ni boletos.

## Header propio: EL TRAZO
- Barra verde azulado profundo de 60 px. Izquierda: arco del logo en cantera + "FEDGAR". Derecha: botón de arco "COTIZAR OBRA" + hamburguesa. En compu, al centro, links de ancla en Space Mono: "OBRAS · DESPACHO · CONTACTO".
- Al bajar se compacta a 50 px y bajo el header **el trazo de pincel del logo se va dibujando de izquierda a derecha con el avance del scroll** (un solo path SVG con `stroke-dashoffset`, trazo irregular de pincel, color cantera; reversible).
- Hamburguesa a pantalla completa con un gran arco de trazo al fondo: Obras · Residencias · Naves y oficinas · Despacho · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): LAS LÁMINAS DEL PROYECTO
Sección `20-obras`. Su portafolio real como **juego de láminas de presentación** que se hojean:
- Chips arriba: Residencias · Naves · Oficinas · Locales.
- Cada proyecto es una lámina cantera con su foto grande (marco de arco), dos fotos chicas y el cajetín: `PROYECTO: CISNE · TIPO: Residencia · LÁMINA 02 / 08`. Proyectos reales: **AMBAR, CISNE, MANANTIAL, PPGLZ, TAPIA** (residencias), **NAVES**, **OFICINAS**, **LOCALES**.
- Se pasa de lámina con swipe en celular y flechas en compu; la lámina que sale se desliza como hoja (translateX + leve rotación de 1°, 280 ms) y el cajetín se reescribe letra por letra en Space Mono.
- Cada lámina tiene el link con flecha "Quiero algo así" que manda el nombre del proyecto al formulario.
- Sin descripción inventada de cada obra (ellos no la publican): solo nombre, tipo y fotos. Renders con etiqueta "Render".
- Sin JS todas las láminas se ven apiladas.

## Momento firma: "EL ARCO SE ABRE"
Sección `30-despacho`. La foto de CISNE (o la de naves por dentro) dentro de un **arco de medio punto que se ensancha con el scroll** hasta volverse foto a todo el ancho (clip sobre un contenedor con `border-radius` animado y `width`, NO clip-path sobre una img lazy; reversible, sin pin). Al abrirse cae el titular a dos tonos **"Más de 30 años / levantando obra."** ("más de 30 años" es literal de su sitio). Debajo, su texto literal de Historia recortado a dos renglones y la línea de Visión entre comillas. Luego, en Space Mono chico y como TEXTO (sin logotipos): "Clientes que publican en su sitio: Municipio de Aguascalientes · Gobierno del Estado · UAA · OXXO · Nissan · Fresnillo · J.M. Romo."

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Su mejor obra, de inmediato | Foto real grande `web-cisne-01.jpg` (2848 px, residencia con piedra, cristal y jardín) como cartel: en celular ocupa dos terceras partes de la pantalla dentro de un marco de arco, título encima abajo. Título que cae y pega, el más grande de la página: **"Residencias, naves / y oficinas."** (segunda línea en color de marca). Línea: "Arquitectura y construcción en Aguascalientes · Más de 30 años". Botón de arco "VER OBRAS" + link con flecha "Cotizar mi obra". Sin verde. | web-cisne-01 |
| 2 | `20-obras` | "¿Quieres esto?": portafolio a la vista | Las láminas del proyecto (componente firma). Título: **"Ocho obras, / ocho láminas."** 0 verdes. Fotos: AMBAR 01-03, CISNE 01-03, MANANTIAL 01-03 (tapar placas del auto), PPGLZ 01-03, TAPIA 01 y 03 (+ render rotulado), NAVES 01-03, OFICINAS 02 (panorámica; la 01 trae letrero de marca ajena: recortar o no usar), LOCALES 03 (interior en acabados; las que traen marca OXXO no van). | fotos reales |
| 3 | `30-despacho` | Quiénes son | Momento firma (arco que se abre) + textos literales + clientes como texto. | web-naves-03 o cisne |
| 4 | `40-cita` | El trabajo de la página | **"Cuéntanos / tu obra."** Formulario corto sobre lámina cantera: qué quieres construir (fichas: Residencia · Nave · Oficinas · Local comercial · Otro), metros aproximados (campo opcional), ¿ya tienes terreno? (Sí · No), ¿ya tienes proyecto? (Sí · No · Quiero que lo hagan ustedes), ciudad, nombre. El cajetín de la lámina se llena en vivo con lo elegido. Botón VERDE "Pedir cita por WhatsApp": `Hola Fedgar, quiero construir una residencia de unos 250 m². Ya tengo terreno. Todavía no tengo proyecto. Me gustó: CISNE. Ciudad: Aguascalientes. Mi nombre: ___` (omitir renglones vacíos). Línea: "Te respondemos por WhatsApp para agendar." Nunca precio. | lámina |
| 5 | `50-oficina` | Dónde | **"13 de Noviembre 103, / Villas de la Asunción."** Ficha: WhatsApp 449 393 2124, correos proyectos@fedgar.com.mx y direcciongeneral@fedgar.com.mx con `mailto:`, mapa embebido en marco de arco, botón "CÓMO LLEGAR". Horario y teléfono fijo NO van (no publicados). Sin redes (no tienen páginas propias confirmadas). | mapa |
| 6 | `60-cierre` | Último empujón + siguiente paso | Foto a lo ancho `web-naves-02.jpg` o `web-casa-exterior-01.png` con el titular a dos tonos que es la cita literal de su Visión: **«Crear espacios que representen / la mejor versión de quienes los habitan.»** Lámina con lo que la persona llenó y botón verde. Debajo, misma sección, **"Todo listo para completar"** (renglones de cajetín): descripción, ubicación y metros de cada obra · fotos reales de sus obras de infraestructura (hoy su sitio usa fotos de banco) · permiso para mostrar logos de clientes · teléfono y horario · nombre de quien dirige · ficha de Google Maps (no tienen) · redes propias (los íconos de su sitio llevan a Wix) · link de cobro para anticipos. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | naves o casa exterior |
| F | footer | Contacto real | Arco + FEDGAR, dirección, WhatsApp, correos, "Muestra de diseño hecha por KREVO con las fotos de obra que Fedgar publica en su sitio." | |

Ritmo: 1 foto cartel en arco · 2 láminas que se hojean · 3 arco que se abre + textos · 4 formulario en lámina · 5 ficha + mapa · 6 foto + cita + lámina.

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Trazo de pincel del header ligado al scroll. Láminas que se deslizan y cajetín que se reescribe. Arco que se abre ligado al scroll. Sin pin, sin cortinas, sin video de IA, sin cinta de medir.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos
- SOLO las propias listadas en "SÍ sirven" de `research/FOTOS.md`. PROHIBIDO todo lo de `research/fotos/_NO-USAR-stock-o-ajenas/` (fotos de banco y logos de terceros) y las `web-infra-*`, `web-home-*`, `web-hist-*`, `web-stock-*`.
- Tapar con PIL placas de autos (MANANTIAL) y números de casa si se leen; recortar letreros de marcas ajenas (OXXO, FRESNILLO): si no se puede recortar limpio, esa foto no va.
- Las chicas (640 px: cisne-02, cisne-03) solo como fotos chicas de lámina.
- Nada de IA. og:image 1200x630 con PIL: web-cisne-01 con velo verde azulado + arco + "Residencias, naves y oficinas."

## Lo que NO va
"Líderes", "calidad" (su lema de inicio cae en palabras prohibidas en títulos), logotipos de clientes, el contrato de la Plaza de Toros (no está confirmado que sea de ellos), infraestructura con fotos (no hay ninguna real), descripciones inventadas de obras, precios, dueño, horario, teléfono fijo, redes, reseñas o estrellas (no existen), contadores, rejilla de íconos, más de 5 verdes.

## PENDIENTE-DUEÑO
Descripción y datos de cada obra · fotos reales de infraestructura · permiso de logos · teléfono y horario · quién dirige · Google Maps · redes · año de fundación · link de cobro.
