// encimes: detecta textos encimados y textos cortados en una página, a 390, 820 y 1440 px.
// Uso: node encimes.mjs <url> [salida.json]   → imprime un resumen corto; el detalle va al json.
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { spawn } from 'node:child_process';
const [url, out] = process.argv.slice(2);
if (!url) { console.error('uso: node encimes.mjs <url> [salida.json]'); process.exit(2); }
const CHROME = process.env.CHROME || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
const port = 20000 + Math.floor(Math.random() * 20000);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'encimes-'));
const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--hide-scrollbars', '--mute-audio', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const bye = () => { try { chrome.kill('SIGKILL'); } catch { } try { fs.rmSync(profile, { recursive: true, force: true }); } catch { } };
process.on('exit', bye);
let ok = false; for (let i = 0; i < 60 && !ok; i++) { try { await fetch(`http://localhost:${port}/json/version`); ok = true; } catch { await sleep(250); } }
const t = await (await fetch(`http://localhost:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); return r.result?.result?.value; };
await send('Page.enable'); await send('Runtime.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
const DETECT = `(() => {
  const vis = el => { for (let e = el, op = 1; e && e.nodeType === 1; e = e.parentElement) { const c = getComputedStyle(e); if (c.display === 'none' || c.visibility === 'hidden') return false; op *= parseFloat(c.opacity); if (op < 0.35) return false; if (e.getAttribute('aria-hidden') === 'true') return false; if (c.position === 'fixed') return false; } return true; };
  const clipped = (b, el) => { for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { const c = getComputedStyle(e); if (/hidden|clip|auto|scroll/.test(c.overflow + c.overflowX + c.overflowY)) { const r = e.getBoundingClientRect(); if (b.right <= r.left + 1 || b.left >= r.right - 1 || b.bottom <= r.top + 1 || b.top >= r.bottom - 1) return true; } } return false; };
  const sel = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\\s+/).slice(0, 2).join('.') : '');
  const boxes = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode());) { const tx = n.textContent.trim(); if (tx.length < 2) continue; const el = n.parentElement; if (!el || !vis(el)) continue; const col = getComputedStyle(el).color; const a = col.match(/rgba?\\(([^)]+)\\)/); if (a && a[1].split(',')[3] !== undefined && parseFloat(a[1].split(',')[3]) < 0.35) continue;
    const r = document.createRange(); r.selectNodeContents(n); for (const b of r.getClientRects()) { if (b.width < 3 || b.height < 3 || clipped(b, el)) continue; boxes.push({ x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height, el, tx: tx.slice(0, 40) }); } }
  boxes.sort((a, b) => a.y - b.y); const hits = [];
  for (let i = 0; i < boxes.length; i++) { const A = boxes[i]; for (let j = i + 1; j < boxes.length; j++) { const B = boxes[j]; if (B.y > A.y + A.h) break; if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
      const ix = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x), iy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y); if (ix <= 2 || iy <= 2) continue;
      const area = ix * iy, small = Math.min(A.w * A.h, B.w * B.h); if (area < 40 || area / small < 0.25) continue;
      hits.push({ y: Math.round(A.y), a: sel(A.el) + ' «' + A.tx + '»', b: sel(B.el) + ' «' + B.tx + '»' }); if (hits.length > 25) return { hits, cortes: [] }; } }
  const cortes = [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,li,b,strong,small,label')].filter(e => vis(e) && e.innerText && e.innerText.trim().length > 1 && e.scrollWidth > e.clientWidth + 3 && /hidden|clip/.test(getComputedStyle(e).overflowX + getComputedStyle(e).overflow)).slice(0, 12).map(e => sel(e) + ' «' + e.innerText.trim().slice(0, 40) + '»');
  const fuera = [...document.querySelectorAll('h1,h2,h3,p,a,button,li')].filter(e => { if (!vis(e) || /skip|sr-only|visually/.test(e.className)) return false; const b = e.getBoundingClientRect(); if (clipped(b, e)) return false; return b.width > 0 && (b.right > innerWidth + 2 || b.left < -2); }).slice(0, 10).map(e => sel(e) + ' «' + (e.innerText || '').trim().slice(0, 40) + '»');
  return { hits, cortes, fuera, alto: document.documentElement.scrollHeight };
})()`;
const res = {};
for (const [name, w, h, mob] of [['m', 390, 844, true], ['t', 820, 1180, true], ['d', 1440, 900, false]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: mob });
  await send('Page.navigate', { url }); await sleep(3500);
  const alto = await ev('document.documentElement.scrollHeight') || h;
  for (let y = 0; y < alto; y += Math.round(h * 0.8)) { await ev(`window.scrollTo(0, ${y}); window.dispatchEvent(new Event('scroll'))`); await sleep(500); }
  await sleep(1800); await ev('window.scrollTo(0, 0)'); await sleep(600);
  res[name] = await ev(DETECT);
}
if (out) fs.writeFileSync(out, JSON.stringify(res, null, 2));
for (const k of ['m', 't', 'd']) { const r = res[k] || {}; console.log(`${k}: alto ${r.alto} | encimes ${(r.hits || []).length} | cortados ${(r.cortes || []).length} | fuera ${(r.fuera || []).length}`); (r.hits || []).slice(0, 6).forEach(x => console.log('   ENCIME y=' + x.y + ' ' + x.a + '  ×  ' + x.b)); (r.cortes || []).slice(0, 3).forEach(x => console.log('   CORTADO ' + x)); (r.fuera || []).slice(0, 3).forEach(x => console.log('   FUERA ' + x)); }
bye(); process.exit(0);
