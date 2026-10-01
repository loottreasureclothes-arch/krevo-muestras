# Forza Fitness Club · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va.

## El TRABAJO de la página
Que alguien que quiere entrenar pida su inscripción en 1 toque: **plan → horario en que entrena → WhatsApp** al celular que ellos publican en Facebook, 449 153 8877 (`https://wa.me/524491538877?text=...`; en PENDIENTES va "confirmar que es WhatsApp"). Página de membresías: enseña el gimnasio real (pesas, rack, zona funcional), los planes con precio real y el horario de CrossFit con la próxima clase.

## La promesa (solo Forza la puede decir)
**"Sin excusas. Solo resultados."** (post propio, 7 sep 2026). Club en Colosio 605 abierto de 5:00 am a 10:00 pm, con pesas, CrossFit, box, clases y guardería; 4.3 en Google con 323 opiniones; 13,594 seguidores en Facebook y recomendado por el 86 % (526 opiniones). Lema de sus lonas: "Come to beat yourself." y de su cartel: "Reloaded · Always Forza".

## Identidad
- Lienzo **negro `#121313`** con grafito `#2D2F30` en bandas. Color de marca **rojo rayo `#E20A14`** (botones de navegar, titulares a dos tonos, líneas, el rayo). Blanco para texto. NADA de naranja ni del coral de la lona.
- Botones de navegar: rojo sólido, **inclinados** (`transform: skewX(-8deg)`, texto derecho), sin radio, mayúsculas espaciadas ("VER PLANES", "CÓMO LLEGAR"). Secundario contorno rojo. **VERDE `#25D366` SOLO** en "Pedir mi inscripción por WhatsApp" (abre wa.me) y flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Barlow Condensed** 800 itálica en mayúsculas (como el logo itálico); cuerpo **Barlow** 400/600; horarios y precios **Barlow Semi Condensed** 600. Nada de Anton, Fredoka, Fraunces ni Bricolage (ya usadas en otras muestras).
- Logo real: `research/fotos/logo-facebook.jpg` (rayo rojo en círculo, 1066 px, fondo negro: se integra directo sobre negro) y `logo-instagram.jpg` (con la palabra, solo 150 px: no estirar; la palabra FORZA se compone en Barlow Condensed 800 itálica). Favicon: el rayo.

## Lenguaje de formas propio: RAYO Y CASILLERO
- Todo bloque importante es un **casillero de gimnasio**: rectángulo con dos rejillas de ventilación (tres rayitas horizontales) en la esquina superior y un número de casillero en Barlow Semi Condensed (`#014`).
- Cortes diagonales inclinados 8° en bandas y fotos (paralelogramos), en la misma inclinación que el logo.
- Divisores: línea roja fina con un rayo chico al centro.
- Reseñas como etiquetas pegadas en la puerta del casillero.

## Header propio: LA BARRA DE CARGA
- Barra negra de 58 px. Izquierda: rayo del logo + "FORZA" en Barlow Condensed itálica. Derecha: botón rojo inclinado "INSCRÍBETE" (baja a planes) + hamburguesa.
- Borde inferior: barra de carga roja que se llena con el avance del scroll, con un destello blanco en la punta, como batería que carga (reversible). Se compacta a 50 px al bajar.
- Hamburguesa a pantalla completa negra con letras blancas y una raya roja inclinada: Planes · Horarios · El club · Dónde · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): EL HORARIO QUE SABE QUÉ HORA ES
Sección `30-horario`. El **horario real de CrossFit** (de `research/fotos/ig-01.jpg`, tabla lun–sáb: 6:00 am Luis Fer, 8:00 am Carlos Rivera, tardes 6, 7 y 8 pm lunes Luis Fer y martes a viernes Diego Sánchez, sábado 9:00 am Carlos Rivera; sin clase 7 y 9 am entre semana) dibujado como tablero de casilleros: columnas por día, filas por hora. Con la hora real del visitante (zona America/Mexico_City): la celda de la **próxima clase** se enciende en rojo con pulso y arriba dice en vivo **"Próxima clase: CrossFit hoy 6:00 pm con Diego Sánchez · en 2 h 14 min"** (o "mañana 6:00 am con Luis Fer", o el sábado). Tocar una celda la mete al mensaje de WhatsApp ("Me interesa: CrossFit mié 6:00 pm"). Debajo, las demás clases como lista tipográfica (Body Combat, RPM / ciclo indoor, Yoga, Boxeo, MMA, Jump Fit, Body Balance, cardio) con "Horario: pregúntanos" (no hay horario publicado de esas; no inventar). Sin JS la tabla se lee completa.

## Momento firma: "EL RAYO CARGA"
Sección `40-club`: foto real del rack (maps-04, aclarada) a sangre 70 svh con velo negro; encima el rayo del logo dibujado en SVG (trazo) que **se llena de rojo de abajo hacia arriba con el scroll** (máscara `clip-path: inset` ligada al avance de la sección, reversible, sin pin), y al llenarse aparece el titular a dos tonos **"Come to / beat yourself."** (literal de su lona) y debajo **4.3 en Google · 323 opiniones** en chico con link a Maps. Con reduced-motion el rayo ya está lleno.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | El club real y el horario, de inmediato | Foto real grande `maps-01.jpg` (piso de pesas con la lona; 2048 px, recortar la lona si su URL vieja `forzafc.com.mx` se lee: NO debe verse un dominio muerto) 70 svh con velo negro abajo. Título que cae y pega: **"SIN EXCUSAS. / SOLO RESULTADOS."** (segunda línea roja). Línea: "Colosio 605 · Abierto de 5:00 am a 10:00 pm". Botón rojo "VER PLANES" + link con flecha "Ver horario de CrossFit". Sin verde. | maps-01 (real) |
| 2 | `20-planes` | "¿Quieres esto?": precios a la vista, estilo tienda | **"Elige tu / plan."** Tres casilleros: **Plan Gold** "desde $999.90 al mes" (dato de Wellhub; ponerle "desde") · **High School** "$650 al mes + $200 de inscripción · con credencial de estudiante · 3x4 meses" (post 24 ago 2026) · **Otros paquetes** "Pregunta el precio". Cada uno con "Elegir" (rojo contorno) que lo escribe en el cierre. Debajo, lista tipográfica de lo que incluye el club (Wellhub): zona de pesas, cardio, clases grupales, box y CrossFit, regaderas, lockers, vestidores, área infantil/guardería, tienda de artículos deportivos; sin iconos, sin rejilla. Nunca "$0". 0 verdes. | fb-01 (arte "Reloaded", como fondo con velo) |
| 3 | `30-horario` | El trabajo de la página: engancharse a una clase | Componente firma. Título: **"La próxima clase / es a las 6:00."** (la hora la escribe el JS; en HTML base "La próxima clase / ya casi empieza."). 1 verde: "Pedir mi inscripción por WhatsApp" (arma el mensaje con plan + clase). | maps-03 (zona funcional, vertical) como foto lateral |
| 4 | `40-club` | Por qué este y no Smart Fit | Momento firma (rayo que carga) + 3 reseñas positivas literales como etiquetas de casillero (Marissa Anais Muñoz Gallo, Fernando Fernández Pérez, Angel D. Rodríguez: recortar la parte negativa de Angel; usar solo hasta "precios accesibles") con nombre y estrellas. Nada de contadores. | maps-04 (rack) |
| 5 | `50-colosio` | Que lleguen | **"Colosio 605."** Horario por día (Lun–Vie 5:00–22:00 · Sáb 6:00–18:00 · Dom 8:00–15:00, fuente Wellhub; anotar en PENDIENTES confirmar), estado en vivo "Abierto ahora / Abre a las 5:00", teléfono 449 153 8877 con `tel:`, mapa embebido, botón rojo "CÓMO LLEGAR", "También estamos en Wellhub" como texto, Facebook e Instagram con logotipo SVG 44 px (NO TikTok: no tienen). | mapa en casillero |
| 6 | `60-cierre` | Último empujón + siguiente paso | Casillero con el plan y la clase elegidos: **"Tu plan / ya está listo."** (si no eligió: "Falta elegir plan.") + botón verde. Debajo, misma sección, **"Todo listo para completar"**: recuperar el dominio forzafc.com.mx (está libre en NIC México y sigue impreso en sus lonas) · teléfono y WhatsApp oficiales · precios de todos los planes · fotos de clases, fachada y coaches · permiso para usar las reseñas · reclamar la ficha de Google (hoy sin reclamar, sin teléfono ni web) · link de cobro. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | |
| F | footer | Contacto real | Rayo + FORZA, Colosio 605, 449 153 8877, FB e IG con SVG, "Muestra de diseño hecha por KREVO con las fotos públicas de Forza Fitness Club." | |

Ritmo: 1 foto + título · 2 tienda de planes · 3 tablero de horario · 4 foto a sangre + rayo + etiquetas · 5 ficha + mapa · 6 casillero.

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Barra de carga del header. Celda de la próxima clase con pulso (opacidad 1 ↔ .6, 1.2 s). Rayo que se llena con el scroll (reversible). Casilleros entran con 12 px (una vez). Sin pin, sin cortinas, sin video de IA, sin cinta de medir, sin confeti.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy (el clip del rayo va sobre un SVG, no sobre img); fotos que venden sin lazy.

## Fotos
- Grandes reales: `maps-01.jpg` (2048), `maps-04.jpg` y `maps-03.jpg` (1600, oscuras: subir exposición y contraste con PIL, sin inventar nada), `fb-01.jpg` (arte propio). NO usar maps-05 (caras de socios), maps-06 ("no hay agua"), ni ninguna `ig-*` como foto (son gráficos con texto; ig-01 solo como fuente del horario, ig-12 como fuente del precio).
- Nada de IA ni de stock. Sin caras de socios.
- og:image 1200x630 con PIL: maps-01 con velo + rayo + "Sin excusas. Solo resultados."

## Lo que NO va
- Los precios como definitivos (Gold lleva "desde"); horario 24 h (es falso); el teléfono 449 138 3026 (solo directorios; va en PENDIENTES); las reseñas negativas y las palabras de su descripción de Facebook "los mejores entrenadores / las mejores instalaciones" en títulos (R6); TikTok; contadores; rejilla de íconos; más de 5 verdes; naranja; cortinas.

## PENDIENTE-DUEÑO
WhatsApp oficial · correo · horario vigente · precios de todos los planes y qué incluye cada uno · qué significa "3x4 meses" · horarios de las demás clases · fotos de clases, fachada, coaches y guardería · plantilla de coaches · recuperar forzafc.com.mx · reclamar Google Maps · permiso de reseñas.
