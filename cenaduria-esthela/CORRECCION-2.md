# CORRECCION-2 Cenaduría Esthela (inspector HD, 3 oct 2026)
## Fotos HD
- comedor (maps-09): recorte nuevo sin la mesa de comensales (x 1080-2048, y 300-1536 = 968 px) → Real-ESRGAN x4 + 50 % LANCZOS + grano σ2 → webp 480/960/1600 (1600x2043), mismos nombres.
- Las demás (hero 2048, platillos 1536/1280) ya pasan de 1,200 px: no se suben.
## 6 problemas más visibles
1. Comedor: encuadre con techo, lámparas y ventilador (foto fea) en celular y compu.
2. Comedor en compu = celular estirado (foto a sangre 100vw con el mismo texto encima).
3. Hero de celular: la foto ocupaba ~47 % de la pantalla, no ~2/3.
4. Caras de la mesa de enfrente en la foto del comedor.
5. Selects nativos (Sencillas / De crema) con flecha del sistema, sin oficio, en la carta.
6. Flotante "Llamar" tapa la última línea de reseñas al pasar (celular).
Prueba anti-genérico: 0 sí (hero con su logo y su calle, libreta propia, 0 verdes, 7 secciones, 6,804 px).
## Resultado
- 1 arreglado: recorte de mesas, sillas de madera y arco; sin techo.
- 2 arreglado: compu/tableta a 2 columnas (foto 6/11 + "Mesas para todos." + línea corta).
- 3 arreglado: texto baja 50 px, foto ~55 % de la pantalla (hero crece a 760).
- 4 arreglado en parte: la mesa de enfrente queda fuera; quedan figuras chicas al fondo (10-15 px, no se distinguen caras).
- 5 arreglado: select con flecha propia burdeos, sin esquinas redondas, hover.
- 6 no arreglado: es el flotante normal, solo tapa al pasar.
## Verificación
m alto 6,804 px, d 6,007 px, alertas [], 0 cargas fallidas, wa.me sigue cableado y oculto (WA="").
