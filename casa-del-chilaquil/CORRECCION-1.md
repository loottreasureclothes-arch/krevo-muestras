# Corrección 1: La Casa del Chilaquil (pulidor, 3 oct 2026)

## Los 8 problemas más visibles (en orden)
1. Celular: el botón de WhatsApp del hero quedaba abajo del pliegue (907 px > 844); la primera pantalla no tenía acción.
2. Huecos de más de 90 px entre secciones (4 en celular, 7 en compu).
3. Jarro a sangre en compu: foto de celular macro, suave y estirada a 1440 x 720.
4. El botón flotante de WhatsApp tapaba los "Agregar" de la carta en celular.
5. Cierre flojo: el último botón decía solo "Escríbenos" con mensaje de "¿qué hay hoy?".
6. "Todo listo" pedía fotos del comedor y la fachada que ya se ven en la página (se contradecía).
7. La foto del jarro (foto que vende, a sangre) iba con loading="lazy".
8. Eyebrow de opiniones con voz de investigador ("Google Maps, sucursal Encino").

Prueba anti-genérico: 1 no (barro, festón, arco, salsas de su carta), 2 no, 3 no (arco + su letrero), 4 no (5 verdes), 5 no, 6 no (Divorciados a tu modo, nuevo), 7 no, 8 no (7 secciones, 7,451 px). Pasa.

## Resultado
1. Arreglado: foto del hero más baja (100svh - 210 px, mín 460) y márgenes recortados; el botón queda en 762 px.
2. Arreglado: padding de secciones 44 px, hero abajo 28 px, divorciados arriba 16 px y alineado arriba en compu; 0 huecos > 90 px.
3. Arreglado: banda del jarro en compu a min(44vw, 600 px) y webp regenerados con UnsharpMask + contraste leve (sin IA).
4. Arreglado: la carta lleva data-hide-wa; el flotante se esconde ahí.
5. Arreglado: "Pide tu desayuno" con mensaje "Quiero pedir desayuno, ¿ya están abiertos?".
6. Arreglado: ahora dice "Fotos propias del comedor y la fachada".
7. Arreglado: quitado loading="lazy" del jarro.
8. Arreglado: eyebrow "Lo cuentan en la mesa".

No arreglado: el jarro sigue siendo foto suave de origen (mejor foto pendiente del dueño); precios y redes siguen pendientes del dueño.
