// Dunia Meja Seberang Bos Season 1 "Dari Warung Lipat": tokoh + lokasi yang dipakai ulang semua episode season ini.
// Kampung kota padat siang terang (ribuan atap instanced: genteng, seng biru, cor beton + toren), gang sempit, teras kontrakan Bima,
// toko besar Bang Rudi di ujung gang, gedung kantor kaca (masa lalu Bima), kota di cakrawala. Kamera makin tinggi tiap babak.
// Warna akun: langit biru toska, atap oranye-biru, aksen oranye kantor (beda dengan Dompet yang senja jingga).
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, tree, person, grade, miniStick, coin } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/kantor.js';
export { at, X };

// ---- suasana ----
export const SIANG = o => newScene(Object.assign({ sky: ['#3E9FE0', '#E6F4F6'], sun: '#FFF4DE', sunPos: [14, 20, 10], hemi: 1.5, sunI: 2.8, shadow: 18, fog: ['#DCEBEE', 90, 380] }, o));
export const PAGI = o => newScene(Object.assign({ sky: ['#5BB0E6', '#FCEFD8'], sun: '#FFE6B8', sunPos: [-14, 14, 12], hemi: 1.3, sunI: 2.6, shadow: 18, fog: ['#EFE6D6', 90, 380] }, o));
export const MENDUNG = o => newScene(Object.assign({ sky: ['#7F93A8', '#D8DEE2'], sun: '#E8ECF0', sunPos: [10, 16, 8], hemi: 1.2, sunI: 1.8, shadow: 18, fog: ['#C9D2D8', 70, 300] }, o));

// ---- tokoh ----
export function bima(p, o = {}) {   // Bima 27: kemeja putih, dasi biru tua, celana bahan, tanda pengenal (lanyard), rambut klimis belah samping
  const g = person(o.parent, p, Object.assign({ body: '#F4F6F8', pants: '#4A525C', skin: '#D9A07A', hair: '#1A1410', tie: '#1E3A5F' }, o)); const st = g.userData.st;
  st.head.add(mesh(G.box(.24, .05, .1), '#1A1410', [.04, .17, .1], { rot: [0, 0, -.25], cast: false }));
  if (o.idcard !== false) { st.body.add(mesh(G.box(.012, .3, .012), '#2E6FB0', [-.06, .44, .1], { rot: [0, 0, .2], cast: false })); const id = mesh(G.box(.1, .13, .01), '#FFFFFF', [-.09, .23, .11], { cast: false }); st.body.add(id); g.userData.id = id }
  return g;
}
export function ijah(p, o = {}) {   // Mak Ijah: daster hijau, kerudung marun, kantong kresek, suka ngutang & gosip
  const g = person(o.parent, p, Object.assign({ body: '#3E9E7A', pants: '#3E9E7A', skin: '#C98E64' }, o)); const st = g.userData.st;
  st.head.add(mesh(G.sph(.235, 20, 16), '#8E2E3E', [0, .06, -.05], { mat: { flatShading: false } })); st.head.add(mesh(G.cone(.26, .3, 20), '#8E2E3E', [0, -.17, -.04], { mat: { flatShading: false } }));
  st.body.add(mesh(G.cyl(.15, .22, .42, 12), '#3E9E7A', [0, -.04, 0], { mat: { flatShading: false } })); [0, 1, 2].forEach(i => st.body.add(mesh(G.sph(.03, 6, 5), '#F2C14E', [-.06 + i * .06, .1 + (i % 2) * .12, .13], { cast: false })));
  const kresek = mesh(G.sph(.13, 10, 8), '#F2F2F2', [0, -.4, .02], { s: [1, 1.2, .8], mat: { transparent: true, opacity: .9 } }); st.arms[1].userData.elbow?.add(kresek); g.userData.kresek = kresek;
  return g;
}
export function rudi(p, o = {}) {   // Bang Rudi: pemilik toko besar, polo merah, perut buncit, kalung emas, kumis, suka bersedekap
  const g = person(o.parent, p, Object.assign({ body: '#C8302A', pants: '#2A2A2E', skin: '#B97A52', hair: '#1A1410', mustache: true }, o)); const st = g.userData.st;
  st.body.add(mesh(G.sph(.2, 16, 12), '#C8302A', [0, .2, .08], { s: [1, 1.1, .9], mat: { flatShading: false } })); st.body.add(mesh(new THREE.TorusGeometry(.1, .012, 6, 16), '#F2C14E', [0, .5, .08], { rot: [1.2, 0, 0], cast: false, mat: { metalness: .5, roughness: .3, flatShading: false } }));
  g.sedekap = () => st.arms.forEach((A, i) => { A.rotation.x = -.6; A.rotation.z = (i ? -1 : 1) * .25; A.userData.elbow.rotation.x = -1.7; A.userData.elbow.rotation.z = (i ? 1 : -1) * .6 });
  return g;
}
export function kucing(parent, p) {   // kucing kampung abu belang: peserta rapat
  const g = group(parent, p); const C = '#9A958C', S = '#6E6A62'; g.add(mesh(G.box(.5, .26, .24), C, [0, .3, 0])); [-.1, .1].forEach(x => g.add(mesh(G.box(.06, .27, .25), S, [x, .3, 0], { cast: false })));
  const hd = group(g, [.3, .5, 0]); hd.add(mesh(G.box(.24, .22, .24), C, [0, 0, 0])); [-1, 1].forEach(z => { hd.add(mesh(G.cone(.06, .12, 4), C, [0, .16, z * .07])); hd.add(mesh(G.sph(.028, 6, 5), '#2A5A2A', [.12, .03, z * .06], { cast: false })) });
  [[-.18, -.08], [-.18, .08], [.18, -.08], [.18, .08]].forEach(([x, z]) => g.add(mesh(G.box(.07, .18, .07), C, [x, .09, z])));
  const tail = mesh(G.box(.05, .05, .34), S, [-.3, .45, 0], { rot: [0, Math.PI / 2, .6] }); g.add(tail); g.userData = { tail, hd }; return g;
}

// ---- perkakas ----
const RNG = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function inst(geo, n, o = {}) { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial(Object.assign({ color: '#FFFFFF', roughness: .85, flatShading: true }, o)), n); m.castShadow = m.receiveShadow = o.cast !== false; return m }
export function canvasPlane(w, h, draw, pw = 512) {
  const c = document.createElement('canvas'); c.width = pw; c.height = Math.round(pw * h / w); const x = c.getContext('2d'); draw(x, c.width, c.height);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: .9 }));
  m.userData.redraw = f => { x.clearRect(0, 0, c.width, c.height); f(x, c.width, c.height); t.needsUpdate = true }; return m;
}
export const papanTeks = (txt, bg, fg, font = 'Poppins', wt = 800) => (x, W, H) => { x.fillStyle = bg; x.fillRect(0, 0, W, H); x.fillStyle = fg; let fs = Math.round(H * .6); x.font = `${wt} ${fs}px ${font}`;
  while (x.measureText(txt).width > W * .9 && fs > 14) { fs -= 2; x.font = `${wt} ${fs}px ${font}` } x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, W / 2, H / 2 + fs * .06) };
const Mx = new THREE.Matrix4(), Qq = new THREE.Quaternion(), Vv = new THREE.Vector3(), Sv = new THREE.Vector3(), Cc = new THREE.Color(), Y = new THREE.Vector3(0, 1, 0);
const put = (m, i, x, y, z, sx, sy, sz, c, ry = 0) => { Qq.setFromAxisAngle(Y, ry); Mx.compose(Vv.set(x, y, z), Qq, Sv.set(sx, sy, sz)); m.setMatrixAt(i, Mx); m.setColorAt(i, Cc.set(grade(c))) };

// ---- KAMPUNG KOTA: ribuan rumah rapat (instanced) dengan gang sempit, jalan besar bermotor, kota di cakrawala ----
// o: { seed, hole(x,z), size }. Mengembalikan { tick(t), rumah }.
export function kampung(sc, o = {}) {
  const R = RNG(o.seed || 21), hole = o.hole || (() => false), S = o.size || 130, out = {};
  sc.add(mesh(G.box(S * 2 + 500, .02, S * 2 + 500), '#B8B0A0', [0, -.04, 0], { cast: false }));
  const WALL = ['#F4E6C8', '#CFE6DA', '#F8D7B8', '#E2E8F2', '#F3EBA6', '#F2CFD6', '#FFFFFF', '#D8E8C4'], GEN = ['#C2562F', '#B5452B', '#D0703A', '#A8502E'], SENG = ['#5E8FB8', '#7FA6C6', '#9AA3AE'];
  const body = inst(new THREE.BoxGeometry(1, 1, 1), 7000), atap = inst(new THREE.CylinderGeometry(0, .78, 1, 4, 1), 7000), flat = inst(new THREE.BoxGeometry(1, 1, 1), 7000), toren = inst(new THREE.CylinderGeometry(.5, .5, 1, 10), 2400);
  const jalan = inst(new THREE.BoxGeometry(1, 1, 1), 900, { cast: false }); let bn = 0, an = 0, fn = 0, tn = 0, jn = 0;
  const BW = 26, roads = [];
  for (let k = -S; k <= S; k += BW) { put(jalan, jn++, k, .005, 0, 5, .02, S * 2, '#6A6D72'); put(jalan, jn++, 0, .006, k, S * 2, .02, 5, '#6A6D72'); roads.push(['x', k], ['z', k]) }
  for (let bx = -S; bx < S; bx += BW) for (let bz = -S; bz < S; bz += BW) {
    for (let gz = bz + 3.5; gz < bz + BW - 3; gz += 6.6) {   // deretan rumah dua sisi gang kecil (sumbu x)
      put(jalan, jn < 899 ? jn++ : jn, bx + BW / 2, .008, gz + 3.3, BW - 5, .02, 1.3, '#A9A397');
      for (let gx = bx + 3.6; gx < bx + BW - 3; gx += 2.9) [0, 1].forEach(sd => { const x = gx, z = gz + sd * 2.6 + (sd ? 1.4 : 0); if (hole(x, z) || R() < .05 || bn >= 6990) return;
        const fl = 1 + Math.floor(R() * R() * 3.2), h = fl * 2.3, w = 2.6 + R() * .3, d = 2.6;
        put(body, bn++, x, h / 2, z, w, h, d, WALL[Math.floor(R() * WALL.length)]); const k = R();
        if (k < .45) { Qq.setFromAxisAngle(Y, Math.PI / 4); Mx.compose(Vv.set(x, h + .45, z), Qq, Sv.set(w * .78, .9, d * .78)); atap.setMatrixAt(an, Mx); atap.setColorAt(an++, Cc.set(grade(GEN[Math.floor(R() * GEN.length)]))) }
        else if (k < .75) put(flat, fn++, x, h + .08, z, w + .3, .16, d + .3, SENG[Math.floor(R() * SENG.length)], R() * .1 - .05);
        else { put(flat, fn++, x, h + .12, z, w + .1, .24, d + .1, '#CFCAC0'); if (tn < 2390) put(toren, tn++, x + (R() - .5), h + .85, z + (R() - .5), 1.1, 1.3, 1.1, R() < .6 ? '#2E7BC0' : '#F28C28') } }) } }
  body.count = bn; atap.count = an; flat.count = fn; toren.count = tn; jalan.count = jn; [body, atap, flat, toren, jalan].forEach(m => sc.add(m)); out.rumah = bn;
  // pohon sela kampung
  const trunk = inst(new THREE.CylinderGeometry(.14, .2, 1, 6), 500), crown = inst(new THREE.IcosahedronGeometry(1, 0), 500); let pn = 0;
  for (let i = 0; i < 700 && pn < 500; i++) { const x = (R() - .5) * S * 2, z = (R() - .5) * S * 2; if (hole(x, z)) continue; const s = 1.1 + R() * .9;
    put(trunk, pn, x, 1.1 * s, z, s, 2.2 * s, s, '#7A4E2C'); put(crown, pn++, x, 3 * s, z, 1.5 * s, 1.3 * s, 1.5 * s, ['#4E9A44', '#5FAA4A', '#3F8A3A'][Math.floor(R() * 3)]) }
  trunk.count = crown.count = pn; sc.add(trunk); sc.add(crown);
  // kota di cakrawala (gedung tinggi melingkar jauh)
  const tw = inst(new THREE.BoxGeometry(1, 1, 1), 260); let wn = 0; const TW = ['#A9D4E6', '#EFE6D6', '#C8D3E8', '#B9DCCB', '#F3D2B4'];
  for (let i = 0; i < 260; i++) { const a = R() * Math.PI * 2, r = S + 40 + R() * 90, h = 20 + R() * 70; put(tw, wn++, Math.cos(a) * r, h / 2, Math.sin(a) * r, 8 + R() * 8, h, 8 + R() * 8, TW[Math.floor(R() * TW.length)]) }
  tw.count = wn; sc.add(tw);
  // motor & mobil di jalan besar
  const N = 260, mv = inst(new THREE.BoxGeometry(1, 1, 1), N), rider = inst(new THREE.BoxGeometry(1, 1, 1), N, { cast: false }); const MC = ['#E5484D', '#2E2E2E', '#2E6FB0', '#F2F2F2', '#F2C14E', '#2E9C6A'];
  const V = Array.from({ length: N }, () => { const L = roads[Math.floor(R() * roads.length)], car = R() < .25, dir = R() < .5 ? 1 : -1; return { L, car, dir, off: dir * 1.2, p0: R() * S * 2, v: 5 + R() * 5, c: MC[Math.floor(R() * MC.length)], rc: ['#F28C28', '#3E9E7A', '#2E6FB0', '#E5484D'][Math.floor(R() * 4)] } });
  out.tick = t => { V.forEach((c, i) => { const s = ((c.p0 + t * c.v * c.dir) % (S * 2) + S * 2) % (S * 2) - S, [ax, k] = c.L, x = ax === 'x' ? k + c.off : s, z = ax === 'x' ? s : k + c.off, ry = ax === 'x' ? 0 : Math.PI / 2;
    if (hole(x, z)) { put(mv, i, 0, -9, 0, .01, .01, .01, c.c); put(rider, i, 0, -9, 0, .01, .01, .01, c.c); return }
    if (c.car) { put(mv, i, x, .55, z, 1.7, .8, 3.4, c.c, ry); put(rider, i, x, 1.2, z, 1.5, .6, 1.8, '#2A3A48', ry) } else { put(mv, i, x, .45, z, .35, .6, 1.3, c.c, ry); put(rider, i, x, 1.2, z, .32, .55, .32, c.rc, ry) } });
    mv.instanceMatrix.needsUpdate = rider.instanceMatrix.needsUpdate = true; mv.instanceColor.needsUpdate = rider.instanceColor.needsUpdate = true };
  sc.add(mv); sc.add(rider); out.tick(0);
  // masjid kampung (kubah) + lapangan kecil: penanda dari udara
  const mq = group(sc, o.masjid || [34, 0, -30]); if (!hole(34, -30)) { mq.add(mesh(G.box(9, 4, 9), '#F4EFE2', [0, 2, 0])); mq.add(mesh(G.sph(3.2, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), '#2E8B6A', [0, 4, 0], { mat: { flatShading: false } })); mq.add(mesh(G.cyl(.5, .6, 12, 10), '#F4EFE2', [5.5, 6, 4])); mq.add(mesh(G.cone(.8, 2, 10), '#2E8B6A', [5.5, 13, 4])) }
  return out;
}

// ---- gedung kantor kaca (masa lalu Bima) ----
export function kantorKaca(parent, p) {
  const g = group(parent, p); const c = document.createElement('canvas'); c.width = 128; c.height = 512; const x = c.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 128, 512);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 30; j++) { x.fillStyle = (i * 7 + j * 3) % 11 === 0 ? '#E8F4FF' : '#7FAFD0'; x.fillRect(i * 32 + 3, j * 17 + 2, 26, 13) }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const tower = new THREE.Mesh(new THREE.BoxGeometry(16, 60, 12), new THREE.MeshStandardMaterial({ map: t, color: grade('#BFDDF0'), roughness: .25, metalness: .2 })); tower.position.set(0, 30, -6); tower.castShadow = tower.receiveShadow = true; g.add(tower);
  g.add(mesh(G.box(16.4, 4.2, .5), '#2A3A48', [0, 2.1, .2])); g.add(mesh(G.box(17, .5, 3), '#F28C28', [0, 4.6, 1.2])); g.add(mesh(G.box(20, .2, 14), '#D8D2C6', [0, .1, 6], { cast: false }));
  const pt = group(g, [0, 0, .9]); pt.add(mesh(G.cyl(1.3, 1.3, 3.6, 16, 1, true), '#CFE6F5', [0, 1.8, 0], { mat: { transparent: true, opacity: .35, side: THREE.DoubleSide } })); const sayap = group(pt, [0, 0, 0]);
  [0, 1].forEach(i => sayap.add(mesh(G.box(2.5, 3.4, .06), '#9CC6E0', [0, 1.8, 0], { rot: [0, i * Math.PI / 2, 0], mat: { transparent: true, opacity: .55 } }))); g.userData.pintu = sayap;
  const pp = canvasPlane(6, .9, papanTeks('PT MAJU TERUS SENTOSA', '#2A3A48', '#FFFFFF'), 640); pp.position.set(0, 3.4, .48); g.add(pp);
  return g;
}

// ---- gang Bima: rumah rapat dua sisi gang (sumbu z), teras kontrakan Bima (kiri, z=0), toko Bang Rudi di ujung (z=-24) ----
export function gang(sc, o = {}) {
  const R = RNG(o.seed || 4), out = {}; sc.add(mesh(G.box(3.4, .08, 60), '#A49E92', [0, .04, -8], { cast: false })); [-1, 1].forEach(s => sc.add(mesh(G.box(.3, .1, 60), '#7E8A90', [s * 1.75, .05, -8], { cast: false })));
  const WALL = ['#CFE6DA', '#F8D7B8', '#E2E8F2', '#F3EBA6', '#F2CFD6', '#D8E8C4', '#FBE3B8'];
  for (let i = 0; i < 9; i++) [-1, 1].forEach(s => { const z = 16 - i * 4.4, fl = 1 + Math.floor(R() * 2.4), h = fl * 2.3 + .4, x = s * 3.6;
    if (s < 0 && i === 3) return;   // kontrakan Bima
    sc.add(mesh(G.box(3.6, h, 4.2), WALL[Math.floor(R() * WALL.length)], [x, h / 2, z]));
    if (R() < .5) { sc.add(mesh(G.box(4, .2, 4.6), ['#C2562F', '#5E8FB8', '#9AA3AE'][i % 3], [x, h + .1, z])) } else { sc.add(mesh(G.box(3.8, .22, 4.4), '#CFCAC0', [x, h + .11, z])); sc.add(mesh(G.cyl(.5, .5, 1.2, 12), R() < .6 ? '#2E7BC0' : '#F28C28', [x, h + .85, z - 1])) }
    sc.add(mesh(G.box(.06, 2, .9), ['#7A4A2A', '#2E6FB0', '#3E9E7A'][i % 3], [x - s * 1.81, 1, z + .9], { cast: false })); sc.add(mesh(G.box(.05, .8, 1.1), '#5A7A90', [x - s * 1.81, 1.5, z - .9], { cast: false }));
    if (fl > 1) sc.add(mesh(G.box(.05, .8, 1.4), '#5A7A90', [x - s * 1.81, 3.8, z], { cast: false }));
    if (R() < .45) { sc.add(mesh(G.cyl(.22, .18, .36, 8), '#B5452B', [x - s * 2.05, .18, z - 1.6])); sc.add(mesh(G.ico(.32, 0), '#4E8F3A', [x - s * 2.05, .55, z - 1.6])) }
    if (R() < .3) { const m = group(sc, [x - s * 2.3, 0, z + .2]); m.add(mesh(G.box(.3, .55, 1.4), ['#E5484D', '#2E2E2E', '#2E6FB0'][i % 3], [0, .55, 0])); [-.55, .55].forEach(dz => m.add(mesh(G.cyl(.27, .27, .12, 12), '#1E1E1E', [0, .27, dz], { rot: [0, 0, Math.PI / 2] }))) }
    if (R() < .5) for (let k = 0; k < 3; k++) sc.add(mesh(G.box(.04, .6, .5), ['#E5484D', '#F2C14E', '#2E6FB0', '#FFFFFF'][(i + k) % 4], [x - s * 2.1, 2.6, z - .8 + k * .6], { cast: false })) });
  for (let z = 16; z > -22; z -= 5.2) { sc.add(mesh(G.cyl(.015, .015, 8, 4), '#2A2A2A', [0, 5.6 + (z % 2) * .3, z], { rot: [0, 0, Math.PI / 2 + .04], cast: false })) }
  // kontrakan Bima: rumah mundur, teras keramik, pintu, jendela, lampu teras
  // muka rumah di x = -3.4 (dunia), teras keramik x -3.4..-1.9, z 0.7..4.9; meja lipat di x ±-2.45
  const k = group(sc, [-4.6, 0, 2.8]); k.add(mesh(G.box(3, 2.9, 4.2), '#F4E6C8', [-.3, 1.45, 0])); k.add(mesh(G.box(4.8, .2, 4.8), '#5E8FB8', [.5, 3, 0], { rot: [0, 0, .06], cast: false }));
  k.add(mesh(G.box(1.5, .12, 4.2), '#E8E2D6', [1.95, .06, 0], { cast: false })); for (let i = 0; i < 6; i++) k.add(mesh(G.box(1.5, .125, .02), '#C9C2B6', [1.95, .062, -2 + i * .8], { cast: false }));
  k.add(mesh(G.box(.06, 1.9, .85), '#7A4A2A', [1.21, .95, -1.3], { cast: false })); k.add(mesh(G.box(.05, .9, 1.2), '#5A7A90', [1.21, 1.6, .9], { cast: false })); [-1, 1].forEach(z => k.add(mesh(G.box(.12, 2.8, .12), '#8A7A6A', [2.65, 1.4, z * 2])));
  const lamp = mesh(G.sph(.05, 10, 8), '#FFF4C8', [2.2, 2.75, 0], { cast: false, mat: { emissive: '#FFE08A', emissiveIntensity: .6 } }); k.add(lamp);
  out.teras = k; out.mukaX = -3.4; out.terasZ = 2.8;
  // toko Bang Rudi di ujung gang
  const T = group(sc, [0, 0, -25]); T.add(mesh(G.box(12, 7, 6), '#F4F1EA', [0, 3.5, -1])); T.add(mesh(G.box(12.4, .4, 7), '#C8302A', [0, 7.2, -.6])); T.add(mesh(G.box(9, 3, .1), '#2A2A2E', [0, 1.5, 2.02]));
  const shelfC = ['#E5484D', '#F2C14E', '#2E6FB0', '#2E9C6A', '#F28C28', '#FFFFFF', '#8E5AA8'];
  for (let r = 0; r < 3; r++) for (let i = 0; i < 16; i++) T.add(mesh(G.box(.4, .45, .3), shelfC[(i * 3 + r) % 7], [-4 + i * .53, .5 + r * .9, 1.6], { cast: false }));
  [0, 1, 2].forEach(r => T.add(mesh(G.box(8.8, .06, .5), '#8A7A6A', [0, .25 + r * .9, 1.6], { cast: false })));
  const sp = canvasPlane(10, 1.6, (x, W, H) => { x.fillStyle = '#C8302A'; x.fillRect(0, 0, W, H); x.fillStyle = '#FFE27A'; x.font = `800 ${H * .44}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(o.spanduk || 'TOKO RUDI', W / 2, H * .45);
    x.fillStyle = '#FFFFFF'; x.font = `700 ${H * .22}px Poppins`; x.fillText(o.spanduk2 || 'serba ada · murah · buka 24 jam', W / 2, H * .82) }, 900); sp.position.set(0, 5, 2.06); T.add(sp); out.spanduk = sp;
  [-1, 1].forEach(s => { T.add(mesh(G.box(.2, 3.2, .2), '#8A8A8A', [s * 4.6, 1.6, 2.6])) }); T.add(mesh(G.box(10, .15, 1.6), '#F28C28', [0, 3.2, 2.6], { rot: [.2, 0, 0] }));
  if (o.banner) { const bn = canvasPlane(3.1, .75, papanTeks(o.banner, '#C8302A', '#FFE27A'), 600); bn.position.set(0, 3.7, -15.5); sc.add(bn); [-1, 1].forEach(sx => sc.add(mesh(G.cyl(.012, .012, 1, 4), '#333', [sx * 1.5, 4.2, -15.5], { cast: false }))) }
  out.toko = T; return out;
}
// ---- meja lipat: terbuka(q) 0..1 (kaki berputar dari terlipat), daun meja ----
export function mejaLipat(parent, p) {
  const g = group(parent, p); const top = mesh(G.box(1.5, .06, .75), '#F28C28', [0, .76, 0]); g.add(top); g.add(mesh(G.box(1.52, .02, .77), '#D9731A', [0, .72, 0], { cast: false }));
  const kaki = [[-.65, 1], [.65, -1]].map(([x, d]) => { const L = group(g, [x, .73, 0]); L.add(mesh(G.box(.05, .73, .62), '#9AA0A8', [0, -.36, 0])); L.userData.d = d; return L });
  g.userData.buka = q => { kaki.forEach(L => L.rotation.z = (1 - q) * L.userData.d * 1.45); top.position.y = .76; g.position.y = p[1] + (1 - q) * 0 };
  g.userData.buka(1); return g;
}
export function kardus(parent, p, o = {}) {   // kardus mi: tutup bisa dibuka (buka(q)), label
  const g = group(parent, p); g.add(mesh(G.box(.6, .4, .45), '#C9A36B', [0, .2, 0])); const lb = canvasPlane(.5, .26, papanTeks('MI 40 bks', '#E5484D', '#FFF6E6'), 256); lb.position.set(0, .22, .23); g.add(lb);
  const f = [-1, 1].map(s => { const F = group(g, [0, .4, s * .225]); F.add(mesh(G.box(.6, .02, .22), '#B8915A', [0, 0, -s * .11])); F.userData.s = s; return F });
  g.userData.buka = q => f.forEach(F => F.rotation.x = F.userData.s * q * 2.2); return g;
}
export function bungkus(parent, p) { const g = group(parent, p); g.add(mesh(G.box(.17, .04, .13), '#F2C14E', [0, .02, 0])); g.add(mesh(G.box(.17, .041, .04), '#E5484D', [0, .02, 0], { cast: false })); return g }
// papan kanvas yang bisa digambar ulang + bingkai kayu
export function papan(parent, p, w, h, draw, rotY = 0) { const g = group(parent, p); g.rotation.y = rotY; g.add(mesh(G.box(w + .14, h + .14, .06), '#8A6A4A', [0, 0, -.04])); const c = canvasPlane(w, h, draw, 900); g.add(c); g.userData.c = c; return g }

// ---- teks DOM (Poppins tegas, navy + oranye; khas Meja) ----
export const BIG = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: '120px', color: '#FFFFFF', textShadow: '0 6px 0 #1E3A5F, 0 16px 36px rgba(10,20,40,.55)', letterSpacing: '1px', lineHeight: 1.02, opacity: 0 }, css), root, html);
export const KARTU = (root, a, b, css = {}) => X.ab(Object.assign({ left: 60, top: 330, width: 960, textAlign: 'center', opacity: 0, fontFamily: 'Poppins' }, css), root,
  `<div style="display:inline-block;background:#FBF8EE;color:#1E2A38;border-radius:14px;padding:14px 34px 16px;box-shadow:0 14px 30px #00000050;border-left:10px solid #F28C28">
   <div style="font-size:60px;font-weight:800;color:#1E3A5F;line-height:1.08">${a}</div>${b ? `<div style="font-size:36px;font-weight:700;color:#5A6B7E;line-height:1.2">${b}</div>` : ''}</div>`);
export const show = (e, p, dy = 30) => { const q = E.out(Math.max(0, Math.min(1, p))); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * dy}px)` };
export const pulse = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 ? 1 : 0; e.style.transform = `scale(${q > 0 ? .7 + .3 * E.back(q) : .7})` };
export const ease = (t, a, b) => E.inout(seg(t, a, b));
export function tag(root, html) { const e = X.ab({ left: 0, top: 0, fontFamily: 'Poppins', fontWeight: 800, fontSize: '32px', color: '#1E2A38', background: '#FFE27A', padding: '6px 18px', borderRadius: '6px', whiteSpace: 'nowrap', opacity: 0, transform: 'translate(-50%,-100%) rotate(-2deg)', boxShadow: '0 8px 18px #00000045' }, root, html);
  return (obj, cam, off, op) => { const [x, y] = X.proj(obj, cam, off); e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.opacity = op } }
export function duduk(p, y = -.36) { p.userData.st.legs.forEach(L => { L.rotation.x = -1.45; L.userData.knee && (L.userData.knee.rotation.x = 1.45) }); p.position.y = y }
export function kursi(parent, p, rot = 0, c = '#2E6FB0') { const g = group(parent, p); g.rotation.y = rot; g.add(mesh(G.box(.5, .06, .5), c, [0, .5, 0])); g.add(mesh(G.box(.5, .55, .06), c, [0, .78, -.22])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => g.add(mesh(G.box(.04, .5, .04), '#555', [a * .22, .25, b * .22]))); return g }

// ==== tambahan Ep 1 (20 Nov): kopi sachet, termos bekas, gelas plastik, ojol, tukang bangunan, lapak grosir ====
export function ojol(p, o = {}) {   // pengemudi ojol generik: jaket hijau tosca + strip oranye, helm
  const g = person(o.parent, p, Object.assign({ body: o.c || '#1F8A84', pants: '#2F3540', skin: o.skin || '#C98E64', hair: '#1A1410' }, o)); const st = g.userData.st;
  st.body.add(mesh(G.box(.22, .06, .21), '#F28C28', [0, .3, 0], { cast: false })); st.head.add(mesh(G.sph(.27, 18, 12, 0, Math.PI * 2, 0, Math.PI * .55), o.helm || '#F2F2F2', [0, .04, 0], { mat: { flatShading: false } })); return g;
}
export function tukang(p, o = {}) {   // tukang bangunan: kaos abu kusam, celana pendek, helm proyek kuning, handuk di leher
  const g = person(o.parent, p, Object.assign({ body: o.c || '#8A8F96', pants: '#4A4036', skin: o.skin || '#A86F48', hair: '#1A1410' }, o)); const st = g.userData.st;
  st.head.add(mesh(G.sph(.28, 18, 12, 0, Math.PI * 2, 0, Math.PI * .5), '#F2C14E', [0, .06, 0], { mat: { flatShading: false } })); st.head.add(mesh(G.cyl(.33, .33, .03, 18), '#F2C14E', [0, .06, 0]));
  st.body.add(mesh(new THREE.TorusGeometry(.13, .035, 6, 14), '#FFFFFF', [0, .45, 0], { rot: [Math.PI / 2, 0, 0], cast: false })); return g;
}
export function termos(parent, p, s = 1) {   // termos air panas bekas: badan merah pudar, tutup abu, pegangan
  const g = group(parent, p); g.scale.setScalar(s); const SM = { flatShading: false }; g.add(mesh(G.cyl(.13, .14, .42, 16), '#C8584A', [0, .21, 0], { mat: SM })); g.add(mesh(G.cyl(.1, .13, .08, 16), '#9AA0A8', [0, .46, 0], { mat: SM }));
  g.add(mesh(G.cyl(.04, .04, .06, 10), '#7E8A90', [0, .52, 0])); g.add(mesh(new THREE.TorusGeometry(.08, .015, 6, 12, Math.PI), '#4E5A66', [0, .34, -.14], { rot: [0, 0, 0] })); g.add(mesh(G.box(.18, .08, .002), '#F2E6C8', [0, .22, .14], { cast: false })); return g;
}
export function gelas(parent, p, isi = true) { const g = group(parent, p); g.add(mesh(G.cyl(.05, .038, .12, 12), '#EAF2F6', [0, .06, 0], { mat: { transparent: true, opacity: .75, flatShading: false } })); if (isi) g.add(mesh(G.cyl(.046, .04, .09, 12), '#5A3220', [0, .05, 0], { cast: false })); return g }
export function renceng(parent, p, c = '#5A3220', n = 10) {   // renceng kopi sachet: deret bungkus kecil menjuntai
  const g = group(parent, p); for (let i = 0; i < n; i++) { g.add(mesh(G.box(.1, .12, .015), c, [0, -i * .125, 0], { cast: false })); g.add(mesh(G.box(.1, .03, .016), '#F2C14E', [0, -i * .125 + .03, 0], { cast: false })) } return g;
}
export function lapakGrosir(parent, p) {   // lapak grosir pinggir jalan: rak, tumpukan dus, renceng kopi warna-warni bergantungan, terpal biru
  const g = group(parent, p); g.add(mesh(G.box(5, 3, 2.6), '#E8E2D6', [0, 1.5, -1.3])); g.add(mesh(G.box(5.6, .12, 3.6), '#2E7BC0', [0, 3.05, -.6], { rot: [-.12, 0, 0], cast: false }));
  [-2.6, 2.6].forEach(x => g.add(mesh(G.box(.1, 3, .1), '#8A8A8A', [x, 1.5, 1.1])));
  const C = ['#5A3220', '#C8302A', '#2E6FB0', '#F2C14E', '#2E9C6A', '#8E5AA8']; for (let i = 0; i < 18; i++) g.add(renceng(g, [-2.3 + i * .27, 2.85, 1.05], C[i % 6], 7 + (i % 3)));
  for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) g.add(mesh(G.box(.55, .38, .45), ['#C9A36B', '#B8915A', '#D9B67E'][(i + r) % 3], [-1.8 + i * .6, .19 + r * .39, -.4]));
  g.add(mesh(G.box(3.4, .9, .7), '#A86B35', [0, .45, .55])); const pp = canvasPlane(3.2, .6, papanTeks('GROSIR SEMBAKO', '#C8302A', '#FFE27A'), 600); pp.position.set(0, 3.45, 1.25); g.add(pp); g.add(mesh(G.box(3.4, .7, .06), '#8A1E1A', [0, 3.45, 1.2])); return g;
}
