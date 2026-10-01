# Imágenes de Letras Gigantes RG (1 oct 2026)
Todas son fotos reales de su Instagram @letras_gigantes.rg (carpeta `research/fotos/`). Sin IA generativa, sin stock, sin Real-ESRGAN. Todo con PIL a WebP.

## En `img/h/` (fotos grandes y medianas)
| Archivo | Origen | Tratamiento |
|---|---|---|
| hero-480 / hero-941 | ig-c28-01 (AGS de noche, 941x1254) | WebP; en compu máximo 560 px de ancho; velo violeta solo abajo en celular; autos del fondo sin placa legible |
| ximena-960 / ximena-1448 | ig-ximena-22 (XIMENA, 1448x1931) | WebP; en la página se parte en 6 franjas por CSS (las medidas de corte están en `--x0` y `--w` de cada franja, tomadas de los huecos entre letras) |
| ohbaby-480 / 960 / 1440 | ig-oh-baby-00 (1440x1920) | WebP; remate a sangre en celular |
| katy-480 / 960 | ig-c26-03 (KATY XV, hacienda) | WebP |
| novios-480 / 960 | ig-c27-05 (¿NOVIOS? a contraluz) | WebP |
| mr-420 / 840 | ig-c35-05 (M&R, 1024 px) | WebP; máximo 420 px en compu |
| c33-05 (480, 800) | ig-c33-05 SANDRA | WebP; tarjeta del catálogo |
| c34-01 (480, 800) | ig-c34-01 cabina VOGUE | WebP |
| c16-02 (480, 800) | ig-c16-02 espejo marco dorado | WebP |
| c31-06 / c31-03 / c31-01 | ig-c31-06 Cielito Lindo, ig-c31-03 tres mamparas, ig-c31-01 palmera y tablas | WebP |
| c25-12 (480, 800) | ig-c25-12 recibidor caballete | WebP |

## En `img/letras/` (mosaicos del componente firma)
Cada letra es un recorte 3:4 de una foto real, la letra centrada con su foco y un poco de piso: `<letra>.webp` 240x320 (escenario) y `<letra>-s.webp` 40x56 (header). El mapa de qué foto salió cada una está en `mapa.json` y en `SRC` de `site.js`.
A: ig-c21-06 (A&O), a2: ig-c21-04, a3: ig-c21-08 · B: ig-c25-04 · C: ig-c26-04 · D: ig-c33-07 · E: ig-c21-04, e2: ig-c33-04 · G: ig-c21-09, g2: ig-c33-06 · H: ig-c33-03 · I: ig-c26-06, i2: ig-c33-04 · J: ig-c21-08 · K: ig-c33-04 · L: ig-c33-02 · M: ig-c33-07, m2: ig-c33-06 · N: ig-c33-02, n2: ig-ximena-22 · O: ig-c21-06, o2: ig-c33-03 · P: ig-c33-03 · Q y U: ig-c27-03 · R: ig-c21-09, r2: ig-c26-06 · S: ig-c26-06 · T: ig-c33-04 · V y X: ig-c21-05 · Y: ig-c33-04 · &: ig-c21-09 · ¿: ig-c27-02 (qi) · ?: ig-c27-02 (qd).
Sin foto: F, W, Z, Ñ y números (caja punteada, nunca letra inventada).

## Marca
`logo.jpg` / `logo-96.png` / `favicon-32.png` / `apple-touch-icon.png`: recortes de `logo-fb.jpg` (345x351), sin redibujar. `og.jpg` 1200x630 hecha con PIL (Bungee + Outfit, foto AGS en marco con canto, línea de degradado del logo).

## No usadas (prohibidas o dudosas)
c01 (casita rosa), c19 (bar vinícola, marca ajena), c24 (neones, parecen render), `_flyers-NO-USAR`, `_memes-ajenas-NO-USAR`, ig-c25-10 (nombre de menor), ig-c31-04 (nombres de clientes), y las de texto quemado salvo recortes de letras lejos del texto.

## Corrección 1 (pulidor, 1 oct 2026)
- Recortados de nuevo (PIL, sin IA) los mosaicos p, h, o2, t, y, v, x, j, r para quitar letras vecinas cortadas: caja medida en la foto original, letra completa, 360 px de alto, orillas oscurecidas a `#14102A`. Anchos nuevos en `AR` de site.js y en `mapa.json`.
- `logo.jpg` y `logo-96.png` recortados al círculo real de `logo-fb.jpg` (0,3,345,348) y mostrados redondos.
