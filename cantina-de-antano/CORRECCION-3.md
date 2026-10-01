# La Cantina de Antaño · Corrección 3 (30 sep 2026)

Aplica REVISION-3.md en orden (trae 4 cambios). Todo sale de `python3 gen.py && python3 build.py`; index.html no se tocó a mano. Precios, horarios, reseñas, teléfonos y textos sin cambios. Fotos solo con PIL, sin IA ni stock; script: `scratchpad/r3fix-cantina-de-antano/imgs3.py`.

## Aplicado
1. **Época sin reescalado derretido.**
   - Recorte nuevo de `maps-interior-barra-02.jpg`: x 975-1548, y 615-876. El juez pidió que terminara en y 895, pero ahí todavía asomaba arriba el marco con el busto fantasma; con 876 sale completo. Arriba se sube 10 px (la soga empieza más arriba, en y 613, y no entra).
   - Se sube solo x2 con Lanczos + `UnsharpMask(radius=1.2, percent=60)`. Sin Real-ESRGAN. Lleva el mismo grado interior del resto. Archivos: `epoca-c-640` y `epoca-c-1146`; las de 1280 y 1840 se pasaron al scratchpad.
   - La tarjeta mide máximo 620 px. Así la foto nunca pasa de 1.1x su tamaño real: en compu se ve a 577 px.
   - En compu (≥1100), `.epoca-main` es una rejilla `1.1fr 1fr`: la foto a la izquierda y las 3 reseñas apiladas a la derecha. La foto queda `sticky` para que no deje un hueco junto a la tercera reseña. "Salón privado" va abajo, a todo lo ancho, como antes.
   - En celular la foto va a lo ancho en 3:2, porque la foto nueva es más apaisada y en 4:3 se cortaba demasiado. Entre 700 y 859 px va alineada a la izquierda con el título; entre 860 y 1099, centrada con las reseñas en 3 columnas.
2. **Tarjetas de sucursal alineadas.** Se aplicó tal cual:
   - `.cc-foto{aspect-ratio:4/3;overflow:hidden}`
   - Imagen con `object-fit:cover`
   - Sta. Anita con `object-position:50% 35%`

   Medido a 1440: las 4 fotos miden 186 px, los nombres caen a 220 px en las 4 y los botones rematan igual. En celular las fotos también quedan parejas (204 px).
3. **Hero de compu sin fantasmas.** En `hero-d`, dentro de la misma máscara del desenfoque de la franja del fondo, la luz baja al 70 % (`ImageEnhance.Brightness(0.7)`). Los meseros ya se leen como sombra detrás de "Una tradición". `hero-m` no se tocó.
4. **Colosio sin hueco en celular.** Se usó la opción 1 (`.car{align-items:flex-start}` y `.cc-act{margin-top:0}`), pero solo por debajo de 700 px, donde se ve una tarjeta a la vez. Colosio ya no trae los ~110 px vacíos.

## No aplicado o cambiado
- **Hero, opción `object-position:62% 50%`:** no sirve. A 1440 la foto (1600 × 1403) se ajusta al ancho y se recorta solo en alto, así que mover la posición horizontal no cambia nada. Se usó la opción de la luz al 70 %.
- **Colosio, opción 2** (llenar el hueco con "Valet parking · área infantil"): ese dato ya está en su tarjeta y repetirlo quedaba de relleno.
- **Tarjetas sin estirar en tableta:** de 700 a 1099 px se ven 2 o 3 tarjetas juntas. Ahí siguen del mismo alto (lo que pidió REVISION-2), para que no se vean bordes disparejos.

## Verificación
- krevo-shot m: **0 alertas**, 8,248 px (antes 8,285), 3 WhatsApp, 12 `tel:`, sin errores de consola, sin 404 y sin scroll horizontal.
- krevo-shot d: **0 alertas**, 6,836 px. Sube 180 px porque las reseñas van apiladas junto a la foto.
- Alto por categoría en celular: Cocteles 8,656 (la más larga) y Cervezas 8,271; todas bajo 9,000.
- El flujo de Mi mesa queda intacto. Barra "Mi mesa · 4 $2,742". URL decodificada: `https://wa.me/524491721073?text=Hola La Cantina de Antaño, quiero apartar mesa en Nacozari para 6 personas mañana a las 11:00 p.m. Pensamos pedir: 2 x Parrillada norteña 4 personas, 2 x Cubeta de 6 Corona/Light/Victoria/Pacífico, Refresco. Nombre: Ana`.
- Hojas en `scratchpad/r3fix-cantina-de-antano/`: `hoja-celular.jpg`, `hoja-compu.jpg` y `t820-hoja.jpg` (820 px).

## Ojo
- La foto de Época ya no tiene caras de cera, pero se ve suave, como lo que es: una foto de celular de 573 px. El techo sigue siendo el material del dueño (PENDIENTES.md).
