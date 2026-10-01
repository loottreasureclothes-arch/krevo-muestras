# Imágenes · Constructora San José Premier

Todas salen de videos PÚBLICOS de TikTok de @const.sanjosepremier (yt-dlp, bajados a `_work/`, que no se publica). Cuadros extraídos con ffmpeg a 1 por segundo (el cuadro N de `fr/vNN/` es el segundo N-1). Elegidos a ojo en hojas de contacto. Cuadros SIN letras encimadas: los que tenían letras se recortaron por la parte limpia. Sin IA generativa ni stock; las de 720 px y las recortadas se subieron con Real-ESRGAN x4 (luego bajadas con PIL a 480/960/1600 webp).

| Archivo en `img/` | Video (ID TikTok) | Cuadro | Recorte | Dónde va |
|---|---|---|---|---|
| casa-una-planta-* | 7640330900823198996 (casa de una planta, 101.9K vistas) | seg. 7 (cuadro 008) | completo 720x1280, limpio | Ficha "Una planta" (ya no va en el hero) |
| casa-dos-plantas-* | 7672935418857360661 ("¿Cuánto crees que cuesta esta casa?") | seg. 0 (cuadro 001) | parte alta (0 a 52 %), se corta antes de la letra | Solo og:image (ya no se usa en la página) |
| terreno-excedente-* | 7640330900823198996 | seg. 5 (cuadro 006) | completo 720x1280, limpio | Ficha "Casa con terreno excedente" |
| terrenos-aerea-* | 7648858278222433556 (últimos terrenos) | seg. 12 (cuadro 013) | completo 720x1280, limpio | Ficha "Terrenos" |
| obra-ladrillo-* | 7645884185051204884 ("Por estas razones es mejor construir con ladrillo") | seg. 32 (cuadro 033) | 0 a 36 % de alto y x desde 14 % (sin la persona ni el número) | Sección "Ladrillo" |
| bosques-aerea-* | 7651457616782167316 ("Esto es lo nuevo en Bosques Providencia") | seg. 14 (cuadro 015) | 26 a 100 % de alto (debajo del título en letras) | Sección "Bosques Providencia" |
| hero-fachada-* | 7672935418857360661 (`_work/fr/v03-cuanto-cuesta`) | seg. 0 (cuadro 001) | 1080x1060 desde arriba, antes de la letra; Real-ESRGAN x4 | Hero (corrección 1) |
| dos-plantas-frente-* | 7672935418857360661 (v03) | seg. 1 (cuadro 002) | 1080x1050 desde arriba, antes de la letra; x4 | Ficha "Dos plantas" (corrección 1) |
| excedente-patio-* | v04-casa90 (video de casa con "excedente de terreno listo") | seg. 11 (cuadro 012) | y 550 a 1225 (entre el título y el subtítulo), 1080x675; x4 | Ficha "Casa con terreno excedente" (corrección 1; otra casa, no la del hero ni la de una planta) |
| terreno-sur-* | 7648858278222433556 (v08-terrenos) | seg. 5 (cuadro 006) | x 60 a 540, y 440 a 740 (arriba de la letra y del cascajo), 480x300; x4 | Ficha "Terrenos" (corrección 1) |
| int-escalera-* | v03-cuanto-cuesta | seg. 7 (cuadro 008) | y 420 a 1770, 1080x1350; x4 | Galería "Así queda por dentro" |
| int-sala-* | v01-excedente | seg. 27 (cuadro 028) | y 300 a 1650, 1080x1350; x4 | Galería "Así queda por dentro" |
| int-bano-* | v02-una-planta | seg. 23 (cuadro 024) | y 60 a 960, 720x900; x4 | Galería "Así queda por dentro" |
| letrero-* | 7658892646030511380 (¿tienes un crédito para vivienda?) | seg. 4 (cuadro 005) | 0 a 60 % de alto (letrero completo, sin la frase de abajo) | "Busca el letrero" en Crédito |
| logo.png, favicon-32.png, apple-touch-icon.png | `research/fotos/logo-tiktok.jpg` (200 px) | | redimensionado, sin estirar | Header, footer, iconos |
| og.jpg | casa-dos-plantas + logo + texto con PIL (DM Serif Display / DM Sans) | | 1200x630 | og:image |

Videos bajados pero sin cuadro usado: 7686707209354349845 (interiores con mano y letras), 7644034241335971093 (90 s con la mujer del equipo siempre en cuadro y letras fijas). No se usó ningún cuadro con personas en grande. Dos videos (7627692845029281045 y 7652948341575126292) no bajaron como video (yt-dlp solo trajo el audio o falló; probablemente carruseles de fotos).

Interiores reales limpios que SÍ existen en los videos y no se usaron para respetar el tope de fotos: v01 cuadros 21, 28, 34; v03 cuadro 8 (escalera) y 49 (baño); v02 cuadros 9, 24, 35.

Corrección 1 (30 sep): `terreno-excedente-*` y `terrenos-aerea-*` quedaron sin usar en `img/` (se cambiaron por `excedente-patio` y `terreno-sur`). Los recortes y los x4 de la corrección están en el scratchpad `sanjose-fix/src/`.

## Corrección 2 (30 sep 2026)
Recortes, x4 y webp hechos con `scratchpad/r2fix-san-jose-premier/crops.py` y `export.py` (fuentes en `src/`). Sin IA generativa ni stock. Real-ESRGAN x4 solo en `int-lavado` (cuadro de 720 px) y `pie-dron` (va a sangre en compu). Ningún recorte lleva letras ni caras.

| Archivo en `img/` | Video (ID TikTok) | Cuadro | Recorte | Dónde va |
|---|---|---|---|---|
| hero-tt21-{480,960,1233} | portada `research/fotos/tt-21.jpg` | | x 0 a 1233, y 0 a 850 (arriba de "Casa en Venta"); sin x4 | Hero (celular 5:4, compu columna derecha) y og.jpg |
| una-planta-tt30-{480,960,1236} | portada `research/fotos/tt-30.jpg` = 7611720873267203348 ("la Casa más Barata", 276.7K) | | x 0 a 1236, y 0 a 786 (arriba de la letra); sin x4 | Ficha "Una planta" y cierre (elección Una planta) |
| int-cocina-{480,960} | 7672935418857360661 (v03) | seg. 12 (013) | y 170 a 1520, 1080x1350; sin x4 | Tira de interiores "Cocina" |
| int-sala2-{480,960} | 7686707209354349845 (v01) | seg. 20 (021) | y 300 a 1650; sin x4 | Tira "Sala" |
| int-recamara-{480,960} | 7672935418857360661 (v03) | seg. 53 (054) | y 200 a 1550; sin x4 | Tira "Recámara" |
| int-lavado-{480,960} | 7640330900823198996 (v02) | seg. 19 (020) | y 250 a 1150, 720x900; x4 | Tira "Patio de lavado" |
| int-escalera, int-bano | (corrección 1) | | | Tira "Escalera" y "Baño" |
| bosques-casas-{480,960,1080} | 7651457616782167316 (v05, "Esto es lo nuevo en Bosques Providencia") | seg. 14 (015) | y 470 a 1920 (debajo del título en letras); sin x4. Se ve el parque y la fila de casas blancas de dos plantas | Foto grande de Bosques |
| bos-cancha-480 | mismo v05 | seg. 8 (009) | y 470 a 1820 (con el tablero) | "Ya tiene: Cancha" |
| bos-ejercicio-480 | mismo v05 | seg. 10 (011) | x 110 a 970, y 470 a 1545 (sin la sombra del que vuela el dron) | "Ya tiene: Aparatos de ejercicio" |
| bos-andador-480 | mismo v05 | seg. 13 (014) | y 470 a 1820 | "Ya tiene: Andador" |
| pie-dron-{480,960,1600} | 7658892646030511380 (v09, "¿Tienes un crédito...?") | seg. 13 (014) | y 0 a 1190 (arriba de "Si deseas más información"); x4 | Banda del pie con el lema |
| lad-final-960 | sale de `hero-fachada-1600` (v03, seg. 0) | | y 230 a 1397, 1600x1167 (mismo 1.37:1 del muro del SVG) | Remate del momento firma (cruce a la foto real) |
| og.jpg | hero-tt21 + logo + texto con PIL (DM Serif Display / DM Sans) | | 1200x630 | og:image |

Ya no se usan en la página: `hero-fachada-*` (solo como fuente de `lad-final`), `casa-una-planta-*`, `bosques-aerea-*`, `int-sala-*`, `casa-dos-plantas-*`, `terreno-excedente-*`, `terrenos-aerea-*` (no se borraron). La nota de origen de las fotos queda una sola vez, en el pie: "Fotos tomadas de los videos públicos de la constructora."

## Corrección 3 (30 sep 2026)
Recorte hecho con PIL en `scratchpad/r3fix-san-jose-premier/terr.py`. Sin IA generativa, sin stock y sin x4 nuevo (sale de un archivo que ya estaba subido con Real-ESRGAN).

| Archivo en `img/` | Video (ID TikTok) | Cuadro | Recorte | Dónde va |
|---|---|---|---|---|
| terrenos-fracc-{480,960,1600} | 7648858278222433556 (v08, últimos terrenos) | seg. 12 (013) | sale de `terrenos-aerea-1600`: x 0 a 1600, y 56 a 856 (2 % a 30 % del alto), 2:1. Campos, árboles y filas de casas blancas; sin el techo en obra ni el cascajo | Ficha "Terrenos" (pie "Los últimos terrenos, desde el dron") y cierre cuando se elige Terreno |
| hero-fachada-{960,1600} | (corrección 1) | | sin cambio | Vuelve al hero, solo en compu (`<picture>`, 900 px o más); en celular sigue `hero-tt21` |
| una-planta-tt30-{480,960}, dos-plantas-frente-{480,960} | (corrección 2 y 1) | | sin cambio | Además, las dos fotos 4:5 del cierre sin elegir |

Ya no se usa en la página: `terreno-sur-*` (no se borró).
