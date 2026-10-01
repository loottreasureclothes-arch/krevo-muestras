# Imágenes de El Palacio del Ropón (origen y tratamiento)

Todo sale de `research/fotos/` (4 fotos de Google Maps, cuadros de sus 20 videos de TikTok y el logo de su foto de perfil). Nada de IA generativa ni de stock. Todas van en escudo con marco dorado (SVG), ninguna a sangre, ninguna a más de 440 px en compu. Recortes 4:5, reducidas con LANCZOS a su talla real de pantalla (x2) y exportadas a WebP; sin pasar otra vez por Real-ESRGAN. La marca de agua dorada de sus prendas se queda (es suya). Sin niños, sin la vendedora, sin el letrero ajeno.

| Archivo(s) en `img/` | Origen | Dónde | Tratamiento |
|---|---|---|---|
| hero-440/880 | maps-03 | hero | recorte 4:5 del interior (candil, repisas) |
| g1 (300/600) | video-13 | galería I Petit Sophia | recorte 4:5 a todo el ancho del cuadro (escote, mangas, corpiño y flores con perlas), más abierto que el anterior (corrección 1) |
| g2 | video-30 | galería II ropón petit flores durazno | recorte 4:5 |
| g3 | video-24 | galería III Príncipe Azul | recorte 4:5 |
| g4 | video-16 | galería IV Príncipe | recorte 4:5 |
| g5 | video-08 | galería V traje charro con sombrero | recorte 4:5 |
| g6 | video-02 | galería VI Lucía (comunión) | recorte 4:5 |
| g7 | video-06 | galería VII biblia, rosario, velo y corona de flores | recorte 4:5 |
| paq-440/880 | video-26 | paquete | recorte 4:5 |
| paq-a / paq-b (240/480) | video-27 / video-38 | paquete, dos chicas | recorte 4:5 |
| mom-440/880 | maps-05 | momento firma | recorte 4:5 |
| mom-a / b / c | video-04 / video-40 / video-09 | medallones del momento firma | recorte 4:5 de detalle |
| tienda-440/880 | maps-01 (corrección 1) | tienda | recorte de la fachada justo debajo del renglón de Glamour (nada del panel ajeno) hasta la banqueta, con el letrero completo; letrerito azul ajeno de la pared izquierda tapado con el muro de arriba; Real-ESRGAN x4 del recorte de 500 px mezclado 50 % con LANCZOS + grano fino. Sustituye al cuadro de video-41, que cortaba la "E" del letrero |
| tienda-a / tienda-b | maps-04 / video-28 | tienda, dos chicas | recorte 4:5 |
| cierre-440/880 | video-31 | cierre "Para ese gran día." | recorte 4:5 de cintura y flores. Sustituye a video-15 (el moño de la hoja), que está movido y borroso a cualquier tamaño |
| logo.png, logo-sm.png, logo-full.png | research/fotos/logo-tiktok-1080.jpg | header, menú, pie | fondo `#DBD0CC` quitado por distancia de color con borde suave; sin redibujar |
| cherub-l/r, crown, laurel | el mismo logo | momento firma y corona de "Coronar" | piezas recortadas con máscaras de polígono; sin redibujar |
| favicon-32/64, apple-touch-icon | el mismo logo | pestaña | escudo con la "P" sobre `#DBD0CC` |
| og.jpg | maps-03 + logo | tarjeta de WhatsApp (1200x630) | PIL con Libre Caslon Display y Tenor Sans |

Prohibidas y no usadas: maps-01 sin recortar (solo va el recorte de la tienda), video-41 completo y su recorte, video-01, video-15, video-20, video-35, video-37, video-39, todo `research/_descartes/` y `research/_videos/` como video.
