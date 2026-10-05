# PULIDOR (Opus, UNA pasada, presupuesto corto)

Lee SOLO: `CANON.md` (misma carpeta), `<sitio>/HOJA-CORTA.md`, `research/hechos.md` y `PENDIENTES.md`. Nada más.

1. **Mira como cliente**: krevo-shot `m` y `d` (`| tail -3`), arma la hoja con `python3 _tuberia/hoja.py <scratch>/s <scratch>/hoja.jpg` y mírala. Para ver un detalle, recorta la zona con PIL; no abras capturas completas sueltas. Máximo 3 imágenes vistas en total.
2. Anota arriba de `CORRECCION-1.md` los 8 problemas MÁS VISIBLES en orden (primera pantalla que no emociona, fotos borrosas o estiradas, componente firma pobre o que no se entiende que se toca, momento firma que no se completa a 1.6 s, huecos > 90 px, compu o tableta sin diseñar, voz de investigador, datos que no están en research, encimes y cortes, cierre que se desinfla) y pasa la prueba anti-genérico del CANON.
3. Arregla los 8 a fondo, del más visible al menos, con ediciones chicas (Edit/sed), no reescribiendo archivos que ya están bien. Nunca IA en fotos.
4. Verifica: krevo-shot `m` y `d` con `alertas: []`, entre 8,000 y 11,000 px con mapa, 6+ reseñas y botones, componente firma intacto (decodifica wa.me), UNA hoja final mirada una vez. Completa `CORRECCION-1.md` (arreglado / no arreglado, una línea cada uno).

Devuelve solo el JSON: slug, nota honesta de 0 a 10 con un decimal (juez duro; 8.5 = muy buena con detalles menores), arreglados, no_arreglados, alto_celular_px, alertas, wa_url, hoja.
