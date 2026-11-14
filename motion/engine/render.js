#!/usr/bin/env node
// Pakai: node engine/render.js <akun> <ep> [--stills 1,5,12] [--workers 4]
// Render 3D frame per frame lewat Chromium (SwiftShader), lalu gabung dengan narasi pakai ffmpeg.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');

const [acc, ep, ...rest] = process.argv.slice(2);
const opt = (n, d) => { const i = rest.indexOf('--' + n); return i >= 0 ? rest[i + 1] : d };
const dir = path.join(__dirname, '..', 'out', `${acc}-${ep}`);
const TL = JSON.parse(fs.readFileSync(path.join(dir, 'timeline.json'), 'utf8'));
let player;
// modul ES butuh http, jadi folder motion/ disajikan lewat server lokal
function serve() {
  const http = require('http'), root = path.join(__dirname, '..');
  const MT = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg' };
  const srv = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0]));
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end() }
    r.writeHead(200, { 'Content-Type': MT[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r) });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

async function worker(browser, times, outFn, q) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exitCode = 1 });
  await page.goto(player);
  await page.waitForFunction(() => typeof window.init === 'function');
  await page.evaluate(tl => init(tl), TL);
  for (const [i, t] of times) {
    await page.evaluate(t => renderAt(t), t);
    await page.screenshot({ path: outFn(i), type: 'jpeg', quality: q });
  }
  await page.close();
}

(async () => {
  const srv = await serve(); player = `http://127.0.0.1:${srv.address().port}/engine/player3d.html`;
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const stills = opt('stills');
  if (stills) {
    fs.mkdirSync(path.join(dir, 'stills'), { recursive: true });
    const ts = stills.split(',').map(Number);
    await worker(browser, ts.map((t, i) => [i, t]), i => path.join(dir, 'stills', `still_${String(ts[i]).replace('.', '_')}.jpg`), 85);
    await browser.close(); srv.close(); return;
  }
  if (TL.draft && !rest.includes('--allow-draft')) { console.error('timeline DRAF (tanpa TTS): hanya untuk --stills. Bangun ulang tanpa --draft dulu.'); process.exit(2) }
  const fps = TL.fps, n = Math.ceil(TL.duration * fps), W = +opt('workers', 4);
  const fdir = path.join(dir, 'frames'); fs.rmSync(fdir, { recursive: true, force: true }); fs.mkdirSync(fdir, { recursive: true });
  const jobs = Array.from({ length: W }, () => []);
  for (let i = 0; i < n; i++) jobs[i % W].push([i, i / fps]);
  const t0 = Date.now();
  await Promise.all(jobs.map(j => worker(browser, j, i => path.join(fdir, `f_${String(i).padStart(5, '0')}.jpg`), 92)));
  await browser.close(); srv.close();
  console.log(`frames: ${n} dalam ${((Date.now() - t0) / 1000).toFixed(0)} dtk`);
  const out = path.join(dir, `${acc}-${ep}.mp4`);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-framerate', String(fps), '-i', path.join(fdir, 'f_%05d.jpg'), '-i', path.join(dir, 'narration.wav'),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-shortest', out], { stdio: 'inherit' });
  fs.rmSync(fdir, { recursive: true, force: true });
  console.log('selesai:', out);
})();
