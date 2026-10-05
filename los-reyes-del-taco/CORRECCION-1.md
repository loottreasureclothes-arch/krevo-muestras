# CORRECCION-1 - Los Reyes del Taco (pulidor)

## 8 problemas más visibles (en orden)
1. Header de celular: "Los Reyes del Taco" se parte en 4 renglones y se sale de la barra roja (primera pantalla se ve apretada).
2. Tableta 820: es el celular estirado (todo corta en 821 px) y mide 11,978 px.
3. Alto de celular al límite: 10,911 px vacío y 11,021 px con la comanda usada (pasa de 11,000).
4. Compu 1440: header solo con hamburguesa "Menú"; sin navegación a la vista en pantalla grande.
5. Compu: pestañas de la carta en columna angosta, dejan un hueco azul grande bajo la placa.
6. Ticket de la comanda: "Los Reyes del Taco" se parte en dos renglones y empuja "Central · para llevar".
7. Pie de celular largo (700 px) con Central y Encino apilados; cierre que se desinfla.
8. Reseñas en celular: 2,126 px de tarjetas con mucho aire; la sección más larga de la página.

Prueba anti-genérico: 1 no (letrero, rayos azules de su carta, comanda con sus precios); 2 no; 3 no (calle en placa azul y letrero real); 4 no (4 wa); 5 no; 6 no (comanda con presupuesto es propia); 7 no; 8 no (8 secciones + pie). Pasa.

## Resultado
1. Arreglado: nombre en 2 renglones sin cortar, "Menú" solo hamburguesa bajo 420 px, chip de horario más compacto.
2. Arreglado: corte a 768 px; tableta 820 ya usa diseño de 2 columnas (reseñas a 2 columnas con título arriba de 768 a 1079). Alto tableta 8,698.
3. Arreglado: celular 10,542 vacío y 10,651 con 4 renglones en la comanda (dato, recorrido, mapa, horario y lista ajustados).
4. Arreglado: navegación en línea en el header desde 1080 px (La carta, Tu comanda, Opiniones, El lugar, Visítanos), 44 px de alto.
5. Arreglado: pestañas de la carta en rejilla de 2 columnas con más cuerpo; sin hueco azul.
6. Arreglado: encabezado del ticket sin partir.
7. Arreglado: pie de celular con Central y Encino lado a lado (700 a 561 px).
8. Arreglado: tarjetas de reseña más compactas; texto de reseñas intacto.
Comanda probada con clics reales en Chromium: 1 pastor + 2 bisteck + 1 taquigringo + 1 agua = $81 (cuadra con la carta); "Llénala por mí" con $100 = $95, sobran $5. wa.me decodificado correcto.
No arreglado: logo RT sigue siendo medallón dibujado (sobrio, en PENDIENTES pedir el real); mapa en blanco en capturas de la nube (esperado).
