// Dunia Kades Magang Juara Season 1 "30 Hari Masa Percobaan": tokoh + lokasi yang dipakai ulang semua episode season ini.
// Lembah desa yang DITINGGAL warga (rumah dipaku papan), balai desa tua, bale bambu, stasiun kecil tempat perantau pulang.
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, island, tree, house, person } from '../../../engine/w3d/kit.js';
import { X, canvasPlane, PFONT } from '../../../engine/w3d/desa3d.js';

// ---- suasana ----
export const SORE = o => newScene(Object.assign({ sky: ['#E9A866', '#FCE7C6'], sun: '#FFD3A0', sunPos: [-12, 10, 9], hemi: 1.05, sunI: 2.3, shadow: 18 }, o));
export const SENJA = o => newScene(Object.assign({ sky: ['#7E5A8C', '#F2A36B'], sun: '#FFB27A', sunPos: [-14, 5, 6], hemi: .9, sunI: 2.0, shadow: 18 }, o));
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
  island(sc, 26, 34, '#8FB45A', '#7A5C3E'); sc.add(mesh(G.box(2.6, .04, 34), '#B39A6E', [0, .02, 0], { cast: false }));
  const R = [];
  for (let i = 0; i < 6; i++) [-1, 1].forEach(sx => { const z = -13 + i * 5 + (sx > 0 ? 1.4 : 0); const r = rumahDipaku(sc, [sx * 4.6, 0, z], { rot: sx > 0 ? -Math.PI / 2 : Math.PI / 2, wall: ['#D8CDB4', '#CFC2A4', '#DDD3BD'][i % 3], roofC: ['#8C5A3C', '#7E4E36', '#946448'][(i + 1) % 3] }); R.push(r) });
  [[-9, -12], [9.5, -8], [-10, -2], [10, 4], [-9.5, 9], [9, 12], [-11, 14], [11, -14]].forEach(([x, z], i) => tree(sc, [x, 0, z], 1 + (i % 3) * .25, '#5E8F3A', i % 2 ? 'palm' : 'round'));
  const leaves = Array.from({ length: 14 }, (_, i) => { const m = mesh(G.box(.12, .02, .08), ['#B07A3A', '#C9A04A', '#8A6A3A'][i % 3], [0, .1, 0], { cast: false }); sc.add(m); return m });
  return { rumah: R, leaves, angin: t => leaves.forEach((l, i) => { const q = (t * .18 + i / 14) % 1; l.position.set(lerp(-6, 6, q) + Math.sin(i * 3) * 2, .15 + Math.abs(Math.sin(t * 3 + i)) * .4, -12 + (i * 2.3) % 24); l.rotation.set(t * 4 + i, t * 3, 0) }) };
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
