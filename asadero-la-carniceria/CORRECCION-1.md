# Corrección 1 (pulidor, 3 oct 2026)

## Problemas más visibles (en orden)
1. Foto de la carta: la agarradera de tela ocupaba media foto; en compu, columna alta estirada y borrosa.
2. Fotos en baja: fachada a 861 px estirada a media pantalla en compu; corte a 1350 px.
3. Tabla (componente firma) casi vacía: un solo plato y la frase "Toca un plato para quitarlo" sin nada que quitar.
4. Opiniones: "1,233" dos veces seguidas (número gigante y título).
5. Número gigante 1,233 se salía de su columna en compu.
6. Fotos que venden (corte, tabla) con loading="lazy".
7. Hero y tabla re-exportados con poca nitidez.
8. Corte pegajoso (sticky) en compu dejaba hueco de madera al bajar.

Prueba anti-genérico: pasa (componente firma propio, sin contadores ni rejilla de íconos, 7 secciones, 7,288 px).

## Resultado
- 1 arreglado: nuevo recorte del corte (sin agarradera ni manos), cuadrado en celular, vertical en compu.
- 2 arreglado: fachada y corte subidos con Real-ESRGAN x4 mezclado 50 % + grano (fachada 1600 px, corte 1400 px).
- 3 arreglado: la tabla pinta un plato por persona y la pista cambia según haya extras.
- 4 arreglado: título nuevo "Se come rico. Y se canta." (sale de las reseñas).
- 5 arreglado: tamaño del número limitado en compu.
- 6 arreglado: sin lazy en corte y tabla.
- 7 arreglado: hero y tabla re-exportados del original con enfoque suave, calidad 88.
- 8 arreglado: quitado el sticky del corte.
- No arreglado: foto del mariachi solo muestra piernas y sillas (es la única del salón sin caras).
