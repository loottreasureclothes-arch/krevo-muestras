# Corrección 2 (inspector HD, 3 oct 2026)

## Fotos a HD
8 fotos con talla real máxima agregada al srcset (hero-1200, flan-1204, rebanada-1080, blanco-1280, nuez/marmol/galletas/gelatinas-1245). Sin Real-ESRGAN: ningún original está por debajo de 1,200 px.

## Los 6 más visibles
1. Hero celular: el velo café arrancaba al 38 % y la foto se leía como media pantalla; no era cartel.
2. Tableta 820: título del hero en 4 líneas (pendiente de la pasada 1).
3. Compu: hueco de ~190 px entre las tarjetas de la vitrina y "¿Cuántos van a comer pastel?".
4. Celular: rejilla de personas (7 en 4 columnas) dejaba una celda vacía al final.
5. Sucursales: el recorte de la foto de Zaragoza cortaba el letrero.
6. img/interior-480/960.webp (160 KB) no se usaban en ningún HTML.

## Resultado
1. Arreglado: foto a 72svh, velo desde el 50 %, título sube 170 px sobre la foto.
2. Arreglado: en 720-1099 px el título va en clamp(40px,5vw,56px); en compu (≥1100) no cambia.
3. Arreglado: vitrina 60 px abajo + arma 64 px arriba en compu.
4. Arreglado: tamaños en flex centrado; la última fila de 3 queda al centro (7 por fila en compu igual).
5. Arreglado: object-position 50% 36% en las fotos de sucursal.
6. Arreglado: borradas.
No arreglado: WhatsApp real, dirección de Américas y carta con precios siguen en PENDIENTES (datos de la dueña). Américas sin foto (no existe ficha).
