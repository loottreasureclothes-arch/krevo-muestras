# Corrección 1 · Letras Gigantes RG (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden)
1. Mosaicos del componente firma con letras vecinas cortadas: la P sin su panza, la V sin su brazo derecho, la T con el brazo de la Y, la H con un pedazo de la C, la R, la X, la Y, la J y la O de PANCHO con orillas mordidas.
2. Lista de precios en celular: 12 botones violeta macizos apilados; se veía como un muro de botones.
3. Título "PRECIO FIJO, A LA VISTA." contradecía la nota "Confirma el precio vigente por WhatsApp".
4. Tarjeta de letreros neón: 7 fichas en 4 renglones de cajas grandes tapaban el letrero.
5. Logo en header y pie: cuadro crema con el círculo mordido a la derecha (se veía recortado mal).
6. El mosaico de la I medía 34 px de ancho (alerta de botón chico; difícil de tocar).
7. Escenario: reflejo del piso casi invisible (16 %) y mosaicos de muestra apagados al 82 %.
8. Placa del hero partida en dos renglones sobre el cielo.
9. Fotos que venden con `loading="lazy"`: OH BABY (remate) y M&R.
10. Hero: revisar placas de autos al fondo de AGS.

## Arreglado
1. Recortados de nuevo con PIL desde sus fotos (sin IA) 9 mosaicos: p, h, o2 (PANCHO), t, y (KEITY), v, x (XV), j (A&J), r (R&G); caja medida en cada foto, letra completa, orillas oscurecidas a noche. Ancho nuevo en `AR` de site.js, `mapa.json` y el respaldo sin JS (X).
2. Botones de precio ahora son boletos con contorno violeta y canto oscuro (lleno lavanda al agregar); renglones más compactos.
3. Título cambiado a "SUS PRECIOS, / A LA VISTA.".
4. Fichas de neón compactas (40 px, a lo ancho, 3 renglones); el neón respira.
5. Logo recortado al círculo real de su `logo-fb.jpg` y mostrado redondo (header 40 px, pie 120 px con filo y resplandor violeta). Sin redibujar.
6. Mosaicos con ancho mínimo de 40 px (la foto se muestra completa, sin recortar).
7. Reflejo al 30 % y mosaicos de muestra al 94 %.
8. Placa: "Más de 230 publicaciones de montajes" (un renglón).
9. Quitado `loading="lazy"` de OH BABY y M&R.
10. Revisado: los autos del fondo ya están oscurecidos y no se lee ninguna placa. Sin cambio.

## Verificado
- krevo-shot m y d: `alertas: []`. Alto en celular 8,857 px.
- Flujo del componente: escribir "PATY XV" + XV años + 14 nov 2026 + renta + Arco Curly arma `https://wa.me/524494054395?text=Hola Letras Gigantes RG, quiero cotizar letras gigantes iluminadas con el nombre PATY XV (6 letras). Evento: XV años. Fecha: 14 de noviembre de 2026. Lo quiero en renta. También me interesa: Arco Curly (renta $1,500). ¿Me confirman precio y disponibilidad?` (igual en el remate).
- Tableta 820 px revisada.

## No arreglado
- La P de PANCHO conserva un poquito de la pata de la A abajo a la derecha: en la foto están encimadas.
- Tableta 820: la ficha del componente queda a 2/3 del ancho con aire a la derecha (se lee bien, no es error).
- En compu el momento firma (XIMENA) es una foto vertical de ~440 px de ancho junto al muro de nombres; funciona pero podría ser más grande.
- F, W, Z, Ñ y números siguen sin foto (caja punteada, por diseño; pendiente del dueño).
