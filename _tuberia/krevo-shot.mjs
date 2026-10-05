// krevo-shot: captura una página como la vería un cliente y reporta problemas.
// Uso: node krevo-shot.mjs <url> <carpeta-salida> <m|d|xl>
//   m  = 390x844 celular (dpr 2, touch)    d = 1440x900 compu    xl = 1920x1080
// Deja en <carpeta-salida>: <preset>-NN.png (viewport cada ~85% de alto, ya con las animaciones
// disparadas), <preset>-vuelta-arriba.png (tras bajar y subir), <preset>-report.json y un resumen en stdout.
// Lanza su propio Chrome headless en un puerto libre y lo mata al terminar. No toca pestañas ajenas.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const [url, outArg, preset = 'm'] = process.argv.slice(2);
if (!url || !outArg) { console.error('uso: node krevo-shot.mjs <url> <carpeta> <m|d|xl>'); process.exit(2); }
const OUT = path.resolve(outArg); fs.mkdirSync(OUT, { recursive: true });
const P = { m: { w: 390, h: 844, dpr: 2, mobile: true }, d: { w: 1440, h: 900, dpr: 1, mobile: false }, xl: { w: 1920, h: 1080, dpr: 1, mobile: false } }[preset];
if (!P) { console.error('preset debe ser m, d o xl'); process.exit(2); }

const CHROME = process.env.CHROME || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
const port = 20000 + Math.floor(Math.random() * 20000);
const profile = path.join(OUT, `.profile-${preset}`);
const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  `--window-size=${P.w},${P.h}`, '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--mute-audio', 'about:blank'],
  { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const bye = () => { try { chrome.kill('SIGKILL'); } catch { } try { fs.rmSync(profile, { recursive: true, force: true }); } catch { } };
process.on('exit', bye); process.on('SIGINT', () => { bye(); process.exit(1); });

let ok = false;
for (let i = 0; i < 60 && !ok; i++) { try { await fetch(`http://localhost:${port}/json/version`); ok = true; } catch { await sleep(250); } }
if (!ok) { console.error('Chrome no arrancó'); process.exit(1); }
const t = await (await fetch(`http://localhost:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
const consola = [], red = [], fallas = [];
ws.onmessage = m => {
  const d = JSON.parse(m.data);
  if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); return; }
  if (d.method === 'Runtime.exceptionThrown') consola.push('EXC ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text).slice(0, 300));
  if (d.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(d.params.type)) consola.push(d.params.type + ' ' + d.params.args.map(a => a.value ?? a.description ?? '').join(' ').slice(0, 300));
  if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') consola.push('LOG ' + d.params.entry.text.slice(0, 300));
  if (d.method === 'Network.responseReceived' && d.params.response.status >= 400) red.push(`${d.params.response.status} ${d.params.response.url}`);
  if (d.method === 'Network.loadingFailed' && !d.params.canceled) fallas.push(`${d.params.errorText} ${d.params.requestId}`);
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); return r.result?.exceptionDetails ? { EXC: r.result.exceptionDetails.text } : r.result?.result?.value; };
const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'png' }); const f = path.join(OUT, `${preset}-${name}.png`); fs.writeFileSync(f, Buffer.from(r.result.data, 'base64')); return f; };

await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Log.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: P.w, height: P.h, deviceScaleFactor: P.dpr, mobile: P.mobile });
if (P.mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
await send('Page.navigate', { url });
await sleep(4500);

const base = await ev(`(() => { const q = s => document.querySelector(s); return {
  title: document.title, description: q('meta[name=description]')?.content || '', og: q('meta[property="og:image"]')?.content || '',
  favicon: !!q('link[rel*="icon"]'), innerWidth: innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth,
  alto: document.documentElement.scrollHeight, fuentes: [...new Set([...document.querySelectorAll('h1,h2,p,a,button')].map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g,'')))].slice(0,6),
  anchos: [...document.querySelectorAll('body *')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.right > innerWidth + 2 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 10).map(e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\\s+/).slice(0,2).join('.') : '')),
  wa: [...document.querySelectorAll('a[href*="wa.me"],a[href*="whatsapp"]')].length, tel: [...document.querySelectorAll('a[href^="tel:"]')].length,
  botonesChicos: [...document.querySelectorAll('a,button')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && (b.height < 40 || b.width < 40) && getComputedStyle(e).display !== 'inline'; }).length,
  guionLargo: (document.body.innerText.match(/—/g) || []).length, emojis: (document.body.innerText.match(/[\\u{1F300}-\\u{1FAFF}]/gu) || []).length,
  parrafosLargos: [...document.querySelectorAll('p')].filter(p => p.innerText.trim().length > 260).length,
}; })()`);

const pasos = []; const step = Math.round(P.h * 0.85); let n = 0;
for (let y = 0; y < (base.alto || P.h) && n < 40; y += step, n++) {
  await ev(`window.scrollTo(0, ${y}); window.dispatchEvent(new Event('scroll'))`);
  await sleep(1900); // más que el temporizador de blindaje (1.6 s)
  const info = await ev(`(() => { const vis = [...document.querySelectorAll('section, header, footer, [class*="hero"], [class*="cine"]')].filter(s => { const b = s.getBoundingClientRect(); return b.bottom > 0 && b.top < innerHeight && b.height > 40; });
    const esc = e => { const b = e.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight || b.width * b.height < 12000) return false; const c = getComputedStyle(e); if (c.display === 'none' || c.visibility !== 'visible' || parseFloat(c.opacity) >= 0.05) return false; if (e.closest('[aria-hidden="true"],[hidden],dialog,[role="dialog"],[class*="menu"],[class*="modal"],[class*="sheet"],[class*="dlg"]')) return false; return true; };
    const ocultos = [...document.querySelectorAll('body *')].filter(e => esc(e) && !(e.parentElement && esc(e.parentElement))).slice(0, 8).map(e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\\s+/).slice(0,2).join('.') : ''));
    return { y: scrollY, secciones: vis.map(s => s.id || s.className.toString().slice(0, 30)), ocultosGrandes: ocultos }; })()`);
  const f = await shot(String(n).padStart(2, '0'));
  pasos.push({ ...info, captura: f });
}
await ev(`window.scrollTo(0, 0); window.dispatchEvent(new Event('scroll'))`); await sleep(1900);
const vuelta = await shot('vuelta-arriba');
const ocultosAlVolver = await ev(`(() => { const esc = e => { const b = e.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight || b.width * b.height < 12000) return false; const c = getComputedStyle(e); if (c.display === 'none' || c.visibility !== 'visible' || parseFloat(c.opacity) >= 0.05) return false; if (e.closest('[aria-hidden="true"],[hidden],dialog,[role="dialog"],[class*="menu"],[class*="modal"],[class*="sheet"],[class*="dlg"]')) return false; return true; }; return [...document.querySelectorAll('body *')].filter(e => esc(e) && !(e.parentElement && esc(e.parentElement))).length; })()`);

const report = { url, preset, ...base, scrollHorizontal: base.scrollWidth > base.innerWidth + 1 || base.bodyScrollWidth > base.innerWidth + 1, consola: [...new Set(consola)].slice(0, 30), http4xx5xx: [...new Set(red)].slice(0, 40), cargasFallidas: fallas.length, pasos, vueltaArriba: { captura: vuelta, ocultosGrandes: ocultosAlVolver } };
fs.writeFileSync(path.join(OUT, `${preset}-report.json`), JSON.stringify(report, null, 2));
const alertas = [];
if (report.scrollHorizontal) alertas.push(`SCROLL HORIZONTAL (scrollWidth ${base.scrollWidth}/${base.bodyScrollWidth} vs ${base.innerWidth}); se salen: ${base.anchos.join(', ')}`);
if (report.consola.length) alertas.push(`CONSOLA: ${report.consola.length} errores/avisos`);
if (report.http4xx5xx.length) alertas.push(`RECURSOS ROTOS: ${report.http4xx5xx.join(' | ')}`);
const ocult = pasos.filter(p => p.ocultosGrandes.length); if (ocult.length) alertas.push(`INVISIBLES tras 1.9 s en ${ocult.length} pantallas: ${ocult.map(p => p.y + 'px:' + p.ocultosGrandes.join(',')).join(' ; ')}`);
if (ocultosAlVolver) alertas.push(`AL VOLVER ARRIBA quedan ${ocultosAlVolver} bloques invisibles`);
if (!base.favicon) alertas.push('SIN FAVICON'); if (!base.og) alertas.push('SIN og:image'); if (!base.description) alertas.push('SIN meta description');
if (base.guionLargo) alertas.push(`${base.guionLargo} guiones largos (—)`); if (base.emojis) alertas.push(`${base.emojis} emojis en texto`);
if (base.fuentes.some(f => /inter$/i.test(f))) alertas.push('USA INTER'); if (base.parrafosLargos) alertas.push(`${base.parrafosLargos} párrafos de más de 260 caracteres`);
if (base.botonesChicos) alertas.push(`${base.botonesChicos} botones/links menores a 40px`);
console.log(JSON.stringify({ preset, capturas: pasos.length + 1, carpeta: OUT, alto: base.alto, fuentes: base.fuentes, wa: base.wa, alertas }, null, 2));
ws.close(); bye(); process.exit(0);
