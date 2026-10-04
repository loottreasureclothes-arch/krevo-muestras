# CORRECCION-2 La Plazoela (inspector HD, 3 oct 2026)
## Fotos a HD
Ningún original usado mide menos de 1,600 px de lado mayor (todos 1536-2048), así que no se usó Real-ESRGAN. Se regeneraron los webp desde los originales con LANCZOS, calidad 82, recuperando el recorte exacto por plantilla, y se agregó la talla 1600 (ancho real máximo) a pozole, tostadas, platón, café, puerta, patio y salón. Hero ya iba a 1536 (su máximo). 8 fotos regeneradas.

## Problemas más visibles
1. "Mesa de cuadros" (maps-14): close-up borroso de papas con aro de cebolla, el mantel casi no se veía; en compu peor (1148 px estirados a 1600).
2. Collage "La casa": el arco alto (maps-16, patio) era una foto oscura con LED azul, se veía barata.
3. Celular: la cita de Google quedaba tapada por el botón flotante de WhatsApp ("todo m… limpio").
4. srcset sin talla 1600: en compu @2x las fotos de carta y collage se servían a 960.
5. Nombre "Platón de enchiladas" sin confirmar (ya está en PENDIENTES; research lo etiqueta así y una reseña menciona enchiladas).
6. Café, tostadas y platón con "Pregunta el precio" (dato que no existe en research).

## Resultado
1. Arreglado: mesa = maps-19 (pozole y café de olla sobre el mantel azul/amarillo). Vertical 1536x2048 en celular, recorte horizontal 1536x1024 en compu. Mismos nombres de archivo.
2. Arreglado: arco alto = maps-08 (rincón con nicho y pared azul, 1080x1920, LANCZOS sin subir). Archivo sigue llamándose patio-*.webp.
3. Arreglado: blockquote con margin-right 56 px en celular (0 en compu).
4. Arreglado: 1600w real en 7 fotos.
5. No arreglado: queda como PENDIENTE del dueño.
6. No arreglado: falta la carta con precios (PENDIENTES).
Verificación: m y d con alertas: [], 6,813 px en celular, 8 wa.me decodificados intactos, 0 cargas fallidas, sin git.
