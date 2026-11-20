// Pembuat cover seragam per akun. Pakai: render frame bersih dulu (node motion/engine/render.js <akun> <ep> --stills <t> --nocap), simpan sebagai <dir>/bg-<akun>-<ep>.jpg, lalu: NODE_PATH=$(npm root -g) node motion/engine/cover.js <dir>. Teks EPISODE/judul diatur di objek A dan baris big/sub.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const D = process.argv[2], FONT = '/home/user/Motion/motion/assets/fonts'; const f64 = w => 'data:font/woff2;base64,' + fs.readFileSync(`${FONT}/poppins-latin-${w}-normal.woff2`).toString('base64');
const A = { kades: ['KADES MAGANG JUARA', '#1F4D33', '#E8B94A', '30 HARI ATAU DIPECAT'], denah: ['DENAH RUMAH DUNIA', '#7A3E1C', '#F2B35B', 'BUMI DI-RESET'],
  dompet: ['DOMPET GUE NANGIS', '#4A2E1A', '#F2C14E', 'RP100 RIBU DI JAKARTA'], meja: ['MEJA SEBERANG BOS', '#1E3A5F', '#F28C28', 'DARI WARUNG LIPAT'],
  balai: ['DESA TERAKHIR', '#5A1E1E', '#E8B94A', 'HARI KE-0 · WABAH ZOMBIE'], hewan: ['KERAJAAN BERDASI', '#3B2463', '#F2C14E', 'NEW GAME · LEVEL 1'] };
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  // mode satu cover: cover.js <dir> <akun> <ep> "EPISODE 1" "SUB" (sub kosong = hook akun)
  const one = process.argv[3] ? [[process.argv[3], process.argv[4], process.argv[5], process.argv[6]]] : null;
  const jobs = one || Object.keys(A).flatMap(a => ['s1e00', 's1aturan'].map(e => [a, e, e === 's1e00' ? 'EPISODE 0' : 'ATURAN MAIN', e === 's1e00' ? '' : 'TONTON INI DULU · SEASON 1']));
  for (const [a, e, big, sub0] of jobs) { const [nm, bg, ac, hook] = A[a]; const sub = sub0 || hook;
    const img = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(D, `bg-${a}-${e}.jpg`)).toString('base64');
    await p.setContent(`<html><head><style>@font-face{font-family:P;font-weight:800;src:url(${f64(800)})}@font-face{font-family:P;font-weight:700;src:url(${f64(700)})}
      body{margin:0;width:1080px;height:1920px;background:url(${img}) center/cover;font-family:P;position:relative;overflow:hidden}
      .g{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 38%,rgba(0,0,0,0) 70%,rgba(0,0,0,.35) 100%)}
      .bn{position:absolute;left:50%;top:300px;transform:translateX(-50%) rotate(-2deg);background:${bg};border:8px solid ${ac};border-radius:30px;padding:26px 54px 34px;text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.55);min-width:760px}
      .n{color:${ac};font-weight:700;font-size:36px;letter-spacing:7px;white-space:nowrap}.t{color:#FFF6E0;font-weight:800;font-size:122px;line-height:1;white-space:nowrap;margin-top:6px;text-shadow:0 8px 0 rgba(0,0,0,.35)}
      .s{display:inline-block;margin-top:16px;background:${ac};color:${bg};font-weight:800;font-size:36px;padding:8px 26px;white-space:nowrap;border-radius:14px}</style></head>
      <body><div class=g></div><div class=bn><div class=n>${nm}</div><div class=t>${big}</div><div class=s>${sub}</div></div></body></html>`, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: path.join(D, `cover-${a}-${e}.jpg`), type: 'jpeg', quality: 90 }) }
  await b.close() })();
