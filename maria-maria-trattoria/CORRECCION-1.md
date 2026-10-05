# CORRECCION-1 María María Trattoria (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. Componente firma "Una silla más" casi igual a "El recado de la llamada" (volodia-panaderia): mesa redonda + día + hora.
2. Tableta (820) sin diseño propio: carta en 2 columnas gigantes, galería y reseñas en una columna; 13,134 px de alto.
3. La carta y el componente no se hablaban: los platos reales (filete tartufo, burrata, postre de higo) no tenían momento propio.
4. Sin nada elegido el mensaje debe decir "Elige arriba", nunca vacío.
5. Botón de copiar con texto de 2 líneas en celular.
6. Menú con ancla al componente viejo (#mesa).
7. Panel central del pliego desalineado (filas de grid estiradas) en tableta y compu.
8. Despliegue con rotación que encogía los botones (krevo-shot: "10 botones menores a 40px").

Arreglos:
1. ARREGLADO: nuevo componente "Tres tiempos": carta de papel doblada en tres que se despliega (clip-path), encierras en tinta un plato real por tiempo, ventana redonda con su foto (tartufo tipográfico), vino "a catar y decantado" de la reseña de Dra. Miriam Garcia; termina en Llamar (tel:) o Copiar.
2. ARREGLADO: tableta con carta a 4 columnas, collage de 12 columnas, reseñas a 2 columnas y pliego en 3 hojas: 9,958 px.
3. ARREGLADO: el pliego usa los mismos platos de la carta con sus fotos.
4. ARREGLADO: "Elige arriba un plato de la carta." y Copiar desactivado.
5. ARREGLADO: "Copiar lo que diré".
6. ARREGLADO: menú apunta a #tiempos "Tres tiempos".
7. ARREGLADO: align-content:start en cada hoja.
8. ARREGLADO: despliegue con clip-path + giro chico; alertas [] en m y d.
No arreglado: fotos siguen siendo de clientes en Google (no hay propias); precios sin research ("Pregunta el precio").
