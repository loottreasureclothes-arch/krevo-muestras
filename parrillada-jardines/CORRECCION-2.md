# CORRECCION-2 Parrillada Jardines (inspector HD, 3 oct 2026)

## Fotos a HD
- Originales pintados grandes: hero maps-01 (2048), aire maps-10 (2048), banda maps-04 (2048), salsero maps-12 (1079x1346), cierre maps-07 (1920x1080). Ninguno < 1,200 px: Real-ESRGAN no aplica (no se estira nada).
- 1 foto subida de talla real: cierre pasa de 960 px (maps-07, borrosa, parecía captura de video) a maps-16 tacos en 1600x1680 nativo, con srcset 480/960/1600.

## Problemas más visibles
1. Cierre en compu: chilaquiles borrosos a 560 px @2x (fuente blanda). ARREGLADO: maps-16 tacos nítidos, 1600 nativo, alt nuevo.
2. Salsero lavado (ya anotado en CORRECCION-1 como no arreglado). ARREGLADO sin IA: autocontraste 1 % + color 1.12, q82.
3. La foto de tacos ahora sale dos veces (plato chico 480 cuadrado en pedido y cierre completo). NO ARREGLADO: no hay otra foto nítida sin usar en research (03 salsas repetiría el salsero, 05 duplica la fachada); pedir al dueño foto de barra/juegos para el cierre.
4. Hero celular: foto 63svh con el cuerpo encimado 122 px; el letrero y la placa 604 se ven. Sin cambio.
5. Compu 02-pedido: comanda sticky a la derecha, salsero abajo a la izquierda; sin hueco > 90 px. Sin cambio.
6. Textos: títulos sin palabras prohibidas; "grupo de 20" sale de la reseña de Andrea; precios de carta de maps-02. Sin cambio.

Prueba anti-genérico: 1 no, 2 no, 3 no, 4 no (4 wa), 5 no, 6 no, 7 no, 8 no (7 secciones). Pasa.
