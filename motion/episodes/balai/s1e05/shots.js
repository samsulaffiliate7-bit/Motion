// Shot Desa Terakhir S1 Ep 5 "Gerbang Ditutup" (lihat STORYBOARD.md). Helper disalin dari Ep 2-4.
import { THREE, lerp, seg, E, mesh, G, group, camera, grade } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { SIANG, SENJA, MALAM, gilang, yati, kardi, sinta, warga, zombie, desaTerakhir, menara, SPOT, RF, karung, ikatBambu, bambu, BIG, TAG, show, pulse, ease, FONT, BONE, AMBER, RUST, MOSS } from '../_s1/dunia.js';

const W = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), V3 = new THREE.Vector3(), S3 = new THREE.Vector3(), COL = new THREE.Color();
const LERP3 = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p), lerp(a[2], b[2], p)];
const CA = ['#3E86B0', '#2E6E9A', '#5E9AC4', '#3E7CB1'], CB = ['#E8B94A', '#D9774A', '#F2C14E', '#C98E3A'], SK = ['#E2A97E', '#C98E64', '#B97A52'];
// kerumunan instanced (badan kapsul + kepala) dalam kotak w x d, warna kaos kelompok
function kerumunan(sc, n, c, w, d, cols, seed = 3) {
  const body = new THREE.InstancedMesh(new THREE.CapsuleGeometry(.17, .75, 3, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .7 }), n);
  const head = new THREE.InstancedMesh(new THREE.SphereGeometry(.17, 10, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .6 }), n);
  let s = seed; const R = () => (s = (s * 16807) % 2147483647) / 2147483647; const P = [];
  for (let i = 0; i < n; i++) { const x = c[0] + (R() - .5) * w, z = c[2] + (R() - .5) * d; P.push([x, z]); body.setColorAt(i, COL.set(grade(cols[i % cols.length]))); head.setColorAt(i, COL.set(grade(SK[i % 3]))) }
  const upd = t => { P.forEach(([x, z], i) => { const y = Math.abs(Math.sin(t * 3 + i)) * .05; M4.compose(V3.set(x, .72 + y, z), Q.identity(), S3.set(1, 1, 1)); body.setMatrixAt(i, M4); M4.compose(V3.set(x, 1.42 + y, z), Q, S3.set(1, 1, 1)); head.setMatrixAt(i, M4) }); body.instanceMatrix.needsUpdate = head.instanceMatrix.needsUpdate = true };
  upd(0); body.castShadow = head.castShadow = true; sc.add(body); sc.add(head); return { upd };
}
// parit keliling di luar pagar: cincin tanah gelap + air cokelat; f = bagian yang sudah tergali (0..1, mulai dari gerbang ke timur)
function parit(sc, r = RF + 4, lebar = 2.4) {
  const tanah = new THREE.Mesh(new THREE.RingGeometry(r - lebar / 2 - .6, r + lebar / 2 + .6, 160, 1, 0, Math.PI * 2), new THREE.MeshStandardMaterial({ color: grade('#7A5A3A'), roughness: 1, side: THREE.DoubleSide }));
  tanah.rotation.x = Math.PI / 2; tanah.position.y = .03; tanah.receiveShadow = true; sc.add(tanah);
  const air = new THREE.Mesh(new THREE.RingGeometry(r - lebar / 2, r + lebar / 2, 160, 1, 0, Math.PI * 2), new THREE.MeshStandardMaterial({ color: grade('#5E6E5A'), roughness: .25, metalness: .2, side: THREE.DoubleSide }));
  air.rotation.x = Math.PI / 2; air.position.y = .06; sc.add(air);
  const set = f => { const th = Math.max(.01, f) * Math.PI * 2; [tanah, air].forEach(m => { const g = m.geometry.parameters; m.geometry.dispose(); m.geometry = new THREE.RingGeometry(g.innerRadius, g.outerRadius, 160, 1, Math.PI / 2 - .12 - (th - .24), th - .24) }) };
  return { r, set };
}
// alat di tangan kanan
const tangan = p => group(p.userData.st.arms[1].userData.elbow, [0, -.31, 0]);
function cangkul(p) { const k = tangan(p); k.add(mesh(G.cyl(.03, .03, 1.1, 6), '#8A6A3A', [0, 0, .25], { rot: [Math.PI / 2, 0, 0] })); k.add(mesh(G.box(.32, .26, .03), '#9AA3AC', [0, -.12, .78], { mat: { metalness: .5, roughness: .4 } })); return k }
function busur(p) { const k = tangan(p); const b = new THREE.Mesh(new THREE.TorusGeometry(.42, .025, 6, 20, Math.PI), new THREE.MeshStandardMaterial({ color: grade('#7A4E2A') })); b.rotation.set(0, Math.PI / 2, Math.PI / 2); b.position.z = .12; k.add(b); return k }
function panah(sc) { const g = group(sc, [0, 0, 0]); g.add(mesh(G.cyl(.018, .018, .9, 5), '#C9A86A', [0, 0, 0], { rot: [0, 0, Math.PI / 2] })); g.add(mesh(G.cone(.05, .14, 5), '#5A5A62', [.5, 0, 0], { rot: [0, 0, -Math.PI / 2] })); g.add(mesh(G.box(.14, .1, .01), '#C8372D', [-.42, 0, 0], { cast: false })); return g }
function sasaran(sc, p) { const g = group(sc, p); g.add(mesh(G.cyl(.7, .7, .25, 20), '#E2C46A', [0, 1.2, 0], { rot: [Math.PI / 2, 0, 0] })); [[.5, '#C8372D'], [.3, '#F4F0E6'], [.13, '#C8372D']].forEach(([r, c], i) => g.add(mesh(G.cyl(r, r, .27 + i * .01, 20), c, [0, 1.2, 0], { rot: [Math.PI / 2, 0, 0], cast: false })));
  [-1, 1].forEach(x => g.add(mesh(G.box(.08, 1.4, .08), '#5A3E22', [x * .4, .55, -.1]))); return g }
function perban(p, k = 0) { p.userData.st.arms[k].userData.elbow.add(mesh(G.cyl(.075, .075, .2, 10), '#F4F0E6', [0, -.16, 0])); p.userData.st.arms[k].add(mesh(G.cyl(.08, .08, .16, 10), '#E8E0CC', [0, -.2, 0])) }
const DUO = (a, b, c) => `<div style="display:inline-block;background:rgba(30,42,28,.94);border-radius:14px;padding:12px 28px 16px;border-bottom:8px solid ${c};box-shadow:0 12px 28px #0000005c"><div style="font-size:60px;font-weight:800;color:${c}">${a}</div><div style="font-size:36px;font-weight:700;color:${BONE}">${b}</div></div>`;
const LABEL = (root, a, b, top = 330, c = AMBER) => X.ab({ left: 60, top, width: 960, textAlign: 'center', opacity: 0, fontFamily: FONT }, root, DUO(a, b, c));
const pin = (root, html, css = {}) => { const w = X.ab({ left: 0, top: 0 }, root); const e = TAG(w, html, Object.assign({ position: 'relative', left: 0, top: 0, transform: 'translate(-50%,-100%)', fontSize: '36px' }, css)); return { w, e, at(obj, cam, off) { const [x, y] = X.proj(obj, cam, off); w.style.left = Math.max(320, Math.min(760, x)) + 'px'; w.style.top = y + 'px' } } };

function barak(parent, p, n = 6) {   // barak karantina: deret bilik bambu bernomor, papan "1 KAMAR 1 ORANG"
  const g = group(parent, p);
  for (let i = 0; i < n; i++) { const b = group(g, [i * 2.2, 0, 0]); b.add(mesh(G.box(2, 2.2, 2), '#D6BE7A', [0, 1.1, 0])); b.add(mesh(G.box(.9, 1.6, .05), '#5A3E22', [0, .8, 1.01], { cast: false }));
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), new THREE.MeshStandardMaterial({ color: grade('#B89A5A'), flatShading: true })); r.scale.set(1.7, .8, 1.7); r.rotation.y = Math.PI / 4; r.position.y = 2.6; r.castShadow = true; b.add(r);
    const no = canvasPlane(.5, .4, (x, W2, H) => { x.fillStyle = '#F3E9D2'; x.fillRect(0, 0, W2, H); x.fillStyle = '#B5452B'; x.font = `800 ${H * .7}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(i + 1), W2 / 2, H / 2 + 2) }, 120); no.position.set(0, 1.85, 1.03); b.add(no) }
  const pp = canvasPlane(4.4, .8, (x, W2, H) => { x.fillStyle = '#1E2A1C'; x.fillRect(0, 0, W2, H); x.fillStyle = '#F2B33D'; x.font = `800 ${H * .5}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('KARANTINA · 1 KAMAR 1 ORANG', W2 / 2, H / 2 + 3) }, 700);
  pp.position.set((n - 1) * 1.1, 3.4, 1.1); g.add(pp); return g;
}
const ZC = ['#7C8B9A', '#9A7A5A', '#8A6A8A', '#6E7E5E'], ZS = ['#96C45E', '#8CBF6A', '#A3C964'];
const HY = (x, z) => Math.max(0, 44 * (1 - Math.hypot(x, z + 118) / 78) - .5);   // tinggi bukit utara (dunia.js BUKIT[0])
function gerombolan(sc, n, c, w, d, seed = 4) {   // kerumunan zombie instanced (kepala hijau), condong & bergoyang menyeret
  const body = new THREE.InstancedMesh(new THREE.CapsuleGeometry(.17, .75, 3, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .8 }), n);
  const head = new THREE.InstancedMesh(new THREE.SphereGeometry(.18, 10, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .7, emissive: '#2A3A10', emissiveIntensity: .4 }), n);
  let s = seed; const R = () => (s = (s * 16807) % 2147483647) / 2147483647; const P = [];
  for (let i = 0; i < n; i++) { P.push([c[0] + (R() - .5) * w, c[2] + (R() - .5) * d, R() * 6]); body.setColorAt(i, COL.set(grade(ZC[i % 4]))); head.setColorAt(i, COL.set(grade(ZS[i % 3]))) }
  const upd = t => { P.forEach(([x, z, ph], i) => { const lean = Math.sin(t * 2 + ph) * .12; Q.setFromEuler(new THREE.Euler(.15, 0, lean)); const zz = z + t * .4, y = HY(x, zz); M4.compose(V3.set(x, y + .72, zz), Q, S3.set(1, 1, 1)); body.setMatrixAt(i, M4);
    M4.compose(V3.set(x + lean * .6, y + 1.4, zz + .12), Q, S3.set(1, 1, 1)); head.setMatrixAt(i, M4) }); body.instanceMatrix.needsUpdate = head.instanceMatrix.needsUpdate = true };
  upd(0); body.castShadow = head.castShadow = true; sc.add(body); sc.add(head); return { upd };
}
const angkat = p => { const st = p.userData.st; st.arms.forEach((A, k) => { A.rotation.x = -2.9; A.rotation.z = (k ? -1 : 1) * .25 }) };
function cakar(p) { const e = p.userData.st.arms[0].userData.elbow; return [-.05, 0, .05].map((d, i) => { const m = mesh(G.box(.012, .16, .02), '#C8372D', [d, -.15 - i * .01, .075], { cast: false, rot: [0, 0, .5] }); e.add(m); return m }) }
function perbanBuka(p) { const e = p.userData.st.arms[0].userData.elbow; const m = mesh(G.cyl(.078, .078, .22, 10), '#F4F0E6', [0, -.16, 0]); e.add(m); return m }
function ARROWAT(a, p0, p1, u, arc = 1) { a.position.set(lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u) + Math.sin(u * Math.PI) * arc, lerp(p0[2], p1[2], u)); const v = Math.min(1, u + .02); a.lookAt(lerp(p0[0], p1[0], v), lerp(p0[1], p1[1], v) + Math.sin(v * Math.PI) * arc, lerp(p0[2], p1[2], v)); a.rotateY(-Math.PI / 2) }
const NIGHT = () => { const sc = MALAM(); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(0); parit(sc).set(.12); return [sc, D] };

function pagarDobel(sc, r = RF + 1.7) {   // ring pagar bambu kedua (lebih rendah, rapat), celah gerbang di selatan
  const N = Math.round(2 * Math.PI * r / .34), pole = new THREE.InstancedMesh(new THREE.CylinderGeometry(.1, .11, 1, 6), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .8, flatShading: true }), N); let c = 0;
  for (let k = 0; k < N; k++) { const a = k / N * Math.PI * 2; if (Math.abs(Math.atan2(Math.sin(a), Math.cos(a)) - Math.PI / 2) < 5.2 / r) continue; const h = 2.2 + (k % 3) * .15;
    M4.compose(V3.set(Math.cos(a) * r, h / 2, Math.sin(a) * r), Q.identity(), S3.set(1, h, 1)); pole.setMatrixAt(c, M4); pole.setColorAt(c, COL.set(grade(['#B89E5A', '#C9B06A', '#A88E50'][k % 3]))); c++ }
  pole.count = c; pole.castShadow = true; sc.add(pole); return pole;
}
function ranjau(sc, r = RF + 7) {   // ranjau bambu runcing condong keluar; grow(f) = tumbuh dari gerbang memutar
  const N = 300, m = new THREE.InstancedMesh(new THREE.ConeGeometry(.12, 1.6, 5), new THREE.MeshStandardMaterial({ color: grade('#C9B06A'), roughness: .8, flatShading: true }), N); m.castShadow = true; sc.add(m);
  const A = Array.from({ length: N }, (_, k) => [Math.PI / 2 + .14 + k / N * (Math.PI * 2 - .28), (k % 2 ? .5 : -.5)]);
  const grow = f => { A.forEach(([a, o], k) => { const s = Math.max(.001, Math.min(1, f * N / 30 - k / 30)); const x = Math.cos(a) * (r + o), z = Math.sin(a) * (r + o);
    Q.setFromEuler(new THREE.Euler(Math.sin(a) * .55, 0, -Math.cos(a) * .55)); M4.compose(V3.set(x, .6 * s, z), Q, S3.set(s, s, s)); m.setMatrixAt(k, M4) }); m.instanceMatrix.needsUpdate = true };
  grow(1); return { grow, r };
}
function rakBusur(sc, p, n = 10) { const g = group(sc, p); [0, 1.1].forEach(y => g.add(mesh(G.box(4.4, .1, .3), '#7A5E30', [0, 1 + y, 0]))); [-2.1, 2.1].forEach(x => g.add(mesh(G.box(.12, 2.4, .12), '#5A3E22', [x, 1.2, 0])));
  for (let i = 0; i < n; i++) { const b = new THREE.Mesh(new THREE.TorusGeometry(.42, .025, 6, 18, Math.PI), new THREE.MeshStandardMaterial({ color: grade('#7A4E2A') })); b.position.set(-1.8 + (i % 5) * .9, 1.2 + Math.floor(i / 5) * 1.1, .1); b.rotation.z = Math.PI / 2; g.add(b) } return g }
function sulut(sc, p) {   // obor genggam + cahaya
  const f = mesh(G.sph(.16, 8, 6), '#FFB347', p, { cast: false, mat: { emissive: '#FF8A1E', emissiveIntensity: 2.2 } }); sc.add(f); const l = new THREE.PointLight('#FFB060', 6, 10); l.position.set(p[0], p[1] + .3, p[2]); sc.add(l); return { f, l } }

export const SHOTS = {
  B5_HOOK(s, root) {   // frame 0: wajah zombie menyeret di bukit senja -> kamera mundur: ratusan zombie, desa berpagar di bawah
    const sc = SENJA({ sky: ['#5E6AAE', '#F4A07A'], fog: ['#D9A48E', 60, 260] }); desaTerakhir(sc); const H = gerombolan(sc, 1100, [0, 0, -80], 80, 26);
    const zp = [1.2, 0, -60]; const Z = zombie(zp, 2); Z.rotation.y = .15; sc.add(Z); const Z2 = zombie([-1.4, 0, -63], 4); sc.add(Z2); const cam = camera(42);
    const ep = X.ab({ left: 0, top: 250, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '42px', color: '#1E2A1C', letterSpacing: '4px' }, root, `<span style="background:${AMBER};padding:8px 24px;border-radius:10px">EPISODE 5 · DESA TERAKHIR</span>`);
    const big = BIG(root, 'BESOK MALAM', { top: 330, fontSize: '96px' }); big.style.opacity = 1; const sub = BIG(root, 'RATUSAN ZOMBIE', { top: 450, fontSize: '104px', color: '#C9F0A0' }); sub.style.opacity = 1;
    return { scene: sc, cam, upd(t, dur) { H.upd(t); [Z, Z2].forEach((z, i) => { const zz = (i ? -63 : -60) + t * .35, x = i ? -1.4 : 1.2; z.position.set(x, HY(x, zz), zz); z.shamble(t + i) });
      const p = E.inout(seg(t, .6, dur)); const y0 = HY(1.2, -60 + t * .35);
      cam.position.set(...LERP3([1.9, y0 + 1.3, -55.6 + t * .35], [7, 24, -14], p)); cam.lookAt(...LERP3([1.2, y0 + 1.75, -60 + t * .35], [0, 8, -70], p));
      const off = 1 - seg(t, dur - .4, dur); big.style.opacity = sub.style.opacity = ep.style.opacity = off } };
  },
  B5_TUTUP(s, root) {   // gerbang ditutup dari dalam, palang kayu dijatuhkan; kartu voting 36 lawan 3
    const sc = SENJA({ sky: ['#6A78B8', '#F2A884'] }); const D = desaTerakhir(sc, { hole: (x, z) => z > 22 && Math.abs(x) < 14 }); D.obor(1);
    const P = [-1.6, 1.6].map((x, i) => { const w = warga([x, 0, RF - 1.4], i + 1); w.rotation.y = 0; sc.add(w); return w }); const J = gilang([3.6, 0, RF - 5]); J.rotation.y = -2.6; sc.add(J);
    const bar = mesh(G.box(6.6, .32, .32), '#6E4A2C', [0, 4.5, RF - .35]); sc.add(bar); [-2.6, 2.6].forEach(x => sc.add(mesh(G.box(.2, .4, .4), '#3A2A1A', [x, 1.35, RF - .4]))); const cam = camera(42);
    const l = LABEL(root, '🚪 TUTUP SEMUA GERBANG', `${X.TL.vars.vB} lawan ${X.TL.vars.vA} · pilihan warga`);
    return { scene: sc, cam, upd(t, dur) { const tt = at(s, 'tutup', 1.6), tn = at(s, 'Nggak', dur * .7), t3 = at(s, 'Tiga', dur * .4);
      const c = E.inout(seg(t, tt, tt + 1.4)); D.gate.userData.set(Math.PI / 2 * .95 * (1 - c)); P.forEach((w, i) => { w.pose(t, { walk: c > 0 && c < 1 ? 1 : 0 }); w.userData.st.arms.forEach(A => A.rotation.x = -1.4); w.position.x = (i ? 1 : -1) * lerp(3.4, 1.6, c) });
      const b = E.in(seg(t, tn - .35, tn)); bar.position.y = lerp(4.5, 1.5, b); J.pose(t, { talk: true, point: t > tt && t < tt + 1.5 });
      const p = ease(t, 0, dur); cam.position.set(lerp(4.5, 3, p), lerp(2.6, 2.2, p), lerp(RF - 11, RF - 8.5, p)); cam.lookAt(0, 1.7, RF); show(l, seg(t, t3, t3 + .4)) } };
  },
  B5_BENTENG(s, root) {   // pagar didobel, ranjau bambu tumbuh memutar di luar parit, rak busur penuh; label usul warga
    const sc = SIANG({ sky: ['#7DB8E0', '#F4E6CC'] }); const rk = [-12, 0, RF - 15]; const D = desaTerakhir(sc, { hole: (x, z) => Math.hypot(x - rk[0], z - rk[2] - 3) < 9 }); D.gate.userData.set(0);
    parit(sc).set(1); const pd = pagarDobel(sc); const R = ranjau(sc); rakBusur(sc, rk); const W1 = warga(W(rk, [1.2, 0, 1.6]), 3); W1.rotation.y = Math.PI; busur(W1); sc.add(W1); const cam = camera(42);
    const V = X.TL.vars.warga, ic = ['🧱', '🎋', '🏹'];
    const tags = V.map(([r, n], i) => TAG(root, `${ic[i]} ${r} · <span style="color:${AMBER}">${n}</span>`, { left: 120, top: 300 + i * 92, fontSize: '40px' }));
    return { scene: sc, cam, upd(t, dur) { const tw = [at(s, 'pagar', 2.2), at(s, 'ranjau', 3.6), at(s, 'busur', dur * .75)]; R.grow(seg(t, tw[1] - .3, tw[2]) * 1.1); W1.pose(t);
      const a = Math.PI / 2 - .55, ring = r => [Math.cos(a) * r, 0, Math.sin(a) * r]; let cp, cl;
      if (t < tw[1]) { const p = ease(t, 0, tw[1]); cp = LERP3(W(ring(RF - 6), [0, 13, 0]), W(ring(RF - 4), [0, 9, 0]), p); cl = ring(RF + 3) }
      else if (t < tw[2]) { const p = ease(t, tw[1] - .1, tw[1] + 1); cp = LERP3(W(ring(RF - 4), [0, 9, 0]), W(ring(RF + 14), [3, 3.2, 0]), p); cl = LERP3(ring(RF + 3), W(ring(RF + 7), [0, .5, 0]), p) }
      else { const p = ease(t, tw[2] - .1, tw[2] + .9); cp = LERP3(W(ring(RF + 14), [3, 3.2, 0]), W(rk, [3.2, 2.6, 8.5]), p); cl = LERP3(W(ring(RF + 7), [0, .5, 0]), W(rk, [0, 1.5, 0]), p) }
      cam.position.set(...cp); cam.lookAt(...cl); tags.forEach((e, i) => show(e, seg(t, tw[i] - .1, tw[i] + .25))) } };
  },
  B5_ANGKA(s, root) {   // gudang senja: kartu +follow & like gabungan per platform
    const sc = SENJA({ sky: ['#7A86C2', '#F4B48A'] }); const D = desaTerakhir(sc, { hole: (x, z) => x > -20 && x < 0 && z > -22 && z < -2 }); const gp = SPOT.gudang;
    for (let i = 0; i < 26; i++) { const r = i % 6, c = Math.floor(i / 6) % 2, h = Math.floor(i / 12); const p = [gp[0] + 3.2 + c * 1.4 + h * .4, h * .75, gp[2] - 3.5 + r * 1.2]; i % 2 ? ikatBambu(sc, p, .8) : karung(sc, p, 1) }
    const S = sinta([gp[0] + 7.5, 0, gp[2] - .5]); S.rotation.y = -2; sc.add(S); const cam = camera(42); const V = X.TL.vars, L = V.lk;
    const row = (ic, nm, n) => `<div style="display:flex;justify-content:space-between;font-size:42px;font-weight:700;padding:4px 0;border-bottom:2px dashed #F3E9D244"><span>${ic} ${nm}</span><span style="color:${AMBER}">${n}</span></div>`;
    const card = X.ab({ left: 150, top: 300, width: 780, fontFamily: FONT, color: BONE, background: 'rgba(30,42,28,.95)', borderRadius: '16px', padding: '20px 34px 22px', boxShadow: '0 16px 34px #0008', borderBottom: `9px solid ${AMBER}`, opacity: 0 }, root,
      `<div style="font-size:52px;font-weight:800;text-align:center">🧍 +${V.follow} penyintas</div><div style="font-size:32px;font-weight:800;color:${AMBER};text-align:center;margin:10px 0 4px">❤️ LIKE GABUNGAN TIKTOK + IG + YOUTUBE</div>` +
      row('🎵', 'TikTok', L.tt) + row('📸', 'Instagram', L.ig) + row('▶️', 'YouTube', L.yt) + `<div style="display:flex;justify-content:space-between;font-size:50px;font-weight:800;padding-top:8px"><span>= ${V.like}</span><span style="color:${AMBER}">${V.unit} karung & ikat</span></div>`);
    return { scene: sc, cam, upd(t, dur) { S.pose(t, { point: true, talk: true }); const p = ease(t, 0, dur);
      cam.position.set(...LERP3([gp[0] + 14, 3.2, gp[2] + 6], [gp[0] + 11, 2.4, gp[2] + 3.5], p)); cam.lookAt(...LERP3([gp[0] + 5, 1.2, gp[2] - 1], [gp[0] + 4, .8, gp[2] - 1.5], p)); show(card, seg(t, .2, .5)) } };
  },
  B5_LUCU(s, root) {   // Pak Kardi ngetes ranjau, PD, lalu celananya nyangkut di bambu runcing; tergantung meronta
    const sc = SIANG({ sky: ['#7DB8E0', '#F2E2C6'] }); const D = desaTerakhir(sc); D.gate.userData.set(0); parit(sc).set(1); const R = ranjau(sc);
    const a = Math.PI / 2 - .32, rr = R.r + .6, kp = [Math.cos(a) * rr, 0, Math.sin(a) * rr]; const K = kardi(W(kp, [0, 0, 2.2])); K.rotation.y = Math.PI; sc.add(K);
    const J = gilang(W(kp, [-2.4, 0, 3.4])); J.rotation.y = 2.4; sc.add(J); const cam = camera(42);
    const tg = TAG(root, '🫡 "AMAN! saya yang ngetes"', { left: 190 }); const big = BIG(root, 'NYANGKUT!', { top: 330, fontSize: '130px', color: '#FFD0A0' });
    return { scene: sc, cam, upd(t, dur) { const ta = at(s, 'aman', dur * .45), tn = at(s, 'nyangkut', dur * .75); const st = K.userData.st;
      const w = seg(t, .3, tn - .2); K.position.set(kp[0], 0, lerp(kp[2] + 2.2, kp[2] + .5, w)); K.pose(t, { walk: w > 0 && w < 1 ? 1.2 : 0, cheer: t > ta - .2 && t < ta + .8 });
      const f = E.out(seg(t, tn - .2, tn + .2)); if (f > 0) { K.rotation.x = -f * .9; K.position.y = f * .55; const fl = Math.sin(t * 16); st.legs.forEach((L, i) => L.rotation.x = .6 + fl * (i ? .5 : -.5)); st.arms.forEach((A, i) => A.rotation.x = -2.6 + fl * (i ? .4 : -.4)) }
      J.pose(t, { shake: t > tn + .2 }); const q = ease(t, 0, dur);
      cam.position.set(...LERP3(W(kp, [4.2, 2, 5.5]), W(kp, [3, 1.6, 4.2]), q)); cam.lookAt(...W(kp, [0, 1, .8])); show(tg, seg(t, ta - .2, ta + .1) * (1 - seg(t, tn - .3, tn))); pulse(big, seg(t, tn + .1, tn + .4)) } };
  },
  B5_OBOR(s, root) {   // malam: dari menara utara, bukit penuh zombie... ada titik-titik obor; zoom: sosok manusia memegang obor
    const sc = MALAM({ sky: ['#141E50', '#4E4A8A'], fog: ['#2E3670', 50, 230] }); const D = desaTerakhir(sc); D.obor(1); const H = gerombolan(sc, 900, [0, 0, -82], 80, 22);
    const T = [[-14, -76], [6, -80], [18, -74], [-4, -86]].map(([x, z]) => sulut(sc, [x, HY(x, z) + 2.1, z])); const hp = [6, 0, -80]; const M = warga([hp[0] - .3, HY(hp[0], hp[2]), hp[2] + .2], 0, { body: '#3A3A44', pants: '#222' }); sc.add(M);
    const cam = camera(42); const big = BIG(root, 'ADA MANUSIA?!', { top: 330, fontSize: '110px', color: '#FFD0A0' }); const tg = TAG(root, '🔥 cahaya obor di bukit utara', { left: 160 });
    return { scene: sc, cam, upd(t, dur) { H.upd(t); T.forEach(({ f, l }, i) => { const k = .8 + Math.sin(t * 9 + i * 2) * .2; f.scale.setScalar(k); l.intensity = 5 * k }); M.pose(t); M.userData.st.arms[1].rotation.x = -2.2;
      const tm = at(s, 'manusia', dur * .8), z = ease(t, tm - 1.4, tm); const y = HY(hp[0], hp[2]);
      cam.position.set(...LERP3([0, 7.5, -RF + 5], [hp[0] + 1.5, y + 2.2, hp[2] + 6], z)); cam.lookAt(...LERP3([0, 16, -90], [hp[0], y + 1.4, hp[2]], z));
      show(tg, seg(t, .4, .8) * (1 - seg(t, tm - .6, tm - .2))); pulse(big, seg(t, tm, tm + .3)) } };
  },
  B5_AJAK(s, root) {   // langit malam di atas desa: A nyalain semua obor (desa terang) / B matiin semua (gelap); pertanyaan "kalau lo warga sini"
    const sc = MALAM({ hemi: 1.4 }); const D = desaTerakhir(sc); D.gate.userData.set(0); parit(sc).set(1); pagarDobel(sc); ranjau(sc); const cam = camera(44);
    const card = (k, t, c) => `<div style="background:rgba(30,42,28,.95);border-radius:16px;padding:14px 18px 18px;border-bottom:9px solid ${c};width:440px;box-shadow:0 14px 30px #0008"><div style="font-size:92px;font-weight:800;color:${c};line-height:1">${k}</div><div style="font-size:42px;font-weight:800;color:${BONE};line-height:1.1">${t}</div></div>`;
    const ab = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', textAlign: 'center', fontFamily: FONT, opacity: 0 }, root, card('A', '🔥 NYALAIN SEMUA OBOR', '#FFD27A') + card('B', '🌑 MATIIN SEMUA LAMPU', '#A8B8FF'));
    const end = BIG(root, 'kalau lo warga sini,<br>PILIH YANG MANA?', { top: 640, fontSize: '68px', color: AMBER, lineHeight: '1.05' });
    return { scene: sc, cam, upd(t, dur) { const ta = at(s, 'A,', 2), tb = at(s, 'B,', dur * .45), tk = at(s, 'Kalau', dur * .75);
      const on = t < tb ? 1 : t < tk ? 0 : (Math.sin(t * 3) > 0 ? 1 : 0); D.obor(on ? 1 : .001);
      const p = ease(t, 0, dur); cam.position.set(lerp(30, 22, p), lerp(42, 36, p), lerp(RF + 34, RF + 28, p)); cam.lookAt(0, 0, lerp(8, 4, p));
      show(ab, seg(t, ta, ta + .4)); pulse(end, seg(t, tk, tk + .35)) } };
  },
};
