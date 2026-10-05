# CANON KREVO (reglas condensadas; reemplaza CHECKLIST, cinemática y hojas de ejemplo)

## Entorno
- Sitio: `./<slug>/`. Trabaja solo ahí y en tu scratchpad `/tmp/tuberia/<slug>-<papel>/`. Sin git, sin Agent ni Workflow.
- Servidor local: `http://localhost:8770/<slug>/` (si no responde: `python3 -m http.server 8770 --directory .` en segundo plano y guarda tu PID). NUNCA pkill/killall; solo `kill <tu pid>`.
- Prohibido Higgsfield e IA generativa. Solo PIL, OpenCV y ffmpeg (en la nube no hay Real-ESRGAN: fotos chicas se pintan chicas, nunca estiradas).
- Estructura: `template.html` + `sections/NN-slug.{html,css,js}` + `site.css` + `site.js` + `build.py` → `python3 build.py` arma `index.html` (nunca editar index.html a mano). Imágenes webp en `img/` con srcset 480/960/1600.
- Fuentes locales: `Google Fonts: baja los .woff2 con curl (ver `_tuberia/FUENTES-INDICE.md` para elegir familia), copiar woff2 a `<sitio>/fonts/` con @font-face. Nunca Inter, Poppins ni Montserrat.
- Encimes: `node _tuberia/encimes.mjs http://localhost:8770/<slug>/ <scratch>/enc.json` debe dar 0 encimes reales en celular, tableta y compu antes de entregar (Emanuel rechazó páginas con letras empalmadas).
- Captura: `node _tuberia/krevo-shot.mjs http://localhost:8770/<slug>/ <scratch>/s m | tail -3` y luego `d`. Debe salir `alertas: []`. Mirar solo la hoja de `hoja.py`.
- Datos: solo lo que está en `research/`. Si falta, va a "Todo listo para completar" y a PENDIENTES.md.

## Decisiones de Emanuel (no se discuten)
- Lienzo oscuro o en color de marca; nada de fondo blanco plano. Bandas crema solo para leer.
- Verde `#25D366` (texto `#0b3d1f`) SOLO en botones que abren wa.me de verdad y en el flotante; máximo 1 verde por sección. Navegar = color de marca, fino, rectangular, mayúsculas espaciadas.
- Todo botón de WhatsApp es `<a href="https://wa.me/52XXXXXXXXXX?text=...">` real; el JS solo reescribe el href.
- Productos o menú a la vista justo después del hero (foto, nombre, precio real, Agregar). Nunca "$0": "Pregunta el precio".
- Header y lenguaje de formas propios por sitio (sacados de su logo, producto o local).
- Títulos que pegan, con voz del negocio, a dos tonos (última línea en color de marca). Prohibido en títulos: calidad, servicio, tu mejor opción, experiencia única, todo en un lugar, sin vueltas, lo hacemos posible, líderes, excelencia, el mejor, la mejor, Nuestros servicios, Sobre nosotros.
- Estrellas solo con reseñas reales con nombre. Sin contadores que suben, sin fila de contadores, sin rejilla de tarjetas con ícono, sin píldoras, sin emojis como íconos, sin guiones largos (—), sin cortinas de color, sin naranja salvo que sea su marca, sin cinta de medir salvo que el negocio mida.
- Fotos de ESE negocio, completas, sin texto quemado ni marcas ajenas; placas, caras de terceros, menores y pacientes se recortan o tapan limpio (nunca pixelado). Foto chica no va a sangre.
- Sección "Todo listo para completar" con "Pásanoslo por el mismo chat donde te llegó esta muestra." y sin wa.me ahí.
- Redes reales con logo SVG de 44 px en el pie.

## Límites duros
- Página COMPLETA (Emanuel, 4 oct 2026: "se ven muy cortitas, falta el Google Maps, faltan reseñas, faltan botones"): 8 a 9 secciones y entre 8,000 y 11,000 px de alto en celular (390 px). Una foto grande por sección, máximo 3 chicas.
- BLOQUES OBLIGATORIOS en toda página: (1) hero con 2 botones (WhatsApp o Llamar + Ver carta/servicios); (2) carta o catálogo con precios reales o "Pregunta el precio"; (3) componente firma; (4) RESEÑAS: mínimo 6 reseñas reales con nombre, estrellas y fuente (Google, Facebook, TripAdvisor, Restaurant Guru), más la calificación y el número de opiniones de Google con botón "Ver todas en Google" a su ficha; (5) galería o recorrido del lugar con 4 a 8 fotos; (6) VISÍTANOS con MAPA DE GOOGLE embebido (`<iframe src="https://www.google.com/maps?q=<nombre+dirección+Aguascalientes>&output=embed" loading="lazy">` en marco propio), dirección, horario por día con "Abierto ahora" calculado, y botones Cómo llegar (link a Maps), Llamar (tel:) y WhatsApp; (7) Todo listo para completar; (8) pie con redes, teléfono, dirección y horario.
- Botones: cada sección termina con una acción clara (máximo 1 verde por sección; las demás en color de marca o link con flecha). Botón flotante de WhatsApp siempre.
- Ritmo: nunca más de 2 secciones seguidas eyebrow → título → párrafo → botón. Alternar con foto a sangre con 3 palabras, catálogo tipográfico, UN dato gigante, collage, momento firma.
- Copy: 3 a 6 palabras por frase de título; máximo 20 palabras por bloque; escribe como el negocio, nunca "según su ficha de Google".
- Hero de celular = cartel: foto ~2/3 de pantalla con el título más grande de la página y algo propio (su letrero, su platillo con nombre, su calle).
- Movimiento: solo transform/opacity/clip-path; beats de 0.6 a 1 s, UI ≤ 300 ms, nada > 1.2 s; sin pin; `[data-reveal]` visible a los 1.6 s pase lo que pase (CSS base = estado final; se esconde solo con JS y `prefers-reduced-motion: no-preference`); sin `scroll-behavior: smooth`; `loading="lazy"` nunca en fotos que venden.
- Compu 1440 y tableta 820 con diseño propio de 2 columnas, no el celular estirado. Sin huecos de más de 90 px.
- Head: title "Giro en Aguascalientes | Nombre", description ≤ 155, canonical y og con base `https://loottreasureclothes-arch.github.io/krevo-muestras/<slug>/`, og:image 1200x630 hecha con PIL, favicon-32 y apple-touch-icon, JSON-LD del tipo correcto sin rating.
- `build.py` agrega `?v=<mtime>` a CSS y JS.

## Componente firma y momento firma
- Componente firma: el corazón interactivo, con SUS fotos o SUS datos, que termina en un WhatsApp ya armado. No puede repetir ninguno de `python3 _tuberia/componentes.py`. Que se note que se toca y que tenga oficio (volumen, detalle, estados), no botones apilados.
- Momento firma: UN momento visual ligado al scroll o a la entrada, de su mundo, reversible, resuelto a los 1.6 s.

## Prueba anti-genérico (dos "sí" en 1-4 o uno en 5-8 = rechazo)
1. Tapando el logo, ¿podría ser de otro negocio del giro? 2. ¿3+ secciones seguidas con el mismo ritmo? 3. ¿Hero = foto + velo + título + 2 botones sin nada propio? 4. ¿Más de 8 verdes? 5. ¿Contadores o rejilla de tarjetas con ícono? 6. ¿Falta componente firma o repite uno usado? 7. ¿Palabra prohibida en títulos? 8. ¿Más de 7 secciones o 9,000 px?
