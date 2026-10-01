# Brides & XV · Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden, vistos como clienta en celular 390 y compu 1440)
1. Hero en celular: el botón "AGENDAR MI PRUEBA" no sale en la primera pantalla (queda debajo de la fachada, ~y 1,100) y el logo completo se repite justo encima del rótulo de la foto, que ya dice lo mismo.
2. Momento firma (brillo): la foto se ve gris y plana, el tercio de arriba es el cuello de plástico del maniquí y la luz que barre casi no se nota (soft-light sobre gris claro); las lentejuelas no chispean.
3. La tienda: foto grande `tt-tour-03` borrosa (barrido del video en el piso y la puerta) y altísima en celular (~1,300 px de foto movida).
4. Percha 01 (la primera que se ve del perchero): foto blanda, de plástico (cuadro de video subido); percha 02 también suave.
5. Visítanos: la placa "CENTRO COMERCIAL EL PARIÁN · PISO G ·" se parte y deja el punto colgando al final del renglón.
6. Compu, sección brillo: título y cita sueltos a la derecha, el collage centrado deja columnas vacías; ritmo flojo pero sin hueco mayor a 90 px. (menor)
7. Compu, hero: bien armado; nada que tocar.
8. Fotos de la cola y del bordado en el collage: algo lavadas frente al negro.
9. Remate y pie: se sostienen; sin cambios.
10. Mapa embebido muestra "Novias 15 Años El Parián" (competencia) junto al pin: es de Google, no se controla. (no se toca)

## Qué se arregló
1. Hero en celular: el orden ahora es título, botón "AGENDAR MI PRUEBA" + "Ver el perchero" y DESPUÉS la fachada (con su logo encima del negro); el botón queda a ~y 760 en la primera pantalla y el rótulo de la foto asoma abajo. Compu sin cambios.
2. Momento firma: la foto se recortó de nuevo (fuera el cuello de plástico, `_work/brillo2.png`), se le subió el blanco con curva suave + CLAHE ligero y un pelo cálido; la máscara de lentejuelas se volvió a sacar de la MISMA foto nueva. La banda de luz pasó de soft-light (invisible sobre gris) a `screen` con pico cálido de 0.55, y las chispas a brightness 1.6: a media pantalla ya se ve la luz cruzando y las lentejuelas encendiéndose (capturas brillo-a/b/c en el scratchpad).
3. La tienda: `tt-tour-03` recortada a la parte nítida (x 0 a 1110, y 640 a 1880: techo, puerta y vestidos al fondo; fuera el piso movido), nitidez suave y grano fino; en celular baja de ~1,300 px de foto movida a un cuadro de 1/1.08.
4. Perchas 01 y 02: CLAHE ligero + unsharp + grano fino (menos de plástico). La 02 se recortó desde la espalda baja: ya no se ve cabeza ni pelo (antes asomaba).
5. Visítanos: la dirección va en tres placas limpias ("CENTRO COMERCIAL EL PARIÁN" / "PISO G · LOCAL 77" / "ZONA CENTRO · 20000 AGUASCALIENTES"), sin punto colgando.

## Qué no se arregló (y por qué)
- Las fotos siguen siendo cuadros de video de 720 px: blandas de cerca, sobre todo la tienda en compu (1/1.7 a 520 px). Solo se arregla con fotos originales (ya está en PENDIENTES).
- Compu, sección brillo: el collage centrado deja aire a los lados; no es hueco mayor a 90 px y no se rehízo.
- El mapa de Google muestra a "Novias 15 Años El Parián" junto al pin: es del mapa, no se controla.

## Verificación
- krevo-shot m: alto 8,711 px, alertas []; d: alto 7,735 px, alertas [].
- Flujo del perchero probado (percha 04 y 06 al probador, XV de mi hija, 14 mar 2027, accesorios, Laura): el header cambia a "SUS XV · 14 MAR 2027 · FALTAN 164 DÍAS" y los 4 wa.me llevan el mensaje armado completo.
