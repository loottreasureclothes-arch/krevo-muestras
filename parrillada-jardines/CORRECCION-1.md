# CORRECCION-1 Parrillada Jardines (pulidor, 1 pasada)

## Problemas más visibles (en orden)
1. Huecos de 220 px entre secciones en compu (padding 110 + 110) y 128 px en celular.
2. Cierre repetía la foto de salsas (ya está en el salsero) y en compu se veía borrosa y estirada (recorte 1:1.05 de una foto panorámica 1600x684).
3. Eyebrow "Mesa grande" repetía el título "Mesa grande, plato grande."
4. "Todo listo para completar" en compu: caja angosta pegada a la izquierda, mitad derecha vacía (compu sin diseñar).
5. site.js traía código muerto de HODO ("Hola HODO, quiero cotizar mi próximo viaje", localStorage hodo_pase).
6. Banda de tacos en compu con 90 px extra arriba (hueco).
7. Pendientes pegado al cierre con 130 px de aire suelto en compu.
8. Foto del salsero algo lavada en celular (es la de Maps).

Prueba anti-genérico: 1 no (placa 604, letrero, salsero), 2 no, 3 no (placa de calle + parrilla), 4 no (4 wa), 5 no, 6 no, 7 no, 8 no (7 secciones, 8,434 px). Pasa.

## Resultado
- 1 arreglado: .pj-sec 56 px celular / 80 px compu.
- 2 arreglado: cierre ahora usa maps-07 chilaquiles (sin usar antes), recorte nativo 960x1008, sin lazy.
- 3 arreglado: eyebrow "Para ir en grupo".
- 4 arreglado: en compu la caja ocupa todo el ancho en 2 columnas (texto | lista).
- 5 arreglado: HodoPase reemplazado por un stub vacío; node --check ok.
- 6 arreglado: margin-top 70 px.
- 7 arreglado: padding superior de pendientes 8 px.
- 8 no arreglado: no hay foto mejor del salsero en research; pedir al dueño.
Verificación: m 8,434 px y d 6,695 px, alertas [] en ambos, consola limpia, 4 wa, componente firma intacto (mensaje se arma en 02-pedido.js con platos, cantidad, salsas y modo).
