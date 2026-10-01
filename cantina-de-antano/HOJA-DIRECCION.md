# La Cantina de Antaño · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: en esta misma tanda hay otra muestra de teatro (Épica) con telón rojo y foquitos de marquesina, y existe La México (cantina, negro y rojo, tipografía western). Esta página NO usa telón, NI foquitos, NI negro con rojo, NI Rye: aquí manda el **cine de la Época de Oro en sepia**.

## El TRABAJO de la página
Apartar mesa en una de sus 4 cantinas: **sucursal → cuántos y a qué hora → (opcional) lo que piensan pedir → WhatsApp** 449 172 1073 (`https://wa.me/524491721073?text=...`; ese número sale de su folleto de Navidad 2024 como "Informes": en PENDIENTES va "confirmar WhatsApp de atención") y, por sucursal, botón de llamar con su teléfono fijo real. Además enseñar la carta completa con precios reales y el 2x1.

## La promesa (solo ellos la pueden decir)
**"Una tradición en Aguascalientes."** (lema impreso en su carta). Desde 2001, 4 cantinas (Colosio, Sta. Anita, Nacozari, J. Pani), "Revive la Época de Oro del Cine" (su Facebook), 2x1 en bebidas todos los días hasta las 9 de la noche, cocteles con nombre de estrellas (Pedro Infante, Cantinflas, Jorge Negrete, Miroslava, María Félix), carrito de 20 cervezas con parrillada, mezcal de marca propia.

## Identidad
- Lienzo **café tabaco `#24100a`** (de su letrero de madera) con bandas `#3D180F`. Papel **crema pergamino `#F5D99C`** para la carta y la ficha de mesa. Color de marca **rojo `#C22D23`** (botones de navegar, titulares a dos tonos, precios destacados). **Oro viejo `#A08C6E`** solo en filetes dobles y perforaciones. El verde neón de sus fachadas NO se usa en la interfaz (se confunde con WhatsApp).
- Botones de navegar: rojo sólido, esquinas de 4 px, filete oro de 1 px por dentro, mayúsculas espaciadas ("VER LA CARTA", "CÓMO LLEGAR"). Secundario contorno crema. **VERDE `#25D366` SOLO** en "Apartar mesa por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter, ni Fraunces, ni Rye): títulos **Abril Fatface** (cartel de cine de época); cuerpo **Lora** 400/600; precios y datos en **Special Elite** (máquina de escribir).
- Fotos: todas con el mismo grado **sepia cálido** (PIL: desaturar 35 %, tinte café, contraste suave) para que interiores de celular, comida y fachadas se vean de la misma película. La comida se deja con más color (desaturar solo 10 %).
- Logo real: `research/fotos/logo-fb-lacantinaags.jpg` (1254 px, circular negro con marco dorado y retratos, "25 Años Contigo"). Se usa COMPLETO, en círculo, en header (44 px) y cierre (180 px). No recortar los retratos ni redibujarlos.

## Lenguaje de formas propio: CELULOIDE Y LOBBY CARD
- **Tira de película**: bandas horizontales con perforaciones rectangulares redondeadas arriba y abajo (dibujadas en CSS con `radial-gradient`/`repeating-linear-gradient`, color oro viejo sobre café). Es el divisor y el marco del carrusel de sucursales.
- **Lobby card**: tarjeta crema con doble filete oro (1 px + 1 px separados 4 px) y esquinas de 4 px, como las tarjetas de vestíbulo de cine; ahí van sucursales y reseñas.
- Créditos de película: listas centradas en versalitas con puntos guía ("PEDRO INFANTE ..... $152").
- Nada de cortinas, telón ni foquitos.

## Header propio: LA TIRA DE PELÍCULA
- Barra café de 60 px con una hilera de perforaciones de celuloide arriba y abajo (6 px). Logo circular a la izquierda + "La Cantina de Antaño" en Abril Fatface. Derecha: botón rojo "APARTAR MESA" + hamburguesa.
- Al bajar se compacta a 50 px y las perforaciones **corren** (se desplazan horizontalmente con el scroll, como película avanzando; reversible).
- Hamburguesa a pantalla completa café con letras crema tipo créditos: La carta · El 2x1 · Las 4 cantinas · Eventos · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): EL RELOJ DEL 2x1
Sección `20-dosxuno`. Un **reloj de pared de cantina** dibujado en SVG (carátula crema, números romanos, aro de madera, manecillas negras) donde el tramo del 2x1 (1:30 p.m. a 9:00 p.m.) está pintado en rojo sobre la carátula. Las manecillas marcan la **hora real de Aguascalientes** (America/Mexico_City vía `Intl.DateTimeFormat`) y se mueven cada minuto. Texto vivo en Special Elite: "Ahorita hay 2x1 en bebidas. Quedan 2 h 10 min." / "El 2x1 empieza a la 1:30 p.m. Faltan 40 min." / "El 2x1 ya cerró por hoy. Mañana a la 1:30 p.m." Letra chica literal de su carta: "No aplica en coctelería ni en los productos marcados." Al lado, a dos tonos: **"2x1 en bebidas. / Hasta las 9."** Sin JS el reloj se ve detenido a las 9 y el texto fijo dice "Todos los días de 1:30 p.m. a 9:00 p.m."

## Momento firma: "EL REPARTO"
Dentro de la carta (`30-carta`), el bloque de coctelería de especialidad se presenta como **créditos de película que suben**: sobre banda café, en Abril Fatface y versalitas, los cocteles con nombre de estrella (Pedro Infante, Cantinflas, Jorge Negrete, Miroslava, María Félix, Mezcalada La Cantina, cada uno $152; Sangría de cantina $127) entran uno por uno ligados al scroll (translateY corto + opacidad, reversible, sin pin), con el encabezado "EL REPARTO". No se usan fotos ni dibujos de los actores (solo su logo los trae).

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Qué es y desde cuándo, de inmediato | Foto real grande del salón con barra (`maps-interior-barra-01.jpg`, 1600 px, sepia) 70 svh con velo café abajo. Título que cae y pega: **"Una tradición / en Aguascalientes."** (segunda línea roja). Línea en Special Elite: "Desde 2001 · 4 cantinas · 2x1 hasta las 9". Botón rojo "VER LA CARTA" + link con flecha "Apartar mesa". Sin verde. | maps-interior-barra-01 |
| 2 | `20-dosxuno` | El gancho que todos mencionan en reseñas | El reloj del 2x1 (componente firma). Debajo una línea: "Carrito con 20 cervezas y parrillada para 4: $1,535." (dato de su carta) con link "Agregar a mi mesa". 0 verdes. | reloj SVG |
| 3 | `30-carta` | Producto a la vista, estilo tienda | **"La carta, / completa."** Chips pegados arriba: Botanas · Carnes · Tacos · Sopas · Infantil · Cervezas · Cocteles · Destilados. Carta tipográfica sobre pergamino con precio real a la derecha y un "+" (rojo contorno, 44 px) que agrega a "Mi mesa". Dos fotos grandes reales intercaladas: `maps-parrillada-fajitas.jpg` (junto a Carnes, con pie "Parrillada norteña · 2 personas $588 · 4 personas $1,026") y `maps-botanas-torre.jpg` (junto a Botanas). Bloque "El reparto" (momento firma) en Cocteles. Destilados: solo una selección de 8 con copa y botella + "Carta completa de destilados en la cantina". Nota: "Precios de su carta publicada; pueden cambiar." Barra fija "Mi mesa · 3" en rojo cuando hay algo. 0 verdes (el verde vive en la hoja de Mi mesa). | fajitas + torre de botanas |
| 4 | `40-cantinas` | Elegir a cuál ir | **"Cuatro cantinas. / Elige la tuya."** Carrusel horizontal con swipe dentro de una tira de película: 4 lobby cards (Colosio · Sta. Anita · Nacozari · J. Pani) cada una con su foto de fachada real, dirección, teléfono con `tel:`, horario real por día, su calificación real ("4.4 · 2,029 opiniones en Google"), estado en vivo "Abierta ahora / Abre a la 1:30 p.m.", y botones rojos "LLAMAR" y "CÓMO LLEGAR". "Elegir esta" la guarda para el mensaje. Colosio lleva "La original, 2001" y "Área infantil · valet parking"; áreas infantiles en Colosio, Nacozari y Sta. Anita (dato de su menú infantil). | fachadas reales |
| 5 | `50-epoca` | Por qué aquí: el concepto y la prueba | Foto a sangre 70 svh (`maps-interior-salon.jpg`, sepia) con **"Revive la Época de Oro / del cine."** (literal de su Facebook). Debajo 3 reseñas literales en lobby cards (Lety Sosa, Zoey Ail, MARCO SOTO) con nombre, estrellas y "Sucursal Colosio". Renglón de eventos: "Salón privado para 120 personas. Paquetes para grupos: te lo cotizamos sin compromiso." (literal de su folleto) con link "Cotizar mi evento" que abre Mi mesa en modo evento. 0 o 1 verde. | maps-interior-salon |
| 6 | `60-cierre` | Último empujón + siguiente paso | Ficha de mesa en pergamino: **"Tu mesa / ya casi está."** con sucursal, personas (− / +), hora (selector de 1:30 p.m. a 11:00 p.m. cada 30 min), nombre y lo agregado de la carta con total ("Total aproximado; se confirma en la cantina"). Botón VERDE "Apartar mesa por WhatsApp": `Hola La Cantina de Antaño, quiero apartar mesa en Colosio para 6 personas hoy a las 8:00 p.m. Pensamos pedir: Parrillada norteña 4 personas, Cubeta de 6 Corona. Nombre: ___` (omitir renglones vacíos). Debajo, misma sección, **"Todo listo para completar"**: WhatsApp de atención confirmado · carta vigente con fecha · fotos profesionales de platillos, cocteles y música en vivo · promos del mes (la de tacos 2x1 fue de septiembre) · cómo quieren recibir reservas por sucursal · link de cobro para anticipos de eventos · dominio propio (hoy solo tienen un Google Sites de imágenes). "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | |
| F | footer | Contacto real | Logo circular, las 4 direcciones y teléfonos, correo la_cantina@hotmail.es, Facebook e Instagram con logotipo SVG 44 px, "Muestra de diseño hecha por KREVO con la carta y las fotos públicas de La Cantina de Antaño." | |

Ritmo: 1 foto + título · 2 reloj · 3 carta tienda con créditos · 4 carrusel en tira de película · 5 foto a sangre + lobby cards · 6 ficha de mesa.

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Perforaciones del header que corren con el scroll. Manecillas del reloj. Créditos de "El reparto" ligados al scroll. Lobby cards entran con 2° de giro (una vez). Sin pin, sin cortinas ni telón, sin foquitos, sin video de IA, sin cinta de medir.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos
- Grandes reales (1600 px): maps-interior-barra-01, maps-interior-salon, maps-parrillada-fajitas, maps-botanas-torre, maps-botanas-mesa, maps-parrillada-tabla. Fachadas: sitio-fachada-jpani (960), sitio-fachada-colosio-noche (1040), sitio-fachada-nacozari-01 (1080), sitio-vista-santa-anita (1280, recortar el texto quemado de abajo) → van en tarjeta con marco, no a sangre. Subir x4 con Real-ESRGAN solo las fachadas si se ven suaves.
- Desenfocar con PIL cualquier cara de cliente que quede reconocible en primer plano. No usar `sitio-interior-jpani` (caras) ni los carteles con texto como foto.
- Nada de IA ni stock. og:image 1200x630 con PIL: salón en sepia + logo circular + "Una tradición en Aguascalientes."

## Lo que NO va
La promo de tacos 2x1 como vigente (fue "todo septiembre"); el correo lacantinante13@hotmail.com y "Colosio 127" (son datos viejos de la base: es 117 y la_cantina@hotmail.es); el nombre del dueño; datos de franquicia (inversión, regalías); reseñas negativas; "botana abundante" (las críticas dicen lo contrario); retratos de actores fuera del logo; contadores; rejilla de íconos; más de 5 verdes; telón; foquitos; negro con rojo.

## PENDIENTE-DUEÑO
WhatsApp de atención · carta vigente y fecha · promos por día y música en vivo (días y horarios) · fotos profesionales · reservas por sucursal · horario real de Nacozari · dominio · link de cobro · si quieren página de franquicias.
