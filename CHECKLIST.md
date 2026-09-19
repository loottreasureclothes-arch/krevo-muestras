# Checklist del inspector (ronda de mejora)

## DECISIONES DE EMANUEL (mandan sobre BRIEF.md; NO las reportes como error)
- Botones de acción (WhatsApp, cotizar, reservar) en VERDE WhatsApp. El color de marca va solo en detalles.
- No todo blanco: el hero y algunas bandas van en color cálido de marca (Closet = café nogal; La México = tinto). El resto va en fondo claro o crema.
- Fotos con escena y ambiente, NO objetos recortados sobre blanco.
- Closet & Door: el hero dice "Remodela tu espacio". El slider lleva closet, cocina, puertas, remodelaciones, muebles y "otra vista" de la cocina. Las secciones "Lo que hemos fabricado" y "¿Quiénes somos?" las pidió él. "Remodelaciones" lo pidió él.
- Es una MUESTRA: las fotos ilustrativas están bien si el footer dice que son ilustrativas.

Eres el INSPECTOR, no el constructor. Evalúa con ojos de cliente exigente que va a pagar $5,000 USD y con los de Emanuel, que odia lo básico y lo feo.

No edites la página. Solo reportas.

## Cómo revisar

- Abre la página en tu propia pestaña del navegador pane. Crea la tuya con `tabs_create` y no toques las ajenas.
  - Si no puedes crear pestaña, usa Chrome headless con `--user-data-dir` propio y guarda las capturas en tu carpeta del scratchpad.
- Revisa primero a **390x844**. Baja por TODA la página con capturas cada ~700px.
- Luego revisa a **1440x900**.
- Espera a que terminen las animaciones antes de capturar. Captura también A MITAD de las animaciones clave: hero, slider y antes/después.
- Revisa la consola por errores y la red por 404.
- Compara contra las referencias de BRIEF.md: lata CIAO, frasco Tikka Masala, dental antes/después, Hibiscus Key.

## Qué calificar (0 a 10 cada uno, con evidencia)

1. **Primer impacto (hero, 3 segundos):**
   - ¿Se siente de $5,000?
   - ¿El objeto protagonista se ve fotorreal y bien recortado, sin recuadro gris ni borde?
   - ¿El título se lee?
   - ¿Hay CTA arriba?
2. **Animaciones:**
   - ¿Cortas (menos de 1.5 s) y disparadas solas?
   - ¿Hay pin o scroll eterno? Eso está prohibido.
   - ¿Algo brinca, parpadea o se ve a medias?
3. **Slider:**
   - ¿Funciona con swipe?
   - ¿La transición se siente premium o de plantilla?
   - ¿Los fondos de color son armoniosos?
4. **Celular:**
   - ¿Algo encimado, cortado, demasiado chico o con scroll horizontal?
   - ¿Imágenes a media pantalla y no a pantalla completa?
   - ¿Botones de al menos 44px?
5. **Funcional:**
   - WhatsApp con logo oficial y mensaje prellenado.
   - Llamar.
   - Maps.
   - Horario.
   - Formulario que arma el mensaje (pruébalo y lee el URL resultante).
   - Menú o cotizador.
   - ¿Algún link roto?
6. **Datos:**
   - ¿Hay algo inventado: precios, horarios, años, reseñas, platillos que no estén en research/ o en el brief?
   - Revisa la ortografía.
7. **Estilo (reglas del brief):**
   - Fondo blanco, un solo acento, sin naranja.
   - Sin guiones largos (—), sin Inter, sin emojis como iconos.
   - Texto corto.
   - Jerarquía clara.
   - Espaciado consistente.
   - Tipografía con carácter.
8. **Detalles finos:**
   - Alineaciones.
   - Radios consistentes.
   - Sombras.
   - Estados hover/tap.
   - Favicon y title.
   - Meta description.
   - Imagen og para WhatsApp (que se vea bonita la tarjeta al mandar el link).

## Entregable

Escribe `<sitio>/REVISION-<n>.md` con:

- La calificación por punto.
- Una **lista priorizada de hasta 15 cambios concretos**. Cada cambio debe decir qué, dónde (selector o sección) y cómo debe quedar.
  - Arriba van los que más suben la calidad percibida.
- Las rutas de tus capturas clave.
