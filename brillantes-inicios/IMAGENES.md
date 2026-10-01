# Imágenes (todas reales, de la cuenta de Instagram de la guardería; nada de IA)

| Dónde | Origen | Proceso |
|---|---|---|
| Hero | research/fotos/ig-07.jpg ("Un día normal con peques") | Recorte x 30-484, y 228-608 (se quitó el texto encimado, el número de WhatsApp y el marco rosa). El logo de la esquina inferior izquierda se borró con cv2.inpaint (Telea). Real-ESRGAN x4plus `-s 4` (1816x1520), webp 480/960/1600 calidad 80. |
| og:image (img/og.jpg) | la foto del hero ya con soles (`_build/src/hero-soles.png`) | Corrección 1: se arma en `_build/og.html` con Fredoka y Nunito reales de Google Fonts y se captura con `node _build/og-shot.mjs` (Chrome headless propio, 1200x630). Velo azul a la izquierda, sol, título a dos tonos y renglón "★ 4.8 en Google · Cerro de Aconcagua 101-C". La maestra sale completa (sin cortarle la cabeza). La versión vieja quedó en `_build/src/retirado/og-v1.jpg`. |
| Sala a sangre (sección "Un día aquí") | ig-03.jpg ("El valor del juego") | Recorte x 30-484, y 24-316 (arriba del texto y del logo). Real-ESRGAN x4 (1816x1168), webp 480/960/1600. En compu va dentro de un marco blanco de 1080 px, no a sangre total. |
| Foto pegada "Menús saludables y balanceados" | ig-09.jpg | Recorte x 64-336, y 172-430 (sin título, sin el personaje de cebolla, sin la franja de logo). Real-ESRGAN x4 (1088x1032), webp 480/960. |
| ~~Foto pegada "¡No se queda atrás! 1º de preescolar"~~ | ig-08.jpg | RETIRADA en la corrección 1: research/FOTOS.md la marca como stock probable y traía restos de letras blancas abajo. Los webp quedaron en `_build/src/retirado/`, fuera de img/. La fruta queda como única foto pegada. |
| Logo (header, footer) | research/logo-ig-150.jpg | Recorte circular con PIL, 128 px (se usa a 44-64 px, nunca estirado). |
| Favicon 32 y apple-touch-icon 180 | mismo logo | Sobre azul rey #1b2f7a con PIL. |

Privacidad: las caras de todos los bebés venían tapadas con emojis de Apple en las fotos originales (la propia guardería lo avisa en el poster: "las caritas de los peques se censuran por protección").

**Corrección 1 (30 sep 2026): el emoji se cambió por el sol de Brillantes.** El emoji es arte de Apple (marca ajena) y dominaba el hero y la sala. `_build/soles.py` tapa cada carita con un disco amarillo #ffc63a con filo dorado #e9a400, brillo chico, sombra suave y 12 rayos cortos redondeados (el mismo dibujo que el sol #i-sun del header). Lo dibuja con PIL en supermuestreo x4 sobre los maestros x4 sin tocar (`_build/src/hero-master.webp`, `_build/src/sala-master.webp`, salida original de Real-ESRGAN) y vuelve a sacar los webp 480/960/1600; es idempotente. Hero: 7 soles (radio 53-72 px sobre 1600). Sala: 2 soles (radio 188 y 212) con rayos más cortos y delgados para que no manden. Cada sol cubre la carita entera (con orejas y copete del emoji): no queda ninguna cara de bebé visible. Nada de IA.
Sala en celular y compu: va en marco blanco de foto pegada con su proporción casi completa (la original es chica, 454 px útiles: por decisión de Emanuel no va a sangre). Así el sol queda chico y mandan las manos y la mirada de la maestra.
Nada de Higgsfield ni de IA generativa. Herramientas: PIL, OpenCV (inpaint), Real-ESRGAN local.

## Corrección 2 (30 sep 2026): fotos reales de su ficha de Google Maps
Script: `_build/fotos2.py` (PIL, idempotente). Nada de IA generativa.
| Dónde | Origen | Proceso |
|---|---|---|
| Hero, foto grande "La recepción" | research/fotos/maps-03.jpg | Recorte cuadrado x 600-1600, y 470-1470 (mostrador y logo dorado; deja fuera a la persona del pasillo). webp 480/1000. Marco de foto pegada, -2°. |
| Hero, foto chica | research/fotos/maps-04.jpg (cuadro de video del propietario, 464 px) | Recorte y 150-832 para quitar el logo encimado; Real-ESRGAN x4plus `-s 4` (`_build/src/maestra-master.webp`), recorte 3:4, webp 360/720. Adulta del personal, sin niños. |
| Sala "Cunitas, sillas altas y su maestra" | ig-07 (los mismos `img/hero-*.webp` de antes, ya con soles) | Ahora va completa en marco, max 780 px en compu; los 7 soles quedan dentro. |
| Foto pegada "Mesitas y sillitas de colores" | research/fotos/maps-01.jpg | Recorte y 40-840 (sin el recuadro de logo y QR). webp 480/900. |
| Dónde, fachada | research/fotos/maps-06.jpg | Recorte y 140-1110 (muro con el logo, mural y portón). webp 480/960/1400. |
| Cierre, tira "De su Instagram" | ig-01, ig-04, ig-02 | Cuadro 512x512 arriba de la franja de WhatsApp/logos/IMSS (ig-01 y 104-616 sin el logo de la esquina). webp 480. Se presentan como posts, con "@brillantes_inicios" y link a su IG. |
ig-03 (`img/sala-*.webp`) ya no se usa en la página (los soles enormes dominaban); `_build/soles.py` lo sigue generando.
