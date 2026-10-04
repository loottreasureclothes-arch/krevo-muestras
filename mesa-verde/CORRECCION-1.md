# CORRECCION-1 Mesa Verde (pulidor, una pasada)
Problemas más visibles, en orden:
1. Hero: la foto enseña más tabla que hamburguesa y corta el pan de arriba.
2. Hero celular: el WhatsApp flotante tapa "Hoy cerrado... 9:30 am".
3. Hero celular: eyebrow largo en 2 renglones diminutos.
4. Lugar: frase con voz rara ("Aquí, para llevar o a domicilio.").
5. Lugar celular: horario de 7 filas muy alto.
6. Pie que se desinfla: solo nombre, "Martes cerrado" y el pin.
7. Fachada y sala con loading="lazy" (fotos que venden).
8. Mesa de hoy: con 1 persona decía "Voy yo solo... Nos gustaría sentarnos".
Prueba anti-genérico: pasa (letrero propio, componente firma propio, 6 verdes, sin contadores ni rejilla, 7 secciones, 7,051 px).

## Resultado
- 1 arreglado a medias: object-position subido a 16 %; el pan sigue cortado porque el recorte de maps-05 lo quitó (falta foto del dueño).
- 2 arreglado: padding-right 64 px en "hoy" y botones del hero en celular.
- 3 arreglado: "Vegetariano en el Centro de Ags".
- 4 arreglado: "Come aquí, pasa por tu pedido o pídelo a domicilio." (datos de Maps).
- 5 arreglado: filas más compactas (7 px, .92rem).
- 6 arreglado: pie con "Diario desde 9:30 am. Martes cerrado." y teléfono tocable de 44 px.
- 7 arreglado: sin lazy en sala y fachada.
- 8 arreglado: "Me gustaría sentarme" cuando es 1 persona.
- No arreglado: redes en el pie (IG/FB sin revisar, sigue en PENDIENTES).
