# CORRECCION-2 LePib (inspector HD, 3 oct 2026)
## Fotos HD
Ninguna foto grande necesitaba Real-ESRGAN: hero=maps-02 (2048), hoja=maps-16 (2048), local=maps-07 (2048); los webp 1600 ya salen del original. Las miniaturas (taco 960, burrito 960) se pintan a 120 px máximo. fotos_hd = 0.

## Problemas más visibles (en orden)
1. Plato de barro: los lugares eran chicos (20 %) y las fotos venían apagadas (saturación .45, brillo .8); el componente firma se leía como disco oscuro con puntos.
2. Centro del plato "Toca un platillo" ilegible (9 px / 15 px) en celular.
3. Miniaturas del plato cargaban solo el webp de 96 px: borrosas en pantalla 2x.
4. Hojas de plátano cerradas = bloque verde plano con rayas; se veía barato antes de abrirse.
5. Compu: plato de 420 px perdido en una columna de 560 px.
6. Pie de foto del tamal ("Tamal yucateco $55") muy chico (12 px), sobre todo en compu.
Prueba anti-genérico: pasa (0 sí). 6 secciones, 5 verdes con flotante, alto celular 5,228 px.

## Resultado
- 1 arreglado: lugares al 23 %, fotos con color (saturación .75, brillo .9), sombra y opacidad .95.
- 2 arreglado: centro al 31 %, 10/18 px en celular y 11/21 px en compu.
- 3 arreglado: src 192 px + srcset 96/192 en los lugares del plato.
- 4 arreglado: hojas con sombra arriba/abajo, brillo radial y nervadura verde claro en la unión.
- 5 arreglado: plato de 480 px en compu/tableta.
- 6 arreglado: 13 px celular, 15 px compu.
- No arreglado: WhatsApp sin confirmar (PENDIENTES 1); reseñas sin estrellas (sin dato); quesadilla y chamorro sin foto real.
Verificación: m y d alertas [], alto celular 5,228 px, wa.me decodificados intactos. Sin git.
