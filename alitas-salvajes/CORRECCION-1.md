# CORRECCION-1 Alitas Salvajes (pulidor, 5 oct 2026)
## Problemas más visibles (en orden)
1. Tableta 820 era el celular estirado (12,156 px): breakpoint en 900.
2. Reseñas: solo 3 con nombre + 2 fragmentos + dato de Facebook; faltan 3 con nombre (no hay en research).
3. 4.4 en Google se mostraba con 5 estrellas llenas.
4. Letrero neón del hero era una píldora (prohibido).
5. Huecos entre secciones en compu (104+104 px).
6. "Lo dicen en la mesa" y "Pasa, hay mesa" en compu apilados como celular, sin 2 columnas.
7. Foto de la charola (vende) con loading="lazy"; papas de la galería también.
8. En celular el título del hero tapa parte del letrero dorado del local.
Prueba anti-genérico: pasa (charola armable propia, neón con horario real, cuadros de charola; 9 secciones con pie, sin contadores ni rejilla de íconos).
## Resultado
- 1 arreglado: breakpoint a 800 px; tableta ahora 2 columnas, 8,903 px, 0 encimes.
- 2 NO arreglado: no hay más reseñas con nombre en research; queda en PENDIENTES y "Todo listo".
- 3 arreglado: quinta estrella a medias (opacidad).
- 4 arreglado: letrero rectangular con esquinas de 6 px.
- 5 arreglado: padding de sección 84 px compu, 56 px celular.
- 6 arreglado: título con calificación / "Cómo llegar" a la derecha en compu.
- 7 arreglado: sin lazy en charola y papas.
- 8 NO arreglado: se deja; el letrero se lee arriba y el título es el cartel.
Verificación: m 10,345 px y d 8,434 px con alertas: []; encimes 0 en m/t/d; wa.me/524494399848 con mensaje de la charola intacto.
