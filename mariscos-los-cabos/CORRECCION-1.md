# CORRECCION-1 Mariscos Los Cabos (pulidor, 3 oct 2026)

## Los 8 problemas más visibles (en orden)
1. La torre (componente firma) parecía pastel de bloques lisos, no torre de mariscos.
2. Aguacate dibujado como hoja/elote y perejil confuso arriba de la torre.
3. Hueco de ~165 px arriba del dibujo de la torre (viewBox con aire vacío).
4. Hueco de ~125 px entre opiniones y sucursales en celular (y ~220 px en compu).
5. Huecos de ~130 px entre menú y torre y entre sucursales y pie.
6. Tableta 820 = celular estirado en torre, opiniones, foto de tres y sucursales (cortes en 900 px).
7. Botones del hero en compu chicos frente al título.
8. Foto de pulpo con el rótulo "Tostadas. Ceviche. Aguachile." (el platillo no coincide).

Prueba anti-genérico: 1 no (torre, toldo con festón, vaso Cabo's), 2 no, 3 no (letrero/vaso propio + olas), 4 no (6 verdes), 5 no, 6 no, 7 no, 8 no (6 secciones, 7,110 px). Pasa.

## Resultado
- 1 arreglado: capas como montículo con borde irregular y trozos según marisco (camarón en C, cubos de atún/marlín/pescado, rodajas de pulpo, callos).
- 2 arreglado: aguacate en abanico de 5 medias lunas y perejil frito en ramitas.
- 3 arreglado: viewBox recortado a 0 70 260 260 y escenario más compacto.
- 4 arreglado: paddings de opiniones y sucursales recortados (celular y compu).
- 5 arreglado: paddings de menú, torre y sucursales recortados.
- 6 arreglado: torre, opiniones, tres y sucursales pasan a 2 columnas desde 780 px (hero se queda en cartel por ancho del título).
- 7 arreglado: botones del hero en compu a 60 px de alto.
- 8 no arreglado: no hay foto de tostada/ceviche de calidad permitida; se deja el pulpo (sí está en su carta, tostada de pulpo).
