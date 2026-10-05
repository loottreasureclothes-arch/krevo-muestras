# Corrección 1 (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. El componente multiplicaba "$499 x invitados" y decía "por persona": research solo dice "Menús desde $499" (bodas.com.mx), sin unidad.
2. Catálogo "Qué se renta" decía "Menús desde $499 por persona" (la unidad no está en research).
3. Alto en celular 10,737 px (10,885 con el componente usado): pegado o pasado del tope pedido de 10,700.
4. Reseñas apiladas en celular: 1,445 px de tarjetas seguidas, sección larga y pesada.
5. Lunes después de las 7 pm el aviso decía "Hoy se visita con cita" (horario confirmado de Maps solo es lunes 2 a 7 pm); antes de las 2 decía "Cerrado ahora".
6. Teléfono de botones: verificar que todos sean el de Maps.
7. WhatsApp sin confirmar: verificar que no quede wa.me ni verde.
8. Mapa embebido se ve gris en la captura sin red (iframe lazy).
Prueba anti-genérico: pasa (capilla en A propia, componente "Las nueve horas" único, 0 verdes, sin contadores, 9 secciones).

Resultado:
1. Arreglado: boleto dice "Menús desde $499, pregunta qué incluye." sin multiplicar; el texto copiado igual; se quitó money().
2. Arreglado: "Menús desde $499, pregunta qué incluye".
3. Arreglado: 10,133 px en celular; con el componente al máximo (6 bloques, baile 4 h, aviso de exceso, copiado) 10,280 px.
4. Arreglado: carrusel con scroll-snap en celular (las 4 reseñas, asomo del borde de la siguiente y "Desliza para leer las 4 →"); en tableta y compu siguen en 2 columnas.
5. Arreglado: "Abierto ahora" solo lunes 2 a 7 pm; lunes antes "Hoy lunes abre a las 2:00 pm"; lunes después "Hoy ya cerró · otros días con cita"; otros días "Hoy se visita con cita: llámanos".
6. Verificado: los 11 tel: son +524495455102.
7. Verificado: 0 wa.me, 0 api.whatsapp, 0 #25D366.
8. No arreglado: es el iframe sin red en la captura; en navegador real carga Google Maps.
