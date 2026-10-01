# Delgado Express · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: ya existen Traffic Logix (asfalto y amarillo, señales de carretera, odómetro, convoy de siluetas), JAS INOX (carbón y acero, cotas), Forza (negro y rojo inclinado), San José Premier (marino y dorado, serif) y Épica (foquitos en el header). Esta es **azul noche con rojo de tractocamión y cromo, letra ancha, formas de caja seca**; nada de señales, odómetro, foquitos, cotas ni siluetas de vehículos rodando.

## El TRABAJO de la página
Que una empresa que mueve carga pida cotización de un flete en 1 toque: **origen → destino → qué carga y cuánta → fecha → WhatsApp** al 449 976 4042 (`https://wa.me/524499764042?text=...`; es el número que Facebook marca como "Celular" y el mismo de Google Maps: en PENDIENTES va "confirmar que recibe WhatsApp") y botón de llamar con `tel:`. Hoy pagan el dominio delgadoexpress.com y el correo, pero la página solo dice "Website default".

## La promesa (solo ellos la pueden decir)
**"Tractocamión y caja seca de 53 pies."** Autotransporte federal de carga con base en Aguascalientes (su lema en Facebook es "Auto transporte federal de excelencia": se cita literal entre comillas, no como título). Flota propia que se ve en sus fotos: tractocamiones rojos y negros con su rótulo, cajas secas de 53 pies, unidades numeradas (068, 057, 016, 208, 247, 020), localización vía satélite (calcomanía en sus unidades). 5.0 en Google con 12 opiniones.

## Identidad
- Lienzo **azul noche `#0e1730`** (el cielo de sus fotos nocturnas) con bandas `#16223f`. Color de marca **rojo tractocamión `#CC1B2F`** (botones de navegar, segunda línea de titulares, números de unidad). **Cromo** (degradado `#f4f5f7 → #9aa0aa`) solo en filetes, el borde del header y remaches. Blanco para texto. NADA de naranja ni amarillo.
- Botones de navegar: rojo sólido, rectos (radio 2 px), con filete cromo de 1 px arriba, mayúsculas espaciadas ("VER LA FLOTA", "CÓMO LLEGAR"). Secundario contorno cromo. **VERDE `#25D366` SOLO** en "Cotizar por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Archivo** con eje de ancho expandido (`font-stretch: 125%`, peso 800/900) en mayúsculas; cuerpo **Archivo** 400/600 ancho normal; números de unidad, pesos y fechas en **Red Hat Mono**. Nada de Overpass, Anton, Barlow, DM Serif, Fraunces, Abril ni Fredoka.
- Logo real: no hay archivo limpio. Su rótulo ("DELGADO Express" con el correcaminos) se ve grande en `fb-06.jpg` y `fb-08.jpg`: usarlo SIEMPRE como recorte de foto de la puerta del camión (placa rectangular con marco cromo), nunca redibujar el personaje ni vectorizarlo. En header y pie el nombre va compuesto en Archivo expandida ("DELGADO EXPRESS"). Favicon: una "D" roja sobre azul noche. En PENDIENTES: logo en alta.

## Lenguaje de formas propio: CAJA SECA
- Todo contenedor importante es un **panel de caja seca**: rectángulo recto con costillas verticales muy sutiles (repeating-linear-gradient cada 28 px, alfa .05), una fila de remaches cromo (puntos de 4 px) arriba y abajo, y esquinas con herraje (cuadrito cromo de 8 px).
- Etiquetas de foto como **número económico**: `UNIDAD 020` en Red Hat Mono dentro de una placa blanca con borde rojo, solo con los números que de verdad se leen en cada foto (068, 057, 016, 208, 247, 020).
- Divisores: franja reflejante rojo y blanco en diagonal (la cinta de sus cajas), 6 px de alto.

## Header propio: LA DEFENSA
- Barra azul noche de 60 px con borde inferior cromo de 3 px (como defensa cromada). Izquierda "DELGADO EXPRESS" en Archivo expandida. Derecha: calcomanía de puerta (número en Archivo ancha blanco con contorno azul noche sobre rojo) que **muestra el número de la unidad que se ve en pantalla** (068 hero → 057 flota → 016 tracto de la caja 208 → 247 opiniones → AGS patio → 057 cierre → 016 pie; volteo de 200 ms, reversible) + botón rojo "COTIZAR" + hamburguesa.
- Al bajar se compacta a 50 px. Sin barras de avance, sin foquitos, sin odómetro.
- Hamburguesa a pantalla completa azul noche con costillas de caja y letras blancas anchas: La flota · Cotizar · Opiniones · Patio · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): LA CARTA PORTE
Sección `30-carta-porte`, el cotizador. Un **formato de carta porte** (el documento de embarque) en papel crema `#f3efe4` con recuadros, folio y sello, que se va llenando:
1. Origen y destino (dos campos de texto con placeholder "Aguascalientes, Ags." y "Ciudad, estado").
2. Qué carga (texto libre: "tarimas de alimento, maquinaria, paquetería") y cuánta (fichas: Caja completa · Media caja · Algunas tarimas · No sé todavía; más campo opcional de peso aproximado).
3. Fecha de carga (`input type=date`) y, opcional, empresa y nombre.
4. Al completar origen, destino y carga, cae un **sello rojo girado "LISTA PARA COTIZAR"** (300 ms, con sombra de tinta) y el folio se escribe con la fecha.
5. Botón VERDE "Cotizar por WhatsApp": `Hola Delgado Express, quiero cotizar un flete. Origen: Aguascalientes, Ags. Destino: Monterrey, N.L. Carga: tarimas de alimento, caja completa. Fecha de carga: 12 de octubre. Empresa: ___. Mi nombre: ___` (omitir renglones vacíos). Línea fija: "Te confirmamos tarifa y disponibilidad por WhatsApp." Nunca precio ni "$0". Al lado, link "o llámanos: 449 976 4042" con `tel:`.
Sin JS el formulario se usa igual. Guarda `dx_carta` en localStorage.

## Momento firma: "SE ABREN LAS PUERTAS"
Sección `40-opiniones`. Dos **puertas traseras de caja seca** dibujadas en CSS/SVG (costillas, barras de cierre cromadas, cinta reflejante roja y blanca abajo) que **se abren hacia los lados ligadas al scroll** (rotateY con perspectiva o translateX, reversible, sin pin) y dejan ver adentro, sobre azul noche, el **5.0** gigante en Archivo expandida, las 5 estrellas, "12 opiniones en Google" y las 2 reseñas literales aptas (Javier Ibañez y Carla Daniela, con nombre y estrellas). Con reduced-motion o sin JS las puertas ya están abiertas. Blindaje: a los 1.6 s el contenido es visible aunque no se haya hecho scroll.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | La flota real, de inmediato | Foto real grande `fb-02.jpg` (tractocamión rojo de noche con su rótulo, 2048 px) 72 svh con velo azul noche abajo. Título que cae y pega: **"TRACTOCAMIÓN Y CAJA SECA / DE 53 PIES."** (segunda línea roja). Línea: "Autotransporte federal de carga · Base en Aguascalientes". Botón rojo "VER LA FLOTA" + link con flecha "Cotizar un flete". Sin verde. | fb-02 |
| 2 | `20-flota` | "¿Quieres esto?": con qué te mueven | **"ESTA ES / LA FLOTA."** Galería de sus fotos reales como paneles de caja (una grande y cuatro medianas; swipe horizontal en celular): `fb-04` (Kenworth negro cromado), `maps-01` (unidad 057 con caja 247), `fb-07` (unidad 208 con caja seca, TAPAR el letrero de PEMEX), `fb-01` (fila de tractocamiones en el patio), `fb-03` (de noche con caja amarilla). Cada una con su placa de número económico cuando se lea. Debajo, tres renglones tipográficos (no rejilla de íconos): "Tractocamiones propios." · "Cajas secas de 53 pies." · "Localización vía satélite." (lo dice la calcomanía de sus unidades). 0 verdes. | fotos reales |
| 3 | `30-carta-porte` | El trabajo de la página | La carta porte (componente firma) + botón verde. Título: **"LLENA TU / CARTA PORTE."** | papel de carta porte |
| 4 | `40-opiniones` | Prueba social real | Momento firma (puertas que se abren) con el 5.0 y las 2 reseñas. Link "Ver las 12 en Google". | puertas + `fb-06` chica (recorte del rótulo en la puerta, con la cara del operador fuera de cuadro) |
| 5 | `50-patio` | Dónde y cuándo | **"EL PATIO, / EN AGUASCALIENTES."** Foto `maps-03` (patio) en panel. Horario real: Lun a Vie 9:00 a 18:30 · Sáb 9:00 a 15:30 · Dom cerrado, con estado en vivo "Abierto ahora / Abre el lunes 9:00" (hora de America/Mexico_City). Teléfono 449 976 4042 con `tel:`. Mapa embebido buscando "Delgado Express Aguascalientes" (la dirección escrita NO va: las fuentes no coinciden; solo "Carretera a Villa Hidalgo, Aguascalientes" y botón rojo "CÓMO LLEGAR" al enlace de Maps). Facebook con logotipo SVG 44 px. Cita de su Facebook: «Auto transporte federal de excelencia». | maps-03 + mapa |
| 6 | `60-cierre` | Último empujón + siguiente paso | La carta porte ya llena: **"TU FLETE / YA TIENE CARTA."** (si no llenó: "FALTA EL DESTINO.") + botón verde. Debajo, misma sección, **"Todo listo para completar"** (renglones de carta porte): su dominio delgadoexpress.com ya está pagado y hoy solo dice "Website default" · WhatsApp de ventas · dirección oficial (las fuentes dan tres distintas) · logo en alta · razón social y permisos que quieran mostrar · rutas, tipos de unidad y cuántas son · clientes que se puedan nombrar · link de cobro. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | |
| F | footer | Contacto real | DELGADO EXPRESS, teléfono, horario, Facebook con SVG, "Muestra de diseño hecha por KREVO con las fotos públicas de Delgado Express." | |

Ritmo: 1 foto + título · 2 galería de flota · 3 formato que se llena y se sella · 4 puertas que se abren con dato gigante · 5 foto + ficha + mapa · 6 carta llena.

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Placa del header que cambia de número. Sello que cae en la carta porte. Puertas ligadas al scroll. Paneles de flota entran con 12 px (una vez). Sin pin, sin cortinas, sin video de IA, sin cinta de medir, sin vehículos rodando.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos
- Reales y grandes: `fb-02` (2048), `fb-04` (2048), `fb-07` (2048), `fb-06` (2048), `maps-01` (2000), `fb-01` y `fb-03` (1280), `maps-03` (2000).
- **Tapar o recortar con PIL/OpenCV:** placas, el letrero de PEMEX en fb-07, la cara del operador en fb-06 y maps-01.
- PROHIBIDAS: `maps-04` (es de Julio Delgado e Hijos, otra empresa), `maps-07` (Transportes del Bajío), `maps-06` (vans sin identificar), `maps-05` (tractocamión verde sin atribuir).
- Nada de IA ni stock. og:image 1200x630 con PIL: fb-02 con velo azul noche + "Tractocamión y caja seca de 53 pies."

## Lo que NO va
"Excelencia" en títulos (solo en la cita literal), e-commerce/farma/industria pesada (lo dice un directorio, no ellos), "verificado SAT" y "permisos SCT vigentes" (afirmación de tercero), número de unidades, rutas, clientes, año de fundación, 101 a 250 empleados, la dirección con número, redibujar el correcaminos, contadores, rejilla de íconos, más de 5 verdes, naranja, amarillo, señales de carretera.

## PENDIENTE-DUEÑO
WhatsApp · dirección oficial · logo en alta · razón social, RFC y permisos · rutas y cobertura · tipos y número de unidades · clientes · año de fundación · correo de ventas.
