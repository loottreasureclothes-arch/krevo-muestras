# Mascotitlán · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md` (la sección "2a pasada" corrige a la primera), `research/resenas.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: ya existen Vet Inn (placa de collar con siluetas de mascota), Brillantes Inicios (azul rey, amarillo, Fredoka, libreta) y San José Premier (fachada que se construye por hiladas con el scroll). Esta es **"la ciudad de las mascotas", muy mexicana: blanco cal, verde de su fachada, rosa mexicano, letra Chivo gruesa, y todo con ESCALONES DE PIRÁMIDE (su logo es una pirámide)**. Nada de huellitas regadas, nada de siluetas de perro y gato como botones, nada de azul rey, nada de letras redonditas infantiles, nada que se construya ladrillo por ladrillo con el scroll.

## El TRABAJO de la página
Que alguien que busca algo para su mascota diga qué necesita y pregunte en 1 toque: **qué busca (bloques de la pirámide) → para qué mascota → WhatsApp** al 449 566 6644 (`https://wa.me/524495666644?text=...`; es el número con ícono de WhatsApp que ELLOS pintaron en la lona de su fachada) y llamar al 449 367 6417 con `tel:`. Hoy no tienen página: en Google su "sitio web" es Facebook, y su Facebook no se actualiza desde 2022.

## La promesa (solo ellos la pueden decir)
**"La ciudad de las mascotas."** Es su lema (portada de Facebook), y su logo es una pirámide con "mascotas muy mexicanas". Su lona lo dice todo, literal: "VACUNAS · CONSULTAS · ESTÉTICA · ANIMALES EXÓTICOS · ALIMENTO · ACCESORIOS · TODO PARA TUS MASCOTAS". Tienda física en Av. Canal Interceptor 93 c, con 141 opiniones en Google y clientes que escriben "desde hace 9 años".

## Identidad
- Lienzo **blanco cal `#FBF8F1`** con bandas **verde fachada** (mídelo con PIL de `gmaps-01`, la pared y el letrero; si sale apagado usa `#1F8A4C`) y una sola banda **rosa mexicano** (mídelo del logo de pirámide `gmaps-15`; si no se puede, `#E0218A`). Tinta **verde noche `#12261C`**. Amarillo cempasúchil `#F2B705` solo en detalles chicos (un escalón, un subrayado), nunca de fondo. Nada de azul rey ni coral.
- Botones de navegar: **verde fachada** sólido con las dos esquinas de arriba escalonadas (dos escalones de 6 px con `clip-path`), texto blanco cal en Chivo 800 mayúsculas ("VER QUÉ HAY", "CÓMO LLEGAR"). Secundario: texto con subrayado de greca. **VERDE WHATSAPP `#25D366` SOLO** en "Preguntar por WhatsApp" y el flotante; como la marca también es verde, el de WhatsApp lleva SIEMPRE el logotipo oficial y forma recta sin escalones, para que no se confundan. Máximo 1 verde WhatsApp por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Chivo** 900 (apretada, mayúsculas y minúsculas, interlineado .95); cuerpo **Chivo** 400/600; etiquetas, horario y teléfonos en **Chivo Mono** 500. Nada de Fredoka, Nunito, Baloo, Anton ni Archivo.
- Logo real: `gmaps-15-logo-piramide-mascotas-muy-mexicanas.jpg` (720 px) es el de su fachada e Instagram; `logo-fb.png` (huella y "Mascotitlán" coral) es el viejo de Facebook. Usa el de la pirámide, chico (máximo 160 px de ancho; súbelo con Real-ESRGAN mezclado 50 % con el original). No redibujar la pirámide ni el camaleón del logo. En header el nombre va compuesto: "MASCOTITLÁN" en Chivo 900. Favicon: tres escalones verdes sobre blanco cal. En PENDIENTES: logo en alta.

## Lenguaje de formas propio: EL ESCALÓN
- Todo contenedor importante tiene **esquinas escalonadas** (dos escalones de 8 px, `clip-path: polygon`), como el perfil de una pirámide. Las fotos van en marcos con la esquina superior derecha escalonada.
- Divisores: **greca escalonada** (xicalcoliuhqui simplificada: escalón + gancho, repetida) en SVG de 22 px de alto, verde sobre cal o cal sobre verde.
- Etiquetas de foto: **placa de calle de la ciudad**: rectángulo verde noche con filete blanco y texto Chivo Mono en mayúsculas ("CALLE DE LOS PECES", "PASILLO DEL ALIMENTO", "AV. CANAL INTERCEPTOR 93 C"). Describen lo que se ve; sin inventar.
- Prohibido: huellas regadas, huesos, siluetas de animales, corazones, calaveras, sombreros.

## Header propio: LOS ESCALONES
- Barra blanco cal de 58 px con filete de greca verde abajo. Izquierda: "MASCOTITLÁN" y debajo, mini, "la ciudad de las mascotas". Derecha: **una pirámide de 5 escalones** (24 px de alto, CSS puro) que se va pintando de abajo hacia arriba: un escalón por sección visitada (verde los ya pasados, rosa el actual; reversible), luego botón verde fachada "PREGUNTAR" (a `#piramide`) y hamburguesa.
- Al bajar se compacta a 48 px. Hamburguesa a pantalla completa verde fachada con ligas en Chivo 900 blanco cal: Qué hay · Peces · La tienda · Opiniones · Visítanos · WhatsApp (con logotipo).

## Componente firma (anotar en COMPONENTES-USADOS.md): LA PIRÁMIDE DE LO QUE BUSCAS
Sección `20-piramide`. Una **pirámide de bloques tocables** (CSS, escalonada, 4 niveles) donde cada bloque es una de las cosas que ELLOS anuncian en su lona y su bio:
- Nivel 1 (base, 3 bloques): **ALIMENTO** · **ACCESORIOS** · **PECES Y ACUARIOS**
- Nivel 2 (2 bloques): **ANIMALES EXÓTICOS** · **AVES**
- Nivel 3 (2 bloques): **VACUNAS Y CONSULTAS** · **ESTÉTICA**
- Cima (1 bloque): **OTRA COSA**
Mecánica: al tocar un bloque se pinta de rosa mexicano con un salto de 6 px (180 ms) y a un lado (abajo en celular) se abre su **ficha**: la foto real que le toca y UNA línea literal de ellos o descriptiva sin promesas. Fichas:
- Alimento → `gmaps-02` (pasillo con anaqueles de alimento) · "Pasillo de alimento. Pregunta por la marca y el tamaño que buscas."
- Accesorios → `fb-rascadores-collage` recortado a los rascadores sin texto, o `gmaps-07` · "Rascadores, casitas, transportadoras y más."
- Peces y acuarios → `gmaps-03` (betta) · "Peces betta y acuarios."
- Animales exóticos → `ig-DdHsn5GTlJ` (su collage) · cita literal: «pensamos en ti, y en lo que te gusta, pregunta por lo que buscas!»
- Aves → sin foto propia: ficha solo de texto con la bio literal «gran variedad de aves, peces, perros, animales exóticos, y más».
- Vacunas y consultas → sin foto (su imagen trae marcas ajenas): ficha de texto con la cita literal «la medicina preventiva empieza VACUNANDO Y DESPARACITANDO» y "Horario de consulta: pregúntalo."
- Estética → ficha de texto: "Estética canina. Pide tu turno por WhatsApp."
- Otra cosa → campo de texto libre.
Se pueden elegir varios bloques. Debajo: **¿Para quién es?** fichas: Perro · Gato · Pez · Ave · Exótico · Otro (texto). La **lista** (papel cal con esquina escalonada, "TU LISTA") se escribe sola: BUSCO · PARA · NOMBRE (opcional). Botón verde WhatsApp "Preguntar por WhatsApp" con: "Hola Mascotitlán, busco alimento y estética. Es para mi perro. Mi nombre: Ana". Sin elegir: "Hola Mascotitlán, quiero preguntar por algo para mi mascota." La elección persiste (sessionStorage) y el cierre la repite. Sin JS: la lista de lo que anuncian en su lona y el botón.
Al cargar, el bloque ALIMENTO ya está abierto con su foto, para que se entienda que se toca.

## Momento firma: EL PAPEL PICADO
Sección `50-opiniones`, la banda rosa mexicano. Al entrar a la sección **se cuelga una tira de papel picado** de lado a lado: 9 banderas en SVG (verde, cal, amarillo, verde noche; NO rosa porque el fondo ya es rosa) con calados reales hechos con máscara (grecas escalonadas, círculos y un pez sencillo de 3 trazos geométricos; sin huellas, sin calaveras), que caen una por una desde el cordón (80 ms entre cada una, 420 ms, con rebote corto) y luego se mecen apenas con el scroll (rotación de ±2° ligada al avance, rAF, reversible, sin pin). Con reduced-motion o a los 1.6 s: colgadas y quietas. Debajo del papel picado van las opiniones.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | La tienda real, de inmediato | Cartel: `gmaps-18-interior-amplio-acuarios-jaulas.jpg` (vista amplia del local) a dos tercios de pantalla con velo verde noche abajo. Título: **"La ciudad / de las mascotas."** (segunda línea rosa mexicano). Línea: "Alimento, accesorios, peces, exóticos, vacunas, consultas y estética." Dato: "Av. Canal Interceptor 93 c · 141 opiniones en Google". Botón verde fachada "VER QUÉ HAY" + link "Cómo llegar". Sin verde WhatsApp. En compu: foto a la derecha con esquina escalonada y el logo de la pirámide chico sobre cal. | gmaps-18 |
| 2 | `20-piramide` | El trabajo de la página | Componente firma + botón verde WhatsApp. Título: **"¿Qué buscas? / Tócalo en la pirámide."** | fichas |
| 3 | `30-peces` | "¿Quieres uno?": lo más bonito que tienen en foto | **"Peces betta / y acuarios."** Las tres fotos de bettas (`gmaps-03`, `gmaps-05`, `gmaps-08`) grandes: una vertical grande y dos al lado; en celular, una grande y carrusel con asomo. Foto del pasillo de acuarios `gmaps-16` con placa "CALLE DE LOS PECES". Cita de cliente, literal y marcada como opinión: «Gracias por la pensión de los peces betta que compré» (Juan José Sandoval Díaz, Google Maps; corrige solo el acento, no el sentido). Link "Preguntar por peces" que marca el bloque en la pirámide. 0 verdes WhatsApp. | bettas |
| 4 | `40-tienda` | Surtido real | **"Pasillos llenos. / Pregunta por lo que buscas."** Fotos `gmaps-02` y `gmaps-17` (pasillos; si la persona se reconoce, recórtala) con placas de calle, y los rascadores de su Facebook (`fb-rascadores-collage` y `fb-rascador-blanco`, recortados para que NO se vea ningún precio ni texto encimado) con placa "RASCADORES Y CASITAS". Renglón tipográfico con lo de su lona tal cual: VACUNAS · CONSULTAS · ESTÉTICA · ANIMALES EXÓTICOS · ALIMENTO · ACCESORIOS. "Entrega a domicilio: sí, según su ficha de Google." 0 verdes WhatsApp. | gmaps-02, gmaps-17 |
| 5 | `50-opiniones` | Prueba social real | Banda rosa con el papel picado. Tres opiniones literales en fichas cal con esquina escalonada: Ady Soto (recortada: "Desde hace 9 años que vamos a llevar a nuestros chiquitos (...) además de los accesorios tan variados y a buen precio, siempre con el mejor trato (...)"), José Ramon Reynoso Femat ("(...) Cuentan con buen surtido de mercancía y accesorios. Lo recomiendo ampliamente!"), daniel medina ("Me encantó, muchas variedad de mascotas, comida y accesorios!! Súper recomendable!!"). Cada una con nombre, 5 estrellas y "Google Maps". Dato chico y honesto: "4.2 en Google · 141 opiniones" con link "Ver todas en Google". El 4.2 NO va gigante. | papel picado |
| 6 | `60-visitanos` | Dónde, cuándo y siguiente paso | **"Ven a la ciudad. / Av. Canal Interceptor 93 c."** Foto `gmaps-01` (fachada con su lona; TAPAR las placas de los dos autos con recorte o parche limpio) con placa de calle. Horario real con estado en vivo (hora de America/Mexico_City): Lun a Vie 9:30 a 20:00 · Sáb 9:30 a 17:00 · Dom cerrado. WhatsApp 449 566 6644 (botón verde con la lista armada: "Tu lista ya está." / sin elegir "Falta elegir un bloque.") y teléfono 449 367 6417 con `tel:`. Mapa embebido buscando "Mascotitlan Av Canal Interceptor 93 Aguascalientes" + botón "CÓMO LLEGAR". Instagram @mascotitlan_ags, TikTok @mascotitlanags y Facebook con logotipos SVG 44 px. Luego **"Todo listo para completar"** (renglones con escalón): logo en alta · fotos propias de la tienda, la estética y el consultorio · quién es el médico veterinario y su horario · precios de estética, vacunas y consulta · marcas de alimento que manejan · fotos de aves y exóticos · correo · link de cobro. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." Remate final: la greca y «mascotas muy mexicanas» entre comillas angulares, con el logo de la pirámide. | gmaps-01 |
| F | footer | Contacto real | Verde fachada: MASCOTITLÁN, dirección, horario, WhatsApp, teléfono, redes con SVG, "Muestra de diseño hecha por KREVO con las fotos públicas de Mascotitlán." | |

Ritmo: 1 cartel con la tienda · 2 pirámide que se toca y ficha con foto · 3 peces grandes · 4 pasillos y rascadores · 5 rosa con papel picado y opiniones · 6 fachada + horario + mapa + lista.

## Movimiento
Títulos que suben por escalones (cada línea entra en 3 pasos de 8 px, 420 ms, una vez). Bloques que saltan al tocarse. Escalones del header que se pintan. Papel picado que se cuelga y se mece. Placas de calle que entran deslizándose 10 px. Sin pin, sin cortinas, sin parallax, sin contadores, sin video, sin nada que se construya por hiladas.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path animado sobre img lazy; fotos que venden sin lazy.

## Fotos
- Reales y grandes (más de 1,200 px, NO pasar por Real-ESRGAN): `gmaps-01`, `gmaps-02`, `gmaps-16`, `gmaps-17`, `gmaps-18`, `gmaps-03`, `gmaps-05`, `gmaps-08`, `ig-DdHsn5GTlJ` (1536x1024), `fb-rascadores-collage` (1536x2048).
- Medianas: `gmaps-04`, `gmaps-07`, `fb-rascador-blanco`.
- **Tapar o recortar:** placas de los autos en `gmaps-01`; precios y textos encimados en las fotos de rascadores; personas reconocibles en los pasillos.
- PROHIBIDAS: todas las `tt-*` (cachorros en mano, 576 px), `gmaps-06` (roedor), `gmaps-09` a `gmaps-14` (fotos de clientes), `fb-portada` (stock), los collages de cachorros de Instagram, las imágenes de IA o plantilla (`ig-DbFJnbuE6Xm`, `ig-DcmbebHE2Bh`, `ig-DdVMojijmKU`), el cartel de la expo (`ig-Da_q3Uk7g7`) y la imagen de vacunas con marcas y precios (`ig-DYlPYchDfeA`).
- Nada de IA generativa ni stock. og:image 1200x630 con PIL: `gmaps-18` con velo verde noche y "La ciudad de las mascotas." en Chivo 900.

## Lo que NO va
Fotos de cachorros o animales en jaula o vitrina; frases de bienestar que no se pueden sostener ("cuidamos", "animales sanos", "en las mejores manos", "animales en muy buen estado": tampoco dentro de las citas, por eso van recortadas); razas en venta; precios (los de Facebook son de 2022); "veterinario propio" o nombre de médico; pensión de peces como servicio (solo como cita de cliente); los domicilios de directorios (Av. Universidad 935, Línea de Fuego) y el teléfono 449 914 8860; el 4.2 en grande; reseñas negativas; "calidad" y "servicio" en títulos; huellitas, siluetas, contadores, rejilla de íconos, azul rey, coral.

## PENDIENTE-DUEÑO
Logo en alta · fotos propias · médico veterinario y horario de consulta · precios · marcas de alimento · aves y exóticos disponibles · correo · dueño · año de apertura · confirmar entrega a domicilio y zona.
