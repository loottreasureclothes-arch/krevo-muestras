# Brillantes Inicios · Guardería IMSS Ciudad Industrial · Hoja de dirección (30 sep 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md` y `research/resenas.md`. Lo que no esté ahí, no va. Los REQUISITOS de inscripción se leen de la página oficial del IMSS (https://www.imss.gob.mx/tramites/imss01006) y se citan como "según el IMSS"; el rango de edad de las guarderías IMSS (43 días a 4 años) se pone SOLO si esa página o el directorio del IMSS lo confirma; si no, se pregunta.

## El TRABAJO de la página
Que una mamá o papá con IMSS termine con la solicitud hecha: **checa requisitos → inscribe en STIGI (stigi.imss.gob.mx) → agenda visita por WhatsApp 449 192 7631** (`https://wa.me/524491927631?text=...`). El servicio es gratuito para afiliados: la página vende CONFIANZA y quita la flojera del trámite.

## La promesa (solo Brillantes la puede decir)
**"Guardería gratis con tu IMSS, en Ciudad Industrial."** 4.8 en Google con 45 opiniones; papás que dicen "salen contentos", "se adaptó en un mes", "comen saludable". Cerro de Aconcagua 101-C, de 7:00 a 17:00.

## Identidad
- Lienzo en color de marca: **azul rey profundo `#1b2f7a`** (del logo y sus posters) en hero, bandas y cierre; **papel crema `#fbf3df`** solo en la cartilla y las reseñas (para leer). Acento único: **amarillo sol `#ffc63a`** (del arcoíris del logo) en titulares a dos tonos, subrayados de crayón y el sol del header. NADA de rosa mexicano como color de botón (queda solo en detalles de los posters reales).
- Botones de navegar: azul rey sólido con texto crema, radio 14 px (redondeados; este sitio SÍ es redondo), mayúsculas espaciadas chicas ("VER REQUISITOS", "CÓMO LLEGAR"). Secundario contorno azul. **VERDE `#25D366` SOLO** en "Agendar visita por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Fredoka** 700 (redonda, infantil sin ser cursi); cuerpo **Nunito** 400/700; datos de la cartilla en **Nunito** 800 con tabulación.
- Logo real: perfil de IG `research/logo-ig-150.jpg` (150 px: arcoíris/sol "Brillantes Inicios"). Es chico: usarlo solo a 44–64 px en header y footer; NO estirarlo. En hero el nombre va en Fredoka con un sol SVG propio. Anotar en PENDIENTES: logo en alta.

## Lenguaje de formas propio: LIBRETA Y CRAYÓN
- Contenedores tipo **hoja de libreta**: crema, esquinas 18 px, orificios de espiral a la izquierda (círculos de 8 px), renglones azul claro muy sutiles.
- Subrayados y flechas hechos con trazo de crayón (SVG path con `stroke-linecap: round`, ligeramente irregular) en amarillo.
- Fotos con marco blanco de 10 px y una cinta adhesiva (rectángulo semitransparente girado) en una esquina, como foto pegada en la libreta.
- Divisores: fila de estrellitas de 5 puntas chicas (del "Brillantes").

## Header propio: LA PESTAÑA DE LA LIBRETA
- Barra crema de 60 px con borde inferior azul de 3 px y una **pestaña redondeada** que sobresale a la derecha con el sol amarillo (SVG) girando muy despacio (60 s por vuelta). Logo chico + "Brillantes Inicios" en Fredoka a la izquierda. Derecha: botón azul "INSCRIBIR" (baja a la cartilla) + hamburguesa.
- Al bajar se compacta a 50 px y un trazo de crayón amarillo en el borde inferior marca el avance del scroll (reversible).
- Hamburguesa a pantalla completa azul rey con letras crema: Requisitos · Salas · Un día aquí · Opiniones · Dónde · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): LA CARTILLA DE INSCRIPCIÓN
Sección `20-cartilla`. Una hoja de libreta con la **lista real de requisitos del IMSS** (leída de imss.gob.mx/tramites/imss01006; citar la fuente al pie). Cada requisito es una casilla grande (44 px) que la persona palomea; una **paloma de crayón amarillo** se dibuja al marcar (300 ms, `stroke-dashoffset`). Arriba, en vivo: "Te faltan 2 documentos" → "Ya tienes todo. Siguiente: inscribe en STIGI." Pasos en 3 renglones: 1) Reúne documentos · 2) Inscribe en STIGI (botón azul a stigi.imss.gob.mx, abre en pestaña nueva) · 3) Agenda tu visita. Botón VERDE "Agendar visita por WhatsApp": `Hola Brillantes Inicios, quiero inscribir a mi bebé. Edad: ___. Ya tengo: 5 de 7 documentos. ¿Cuándo puedo visitarlos? Mi nombre: ___` (omitir vacíos). Guarda `bi_cartilla` en localStorage. Sin JS: la lista se lee y los links funcionan.

## Momento firma: "LAS ESTRELLITAS QUE SUBEN"
Sección `40-opiniones`: el **4.8** gigante en Fredoka cae y pega; debajo 5 estrellas grandes que se llenan de amarillo de izquierda a derecha ligadas al scroll (la quinta se queda al 80 %, honesto), reversible, sin pin. "45 opiniones en Google" en chico con link a Maps.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | Decir de inmediato qué es y para quién | Foto real grande (ig-07 "un día normal con peques": sala con sillas altas y maestra; subida x4; recortar el texto encimado si estorba) 62 svh con velo azul abajo. Título que cae y pega, a dos tonos: **"Guardería gratis con tu IMSS. / En Ciudad Industrial."** (segunda línea amarilla). Línea: "Cerro de Aconcagua 101-C · Lunes a viernes de 7:00 a 17:00". Botón azul "VER REQUISITOS" + link con flecha "Cómo llegar". Sin verde. | ig-07 real x4 |
| 2 | `20-cartilla` | El trabajo de la página | La cartilla de inscripción (componente firma) + botón verde. Título: **"Inscribir es más fácil / de lo que crees."** | hoja de libreta |
| 3 | `30-salas` | "¿Quieres esto?": ver dónde va a estar tu bebé | **"Así se ve / un día aquí."** Foto a sangre 60 svh (ig-03: bebés en sala con maestra, x4) con pie encimado numerado ("01 / SALA · El valor del juego", literal de su poster). Debajo 2 fotos chicas pegadas con cinta: ig-09 (vasitos de fruta, "Menús saludables y balanceados", literal) y ig-08 (preescolar, "¡No se queda atrás! 1º de preescolar", literal). Renglón: "Alimentación balanceada y horarios estrictos" (lo dice la reseña de Anahi; ponerlo como cita con su nombre, no como promesa nuestra). Sin inventar edades ni salas: si el IMSS confirma 43 días a 4 años, va con "según el IMSS". 0 verdes. | ig-03 real x4 |
| 4 | `40-opiniones` | Prueba social real | Momento firma (4.8 y estrellas que suben) + 3 reseñas literales en hojas de libreta (Anahi Leyva, Flor Gonzalez, Martha Yadira Barrios Marin) con nombre y estrellas. Link "Ver las 45 en Google". | banda azul, sin foto |
| 5 | `50-donde` | Que lleguen y confíen | **"Cerro de Aconcagua / 101-C."** Horario en renglones (L–V 7:00–17:00; sáb y dom cerrado), estado en vivo "Abierto ahora / Abre mañana 7:00" (hora real de Aguascalientes), teléfono fijo 449 624 1782 con `tel:`, WhatsApp, mapa embebido, botón azul "CÓMO LLEGAR". Facebook, Instagram, TikTok y YouTube con logotipo SVG 44 px. Línea chica: "Guardería del esquema IMSS; aparece en el directorio oficial de guarderías 2025." | mapa en marco de foto pegada |
| 6 | `60-cierre` | Último empujón + siguiente paso | **"Tu bebé / ya tiene lugar."** con lo que marcó en la cartilla + botón verde "Agendar visita por WhatsApp". Debajo, misma sección, **"Todo listo para completar"** (renglones de libreta): logo en alta · fotos en alta de salas, cocina y patio · edades y capacidad por sala · nombre de la directora · si aceptan pago particular · link de cobro (si aplica). "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | |
| F | footer | Contacto real | Logo chico, dirección, teléfonos, redes con SVG, "Muestra de diseño hecha por KREVO con la información pública de Brillantes Inicios." | |

Ritmo: 1 foto + título · 2 herramienta (cartilla) · 3 foto a sangre + fotitos · 4 banda con dato gigante · 5 ficha + mapa · 6 hoja. 

## Movimiento
Títulos que caen y pegan (500 ms, por palabra). Paloma de crayón al marcar. Estrellas que se llenan con el scroll (reversible). Sol del header que gira lento. Fotos pegadas entran con 2° de giro (una vez). Sin pin, sin cortinas, sin video de IA, sin cinta de medir, sin confeti.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path sobre img lazy; fotos que venden sin lazy.

## Fotos
- Reales en `research/fotos/` (640 px con texto encimado): ig-07 y ig-03 son las buenas (salas reales); ig-09 y ig-08 chicas. Recortar el texto/logo encimado con PIL donde se pueda; subir x4 con Real-ESRGAN (`-s 4`, bajar con PIL); webp con srcset 480/960/1600. Sin caras de niños reconocibles en grande: si en ig-03/ig-07 se ven caras claras de bebés, desenfocar SOLO las caras con PIL (privacidad) y anotarlo.
- Nada de IA ni fotos de stock.
- og:image 1200x630 con PIL: ig-07 con velo azul + "Guardería gratis con tu IMSS. En Ciudad Industrial."

## Lo que NO va
Precios (es gratis con IMSS; si aceptan particular, no se sabe), edades o capacidad inventadas, nombre de la directora, "los mejores", "calidad" y palabras de R6 en títulos, rosa como color principal, contadores, rejilla de íconos, más de 5 verdes, fotos de stock, cortinas de color.

## PENDIENTE-DUEÑO
Logo en alta · fotos en alta · edades y capacidad por sala · nombre de la directora · pago particular sí/no · lista de útiles · menú semanal.
