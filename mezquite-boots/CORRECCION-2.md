# Mezquite Boots · CORRECCIÓN 2 (1 oct 2026)

Base: los 6 problemas del juez (8.4), sin REVISION-2.md. Todo en `sections/` + `python3 build.py` (index.html nunca a mano). Respaldo del estado anterior en `backup/correccion-2/` (y `backup/correccion-2b/` la versión intermedia del interior).
Capturas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/tuberia/mezquite-boots-corrector2/` (m/, d/, hoja-m.jpg, hoja-d.jpg, v3/ y v4/ con 820 y 360).

## Medidas finales
- Celular 390: **8,662 px** (tope 9,000). Compu 1440: 6,561 px. 820: 9,142 px. 360: sin scroll horizontal (scrollWidth 360).
- krevo-shot m y d: **0 alertas**, 4 botones wa, solo Alfa Slab One + Zilla Slab.
- Flujo probado (820): Botas (etiqueta) + Sombrero (zona) → aparece "¿Qué número calzas?" → 27 → Independencia → Juan. URL `https://wa.me/524491113361?text=Hola%20Mezquite%20Boots%2C%20busco%20botas%20y%20sombrero.%20Calzo%20del%2027.%20Voy%20a%20la%20sucursal%20Independencia.%20Mi%20nombre%3A%20Juan` = "Hola Mezquite Boots, busco botas y sombrero. Calzo del 27. Voy a la sucursal Independencia. Mi nombre: Juan". Los dos botones `data-wa-pinta` llevan la misma URL.

## Cambios aplicados
1. **Gorras con marca en el interior**: nuevo recorte de maps-02 (franja de en medio: playeras, cintos, mezclilla y exhibidor de botas). Quedan FUERA la fila de gorras de arriba (NY y demás) y las gorras de enfrente (KENWORTH); las dos gorritas del exhibidor ya iban limpias. Se descartó tapar las gorras de arriba con inpaint: probado, dejaba caras de gorra embarradas que se notaban a 1440.
2. **Parche borroso del maniquí**: los dos manchones (cintura del pantalón caqui a la izquierda y del café a la derecha) se rehicieron clonando cintura, tela y muro de al lado, con la orilla de la cintura siguiendo su línea y orillas fundidas (`_work/clean02_maniqui.py`). Revisado a pixel: ya no queda zona borrosa.
3. **Color del interior**: balance por gris (quita el amarillo), altas luces comprimidas, niveles y contraste local suave; Real-ESRGAN x4 mezclado 50 % con LANCZOS + grano. En compu la foto va en **recuadro de 440 px**, cargada a la derecha y ladeada 1.2°, con "Ver las 88 en Google" debajo; proporción 16:9.
4. **Hero en compu**: la bota ahora mide el alto de la pantalla menos el header (784 px a 1440x900, antes 675) y se sale un poco del margen derecho; el texto se alinea con el logo del header. Texto de apoyo a **23 px**, línea del 4.9 a **21 px** con el 4.9 a 34 px, botón de 60 px de alto. Fachada chica montada abajo a la izquierda de la bota.
5. **Tableta (700 a 960) Arma tu pinta**: dos columnas 1.6fr/1fr; maniquí de **449 px a 820** (≈ 55 % del ancho de pantalla, 59 % del contenido) con fichas y nota a un lado; renglones de la nota apilados (etiqueta arriba, valor abajo) y botón verde a 13 px para que quepa. **Sucursales a 700-1099**: las tres notas a **2 columnas**, letra más grande (nombre 28, dirección 18, teléfono 21); Villa Juárez va ancha con su contenido en dos columnas. De paso: en la nota grande de Independencia la foto llena el alto (la etiqueta "Av. Independencia" ya no queda flotando en un hueco).
6. **"según su letrero"**: sale del renglón de la referencia y pasa a ser un pie fijo bajo el nombre en las tres notas: "DIRECCIÓN SEGÚN SU LETRERO" (versalitas chicas). "Sobre carretera, frente a la Iglesia" queda en un solo renglón a 390 y 360.

## No aplicado y por qué
- Tapar con inpaint las gorras de la fila de arriba (opción del punto 1): se prefirió recortarlas fuera, porque el tapado dejaba manchas que delatan el retoque; el juez pide "sin pixelar" y limpio.
- No se tocaron textos, datos, mecánica del maniquí, bordado, cinto, verdes ni "Todo listo".

## No verificado
Celular físico; que 449 111 3361 reciba WhatsApp (sigue en PENDIENTES).
