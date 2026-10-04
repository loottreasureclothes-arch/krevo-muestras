# Correccion 1 Calvillo Lindo Terraza (pulidor, 3 oct 2026)
## Problemas mas visibles (en orden)
1. "Vista a las escalinatas" mostraba cielo y techo, no las escalinatas.
2. Fotos de carta y vista sin HD (tacos 1448, camarones 1152, escalinata 1542).
3. En celular el boton "Mandar mi subida" salia ANTES de los 3 peldanos.
4. Voz de investigador: "Resumen de Google Maps: ..." en voces.
5. Voz de investigador: "segun Google Maps" en el calculo de la subida.
6. Etiqueta "Destacado en Google" en 3 platillos de la carta.
7. Cierre de "Como llegar" en celular con escalera grande y hueco abajo.
8. Facebook del pie es una busqueda, no la pagina oficial.
Prueba anti-generico: pasa (0 si en 1-8).
## Resultado
- 1 arreglado: recorte nuevo de maps-15 (20-80 %) sin gente, object-position 55% 72%.
- 2 arreglado: Real-ESRGAN x4 mezclado 50 % + grano, ahora 1600 px (tacos, camarones, escalinata). Hero y hamburguesa ya estaban en HD.
- 3 arreglado: en celular peldanos primero y luego boton + "Asi les llega".
- 4 arreglado: "Lo que mas repiten: porciones generosas y una vista hermosa."
- 5 arreglado: "De $100 a $200 por persona."
- 6 arreglado: "De los que mas recomiendan".
- 7 arreglado: escalera mas chica y menos padding en celular.
- 8 no arreglado: falta la URL real de Facebook (PENDIENTES).
Verificacion: m y d alertas [], celular 6,405 px, 4 wa.me a 524959562971 con texto armado.
