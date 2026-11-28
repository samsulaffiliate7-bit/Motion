// Shot Desa Terakhir S1 Ep 6 "Ransel di Depan Gerbang" (lihat STORYBOARD.md). Helper disalin dari Ep 2-5.
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

function kawanan(sc, n, c, w, d, v = [0, 0, -.5], seed = 6) {   // kerumunan zombie instanced bergerak ke arah v (m/dtk)
  const body = new THREE.InstancedMesh(new THREE.CapsuleGeometry(.17, .75, 3, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .8 }), n);
  const head = new THREE.InstancedMesh(new THREE.SphereGeometry(.18, 10, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .7, emissive: '#2A3A10', emissiveIntensity: .5 }), n);
  let s = seed; const R = () => (s = (s * 16807) % 2147483647) / 2147483647; const P = [];
  for (let i = 0; i < n; i++) { P.push([c[0] + (R() - .5) * w, c[2] + (R() - .5) * d, R() * 6]); body.setColorAt(i, COL.set(grade(ZC[i % 4]))); head.setColorAt(i, COL.set(grade(ZS[i % 3]))) }
  const upd = (t, turn = 0) => { P.forEach(([x, z, ph], i) => { const lean = Math.sin(t * 2 + ph) * .12, X0 = x + v[0] * t, Z0 = z + v[2] * t; Q.setFromEuler(new THREE.Euler(.15, 0, lean)); M4.compose(V3.set(X0, .72, Z0), Q, S3.set(1, 1, 1)); body.setMatrixAt(i, M4);
    M4.compose(V3.set(X0 + lean * .6 + turn * .1, 1.4, Z0 + .12), Q, S3.set(1, 1, 1)); head.setMatrixAt(i, M4) }); body.instanceMatrix.needsUpdate = head.instanceMatrix.needsUpdate = true };
  upd(0); body.castShadow = head.castShadow = true; sc.add(body); sc.add(head); return { upd };
}
function ransel(sc, p) { const g = group(sc, p); g.add(mesh(G.box(.5, .6, .3), '#5E6A3A', [0, .3, 0])); g.add(mesh(G.box(.4, .2, .08), '#4A5530', [0, .25, .19])); [-1, 1].forEach(x => g.add(mesh(G.box(.06, .5, .04), '#3A4220', [x * .16, .32, -.17]))); return g }
const GELAP = o => { const sc = MALAM(Object.assign({ sky: ['#0E1638', '#33356A'], hemi: 1.15, fog: ['#232A58', 40, 200] }, o)); const D = desaTerakhir(sc); D.obor(.001); D.gate.userData.set(0); parit(sc).set(1); pagarDobel(sc); ranjau(sc); return [sc, D] };
function obor(p, sc) { const k = tangan(p); const st = mesh(G.cyl(.03, .04, .6, 6), '#5A3E22', [0, -.1, .1], { rot: [.4, 0, 0] }); k.add(st); const f = mesh(G.sph(.13, 8, 6), '#FFB347', [0, .18, .2], { cast: false, mat: { emissive: '#FF8A1E', emissiveIntensity: 2.4 } }); k.add(f); const l = new THREE.PointLight('#FFB060', 9, 12); sc.add(l); return { f, l } }
const pemimpin = (sc, p) => { const m = warga(p, 0, { body: '#3A4A3A', pants: '#222' }); m.userData.st.body.add(mesh(G.box(.36, .1, .24), '#2A2A2A', [0, .5, 0], { cast: false })); sc.add(m); return m };

export const SHOTS = {
  B6_HOOK(s, root) {   // frame 0: dari balik pagar gelap, zombie menyeret lewat persis di luar; SEMUA LAMPU MATI
    const [sc] = GELAP(); const K = kawanan(sc, 260, [-30, 0, RF + 14], 26, 8, [1.1, 0, 0]);
    const Z = Array.from({ length: 6 }, (_, i) => { const z = zombie([-9 + i * 3.4, 0, RF + 8.6 + (i % 2) * 1.2], i); z.rotation.y = Math.PI / 2; sc.add(z); return z }); const cam = camera(42);
    const ep = X.ab({ left: 0, top: 250, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '42px', color: '#1E2A1C', letterSpacing: '4px' }, root, `<span style="background:${AMBER};padding:8px 24px;border-radius:10px">EPISODE 6 · DESA TERAKHIR</span>`);
    const big = BIG(root, 'SEMUA LAMPU<br>MATI TOTAL', { top: 330, fontSize: '104px', lineHeight: '1.02' }); big.style.opacity = 1; const sh = TAG(root, '🤫 jangan bersuara', { left: 330, top: 580 });
    return { scene: sc, cam, upd(t, dur) { K.upd(t); Z.forEach((z, i) => { z.position.x = -9 + i * 3.4 + t * .9; z.shamble(t + i) }); const p = ease(t, 0, dur);
      cam.position.set(lerp(1.2, .6, p), lerp(3.7, 3.9, p), lerp(RF - 2.2, RF - 1.4, p)); cam.lookAt(lerp(-1, 1.5, p), .9, RF + 10);
      const off = 1 - seg(t, dur - .35, dur); big.style.opacity = ep.style.opacity = off; show(sh, seg(t, 1.2, 1.6) * off) } };
  },
  B6_OBOR(s, root) {   // dari menara gerbang: gerombolan datang dari kejauhan, yang paling depan memegang obor, berjaket = manusia
    const [sc] = GELAP(); const K = kawanan(sc, 700, [0, 0, RF + 58], 50, 26, [0, 0, -.9]); const lp = [1.2, 0, RF + 40]; const L = pemimpin(sc, lp); L.rotation.y = Math.PI; const T = obor(L, sc);
    const cam = camera(42); const big = BIG(root, 'DIA MANUSIA', { top: 330, fontSize: '112px', color: '#FFD0A0' }); const tg = TAG(root, '🔥 bawa obor · pakai jaket', { left: 250 });
    return { scene: sc, cam, upd(t, dur) { K.upd(t); L.position.z = lp[2] - t * .9; L.pose(t, { walk: 1 }); L.userData.st.arms[1].rotation.x = -2.2; const wp = new THREE.Vector3(); T.f.getWorldPosition(wp); T.l.position.copy(wp); T.f.scale.setScalar(.85 + Math.sin(t * 11) * .15);
      const tm = at(s, 'manusia', dur * .8), z = ease(t, tm - 1.6, tm); cam.position.set(...LERP3([3.7, 5.2, RF + .2], [2.6, 2.4, L.position.z - 7], z)); cam.lookAt(...LERP3([.5, 1, RF + 30], [L.position.x, 1.5, L.position.z], z));
      show(tg, seg(t, at(s, 'bawa', 1.5), at(s, 'bawa', 1.5) + .3) * (1 - seg(t, tm - .3, tm))); pulse(big, seg(t, tm, tm + .3)) } };
  },
  B6_RANSEL(s, root) {   // ransel dilempar melengkung ke depan gerbang (BAM), dia lari ke semak; zombie menoleh ke gerbang
    const [sc] = GELAP(); const K = kawanan(sc, 500, [0, 0, RF + 34], 40, 16, [0, 0, -.25]); const lp = [2.2, 0, RF + 16]; const L = pemimpin(sc, lp); L.rotation.y = Math.PI; const T = obor(L, sc);
    const rp = [.8, 0, RF + 6.4]; const B = ransel(sc, rp); const cam = camera(42); const big = BIG(root, 'BAM!', { top: 330, fontSize: '150px', color: '#FFD0A0' }); const tg = TAG(root, '🎒 ransel misterius', { left: 330, top: 520 });
    const sem = [[14, RF + 13], [16, RF + 15], [13, RF + 16]].map(([x, z]) => { const b = mesh(G.sph(1.6, 8, 6), '#2E4A2E', [x, 1, z]); sc.add(b); return b });
    return { scene: sc, cam, upd(t, dur) { const tl = at(s, 'ngelempar', 1), tg2 = at(s, 'gerbang', 2), tk = at(s, 'kabur', dur * .5), tn = at(s, 'noleh', dur * .8);
      K.upd(t, seg(t, tn, tn + .5) * -3); const wp = new THREE.Vector3(); T.f.getWorldPosition(wp); T.l.position.copy(wp);
      const u = seg(t, tl, tg2); const p0 = W(lp, [0, 1.8, -.4]); B.position.set(lerp(p0[0], rp[0], u), u < 1 ? lerp(p0[1], 0, u) + Math.sin(u * Math.PI) * 3 : 0, lerp(p0[2], rp[2], u)); B.rotation.x = u < 1 ? u * 8 : .2;
      L.userData.st.arms[1].rotation.x = t < tl + .2 ? -2.2 : -.6; const r = seg(t, tk, dur); L.position.set(lerp(lp[0], 14, E.in(r)), 0, lerp(lp[2], RF + 14, r)); L.rotation.y = r > 0 ? Math.PI / 2 : Math.PI; L.pose(t, { walk: r > 0 ? 2.2 : 0 }); L.visible = r < .95;
      cam.position.set(-2.2, 5.8, RF - .9); cam.lookAt(lerp(1.5, 1, ease(t, tl, tg2)), lerp(1.5, .4, ease(t, tl, tg2)), lerp(RF + 14, RF + 8, ease(t, tl, tg2)));
      pulse(big, seg(t, tg2, tg2 + .2) * (1 - seg(t, tg2 + 1, tg2 + 1.3))); show(tg, seg(t, tg2 + .3, tg2 + .6)) } };
  },
  B6_LUCU(s, root) {   // di balik gerbang gelap: semua jongkok nahan napas, Pak Kardi tutup mulut... HACHIM! semua menoleh
    const [sc] = GELAP({ hemi: 1.35 }); const kp = [-1.2, 0, RF - 3]; const K = kardi(kp); K.rotation.y = Math.PI - .3; const J = gilang(W(kp, [1.6, 0, .4])); J.rotation.y = Math.PI + .6; const Y = yati(W(kp, [-1.5, 0, .6])); Y.rotation.y = Math.PI - .9; [K, J, Y].forEach(p => sc.add(p));
    const moon = new THREE.PointLight('#B8C8FF', 6, 10); moon.position.set(...W(kp, [1, 3.5, -2.5])); sc.add(moon); const cam = camera(42);
    const sh = TAG(root, '🤫 ssst...', { left: 400 }); const big = BIG(root, 'HACHIM!', { top: 330, fontSize: '150px', color: '#FFE0A0' });
    return { scene: sc, cam, upd(t, dur) { const tb = at(s, 'bersin', dur * .75), tm = at(s, 'mulut', dur * .4); [K, J, Y].forEach(p => p.pose(t)); const st = K.userData.st;
      if (t > tm && t < tb) { st.arms[1].rotation.x = -2.6; st.arms[1].userData.elbow.rotation.x = -1.6 } const b = seg(t, tb - .5, tb), a = seg(t, tb, tb + .25); st.head.rotation.x = -b * .5 + a * .9; st.body.rotation.x = -b * .15 + a * .35;
      [J, Y].forEach((p, i) => { p.userData.st.head.rotation.y = t > tb + .1 ? (i ? -.9 : .9) : 0 });
      const q = ease(t, 0, dur); cam.position.set(...LERP3(W(kp, [.9, 1.8, -5.2]), W(kp, [.6, 1.6, -4.2]), q)); cam.lookAt(...W(kp, [.2, 1.3, 0]));
      show(sh, seg(t, .3, .6) * (1 - seg(t, tb - .2, tb))); pulse(big, seg(t, tb, tb + .25)) } };
  },
  B6_ANGKA(s, root) {   // posko gelap diterangi senter: papan 1134 + kartu follow/like + YouTube 100 subscriber
    const [sc, D] = GELAP({ hemi: 1.4 }); D.posko.userData.setN(X.TL.vars.pen); const pp = SPOT.posko; const S = sinta(W(pp, [-1.6, 0, -1.6])); S.rotation.y = Math.PI + .7; sc.add(S);
    const lamp = new THREE.PointLight('#FFF2C0', 10, 9); lamp.position.set(...W(pp, [-2, 2.6, -3])); sc.add(lamp); const cam = camera(42); const V = X.TL.vars, L = V.lk;
    const card = X.ab({ left: 120, top: 300, width: 840, fontFamily: FONT, color: BONE, background: 'rgba(30,42,28,.95)', borderRadius: '16px', padding: '18px 30px 20px', borderBottom: `9px solid ${AMBER}`, opacity: 0, textAlign: 'center' }, root,
      `<div style="font-size:52px;font-weight:800">🧍 +${V.follow} penyintas</div><div style="font-size:30px;font-weight:800;color:${AMBER};margin-top:8px">❤️ LIKE GABUNGAN TIKTOK + IG + YOUTUBE</div><div style="font-size:40px;font-weight:700">${L.tt} + ${L.ig} + ${L.yt} = ${V.like} → ${V.unit} karung & ikat</div>`);
    const yt = X.ab({ left: 0, top: 640, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, opacity: 0 }, root, `<span style="display:inline-block;background:#C8372D;color:#fff;font-size:58px;padding:10px 30px;border-radius:14px;box-shadow:0 12px 26px #0008">▶️ ${V.subs} SUBSCRIBER 🎉</span>`);
    return { scene: sc, cam, upd(t, dur) { S.pose(t, { cheer: t > at(s, 'YouTube', dur * .5) }); const ty = at(s, 'YouTube', dur * .5); const p = ease(t, 0, dur);
      cam.position.set(...LERP3(W(pp, [-5.5, 2.6, -8]), W(pp, [-4.2, 2.3, -6.4]), p)); cam.lookAt(...W(pp, [0, 1.6, 0])); show(card, seg(t, .15, .45)); pulse(yt, seg(t, ty, ty + .3)) } };
  },
  B6_DILEMA(s, root) {   // dari atas menara: ransel 5 langkah dari gerbang, zombie mendekat (20 m); A/B besar + hitung mundur
    const [sc] = GELAP(); const K = kawanan(sc, 600, [0, 0, RF + 30], 36, 14, [0, 0, -.55]); const rp = [.8, 0, RF + 6.4]; const B = ransel(sc, rp); B.rotation.x = .2;
    const glow = new THREE.PointLight('#FFE6A0', 4, 5); glow.position.set(rp[0], 1.2, rp[2]); sc.add(glow); const cam = camera(46);
    const card = (k, t, c) => `<div style="background:rgba(30,42,28,.95);border-radius:16px;padding:14px 18px 18px;border-bottom:9px solid ${c};width:440px;box-shadow:0 14px 30px #0008"><div style="font-size:92px;font-weight:800;color:${c};line-height:1">${k}</div><div style="font-size:40px;font-weight:800;color:${BONE};line-height:1.1">${t}</div></div>`;
    const ab = X.ab({ left: 60, top: 300, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', textAlign: 'center', fontFamily: FONT, opacity: 0 }, root, card('A', '🚪 BUKA GERBANG, AMBIL RANSEL', '#9AD07A') + card('B', '🔥 PANAH API, BAKAR DARI JAUH', '#FFB4A8'));
    const jar = X.ab({ left: 0, top: 640, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '64px', color: '#FFB4A8', textShadow: '0 4px 14px #000', opacity: 0 }, root, '');
    const Z = Array.from({ length: 6 }, (_, i) => { const z = zombie([-9 + i * 3.4, 0, RF + 8.6 + (i % 2) * 1.2], i); z.rotation.y = Math.PI / 2; z.visible = false; sc.add(z); return z });
    const q = BIG(root, 'tulis pilihan lo<br>di komen, sebelum...', { top: 640, fontSize: '66px', color: AMBER, lineHeight: '1.05' });
    const rr = X.ab({ left: 0, top: 0 }, root); const rt = TAG(rr, '🎒 5 langkah', { position: 'relative', left: 0, top: 0, transform: 'translate(-50%,-100%)', fontSize: '34px' });
    return { scene: sc, cam, upd(t, dur) { K.upd(t); const ta = at(s, 'A,', dur * .45), tm = at(s, 'meter', dur * .35); const m = Math.max(5, Math.round(20 - Math.max(0, t - tm) * 1.6));
      jar.innerHTML = `⏱ ZOMBIE ${m} METER`; const p = ease(t, 0, dur); cam.position.set(lerp(2.4, 1.6, p), lerp(9, 8, p), lerp(RF - 2.5, RF - 1.8, p)); cam.lookAt(.5, 0, RF + 9);
      const tt = at(s, 'Tulis', dur - 2.4); if (t > tt) { Z.forEach((z, i) => { z.visible = true; z.position.x = -9 + i * 3.4 + (t - tt) * .9; z.shamble(t + i) }); cam.position.set(1.2, 3.7, RF - 2.2); cam.lookAt(-1, .9, RF + 10) } else Z.forEach(z => z.visible = false);
      const [px, py] = X.proj(B, cam, [0, .8, 0]); rr.style.left = px + 'px'; rr.style.top = py + 'px'; rt.style.opacity = t < ta ? seg(t, .4, .8) : 0; show(ab, seg(t, ta, ta + .4)); jar.style.opacity = t > tm - .4 && t < tt ? 1 : 0; show(q, seg(t, tt, tt + .3)) } };
  },
  B6_LOOP(s, root) {   // potong balik ke sudut detik 0 (balik pagar gelap) supaya nyambung saat video diputar ulang
    const [sc] = GELAP(); const K = kawanan(sc, 260, [-30, 0, RF + 14], 26, 8, [1.1, 0, 0]);
    const Z = Array.from({ length: 6 }, (_, i) => { const z = zombie([-9 + i * 3.4, 0, RF + 8.6 + (i % 2) * 1.2], i); z.rotation.y = Math.PI / 2; sc.add(z); return z }); const cam = camera(42);
    const q = BIG(root, 'tulis pilihan lo<br>di komen, sebelum...', { top: 360, fontSize: '72px', color: AMBER, lineHeight: '1.05' });
    return { scene: sc, cam, upd(t, dur) { K.upd(t + 30); Z.forEach((z, i) => { z.position.x = -9 + i * 3.4 + (t - dur) * .9; z.shamble(t + i) }); cam.position.set(1.2, 3.7, RF - 2.2); cam.lookAt(-1, .9, RF + 10); show(q, seg(t, .1, .4)) } };
  },
};
