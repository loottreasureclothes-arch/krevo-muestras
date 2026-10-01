# The Nail Society · Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (orden de visibilidad)
1. **Pedicure, foto "Una copa, en Sur"**: se ve como una hielera plateada sucia y oscura, no se entiende qué es a 130 px; su cartela se parte en dos renglones ("UNA COPA, EN / SUR"). Ensucia la sección más cálida.
2. **Sillones de pedicure, celular**: torre 2:3 de casi 800 px (una pantalla entera de techo blanco y gran angular) que empuja las citas hacia abajo.
3. **Fachada Sur**: recorte con medio cuadro de techo gris; el letrero "The Nail Society -spa-" sale gris sobre gris y blando (se estira 1.5x en celular).
4. **"EN CABINA" (sección 84 %)**: la cartela es crema sobre banda crema, se ve como texto suelto; rompe el sistema de cartelas.
5. **Mi pared vacía**: tres huecos punteados que repiten "CUELGA HASTA TRES" tres veces; se ve como formulario, no como muro de galería.
6. **Tableta 820 y compu**: el hero se centra en `min-height:860px` y deja ~190 px de vino vacío arriba del eyebrow a 820 px.
7. **Sucursales en compu y tableta**: las dos cartelas no alinean teléfono y "CÓMO LLEGAR" (Colosio tiene dirección de 2 renglones y Sur de 1); se ven chuecas lado a lado.
8. **Pedicure en compu**: la columna de citas termina en un cuadrito huérfano (la copa) con un hueco grande a su derecha; desbalance.
9. **Cita 2 de pedicure en celular**: sin la copa, tres cartelas idénticas apiladas; hay que darles ritmo (escalonado) para que no sea lista.
10. **Momento firma**: revisado a mitad (volutas, molduras que crecen, 84 % que entra) y completo; se lee bien. Sin cambio.

## Qué arreglé
1. Quité la foto de la copa (y su cartela) de `30-pedicure`: la sección queda con una sola foto grande y tres citas.
2. Sillones recortados a 4:5 (1056x1320, sin el techo, misma corrección cálida): en celular bajan de ~800 a ~560 px de marco.
3. Fachada Sur recortada a franja 960x410 (letrero, candil y puerta; fuera techo y gente), +10 % contraste y enfoque suave; ya sin `loading="lazy"`.
4. Cartela "EN CABINA": en la banda crema va en placa noche con texto dorado claro (regla `.ns-soc-sec .ns-cartela`).
5. Mi pared: los huecos ahora son marcos fantasma con número en Prata (1, 2, 3); solo el siguiente libre dice "Cuelga aquí" y se marca en dorado.
6. Hero: `min-height` de pantalla completa solo desde 1100 px; en tableta ya no deja vino vacío arriba.
7. Sucursales: `.ns-sact{margin-top:auto}`: teléfono y "CÓMO LLEGAR" alineados al pie en las dos cartelas.
8. Pedicure en compu: sin la copa huérfana, el área es "título + citas | foto".
9. Pedicure en celular: citas escalonadas (1 y 3 a la izquierda, 2 a la derecha) para que no se lean como lista.
10. Momento firma: sin cambios (se arma y queda completo; verificado a mitad y al final).

## Qué no arreglé
- La fachada sigue algo blanda en celular a 2x (la foto de Maps mide 960 px y el letrero ocupa ~400 px); no se sube con IA. Pedir foto nueva del letrero (ya en PENDIENTES: logo en alta y fotos).
- En compu la fachada (franja baja) queda más corta que el mapa de 300 px; se ve bien pero deja aire debajo.
- El logo del header a 44 px es un recuadro blanco chico (es su logo real de 285 px; se pide en alta).

## Verificación
- krevo-shot m: alto 7,868 px, `alertas: []`. krevo-shot d: alto 5,390 px, `alertas: []`.
- wa.me decodificado (2 cuadros, uñas, Colosio): "Hola The Nail Society, quiero una cita. Me gustan estos diseños de su página: «Francés negro con florecitas» y «Almendra blanca con brillo». Para: uñas. Sucursal: Colosio."
