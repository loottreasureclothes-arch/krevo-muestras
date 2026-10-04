# Corrección 2: La Casa del Chilaquil (inspector HD, 3 oct 2026)

## Fotos a HD
- mesa (maps-10, 1080x720): Real-ESRGAN x4 + 50 % LANCZOS + grano σ2 → 480/960/1600. El srcset de la carta ahora apunta a mesa-1600 (se borró mesa-1080).
- fachada (maps-19, 960x1280): mismo proceso → 480/960/1200 (talla real máxima); se agregó 1200w al srcset.
- hero (1538x2048), jarro y comedor (2048) ya pasaban de 1,200 px: no se tocaron.

## Los 6 problemas más visibles
1. Celular: el flotante verde tapaba la punta de "Ver la carta" en la primera pantalla (dos verdes juntos en el hero).
2. Compu/tableta: hueco de 108 px entre la foto del hero y el arco de la carta.
3. Compu/tableta: hueco de 108 px entre "Mandar mi pedido" y el eyebrow de Divorciados.
4. Compu/tableta: hueco de 112-116 px entre "Este WhatsApp es el de la sucursal Encino." y el recuadro "Todo listo".
5. Todos los anchos: hueco de 103-115 px entre el recuadro "Todo listo" y el nombre del pie.
6. Compu: el recuadro "Todo listo" iba a todo lo ancho con 5 renglones en una sola columna (se veía vacío).

Prueba anti-genérico: 1 no, 2 no, 3 no (arco + su letrero), 4 no (5 verdes), 5 no, 6 no, 7 no, 8 no (7 secciones, 7,395 px). Pasa.

## Resultado
1. Arreglado: el hero lleva data-hide-wa; el flotante aparece hasta que el hero sale de pantalla.
2. Arreglado: padding inferior del hero en compu 64 → 36 px.
3. Arreglado: carta con padding inferior 36 px y Divorciados sin padding superior en compu.
4. Arreglado: casas con padding inferior 16-20 px y recuadro con padding 22 px.
5. Arreglado: sección completar con padding inferior 20-28 px y pie con padding superior 36 px.
6. Arreglado: la lista del recuadro va a 2 columnas desde 760 px.
Medido con script CDP: 0 huecos > 90 px en 390, 820 y 1440. Alto celular 7,395 px. krevo-shot m y d: alertas [], 5 wa.me intactos, 0 fallas de carga.

No arreglado: el jarro sigue siendo foto suave de origen (2048 px pero desenfocada; pendiente mejor foto del dueño); solo 2 reseñas con nombre, precios y redes siguen pendientes del dueño.
