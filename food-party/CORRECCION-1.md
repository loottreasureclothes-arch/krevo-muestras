# Corrección 1 · Food Party (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden)
1. Remate del cierre: la foto `tt-compila-salones-10` (cuadro de video subido) va a todo el ancho en celular (350 x 380 px) y se ve embarrada justo en la última impresión.
2. La charola "Verduras al vapor" de la fila es casi la MISMA foto del hero (toda la terraza), no el brócoli de cerca: en compu se ven las dos juntas en la primera vista del componente.
3. Componente firma: al servir, las porciones del plato muestran el canto de acero de la charola (el arroz y las verduras parecen lajas con borde de metal, no un montoncito de comida).
4. Compu 1440: la fila de charolas arranca con 440 px vacíos a la izquierda y la flecha "siguiente" queda encima de la tercera charola.
5. Compu 1440: en opiniones queda un hueco de ~300 px en la columna derecha entre las cuatro opiniones y los letreros, que quedan sueltos hasta abajo.
6. Celular: el letrero "EXPO BODA Y EVENTOS 2026" se sale de la charola y pega con el borde de la pantalla.
7. Celular: la fila de letreros de Facebook (COMIDA DELICIOSA, PERSONAL PROFESIONAL...) se corta a la derecha, debajo del flotante.
8. Celular: el "100 %" gigante lleva la foto muy acercada y oscura; las letras se leen sucias.
9. Celular: la cabecera de la tabla de la discada encima "PERSONAS DISCADA" sin aire.
10. Pie: el logotipo de Instagram está movido (el trazo sale cortado y desplazado), se ve roto junto a Facebook y TikTok.

## Qué se arregló y qué no
Arreglados:
1. Remate: la foto del cierre bajó a tamaño mediano (300 px en celular, 360 en tableta, 420 en compu) en charola 4:5 centrada; ya no se ve embarrada.
2. `plato-3` (verduras al vapor) recortado de nuevo de `fb-03` al brócoli y la zanahoria (recorte 480 px, subido con Real-ESRGAN mezclado 50 % con LANCZOS y grano). Ya no repite el hero.
3. Porciones del plato: seis recortes nuevos `por-1..6.webp` (320 x 254) solo de comida, sin cantos de acero, con sombra interior de volumen; porciones un poco más grandes.
4. Fila en compu/tableta: arranca con la tercera charola al centro (fila llena a los dos lados), flechas a 28 px de las orillas con desvanecido de máscara; ya no tapan charolas.
5. Opiniones en compu: rejilla reacomodada (foto del equipo debajo del "100 %", letreros y link debajo de las opiniones); sin hueco.
6. Letrero "EXPO BODA Y EVENTOS 2026" ahora se parte en dos renglones dentro de la charola.
7. Letreros de Facebook en celular: la columna de la rejilla estaba creciendo a 1,345 px por la tira de opiniones; con `minmax(0, 1fr)` ya se acomodan en 2 renglones, con aire entre patitas.
8. "100 %" gigante: la foto de adentro se movió a las charolas de colores (64 % 72 %); se lee más limpio.
9. Tabla de la discada en celular: cabecera con menos espaciado y aire entre PERSONAS y DISCADA.
10. Logotipo de Instagram del pie redibujado (cuadro redondeado, lente y punto), ya no sale movido.

No arreglados:
- La foto "Nuestro equipo" (`tt-noche-chef-14`) es cuadro de video con movimiento: se queda mediana; los tres cuadros del cocinero tienen la misma nitidez. Mejor con una foto original del dueño.
- La foto del cierre sigue siendo cuadro de TikTok subido; ya va mediana, pero una foto original de ese buffet la mejoraría.
- La porción de "arroz amarillo" sale lisa (en el video la charola se ve lejos y movida).
- La foto de la Expo deja ver letreros del stand (uno se lee dudoso "Papas Gratinadas"): sigue en PENDIENTES.

Verificación: krevo-shot m y d con `alertas: []`; alto en celular 8,524 px; 6 ligas wa.me; componente probado (servir 4 platillos, XV años, 20 invitados, jardín) arma el mensaje correcto.
