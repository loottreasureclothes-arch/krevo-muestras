# CORRECCION-1 (pulidor, 3 oct 2026)

## 8 problemas más visibles (en orden)
1. Foto de la michelada con la etiqueta "Corona Light" a la vista (marca ajena) en celular y compu; el alt también la nombraba.
2. Compu: en la carta, la tarjeta grande del pozole quedaba alta y la columna de enchiladas/flautas/tostada terminaba antes, dejando hueco.
3. Compu: en "Pozole rojo diario" la foto quedaba chica y centrada, con hueco a la derecha.
4. Fotos que venden (pozole, enchiladas, flautas, tostada, michelada, pozole del día) con loading="lazy".
5. Momento firma (banderitas del pozole): el columpio arrancaba a 0.6 s y duraba 1.2 s, se resolvía hasta 1.8 s.
6. "Pregunta el precio" de la michelada partido en 3 renglones junto al botón.
7. Compu: pie con la columna derecha casi vacía (solo redes y letra chica).
8. Fotos chicas de flautas y tostada sin srcset: en compu se estiraban desde 480 px.

Prueba anti-genérico: 1 no (papel picado, banderitas del pozole por día, comanda), 2 no, 3 no (etiqueta de precio $65 y letrero propio), 4 no (4 verdes), 5 no, 6 no, 7 no, 8 no (7 secciones + pie, 8,899 px). Pasa.

## Resultado
- 1 arreglado: recorte limpio de la foto quitando la botella (mich-480/880), alt sin marca.
- 2 arreglado: en compu la columna lateral se estira a la altura del pozole, fotos al 42 % y precios más grandes.
- 3 arreglado: foto del pozole del día a 4:3 y alineada arriba junto al título.
- 4 arreglado: sin lazy en fotos que venden (solo queda el salón).
- 5 arreglado: columpio de .9 s con .3 s de espera, resuelto a 1.2 s.
- 6 arreglado: ancho 11ch, queda en 2 renglones.
- 7 arreglado: pie de compu con dirección, horario y teléfono de la matriz en grande (solo compu, para no subir el alto del celular).
- 8 arreglado: srcset 480/960 en flautas y tostada.
- No arreglado: persona sentada al fondo en la foto de fachada del hero de compu (borrosa y lejana; recortarla le quita el letrero).
