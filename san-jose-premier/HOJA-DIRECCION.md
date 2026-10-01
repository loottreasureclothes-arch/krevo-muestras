# Constructora San José Premier · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: en esta tanda hay otra muestra azul (Brillantes Inicios: azul rey, amarillo, redonda, Fredoka) y otra con cotas de plano (JAS INOX). Esta es **azul marino y dorado, serif, de líneas rectas, con ladrillo**; nada de amarillo, nada de formas redondas, nada de cotas.

## El TRABAJO de la página
Que alguien que busca casa pida información y agende visita: **qué busca (una planta, dos plantas, terreno) → con qué crédito → WhatsApp 449 155 2309** (`https://wa.me/524491552309?text=...`; es el que ellos publican en Instagram, TikTok y cada video). Hoy venden por TikTok pidiendo "comenta la palabra Sur": la página les da un lugar donde el interesado ve los modelos y manda sus datos.

## La promesa (solo ellos la pueden decir)
**"Casas al sur de Aguascalientes."** Constructora desde 2000 (RFC CSJ000316...), casas terminadas de una y dos plantas, casas con terreno excedente y terrenos; "Aceptamos crédito Infonavit, Fovissste o crédito hipotecario" (literal de su video); fraccionamiento Bosques Providencia; "Por estas razones es mejor construir con ladrillo" (título de su video). Bio literal: "Invierte en tu hogar con expertos".

## Identidad
- Lienzo **azul marino `#12283f`** (de su portada de Bosques Providencia `#1D405F`, más profundo) en hero, bandas y cierre; **blanco cal `#f4f1ea`** (el de sus fachadas) para fichas de modelo y formulario. Color de marca **azul `#0A559C`** en botones de navegar y titulares a dos tonos sobre claro; sobre el marino la segunda línea va en **dorado `#AF9658`** (de su submarca). Gris piedra `#8d9298` (el bloque gris de sus fachadas) en filetes. NADA de amarillo, naranja ni rojo ladrillo como color de interfaz (el ladrillo aparece solo dibujado en el momento firma, en terracota apagado `#9c5a44`).
- Botones de navegar: azul sólido, rectos (radio 0), con una línea dorada de 2 px abajo, mayúsculas espaciadas ("VER MODELOS", "CÓMO LLEGAR"). Secundario contorno. **VERDE `#25D366` SOLO** en "Pedir información por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **DM Serif Display**; cuerpo **DM Sans** 400/600; medidas (m²) en **DM Sans** 700 tabular. Nada de Fraunces, Abril, Anton, Fredoka, Barlow ni Bricolage.
- Logo real: `research/fotos/logo-tiktok.jpg` (200 px, "SNjp" azul y plata). Es chico: usarlo a 44–56 px en header y footer sobre disco blanco; también aparece nítido en `fb-cover-bosques-providencia.jpg` (recortarlo de ahí si sale más limpio). No estirarlo. Favicon: recorte del logo.

## Lenguaje de formas propio: FACHADA
- Sus casas son una caja blanca con un **bloque de piedra gris** y marco en "L". Toda tarjeta importante repite eso: rectángulo blanco cal con una franja vertical gris piedra a la izquierda (12 px) y un marco en L dorado fino en la esquina superior derecha.
- Ventanas: las fotos van en marcos rectos con un travesaño fino (como ventanal de su fachada) solo en galerías chicas.
- Divisores: hilada de ladrillos (una fila de rectángulos en aparejo, 10 px de alto, en gris sobre marino).
- Nada de radios, nada de cotas, nada de píldoras.

## Header propio: EL NÚMERO DE LA CASA
- Barra marino de 60 px con una línea dorada abajo. Izquierda: disco blanco con el logo + "San José Premier" en DM Serif Display. Derecha: botón azul "VER MODELOS" + hamburguesa. En compu, al centro, "DESDE 2000" como placa de número de casa (rectángulo dorado fino con tipografía serif).
- Al bajar se compacta a 50 px y la línea dorada se vuelve una hilada de ladrillos que se va poniendo con el avance del scroll (reversible).
- Hamburguesa a pantalla completa marino con letras blanco cal: Modelos · Ladrillo · Bosques Providencia · Crédito · Oficinas · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): UNA PLANTA O DOS
Sección `20-modelos`. Un **interruptor grande de dos posiciones** ("UNA PLANTA | DOS PLANTAS") que cambia en su lugar, con cruce de 250 ms y sin brincar de alto: la foto real del modelo, su ficha de medidas reales y una silueta de la casa dibujada en línea (SVG) a la que **le sube o le baja el segundo piso**.
- Una planta: modelo **Granada**, construcción 88.91 m², terreno 129.50 m².
- Dos plantas: construcción 130.36 m², terreno 141.75 m² (7 x 20.25 m).
- Debajo, dos fichas fijas más: **Casa con terreno excedente** y **Terrenos al sur de Aguascalientes** (sin medidas: "Pregunta disponibilidad").
- Ningún precio: todas dicen "Pregunta el precio". Cada ficha tiene "Me interesa" (azul contorno) que la guarda para el mensaje. Recámaras y baños NO se ponen (no están confirmados) salvo que se lean claramente en sus planos publicados (`fb-02`, `fb-04`, `fb-05`: si el plano rotula los espacios, se puede decir "según su plano publicado").

## Momento firma: "LADRILLO POR LADRILLO"
Sección `30-ladrillo`. Sobre marino, la fachada de su casa de dos plantas dibujada en SVG con **ladrillos que se van colocando hilada por hilada ligados al scroll** (cada ladrillo aparece con 60 ms de desfase dentro de su hilada; el avance de la sección decide cuántas hiladas hay; reversible, sin pin). Al completarse, el muro se "aplana" en blanco cal con el bloque gris (como sus casas terminadas) y cae el titular a dos tonos **"Construimos / con ladrillo."** Al lado, foto real de obra en proceso (de sus videos). Con reduced-motion la casa ya está terminada.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Qué venden y dónde, de inmediato | Foto real grande de una casa terminada (cuadro limpio sacado de sus videos, ver Fotos; respaldo `fb-01.jpg` 1364x800) 70 svh con velo marino abajo. Título que cae y pega: **"Casas al sur / de Aguascalientes."** (segunda línea dorada). Línea: "Constructora desde 2000 · Infonavit, Fovissste o hipotecario". Botón azul "VER MODELOS" + link con flecha "Pedir información". Sin verde. | casa terminada real |
| 2 | `20-modelos` | "¿Quieres esto?": producto a la vista | Componente firma + 2 fichas. Título: **"Una planta / o dos."** 0 verdes. | fotos reales de cada modelo |
| 3 | `30-ladrillo` | Por qué con ellos | Momento firma + foto de obra. Una línea: "Tú ves la obra en sus videos: 36 en TikTok, uno con 276 mil vistas." (dato real) con link a su TikTok. | obra en proceso real |
| 4 | `40-bosques` | El fraccionamiento con nombre | Foto aérea de dron a sangre 70 svh (cuadro limpio de sus videos) con **"Bosques / Providencia."** y el dato en DM Sans: "16 casas de un nivel con licencia municipal del 10 de julio de 2024. Zona sur, calle Bosque Las Cañadas." Si hay render de su portada, va chico con etiqueta "Render". Link con flecha "Quiero información de Bosques Providencia". | aérea real |
| 5 | `50-credito` | El trabajo de la página | **"Dinos con qué / crédito compras."** Formulario corto sobre blanco cal: qué buscas (lo elegido arriba) · crédito (Infonavit · Fovissste · Hipotecario · Contado · No sé todavía) · nombre. Botón VERDE "Pedir información por WhatsApp": `Hola San José Premier, me interesa una casa de dos plantas (130.36 m² de construcción). Compro con: Infonavit. Me gustaría agendar una visita. Mi nombre: ___` (omitir vacíos). Al lado, oficinas como fichas de fachada: **Oficina** Av. Universidad 815 int. 202, Edificio Baker, Bosques del Prado Sur · 449 914 6200 · **Ventas** Av. Mahatma Gandhi 607A, Centro de Abastos · 449 977 1717; mapa embebido de la oficina, botón azul "CÓMO LLEGAR". TikTok, Instagram y Facebook (Bosques Providencia) con logotipo SVG 44 px. Horario NO va (no publicado). SIN estrellas ni reseñas (no hay reseñas positivas con texto). | mapa en marco |
| 6 | `60-cierre` | Último empujón + siguiente paso | Ficha de fachada con lo elegido: **"Tu casa / ya tiene plano."** (si no eligió: "Falta elegir modelo.") + botón verde. Debajo, misma sección, **"Todo listo para completar"**: precios por modelo · recámaras, baños y acabados · fotos limpias de fachadas e interiores (hoy solo hay portadas de video con letras) · lista de fraccionamientos entregados · horario y quién atiende · si hacen casas a la medida en terreno del cliente · el dominio constructorasanjosepremier.com (está libre; los directorios lo anuncian) · link de cobro para apartados. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | |
| F | footer | Contacto real | Logo, las dos direcciones y teléfonos, correo csjp@outlook.com, redes con SVG, "Muestra de diseño hecha por KREVO con los videos y fotos públicas de Constructora San José Premier." | |

Ritmo: 1 foto + título · 2 interruptor con fichas · 3 SVG que se construye + foto · 4 foto a sangre con dato · 5 formulario + oficinas · 6 ficha.

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Hilada de ladrillos del header. Interruptor una/dos plantas (250 ms). Ladrillos ligados al scroll. Sin pin, sin cortinas, sin video de IA, sin cinta de medir ni cotas.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos (lo más delicado de esta página)
- Las fotos bajadas (`research/fotos/tt-*.jpg`) son PORTADAS de video con letras encima: no sirven tal cual. **Saca cuadros limpios de sus videos públicos de TikTok**: `yt-dlp` (está en `~/.local/bin/yt-dlp`) con las URLs de los videos de @const.sanjosepremier (las IDs están en research/hechos.md y fuentes.md; también `yt-dlp --flat-playlist -J https://www.tiktok.com/@const.sanjosepremier` para listarlos), baja 6 a 10 videos a una carpeta `_work/` (no se publica: agrégala a un `.gitignore` de la carpeta), y con `ffmpeg` extrae 1 cuadro por segundo; elige con Read (hoja de contacto) los cuadros SIN texto encimado, sin caras en grande y bien expuestos: fachada de dos plantas, fachada de una planta, patio/terreno excedente, dron sobre el fraccionamiento, obra de ladrillo en proceso, y si existe algún interior. Guarda los elegidos en `img/` (webp, srcset 480/960/1600) y anota en IMAGENES.md de qué video y segundo salió cada uno. Si yt-dlp falla con TikTok, usa el plan B: recortar de las portadas la parte sin letras (arriba o abajo) o quitar las letras con `cv2.inpaint` solo si queda limpio; si nada queda digno, foto en marco chico + marcador honesto "Foto pendiente de la constructora".
- `fb-01.jpg` (1364x800, fachada terminada real) y `fb-cover-bosques-providencia.jpg` (render, etiqueta "Render") sí se pueden usar.
- Personas: las mujeres que salen en sus videos no van en grande (no sabemos quiénes son).
- Nada de IA ni stock. og:image 1200x630 con PIL: casa real con velo marino + logo + "Casas al sur de Aguascalientes."

## Lo que NO va
"Casas a la medida" (no lo publican), precios, el "desde $2,600,000" de un portal, recámaras y baños sin confirmar, "Las mejores casas" (R6), reseñas y estrellas (la ficha con 3.9 tiene quejas), el correo personal de hotmail de la página de Facebook, nombres de personas, 101-250 empleados, contadores, rejilla de íconos, más de 5 verdes, amarillo, formas redondas, cotas.

## PENDIENTE-DUEÑO
Precios · recámaras y baños · fotos limpias e interiores · fraccionamientos entregados · horario y dirección de atención · quién sale en los videos · casas a la medida sí/no · dominio · link de cobro · responder las reseñas de la ficha de Centro de Abastos.
