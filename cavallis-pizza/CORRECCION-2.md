# Corrección 2 Cavalli's Pizza (inspector HD, 3 oct 2026)
## Fotos HD
- Originales de Maps miden 2,048 px (> 1,200): sin Real-ESRGAN, solo LANCZOS desde el original.
- 6 tarjetas de la carta regeneradas desde el original con talla máxima real: c-ruc/c-foc/c-rav/c-tag a 1536, c-jam/c-ens a 1228 (q82, mismos nombres). srcset actualizado.
- pz-ruc, pz-jam (1536), techo (1536) y terraza (1600) ya estaban a talla máxima.
## Los 6 más visibles
1. Compu, "Pasa por tu mesa": la foto en arco quedaba centrada contra la lista de horarios y dejaba hueco arriba y abajo (≈70 px arriba, ≈300 px abajo con "Llamadas" sola).
2. Celular, reseñas: el flotante de WhatsApp tapa el final de las citas cortas.
3. Carta en compu: `sizes` 28vw pedía el webp de 960 para tarjetas de ~250 px (peso de más).
4. "Pregunta el precio" ×6: la carta no vende sin precio (depende del dueño; PENDIENTES).
5. WhatsApp sin confirmar (depende del dueño; PENDIENTES).
6. Fotos de clientes de Maps, no del negocio (depende del dueño; PENDIENTES).
Prueba anti-genérico: 1 no (cortador mitad y mitad con sus dos pizzas, techo de flores, arcos de ventana italiana), 2 no, 3 no (pizza circular que gira y sale del marco), 4 no (5 verdes), 5 no, 6 no, 7 no, 8 no (7 secciones, 7,706 px). Pasa.
## Resultado
- Arreglado 1: columna de foto alineada arriba y pegajosa (sticky) bajo la barra; acompaña la lista de horarios sin huecos.
- Arreglado 2: citas chicas con 44 px de aire a la derecha en celular.
- Arreglado 3: sizes real (260 px en compu, 30vw tableta) → el navegador baja el 480/960 que toca.
- No arreglado 4, 5, 6: dependen del dueño.
