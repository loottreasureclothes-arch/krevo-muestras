# CORRECCION-1 Casa Escobedo (pulidor, 3 oct 2026)

## 8 problemas más visibles (en orden)
1. El "145" iba sobre una foto de plato desenfocada (bodas_21): se veía borrosa en celular y enorme en compu.
2. Compu: en "Elige tu rincón" el título centrado contra un panel altísimo dejaba un hueco grande a la izquierda.
3. Tableta 820 era el celular estirado (todo cambiaba hasta 900 px).
4. Huecos de 120-140 px entre secciones en celular (64+76, 64+70).
5. Hero de celular: la foto del arco ocupaba ~52 % de pantalla, poco cartel.
6. Fuente (bodas_03, 720 px) se estiraba en compu y en el selector.
7. Fotos que venden con loading="lazy" (patio, collage, selector, fuente).
8. Compu con exceso de aire (110 px arriba y abajo en cada sección).
Prueba anti-genérico: 0 "sí" (arco propio como forma, selector de rincón único, 5 verdes, 6 secciones, sin palabras prohibidas).

## Resultado
- 1 arreglado: el 145 ahora va sobre el patio lleno (salon), recortado hacia el arco y las plantas.
- 2 arreglado: en compu el título va arriba y el panel se parte en 2 columnas (arco | pasos).
- 3 arreglado: los diseños de 2 columnas arrancan en 760 px (tableta incluida) y el panel tiene versión 600-759.
- 4 arreglado: paddings de celular a 44-56 px.
- 5 arreglado: arco del hero a 60svh (máx 560 px).
- 6 arreglado: fuente reescalada con Real-ESRGAN 50 % + LANCZOS + grano a 1440 px.
- 7 arreglado: sin lazy en todas las fotos.
- 8 arreglado: compu a 64-84 px.
- No arreglado: carta sin platillos ni precios reales (no hay en research; sigue en PENDIENTES).
- Nota: tableta 820 se corrió con una copia temporal de krevo-shot (alertas: [], 5,865 px) pero no se miró en la hoja.
