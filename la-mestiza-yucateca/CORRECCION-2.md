# Corrección 2 (inspector HD, 3 oct 2026)
## Fotos HD
Ninguna subida con Real-ESRGAN: todas las fotos grandes (fachada, patio, desayuno, noche) salen de originales de 1536-2048 px y ya tienen webp 1536/1600. Las únicas chicas (cochinita 19 y elote 21, 720x1280) solo se pintan en carta de la lotería (≤ 634 px reales), no hace falta subirlas.
## Problemas más visibles
1. Copy contradictorio: la carta decía "La carta, sin sorpresas." y la carta 8 de la lotería es "La sorpresa".
2. Celular: la comanda recortaba su pista ("Toca una carta para po…").
3. Compu: la comanda sticky, centrada y de 760 px, tapaba los nombres de 2 cartas al pasar.
4. Patio con loading="lazy" siendo foto a sangre de sección.
5. Tableta 820: columnas de "Cómo llegar" y de la carta muy apretadas (texto en 265 px).
6. Celular: la comanda sticky pisa la mitad baja de las cartas mientras se recorre (inherente al componente).
7. 4 de 8 cartas sin precio (dueño).
## Resultado
1. Arreglado: ahora "La carta de la casa."
2. Arreglado: pista "Toca y ponle frijol." (cabe sin cortar).
3. Arreglado: comanda a la derecha y de 520 px en compu, tapa a lo más una carta.
4. Arreglado: sin lazy.
5. Arreglado: media query 760-1023 con foto 48 %, menos padding y título más chico.
6. No arreglado: es el comportamiento del sticky; se quita al llegar al final de la tabla.
7. No arreglado: precios dependen del dueño (PENDIENTES).
Verificado: m 6,006 px y d con alertas: [], wa.me decodificado intacto (2 botones + flotante).
