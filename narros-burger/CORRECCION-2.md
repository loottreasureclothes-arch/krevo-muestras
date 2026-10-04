# CORRECCION-2 Narros Burger (inspector HD, 3 oct 2026 noche)

## Fotos a HD
- fachada (maps-01, 1200 px): Real-ESRGAN x4 + LANCZOS 50 % + grano σ2 → 480/960/1600. Se quitó fachada-1200 y se actualizó el srcset.
- murales (2048 px) → 1600 nuevo; terraza (recorte 1126 px de 2048) → talla real máxima. Solo LANCZOS.
- hero (maps-19, 2048 px) ya era HD, sin tocar. Total: 3 fotos regeneradas, 1 subida con Real-ESRGAN.

## Los 6 más visibles
1. Fachada en compu casi negra (brillo .8 + velo .85): no lucía el local. ARREGLADO: HD + brillo .96/contraste 1.06 + velo inferior .72.
2. Fotos del local servidas a 960 px pero pintadas a 2x en compu (~1,150 px): se veían suaves. ARREGLADO con 1600/1126.
3. Estados en compu: hueco crema de ~150 px bajo el título pegajoso al terminar la lista. ARREGLADO: padding inferior 112→72, párrafo más pegado al botón.
4. Hero celular: la foto ocupaba ~55 % de pantalla, no 2/3. ARREGLADO: 64svh→69svh (alto total 7,873 px, dentro del límite).
5. Comanda en celular: el ticket sigue a 2 pantallas de la lista (viene de CORRECCION-1 #7). NO ARREGLADO: la barra fija "Ver comanda" es el atajo; reacomodar la lista rompe el componente.
6. WhatsApp 449 352 9241 sin confirmar como WhatsApp. NO ARREGLADO: dato del dueño, sigue en PENDIENTES.

Prueba anti-genérico: pasa (0 sí). 4 verdes, 7 secciones, 7,873 px en celular, wa.me/524493529241 intacto, alertas [] en m y d.
