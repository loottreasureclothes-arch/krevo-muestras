# Mr. MICHEvy · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md` (la sección "2a pasada" manda), `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: ya existen Forza (negro y rojo inclinado, tablero), Épica (negro y rojo telón, foquitos) y La Cantina de Antaño (café tabaco, reloj del 2x1). Esta es **negro cálido con el DORADO de su logo y rojo chile del escarchado, letra ancha de fiesta y la letra a mano de sus frases**. Nada de neón, nada de tarros de cerveza dibujados, nada de marcas de cerveza, nada de reloj ni tablero, nada inclinado.

## El TRABAJO de la página
Que alguien que tiene una fiesta cotice la barra en 1 toque: **qué evento → cuántos invitados → qué día → dónde → WhatsApp** al 449 552 0336 (`https://wa.me/524495520336?text=...`; confirmado: su bio dice "Cotizaciones whats 4495520336"). Hoy no tiene página: todo entra por mensajes de TikTok.

## La promesa (solo él la puede decir)
**"Tú pones el evento. Yo pongo la barra."** Es su frase literal: «Tú pones el evento y yo pongo la barra de micheladas». Él lleva barra, hielo, vasos, ingredientes y servicio; el cliente trae la cerveza («Nosotros no vendemos la cerveza, ellos la traen y aquí se la ponemos»). 43.8 mil seguidores en TikTok. Ya hizo una boda de 200 preparados, dos eventos el mismo día, posadas, bautizo, rancho y la Feria Nacional de San Marcos 2026.

## Identidad
- Lienzo **negro cálido `#140E0E`** con bandas `#1E1614`. Color de marca **dorado del logo `#C09D1A`** (botones de navegar con texto negro, segunda línea de titulares, aros). **Rojo chile `#B3261E`** solo para el escarchado y detalles chicos. Texto **crema `#DBD6C4`**. Una sola banda clara crema en toda la página (el preparado a domicilio), con tinta negra. Nada de naranja, neón ni amarillo limón.
- Botones de navegar: dorado sólido, rectos con esquina de 3 px, texto negro en mayúsculas anchas ("COTIZAR MI EVENTO", "VER LA BARRA"), y arriba un **filo escarchado** (franja de 5 px de granitos rojo chile, SVG de ruido de puntos). Secundario: contorno dorado. **VERDE `#25D366` SOLO** en "Cotizar por WhatsApp", "Pedir por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Bricolage Grotesque** 800 (ancho condensado `font-stretch: 85%`, mayúsculas, interlineado .92); cuerpo **Bricolage Grotesque** 400/500; las FRASES LITERALES de él van en **Caveat** 700 (letra a mano, como la de su logo), siempre entre comillas angulares. Números en Bricolage 800 tabular. Nada de Anton, Barlow, Archivo, Fraunces, Abril ni Permanent Marker.
- Logo real: `logo-fb.jpg` (2048 px): el aro dorado con el vaso de bigote. Úsalo tal cual (recorte circular, sin redibujar la mascota). Favicon: el logo reducido. En header a 44 px.

## Lenguaje de formas propio: EL ARO Y EL ESCARCHADO
- **El aro**: círculos y arcos dorados de 2 px tomados de su logo. Las fotos de producto van en marco recto con UNA esquina mordida por un cuarto de aro dorado; los datos grandes van dentro de un aro.
- **El escarchado**: el borde superior de los contenedores importantes lleva una franja irregular de granitos rojo chile (SVG de puntos de 1 a 3 px con densidad desigual, como chile en polvo pegado al vaso). Divisores: una línea de escarchado de lado a lado, 14 px de alto.
- Etiquetas de foto: **calcomanía redonda** (círculo crema de 64 a 88 px con texto en curva o en dos renglones, giro de -8°): "BODA · 200 PREPARADOS", "EN RANCHO", "A DOMICILIO".
- Prohibido: tarros, botellas, burbujas, limones dibujados, gotas, marcas de cerveza o refresco.

## Header propio: LA FRASE DEL DÍA
- Barra negra de 60 px con filo de escarchado abajo. Izquierda: logo circular real + "mr. MICHEvy". Derecha: botón dorado "COTIZAR" + hamburguesa. En medio (en celular, en una segunda línea delgada de 26 px que se esconde al bajar): **una frase literal de él en Caveat que va cambiando cada 5 s** con un cruce de 300 ms, entre comillas angulares: «Estamos a la orden pal' desorden» (recorte literal de "Los viernes, sábado y domingo estamos a la orden pal' desorden") · «Cotízame es una señal» · «La mejor barra en tu mejor fiesta» · «Y nosotros encantados de estar en sus eventos» · «¡SALUUUUUD!». Con reduced-motion se queda la primera.
- Al bajar se compacta a 50 px. Hamburguesa a pantalla completa negra con ligas en Bricolage 800 crema: La barra · Cotizar · Eventos · A domicilio · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): LLENA EL VASO
Sección `30-vaso`, el cotizador. Un **vaso grande en SVG** (el vaso recto de sus fotos, con su calcomanía del logo real al frente) que se va llenando conforme el visitante contesta, de abajo hacia arriba:
1. **¿Qué evento es?** fichas: Boda · XV años · Cumpleaños · Posada · Bautizo · Empresa · Otro (texto). Al elegir caen los **hielos** (4 cubos, 300 ms).
2. **¿Cuántos invitados?** deslizador de 30 a 300 de 10 en 10 con el número grande ("120 invitados"; en el tope "300 o más"). Al moverlo sube el **líquido** (rojo ladrillo de michelada, con una onda suave en la superficie) hasta la mitad del vaso.
3. **¿Qué día?** `input type=date` (mínimo hoy). Al elegir, el líquido sube a tres cuartos.
4. **¿Dónde?** fichas: Salón · Jardín · Rancho · Casa · Otro, más campo "Colonia o municipio" opcional. El vaso se llena.
Con los cuatro datos: el borde del vaso **se escarcha** (los granitos rojos aparecen recorriendo el borde, 500 ms) y cae la **pajilla**; el estado dice "Vaso lleno. Listo para cotizar." Nombre opcional. Botón verde "Cotizar por WhatsApp" con: "Hola Mr. MICHEvy, quiero cotizar la barra de micheladas. Evento: boda. Invitados: 200. Fecha: 15 de noviembre de 2026. Lugar: salón, Jesús María. Mi nombre: Ana". Renglones vacíos se omiten; sin nada: "Hola Mr. MICHEvy, quiero cotizar la barra de micheladas para un evento."
A un lado del vaso, el **resumen** se escribe solo. Nota fija: "Tú traes la cerveza. Él pone la barra, el hielo, los vasos, los ingredientes y el servicio." y «puedes cotizar por tu presupuesto y necesidad» (cita literal). Sin precios ni paquetes. Persiste en sessionStorage; el cierre lo repite. Sin JS: formulario simple y el botón.
El llenado no es decorativo: cada nivel corresponde a un dato; si borra un dato, baja.

## Momento firma: ASÍ LLEGA, ASÍ QUEDA
Sección `20-barra`. Dos fotos reales del mismo objeto: `boda-traslado-barra-techo-auto.jpg` (la barra plegada en el techo del auto) y `rancho-barra-con-hielera.jpg` (la barra montada con su logo dorado). Van encimadas en el mismo marco y **el scroll corre un barrido circular** (un aro dorado que crece desde el centro: adentro del aro se ve "así queda", afuera "así llega"); al entrar se ve la barra en el techo, al pasar la mitad ya está montada. rAF, reversible, sin pin, sin GSAP; el aro es `clip-path: circle()` sobre un contenedor, no sobre la img lazy. Rótulos que cambian: "ASÍ LLEGA" → "ASÍ QUEDA". Con reduced-motion o a los 1.6 s sin scroll: se ve "así queda" con una miniatura de "así llega" al lado.
Recorta `rancho-barra-con-hielera` para que no se lea la marca de la hielera ni se vea la cara de la persona.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | El producto, de inmediato | Cartel: `vaso-con-logo-sobre-barra.jpg` (su vaso con logo, borde de chile y pajilla) a dos tercios de pantalla, con velo negro abajo. Título: **"TÚ PONES EL EVENTO. / YO PONGO LA BARRA."** (segunda línea dorada). Línea: "Barra de micheladas para eventos en Aguascalientes." Dato en aro: "43.8 mil seguidores en TikTok". Botón dorado "COTIZAR MI EVENTO" + link "Ver la barra". Sin verde. En compu: foto a la derecha en vertical; si a 1440 se ve blanda (viene de video subido), úsala a máximo 460 px de ancho y deja el título mandar. | vaso-con-logo |
| 2 | `20-barra` | "¿Quieres esto en tu fiesta?" | **"ASÍ LLEGA. / ASÍ QUEDA."** Momento firma. Debajo, lista tipográfica en dos columnas: ÉL PONE: la barra · el hielo · los vasos · los ingredientes · el servicio. TÚ PONES: la cerveza, con la cita «Nosotros no vendemos la cerveza, ellos la traen y aquí se la ponemos». Foto `barra-logo-de-frente.jpg` mediana y `mesa-ingredientes-tarros-chiles.jpg` chica con calcomanía "CONDIMENTOS HECHOS POR ÉL" (él dice que sus condimentos son elaborados "100% por Mr. Michevy"). 0 verdes. | las dos del barrido |
| 3 | `30-vaso` | El trabajo de la página | Componente firma + botón verde. Título: **"LLENA EL VASO. / COTIZA TU FIESTA."** | vaso SVG |
| 4 | `40-eventos` | Prueba real de que sí lo hace | **"BODAS, POSADAS / Y HASTA LA FERIA."** Renglones grandes con lo que muestran sus videos (hechos, no adjetivos): "Una boda de 200 preparados." · "Dos eventos el mismo día." · "Posadas, bautizos y cumpleaños." · "Un rancho con equipo de tres." · "Michelada Fest." · "Feria Nacional de San Marcos 2026." Fotos reales con calcomanía: `rancho-equipo-armando-bar` o `rancho-sirviendo-micheladas` (donde sale él, el barbado; recorta a los ayudantes si se les ve la cara de frente), `boda-despachadores-vasos-escarchados` (chica, es oscura), `feria-michelada-fest-carpa` (chica; recorta la marca de refresco de la carpa). Dato: "585 mil likes en TikTok" y link "Ver sus videos" a https://www.tiktok.com/@mr.michevy1 con logotipo SVG. Sin estrellas ni reseñas (no tiene). 0 verdes. | rancho |
| 5 | `50-domicilio` | Segundo producto | Banda crema. **"EL PREPARADO DE 2.5 LITROS, / A TU CASA."** "Entrega sin costo de envío en Aguascalientes." Fotos `michelada-escarchada-tajin-mano.jpg` (grande, solo manos) y `reparto-caja-logo-tapa-verde.jpg` o `reparto-moto-caja-logo.jpg` (mediana, tapa la placa de la moto si se lee). Lo que lleva, como se ve en sus videos: borde de chile, chamoy, pajilla de tamarindo, fruta. "Horario y precio: pregúntalos." Botón verde "Pedir por WhatsApp" ("Hola Mr. MICHEvy, quiero pedir un preparado de 2.5 L a domicilio."). 1 verde. | michelada en mano |
| 6 | `60-cierre` | Último empujón + siguiente paso | Foto grande `michelada-preparada-garnish.jpg` o la del vaso, con la frase en Caveat enorme: «Tu salud es nuestra prioridad, así es que ¡SALUUUUUD!» y debajo el resumen del vaso: **"TU VASO / YA ESTÁ LLENO."** (sin datos: **"FALTA LLENAR / EL VASO."** con link al cotizador) + botón verde. Antes del remate, **"Todo listo para completar"** (renglones con filo escarchado): confirmar que sigue haciendo eventos en 2026 · precios o paquetes por número de invitados · su nombre · fotos fijas de eventos · carta de sabores con nombre · zona que cubre y si cobra traslado · dónde está el puesto hoy y su horario · link de cobro para anticipos. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | michelada |
| F | footer | Contacto real | Negro: logo, "Barra de micheladas · Aguascalientes", WhatsApp 449 552 0336, TikTok @mr.michevy1, Instagram @mr.michevy con SVG, "Muestra de diseño hecha por KREVO con los videos públicos de Mr. MICHEvy." | |

Ritmo: 1 cartel con el vaso · 2 dos fotos y un aro que las cambia · 3 vaso que se llena · 4 renglones grandes con fotos y calcomanías · 5 banda crema con producto · 6 foto con frase a mano.

## Movimiento
Títulos que entran por palabra con un golpe corto (cada palabra baja 14 px y asienta, 420 ms, una vez). Frase del header que cambia. Aro del barrido. Vaso que se llena, hielos, escarchado y pajilla. Calcomanías que giran 6° al entrar (una vez). Sin pin, sin cortinas, sin parallax, sin contadores que suben, sin video.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; fotos que venden sin lazy.

## Fotos
- Todas son cuadros de sus videos (1080 px de ancho; 3 de 1440 px vienen de 720 p subido con Real-ESRGAN: `vaso-con-logo-sobre-barra`, `michelada-escarchada-tajin-mano`, `barman-preparando-evento`). Las subidas se ven de plástico si van enormes: mézclalas 50 % con su cuadro original subido con LANCZOS (los videos están en `research/_videos/`; si no encuentras el cuadro exacto, baja la nitidez y agrega grano fino) y no las pintes a más de 460 px de ancho en compu.
- **Tapar o recortar:** marcas de cerveza, refresco, salsas y vasos (hielera, carpa, botellas, "Bioplast"); caras de ayudantes e invitados (él, el barbado, sí puede salir); placa de la moto.
- PROHIBIDAS: `ig-post-feria-envase-2026-05-07.jpg` (gráfico con IA y marca ajena), `puesto-calle-micheladas-carpa.jpg`, `barman-preparando-evento.jpg` a menos que se confirme que es él (no usar), y cualquier cuadro con invitados.
- Nada de IA generativa ni stock. og:image 1200x630 con PIL: el vaso con logo a la derecha, negro, y "Tú pones el evento. Yo pongo la barra." en Bricolage 800 con la segunda frase dorada.

## Lo que NO va
Precios, paquetes inventados, "prueba gratis", descuentos, horario del puesto (es de 2025), ubicación del puesto, nombres de personas (Paola, Brandon), el dueño con nombre, BKFC, "barra libre", marcas de cerveza, «Mi talento es embriagar gente», menores, promesas de disponibilidad ("fechas disponibles"), estrellas, reseñas, "la mejor" fuera de su cita literal, "calidad" y "servicio" en títulos, contadores, rejilla de íconos.

## PENDIENTE-DUEÑO
Si sigue haciendo eventos en 2026 · precios y paquetes · nombre · fotos fijas · carta de sabores · zona y traslado · ubicación y horario del puesto · anticipo y forma de pago.
