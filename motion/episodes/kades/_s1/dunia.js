// Dunia Kades Magang Juara Season 1 "30 Hari Masa Percobaan": tokoh + lokasi yang dipakai ulang semua episode season ini.
// Lembah desa yang DITINGGAL warga (rumah dipaku papan), balai desa tua, bale bambu, stasiun kecil tempat perantau pulang.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, island, tree, house, person, grade } from '../../../engine/w3d/kit.js';
import { X, canvasPlane, PFONT } from '../../../engine/w3d/desa3d.js';

// ---- suasana ----
export const SORE = o => newScene(Object.assign({ sky: ['#6FB2DE', '#FCE9C8'], sun: '#FFE0B0', sunPos: [-12, 14, 10], hemi: 1.2, sunI: 2.6, shadow: 18, fog: ['#F3E3C8', 60, 230] }, o));
export const SENJA = o => newScene(Object.assign({ sky: ['#5E7FB8', '#F7B27A'], sun: '#FFC08A', sunPos: [-14, 7, 6], hemi: 1.1, sunI: 2.3, shadow: 18, fog: ['#E9B58E', 60, 230] }, o));
export const SIANG = o => newScene(Object.assign({ sky: ['#86BEDD', '#F4EBD6'], sunPos: [10, 16, 8], shadow: 18 }, o));

// ---- tokoh ----
export function juara(p, o = {}) {   // kades magang: kemeja putih, celana gelap, kartu MAGANG biru di dada
  const g = person(o.parent, p, Object.assign({ body: '#F2EFE6', pants: '#2F3A4F', skin: '#C98E64', hair: '#1E1612' }, o));
  const b = g.userData.st.body; b.add(mesh(G.box(.13, .17, .02), '#3E86B0', [.05, .26, .11], { cast: false })); b.add(mesh(G.box(.02, .2, .01), '#3E86B0', [.05, .42, .1], { cast: false }));
  return g;
}
export function darmo(p, o = {}) {   // sesepuh terakhir: peci, kumis putih, sarung ungu, tongkat
  const g = person(o.parent, p, Object.assign({ body: '#7A5C3E', pants: '#4B3B6B', skin: '#B97A52', hair: '#E2E2E2', hat: 'peci', mustache: true }, o));
  g.userData.st.arms[1].userData.elbow?.add(mesh(G.cyl(.025, .025, 1.1, 6), '#6B4A2E', [0, -.3, .08]));
  return g;
}
export function wati(p, o = {}) {   // pengawas kecamatan (fiksi): seragam krem, kerudung biru, kacamata, map merah
  const g = person(o.parent, p, Object.assign({ body: '#C9B98E', pants: '#3B3B3B', skin: '#E2A97E', glasses: true }, o));
  const h = g.userData.st.head; h.add(mesh(G.sph(.238, 20, 16), '#2F5E8E', [0, .07, -.06], { mat: { flatShading: false } })); h.add(mesh(G.cone(.27, .3, 20), '#2F5E8E', [0, -.17, -.05], { mat: { flatShading: false } }));
  const map = mesh(G.box(.32, .42, .04), '#B5302A', [0, -.32, .1]); g.userData.st.arms[0].userData.elbow?.add(map); g.userData.map = map;
  return g;
}
export function bejo(parent, p) {   // kambing: suka makan kertas penting
  const g = group(parent, p); const W = '#E8E3D8';
  g.add(mesh(G.box(.75, .42, .36), W, [0, .6, 0], { mat: { flatShading: false } }));
  const hd = group(g, [.45, .82, 0]); hd.add(mesh(G.box(.3, .26, .24), W, [.06, 0, 0])); hd.add(mesh(G.box(.06, .12, .06), '#CFC6B4', [.2, -.16, 0]));
  [-1, 1].forEach(z => { hd.add(mesh(G.cone(.035, .2, 5), '#8A7A60', [-.02, .2, z * .07], { rot: [0, 0, .5] })); hd.add(mesh(G.sph(.025, 6, 4), '#1E1E1E', [.17, .05, z * .1], { cast: false })) });
  [[-.28, -.12], [-.28, .12], [.28, -.12], [.28, .12]].forEach(([x, z]) => g.add(mesh(G.box(.08, .42, .08), '#CFC6B4', [x, .21, z])));
  g.userData = { hd }; return g;
}

// ---- benda / lokasi ----
export function rumahDipaku(parent, p, o = {}) {   // rumah ditinggal: warna kusam, papan silang di pintu & jendela
  const h = house(parent, p, Object.assign({ w: 2.4, d: 2.2, h: 1.7, wall: '#D8CDB4', roofC: '#8C5A3C' }, o)); const d = (o.d || 2.2) / 2 + .05;
  [-.5, .5].forEach(r => h.add(mesh(G.box(.12, 1.1, .04), '#7A5A3A', [o.doorX ?? 0, .6, d], { rot: [0, 0, r] })));
  [-1, 1].forEach(sx => { if (Math.abs(sx * .75 - (o.doorX ?? 0)) > .5) h.add(mesh(G.box(.62, .09, .04), '#7A5A3A', [sx * .75, 1.08, d], { rot: [0, 0, .12 * sx] })) });
  return h;
}
export function desaSepi(sc, o = {}) {   // jalan desa lurus (sumbu z), rumah dipaku di dua sisi, pohon & kelapa
  const big = desaBesar(sc, { hole: (x, z) => Math.abs(x) < 12 && z > -16 }); island(sc, 26, 34, '#8FB45A', '#7A5C3E'); sc.add(mesh(G.box(2.6, .04, 34), '#B39A6E', [0, .02, 0], { cast: false }));
  const R = [];
  for (let i = 0; i < 6; i++) [-1, 1].forEach(sx => { const z = -13 + i * 5 + (sx > 0 ? 1.4 : 0); const r = rumahDipaku(sc, [sx * 4.6, 0, z], { rot: sx > 0 ? -Math.PI / 2 : Math.PI / 2, wall: ['#D8CDB4', '#CFC2A4', '#DDD3BD'][i % 3], roofC: ['#8C5A3C', '#7E4E36', '#946448'][(i + 1) % 3] }); R.push(r) });
  [[-9, -12], [9.5, -8], [-10, -2], [10, 4], [-9.5, 9], [9, 12], [-11, 14], [11, -14]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1 + (i % 3) * .25, '#5E8F3A', i % 2 ? 'palm' : 'round'));
  const leaves = Array.from({ length: 14 }, (_, i) => { const m = mesh(G.box(.12, .02, .08), ['#B07A3A', '#C9A04A', '#8A6A3A'][i % 3], [0, .1, 0], { cast: false }); sc.add(m); return m });
  return { big, rumah: R, leaves, angin: t => leaves.forEach((l, i) => { const q = (t * .18 + i / 14) % 1; l.position.set(lerp(-6, 6, q) + Math.sin(i * 3) * 2, .15 + Math.abs(Math.sin(t * 3 + i)) * .4, -12 + (i * 2.3) % 24); l.rotation.set(t * 4 + i, t * 3, 0) }) };
}
export function gapuraTua(parent, p, txt = 'DESA . . . . . .') {   // gapura berkarat, sedikit miring, huruf nama desa copot
  const g = group(parent, p); g.rotation.z = .035;
  [-1, 1].forEach(x => { g.add(mesh(G.box(.8, 3.6, .8), '#A39C8C', [x * 2.6, 1.8, 0])); g.add(mesh(G.box(.82, .9, .82), '#6E6A5E', [x * 2.6, .45, 0])); g.add(mesh(G.box(1, .25, 1), '#7A5A3A', [x * 2.6, 3.72, 0])) });
  g.add(mesh(G.box(6.2, .7, .45), '#7A5A3A', [0, 3.3, 0]));
  const sign = canvasPlane(5.4, .58, (x, W, H) => { x.fillStyle = '#5E4630'; x.fillRect(0, 0, W, H); x.fillStyle = '#C9B48A'; x.font = `700 ${Math.round(H * .5)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, W / 2, H / 2 + 3);
    x.fillStyle = 'rgba(140,70,30,.45)'; for (let i = 0; i < 9; i++) x.fillRect((i * 97) % W, 0, 18, H) }, 700); sign.position.set(0, 3.3, .24); g.add(sign);
  return g;
}
export function angkot(parent, p) {   // angkot hijau-teal: body, kaca, garis kuning, roda
  const g = group(parent, p); g.add(mesh(G.box(3.4, 1.35, 1.6), '#2E8B7A', [0, 1.05, 0])); g.add(mesh(G.box(3.42, .14, 1.62), '#E8B94A', [0, .82, 0], { cast: false }));
  g.add(mesh(G.box(3.2, .5, 1.62), '#22343A', [-.1, 1.42, 0], { cast: false })); g.add(mesh(G.box(.05, .5, 1.3), '#22343A', [1.71, 1.42, 0], { cast: false }));
  const wheels = [[-1.1, .8], [-1.1, -.8], [1.1, .8], [1.1, -.8]].map(([x, z]) => { const w = mesh(G.cyl(.36, .36, .26, 14), '#1E1E1E', [x, .36, z], { rot: [Math.PI / 2, 0, 0] }); g.add(w); return w });
  g.userData.wheels = wheels; return g;
}
export function balai(parent, p) {   // kantor kades tua: dinding kusam, papan nama, pintu yang bisa copot (pivot di bawah)
  const g = group(parent, p); g.add(mesh(G.box(4.6, .3, 3.4), '#9C8C74', [0, .15, 0])); g.add(mesh(G.box(4.2, 2.3, 3), '#E2D6BC', [0, 1.45, 0]));
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#8A4B32')); roof.scale.set(3.9, 1.3, 3.2); roof.rotation.y = Math.PI / 4; roof.position.y = 3.25; roof.castShadow = true; g.add(roof);
  [-1.35, 1.35].forEach(x => g.add(mesh(G.box(.8, .65, .05), '#3E4E58', [x, 1.65, 1.52])));
  const papan = canvasPlane(2.2, .42, (x, W, H) => { x.fillStyle = '#2E4A3A'; x.fillRect(0, 0, W, H); x.fillStyle = '#E9DFC2'; x.font = `700 ${Math.round(H * .55)}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('KANTOR KADES', W / 2, H / 2 + 2) }, 600);
  papan.position.set(0, 2.85, 1.53); g.add(papan);
  const dg = group(g, [0, .3, 1.52]); dg.add(mesh(G.box(.95, 1.75, .08), '#6E4A2C', [0, .875, .04])); dg.add(mesh(G.sph(.04, 6, 5), '#D9B85A', [.33, .85, .1], { cast: false }));
  g.userData.door = dg; return g;
}
export function bale(parent, p) { const g = group(parent, p); g.add(mesh(G.box(2.2, .14, 1.2), '#C9A86A', [0, .5, 0])); [[-1, -.5], [1, -.5], [-1, .5], [1, .5]].forEach(([x, z]) => g.add(mesh(G.box(.1, .5, .1), '#8A6A3A', [x, .25, z]))); return g }
export function stasiun(parent, p) {   // stasiun kecil: peron, atap, papan PULANG KAMPUNG, rel; kereta lewat di sumbu x
  const g = group(parent, p); g.add(mesh(G.box(10, .5, 2.6), '#A8A49A', [0, .25, 0])); g.add(mesh(G.box(10, .06, .2), '#E8C766', [0, .52, -1.2], { cast: false }));
  [[-2, -.9], [2, -.9], [-2, .9], [2, .9]].forEach(([x, z]) => g.add(mesh(G.box(.14, 2.4, .14), '#4E5A60', [x, 1.7, z])));
  g.add(mesh(G.box(5, .16, 2.4), '#6E3A2A', [0, 2.95, 0]));
  const papan = canvasPlane(2.6, .9, () => { }, 600); papan.position.set(0, 2.3, .98); g.add(papan);
  g.userData.setPulang = n => papan.userData.redraw((x, W, H) => { x.fillStyle = '#1F3B2A'; x.fillRect(0, 0, W, H); x.strokeStyle = '#E8B94A'; x.lineWidth = 8; x.strokeRect(6, 6, W - 12, H - 12);
    x.fillStyle = '#E9DFC2'; x.textAlign = 'center'; x.font = `700 ${Math.round(H * .2)}px Poppins`; x.fillText('PULANG KAMPUNG', W / 2, H * .34); x.fillStyle = '#E8B94A'; x.font = `800 ${Math.round(H * .42)}px Poppins`; x.fillText(String(n), W / 2, H * .82) });
  g.userData.setPulang(0);
  for (let i = -12; i <= 12; i += .8) g.add(mesh(G.box(.18, .06, 2.2), '#6B5440', [i, .03, -3], { cast: false }));
  [-3.6, -2.4].forEach(z => g.add(mesh(G.box(26, .08, .1), '#8C9196', [0, .1, z], { cast: false })));
  const kereta = group(g, [-40, 0, -3]); for (let c = 0; c < 3; c++) { kereta.add(mesh(G.box(4.6, 1.9, 1.7), c ? '#D9D4C8' : '#C9472F', [c * 4.8, 1.25, 0])); kereta.add(mesh(G.box(4.2, .45, 1.72), '#2B3A44', [c * 4.8, 1.55, 0], { cast: false })); kereta.add(mesh(G.box(4.6, .18, 1.72), '#C9472F', [c * 4.8, .62, 0], { cast: false })) }
  g.userData.kereta = kereta; return g;
}
export function papanAturan(parent, p, items) {   // papan pengumuman desa berisi pelat aturan (dinyalakan satu-satu)
  const g = group(parent, p); [-1, 1].forEach(x => g.add(mesh(G.box(.2, 3.6, .2), '#6E4A2C', [x * 2.4, 1.8, 0]))); g.add(mesh(G.box(5.2, 2.9, .16), '#7A5A3A', [0, 2.3, 0]));
  g.add(mesh(G.box(5.6, .2, .7), '#6E3A2A', [0, 3.85, .1], { rot: [.3, 0, 0] }));
  const plates = items.map(([ic, a, b], i) => { const m = canvasPlane(4.6, .75, (x, W, H) => { x.fillStyle = '#F2EAD6'; x.fillRect(0, 0, W, H); x.fillStyle = '#1F3B2A'; x.textBaseline = 'middle'; x.font = `800 ${Math.round(H * .4)}px Poppins`; x.fillText(`${ic}${a}`, 22, H / 2 + 2);
    x.textAlign = 'right'; x.fillStyle = '#8A4B32'; x.font = `700 ${Math.round(H * .29)}px Poppins`; x.fillText(b, W - 22, H / 2 + 2) }, 700); m.position.set(0, 3.2 - i * .9, .1); g.add(m); m.scale.setScalar(.001); return m });
  g.userData.plates = plates; return g;
}

// ---- teks DOM ----
export const BIG = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: PFONT, fontWeight: 800, fontSize: '150px', color: '#F6E7B8', textShadow: '0 6px 0 #6B4A1E, 0 16px 38px rgba(0,0,0,.6)', letterSpacing: '2px', opacity: 0 }, css), root, html);
export const show = (e, p, dy = 30) => { const q = E.out(Math.max(0, Math.min(1, p))); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * dy}px)` };
export const pulse = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 ? 1 : 0; e.style.transform = `scale(${q > 0 ? .7 + .3 * E.back(q) : .7})` };

// ---- desa besar: ratusan rumah (instanced), jaringan jalan, fasilitas umum, sawah, sungai, bukit ----
const RNG = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function inst(geo, colors, n) { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .85, flatShading: true }), n); m.castShadow = m.receiveShadow = true; return m }
export function fasum(parent, kind, p, rot = 0) {   // bangunan fasilitas umum yang mudah dikenali dari udara
  const g = group(parent, p); g.rotation.y = rot;
  if (kind === 'masjid') { g.add(mesh(G.box(7, 3.4, 7), '#F4EFE2', [0, 1.7, 0])); g.add(mesh(G.sph(2.6, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#2E8B6A', [0, 3.4, 0], { mat: { flatShading: false } }));
    g.add(mesh(G.cyl(.45, .55, 9, 10), '#F4EFE2', [4.4, 4.5, 3])); g.add(mesh(G.cone(.7, 1.6, 10), '#2E8B6A', [4.4, 9.8, 3])); g.add(mesh(G.box(8.6, .2, 8.6), '#D8CFBC', [0, .1, 0])) }
  if (kind === 'sekolah') { g.add(mesh(G.box(12, 3, 3.6), '#F2E6C8', [0, 1.5, -3])); g.add(mesh(G.box(12.6, .5, 4.4), '#B5452B', [0, 3.2, -3])); for (let i = -5; i <= 5; i += 2) g.add(mesh(G.box(1, .9, .05), '#7BAFD4', [i, 1.8, -1.18], { cast: false }));
    g.add(mesh(G.box(12, .05, 6), '#D9C9A0', [0, .03, 2], { cast: false })); g.add(mesh(G.cyl(.06, .06, 6, 6), '#CCCCCC', [0, 3, 3])); g.add(mesh(G.box(1.4, .5, .04), '#D93B3B', [.72, 5.7, 3])); g.add(mesh(G.box(1.4, .5, .04), '#F4F4F4', [.72, 5.2, 3])) }
  if (kind === 'puskesmas') { g.add(mesh(G.box(8, 3, 4.5), '#FFFFFF', [0, 1.5, 0])); g.add(mesh(G.box(8.6, .4, 5.1), '#2E7DB0', [0, 3.2, 0])); g.add(mesh(G.box(1.6, .45, .06), '#D93B3B', [0, 2.4, 2.28], { cast: false })); g.add(mesh(G.box(.45, 1.6, .06), '#D93B3B', [0, 2.4, 2.28], { cast: false })) }
  if (kind === 'pasar') { const C = ['#D9603B', '#3E86B0', '#E8B94A', '#6E9A5C', '#B84E7A']; for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { const x = -6 + i * 3, z = r * 4 - 2;
      g.add(mesh(G.box(2.6, 1.2, 2.2), '#CDB892', [x, .6, z])); g.add(mesh(G.box(2.9, .15, 2.6), C[(i + r) % 5], [x, 1.9, z], { rot: [r ? -.18 : .18, 0, 0] })); [[-1.2, -1], [1.2, -1], [-1.2, 1], [1.2, 1]].forEach(([a, b]) => g.add(mesh(G.box(.08, 1.9, .08), '#6E4A2C', [x + a, .95, z + b]))) } }
  if (kind === 'lapangan') { g.add(mesh(G.box(16, .04, 10), '#6FAE4A', [0, .02, 0], { cast: false })); [[0, 0, 16, .08], [0, 0, .08, 10]].forEach(([x, z, w, d]) => g.add(mesh(G.box(w, .05, d), '#F4F4F4', [x, .04, z], { cast: false })));
    [-1, 1].forEach(sx => { g.add(mesh(G.box(.1, 1.2, .1), '#FFFFFF', [sx * 7.9, .6, -1.2])); g.add(mesh(G.box(.1, 1.2, .1), '#FFFFFF', [sx * 7.9, .6, 1.2])); g.add(mesh(G.box(.1, .1, 2.5), '#FFFFFF', [sx * 7.9, 1.2, 0])) }) }
  if (kind === 'kantor') { g.add(mesh(G.box(9, 3.6, 5), '#EFE6CF', [0, 1.8, 0])); const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), mat('#8A4B32')); r.scale.set(7.4, 2.2, 4.6); r.rotation.y = Math.PI / 4; r.position.y = 4.7; r.castShadow = true; g.add(r);
    for (let i = -3; i <= 3; i += 2) g.add(mesh(G.box(.3, 3.2, .3), '#FFFFFF', [i, 1.6, 2.7])); g.add(mesh(G.cyl(.06, .06, 6, 6), '#CCCCCC', [5.5, 3, 3.5])); g.add(mesh(G.box(1.4, .5, .04), '#D93B3B', [6.22, 5.7, 3.5])); g.add(mesh(G.box(1.4, .5, .04), '#F4F4F4', [6.22, 5.2, 3.5])) }
  return g;
}
export const FASUM = [['masjid', [-21, 0, -24], 0], ['sekolah', [21, 0, -22], 0], ['puskesmas', [-22, 0, 4], Math.PI / 2], ['pasar', [22, 0, 6], 0], ['lapangan', [0, 0, -34], 0], ['kantor', [-20, 0, 24], 0]];
export function desaBesar(sc, o = {}) {
  const R = RNG(o.seed || 7), hole = o.hole || (() => false), S = o.size || 70, B = 14, out = { fasum: {} };
  sc.add(mesh(G.box(S * 2 + 120, .02, S * 2 + 120), '#8FB45A', [0, -.03, 0], { cast: false }));
  // sawah di cincin luar
  const pet = inst(new THREE.BoxGeometry(1, .03, 1), 0, 900); let n = 0; const col = new THREE.Color(), M = new THREE.Matrix4();
  for (let x = -S - 46; x < S + 46 && n < 900; x += 6.4) for (let z = -S - 46; z < S + 46 && n < 900; z += 5.2) { if (Math.abs(x) < S + 2 && Math.abs(z) < S + 2) continue;
    M.compose(new THREE.Vector3(x, .01, z), new THREE.Quaternion(), new THREE.Vector3(6, 1, 4.8)); pet.setMatrixAt(n, M); pet.setColorAt(n++, col.set(grade(['#9CC657', '#86B348', '#B4D46E', '#7FB0A8'][Math.floor(R() * 4)]))) }
  pet.count = n; pet.castShadow = false; sc.add(pet);
  // jalan grid
  for (let k = -S; k <= S; k += B) { sc.add(mesh(G.box(2.2, .03, S * 2), '#B9A274', [k, .015, 0], { cast: false })); sc.add(mesh(G.box(S * 2, .03, 2.2), '#B9A274', [0, .016, k], { cast: false })) }
  // sungai + jembatan
  sc.add(mesh(G.box(5, .04, S * 2 + 120), '#5FA8C8', [S + 8, .02, 0], { cast: false, mat: { roughness: .3 } }));
  // fasilitas umum
  const lots = FASUM.map(([k, p, r]) => { out.fasum[k] = fasum(sc, k, p, r); return p });
  const busy = (x, z) => hole(x, z) || lots.some(p => Math.abs(p[0] - x) < 9.5 && Math.abs(p[2] - z) < 8.5);
  // rumah instanced di sepanjang tepi blok
  const MAXH = 520, body = inst(new THREE.BoxGeometry(1, 1, 1), 0, MAXH), roof = inst(new THREE.CylinderGeometry(0, .78, 1, 4, 1), 0, MAXH); let h = 0;
  const Q = new THREE.Quaternion(), Y = new THREE.Vector3(0, 1, 0), WALL = ['#EFE4CC', '#E6D7B8', '#F2EBDD', '#DCCFB6', '#E9DCC4'], ROOF = ['#B5452B', '#9C4A2E', '#C25A34', '#8A4B32', '#A85A3A', '#6E6A72'];
  for (let bx = -S; bx < S; bx += B) for (let bz = -S; bz < S; bz += B) for (let i = 0; i < 4; i++) for (let side = 0; side < 4; side++) {
    if (h >= MAXH) break; const u = (i + .5) / 4; let x, z, ry;
    if (side === 0) { x = bx + 2.8 + u * (B - 5.6); z = bz + 3; ry = Math.PI } else if (side === 1) { x = bx + 2.8 + u * (B - 5.6); z = bz + B - 3; ry = 0 } else if (side === 2) { x = bx + 3; z = bz + 2.8 + u * (B - 5.6); ry = -Math.PI / 2 } else { x = bx + B - 3; z = bz + 2.8 + u * (B - 5.6); ry = Math.PI / 2 }
    if ((side > 1 && (i === 0 || i === 3)) || busy(x, z) || R() < .12) continue;
    const w = 2 + R() * .7, d = 2 + R() * .5, hh = 1.5 + R() * .5; Q.setFromAxisAngle(Y, ry);
    M.compose(new THREE.Vector3(x, hh / 2, z), Q, new THREE.Vector3(w, hh, d)); body.setMatrixAt(h, M); body.setColorAt(h, col.set(grade(WALL[Math.floor(R() * 5)])));
    Q.setFromAxisAngle(Y, ry + Math.PI / 4); M.compose(new THREE.Vector3(x, hh + .5, z), Q, new THREE.Vector3((w + .6) * .95, 1, (d + .6) * .95)); roof.setMatrixAt(h, M); roof.setColorAt(h++, col.set(grade(ROOF[Math.floor(R() * 6)])));
  }
  body.count = roof.count = h; sc.add(body); sc.add(roof); out.rumah = h;
  // pohon instanced
  const trunk = inst(new THREE.CylinderGeometry(.12, .18, 1, 6), 0, 400), crown = inst(new THREE.IcosahedronGeometry(1, 0), 0, 400); let tn = 0;
  for (let k = 0; k < 400; k++) { const x = (R() - .5) * (S * 2 + 60), z = (R() - .5) * (S * 2 + 60); if (busy(x, z) || (Math.abs(x % B) < 1.6) || (Math.abs(z % B) < 1.6)) continue; const sz = .8 + R() * .7;
    M.compose(new THREE.Vector3(x, .6 * sz, z), new THREE.Quaternion(), new THREE.Vector3(sz, 1.2 * sz, sz)); trunk.setMatrixAt(tn, M); trunk.setColorAt(tn, col.set(grade('#7A4E2C')));
    M.compose(new THREE.Vector3(x, 1.7 * sz, z), new THREE.Quaternion(), new THREE.Vector3(sz * 1.1, sz, sz * 1.1)); crown.setMatrixAt(tn, M); crown.setColorAt(tn++, col.set(grade(['#4E8F3A', '#5E9B3E', '#3F7A32'][Math.floor(R() * 3)]))) }
  trunk.count = crown.count = tn; sc.add(trunk); sc.add(crown);
  // bukit di kejauhan
  for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, r = S + 95 + R() * 30; sc.add(mesh(G.cone(28 + R() * 18, 18 + R() * 16, 7), ['#6E9A6A', '#7FA67A', '#5E8A6E'][k % 3], [Math.cos(a) * r, 8, Math.sin(a) * r], { cast: false })) }
  return out;
}

// label DOM yang menempel ke bangunan (pakai ctx.proj): tampil saat kamera udara
export function labelFasum(root, big) {
  const N = { masjid: 'MASJID', sekolah: 'SEKOLAH', puskesmas: 'PUSKESMAS', pasar: 'PASAR', lapangan: 'LAPANGAN', kantor: 'KANTOR DESA' };
  const L = Object.keys(N).map(k => ({ o: big.fasum[k], e: X.ab({ left: 0, top: 0, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '26px', letterSpacing: '2px', color: '#F4EBD3', background: 'rgba(21,53,42,.9)', padding: '6px 14px', borderRadius: '10px', whiteSpace: 'nowrap', opacity: 0, transform: 'translate(-50%,-100%)' }, root, N[k]) }));
  return (cam, op) => L.forEach(({ o, e }) => { const [x, y, z] = X.proj(o, cam, [0, 7, 0]); e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.opacity = z < 1 && y > 180 && y < 1350 && x > 40 && x < 1040 ? op : 0 });
}
