# CORRECCION-2 Mariscos Los Cabos (inspector HD, 3 oct 2026)

## Fotos HD
- Ningún original usado mide menos de 1,200 px (van de 1080 a 2048), así que no se usó Real-ESRGAN.
- pulpo-2048.webp regenerado desde maps-05 a su talla real (q82) y sumado al srcset de la foto a sangre (en compu @2x pedía 2880 px y solo había 1600).
- terraza-1536.webp conectado al srcset de sucursales (en compu @2x pedía ~1150 px y solo llegaba a 960).

## Los 6 problemas más visibles
1. La torre (componente firma) seguía leyéndose como pastel de cumpleaños: capas rosa/morado lisas con puntos tipo chispas y un copete verde de flor.
2. Foto de pulpo con el rótulo "Tostadas. Ceviche. Aguachile." (el platillo no coincidía con el texto).
3. Foto a sangre del pulpo se veía suave en compu (1600 px para 2880 px reales).
4. Terraza en compu servida a 960 px cuando pedía ~1150.
5. En compu la torre queda chica y con aire arriba frente a la columna de controles.
6. Fotos del menú (discos) son de clientes con celular: se notan planas comparadas con el hero.

## Resultado
- 1 arreglado: capas con trozos reconocibles (camarones en C con rayas, cubos de atún/marlín/pescado, rodajas de pulpo con ventosa, callos), rodajas de pepino, aros de cebolla morada, abanico de aguacate con cáscara y hueso, perejil con hojas; tostada con tostado y sombra en el plato. Sin brillos tipo betún.
- 2 arreglado: ahora dice "Pulpo. Tostadas. Aguachile." (la tostada de pulpo está en su carta, research/hechos.md).
- 3 arreglado: pulpo-2048 en srcset.
- 4 arreglado: terraza-1536 en srcset.
- 5 no arreglado: pediría rediseñar la rejilla de compu de la torre; se deja (no es hueco > 90 px).
- 6 no arreglado: no hay fotos propias del negocio; va en PENDIENTES.

## Verificación
- krevo-shot m y d: alertas: [], 7,110 px en celular, 6 wa.me decodificados intactos (wa.me/524499181146, pendiente confirmar el número). Sin git.
- Anti-genérico: 1 no, 2 no, 3 no, 4 no (6 verdes), 5 no, 6 no, 7 no, 8 no. Pasa.
