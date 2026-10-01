# La Cantina de Antaño · Corrección 4 (30 sep 2026)

Atiende los 3 puntos del juez y las indicaciones del orquestador. Todo sale de `python3 gen.py && python3 build.py`; index.html no se tocó a mano. Precios, horarios, reseñas, teléfonos y textos cotejados sin cambios. Fotos solo con PIL, OpenCV y Real-ESRGAN x4, sin IA ni stock. Script: `scratchpad/r4fix-cantina-de-antano/imgs4.py`.

## 1. Época de Oro: foto nítida
- Fuera la foto de `maps-interior-barra-02` (borrosa, chueca, neón cortado). Entra `maps-interior-salon` en sepia (`epoca-s-640/1146`), como pedía la hoja de dirección.
- El recorte va a lo ancho: barra con botellero, caballito, el retrato de charro en la barra, techo con objetos y el pasillo al fondo. Las verticales quedan derechas.
- Sin clientes. El personal de la barra lleva la cara desenfocada en chico.
- Sigue en lobby card de 620 px máximo (3:2 en celular y tamaño natural desde 700). Pie nuevo: "El salón de la sucursal Colosio: la barra, el caballito y el techo lleno de objetos de antaño".

## 2. Un solo tono
Las 4 fachadas de las tarjetas y las 3 de la tira (Colosio, Nacozari, J. Pani) pasan por un grado de "noche calma":
- Sin grano.
- Saturación al 55-60 %.
- El verde neón baja a la mitad y se corre hacia el oro.
- El rosa baja y se corre hacia el rojo.
- Llevan tinte café leve, sin volver al sepia fuerte.

Ya no hay verde neón junto al botón de WhatsApp. Los alts dejan de decir "neón verde".

## 3. Hero de celular y El reparto
- **Hero de celular** (`hero-m`, nuevo recorte 960x1646): se ven la barra con su botellero, el caballito, el retrato de charro y las mesas, ya no puro techo. Se quitó la franja embarrada; ahora solo hay caras chicas desenfocadas.
- **Hero de compu:** se rehízo igual, sin franja ni luz al 70 %.
- **El reparto ya no está escondido en la pestaña Cocteles.** Ahora es banda café propia al final de la carta (`#reparto`): créditos con su precio, su "+" y los ingredientes literales. La pestaña Cocteles lleva un aviso con link: "Las especialidades de $152 salen en El reparto, al final de la carta."
- Las pestañas y la tira de chips quedaron envueltas en `.carta-tabs`, así los chips dejan de pegarse encima del reparto.
- Los créditos siguen entrando con el scroll, pero nunca bajan de 20 % de opacidad. krevo-shot ya no los marca como invisibles.
- Para no pasar de 9,000 px, el reparto es más compacto en celular y el título de cantinas sube 10 px.

## Verificación
- krevo-shot m: **0 alertas**, 8,924 px, 3 WhatsApp. Por categoría: Cervezas 8,947 (la más larga), Cocteles 8,586; todas bajo 9,000.
- krevo-shot d: **0 alertas**, 7,625 px.
- 820 px revisado: hero, tira, reparto, cantinas y época.
- El flujo de Mi mesa sigue intacto. Mismo mensaje de WhatsApp que en la corrección 3. El "+" de El reparto suma a Mi mesa ("Mi mesa · 1 $152").
- Hojas en `scratchpad/r4fix-cantina-de-antano/`: `hoja-celular.jpg`, `hoja-compu.jpg`, `t820-hoja.jpg`.

## Ojo
- El salón sale en el hero (a color) y en Época (sepia, recorte más ancho). Es la única foto interior nítida que hay. Las fotos profesionales siguen en PENDIENTES.
- En las fotos se sigue viendo el verde de la barra y de las fachadas, pero apagado. En la interfaz el verde sigue solo en WhatsApp.
