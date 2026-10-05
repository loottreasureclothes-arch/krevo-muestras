# Corrección 4 Las Antorchas (revisor final, 5 oct 2026)
## Encimes
- encimes.mjs: m 0 encimes / 0 cortados / 5 "fuera"; t 0/0/0; d 0/0/0.
- Los 5 "fuera" en celular son la comanda 02 del carrusel de reseñas, que asoma a la derecha a propósito (swipe con contador 01/08). Confirmado en captura: falso positivo.
## Arreglado
- 01-hero.css: el fondo difuminado del hero pedía `sections/img/fachada-480.webp` (404). Ruta corregida a `../img/fachada-480.webp`; krevo-shot m y d ya dan `alertas: []` sin recursos rotos.
## Revisado y bien
- 9 secciones, 9,337 px en celular (t 9,773, d 8,946).
- Bloques obligatorios: hero con 2 botones, carta con precios reales o "Pregunta el precio", componente firma (antorchas + comanda), 8 reseñas con nombre y fuente + 4.0 / 15,376 de Google con botón, galería de 4 fotos + link a las 3,842 de Google, Visítanos con mapa embebido, horario por día y "Abierto ahora", Todo listo para completar, pie con redes.
- wa.me decodificados: 524499189633 con mensaje armado. Ojo: número sacado de Maps, falta confirmar que sea WhatsApp (en PENDIENTES).
- Compu y tableta en 2 columnas, sin huecos raros.
