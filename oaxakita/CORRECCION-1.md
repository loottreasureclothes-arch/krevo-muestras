# CORRECCIÓN 1 (pulidor, 5 oct 2026)

Problemas más visibles, en orden:
1. Momento firma: en el estado "ventana cerrada" el recorte en arco cortaba "Maíz. Mole. Mezcal." por abajo y por los lados (feo a media pasada, sobre todo en compu).
2. Celular, Arma tu tlayuda: el plato salía ANTES del título; la sección empezaba con una foto sin contexto.
3. Celular, pestañas de la carta: la fila se cortaba seca en "M..." sin pista de que se desliza.
4. Celular, carrusel de reseñas: sin pista de que hay 8; solo un asomo de la siguiente tarjeta.
5. Compu, galería: rejilla densa dejaba hueco abajo a la derecha y orillas disparejas.
6. Ticket "Tu pedido": "Copiar pedido" se quedaba en estado hover en celular (texto apagado) y tenía poco contraste sobre el papel.
7. Pestaña elegida podía quedar fuera de vista al tocar las del final.
8. Alto celular y espaciado de la sección firma (al reordenar subía a 10,970 px, casi al tope).

Prueba anti-genérico: 0 "sí" (fachada y letrero propios, ritmo alternado, 1 componente firma propio, sin verdes, sin contadores, 9 secciones dentro del alto pedido).

Resultado:
1. Arreglado: arco de pre-estado sin recorte abajo (4% lados en celular, 9% en compu) y palabras que suben 18 px; ya no se cortan ni quedan invisibles.
2. Arreglado: en celular `.pide-ctl{display:contents}` con orden eyebrow, título, plato, pasos, ticket.
3. Arreglado: degradado a la derecha de las pestañas que se quita al llegar al final.
4. Arreglado: línea "Desliza, son 8 mesas →" bajo el carrusel (solo celular).
5. Arreglado: mosaico explícito de 4 x 6 en compu y tableta, sin huecos.
6. Arreglado: hover solo con `(hover:hover)` y fondo leve en el botón activo.
7. Arreglado: al tocar una pestaña se centra en la fila.
8. Arreglado: espacios de la sección firma ajustados en celular; alto final 10,850 px.

Verificación: krevo-shot m y d `alertas: []`; encimes 0 en m, t, d (los 2 "fuera" en m son de los carruseles horizontales intencionales; la página mide 390 px de ancho sin scroll lateral). Componente probado con Playwright: Zandunga + chapulines x2 = $446, + Oaxakita Especial desde la carta = $684, copiar da "Hola, quiero pedir en Oaxakita: 2 x Tlayuda Zandunga con chapulines ($446); 1 x Tlayuda Oaxakita Especial ($238). Total: $684.", vaciar vuelve a "Elige arriba". Sin wa.me, sin "$0".
