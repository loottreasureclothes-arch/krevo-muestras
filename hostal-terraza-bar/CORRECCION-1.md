# CORRECCION-1 Hostal Terraza Bar (pulidor, 3 oct 2026)

## Problemas más visibles (en orden)
1. El dato gigante "4.6" se leía "4-6" (el punto de Syne sale como raya).
2. En celular el "6" del 4.6 se cortaba en el borde derecho.
3. Compu: la reseña grande quedaba en una columna angosta, una palabra por renglón.
4. Compu: el 4.6 a 340 px se comía la columna de reseñas.
5. Compu: título del hero roto en 6 renglones ("LA" y "TE" sueltos).
6. Compu: "Todo listo para completar" en una sola columna con media pantalla vacía.
7. El botón del componente firma y el flotante tenían wa.me sin texto si el JS no carga.
8. Prueba anti-genérico: pasa (letrero ovalado propio, ventana del cielo, focos de la azotea, 3 verdes, 7 secciones, 7,244 px).

## Resultado
- 1 arreglado: punto redondo propio (span) en el 4.6.
- 2 arreglado: 33vw y nowrap, cabe completo en 390.
- 3 arreglado: columnas minmax(0,1fr) y cita a 2.6vw, se lee en 6 renglones.
- 4 arreglado: 4.6 baja a 15vw en compu.
- 5 arreglado a medias: h1 de compu baja a 3.8vw; sigue partiendo "LA / CATEDRAL / TE / ESPERA".
- 6 arreglado: 2 columnas (título izquierda, lista y frase derecha).
- 7 arreglado: hrefs estáticos con texto armado; el JS sigue reescribiendo con hora, personas y carta.
- No arreglado: precios y nombres reales de la carta, WhatsApp confirmado y fotos de gatitos (dependen del dueño, en PENDIENTES).
