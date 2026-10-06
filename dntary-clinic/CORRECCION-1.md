# Corrección 1 (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. Componente firma: dientes planos (rectángulos blancos en óvalo negro), sin encía ni volumen; no invitaba a tocar.
2. Hero celular: el título (45 px) era más chico que "Limpio. Cómodo." (62 px); el cartel no pegaba.
3. Consultorio en compu: foto de 1212 px estirada a sangre en 1440 (borrosa).
4. Consultorio en celular: el encuadre arrancaba en la lámpara del techo, el sillón quedaba abajo.
5. Fotos que venden (tratamientos, consultorio, recorrido) con loading="lazy".
6. Pasos de "Del primer hola" genéricos (no vienen de research).
7. Solo 5 fotos del consultorio; se repiten en tratamientos y recorrido.
8. Compu: "Todo listo" y pie con aire de más al final.
Prueba anti-genérico: pasa (firma propia de dientes, 5 verdes + flotante, sin contadores ni tarjetas con ícono, sin palabras prohibidas).

## Resultado
1. Arreglado: encías, degradado y brillo en cada diente, sombra, boca con profundidad y aviso "Toca" que se apaga al primer toque.
2. Arreglado: h1 del hero a 13.4vw (52 px) y frases del consultorio a 12.4vw; el hero es lo más grande.
3. Arreglado: en compu la foto va a 58 % a la derecha con fundido; ya no se estira.
4. Arreglado: object-position 50% 82% en celular.
5. Arreglado: lazy quitado de todas las fotos (solo el mapa queda lazy).
6. No arreglado: falta que el doctor confirme sus pasos (está en PENDIENTES).
7. No arreglado: faltan fotos del Dr. Ilich y del equipo (PENDIENTES).
8. No arreglado: menor, se dejó.
Verificación: m 8,237 px y d sin alertas, 0 encimes en m/t/d, 8 reseñas con nombre, mapa embebido, wa.me 524492047733 decodificado bien.
