# CORRECCION-1 Ragazzi Bistro (pulidor, 3 oct 2026)

## Problemas más visibles (en orden)
1. Celular: la comanda "Tu mesa" se salía de la pantalla (Hora y botón de WhatsApp cortados).
2. Compu: la carta en filas de 3 con hueco a la derecha y Salmón huérfano en su propia fila.
3. Celular: el mural de Venus era un acercamiento borroso (foto 16:9 estirada a vertical).
4. Fotos que venden (platillos y mural) con loading="lazy".
5. Celular: el "13" gigante se encimaba con el título "Trece años".
6. Compu: el letrero de la fachada quedaba cortado por el arco.
7. Celular: en Venus todavía se ve más cabello que cara del mural.
8. Prueba anti-genérico: pasa (componente firma propio, 7 secciones, 4 verdes, sin contadores).

## Resultado
1. Arreglado: `.cn>*{min-width:0}`; la comanda entra completa.
2. Arreglado: rejilla de 4 columnas en compu; los 4 fuertes en una fila.
3. Arreglado: recorte vertical nítido del original (venus-m-480/922) con <picture> solo en celular.
4. Arreglado: quitado lazy en 02-cena y en Venus.
5. Arreglado: más aire bajo el "13" en celular.
6. Arreglado: object-position 50% 30% en la fachada; se lee el letrero.
7. No arreglado: el recorte de celular necesita moverse a la cara (x ~ 1450 del original); quedó sin verificar por límite de capturas.
8. Sin cambio.
