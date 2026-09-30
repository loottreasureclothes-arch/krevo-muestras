# JAS INOX · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md` y `research/FOTOS.md`. Lo que no esté ahí, no va.

## El TRABAJO de la página
Que un negocio, cocina o industria pida cotización en 1 toque: **qué necesita + medidas → WhatsApp 449 441 5822** (`https://wa.me/524494415822?text=...`). Página B2B: confianza (fábrica real, entregan en todo México) + catálogo a la vista + cotizador con medidas. Su "página" actual es un Canva gratis sin fotos: la muestra tiene que verse como fábrica seria.

## La promesa (solo JAS INOX la puede decir)
**"Fabricamos aquí. Entregamos donde necesites."** (literal de su post de agosto 2026, de Aguascalientes a Tijuana, 1,900 km). Muebles y equipos en acero inoxidable a la medida, taller en Polux 114, Col. C.T.M. Frase propia del canva: "ayudamos a negocios, cocinas e industrias a equiparse con acero inoxidable de alta calidad… acabados resistentes e higiénicos".

## Identidad
- Lienzo **carbón `#141517`** con textura de acero cepillado en bandas (repeating-linear-gradient horizontal muy sutil, 1 px, alfa .04). Color de marca: **acero `#c9ccd1`** (botones de navegar en gris acero con texto negro, líneas, titulares a dos tonos: primera línea blanca, segunda en degradado cromo `linear-gradient(#f2f3f5,#9a9ea6)` con `background-clip:text`). Acento único de detalle: **azul soldadura `#4fb3ff`** solo en la chispa del header, el punto de "abierto" y las cotas del cotizador. NADA de naranja.
- Botones de navegar: gris acero sólido, rectangulares (radio 0), mayúsculas espaciadas ("VER CATÁLOGO", "CÓMO LLEGAR"). Secundario contorno acero. **VERDE `#25D366` SOLO** en "Cotizar por WhatsApp" (abre wa.me) y flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Anton** (condensada, industrial) en mayúsculas con tracking .02em; cuerpo **IBM Plex Sans** 400/500; medidas y cotas **IBM Plex Mono**.
- Logo real: `research/logo-fb.jpg` (2048x2048, JAS cromo + INOX®). Quitar el fondo blanco con PIL → PNG; en header va la versión cromo sobre carbón. Favicon: la "J".

## Lenguaje de formas propio: LÁMINA, CORTE Y COTA
- Todo es rectángulo de esquinas rectas con un **corte diagonal de 10 px** en una sola esquina (como lámina cortada), nunca radios.
- Divisores: línea de cota de plano (línea fina con dos topes y una medida en Plex Mono, ej. `1,900 km`, `cal. 18`).
- Fotos con marco de 1 px acero y una etiqueta de plano en la esquina (`FIG. 01 · CARRITO CON CAMPANA`).
- Chips de categoría como etiquetas troqueladas (rectángulo con muesca redonda a la izquierda, tipo placa de inventario).

## Header propio: LA BARRA DE TALLER
- Barra carbón de 60 px con textura cepillada. Izquierda logo cromo. Centro (solo compu): "CATÁLOGO · A LA MEDIDA · TALLER" en Plex Mono chico. Derecha: botón acero "COTIZAR" (baja al cotizador) + hamburguesa.
- Borde inferior: una línea de 2 px acero que al bajar se va "soldando": el avance del scroll la recorre con un punto azul soldadura con halo (reversible). Al bajar se compacta a 52 px.
- Hamburguesa a pantalla completa carbón con letras acero: Catálogo · A la medida · Proyectos · Taller · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): LA MESA A TU MEDIDA
Sección `30-medida`, el cotizador. Un **dibujo isométrico en SVG de una mesa de trabajo de inoxidable** que se redibuja en vivo a escala con lo que la persona mueve:
1. Tipo (fichas): Mesa de trabajo · Mesa con tarja · Carrito · Campana · Estante/rack · Otro (campo libre).
2. Medidas con tres deslizadores (largo 60–300 cm, ancho 40–120 cm, alto 70–110 cm) en Plex Mono; las **cotas** se escriben sobre el dibujo (líneas de cota azul soldadura) y la figura se estira de verdad (viewBox fijo, escala proporcional).
3. Opciones (casillas): entrepaño inferior · respaldo (salpicadero) · rodajas · tarja. Cada una aparece en el dibujo.
4. Botón VERDE "Cotizar por WhatsApp": `Hola JAS INOX, quiero cotizar: Mesa con tarja de 180 x 70 x 90 cm, con entrepaño y rodajas. Para: restaurante. Ciudad: ___. Mi nombre: ___` (omitir renglones vacíos). Nunca precio ni "$0": línea fija "Te confirmamos precio y tiempo de entrega por WhatsApp."
Funciona sin JS de animación (los campos son inputs nativos; el dibujo es adorno que sí ayuda). Guarda `jas_cotiza` en localStorage.

## Momento firma: "DE AGUASCALIENTES A TIJUANA"
Sección `40-ruta`. Mapa de México en SVG simplificado (contorno, sin estados) sobre carbón; una **línea de cota que el scroll dibuja** (`stroke-dashoffset` ligado al avance de la sección, reversible, sin pin) de Aguascalientes a Tijuana, con el texto en Plex Mono `1,900 km` al final y el título **"Fabricamos aquí. / Entregamos donde necesites."** Debajo, 2 fotos reales del embarque (ig-05, ig-06: redilas en pickup y tráiler) con etiqueta FIG. Sin gente reconocible (ig-09/ig-10 tienen cara: no usar grandes).

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Producto real de inmediato | Foto real grande (ig-07 o ig-08: carrito/mesa larga con tarja) subida x4, 70 svh, oscurecida al 35 % abajo. Título que cae y pega: **"ACERO INOXIDABLE / A TU MEDIDA."** (segunda línea cromo). Una línea: "Muebles y equipos para negocios, cocinas e industrias. Taller en Aguascalientes, entregas en todo México." Botón acero "VER CATÁLOGO" + link con flecha "Cotizar con medidas". Sin verde. | ig-07/ig-08 (real, x4) |
| 2 | `20-catalogo` | "¿Quieres esto?": todo a la vista, estilo tienda | Chips troquelados de categoría pegados arriba (Carritos y puestos · Mesas de trabajo · Tarjas y lavamanos · Campanas · Racks y estantes · Redilas y transporte · Barandales · Lockers y cajoneras · Todo el catálogo). Tarjetas uniformes 2 columnas en celular con foto real donde exista (carritos: ig-03, ig-04, ig-12; mesas: ig-08, ig-07; redilas: ig-05, ig-06; campana: ig-10 recortada sin la persona) y, donde no hay foto, **marcador honesto**: silueta del producto en línea acero + "Foto pendiente del taller" (NO inventar fotos). Cada tarjeta: nombre, "Pregunta el precio" y link "Cotizar" que preselecciona el tipo en el cotizador. Botón al final: "Ver catálogo completo (79 páginas)" a la URL de Canva. Título: **"Lo que sale / de este taller."** 0 verdes. | fotos reales |
| 3 | `30-medida` | El trabajo de la página | La mesa a tu medida (componente firma) + botón verde. Título: **"Dinos las medidas. / Nosotros el resto."** | SVG isométrico |
| 4 | `40-ruta` | Confianza: alcance real | Momento firma (línea que el scroll dibuja) + 2 fotos de embarque. | mapa SVG + ig-05/ig-06 |
| 5 | `50-taller` | Quiénes son y dónde | **"Polux 114, / Col. C.T.M."** Texto literal recortado del catálogo (3 líneas máx.): "fabricante de material en acero inoxidable y aluminio… un equipo de profesionales preparados para atender todos los requerimientos en cada una de las etapas del proyecto, desde su redacción hasta su ejecución". Ficha de plano: Sergio Alonso Arias Medellin · L–J 8:00–18:00, V 8:00–17:00 · 449 441 5822 · 449 441 2401 · jas.inox@hotmail.com · mapa embebido. Botón acero "CÓMO LLEGAR". Estado en vivo "Abierto ahora / Cerrado, abre mañana 8:00" con punto azul (hora real de Aguascalientes contra ese horario). Facebook, Instagram, TikTok, X con logotipo SVG 44 px. NADA de estrellas (solo hay 1 reseña sin texto). | ig-11 (logo en acero) chica + mapa |
| 6 | `60-cierre` | Último empujón + siguiente paso | Ficha con lo que la persona armó: **"Tu cotización / ya tiene medidas."** + botón verde. Si no armó: "Falta elegir el tipo." Debajo, en la misma sección, **"Todo listo para completar"** (renglones de plano): dirección correcta (Polux 114 o 1o. de Mayo 114) · precios de referencia o rangos · fotos en alta de productos y taller · catálogo en PDF · link de cobro para anticipos · dominio (jasinox.mx). "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | |
| F | footer | Contacto real | Logo, Polux 114 Col. C.T.M. 20126, teléfonos, correo, redes con SVG. "Muestra de diseño hecha por KREVO con las fotos públicas de JAS INOX." | |

Ritmo: 1 foto + título · 2 tienda · 3 herramienta · 4 mapa que se dibuja · 5 ficha + mapa · 6 ficha. 

## Movimiento
Títulos que caen y pegan (por palabra, 500 ms). Punto de soldadura en el header. Línea de ruta ligada al scroll. Cotas que se escriben al mover el deslizador (120 ms). Tarjetas entran con 12 px y opacidad (una vez). Sin pin, sin cortinas, sin video de IA, sin cinta de medir (aquí SÍ se permiten cotas de plano porque el negocio mide, pero no la cinta amarilla de Closet&Door).
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos
- Reales en `research/fotos/` (640 px, algunas con logo encimado en esquina: recortar el logo con PIL cuando estorbe). Subir x4 con Real-ESRGAN (`~/Prospeccion-Web-Ags/tools/realesrgan`, `-s 4`, bajar con PIL) las 4 clave: ig-07, ig-08, ig-05, ig-03. Exportar webp con srcset 480/960/1600.
- Nada de IA. Donde falte foto: marcador honesto en línea.
- og:image 1200x630 con PIL: foto ig-08 oscurecida + logo + "Acero inoxidable a tu medida."

## Lo que NO va
Precios, "5.0 en Google" con estrellas (1 reseña), la dirección de Maps como principal (se deja en PENDIENTES), naranja, contadores, rejilla de tarjetas con ícono, más de 5 botones verdes, palabras prohibidas de R6, fotos con la cara del dueño o clientes en grande, cortinas de color.

## PENDIENTE-DUEÑO
Dirección correcta · precios o rangos · fotos en alta · PDF del catálogo · qué categorías venden más · link de cobro · dominio.
