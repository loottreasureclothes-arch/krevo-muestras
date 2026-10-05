# Corrección 1 (pulidor), Cazona Corzo, 5 oct 2026

## 8 problemas más visibles (orden de visibilidad)
1. Hero celular: el eyebrow "Bar restaurante · Galeana Nte 112" se perdía sobre la foto clara.
2. Hero celular: la línea "4.1 en Google · 2,489 opiniones" quedaba bajo el botón flotante.
3. Fotos que venden (pizza de la carta, toldos, vistas del sol, galería) con loading="lazy".
4. Visítanos celular: "Cómo llegar" partido en dos renglones.
5. Pie sin botón de acción (solo número en texto).
6. Todo listo para completar cerraba con "Volver arriba": cierre que se desinflaba.
7. Compu, sección de la terraza: columna de texto chica junto al arco, se veía vacía.
8. Botón flotante pasa sobre títulos al hacer scroll en celular (transitorio).

Prueba anti-genérico: 1 no (letrero dorado, arco de zaguán, Catedral), 2 no, 3 no (Catedral y letrero), 4 no (0 verdes, sin WhatsApp), 5 no, 6 no (La hora de la terraza), 7 no, 8 no (8 secciones + pie, 9,992 px por exigencia del cliente). Pasa.

## Resultado
1. Arreglado: eyebrow más claro con sombra y velo de celular más oscuro a esa altura.
2. Arreglado: padding derecho de 70 px en celular.
3. Arreglado: quitado lazy de todas las fotos; solo el iframe del mapa queda lazy.
4. Arreglado: nowrap y padding 16 px.
5. Arreglado: botón "Apartar mesa" (tel:) en el pie.
6. Arreglado: botón "Llamar al restaurante" (tel:, sin wa.me).
7. Arreglado: la frase pasa a Cinzel 28 a 38 px.
8. No arreglado: es momentáneo y no lo marca encimes (0 en m, t y d).

Verificación: krevo-shot m 9,992 px y d 10,221 px con alertas []; encimes 0/0/0; 8 reseñas reales; mapa embebido; 0 wa.me, 12 tel:; total vacío = "Elige arriba", sin precio = "Pregunta el precio".
