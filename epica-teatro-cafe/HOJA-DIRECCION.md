# Épica / Comida Teatro Café · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/resenas.md` y los posters en `research/fotos/`. Lo que no esté ahí, no va.

## El TRABAJO de la página
Apartar asientos para una función: **función → cuántos lugares → WhatsApp 449 157 7858** (`https://wa.me/524491577858?text=...`). Es un negocio de eventos: la página vende boletos y llena la sala (38 a 80 lugares). Todo lo demás existe para eso.

## La promesa (solo Épica la puede decir)
"Comida, teatro y café en Allende 333." Café-teatro desde 2015, se incendió el 24 de junio de 2024 y volvió. Aquí hay función cada semana: stand-up los miércoles, teatro experimental los jueves, teatro viernes y sábado, teatro infantil y música los domingos. Mesas con nombre de obra, meseros que son actores.

## Identidad
- Lienzo **negro humo `#0b0a0a`** en toda la página. Color de marca **rojo telón `#b3121f`** (botones de navegar, titulares a dos tonos, líneas). Dorado viejo `#c9a24a` SOLO para las luces de la marquesina y estrellas. Crema papel `#f1e7d2` solo en la carta y el boleto.
- Botones de navegar: rojo sólido, rectangulares (radio 2 px), chicos, mayúsculas espaciadas ("VER CARTELERA", "CÓMO LLEGAR"). Secundario contorno rojo. Terciario texto con flecha. **VERDE `#25D366` SOLO** en "Apartar por WhatsApp" (el que de verdad abre wa.me) y en el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Fraunces** 900 con `opsz` alto e itálica en la segunda línea; cuerpo **Manrope** 400/600; fechas, horas y precios en **Courier Prime** (tipo boleto de taquilla).
- Logo real: sacar del poster `research/fotos/ig-01.jpg` (esquina superior izquierda: "Épica" serif con hoja y "COMIDA + TEATRO + CAFÉ"); recortar con PIL y limpiar fondo; si no queda limpio, componer el nombre en Fraunces con una hoja SVG chica y anotar en PENDIENTES que falta el logo en alta. Favicon: la "É" roja.

## Lenguaje de formas propio: TAQUILLA Y PROGRAMA DE MANO
- Marcos de foto con borde crema de 6 px y esquina cortada a 45° (como poster pegado). Nada de radios grandes, nada de boletos con muescas (eso es de Hodo).
- Divisores: línea de "luces de marquesina" (fila de puntos dorados de 4 px, algunos apagados).
- Fechas como sello de taquilla: `SÁB 19 · 22:00` en Courier Prime dentro de un rectángulo crema girado 2°.
- Reseñas como "críticas" del programa de mano: comillas rojas grandes, nombre en versalitas, estrellas doradas.

## Header propio: LA MARQUESINA
- Barra negra fina (56 px) con una hilera de foquitos dorados en el borde inferior que se prenden en secuencia una sola vez al cargar (1.2 s) y luego titilan muy suave (uno cada 3 s). Logo centrado. Izquierda: "CARTELERA" (link rojo). Derecha: "RESERVAR" (botón rojo fino, baja a la sala) + hamburguesa.
- Al bajar se compacta a 48 px y los foquitos marcan el avance del scroll (se van apagando de derecha a izquierda). Reversible.
- Menú hamburguesa a pantalla completa en rojo telón con letras crema: Cartelera · Apartar · La sala · Historia · Dónde · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): EL PLANO DE LA SALA
Sección `30-sala`. Un plano de la sala dibujado en SVG: escenario arriba (arco rojo) y **38 lugares** en 5 filas curvas (mesitas redondas de 2 y 4 sillas, como café-teatro; no butacas de cine). La persona:
1. Elige la función (fichas con las funciones reales de `research/hechos.md`; la elegida se escribe en el boleto).
2. **Toca los lugares que quiere** (se prenden en rojo con un "clic" de 120 ms; cuenta arriba: "3 lugares"). Aviso chico: "Los lugares son referencia: el equipo te confirma la mesa por WhatsApp."
3. Botón VERDE "Apartar por WhatsApp" que manda: `Hola Épica, quiero apartar 3 lugares para "Off Shakespeare" el vie 26 sep 21:00. Nombre: ___` (omitir renglones vacíos).
Funciona sin JS de animación (fichas y contador siempre usables). Guarda en `localStorage` `ep_boleto`. El boleto se ve en celular en una sola pantalla y media. Emite `epica:funcion` para que el header muestre "HOY: …" si aplica.

## Momento firma: "SE ABRE EL TELÓN"
Hero: un telón rojo (dos mitades con pliegues dibujados con `repeating-linear-gradient`, sin imagen) cubre la pantalla y **se abre una sola vez al cargar** (1.1 s, `translateX` a los lados, `ease-in-out`), dejando ver el muro de posters reales y el título. No está ligado al scroll y no se repite entre secciones (Emanuel rechazó las cortinas de color entre secciones; esto es EL telón del teatro, una vez, en el hero). Con `prefers-reduced-motion` o sin JS el telón ya está abierto. Blindaje: a los 1.6 s el telón está abierto pase lo que pase.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-telon` (hero) | Enseñar de inmediato qué es y qué hay HOY | Telón que se abre. Fondo: muro de posters reales (6 posters de `research/fotos` pegados con leve giro, oscurecidos al 55 %). Título que cae y pega, a dos tonos: **"Comida, teatro / y café."** (segunda línea itálica roja). Debajo, en Courier Prime, la línea **"HOY EN ÉPICA"** calculada con el día real del visitante y la programación por día (mié stand-up · jue teatro experimental · vie y sáb teatro · dom teatro infantil y música · lun y mar: "Descansamos. Nos vemos el miércoles."). Botón rojo "VER CARTELERA" (baja). Sin verde aquí. | posters reales |
| 2 | `20-cartelera` | "¿Quieres esto?": el producto a la vista | **Cartelera de la temporada** con los posters REALES como tarjetas grandes (1 columna en celular, cada poster a 60 svh; 3 en compu, swipe horizontal): Off Shakespeare · La Herencia · Gigoló de vampiros · Jean de Blues · Los Cuentos de Mariquita · La Pau Durán · Poesía Eviterna · Noche de poesía. Cada una con sello de taquilla (día y hora reales), precio real en Courier ("$250 · incluye 1 bebida", "Cooperación $50", "Niños $50 · Adultos $100", "Entrada libre") y link con flecha "Apartar" que baja al plano con esa función elegida. Título: **"Cartelera de / septiembre."** Nota chica: "Funciones publicadas en su Instagram; la de octubre se actualiza con el dueño." 0 botones verdes. | posters reales |
| 3 | `30-sala` | El trabajo de la página | El plano de la sala (componente firma) + boleto + botón verde. Título: **"Aparta tu / lugar."** | sin foto: SVG del plano sobre negro |
| 4 | `40-fenix` | Por qué este lugar y no otro | Foto a sangre 70 svh: collage oscuro de 3 posters con velo rojo al 30 %. Encima, a dos tonos: **"Nos quemamos el 24 de junio de 2024. / Volvimos."** Debajo, texto corto (3 líneas máx.): desde 2015, Marcela Morán y Arte Escénico El Ombligo, sala de 38 a 80 lugares, mesas con nombre de obra, meseros actores, espresso "Grotowski". Luego 3 "críticas" del programa de mano (reseñas literales de `resenas.md`: Enrique Vicente, Mon Méndez, Majo Sánchez) y el dato **"4.6 en Google · 297 opiniones"** en Courier, chico, con link a Maps. Sin contadores, sin rejilla de íconos. | collage de posters |
| 5 | `50-allende` | Que lleguen | **"Allende 333, / Barrio de San Marcos."** Programación por día como cartel de taquilla (MIÉ Stand-up · JUE Teatro experimental · VIE Teatro · SÁB Teatro · DOM Teatro infantil y música), horario "Miércoles a domingo, 16:00 a 00:00", mapa embebido (Google Maps iframe con la dirección), botón rojo "CÓMO LLEGAR", teléfono con `tel:`, correo. Facebook e Instagram con logotipo SVG 44 px. | mapa en marco de poster |
| 6 | `60-cierre` | Último empujón + siguiente paso de la venta | Boleto ya lleno con lo que eligió: **"Tu boleto / ya casi está."** + botón verde "Apartar por WhatsApp". Si no eligió: "Falta elegir función." con link que sube. Debajo, en la misma sección, **"Todo listo para completar"** (renglones tipo programa de mano, de PENDIENTES): carta con precios · cartelera de octubre · logo en alta · fotos del interior y del escenario · cuál teléfono es el de reservas · link de cobro para anticipos. Luego "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." (NUNCA un wa.me del propio negocio aquí). | poster elegido |
| F | footer | Contacto real | Logo, Allende 333, WhatsApp 449 157 7858, correo epica.comidateatrocafe@gmail.com, FB e IG con SVG. Línea: "Muestra de diseño hecha por KREVO con la cartelera pública de Épica." | |

Ritmo: 1 telón + posters · 2 catálogo de posters · 3 herramienta (plano) · 4 foto a sangre + críticas · 5 cartel tipográfico + mapa · 6 boleto. Nunca dos seguidas con eyebrow-título-párrafo-botón.

## Movimiento (corto, reversible, con razón)
- Telón una vez al cargar. Foquitos de marquesina. Títulos que caen 40 px y pegan (500 ms, por palabra). Lugares que se prenden al tocar. Posters de la cartelera entran con leve giro (una vez, 400 ms). Nada de pin, nada de cortinas entre secciones, nada de video de IA, nada de cinta de medir.
- Blindaje anti-blanco: todo `[data-reveal]` aparece a los 1.6 s aunque falle IO; sin `scroll-behavior: smooth` en html; sin clip-path sobre img lazy; las fotos que venden sin `loading="lazy"`.

## Fotos
- Solo hay posters de 640 px (`research/fotos/ig-01..12`). Se usan COMPLETOS (con marco) o como muro/collage oscurecido; nunca a sangre solos (son chicos). Subir x4 con Real-ESRGAN (`~/Prospeccion-Web-Ags/tools/realesrgan`, `-s 4`, luego bajar con PIL) los 3 que van grandes: ig-03 (Gigoló, vertical), ig-04 (La Herencia), ig-09 (La Pau Durán). Exportar a webp con srcset 480/960.
- Cero imágenes de IA. Si hace falta ambiente, se usa el muro de posters.
- og:image 1200x630 con PIL: muro de posters oscurecido + "Comida, teatro y café. Allende 333."

## Lo que NO va
- Precios de la carta (no existen públicos), horario de mexicoescultura (09:00-21:00, viejo), teléfonos de los posters como principal (van solo en PENDIENTES), nombres de novios ni actores que no estén en los posters, contadores, rejilla de tarjetas con ícono, más de 6 botones verdes, palabras prohibidas de R6 en títulos, cortinas de color entre secciones, Seedance/Kling/GPT Image.

## PENDIENTE-DUEÑO (va también en "Todo listo para completar")
Carta con precios · cartelera de octubre · logo en alta · fotos de interior, escenario, comida y fachada · teléfono oficial de reservas (449 157 7858 vs 449 286 5967) · link de cobro · si venden boletos anticipados.
