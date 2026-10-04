# CORRECCION-2 Café del Ángel (inspector HD, 3 oct 2026)
Fotos: ningún original mide menos de 1,600 px de lado mayor, así que no se usó Real-ESRGAN (regla: solo < 1,200 px). La hamburguesa (maps-08, 1080x1920) se pintaba con un máximo de 960 px; se agregó burger-1080.webp a tamaño real para celular @3x.
Problemas más visibles, en orden:
1. Terraza en compu: arco de 880 px perdido en 1440, 280 px de lienzo plano a cada lado.
2. Opiniones en compu: "de calificación en 3,424 opiniones" diminuto junto al 4.2 de 17rem.
3. Hamburguesa en celular se servía a 960 px cuando el original da 1080.
4. Foto de noche de la terraza se ve borrosa en compu (la original es suave/bokeh; no es estiramiento).
5. Cocina: 4 platillos con "Pregunta el precio" (faltan precios en research).
6. Pie sin redes (sin URL de Facebook/Instagram en research).
## Resultado
- 1 arreglado: arco a 1,040 px y 760 px de alto en ≥1200, título 6.6rem.
- 2 arreglado: subtítulo 1.6rem en compu.
- 3 arreglado: burger-1080.webp en el srcset.
- 4 no arreglado: es la foto; no se permite IA ni estirar.
- 5 no arreglado: PENDIENTES (precios de cocina).
- 6 no arreglado: PENDIENTES (redes).
