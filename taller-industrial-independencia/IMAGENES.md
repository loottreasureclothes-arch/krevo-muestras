# Imágenes: Taller Industrial Independencia (1 oct 2026)

Todas son fotos reales de la ficha de Google Maps del taller (`research/fotos/`). No hay IA generativa, ni Higgsfield, ni banco. Todo con PIL, OpenCV y Real-ESRGAN local.

| Archivo en `img/` | Origen | Tratamiento |
|---|---|---|
| `hero-480/899.webp` | `taller-09` (899x1600) | Recorte 4:5 sobre la pieza sujeta en la mesa y el lector digital. Sin Real-ESRGAN (aguanta). |
| `nave-480/899.webp` | `taller-08` (899x1600) | Recorte de y 320 a 1600: sin las caras del fondo ni la máquina de soldar con marca. Corrección 1: balance de gris parcial, niveles y contraste (quitada la dominante café). |
| `grua-480/724.webp` | `taller-07` (899x1600) | Recorte x 175 a 899: sin la persona de la izquierda ni la casa vecina con su número. La cadena y la placa son SVG encima. Corrección 1: niveles, gamma 1.18, contraste y balance de gris parcial (estaba quemada). |
| `fachada-480/960/1600.webp` | `taller-06` (1600x899) | Letrero completo con los tres oficios, sin recortar el gráfico de la lona. |
| `th-torno.webp` | `taller-01` | Miniatura 64 px (se pinta a 64 a 120 px máx.). Recortada fuera la placa de marca. Real-ESRGAN x4 mezclado 50 % con el original (LANCZOS) más grano fino. |
| `th-fresa.webp` | `taller-10` | Igual: miniatura, mezcla 50 % más grano. |
| `th-radial.webp` | `taller-04` | Recortados fuera el sello de fecha y la placa de marca del cabezal. Mezcla 50 % más grano. |
| `th-plasma.webp` | `taller-02` | Recorte a la antorcha y el círculo de barrenos, fuera la máquina de soldar con marca. Mezcla 50 % más grano. |
| `th-tablero.webp` | `taller-05` | Camino de mantenimiento; marca del tablero tapada si se leía. Mezcla 50 % más grano. |
| `logo-tii.png` | Lona de `taller-06` (x 270 a 560, y 320 a 450) | `warpPerspective` de OpenCV para enderezar, Real-ESRGAN x4 mezclado 50 % con el original más grano. Sigue algo suave porque es una lona fotografiada; ver PENDIENTES (logo en alta). Corrección 1: autocontraste suave, contraste 1.15, saturación 0.9 y nitidez para que la TII no se vea deslavada (sin redibujar nada). |
| `og.jpg` | `taller-06` | 1200x630 con PIL: Big Shoulders 900 a la izquierda, letrero con bridas a la derecha, Martian Mono abajo. |
| `favicon-32.png`, `apple-touch-icon.png` | Compuestos | Iniciales "TII" en Big Shoulders 900 sobre azul TII. No son el logo. |

Sin uso: `taller-03` (se ignora si es de ellos), foto de Expomaquila y todo lo de Agro Industrial Hidráulica.
