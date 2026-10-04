# CORRECCION-2 (inspector HD Fable 5, 3 oct 2026)

## Fotos a HD
- pozd (maps-11, 880x427, la única grande por debajo de 1,200 px): Real-ESRGAN x4 + mezcla 50 % con el original LANCZOS + grano σ2. Ahora pozd-480/960/1600 (antes topaba en 880). Las demás grandes ya pasan de 1,600 px de lado mayor.

## Problemas más visibles (en orden)
1. Compu, sección pozole: la foto del pozole del día quedaba a 4:3 arriba y dejaba un hueco oscuro de ~180 px debajo, porque la columna con el "BLANCO" gigante es más alta.
2. Compu, reseñas: la columna de reseñas terminaba y quedaban ~330 px vacíos debajo (min-height 760 por la foto); la foto de la michelada enseñaba casi puro pepino arriba.
3. Carta "Para tomar": la michelada decía "Con su Corona" (marca ajena en texto; la foto ya se había limpiado en la pasada 1).
4. Compu, comanda: la papeleta pegada a la mitad con pura franja rosa vacía a la derecha.
5. Datos: días y precios del pozole (verde viernes, blanco sábado; $65/$75/$85, $65/$80/$90, $60/$80/$90) y toda la carta verificados contra la foto maps-20. Coinciden.
6. Hero de celular: la foto de la fachada es nocturna y oscura; emociona por el neón y la etiqueta $65, pero no es una foto limpia. Es la única fachada que hay.

Prueba anti-genérico: 1 no, 2 no, 3 no, 4 no (4 verdes), 5 no, 6 no, 7 no, 8 no (8,899 px). Pasa.

## Resultado
- 1 arreglado: en compu la figura se estira a la altura de la columna (flex, aspect auto, object-fit cover) y usa el webp 1600 nuevo.
- 2 arreglado: min-height 600 en compu y object-position 50 % 58 % para enseñar el vaso con el chile.
- 3 arreglado: "Con su cerveza y su chile en el borde".
- 4 arreglado: papeleta centrada en su columna en compu.
- 5 sin cambio: datos correctos.
- 6 no arreglado: no hay otra foto de fachada; mejorar la nocturna sería inventar.

Verificado: krevo-shot m y d con alertas: [], celular 8,899 px, 4 wa.me/524493319024 intactos. Sin git.
