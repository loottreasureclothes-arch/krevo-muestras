// Pégalo con javascript_tool EN TU PESTAÑA (tabId) sobre la ficha del negocio en Google Maps (/maps/place/...).
// NO hagas clic en "Fotos": pide iniciar sesión y te saca a accounts.google.com.
// Baja el panel para cargar las fotos de reseñas y devuelve las URLs (una por línea). gps-proxy = Street View (se descarta).
const sc = document.querySelector('[role=main] .m6QErb.DxyBCb') || document.querySelector('[role=main]');
for (let k = 0; k < 10; k++) { sc && sc.scrollBy(0, 1500); await new Promise(r => setTimeout(r, 700)); }
const set = new Set();
(document.documentElement.innerHTML.match(/https:\/\/lh[0-9]\.googleusercontent\.com\/(?:p|gps-cs-s|grass-cs)\/[A-Za-z0-9_\-]+/g) || []).forEach(u => set.add(u));
[...set].join('\n')
