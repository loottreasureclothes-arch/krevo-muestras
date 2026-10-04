# CORRECCION-1 El Capi (pulidor, 3 oct 2026)

## Problemas más visibles
1. Fotos sin versión HD: tope de 1600 px a calidad baja; en compu retina el hero y la carta se ven suaves.
2. Tacos de pastor y Burro ahogado en el menú sin foto (cajas de texto punteadas), se ven a medias junto a los demás.
3. Compu: el título "Chico o de 40 centímetros" se partía en 3 renglones (40 solo).
4. Mega Burro usa la misma foto en el menú y en la regla (repetida).
5. Hero de compu: la foto del burro es de poca profundidad de campo y se lee suave.
6. Fachada con letrero vecino chico (foto de cliente).
7. Opiniones: solo 2 reseñas con nombre.
8. Logo real ausente: placa tipográfica.
Prueba anti-genérico: pasa (regla de 40 cm propia, dato gigante 4.3, catálogo tipográfico, 5 verdes, 7 secciones, 7,689 px).

## Resultado
- 1 arreglado: todas las fotos regeneradas desde los originales de 2,048 px (LANCZOS + enfoque suave, webp q88) y nueva medida 2048w en todos los srcset (respaldo en backup/img-pre-hd).
- 2 arreglado: Tacos de pastor (maps-16) y Burro ahogado (maps-20) ya van con foto en tabla como los demás.
- 3 arreglado: h2 de la medida en compu con tamaño propio, ya cabe en 2 renglones.
- 4 no arreglado: no hay otra foto de Mega Burro seco; queda hasta que manden fotos propias.
- 5 arreglado en parte: versión 2048 + enfoque; la suavidad es de la foto original.
- 6 no arreglado: depende de foto propia del local (PENDIENTES).
- 7 no arreglado: solo hay 2 reseñas legibles con nombre en research.
- 8 no arreglado: falta archivo del logo (PENDIENTES).
