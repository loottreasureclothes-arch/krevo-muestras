# CORRECCION-1 LePib (pulidor, 3 oct 2026)
## Problemas más visibles (en orden)
1. Centro del plato decía "$0" (prohibido) y no invitaba a tocar.
2. Lugares del plato apagados en gris lodoso y no se podían tocar: no se notaba que es interactivo.
3. Hero: objeto blanco cortado a la izquierda de la foto (celular y compu).
4. Hero celular: etiqueta "Salbutes con cebolla morada" encimada sobre el sello de la dirección, amontonado sobre el título.
5. Cierre se desinflaba: la página terminaba en "Todo listo" y el local no tenía forma de pedir.
6. Compu: "Todo listo" usaba solo la mitad izquierda, mitad derecha vacía.
7. Quesadilla y Chamorro sin foto: inicial plana en círculo vino, sin oficio.
8. Foto del local con loading="lazy" (foto que vende).
Prueba anti-genérico: pasa (0 sí). Plato de barro propio, hojas de plátano, 6 secciones, 5 verdes contando flotante.

## Resultado
- 1 arreglado: centro dice "Toca un platillo" vacío y "Tu plato $X" con pedido.
- 2 arreglado: los lugares del plato son botones (suman 1), fotos en color tenue, hover/press.
- 3 arreglado: object-position 78%, sin el objeto blanco.
- 4 arreglado: etiqueta arriba a la izquierda de la foto en celular.
- 5 arreglado: orden listo antes de local; local cierra con "Pedir para recoger" (wa.me real) + Cómo llegar.
- 6 arreglado: dos columnas en compu y tableta (título | lista).
- 7 arreglado parcial: inicial sobre mini plato de barro con borde; siguen sin foto real (PENDIENTES 2).
- 8 arreglado: loading eager.
- No arreglado: WhatsApp sin confirmar (PENDIENTES 1); fotos de Maps de resolución media.
Verificación: m y d alertas [], alto celular 5,228 px, wa.me del plato decodificado OK.
