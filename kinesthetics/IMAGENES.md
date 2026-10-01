# Kinesthetics: imágenes (origen y tratamiento)

Todo sale de `research/fotos/`. Cero IA generativa, cero stock. NADA pasó por Real-ESRGAN otra vez (los `reel-terapeuta-*` ya venían subidos x4 desde 480x848).

| Archivo en `img/` | Origen | Tratamiento |
|---|---|---|
| `hero-t03-480/960.webp` | `reel-terapeuta-03.jpg` | recorte 4:5 (380, 560, 1540x1925); mezcla 50 % con su versión a resolución original (÷4 y LANCZOS) para quitar el plástico; grano fino; webp q80. Entra la cara del terapeuta, la firma bordada y las manos; fuera la paciente. |
| `mov-t07-480/960.webp` | `reel-terapeuta-07.jpg` | recorte 4:5 (0, 640, 1920x2400); misma mezcla y grano. Solo se ve un brazo de la paciente, sin cara. |
| `sal-t2-02-480/960.webp` | `reel-terapeuta2-02.jpg` (1080x1920 nítida) | recorte 4:5 (0, 420, 1080x1350); la carátula del reloj se desenfocó limpia por prudencia (no se leía marca a 960 px). |
| `bel-spa04-480/960.webp` (corrección 1; reemplaza a `bel-spa05`, que se leía como textura plana) | `reel-spa-04.jpg` (1080x1920 nítida) | recorte 4:5 (0, 180, 1080x1350): pared de cabina, cables y cinturón de electrodos envolviendo el cuerpo; fuera la marca de agua de abajo; LANCZOS y grano fino; webp q82. |
| `cabina-d-800/1280.webp` | `maps-03.jpg` | recorte compu (0, 0, 1280x490): sin el texto quemado "Ven y disfruta de nuestros servicios:". |
| `cabina-m-480/800.webp` | `maps-03.jpg` | recorte celular (440, 40, 800x460): almohadas turquesa, camilla y aparato; sin el texto quemado. |
| `cierre-t01-480/960.webp` (`frase-t01-*` ya no se usa) | `reel-terapeuta-01.jpg` | recorte (110, 640, 1700x2125) que deja fuera la mancha oscura de abajo; misma mezcla y grano. La chica de la frase solo se descarga en compu (loading lazy; decorativa). |
| `frase-t02-320/480.webp` (corrección 1, foto chica de la frase solo en compu, para no repetir la del remate) | `reel-terapeuta-02.jpg` | recorte (0, 420, 1440x1800): el terapeuta inclinado con la firma bordada; la paciente queda fuera salvo una sombra de pelo sin rasgos; mezcla 50 % con su versión a resolución original y grano fino. |
| `chica-t04-320/480.webp` | `reel-terapeuta-04.jpg` | recorte (200, 420, 1700x2125); solo chica (máx. 220 px). |
| `firma-1200.png`, `firma-h-240.png`, `firma-lema-440/880.png` | `logo-fb.jpg` | recorte de la firma y el lema; alfa por color (turquesa de la firma por G-R; lema gris oscuro por luminosidad en su caja) sobre el fondo gris claro; la firma NO se redibuja. El lema pasa a mineral `#E9EEEC`. `firma-h-240.png` (header) lleva un engrosado de 11 px antes de bajarla para que se lea a 36 px de alto. |
| `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | la "K" de la firma real | componente conexo de la K sobre grafito, trazo engrosado, banda turquesa a 60° en la esquina inferior derecha (PIL). |
| `og.jpg` (1200x630) | PIL | grafito, pareja banda + filete a 60°, firma con lema, titular en Encode Sans (segunda mitad turquesa) y `hero-t03` con corte de 60°. |

NO usadas (por hoja): flyers de FB/IG, `reel-presentadora-01/02`, `maps-01`, `maps-04`, `reel-terapeuta-05/06`, `reel-terapeuta2-03`, `reel-spa-01..03`, `reel-spa-05` (desde la corrección 1), todo `_videos/`, `_hoja.jpg`.

Límites reales: son cuadros de video; a 390 px @2x las fotos medianas se ven suaves pero sin bloques (ninguna pasa de ~460 px CSS en compu). Se pide al dueño fotos horizontales reales.
