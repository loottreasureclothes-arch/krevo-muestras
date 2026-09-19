# Imágenes generadas (Higgsfield, gpt_image_2_5, 18 sep 2026)

Todas generadas con IA (no son fotos reales del lugar). Objetos: fondo blanco puro verificado por píxel (254-255), sombra de contacto suave, luz de softbox desde arriba a la izquierda, tres cuartos ligeramente picado. Los PNG originales están en `png/`.
Los platillos elegidos SÍ están en su menú (research/menu.md): michelada (vaso michelada), cerveza (2x1 barril), tequila (copeo 2x1), Molcajete Arrachera, Orden de Tacos de Arrachera.

| Archivo | Qué es | Tipo | Dimensiones | Peso |
|---|---|---|---|---|
| michelada.webp | Michelada en tarro con escarchado de chile y limón | objeto-sobre-blanco | 896x1120 (4:5) | 84 KB |
| cerveza.webp | Tarro de cerveza clara de barril con espuma | objeto-sobre-blanco | 896x1120 (4:5) | 90 KB |
| tequila.webp | Caballito de tequila reposado con limón y sal | objeto-sobre-blanco | 896x1120 (4:5) | 28 KB |
| molcajete.webp | Molcajete de arrachera con nopal, cebollitas, queso y salsa | objeto-sobre-blanco | 896x1120 (4:5) | 133 KB |
| tacos-arrachera.webp | 3 tacos de arrachera en plato estilo talavera | objeto-sobre-blanco | 896x1120 (4:5) | 93 KB |
| ambiente-barra.webp | Barra de madera con botellas iluminadas, luz cálida | foto | 1168x880 (4:3) | 148 KB |
| ambiente-salon.webp | Salón taurino: ladrillo, cabezas de toro, sillas rojas y equipales | foto | 1168x880 (4:3) | 101 KB |

Defectos / notas:
- Ninguno grave. Sin texto ni logos legibles.
- tequila.webp: el objeto ocupa menos del cuadro que los demás (se ve más chico en el slider; escalar con CSS ~1.2x si hace falta).
- molcajete y tacos llenan más el cuadro que las bebidas.
- Las 2 fotos de ambiente son IA y se parecen al estilo real (ladrillo, toros), pero NO son del lugar. Hay fotos reales buenas: research/fotos/ta_00.jpg (barra) y ta_0c.jpg (salón con toros, tiene personas y TV). Preferir las reales si caben; usar las IA como relleno.
- Las 2 fotos de ambiente salieron a 1168px de ancho (menos que el máximo de 1400; no se agrandaron).

## Prompts
- michelada: "Professional studio product photograph of a single Mexican michelada in a tall clear glass mug with a thick red chile-lime salt rim (chamoy and Tajín style), amber beer with foam, ice, a lime wedge on the rim. Isolated on a pure seamless white background (#FFFFFF), soft natural contact shadow directly under the glass, bright softbox product lighting from upper left, three-quarter view from slightly above. Photorealistic, crisp, commercial food photography. No text, no logos, no labels, no props, nothing else in frame. Object centered with generous white space around it."
- cerveza: "...single heavy glass beer mug (tarro) of cold draft lager beer, golden, with a thick creamy white foam head and condensation droplets..." + mismo bloque de fondo/luz/ángulo, "No text, no logos, no labels, no brand".
- tequila: "...traditional Mexican tequila caballito shot glass filled with golden reposado tequila, next to a small lime wedge and a tiny pinch of coarse salt, grouped tightly together..." + mismo bloque, "no bottle".
- molcajete: "...black volcanic stone Mexican molcajete filled with sizzling sliced grilled arrachera skirt steak, grilled nopal cactus paddle, roasted green onions, melted cheese and red salsa..." + mismo bloque, "no table".
- tacos-arrachera: "...three Mexican arrachera steak tacos on small corn tortillas, topped with chopped onion and cilantro, with lime wedges, served on a round white-and-blue talavera style plate with no writing..." + mismo bloque.
- ambiente-barra: "Interior photograph of a traditional Mexican cantina: long dark polished wooden bar counter in the foreground, backlit wooden shelves full of unlabeled amber tequila bottles on an exposed light brick wall, warm golden evening light, a few empty beer mugs on the bar. No people, no readable signs, no text, no logos, no brand labels. Photorealistic editorial architecture photography, shallow depth of field, 35mm."
- ambiente-salon: "Interior photograph of a traditional Mexican cantina dining room with bullfighting theme: red brick walls, mounted bull head trophies on wooden plaques, red wooden chairs and equipal leather chairs around wooden tables, warm tungsten lighting, evening atmosphere. Wall frames are blurred with no readable text. No people, no readable signs, no text, no logos, no TVs. Photorealistic editorial interior photography, 35mm, shallow depth of field."
