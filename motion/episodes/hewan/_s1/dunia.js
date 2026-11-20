// Dunia Hewan Berdasi Kotor Season 1 "Kerajaan Berdasi" (MMORPG fantasi): tokoh + lokasi dipakai ulang sepanjang season.
// Benua 4 kerajaan: Kota Pura (Kucing, selatan, atap oranye + kastel), Pulau Langit (Burung, timur, pulau melayang),
// Rawa Hijau (Reptil, barat, rawa bakau), Utara Bersalju (Serigala, utara, gunung salju + benteng gelap). Laut di sekeliling.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, person, grade, cloud } from '../../../engine/w3d/kit.js';
import { X, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { FONT, ORANGE, PARCH, INK, NAVY, setHUD } from '../../../engine/w3d/rpg.js';
export { FONT, ORANGE, PARCH, INK, NAVY, setHUD };

// ---- suasana: siang fantasi cerah ----
export const CERAH = o => newScene(Object.assign({ sky: ['#4FA3E0', '#DDF1FF'], sun: '#FFF2D0', sunPos: [16, 24, 14], hemi: 1.3, sunI: 2.6, shadow: 22, fog: ['#D8ECF8', 110, 380] }, o));
export const SORE = o => newScene(Object.assign({ sky: ['#5E8FD6', '#FFD9A8'], sun: '#FFD7A0', sunPos: [-14, 12, 10], hemi: 1.25, sunI: 2.5, shadow: 22, fog: ['#F6DDBE', 90, 340] }, o));

// ---- tokoh hewan (badan stickman + kepala hewan) ----
const hand = g => group(g.userData.st.arms[1].userData.elbow, [0, -.31, 0]);
const SM = { flatShading: false, roughness: .6 };
function tail(g, col, n = 6, r = .045) { const T = group(g, [0, .95, -.1]); let p = T; for (let i = 0; i < n; i++) { const s = group(p, [0, i ? .14 : 0, 0]); s.rotation.x = i ? .25 : -.9; s.add(mesh(G.cyl(r, r, .16, 8), col, [0, .07, 0], { mat: SM })); p = s } g.userData.tail = T; return T }
export function catHead(g, o = {}) {   // telinga, moncong putih, hidung pink, kumis, belang di dahi
  const h = g.userData.st.head, c = o.skin, d = o.stripe;
  [-1, 1].forEach(i => { h.add(mesh(G.cone(.09, .17, 4), c, [i * .13, .23, 0], { rot: [0, 0, -i * .35] })); h.add(mesh(G.cone(.05, .1, 4), '#F2A8B0', [i * .125, .22, .03], { rot: [0, 0, -i * .35], cast: false })) });
  h.add(mesh(G.sph(.085, 12, 10), o.muzzle || '#FFF4E6', [0, -.03, .19], { s: [1.3, .8, .7], mat: SM })); h.add(mesh(G.sph(.025, 8, 6), '#E86A7A', [0, .0, .25], { cast: false }));
  [-1, 1].forEach(i => [0, 1].forEach(k => h.add(mesh(G.box(.2, .008, .008), '#FFFFFF', [i * .17, -.03 + k * .03, .2], { rot: [0, 0, i * (k ? .12 : -.1)], cast: false }))));
  if (d) [-1, 0, 1].forEach(i => h.add(mesh(G.box(.035, .1, .02), d, [i * .06, .15, .19], { rot: [.3, 0, i * .25], cast: false })));
  tail(g, c);
}
export function belang(p, o = {}) {   // kucing oren prajurit Lv 1, tanpa dasi, tunik kulit, sendok
  const g = person(o.parent, p, Object.assign({ body: '#9A6A3E', pants: '#5A3E2A', skin: '#F28C28' }, o)); catHead(g, { skin: '#F28C28', stripe: '#C2571A' });
  g.userData.st.body.add(mesh(G.box(.26, .05, .22), '#5A3E22', [0, .1, 0], { cast: false }));   // sabuk
  const k = hand(g); k.add(mesh(G.box(.035, .32, .02), '#D8DDE2', [0, -.05, .05], { mat: { metalness: .8, roughness: .25 } })); const bowl = mesh(G.sph(.07, 12, 8), '#E8ECF0', [0, -.24, .05], { s: [1, 1.35, .4], mat: { metalness: .8, roughness: .2 } }); k.add(bowl); g.userData.sendok = bowl;
  return g;
}
const CATC = [['#9AA0A8', '#6E747C'], ['#F4F0E6', null], ['#3A3A40', null], ['#E8C89A', '#B8875A'], ['#C9772E', '#8A4A1A'], ['#B8B8BE', '#7A7A82']];
export function prajurit(p, i = 0, o = {}) {   // prajurit kucing: seragam biru kerajaan, helm, DASI merah
  const [sk, st] = CATC[i % 6]; const g = person(o.parent, p, Object.assign({ body: '#2F4F9A', pants: '#22345E', skin: sk, tie: '#C0392B' }, o)); catHead(g, { skin: sk, stripe: st });
  g.userData.st.head.add(mesh(G.sph(.235, 16, 10, 0, Math.PI * 2, 0, Math.PI * .42), '#C9CED6', [0, .04, -.01], { mat: { metalness: .6, roughness: .35, flatShading: false } }));
  const k = hand(g); k.add(mesh(G.cyl(.02, .02, 1.5, 6), '#7A5A3A', [0, .4, .05])); k.add(mesh(G.cone(.05, .18, 4), '#D8DDE2', [0, 1.2, .05], { mat: { metalness: .7, roughness: .3 } }));
  return g;
}
export function raja(p, o = {}) {   // Raja Kucing Berdasi: gendut, mahkota, jubah, dasi KOTOR bernoda (+ lalat)
  const g = person(o.parent, p, Object.assign({ s: 1.3, body: '#6B3FA0', pants: '#3E2A5E', skin: '#ECE6DA' }, o)); catHead(g, { skin: '#ECE6DA', stripe: '#B8AE9C' });
  const b = g.userData.st.body; b.add(mesh(G.sph(.27, 18, 14), '#6B3FA0', [0, .24, .06], { s: [1, 1.05, .9], mat: SM }));
  const tie = group(b, [0, .38, .3]); tie.add(mesh(G.box(.1, .07, .04), '#7A6A3A', [0, 0, 0])); tie.add(mesh(G.box(.12, .38, .03), '#7A6A3A', [0, -.22, -.01], { rot: [-.2, 0, 0] }));
  [[.02, -.12], [-.03, -.26], [.03, -.34]].forEach(([x, y]) => tie.add(mesh(G.sph(.03, 6, 5), '#3E3220', [x, y, .01], { s: [1, .7, .3], cast: false })));
  const h = g.userData.st.head; const cr = group(h, [0, .23, 0]); cr.add(mesh(G.cyl(.15, .14, .1, 12), '#F5C542', [0, 0, 0], { mat: { metalness: .7, roughness: .3 } })); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; cr.add(mesh(G.cone(.035, .1, 4), '#F5C542', [Math.cos(a) * .13, .09, Math.sin(a) * .13], { mat: { metalness: .7, roughness: .3 } })) } cr.add(mesh(G.sph(.03, 8, 6), '#D7372B', [0, .02, .15], { cast: false }));
  g.add(mesh(G.box(.62, 1.1, .05), '#B5302A', [0, .95, -.2], { rot: [.12, 0, 0] })); g.add(mesh(G.box(.66, .12, .2), '#F4F0E6', [0, 1.48, -.12]));
  const flies = Array.from({ length: 3 }, () => { const f = mesh(G.sph(.025, 6, 5), '#1E1E1E', [0, 0, 0], { cast: false }); tie.add(f); return f });
  g.userData.lalat = t => flies.forEach((f, i) => f.position.set(Math.cos(t * 7 + i * 2) * .18, -.15 + Math.sin(t * 9 + i) * .12, .1 + Math.sin(t * 5 + i) * .08));
  return g;
}
export function burhan(p, o = {}) {   // Prof. Burhan: burung hantu penjual peta/item, pelit; jubah, kacamata, mata besar
  const g = person(o.parent, p, Object.assign({ s: .92, body: '#4A3A6A', pants: '#2E2440', skin: '#9A7A56', glasses: true }, o)); const h = g.userData.st.head;
  [-1, 1].forEach(i => { h.add(mesh(G.cyl(.085, .085, .02, 18), '#FFF6D8', [i * .09, .03, .2], { rot: [Math.PI / 2, 0, 0], cast: false })); h.add(mesh(G.sph(.04, 10, 8), '#F2B233', [i * .09, .03, .215], { cast: false })); h.add(mesh(G.sph(.02, 8, 6), '#1E1E1E', [i * .09, .03, .235], { cast: false }));
    h.add(mesh(G.cone(.05, .14, 4), '#7A5A3A', [i * .14, .24, 0], { rot: [0, 0, -i * .2] })) });
  h.add(mesh(G.cone(.035, .09, 4), ORANGE, [0, -.06, .23], { rot: [Math.PI / 2 + .4, 0, 0] })); g.userData.st.body.add(mesh(G.sph(.17, 14, 10), '#E8D8B8', [0, .3, .05], { s: [.8, 1.1, .6], mat: SM }));
  const k = hand(g); k.add(mesh(G.cyl(.04, .04, .36, 10), '#F2E6C2', [0, -.1, .05], { rot: [0, 0, Math.PI / 2] }));
  return g;
}
export function serigala(p, o = {}) {   // prajurit Serigala Utara: abu, moncong, armor gelap
  const g = person(o.parent, p, Object.assign({ s: 1.08, body: '#3A3F4A', pants: '#2A2E36', skin: '#7A808A' }, o)); const h = g.userData.st.head;
  [-1, 1].forEach(i => h.add(mesh(G.cone(.08, .22, 4), '#7A808A', [i * .12, .26, -.02], { rot: [0, 0, -i * .2] }))); h.add(mesh(G.cone(.1, .26, 6), '#9AA0A8', [0, -.04, .28], { rot: [Math.PI / 2, 0, 0] })); h.add(mesh(G.sph(.03, 8, 6), '#1E1E1E', [0, -.04, .41], { cast: false }));
  [-1, 1].forEach(i => h.add(mesh(G.sph(.03, 8, 6), '#F2D23A', [i * .09, .05, .2], { cast: false, mat: { emissive: '#F2D23A', emissiveIntensity: .6 } }))); tail(g, '#7A808A', 5, .06); return g;
}
export function tikusRaksasa(parent, p, s = 1) {   // bos tikus raksasa penjaga lumbung (mata merah menyala)
  const g = group(parent, p); g.scale.setScalar(s); const C = '#6E6A72';
  g.add(mesh(G.sph(1.6, 18, 14), C, [0, 1.6, 0], { s: [1, .95, 1.35], mat: SM })); const hd = group(g, [0, 2.4, 1.8]); hd.add(mesh(G.sph(1, 16, 12), C, [0, 0, 0], { s: [1, .9, 1.2], mat: SM }));
  hd.add(mesh(G.cone(.45, 1, 10), C, [0, -.2, 1.1], { rot: [Math.PI / 2, 0, 0], mat: SM })); hd.add(mesh(G.sph(.16, 10, 8), '#E86A7A', [0, -.2, 1.62], { mat: SM }));
  [-1, 1].forEach(i => { hd.add(mesh(G.cyl(.6, .6, .1, 18), C, [i * .7, .8, -.1], { rot: [Math.PI / 2, 0, 0] })); hd.add(mesh(G.cyl(.4, .4, .05, 16), '#E8A9B0', [i * .7, .8, -.03], { rot: [Math.PI / 2, 0, 0], cast: false }));
    hd.add(new THREE.Mesh(G.sph(.17, 12, 10), new THREE.MeshBasicMaterial({ color: '#FF2A1A' })).translateX(i * .4).translateY(.3).translateZ(.95)); hd.add(mesh(G.box(.06, .3, .04), '#FFF6E0', [i * .07, -.6, 1.25])) });
  const tl = group(g, [0, 1, -2]); for (let i = 0; i < 10; i++) tl.add(mesh(G.cyl(.12 - i * .009, .12 - i * .009, .5, 8), '#C99AA0', [0, Math.sin(i * .6) * .4, -i * .45], { rot: [Math.PI / 2, 0, 0] }));
  g.userData.hd = hd; return g;
}

// ---- benua 4 kerajaan (InstancedMesh) ----
const RNG = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function inst(geo, n, o = {}) { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial(Object.assign({ color: '#FFFFFF', roughness: .85, flatShading: true }, o)), n); m.castShadow = o.cast !== false; m.receiveShadow = true; m.count = 0; return m }
const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), V3 = new THREE.Vector3(), S3 = new THREE.Vector3(), COL = new THREE.Color(), UP = new THREE.Vector3(0, 1, 0);
function put(m, p, s, ry = 0, c) { if (m.count >= m.instanceMatrix.count) return; Q.setFromAxisAngle(UP, ry); M4.compose(V3.set(...p), Q, S3.set(...s)); m.setMatrixAt(m.count, M4); if (c) m.setColorAt(m.count, COL.set(grade(c))); m.count++ }
export const KP = [0, 0, 60];   // pusat Kota Pura
export const KERAJAAN = { kucing: [0, 0, 62], burung: [92, 22, 0], reptil: [-88, 0, 6], serigala: [0, 0, -88] };
export const SPOT = { kastel: [0, 0, 50], plaza: [0, 0, 60], lumbung: [17, 0, 66], lapak: [-12, 0, 70], gerbang: [0, 0, 86] };
const zona = (x, z) => z > 30 && Math.abs(x) < 60 ? 'kucing' : z < -30 ? 'serigala' : x < -30 ? 'reptil' : x > 30 ? 'burung' : 'tengah';
export function benua(sc, o = {}) {
  const R = RNG(o.seed || 5), out = {}; const hole = o.hole || (() => false);
  sc.add(mesh(G.box(900, .02, 900), '#3E92C8', [0, -1.2, 0], { cast: false, mat: { roughness: .25, metalness: .1 } }));
  // daratan: gabungan piringan, warna per zona
  [[0, 0, 70, '#9CC65A'], [0, 62, 46, '#A6CC62'], [-86, 6, 46, '#6E9A6A'], [0, -86, 50, '#EEF2F6'], [52, 0, 34, '#8FBF5A'], [-40, -40, 36, '#D6E2E6'], [40, -44, 34, '#DCE6EA'], [-46, 40, 34, '#8FB86A'], [46, 44, 30, '#A6CC62']]
    .forEach(([x, z, r, c], i) => { sc.add(mesh(G.cyl(r, r + 3, 2.4, 40), c, [x, -1.2 + i * .002, z], { cast: false })); sc.add(mesh(G.cyl(r + 3.2, r + 4.5, .3, 40), '#E8D8A8', [x, -1.05, z], { cast: false })) });
  // rawa: kolam
  for (let k = 0; k < 26; k++) { const x = -86 + (R() - .5) * 70, z = 6 + (R() - .5) * 70; sc.add(mesh(G.cyl(2 + R() * 4, 2 + R() * 4, .05, 14), '#4E9A8E', [x, .03, z], { cast: false, mat: { roughness: .2 } })) }
  // pohon per zona: bulat (kucing/tengah), bakau (rawa), pinus salju (utara)
  const tk = inst(new THREE.CylinderGeometry(.14, .2, 1, 6), 1400), rd = inst(new THREE.IcosahedronGeometry(1, 0), 900), pn = inst(new THREE.ConeGeometry(1, 2.6, 7), 700), sn = inst(new THREE.ConeGeometry(.55, .9, 7), 700, { cast: false });
  for (let k = 0; k < 1400; k++) { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * 125, x = Math.cos(a) * d, z = Math.sin(a) * d * 1.05; const zz = zona(x, z);
    if (Math.hypot(x - KP[0], z - KP[2]) < 31 || hole(x, z) || zz === 'burung' && x > 60) continue; const s = .8 + R() * .9;
    if (zz === 'serigala') { put(tk, [x, .5 * s, z], [s, s, s]); put(pn, [x, 1.9 * s, z], [s, s, s], 0, ['#2F5E4A', '#3E6E56', '#2A5244'][k % 3]); put(sn, [x, 2.9 * s, z], [s, s, s], 0, '#F6FAFC') }
    else if (zz === 'reptil') { put(tk, [x, .9 * s, z], [s * 1.3, 1.8 * s, s * 1.3], 0, '#5A4630'); put(rd, [x, 2.2 * s, z], [s * 1.5, s * .8, s * 1.5], R() * 3, ['#3E6E3A', '#4E7E3E', '#2E5E3A'][k % 3]) }
    else { put(tk, [x, .6 * s, z], [s, 1.2 * s, s]); put(rd, [x, 1.7 * s, z], [s * 1.1, s, s * 1.1], R() * 3, ['#4E8F3A', '#5E9B3E', '#6EA848', '#3F7A32'][k % 4]) } }
  [tk, rd, pn, sn].forEach(m => sc.add(m));
  // gunung salju utara
  for (let k = 0; k < 9; k++) { const x = -70 + k * 17 + (R() - .5) * 8, z = -100 - (k % 3) * 14, h = 22 + R() * 18, r = 13 + R() * 6; sc.add(mesh(G.cone(r, h, 7), '#8A96A6', [x, h / 2 - 1, z], { cast: false })); sc.add(mesh(G.cone(r * .42, h * .42, 7), '#F6FAFC', [x, h - h * .21 - 1, z], { cast: false })) }
  out.benteng = bentengSerigala(sc, [0, 0, -76]);
  // pulau langit (burung)
  out.pulau = [[92, 20, -6, 12], [74, 30, 18, 8], [106, 34, 22, 7], [82, 40, -26, 6], [112, 18, -24, 6]].map(([x, y, z, r], i) => pulauLangit(sc, [x, y, z], r, i));
  for (let k = 0; k < 14; k++) cloud(sc, [70 + R() * 50, 8 + R() * 30, -40 + R() * 70], 2 + R() * 2.5);
  // Kota Pura
  out.kota = kotaPura(sc, KP, R);
  return out;
}
function bentengSerigala(sc, p) { const g = group(sc, p); g.add(mesh(G.box(16, 7, 10), '#4A505C', [0, 3.5, 0])); [-1, 1].forEach(x => { g.add(mesh(G.cyl(2.2, 2.4, 12, 8), '#3E444E', [x * 8, 6, 0])); g.add(mesh(G.cone(2.8, 4, 8), '#2E3A52', [x * 8, 14, 0])) });
  g.add(mesh(G.cyl(2.6, 2.8, 16, 8), '#3E444E', [0, 8, -2])); g.add(mesh(G.cone(3.2, 5, 8), '#2E3A52', [0, 18.5, -2])); g.add(mesh(G.box(.1, 3, 2.2), '#7A808A', [0, 22.5, -2])); return g }
function pulauLangit(sc, p, r, i) { const g = group(sc, p); g.add(mesh(G.cyl(r, r * .9, 1.2, 10), '#8FCB6A', [0, 0, 0])); g.add(mesh(G.cone(r * .9, r * 1.6, 10), '#A08A6A', [0, -r * .8 - .6, 0], { rot: [Math.PI, 0, 0] }));
  for (let k = 0; k < Math.round(r / 2); k++) { const a = k * 2.1, d = r * .5; const h = group(g, [Math.cos(a) * d, .6, Math.sin(a) * d]); h.add(mesh(G.cyl(.9, 1, 1.6, 8), '#F4F0E6', [0, .8, 0])); h.add(mesh(G.cone(1.2, 1.4, 8), '#2E9EA8', [0, 2.3, 0])) }
  if (i === 0) { g.add(mesh(G.cyl(.7, .9, 7, 8), '#F4F0E6', [0, 4, 0])); g.add(mesh(G.cone(1.3, 2.4, 8), '#2E9EA8', [0, 8.6, 0])) } return g }
export function kotaPura(sc, p, R = RNG(9)) {   // tembok bundar, menara, rumah atap oranye (instanced), kastel, plaza, lumbung, pasar
  const g = group(sc, p), out = { g }; const RW = 26;
  g.add(mesh(G.cyl(RW, RW, .06, 48), '#D9C9A0', [0, .02, 0], { cast: false }));
  const wall = inst(new THREE.BoxGeometry(1, 1, 1), 80); for (let k = 0; k < 64; k++) { const a = (k + .5) / 64 * Math.PI * 2; if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a)) - Math.PI / 2) < .1) continue; put(wall, [Math.cos(a) * RW + p[0], 1.6, Math.sin(a) * RW + p[2]], [2.7, 3.2, 1], -a + Math.PI / 2, '#E2D6BC') } sc.add(wall);
  for (let k = 0; k < 10; k++) { const a = (k + .5) / 10 * Math.PI * 2; if (Math.abs(a - Math.PI / 2) < .3) continue; const t = group(g, [Math.cos(a) * RW, 0, Math.sin(a) * RW]); t.add(mesh(G.cyl(1.4, 1.5, 5.4, 10), '#EDE3C8', [0, 2.7, 0])); t.add(mesh(G.cone(1.8, 2.4, 10), '#E0782E', [0, 6.6, 0])) }
  const gt = group(g, [0, 0, RW]); [-1, 1].forEach(s => { gt.add(mesh(G.cyl(1.6, 1.7, 6.5, 10), '#EDE3C8', [s * 3.4, 3.25, 0])); gt.add(mesh(G.cone(2, 2.8, 10), '#E0782E', [s * 3.4, 7.9, 0])) }); gt.add(mesh(G.box(5.6, 1.4, 1.4), '#EDE3C8', [0, 5.2, 0]));
  out.gerbang = gt;
  // rumah
  const MAX = 420, body = inst(new THREE.BoxGeometry(1, 1, 1), MAX), roof = inst(new THREE.ConeGeometry(.78, 1, 4), MAX);
  for (let x = -RW; x < RW; x += 3.1) for (let z = -RW; z < RW; z += 3.3) { const jx = x + (R() - .5) * .7, jz = z + (R() - .5) * .7, r = Math.hypot(jx, jz);
    if (r > RW - 3 || r < 4 || (Math.abs(jx) < 13 && jz > -2 && jz < 18.5) || (Math.abs(jx) < 2.2) || (jz > -16 && jz < -2 && Math.abs(jx) < 10) || (Math.abs(jx - 17) < 5 && Math.abs(jz - 6) < 5) || R() < .07) continue;
    const w = 1.8 + R() * .5, d = 1.8 + R() * .5, h = 1.6 + R() * 1.4, ry = Math.floor(R() * 4) * Math.PI / 2;
    put(body, [jx + p[0], h / 2, jz + p[2]], [w, h, d], ry, ['#F4EAD2', '#EFE0C4', '#F6F0E2', '#E8D6B8'][Math.floor(R() * 4)]); put(roof, [jx + p[0], h + .55, jz + p[2]], [w + .5, 1.1, d + .5], ry + Math.PI / 4, ['#E0782E', '#D9652A', '#E89A3A', '#C9572A'][Math.floor(R() * 4)]) }
  sc.add(body); sc.add(roof); out.rumah = body.count;
  out.kastel = kastel(g, [0, 0, -10]); out.lumbung = lumbung(g, [17, 0, 6], -Math.PI / 2); out.lapak = lapak(g, [-12, 0, 10]);
  [[-11, 2], [11, 2], [11, 12], [-6, 16], [6, 14]].forEach(([x, z], i) => { const f = group(g, [x, 0, z]); f.add(mesh(G.cyl(.06, .06, 4.5, 6), '#8A6A3A', [0, 2.25, 0])); const fl = canvasPlane(1.4, .9, (c, W, H) => { c.fillStyle = '#E0782E'; c.fillRect(0, 0, W, H); c.fillStyle = '#F6E7C1'; c.font = `800 ${H * .6}px Baloo`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🐟', W / 2, H / 2 + 4) }, 200); fl.position.set(.72, 3.9, 0); fl.material.side = THREE.DoubleSide; f.add(fl) });
  return out;
}
export function kastel(parent, p) {   // kastel raja: menara, balkon, spanduk ikan
  const g = group(parent, p); g.add(mesh(G.box(16, 8, 7), '#EDE3C8', [0, 4, -2])); g.add(mesh(G.box(16.4, .6, 7.4), '#D8CBAA', [0, 8.3, -2]));
  for (let i = -7.5; i <= 7.5; i += 1.5) g.add(mesh(G.box(.7, .8, .7), '#EDE3C8', [i, 9, 1.4]));
  [[-8.5, 0], [8.5, 0], [-6, -5], [6, -5]].forEach(([x, z], i) => { g.add(mesh(G.cyl(1.8, 2, 13 + (i > 1 ? 3 : 0), 10), '#F2EAD6', [x, 6.5 + (i > 1 ? 1.5 : 0), z])); g.add(mesh(G.cone(2.4, 4, 10), '#E0782E', [x, 15 + (i > 1 ? 3 : 0), z])) });
  g.add(mesh(G.cyl(2.4, 2.6, 18, 10), '#F2EAD6', [0, 9, -4])); g.add(mesh(G.cone(3, 5.5, 10), '#D9652A', [0, 20.7, -4]));
  g.add(mesh(G.box(3, 4.2, .2), '#6E4A2C', [0, 2.1, 1.55])); const bal = group(g, [0, 5.2, 1.5]); bal.add(mesh(G.box(4.2, .25, 2), '#D8CBAA', [0, 0, .8])); bal.add(mesh(G.box(4.2, .7, .15), '#D8CBAA', [0, .45, 1.75]));
  [-5, 5].forEach(x => { const b = canvasPlane(1.8, 4.2, (c, W, H) => { c.fillStyle = '#B5302A'; c.fillRect(0, 0, W, H); c.fillStyle = '#F5C542'; c.fillRect(0, H * .9, W, H * .1); c.font = `${W * .7}px serif`; c.textAlign = 'center'; c.fillText('🐟', W / 2, H * .45); c.fillStyle = '#F5C542'; c.fillRect(W * .38, H * .55, W * .24, H * .28) }, 200); b.position.set(x, 5.5, 1.62); g.add(b) });
  g.userData.balkon = bal; return g;
}
export function lumbung(parent, p, rot = 0) {   // lumbung ikan raksasa: dua daun pintu (poros), papan ikon ikan
  const g = group(parent, p); g.rotation.y = rot; const WC = '#B5452B';
  g.add(mesh(G.box(9, .2, 8), '#9C7A50', [0, .1, -1])); g.add(mesh(G.box(9, 6, .3), WC, [0, 3, -5])); [-1, 1].forEach(s => { g.add(mesh(G.box(.3, 6, 8), WC, [s * 4.5, 3, -1])); g.add(mesh(G.box(2, 6, .3), WC, [s * 3.5, 3, 2.9])) }); g.add(mesh(G.box(5, 1.4, .3), WC, [0, 5.3, 2.9]));
  for (let i = 0; i < 4; i++) g.add(mesh(G.box(8.4, .12, .9), '#8A5A33', [0, 1.4 + i * 1.1, -4.4]));   // rak kosong
  const r = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 4.8, 9.4, 4, 1, false, 0, Math.PI), mat('#7A3E2E')); r.rotation.z = Math.PI / 2; r.rotation.y = Math.PI / 2; r.scale.set(1, 1, .5); r.position.set(0, 6, -1); r.castShadow = true; g.add(r);
  const doors = [-1, 1].map(s => { const d = group(g, [s * 2.5, 0, 3.05]); d.add(mesh(G.box(2.5, 4.6, .14), '#E8D8B8', [-s * 1.25, 2.3, 0])); d.add(mesh(G.box(2.4, .2, .16), '#8A5A33', [-s * 1.25, 2.3, .02], { rot: [0, 0, s * .9] })); return d });
  const nm = canvasPlane(3.6, .8, (c, W, H) => { c.fillStyle = '#F6E7C1'; c.fillRect(0, 0, W, H); c.fillStyle = '#2A1A10'; c.font = `800 ${H * .55}px Baloo`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('LUMBUNG IKAN 🐟', W / 2, H / 2 + 4) }, 600); nm.position.set(0, 5.3, 3.07); g.add(nm);
  g.userData.doors = doors; g.userData.open = a => { doors[0].rotation.y = -a; doors[1].rotation.y = a }; return g;
}
export function lapak(parent, p) {   // lapak Prof. Burhan: meja, gulungan peta, papan harga, rolling door
  const g = group(parent, p); g.add(mesh(G.box(4, 3.2, 2.6), '#5E8A9A', [0, 1.6, -1.6])); g.add(mesh(G.box(4.4, .2, 3.2), '#2E5E7A', [0, 3.3, -.7], { rot: [.15, 0, 0] }));
  g.add(mesh(G.box(3.6, 1, .8), '#8A5A33', [0, .5, .6])); for (let i = 0; i < 5; i++) g.add(mesh(G.cyl(.09, .09, .7, 8), '#F2E6C2', [-1.2 + i * .55, 1.08, .55], { rot: [0, 0, Math.PI / 2] }));
  const harga = canvasPlane(1.8, .8, (c, W, H) => { c.fillStyle = '#F6E7C1'; c.fillRect(0, 0, W, H); c.strokeStyle = '#8A5A2A'; c.lineWidth = 10; c.strokeRect(0, 0, W, H); c.fillStyle = '#B5302A'; c.font = `800 ${H * .32}px Baloo`; c.textAlign = 'center'; c.fillText('PETA RAHASIA', W / 2, H * .4); c.fillStyle = '#2A1A10'; c.font = `800 ${H * .4}px Baloo`; c.fillText('50 🪙', W / 2, H * .85) }, 400);
  harga.position.set(1.3, 2.4, .32); g.add(harga); const door = mesh(G.box(4, 3, .1), '#9AA3AC', [0, 1.5, .35], { mat: { metalness: .4, roughness: .5 } }); g.add(door); door.scale.y = .001; door.position.y = 3;
  g.userData.tutup = q => { door.scale.y = Math.max(.001, q); door.position.y = 3 - 1.5 * q }; g.userData.tutup(0); return g;
}

// ---- teks DOM ----
export const BIG = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '130px', color: PARCH, textShadow: `0 6px 0 ${ORANGE}, 0 12px 0 ${INK}, 0 18px 40px rgba(0,0,0,.5)`, letterSpacing: '2px', opacity: 0 }, css), root, html);
export const POP = (root, html, css = {}) => X.ab(Object.assign({ left: 90, top: 340, width: 900, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '44px', color: INK, background: PARCH, border: '6px solid #8A5A2A', borderRadius: '18px', padding: '18px 24px', boxShadow: '0 14px 30px #00000066', opacity: 0 }, css), root, html);
export const show = (e, p, dy = 30) => { const q = E.out(Math.max(0, Math.min(1, p))); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * dy}px)` };
export const pulse = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 ? 1 : 0; e.style.transform = `scale(${q > 0 ? .7 + .3 * E.back(q) : .7})` };
export const ease = (t, a, b) => E.inout(seg(t, a, b));
export function tagAt(root, html, css = {}) { const w = X.ab({ left: 0, top: 0 }, root); const e = X.ab(Object.assign({ position: 'relative', transform: 'translate(-50%,-100%)', fontFamily: FONT, fontWeight: 800, fontSize: '32px', color: PARCH, background: `${NAVY}EE`, border: `3px solid ${ORANGE}`, borderRadius: '12px', padding: '6px 16px', whiteSpace: 'nowrap', opacity: 0 }, css), w, html);
  return (obj, cam, off, p) => { const [x, y] = X.proj(obj, cam, off); w.style.left = Math.max(220, Math.min(860, x)) + 'px'; w.style.top = y + 'px'; e.style.opacity = Math.max(0, Math.min(1, p)) } }
export function labelKerajaan(root, B) {
  const N = [[B.kota.g, 'KOTA PURA · KUCING', [0, 14, 0]], [B.pulau[0], 'PULAU LANGIT · BURUNG', [0, 12, 0]], [null, 'RAWA HIJAU · REPTIL', KERAJAAN.reptil], [B.benteng, 'UTARA BERSALJU · SERIGALA', [0, 26, 0]]];
  const dummy = new THREE.Object3D(); const L = N.map(([o, t, off], i) => ({ o: o || dummy, off: o ? off : off, e: X.ab({ left: 0, top: 0, fontFamily: FONT, fontWeight: 800, fontSize: '30px', color: PARCH, background: `${NAVY}EE`, border: `3px solid ${['#F28C28', '#4FB6E0', '#5EB05A', '#B8C4D4'][i]}`, padding: '6px 16px', borderRadius: '12px', whiteSpace: 'nowrap', opacity: 0, transform: 'translate(-50%,-100%)' }, root, t) }));
  return (cam, op) => L.forEach(({ o, off, e }) => { const [x, y, z] = X.proj(o, cam, off); e.style.left = Math.max(200, Math.min(880, x)) + 'px'; e.style.top = y + 'px'; e.style.opacity = z < 1 && y > 250 && y < 1400 ? op : 0 });
}
