# CORRECCION-1 Panificadora Los Ángeles (pulidor)
## 8 problemas más visibles (en orden)
1. Celular: al tocar Agregar no pasa nada a la vista; la bolsa queda 2 pantallas abajo.
2. Collage de Visítanos: las fotos chicas tapan el lema del letrero ("Especialistas en pan de Alta Fibra").
3. Compu: 6 tarjetas diminutas en una fila y la bolsa abajo, fuera de vista.
4. Se repite la cita de Isa (sin azúcar y opiniones) y "Sin azúcar" sale en título y en la lista.
5. Fotos que venden (tarjetas, rosca) con loading="lazy".
6. Hueco muerto arriba de la bolsa vacía (≈100 px sin nada).
7. Compu: botón y datos del hero diminutos junto a un título de 84 px.
8. Hero sin prueba propia de que la gente vuelve (el 4.7 queda hasta la sección 5).
Prueba anti-genérico: 1 no (arco de horno, listón del letrero, bolsa de papel), 2 no, 3 no, 4 no (3 verdes), 5 no, 6 no, 7 no, 8 no (7 secciones, 6,456 px). Pasa.

## Resultado
1. Arreglado: chip ámbar fijo "Ver mi bolsa" con contador que salta al agregar y lleva a la bolsa (se oculta cuando la bolsa está a la vista y en compu). Lógica revisada, sin errores de consola; el toque en vivo no se probó con clic real.
2. Arreglado: collage con más aire abajo; las fotos chicas ya no tapan el lema.
3. Arreglado: compu 1100+ = 3x2 tarjetas + bolsa fija (sticky) a la derecha; tableta 3 columnas.
4. Arreglado: sin-azúcar usa la otra cita ("Pan integral de lo más delicioso") y la lista dice Alta fibra en vez de repetir Sin azúcar.
5. Arreglado: sin lazy en tarjetas y rosca.
6. Arreglado: bolsa con menos aire arriba (las fotitas asoman por encima).
7. Arreglado: en compu el botón, la dirección y el 4.7 del hero más grandes.
8. Arreglado: línea "4.7 en Google, 565 opiniones" bajo el horario del hero.
No arreglado: la rosca sale dos veces (tarjeta y sin azúcar) porque no hay otra foto de rosca sin azúcar; WhatsApp sigue sin confirmar (PENDIENTES).
Verificación: m 6,546 px y d 5,272 px, alertas [] en ambas, wa.me 524499159943 decodifica la lista y el modo.
