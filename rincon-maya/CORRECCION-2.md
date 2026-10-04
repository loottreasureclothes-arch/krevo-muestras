# Corrección 2 (inspector HD) Rincón Maya

## Fotos a HD
Ningún original mide menos de 1,600 px (todos 1,536-2,048 de lado mayor): no aplica Real-ESRGAN. Se recuperaron los recortes exactos de cada foto (plantilla contra el original) y se regeneraron TODOS los webp desde el original con LANCZOS, calidad 82, mismos nombres; además tallas nuevas: platillos 1080 (6), mesa 1536, casona 2048, agregadas al srcset. 36 archivos regenerados + 8 nuevos.

## Los 6 problemas más visibles
1. Platillos en compu se pintaban a 28vw @2x (~806 px) con un webp de 720: borrosos. Arreglado (1080).
2. Foto de la mesa de salsas en compu (~1,036 px @2x) servida a 960; casona a sangre 2880 @2x servida a 1600. Arreglado (1536 / 2048).
3. Hero compu: placa "Abasolo 113" chiquita y subtítulo gris apagado; el cartel perdía fuerza. Arreglado (placa 1.3x, sub 26 px crema).
4. Opiniones: la reseña de Pako Del Ángel cortada con "…"; se veía floja. Arreglado (frase completa literal de research/resenas.md).
5. Compresión previa de los webp sin control de calidad. Arreglado (todo a 82 desde el original).
6. Hero celular, platos y canasta: revisados, sin cambios necesarios.

Prueba anti-genérico: pasa (placa propia en hero, canasta del paquete, 5 verdes, 6 secciones, 6,058 px, sin palabras prohibidas en títulos).

## Verificación
krevo-shot m y d: alertas [], 6,058 px en celular, wa.me/524499167574 decodificado intacto, 0 cargas fallidas, consola limpia.

No arreglado (dependen del dueño, en PENDIENTES): precios por platillo, WhatsApp confirmado, horario por día, logo, redes, fotos propias.
