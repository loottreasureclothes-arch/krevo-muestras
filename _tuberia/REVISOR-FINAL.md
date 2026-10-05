# REVISOR FINAL (Opus): dejar la página lista para MANDAR al dueño

Emanuel (4 oct 2026): "algunas traen letras empalmadas, otras siguen muy cortas, las hiciste muy sencillas; dales otra revisada y otra arreglada a todas, para enviarlas". Tú eres la última mano antes de que esto llegue a un cliente que paga $5,000 USD. Trabaja con calma y a fondo.

Lee: `CANON.md` (misma carpeta), `<sitio>/HOJA-CORTA.md`, `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md`, `PENDIENTES.md`. Mira `research/fotos/_hoja.jpg` o `research/fotos/maps/_hoja-maps.jpg` una vez.

## 1. Encimes y cortes (obligatorio, con evidencia)
- Corre `node _tuberia/encimes.mjs http://localhost:8770/<slug>/ <scratch>/enc.json`. Revisa celular (m, 390), tableta (t, 820) y compu (d, 1440).
- Cada ENCIME, CORTADO o FUERA real se arregla en el CSS de su sección (posición, tamaños con clamp, saltos de línea, z-index, padding bajo el header fijo, íconos o sellos encima de botones o del mapa). Falsos positivos posibles: tarjetas de un carrusel fuera de pantalla a propósito, o el texto de una pregunta cerrada; confírmalo mirando el recorte antes de ignorarlo, y anótalo.
- Además, mira con tus ojos: krevo-shot `m` y `d` (`| tail -3`), hoja con `hoja.py`, y RECORTES con PIL de cada sección en celular a tamaño real (no te fíes de la hoja chica para encimes). Busca: títulos tapados por el header fijo, sellos o íconos encima de texto o de botones, textos sobre fotos sin contraste, botones partidos, letras que se salen.
- Vuelve a correr `encimes.mjs` hasta 0 encimes reales en m, t y d.

## 2. Que no se vea sencilla ni corta
- Alto en celular entre 9,000 y 11,500 px, 8 a 9 secciones, todas con sustancia.
- Si está corta o alguna sección se ve pobre (una foto y dos renglones, listas grises, huecos), enriquécela con datos REALES de research: lo más pedido con foto y precio, para grupos o eventos, historia o años, preguntas frecuentes, promociones reales, cómo pedir en 3 pasos, horarios especiales. Más fotos reales (collage con anchos desiguales, carrusel), tipografía con jerarquía (títulos a dos tonos, un dato gigante), detalles con oficio (marcos, sombras, estados al tocar).
- Revisa que estén TODOS los BLOQUES OBLIGATORIOS del CANON: mapa de Google embebido, 6 o más reseñas con nombre y fuente (si research tiene menos, búscalas como dice MEJORADOR.md; nunca inventes), galería, botones en cada sección, pie completo.
- Compu (1440) y tableta (820) con diseño propio, sin columnas vacías ni huecos de más de 90 px.

## 3. Datos y botones
- Todo wa.me con número real y mensaje armado; si no hay WhatsApp publicado, botones de Llamar (`tel:`) y nunca un wa.me sin número. Decodifica una URL de WhatsApp para confirmar.
- Nada inventado. Nada en voz de investigador. Sin "$0".

## 4. Verificar y cerrar
`encimes.mjs` con 0 encimes reales en m, t y d; krevo-shot `m` y `d` con `alertas: []` (la carga del iframe del mapa se ignora); UNA hoja final mirada. Escribe `CORRECCION-4.md` (qué encimes había y cómo quedaron, qué agregaste). Sin git. Máximo 8 imágenes vistas.

Devuelve solo el JSON: slug, nota (0-10, juez duro), encimes_antes, encimes_despues, alto_celular_px, resenas, alertas, lista_para_mandar (true/false), cambios (lista corta).
