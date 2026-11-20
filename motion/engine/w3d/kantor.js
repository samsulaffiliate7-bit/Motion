// Dunia 3D akun Meja Seberang Bos: dunia kerja staf (biru dingin) vs bos (oranye hangat).
// Bahasa visual khas: over-the-shoulder, POV layar HP/laptop, lokasi berpindah (kamar, rumah, mobil, kantor, lift),
// layar terbelah HANYA di shot M_SPLIT (sekali per episode), transisi whip pan (geser cepat + blur).
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, person, tree, setLook } from './kit.js';

let X; const INK = '#1E2A38', BLUE = '#6C8CB0', ORANGE = '#F28C28', CARD = '#F5F7FA';
const staf = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#9CC3E6', pants: '#3B4A5A', hair: '#2A1A10', skin: '#D9A07A', tie: null }, o));
const bos = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#6E7681', pants: '#3A3F46', hair: '#4A4A4A', glasses: true, tie: ORANGE, skin: '#C98E64' }, o));
const chip = (root, html, css = {}, col = INK) => { const e = X.ab(Object.assign({ background: CARD, border: `5px solid ${INK}`, borderRadius: '20px', padding: '12px 24px', fontSize: '40px', fontWeight: 700, color: col, whiteSpace: 'nowrap', boxShadow: `0 8px 0 ${col === INK ? BLUE : col}`, fontFamily: 'Poppins' }, css), root, html); e.style.opacity = 0; return e };
const at = (s, rx, fb) => X.C(s, rx, fb);

// tekstur layar HP (chat) yang bisa digambar ulang
function phoneTex(msgs, n, opts = {}) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 1024; const x = c.getContext('2d'); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  t.draw = k => { x.fillStyle = '#ECE5DD'; x.fillRect(0, 0, 512, 1024); x.fillStyle = '#2E5E8C'; x.fillRect(0, 0, 512, 120); x.fillStyle = '#fff'; x.font = '700 44px Poppins'; x.fillText(opts.title || 'Bos', 40, 80);
    x.font = '600 26px Poppins'; x.fillText(opts.clock || '21.03', 390, 80);
    msgs.slice(0, k).forEach(([who, tx, tm], i) => { const y = 180 + i * 170; x.fillStyle = '#FFFFFF'; x.beginPath(); x.roundRect(30, y, 440, 130, 24); x.fill(); x.fillStyle = '#1E2A38'; x.font = '600 34px Poppins';
      const words = tx.split(' '); let line = '', ly = y + 52; words.forEach(w => { if (x.measureText(line + w).width > 390) { x.fillText(line, 54, ly); line = ''; ly += 42 } line += w + ' ' }); x.fillText(line, 54, ly); x.fillStyle = '#888'; x.font = '500 22px Poppins'; x.fillText(tm, 400, y + 118) });
    t.needsUpdate = true };
  t.draw(n); return t;
}
function phone(parent, p, tex) { const g = group(parent, p); g.add(mesh(G.box(.62, 1.24, .07), '#1B1B1F', [0, 0, 0])); const sc = new THREE.Mesh(G.plane(.56, 1.12), new THREE.MeshBasicMaterial({ map: tex })); sc.position.z = .04; g.add(sc); return g }
function room(sc, o = {}) {   // lantai + dua dinding + jendela
  sc.add(mesh(G.box(14, .2, 14), o.floor || '#8C6E55', [0, -.1, 0]));
  sc.add(mesh(G.box(14, 6, .2), o.wall || '#D8DEE6', [0, 3, -4]));
  sc.add(mesh(G.box(.2, 6, 14), o.wall2 || o.wall || '#CDD5DF', [-5, 3, 0]));
  if (o.window) { sc.add(mesh(G.box(3, 2, .05), o.night ? '#16224A' : '#BFE6FF', [2, 3.2, -3.88], { mat: { emissive: o.night ? '#16224A' : '#BFE6FF', emissiveIntensity: .6 }, cast: false })); sc.add(mesh(G.box(.08, 2, .08), '#EEE', [2, 3.2, -3.83])) }
}
function laptop(parent, p, glow = '#9CC3E6') { const g = group(parent, p); g.add(mesh(G.box(.9, .04, .6), '#B0B7BF', [0, 0, 0])); const s = mesh(G.box(.9, .6, .03), '#2A2F36', [0, .3, -.3], { rot: [-.25, 0, 0] }); g.add(s);
  g.add(mesh(G.box(.82, .52, .01), glow, [0, .3, -.28], { rot: [-.25, 0, 0], mat: { emissive: glow, emissiveIntensity: .9 }, cast: false })); return g }
function desk(parent, p, w = 2.2) { const g = group(parent, p); g.add(mesh(G.box(w, .08, 1.1), '#E7DCCB', [0, .78, 0])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => g.add(mesh(G.box(.06, .78, .06), '#555', [a * (w / 2 - .08), .39, b * .47]))); return g }
function clock3(parent, p) { const g = group(parent, p); g.add(mesh(G.cyl(.55, .55, .08, 32), '#FFFFFF', [0, 0, 0], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.6, .6, .06, 32), INK, [0, 0, -.02], { rot: [Math.PI / 2, 0, 0] }));
  const h = group(g, [0, 0, .06]), m = group(g, [0, 0, .07]); h.add(mesh(G.box(.06, .3, .02), INK, [0, .13, 0], { cast: false })); m.add(mesh(G.box(.04, .45, .02), ORANGE, [0, .2, 0], { cast: false })); g.userData = { h, m }; return g }

export async function setup(ctx) { X = ctx; setLook(ctx.TH.look, ctx.TH.figure); await document.fonts.load('700 44px Poppins') }
const PREM = () => X && X.TH && X.TH.look === 'premium';

// shot per episode ada di motion/episodes/<akun>/<ep>/shots.js; shot lama (s.d. ep010) di kantor_lama.js
export const SHOTS = {};
export { X, INK, BLUE, ORANGE, CARD, staf, bos, chip, at, phoneTex, phone, room, laptop, desk, clock3 };

// tampilan tetap: judul bergaya gelembung chat, transisi whip pan
let title, gl, hud, hudKey = '', P;
const rp = n => 'Rp' + Math.round(n).toLocaleString('id-ID');
export function chrome(ctx) { title = ctx.ab({ left: 36, top: 60, zIndex: 8 }, ctx.ov); gl = document.getElementById('gl'); P = PREM();
  if (P) {   // Season 1: HUD buku kas (kertas bergaris) + label sticky note, vignette tipis
    ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, zIndex: 7, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 64% at 50% 46%, rgba(14,24,40,0) 66%, rgba(14,24,40,.24) 100%)' }, ctx.ov);
    hud = ctx.ab({ left: 36, top: 52, zIndex: 8, fontFamily: 'Poppins,sans-serif' }, ctx.ov); title.style.top = '262px' } }
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const side = /BOS/.test(s.kicker) ? ORANGE : /STAF/.test(s.kicker) ? BLUE : INK;
  const q = seg(t, .1, .45);
  if (P) premFrame(T, idx, t, s);
  if (P) { if (!s.kicker) title.style.opacity = 0; else { const lq = E.out(seg(t, .1, .45)), lo = seg(t, 3, 3.4);
    title.innerHTML = `<div style="display:inline-block;background:#FFE27A;color:${INK};font-family:Poppins;font-weight:800;font-size:40px;padding:12px 26px 14px;transform:rotate(-3deg);box-shadow:0 12px 22px #00000045;border-bottom:6px solid #E8C14A">${s.kicker}${s.sub ? `<div style="font-size:26px;font-weight:700;color:#7A5A10">${s.sub}</div>` : ''}</div>`;
    title.style.opacity = lq * (1 - lo); title.style.transform = `translateY(${(1 - lq) * -24}px)` } } else {
  title.innerHTML = `<div style="display:inline-block;background:${side};color:#fff;font-family:Poppins;font-weight:800;font-size:44px;padding:12px 28px;border-radius:30px 30px 30px 6px;box-shadow:0 8px 0 #00000035">${s.kicker}</div><div style="margin-top:10px;display:inline-block;background:${CARD};color:${INK};font-family:Poppins;font-weight:700;font-size:32px;padding:8px 22px;border-radius:22px;border:4px solid ${side};margin-left:12px">${s.sub}</div>`;
  title.style.opacity = q; title.style.transform = `translateY(${(1 - E.out(q)) * -30}px)`; }
  let w = 0, dir = 1; X.TL.scenes.forEach((x, i) => { if (i) { const d = T - x.start; if (d > -.22 && d < .22) { w = 1 - Math.abs(d) / .22; dir = d < 0 ? -1 : 1 } } });
  gl.style.transform = w ? `translateX(${(dir < 0 ? -1 : 1) * w * 260}px) scale(${1 + w * .55})` : 'none'; gl.style.filter = w > .05 ? `blur(${w * 26}px)` : 'none';
}

// HUD buku kas: data.hud = { top: 'EP 0 · HARI 1', pelanggan: 0, kas: 0 }; angka berubah = dihitung + selisih
function premFrame(T, idx, t, s) {
  const h = hudOf(s), prev = idx ? hudOf(X.TL.scenes[idx - 1]) : h, k = E.inout(seg(t, .35, 1.25));
  const kv = h.kas != null ? lerp(prev.kas != null ? prev.kas : h.kas, h.kas, k) : null, d = h.kas != null && prev.kas != null ? h.kas - prev.kas : 0;
  const key = [idx, kv == null ? '' : Math.round(kv), d && t < 3 ? Math.round(seg(t, .3, .6) * 10) : 0].join('|'); if (key === hudKey) return; hudKey = key;
  const row = (a, b, c = INK) => `<div style="display:flex;justify-content:space-between;gap:18px;border-bottom:2px solid #9DB8D8;padding:5px 0 3px"><span style="color:#5A6B7E">${a}</span><b style="color:${c}">${b}</b></div>`;
  hud.innerHTML = `<div style="width:340px;background:#FBF8EE;border-radius:8px 18px 18px 8px;padding:12px 20px 12px 34px;box-shadow:0 14px 28px #00000050;font-size:25px;font-weight:700;position:relative;border-left:6px solid #D9534F">
    <div style="font-size:19px;letter-spacing:3px;color:${ORANGE};font-weight:800">${h.top || 'BUKU KAS'}</div>
    ${h.pelanggan != null ? row('👥 pelanggan tetap', h.pelanggan) : ''}${kv != null ? row('📒 kas', rp(kv)) : ''}
    ${d && t > .3 && t < 3 ? `<div style="font-size:26px;font-weight:800;color:${d < 0 ? '#D9534F' : '#2E9C6A'};opacity:${seg(t, .3, .6) * (1 - seg(t, 2.5, 3))}">${d < 0 ? '−' : '+'}${rp(Math.abs(d))}</div>` : ''}
    <div style="font-size:17px;color:#5A6B7E;margin-top:6px;line-height:1.35">follow = +1 pelanggan · like = +Rp5.000</div></div>`;
}

// HUD per adegan: data.hud atau kunci data berawalan 'hud' (mis. hud3) dari compute()
const hudOf = s => (s.data && (s.data.hud || (Object.entries(s.data).find(([k]) => k.startsWith('hud')) || [])[1])) || {};
