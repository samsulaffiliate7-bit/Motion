// Dunia 3D akun Denah Rumah Dunia, serial "Bumi Kita".
// Bahasa visual khas (beda dari akun lain): globe, terbang antar negara, rumah tumbuh, HUD bumi, transisi pesawat kertas.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, tree, cloud, coin, house, person, rain, loadWorld, globe, ll2v } from './kit.js';

let X, TH;
const NAVY = '#13324F', GOLD = '#FFC93C', TERRA = '#D9772B', CREAM = '#FFFBF2';
const juragan = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#8E2F3A', pants: '#2B2B2B', hat: 'bowler', hatC: '#1E1E1E', glasses: true, tie: GOLD, prop: 'suitcase', skin: '#E2A97E' }, o));
const kepala = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#2E7D5B', pants: '#3B4A5A', hat: 'cap', hatC: GOLD, prop: 'clipboard', skin: '#C98E64' }, o));

// kartu DOM bergaya akun
const chip = (root, html, css = {}, col = NAVY) => { const e = X.ab(Object.assign({ background: CREAM, border: `6px solid ${NAVY}`, borderRadius: '26px', padding: '12px 26px', fontSize: '42px', fontWeight: 700, color: col, whiteSpace: 'nowrap', boxShadow: `0 8px 0 ${col === NAVY ? TERRA : col}`, fontFamily: 'Fredoka' }, css), root, html); e.style.opacity = 0; return e };
// label yang menempel ke benda 3D
function tag3(root, html, col = NAVY) { const w = X.ab({ left: 0, top: 0 }, root); const e = chip(w, html, { position: 'relative', transform: 'translate(-50%,-100%)' }, col); e.style.transformOrigin = '50% 100%';
  return { w, e, at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = x + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } }
const popAt = (s, cueRx, fb) => X.C(s, cueRx, fb), at3 = popAt;

function stars(sc, n = 400) { const g = new THREE.BufferGeometry(), a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const u = (i * 0.618) % 1, v = (i * 0.414) % 1, th = u * Math.PI * 2, ph = Math.acos(2 * v - 1), r = 120; a[i * 3] = r * Math.sin(ph) * Math.cos(th); a[i * 3 + 1] = r * Math.cos(ph); a[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) }
  g.setAttribute('position', new THREE.BufferAttribute(a, 3)); sc.add(new THREE.Points(g, new THREE.PointsMaterial({ color: '#FFFFFF', size: 2.2, sizeAttenuation: false }))) }

function plot(sc, o = {}) {   // kavling kosong di pinggir kota
  const I = island(sc, o.w || 12, o.d || 12, o.grass || '#8CC152', '#8D6E4A');
  sc.add(mesh(G.box(4.2, .05, 4.2), '#D9C9A3', [0, .02, 0]));   // kavling
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => sc.add(mesh(G.cyl(.06, .06, .5, 6), '#B5452B', [x * 2.1, .25, z * 2.1])));
  [[-4.6, -4.4, 1.1], [4.5, -4.2, .9], [-4.7, 3.8, 1], [4.4, 4.2, 1.2]].forEach(([x, z, s], i) => tree(sc, [x, 0, z], s, i % 2 ? '#3F8A3A' : '#4E9A3E', i % 3 ? 'round' : 'palm'));
  if (o.city) for (let i = 0; i < 15; i++) { const h = 3 + ((i * 37) % 6); sc.add(mesh(G.box(2.4, h, 2.4), ['#C7D6E4', '#D5E1EC', '#BACBDB'][i % 3], [-28 + i * 4, h / 2 - .2, -34 - (i % 2) * 3], { cast: false })) }
  return I;
}


// ===== perkakas kota (tata ruang skala kota) =====
const ZC = { hunian: '#F5C542', usaha: '#E5484D', industri: '#8E6CC0', hijau: '#4CAF50', pesisir: '#5FA8D8' };
// blok 7x7 di grid 3x3 (pusat -8, 0, 8); utara = -z (laut di belakang)
const BLOCKS = { hunian: [[-8, 8], [-8, 0]], usaha: [[0, 0], [0, 8]], industri: [[8, 0], [8, -8]], hijau: [[8, 8], [-8, -8]], pesisir: [[0, -8]] };
function cityBoard(sc, o = {}) {
  const g = group(sc);
  g.add(mesh(G.box(26, .6, 26), '#9CCB6A', [0, -.3, 0])); g.add(mesh(G.box(26.4, 2, 26.4), '#8D6E4A', [0, -1.6, 0]));
  const sea = mesh(G.box(40, .3, 12), '#3E8FC4', [0, -.35, -19], { mat: { roughness: .2 } }); g.add(sea); g.add(mesh(G.box(26, .25, 1.2), '#E8D9A8', [0, -.05, -12.6]));
  for (const k of [-4, 4]) { g.add(mesh(G.box(1.2, .06, 26), '#8A8F96', [k, .03, 0])); g.add(mesh(G.box(26, .06, 1.2), '#8A8F96', [0, .03, k])) }
  for (const k of [-4, 4]) for (let i = -12; i < 12; i += 1.6) { g.add(mesh(G.box(.08, .07, .6), '#F2F2F2', [k, .05, i], { cast: false })); g.add(mesh(G.box(.6, .07, .08), '#F2F2F2', [i, .05, k], { cast: false })) }
  const zones = {}; for (const [z, list] of Object.entries(BLOCKS)) zones[z] = list.map(([x, y]) => { const m = mesh(G.box(6.6, .08, 6.6), ZC[z], [x, .05, y], { mat: { transparent: true, opacity: .55 }, cast: false }); m.visible = false; g.add(m); return m });
  [[-12.5, 12.5], [12.5, 12.5], [-12.5, -11.5], [12.5, -11.5], [-12.5, 0], [12.5, 0]].forEach(([x, z], i) => tree(g, [x, 0, z], 1, '#3F8A3A', 'palm'));
  g.userData = { zones, sea }; return g;
}
const CC = ['#F3E1C4', '#E9C9A8', '#DCE7D2', '#F2D7D0', '#FFF3D6'], RC = ['#C9472F', '#B5452B', '#9C5B33', '#2E7D5B'];
function housing(parent, cx, cz, n = 3) { const out = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const h = house(parent, [cx - 2 + i * 2, 0, cz - 2 + j * 2], { w: 1.3, d: 1.2, h: .9, roofH: .6, wall: CC[(i + j) % 5], roofC: RC[(i * 2 + j) % 4] }); out.push(h) } return out }
function park(parent, cx, cz) { const g = group(parent, [cx, 0, cz]); g.add(mesh(G.cyl(1.2, 1.2, .08, 20), '#5FA8D8', [0, .08, 0])); [[-2, -2], [2, -2], [-2, 2], [2, 2], [0, -2.5], [-2.5, 0]].forEach(([x, z], i) => tree(g, [x, 0, z], .8, i % 2 ? '#3F8A3A' : '#4E9A3E')); return g }
function shop(parent, p, o = {}) { const g = group(parent, p); const w = o.w || 2, d = o.d || 1.6, h = o.h || 1.2;
  g.add(mesh(G.box(w, h, d), o.wall || '#FFFFFF', [0, h / 2, 0])); g.add(mesh(G.box(w * .9, h * .45, .05), '#9ED8F5', [0, h * .35, d / 2 + .01]));
  g.add(mesh(G.box(w + .1, .3, .2), o.sign || '#E5484D', [0, h + .15, d / 2 - .05])); if (o.awn) g.add(mesh(G.box(w + .2, .08, .6), o.awn, [0, h * .72, d / 2 + .3], { rot: [.3, 0, 0] })); return g }
function tower(parent, p, h, col = '#B7C9DB') { const g = group(parent, p); g.add(mesh(G.box(1.6, h, 1.6), col, [0, h / 2, 0])); for (let y = .6; y < h - .3; y += .7) g.add(mesh(G.box(1.62, .2, 1.62), '#7FB3D9', [0, y, 0], { cast: false })); return g }
function factory(parent, p) { const g = group(parent, p); g.add(mesh(G.box(3.2, 1.4, 2.2), '#B0B7BF', [0, .7, 0])); g.add(mesh(G.box(3.3, .25, 2.3), '#7D8A94', [0, 1.5, 0]));
  const ch = mesh(G.cyl(.25, .3, 2.6, 10), '#8E6CC0', [1.1, 1.3, -.6]); g.add(ch); const puffs = [0, 1, 2].map(i => { const m = mesh(G.ico(.35, 1), '#E0E0E0', [1.1, 2.8, -.6], { cast: false }); g.add(m); return m });
  g.userData.puffs = puffs; return g }
function cars(parent, n = 8) { const list = Array.from({ length: n }, (_, i) => { const bus = i % 4 === 0; const m = mesh(G.box(bus ? .5 : .4, .35, bus ? 1.3 : .7), bus ? '#2E7D5B' : ['#E5484D', '#3E8FC4', '#F5C542', '#FFFFFF'][i % 4], [0, .2, 0]); parent.add(m); return m });
  return t => list.forEach((m, i) => { const lane = i % 4, k = ((t * .08 + i * .137) % 1) * 26 - 13, off = (i % 2 ? .3 : -.3); if (lane < 2) { m.position.set([-4, 4][lane] + off, .2, k * (i % 2 ? 1 : -1)); m.rotation.y = 0 } else { m.position.set(k * (i % 2 ? 1 : -1), .2, [-4, 4][lane - 2] + off); m.rotation.y = Math.PI / 2 } }) }
const grow = (objs, t, t0, gap = .08) => objs.forEach((o, i) => { const q = E.back(seg(t, t0 + i * gap, t0 + i * gap + .4)); o.scale.setScalar(Math.max(.001, q)); o.visible = q > .001 });


// ===== LORE BUMI: rumah dunia (tebak negara) =====
function txtSprite(text, bg, fg = '#fff', size = 1) {
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  x.fillStyle = bg; x.strokeStyle = NAVY; x.lineWidth = 16; x.beginPath(); x.arc(128, 128, 112, 0, Math.PI * 2); x.fill(); x.stroke();
  x.fillStyle = fg; x.font = '700 150px Fredoka'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 128, 140);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true })); sp.scale.set(size, size, 1); return sp;
}
function countdown(root) {   // angka 3-2-1 besar, lalu tanda tanya
  const e = X.ab({ left: 0, top: 560, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '260px', color: GOLD, WebkitTextStroke: `16px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0, zIndex: 3 }, root, '3');
  return (t, t0) => { const k = Math.floor((t - t0) / .62); if (t < t0 || k > 3) { e.style.opacity = 0; return } e.innerHTML = ['3', '2', '1', '?'][k]; const q = ((t - t0) % .62) / .62; e.style.opacity = 1; e.style.transform = `scale(${E.back(Math.min(1, q * 3)) * (1 - q * .15)})` };
}
function grVillage(parent) {   // tebing + kubus putih + kubah biru
  const g = group(parent); const rock = ['#8C6A54', '#7A5A47', '#9A7A62'];
  for (let i = 0; i < 4; i++) g.add(mesh(G.box(14, 1.6, 3.2), rock[i % 3], [0, i * 1.6 - .8, -i * 2.6]));
  const W = '#FAFAF7', homes = [];
  [[-4.5, 0, 0, 1.4], [-2.6, 0, .3, 1.1], [-.6, 0, -.1, 1.3], [1.6, 0, .2, 1.2], [3.8, 0, 0, 1.5], [-3.6, 1, 0, 1.2], [-1.4, 1, .2, 1.4], [1, 1, 0, 1.1], [3.2, 1, .2, 1.3], [-2.4, 2, 0, 1.3], [.2, 2, .1, 1.2], [2.6, 2, 0, 1.4], [-.8, 3, 0, 1.3], [1.8, 3, .1, 1.1]]
    .forEach(([x, row, dz, h], i) => { const y = row * 1.6, z = -row * 2.6 + .6 + dz; const b = group(g, [x, y, z]); b.add(mesh(G.box(1.7, h, 1.5), W, [0, h / 2, 0])); b.add(mesh(G.box(1.8, .12, 1.6), '#ECECE6', [0, h + .06, 0]));
      b.add(mesh(G.box(.36, .6, .04), '#2F6FB5', [(i % 2 ? .4 : -.4), .3, .76])); b.add(mesh(G.box(.3, .3, .04), '#2F6FB5', [(i % 2 ? -.4 : .4), h * .65, .76])); homes.push(b) });
  const domes = [[-.6, 1], [3.2, 1], [-.8, 3]].map(([x, row]) => { const z = -row * 2.6 + .4, y = row * 1.6 + 1.3; const d = group(g, [x, y, z]); d.add(mesh(G.cyl(.55, .55, .5, 16), W, [0, .25, 0])); d.add(mesh(new THREE.SphereGeometry(.58, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), '#2F6FB5', [0, .5, 0])); d.add(mesh(G.box(.05, .4, .05), '#FAFAF7', [0, 1.25, 0])); return d });
  const sea = mesh(G.box(60, .2, 30), '#2C7FB8', [0, -1.7, 12], { mat: { roughness: .25 } }); g.add(sea);
  g.userData = { homes, domes }; return g;
}
function swHouse(parent, p = [0, 0, 0]) {   // rumah kayu merah, sudut putih
  const g = group(parent, p); const h = house(g, [0, 0, 0], { w: 3.2, d: 2.6, h: 2, roofH: 1.3, wall: '#8E1F1B', roofC: '#3B3B3B' });
  [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([x, z]) => g.add(mesh(G.box(.14, 2, .14), '#FFFFFF', [x * 1.6, 1.07, z * 1.3])));
  [-.75, .75].forEach(x => g.add(mesh(G.box(.66, .6, .03), '#FFFFFF', [x, 1.05, 1.31], { cast: false })));
  g.add(mesh(G.box(.3, .8, .3), '#8E1F1B', [.8, 3.1, -.3])); return g;
}
function isHouse(parent, p = [0, 0, 0]) {   // rumah rumput: deretan atap pelana berumput, muka kayu putih
  const g = group(parent, p);
  const prism = (w, h, d) => { const sh = new THREE.Shape(); sh.moveTo(-w / 2, 0); sh.lineTo(w / 2, 0); sh.lineTo(0, h); sh.lineTo(-w / 2, 0); const geo = new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false }); geo.translate(0, 0, -d / 2); return geo };
  const front = (w, wh, rh) => { const sh = new THREE.Shape(); sh.moveTo(-w / 2, 0); sh.lineTo(w / 2, 0); sh.lineTo(w / 2, wh); sh.lineTo(0, wh + rh); sh.lineTo(-w / 2, wh); sh.lineTo(-w / 2, 0); return new THREE.ExtrudeGeometry(sh, { depth: .12, bevelEnabled: false }) };
  [-1.75, 0, 1.75].forEach((x, i) => { const u = group(g, [x, 0, 0]); const H = .9 + (i === 1 ? .25 : 0);
    u.add(mesh(G.box(1.7, H, 3.2), '#7C6A55', [0, H / 2, -.2])); u.add(mesh(prism(2.1, 1.25, 3.4), '#6E9B3E', [0, H, -.2]));
    u.add(mesh(front(1.4, H, 1), '#F4F1EA', [0, 0, 1.4])); u.add(mesh(G.box(.42, .75, .05), '#3A2A1E', [0, .38, 1.55])); u.add(mesh(G.box(.32, .26, .05), '#9ED8F5', [0, H + .3, 1.55])) });
  return g;
}

const BRICK = ['#7A3B2E', '#5C3A2E', '#8E4B3A', '#4A4A52', '#C9B79C', '#6B2E2E'];
function canalHouse(parent, p, i = 0, o = {}) {   // rumah kanal: sempit, tinggi, dalam; puncak bertangga; balok katrol
  const w = o.w || (.95 + (i % 3) * .15), h = o.h || (3.2 + (i % 4) * .35), d = 3.2, col = BRICK[i % BRICK.length];
  const g = group(parent, p); const body = group(g); body.add(mesh(G.box(w, h, d), col, [0, h / 2, 0]));
  for (let k = 0; k < 3; k++) body.add(mesh(G.box(w * (.8 - k * .25), .32, .2), col, [0, h + .16 + k * .32, d / 2 - .1]));
  body.add(mesh(G.box(w * .3, .1, .9), '#FFFFFF', [0, h + .2, d / 2 + .35]));   // balok katrol
  body.add(mesh(G.cyl(.03, .03, .3, 6), '#333', [0, h + .02, d / 2 + .75]));
  for (let r = 0; r < Math.floor(h / .85); r++) [-1, 1].forEach(sx => { body.add(mesh(G.box(w * .32, .5, .04), '#FFFFFF', [sx * w * .22, .6 + r * .85, d / 2 + .01], { cast: false })); body.add(mesh(G.box(w * .26, .42, .05), '#3F5F7A', [sx * w * .22, .6 + r * .85, d / 2 + .02], { cast: false })) });
  g.userData = { w, h, d, body }; return g;
}
function canalRow(parent, n = 8, z = 0, x0 = -6) { const list = []; let x = x0; for (let i = 0; i < n; i++) { const hh = canalHouse(parent, [0, 0, z], i); x += hh.userData.w / 2; hh.position.x = x; x += hh.userData.w / 2 + .02; list.push(hh) } return list }
function engHouse(parent, p) {   // rumah bata Inggris, 3x3 jendela
  const g = group(parent, p); g.add(mesh(G.box(5, 3.6, 2.6), '#A0523A', [0, 1.8, 0])); const roof = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#4A4A52')); roof.scale.set(4.2, 1.4, 2.4); roof.rotation.y = Math.PI / 4; roof.position.y = 4.3; roof.castShadow = true; g.add(roof);
  [-1.6, 1.6].forEach(x => g.add(mesh(G.box(.4, 1, .4), '#8E4B3A', [x, 4.6, 0])));
  const wins = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { if (r === 0 && c === 1) continue; const wm = mesh(G.box(.7, .8, .05), '#9ED8F5', [-1.6 + c * 1.6, .7 + r * 1.15, 1.31], { cast: false }); g.add(wm); g.add(mesh(G.box(.85, .1, .08), '#FFFFFF', [-1.6 + c * 1.6, .25 + r * 1.15, 1.32], { cast: false })); wins.push(wm) }
  g.add(mesh(G.box(.7, 1.1, .06), '#2E4A3A', [0, .55, 1.32])); g.userData.wins = wins; return g;
}
function water(parent, w, d, p) { const m = mesh(G.box(w, .1, d), '#3E7FAE', p, { cast: false, mat: { roughness: .15 } }); parent.add(m); return m }
function boat(parent, p, col = '#E5484D') { const g = group(parent, p); g.add(mesh(G.box(.7, .25, 1.8), col, [0, .1, 0])); g.add(mesh(G.box(.5, .3, .6), '#FFFFFF', [0, .35, -.2])); return g }

export async function setup(ctx) { X = ctx; TH = ctx.TH; await loadWorld('../assets/geo/world360.json') }

export const SHOTS = {
  // 1. Globe kosong di angkasa + dua penduduk berdiri di puncaknya
  B_GLOBE_HOOK(s, root) {
    const sc = newScene({ sky: ['#071A33', '#1D5C93'], hemi: .7, sunI: 3, sunPos: [12, 8, 10], shadow: 9 }); stars(sc);
    const gl = globe(sc, 5, { highlight: ['Indonesia'] }); gl.face(10, 20);
    const ppl = group(sc, [0, 4.95, 0]); const J = juragan([-.6, 0, 0], { parent: ppl, s: 1.35 }), K = kepala([.6, 0, 0], { parent: ppl, s: 1.35 });
    const cam = camera(40);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#FFFBF2F2', border: `8px solid ${NAVY}`, borderRadius: '40px', padding: '26px 30px', textAlign: 'center', fontSize: '60px', lineHeight: 1.12, color: NAVY, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 14px 0 ${TERRA}` }, root,
      `Bumi masih <b style="color:${TERRA}">kosong</b>.<br>Penduduk: <b>2 orang</b>.<br><span style="font-size:52px">Kalian yang menentukan isinya.</span>`);
    const tJ = tag3(root, 'Jakarta', '#E5484D'); let pin = null;
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); const tj = popAt(s, 'Jakarta', dur - 2.5);
      const a = seg(t, tj - 1.2, tj + .6); gl.face(lerp(10, -6.2, E.inout(a)), lerp(20 + t * 4, 106.8, E.inout(a)));
      orbit(cam, lerp(-12, 10, p), lerp(9, 5, p), lerp(36, 28, p), [0, 4.4, 0]);
      J.pose(t, { wave: true, bounce: true }); K.pose(t + .4, { cheer: t > 2, talk: true });
      X.pop(hook, seg(t, .1, .5)); hook.style.top = (300 - 10 * Math.sin(t * 2)) + 'px';
      if (!pin && t >= tj) pin = gl.pin(-6.2, 106.8);
      if (pin) { const q = seg(t, tj, tj + .5); pin.scale.setScalar(Math.max(.01, E.back(q))); tJ.at(pin, cam, [0, 0, .9], q) } else tJ.at(gl, cam, [0, 0, 0], 0);
    } };
  },
  // 2. Kenalan: kavling kosong, Juragan Modal + Kepala Bumi, koin menyembur dari koper
  B_CHARS(s, root) {
    const sc = newScene({ sky: ['#7EC8F2', '#E7F6FF'], sunPos: [-8, 14, 10], fog: ['#E7F6FF', 30, 70] }); plot(sc, { city: true });
    const J = juragan([-1.1, 0, .6]), K = kepala([1.2, 0, .4]); sc.add(J, K); J.rotation.y = .35; K.rotation.y = -.35;
    const coins = Array.from({ length: 26 }, (_, i) => coin(sc, [0, -5, 0], 1.1));
    const cam = camera(42);
    const tgJ = tag3(root, 'Juragan Modal', '#8E2F3A'), tgK = tag3(root, 'Kepala Bumi', '#2E7D5B');
    const c1 = chip(root, `Modal awal: <b style="color:${TERRA}">1.000 koin</b>`, { left: 150, top: 300, fontSize: '48px' });
    return { scene: sc, cam, upd(t, dur) {
      const tj = popAt(s, 'Juragan Modal', 1.2), tc = popAt(s, 'seribu', 3.5), tk = popAt(s, 'Kepala Bumi', 6.5), tp = popAt(s, 'pusing', dur - 2);
      const focus = t < tk - .3 ? 0 : 1, f = E.inout(seg(t, tk - .8, tk + .2));
      orbit(cam, lerp(-24, 22, f) + Math.sin(t * .4) * 3, 3.2, lerp(11.5, 11, f), [lerp(-.5, .5, f), 1.2, .5]);
      J.pose(t, { talk: t > tj && t < tk, hold: true, nod: t > tp }); K.pose(t, { talk: t > tk, wave: t > tk && t < tk + 1.6, shake: t > tp });
      const sp = seg(t, tc, tc + 2.2); coins.forEach((c, i) => { if (sp <= 0) { c.position.y = -5; return } const a = i * 2.39, v = 2.2 + (i % 5) * .35, tt = Math.min(sp * 2.2, 1.6 + (i % 4) * .1);
        c.position.set(-1.1 + .6 + Math.cos(a) * tt * .9, 1 + v * tt - 2.4 * tt * tt * .9, .9 + Math.sin(a) * tt * .9); if (c.position.y < .05) c.position.y = .05; c.rotation.set(t * 6 + i, t * 4, 0) });
      tgJ.at(J, cam, [0, 2.35, 0], seg(t, tj, tj + .4)); tgK.at(K, cam, [0, 2.35, 0], seg(t, tk, tk + .4)); X.pop(c1, seg(t, tc + .3, tc + .7));
    } };
  },
  // 3. Terbang dari angkasa ke Indonesia lalu Jakarta
  B_FLY(s, root) {
    const sc = newScene({ sky: ['#2C7CC0', '#BFE6FF'], hemi: 1, sunI: 2.6, sunPos: [6, 10, 14], shadow: 8 });
    const gl = globe(sc, 5, { highlight: ['Indonesia'] }); const pin = gl.pin(-6.2, 106.8); pin.scale.setScalar(.01);
    const cl = [[-2, 112], [4, 98], [-9, 120], [1, 104]].map(([la, lo], i) => { const c = cloud(gl, [0, 0, 0], .32); c.position.copy(ll2v(la, lo, 5.55)); c.lookAt(ll2v(la, lo, 9)); return c });
    const cam = camera(36);
    const tI = tag3(root, 'INDONESIA', NAVY), tJ = tag3(root, 'Jakarta', '#E5484D');
    const chips = [['🌡️', 'Tropis: panas & lembap', 'lembap', NAVY], ['☔', 'Musim hujan ± Okt–Mei', 'Oktober', '#3E8FC4'], ['🌊', 'Utara/pesisir rawan banjir', 'banjir', '#E5484D']]
      .map(([ic, tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 112, fontSize: '40px' }, col) }));
    return { scene: sc, cam, upd(t, dur) {
      const tj = popAt(s, 'Jakarta', 1.2), z = E.inout(seg(t, 0, tj + 1.5));
      gl.face(lerp(25, -6.2, z), lerp(40, 106.8, z) + (1 - z) * t * 6);
      const d = lerp(30, 19, z) - seg(t, tj + 1.5, dur) * 1.5; orbit(cam, Math.sin(t * .3) * 4, lerp(4, .3, z), d, [0, lerp(0, -.6, z), 0]);
      pin.scale.setScalar(Math.max(.01, E.back(seg(t, tj, tj + .5)) * 1.2));
      cl.forEach((c, i) => c.position.copy(ll2v([-2, 4, -9, 1][i] + Math.sin(t * .5 + i) * .8, [112, 98, 120, 104][i] + t * .4, 5.55)));
      tI.at(gl, cam, ll2v(-2.5, 118, 5.3).toArray(), seg(t, .6, 1)); tJ.at(pin, cam, [0, 0, .9], seg(t, tj + .2, tj + .6));
      chips.forEach(c => X.pop(c.e, seg(t, popAt(s, c.cu, 99), popAt(s, c.cu, 99) + .4)));
    } };
  },
  // 4. Kavling kosong: panas lalu hujan, genangan membesar
  B_PLOT(s, root) {
    const sc = newScene({ sky: ['#8FD3FF', '#F4FBFF'], sunPos: [6, 16, 6], fog: ['#E8F2F8', 30, 70] }); plot(sc, { city: true });
    const pud = mesh(G.cyl(1, 1, .04, 24), '#5FA8D8', [0, .05, 0], { mat: { roughness: .15, metalness: .1, transparent: true, opacity: .85 } }); sc.add(pud);
    const R = rain(sc, 420, 14, 12); R.visible = false;
    const J = juragan([-1.5, 0, 1.4], { prop: 'umbrella', umbC: '#8E2F3A' }), K = kepala([1.4, 0, 1.6]); sc.add(J, K); J.rotation.y = .5; K.rotation.y = -.4;
    const sunG = mesh(G.ico(1.2, 1), '#FFD54A', [5, 7, -6], { cast: false, mat: { emissive: '#FFB300', emissiveIntensity: .8 } }); sc.add(sunG);
    const cam = camera(44); const sky0 = sc.background, sky1 = new THREE.Color('#7E93A6');
    const c1 = chip(root, '1. Tahan <b style="color:#E07B39">panas</b>', { left: 80, top: 300 }), c2 = chip(root, '2. Tahan <b style="color:#3E8FC4">air</b>', { left: 80, top: 410 }), c3 = chip(root, `Anggaran: <b style="color:${TERRA}">1 rumah</b>`, { left: 80, top: 520 }, '#8E2F3A');
    return { scene: sc, cam, upd(t, dur) {
      const tp = popAt(s, 'panas', 1), ta = popAt(s, 'air', 2.2), ts = popAt(s, 'satu', 4.5), r = seg(t, ta, ta + 1);
      sc.background = r > .5 ? sky1 : sky0; sc.userData.sun.intensity = lerp(2.6, .9, r); sc.userData.hemi.intensity = lerp(1.15, .8, r);
      sunG.visible = r < .6; sunG.scale.setScalar(1 + .08 * Math.sin(t * 5)); R.visible = r > 0; R.tick(t);
      pud.scale.set(lerp(.01, 2.1, seg(t, ta + .3, dur)), 1, lerp(.01, 1.7, seg(t, ta + .3, dur)));
      orbit(cam, lerp(30, 12, E.inout(seg(t, 0, dur))), lerp(13, 4.5, E.out(seg(t, 0, dur * .7))), lerp(22, 15, seg(t, 0, dur)), [0, .8, 0]);
      J.pose(t, { hold: true, look: -.3 }); K.pose(t, { talk: true, point: t > ts && t < ts + 2 });
      X.pop(c1, seg(t, tp, tp + .4)); X.pop(c2, seg(t, ta, ta + .4)); X.pop(c3, seg(t, ts, ts + .4));
    } };
  },
  // 5/6. Bangun rumah: varian panggung (air lewat kolong) atau resapan (air meresap ke sumur)
  B_BUILD(s, root) {
    const P = s.variant === 'panggung';
    const sc = newScene({ sky: P ? ['#9ED8F5', '#EAF8FF'] : ['#B9E3C6', '#F3FBF4'], sunPos: P ? [8, 15, 9] : [-9, 15, 8] });
    const I = plot(sc, { grass: P ? '#8CC152' : '#7FBF4F' });
    const H = house(sc, [0, 0, 0], P ? { stilts: 1.5, wall: '#F6E7C8', roofC: '#B5452B', w: 2.8, d: 2.4 } : { wall: '#FFF3D6', roofC: '#2E7D5B', w: 2.8, d: 2.4, doorX: -.6 });
    const parts = [...H.children]; const K = kepala([2.6, 0, 2.2]); sc.add(K); K.rotation.y = -.7;
    const water = mesh(G.box(12, .1, 12), '#4FA3DB', [0, -.2, 0], { mat: { transparent: true, opacity: .75, roughness: .1 }, cast: false }); if (P) sc.add(water);
    let drops = [], well = null, gut = null;
    if (!P) {   // sumur resapan di halaman depan + talang
      well = group(sc, [1.9, 0, 2.6]); well.add(mesh(G.cyl(.5, .5, .12, 16), '#9AA6B2', [0, .06, 0])); well.add(mesh(G.cyl(.36, .36, .14, 16), '#5C6B73', [0, .07, 0]));
      const shaft = mesh(G.cyl(.45, .45, 1.6, 16), '#7D8A94', [1.9, -1, 2.6], { mat: { transparent: true, opacity: .55 } }); sc.add(shaft);
      gut = mesh(G.cyl(.06, .06, 1.9, 6), '#5C6B73', [1.45, 1, 1.25]); sc.add(gut); sc.add(mesh(G.box(.12, .1, 1.4), '#5C6B73', [1.6, .07, 1.9]));
      drops = Array.from({ length: 18 }, () => { const d = mesh(G.sph(.08, 8, 6), '#3E8FC4', [0, -5, 0], { cast: false }); sc.add(d); return d });
      [[-2.6, 2.6], [-1.6, 3.4], [2.9, -2.8]].forEach(([x, z]) => sc.add(mesh(G.ico(.35, 0), '#5E9B3A', [x, .25, z])));
    }
    const R = rain(sc, 260, 12, 10); R.visible = !P;
    const cam = camera(44);
    const L = P ? [['Lantai di atas <b>tiang</b>', 'tiang', NAVY], ['Air lewat di <b>kolong</b>', 'kolong', '#3E8FC4'], ['Dulu dipakai di pesisir Betawi', 'Betawi', TERRA]]
      : [['Halaman <b>terbuka</b>', 'terbuka', '#2E7D5B'], ['Air atap → <b>sumur resapan</b>', 'sumur', '#3E8FC4'], ['Meresap ke tanah, tak menggenang', 'meresap', NAVY]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 112, fontSize: '40px' }, col) }));
    const big = X.ab({ left: 820, top: 290, width: 170, height: 170, borderRadius: '50%', background: P ? '#E5484D' : '#3E8FC4', border: `8px solid ${NAVY}`, color: '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px', top: 300 }, root, P ? 'A' : 'B');
    const tKol = tag3(root, 'kolong', '#3E8FC4');
    return { scene: sc, cam, upd(t, dur) {
      const b0 = .3, steps = parts.length;
      parts.forEach((m, i) => { const q = E.back(seg(t, b0 + i * .22, b0 + i * .22 + .5)); m.scale.y = Math.max(.001, q) * (m.userData.sy ??= m.scale.y); m.visible = q > 0.001 });
      X.pop(big, seg(t, 0, .4));
      orbit(cam, (P ? 35 : -30) + t * (P ? -3 : 3), lerp(8, 4, E.inout(seg(t, 0, dur))), lerp(18, 13.5, E.inout(seg(t, 0, dur))), [0, 1.6, .5]);
      K.pose(t, { talk: true, point: (t % 6) < 2 });
      if (P) { const ta = popAt(s, 'air naik', 4.5); water.position.y = lerp(-.25, .7, E.inout(seg(t, ta, ta + 2.2))) + Math.sin(t * 2) * .03; water.visible = t > ta - .1;
        const tk = popAt(s, 'kolong', ta + 1); tKol.at(H, cam, [0, .75, 1.6], seg(t, tk, tk + .4) * (t < dur - .3 ? 1 : 0)) }
      else { R.tick(t); const ts = popAt(s, 'sumur', 3); drops.forEach((d, i) => { const q = ((t - ts) * .5 + i / drops.length) % 1; if (t < ts) { d.position.y = -9; return }
          // jalur: tepi atap → talang → sumur → menyebar ke tanah
          if (q < .3) d.position.set(1.45, lerp(2.3, .1, q / .3), 1.25); else if (q < .55) d.position.set(lerp(1.45, 1.9, (q - .3) / .25), .1, lerp(1.25, 2.6, (q - .3) / .25));
          else { const k = (q - .55) / .45; d.position.set(1.9 + Math.cos(i) * k * 1.2, lerp(0, -1.6, k), 2.6 + Math.sin(i) * k * .4) } }) }
      chips.forEach(c => { const tc = popAt(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },

  // 4. Papan kota kosong, zona menyala satu per satu
  B_ZONEMAP(s, root) {
    const sc = newScene({ sky: ['#6FBCEB', '#E4F5FF'], sunPos: [-10, 20, 12], shadow: 20 }); const B = cityBoard(sc);
    const cam = camera(42); const legend = [['hunian', 'Tempat tinggal', 'tinggal'], ['usaha', 'Tempat usaha', 'usaha'], ['industri', 'Kawasan industri', 'industri'], ['hijau', 'Ruang hijau', 'hijau']]
      .map(([z, tx, cu], i) => ({ z, cu, e: chip(root, `<span style="display:inline-block;width:30px;height:30px;border-radius:8px;background:${ZC[z]};border:4px solid ${NAVY};vertical-align:-4px;margin-right:12px"></span>${tx}`, { left: 70, top: 300 + i * 105, fontSize: '38px' }) }));
    const fac = factory(sc, [8, 0, -1]), hs = housing(sc, -8, 8, 2); fac.visible = false; hs.forEach(h => h.visible = false);
    const tJ = tag3(root, 'jauh dari rumah', ZC.industri);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(-20, 12, E.inout(seg(t, 0, dur))), lerp(34, 28, seg(t, 0, dur)), lerp(40, 35, seg(t, 0, dur)), [1.5, 0, 1]);
      legend.forEach(L => { const tc = at3(s, L.cu, 99); X.pop(L.e, seg(t, tc, tc + .4)); B.userData.zones[L.z].forEach(m => { m.visible = t > tc; m.material.opacity = .35 + .25 * Math.abs(Math.sin(t * 3)) }) });
      const tp = at3(s, 'Pabrik', dur - 3); grow([fac], t, tp); grow(hs, t, tp + .2, .05); fac.userData.puffs.forEach((m, i) => { const q = (t * .4 + i / 3) % 1; m.position.y = 2.8 + q * 2; m.scale.setScalar(.6 + q) });
      tJ.at(fac, cam, [0, 4.5, 0], seg(t, tp + .5, tp + .9));
    } };
  },
  // 5/6. Zona dibangun: perumahan (A) atau kawasan usaha (B)
  B_ZONE(s, root) {
    const A = s.variant === 'hunian';
    const sc = newScene({ sky: A ? ['#8FD3FF', '#F2FAFF'] : ['#FFD7A8', '#FFF6EA'], sunPos: A ? [-10, 20, 12] : [12, 18, 10], shadow: 20 }); const B = cityBoard(sc);
    const tick = cars(sc, 10); let items = [], extra = [];
    if (A) { const h1 = housing(sc, -8, 8); sc.remove(h1[4]); h1.splice(4, 1); items = [...h1, ...housing(sc, -8, 0)]; extra = [park(sc, -8, 8)] }
    else { items = [shop(sc, [-2, 0, -1.8], { sign: '#E5484D', awn: '#F5C542' }), shop(sc, [1.8, 0, -1.8], { w: 2.6, sign: '#2E7D5B', wall: '#F4F7FA' }), shop(sc, [-1.8, 0, 2], { awn: '#E5484D', sign: '#F5C542' }),
        tower(sc, [2, 0, 1.6], 3.4), tower(sc, [-1.8, 0, 6.3], 2.6, '#C9D6E2'), shop(sc, [1.8, 0, 6.3], { w: 2.6, h: 1.6, wall: '#FFE9C8', sign: '#3E8FC4' }), shop(sc, [-2, 0, 9.6], { awn: '#3E8FC4' }), tower(sc, [2, 0, 9.6], 4.2, '#A9C2DA')] }
    const zoneList = B.userData.zones[A ? 'hunian' : 'usaha']; zoneList.forEach(m => m.visible = true);
    if (A) B.userData.zones.pesisir.forEach(m => m.visible = true);
    const ppl = Array.from({ length: 6 }, (_, i) => person(sc, [0, 0, 0], { s: .55, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0', '#C9472F'][i] }));
    const coinsF = A ? [] : Array.from({ length: 10 }, (_, i) => coin(sc, [0, -5, 0], 1.4));
    const cam = camera(42);
    const L = A ? [['Tempat tinggal penduduk', 'tinggal', NAVY], ['Jauh dari pesisir rawan banjir', 'banjir', '#E5484D'], ['Sisakan taman', 'taman', '#2E7D32']]
      : [['Pasar · toko swalayan · kantor', 'Pasar', NAVY], ['Ada lapangan kerja', 'lapangan', '#2E7D32'], ['Orang luar tertarik pindah', 'pindah', TERRA]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 70, top: 300 + i * 105, fontSize: '38px' }, col) }));
    const big = X.ab({ left: 820, top: 300, width: 170, height: 170, borderRadius: '50%', background: A ? '#E5484D' : '#3E8FC4', border: `8px solid ${NAVY}`, color: '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px' }, root, A ? 'A' : 'B');
    const tB = tag3(root, 'rawan banjir', '#E5484D');
    return { scene: sc, cam, upd(t, dur) {
      X.pop(big, seg(t, 0, .4)); tick(t); grow(items, t, .5, A ? .06 : .18); if (extra[0]) { const q = E.back(seg(t, at3(s, 'taman', 5), at3(s, 'taman', 5) + .5)); extra[0].scale.setScalar(Math.max(.001, q * .42)) }
      const ctr = A ? [-8, 0, 4] : [0, 0, 4];
      orbit(cam, (A ? -30 : 30) + t * (A ? 2 : -2), lerp(18, 10, E.inout(seg(t, 0, dur))), lerp(26, 17, E.inout(seg(t, 0, dur))), ctr);
      ppl.forEach((p, i) => { const k = ((t * .05 + i / 6) % 1) * 16 - 8; p.position.set(ctr[0] + (i % 2 ? 2.8 : -2.8), 0, ctr[2] + k); p.rotation.y = 0; p.pose(t + i, { walk: 1 }) });
      coinsF.forEach((c, i) => { const q = (t * .35 + i / 10) % 1; c.position.set(Math.sin(i * 2.1) * 3, 1 + q * 5, 4 + Math.cos(i * 2.1) * 4); c.rotation.set(t * 3, t * 2 + i, 0) });
      chips.forEach(c => { const tc = at3(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
      if (A) tB.at(B.userData.sea, cam, [0, 1, 4], seg(t, at3(s, 'banjir', 99), at3(s, 'banjir', 99) + .4)); else tB.at(B, cam, [0, 0, 0], 0);
    } };
  },

  // Info ruang hijau (slot 2): satu shot berparameter, varian gray/pct/why/real/ask
  B_GREEN(s, root) {
    const v = s.variant; const sc = newScene({ sky: v === 'gray' ? ['#E9B98A', '#FFF1DE'] : v === 'ask' ? ['#0B1F3A', '#264E86'] : ['#8FD3FF', '#F2FAFF'], sunPos: [-10, 20, 12], shadow: 20, hemi: v === 'ask' ? .8 : 1.15 });
    const B = cityBoard(sc); const tick = cars(sc, 10); const towers = [], greens = [];
    const spots = []; for (const bx of [-8, 0, 8]) for (const bz of [-8, 0, 8]) for (const dx of [-1.8, 1.8]) for (const dz of [-1.8, 1.8]) spots.push([bx + dx, bz + dz]);
    spots.forEach(([x, z], i) => { const h = 1.5 + ((i * 37) % 5); towers.push(tower(sc, [x, 0, z], h, ['#B7C9DB', '#C9D6E2', '#A9C2DA', '#D5DEE8'][i % 4])) });
    const gIdx = [0, 5, 9, 14, 18, 22, 27, 31, 33, 35, 2]; // ±30% kavling jadi hijau
    gIdx.forEach(i => { const [x, z] = spots[i]; const g = group(sc, [x, 0, z]); g.add(mesh(G.box(3.2, .1, 3.2), '#4CAF50', [0, .06, 0], { cast: false })); tree(g, [-.7, 0, -.6], .7); tree(g, [.7, 0, .5], .8, '#3F8A3A'); g.visible = false; greens.push({ g, i }) });
    if (v === 'ask') { towers.forEach(t => t.visible = false) }
    const ppl = Array.from({ length: 5 }, (_, i) => person(sc, [0, 0, 0], { s: .55, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0'][i] }));
    const cam = camera(42); const C = [];
    const donut = X.ab({ left: 660, top: 300, width: 340, height: 340, borderRadius: '50%', opacity: 0, border: `8px solid ${NAVY}`, background: `conic-gradient(#2E7D32 0 ${X.TL.vars.publik || 20}%, #8BD17C 0 ${X.TL.vars.rth || 30}%, #C9D6E2 0 100%)` }, root,
      `<div style="position:absolute;inset:70px;border-radius:50%;background:${CREAM};display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:72px;color:#2E7D32">${X.TL.vars.rth || 30}%</div>`);
    const L = v === 'gray' ? [['🔥 panas', 'panas', '#E07B39'], ['🌊 gampang banjir', 'banjir', '#3E8FC4'], ['🌳 ruang hijau: berapa?', 'berapa', '#2E7D32']]
      : v === 'pct' ? [['minimal 30% luas kota', 'persen', '#2E7D32'], ['20% publik: taman, hutan kota', 'publik', '#2E7D32'], ['10% privat: halaman rumah', 'privat', '#5E9B3A']]
      : v === 'why' ? [['💧 menyerap air hujan', 'menyerap', '#3E8FC4'], ['🌳 meneduhkan', 'meneduhkan', '#2E7D32'], ['🏃 tempat warga bermain', 'bermain', NAVY], ['🏡 halaman rumah = hijau privat', 'privat', '#5E9B3A']]
      : v === 'real' ? [['😓 banyak kota kesulitan', 'kesulitan', '#B5452B'], ['💸 tanah kota mahal', 'mahal', TERRA], ['🌳 tiap taman berharga', 'berharga', '#2E7D32']]
      : [['Jakarta kita masih kosong', 'kosong', NAVY], ['🌳 ruang hijau mau berapa %?', 'persen', '#2E7D32'], ['🗳️ pilih A/B di Hari 1', 'Hari 1|Hari satu', TERRA]];
    const chips = L.map(([tx, cu, col], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, col) }));
    const signs = v === 'real' ? [1, 7, 12, 20, 26].map(i => { const [x, z] = spots[i]; const g = group(sc, [x, 0, z]); g.add(mesh(G.box(.08, 1.4, .08), '#555', [0, .7, 0])); g.add(mesh(G.box(1.3, .7, .06), '#E5484D', [0, 1.4, 0])); return g }) : [];
    const drops = v === 'why' ? Array.from({ length: 30 }, () => { const m = mesh(G.sph(.08, 8, 6), '#4FA3DB', [0, -5, 0], { cast: false }); sc.add(m); return m }) : [];
    const ask = v === 'ask' ? X.ab({ left: 120, top: 1100, width: 840, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: '#8BD17C', WebkitTextStroke: `10px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, '?%') : null;
    if (v === 'real') { greens.forEach((x, k) => x.g.visible = k < 4); towers.forEach((t, i) => t.visible = !gIdx.slice(0, 4).includes(i)) }
    return { scene: sc, cam, upd(t, dur) {
      tick(t); const p = E.inout(seg(t, 0, dur));
      if (v === 'gray') { orbit(cam, lerp(-25, 10, p), lerp(30, 22, p), lerp(38, 32, p), [0, 0, 2]); sc.userData.sun.intensity = 3 + Math.sin(t * 6) * .2 }
      if (v === 'pct') { orbit(cam, lerp(10, -15, p), 34, 38, [0, 0, 2]); const tp = popAt(s, 'persen', 2); greens.forEach((x, k) => { const q = E.back(seg(t, tp + k * .25, tp + k * .25 + .5)); x.g.visible = q > 0; x.g.scale.setScalar(Math.max(.001, q)); towers[x.i].visible = q <= 0 }); X.pop(donut, seg(t, tp, tp + .5)) }
      if (v === 'why') { greens.forEach(x => { x.g.visible = true; towers[x.i].visible = false }); orbit(cam, 20 + t * 2, 15, 19, [-8, 0, -8]);
        drops.forEach((d, i) => { const q = (t * .5 + i / 30) % 1; d.position.set(-8 + Math.sin(i * 2.3) * 1.6, lerp(6, -.6, q), -8 + Math.cos(i * 1.7) * 1.6) });
        ppl.forEach((x, i) => { x.position.set(-8 + Math.sin(t * .3 + i * 1.2) * 2.4, 0, -8 + Math.cos(t * .3 + i * 1.2) * 2.4); x.rotation.y = -(t * .3 + i * 1.2); x.pose(t + i, { walk: 1 }) }) }
      else ppl.forEach(x => x.visible = false);
      if (v === 'real') { orbit(cam, lerp(-20, 20, p), 26, 32, [0, 0, 2]); signs.forEach((g, i) => g.scale.setScalar(Math.max(.001, E.back(seg(t, popAt(s, 'mahal', 3) + i * .15, popAt(s, 'mahal', 3) + i * .15 + .4))))) }
      if (v === 'ask') { orbit(cam, t * 4, 30, 34, [0, 0, 2]); const q = seg(t, popAt(s, 'berapa persen', 3), popAt(s, 'berapa persen', 3) + .5); ask.style.opacity = q; ask.style.transform = `scale(${E.back(q)})` }
      chips.forEach(c => { const tc = popAt(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  // 7. Perbandingan di atas dua meja putar
  B_COMPARE(s, root) {
    const sc = newScene({ sky: ['#FCE3C4', '#FFF7EC'], hemi: 1.2, sunPos: [0, 14, 10] });
    sc.add(mesh(G.box(30, .2, 30), '#F2D8B0', [0, -.6, 0]));
    const mk = (x, P) => { const g = group(sc, [x, 0, 0]); g.add(mesh(G.cyl(2.6, 2.7, .5, 32), P ? '#E5484D' : '#3E8FC4', [0, -.25, 0])); g.add(mesh(G.cyl(2.4, 2.4, .08, 32), P ? '#9ED8A0' : '#8CC152', [0, .02, 0]));
      const h = house(g, [0, 0, 0], P ? { stilts: 1.4, wall: '#F6E7C8', roofC: '#B5452B', w: 2.2, d: 2 } : { wall: '#FFF3D6', roofC: '#2E7D5B', w: 2.2, d: 2 });
      if (!P) { g.add(mesh(G.cyl(.4, .4, .12, 14), '#7D8A94', [1.5, .07, 1.3])) } else g.add(mesh(G.cyl(2.3, 2.3, .06, 32), '#5FA8D8', [0, .12, 0], { mat: { transparent: true, opacity: .7 } })); return g };
    const ZONA = s.variant === 'zona';
    const mkZ = (x, H) => { const g = group(sc, [x, 0, 0]); g.add(mesh(G.cyl(2.6, 2.7, .5, 32), H ? '#E5484D' : '#3E8FC4', [0, -.25, 0])); g.add(mesh(G.cyl(2.4, 2.4, .08, 32), H ? '#F5D77A' : '#F2A3A3', [0, .02, 0]));
      if (H) { [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b], i) => house(g, [a * 1.1, 0, b * 1.1], { w: 1.2, d: 1.1, h: .9, roofH: .6, wall: CC[i], roofC: RC[i] })); tree(g, [0, 0, 0], .6) }
      else { shop(g, [-1, 0, -.8], { w: 1.6, sign: '#E5484D', awn: '#F5C542' }); tower(g, [1, 0, -.6], 2.6); shop(g, [0, 0, 1.2], { w: 2.2, sign: '#2E7D5B' }) } return g };
    const A = ZONA ? mkZ(-2.8, true) : mk(-2.8, true), B = ZONA ? mkZ(2.8, false) : mk(2.8, false);
    const cam = camera(44);
    const bA = tag3(root, '<span style="font-size:70px">A</span>', '#E5484D'), bB = tag3(root, '<span style="font-size:70px">B</span>', '#3E8FC4');
    const pc = (ZONA ? [['+ penduduk punya rumah', 'punya rumah', -1, 0, '#2E7D32'], ['− belum ada tempat kerja', 'kerja', -1, 1, '#B5452B'], ['+ ekonomi jalan', 'ekonomi', 1, 0, '#2E7D32'], ['− pekerja tinggal di mana?', 'tinggal', 1, 1, '#B5452B']] : [['+ aman saat air naik', 'aman', -1, 0, '#2E7D32'], ['− butuh tangga & tiang kuat', 'tangga', -1, 1, '#B5452B'], ['+ gampang diakses', 'gampang', 1, 0, '#2E7D32'], ['− tergantung jenis tanah', 'jenis tanah', 1, 1, '#B5452B']])
      .map(([tx, cu, side, row, col]) => ({ cu, e: chip(root, tx, { left: side < 0 ? 40 : 560, top: 1080 + row * 100, fontSize: '32px', padding: '10px 18px' }, col) }));
    return { scene: sc, cam, upd(t, dur) {
      A.rotation.y = t * .5; B.rotation.y = -t * .5;
      orbit(cam, Math.sin(t * .25) * 6, 9 - t * .08, 25 - t * .12, [0, .6, 0]);
      bA.at(A, cam, [0, 4.6, 0], seg(t, .2, .6)); bB.at(B, cam, [0, 4.1, 0], seg(t, .4, .8));
      pc.forEach(c => { const tc = popAt(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  // 8. Cara main: globe kecil, penduduk baru berdatangan, komentar A/B, paspor negara terkunci
  B_RULES(s, root) {
    const sc = newScene({ sky: ['#0B1F3A', '#264E86'], hemi: .8, sunI: 2.8, sunPos: [10, 8, 12] }); stars(sc);
    const gl = globe(sc, 3.6, { highlight: ['Indonesia'] }); gl.position.y = -1.2; gl.pin(-6.2, 106.8);
    const ppl = Array.from({ length: 6 }, (_, i) => { const p = person(sc, [0, 0, 0], { s: .5, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0', '#C9472F'][i], hat: i % 2 ? 'cap' : null, hatC: GOLD }); p.visible = false; return p });
    const cam = camera(36);
    const cards = [
      [`<b style="color:#E5484D">A</b> ${X.TL.vars.opsi_a || 'rumah panggung'} / <b style="color:#3E8FC4">B</b> ${X.TL.vars.opsi_b || 'sumur resapan'}`, 'komentar', 300],
      [`❤ <b>${X.TL.vars.like_per} like</b> = +1 penduduk`, 'like', 410],
      ['🌍 Negara berikutnya? Tulis di komentar', 'negara', 520]].map(([h, cu, top]) => ({ cu, e: chip(root, h, { left: 60, top, fontSize: '40px' }) }));
    const sample = (X.TL.vars.contoh || [['@pe***', 'A! biar aman banjir'], ['@ra***', 'B, terus ke Jepang']]).map(([u, tx], i) => X.ab({ left: i ? 470 : 60, top: 1150 + i * 40, width: 520, background: '#FFFFFF', borderRadius: '24px', padding: '14px 20px', fontSize: '30px', color: '#222', fontFamily: 'Fredoka', boxShadow: '0 6px 0 #00000030', opacity: 0 }, root, `<div style="font-size:24px;color:#888">${u} · contoh</div>${tx}`));
    return { scene: sc, cam, upd(t, dur) {
      gl.rotation.y = -106.8 * Math.PI / 180 + Math.sin(t * .3) * .25; gl.rotation.x = -.11;
      orbit(cam, Math.sin(t * .2) * 8, 2.6, 19 - t * .1, [0, .4, 0]);
      const tl = popAt(s, 'like', 3);
      ppl.forEach((p, i) => { const q = seg(t, tl + .4 + i * .35, tl + .8 + i * .35); p.visible = q > 0; const a = (i - 2.5) * .28; p.position.set(Math.sin(a) * 3.6, -1.2 + Math.cos(a) * 3.6 + (1 - E.out(q)) * 2, .4); p.rotation.z = -a; p.pose(t + i, { cheer: true }) });
      cards.forEach(c => { const tc = popAt(s, c.cu, 1); X.pop(c.e, seg(t, tc, tc + .4)) });
      sample.forEach((e, i) => { const q = seg(t, 1.2 + i * .5, 1.6 + i * .5); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * 30}px) rotate(${i ? 2 : -2}deg)` });
    } };
  },

  // ===== LORE BUMI #1: tebak negara =====
  B_LORE_HOOK(s, root) {
    const sc = newScene({ sky: ['#071A33', '#1D5C93'], hemi: .8, sunI: 3, sunPos: [12, 8, 10], shadow: 9 }); stars(sc);
    const gl = globe(sc, 5, {}); const q = [[37, 25], [61, 15], [65, -18]].map(([la, lo]) => { const sp = txtSprite('?', GOLD, NAVY, 1.4); sp.position.copy(ll2v(la, lo, 6.4)); gl.add(sp); return sp });
    const minis = [grVillage, swHouse, isHouse].map((f, i) => { const g = group(sc); const m = f(g); g.scale.setScalar(i ? .32 : .16); return g });
    const cam = camera(40);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#FFFBF2F2', border: `8px solid ${NAVY}`, borderRadius: '40px', padding: '24px 30px', textAlign: 'center', fontSize: '62px', lineHeight: 1.12, color: NAVY, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 14px 0 ${TERRA}` }, root,
      `<span style="color:${TERRA}">3 rumah</span>, 3 negara.<br><span style="font-size:52px">Bisa tebak semua?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      gl.face(40, 5 + t * 9); orbit(cam, Math.sin(t * .3) * 8, 3, lerp(30, 24, E.inout(seg(t, 0, dur))), [0, -.5, 0]);
      q.forEach((sp, i) => sp.scale.setScalar(1.4 + Math.sin(t * 5 + i) * .15));
      minis.forEach((g, i) => { const a = t * .6 + i * 2.09; g.position.set(Math.sin(a) * 7.2, -4.2 + Math.sin(t * 1.5 + i) * .3, Math.cos(a) * 7.2); g.rotation.y = a + Math.PI; g.visible = seg(t, 1 + i * .3, 1.3 + i * .3) > 0 });
      X.pop(hook, seg(t, .1, .5)); hook.style.top = (300 - 8 * Math.sin(t * 2)) + 'px';
    } };
  },
  B_HOUSE_GR(s, root) {   // kamera dari laut, crane naik ke tebing
    const sc = newScene({ sky: ['#F49A6A', '#FFE7C2'], sun: '#FFD2A0', sunPos: [-14, 9, 12], shadow: 16, hemi: 1.1 }); const V = grVillage(sc);
    const cam = camera(42); const cd = countdown(root); const qq = chip(root, '❓ negara mana?', { left: 330, top: 1130, fontSize: '48px' }, TERRA);
    const L = [['⚪ dinding putih semua', 'putih'], ['🔵 kubah biru', 'biru'], ['🌊 di tebing pinggir laut', 'tebing']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-6, 4, p), lerp(.2, 4.5, p), lerp(20, 15, p)); cam.lookAt(0, lerp(1.5, 2.6, p), -3);
      grow(V.userData.domes, t, .6, .3);
      L.forEach(l => { const tc = popAt(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) });
      const tq = popAt(s, 'Negara mana', dur - 3); X.pop(qq, seg(t, tq, tq + .4)); cd(t, popAt(s, 'Tiga', dur - 2.2));
    } };
  },
  B_HOUSE_SW(s, root) {   // dolly menyamping lewat hutan pinus
    const sc = newScene({ sky: ['#9CC7E6', '#EEF6FB'], sunPos: [10, 12, 6], shadow: 16, fog: ['#EEF6FB', 22, 60] }); island(sc, 30, 24, '#6E9B4A', '#6B5A44');
    const lake = mesh(G.cyl(5, 5, .1, 28), '#4A86B8', [5, .02, -5], { mat: { roughness: .2 }, cast: false }); sc.add(lake);
    const H = swHouse(sc, [-1, 0, 0]); H.rotation.y = .3; sc.add(mesh(G.box(.8, .05, 6), '#B59A6A', [-.6, .03, 4]));
    for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 5 + (i % 5) * 2; const x = Math.sin(a) * r - 2, z = Math.cos(a) * r - 2; if (z < 5 && Math.hypot(x - 5, z + 5) > 5.5 && Math.hypot(x + 1, z) > 3.2) tree(sc, [x, 0, z], 1.2 + (i % 3) * .3, '#2F5D3A', 'cone') }
    const cam = camera(42); const cd = countdown(root); const qq = chip(root, '❓ negara mana?', { left: 330, top: 1130, fontSize: '48px' }, TERRA);
    const L = [['🪵 rumah kayu', 'kayu'], ['🟥 merah tua, sudut putih', 'merah'], ['🌲 hutan pinus + danau', 'pinus']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-10, 6, p), 2.6, lerp(13, 11, p)); cam.lookAt(-1, 1.6, 0);
      L.forEach(l => { const tc = popAt(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) });
      const tq = popAt(s, 'Negara mana', dur - 3); X.pop(qq, seg(t, tq, tq + .4)); cd(t, popAt(s, 'Tiga', dur - 2.2));
    } };
  },
  B_HOUSE_IS(s, root) {   // orbit pelan di bukit berangin, salju tipis
    const sc = newScene({ sky: ['#9FB4C8', '#E4ECF2'], sunPos: [-8, 10, 10], shadow: 14, fog: ['#E4ECF2', 20, 55], hemi: 1.25 }); island(sc, 26, 26, '#7FA05A', '#5E5246');
    [[-8, -9, 4], [6, -11, 5], [12, -4, 3]].forEach(([x, z, r]) => { sc.add(mesh(G.ico(r, 1), '#728F55', [x, -r * .4, z], { s: [1.4, .8, 1] })) });
    const mtn = mesh(G.cone(9, 9, 7), '#6B6F78', [-2, 3, -20]); sc.add(mtn); sc.add(mesh(G.cone(3.3, 3.3, 7), '#FFFFFF', [-2, 6.4, -20]));
    [[-6, 4], [7, 3], [4, 7], [-5, -3]].forEach(([x, z], i) => sc.add(mesh(G.cyl(1 + i * .2, 1.2, .06, 8), '#F4F7FA', [x, .03, z], { cast: false })));
    const H = isHouse(sc, [0, 0, 0]); const snow = rain(sc, 160, 16, 9, '#FFFFFF');
    const cam = camera(42); const cd = countdown(root); const qq = chip(root, '❓ negara mana?', { left: 330, top: 1130, fontSize: '48px' }, TERRA);
    const L = [['🌱 atap & dinding berumput', 'rumput'], ['🏠 paling unik', 'unik']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    return { scene: sc, cam, upd(t, dur) {
      snow.tick(t * .25); orbit(cam, lerp(35, -10, E.inout(seg(t, 0, dur))), 3.2, 12.5, [0, 1.2, 0]);
      L.forEach(l => { const tc = popAt(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) });
      const tq = popAt(s, 'Negara mana', dur - 3); X.pop(qq, seg(t, tq, tq + .4)); cd(t, popAt(s, 'Tiga', dur - 2.2));
    } };
  },
  B_REVEAL(s, root) {   // globe berputar ke negara jawaban + pin + fakta
    const v = s.variant, C = { gr: ['Greece', 36.4, 25.4, 'YUNANI'], sw: ['Sweden', 60.6, 15.6, 'SWEDIA'], is: ['Iceland', 64.9, -18.6, 'ISLANDIA'], nl: ['Netherlands', 52.37, 4.9, 'BELANDA'], uk: ['United Kingdom', 51.5, -.12, 'INGGRIS'] }[v];
    const sc = newScene({ sky: ['#2C7CC0', '#BFE6FF'], hemi: 1, sunI: 2.6, sunPos: [6, 10, 14], shadow: 8 });
    const gl = globe(sc, 5, { highlight: [C[0]], hlColor: '#FF7A45' }); const pin = gl.pin(C[1], C[2]); pin.scale.setScalar(.01);
    const mini = group(sc); 
    const cam = camera(38); const name = X.ab({ left: 0, top: 1050, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '130px', color: '#FFFFFF', WebkitTextStroke: `14px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, C[3]);
    const F = { gr: [['☀️ putih memantulkan panas', 'memantulkan'], ['🏠 rumah lebih adem', 'adem'], ['🪣 dilabur kapur, murah', 'kapur'], ['💧 bantu bersihkan air hujan', 'membersihkan']],
      sw: [['⛏️ sisa tambang tembaga', 'tambang'], ['🎨 + tepung + minyak = cat', 'tepung'], ['🪵 kayu lebih awet', 'awet'], ['❄️ tahan cuaca dingin', 'dingin']],
      is: [['🌲 pohon sedikit, kayu langka', 'kayu'], ['🌱 tanah berumput melimpah', 'berumput'], ['🧱 ditumpuk tebal', 'tebal'], ['🔥 penahan dingin alami', 'penahan']], nl: [], uk: [] }[v]
      .map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }) }));
    const A0 = { gr: -15, sw: 12, is: 0, nl: 8, uk: -10 }[v];
    return { scene: sc, cam, upd(t, dur) {
      const z = E.inout(seg(t, 0, 1.6)); gl.face(lerp(C[1] - 30, C[1], z), lerp(C[2] + 80, C[2], z));
      orbit(cam, A0 + Math.sin(t * .3) * 5, lerp(6, 2, z), lerp(32, 21, z) - seg(t, 1.6, dur) * 1.5, [0, -1.6, 0]);
      pin.scale.setScalar(Math.max(.01, E.back(seg(t, 1.2, 1.7)) * 1.3)); X.pop(name, seg(t, .9, 1.3)); name.style.opacity = seg(t, .9, 1.3) * (1 - seg(t, 3.6, 4.1));
      const tp = pin.getWorldPosition(new THREE.Vector3()); mini.position.set(tp.x * 1.05 + 1.2, tp.y + 1.2 + Math.sin(t * 2) * .1, tp.z + 1.5); mini.rotation.y = t * .5; mini.visible = false;
      F.forEach(f => { const tc = popAt(s, f.cu, 99); X.pop(f.e, seg(t, tc, tc + .4)) });
    } };
  },
  B_LORE_ASK(s, root) {   // tiga rumah di meja putar + ajakan skor & negara
    const sc = newScene({ sky: ['#0B1F3A', '#264E86'], hemi: .9, sunI: 2.6, sunPos: [8, 12, 10] }); stars(sc);
    const tt = group(sc); tt.add(mesh(G.cyl(4.6, 4.6, .5, 40), '#E8D9B5', [0, -.25, 0])); tt.add(mesh(G.cyl(4.8, 4.8, .2, 40), TERRA, [0, -.55, 0]));
    const a = group(tt, [0, 0, -2.6]); grVillage(a); a.scale.setScalar(.17); const b = swHouse(tt, [2.4, 0, 1.5]); b.scale.setScalar(.6); const c = isHouse(tt, [-2.4, 0, 1.5]); c.scale.setScalar(.5);
    [[a, '1'], [b, '2'], [c, '3']].forEach(([g, n]) => { const sp = txtSprite(n, GOLD, NAVY, .9); sp.position.set(g.position.x, 2.7, g.position.z); tt.add(sp) });
    const cam = camera(42);
    const score = X.ab({ left: 0, top: 1030, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '150px', color: GOLD, WebkitTextStroke: `14px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, '?/3');
    const L = [['📝 tulis skor lo: 3/3?', 'skor'], ['🌍 tulis negara tujuan', 'negara'], ['🏗️ terbanyak = dibangun', 'paling banyak']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? TERRA : NAVY) }));
    return { scene: sc, cam, upd(t, dur) {
      tt.rotation.y = t * .35; orbit(cam, 0, 6, 15, [0, .6, 0]);
      const ts = popAt(s, 'skor', 1.5); X.pop(score, seg(t, ts, ts + .4)); score.innerHTML = t > popAt(s, 'tiga dari tiga', 99) ? '3/3' : '?/3';
      L.forEach(l => { const tc = popAt(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) });
    } };
  },

  // ===== LORE BUMI #2: rumah vs pajak =====
  B_TAX_HOOK(s, root) {   // kamera setinggi air menyusuri kanal, stempel PAJAK menghantam layar
    const sc = newScene({ sky: ['#9CC4E4', '#F2F6FA'], sunPos: [-8, 12, 10], shadow: 18 }); sc.add(mesh(G.box(40, .5, 12), '#9A9A92', [0, -.25, -4]));
    const row = canalRow(sc, 12, -4.5, -8); water(sc, 40, 6, [0, -.3, 1.5]); const bt = boat(sc, [-2, -.15, 1.4]);
    const E1 = engHouse(sc, [9.5, 0, -6]); E1.scale.setScalar(.8); E1.userData.wins.forEach((w, i) => { if (i % 2) w.material = mat('#A0523A') });
    const cam = camera(42);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#FFFBF2F2', border: `8px solid ${NAVY}`, borderRadius: '40px', padding: '24px 30px', textAlign: 'center', fontSize: '58px', lineHeight: 1.12, color: NAVY, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 14px 0 ${TERRA}`, opacity: 0 }, root,
      `Rumah jadi <span style="color:${TERRA}">aneh</span><br>gara-gara...`);
    const stamp = X.ab({ left: 230, top: 640, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '170px', color: '#E5484D', border: '14px solid #E5484D', borderRadius: '24px', padding: '0 40px', transform: 'rotate(-12deg)', opacity: 0, background: '#FFFFFFCC' }, root, 'PAJAK');
    const L = [['📏 sempit banget', 'sempit'], ['↗️ miring', 'miring'], ['🧱 jendela ditutup bata', 'bata']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 1040 + i * 105, fontSize: '40px' }) }));
    return { scene: sc, cam, upd(t, dur) {
      const p = seg(t, 0, dur); cam.position.set(lerp(-7, 6, p), .9 + Math.sin(t) * .05, 7.5); cam.lookAt(lerp(-5, 7, p), 1.8, -4); bt.position.x = -2 + t * .4;
      X.pop(hook, seg(t, .1, .5)); const tp = popAt(s, 'pajak', 2.4); const q = seg(t, tp, tp + .25); stamp.style.opacity = q > 0 ? 1 : 0; stamp.style.transform = `rotate(-12deg) scale(${lerp(2.2, 1, E.out(q))})`;
      L.forEach(l => { const tc = popAt(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) }); if (t > tp + 1.2) stamp.style.opacity = 1 - seg(t, tp + 1.2, tp + 1.6);
    } };
  },
  B_CANAL(s, root) {   // drone di atas kanal: rumah tumbuh sempit-panjang, meteran di muka rumah
    const sc = newScene({ sky: ['#8CC3EA', '#EEF6FC'], sunPos: [10, 16, 6], shadow: 20 }); [-1, 1].forEach(sx => sc.add(mesh(G.box(12, .5, 30), '#9A9A92', [sx * 8, -.25, 0])));
    water(sc, 4.2, 30, [0, -.3, 0]); const L1 = canalRow(sc, 10, 0, -5); L1.forEach(h => { h.rotation.y = Math.PI / 2; h.position.set(-3.6, 0, h.position.x) });
    const R1 = canalRow(sc, 10, 0, -5); R1.forEach(h => { h.rotation.y = -Math.PI / 2; h.position.set(3.6, 0, h.position.x) });
    const bts = [boat(sc, [-.8, -.15, -3], '#3E8FC4'), boat(sc, [.8, -.15, 4], '#F5C542')]; const all = [...L1, ...R1];
    const tape = group(sc); tape.add(mesh(G.box(.06, .06, 1.1), '#E5484D', [0, 0, 0], { cast: false }));
    const tg = tag3(root, '📏 lebar muka = pajak', '#E5484D');
    const C1 = [['🏠 sempit di depan', 'sempit'], ['➡️ panjang ke belakang', 'memanjang'], ['💰 makin lebar, makin mahal', 'lebar, makin']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(1.6, 1, p), lerp(5.5, 3.2, p), lerp(13, 9, p)); cam.lookAt(-1.6, 1.8, lerp(-2, -3, p)); grow(all, t, .2, .06);
      bts.forEach((b, i) => b.position.z = (i ? 4 : -3) + Math.sin(t * .3 + i) * 2);
      const h = L1[3]; tape.position.set(-3.6 + h.userData.d / 2 + .3, .4, h.position.z); tape.scale.z = h.userData.w; const tl = popAt(s, 'lebar', 6); tape.visible = t > tl; tg.at(tape, cam, [0, .3, 0], seg(t, tl, tl + .4));
      C1.forEach(c => { const tc = popAt(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) });
    } };
  },
  B_HOIST(s, root) {   // kamera rendah menengadah: sofa naik pakai katrol, rumah condong ke depan
    const sc = newScene({ sky: ['#7FB6E3', '#EAF3FA'], sunPos: [6, 14, 12], shadow: 12 }); sc.add(mesh(G.box(16, .3, 10), '#9A9A92', [0, -.15, -2]));
    const H = canalHouse(sc, [0, 0, -1.6], 1, { w: 1.6, h: 5.4 }); const nb = [canalHouse(sc, [-1.66, 0, -1.6], 3, { w: 1.7, h: 4.6 }), canalHouse(sc, [1.7, 0, -1.6], 4, { w: 1.8, h: 5 })];
    const sofa = group(sc); sofa.add(mesh(G.box(1.2, .4, .5), '#2E7D5B', [0, 0, 0])); sofa.add(mesh(G.box(1.2, .4, .14), '#2E7D5B', [0, .3, -.18])); [-1, 1].forEach(x => sofa.add(mesh(G.box(.14, .5, .5), '#246B4C', [x * .6, .1, 0])));
    const rope = mesh(G.cyl(.02, .02, 1, 5), '#333', [0, 0, 0], { cast: false }); sc.add(rope);
    const P = person(sc, [2.2, 0, 1.2], { body: '#3E8FC4', s: 1 }); P.rotation.y = -.8;
    const cam = camera(44);
    const C = [['🪜 tangga curam & kecil', 'curam'], ['🪝 katrol di puncak atap', 'katrol'], ['↗️ sengaja condong ke depan', 'condong']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(lerp(3, 1.5, seg(t, 0, dur)), 1, 10.5); cam.lookAt(0, lerp(2.4, 3.6, E.inout(seg(t, 0, dur))), -1);
      const tk = popAt(s, 'katrol', 3), tc = popAt(s, 'condong', dur - 3); const lean = .07 * E.inout(seg(t, tc, tc + 1)); H.rotation.x = lean;
      const top = H.userData.h + .1, yy = lerp(.4, top - .6, E.inout(seg(t, tk, tk + 4))), zf = -1.6 + H.userData.d / 2 + .75 + Math.sin(lean) * top;
      sofa.position.set(0, yy, zf + .25); sofa.rotation.z = Math.sin(t * 2) * .05; rope.position.set(0, (yy + top) / 2 + .2, zf); rope.scale.y = Math.max(.1, top - yy);
      P.pose(t, { hold: true, look: .4 }); P.userData.st.arms.forEach(A => A.rotation.x = -2.3);
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) });
    } };
  },
  B_WINDOWS(s, root) {   // orbit rumah bata: jendela ditutup bata satu per satu, penghitung pajak turun
    const sc = newScene({ sky: ['#B9C6D2', '#EEF1F4'], sunPos: [-8, 12, 10], shadow: 12, hemi: 1.2 }); island(sc, 16, 14, '#7FA65A', '#6B5A44'); sc.add(mesh(G.box(16, .04, 2), '#A9A9A0', [0, .02, 4.5]));
    const Hs = engHouse(sc, [0, 0, 0]); [[-6, -3], [6, -3.5], [-6.5, 3]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.1, '#4E8F3A', 'round'));
    const V = X.TL.vars; const cnt = X.ab({ left: 620, top: 300, width: 400, background: CREAM, border: `6px solid ${NAVY}`, borderRadius: '26px', padding: '12px 18px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, color: NAVY, fontSize: '40px', opacity: 0, boxShadow: `0 8px 0 ${TERRA}` }, root, '');
    const C = [[`📅 mulai ${V.tahun}`, 'Mulai'], ['🪟 jendela banyak = pajak mahal', 'mahal'], ['🧱 ditutup pakai bata', 'menutup'], [`⏳ bertahan ${V.lama} tahun`, 'bertahan']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 1000 + i * 100, fontSize: '38px' }) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(-25, 20, E.inout(seg(t, 0, dur))), 3.4, 14, [0, 2.3, 0]); const tb = popAt(s, 'menutup', 6);
      let open = 0; Hs.userData.wins.forEach((w, i) => { const shut = t > tb + i * .35 && i % 3 !== 1; w.material = mat(shut ? '#8E4B3A' : '#9ED8F5'); if (!shut) open++ });
      X.pop(cnt, seg(t, popAt(s, 'pajak jendela', 2), popAt(s, 'pajak jendela', 2) + .4)); cnt.innerHTML = `🪟 ${open} jendela<br><span style="color:${TERRA}">💰 ${'🪙'.repeat(Math.max(1, Math.round(open / 2)))}</span>`;
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) });
    } };
  },
  B_TAX_ASK(s, root) {   // kavling Jakarta: Juragan Modal + Kepala Bumi di depan tiga papan A/B/C
    const sc = newScene({ sky: ['#7EC8F2', '#E7F6FF'], sunPos: [-8, 14, 10], fog: ['#E7F6FF', 30, 70] }); plot(sc, { city: true });
    const J = juragan([-1.2, 0, 1.2]), K = kepala([1.2, 0, 1.2]); sc.add(J, K); J.rotation.y = .3; K.rotation.y = -.3;
    const boards = [['A', '📏', '#E5484D', -1.9], ['B', '🪟', '#3E8FC4', 0], ['C', '🏢', '#F5C542', 1.9]].map(([l, e, c, x]) => { const g = group(sc, [x, 0, -1.4]); g.add(mesh(G.box(.12, 1.8, .12), '#7A4E2C', [0, .9, 0])); const sp = txtSprite(l, c, l === 'C' ? NAVY : '#fff', 1.3); sp.position.set(0, 2, 0); g.add(sp); return g });
    const cam = camera(42);
    const C = [['A 📏 lebar rumah', ' A '], ['B 🪟 jumlah jendela', ' B '], ['C 🏢 tinggi rumah', ' C '], ['🗳️ terbanyak = aturan kota', 'aturan']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 3 ? TERRA : NAVY) }));
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, Math.sin(t * .25) * 8, 2.6, lerp(14, 12, seg(t, 0, dur)), [0, 1.9, 0]); J.pose(t, { hold: true, shake: t > dur - 4 }); K.pose(t, { talk: true, point: (t % 4) < 1.5 });
      boards.forEach((b, i) => { const q = E.back(seg(t, 1 + i * .5, 1.4 + i * .5)); b.scale.setScalar(Math.max(.001, q)) });
      C.forEach((c, i) => { const q = i < 3 ? 1.2 + i * .5 + (popAt(s, 'dari apa', 2) - 1) : popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) });
    } };
  },

  // ===== HARI 2: kawasan usaha, penduduk dari like, pekerja tanpa rumah =====
  B2_HOOK(s, root) {   // papan kota sore: pasar tumbuh, kerumunan, lalu tanda tanya di atas pekerja
    const sc = newScene({ sky: ['#FFC48A', '#FFF1DE'], sunPos: [12, 14, 8], shadow: 20 }); const B = cityBoard(sc); B.userData.zones.usaha.forEach(m => m.visible = true);
    const items = [shop(sc, [-2, 0, -1.8], { sign: '#E5484D', awn: '#F5C542' }), shop(sc, [1.8, 0, -1.8], { w: 2.6, sign: '#2E7D5B', wall: '#F4F7FA' }), shop(sc, [-1.8, 0, 2], { awn: '#E5484D', sign: '#F5C542' }), tower(sc, [2, 0, 1.6], 3)];
    const ppl = Array.from({ length: 8 }, (_, i) => person(sc, [Math.sin(i * 2.1) * 2.4, 0, Math.cos(i * 1.7) * 2.2 + .2], { s: .55, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0', '#C9472F'][i % 6] }));
    const qs = [0, 3, 6].map(i => { const sp = txtSprite('?', GOLD, NAVY, .7); sc.add(sp); return [sp, ppl[i]] });
    const cam = camera(42);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: '#FFFBF2F2', border: `8px solid ${NAVY}`, borderRadius: '40px', padding: '22px 28px', textAlign: 'center', fontSize: '58px', lineHeight: 1.12, color: NAVY, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 14px 0 ${TERRA}`, opacity: 0 }, root,
      `Kalian pilih <span style="color:#3E8FC4">B · usaha</span>!<br><span style="font-size:48px;color:${TERRA}">tapi pekerjanya tidur di mana?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(-35, 10, E.inout(seg(t, 0, dur))), lerp(20, 9, E.inout(seg(t, 0, dur))), lerp(30, 17, E.inout(seg(t, 0, dur))), [0, .5, 0]); grow(items, t, .2, .15);
      ppl.forEach((p, i) => { p.pose(t + i, { walk: 1 }); const a = t * .4 + i; p.position.x = Math.sin(a) * 2.6; p.position.z = Math.cos(a * .8) * 2.4; p.rotation.y = a });
      const tq = popAt(s, 'tidur di mana', dur - 2); qs.forEach(([sp, p], i) => { sp.visible = t > tq + i * .2; sp.position.set(p.position.x, 1.5 + Math.sin(t * 4 + i) * .08, p.position.z) });
      X.pop(hook, seg(t, .1, .5));
    } };
  },
  B2_TALLY(s, root) {   // papan skor di angkasa dekat globe: batang suara + kartu komentar
    const sc = newScene({ sky: ['#0B1F3A', '#264E86'], hemi: .9, sunI: 2.6, sunPos: [8, 10, 12] }); stars(sc);
    const gl = globe(sc, 3, { highlight: ['Indonesia'] }); gl.position.set(0, -4.2, -2); gl.face(-6.2, 106.8); const V = X.TL.vars;
    const bar = (n, x, col) => Array.from({ length: n }, (_, i) => { const m = mesh(G.box(1.4, .55, 1.4), col, [x, -.6 + i * .58, 1.5]); sc.add(m); return m });
    const SB = bar(V.b, 1.3, '#3E8FC4'), SA = bar(V.a, -1.3, '#E5484D');
    const tb = tag3(root, `B · usaha: ${V.b}`, '#3E8FC4'), ta = tag3(root, `A · rumah: ${V.a}`, '#E5484D');
    const cc = V.komentar.slice(0, 1).map(([u, tx]) => X.ab({ left: 120, top: 1090, width: 840, background: '#FFFFFF', borderRadius: '28px', padding: '16px 24px', fontFamily: 'Fredoka', color: '#1E1E1E', border: `5px solid ${NAVY}`, boxShadow: '0 8px 0 #00000030', opacity: 0 }, root, `<div style="font-size:26px;color:#888">${u} · komentar</div><div style="font-size:40px;font-weight:700">“${tx}”</div>`))[0];
    const J = juragan([3.2, -.9, 1.5], { s: .9 }); sc.add(J); J.rotation.y = -.5;
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, Math.sin(t * .3) * 10, 1.8, 15.5, [0, 1.3, 1]);
      SB.forEach((m, i) => { const q = E.back(seg(t, .4 + i * .15, .7 + i * .15)); m.scale.setScalar(Math.max(.001, q)) }); SA.forEach((m, i) => { const q = E.back(seg(t, .6 + i * .15, .9 + i * .15)); m.scale.setScalar(Math.max(.001, q)) });
      tb.at(SB[SB.length - 1], cam, [0, .5, 0], seg(t, 1.2, 1.6)); ta.at(SA[SA.length - 1], cam, [0, .5, 0], seg(t, 1.4, 1.8));
      const tp = popAt(s, 'protes', 4); const q = seg(t, tp, tp + .4); cc.style.opacity = q; cc.style.transform = `translateY(${(1 - E.out(q)) * 30}px) rotate(-2deg)`;
      J.pose(t, { hold: true, shake: t > tp && t < tp + 2.5, nod: t > popAt(s, 'kepakai', dur - 1.5) });
    } };
  },
  B2_MARKET(s, root) {   // kamera setinggi orang menyusuri pasar: lapak, swalayan, kantor; koin keluar dari koper
    const sc = newScene({ sky: ['#8FD3FF', '#F4FBFF'], sunPos: [-8, 16, 8], shadow: 14 }); island(sc, 18, 22, '#9CCB6A', '#8D6E4A'); sc.add(mesh(G.box(3, .05, 22), '#8A8F96', [0, .03, 0]));
    const stalls = []; for (let i = 0; i < 4; i++) { const g = group(sc, [-3.2, 0, -7 + i * 2.6]); g.add(mesh(G.box(2, .8, 1.4), '#B5835A', [0, .4, 0])); g.add(mesh(G.box(2.3, .1, 1.8), ['#E5484D', '#F5C542', '#3E8FC4', '#2E7D5B'][i], [0, 1.9, 0], { rot: [.15, 0, 0] })); [-.9, .9].forEach(x => g.add(mesh(G.box(.08, 1.9, .08), '#7A4E2C', [x, .95, .7]))); [0, 1, 2].forEach(k => g.add(mesh(G.sph(.16, 8, 6), ['#F28C28', '#8BC34A', '#E5484D'][k], [-.5 + k * .5, .9, 0]))); stalls.push(g) }
    const swal = shop(sc, [3.6, 0, -5], { w: 3.4, d: 2.6, h: 1.8, sign: '#2E7D5B', wall: '#F4F7FA', awn: '#2E7D5B' }); swal.rotation.y = -Math.PI / 2;
    const offs = [tower(sc, [3.6, 0, 1], 3.4), tower(sc, [3.6, 0, 4], 2.6, '#C9D6E2')];
    const J = juragan([-1.5, 0, 3.5]); sc.add(J); J.rotation.y = 2.6; const coins = Array.from({ length: 14 }, () => coin(sc, [0, -5, 0], 1.3));
    const V = X.TL.vars; const C = [['🛒 pasar + swalayan', 'swalayan'], ['🏢 kantor kecil', 'kantor'], [`🪙 −${V.biaya} koin`, 'koin'], [`💼 sisa ${V.koin} koin`, 'tinggal']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? '#E5484D' : NAVY) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(1.2, 2.2, lerp(12, 5, p)); cam.lookAt(0, 1.3, lerp(2, -6, p));
      grow(stalls, t, popAt(s, 'pasar', .5), .2); grow([swal], t, popAt(s, 'swalayan', 2)); grow(offs, t, popAt(s, 'kantor', 3), .25);
      const tc = popAt(s, 'Juragan', .2); coins.forEach((c, i) => { const q = ((t - tc) * .6 + i / 14) % 1; c.visible = t > tc && t < tc + 4; c.position.set(-1.5 + Math.sin(i * 2.3) * q * 2, 1 + q * 3 - q * q * 3.5, 3.5 - q * 3); c.rotation.set(t * 5 + i, t * 3, 0) });
      J.pose(t, { hold: true, shake: t > popAt(s, 'keringetan', dur - 1.5) });
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) });
    } };
  },
  B2_BUS(s, root) {   // bus datang ke halte, penduduk baru turun satu per satu, penghitung naik
    const sc = newScene({ sky: ['#7EC8F2', '#E7F6FF'], sunPos: [10, 14, 8], shadow: 14 }); island(sc, 22, 14, '#9CCB6A', '#8D6E4A'); sc.add(mesh(G.box(22, .05, 3), '#8A8F96', [0, .03, 2]));
    const stop = group(sc, [1, 0, -.6]); stop.add(mesh(G.box(3, .1, 1.2), '#3E8FC4', [0, 2.2, 0])); [-1.4, 1.4].forEach(x => stop.add(mesh(G.box(.1, 2.2, .1), '#555', [x, 1.1, -.4]))); stop.add(mesh(G.box(2.6, .3, .5), '#C9D6E2', [0, .5, -.3]));
    const bus = group(sc); bus.add(mesh(G.box(5, 1.8, 1.8), '#2E7D5B', [0, 1.1, 0])); bus.add(mesh(G.box(4.6, .6, 1.82), '#9ED8F5', [0, 1.5, 0], { cast: false })); [-1.6, 1.6].forEach(x => [-1, 1].forEach(z => bus.add(mesh(G.cyl(.35, .35, .2, 12), '#222', [x, .35, z * .9], { rot: [Math.PI / 2, 0, 0] }))));
    const V = X.TL.vars; const ppl = Array.from({ length: V.baru }, (_, i) => person(sc, [0, 0, 0], { s: .75, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4', '#D9772B', '#6B4FA0', '#C9472F', '#F5C542', '#4A4A52'][i % 8] }));
    const big = X.ab({ left: 0, top: 980, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '130px', color: '#FFFFFF', WebkitTextStroke: `14px ${NAVY}`, paintOrder: 'stroke fill', opacity: 0 }, root, '');
    const C = [[`❤ ${V.like} like`, 'totalnya'], ['10 like = +1 penduduk', 'sepuluh like']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '42px' }, i ? NAVY : '#E5484D') }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(-25, 15, E.inout(seg(t, 0, dur))), 3.5, 14, [0, 1.2, .6]); const tb = popAt(s, 'turun dari bus', 4);
      bus.position.set(lerp(-14, 1, E.out(seg(t, tb - 2.5, tb))), 0, 2);
      let n = 0; ppl.forEach((p, i) => { const q = seg(t, tb + i * .45, tb + i * .45 + 1.4); p.visible = q > 0; if (q > 0) n++; p.position.set(1.8 - i * .55 + q * 0, 0, lerp(1.6, -1.4 + (i % 2) * .5, q)); p.rotation.y = Math.PI; p.pose(t + i, { walk: q < 1 ? 1 : 0, wave: q >= 1 }) });
      X.pop(big, seg(t, tb, tb + .3)); big.innerHTML = `👥 ${2 + n}`;
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) });
    } };
  },
  B2_NIGHT(s, root) {   // malam di pasar: pekerja tidur di lapak, lampu jalan; bayangan rumah + jalan + bus muncul sebagai ide
    const sc = newScene({ sky: ['#1B2A4A', '#3E5F8A'], hemi: .9, sunI: 1.2, sun: '#AFC6FF', sunPos: [-6, 10, 6], shadow: 12 }); stars(sc); island(sc, 18, 16, '#6E8F5A', '#5E4A36');
    const stalls = [-3, 0, 3].map((x, i) => { const g = group(sc, [x, 0, -1]); g.add(mesh(G.box(2.2, .8, 1.4), '#8E6A4A', [0, .4, 0])); g.add(mesh(G.box(2.4, .1, 1.8), ['#E5484D', '#F5C542', '#3E8FC4'][i], [0, 1.9, 0])); [-1, 1].forEach(k => g.add(mesh(G.box(.08, 1.9, .08), '#5A3A22', [k, .95, .7]))); return g });
    const sleepers = [-3, 0, 3].map((x, i) => { const p = person(sc, [x, .85, -1], { s: .7, body: ['#2E7D5B', '#8E2F3A', '#3E8FC4'][i] }); p.rotation.z = Math.PI / 2; p.rotation.y = .2; return p });
    const zz = sleepers.map(() => { const sp = txtSprite('z', '#FFFFFF', NAVY, .5); sc.add(sp); return sp });
    const lamps = [-5.5, 5.5].map(x => { const g = group(sc, [x, 0, 2]); g.add(mesh(G.cyl(.06, .06, 3, 6), '#333', [0, 1.5, 0])); g.add(mesh(G.sph(.25, 10, 8), '#FFE7A0', [0, 3.1, 0], { mat: { emissive: '#FFD86B', emissiveIntensity: 1.5 } })); const L = new THREE.PointLight('#FFD86B', 6, 9); L.position.set(0, 3, 0); g.add(L); return g });
    const ghost = [house(sc, [-4, 0, 5], { w: 1.6, d: 1.4, h: 1.1, wall: '#FFF3D6', roofC: '#C9472F' }), house(sc, [-1.8, 0, 5.3], { w: 1.6, d: 1.4, h: 1.1, wall: '#F3E1C4', roofC: '#B5452B' })];
    ghost.forEach(h => h.traverse(o => { if (o.material) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = .45; o.material.emissive = new THREE.Color('#FFE7A0'); o.material.emissiveIntensity = .3 } }));
    const road = mesh(G.box(1.2, .06, 6), '#FFE7A0', [1.5, .05, 4], { cast: false, mat: { transparent: true, opacity: .5 } }); sc.add(road);
    const V = X.TL.vars; const cc = X.ab({ left: 120, top: 300, width: 840, background: '#FFFFFF', borderRadius: '28px', padding: '16px 24px', fontFamily: 'Fredoka', color: '#1E1E1E', border: `5px solid ${NAVY}`, boxShadow: '0 8px 0 #00000030', opacity: 0 }, root, `<div style="font-size:26px;color:#888">${V.komentar[1][0]} · komentar</div><div style="font-size:40px;font-weight:700">“${V.komentar[1][1]}”</div>`);
    const C = [['🏠 kawasan tinggal', 'kawasan tinggal'], ['🛣️ jalan + 🚌 angkutan', 'angkutan']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 470 + i * 105, fontSize: '42px' }, '#2E7D5B') }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(20, -15, E.inout(seg(t, 0, dur))), 4, 13, [0, 1, 1.5]);
      zz.forEach((sp, i) => { const q = (t * .5 + i * .3) % 1; sp.position.set(sleepers[i].position.x + q * .5, 1.6 + q * 1.2, -1); sp.material.opacity = 1 - q });
      const tk = popAt(s, 'tempat kerja', 2), tg = popAt(s, 'kawasan tinggal', dur - 4); const q = seg(t, tk, tk + .4); cc.style.opacity = q; cc.style.transform = `translateY(${(1 - E.out(q)) * 30}px) rotate(-2deg)`;
      ghost.forEach((h, i) => { const k = E.back(seg(t, tg + i * .2, tg + .4 + i * .2)); h.visible = k > 0; h.scale.setScalar(Math.max(.001, k)) }); road.visible = t > popAt(s, 'jalan dan', dur - 2.5);
      C.forEach(c => { const qq = popAt(s, c.cu, 99); X.pop(c.e, seg(t, qq, qq + .4)) });
    } };
  },
  B2_IDEAS(s, root) {   // dinding papan usulan di balai kota Bumi: kartu usulan menempel, Kepala Bumi memilah
    const sc = newScene({ sky: ['#9FD6F5', '#F3FBFF'], sunPos: [-6, 12, 10], shadow: 12 }); island(sc, 16, 12, '#9CCB6A', '#8D6E4A');
    const wall = group(sc, [0, 0, -2]); wall.add(mesh(G.box(9, 4.4, .3), '#E8D9B5', [0, 2.6, 0])); wall.add(mesh(G.box(9.4, .3, .5), TERRA, [0, 4.9, 0])); [-4.4, 4.4].forEach(x => wall.add(mesh(G.box(.3, 5, .4), '#9C6B3E', [x, 2.5, 0])));
    const V = X.TL.vars; const notes = V.usulan.map((u, i) => { const c = document.createElement('canvas'); c.width = 256; c.height = 160; const x = c.getContext('2d'); x.fillStyle = ['#FFF59D', '#B3E5FC', '#FFCCBC', '#C8E6C9'][i % 4]; x.fillRect(0, 0, 256, 160); x.fillStyle = NAVY; x.font = '700 40px Fredoka'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(u, 128, 84);
      const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.2), new THREE.MeshStandardMaterial({ map: tx })); m.position.set(-3.1 + (i % 4) * 2.07, 3.6 - Math.floor(i / 4) * 1.6, .17); m.rotation.z = ((i * 37) % 10 - 5) / 60; wall.add(m); return m });
    const K = kepala([3, 0, 1.4]); sc.add(K); K.rotation.y = -.6; const J = juragan([-3, 0, 1.6]); sc.add(J); J.rotation.y = .6;
    const cam = camera(42); const big = chip(root, `👥 kota baru ${V.pend} orang`, { left: 230, top: 1060, fontSize: '46px' }, TERRA);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1, 1, p), 3, lerp(17, 15, p)); cam.lookAt(0, 2.6, -2);
      notes.forEach((m, i) => { const q = E.back(seg(t, .3 + i * .35, .6 + i * .35)); m.scale.setScalar(Math.max(.001, q)) });
      K.pose(t, { talk: true, point: (t % 4) < 1.6 }); J.pose(t, { hold: true, nod: true }); const tb = popAt(s, 'baru', dur - 3); X.pop(big, seg(t, tb, tb + .4));
    } };
  },
  B2_ASK(s, root) {   // globe malam + kartu "tulis 1 bangunan"; contoh komentar bergulir
    const sc = newScene({ sky: ['#0B1F3A', '#264E86'], hemi: .8, sunI: 2.8, sunPos: [10, 8, 12] }); stars(sc);
    const gl = globe(sc, 3.6, { highlight: ['Indonesia'] }); gl.position.y = -1.6; gl.pin(-6.2, 106.8);
    const blds = ['🏥', '🚉', '🏫', '⚓', '✈️'].map((e, i) => { const sp = txtSprite(e, '#FFFFFF', NAVY, .9); sc.add(sp); return sp });
    const cam = camera(40);
    const C = [['🚫 nggak ada A/B', 'Nggak ada'], ['✍️ tulis 1 bangunan', 'satu bangunan'], ['🏗️ terbanyak = dibangun', 'langsung dibangun'], ['❤ 10 like = +1 penduduk', 'sepuluh like']].map(([tx, cu], i) => ({ cu, e: chip(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? TERRA : NAVY) }));
    return { scene: sc, cam, upd(t, dur) {
      gl.rotation.y = -106.8 * Math.PI / 180 + Math.sin(t * .3) * .25; gl.rotation.x = -.11; orbit(cam, Math.sin(t * .2) * 6, 2.4, 17, [0, .2, 0]);
      blds.forEach((b, i) => { const a = t * .6 + i * 1.256; b.position.set(Math.sin(a) * 5, 1.2 + Math.sin(t * 2 + i) * .2, Math.cos(a) * 2); b.visible = t > popAt(s, 'satu bangunan', 2) });
      C.forEach(c => { const q = popAt(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) });
    } };
  },
};

// HUD bumi + kartu judul adegan + transisi pesawat kertas
let hud, title, tSub, sweep, plane, hv = {};
export function chrome(ctx) {
  const st = ctx.TL.vars.state;
  hud = ctx.ab({ left: 36, top: 56, height: 104, display: 'flex', gap: '12px', alignItems: 'center', zIndex: 8 }, ctx.ov);
  const pill = (k, html, bg) => { const e = ctx.ab({ position: 'relative', background: bg, border: `5px solid ${NAVY}`, borderRadius: '22px', padding: '10px 20px', fontSize: '38px', fontWeight: 700, color: bg === NAVY ? GOLD : NAVY, fontFamily: 'Fredoka', boxShadow: '0 6px 0 #00000040' }, hud, html); e.style.position = 'relative'; hv[k] = e; return e };
  pill('hari', `HARI ${st.hari}`, NAVY); pill('pend', `👥 ${st.penduduk}`, CREAM); pill('koin', `🪙 ${st.koin.toLocaleString('id-ID')}`, CREAM); pill('neg', `🌍 ${st.negara.length}`, CREAM);
  title = ctx.ab({ left: 0, top: 196, width: 1080, textAlign: 'center', zIndex: 8 }, ctx.ov);
  tSub = null;
  sweep = ctx.ab({ left: -200, top: -200, width: 1600, height: 2400, background: CREAM, zIndex: 9, display: 'none', transform: 'rotate(-18deg)' }, ctx.ov);
  sweep.innerHTML = `<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#00000008 0 2px,transparent 2px 60px),repeating-linear-gradient(0deg,#00000008 0 2px,transparent 2px 60px)"></div>`;
  plane = ctx.ab({ left: 0, top: 0, width: 240, height: 240, zIndex: 10, display: 'none' }, ctx.ov, `<svg viewBox="0 0 100 100" width="240" height="240"><path d="M5 50 L95 10 L60 92 L48 58 Z" fill="#fff" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/><path d="M48 58 L95 10" stroke="${NAVY}" stroke-width="3"/></svg>`);
}
export function frame(T, idx, t) {
  const S = X.TL.scenes, s = S[idx];
  const q = seg(t, .15, .55), out = seg(t, 2.6, 3);
  title.innerHTML = `<span style="display:inline-block;background:${NAVY};color:${GOLD};font-family:Fredoka;font-weight:700;font-size:46px;padding:10px 34px;border-radius:999px;border:5px solid ${GOLD};box-shadow:0 8px 0 #00000040">${s.kicker}<span style="color:#fff;font-size:34px;font-weight:600"> · ${s.sub}</span></span>`;
  title.style.opacity = q * (1 - out); title.style.transform = `translateY(${(1 - E.back(q)) * -40}px)`;
  // transisi di batas adegan
  let w = -1; S.forEach((x, i) => { if (i) { const p = (T - (x.start - .32)) / .64; if (p >= 0 && p <= 1) w = p } });
  if (w < 0) { sweep.style.display = 'none'; plane.style.display = 'none'; return }
  const x = lerp(-1900, 1500, E.inout(w)); sweep.style.display = 'block'; sweep.style.left = x + 'px';
  plane.style.display = 'block'; plane.style.left = (x + 1550) + 'px'; plane.style.top = (lerp(1500, 300, w)) + 'px'; plane.style.transform = 'rotate(-20deg)';
}
