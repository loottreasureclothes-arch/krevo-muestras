# CORRECCIÓN 1 (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. Tableta: la carta completa medía 3,308 px (pared amarilla); la tableta entera 13,561 px.
2. Tableta: el pizarrón iba apilado (foto, opciones y el pizarrón hasta abajo); no se veía el total mientras eliges.
3. Tableta: Visítanos apilado (mapa cuadrado gigante y luego datos), el celular estirado.
4. Fotos que venden con loading="lazy" (favoritos, guayaba, pizarrón, galería): en tableta un cuadro de la galería salía vacío.
5. Galería repetía la foto de suizas del plato azul (ya está en el pizarrón).
6. Voz de investigador: "Fotos que sus clientes subieron a Google Maps", "Su carta, con sus precios", "Precios de su carta impresa", "Está en su carta".
7. Reseñas: 6, justo en el mínimo; revisar si hay más recientes en research.
8. Encimes m: 2 FUERA por el carrusel de reseñas (revisar que sea intencional y sin scroll horizontal).
Prueba anti-genérico: pasa (pizarrón de gis propio, guayaba partida, papel picado, carta tipográfica; 0 verdes, sin contadores ni rejillas con ícono, sin palabras prohibidas).

## Resultado
1. Arreglado: pestañas de la carta también en tableta (760 a 1099), lista a 2 columnas; carta 3,308 a 845 px; tableta 13,561 a ~10,150 px.
2. Arreglado: pizarrón a 2 columnas desde 760 px, pizarrón pegajoso al lado.
3. Arreglado: Visítanos a 2 columnas en 760 a 899 (mapa 520 px al lado de dirección y horario).
4. Arreglado: quitado lazy de todas las fotos (solo el iframe del mapa sigue lazy).
5. Arreglado: la galería usa ahora el caldo (maps-14, sin usar antes) en img/caldo-*.webp.
6. Arreglado: "Fotos de nuestras mesas, tomadas por quienes nos visitan.", "La carta, con precios", "Precios de nuestra carta impresa", "Está en la carta".
7. No subido a 8: las únicas reseñas restantes son de hace 5, 8 y 9 años (posible época del nombre anterior); se quedan las 6 de 1 mes a 2 años. Anotado en PENDIENTES.
8. Confirmado: los 2 FUERA son la 2.ª tarjeta del carrusel con scroll-snap, dentro de su contenedor; scrollWidth = 390, sin scroll horizontal. Intencional.
Verificado: alertas [] en m y d; alto celular 10,691; encimes 0/0/0; pizarrón probado (salsa x relleno con precios de carta, champiñón solo en suizas, +/−, total, vacío "Elige arriba", tel:+524959562183, 0 wa.me).
