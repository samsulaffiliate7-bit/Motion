// Dunia 3D akun Kades Magang Juara: diorama desa ala game, siang cerah.
// Bahasa visual khas: kamera terbang tinggi lalu menukik, benda "pop" dari tanah, HUD game (hari/penduduk/anggaran),
// label kuning, transisi kilat putih.
import { THREE, clamp, lerp, seg, E, mat, mesh, G, group, newScene, camera, orbit, island, tree, house, person, rain } from './kit.js';

let X; const GREEN = '#8BC34A', DG = '#5E9B2F', YEL = '#FFC93C', CREAM = '#FFF6D6', INK = '#23411F';
const SUNNY = o => Object.assign({ sky: ['#7CC6F2', '#E6F6FF'], sunPos: [10, 18, 8], hemi: 1.2, shadow: 14 }, o);
const kades = (p, o = {}) => person(o.parent, p, Object.assign({ body: '#F3E6C4', pants: '#4A5A3A', hat: 'peci', skin: '#C98E64', tie: YEL }, o));
const warga = (p, i, o = {}) => person(o.parent, p, Object.assign({ body: ['#3E8FC4', '#E07B39', '#C2457A', '#6B8E5A'][i % 4], pants: '#4A4A4A', skin: ['#E2A97E', '#C98E64', '#B97A52'][i % 3], hair: '#2A1A10' }, o));
const card = (root, html, css = {}, col = INK) => { const e = X.ab(Object.assign({ background: CREAM, border: `7px solid ${INK}`, borderRadius: '30px', padding: '12px 26px', fontSize: '42px', fontWeight: 700, color: col, whiteSpace: 'nowrap', boxShadow: `0 10px 0 ${DG}`, fontFamily: 'Fredoka' }, css), root, html); e.style.opacity = 0; return e };
const at = (s, rx, fb) => X.C(s, rx, fb);
function tag3(root, html, col = INK) { const w = X.ab({ left: 0, top: 0 }, root); const e = card(w, html, { position: 'relative', transform: 'translate(-50%,-100%)', fontSize: '34px', padding: '6px 18px' }, col);
  return { at(obj, cam, off, p) { const [x, y] = X.proj(obj, cam, off); w.style.left = x + 'px'; w.style.top = y + 'px'; e.style.opacity = p > 0 ? 1 : 0; e.style.transform = `translate(-50%,-100%) scale(${p > 0 ? E.back(Math.min(1, p)) : 0})` } } }

// potongan jalan: profil cembung (tinggi dilebihkan supaya terlihat), lapisan aspal + fondasi + tanah
function roadSection(parent, o = {}) {
  const w = o.w || 6, h = o.crown ?? .35, len = o.len || 6, g = group(parent, o.p || [0, 0, 0]);
  const shape = new THREE.Shape(); shape.moveTo(-w / 2, 0); for (let i = 1; i <= 20; i++) { const x = -w / 2 + w * i / 20; shape.lineTo(x, h * (1 - Math.pow(2 * x / w, 2))) } shape.lineTo(w / 2, -.25); shape.lineTo(-w / 2, -.25); shape.lineTo(-w / 2, 0);
  const asp = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: len, bevelEnabled: false }), mat('#3B3F45')); asp.position.z = -len / 2; asp.castShadow = asp.receiveShadow = true; g.add(asp);
  if (o.flat) asp.scale.y = .02 / Math.max(h, .01) * 0 + (h ? .05 : 1);
  g.add(mesh(G.box(w, .6, len), '#B7A27A', [0, -.55, 0])); g.add(mesh(G.box(w + 4, 1.2, len), '#8D6E4A', [0, -1.45, 0]));
  [-1, 1].forEach(sx => { const d = group(g, [sx * (w / 2 + .55), 0, 0]); d.add(mesh(G.box(.12, .7, len), '#A9A9A9', [-.4, -.3, 0])); d.add(mesh(G.box(.12, .7, len), '#A9A9A9', [.4, -.3, 0])); d.add(mesh(G.box(.9, .1, len), '#8C8C8C', [0, -.62, 0]));
    g.add(mesh(G.box(1.4, .5, len), GREEN, [sx * (w / 2 + 1.75), -.25, 0])) });
  for (let z = -len / 2 + .6; z < len / 2; z += 1.2) g.add(mesh(G.box(.12, .03, .6), '#F2F2F2', [0, h + .01, z], { cast: false }));
  g.userData = { w, h, len }; return g;
}
function drops(parent, n, w, h, flat) {   // butiran air: jatuh, lalu meluncur ke pinggir (cembung) atau diam di tengah (rata)
  const list = Array.from({ length: n }, (_, i) => { const m = mesh(G.sph(.07, 8, 6), '#4FA3DB', [0, -5, 0], { cast: false, mat: { emissive: '#4FA3DB', emissiveIntensity: .3 } }); parent.add(m); return m });
  return t => list.forEach((m, i) => { const q = ((t * .45) + i / n) % 1, x0 = (((i * 37) % 100) / 100 - .5) * w * .9, z = (((i * 61) % 100) / 100 - .5) * 5;
    if (q < .35) { m.position.set(x0, lerp(4, h * (1 - Math.pow(2 * x0 / w, 2)) + .06, q / .35), z) }
    else if (flat) { const k = (q - .35) / .65; m.position.set(x0 * (1 - k * .7), .08, z * (1 - k * .5)) }
    else { const k = E.in((q - .35) / .65), sx = x0 < 0 ? -1 : 1, x = lerp(x0, sx * (w / 2 + .55), k); m.position.set(x, Math.max(-.5, h * (1 - Math.pow(2 * x / w, 2)) + .06 - (Math.abs(x) > w / 2 ? (Math.abs(x) - w / 2) * 1.2 : 0)), z) } });
}
function village(sc) {   // diorama desa (low-poly ala game)
  island(sc, 16, 16, GREEN, '#8D6E4A'); sc.add(mesh(G.box(2.4, .1, 16), '#4A4F56', [0, .05, 0]));
  [-1, 1].forEach(s => sc.add(mesh(G.box(.4, .06, 16), '#7A8A9A', [s * 1.45, .03, 0])));
  [[-3.6, -4, '#FFF3D6', '#D9603B', .15], [3.8, -3, '#FCE9C8', '#C9472F', -.2], [-3.8, 3, '#F5F0E0', '#E07B39', .1], [4, 4, '#FFF6D6', '#B5452B', -.1]].forEach(([x, z, w, r, rot]) => house(sc, [x, 0, z], { wall: w, roofC: r, rot: rot + (x > 0 ? -Math.PI / 2 : Math.PI / 2) }));
  [[-6.5, -6.5], [6.5, -6.6], [6.6, 6], [-6.5, 6.4], [6.2, 0], [-6.8, .5], [-2.8, 7]].forEach(([x, z], i) => tree(sc, [x, 0, z], .9 + (i % 3) * .2, '#4E8F3A', i % 2 ? 'palm' : 'round'));
}


// lahan Hari N: tanah kosong + jalan setapak, opsi sumur, tenda, rumah
function lahan(sc, o = {}) {
  island(sc, 18, 18, GREEN, '#8D6E4A'); sc.add(mesh(G.box(2, .06, 18), '#C9A36B', [0, .03, 0]));
  [[-7.5, -7.5], [7.4, -7.6], [7.6, 7], [-7.5, 7.4], [7.2, 0], [-7.8, .5]].forEach(([x, z], i) => tree(sc, [x, 0, z], .9 + (i % 3) * .2, '#4E8F3A', i % 2 ? 'palm' : 'round'));
  const out = {};
  if (o.well) { const w = group(sc, [2.2, 0, -1.5]); w.add(mesh(G.cyl(.7, .7, .7, 14), '#B8C1CB', [0, .35, 0])); w.add(mesh(G.cyl(.55, .55, .72, 14), '#3E8FC4', [0, .37, 0])); w.add(mesh(G.box(.1, 1.4, .1), '#7A4E2C', [-.6, .9, 0])); w.add(mesh(G.box(.1, 1.4, .1), '#7A4E2C', [.6, .9, 0])); w.add(mesh(G.cone(.95, .5, 4), '#C9472F', [0, 1.85, 0], { rot: [0, Math.PI / 4, 0] })); out.well = w }
  if (o.tents) out.tents = [-5, -2.6, 2.6, 5, -5].map((x, i) => { const t = group(sc, [x, 0, i === 4 ? 4.5 : 3]); t.add(mesh(G.cone(.9, 1.2, 4), ['#E07B39', '#3E8FC4', '#F2C14E', '#C2457A', '#6B8E5A'][i], [0, .6, 0], { rot: [0, Math.PI / 4, 0] })); t.add(mesh(G.box(.3, .5, .05), '#2A2A2A', [0, .25, .62])); return t });
  return out;
}
function rowHouses(parent, x0, z, gap, n = 5, cols) { return Array.from({ length: n }, (_, i) => house(parent, [x0 + i * (1.6 + gap), 0, z], { w: 1.6, d: 1.8, h: 1.3, roofH: .7, wall: (cols || ['#FFF3D6', '#FCE9C8', '#F5F0E0', '#FFE7C8', '#EDE3D0'])[i % 5], roofC: ['#D9603B', '#C9472F', '#E07B39', '#B5452B', '#D9603B'][i % 5] })) }
function commentCard(root, user, text, top, left) { return X.ab({ left, top, width: 720, background: '#FFFFFF', borderRadius: '30px', padding: '18px 26px', fontFamily: 'Fredoka', color: '#1E1E1E', boxShadow: '0 10px 0 #00000030', opacity: 0, border: `5px solid ${INK}` }, root,
  `<div style="display:flex;align-items:center;gap:14px"><div style="width:58px;height:58px;border-radius:50%;background:#C9D6E2;display:flex;align-items:center;justify-content:center;font-size:30px">👤</div><div><div style="font-size:28px;color:#888">${user} · komentar</div><div style="font-size:44px;font-weight:700">${text}</div></div></div>`) }


// ===== Side Quest: perkakas =====
function txtSprite(text, bg, fg = '#fff', size = 1) {   // gelembung huruf (A/B, +1) sebagai sprite
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  x.fillStyle = bg; x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.arc(128, 128, 110, 0, Math.PI * 2); x.fill(); x.stroke();
  x.fillStyle = fg; x.font = `700 ${text.length > 2 ? 90 : 140}px Fredoka`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 128, 138);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true })); sp.scale.set(size, size, 1); return sp;
}
const sit = p => { p.userData.st.legs.forEach(L => L.rotation.x = -1.45); p.position.y = -.48 };
function ballotBox(parent, p) {
  const g = group(parent, p); g.add(mesh(G.box(2.4, .12, 1.4), '#9C6B3E', [0, 1.05, 0])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => g.add(mesh(G.box(.12, 1.05, .12), '#7A4E2C', [x * 1.05, .52, z * .55])));
  const box = mesh(G.box(1.2, 1, 1), '#FFFFFF', [0, 1.61, 0]); g.add(box); g.add(mesh(G.box(.7, .04, .12), '#1E1E1E', [0, 2.12, 0], { cast: false }));
  g.add(mesh(G.box(1.22, .25, 1.02), YEL, [0, 1.5, 0])); g.userData.slot = [0, 2.15, 0]; return g;
}
function pendopo(parent, p) {
  const g = group(parent, p); g.add(mesh(G.box(7.4, .3, 7.4), '#C9A36B', [0, .15, 0])); g.add(mesh(G.box(5.4, .03, 5.4), '#C2457A', [0, .31, 0], { cast: false }));
  g.add(mesh(G.box(4.8, .035, 4.8), '#F2C14E', [0, .32, 0], { cast: false }));
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => g.add(mesh(G.cyl(.16, .16, 3.4, 8), '#7A4E2C', [x * 3.3, 2, z * 3.3])));
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#9A3B24')); roof.scale.set(6.6, 1.8, 6.6); roof.rotation.y = Math.PI / 4; roof.position.y = 4.6; roof.castShadow = true; g.add(roof);
  roof.visible = false; g.userData.roof = roof; return g;
}
function noticeBoard(parent, p) {
  const g = group(parent, p); [-1, 1].forEach(x => g.add(mesh(G.box(.22, 3.6, .22), '#7A4E2C', [x * 2.1, 1.8, 0])));
  g.add(mesh(G.box(4.6, 2.6, .18), '#9C6B3E', [0, 2.3, 0])); g.add(mesh(G.box(4.2, 2.2, .05), '#D9B98A', [0, 2.3, .1]));
  g.add(mesh(G.box(5, .16, .9), '#C9472F', [0, 3.75, .2], { rot: [.35, 0, 0] }));
  [[-1.3, 2.8, .1], [0, 2.75, -.06], [1.3, 2.85, .08], [-.7, 1.75, -.05], [.8, 1.8, .07]].forEach(([x, y, r]) => g.add(mesh(G.box(1, .75, .02), '#FFFFFF', [x, y, .14], { rot: [0, 0, r], cast: false })));
  return g;
}
function gapura(parent, p) {
  const g = group(parent, p); [-1, 1].forEach(x => { g.add(mesh(G.box(.9, 3.6, .9), '#E8DCC2', [x * 2.4, 1.8, 0])); g.add(mesh(G.box(1.1, .3, 1.1), '#C9472F', [x * 2.4, 3.75, 0])); g.add(mesh(G.cone(.6, .7, 4), '#C9472F', [x * 2.4, 4.25, 0], { rot: [0, Math.PI / 4, 0] })) });
  const beam = mesh(G.box(5.6, .7, .5), YEL, [0, 3.3, 0]); g.add(beam); g.userData.beam = beam; return g;
}

function canvasPlane(w, h, draw, pw = 512) {   // papan/kertas bergambar (teks, peta) dari canvas
  const c = document.createElement('canvas'); c.width = pw; c.height = Math.round(pw * h / w); const x = c.getContext('2d'); draw(x, c.width, c.height);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: .9 }));
  m.userData.redraw = f => { x.clearRect(0, 0, c.width, c.height); f(x, c.width, c.height); t.needsUpdate = true }; return m;
}
const signText = (txt, bg = YEL) => (x, W, H) => { x.fillStyle = bg; x.fillRect(0, 0, W, H); x.strokeStyle = INK; x.lineWidth = 14; x.strokeRect(7, 7, W - 14, H - 14);
  x.fillStyle = INK; let fs = 88; x.font = `700 ${fs}px Fredoka`; while (x.measureText(txt).width > W - 50 && fs > 30) { fs -= 4; x.font = `700 ${fs}px Fredoka` } x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, W / 2, H / 2 + 6) };
function reeds(parent, x, z, n = 6) { const g = group(parent, [x, 0, z]); for (let i = 0; i < n; i++) { const h = .8 + (i % 3) * .3; g.add(mesh(G.cyl(.03, .03, h, 4), '#5E8F3A', [Math.sin(i * 2.3) * .3, h / 2, Math.cos(i * 1.7) * .3], { rot: [Math.sin(i) * .15, 0, Math.cos(i) * .15] })); g.add(mesh(G.cyl(.06, .06, .22, 6), '#7A5230', [Math.sin(i * 2.3) * .3, h, Math.cos(i * 1.7) * .3])) } return g }
function tarum(parent, x, z) { const g = group(parent, [x, 0, z]); g.add(mesh(G.ico(.45, 0), '#4E8F3A', [0, .4, 0])); [0, 1, 2, 3].forEach(i => g.add(mesh(G.sph(.08, 6, 5), '#5B5FC7', [Math.sin(i * 1.6) * .35, .65 + (i % 2) * .1, Math.cos(i * 1.6) * .35], { cast: false }))); return g }

function cat(parent, p) {   // kucing oyen low-poly
  const g = group(parent, p); const O = '#F28C28'; g.add(mesh(G.box(.5, .28, .26), O, [0, .3, 0])); const hd = group(g, [.3, .5, 0]); hd.add(mesh(G.box(.26, .24, .24), O, [0, 0, 0]));
  [-1, 1].forEach(z => hd.add(mesh(G.cone(.06, .12, 4), O, [0, .17, z * .07]))); [-1, 1].forEach(z => hd.add(mesh(G.sph(.025, 6, 4), '#1E1E1E', [.13, .03, z * .06], { cast: false })));
  [[-.18, -.08], [-.18, .08], [.18, -.08], [.18, .08]].forEach(([x, z]) => g.add(mesh(G.box(.07, .18, .07), O, [x, .09, z])));
  const tail = mesh(G.box(.06, .06, .34), O, [-.3, .45, 0], { rot: [0, Math.PI / 2, .6] }); g.add(tail); g.userData = { tail, hd }; return g;
}
function crop(parent, x, z, col) { const g = group(parent, [x, 0, z]); g.add(mesh(G.cyl(.04, .04, .5, 4), '#5E8F3A', [0, .25, 0])); g.add(mesh(G.ico(.22, 0), '#4E8F3A', [0, .5, 0])); g.add(mesh(G.sph(.1, 6, 5), col, [.1, .55, .1], { cast: false })); return g }
function posRonda(parent, p) { const g = group(parent, p); g.add(mesh(G.box(2.4, .3, 2), '#9C6B3E', [0, .55, 0])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => g.add(mesh(G.box(.14, 2.4, .14), '#7A4E2C', [x * 1.1, 1.2, z * .9])));
  const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#C9472F')); r.scale.set(2.2, .9, 1.9); r.rotation.y = Math.PI / 4; r.position.y = 2.8; r.castShadow = true; g.add(r);
  const kent = mesh(G.cyl(.14, .14, .7, 8), '#C9A36B', [1.05, 1.6, .95]); g.add(kent); return g }

export async function setup(ctx) { X = ctx }

export const SHOTS = {
  K3_HOOK(s, root) {
    const sc = newScene(SUNNY()); village(sc); const K = kades([0, 0, 5]); sc.add(K); const ws = [0, 1, 2].map(i => { const w = warga([-1 + i, 0, -5], i); sc.add(w); return w });
    const cam = camera(42); const tc = tag3(root, 'tengahnya lebih tinggi!', '#C9472F');
    const hook = X.ab({ left: 70, top: 300, width: 940, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '22px 26px', textAlign: 'center', fontSize: '54px', lineHeight: 1.12, color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${DG}` }, root,
      `Sementara itu di desa:<br><span style="color:#C98A00">kenapa jalan dibuat cembung?</span>`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-40, 20, p), lerp(24, 8, p), lerp(30, 16, p), [0, 0, 1]);
      K.position.z = lerp(5, -2, t / dur); K.rotation.y = Math.PI; K.pose(t, { walk: 1 }); ws.forEach((w, i) => { w.position.z = -5 + ((t * .6 + i * 3) % 10); w.pose(t + i, { walk: 1 }) });
      X.pop(hook, seg(t, .1, .5)); const tt = at(s, 'lebih tinggi', 4); tc.at(K, cam, [0, 2.6, 0], seg(t, tt, tt + .4));
    } };
  },

  K3_HOOK2(s, root) {
    const sc = newScene(SUNNY()); const L = lahan(sc, { well: true, tents: true }); const K = kades([0, 0, 1]); sc.add(K);
    const conf = Array.from({ length: 40 }, (_, i) => { const m = mesh(G.box(.12, .02, .2), ['#FFC93C', '#3E8FC4', '#E5484D', '#8BC34A'][i % 4], [0, -5, 0], { cast: false }); sc.add(m); return m });
    const cam = camera(42);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '22px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${DG}` }, root,
      `Hari 2: kalian pilih <span style="color:#3E8FC4">B · sumur</span>!<br><span style="font-size:44px;color:#C9472F">tapi ada masalah baru...</span>`);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(-30, 25, p), lerp(20, 9, p), lerp(30, 18, p), [0, .5, .5]);
      K.pose(t, { cheer: t < 4, talk: t >= 4 }); L.well.scale.setScalar(Math.max(.001, E.back(seg(t, .6, 1.2))));
      conf.forEach((c, i) => { const q = (t * .35 + i / 40) % 1; c.position.set(Math.sin(i * 2.1) * 5, lerp(9, 0, q), Math.cos(i * 1.7) * 5); c.rotation.set(t * 3 + i, t * 2, 0); c.visible = t < 5 });
      X.pop(hook, seg(t, .1, .5)) } };
  },
  K3_COMMENTS(s, root) {
    const sc = newScene(SUNNY({ sky: ['#9ED8F5', '#F2FAFF'] })); lahan(sc, { tents: true }); const K = kades([0, 0, 2]); sc.add(K); K.rotation.y = .3;
    const book = mesh(G.box(.4, .5, .08), '#8B5A2B', [0, -.55, .15]); K.userData.st.arms[1].add(book);
    const cam = camera(40); const C = X.TL.vars.komentar; const cards = C.map(([u, tx], i) => commentCard(root, u, `“${tx}”`, 300 + i * 190, i ? 290 : 70));
    const note = X.ab({ left: 70, top: 720, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '36px', color: INK, background: YEL, padding: '8px 20px', borderRadius: '14px', border: `5px solid ${INK}`, opacity: 0 }, root, '📒 dicatat di buku desa');
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .3) * 1.2, 2.6, 7.5 - t * .1); cam.lookAt(0, 1.6, 2); K.pose(t, { hold: true, nod: true });
      const t1 = at(s, 'air', 1), t2 = at(s, 'rumah', 3.5); [[cards[1], t1], [cards[0], t2]].forEach(([e, tc]) => { const q = seg(t, tc, tc + .4); e.style.opacity = q; e.style.transform = `translateY(${(1 - E.out(q)) * 40}px) rotate(${e === cards[0] ? 2 : -2}deg)` });
      X.pop(note, seg(t, at(s, 'catat', dur - 2), at(s, 'catat', dur - 2) + .4)) } };
  },
  K3_SUMUR(s, root) {
    const sc = newScene(SUNNY()); const L = lahan(sc, { well: true, tents: true });
    const rig = group(sc, [2.2, 0, -1.5]); [0, 1, 2].forEach(i => rig.add(mesh(G.cyl(.05, .05, 3.4, 6), '#555', [Math.cos(i * 2.1) * .8, 1.6, Math.sin(i * 2.1) * .8], { rot: [Math.sin(i * 2.1) * .25, 0, -Math.cos(i * 2.1) * .25] })));
    const drill = mesh(G.cyl(.08, .08, 2.6, 8), '#333', [0, 1.3, 0]); rig.add(drill);
    const spray = Array.from({ length: 30 }, () => { const m = mesh(G.sph(.08, 6, 5), '#7FC4E8', [0, -5, 0], { cast: false, mat: { emissive: '#7FC4E8', emissiveIntensity: .4 } }); sc.add(m); return m });
    const q = [0, 1, 2, 3].map(i => { const w = warga([2.2, 0, .2 + i * .9], i); sc.add(w); w.rotation.y = Math.PI; const b = mesh(G.cyl(.15, .12, .25, 10), ['#E5484D', '#3E8FC4', '#F2C14E', '#2E9C6A'][i], [0, -.6, .1]); w.userData.st.arms[1].add(b); return w });
    const cam = camera(42); const c1 = card(root, `💰 biaya sumur: ${X.TL.vars.juta_sumur} juta`, { left: 70, top: 300 }), c2 = card(root, `sisa anggaran: <span style="color:${DG}">${X.TL.vars.juta_sisa} juta</span>`, { left: 70, top: 410 }), c3 = card(root, '🪣 warga antre air bersih', { left: 70, top: 520 }, '#3E8FC4');
    return { scene: sc, cam, upd(t, dur) { const tb = at(s, 'Biayanya', 3), ta = at(s, 'antre', dur - 3); const built = seg(t, tb - 1, tb);
      drill.rotation.y = t * 8; drill.position.y = 1.3 - (t % 1) * .3; rig.visible = built < 1; L.well.scale.setScalar(Math.max(.001, E.back(seg(t, tb - .3, tb + .3))));
      spray.forEach((d, i) => { const k = (t * .8 + i / 30) % 1; d.visible = t > tb - .2 && t < tb + 2.5; d.position.set(2.2 + Math.sin(i * 2.3) * k * 1.4, .8 + k * 3 - k * k * 3.6, -1.5 + Math.cos(i * 1.9) * k * 1.4) });
      q.forEach((w, i) => { w.visible = t > ta - .4; w.pose(t + i, { hold: true, look: Math.sin(t + i) * .3 }) });
      orbit(cam, lerp(30, 5, seg(t, 0, dur)), 8, 19, [1.6, .8, .5]); X.pop(c1, seg(t, tb, tb + .4)); X.pop(c2, seg(t, tb + .8, tb + 1.2)); X.pop(c3, seg(t, ta, ta + .4)) } };
  },
  K3_FAMILIES(s, root) {
    const sc = newScene(SUNNY({ sky: ['#F7B77A', '#FFF0D9'], sun: '#FFC58A', sunPos: [-12, 7, 6] })); const L = lahan(sc, { well: true, tents: true });
    const fam = []; L.tents.forEach((tn, i) => { [0, 1].forEach(k => { const w = warga([tn.position.x + (k ? .6 : -.6), 0, tn.position.z + 1], i + k, { s: k ? .7 : 1 }); sc.add(w); fam.push(w) }) });
    const ghosts = rowHouses(sc, -5.6, -4.5, 1.3); ghosts.forEach(h => h.traverse(o => { if (o.material) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = .35 } }));
    const fire = mesh(G.cone(.25, .5, 6), '#F28C28', [0, .25, 5.6], { mat: { emissive: '#F28C28', emissiveIntensity: 1 } }); sc.add(fire);
    const cam = camera(42); const c1 = card(root, '⛺ 5 keluarga masih di tenda', { left: 70, top: 300 }, '#C9472F'), c2 = card(root, '🏠 desa butuh rumah', { left: 70, top: 410 });
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-20, 15, seg(t, 0, dur)), 10, 21, [0, .6, .5]); fam.forEach((w, i) => w.pose(t + i, { look: Math.sin(t * .5 + i) * .4 })); fire.scale.y = 1 + Math.sin(t * 15) * .2;
      const tr = at(s, 'butuh', dur - 2.5); ghosts.forEach((h, i) => { const q = E.back(seg(t, tr + i * .12, tr + .4 + i * .12)); h.visible = q > 0; h.scale.setScalar(Math.max(.001, q)) });
      X.pop(c1, seg(t, at(s, 'tenda', 3), at(s, 'tenda', 3) + .4)); X.pop(c2, seg(t, tr, tr + .4)) } };
  },
  K3_CHOICE(s, root) {
    const A = s.variant === 'A'; const sc = newScene(SUNNY(A ? {} : { sky: ['#9ED8A0', '#F2FBF4'] })); const L = lahan(sc, {});
    const hs = A ? rowHouses(sc, -3.2, -3, 0) : rowHouses(sc, -6.4, -3, 1.6);
    const yards = A ? [] : hs.map(h => { const y = mesh(G.box(2.6, .05, 2.4), '#6FB04A', [h.position.x, .04, -2.6], { cast: false }); sc.add(y); tree(sc, [h.position.x + 1, 0, -1.6], .5); return y });
    const flames = A ? hs.map(h => { const f = group(sc, [h.position.x, 2.2, -3]); f.add(mesh(G.cone(.4, 1, 6), '#F28C28', [0, 0, 0], { mat: { emissive: '#F28C28', emissiveIntensity: 1.2 } })); f.add(mesh(G.cone(.25, .7, 6), '#FFD54A', [0, -.1, .1], { mat: { emissive: '#FFD54A', emissiveIntensity: 1.2 } })); f.visible = false; return f }) : [];
    const cam = camera(42); const V = X.TL.vars;
    const big = X.ab({ left: 820, top: 300, width: 170, height: 170, borderRadius: '50%', background: A ? '#FFC93C' : '#3E8FC4', border: `8px solid ${INK}`, color: A ? INK : '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px' }, root, A ? 'A' : 'B');
    const L1 = A ? [[`💰 ${V.juta_a} juta · sisa ${V.juta_sisa_a} juta`, 'Biayanya', INK], ['📏 lahan hemat, rumah sempit', 'hemat', INK], ['🔥 api gampang merambat', 'merambat', '#C9472F']]
      : [[`💰 ${V.juta_b} juta · sisa ${V.juta_sisa_b} juta`, 'Biayanya', INK], ['🌳 ada halaman, lega & terang', 'lega', DG], ['🛡️ lebih aman', 'aman', DG]];
    const chips = L1.map(([tx, cu, col], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, col) }));
    return { scene: sc, cam, upd(t, dur) { X.pop(big, seg(t, 0, .4)); hs.forEach((h, i) => { const q = E.back(seg(t, .4 + i * .15, .8 + i * .15)); h.scale.setScalar(Math.max(.001, q)) });
      orbit(cam, lerp(A ? -25 : 25, A ? 10 : -10, seg(t, 0, dur)), 9, A ? 19 : 27, [0, .8, -2.5]);
      if (A) { const tm = at(s, 'merambat', dur - 2); flames.forEach((f, i) => { f.visible = t > tm + i * .35; f.scale.set(1, 1 + Math.sin(t * 14 + i) * .2, 1) }) }
      chips.forEach(c => { const tc = at(s, c.cu, 99); X.pop(c.e, seg(t, tc, tc + .4)) }) } };
  },
  K3_VOTE(s, root) {
    const sc = newScene(SUNNY()); lahan(sc, { well: true, tents: true }); const K = kades([0, 0, 2.4]); sc.add(K);
    const cam = camera(42);
    const btn = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '30px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:#FFC93C;color:${INK};font-family:Fredoka;font-weight:700;font-size:96px;width:300px;padding:20px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">A<div style="font-size:34px">rumah deret</div></div><div style="background:#3E8FC4;color:#fff;font-family:Fredoka;font-weight:700;font-size:96px;width:300px;padding:20px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">B<div style="font-size:34px">rumah berjarak</div></div>`);
    const c1 = card(root, '💬 komentar menarik bisa masuk video', { left: 120, top: 640, fontSize: '36px' });
    return { scene: sc, cam, upd(t, dur) { orbit(cam, t * 6 - 15, 4, 10, [0, 1.2, 2]); K.pose(t, { wave: true, talk: true }); const q = seg(t, .3, .8); btn.style.opacity = q; btn.style.transform = `scale(${E.back(q)})`;
      X.pop(c1, seg(t, at(s, 'menarik', 2.5), at(s, 'menarik', 2.5) + .4)) } };
  },
  K3_SECTION(s, root) {
    const sc = newScene(SUNNY({ sky: ['#8FA6BA', '#D8E3EC'], hemi: 1 })); const R = roadSection(sc, {}); const dr = drops(sc, 60, 6, R.userData.h, false); const rn = rain(sc, 260, 12, 8);
    const cam = camera(40); const t1 = card(root, '💧 air mengalir ke pinggir', { left: 70, top: 300 }, '#3E8FC4'), t2 = card(root, '➜ masuk selokan', { left: 70, top: 410 }), t3 = card(root, '☀️ jalan cepat kering', { left: 70, top: 520 }, DG);
    return { scene: sc, cam, upd(t, dur) { dr(t); rn.tick(t); orbit(cam, lerp(-12, 12, seg(t, 0, dur)), 5, 25, [0, -.6, 0]);
      [[t1, 'pinggir'], [t2, 'selokan'], [t3, 'kering']].forEach(([e, cu]) => { const tc = at(s, cu, 99); X.pop(e, seg(t, tc, tc + .4)) }) } };
  },
  K3_COMPARE(s, root) {   // jalan rata: genangan, lubang, nyamuk
    const sc = newScene(SUNNY({ sky: ['#9DB4C6', '#E2EBF2'] })); const R = roadSection(sc, { crown: 0 });
    const pud = mesh(G.cyl(1.8, 1.8, .03, 28), '#5FA8D8', [0, .02, 0], { mat: { transparent: true, opacity: .8, roughness: .1 }, cast: false }); sc.add(pud);
    const hole = mesh(G.cyl(.5, .45, .2, 10), '#1E1E1E', [1, -.05, 1.6], { cast: false }); sc.add(hole);
    const mos = Array.from({ length: 10 }, () => { const m = mesh(G.box(.08, .05, .14), '#1E1E1E', [0, 0, 0], { cast: false }); sc.add(m); return m });
    const cam = camera(40); const t1 = card(root, '🚫 air menggenang di tengah', { left: 70, top: 300 }, '#C9472F'), t2 = card(root, '🕳️ aspal rusak, jadi lubang', { left: 70, top: 410 }), t3 = card(root, '🦟 tempat nyamuk bertelur', { left: 70, top: 520 }, '#C9472F');
    return { scene: sc, cam, upd(t, dur) {
      const tg = at(s, 'menggenang', 1), tl = at(s, 'lubang', 5), tn = at(s, 'nyamuk', 8);
      pud.scale.setScalar(Math.max(.01, E.out(seg(t, tg, tg + 2)))); hole.scale.setScalar(Math.max(.01, E.back(seg(t, tl, tl + .5)))); hole.visible = t > tl;
      mos.forEach((m, i) => { m.visible = t > tn; m.position.set(Math.sin(t * 3 + i) * 1.2, .6 + Math.sin(t * 7 + i * 2) * .3 + (i % 3) * .2, Math.cos(t * 2.5 + i * 1.7) * 1.2) });
      orbit(cam, lerp(25, 5, seg(t, 0, dur)), 8, 21, [0, -.3, .5]);
      [[t1, tg], [t2, tl], [t3, tn]].forEach(([e, tc]) => X.pop(e, seg(t, tc, tc + .4)));
    } };
  },
  K3_NUMBERS(s, root) {   // ukuran: lebar 5 m, tengah ±5 cm, kemiringan 2%
    const sc = newScene(SUNNY({ sky: ['#BFE6C8', '#F2FBF4'] })); const R = roadSection(sc, { crown: .6, len: 3 });
    const cam = camera(40); const V = X.TL.vars;
    const dimW = tag3(root, `lebar ${V.lebar} m`, INK), dimH = tag3(root, `± ${V.tinggi_cm} cm`, '#C9472F'), sl = [tag3(root, `${V.miring}%`, '#3E8FC4'), tag3(root, `${V.miring}%`, '#3E8FC4')];
    const ar = group(sc, [0, 0, 1.6]); ar.add(mesh(G.box(6, .04, .04), '#C9472F', [0, -.05, 0], { cast: false })); ar.add(mesh(G.box(.04, .65, .04), '#C9472F', [0, .3, 0], { cast: false }));
    const note = card(root, '(digambar dilebihkan biar kelihatan)', { left: 150, top: 1150, fontSize: '30px' }), soil = card(root, 'jalan tanah: lebih miring', { left: 70, top: 300 }, '#8D6E4A');
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(0, 1.6, 24); cam.lookAt(0, -.3, 0);
      const tm = at(s, 'persen', 1), tw = at(s, 'meter', 4), tc = at(s, 'senti', 6), ts = at(s, 'Jalan tanah', dur - 2.5);
      sl[0].at(R, cam, [-1.6, .55, 1.5], seg(t, tm, tm + .4)); sl[1].at(R, cam, [1.6, .55, 1.5], seg(t, tm, tm + .4)); dimW.at(ar, cam, [0, -.15, 0], seg(t, tw, tw + .4)); dimH.at(ar, cam, [0, .75, 0], seg(t, tc, tc + .4));
      ar.visible = t > tw; X.pop(note, seg(t, tc + .5, tc + .9)); X.pop(soil, seg(t, ts, ts + .4));
    } };
  },
  K3_TIPS(s, root) {   // jalan desa yang benar: cembung, selokan, selokan bersih; jangan timbun pasir di pinggir
    const sc = newScene(SUNNY()); const R = roadSection(sc, { len: 10 }); const K = kades([4.2, .0, 1]); sc.add(K); K.rotation.y = -Math.PI / 2;
    const trash = [0, 1, 2, 3].map(i => { const m = mesh(G.box(.3, .2, .3), ['#E5484D', '#F5C542', '#FFFFFF', '#3E8FC4'][i], [-3.55, -.3, -1 + i * .7]); sc.add(m); return m });
    const sand = mesh(G.cone(.9, .7, 10), '#E0C48A', [3.6, .1, -2.5]); sc.add(sand);
    const cam = camera(42);
    const L = [['✅ tengah sedikit cembung', 'cembung'], ['✅ selokan kiri dan kanan', 'selokan'], ['✅ selokan tidak tersumbat', 'tersumbat'], ['❌ jangan timbun tanah di pinggir', 'menimbun']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, i === 3 ? '#C9472F' : INK) }));
    return { scene: sc, cam, upd(t, dur) {
      orbit(cam, lerp(-30, 30, E.inout(seg(t, 0, dur))), 10, 24, [0, -.5, 0]); K.pose(t, { point: (t % 4) < 1.6, talk: true });
      const tt = at(s, 'tersumbat', 8); trash.forEach((m, i) => { const q = seg(t, tt + .6 + i * .15, tt + 1 + i * .15); m.position.y = -.3 + E.in(q) * 3; m.visible = q < 1 });
      const tm = at(s, 'menimbun', dur - 6); sand.visible = t > tm - .1; sand.scale.setScalar(Math.max(.01, E.back(seg(t, tm, tm + .5))));
      L.forEach(l => { const tc = at(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) });
    } };
  },

  // ===== SIDE QUEST #1: kenapa nggak tanya warga =====
  K3_SQ_HOOK(s, root) {   // kamera terbang tinggi lalu menukik ke kades yang bingung; popup quest + kartu komentar
    const sc = newScene(SUNNY()); village(sc); const K = kades([0, 0, 2]); sc.add(K);
    const ws = [0, 1, 2, 3].map(i => { const w = warga([[-3, 0, -1], [3, 0, -.5], [-2.2, 0, 4.5], [2.4, 0, 4.2]][i], i); sc.add(w); w.lookAt(0, 0, 2); return w });
    const cam = camera(42); const V = X.TL.vars;
    const quest = X.ab({ left: 90, top: 290, width: 900, background: INK, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, color: YEL, fontSize: '76px', border: `8px solid ${YEL}`, boxShadow: '0 14px 0 #00000040', opacity: 0 }, root,
      `❗ SIDE QUEST<div style="font-size:40px;color:${CREAM}">kenapa kades nggak tanya warga?</div>`);
    const cc = commentCard(root, V.komentar[0], `“${V.komentar[1]}”`, 560, 140); cc.style.width = '800px'; { const ds = cc.querySelectorAll('div'); ds[ds.length - 1].style.fontSize = '38px' }
    const q1 = tag3(root, '❓', INK);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, 3.2)); orbit(cam, lerp(70, 15, p), lerp(30, 3.2, p), lerp(34, 9, p), [0, 1.2, 2]);
      if (t > 3.2) orbit(cam, 15 - (t - 3.2) * 2, 3.2, 9 - (t - 3.2) * .15, [0, 1.2, 2]);
      K.pose(t, { shake: t < 5, talk: t >= 5, look: Math.sin(t * 1.3) * .3 }); ws.forEach((w, i) => w.pose(t + i, { nod: i % 2 === 0, bounce: i === 1 }));
      X.pop(quest, seg(t, .15, .55)); const tq = at(s, 'tanya warga', 2.2), tk = at(s, 'kolom komentar', dur - 2.5);
      const qq = seg(t, tq, tq + .4); cc.style.opacity = qq; cc.style.transform = `translateY(${(1 - E.out(qq)) * 40}px) rotate(-2deg)`; q1.at(K, cam, [0, 2.7, 0], seg(t, 2.6, 3));
      if (t > tk) { cc.style.boxShadow = `0 0 0 ${8 + Math.sin(t * 10) * 4}px ${YEL}` }
    } };
  },
  K3_SQ_BALLOT(s, root) {   // kamera rendah menengadah: gelembung komentar A/B jatuh dari langit ke kotak suara
    const sc = newScene(SUNNY({ sky: ['#6FB9EC', '#E6F6FF'] })); lahan(sc, { well: true, tents: true }); const B = ballotBox(sc, [0, 0, 2]);
    const K = kades([-2.2, 0, 2.6]); sc.add(K); K.rotation.y = .5;
    const bubs = Array.from({ length: 12 }, (_, i) => { const sp = txtSprite(i % 5 === 3 ? 'A' : 'B', i % 5 === 3 ? '#FFC93C' : '#3E8FC4', i % 5 === 3 ? INK : '#fff', 1.5); sc.add(sp); return sp });
    const cam = camera(44); const lb = tag3(root, '🗳️ kotak suara desa', INK);
    const c1 = card(root, '💬 1 komentar = 1 suara', { left: 70, top: 300 }), c2 = card(root, '👥 warganya = KALIAN', { left: 70, top: 410 }, '#3E8FC4');
    return { scene: sc, cam, upd(t, dur) {
      cam.position.set(lerp(2.5, .5, seg(t, 0, dur)), lerp(1.2, 2.6, seg(t, 0, dur)), 12.5); cam.lookAt(-.6, lerp(4.4, 2.4, E.inout(seg(t, 0, dur))), 1.5);
      K.pose(t, { point: true, talk: true }); K.userData.st.arms[0].rotation.x = -2.4;
      const t0 = at(s, 'komentar A', 3);
      bubs.forEach((b, i) => { const q = seg(t, t0 + i * .5, t0 + i * .5 + 1.6); b.visible = q > 0 && q < 1; const x = Math.sin(i * 2.7) * 2.2 * (1 - E.in(q));
        b.position.set(x, lerp(9, 2.3, E.in(q)), 2 + Math.cos(i * 1.3) * .6 * (1 - q)); b.scale.setScalar(1.5 * (1 - q * .55)) });
      B.position.y = Math.max(0, Math.sin((t - t0) * 9) * .04);
      lb.at(B, cam, [0, 2.6, 0], seg(t, .4, .8)); X.pop(c2, seg(t, at(s, 'kalian', 1.8), at(s, 'kalian', 1.8) + .4)); X.pop(c1, seg(t, at(s, 'satu suara', 6), at(s, 'satu suara', 6) + .4));
    } };
  },
  K3_SQ_TALLY(s, root) {   // dua tumpukan balok suara tumbuh satu per satu; kamera dolly menyamping
    const sc = newScene(SUNNY({ sky: ['#A7DDF7', '#F4FBFF'] })); lahan(sc, { well: true }); const V = X.TL.vars;
    const stack = (n, x, col) => Array.from({ length: n }, (_, i) => { const m = mesh(G.box(1.3, .4, 1.3), col, [x, .2 + i * .42, 0]); m.add(mesh(G.box(1.32, .05, 1.32), INK, [0, .2, 0], { cast: false })); sc.add(m); return m });
    const SB = stack(V.b, 1.6, '#3E8FC4'), SA = stack(V.a, -1.6, '#FFC93C');
    const tb = tag3(root, `B · sumur: ${V.b}`, '#3E8FC4'), ta = tag3(root, `A · jalan: ${V.a}`, '#C98A00');
    const win = card(root, '🏆 suara terbanyak menang', { left: 70, top: 300 }, DG), well = card(root, '💧 sumur dibangun duluan', { left: 70, top: 410 }, '#3E8FC4');
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      const tS = at(s, 'sumur', 2), tA = at(s, 'jalan', 4.5);
      SB.forEach((m, i) => { const q = E.back(seg(t, tS + i * .17, tS + i * .17 + .35)); m.visible = q > 0; m.scale.setScalar(Math.max(.001, q)) });
      SA.forEach((m, i) => { const q = E.back(seg(t, tA + i * .17, tA + i * .17 + .35)); m.visible = q > 0; m.scale.setScalar(Math.max(.001, q)) });
      cam.position.set(lerp(-5, 4, E.inout(seg(t, 0, dur))), 3.6, 17); cam.lookAt(0, 2.1, 0);
      tb.at(SB[SB.length - 1], cam, [0, .6, 0], seg(t, tS + SB.length * .17, tS + SB.length * .17 + .4)); ta.at(SA[SA.length - 1], cam, [0, .6, 0], seg(t, tA + .3, tA + .7));
      const tw = at(s, 'terbanyak', dur - 3), tw2 = at(s, 'duluan', dur - 1.5); X.pop(win, seg(t, tw, tw + .4)); X.pop(well, seg(t, tw2 - .6, tw2 - .2));
      if (t > tw) SB.forEach(m => m.material = mat(Math.sin(t * 8) > 0 ? '#3E8FC4' : '#5BA8DD'));
    } };
  },
  K3_SQ_MUSYAWARAH(s, root) {   // tampak atas pendopo: warga duduk melingkar; kamera crane turun
    const sc = newScene(SUNNY({ sky: ['#F7C98A', '#FFF3DE'], sun: '#FFD9A0', sunPos: [-10, 14, 6] })); island(sc, 18, 18, GREEN, '#8D6E4A');
    [[-7.5, -7.5], [7.4, -7.6], [7.6, 7], [-7.5, 7.4]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.1, '#4E8F3A', i % 2 ? 'palm' : 'round'));
    const P = pendopo(sc, [0, 0, 0]); const ring = Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2, w = (i === 0 ? kades : warga)([Math.sin(a) * 1.9, .31, Math.cos(a) * 1.9], i); sc.add(w); w.lookAt(0, .31, 0); return w });
    const bub = txtSprite('💬', '#FFFFFF', INK, .9); sc.add(bub);
    const L = [['🧎 duduk bareng', 'duduk'], ['🗣️ semua boleh bicara', 'bicara'], ['🤝 cari mufakat', 'mufakat'], ['🗳️ buntu? suara terbanyak', 'buntu']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, i === 3 ? '#3E8FC4' : INK) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur));
      cam.position.set(Math.sin(t * .12) * 2, lerp(19, 7.5, p), lerp(3, 11, p)); cam.lookAt(0, .8, 0);
      const ti = Math.floor(t / 1.6) % 8; ring.forEach((w, i) => { w.pose(t + i, { talk: i === ti, nod: i !== ti && i % 3 === 0 }); sit(w); if (i === ti) w.userData.st.arms[0].rotation.x = -1.1 });
      bub.position.copy(ring[ti].position).add(new THREE.Vector3(0, 2.1, 0));
      const tb = at(s, 'buntu', dur - 3); if (t > at(s, 'mufakat', 99)) ring.forEach(w => { w.userData.st.arms[0].rotation.x = t > tb ? -2.6 * (w.position.x > 0 ? 1 : 0) : -.6 });
      L.forEach(l => { const tc = at(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) });
    } };
  },
  K3_SQ_RULES(s, root) {   // push-in ke papan pengumuman desa, aturan muncul satu per satu
    const sc = newScene(SUNNY({ sky: ['#8CCDF2', '#EAF7FF'] })); island(sc, 16, 12, GREEN, '#8D6E4A'); sc.add(mesh(G.box(16, .05, 2.2), '#C9A36B', [0, .03, 3.2]));
    const NB = noticeBoard(sc, [0, 0, 0]); [[-5.5, -3], [5.5, -3.4], [-6, 2.5]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.1, '#4E8F3A', i % 2 ? 'palm' : 'round'));
    const K = kades([3.2, 0, 1.8]); sc.add(K); K.rotation.y = -.7; const w1 = warga([-3.4, 0, 2.6], 1); sc.add(w1); w1.rotation.y = .9;
    const R = [['1 akun = 1 suara', 'satu suara'], ['komentar dobel ❌ dihitung 2x', 'dua kali'], ['komentar menarik ➜ jadi kejadian', 'kejadian'], ['sepi? kades putuskan sendiri', 'memutuskan']].map(([tx, cu], i) => ({ cu, e: card(root, `${i + 1}. ${tx}`, { left: 60, top: 405 + i * 105, fontSize: '38px' }, i === 1 ? '#C9472F' : INK) }));
    const hd = card(root, '📌 ATURAN MAIN DESA', { left: 60, top: 290, background: YEL }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-2, 1, p), lerp(2.6, 2.4, p), lerp(13, 8.5, p)); cam.lookAt(0, 2, 0);
      K.pose(t, { point: (t % 5) < 2, talk: true }); w1.pose(t, { nod: true }); X.pop(hd, seg(t, .3, .7));
      R.forEach(r => { const tc = at(s, r.cu, 99); X.pop(r.e, seg(t, tc, tc + .4)) });
    } };
  },
  K3_SQ_GATE(s, root) {   // kamera mengikuti warga baru masuk lewat gapura; tiap orang = +1 penduduk
    const sc = newScene(SUNNY({ sky: ['#7CC6F2', '#FFF0D9'] })); village(sc); const GP = gapura(sc, [0, 0, 6.2]);
    const news = Array.from({ length: 6 }, (_, i) => { const w = warga([0, 0, 11], i + 1); sc.add(w); return w }); const plus = news.map(() => { const sp = txtSprite('+1', DG, '#fff', .8); sc.add(sp); return sp });
    const K = kades([1.6, 0, 4.4]); sc.add(K); K.rotation.y = -.4; const cam = camera(42);
    const gt = tag3(root, 'DESA KITA', INK);
    const big = X.ab({ left: 70, top: 300, width: 940, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '20px 24px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '50px', color: INK, boxShadow: `0 12px 0 ${DG}`, opacity: 0 }, root,
      `komentar <span style="background:${YEL};padding:0 14px;border-radius:12px">WARGA</span><div style="font-size:40px;color:${DG}">= 👥 +1 penduduk</div>`);
    const nx = card(root, '➡️ Hari 3: rumah warga', { left: 200, top: 1130, fontSize: '40px' }, '#C9472F');
    return { scene: sc, cam, upd(t, dur) {
      const tq = at(s, 'WARGA', 2.5); news.forEach((w, i) => { const q = seg(t, tq + i * .9, tq + i * .9 + 3.2); w.visible = q > 0; w.position.set((i % 3 - 1) * .9, 0, lerp(11, 3.6, q)); w.rotation.y = Math.PI; w.pose(t + i, { walk: q < 1 ? 1 : 0, wave: q >= 1 });
        const pp = plus[i]; const k = seg(t, tq + i * .9 + 1.6, tq + i * .9 + 2.6); pp.visible = k > 0 && k < 1; pp.position.set(w.position.x, 2.6 + k * 1.4, w.position.z) });
      cam.position.set(lerp(-4, -2, seg(t, 0, dur)), 3.4, lerp(18, 15.5, seg(t, 0, dur))); cam.lookAt(0, 1.8, 5);
      K.pose(t, { wave: true, talk: true }); X.pop(big, seg(t, tq, tq + .4)); X.pop(nx, seg(t, at(s, 'Hari 3', dur - 2), at(s, 'Hari 3', dur - 2) + .4));
    } };
  },

  // ===== SIDE QUEST #2: desa belum punya nama =====
  K3_SQ_NONAME(s, root) {   // push-in ke papan gapura kosong "DESA ???", lalu tarik mundur memperlihatkan desa
    const sc = newScene(SUNNY({ sky: ['#6FB9EC', '#FFF3D6'] })); lahan(sc, { well: true, tents: true }); const GP = gapura(sc, [0, 0, 5]);
    const sign = canvasPlane(5.2, .62, signText('DESA ???')); sign.position.set(0, 3.3, 5.26); sc.add(sign);
    const K = kades([1.4, 0, 6.4]); sc.add(K); K.rotation.y = .2; const q = txtSprite('?', CREAM, INK, .8); sc.add(q);
    const cam = camera(42);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: INK, border: `8px solid ${YEL}`, borderRadius: '30px', padding: '18px 24px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, color: YEL, fontSize: '72px', boxShadow: '0 14px 0 #00000040', opacity: 0 }, root,
      `❗ SIDE QUEST<div style="font-size:42px;color:${CREAM}">desa ini belum punya nama!</div>`);
    return { scene: sc, cam, upd(t, dur) {
      const p = E.inout(seg(t, 0, 3)), b = E.inout(seg(t, 3, dur)); cam.position.set(lerp(0, 3, b), lerp(3.3, 5.5, b), lerp(19.5, 25, b) - (1 - p) * 1.5); cam.lookAt(0, lerp(3.2, 1.8, b), 3);
      K.pose(t, { shake: true, talk: t > 1 }); K.userData.st.arms[0].rotation.x = -2.6; q.position.set(1.4, 3 + Math.sin(t * 4) * .1, 6.4); q.visible = t > 1.2;
      X.pop(hook, seg(t, .2, .6)); const tn = at(s, 'belum punya nama', dur - 2.5); if (t > tn) sign.scale.setScalar(1 + Math.sin(t * 12) * .03);
    } };
  },
  K3_SQ_MAP(s, root) {   // tampak atas peta kertas di meja: ikon air, tumbuhan, bukit muncul
    const sc = newScene(SUNNY({ sky: ['#E9D4B0', '#FFF6E6'], hemi: 1.3 })); sc.add(mesh(G.box(14, .4, 10), '#8B5A2B', [0, -.2, 0]));
    const map = canvasPlane(8, 6, (x, W, H) => { x.fillStyle = '#F3E3BE'; x.fillRect(0, 0, W, H); x.strokeStyle = '#B89A62'; x.lineWidth = 8; x.strokeRect(10, 10, W - 20, H - 20);
      x.strokeStyle = '#4FA3DB'; x.lineWidth = 16; x.beginPath(); x.moveTo(30, 90); x.bezierCurveTo(180, 40, 220, 250, 480, 200); x.stroke();
      x.fillStyle = '#8BC34A'; [[120, 300], [170, 330], [90, 340]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 22, 0, 7); x.fill() });
      x.fillStyle = '#A0826D'; [[360, 330], [410, 300]].forEach(([a, b]) => { x.beginPath(); x.moveTo(a - 40, b + 30); x.lineTo(a, b - 30); x.lineTo(a + 40, b + 30); x.fill() }) }, 512);
    map.rotation.set(-Math.PI / 2, 0, Math.PI / 2); map.position.y = .01; sc.add(map);
    const icons = [['💧', 1.2, -1.5], ['🌿', -1.6, -2.4], ['⛰️', -1.5, 2]].map(([e, x, z]) => { const sp = txtSprite(e, '#FFFFFF', INK, 1.1); sp.position.set(x, .9, z); sc.add(sp); return sp });
    const L = [['💧 dari air', 'air'], ['🌿 dari tumbuhan', 'tumbuhan'], ['⛰️ dari bentuk tanah', 'bentuk tanah']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(Math.sin(t * .2) * .6, lerp(17, 14.5, seg(t, 0, dur)), 2.6); cam.lookAt(0, 0, .3);
      L.forEach((l, i) => { const tc = at(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)); const q = seg(t, tc, tc + .4); icons[i].visible = q > 0; icons[i].scale.setScalar(1.1 * E.back(q) + .001); icons[i].position.y = .9 + Math.sin(t * 3 + i) * .08 }) } };
  },
  K3_SQ_RIVER(s, root) {   // kamera menyusuri sungai; semak tarum berbunga biru
    const sc = newScene(SUNNY({ sky: ['#86CBEF', '#EEF9FF'] })); island(sc, 14, 22, GREEN, '#8D6E4A');
    const riv = []; for (let i = 0; i < 12; i++) { const m = mesh(G.box(2.4, .08, 2), '#4FA3DB', [Math.sin(i * .6) * 1.6, .02, -10 + i * 1.8], { cast: false, mat: { roughness: .2 } }); sc.add(m); riv.push(m) }
    const bushes = []; for (let i = 0; i < 10; i++) bushes.push(tarum(sc, Math.sin(i * .6 * 1.8 / 1.8) * 1.6 + (i % 2 ? 2.4 : -2.4), -9 + i * 2));
    [[-5.5, -6], [5.5, -2], [-5.4, 4], [5.6, 7]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1.1, '#4E8F3A', i % 2 ? 'palm' : 'round'));
    const ci = txtSprite('CI', '#4FA3DB', '#fff', 1.1); sc.add(ci);
    const L = [['CI = air / sungai', 'artinya'], ['Citarum = Ci + tarum', 'Citarum'], ['🌿 tarum: tanaman pewarna biru', 'tarum']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? '#3B3FA0' : INK) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = seg(t, 0, dur); cam.position.set(4.5, 3.2, lerp(10, -2, p)); cam.lookAt(0, .4, lerp(4, -8, p));
      riv.forEach((m, i) => m.position.y = .02 + Math.sin(t * 3 + i) * .015); ci.position.set(-.5, 1.5 + Math.sin(t * 2) * .1, lerp(2, -8, p)); ci.visible = t > at(s, 'Ci', 1);
      const tt = at(s, 'tarum', dur - 3); bushes.forEach((b, i) => b.scale.setScalar(1 + (t > tt ? Math.sin(t * 8 + i) * .08 : 0)));
      L.forEach(l => { const tc = at(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) }) } };
  },
  K3_SQ_SWAMP(s, root) {   // kamera rendah di tanah basah: genangan, rumput rawa, papan nama
    const sc = newScene(SUNNY({ sky: ['#A9CFE0', '#EEF6F2'], hemi: 1.2 })); island(sc, 16, 16, '#7DAA4A', '#6E5A40');
    [[-2, 1, 1.6], [2.5, -1, 1.2], [-.5, -3.5, 1.4], [3, 3, 1], [-4, -2, 1.1]].forEach(([x, z, r]) => sc.add(mesh(G.cyl(r, r, .04, 16), '#5FA8D8', [x, .03, z], { cast: false, mat: { roughness: .15 } })));
    [[-3.6, 2.4], [1, 1.5], [4.2, -2.6], [-1.6, -1.8], [2.6, 4.6], [-4.8, -4.2]].forEach(([x, z]) => reeds(sc, x, z));
    const b1 = canvasPlane(2.2, .7, signText('RANCA', CREAM)), b2 = canvasPlane(2.2, .7, signText('RAWA', CREAM)); [[b1, -2.4], [b2, 2.4]].forEach(([b, x]) => { const g = group(sc, [x, 0, 3.6]); g.add(mesh(G.box(.12, 1.6, .12), '#7A4E2C', [0, .8, 0])); b.position.set(0, 1.55, .08); g.add(b) });
    const L = [['💧 Ranca / Rawa = tanah basah', 'Rawa'], ['🔎 nama = petunjuk alam', 'petunjuk']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-20, 20, E.inout(seg(t, 0, dur))), 2.4, 14, [0, 1, 1.5]);
      L.forEach(l => { const tc = at(s, l.cu, 99); X.pop(l.e, seg(t, tc, tc + .4)) }) } };
  },
  K3_SQ_CLUES(s, root) {   // orbit desa: label petunjuk menempel di sumur, kelapa, tanah datar
    const sc = newScene(SUNNY()); const L0 = lahan(sc, { well: true, tents: true }); const palms = [-6, -4.5, -3, -1.5].map(x => tree(sc, [x, 0, -6.5], 1.1, '#4E8F3A', 'palm'));
    const K = kades([0, 0, 1]); sc.add(K); const flat = group(sc, [4, 0, 4]);
    const t1 = tag3(root, '💧 sumur', '#3E8FC4'), t2 = tag3(root, '🌴 kelapa', DG), t3 = tag3(root, '🟩 tanah datar', INK);
    const V = X.TL.vars; const ideas = card(root, `💡 ${V.contoh[0]}? ${V.contoh[1]}?`, { left: 70, top: 300, fontSize: '40px' });
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-30, 40, E.inout(seg(t, 0, dur))), 9, 19, [0, .5, 0]); K.pose(t, { point: true, talk: true });
      const a = at(s, 'sumur', 1), b = at(s, 'kelapa', 3), c = at(s, 'datar', 5); t1.at(L0.well, cam, [0, 2.4, 0], seg(t, a, a + .4)); t2.at(palms[2], cam, [0, 2.6, 0], seg(t, b, b + .4)); t3.at(flat, cam, [0, .4, 0], seg(t, c, c + .4));
      const ti = at(s, 'ide nama', dur - 2); X.pop(ideas, seg(t, ti, ti + .4)) } };
  },
  K3_SQ_NAMEVOTE(s, root) {   // gapura: papan nama berganti contoh, kartu komentar + jumlah like
    const sc = newScene(SUNNY({ sky: ['#F7B77A', '#FFF0D9'], sun: '#FFC58A', sunPos: [-12, 8, 6] })); village(sc); gapura(sc, [0, 0, 5.6]);
    const sign = canvasPlane(5.2, .62, signText('DESA ???')); sign.position.set(0, 3.3, 5.86); sc.add(sign);
    const K = kades([-1.6, 0, 7]); sc.add(K); K.rotation.y = .3; const V = X.TL.vars; let last = -1;
    const cards = V.contoh.map((n, i) => X.ab({ left: [60, 550, 305][i], top: [1010, 1010, 1190][i], width: 440, background: '#FFFFFF', borderRadius: '26px', padding: '14px 22px', fontFamily: 'Fredoka', color: '#1E1E1E', border: `5px solid ${INK}`, boxShadow: '0 8px 0 #00000030', opacity: 0 }, root,
      `<div style="font-size:24px;color:#888">contoh komentar</div><div style="font-size:34px;font-weight:700">“${n}”</div><div style="font-size:32px;color:#E5484D">❤ <span class="lk">0</span></div>`));
    const rule = card(root, '❤ like terbanyak = nama resmi', { left: 120, top: 300, fontSize: '42px' }, '#C9472F');
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(lerp(-.6, .6, seg(t, 0, dur)), 3.6, 22); cam.lookAt(0, 3.1, 5.6); K.pose(t, { wave: true, talk: true });
      const tn = at(s, 'nama desa', 1.5), tl = at(s, 'like', 4);
      cards.forEach((e, i) => { const q = seg(t, tn + i * .4, tn + i * .4 + .4); e.style.opacity = q; e.style.transform = `translateY(${(1 - E.out(q)) * 30}px) rotate(${i % 2 ? 2 : -2}deg)`; e.querySelector('.lk').textContent = Math.round(Math.max(0, t - tl) * [9, 14, 6][i]) });
      X.pop(rule, seg(t, tl, tl + .4)); const k = t < tn ? -1 : Math.floor((t - tn) / 1.6) % 3; if (k !== last) { last = k; sign.userData.redraw(signText(k < 0 ? 'DESA ???' : V.contoh[k])) } } };
  },

  // ===== HARI 3: rumah berjarak, warga quest, kebun vs pos ronda =====
  K3H3_HOOK(s, root) {   // kamera menukik dari atas: lima rumah berhalaman tumbuh, angka 19 vs 2
    const sc = newScene(SUNNY({ sky: ['#7CC6F2', '#F2FAFF'] })); lahan(sc, { well: true }); const V = X.TL.vars;
    const hs = rowHouses(sc, -6.4, -3, 1.6); const yards = hs.map(h => { const y = mesh(G.box(2.6, .05, 2.4), '#6FB04A', [h.position.x, .04, -.6], { cast: false }); sc.add(y); return y });
    const cam = camera(42);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: CREAM, border: `8px solid ${INK}`, borderRadius: '36px', padding: '20px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: INK, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: `0 12px 0 ${DG}`, opacity: 0 }, root,
      `<span style="color:#3E8FC4">B ${V.b}</span> vs <span style="color:#C98A00">A ${V.a}</span><br><span style="font-size:44px;color:#C9472F">tapi anggaran tinggal ${V.juta_sisa} juta...</span>`);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, 3.5)); orbit(cam, lerp(60, 15, p), lerp(28, 9, p), lerp(30, 20, p), [0, .5, -2]); if (t > 3.5) orbit(cam, 15 - (t - 3.5) * 2, 9, 20 - (t - 3.5) * .2, [0, .5, -2]);
      hs.forEach((h, i) => { const q = E.back(seg(t, 1 + i * .25, 1.4 + i * .25)); h.scale.setScalar(Math.max(.001, q)); yards[i].visible = q > 0 }); X.pop(hook, seg(t, .1, .5)) } };
  },
  K3H3_BUILD(s, root) {   // timelapse proyek: perancah, tukang, rumah naik; label api tidak merambat
    const sc = newScene(SUNNY({ sky: ['#F7D9A8', '#FFF6E6'], sun: '#FFE0B0', sunPos: [-12, 12, 8] })); island(sc, 16, 14, GREEN, '#8D6E4A');
    const H = [house(sc, [-2.4, 0, 0], { wall: '#FFF3D6', roofC: '#D9603B' }), house(sc, [2.4, 0, 0], { wall: '#FCE9C8', roofC: '#C9472F' })]; const gap = mesh(G.box(2, .05, 2.6), '#6FB04A', [0, .04, 0], { cast: false }); sc.add(gap);
    const scaf = H.map(h => { const g = group(sc, [h.position.x, 0, 1.4]); [-1.2, 1.2].forEach(x => g.add(mesh(G.box(.08, 3, .08), '#B0B7BF', [x, 1.5, 0]))); [1, 2].forEach(y => g.add(mesh(G.box(2.5, .08, .4), '#C9A36B', [0, y, .1]))); return g });
    const ws = [0, 1].map(i => { const w = warga([i ? 1.4 : -3.4, 0, 2.2], i + 2, { hat: 'cap', hatC: '#F5C542' }); sc.add(w); return w }); const V = X.TL.vars;
    const C = [[`💰 ${V.juta_jarak} juta`, 'Biayanya'], ['🌳 halaman + terang', 'halaman'], ['🔥 api nggak gampang merambat', 'merambat'], ['🔒 privasi terjaga', 'privasi']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? '#C9472F' : INK) }));
    const gp = tag3(root, '↔ ada jarak', DG); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-30, 25, E.inout(seg(t, 0, dur))), 4, 15, [0, 1.2, 0]);
      H.forEach((h, i) => { const q = E.out(seg(t, .3 + i * .5, 3 + i * .5)); h.scale.set(1, Math.max(.001, q), 1) }); scaf.forEach(g => g.visible = t < 4.2);
      ws.forEach((w, i) => w.pose(t + i, { hold: true, nod: t < 4, cheer: t > 4.2 && t < 6 })); const tm = at(s, 'merambat', 5); gp.at(gap, cam, [0, 1.2, 0], seg(t, tm, tm + .4));
      C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K3H3_WARGA(s, root) {   // gapura: barisan penduduk baru dari quest, penghitung naik, kucing oyen lari masuk
    const sc = newScene(SUNNY({ sky: ['#86CBEF', '#FFF0D9'] })); village(sc); gapura(sc, [0, 0, 5.6]); const V = X.TL.vars;
    const n = Math.min(V.warga, 12); const ppl = Array.from({ length: n }, (_, i) => { const w = warga([0, 0, 10], i + 1); sc.add(w); return w }); const C = cat(sc, [0, 0, 12]);
    const big = X.ab({ left: 0, top: 960, width: 1080, textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: YEL, WebkitTextStroke: `14px ${INK}`, paintOrder: 'stroke fill', opacity: 0 }, root, '');
    const q1 = card(root, `💬 ${V.warga} warga daftar lewat komentar`, { left: 60, top: 300, fontSize: '42px' }), q2 = card(root, '🐈 kucing oyen ikut daftar', { left: 60, top: 410, fontSize: '42px' }, '#E07B39');
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(lerp(-3, 2, seg(t, 0, dur)), 3.6, 19); cam.lookAt(0, 1.6, 5);
      const t0 = at(s, 'daftar duluan', 1.5); let k = 0; ppl.forEach((w, i) => { const q = seg(t, t0 + i * .35, t0 + i * .35 + 2.6); w.visible = q > 0; if (q >= .6) k++; w.position.set((i % 4 - 1.5) * .8, 0, lerp(11, 2 - Math.floor(i / 4) * .9, q)); w.rotation.y = Math.PI; w.pose(t + i, { walk: q < 1 ? 1 : 0, wave: q >= 1 }) });
      X.pop(big, seg(t, t0, t0 + .3)); big.innerHTML = `👥 5 + ${k} = ${5 + k}`; X.pop(q1, seg(t, t0, t0 + .4));
      const tc = at(s, 'kucing', dur - 3); const cq = seg(t, tc, tc + 2); C.visible = cq > 0; C.position.set(Math.sin(t * 3) * .3 + 1.8, 0, lerp(12, 4.4, E.out(cq))); C.rotation.y = -Math.PI / 2; C.userData.tail.rotation.z = .6 + Math.sin(t * 8) * .3; X.pop(q2, seg(t, tc, tc + .4));
    } };
  },
  K3H3_WISH(s, root) {   // papan usulan desa di balai: kertas usulan menempel, kades melingkari dua
    const sc = newScene(SUNNY({ sky: ['#8CCDF2', '#EAF7FF'] })); island(sc, 16, 12, GREEN, '#8D6E4A'); const NB = noticeBoard(sc, [0, 0, -1]); const V = X.TL.vars;
    const K = kades([3, 0, 1.6]); sc.add(K); K.rotation.y = -.6;
    const notes = V.usulan.map((u, i) => { const pl = canvasPlane(1.25, .62, signText(u, ['#FFF59D', '#B3E5FC', '#FFCCBC', '#C8E6C9'][i % 4])); pl.position.set(-1.45 + (i % 3) * 1.45, 3 - Math.floor(i / 3) * .75, -.75); pl.rotation.z = ((i * 37) % 10 - 5) / 70; sc.add(pl); return pl });
    const ring = [0, 1].map(i => { const r = new THREE.Mesh(new THREE.TorusGeometry(.72, .05, 6, 24), mat('#E5484D')); r.position.copy(notes[i].position); r.position.z += .05; r.scale.y = .55; sc.add(r); return r });
    const cc = V.komentar.slice(0, 2).map(([u, tx], i) => commentCard(root, u, `“${tx}”`, 300 + i * 190, i ? 300 : 60)); cc.forEach(e => { e.style.width = '700px'; const ds = e.querySelectorAll('div'); ds[ds.length - 1].style.fontSize = '34px' });
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-1, .5, p), 2.6, lerp(13, 11.5, p)); cam.lookAt(0, 2.2, -1);
      notes.forEach((m, i) => { const q = E.back(seg(t, .3 + i * .3, .6 + i * .3)); m.scale.setScalar(Math.max(.001, q)) }); K.pose(t, { point: true, talk: true });
      const td = at(s, 'ada dua', dur - 3); ring.forEach((r, i) => { r.visible = t > td + i * .6; r.rotation.z = -t });
      cc.forEach((e, i) => { const q = seg(t, 1 + i * 1.2, 1.4 + i * 1.2) * (1 - seg(t, td - .5, td)); e.style.opacity = q; e.style.transform = `rotate(${i ? 2 : -2}deg)` }) } };
  },
  K3H3_KEBUN(s, root) {   // kamera rendah menyusuri bedeng kebun; tanaman tumbuh, keranjang panen
    const sc = newScene(SUNNY({ sky: ['#A7DDF7', '#F4FBFF'] })); island(sc, 16, 16, '#7FB04A', '#6E5A40'); const V = X.TL.vars;
    const beds = [], plants = []; for (let r = 0; r < 4; r++) { const b = mesh(G.box(8, .25, .9), '#7A5230', [0, .12, -4 + r * 2]); sc.add(b); beds.push(b); for (let c = 0; c < 7; c++) plants.push(crop(sc, -3.4 + c * 1.1, -4 + r * 2, ['#E5484D', '#F28C28', '#8E44AD', '#F5C542'][r])) }
    const basket = group(sc, [4.6, 0, 3]); basket.add(mesh(G.cyl(.45, .35, .5, 10), '#C9A36B', [0, .25, 0])); [0, 1, 2].forEach(i => basket.add(mesh(G.sph(.14, 8, 6), ['#E5484D', '#F28C28', '#8BC34A'][i], [-.15 + i * .15, .55, 0])));
    const big = X.ab({ left: 820, top: 300, width: 170, height: 170, borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, color: INK, fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px', opacity: 0 }, root, 'A');
    const C = [[`💰 ${V.juta_kebun} juta`, 'Biayanya'], ['🥬 bisa dimakan + dijual', 'dijual'], ['📈 desa punya pemasukan', 'pemasukan'], ['⏳ panen beberapa minggu lagi', 'minggu']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, i === 3 ? '#C9472F' : INK) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = seg(t, 0, dur); cam.position.set(lerp(-6, 5, p), 1.6, 7); cam.lookAt(lerp(-3, 3, p), .4, -1); X.pop(big, seg(t, 0, .4));
      plants.forEach((m, i) => { const q = E.back(seg(t, .5 + (i % 7) * .12 + Math.floor(i / 7) * .3, 1 + (i % 7) * .12 + Math.floor(i / 7) * .3)); m.scale.setScalar(Math.max(.001, q)) }); basket.visible = t > at(s, 'dijual', 4);
      C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K3H3_RONDA(s, root) {   // malam terang: pos ronda + lampu jalan menyala, warga jaga bergantian
    const sc = newScene(SUNNY({ sky: ['#24335A', '#5A76A8'], hemi: 1.1, sunI: 1.4, sun: '#B8C8FF', sunPos: [-8, 12, 6] })); lahan(sc, { well: true }); const V = X.TL.vars;
    const P = posRonda(sc, [-2.4, 0, 2.6]); const lamps = [-5, 0, 5].map(z => { const g = group(sc, [1.6, 0, z]); g.add(mesh(G.cyl(.06, .06, 3, 6), '#333', [0, 1.5, 0])); g.add(mesh(G.sph(.25, 10, 8), '#FFE7A0', [0, 3.1, 0], { mat: { emissive: '#FFD86B', emissiveIntensity: 1.6 } })); const L = new THREE.PointLight('#FFD86B', 7, 9); L.position.set(0, 3, 0); g.add(L); return g });
    const gs = [0, 1].map(i => { const w = warga([-2.8 + i * .9, .7, 2.6], i + 3); sc.add(w); return w }); const st = [0, 1, 2, 3, 4].map(i => { const m = mesh(G.sph(.06, 6, 5), '#FFFFFF', [Math.sin(i * 2) * 8, 9 + i % 2, -8 + i * 2], { mat: { emissive: '#FFFFFF', emissiveIntensity: 1 }, cast: false }); sc.add(m); return m });
    const big = X.ab({ left: 820, top: 300, width: 170, height: 170, borderRadius: '50%', background: '#3E8FC4', border: `8px solid ${INK}`, color: '#fff', fontSize: '110px', fontFamily: 'Fredoka', fontWeight: 700, textAlign: 'center', lineHeight: '160px', opacity: 0 }, root, 'B');
    const C = [[`💰 ${V.juta_ronda} juta`, 'Biayanya'], ['💡 lampu jalan', 'lampu'], ['🛡️ malam lebih aman', 'aman'], ['💸 nggak menghasilkan uang', 'uang']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '38px' }, i === 3 ? '#C9472F' : INK) }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(30, -10, E.inout(seg(t, 0, dur))), 4.5, 15, [-1, 1.2, 1]); X.pop(big, seg(t, 0, .4));
      const tl = at(s, 'lampu', 3); lamps.forEach((g, i) => g.visible = t > tl + i * .3); gs.forEach((w, i) => w.pose(t + i * 2, { look: Math.sin(t + i) * .6, talk: i === Math.floor(t / 3) % 2 }));
      C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K3H3_VOTE(s, root) {   // tombol A/B + meteran like menuju target; kades dan kucing melambai
    const sc = newScene(SUNNY({ sky: ['#F7B77A', '#FFF0D9'], sun: '#FFC58A', sunPos: [-12, 8, 6] })); village(sc); const K = kades([0, 0, 3]); sc.add(K); const C = cat(sc, [1.2, 0, 3.4]); C.rotation.y = -.4; const V = X.TL.vars;
    const btn = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '30px', justifyContent: 'center', opacity: 0 }, root,
      `<div style="background:#FFC93C;color:${INK};font-family:Fredoka;font-weight:700;font-size:90px;width:300px;padding:16px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">A<div style="font-size:34px">🥬 kebun</div></div><div style="background:#3E8FC4;color:#fff;font-family:Fredoka;font-weight:700;font-size:90px;width:300px;padding:16px 0;border-radius:30px;border:8px solid ${INK};text-align:center;box-shadow:0 12px 0 ${DG}">B<div style="font-size:34px">🛡️ pos ronda</div></div>`);
    const meter = X.ab({ left: 120, top: 640, width: 840, height: 64, background: CREAM, border: `6px solid ${INK}`, borderRadius: '34px', overflow: 'hidden', opacity: 0 }, root, `<div style="height:100%;width:0;background:linear-gradient(90deg,#E5484D,#FF8A80)"></div>`);
    const lbl = card(root, `❤ ${V.target} like = dua-duanya dibangun!`, { left: 140, top: 730, fontSize: '40px' }, '#C9472F'); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, t * 5 - 12, 3.6, 10, [0, 1.2, 3]); K.pose(t, { wave: true, talk: true }); C.userData.tail.rotation.z = .6 + Math.sin(t * 8) * .3;
      const q = seg(t, .3, .8); btn.style.opacity = q; btn.style.transform = `scale(${E.back(q)})`; const tb = at(s, 'bonus', 3); meter.style.opacity = seg(t, tb, tb + .3); meter.firstChild.style.width = (E.inout(seg(t, tb, tb + 3)) * 100) + '%'; X.pop(lbl, seg(t, tb + .5, tb + .9)) } };
  },

  // ===== HARI 4: malam gelap, oyen hilang, lampu surya, quest follower =====
  K4_DARK_HOOK(s, root) {   // kamera menukik ke desa malam, rumah gelap, satu jendela, tanda seru "oyen hilang"
    const NIGHT = SUNNY({ sky: ['#1A2A4F', '#41608F'], hemi: .95, sunI: 1.1, sun: '#AFC4FF', sunPos: [-8, 14, 6] }); const sc = newScene(NIGHT); lahan(sc, { well: true });
    const hs = rowHouses(sc, -6.4, -3, 1.6); const W = warga([0, 0, 1.2], 2); sc.add(W); const moon = mesh(G.sph(1.2, 16, 12), '#FFF6D6', [-8, 14, -20], { mat: { emissive: '#FFF6D6', emissiveIntensity: 1 }, cast: false }); sc.add(moon);
    const ex = txtSprite('!', '#E5484D', '#fff', 1); sc.add(ex);
    const hook = X.ab({ left: 70, top: 300, width: 940, background: INK, border: `8px solid ${YEL}`, borderRadius: '36px', padding: '20px 26px', textAlign: 'center', fontSize: '56px', lineHeight: 1.12, color: CREAM, fontFamily: 'Fredoka', fontWeight: 700, boxShadow: '0 12px 0 #00000050', opacity: 0 }, root,
      `Malam pertama: desa gelap 🌑<br><span style="color:${YEL}">kucing oyen hilang!</span>`);
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); orbit(cam, lerp(50, 10, p), lerp(22, 5, p), lerp(28, 12, p), [0, 1, 0]);
      W.pose(t, { cheer: t > 2.5, shake: t > 2.5, look: Math.sin(t * 3) * .6 }); ex.visible = t > at(s, 'kucing oyen', 3); ex.position.set(0, 3 + Math.sin(t * 8) * .1, 1.2); X.pop(hook, seg(t, .1, .5)) } };
  },
  K4_SEARCH(s, root) {   // POV gang malam: tiga sorot senter menyapu, warga berjalan
    const sc = newScene(SUNNY({ sky: ['#1A2A4F', '#41608F'], hemi: .9, sunI: .9, sun: '#AFC4FF', sunPos: [6, 12, -6] })); lahan(sc, { tents: false }); rowHouses(sc, -6.4, -3, 1.6); const V = X.TL.vars;
    const ppl = [0, 1, 2].map(i => { const w = warga([-1.2 + i * 1.2, 0, 3 + (i % 2) * .6], i + 1); sc.add(w); const L = new THREE.SpotLight('#FFF2B0', 25, 14, .35, .5); L.position.set(0, 1.2, .3); const tg = new THREE.Object3D(); tg.position.set(0, 0, -6); w.add(tg); L.target = tg; w.add(L); w.add(mesh(G.cyl(.06, .05, .3, 8), '#333', [.35, 1, .25], { rot: [Math.PI / 2, 0, 0] })); return w });
    const C = [['🔦 senter cuma ' + V.senter, 'Senternya'], ['⚡ belum ada listrik', 'listrik'], ['🪫 baterai hampir habis', 'baterai']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }, i === 2 ? '#C9472F' : INK) }));
    const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { const p = seg(t, 0, dur); cam.position.set(Math.sin(t * .8) * .3, 2.8, lerp(12, 8, p)); cam.lookAt(0, 1, -2);
      ppl.forEach((w, i) => { w.position.z = 3 + (i % 2) * .6 - t * .35; w.rotation.y = Math.PI + Math.sin(t * 1.3 + i * 2) * .6; w.pose(t + i, { walk: 1 }); w.children.forEach(c => { if (c.isSpotLight) c.intensity = 25 * (t > at(s, 'baterai', 99) ? (.6 + .4 * Math.abs(Math.sin(t * 9 + i))) : 1) }) });
      C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K4_FOUND(s, root) {   // close-up atap sumur: oyen santai, senter menyorot, warga lega
    const sc = newScene(SUNNY({ sky: ['#22345E', '#4A6A9C'], hemi: 1, sunI: 1, sun: '#B8C8FF', sunPos: [-6, 10, 8] })); const L0 = lahan(sc, { well: true }); const w0 = L0.well.position;
    const O = cat(sc, [w0.x, 2.05, w0.z]); O.rotation.y = .6; const spot = new THREE.SpotLight('#FFF2B0', 40, 12, .3, .4); spot.position.set(w0.x + 3, 2, w0.z + 4); spot.target = O; sc.add(spot);
    const ws = [0, 1, 2].map(i => { const w = warga([w0.x - 1.5 + i * 1.5, 0, w0.z + 3], i + 1); sc.add(w); w.lookAt(w0.x, 0, w0.z); return w }); const K = kades([w0.x + 2.4, 0, w0.z + 2]); sc.add(K); K.lookAt(w0.x, 0, w0.z);
    const C = [['🐈 oyen di atap sumur', 'atap sumur'], ['⚠️ desa gelap = rawan', 'rawan']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '42px' }, i ? '#C9472F' : '#E07B39') }));
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(30, -20, E.inout(seg(t, 0, dur))), 2.6, lerp(6, 9, seg(t, 0, dur)), [w0.x, 1.6, w0.z]);
      O.userData.tail.rotation.z = .6 + Math.sin(t * 5) * .4; O.userData.hd.rotation.y = Math.sin(t * .8) * .5; ws.forEach((w, i) => w.pose(t + i, { cheer: t > 1 && t < 4, nod: t >= 4 })); K.pose(t, { talk: t > at(s, 'sadar', 4), shake: t > at(s, 'rawan', 99) });
      C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K4_SOLAR(s, root) {   // lampu surya: siang panel mengisi baterai (indikator), lalu langit menggelap dan lampu menyala sendiri
    const sc = newScene(SUNNY()); island(sc, 14, 12, GREEN, '#8D6E4A'); sc.add(mesh(G.box(14, .05, 2.2), '#C9A36B', [0, .03, 1.5]));
    const poles = [-4, 0, 4].map(x => { const g = group(sc, [x, 0, 0]); g.add(mesh(G.cyl(.07, .09, 3.4, 8), '#7D8A94', [0, 1.7, 0])); g.add(mesh(G.box(1.1, .06, .7), '#2B4A7A', [0, 3.5, 0], { rot: [-.4, 0, 0] })); g.add(mesh(G.box(.24, .4, .16), '#555', [0, 2.6, .1]));
      const bulb = mesh(G.box(.5, .1, .25), '#DDD', [0, 3.15, .45], { mat: { emissive: '#FFE7A0', emissiveIntensity: 0 } }); g.add(bulb); const L = new THREE.PointLight('#FFE7A0', 0, 8); L.position.set(0, 3, .6); g.add(L); return { g, bulb, L } });
    const sun = mesh(G.sph(.8, 14, 10), '#FFD54A', [5, 9, -10], { mat: { emissive: '#FFD54A', emissiveIntensity: 1 }, cast: false }); sc.add(sun);
    const bat = X.ab({ left: 760, top: 300, width: 220, height: 90, border: `7px solid ${INK}`, borderRadius: '16px', background: CREAM, overflow: 'hidden', opacity: 0 }, root, `<div style="height:100%;width:0;background:#8BC34A"></div>`);
    const C = [['☀️ siang: isi baterai', 'baterai'], ['🌙 gelap: nyala sendiri', 'sendiri'], ['🔌 tanpa kabel panjang', 'kabel']].map(([tx, cu], i) => ({ cu, e: card(root, tx, { left: 60, top: 300 + i * 105, fontSize: '40px' }) }));
    const cam = camera(42); const sky0 = new THREE.Color('#7CC6F2'), sky1 = new THREE.Color('#1A2A4F');
    return { scene: sc, cam, upd(t, dur) { orbit(cam, lerp(-15, 15, seg(t, 0, dur)), 3, 13, [0, 2, 0]); const tb = at(s, 'baterai', 2), tn = at(s, 'gelap', 5);
      const n = seg(t, tn - .5, tn + 1); sc.background = sky0.clone().lerp(sky1, n); sc.userData.sun.intensity = lerp(2.4, .5, n); sc.userData.hemi.intensity = lerp(1.2, .7, n); sun.position.y = lerp(9, 2, n);
      poles.forEach((p, i) => { const on = seg(t, tn + .6 + i * .25, tn + .9 + i * .25); p.bulb.material.emissiveIntensity = on * 1.8; p.L.intensity = on * 8 });
      bat.style.opacity = seg(t, tb, tb + .3); bat.firstChild.style.width = (E.out(seg(t, tb, tn)) * 100) + '%';
      C.forEach(c => { const q = at(s, c.cu, 99); X.pop(c.e, seg(t, q, q + .4)) }) } };
  },
  K4_IDEAS(s, root) {   // buku desa terbuka di meja balai, kartu usulan melayang masuk
    const sc = newScene(SUNNY({ sky: ['#F2C98A', '#FFF3DE'], sun: '#FFD9A0', sunPos: [-10, 12, 6] })); island(sc, 12, 10, '#9C6B3E', '#7A4E2C');
    const table = mesh(G.box(5, .25, 3), '#B5835A', [0, 1, 0]); sc.add(table); [[-2.2, -1.2], [2.2, -1.2], [-2.2, 1.2], [2.2, 1.2]].forEach(([x, z]) => sc.add(mesh(G.box(.2, 1, .2), '#7A4E2C', [x, .5, z])));
    const book = group(sc, [0, 1.15, 0]); [-1, 1].forEach(sx => { const pg = canvasPlane(1.6, 2, (x, W, H) => { x.fillStyle = '#FFFDF4'; x.fillRect(0, 0, W, H); x.strokeStyle = '#C9B79C'; x.lineWidth = 3; for (let y = 60; y < H; y += 46) { x.beginPath(); x.moveTo(20, y); x.lineTo(W - 20, y); x.stroke() } }); pg.rotation.x = -Math.PI / 2; pg.rotation.y = sx * .08; pg.position.set(sx * .82, .02, 0); book.add(pg) });
    const K = kades([0, 0, -2.4]); sc.add(K); const V = X.TL.vars;
    const cc = V.usulan.map(([u, tx], i) => commentCard(root, u, `“${tx}”`, 300 + i * 175, i % 2 ? 300 : 60)); cc.forEach(e => { e.style.width = '680px' });
    const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(-2, 2, p), lerp(7, 5, p), lerp(6, 5, p)); cam.lookAt(0, 1.2, -.4); K.pose(t, { talk: true, nod: true, hold: true });
      const t0 = at(s, 'mobil', 3); cc.forEach((e, i) => { const q = seg(t, t0 + i * .8, t0 + i * .8 + .4); e.style.opacity = q * (1 - seg(t, dur - 1.2, dur - .8)); e.style.transform = `translateY(${(1 - E.out(q)) * 40}px) rotate(${i % 2 ? 2 : -2}deg)` }) } };
  },
  K4_FOLLOW(s, root) {   // desa senja: tombol follow, tiap klik satu lampu surya muncul di sepanjang jalan
    const sc = newScene(SUNNY({ sky: ['#F09A6B', '#FFE0C2'], sun: '#FFB27A', sunPos: [-12, 6, 6], hemi: 1.05 })); village(sc); const K = kades([1.6, 0, 3]); sc.add(K); const O = cat(sc, [2.4, 0, 3.4]); O.rotation.y = -.5; const V = X.TL.vars;
    const lamps = Array.from({ length: 6 }, (_, i) => { const g = group(sc, [i % 2 ? 1.9 : -1.9, 0, -6 + i * 2.2]); g.add(mesh(G.cyl(.06, .08, 2.8, 8), '#7D8A94', [0, 1.4, 0])); g.add(mesh(G.box(.8, .05, .5), '#2B4A7A', [0, 2.9, 0], { rot: [-.4, 0, 0] })); g.add(mesh(G.box(.4, .08, .2), '#FFE7A0', [0, 2.6, i % 2 ? -.3 : .3], { mat: { emissive: '#FFE7A0', emissiveIntensity: 1.6 } })); return g });
    const btn = X.ab({ left: 240, top: 300, width: 600, padding: '18px 0', textAlign: 'center', background: '#E5484D', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '64px', borderRadius: '24px', border: `8px solid ${INK}`, boxShadow: '0 12px 0 #00000040', opacity: 0 }, root, '+ FOLLOW');
    const rule = card(root, `👥 ${V.per} follower = 💡 1 lampu surya`, { left: 130, top: 470, fontSize: '42px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { cam.position.set(0, 4, lerp(14, 11, seg(t, 0, dur))); cam.lookAt(0, 1.2, -1); K.pose(t, { wave: true, talk: true }); O.userData.tail.rotation.z = .6 + Math.sin(t * 8) * .3;
      const tf = at(s, 'follower baru', 2); X.pop(btn, seg(t, tf, tf + .3)); btn.style.transform += ` scale(${1 + Math.max(0, Math.sin((t - tf) * 6)) * .06})`; X.pop(rule, seg(t, tf + .5, tf + .9));
      lamps.forEach((g, i) => { const q = E.back(seg(t, tf + 1 + i * .5, tf + 1.4 + i * .5)); g.visible = q > 0; g.scale.setScalar(Math.max(.001, q)) }) } };
  },
};

// HUD game + label kuning + kilat putih
let hud, label, flash;
export function chrome(ctx) {
  const v = ctx.TL.vars.hud || { hari: 1, penduduk: 5, anggaran: 100 };
  hud = ctx.ab({ left: 36, top: 56, display: 'flex', gap: '12px', zIndex: 8, fontFamily: 'Fredoka', fontWeight: 700 }, ctx.ov,
    [[`HARI ${v.hari}`, YEL, INK], [`👥 ${v.penduduk}`, CREAM, INK], [`💰 Rp${v.anggaran} jt`, CREAM, INK]].map(([t, bg, c]) => `<div style="background:${bg};color:${c};font-size:38px;padding:8px 20px;border-radius:18px;border:5px solid ${INK};box-shadow:0 6px 0 ${DG}">${t}</div>`).join(''));
  label = ctx.ab({ left: 0, top: 1240, width: 1080, textAlign: 'center', zIndex: 8 }, ctx.ov); flash = ctx.ab({ left: 0, top: 0, width: 1080, height: 1920, background: '#fff', opacity: 0, zIndex: 9 }, ctx.ov);
}
export function frame(T, idx, t) {
  const s = X.TL.scenes[idx]; const q = seg(t, .1, .4), o = seg(t, 2.4, 2.8);
  label.innerHTML = `<span style="display:inline-block;background:${YEL};color:${INK};font-family:Fredoka;font-weight:700;font-size:48px;padding:10px 30px;border-radius:16px;border:6px solid ${INK};transform:rotate(-2deg)">${s.kicker}<span style="font-size:34px"> · ${s.sub}</span></span>`;
  label.style.opacity = q * (1 - o); label.style.transform = `scale(${E.back(q)})`;
  let f = 0; X.TL.scenes.forEach((x, i) => { if (i) f = Math.max(f, 1 - Math.abs(T - x.start) / .18) }); flash.style.opacity = clamp(f);
}

// helper untuk shot per episode (episodes/kades/<ep>/shots.js): import { X, kades, warga, ... } from '../../../engine/w3d/desa3d.js'
export { X, GREEN, DG, YEL, CREAM, INK, SUNNY, kades, warga, card, at, tag3, roadSection, drops, village, lahan, rowHouses, commentCard, txtSprite, sit, ballotBox, pendopo, noticeBoard, gapura, canvasPlane, signText, reeds, tarum, cat, crop, posRonda };
