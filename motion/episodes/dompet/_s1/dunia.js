// Dunia Dompet Gue Nangis Season 1 "Rp100 Ribu di Jakarta": tokoh + lokasi yang dipakai ulang semua episode season ini.
// Jakarta kartun senja-cerah: ratusan gedung tinggi + ribuan rumah kampung (InstancedMesh), jalan raya penuh kendaraan bergerak,
// rel layang + KRL, peron, warteg, gang kos Bu Ratna, jembatan penyeberangan, tugu emas di kejauhan.
// Warna akun: langit biru -> jingga senja, bata/oranye hangat (beda dengan Kades yang hijau sawah).
import { THREE, lerp, seg, E, mat, mesh, G, group, newScene, camera, tree, person, grade, miniStick } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/nana.js';
export { at, X };

// ---- suasana ----
export const SORE = o => newScene(Object.assign({ sky: ['#4F9EDB', '#FFD9A8'], sun: '#FFD6A6', sunPos: [-16, 13, 12], hemi: 1.3, sunI: 2.7, shadow: 18, fog: ['#F6D8B6', 90, 360] }, o));
export const SENJA = o => newScene(Object.assign({ sky: ['#6C78C8', '#FFAE7A'], sun: '#FFB98A', sunPos: [-18, 8, 8], hemi: 1.25, sunI: 2.3, shadow: 18, fog: ['#F2B38E', 90, 360] }, o));
export const SIANG = o => newScene(Object.assign({ sky: ['#5AA8E6', '#EAF2EE'], sun: '#FFF2DA', sunPos: [12, 18, 10], hemi: 1.3, sunI: 2.6, shadow: 18, fog: ['#DDE9EC', 90, 360] }, o));

// ---- tokoh ----
export function nana(p, o = {}) {   // Nana 22: kaos bata, jeans, rambut kuncir kuda, tas selempang
  const g = person(o.parent, p, Object.assign({ body: '#D9622B', pants: '#456A9A', skin: '#E2A97E', hair: '#22160F' }, o)); const st = g.userData.st;
  st.head.add(mesh(G.sph(.08, 12, 10), '#22160F', [0, .1, -.2], { mat: { flatShading: false } })); const tail = mesh(new THREE.CapsuleGeometry(.05, .2, 4, 8), '#22160F', [0, -.04, -.25], { rot: [.5, 0, 0], mat: { flatShading: false } }); st.head.add(tail);
  st.body.add(mesh(G.box(.24, .2, .1), '#F2C14E', [.13, .02, .1], { rot: [0, 0, .1] })); st.body.add(mesh(G.box(.03, .5, .02), '#7A4A20', [0, .3, .1], { rot: [0, 0, .62], cast: false }));
  g.userData.tail = tail; return g;
}
export function raka(p, o = {}) {   // Raka: ojol (jaket teal-oranye generik), helm, sok hemat
  const g = person(o.parent, p, Object.assign({ body: '#1F8A84', pants: '#2F3540', skin: '#C98E64', hair: '#1A1410' }, o)); const st = g.userData.st;
  st.body.add(mesh(G.box(.22, .08, .21), '#F28C28', [0, .38, 0], { cast: false })); st.body.add(mesh(G.box(.21, .06, .21), '#F28C28', [0, .14, 0], { cast: false }));
  if (o.helm !== false) { st.head.add(mesh(G.sph(.25, 18, 12, 0, Math.PI * 2, 0, Math.PI * .55), '#F2F2F2', [0, .04, 0], { mat: { flatShading: false } })); st.head.add(mesh(G.box(.3, .1, .05), '#2A3A4A', [0, .02, .22], { cast: false })) }
  return g;
}
export function ratna(p, o = {}) {   // Bu Ratna: ibu kos, daster ungu, rol rambut warna-warni, galak tapi baik
  const g = person(o.parent, p, Object.assign({ body: '#9C4E9A', pants: '#9C4E9A', skin: '#D9A07A', hair: '#2A1E1A', glasses: true }, o)); const st = g.userData.st;
  st.head.add(mesh(G.sph(.1, 10, 8), '#2A1E1A', [0, .12, -.2]));
  ['#F2C14E', '#E56B8A', '#5FB3D9'].forEach((c, i) => st.head.add(mesh(G.cyl(.04, .04, .14, 10), c, [-.09 + i * .09, .25, -.04], { rot: [0, 0, Math.PI / 2], mat: { flatShading: false } })));
  st.body.add(mesh(G.cyl(.15, .2, .38, 12), '#9C4E9A', [0, -.02, 0], { mat: { flatShading: false } })); st.body.add(mesh(G.box(.3, .22, .02), '#F6E6A8', [0, .02, .14], { cast: false }));
  return g;
}
// Si Dompet: maskot, dompet cokelat berwajah; mood(t, m): m = 'senyum' | 'kecut' | 'nangis' | 'kaget'
export function siDompet(parent, p, s = 1) {
  const g = group(parent, p); g.scale.setScalar(s); const SM = { flatShading: false, roughness: .55 };
  const body = group(g); body.add(mesh(new THREE.CapsuleGeometry(.32, .5, 6, 16), '#8B5A2B', [0, .38, 0], { rot: [0, 0, Math.PI / 2], s: [1, 1, .45], mat: SM }));
  const flap = mesh(new THREE.CapsuleGeometry(.2, .55, 6, 14), '#A86B35', [0, .62, .02], { rot: [0, 0, Math.PI / 2], s: [1, 1, .5], mat: SM }); body.add(flap);
  body.add(mesh(G.sph(.07, 12, 10), '#F2C14E', [0, .55, .17], { mat: SM })); body.add(mesh(G.box(.5, .02, .01), '#6B4220', [0, .2, .15], { cast: false }));
  const eyes = [-1, 1].map(i => { const e = group(body, [i * .2, .4, .14]); e.add(mesh(G.sph(.1, 16, 12), '#FFFFFF', [0, 0, 0], { cast: false, mat: SM })); const pu = mesh(G.sph(.055, 12, 10), '#1E1E1E', [0, 0, .07], { cast: false, mat: SM }); e.add(pu); e.userData.pu = pu; return e });
  const brows = [-1, 1].map(i => { const b = mesh(G.box(.14, .03, .02), '#3A1A0A', [i * .2, .55, .16], { cast: false }); body.add(b); return b });
  const smile = mesh(new THREE.TorusGeometry(.09, .022, 8, 16, Math.PI), '#3A1A0A', [0, .25, .15], { rot: [0, 0, Math.PI], cast: false }); body.add(smile);
  const oh = mesh(G.sph(.05, 10, 8), '#3A1A0A', [0, .23, .15], { cast: false, s: [1, 1.3, .5] }); body.add(oh);
  const tears = [-1, 1].map(i => { const d = mesh(G.sph(.045, 10, 8), '#7FC4E8', [i * .2, .3, .17], { cast: false, mat: { emissive: '#7FC4E8', emissiveIntensity: .5, flatShading: false } }); body.add(d); return d });
  const cheeks = [-1, 1].map(i => { const c = mesh(G.sph(.04, 8, 6), '#E58A7A', [i * .3, .3, .13], { cast: false, s: [1.3, .7, .4] }); body.add(c); return c });
  g.mood = (t, m = 'senyum', q = 1) => {
    const sad = m === 'nangis', sour = m === 'kecut', shock = m === 'kaget';
    smile.visible = !shock; oh.visible = shock; smile.rotation.z = sad || sour ? 0 : Math.PI; smile.position.y = sad || sour ? .2 : .26; smile.scale.set(sour ? .7 : 1, sour ? .5 : 1, 1);
    const blink = Math.sin(t * 2.7) > .985; eyes.forEach((e, i) => { e.scale.y = blink ? .1 : sad ? .65 : shock ? 1.25 : 1; e.userData.pu.position.y = sad ? -.03 : 0 });
    brows.forEach((b, i) => { b.rotation.z = (i ? -1 : 1) * (sad ? -.4 : sour ? -.25 : shock ? .2 : .1); b.position.y = shock ? .6 : .55 });
    tears.forEach((d, i) => { d.visible = sad; const k = (t * 1.3 + i * .5) % 1; d.position.set((i ? 1 : -1) * (.2 + k * .06), .3 - k * .45, .17); d.scale.setScalar(1 - k * .4) });
    cheeks.forEach(c => c.visible = m === 'senyum'); flap.rotation.x = 0;
    body.position.y = Math.abs(Math.sin(t * (sad ? 10 : 3.2))) * (sad ? .025 : .06) * q; body.rotation.z = sad ? Math.sin(t * 9) * .04 : Math.sin(t * 1.6) * .05;
  };
  g.mood(0); return g;
}

// ---- perkakas ----
const RNG = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function inst(geo, n, o = {}) { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial(Object.assign({ color: '#FFFFFF', roughness: .85, flatShading: true }, o)), n); m.castShadow = m.receiveShadow = o.cast !== false; return m }
export function canvasPlane(w, h, draw, pw = 512) {   // papan/kertas bergambar dari canvas (bisa digambar ulang)
  const c = document.createElement('canvas'); c.width = pw; c.height = Math.round(pw * h / w); const x = c.getContext('2d'); draw(x, c.width, c.height);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: .9 }));
  m.userData.redraw = f => { x.clearRect(0, 0, c.width, c.height); f(x, c.width, c.height); t.needsUpdate = true }; return m;
}
export const papanTeks = (txt, bg, fg, font = 'Baloo', wt = 800) => (x, W, H) => { x.fillStyle = bg; x.fillRect(0, 0, W, H); x.fillStyle = fg; let fs = Math.round(H * .62); x.font = `${wt} ${fs}px ${font}`;
  while (x.measureText(txt).width > W * .9 && fs > 16) { fs -= 2; x.font = `${wt} ${fs}px ${font}` } x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, W / 2, H / 2 + fs * .06) };
function winTex(cols, rows, lit) {   // tekstur jendela gedung (dikali warna instance)
  const c = document.createElement('canvas'); c.width = 128; c.height = 256; const x = c.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, 128, 256);
  const cw = 128 / cols, rh = 256 / rows; let r = 3; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { r = (r * 16807) % 2147483647; const k = r / 2147483647;
    x.fillStyle = k < lit ? '#FFE6A8' : k < .55 ? '#9DB6C8' : '#B9CAD6'; x.fillRect(i * cw + cw * .16, j * rh + rh * .22, cw * .68, rh * .56) }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// ---- KOTA JAKARTA: dipakai hampir semua adegan. hole(x,z) = area kosong untuk set lokal ----
// o: { seed, hole, rail: z rel layang, size }. Mengembalikan { tick(t), kereta } (kendaraan bergerak, KRL lewat).
export function kota(sc, o = {}) {
  const R = RNG(o.seed || 11), hole = o.hole || (() => false), S = o.size || 154, B = 22, out = {};
  const Mx = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), Sv = new THREE.Vector3(), col = new THREE.Color(), Y = new THREE.Vector3(0, 1, 0);
  sc.add(mesh(G.box(S * 2 + 400, .02, S * 2 + 400), '#BDB4A2', [0, -.04, 0], { cast: false }));
  // jalan grid + marka
  const road = inst(new THREE.BoxGeometry(1, 1, 1), 200, { cast: false }), mark = inst(new THREE.BoxGeometry(1, 1, 1), 2400, { cast: false }); let rn = 0, mn = 0;
  const put = (m, i, x, y, z, sx, sy, sz, c, ry = 0) => { Q.setFromAxisAngle(Y, ry); Mx.compose(V.set(x, y, z), Q, Sv.set(sx, sy, sz)); m.setMatrixAt(i, Mx); m.setColorAt(i, col.set(grade(c))) };
  const lanes = [];
  for (let k = -S; k <= S; k += B) { const big = Math.abs(k) % (B * 3) === 0, w = big ? 7 : 4.2;
    put(road, rn++, k, .005, 0, w, .02, S * 2, '#5C5F66'); put(road, rn++, 0, .006, k, S * 2, .02, w, '#5C5F66');
    for (let q = -S; q < S; q += 3) { if (mn < 2390) { put(mark, mn++, k, .02, q, .14, .01, 1.4, '#EDEDE6'); put(mark, mn++, q, .021, k, 1.4, .01, .14, '#EDEDE6') } }
    lanes.push(['x', k, big], ['z', k, big]) }
  road.count = rn; mark.count = mn; sc.add(road); sc.add(mark);
  // gedung tinggi (pusat) / menengah / rumah kampung (pinggir)
  const tall = inst(new THREE.BoxGeometry(1, 1, 1), 700, { map: winTex(4, 16, o.lit ?? .18), roughness: .6 }), mid = inst(new THREE.BoxGeometry(1, 1, 1), 900, { map: winTex(3, 5, o.lit ?? .15) });
  const cap = inst(new THREE.BoxGeometry(1, 1, 1), 1600), hb = inst(new THREE.BoxGeometry(1, 1, 1), 3200), hr = inst(new THREE.CylinderGeometry(0, .78, 1, 4, 1), 3200);
  const GL = ['#8FC3E0', '#A9D4E6', '#EFE6D6', '#F3D2B4', '#B9DCCB', '#E3B79A', '#C8D3E8', '#F6E9C8'], WALL = ['#F2E3C6', '#F5C9A8', '#CFE3D4', '#F3E6A6', '#E9CFC9', '#D5E4EF', '#FFFFFF'], ROOF = ['#C2562F', '#B5452B', '#D0703A', '#9C4A2E', '#6E8FA6', '#8A8A8A'];
  let tn = 0, dn = 0, cn = 0, hn = 0; const cx = o.cx ?? 0, cz = o.cz ?? -70;
  for (let bx = -S; bx < S; bx += B) for (let bz = -S; bz < S; bz += B) {
    const mx = bx + B / 2, mz = bz + B / 2, dist = Math.hypot(mx - cx, mz - cz);
    if (R() < .05 && dist > 40) { put(cap, cn++, mx, .03, mz, B - 6, .05, B - 6, '#8DBF5A'); continue }   // taman
    if (dist < 95) { const n = dist < 50 ? 4 : 3;   // gedung
      for (let i = 0; i < n; i++) { const x = bx + 7 + (i % 2) * (B - 14), z = bz + 7 + Math.floor(i / 2) * (B - 14) + (n === 3 && i === 2 ? (B - 14) / 2 : 0); if (hole(x, z)) continue;
        const w = 4.5 + R() * 2.5, d = 4.5 + R() * 2.5, h = (dist < 50 ? 26 : 12) + R() * (dist < 50 ? 40 : 20) * (1 - dist / 130); const c = GL[Math.floor(R() * GL.length)];
        if (h > 24) { put(tall, tn++, x, h / 2, z, w, h, d, c); put(cap, cn++, x, h + .5, z, w * .55, 1, d * .55, '#9AA0A8') } else { put(mid, dn++, x, h / 2, z, w, h, d, c); put(cap, cn++, x + w * .2, h + .4, z, 1.2, .8, 1.2, '#7FA0C0') } } }
    else if (dist < 130) { for (let i = 0; i < 4; i++) { const x = bx + 7 + (i % 2) * (B - 14), z = bz + 7 + Math.floor(i / 2) * (B - 14); if (hole(x, z)) continue; const h = 5 + R() * 9;
        put(mid, dn++, x, h / 2, z, 5 + R() * 2, h, 5 + R() * 2, WALL[Math.floor(R() * WALL.length)]) } }
    else for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {   // kampung padat
      const x = bx + 4.2 + i * 3.4, z = bz + 4.2 + j * 3.4; if (hole(x, z) || R() < .08 || hn >= 3190) continue; const w = 2.4 + R() * .5, d = 2.5 + R() * .4, h = 1.8 + Math.floor(R() * 2.3) * 1.5;
      put(hb, hn, x, h / 2, z, w, h, d, WALL[Math.floor(R() * WALL.length)]); Q.setFromAxisAngle(Y, Math.PI / 4); Mx.compose(V.set(x, h + .45, z), Q, Sv.set(w * .78, .9, d * .78)); hr.setMatrixAt(hn, Mx); hr.setColorAt(hn++, col.set(grade(ROOF[Math.floor(R() * ROOF.length)]))) } }
  tall.count = tn; mid.count = dn; cap.count = cn; hb.count = hr.count = hn; [tall, mid, cap, hb, hr].forEach(m => sc.add(m)); out.gedung = tn + dn; out.rumah = hn;
  // pohon pinggir jalan
  const trunk = inst(new THREE.CylinderGeometry(.14, .2, 1, 6), 700), crown = inst(new THREE.IcosahedronGeometry(1, 0), 700); let pn = 0;
  for (const [ax, k] of lanes) for (let q = -S + 6; q < S && pn < 700; q += 9 + R() * 6) { const x = ax === 'x' ? k + 4.3 : q, z = ax === 'x' ? q : k + 4.3; if (hole(x, z) || R() < .35) continue; const s = 1 + R() * .6;
    put(trunk, pn, x, .9 * s, z, s, 1.8 * s, s, '#7A4E2C'); put(crown, pn++, x, 2.3 * s, z, 1.3 * s, 1.1 * s, 1.3 * s, ['#5E9B3E', '#4E8F3A', '#6FAA45'][Math.floor(R() * 3)]) }
  trunk.count = crown.count = pn; sc.add(trunk); sc.add(crown);
  // kendaraan bergerak (mobil + motor)
  const NC = 420, car = inst(new THREE.BoxGeometry(1, 1, 1), NC), carTop = inst(new THREE.BoxGeometry(1, 1, 1), NC, { cast: false }); const CC = ['#E5484D', '#F2F2F2', '#2E6FB0', '#F2C14E', '#3A3A3A', '#9AA3AE', '#2E9C6A', '#F28C28'];
  const cars = Array.from({ length: NC }, (_, i) => { const L = lanes[Math.floor(R() * lanes.length)], moto = R() < .45, dir = R() < .5 ? 1 : -1; return { L, moto, dir, off: (dir > 0 ? 1 : -1) * (L[2] ? 1.8 : 1) * (moto ? 1.3 : .8), p0: R() * S * 2, v: (moto ? 7 : 5) + R() * 4, c: CC[Math.floor(R() * CC.length)] } });
  out.tick = t => { cars.forEach((c, i) => { const s = ((c.p0 + t * c.v * c.dir) % (S * 2) + S * 2) % (S * 2) - S, [ax, k] = c.L, x = ax === 'x' ? k + c.off : s, z = ax === 'x' ? s : k + c.off, ry = ax === 'x' ? 0 : Math.PI / 2;
    if (hole(x, z)) { put(car, i, 0, -9, 0, .01, .01, .01, c.c); put(carTop, i, 0, -9, 0, .01, .01, .01, c.c); return }
    if (c.moto) { put(car, i, x, .45, z, .35, .6, 1.3, c.c, ry); put(carTop, i, x, 1.15, z, .3, .45, .3, '#3A3A3A', ry) }
    else { put(car, i, x, .55, z, 1.7, .8, 3.6, c.c, ry); put(carTop, i, x, 1.2, z, 1.5, .6, 1.9, '#2A3A48', ry) } });
    car.instanceMatrix.needsUpdate = carTop.instanceMatrix.needsUpdate = true; if (car.instanceColor) car.instanceColor.needsUpdate = true; if (carTop.instanceColor) carTop.instanceColor.needsUpdate = true;
    if (out.kereta) out.kereta.position.x = ((t * 14 + 60) % 360) - 180 };
  sc.add(car); sc.add(carTop); out.tick(0);
  // rel layang + KRL lewat
  if (o.rail != null) { const z = o.rail; sc.add(mesh(G.box(S * 2 + 200, .8, 4), '#C9C2B6', [0, 6, z], { cast: false })); const pil = inst(new THREE.BoxGeometry(1, 1, 1), 80); let k = 0;
    for (let x = -S - 90; x < S + 90 && k < 80; x += 12) if (!hole(x, z)) put(pil, k++, x, 3, z, 1.2, 6, 1.6, '#B5AEA2'); pil.count = k; sc.add(pil);
    if (o.kereta !== false) { out.kereta = krl(sc, [0, 6.4, z], 6); } }
  // tugu emas di kejauhan + papan iklan generik di atap
  const tg = group(sc, o.tugu || [70, 0, -230]); tg.add(mesh(G.box(14, 3, 14), '#EFE6D6', [0, 1.5, 0])); tg.add(mesh(G.cyl(1.4, 2.4, 50, 4), '#F4EFE6', [0, 28, 0], { rot: [0, Math.PI / 4, 0] })); tg.add(mesh(G.cone(2.2, 5, 8), '#F2C14E', [0, 55, 0], { mat: { emissive: '#F2A31B', emissiveIntensity: .35, metalness: .3, roughness: .4 } }));
  ['DISKON 50%', 'KREDIT HP', 'PROMO GAJIAN', 'KOS EKSKLUSIF'].forEach((tx, i) => { const b = canvasPlane(10, 4, papanTeks(tx, ['#F2C14E', '#E5484D', '#2E9C8A', '#FFFFFF'][i], i === 3 ? '#C8501E' : '#FFFFFF'), 256); b.position.set(-60 + i * 42, 30 + (i % 2) * 12, -60 - (i % 3) * 30); sc.add(b) });
  return out;
}

// ---- KRL: rangkaian kereta komuter (putih, garis merah & kuning), pintu geser ----
export function krl(parent, p, n = 4) {
  const g = group(parent, p); g.userData.doors = [];
  for (let c = 0; c < n; c++) { const x = c * 10.4; g.add(mesh(G.box(10, 3, 3), '#F2F2EE', [x, 1.9, 0])); g.add(mesh(G.box(10.02, .35, 3.02), '#D9342B', [x, 1.1, 0], { cast: false })); g.add(mesh(G.box(10.02, .14, 3.02), '#F2C14E', [x, .84, 0], { cast: false }));
    g.add(mesh(G.box(9.4, .9, 3.04), '#2B3A48', [x, 2.45, 0], { cast: false })); g.add(mesh(G.box(10, .3, 2.6), '#9AA0A8', [x, 3.5, 0])); g.add(mesh(G.box(9, .5, 2.6), '#3A3F46', [x, .35, 0]));
    [-2.8, 2.8].forEach(dx => { const L = mesh(G.box(.66, 2.3, .06), '#C9CED4', [x + dx - .33, 1.75, 1.53], { cast: false }), Rr = mesh(G.box(.66, 2.3, .06), '#C9CED4', [x + dx + .33, 1.75, 1.53], { cast: false }); g.add(L); g.add(Rr); g.userData.doors.push([L, Rr, x + dx]) }) }
  g.add(mesh(G.box(.3, 2.6, 2.8), '#D9342B', [-5.1, 1.9, 0])); g.add(mesh(G.box(.1, 1.1, 2.4), '#2B3A48', [-5.26, 2.4, 0], { cast: false }));
  g.userData.buka = q => g.userData.doors.forEach(([L, R, cx]) => { L.position.x = cx - .33 - q * .62; R.position.x = cx + .33 + q * .62 });
  return g;
}
// ---- peron stasiun: lantai, garis kuning, atap, tiang, papan nama fiktif, bangku ----
export function peron(parent, p, nama = 'STASIUN SENJA') {
  const g = group(parent, p); g.add(mesh(G.box(40, 1.1, 6), '#B8B2A6', [0, .55, 3])); g.add(mesh(G.box(40, .03, .35), '#F2C14E', [0, 1.12, .55], { cast: false }));
  for (let x = -18; x <= 18; x += 6) { g.add(mesh(G.box(.25, 4.2, .25), '#4E5A66', [x, 3.2, 4.4])) } g.add(mesh(G.box(40, .3, 5), '#C8501E', [0, 5.4, 3.6])); g.add(mesh(G.box(40, .14, 5.4), '#E8E2D6', [0, 5.6, 3.6]));
  const pp = canvasPlane(5, .9, papanTeks(nama, '#1F4E79', '#FFFFFF', 'Poppins', 800), 512); pp.position.set(-6, 4.4, 4.25); g.add(pp);
  [-12, 6].forEach(x => { g.add(mesh(G.box(2.4, .12, .7), '#C8501E', [x, 1.65, 5.2])); [-1, 1].forEach(s => g.add(mesh(G.box(.1, .5, .5), '#555', [x + s * 1, 1.35, 5.2]))) });
  for (let x = -20; x < 20; x += .9) g.add(mesh(G.box(.2, .1, 3.2), '#6B5440', [x, .05, -2], { cast: false })); [-2.75, -1.25].forEach(z => g.add(mesh(G.box(40, .12, .12), '#9096A0', [0, .16, z], { cast: false })));
  return g;
}
// kerumunan penumpang/warga mini (ratusan orang terasa ramai, ringan)
export function kerumunan(parent, n, area, o = {}) {
  const R = RNG(o.seed || 5), C = ['#E5484D', '#2E6FB0', '#F2C14E', '#2E9C6A', '#F2F2F2', '#8E5AA8', '#F28C28', '#3A3A3A'], L = [];
  for (let i = 0; i < n; i++) { const p = [area[0] + R() * (area[2] - area[0]), o.y || 0, area[1] + R() * (area[3] - area[1])]; const m = miniStick(parent, p, C[Math.floor(R() * C.length)], ['#E2A97E', '#C98E64', '#B97A52'][i % 3]);
    m.scale.setScalar(o.s || 1.9); m.rotation.y = R() * 6.28; L.push({ m, p, v: (R() - .5) * 2.4, ph: R() * 6 }) }
  return t => L.forEach(q => { q.m.position.x = q.p[0] + Math.sin(t * .3 + q.ph) * q.v; q.m.position.y = q.p[1] + Math.abs(Math.sin(t * 6 + q.ph)) * .05 });
}
// ---- jembatan penyeberangan (JPO) ----
export function jpo(parent, p, len = 20) { const g = group(parent, p); g.add(mesh(G.box(len, .3, 2.4), '#D8D2C6', [0, 5, 0])); [-1, 1].forEach(s => { g.add(mesh(G.box(len, .9, .08), '#3E86B0', [0, 5.6, s * 1.15])); g.add(mesh(G.box(len, .08, .1), '#F2C14E', [0, 6.05, s * 1.15], { cast: false })) });
  [-len / 2 + 1, len / 2 - 1].forEach(x => g.add(mesh(G.box(.5, 5, .5), '#9AA0A8', [x, 2.5, 0]))); g.add(mesh(G.box(len, .2, 2.6), '#C8501E', [0, 7.6, 0])); return g }
// ---- trotoar + lampu jalan ----
export function lampu(parent, p, nyala = 0) { const g = group(parent, p); g.add(mesh(G.cyl(.08, .1, 5, 8), '#4E5A66', [0, 2.5, 0])); g.add(mesh(G.box(1.2, .08, .1), '#4E5A66', [.55, 4.95, 0]));
  const b = mesh(G.box(.5, .14, .3), '#FFF2C8', [1.1, 4.85, 0], { cast: false, mat: { emissive: '#FFD27A', emissiveIntensity: nyala } }); g.add(b); g.userData.bulb = b; return g }
export function trotoar(sc, z, len = 120) { sc.add(mesh(G.box(len, .25, 4), '#CFC6B4', [0, .12, z])); for (let x = -len / 2; x < len / 2; x += 1.2) sc.add(mesh(G.box(.04, .26, 4), '#B9AF9C', [x, .125, z], { cast: false })); sc.add(mesh(G.box(len, .3, .2), '#8F8A80', [0, .15, z - 2])) }
// ---- warteg: etalase kaca berisi lauk warna-warni, bangku panjang, papan nama ----
export function warteg(parent, p) {
  const g = group(parent, p); g.add(mesh(G.box(8, 4, 3), '#F4EFE2', [0, 2, -3.6])); [-1, 1].forEach(sx => g.add(mesh(G.box(.3, 4, 2.2), '#F4EFE2', [sx * 3.85, 2, -1.1]))); g.add(mesh(G.box(8.4, .3, 6.4), '#2E6FB0', [0, 4.1, -1.8])); g.add(mesh(G.box(8, .3, .1), '#2E6FB0', [0, 3.2, .02]));
  g.add(mesh(G.box(7.4, .02, 2), '#D8CBB2', [0, .26, -1.1], { cast: false })); [[-2.5, 3.2], [2.6, 2.9]].forEach(([x, y]) => g.add(mesh(G.box(1.2, .8, .04), ['#E5484D', '#F2C14E'][x > 0 ? 1 : 0], [x, y, -2.08], { cast: false })));
  const pp = canvasPlane(5, 1.1, papanTeks('WARTEG MURAH RAMAH', '#2E6FB0', '#FFFFFF'), 512); pp.position.set(0, 4.75, .5); g.add(pp); g.add(mesh(G.box(5.2, 1.3, .1), '#1F4E79', [0, 4.75, .44]));
  g.add(mesh(G.box(4.4, .9, 1.2), '#C9A36B', [-.6, .45, -.9])); const kaca = mesh(G.box(4.4, .9, 1.2), '#CFEFFF', [-.6, 1.35, -.9], { cast: false, mat: { transparent: true, opacity: .35, roughness: .1 } }); g.add(kaca);
  const L = ['#F2C14E', '#7FB04A', '#C8501E', '#8B5A2B', '#F2E6C8', '#E5484D', '#6E9A3A', '#F28C28'];
  for (let i = 0; i < 8; i++) { g.add(mesh(G.cyl(.24, .2, .1, 12), '#FFFFFF', [-2.3 + (i % 4) * 1.05, .96 + Math.floor(i / 4) * .45, -1.15 + Math.floor(i / 4) * .45])); g.add(mesh(G.sph(.2, 10, 8), L[i], [-2.3 + (i % 4) * 1.05, 1.05 + Math.floor(i / 4) * .45, -1.15 + Math.floor(i / 4) * .45], { s: [1, .45, 1] })) }
  g.add(mesh(G.box(6, .12, 1), '#8B5A2B', [0, .95, 1.4])); g.add(mesh(G.box(6, .1, .6), '#A86B35', [0, .5, 2.4])); [[-2.8, 1.4], [2.8, 1.4], [-2.8, 2.4], [2.8, 2.4]].forEach(([x, z]) => g.add(mesh(G.box(.1, z < 2 ? .95 : .5, .1), '#5A3A1A', [x, z < 2 ? .47 : .25, z])));
  return g;
}
// ---- gang kos padat: rumah 2-3 lantai rapat, jemuran, kabel listrik, pot, motor, gerbang kos Bu Ratna ----
export function gangKos(sc, o = {}) {
  const R = RNG(o.seed || 3), out = {}; sc.add(mesh(G.box(3.4, .06, 46), '#9C968A', [0, .03, -8], { cast: false }));
  const WALL = ['#F5C9A8', '#CFE3D4', '#F3E6A6', '#E9CFC9', '#D5E4EF', '#FBE3B8', '#D8C8F0'], JEM = ['#E5484D', '#F2C14E', '#2E6FB0', '#FFFFFF', '#2E9C6A', '#E56B8A'];
  for (let i = 0; i < 9; i++) [-1, 1].forEach(s => { const z = 12 - i * 5.2 + (s > 0 ? 1.3 : 0), h = 3 + Math.floor(R() * 3) * 2.2, w = 4.8, x = s * (1.7 + w / 2);
    if (s < 0 && i === 2) { out.kosZ = z; return }
    sc.add(mesh(G.box(w, h, 4.6), WALL[Math.floor(R() * WALL.length)], [x, h / 2, z])); sc.add(mesh(G.box(w + .4, .25, 5), ['#C2562F', '#8A8A8A', '#6E8FA6'][i % 3], [x, h + .12, z]));
    for (let f = 0; f < h / 2.2 - .5; f++) { sc.add(mesh(G.box(.05, .9, 1.1), '#5A7A90', [x - s * w / 2 - s * .01, 1.4 + f * 2.2, z - .8], { cast: false })); if (f) sc.add(mesh(G.box(.8, .08, 3.6), '#8A8A8A', [x - s * (w / 2 + .4), f * 2.2, z])) }
    sc.add(mesh(G.box(.06, 2, .9), '#7A4A2A', [x - s * w / 2 - s * .01, 1, z + 1.2], { cast: false }));
    if (R() < .7) { const y = 2.4 + Math.floor(R() * 2) * 2.2; for (let k = 0; k < 4; k++) sc.add(mesh(G.box(.04, .7, .55), JEM[Math.floor(R() * JEM.length)], [x - s * (w / 2 + .6), y - .3, z - 1.2 + k * .7], { cast: false })); sc.add(mesh(G.cyl(.01, .01, 3, 4), '#333', [x - s * (w / 2 + .6), y + .05, z], { rot: [Math.PI / 2, 0, 0], cast: false })) }
    if (R() < .5) { sc.add(mesh(G.cyl(.25, .2, .4, 8), '#B5452B', [x - s * (w / 2 + .3), .2, z - 1.6])); sc.add(mesh(G.ico(.35, 0), '#4E8F3A', [x - s * (w / 2 + .3), .6, z - 1.6])) }
    if (R() < .35) { const m = group(sc, [x - s * (w / 2 + .7), 0, z + .4]); m.add(mesh(G.box(.3, .55, 1.5), ['#E5484D', '#2E2E2E', '#2E6FB0'][i % 3], [0, .55, 0])); [-.6, .6].forEach(dz => m.add(mesh(G.cyl(.28, .28, .12, 12), '#1E1E1E', [0, .28, dz], { rot: [0, 0, Math.PI / 2] }))) } });
  for (let z = 14; z > -32; z -= 4.3) { const y = 6 + (z % 3); sc.add(mesh(G.cyl(.015, .015, 9, 4), '#2A2A2A', [0, y, z], { rot: [0, 0, Math.PI / 2], cast: false })); sc.add(mesh(G.cyl(.015, .015, 9, 4), '#2A2A2A', [0, y - .4, z + 1.2], { rot: [0, 0, Math.PI / 2 + .05], cast: false })) }
  [-1, 1].forEach(s => { for (let z = 13; z > -32; z -= 11) sc.add(mesh(G.cyl(.1, .12, 8, 6), '#6B5440', [s * 1.55, 4, z])) });
  // rumah kos Bu Ratna (kiri, i=2): pagar hijau, papan kamar kosong
  const z = out.kosZ, k = group(sc, [-4.1, 0, z]); k.add(mesh(G.box(4.8, 6.6, 4.6), '#FBE3B8', [0, 3.3, 0])); k.add(mesh(G.box(5.2, .3, 5), '#C2562F', [0, 6.75, 0]));
  for (let f = 0; f < 3; f++) [-1, 1].forEach(d => k.add(mesh(G.box(.05, .8, .9), '#5A7A90', [2.41, 1.3 + f * 2.2, d * 1.2], { cast: false })));
  const gate = group(k, [2.5, 0, 0]); for (let i = -1.2; i <= 1.2; i += .2) gate.add(mesh(G.box(.05, 1.6, .05), '#2E8B57', [.02, .8, i])); gate.add(mesh(G.box(.08, .08, 2.5), '#2E8B57', [.02, 1.6, 0])); out.gate = gate;
  const papan = canvasPlane(2, 1.3, (x, W, H) => { x.fillStyle = '#FFF6E6'; x.fillRect(0, 0, W, H); x.strokeStyle = '#C8501E'; x.lineWidth = 12; x.strokeRect(6, 6, W - 12, H - 12); x.fillStyle = '#4A2410'; x.textAlign = 'center';
    x.font = `800 ${H * .22}px Baloo`; x.fillText('KOS BU RATNA', W / 2, H * .3); x.fillStyle = '#C8501E'; x.font = `800 ${H * .17}px Baloo`; x.fillText('KAMAR KOSONG: SABTU', W / 2, H * .56); x.fillStyle = '#4A2410'; x.font = `700 ${H * .15}px Baloo`; x.fillText('bayar di muka', W / 2, H * .8) }, 512);
  papan.position.set(2.5, 2.6, -1.1); papan.rotation.y = Math.PI / 2 - .55; k.add(papan); out.papan = papan; out.kos = k;
  return out;
}
// ---- bangku taman / halte ----
export function bangku(parent, p) { const g = group(parent, p); g.add(mesh(G.box(2.4, .12, .7), '#C8501E', [0, .55, 0])); g.add(mesh(G.box(2.4, .6, .1), '#C8501E', [0, .9, -.32])); [-1, 1].forEach(s => g.add(mesh(G.box(.1, .55, .6), '#4E5A66', [s * 1.05, .27, 0]))); return g }
export function duduk(p, y = -.36) { p.userData.st.legs.forEach(L => { L.rotation.x = -1.45; L.userData.knee && (L.userData.knee.rotation.x = 1.45) }); p.position.y = y }

// ---- teks DOM (Baloo, krem dengan bayangan bata; khas Dompet) ----
export const BIG = (root, html, css = {}) => X.ab(Object.assign({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: 'Baloo', fontWeight: 800, fontSize: '150px', color: '#FFF1D2', textShadow: '0 7px 0 #A8401A, 0 18px 40px rgba(60,20,0,.55)', letterSpacing: '1px', lineHeight: 1, opacity: 0 }, css), root, html);
export const KARTU = (root, a, b, css = {}) => X.ab(Object.assign({ left: 60, top: 330, width: 960, textAlign: 'center', opacity: 0, fontFamily: 'Baloo' }, css), root,
  `<div style="display:inline-block;background:rgba(40,20,10,.88);color:#FFF1D2;border-radius:26px;padding:14px 36px 18px;box-shadow:0 14px 30px #0000005c;border:2px solid #ffffff22">
   <div style="font-size:72px;font-weight:800;color:#FFC86B;line-height:1.05">${a}</div>${b ? `<div style="font-size:40px;font-weight:700;line-height:1.15">${b}</div>` : ''}</div>`);
export const show = (e, p, dy = 30) => { const q = E.out(Math.max(0, Math.min(1, p))); e.style.opacity = q; e.style.transform = `translateY(${(1 - q) * dy}px)` };
export const pulse = (e, p) => { const q = Math.max(0, Math.min(1, p)); e.style.opacity = q > 0 ? 1 : 0; e.style.transform = `scale(${q > 0 ? .7 + .3 * E.back(q) : .7})` };
export const ease = (t, a, b) => E.inout(seg(t, a, b));
// label menempel ke benda 3D (ctx.proj)
export function tag(root, html) { const e = X.ab({ left: 0, top: 0, fontFamily: 'Baloo', fontWeight: 800, fontSize: '36px', color: '#FFF1D2', background: 'rgba(168,64,26,.92)', padding: '4px 18px 6px', borderRadius: '14px', whiteSpace: 'nowrap', opacity: 0, transform: 'translate(-50%,-100%)', boxShadow: '0 8px 18px #00000055' }, root, html);
  return (obj, cam, off, op) => { const [x, y] = X.proj(obj, cam, off); e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.opacity = op } }
// HP besar (layar DOM) untuk ajakan interaksi
export function hpBesar(root, rows, tanya, pilihan, css = {}) {
  return X.ab(Object.assign({ left: 190, top: 300, width: 700, opacity: 0, fontFamily: 'Poppins,sans-serif' }, css), root,
    `<div style="background:#1C120E;border-radius:56px;padding:22px;box-shadow:0 30px 60px #00000070;border:3px solid #ffffff30"><div style="background:linear-gradient(180deg,#FFF6E6,#FCE3C2);border-radius:40px;padding:26px 30px 30px">
     <div style="width:120px;height:10px;border-radius:5px;background:#00000025;margin:0 auto 18px"></div>` +
    rows.map(([ic, a, b], i) => `<div class="r${i}" style="display:flex;align-items:center;gap:18px;background:#fff;border-radius:22px;padding:14px 20px;margin-bottom:14px;box-shadow:0 6px 14px #00000018">
      <div style="font-size:50px">${ic}</div><div><div style="font-size:24px;color:#A8401A;font-weight:800;letter-spacing:2px">${a}</div><div style="font-size:38px;color:#4A2410;font-weight:800">${b}</div></div></div>`).join('') +
    `<div class="q" style="font-family:Baloo;font-size:46px;color:#4A2410;font-weight:800;text-align:center;margin:18px 0 10px;line-height:1.05">${tanya}</div>
     <div class="o" style="display:flex;gap:12px;justify-content:center">` + pilihan.map(x => `<div style="background:#C8501E;color:#FFF6E6;font-size:34px;font-weight:800;padding:12px 18px;border-radius:18px;text-align:center;line-height:1.1">${x}</div>`).join('') + `</div></div></div>`);
}

// ==== tambahan Ep 1 (20 Nov): masjid dekat stasiun, Pak Marbot, ibu jamaah, suasana malam terang & subuh ====
export const MALAM = o => newScene(Object.assign({ sky: ['#34408A', '#9C86C8'], sun: '#C9C8FF', sunPos: [-10, 14, 10], hemi: 1.25, sunI: 1.5, shadow: 18, fog: ['#7E74B0', 90, 360] }, o));
export const SUBUH = o => newScene(Object.assign({ sky: ['#4F72C4', '#FFC2A0'], sun: '#FFC9A6', sunPos: [16, 6, 10], hemi: 1.35, sunI: 2.1, shadow: 18, fog: ['#E9B9A6', 90, 360] }, o));
export function marbot(p, o = {}) {   // Pak Marbot: peci hitam, baju koko putih, sarung kotak hijau
  const g = person(o.parent, p, Object.assign({ body: '#F4F4EE', pants: '#3E7A5A', skin: '#C98E64', hair: '#D8D8D8', hat: 'peci' }, o)); const st = g.userData.st;
  st.body.add(mesh(G.cyl(.17, .24, .5, 12), '#3E7A5A', [0, -.22, 0], { mat: { flatShading: false } })); st.body.add(mesh(G.box(.36, .04, .23), '#2E5A44', [0, -.05, 0], { cast: false })); return g;
}
export function jamaah(p, o = {}) {   // ibu jamaah: mukena putih (tudung menutup kepala & bahu), wajah terlihat
  const c = o.c || '#F7F5EE'; const g = person(o.parent, p, Object.assign({ body: c, pants: c, skin: o.skin || '#D9A07A', hair: c }, o)); const st = g.userData.st, SM = { flatShading: false };
  st.head.add(mesh(G.sph(.31, 20, 14, Math.PI * .5 + Math.PI * .36, Math.PI * 2 - Math.PI * .72, 0, Math.PI * .78), c, [0, .01, -.01], { mat: Object.assign({ side: THREE.DoubleSide }, SM) }));
  st.body.add(mesh(G.cyl(.16, .36, .55, 14), c, [0, .28, 0], { mat: SM })); return g;
}
export function masjid(parent, p, o = {}) {   // masjid kampung fiktif: aula krem, kubah hijau + emas, menara, teras keramik berpilar, bedug, lampu teras
  const g = group(parent, p), SM = { flatShading: false };
  g.add(mesh(G.box(17, .4, 14), '#D8D2C6', [0, .2, -2])); g.add(mesh(G.box(11, 5.2, 7), '#F7F2E6', [0, 2.8, -4.6])); g.add(mesh(G.box(11.4, .35, 7.4), '#2E8B57', [0, 5.55, -4.6]));
  g.add(mesh(G.cyl(2.5, 2.7, 1, 18), '#F7F2E6', [0, 6.2, -4.6])); g.add(mesh(G.sph(2.6, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2), '#2E9C6A', [0, 6.7, -4.6], { mat: SM }));
  g.add(mesh(G.cyl(.06, .06, 1.1, 6), '#F2C14E', [0, 9.8, -4.6])); g.add(mesh(G.sph(.22, 14, 10), '#F2C14E', [0, 10.45, -4.6], { mat: SM }));
  g.add(mesh(G.cyl(.65, .75, 13, 12), '#F7F2E6', [6.8, 6.6, -7])); g.add(mesh(G.cyl(1, 1, .4, 14), '#2E8B57', [6.8, 10.6, -7])); g.add(mesh(G.sph(.75, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), '#2E9C6A', [6.8, 13.1, -7], { mat: SM }));
  g.add(mesh(G.cyl(.05, .05, 1, 6), '#F2C14E', [6.8, 14.3, -7]));
  for (let i = -2; i <= 2; i++) { g.add(mesh(G.box(1, 1.7, .06), '#3E6E8E', [i * 2.1, 2.4, -1.07], { cast: false })); g.add(mesh(G.sph(.5, 14, 8), '#3E6E8E', [i * 2.1, 3.25, -1.07], { s: [1, 1, .08], cast: false })) }
  g.add(mesh(G.box(1.5, 2.6, .06), '#8B5A2B', [0, 1.7, -1.06], { cast: false }));
  g.add(mesh(G.box(11.6, .12, 4.2), '#EDE6D6', [0, .46, 1], { cast: false })); for (let i = 0; i < 12; i++) g.add(mesh(G.box(.02, .125, 4.2), '#CFC6B4', [-5.5 + i, .462, 1], { cast: false }));
  g.add(mesh(G.box(12, .28, 4.6), '#2E8B57', [0, 3.75, 1.05], { cast: false })); g.add(mesh(G.box(12.1, .1, 4.7), '#F2C14E', [0, 3.58, 1.05], { cast: false }));
  [-5.4, -2.7, 2.7, 5.4].forEach(x => g.add(mesh(G.box(.28, 3.2, .28), '#F7F2E6', [x, 2.05, 3])));
  const lamps = [-4, 0, 4].map(x => { const L = mesh(G.sph(.16, 12, 10), '#FFF4C8', [x, 3.35, 1.4], { cast: false, mat: { emissive: '#FFD98A', emissiveIntensity: o.lampu ?? .4 } }); g.add(L); return L });
  if (o.lampu) [-4, 4].forEach(x => { const pl = new THREE.PointLight('#FFD9A0', 4 * o.lampu, 10, 1.6); pl.position.set(x, 3.1, 1.6); g.add(pl) });
  const pp = canvasPlane(4.6, .7, papanTeks('MASJID NUR SENJA', '#2E8B57', '#FFF6E0', 'Baloo'), 512); pp.position.set(0, 4.35, 3.4); g.add(pp);
  const bd = group(g, [-4.4, .52, -.1]); bd.add(mesh(G.cyl(.55, .55, 1.1, 18), '#A86B35', [0, .9, 0], { rot: [0, 0, Math.PI / 2], mat: SM })); [-1, 1].forEach(s => bd.add(mesh(G.cyl(.5, .5, .03, 18), '#F2E6C8', [s * .56, .9, 0], { rot: [0, 0, Math.PI / 2] })));
  [-1, 1].forEach(s => bd.add(mesh(G.box(.08, .9, .08), '#5A3A1A', [s * .4, .4, 0])));
  for (let i = 0; i < 6; i++) g.add(mesh(G.box(.28, .05, .12), ['#2E6FB0', '#E5484D', '#3A3A3A', '#F2C14E'][i % 4], [2.6 + (i % 3) * .34, .55, 2.6 + Math.floor(i / 3) * .2], { cast: false }));
  g.add(mesh(G.box(11.6, .2, .6), '#CFC6B4', [0, .3, 3.4])); g.userData = { lamps, lantai: .52 }; return g;
}

// ==== tambahan Ep 2 (22 Nov): dapur belakang warteg (bak cuci, rak piring, menara piring) ====
export function dapur(parent, p = [0, 0, 0]) {   // dapur terbuka di belakang warteg: lantai keramik, dinding rendah (kota terlihat di atasnya), bak cuci, keran, rak, peti
  const g = group(parent, p); g.add(mesh(G.box(9, .08, 7), '#E8E2D6', [0, .04, 0], { cast: false })); for (let i = 0; i < 10; i++) g.add(mesh(G.box(.02, .085, 7), '#CFC6B4', [-4.5 + i, .043, 0], { cast: false }));
  g.add(mesh(G.box(9, 2.4, .2), '#F4EFE2', [0, 1.2, -3.4])); g.add(mesh(G.box(9, .9, .21), '#9FD3C7', [0, .5, -3.39], { cast: false })); g.add(mesh(G.box(.2, 2.4, 7), '#F4EFE2', [-4.5, 1.2, 0]));
  g.add(mesh(G.box(9.4, .14, 2.6), '#2E6FB0', [0, 2.7, -2.4], { rot: [-.12, 0, 0], cast: false }));
  const bak = group(g, [0, 0, -2.6]); bak.add(mesh(G.box(1.8, .9, .8), '#B9C2CA', [0, .45, 0])); bak.add(mesh(G.box(1.6, .05, .6), '#7FC4E8', [0, .86, 0], { cast: false, mat: { emissive: '#7FC4E8', emissiveIntensity: .15 } }));
  bak.add(mesh(G.cyl(.03, .03, .5, 8), '#9AA0A8', [0, 1.15, -.32])); bak.add(mesh(G.cyl(.03, .03, .3, 8), '#9AA0A8', [0, 1.38, -.18], { rot: [Math.PI / 2, 0, 0] }));
  for (let i = 0; i < 12; i++) g.add(mesh(G.sph(.12 + (i % 3) * .03, 10, 8), '#FFFFFF', [-.6 + (i % 6) * .24, .92, -2.7 + Math.floor(i / 6) * .2], { s: [1, .5, 1], cast: false, mat: { transparent: true, opacity: .8 } }));
  const rak = group(g, [2.4, 0, -3.1]); rak.add(mesh(G.box(1.4, .06, .4), '#9AA0A8', [0, 1.1, 0])); rak.add(mesh(G.box(1.4, .06, .4), '#9AA0A8', [0, 1.6, 0])); [-1, 1].forEach(s => rak.add(mesh(G.box(.05, 1.7, .05), '#7E8A90', [s * .68, .85, .18])));
  for (let i = 0; i < 9; i++) rak.add(mesh(G.cyl(.18, .18, .02, 14), '#FFFFFF', [-.55 + i * .14, 1.3, 0], { rot: [0, 0, Math.PI / 2 - .2] }));
  [[-2.8, -2.6, '#C9A36B'], [-3.3, -1.9, '#B8915A']].forEach(([x, z, c]) => g.add(mesh(G.box(.6, .5, .5), c, [x, .25, z])));
  g.add(mesh(G.cyl(.3, .26, .7, 14), '#2E6FB0', [-1.7, .35, -2.7])); return g;
}
export function menaraPiring(parent, p, n = 40) {   // tumpukan piring; set(k) = jumlah piring tampil; condong(a) miring (rad)
  const g = group(parent, p); const L = []; for (let i = 0; i < n; i++) { const m = mesh(G.cyl(.26, .22, .05, 14), i % 6 === 3 ? '#F2E6C8' : '#FFFFFF', [Math.sin(i * 1.7) * .03, .03 + i * .058, Math.cos(i * 1.3) * .03]); g.add(m); L.push(m) }
  g.userData.set = k => L.forEach((m, i) => m.visible = i < k); g.userData.n = n; return g;
}
