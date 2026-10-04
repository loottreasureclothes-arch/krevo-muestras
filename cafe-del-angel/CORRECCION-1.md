# CORRECCION-1 Café del Ángel (pulidor, 3 oct 2026)
Problemas más visibles, en orden:
1. Ticket del pedido mostraba "$0" de total antes de agregar (regla: nunca $0).
2. Terraza en compu: foto vertical estirada a 1180 px de ancho, se veía borrosa.
3. Hueco de ~140 px entre terraza y cocina en compu.
4. Hero en compu: texto de apoyo y botones chiquitos para 1440.
5. "Todo listo para completar" en compu chiquito y perdido.
6. Arco de terraza en compu con título de 7.4rem que casi se sale de la caja.
7. Redes sociales ausentes en el pie (no hay URL en research).
8. Logo de alas es dibujo propio, no su logo real.
Prueba anti-genérico: pasa (componente firma propio, ritmo alternado, 7 secciones, 7,030 px).

## Resultado
- 1 arreglado: total vacío dice "Elige tu bebida" en chico; con bebidas suma normal.
- 2 arreglado: caja de terraza a 880 px y 720 px de alto, menos estirado.
- 3 arreglado: terraza sin padding abajo y cocina con 72 px arriba.
- 4 arreglado: lead 1.4rem y botones de 60 px en compu.
- 5 arreglado: título 3.4rem y lista más grande en compu.
- 6 arreglado: título de terraza a 6rem en compu.
- 7 no arreglado: falta URL real de Facebook/Instagram (PENDIENTES).
- 8 no arreglado: falta archivo del logo (PENDIENTES).
Verificación: m y d con alertas [], celular 7,030 px, wa.me decodifica "Hola Café del Ángel, quiero pedir." al 524499155713.
