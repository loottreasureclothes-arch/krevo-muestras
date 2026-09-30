// Rehace img/og.jpg (1200x630) desde _build/og.html con Chrome headless propio (CDP). Uso: node _build/og-shot.mjs
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'; import { spawn, execFileSync } from 'node:child_process';
const DIR = path.dirname(new URL(import.meta.url).pathname);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 20000 + Math.floor(Math.random() * 20000);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
const ch = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1200,630', '--hide-scrollbars', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const bye = () => { try { ch.kill('SIGKILL'); } catch {} try { fs.rmSync(profile, { recursive: true, force: true }); } catch {} };
process.on('exit', bye);
let ok = false; for (let i = 0; i < 60 && !ok; i++) { try { await fetch(`http://localhost:${port}/json/version`); ok = true; } catch { await sleep(250); } }
const t = await (await fetch(`http://localhost:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'file://' + path.join(DIR, 'og.html') });
await sleep(2500);
const f = await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => [...document.fonts].filter(f => f.status === "loaded").map(f => f.family + " " + f.weight).join(", "))', awaitPromise: true, returnByValue: true });
console.log('fuentes:', f.result.result.value);
const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
const png = path.join(profile, 'og.png'); fs.writeFileSync(png, Buffer.from(r.result.data, 'base64'));
execFileSync('python3', ['-c', `from PIL import Image; Image.open('${png}').convert('RGB').save('${path.join(DIR, '..', 'img', 'og.jpg')}', quality=86, optimize=True, progressive=True)`]);
console.log('og listo'); process.exit(0);
