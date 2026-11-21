// Dunia Denah Rumah Dunia Season 1 "Bumi Dimulai dari Jawa": tokoh + lokasi yang dipakai ulang semua episode season ini.
// Jawa tropis CERAH: langit biru, awan putih, sawah & terasering, gunung biru di kejauhan, kelapa, bambu, sungai.
// Lokasi proyek: patok + benang, terpal biru, gerobak, tumpukan bata, papan PENDUDUK BUMI. Kamera khas: tampak atas (denah) lalu menukik.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, person, grade, cloud, globe } from '../../../engine/w3d/kit.js';
import { X, canvasPlane, PFONT, PANEL, PCREAM, PORANGE, PTEAL } from '../../../engine/w3d/rumahdunia.js';

// ---- suasana (selalu cerah) ----
export const PAGI = o => newScene(Object.assign({ sky: ['#4F9BE0', '#DDEFFA'], sun: '#FFF0D2', sunPos: [-14, 20, 12], hemi: 1.3, sunI: 2.6, shadow: 20, hemiGround: '#7AA05A', fog: ['#D8ECF4', 80, 300] }, o));
export const SIANG = o => newScene(Object.assign({ sky: ['#3F92DE', '#D2EAF8'], sun: '#FFF6E2', sunPos: [10, 24, 8], hemi: 1.35, sunI: 2.5, shadow: 20, hemiGround: '#7AA05A', fog: ['#D2E8F4', 80, 300] }, o));
export const SORE = o => newScene(Object.assign({ sky: ['#5B8FD6', '#FFD7A8'], sun: '#FFD2A0', sunPos: [-16, 10, 8], hemi: 1.25, sunI: 2.4, shadow: 20, hemiGround: '#7A905A', fog: ['#F2D8BC', 80, 280] }, o));
export const awan = (sc, n = 12, R = 1) => { const L = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + i, r = 60 + (i * 37) % 60; const c = cloud(sc, [Math.cos(a) * r, 26 + (i % 4) * 5, Math.sin(a) * r - 40], 3 + (i % 3) * 1.5); L.push(c) } return L };

// ---- tokoh ----
export function dena(p, o = {}) {   // arsitek muda: helm proyek kuning, kemeja tosca, rompi oranye, kuncir kuda, gulungan denah biru
  const g = person(o.parent, p, Object.assign({ body: '#2FA39A', pants: '#2F3550', skin: '#D9A07A', hair: '#2A1A12' }, o));
  const st = g.userData.st, b = st.body, h = st.head;
  b.add(mesh(new THREE.CapsuleGeometry(.112, .3, 4, 12), '#FF8A3D', [0, .32, 0], { s: [1, 1, .9], mat: { flatShading: false, roughness: .6 } }));
  b.add(mesh(G.box(.24, .03, .02), '#FFF2B0', [0, .38, .11], { cast: false })); b.add(mesh(G.box(.24, .03, .02), '#FFF2B0', [0, .26, .11], { cast: false }));
  h.add(mesh(G.sph(.245, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#FFC93C', [0, .1, 0], { mat: { flatShading: false, roughness: .5 } }));
  h.add(mesh(G.cyl(.29, .29, .025, 20), '#FFC93C', [0, .1, .02], { mat: { flatShading: false } }));
  h.add(mesh(G.sph(.075, 10, 8), '#2A1A12', [0, .02, -.24], { mat: { flatShading: false } }));
  const ekor = group(h, [0, -.02, -.27]); ekor.add(mesh(new THREE.CapsuleGeometry(.05, .2, 4, 8), '#2A1A12', [0, -.14, -.03], { mat: { flatShading: false } })); st.ekor = ekor;
  if (o.gulung !== false) { const r = mesh(G.cyl(.05, .05, .5, 10), '#6FB4EA', [0, -.28, .06], { rot: [0, 0, Math.PI / 2] }); st.arms[1].userData.elbow?.add(r); g.userData.gulung = r }
  const pose = g.pose; g.pose = (t, q = {}) => { pose(t, q); ekor.rotation.x = Math.sin(t * 5) * .25 * ((q.walk || 0) + (q.bounce ? 1 : 0) + .3);
    if (q.panik) { h.rotation.z = Math.sin(t * 22) * .12; st.arms.forEach((A, i) => { A.rotation.z = (i ? 1 : -1) * (2.0 + Math.sin(t * 18 + i * 2) * .35); A.userData.elbow.rotation.x = -1.2 }) }
    if (q.facepalm) { st.arms[0].rotation.x = -2.3; st.arms[0].rotation.z = .25; st.arms[0].userData.elbow.rotation.x = -1.9; h.rotation.x = .25 } };
  g.pose(0); return g;
}
export function mandor(p, o = {}) {   // Pak Mandor: helm putih kusam, kumis, kaos oblong, handuk oranye di leher, meteran kuning di pinggang, celana kerja
  const g = person(o.parent, p, Object.assign({ body: '#EDE6D6', pants: '#5A5642', skin: '#A86E48', hair: '#3A2A1E', mustache: true }, o));
  const st = g.userData.st, b = st.body, h = st.head;
  b.add(mesh(new THREE.CapsuleGeometry(.13, .22, 4, 12), '#EDE6D6', [0, .2, .02], { mat: { flatShading: false, roughness: .7 } }));   // perut buncit
  b.add(mesh(new THREE.TorusGeometry(.12, .035, 8, 16), '#F08A3A', [0, .5, 0], { rot: [Math.PI / 2, 0, 0], mat: { flatShading: false } }));
  b.add(mesh(G.box(.06, .2, .03), '#F08A3A', [.06, .38, .11], { cast: false }));
  b.add(mesh(G.box(.12, .12, .08), '#F2C230', [.13, .02, .06], { mat: { roughness: .5 } }));   // meteran
  h.add(mesh(G.sph(.245, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#F2F0EA', [0, .1, 0], { mat: { flatShading: false, roughness: .5 } }));
  h.add(mesh(G.cyl(.3, .3, .025, 20), '#F2F0EA', [0, .1, .03], { mat: { flatShading: false } }));
  h.add(mesh(G.box(.22, .05, .04), '#2A1A10', [0, .07, .2], { cast: false }));   // alis tebal
  if (o.kopi) { const c = mesh(G.cyl(.06, .05, .12, 10), '#F4F1EA', [0, -.3, .06]); st.arms[1].userData.elbow?.add(c) }
  if (o.cangkul) { const c = group(st.arms[1].userData.elbow, [0, -.3, 0]); c.add(mesh(G.cyl(.025, .025, 1.1, 6), '#8A5A3A', [0, .1, 0])); c.add(mesh(G.box(.3, .26, .03), '#9AA0A6', [0, -.45, .1], { rot: [.5, 0, 0] })); g.userData.cangkul = c }
  const pose = g.pose; g.pose = (t, q = {}) => { pose(t, q);
    if (q.gali) { const k = Math.sin(t * 6); st.arms.forEach(A => { A.rotation.x = -1.2 + k * .8; A.userData.elbow.rotation.x = -.6 }); b.rotation.x = .25 + k * .15 } else b.rotation.x = 0;
    if (q.langkah) { st.legs.forEach((L, i) => L.rotation.x = Math.sin(t * 5 + i * Math.PI) * .7) } };
  g.pose(0); return g;
}
export function warga(parent, p, i = 0) {   // penduduk baru
  return person(parent, p, { body: ['#E05A4A', '#4A8FD0', '#F2B33A', '#6AAE5A', '#B06AC8'][i % 5], pants: '#3A3A4A', skin: ['#E2A97E', '#C98E64', '#B97A52', '#D9A07A'][i % 4], hair: ['#2A1A10', '#1A1A1A', '#3A2A1E'][i % 3] });
}

// ---- benda lokasi proyek ----
export function papanPenduduk(parent, p, n = 0) {   // papan kayu PENDUDUK BUMI, tiang bambu
  const g = group(parent, p); [-1, 1].forEach(x => g.add(mesh(G.cyl(.08, .09, 2.6, 8), '#C9A85A', [x * 1.15, 1.3, 0], { mat: { flatShading: false } })));
  g.add(mesh(G.box(2.75, 1.45, .1), '#8A5A34', [0, 2.05, -.02]));
  const pap = canvasPlane(2.6, 1.3, () => { }, 600); pap.position.set(0, 2.05, .04); g.add(pap);
  g.userData.set = v => pap.userData.redraw((x, W, H) => { x.fillStyle = '#FBF6EA'; x.fillRect(0, 0, W, H); x.fillStyle = '#C8452E'; x.fillRect(0, 0, W, H * .3);
    x.fillStyle = '#FFFFFF'; x.textAlign = 'center'; x.font = `800 ${Math.round(H * .17)}px Poppins`; x.fillText('PENDUDUK BUMI', W / 2, H * .21); x.fillStyle = '#1F2A3A'; x.font = `800 ${Math.round(H * .5)}px Poppins`; x.fillText(String(v), W / 2, H * .86) });
  g.userData.set(n); return g;
}
export function tumpukanBata(parent, p, max = 240) {   // palet + tumpukan bata (like = 10 bata); setN(n)
  const g = group(parent, p); g.add(mesh(G.box(1.6, .14, 1.1), '#B08A5A', [0, .07, 0]));
  const m = new THREE.InstancedMesh(new THREE.BoxGeometry(.42, .2, .2), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .85 }), max); m.castShadow = m.receiveShadow = true; g.add(m);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), col = new THREE.Color();
  for (let i = 0; i < max; i++) { const lay = Math.floor(i / 12), k = i % 12, off = lay % 2 ? .1 : -.1; M.compose(new THREE.Vector3((k % 3) * .44 - .44 + off, .24 + lay * .2, Math.floor(k / 3) * .22 - .33), Q, new THREE.Vector3(1, 1, 1)); m.setMatrixAt(i, M); m.setColorAt(i, col.set(grade(['#C8553D', '#B5452B', '#D2694A'][(i * 7) % 3]))) }
  m.count = 0; g.userData.setN = n => { m.count = Math.max(0, Math.min(max, Math.round(n))) }; return g;
}
export function patokBenang(parent, p, w, d, o = {}) {   // patok kayu di 4 sudut + benang putih = garis denah di lapangan
  const g = group(parent, p); const T = .035;
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => g.add(mesh(G.box(.08, .5, .08), '#9A6A3A', [a * w / 2, .25, b * d / 2])));
  [[0, -d / 2, w, T], [0, d / 2, w, T]].forEach(([x, z, a, b]) => g.add(mesh(G.box(a, T, b), '#FFFFFF', [x, .4, z], { cast: false, mat: { emissive: '#FFFFFF', emissiveIntensity: .35 } })));
  [[-w / 2, 0, T, d], [w / 2, 0, T, d]].forEach(([x, z, a, b]) => g.add(mesh(G.box(a, T, b), '#FFFFFF', [x, .4, z], { cast: false, mat: { emissive: '#FFFFFF', emissiveIntensity: .35 } })));
  if (o.ukur) { const lab = (txt, x, z, r) => { const m = canvasPlane(2.2, .5, (c, W, H) => { c.fillStyle = '#FFFFFF'; c.font = `800 ${Math.round(H * .62)}px Poppins`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, W / 2, H / 2 + 2) }, 360);
      m.material.transparent = true; m.rotation.set(-Math.PI / 2, 0, r); m.position.set(x, .06, z); g.add(m) }; lab(o.ukur[0], 0, d / 2 + .55, 0); lab(o.ukur[1], w / 2 + .55, 0, Math.PI / 2) }
  return g;
}
export function terpal(parent, p) {   // bedeng mandor: tiang bambu + terpal biru + bangku
  const g = group(parent, p); [[-1.2, -.9], [1.2, -.9], [-1.2, .9], [1.2, .9]].forEach(([x, z]) => g.add(mesh(G.cyl(.06, .06, 2.1, 6), '#C9A85A', [x, 1.05, z])));
  g.add(mesh(G.box(2.8, .05, 2.2), '#2F7FD0', [0, 2.15, 0], { rot: [.1, 0, 0] })); g.add(mesh(G.box(2, .08, .5), '#9A6A3A', [0, .45, -.4])); [-.8, .8].forEach(x => g.add(mesh(G.box(.08, .45, .4), '#7A4E2C', [x, .22, -.4])));
  return g;
}
export function gerobak(parent, p) {   // gerobak dorong (arco)
  const g = group(parent, p); g.add(mesh(G.box(.8, .35, .6), '#3A7A5A', [0, .55, 0], { rot: [0, 0, -.1] })); g.add(mesh(G.cyl(.2, .2, .1, 14), '#2A2A2A', [.5, .2, 0], { rot: [Math.PI / 2, 0, 0] }));
  [-1, 1].forEach(z => g.add(mesh(G.cyl(.025, .025, 1.2, 6), '#9A9A9A', [-.2, .55, z * .25], { rot: [0, 0, Math.PI / 2 - .25] }))); return g;
}
export function bale(parent, p) { const g = group(parent, p); g.add(mesh(G.box(2, .12, 1.1), '#D2B06A', [0, .5, 0])); [[-.9, -.45], [.9, -.45], [-.9, .45], [.9, .45]].forEach(([x, z]) => g.add(mesh(G.cyl(.05, .05, .5, 6), '#B0904A', [x, .25, z]))); return g }
export function rumahMini(parent, p, kind) {   // maket rumah Jawa: joglo (atap tumpang tinggi), limasan (atap perisai), kampung (atap pelana)
  const g = group(parent, p); g.add(mesh(G.box(1.3, .08, 1), '#E8DCC0', [0, .04, 0])); g.add(mesh(G.box(1.1, .55, .8), '#C9955A', [0, .35, 0]));
  const R = '#7A3E26';
  if (kind === 'joglo') { const a = new THREE.Mesh(new THREE.CylinderGeometry(.3, .95, .3, 4), mat(R)); a.rotation.y = Math.PI / 4; a.scale.set(1, 1, .8); a.position.y = .78; g.add(a);
    const b = new THREE.Mesh(new THREE.CylinderGeometry(.02, .32, .5, 4), mat(R)); b.rotation.y = Math.PI / 4; b.scale.set(1, 1, .8); b.position.y = 1.18; g.add(b) }
  if (kind === 'limasan') { const a = new THREE.Mesh(new THREE.CylinderGeometry(.05, .85, .55, 4), mat(R)); a.rotation.y = Math.PI / 4; a.scale.set(1.25, 1, .8); a.position.y = .9; g.add(a) }
  if (kind === 'kampung') { const s = new THREE.Shape(); s.moveTo(-.55, 0); s.lineTo(0, .45); s.lineTo(.55, 0); s.lineTo(-.55, 0); const e = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 1.2, bevelEnabled: false }), mat(R)); e.rotation.y = Math.PI / 2; e.position.set(-.6, .62, 0); e.castShadow = true; g.add(e) }
  if (kind === 'betang') { g.children.slice(1).forEach(c => c.visible = false); [-1, 1].forEach(z => [-1.1, -.55, 0, .55, 1.1].forEach(x => g.add(mesh(G.box(.05, .45, .05), '#6A4A2A', [x * .55, .28, z * .3]))));
    g.add(mesh(G.box(1.3, .32, .55), '#A87A4A', [0, .66, 0])); const s = new THREE.Shape(); s.moveTo(-.38, 0); s.lineTo(0, .3); s.lineTo(.38, 0); s.lineTo(-.38, 0); const e = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 1.4, bevelEnabled: false }), mat('#6E4A2C')); e.rotation.y = Math.PI / 2; e.position.set(-.7, .82, 0); g.add(e); g.add(mesh(G.box(.14, .4, .04), '#6A4A2A', [0, .28, .36], { rot: [.5, 0, 0] })) }
  if (kind === 'gadang') { g.children.slice(1).forEach(c => c.visible = false); g.add(mesh(G.box(1.0, .4, .6), '#8A5A34', [0, .5, 0])); [-.45, -.15, .15, .45].forEach(x => [-.25, .25].forEach(z => g.add(mesh(G.box(.05, .3, .05), '#6A4A2A', [x, .15, z]))));
    const R2 = '#3A3A36'; [-1, 1].forEach(sx => { const h = mesh(G.cone(.12, .62, 6), R2, [sx * .62, 1.12, 0], { rot: [0, 0, -sx * .55] }); g.add(h) }); [-1, 1].forEach(sx => g.add(mesh(G.box(.62, .07, .7), R2, [sx * .3, .9 + .0, 0], { rot: [0, 0, sx * .28] })));
    g.add(mesh(G.cone(.1, .5, 6), R2, [0, 1.12, 0])) }
  if (kind === 'honai') { g.children.slice(1).forEach(c => c.visible = false); g.add(mesh(G.cyl(.45, .45, .5, 16), '#8A6A4A', [0, .33, 0])); g.add(mesh(G.sph(.6, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), '#B8A06A', [0, .55, 0], { s: [1, 1.1, 1] })); g.add(mesh(G.box(.18, .26, .04), '#3A2A1A', [0, .2, .45])) }
  g.traverse(o => { if (o.isMesh) o.castShadow = true }); return g;
}

// ---- alam Jawa luas (instanced): sawah, terasering, gunung, kelapa, bambu, pisang, semak, sungai ----
const RNG = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function inst(geo, n, o = {}) { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial(Object.assign({ color: '#FFFFFF', roughness: .8, flatShading: true }, o)), n); m.castShadow = m.receiveShadow = true; return m }
export function jawa(sc, o = {}) {
  const R = RNG(o.seed || 23), S = o.size || 110, hole = o.hole || (() => false), out = {};
  sc.add(mesh(G.box(S * 5, .02, S * 5), '#86BE4E', [0, -.03, 0], { cast: false }));
  const O = new THREE.Object3D(), col = new THREE.Color();
  const put = (im, i, x, y, z, sx, sy, sz, rx, ry, rz, c) => { O.position.set(x, y, z); O.rotation.set(rx, ry, rz); O.scale.set(sx, sy, sz); O.updateMatrix(); im.setMatrixAt(i, O.matrix); if (c) im.setColorAt(i, col.set(grade(c))) };
  const free = (x, z, r = 0) => !hole(x, z) && !hole(x + r, z) && !hole(x - r, z) && !hole(x, z + r) && !hole(x, z - r);
  // sawah: petak-petak + pematang (grid miring sedikit), sebagian baru ditanami (air biru muda)
  const NP = 1400, pet = inst(new THREE.BoxGeometry(1, .04, 1), NP); pet.castShadow = false; let n = 0;
  for (let gx = -S; gx < S && n < NP; gx += 4.2) for (let gz = -S; gz < S && n < NP; gz += 3.4) { const x = gx + (R() - .5) * .3, z = gz; if (!free(x, z, 2.5) || (Math.abs(x - (o.sungaiX ?? 18)) < 5)) continue; if (R() < .1) continue;
    put(pet, n++, x, .01, z, 3.8, 1, 3.0, 0, 0, 0, ['#9ACD4A', '#8CC43E', '#B4D85A', '#7FC0A8', '#A8D25A', '#C9D86A'][Math.floor(R() * 6)]) }
  pet.count = n; sc.add(pet);
  // padi (rumpun kecil) di petak hijau dekat kamera
  const NR = 1600, pd = inst(new THREE.ConeGeometry(.08, .45, 4), NR); pd.castShadow = false; let pr = 0;
  for (let k = 0; k < 6000 && pr < NR; k++) { const x = (R() - .5) * 60, z = (R() - .5) * 60; if (!free(x, z, 1)) continue; put(pd, pr++, x, .22, z, 1, 1, 1, 0, R() * 3, 0, ['#5FA83A', '#6FB842', '#4E9A36'][Math.floor(R() * 3)]) }
  pd.count = pr; sc.add(pd);
  // terasering: bukit bertingkat (cincin hijau berselang)
  for (let k = 0; k < (o.teras ?? 7); k++) { const a = k / 7 * Math.PI * 2 + .6, r = S * .55 + R() * S * .3, x = Math.cos(a) * r, z = Math.sin(a) * r; if (!free(x, z, 14)) continue; const base = 12 + R() * 8;
    for (let l = 0; l < 7; l++) { const rr = base * (1 - l / 8); sc.add(mesh(G.cyl(rr, rr + .3, 1.3, 18), l % 2 ? '#8CC43E' : '#A8D25A', [x, .65 + l * 1.3, z], { cast: false })) } }
  // gunung biru-hijau di kejauhan + asap tipis di satu puncak
  out.gunung = [];
  [[-.9, 1.0, 70, 44], [-.35, 1.15, 55, 34], [.5, 1.05, 80, 52], [1.2, 1.2, 50, 30], [2.2, 1.1, 64, 40], [3.4, 1.1, 58, 36], [4.4, 1.2, 70, 42], [5.3, 1.1, 52, 32]].forEach(([a, k, w, h], i) => {
    const r = S * 1.6 * k, x = Math.sin(a) * r, z = -Math.cos(a) * r; const gm = mesh(G.cone(w, h, 9), ['#5E9A7E', '#6FA88A', '#5A8FA0'][i % 3], [x, h / 2 - 1, z], { cast: false }); sc.add(gm);
    sc.add(mesh(G.cone(w * .28, h * .28, 9), '#8FB8A8', [x, h - 1 - h * .14 + .2, z], { cast: false })); out.gunung.push(gm) });
  out.asap = Array.from({ length: 6 }, (_, i) => { const m = mesh(G.sph(4, 10, 8), '#F4F4F4', [0, -50, 0], { cast: false, mat: { transparent: true, opacity: .55, flatShading: false } }); sc.add(m); return m });
  const g0 = out.gunung[2]; out.angin = t => out.asap.forEach((m, i) => { const q = (t * .05 + i / 6) % 1; m.position.set(g0.position.x + q * 18, 52 + q * 16, g0.position.z); m.scale.setScalar(.6 + q * 1.6); m.material.opacity = .6 * (1 - q) });
  // kelapa: batang miring + 7 pelepah melengkung + buah
  const NK = 160, kb = inst(new THREE.CylinderGeometry(.12, .2, 1, 6), NK), kd = inst(new THREE.BoxGeometry(.32, .04, 1.9), NK * 7), kf = inst(new THREE.SphereGeometry(.16, 6, 5), NK * 3); let nk = 0;
  for (let k = 0; k < 900 && nk < NK; k++) { const x = (R() - .5) * S * 1.8, z = (R() - .5) * S * 1.8; if (!free(x, z, 3)) continue; const h = 5 + R() * 4, lx = (R() - .5) * .3, lz = (R() - .5) * .3;
    put(kb, nk, x + lx * h / 2, h / 2, z + lz * h / 2, 1, h, 1, lz, 0, -lx, '#9A7A5A'); const tx = x + lx * h, tz = z + lz * h;
    for (let j = 0; j < 7; j++) { const a = j / 7 * Math.PI * 2 + R(); O.position.set(tx + Math.sin(a) * .8, h - .2, tz + Math.cos(a) * .8); O.rotation.set(0, a, 0); O.rotateX(.55); O.scale.set(1, 1, 1); O.updateMatrix(); kd.setMatrixAt(nk * 7 + j, O.matrix); kd.setColorAt(nk * 7 + j, col.set(grade(['#3E9A3A', '#4FAA42', '#368A32'][j % 3]))) }
    for (let j = 0; j < 3; j++) put(kf, nk * 3 + j, tx + Math.sin(j * 2.1) * .2, h - .35, tz + Math.cos(j * 2.1) * .2, 1, 1, 1, 0, 0, 0, '#6A8A2A'); nk++ }
  kb.count = nk; kd.count = nk * 7; kf.count = nk * 3; sc.add(kb); sc.add(kd); sc.add(kf);
  // bambu (rumpun) + pisang + semak bulat
  const NB = 70 * 7, bb = inst(new THREE.CylinderGeometry(.06, .07, 1, 6), NB); let nb = 0;
  for (let k = 0; k < 400 && nb < NB; k++) { const x = (R() - .5) * S * 1.6, z = (R() - .5) * S * 1.6; if (!free(x, z, 3)) continue; for (let j = 0; j < 7; j++) { const h = 4 + R() * 3; put(bb, nb++, x + (R() - .5) * .8, h / 2, z + (R() - .5) * .8, 1, h, 1, (R() - .5) * .25, 0, (R() - .5) * .25, ['#7AB04A', '#8ABA52', '#6A9A3A'][j % 3]) } }
  bb.count = nb; sc.add(bb);
  const NS = 420, sm = inst(new THREE.IcosahedronGeometry(1, 1), NS); let ns = 0;
  for (let k = 0; k < 2000 && ns < NS; k++) { const x = (R() - .5) * S * 1.6, z = (R() - .5) * S * 1.6; if (!free(x, z, 1.5)) continue; const s = .5 + R() * 1.1; put(sm, ns++, x, s * .5, z, s, s * .75, s, 0, R() * 3, 0, ['#4E9A3E', '#5FA846', '#3F8A3A', '#6AB04A'][Math.floor(R() * 4)]) }
  sm.count = ns; sc.add(sm);
  const NF = 260, fl = inst(new THREE.SphereGeometry(.12, 6, 5), NF); fl.castShadow = false; let nf = 0;
  for (let k = 0; k < 1500 && nf < NF; k++) { const x = (R() - .5) * 50, z = (R() - .5) * 50; if (!free(x, z, .6)) continue; put(fl, nf++, x, .15, z, 1, 1, 1, 0, 0, 0, ['#FF6A8A', '#FFD23A', '#FFFFFF', '#FF9A3A'][Math.floor(R() * 4)]) }
  fl.count = nf; sc.add(fl);
  // sungai + batu kali
  const sx = o.sungaiX ?? 18; sc.add(mesh(G.box(6, .05, S * 5), '#5AAAD8', [sx, .02, 0], { cast: false, mat: { roughness: .2, emissive: '#2A7AB0', emissiveIntensity: .12 } }));
  const bt = inst(new THREE.IcosahedronGeometry(.4, 0), 120); for (let i = 0; i < 120; i++) put(bt, i, sx + (R() < .5 ? -3.2 : 3.2) + (R() - .5), .15, (R() - .5) * S * 2, 1 + R(), .6, 1 + R(), 0, R() * 3, 0, ['#9A9A92', '#8A8A84', '#AAA69A'][i % 3]); sc.add(bt);
  return out;
}

// ---- bola Bumi (untuk pindah lokasi) ----
export const JAWA_LL = [-7.3, 110.2];
export function bumi(sc, r = 5) { const g = globe(sc, r, { highlight: ['Indonesia'], hlColor: '#F5C542' }); return g }

// ---- grid cetak biru di layar (tampak atas) ----
export function gridDenah(root) {
  const e = X.ab({ left: 0, top: 0, width: 1080, height: 1920, opacity: 0, pointerEvents: 'none', background: 'rgba(31,95,175,.25)' }, root,
    `<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffffff40 0 2px,transparent 2px 90px),repeating-linear-gradient(0deg,#ffffff40 0 2px,transparent 2px 90px)"></div>
     <div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,#ffffff18 0 1px,transparent 1px 18px),repeating-linear-gradient(0deg,#ffffff18 0 1px,transparent 1px 18px)"></div>`);
  return op => { e.style.opacity = op };
}

// ---- teks DOM ----
export const BIG = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: PFONT, fontWeight: 800, fontSize: '150px', color: '#FFF6E2', textShadow: '0 6px 0 #12344F, 0 16px 38px rgba(0,20,40,.5)', letterSpacing: '2px', opacity: 0 }, css), root, html);
export const LABEL = (root, a, b, top = 330) => X.ab({ left: 60, top, width: 960, textAlign: 'center', opacity: 0, fontFamily: PFONT }, root,
  `<div style="display:inline-block;background:${PANEL};color:${PCREAM};border-radius:18px;padding:16px 34px;box-shadow:0 12px 28px #0000005c;border:1px solid #ffffff22">
   <div style="font-size:64px;font-weight:800;color:${PORANGE};letter-spacing:2px">${a}</div><div style="font-size:40px;font-weight:700">${b}</div></div>`);
export const tagNama = (root, a, b) => X.ab({ left: 0, top: 0, opacity: 0, transform: 'translate(-50%,-100%)', fontFamily: PFONT, textAlign: 'center', whiteSpace: 'nowrap' }, root,
  `<div style="background:${PANEL};color:${PCREAM};border-radius:14px;padding:8px 22px;box-shadow:0 10px 24px #0000005c;border:1px solid #ffffff22"><div style="font-size:40px;font-weight:800;color:${PORANGE};letter-spacing:2px">${a}</div><div style="font-size:26px;font-weight:600">${b}</div></div>`);
export function tempel(e, obj, cam, off, op) { const [x, y, z] = X.proj(obj, cam, off); e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.opacity = z < 1 ? op : 0 }
export const show = (e, p, dy = 30) => { const q = E.out(Math.max(0, Math.min(1, p))); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * dy}px)` };
export const pulse = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 ? 1 : 0; e.style.transform = `scale(${q > 0 ? .7 + .3 * E.back(q) : .7})` };
export const ease = (t, a, b) => E.inout(seg(t, a, b));
export function lumpur(sc, n = 14) { const d = Array.from({ length: n }, () => { const m = mesh(G.sph(.08, 6, 5), '#6A4A2A', [0, -5, 0], { cast: false }); sc.add(m); return m });
  return (t, p, on) => d.forEach((m, i) => { const q = (t * 1.6 + i / n) % 1; m.visible = on; const a = i * 2.4; m.position.set(p[0] + Math.cos(a) * q * .9, p[1] + Math.sin(q * Math.PI) * .8, p[2] + Math.sin(a) * q * .9) }) }
export { lerp, seg, E, PANEL, PCREAM, PORANGE, PTEAL };

// ---- lokasi proyek Season 1 di Jawa (dipakai banyak shot): lahan berpatok di tengah, bedeng terpal, bale, papan, bata, gerobak ----
export function lokasiProyek(sc, o = {}) {
  const J = jawa(sc, Object.assign({ hole: (x, z) => Math.abs(x) < 8.5 && Math.abs(z) < 7 }, o.jawa || {}));
  sc.add(mesh(G.box(17, .03, 14), '#C9A878', [0, .0, 0], { cast: false }));   // tanah lahan
  const P = patokBenang(sc, [.5, 0, .6], 5, 4, o.ukur ? { ukur: o.ukur } : {});
  const T = terpal(sc, [-5.4, 0, -3.6]); const B = bale(sc, [-5.4, 0, -1.2]); const pap = papanPenduduk(sc, [3.6, 0, -4.2], o.penduduk ?? 2); pap.rotation.y = -.25;
  const bata = tumpukanBata(sc, [5.6, 0, -1.6]); bata.userData.setN(o.bata ?? 0); const ger = gerobak(sc, [-1.6, 0, -4.6]); ger.rotation.y = .6;
  awan(sc);
  return { J, P, T, B, pap, bata, ger };
}

// ---- rumah kampung Jawa ukuran asli (Ep 1): 8 tiang utama, atap pelana dua bidang, dinding gedek (anyaman bambu), emper depan ----
// userData: tiang[8], balok, atapL/atapR (pivot di bubungan), dinding[], set(p) membangun bertahap 0..1
export function rumahKampung(parent, p, o = {}) {
  const g = group(parent, p); const W = o.w || 6, D = o.d || 4.4, H = o.h || 2.4, KAYU = '#8A5A34';
  const umpak = [], tiang = []; [-1, -1 / 3, 1 / 3, 1].forEach(fx => [-1, 1].forEach(fz => { const x = fx * W / 2, z = fz * D / 2;
    const u = mesh(G.box(.3, .2, .3), '#B8B2A6', [x, .1, z]); g.add(u); umpak.push(u); const t = mesh(G.box(.16, H, .16), KAYU, [x, .2 + H / 2, z]); g.add(t); tiang.push(t) }));
  const lantai = mesh(G.box(W + .4, .14, D + .4), '#C9B08A', [0, .07, 0]); g.add(lantai);
  const balok = group(g); [[0, -D / 2, W + .3, .14], [0, D / 2, W + .3, .14]].forEach(([x, z, a, b]) => balok.add(mesh(G.box(a, .16, b), KAYU, [x, H + .2, z]))); [-W / 2, W / 2].forEach(x => balok.add(mesh(G.box(.14, .16, D + .3), KAYU, [x, H + .2, 0])));
  const gedek = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); x.fillStyle = '#D8BE86'; x.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#C9A86A' : '#E2CC98'; x.fillRect(i * 16, j * 16, 16, 16) } const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 2); return t })();
  const GM = new THREE.MeshStandardMaterial({ map: gedek, roughness: .9 });
  const dinding = [[0, -D / 2 + .02, W, 0], [-W / 2 + .02, 0, D, Math.PI / 2], [W / 2 - .02, 0, D, Math.PI / 2], [-W / 4 - .5, D / 2 - .02, W / 2 - 1, 0], [W / 4 + .5, D / 2 - .02, W / 2 - 1, 0]].map(([x, z, w, r]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, H, .06), GM); m.position.set(x, .2 + H / 2, z); m.rotation.y = r; m.castShadow = m.receiveShadow = true; g.add(m); return m });
  const pintu = mesh(G.box(1, 1.9, .06), '#7A4E2C', [0, 1.15, D / 2 - .01]); g.add(pintu); dinding.push(pintu);
  // atap pelana: dua bidang miring bertemu di bubungan (sumbu x)
  const RH = o.rh || 1.7, half = D / 2 + .7, slope = Math.hypot(half, RH), ang = Math.atan2(RH, half), top = H + .3 + RH;
  const genteng = '#B5452B'; const atapL = group(g, [0, top, 0]), atapR = group(g, [0, top, 0]);
  atapL.add(mesh(G.box(W + 1.2, .1, slope), genteng, [0, 0, -slope / 2])); atapL.rotation.x = -ang; atapR.add(mesh(G.box(W + 1.2, .1, slope), genteng, [0, 0, slope / 2])); atapR.rotation.x = ang;
  for (let k = 1; k < 6; k++) { atapL.add(mesh(G.box(W + 1.22, .03, .05), '#8E3420', [0, .06, -k * slope / 6], { cast: false })); atapR.add(mesh(G.box(W + 1.22, .03, .05), '#8E3420', [0, .06, k * slope / 6], { cast: false })) }
  const bubungan = mesh(G.box(W + 1.3, .16, .2), '#8E3420', [0, top + .04, 0]); g.add(bubungan);
  const segi = [-1, 1].map(s => { const sh = new THREE.Shape(); sh.moveTo(-D / 2, 0); sh.lineTo(0, RH); sh.lineTo(D / 2, 0); sh.lineTo(-D / 2, 0); const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .06, bevelEnabled: false }), GM); m.rotation.y = Math.PI / 2; m.position.set(s * W / 2, H + .3, 0); g.add(m); return m });
  const emper = group(g, [0, H + .1, D / 2 + .7]); emper.add(mesh(G.box(W + .4, .08, 1.5), genteng, [0, 0, .2], { rot: [.25, 0, 0] })); [-W / 2, 0, W / 2].forEach(x => emper.add(mesh(G.box(.12, H - .1, .12), KAYU, [x, -(H - .1) / 2, .85])));
  g.userData = { tiang, umpak, balok, dinding, atapL, atapR, bubungan, segi, emper, W, D, H, top };
  const S = (o3, q) => { o3.visible = q > 0; o3.scale.y = Math.max(.01, Math.min(1, q)) };
  g.userData.set = q => { umpak.forEach((u, i) => u.visible = q > i / 80); tiang.forEach((t, i) => { const k = seg(q, .05 + i * .03, .12 + i * .03); t.visible = k > 0; t.scale.y = Math.max(.01, k); t.position.y = .2 + H * k / 2 });
    balok.visible = q > .38; const a = seg(q, .42, .62); atapL.visible = atapR.visible = a > 0; atapL.scale.z = atapR.scale.z = Math.max(.01, a); bubungan.visible = a >= 1; segi.forEach(m => m.visible = a > .5);
    const d = seg(q, .65, .9); dinding.forEach((m, i) => { const k = seg(d, i / 7, (i + 1) / 7); m.visible = k > 0; m.scale.y = Math.max(.01, k) }); emper.visible = q > .92 };
  g.userData.set(o.jadi === false ? 0 : 1); return g;
}
// deretan rumah kampung kecil (instanced) untuk "like = tempat tinggal"; tampil(n) menampilkan n rumah pertama
export function kampungBanyak(sc, n, o = {}) {
  const R = RNG(o.seed || 5), body = inst(new THREE.BoxGeometry(1, 1, 1), n), tri = new THREE.Shape(); tri.moveTo(-.5, 0); tri.lineTo(0, .5); tri.lineTo(.5, 0); tri.lineTo(-.5, 0); const tg = new THREE.ExtrudeGeometry(tri, { depth: 1, bevelEnabled: false }); tg.translate(0, 0, -.5); tg.rotateY(Math.PI / 2); const roof = inst(tg, n), pos = [];
  const cx = o.cx ?? 0, cz = o.cz ?? -14, cols = o.cols || 12, sx = o.sx || 4.2, sz = o.sz || 4.6;
  for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); pos.push([cx + (c - (cols - 1) / 2) * sx + (r % 2) * sx / 2, cz - r * sz]) }
  const O = new THREE.Object3D(), col = new THREE.Color();
  const set = (i, k) => { const [x, z] = pos[i]; const s = Math.max(.001, k); O.position.set(x, .7 * s, z); O.rotation.set(0, 0, 0); O.scale.set(2.6, 1.4 * s, 2.1); O.updateMatrix(); body.setMatrixAt(i, O.matrix);
    O.position.set(x, 1.4 * s, z); O.rotation.set(0, 0, 0); O.scale.set(3.0, 1.8 * s, 2.6); O.updateMatrix(); roof.setMatrixAt(i, O.matrix) };
  for (let i = 0; i < n; i++) { set(i, 1); body.setColorAt(i, col.set(grade(['#E2CC98', '#D8BE86', '#E8D6A8'][Math.floor(R() * 3)]))); roof.setColorAt(i, col.set(grade(['#B5452B', '#A83E26', '#C25A34'][Math.floor(R() * 3)]))) }
  sc.add(body); sc.add(roof);
  return { pos, tampil: (t, t0, dt) => { for (let i = 0; i < n; i++) set(i, E.back(seg(t, t0 + i * dt, t0 + i * dt + .3))); body.instanceMatrix.needsUpdate = roof.instanceMatrix.needsUpdate = true } };
}
export function hujan(sc, N = 600, area = [-10, 10, -8, 8]) {
  const m = new THREE.InstancedMesh(new THREE.BoxGeometry(.025, .5, .025), new THREE.MeshBasicMaterial({ color: '#D6ECFA', transparent: true, opacity: .75 }), N); sc.add(m); const O = new THREE.Object3D();
  return (t, on) => { m.visible = on; if (!on) return; for (let i = 0; i < N; i++) { const q = (t * 1.6 + i / N * 7) % 1; O.position.set(area[0] + ((i * 37) % 1000) / 1000 * (area[1] - area[0]) + q * 1.2, 10 - q * 10, area[2] + ((i * 61) % 1000) / 1000 * (area[3] - area[2])); O.rotation.z = .12; O.updateMatrix(); m.setMatrixAt(i, O.matrix) } m.instanceMatrix.needsUpdate = true };
}
