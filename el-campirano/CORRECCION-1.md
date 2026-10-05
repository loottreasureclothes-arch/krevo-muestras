# CORRECCION-1 (pulidor, 5 oct 2026)
Problemas más visibles:
1. Componente firma "Júntenme las mesas" repetía día + hora + recado de volodia-panaderia ("El recado de la llamada").
2. Las mesas no se "juntaban": se redibujaban de golpe en filas de 3 separadas.
3. Asientos de niño poco distintos de los de adulto.
4. Faltaba un total de mesas que se leyera de un vistazo.
5. Recado largo y genérico; pedido: "Somos N adultos y M niños, ¿nos juntan X mesas?".
6. Pista con datos de día ya sin sentido al quitar el selector.
7. Precios de la carta sin cotejo contra las fotos de menú.
8. Alto en celular por pestaña sin medir (debe quedar 9,000 a 11,000).

Resultado:
1. Arreglado: fuera día y hora; solo adultos y niños.
2. Arreglado: DOM persistente; cada mesa nueva llega deslizándose y se pega a la anterior con costura que destella (0.6 s, transform/opacity); hasta 4 mesas juntas por fila, ancho calculado al contenedor.
3. Arreglado: adulto = silla mostaza redonda; niño = lugar rojo chico con aro crema; leyenda en las etiquetas.
4. Arreglado: número gigante Patua + "mesas de 4 juntas" + lugares/adultos/niños.
5. Arreglado: recado literal, Llamar (tel:+524498135545) y Copiar.
6. Arreglado: pistas con reseñas (fin de semana se llena; juegos infantiles; entre semana más calma).
7. Arreglado: todos los precios cotejados con maps-10, 12, 15 y 18; coinciden literal.
8. Arreglado: celular 10,046 a 10,533 px según pestaña; encimes 0 en m/t/d.
