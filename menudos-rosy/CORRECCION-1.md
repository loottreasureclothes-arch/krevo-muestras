# Corrección 1 (pulidor, 5 oct 2026)

## Problemas, del más visible al menos
1. Tableta (820): usaba el celular estirado (13,914 px de alto, una sola columna).
2. "Tortilla hecha a mano." se salía del contenedor en compu 1440 (1270 px en 1140) y de la pantalla en tableta.
3. "Antes de que amanezca" en tableta: el 4:30 gigante aplastaba la foto de la fachada contra el borde.
4. "Paga en efectivo" en carta y visítanos: hechos.md dice no afirmarlo sin confirmar (dato no confirmado).
5. krevo-shot INVISIBLES: los radios de los chips (opacity 0, a tamaño completo) contaban como bloques ocultos.
6. krevo-shot "1 botón menor a 40px": era el logo del header (a.logo, 178x31).
7. Botones +/- de "Tu mesa" de 34x32 px (bajo 40 px, chicos para el dedo).
8. Componente firma sin probar con clics.

Prueba anti-genérico: pasa (letrero rojo propio, tazón SVG que se rellena, 4:30 del domingo, 9 secciones, 0 verdes, sin contadores ni rejilla de íconos).

## Resultado
1. Arreglado: cortes de 2 columnas bajados de 900 a 768 px; tableta 10,482 px con diseño propio.
2. Arreglado: en una línea solo desde 1100 px y tamaño clamp(64px,6.6vw,110px); cabe en 1140.
3. Arreglado: el diseño de 2 columnas de amanece queda desde 1100 px; en tableta va apilado y completo.
4. Arreglado: quitado de las dos secciones; PENDIENTES actualizado.
5. Arreglado: el input del chip mide 1 px (la etiqueta sigue siendo clicable y el foco visible funciona).
6. Arreglado: más relleno en el logo (43 px de alto).
7. Arreglado: ahora 40x40.
8. Arreglado: probado con Playwright (elegir plato, tamaño, especial de pata, micro sin tamaño, agregar, +/-, total $465, nombre, rellenar caldo, copiar al portapapeles, tel:, vaciar vuelve a "Elige arriba"), sin errores de consola.
