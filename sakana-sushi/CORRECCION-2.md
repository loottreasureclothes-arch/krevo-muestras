# CORRECCION-2 Sakana Sushi (inspector HD Fable 5, 3 oct 2026)

## Fotos HD
0 subidas: los originales de hero, gratinado, barra, caja1, caja2, udon y local miden 1,440-2,048 px (todos > 1,200), fuera de la regla de Real-ESRGAN. Anotado en IMAGENES.md.

## Los 6 problemas más visibles
1. Compu, "Arma tu caja": la columna de controles era corta y quedaba ~250 px de hueco a la derecha de la caja; las dos fotos de caja salían chicas a la izquierda con media pantalla vacía.
2. Tableta (700-899 px): todo era el celular estirado (carta en 1 columna, caja, opiniones, lugar y pendientes en una sola columna).
3. Banderola del hero "Sushi en Aguascalientes": genérica, podría ser de cualquier sushi.
4. Compu, hero: botones de 48 px se veían diminutos junto a un título de 118 px.
5. Caja vacía mostraba "Suma $0" sin nada adentro (bloque muerto en celular y compu).
6. Campo del nombre: "Como te llamo" sin signos ni acento.

## Resultado
1. Arreglado: fotos de caja movidas dentro de la rejilla; en compu la caja ocupa dos filas a la izquierda, controles arriba y fotos abajo a la derecha (alto compu 5,883 → 5,547 px, sin hueco).
2. Arreglado: bloque de tableta en site.css con 2 columnas propias en carta, caja, opiniones, lugar y pendientes.
3. Arreglado: "Rollos para llevar en Las Flores" (datos de research: para llevar + colonia).
4. Arreglado: botones del hero a 58 px y 14 px en compu.
5. Arreglado: "Suma" se oculta hasta que hay un rollo (body.has-n).
6. Arreglado: "¿Cómo te llamo?".
No arreglado: fotos de clientes de calidad regular (no hay originales mejores ni se usa IA); WhatsApp, horario por día, IG/FB y logo siguen en PENDIENTES.

Prueba anti-genérico: 1 no (caja de unicel, placa 319, banderolas), 2 no, 3 no, 4 no (0 verdes), 5 no, 6 no, 7 no, 8 no (7 secciones, 7,025 px).
Verificación: m 7,025 px y d 5,547 px, alertas: [] en ambos, consola limpia, 0 cargas fallidas; wa.me sigue cableado en 03-caja.js (oculto hasta que den número). Sin git.
