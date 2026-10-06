# Corrección 1 (pulidor, 6 oct 2026)
## 8 problemas más visibles
1. Fachada (06) con logo de Corona en el letrero (marca ajena).
2. Foto de "Para llevar" a sangre borrosa y estirada (fuente de 720 px).
3. Tableta 820 = celular estirado (cortes en 900 px) y "2x1" encimado sobre "y 3x2".
4. Carta en compu: botones Agregar caían en otra fila, precios sueltos.
5. Reseñas: 3 de 5 tarjetas decían solo "Dejó su calificación", se veían vacías.
6. Cierre de opiniones flojo (lista de temas en gris) sin voz real de clientes.
7. Dato inventado en la carta ("huevo" en Miso Ramen, no está en research).
8. Fotos que venden (carta y palillo) con loading="lazy".
Prueba anti-genérico: pasa (palillo propio, toldo con flecos, sin contadores ni rejilla de íconos, 0 palabras prohibidas).
## Resultado
- 1 arreglado: fachada recortada sin el logo de Corona, reescalada con Real-ESRGAN 50 %.
- 2 arreglado: k15 rehecha con Real-ESRGAN 50 % + grano, srcset 480/960/1440 real.
- 3 arreglado: cortes a 760 px y 2x1 a 19vw; encimes 0 en celular, tableta y compu.
- 4 arreglado: fila de 3 columnas (nombre, precio, Agregar).
- 5 arreglado: subcalificaciones reales (Comida/Servicio/Ambiente) de Restaurant Guru.
- 6 arreglado: dos frases reales del resumen de Google en tipografía grande.
- 7 arreglado: "Caldo de miso con fideo."
- 8 arreglado: sin lazy en carta y palillo.
- No arreglado: siguen 5 reseñas con nombre (falta 1 para 6; Maps no carga sin sesión, Restaurant Guru no trae texto).
- No arreglado: precios reales (todo "Pregunta el precio") y fotos propias, quedan en PENDIENTES.
