// Dunia Balai Desa Bocor Season 1 "Desa Terakhir": tokoh + lokasi yang dipakai ulang sepanjang season.
// Desa bundar di kaki bukit, pagar bambu melingkar dengan cincin obor, gerbang bambu (engsel karatan), menara kentongan,
// alun-alun (balai desa + spanduk), posko penyintas, gudang, sawah luas + jerami, kabut. Zombie kartun hijau (tidak sadis).
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, tree, person, grade } from '../../../engine/w3d/kit.js';
import { X, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { FONT, RUST, BONE, MOSS, AMBER } from '../../../engine/w3d/zombie.js';
export { FONT, RUST, BONE, MOSS, AMBER };

// ---- suasana (semua tetap terang) ----
export const SIANG = o => newScene(Object.assign({ sky: ['#7DB8E0', '#EEF2DE'], sun: '#FFF0D0', sunPos: [14, 20, 12], hemi: 1.25, sunI: 2.5, shadow: 20, fog: ['#E6EBD8', 70, 260] }, o));
export const SENJA = o => newScene(Object.assign({ sky: ['#6C7FB8', '#F4AE7E'], sun: '#FFC796', sunPos: [-16, 9, 10], hemi: 1.25, sunI: 2.5, shadow: 20, fog: ['#EBC3A6', 60, 240] }, o));
export const MALAM = o => { const sc = newScene(Object.assign({ sky: ['#1A2A66', '#5E5C9E'], sun: '#C9D6FF', sunPos: [-12, 18, -8], hemi: 1.6, hemiSky: '#C0CCF4', hemiGround: '#4A4660', sunI: 1.9, shadow: 20, fog: ['#3E4882', 70, 260] }, o));
  const moon = mesh(G.sph(7, 24, 16), '#FFF6D8', [-70, 70, -170], { cast: false, mat: { emissive: '#FFF0C0', emissiveIntensity: 1.2, flatShading: false } }); moon.material = new THREE.MeshBasicMaterial({ color: '#FFF4D2', fog: false }); sc.add(moon);
  const warm = new THREE.PointLight('#FFB25A', 0, 26, 1.4); sc.add(warm); sc.userData.warm = warm; return sc };

// ---- tokoh (stickman 3D, theme.figure = stick) ----
const hand = g => group(g.userData.st.arms[1].userData.elbow, [0, -.31, 0]);
export function gilang(p, o = {}) {   // 24 th, ketua karang taruna, jago bengkel: kemeja denim, ikat kepala merah, kunci inggris
  const g = person(o.parent, p, Object.assign({ body: '#3F6E95', pants: '#2C2E36', skin: '#B97A52', hair: '#17110D' }, o)); const h = g.userData.st.head;
  h.add(mesh(G.cyl(.232, .232, .06, 20), '#C8372D', [0, .1, 0], { mat: { flatShading: false } })); h.add(mesh(G.box(.05, .16, .03), '#C8372D', [0, .02, -.24], { rot: [.4, 0, .3] }));
  const k = hand(g); k.add(mesh(G.box(.05, .34, .03), '#9AA3AC', [0, -.12, .04], { mat: { metalness: .5, roughness: .4 } })); k.add(mesh(G.box(.14, .07, .04), '#9AA3AC', [0, -.3, .04], { mat: { metalness: .5, roughness: .4 } }));
  g.userData.st.body.add(mesh(G.box(.24, .05, .2), '#6E4A2C', [0, .02, 0], { cast: false }));   // sabuk perkakas
  return g;
}
export function yati(p, o = {}) {   // bidan desa, tenang: seragam putih, kerudung hijau teal, tas P3K
  const g = person(o.parent, p, Object.assign({ body: '#F4F2EC', pants: '#4E8C86', skin: '#D9A07A' }, o)); const h = g.userData.st.head;
  h.add(mesh(G.sph(.238, 20, 16), '#2F7F7A', [0, .07, -.06], { mat: { flatShading: false } })); h.add(mesh(G.cone(.27, .3, 20), '#2F7F7A', [0, -.17, -.05], { mat: { flatShading: false } }));
  const k = hand(g); k.add(mesh(G.box(.36, .26, .16), '#FFFFFF', [0, -.18, .02])); k.add(mesh(G.box(.14, .04, .17), '#D93B3B', [0, -.16, .02], { cast: false })); k.add(mesh(G.box(.04, .14, .17), '#D93B3B', [0, -.16, .02], { cast: false }));
  return g;
}
export function kardi(p, o = {}) {   // pensiunan hansip, penakut tapi ngaku berani: seragam hijau, topi, kumis, pentungan
  const g = person(o.parent, p, Object.assign({ body: '#5E6E3A', pants: '#3E4A2A', skin: '#B97A52', hair: '#D8D8D8', hat: 'cap', hatC: '#4A5530', mustache: true }, o));
  const k = hand(g); k.add(mesh(G.cyl(.035, .035, .6, 8), '#2A2A2A', [0, -.2, .05])); g.userData.st.body.add(mesh(G.box(.12, .08, .02), '#E8C766', [.06, .4, .11], { cast: false }));
  return g;
}
export function sinta(p, o = {}) {   // adik Gilang, 12 th, paling cerdik: kaos kuning, rambut kuncir, senter
  const g = person(o.parent, p, Object.assign({ s: .76, body: '#F2C14E', pants: '#7A4E8A', skin: '#C98E64', hair: '#17110D' }, o)); const h = g.userData.st.head;
  h.add(mesh(G.sph(.08, 10, 8), '#17110D', [0, .1, -.27], { mat: { flatShading: false } })); h.add(mesh(G.cyl(.05, .02, .22, 8), '#17110D', [0, -.03, -.32], { rot: [.5, 0, 0] }));
  const k = hand(g); k.add(mesh(G.cyl(.04, .05, .2, 10), '#3A3A44', [0, -.08, .06], { rot: [1.3, 0, 0] })); const lamp = mesh(G.cyl(.05, .05, .02, 10), '#FFF3B0', [0, -.04, .16], { rot: [1.3, 0, 0], mat: { emissive: '#FFE680', emissiveIntensity: 1.5 }, cast: false }); k.add(lamp);
  return g;
}
export function kades(p, o = {}) {   // kades yang kabur: seragam safari krem, peci
  return person(o.parent, p, Object.assign({ body: '#C9B27E', pants: '#8A7650', skin: '#C98E64', hat: 'peci', mustache: true }, o));
}
export function warga(p, i = 0, o = {}) {
  return person(o.parent, p, Object.assign({ body: ['#B5452B', '#3E86B0', '#E8B94A', '#6E9A5C', '#8A5A9A', '#D9774A'][i % 6], pants: ['#3B3B3B', '#4A3A2A', '#2E3A4A'][i % 3], skin: ['#E2A97E', '#C98E64', '#B97A52'][i % 3], hair: i % 4 === 3 ? '#C8C8C8' : '#1E1612' }, o));
}
// zombie kartun: kulit hijau, baju lusuh, lengan lurus ke depan, jalan menyeret miring
const ZB = ['#7C8B9A', '#9A7A5A', '#8A6A8A', '#6E7E5E', '#A08A6A', '#5E7A8A'];
export function zombie(p, i = 0, o = {}) {
  const g = person(o.parent, p, Object.assign({ body: ZB[i % 6], pants: ['#4A4A52', '#5A4A3A', '#3E4A3E'][i % 3], skin: ['#96C45E', '#8CBF6A', '#A3C964'][i % 3], hair: i % 3 ? '#2E3A22' : null }, o));
  const b = g.userData.st.body; b.add(mesh(G.box(.07, .1, .02), '#5E6E4A', [.05, .18, .1], { cast: false })); b.add(mesh(G.box(.05, .06, .02), '#3E4A3A', [-.04, .38, .1], { cast: false }));
  g.userData.st.head.traverse(m => { if (m.isMesh && m.geometry.type === 'SphereGeometry' && m.geometry.parameters.radius < .05) m.material = mat('#F4F1C8', { emissive: '#E8E2A0', emissiveIntensity: .5, flatShading: false }) });
  const ph = i * 1.7;
  g.shamble = (t, w = 1) => { g.pose(t * .55 + ph, { walk: w * .8 }); const st = g.userData.st;
    st.arms.forEach((A, k) => { A.rotation.x = -1.45 + Math.sin(t * 2 + ph + k) * .12; A.rotation.z = (k ? 1 : -1) * .08; A.userData.elbow.rotation.x = -.15 });
    st.head.rotation.z = .35 + Math.sin(t * 1.3 + ph) * .1; st.head.rotation.x = .15; st.body.rotation.z = Math.sin(t * 2.2 + ph) * .06; st.mouth.scale.y = 2.5 };
  g.shamble(0); return g;
}
export const duduk = (p, y) => { p.userData.st.legs.forEach(L => { L.rotation.x = -1.45; L.userData.knee && (L.userData.knee.rotation.x = 1.45) }); p.position.y = y };

// ---- desa besar berpagar bambu (InstancedMesh) ----
const RNG = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function inst(geo, n, o = {}) { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial(Object.assign({ color: '#FFFFFF', roughness: .85, flatShading: true }, o)), n); m.castShadow = o.cast !== false; m.receiveShadow = true; m.count = 0; return m }
const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), V3 = new THREE.Vector3(), S3 = new THREE.Vector3(), COL = new THREE.Color(), UP = new THREE.Vector3(0, 1, 0);
function put(m, p, s, ry = 0, c) { Q.setFromAxisAngle(UP, ry); M4.compose(V3.set(...p), Q, S3.set(...s)); m.setMatrixAt(m.count, M4); if (c) m.setColorAt(m.count, COL.set(grade(c))); m.count++ }
export const RF = 46, GATE = [0, 0, RF];   // jari-jari pagar, posisi gerbang (selatan, arah +z)
export const SPOT = { balai: [0, 0, -4], posko: [7.5, 0, 38], gudang: [-17, 0, -13], mushola: [17, 0, -14], menara: [-6.5, 0, 40.5] };
const BUKIT = [[0, -118, 78, 44], [-70, -100, 50, 30], [72, -96, 54, 32], [-120, -40, 40, 22], [125, -30, 42, 24]];
export function desaTerakhir(sc, o = {}) {
  const R = RNG(o.seed || 11), out = {};
  const hole = o.hole || (() => false), lot = (x, z) => Math.abs(x) < 11.5 && Math.abs(z + 2) < 11 || (Math.abs(x) < 11 && z > RF - 13) || [SPOT.gudang, SPOT.mushola].some(p => Math.abs(p[0] - x) < 7 && Math.abs(p[2] - z) < 6);
  sc.add(mesh(G.box(420, .02, 420), '#86A85A', [0, -.03, 0], { cast: false }));
  sc.add(mesh(G.cyl(RF + 1.5, RF + 1.5, .03, 64), '#A3B86C', [0, -.005, 0], { cast: false }));
  // sawah di luar pagar + jalan keluar gerbang
  const pet = inst(new THREE.BoxGeometry(1, .03, 1), 1700, { cast: false });
  for (let x = -170; x < 170; x += 6.2) for (let z = -60; z < 175; z += 5) { const r = Math.hypot(x, z); if (r < RF + 5 || Math.abs(x) < 4.5 || pet.count >= 1700) continue; if (BUKIT.some(([bx, bz, br]) => Math.hypot(x - bx, z - bz) < br * .9)) continue;
    put(pet, [x, .01, z], [5.8, 1, 4.6], 0, ['#9CC657', '#86B348', '#C9C46A', '#7FB07A', '#B4D46E', '#D8C070'][Math.floor(R() * 6)]) }
  sc.add(pet); sc.add(mesh(G.box(4.4, .04, 140), '#B9A274', [0, .02, RF + 70], { cast: false }));
  const jerami = inst(new THREE.ConeGeometry(1, 1.4, 7), 70); for (let k = 0; k < 70; k++) { const x = (R() - .5) * 220, z = 60 + R() * 100; if (Math.abs(x) < 7) continue; const s = .7 + R() * .5; put(jerami, [x, .6 * s, z], [s * 1.1, s, s * 1.1], R() * 3, ['#D9B85A', '#C9A44A', '#E2C46A'][k % 3]) } sc.add(jerami); out.jerami = jerami;
  // bukit + hutan di lerengnya
  BUKIT.forEach(([x, z, r, h], i) => sc.add(mesh(G.cone(r, h, 9), ['#6E9A5E', '#7FA66A', '#5E8A5A', '#88A870', '#6E9466'][i], [x, h / 2 - .5, z], { cast: false, rot: [0, i, 0] })));
  const tk = inst(new THREE.CylinderGeometry(.14, .2, 1, 6), 900), cr = inst(new THREE.ConeGeometry(.9, 2.2, 7), 900);
  for (let k = 0; k < 900; k++) { const [bx, bz, br, bh] = BUKIT[k % 5]; const a = R() * Math.PI * 2, d = Math.sqrt(R()) * br * .92; const x = bx + Math.cos(a) * d, z = bz + Math.sin(a) * d * .9; const y = bh * (1 - d / br) - .4; const s = 1 + R() * 1.1;
    put(tk, [x, y + .5 * s, z], [s, s, s]); put(cr, [x, y + 1.9 * s, z], [s, s, s], R() * 3, ['#3F7A3A', '#4E8A44', '#2F6A3A', '#5E9A4A'][Math.floor(R() * 4)]) }
  sc.add(tk); sc.add(cr);
  // pagar bambu melingkar (runcing), dua lapis palang, celah gerbang di selatan
  const gap = 4.2 / RF, N = Math.round(2 * Math.PI * RF / .3), pole = inst(new THREE.CylinderGeometry(.11, .12, 1, 6), N), tip = inst(new THREE.ConeGeometry(.12, .4, 6), N);
  for (let k = 0; k < N; k++) { const a = k / N * Math.PI * 2; if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a)) - Math.PI / 2) < gap) continue; const h = 2.6 + R() * .5, x = Math.cos(a) * RF, z = Math.sin(a) * RF, c = ['#C9B06A', '#B89E5A', '#D6BE7A', '#A88E50'][k % 4];
    put(pole, [x, h / 2, z], [1, h, 1], 0, c); put(tip, [x, h + .2, z], [1, 1, 1], 0, c) }
  sc.add(pole); sc.add(tip);
  const bar = inst(new THREE.BoxGeometry(1, .09, .09), 400); for (let k = 0; k < 200; k++) { const a = (k + .5) / 200 * Math.PI * 2; if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a)) - Math.PI / 2) < gap + .01) continue; [.8, 1.9].forEach(y => put(bar, [Math.cos(a) * (RF + .14), y, Math.sin(a) * (RF + .14)], [2 * Math.PI * RF / 200 + .1, 1, 1], -a + Math.PI / 2, '#8A6E3A')) } sc.add(bar);
  // obor di sepanjang pagar (api = emisif, menyala lewat out.obor(on))
  const NT = 44, tp = inst(new THREE.CylinderGeometry(.06, .08, 1, 6), NT), fl = inst(new THREE.IcosahedronGeometry(.32, 0), NT, { color: '#FFB347', emissive: '#FF8A1E', emissiveIntensity: 1.6, cast: false }); out.torch = [];
  for (let k = 0; k < NT; k++) { const a = (k + .5) / NT * Math.PI * 2; if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a)) - Math.PI / 2) < gap + .05) continue; const x = Math.cos(a) * (RF - .6), z = Math.sin(a) * (RF - .6);
    put(tp, [x, 1.9, z], [1, 3.8, 1], 0, '#5A3E22'); out.torch.push([x, 4.05, z]); put(fl, [x, 4.05, z], [1, 1.5, 1]) }
  sc.add(tp); sc.add(fl); out.flame = fl;
  out.obor = f => { for (let k = 0; k < fl.count; k++) { const q = typeof f === 'function' ? f(k, out.torch[k]) : f; put0(fl, k, out.torch[k], [q, q * 1.5, q]) } fl.instanceMatrix.needsUpdate = true };
  // jalan di dalam desa
  [[0, 0, 3, RF * 2 - 4], [0, 0, RF * 2 - 4, 3]].forEach(([x, z, w, d]) => sc.add(mesh(G.box(w, .03, d), '#BCA57A', [x, .015, z], { cast: false })));
  [[0, -26, RF * 1.7, 2], [0, 22, RF * 1.75, 2], [-24, 0, 2, RF * 1.6], [24, 0, 2, RF * 1.6]].forEach(([x, z, w, d]) => sc.add(mesh(G.box(w, .028, d), '#C2AE86', [x, .014, z], { cast: false })));
  sc.add(mesh(G.box(21, .035, 20), '#CDBB92', [0, .02, -2], { cast: false }));
  // rumah instanced (anyaman bambu, papan, seng, genteng) di blok sepanjang jalan
  const MAXH = 520, body = inst(new THREE.BoxGeometry(1, 1, 1), MAXH), roof = inst(new THREE.CylinderGeometry(0, .78, 1, 4, 1), MAXH), door = inst(new THREE.BoxGeometry(1, 1, 1), MAXH, { cast: false });
  const WALL = ['#D9C08A', '#E6D3A8', '#EFE8DA', '#CFB98E', '#E2CFA0', '#D8CCB4'], ROOF = ['#8E9AA6', '#A8573A', '#7A3E2E', '#B89A5A', '#9C4A2E', '#6E7A86'];
  for (let x = -RF; x < RF; x += 3.05) for (let z = -RF; z < RF; z += 3.45) { const jx = x + (R() - .5) * .8, jz = z + (R() - .5) * .8, r = Math.hypot(jx, jz);
    if (r > RF - 4.5 || lot(jx, jz) || hole(jx, jz) || Math.abs(jx) < 2.6 || Math.abs(jz) < 2.6 || Math.abs(jz + 26) < 2 || Math.abs(jz - 22) < 2 || Math.abs(Math.abs(jx) - 24) < 2 || R() < .06 || body.count >= MAXH) continue;
    const w = 1.8 + R() * .6, d = 1.8 + R() * .5, hh = 1.4 + R() * .5, ry = Math.floor(R() * 4) * Math.PI / 2 + (R() - .5) * .2;
    put(body, [jx, hh / 2, jz], [w, hh, d], ry, WALL[Math.floor(R() * 6)]); put(roof, [jx, hh + .5, jz], [(w + .6) * .95, 1, (d + .6) * .95], ry + Math.PI / 4, ROOF[Math.floor(R() * 6)]);
    const dx = Math.sin(ry) * (d / 2 + .01), dz = Math.cos(ry) * (d / 2 + .01); put(door, [jx + dx, .45, jz + dz], [.5, .9, .05], ry, '#5E3E26') }
  sc.add(body); sc.add(roof); sc.add(door); out.rumah = body.count;
  // pohon pisang/kelapa/rimbun di sela rumah
  const tt = inst(new THREE.CylinderGeometry(.1, .16, 1, 6), 260), tc = inst(new THREE.IcosahedronGeometry(1, 0), 260);
  for (let k = 0; k < 260; k++) { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * (RF - 3); const x = Math.cos(a) * d, z = Math.sin(a) * d; if (lot(x, z) || hole(x, z) || Math.abs(x) < 2.4 || Math.abs(z) < 2.4) continue; const s = .7 + R() * .6;
    put(tt, [x, .7 * s, z], [s, 1.4 * s, s]); put(tc, [x, 1.8 * s, z], [s, s * .9, s], R() * 3, ['#4E8F3A', '#5E9B3E', '#3F7A32', '#6EA048'][Math.floor(R() * 4)]) }
  sc.add(tt); sc.add(tc);
  // bangunan penting
  out.balai = balaiDesa(sc, SPOT.balai); out.posko = posko(sc, SPOT.posko); out.gudang = gudang(sc, SPOT.gudang, Math.PI / 2); out.mushola = mushola(sc, SPOT.mushola);
  out.menara = menara(sc, SPOT.menara); out.gate = gerbang(sc, GATE);
  return out;
}
function put0(m, i, p, s) { M4.compose(V3.set(...p), Q.identity(), S3.set(...s)); m.setMatrixAt(i, M4) }

// ---- bangunan / benda ----
export function bambu(parent, p, h, r = .1, c = '#C9B06A') { const m = mesh(G.cyl(r, r * 1.08, h, 7), c, [p[0], p[1] + h / 2, p[2]]); parent.add(m); return m }
export function menara(parent, p) {   // menara kentongan bambu: 4 tiang, lantai di 3.6 m, atap rumbia, kentongan tergantung
  const g = group(parent, p); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => bambu(g, [x * 1.1, 0, z * 1.1], 6.2, .13, '#B89E5A'));
  g.add(mesh(G.box(2.8, .16, 2.8), '#9C7A46', [0, 3.6, 0])); [-1, 1].forEach(s => { g.add(mesh(G.box(2.8, .08, .08), '#8A6E3A', [0, 4.4, s * 1.1])); g.add(mesh(G.box(.08, .08, 2.8), '#8A6E3A', [s * 1.1, 4.4, 0])) });
  const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#B89A5A')); r.scale.set(2.6, 1.3, 2.6); r.rotation.y = Math.PI / 4; r.position.y = 6.75; r.castShadow = true; g.add(r);
  for (let i = 0; i < 6; i++) g.add(mesh(G.box(.5, .08, .1), '#8A6E3A', [1.25, .5 + i * .55, 1.12], { rot: [0, 0, 0] }));
  const k = group(g, [.55, 5.1, 1.1]); k.add(mesh(G.cyl(.012, .012, .5, 4), '#3A2A1A', [0, .25, 0])); const ken = mesh(G.cyl(.17, .17, .9, 10), '#9A6A3A', [0, -.45, 0]); k.add(ken); k.add(mesh(G.box(.05, .6, .04), '#2A1A10', [0, -.45, .16], { cast: false }));
  g.userData = { kentongan: k, floor: 3.68 }; return g;
}
export function gerbang(parent, p) {   // dua menara jaga bambu + dua daun gerbang (poros di engsel karatan)
  const g = group(parent, p); const leaves = [];
  [-1, 1].forEach(s => { const t = group(g, [s * 3.7, 0, 0]); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => bambu(t, [x * .6, 0, z * .6], 5.2, .12, '#B89E5A'));
    t.add(mesh(G.box(1.7, .14, 1.7), '#9C7A46', [0, 3.3, 0])); const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#9C7A46')); r.scale.set(1.5, .9, 1.5); r.rotation.y = Math.PI / 4; r.position.y = 5.6; t.add(r);
    [.9, 1.8, 2.7].forEach(y => t.add(mesh(G.box(1.3, .07, .07), '#8A6E3A', [0, y, .62])));
    const L = group(g, [s * 2.95, 0, 0]); for (let i = 0; i < 11; i++) bambu(L, [-s * (.15 + i * .26), .15, 0], 3 + (i % 2) * .25, .1, ['#C9B06A', '#B89E5A', '#D6BE7A'][i % 3]);
    [.7, 2.4].forEach(y => L.add(mesh(G.box(2.95, .1, .1), '#7A5E30', [-s * 1.45, y, .1]))); L.add(mesh(G.box(3.2, .09, .09), '#7A5E30', [-s * 1.45, 1.55, .12], { rot: [0, 0, s * .52] }));
    [.8, 2.3].forEach(y => L.add(mesh(G.cyl(.09, .09, .3, 10), '#9A4A22', [0, y, .05], { mat: { metalness: .3, roughness: .7 } })));
    leaves.push(L) });
  const papan = canvasPlane(3.4, .6, (x, W, H) => { x.fillStyle = '#5A3E22'; x.fillRect(0, 0, W, H); x.fillStyle = '#F3E9D2'; x.font = `800 ${Math.round(H * .5)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SELAMAT DATANG', W / 2, H / 2 + 3) }, 640);
  papan.position.set(0, 4.3, .05); g.add(papan); g.add(mesh(G.box(7.8, .16, .16), '#7A5E30', [0, 3.95, 0]));
  g.userData.leaves = leaves; g.userData.set = a => { leaves[0].rotation.y = a; leaves[1].rotation.y = -a };   // a = 0 tertutup, PI/2 terbuka ke dalam
  g.userData.set(Math.PI / 2 * .95); return g;
}
export function balaiDesa(parent, p) {   // balai desa + spanduk "BANTUAN KOTA SEGERA DATANG"
  const g = group(parent, p); g.add(mesh(G.box(9, .4, 6), '#A89A80', [0, .2, 0])); g.add(mesh(G.box(8.4, 3, 5.4), '#EDE3C8', [0, 1.9, 0]));
  const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#7A3E2E')); r.scale.set(7.2, 2.2, 5.2); r.rotation.y = Math.PI / 4; r.position.y = 4.5; r.castShadow = true; g.add(r);
  for (let i = -3; i <= 3; i += 2) g.add(mesh(G.box(.28, 2.8, .28), '#FFFFFF', [i, 1.8, 2.9]));
  [-2.6, 2.6].forEach(x => g.add(mesh(G.box(1.2, .9, .05), '#3E4E58', [x, 2.2, 2.71], { cast: false })));
  const nm = canvasPlane(3.6, .6, (x, W, H) => { x.fillStyle = '#2E4A3A'; x.fillRect(0, 0, W, H); x.fillStyle = '#F3E9D2'; x.font = `800 ${Math.round(H * .52)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BALAI DESA', W / 2, H / 2 + 3) }, 600); nm.position.set(0, 3.15, 2.72); g.add(nm);
  [-3.2, 3.2].forEach(x => bambu(g, [x, 0, 5.2], 3.6, .07, '#8A6E3A'));
  const sp = canvasPlane(6.2, 1.0, (x, W, H) => { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.fillStyle = '#C8372D'; x.fillRect(0, 0, W, H * .12); x.fillRect(0, H * .88, W, H * .12);
    x.fillStyle = '#1F2A44'; x.font = `800 ${Math.round(H * .38)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BANTUAN KOTA SEGERA DATANG', W / 2, H * .44); x.font = `600 ${Math.round(H * .18)}px Poppins`; x.fillText('mohon bersabar · terima kasih', W / 2, H * .74) }, 1100);
  sp.material.side = THREE.DoubleSide; sp.position.set(0, 2.8, 5.2); g.add(sp); g.userData.spanduk = sp; return g;
}
export function posko(parent, p) {   // posko penyintas: tenda terpal + meja + papan PENYINTAS (angka bisa diganti)
  const g = group(parent, p); const t = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#3E7CB1')); t.scale.set(3.6, 2.2, 3.6); t.rotation.y = Math.PI / 4; t.position.y = 3.2; t.castShadow = true; g.add(t);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => bambu(g, [x * 2.3, 0, z * 2.3], 2.2, .07, '#8A6E3A'));
  g.add(mesh(G.box(2.4, .1, 1), '#9C7A46', [0, .95, .6])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => g.add(mesh(G.box(.08, .95, .08), '#7A5E30', [x * 1.1, .47, .6 + z * .42])));
  g.add(mesh(G.cyl(.35, .35, .9, 12), '#3E6E4A', [-1.9, .45, 1.6])); g.add(mesh(G.cyl(.35, .35, .9, 12), '#B5452B', [-1.1, .45, 2])); g.add(mesh(G.box(.5, .4, .4), '#C9A86A', [1.8, .2, 1.9]));
  const pp = group(g, [2.9, 0, 1.2]); pp.rotation.y = -.5; [-1, 1].forEach(x => pp.add(mesh(G.box(.1, 2.6, .1), '#5A3E22', [x * .9, 1.3, 0])));
  const board = canvasPlane(2, 1.2, () => { }, 520); board.position.set(0, 1.9, .07); pp.add(board);
  g.userData.setN = n => board.userData.redraw((x, W, H) => { x.fillStyle = '#1E2A1C'; x.fillRect(0, 0, W, H); x.strokeStyle = '#F2B33D'; x.lineWidth = 10; x.strokeRect(5, 5, W - 10, H - 10);
    x.fillStyle = '#F3E9D2'; x.textAlign = 'center'; x.font = `800 ${Math.round(H * .17)}px Poppins`; x.fillText('POSKO · PENYINTAS', W / 2, H * .3); x.fillStyle = '#F2B33D'; x.font = `800 ${Math.round(H * .46)}px Poppins`; x.fillText(String(n), W / 2, H * .82) });
  g.userData.setN(37); g.userData.papan = pp; return g;
}
export function gudang(parent, p, rot = 0) {   // gudang kayu: pintu lebar terbuka, rak karung
  const g = group(parent, p); g.rotation.y = rot; g.add(mesh(G.box(7, 3.4, 5), '#9C6B3E', [0, 1.7, -.5])); g.add(mesh(G.box(3, 2.6, .1), '#2A1E14', [0, 1.3, 2.01], { cast: false }));
  const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#6E7A86')); r.scale.set(5.8, 1.8, 4.6); r.rotation.y = Math.PI / 4; r.position.y = 4.3; r.castShadow = true; g.add(r);
  const nm = canvasPlane(2.4, .5, (x, W, H) => { x.fillStyle = '#F2B33D'; x.fillRect(0, 0, W, H); x.fillStyle = '#2A1E10'; x.font = `800 ${Math.round(H * .6)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GUDANG', W / 2, H / 2 + 3) }, 480); nm.position.set(0, 3.0, 2.03); g.add(nm);
  return g;
}
export function mushola(parent, p) { const g = group(parent, p); g.add(mesh(G.box(5, 2.6, 5), '#F4EFE2', [0, 1.3, 0])); g.add(mesh(G.sph(1.8, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), '#2E8B6A', [0, 2.6, 0], { mat: { flatShading: false } })); g.add(mesh(G.cyl(.3, .36, 6, 10), '#F4EFE2', [3, 3, 2])); g.add(mesh(G.cone(.5, 1.2, 10), '#2E8B6A', [3, 6.6, 2])); return g }
export function karung(parent, p, s = 1) { const g = group(parent, p); g.scale.setScalar(s); g.add(mesh(G.sph(.5, 10, 8), '#E9E0C8', [0, .38, 0], { s: [1, .78, .72], mat: { flatShading: false } })); g.add(mesh(G.cyl(.12, .2, .2, 8), '#E9E0C8', [0, .82, 0])); g.add(mesh(G.box(.42, .16, .02), '#3E86B0', [0, .42, .36], { cast: false })); return g }
export function ikatBambu(parent, p, s = 1) { const g = group(parent, p); g.scale.setScalar(s); for (let i = 0; i < 7; i++) g.add(mesh(G.cyl(.09, .09, 2.4, 7), ['#C9B06A', '#B89E5A', '#D6BE7A'][i % 3], [(i % 4) * .19 - .28, .1 + Math.floor(i / 4) * .17, 0], { rot: [Math.PI / 2, 0, 0] })); [-.7, .7].forEach(z => g.add(mesh(new THREE.TorusGeometry(.36, .045, 6, 16), '#C8372D', [0, .2, z]))); return g }
export function gerobak(parent, p) { const g = group(parent, p); g.add(mesh(G.box(1.8, .5, 1.1), '#8A5A33', [0, .75, 0])); [-1, 1].forEach(z => g.add(mesh(G.cyl(.45, .45, .1, 14), '#3A2A1A', [-.2, .45, z * .62], { rot: [Math.PI / 2, 0, 0] }))); [-1, 1].forEach(z => g.add(mesh(G.box(1.4, .06, .06), '#6E4A2C', [1.5, .7, z * .4]))); return g }
export function motorDinas(parent, p) {   // motor dinas: bodi merah marun, pelat MERAH
  const g = group(parent, p); [-1, 1].forEach(x => g.add(mesh(G.cyl(.34, .34, .12, 16), '#1E1E1E', [x * .62, .34, 0], { rot: [Math.PI / 2, 0, 0] })));
  g.add(mesh(G.box(1.1, .32, .3), '#8C2A2A', [0, .62, 0])); g.add(mesh(G.box(.6, .1, .32), '#2A2A2A', [-.2, .84, 0])); g.add(mesh(G.box(.08, .5, .08), '#888', [.62, .78, 0], { rot: [0, 0, -.35] })); g.add(mesh(G.box(.06, .06, .6), '#888', [.72, 1.02, 0]));
  g.add(mesh(G.box(.02, .14, .3), '#D7372B', [-.66, .5, 0], { cast: false })); g.add(mesh(G.sph(.08, 8, 6), '#FFF3B0', [.74, .78, 0], { cast: false, mat: { emissive: '#FFE680', emissiveIntensity: 1 } })); return g;
}
export function teropong(parent) { const g = group(parent); [-1, 1].forEach(i => g.add(mesh(G.cyl(.045, .05, .18, 10), '#2A2A2A', [i * .06, 0, 0], { rot: [Math.PI / 2, 0, 0] }))); return g }
let FOGTEX = null;
function fogTex() { if (FOGTEX) return FOGTEX; const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(128, 64, 4, 128, 64, 124); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.5, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.setTransform(1, 0, 0, .5, 0, 32); x.fillStyle = g; x.fillRect(0, 0, 256, 256); FOGTEX = new THREE.CanvasTexture(c); return FOGTEX }
export function kabut(sc, n = 8, area = [60, 30], c = [0, 0, 70], col = '#EEF2EA', op = .28) {   // lembar kabut lembut (tekstur radial) melayang rendah
  const L = Array.from({ length: n }, (_, i) => { const m = new THREE.Mesh(G.plane(30, 8), new THREE.MeshBasicMaterial({ color: col, map: fogTex(), transparent: true, opacity: op, depthWrite: false })); m.position.set(c[0] + ((i * 37) % 100 / 100 - .5) * area[0], 1.5 + (i % 3) * 1.2, c[2] + ((i * 61) % 100 / 100 - .5) * area[1]); sc.add(m); return m });
  return (t, cam) => L.forEach((m, i) => { m.position.x += Math.sin(t * .2 + i) * .01; if (cam) m.quaternion.copy(cam.quaternion) });
}

// ---- teks DOM ----
export const BIG = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '140px', color: BONE, textShadow: `0 6px 0 ${RUST}, 0 16px 40px rgba(0,0,0,.65)`, letterSpacing: '2px', opacity: 0 }, css), root, html);
export const TAG = (root, html, css = {}) => X.ab(Object.assign({ left: 60, top: 330, fontFamily: FONT, fontWeight: 700, fontSize: '40px', color: BONE, background: 'rgba(30,42,28,.92)', padding: '12px 26px', borderRadius: '10px', borderLeft: `8px solid ${AMBER}`, boxShadow: '0 12px 26px #0000005c', opacity: 0, whiteSpace: 'nowrap' }, css), root, html);
export const show = (e, p, dy = 30) => { const q = E.out(Math.max(0, Math.min(1, p))); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * dy}px)` };
export const pulse = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 ? 1 : 0; e.style.transform = `scale(${q > 0 ? .7 + .3 * E.back(q) : .7})` };
export const ease = (t, a, b) => E.inout(seg(t, a, b));
// label menempel ke bangunan (kamera udara)
export function labelDesa(root, D, extra = []) {
  const N = [['balai', 'BALAI DESA', 5.5], ['posko', 'POSKO', 4], ['gudang', 'GUDANG', 5], ['menara', 'MENARA KENTONGAN', 7.5], ['gate', 'GERBANG', 6]].concat(extra);
  const L = N.map(([k, txt, h]) => ({ o: D[k], h, e: X.ab({ left: 0, top: 0, fontFamily: FONT, fontWeight: 700, fontSize: '26px', letterSpacing: '2px', color: BONE, background: 'rgba(30,42,28,.9)', padding: '6px 14px', borderRadius: '8px', borderBottom: `4px solid ${AMBER}`, whiteSpace: 'nowrap', opacity: 0, transform: 'translate(-50%,-100%)' }, root, txt) }));
  return (cam, op) => L.forEach(({ o, h, e }) => { const [x, y, z] = X.proj(o, cam, [0, h, 0]); e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.opacity = z < 1 && y > 260 && y < 1380 && x > 90 && x < 990 ? op : 0 });
}
