# Tubería KREVO en la NUBE (Claude Code on the web)

Este repositorio ES `krevo-muestras` (GitHub Pages: https://loottreasureclothes-arch.github.io/krevo-muestras/<slug>/). Trabajas en la raíz del repo.

## Preparar (una vez por sesión, menos de 1 minuto)
```
pip install -q pillow opencv-python-headless numpy
export CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
python3 -m http.server 8770 --directory . >/dev/null 2>&1 &
mkdir -p /tmp/tuberia
```
Node ya trae fetch y WebSocket (krevo-shot y encimes funcionan con ese Chromium).

## Investigar sin el navegador de la app
No hay navegador interactivo: usa Playwright con el Chromium de arriba (`p.chromium.launch(executable_path=os.environ['CHROME'], args=['--no-sandbox'])`) para abrir la ficha de Google Maps y correr `_tuberia/maps_fotos.js` con `page.evaluate`, y luego `python3 _tuberia/maps_fotos.py urls.txt <slug>/research/fotos/maps`. Reseñas: Restaurant Guru / TripAdvisor con curl o Playwright.

## Papeles
Los mismos de siempre, en `_tuberia/`: INVESTIGADOR-CORTO.md, ARMADOR.md, PULIDOR-CORTO.md, MEJORADOR.md, REVISOR-FINAL.md, con las reglas de CANON.md. Encimes: `node _tuberia/encimes.mjs http://localhost:8770/<slug>/ /tmp/tuberia/<slug>-enc.json` → 0 en m, t y d.

## Publicar
Al terminar cada página: `git add <slug> && git commit -m "Muestra <nombre>" && git pull --rebase && git push origin HEAD:main`. Nunca toques carpetas de otros sitios ni `_tuberia/`. GitHub Pages publica solo en 1 a 2 minutos.

## Costo
Esto se cobra del crédito de sesiones en la nube, no del límite semanal. Usa Sonnet para investigar y armar y Opus para pulir y revisar (si la sesión permite elegir modelo de subagentes). NUNCA Fable.
