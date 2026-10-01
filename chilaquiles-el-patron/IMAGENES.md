# IMAGENES · origen y tratamiento (todo de research/fotos; sin IA generativa ni stock)
| Archivo en img/ | Origen | Tratamiento |
|---|---|---|
| hero-480/960/1600 | maps-20 (1600x1200) | recorte superior para quitar la taza con teléfono cortado; webp |
| c-verde-360/720 | maps-04 | recorte, exposición +6 % (tomada con luz baja); webp |
| c-rojo-360/720 | maps-07 (720x1280) | sin ampliar; se pinta a 300 px máx |
| c-enchiladas-360/720 | maps-15 | recorte que saca la taza blanca con letras; webp |
| c-huevos-360/720 | maps-02 | recorte; webp |
| enchiladas-480/960 | maps-11 | entera; webp |
| hotcakes-360/720 | maps-17 | fondo desenfocado con máscara para tapar envoltura de marca ajena y gente de atrás; webp |
| comedor-480/960/1440 | maps-13 | recorte, altas luces -12 %, saturación +5 %; webp |
| mural-480/960/1160 | maps-01 | recorte, altas luces -12 %, saturación +5 %; webp |
| salsas-480/960 | recorte de maps-11 (dos pocillos) | Real-ESRGAN x4 mezclado 50 % con el original LANCZOS y grano fino; se pinta a 480 px máx |
| logo-112/240, logo-disc-112, favicon-32, apple-touch-icon | research/fotos/logo-ig.jpg (150 px) | blanco de esquinas quitado por flood fill, ampliado LANCZOS; disco circular para favicon; no redibujado |
| og.jpg (1200x630) | maps-20 + tipografía Passion One | PIL |
Prohibidas y no usadas: ig-*, logo-fb, maps-03/08/12 (solo referencia de precios), maps-09, 10, 16, 19, 14, 18, 21, 05, 06.

## Pulidor (1 oct 2026)
- Sin cambios a los archivos de imagen. Se quitó `loading="lazy"` de enchiladas, hotcakes, salsas, comedor y mural (ahora `decoding="async"`). Íconos de redes: glifo de Instagram redibujado como SVG de trazo (ícono genérico de la red, no logo del negocio).
