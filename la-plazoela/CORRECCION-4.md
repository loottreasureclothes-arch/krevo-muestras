# CORRECCION-4 La Plazoela (revisor final, 4 oct 2026)

## Encimes
- Antes: compu (1440) 1 encime real: el total "$82" del tazón se montaba sobre "Grande de pierna" (Gloock a 84 px con line-height 1). Celular y tableta: 0 encimes; los 3 "FUERA" son la comanda 02 del carrusel que está fuera de pantalla a propósito (falso positivo, confirmado en el recorte).
- Arreglo: `.pz-tot span` con line-height 1.05 (1.1 en compu) y `small` con margen arriba de 10/14 px.
- Después: 0 encimes reales en m, t y d.

## Lo que se veía pobre
- Reseñas en celular: las comandas se estiraban a la altura de la más larga y quedaban 200 px de crema vacía bajo el nombre. `align-items:flex-start` en el carrusel.
- Tableta (820) era el celular estirado (12,000 px). Nuevo bloque `700–899 px` en site.css y en cada sección: nav visible, hero con botones en fila, carta a 4 columnas, lista en 2 columnas, tazón + controles lado a lado, reseñas 2 por pantalla, galería a 4 columnas, visita con mapa a la derecha, pie a 2 columnas.
- "También en la carta": +4 platillos reales de Maps y reseñas (sopes de pollo, tacos de papa, flautas, encurtidos de la casa) con "Pregunta el precio" y nota de servicio: aquí, llevar, domicilio y cuenta por persona $100–200 (dato de Maps).
- Pozole: "Precio de su carta" → "Precio de carta, sin sorpresas" (sin voz de investigador).

## Verificado
- 8 secciones + pie, mapa de Google embebido, 9 reseñas con nombre y fuente, 8 wa.me con número 524499153815 y mensaje armado, Llamar con tel:, "Todo listo para completar" sin wa.me.
- Sin git. Imágenes vistas: hoja + 1 recorte de celular + hoja final.
