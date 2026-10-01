# Forza Fitness Club · Imágenes (30 sep 2026)

Todas salen de `research/fotos/` (fotos públicas del negocio). Sin IA, sin stock. Procesadas solo con PIL y OpenCV; webp calidad 76 a 80 con srcset 480 / 960 / 1600 (hero 960 / 1600 / 2048).

| Archivo en img/ | Origen | Proceso | Dónde va |
|---|---|---|---|
| hero-960/1600/2048.webp | maps-01.jpg (Google Maps, 2048x1536) | OpenCV inpaint para borrar "forzafc.com.mx" de la lona (dominio muerto); contraste +6 % | Hero (compu) |
| hero-m-480/960.webp | maps-01.jpg, recorte vertical x 860 a 1874 | igual que arriba | Hero (celular) |
| rack-480/960/1600.webp | maps-04.jpg (1600x1600, oscura) | gamma 0.62, balance de color (menos cian), contraste +12 % | Club (compu) |
| rack-m-480/960.webp | maps-04.jpg, recorte vertical x 200 a 1200 | igual | Club (celular) |
| funcional-480/960.webp | maps-03.jpg, recorte 1250x1550 | gamma 0.66, saturación 0.78 | Horario, foto lateral (paralelogramo). Tiene algo de desenfoque de movimiento; se muestra chica |
| reloaded-480/960/1600.webp | fb-01.jpg (cartel propio "Reloaded · Always Forza") | sin cambios | Planes, arte de fondo con máscara |
| og.jpg (1200x630) | maps-01 con velo + rayo del logo (vector trazado del logo) + "Sin excusas. Solo resultados." | PIL, fuente Avenir Next Condensed Heavy Italic (la web usa Barlow Condensed) | og:image |
| favicon-32.png, apple-touch-icon.png | logo-facebook.jpg (recorte central) | PIL | favicon |

- El rayo del header, del club y de los divisores es un SVG propio trazado con OpenCV del logo real (logo-facebook.jpg); no es un archivo de imagen.
- Descartadas a propósito: maps-05 (caras de socios), maps-06 ("no hay agua"), maps-02 (oscura y vertical) y todas las `ig-*` (gráficos con texto). ig-01 solo se usó como fuente de datos del horario.
