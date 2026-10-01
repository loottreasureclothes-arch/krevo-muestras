# Forza Fitness Club · Corrección 1 (30 sep 2026)

Un corrector anterior ya había aplicado casi toda la lista de REVISION-1 antes de colgarse; este pase la verificó punto por punto (capturas, medidas con Chrome headless) y cerró lo que faltaba.

## Aplicado (verificado)
1. Hero celular: recorte nuevo de maps-01 con la pared FORZA gigante y las mancuernas; lona en inglés fuera; sin logo cortado ni forzafc.com.mx legible.
2. Rayo: velo en degradado (el rack se ve), llenado ligado a la posición real de `#fz-bolt` (empieza con su centro al 80 % de la pantalla, termina al 40 %). Medido: en p=0 el rayo está completo en pantalla (celular borde inferior 830/844, compu 892/900); reversible (p=0.5 al subir y al bajar).
3. Huecos: ningún espacio sin contenido mayor a 87 px en celular (medido). Alto celular 8,074 px (compu 6,792).
4. Tablero: celdas 12 px en celular y 14 px en compu, "Hora/AM-PM" subido a 12 px en este pase; sin scroll horizontal (scrollWidth 390; celdas dentro del marco).
5. Colosio con maps-02 aclarada (FORZA rojas) en paralelogramo; arte Reloaded entero ("RELOADED" y "Always Forza" visibles; la L estilizada es del diseño original), máx 55 svh.
6. 820 px con diseño propio: planes en 3 columnas, reseñas en 2 columnas, Colosio foto + ficha + mapa en 2 columnas.
7. Menú: la raya ya no cruza el texto ni el botón de WhatsApp.
8. WhatsApp: "Me interesa el Plan Gold (desde $999.90 al mes). Clase: CrossFit mié 6:00 pm con Diego Sánchez."
9. Hero: "Lun a vie de 5:00 am a 10:00 pm"; flotante oculto sobre el tablero y el cierre; reseñas con la reciente primero y fecha sin partir; texto de precios exacto; redes con glifo a 30 px en caja de 48 y glifo de Instagram correcto; og.jpg sin choque; punto de "Abierto ahora" blanco con halo rojo.

## No aplicado
- Estado "En curso" en el tablero (punto 15, opcional): no hay horario de duración publicado de las clases; sería inventar. La próxima clase salta a la siguiente al empezar la actual.
- Clases de tarde del sábado: siguen vacías porque ig-01 no las trae (ya en PENDIENTES); no se cambian datos.
- En el hero de celular queda una franja de un cartel de fruta ("HEALTH") y una marca de agua minúscula al pie de la foto original; no se puede quitar sin IA generativa ni sacrificar la pared FORZA.

## Verificación
krevo-shot `m` y `d`: alertas [], sin scroll horizontal. Flujo: Plan Gold + CrossFit mié 6:00 pm arma
`https://wa.me/524491538877?text=Hola Forza Fitness Club, quiero pedir mi inscripción. Me interesa el Plan Gold (desde $999.90 al mes). Clase: CrossFit mié 6:00 pm con Diego Sánchez.`
Capturas y hojas: /private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/forza-fix2/ (fin-m-0/1.png, fin-d-0/1/2.png, t-sheet-0/1.png para 820, bolt-sheet.png, f-sheet.png).
