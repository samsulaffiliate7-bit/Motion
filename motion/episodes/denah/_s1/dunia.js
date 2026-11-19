// Dunia Denah Rumah Dunia Season 1 "Planet Denah": tokoh + lokasi yang dipakai ulang semua episode season ini.
// Planet asing CERAH: tanah oranye dengan bercak ungu, dua bulan di langit siang, kristal, batu, tanaman aneh, bukit mesa.
// Kamera khas akun: tampak atas lurus seperti denah (grid cetak biru) lalu menukik ke tokoh.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, person, grade } from '../../../engine/w3d/kit.js';
import { X, canvasPlane, PFONT, PANEL, PCREAM, PORANGE, PTEAL } from '../../../engine/w3d/planet.js';

// ---- suasana (selalu cerah) ----
export const PAGI = o => newScene(Object.assign({ sky: ['#6FA8E8', '#FFD2B0'], sun: '#FFE6C8', sunPos: [-14, 18, 10], hemi: 1.3, sunI: 2.6, shadow: 20, hemiGround: '#B07A9A', fog: ['#F6D2C0', 70, 260] }, o));
export const SIANG = o => newScene(Object.assign({ sky: ['#78B4F0', '#F7E0D0'], sun: '#FFF0DA', sunPos: [10, 22, 6], hemi: 1.35, sunI: 2.5, shadow: 20, hemiGround: '#B07A9A', fog: ['#F2DCD2', 70, 260] }, o));
export const SORE = o => newScene(Object.assign({ sky: ['#7A86D8', '#FFB98A'], sun: '#FFC89A', sunPos: [-16, 9, 6], hemi: 1.25, sunI: 2.4, shadow: 20, hemiGround: '#A06A8A', fog: ['#F3B99A', 70, 240] }, o));

// ---- dua bulan (tidak kena kabut) ----
export function bulan(sc, o = {}) {
  const mk = (r, c, p) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 24), new THREE.MeshBasicMaterial({ color: grade(c), fog: false })); m.position.set(...p); sc.add(m);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(r * 1.18, 24, 16), new THREE.MeshBasicMaterial({ color: grade(c), fog: false, transparent: true, opacity: .22 })); m.add(halo); halo.position.set(0, 0, 0); halo.scale.setScalar(1); return m };
  const a = mk(o.r1 || 16, '#FFE3EE', o.p1 || [-60, 70, -170]); const b = mk(o.r2 || 7, '#BDF2EA', o.p2 || [55, 92, -180]);
  [[-.35, .2, .9, 2.6], [.3, -.3, .9, 1.8], [.1, .45, .88, 1.3]].forEach(([x, y, z, r]) => { const k = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), new THREE.MeshBasicMaterial({ color: grade('#F0C6D8'), fog: false })); k.position.set(x * 16, y * 16, z * 14.5); k.scale.z = .25; a.add(k) });
  return { a, b };
}

// ---- tokoh ----
export function dena(p, o = {}) {   // arsitek muda: helm proyek kuning, kemeja teal, rompi oranye, kuncir kuda, gulungan cetak biru
  const g = person(o.parent, p, Object.assign({ body: '#2FA39A', pants: '#3A3256', skin: '#D9A07A', hair: '#2A1A12' }, o));
  const st = g.userData.st, b = st.body, h = st.head;
  b.add(mesh(new THREE.CapsuleGeometry(.112, .3, 4, 12), '#FF8A3D', [0, .32, 0], { s: [1, 1, .9], mat: { flatShading: false, roughness: .6 } }));
  b.add(mesh(G.box(.24, .03, .02), '#FFF2B0', [0, .38, .11], { cast: false })); b.add(mesh(G.box(.24, .03, .02), '#FFF2B0', [0, .26, .11], { cast: false }));
  h.add(mesh(G.sph(.245, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#FFC93C', [0, .1, 0], { mat: { flatShading: false, roughness: .5 } }));
  h.add(mesh(G.cyl(.29, .29, .025, 20), '#FFC93C', [0, .1, .02], { mat: { flatShading: false } }));
  h.add(mesh(G.sph(.075, 10, 8), '#2A1A12', [0, .02, -.24], { mat: { flatShading: false } }));
  const ekor = group(h, [0, -.02, -.27]); ekor.add(mesh(new THREE.CapsuleGeometry(.05, .2, 4, 8), '#2A1A12', [0, -.14, -.03], { mat: { flatShading: false } })); st.ekor = ekor;
  if (o.gulung !== false) { const r = mesh(G.cyl(.05, .05, .5, 10), '#8FC8F2', [0, -.28, .06], { rot: [0, 0, Math.PI / 2] }); st.arms[1].userData.elbow?.add(r); g.userData.gulung = r }
  const pose = g.pose; g.pose = (t, q = {}) => { pose(t, q); ekor.rotation.x = Math.sin(t * 5) * .25 * ((q.walk || 0) + (q.bounce ? 1 : 0) + .3); if (q.panik) { h.rotation.z = Math.sin(t * 22) * .12; st.arms.forEach((A, i) => { A.rotation.z = (i ? 1 : -1) * (2.0 + Math.sin(t * 18 + i * 2) * .35); A.userData.elbow.rotation.x = -1.2 }) } };
  g.pose(0); return g;
}
export function penggaris(parent, p, o = {}) {   // robot PENGGARIS: badan = penggaris kuning berdiri (strip ukur), kepala layar, satu roda, lengan tipis
  const g = group(parent, p); const SM = { flatShading: false, roughness: .45 };
  const rig = group(g, [0, 0, 0]);
  const wheel = mesh(G.cyl(.2, .2, .12, 18), '#2F2F3A', [0, .2, 0], { rot: [0, 0, Math.PI / 2], mat: SM }); rig.add(wheel); rig.add(mesh(G.cyl(.08, .08, .14, 10), '#C9C9D2', [0, .2, 0], { rot: [0, 0, Math.PI / 2], mat: SM }));
  const body = group(rig, [0, .38, 0]);
  body.add(mesh(G.box(.42, 1.25, .1), '#FFD23F', [0, .62, 0], { mat: SM }));
  const tick = canvasPlane(.4, 1.2, (x, W, H) => { x.fillStyle = '#FFD23F'; x.fillRect(0, 0, W, H); x.fillStyle = '#2A2140'; for (let i = 0; i <= 24; i++) { const y = H - 8 - i * (H - 16) / 24; const L = i % 5 === 0 ? W * .42 : W * .2; x.fillRect(0, y - 2, L, 4); if (i % 5 === 0 && i) { x.font = `700 ${Math.round(W * .2)}px Poppins`; x.fillText(String(i / 5 * 10), W * .5, y + 8) } } }, 200);
  tick.position.set(0, .62, .051); body.add(tick);
  const head = group(body, [0, 1.42, 0]); head.add(mesh(G.box(.56, .38, .3), '#E9E6F2', [0, 0, 0], { mat: SM })); head.add(mesh(G.box(.46, .28, .02), '#1C1838', [0, 0, .151], { cast: false }));
  const eyes = [-1, 1].map(i => { const e = mesh(G.box(.07, .1, .01), '#5FE0D0', [i * .1, .02, .163], { cast: false, mat: { emissive: '#5FE0D0', emissiveIntensity: 1.2 } }); head.add(e); return e });
  const mulut = mesh(G.box(.14, .02, .01), '#5FE0D0', [0, -.07, .163], { cast: false, mat: { emissive: '#5FE0D0', emissiveIntensity: 1.2 } }); head.add(mulut);
  head.add(mesh(G.cyl(.012, .012, .2, 6), '#9A96AA', [.16, .28, 0])); const lamp = mesh(G.sph(.045, 10, 8), '#FF6B5A', [.16, .4, 0], { mat: { emissive: '#FF6B5A', emissiveIntensity: .8 } }); head.add(lamp);
  const arms = [-1, 1].map(i => { const A = group(body, [i * .25, 1.0, 0]); A.add(mesh(new THREE.CapsuleGeometry(.03, .38, 3, 8), '#9A96AA', [0, -.2, 0], { mat: SM })); A.add(mesh(G.box(.1, .08, .06), '#E9E6F2', [0, -.43, 0], { mat: SM })); return A });
  g.pose = (t, q = {}) => {
    const r = q.roll || 0; rig.position.y = Math.abs(Math.sin(t * 9)) * .03 * r; wheel.rotation.x = -t * 8 * r; body.rotation.x = r * .08 + (q.lean || 0);
    arms.forEach((A, i) => { A.rotation.z = (i ? 1 : -1) * (.2 + (q.wave && !i ? 2.3 + Math.sin(t * 10) * .4 : 0) + (q.cheer ? 2.5 + Math.sin(t * 12 + i) * .2 : 0)); A.rotation.x = q.ukur ? -1.4 : (q.kerja ? -1 + Math.sin(t * 14 + i * 3) * .5 : 0) });
    const blink = (t % 3.1) < .12 ? .15 : 1; eyes.forEach(e => e.scale.y = blink * (q.senang ? .5 : 1)); mulut.scale.x = q.talk ? 1 + .8 * Math.abs(Math.sin(t * 13)) : (q.senang ? 1.5 : 1);
    head.rotation.z = q.bingung ? Math.sin(t * 2) * .22 : 0; head.rotation.y = q.look || 0; lamp.material.emissiveIntensity = .5 + .5 * Math.abs(Math.sin(t * 4));
  };
  g.userData = { head, body, eyes, arms }; g.scale.setScalar(o.s || 1); g.pose(0); return g;
}
export function pendatang(parent, p, i = 0) {   // pendatang baru (jaket antariksa warna-warni)
  return person(parent, p, { body: ['#E9E6F2', '#7FB3E8', '#F2A65A', '#B18BE0'][i % 4], pants: '#3A3256', skin: ['#E2A97E', '#C98E64', '#B97A52', '#F0C49E'][i % 4], hair: ['#2A1A10', '#5A3A20', '#1A1A1A'][i % 3] });
}

// ---- benda / lokasi ----
export function kapsul(parent, p, o = {}) {   // kapsul pendaratan: badan putih-oranye, jendela bulat, sirip, pintu berengsel (userData.pintu)
  const g = group(parent, p); const SM = { flatShading: false, roughness: .45 }; const s = o.s || 1; g.scale.setScalar(s);
  const body = group(g, [0, 0, 0]);
  body.add(mesh(new THREE.CapsuleGeometry(1.15, 1.6, 8, 24), '#F2EEF6', [0, 1.95, 0], { mat: SM }));
  body.add(mesh(G.cyl(1.17, 1.17, .3, 24), '#FF8A3D', [0, 1.4, 0], { mat: SM })); body.add(mesh(G.cyl(1.17, 1.17, .12, 24), '#2A1E56', [0, 2.6, 0], { mat: SM }));
  body.add(mesh(G.cone(.25, .7, 10), '#FF8A3D', [0, 3.95, 0], { mat: SM }));
  [0, 1, 2].forEach(i => { const a = i / 3 * Math.PI * 2 + .5; const f = mesh(G.box(.12, 1.1, .7), '#FF8A3D', [Math.sin(a) * 1.1, .7, Math.cos(a) * 1.1], { rot: [0, a, 0], mat: SM }); body.add(f) });
  const win = mesh(G.cyl(.32, .32, .1, 20), '#5FC8E8', [.0, 2.95, .98], { rot: [Math.PI / 2 - .25, 0, 0], mat: { roughness: .15, emissive: '#2A8AB0', emissiveIntensity: .25 } }); body.add(win);
  body.add(mesh(new THREE.TorusGeometry(.34, .05, 8, 24), '#2A1E56', [0, 2.95, 1.0], { rot: [-.25, 0, 0], mat: SM }));
  const pintu = group(body, [-.0, 1.05, 1.08]); pintu.add(mesh(G.box(.95, 1.25, .1), '#E2DCEA', [0, .62, 0], { mat: SM })); pintu.add(mesh(G.box(.95, .12, .12), '#FF8A3D', [0, .2, .02], { mat: SM }));
  const nama = canvasPlane(1.3, .32, (x, W, H) => { x.fillStyle = '#2A1E56'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFF3E2'; x.font = `800 ${Math.round(H * .6)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(o.label || 'DENAH-01', W / 2, H / 2 + 2) }, 400);
  nama.position.set(0, 2.2, 1.17); body.add(nama);
  g.userData = { body, pintu, win }; return g;
}
export function kawah(parent, p, r = 3) {   // bekas jatuh: cincin tanah gelap + gosong
  const g = group(parent, p); g.add(mesh(new THREE.TorusGeometry(r, r * .22, 8, 28), '#B86A4A', [0, 0, 0], { rot: [Math.PI / 2, 0, 0], s: [1, 1, .5] })); g.add(mesh(G.cyl(r, r, .04, 28), '#5E3A4A', [0, .02, 0], { cast: false })); return g;
}
export function papanPenduduk(parent, p, n = 0) {   // papan PENDUDUK (follow = 1 pendatang)
  const g = group(parent, p); [-1, 1].forEach(x => g.add(mesh(G.box(.14, 2.4, .14), '#4A3A6A', [x * 1.15, 1.2, 0])));
  const pap = canvasPlane(2.6, 1.3, () => { }, 600); pap.position.set(0, 2.1, .08); g.add(pap); g.add(mesh(G.box(2.72, 1.42, .1), '#2A1E56', [0, 2.1, 0]));
  g.userData.set = v => pap.userData.redraw((x, W, H) => { x.fillStyle = '#2A1E56'; x.fillRect(0, 0, W, H); x.strokeStyle = '#FF9F45'; x.lineWidth = 8; x.strokeRect(8, 8, W - 16, H - 16);
    x.fillStyle = '#5FE0D0'; x.textAlign = 'center'; x.font = `700 ${Math.round(H * .17)}px Poppins`; x.fillText('PENDUDUK', W / 2, H * .3); x.fillStyle = '#FFF3E2'; x.font = `800 ${Math.round(H * .46)}px Poppins`; x.fillText(String(v), W / 2, H * .82) });
  g.userData.set(n); return g;
}
export function tumpukanBata(parent, p, max = 240) {   // tumpukan bata (like = 10 bata); setN(n) menampilkan n bata
  const g = group(parent, p); const m = new THREE.InstancedMesh(new THREE.BoxGeometry(.42, .2, .2), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .85 }), max); m.castShadow = m.receiveShadow = true; g.add(m);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), Y = new THREE.Vector3(0, 1, 0), col = new THREE.Color();
  for (let i = 0; i < max; i++) { const lay = Math.floor(i / 12), k = i % 12, off = lay % 2 ? .1 : -.1; const a = (k % 3) * .44 - .44 + off, b = Math.floor(k / 3) * .22 - .33;
    Q.setFromAxisAngle(Y, 0); M.compose(new THREE.Vector3(a, .24 + lay * .2, b), Q, new THREE.Vector3(1, 1, 1)); m.setMatrixAt(i, M); m.setColorAt(i, col.set(grade(['#C8553D', '#B5452B', '#D2694A'][(i * 7) % 3]))) }
  m.count = 0; g.userData.setN = n => { m.count = Math.max(0, Math.min(max, Math.round(n))) }; return g;
}
export function pintuSaja(parent, p) {   // hasil kerja PENGGARIS: kusen + daun pintu berdiri sendirian di padang (pivot daun = userData.daun)
  const g = group(parent, p); const K = '#8A5A3A';
  g.add(mesh(G.box(.14, 2.2, .18), K, [-.55, 1.1, 0])); g.add(mesh(G.box(.14, 2.2, .18), K, [.55, 1.1, 0])); g.add(mesh(G.box(1.24, .14, .18), K, [0, 2.2, 0])); g.add(mesh(G.box(1.5, .06, .5), '#9A8A7A', [0, .03, 0]));
  const daun = group(g, [-.48, 0, 0]); daun.add(mesh(G.box(.96, 2.06, .07), '#E8B04A', [.48, 1.08, 0])); daun.add(mesh(G.sph(.05, 8, 6), '#4A3A2A', [.86, 1.05, .06], { cast: false }));
  [.55, 1.55].forEach(y => daun.add(mesh(G.box(.7, .6, .02), '#D49A38', [.48, y, .045], { cast: false })));
  g.userData.daun = daun; return g;
}
export function garisDenah(parent, p, w, d, o = {}) {   // garis denah di tanah (putih + angka ukuran): tampak atas = cetak biru
  const g = group(parent, p); const C = o.c || '#FFFFFF', T = o.t || .07; const M = { emissive: C, emissiveIntensity: .5 };
  [[0, -d / 2, w, T], [0, d / 2, w, T]].forEach(([x, z, a, b]) => g.add(mesh(G.box(a, .03, b), C, [x, .03, z], { cast: false, mat: M })));
  [[-w / 2, 0, T, d], [w / 2, 0, T, d]].forEach(([x, z, a, b]) => g.add(mesh(G.box(a, .03, b), C, [x, .03, z], { cast: false, mat: M })));
  if (o.ukur !== false) { const lab = (txt, x, z, r) => { const m = canvasPlane(1.6, .4, (c, W, H) => { c.fillStyle = '#FFFFFF'; c.font = `800 ${Math.round(H * .7)}px Poppins`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, W / 2, H / 2 + 2) }, 300);
      m.material.transparent = true; m.rotation.set(-Math.PI / 2, 0, r); m.position.set(x, .05, z); g.add(m) };
    lab(o.lw || `${w} m`, 0, d / 2 + .5, 0); lab(o.ld || `${d} m`, w / 2 + .5, 0, Math.PI / 2) }
  return g;
}
export function hologram(parent, p, items) {   // papan hologram dari kapsul: pelat aturan menyala satu-satu (userData.plates)
  const g = group(parent, p); g.add(mesh(G.cyl(.6, .75, .3, 16), '#2A1E56', [0, .15, 0], { mat: { flatShading: false } })); g.add(mesh(G.cyl(.5, .5, .04, 16), '#5FE0D0', [0, .31, 0], { mat: { emissive: '#5FE0D0', emissiveIntensity: 1 } }));
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(2.6, .5, 4.2, 20, 1, true), new THREE.MeshBasicMaterial({ color: '#7FF0E2', transparent: true, opacity: .12, side: THREE.DoubleSide, depthWrite: false })); beam.position.y = 2.4; g.add(beam);
  const plates = items.map(([a, b], i) => { const m = canvasPlane(4.4, .78, (x, W, H) => { x.fillStyle = 'rgba(30,22,70,.9)'; x.fillRect(0, 0, W, H); x.strokeStyle = '#5FE0D0'; x.lineWidth = 6; x.strokeRect(3, 3, W - 6, H - 6);
      x.textBaseline = 'middle'; x.fillStyle = '#FF9F45'; x.font = `800 ${Math.round(H * .42)}px Poppins`; x.fillText(a, 26, H / 2 + 2); x.textAlign = 'right'; x.fillStyle = '#FFF3E2'; x.font = `700 ${Math.round(H * .32)}px Poppins`; x.fillText(b, W - 26, H / 2 + 2) }, 760);
    m.material.emissive = new THREE.Color('#6A6090'); m.material.emissiveMap = m.material.map; m.position.set(0, 3.7 - i * .95, 0); g.add(m); m.scale.setScalar(.001); return m });
  g.userData.plates = plates; return g;
}

// ---- planet luas: tanah oranye + bercak ungu, ratusan batu/kristal/tanaman aneh (instanced), bukit mesa, kawah ----
const RNG = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function inst(geo, n, o = {}) { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial(Object.assign({ color: '#FFFFFF', roughness: .8, flatShading: true }, o)), n); m.castShadow = m.receiveShadow = true; return m }
export function planet(sc, o = {}) {
  const R = RNG(o.seed || 11), S = o.size || 120, hole = o.hole || (() => false), out = {};
  sc.add(mesh(G.box(S * 4, .02, S * 4), '#E89A62', [0, -.03, 0], { cast: false }));
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), Sc = new THREE.Vector3(), col = new THREE.Color(), Y = new THREE.Vector3(0, 1, 0);
  const put = (im, i, x, y, z, sx, sy, sz, ry, c) => { Q.setFromAxisAngle(Y, ry); M.compose(V.set(x, y, z), Q, Sc.set(sx, sy, sz)); im.setMatrixAt(i, M); im.setColorAt(i, col.set(grade(c))) };
  const spot = (r = S) => { for (let k = 0; k < 20; k++) { const x = (R() - .5) * 2 * r, z = (R() - .5) * 2 * r; if (!hole(x, z)) return [x, z] } return [r * 3, r * 3] };
  // bercak tanah ungu/merah muda/oranye tua (cakram datar)
  const pat = inst(new THREE.CylinderGeometry(1, 1, .02, 14), 260); pat.castShadow = false; for (let i = 0; i < 260; i++) { const [x, z] = spot(S * 1.3); const r = 2 + R() * 7; put(pat, i, x, .005 + i * .00002, z, r, 1, r * (.6 + R() * .5), R() * 6, ['#A86AB8', '#C27AB0', '#D9805A', '#9C64B0', '#F0B07A'][Math.floor(R() * 5)]) } sc.add(pat);
  // batu
  const bt = inst(new THREE.IcosahedronGeometry(1, 0), 340); for (let i = 0; i < 340; i++) { const [x, z] = spot(); const s = .2 + Math.pow(R(), 3) * 1.6; put(bt, i, x, s * .35, z, s * (1 + R() * .4), s * (.6 + R() * .4), s, R() * 6, ['#7A5A8A', '#8E6A7A', '#6A4E7A', '#A0786A'][Math.floor(R() * 4)]) } sc.add(bt);
  // kristal (oktahedron memanjang, sedikit bercahaya)
  const kr = inst(new THREE.OctahedronGeometry(1, 0), 300, { roughness: .25, emissive: '#3A8A9A', emissiveIntensity: .25 }); for (let i = 0; i < 300; i++) { const [x, z] = spot(); const s = .15 + R() * .5; put(kr, i, x + (i % 3) * .3, s * 1.4, z, s * .6, s * 2.2, s * .6, R() * 6, ['#6FE0E0', '#FF9AD5', '#B79AFF', '#7FD8FF'][Math.floor(R() * 4)]); kr.setMatrixAt(i, M.multiply(new THREE.Matrix4().makeRotationZ((R() - .5) * .6))) } sc.add(kr);
  // tanaman aneh: batang melengkung + bola bercahaya di ujung
  const N = 320, tb = inst(new THREE.CylinderGeometry(.05, .09, 1, 6), N), tk = inst(new THREE.SphereGeometry(1, 10, 8), N, { flatShading: false, emissive: '#FF7AA8', emissiveIntensity: .2, roughness: .5 }); tk.castShadow = false;
  for (let i = 0; i < N; i++) { const [x, z] = spot(); const h = .6 + R() * 1.6, r = .12 + R() * .2; put(tb, i, x, h / 2, z, 1, h, 1, R() * 6, ['#5FA88A', '#3F9A9A', '#7AB86A'][Math.floor(R() * 3)]);
    put(tk, i, x, h + r * .6, z, r, r * 1.2, r, 0, ['#FF7AA8', '#FFD25A', '#9AF0C8', '#C79AFF'][Math.floor(R() * 4)]) } sc.add(tb); sc.add(tk);
  // semak bulat ungu
  const sm = inst(new THREE.IcosahedronGeometry(1, 1), 220); for (let i = 0; i < 220; i++) { const [x, z] = spot(); const s = .3 + R() * .5; put(sm, i, x, s * .5, z, s, s * .7, s, R() * 6, ['#8A5AB8', '#A86AC8', '#6E9AD0'][Math.floor(R() * 3)]) } sc.add(sm);
  // kawah kecil
  for (let i = 0; i < 18; i++) { const [x, z] = spot(); kawah(sc, [x, 0, z], 1.5 + R() * 3) }
  // bukit mesa (berlapis) + bukit kerucut di cakrawala
  for (let k = 0; k < 22; k++) { const a = k / 22 * Math.PI * 2 + R() * .2, r = S * .9 + R() * S * .6, x = Math.cos(a) * r, z = Math.sin(a) * r, w = 10 + R() * 18, h = 6 + R() * 14;
    const c = ['#D9805A', '#B86AA0', '#C9906A', '#9C6AB8'][k % 4]; sc.add(mesh(G.cyl(w * .75, w, h, 9), c, [x, h / 2, z], { cast: false })); sc.add(mesh(G.cyl(w * .78, w * .78, 1.2, 9), '#F0B48A', [x, h * .62, z], { cast: false })) }
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 + .15, r = S * 1.7 + R() * 40; sc.add(mesh(G.cone(30 + R() * 25, 20 + R() * 22, 7), ['#B07AB8', '#C28AA8', '#9A7AC0'][k % 3], [Math.cos(a) * r, 9, Math.sin(a) * r], { cast: false })) }
  return out;
}
export function bulanDanPlanet(sc, o = {}) { bulan(sc, o); return planet(sc, o) }

// ---- grid cetak biru di layar (tampak atas) ----
export function gridDenah(root) {
  const e = X.ab({ left: 0, top: 0, width: 1080, height: 1920, opacity: 0, pointerEvents: 'none', background: 'rgba(31,95,175,.28)' }, root,
    `<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffffff38 0 2px,transparent 2px 90px),repeating-linear-gradient(0deg,#ffffff38 0 2px,transparent 2px 90px)"></div>
     <div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffffff18 0 1px,transparent 1px 18px),repeating-linear-gradient(0deg,#ffffff18 0 1px,transparent 1px 18px)"></div>`);
  return op => { e.style.opacity = op };
}

// ---- teks DOM ----
export const BIG = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: PFONT, fontWeight: 800, fontSize: '150px', color: '#FFF3E2', textShadow: '0 6px 0 #2A1E56, 0 16px 38px rgba(30,10,60,.55)', letterSpacing: '2px', opacity: 0 }, css), root, html);
export const LABEL = (root, a, b, top = 330) => X.ab({ left: 60, top, width: 960, textAlign: 'center', opacity: 0, fontFamily: PFONT }, root,
  `<div style="display:inline-block;background:${PANEL};color:${PCREAM};border-radius:18px;padding:16px 34px;box-shadow:0 12px 28px #0000005c;border:1px solid #ffffff22">
   <div style="font-size:64px;font-weight:800;color:${PORANGE};letter-spacing:2px">${a}</div><div style="font-size:40px;font-weight:700">${b}</div></div>`);
export const show = (e, p, dy = 30) => { const q = E.out(Math.max(0, Math.min(1, p))); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * dy}px)` };
export const pulse = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 ? 1 : 0; e.style.transform = `scale(${q > 0 ? .7 + .3 * E.back(q) : .7})` };
export const ease = (t, a, b) => E.inout(seg(t, a, b));
export function debu(sc, n = 18, col = '#C98AA8') { const d = Array.from({ length: n }, () => { const m = mesh(G.sph(.22, 8, 6), col, [0, -5, 0], { cast: false, mat: { transparent: true, opacity: .5 } }); sc.add(m); return m });
  return (t, t0, p, r = 3) => d.forEach((m, i) => { const q = seg(t, t0, t0 + 1.8); m.visible = q > 0 && q < 1; const a = i / n * Math.PI * 2; m.position.set(p[0] + Math.cos(a) * q * r, p[1] + .2 + Math.abs(Math.sin(i * 1.7)) * q * 1.4, p[2] + Math.sin(a) * q * r); m.scale.setScalar(.6 + q * 2.2) }) }
export function api(sc) {   // ekor api + asap kapsul jatuh
  const f = Array.from({ length: 18 }, (_, i) => { const m = mesh(G.sph(.7, 8, 6), i % 2 ? '#FFB347' : '#FF6B3D', [0, -9, 0], { cast: false, mat: { emissive: i % 2 ? '#FFB347' : '#FF6B3D', emissiveIntensity: 1.2, transparent: true, opacity: .85 } }); sc.add(m); return m });
  return (t, base, dir, on) => f.forEach((m, i) => { const q = ((t * 3 + i / 14) % 1); m.visible = on; m.position.set(base.x - dir[0] * (q * 7 - .8) + Math.sin(i * 2.1) * q * .8, base.y + 1.5 - dir[1] * (q * 7 - .8), base.z - dir[2] * (q * 7 - .8) + Math.cos(i * 2.1) * q * .8); m.scale.setScalar((1 - q) * 1.6 + .3) });
}
export { lerp, seg, E };
