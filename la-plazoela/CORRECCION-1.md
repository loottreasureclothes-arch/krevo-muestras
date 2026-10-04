# CORRECCION-1 La Plazoela (pulidor)
Problemas más visibles, en orden:
1. Foto maps-18 repetida: platón en la carta y otra vez a sangre en "Mesa de cuadros".
2. Hueco de ~100 px entre el subtítulo y el tazón en celular (viewBox con aire arriba).
3. La raya curva del tazón parecía carita sonriente; poco oficio.
4. Compu: "También en la carta" era una tarjeta angosta con media pantalla vacía.
5. Horario mal: hero, pie y meta decían "5:30 a 12 am" (mié-dom cierran 12:30).
6. Título de horario "de 5:30 a 12" incorrecto para 5 de 6 días.
7. Guarniciones: "Cebolla" quedaba sola a todo lo ancho.
8. Cierre plano: el pie no tenía ninguna acción.
Prueba anti-genérico: pasa (componente firma propio, 7 secciones, 6,813 px, 8 wa).

## Resultado
1. Arreglado: mesa = maps-14 (vertical en celular, horizontal con Real-ESRGAN 50 % en compu); borradas mantel-*.webp.
2. Arreglado: viewBox recortado y margen 18 px.
3. Arreglado: banda tipo talavera (rombos cobalto y puntos coral).
4. Arreglado: lista a lo ancho, título a la izquierda y 2 columnas de precios.
5. Arreglado: "desde las 5:30 pm, martes cerrado" y pie con horario exacto.
6. Arreglado: "Se cena / desde las 5:30".
7. Arreglado: guarniciones en rejilla de 3.
8. Arreglado: botón fino "Cómo llegar a la Plazoela" en el pie (no verde).
Extra: reveal con umbral vh+40 (salía h2 invisible en 4302 px).
No arreglado: foto de mesa (maps-14) no revisada de cerca en celular tras el recorte inferior; WhatsApp sigue sin confirmar (PENDIENTES).
