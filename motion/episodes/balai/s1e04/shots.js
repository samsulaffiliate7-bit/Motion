// Shot Desa Terakhir S1 Ep 4 "Panah Peringatan" (lihat STORYBOARD.md). Helper disalin dari Ep 2/3.
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

export const SHOTS = {
  B4_HOOK(s, root) {   // detik 0: panah peringatan meluncur dari menara, menancap sejengkal dari kakinya; dia berlutut angkat tangan
    const [sc] = NIGHT(); const R = warga([.3, 0, RF + 5.2], 7); R.rotation.y = Math.PI; perban(R, 0); sc.add(R); const ar = panah(sc); const cam = camera(42);
    const p0 = [3.7, 4.6, RF + .2], p1 = [.55, .25, RF + 4.35];
    const ep = X.ab({ left: 0, top: 250, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '44px', color: '#1E2A1C', letterSpacing: '4px' }, root, `<span style="background:${AMBER};padding:8px 24px;border-radius:10px">EPISODE 4 · HARI KE-4 · 00.17</span>`);
    const big = BIG(root, `KEBANYAKAN KALIAN<br>PILIH B`, { top: 330, fontSize: '80px', lineHeight: '1.04' }); big.style.opacity = 1;
    const vs = BIG(root, `${X.TL.vars.vB} LAWAN ${X.TL.vars.vA}`, { top: 530, fontSize: '124px', color: AMBER }); vs.style.opacity = 1;
    const tg = TAG(root, '🏹 panah peringatan', { left: 330, top: 780 });
    return { scene: sc, cam, upd(t, dur) { const u = Math.min(1, t / .42); ARROWAT(ar, p0, p1, u, .3); if (u >= 1) { ar.position.set(...p1); ar.rotation.set(0, 0, 0); ar.rotateZ(-1.1); ar.rotateY(.3) }
      R.pose(t); const k = E.out(seg(t, .5, 1.2)); R.position.y = -k * .42; R.userData.st.legs.forEach(L => { L.rotation.x = -k * 1.2; L.userData.knee && (L.userData.knee.rotation.x = k * 1.9) }); if (k > 0) { angkat(R); R.userData.st.arms.forEach(A => A.rotation.x = lerp(0, -2.9, k)) }
      const p = ease(t, 0, dur); cam.position.set(lerp(3.6, 3, p), lerp(1.3, 1.5, p), lerp(RF + 11.5, RF + 10.5, p)); cam.lookAt(.4, lerp(1.6, 1.8, p), RF + 4.5);
      const off = 1 - seg(t, dur - .4, dur); big.style.opacity = vs.style.opacity = off; ep.style.opacity = off; show(tg, seg(t, .5, .8) * off) } };
  },
  B4_TIARAP(s, root) {   // dari atas gerbang: dia tiarap tangan di belakang, dua pemanah siaga di menara; daftar usul warga
    const [sc] = NIGHT(); const R = warga([.3, 0, RF + 5], 7); perban(R, 0); sc.add(R); const cam = camera(44);
    const ar = panah(sc); ar.position.set(.55, .25, RF + 4.35); ar.rotateZ(-1.1);
    const P = [-3.7, 3.7].map((x, i) => { const w = warga([x, 3.4, RF + .3], i + 2, { body: '#6E7E4A' }); busur(w); sc.add(w); return w });
    const L = ['❓ tanya lukanya', '🙇 suruh tiarap', '✋ tangan di belakang', '🏹 pemanah siaga'];
    const box = X.ab({ left: 60, top: 300, width: 600, fontFamily: FONT, color: BONE, background: 'rgba(30,42,28,.94)', borderRadius: '14px', padding: '16px 26px', borderLeft: `9px solid ${AMBER}`, opacity: 0 }, root,
      `<div style="font-size:32px;font-weight:800;color:${AMBER};letter-spacing:2px">USUL WARGA DI KOMEN</div>` + L.map((x, i) => `<div class="it" style="font-size:40px;font-weight:700;opacity:0;margin-top:6px">${x}</div>`).join(''));
    const its = box.querySelectorAll('.it');
    return { scene: sc, cam, upd(t, dur) { const tt = [at(s, 'tanya', .8), at(s, 'tiarap', 2), at(s, 'tangan', 3), at(s, 'Pemanah', dur * .75)];
      const f = E.inout(seg(t, tt[1] - .2, tt[1] + .8)); R.rotation.set(lerp(0, Math.PI / 2, f), Math.PI, 0); R.position.set(.3, f * .12, lerp(RF + 5, RF + 5.9, f)); R.pose(t);
      if (t > tt[2]) R.userData.st.arms.forEach((A, k) => { A.rotation.x = .9; A.rotation.z = (k ? 1 : -1) * .5 });
      P.forEach((w, i) => { w.pose(t); w.rotation.y = 0; const st = w.userData.st; const r = seg(t, tt[3] - .2, tt[3] + .3); st.arms[1].rotation.x = -1.5 * r; st.arms[0].rotation.x = -1.5 * r });
      const p = ease(t, 0, tt[3]); const q = ease(t, tt[3] - .2, tt[3] + .9);
      cam.position.set(...LERP3(LERP3([-1, 9, RF - 3], [-.6, 7.5, RF - 1.5], p), [-8, 6, RF - 6], q)); cam.lookAt(...LERP3([.3, 0, RF + 5], [0, 2.5, RF + 2], q));
      show(box, seg(t, .1, .4)); its.forEach((e, i) => e.style.opacity = seg(t, tt[i] - .1, tt[i] + .2)) } };
  },
  B4_PERBAN(s, root) {   // barak karantina malam: Bu Yati + 2 anak PMR membuka perban -> cakaran, bukan gigitan -> karantina
    const sc = MALAM({ hemi: 1.9 }); const D = desaTerakhir(sc, { hole: (x, z) => z > 20 && x < 2 && x > -24 }); D.obor(1); const bk = barak(sc, [-14, 0, RF - 16]);
    const rp = [-9.5, 0, RF - 11.5]; const R = warga(rp, 7); R.rotation.y = -.6; sc.add(R); const pb = perbanBuka(R); const cs = cakar(R); cs.forEach(m => m.visible = false);
    const Y = yati(W(rp, [-1.1, 0, 1.0])); Y.rotation.y = 2.5; sc.add(Y);
    const K = [[.9, 0, 1.1], [1.6, 0, .2]].map((d, i) => { const k = warga(W(rp, d), i, { s: .74, body: '#F4F2EC', pants: '#C8372D' }); k.rotation.y = -2.2 - i * .4; k.userData.st.body.add(mesh(G.box(.12, .04, .02), '#C8372D', [0, .3, .11], { cast: false })); k.userData.st.body.add(mesh(G.box(.04, .12, .02), '#C8372D', [0, .3, .11], { cast: false })); sc.add(k); return k });
    const lamp = new THREE.PointLight('#FFD9A0', 14, 9); lamp.position.set(...W(rp, [.4, 2.6, 1.6])); sc.add(lamp); const cam = camera(42);
    const pmr = pin(root, '⛑ ANAK PMR', { fontSize: '34px' }); const big = BIG(root, 'CAKARAN,<br>BUKAN GIGITAN', { top: 320, fontSize: '92px', lineHeight: '1.02', color: '#BFF0B0' }); const lk = LABEL(root, '🏠 KARANTINA', 'sampai pagi · dijaga');
    return { scene: sc, cam, upd(t, dur) { const tb = at(s, 'buka', 1.8), tc = at(s, 'cakaran', dur * .55), tk = at(s, 'karantina', dur * .8);
      R.pose(t); const st = R.userData.st; st.arms[0].rotation.x = -1.3; st.arms[0].rotation.z = .3; Y.pose(t, { nod: t > tc }); K.forEach((k, i) => k.pose(t, { look: .3 }));
      const u = seg(t, tb, tb + 1.2); pb.scale.set(1, 1 - u, 1); pb.visible = u < 1; cs.forEach(m => m.visible = u > .6);
      const z = ease(t, tb - .3, tb + .8), o = ease(t, tk - .4, tk + .6);
      const c0 = W(rp, [2.6, 2.2, 4.5]), c1 = W(rp, [.7, 1.45, 1.7]), c2 = [-8.5, 4.5, RF - 3];
      cam.position.set(...LERP3(LERP3(c0, c1, z), c2, o)); const l0 = W(rp, [0, 1.1, 0]), l1 = W(rp, [-.25, 1.05, .25]), l2 = [-8.5, 1.8, RF - 16]; cam.lookAt(...LERP3(LERP3(l0, l1, z), l2, o));
      pmr.e.style.opacity = seg(t, .4, .7) * (1 - z); pmr.at(K[0], cam, [0, 1.7, 0]); pulse(big, seg(t, tc, tc + .3) * (1 - seg(t, tk - .4, tk - .1))); show(lk, seg(t, tk, tk + .4)) } };
  },
  B4_KABAR(s, root) {   // pagar utara, bukit gelap: gerombolan ratusan zombie menuruni bukit; GEROMBOLAN DARI UTARA · 2 MALAM LAGI
    const sc = MALAM({ sky: ['#141E50', '#4E4A8A'], fog: ['#2E3670', 50, 220] }); const D = desaTerakhir(sc); D.obor(1);
    const G1 = gerombolan(sc, 900, [0, 0, -78], 70, 22), G2 = gerombolan(sc, 400, [-34, 0, -70], 24, 16, 9);
    const Z = Array.from({ length: 6 }, (_, i) => { const z = zombie([-6 + i * 2.6, 0, -62], i); z.rotation.y = 0; sc.add(z); return z });
    const cam = camera(42);
    const l1 = BIG(root, 'GEROMBOLAN<br>DARI UTARA', { top: 320, fontSize: '96px', lineHeight: '1.02', color: '#C9F0A0' }); const l2 = BIG(root, 'RATUSAN', { top: 540, fontSize: '80px', color: BONE }); const l3 = BIG(root, '⏳ 2 MALAM LAGI', { top: 660, fontSize: '80px', color: AMBER });
    return { scene: sc, cam, upd(t, dur) { G1.upd(t); G2.upd(t); Z.forEach((z, i) => { const zz = -62 - (i % 2) * 3 + t * .35; z.position.set(-6 + i * 2.6, HY(-6 + i * 2.6, zz), zz); z.shamble(t + i) });
      const tg = at(s, 'Gerombolan', 1.2), tr = at(s, 'Ratusan', dur * .55), td = at(s, 'Dua', dur * .75); const p = ease(t, 0, dur);
      cam.position.set(lerp(4, 1, p), lerp(8, 7, p), lerp(-RF + 14, -RF + 6, p)); cam.lookAt(0, lerp(12, 16, p), lerp(-75, -85, p));
      pulse(l1, seg(t, tg, tg + .3)); pulse(l2, seg(t, tr, tr + .3)); pulse(l3, seg(t, td, td + .3)) } };
  },
  B4_LUCU(s, root) {   // Pak Kardi nembak peringatan kedua ke atas... panahnya turun nancap di sandalnya sendiri
    const sc = MALAM({ hemi: 1.9 }); const D = desaTerakhir(sc, { hole: (x, z) => z > 24 && Math.abs(x) < 14 }); D.obor(1); D.gate.userData.set(0);
    const kp = [-3, 0, RF - 5]; const K = kardi(kp); K.rotation.y = .4; busur(K); sc.add(K); const J = gilang(W(kp, [2.4, 0, -1.2])); J.rotation.y = -1; sc.add(J);
    const ar = panah(sc); ar.visible = false; const cam = camera(42); const sd = mesh(G.box(.16, .03, .3), '#3E6E9A', W(kp, [.12, .02, .1]), { cast: false }); sc.add(sd);
    const tg = TAG(root, '🏹 peringatan kedua...', { left: 280 }); const big = BIG(root, 'NANCEP DI<br>SANDAL SENDIRI', { top: 320, fontSize: '92px', lineHeight: '1.02', color: '#FFD0A0' });
    return { scene: sc, cam, upd(t, dur) { const tn = at(s, 'nancap', dur * .45), ts = at(s, 'sandalnya', dur * .7);
      const st = K.userData.st; K.pose(t, { cheer: false }); const aim = seg(t, .3, .9) * (1 - seg(t, tn - .1, tn)); st.arms[1].rotation.x = -2.4 * aim - .2; st.arms[0].rotation.x = -2.2 * aim - .2;
      const u = seg(t, tn - .3, ts); ar.visible = u > 0; const top = W(kp, [.4, 9, 1.2]), foot = W(kp, [.12, .35, .1]);
      if (u > 0 && u < .5) ARROWAT(ar, W(kp, [.1, 1.9, .3]), top, u * 2, 0); else if (u >= .5 && u < 1) ARROWAT(ar, top, foot, (u - .5) * 2, 0); else if (u >= 1) { ar.position.set(...foot); ar.rotation.set(0, 0, -Math.PI / 2) }
      const hop = t > ts ? Math.abs(Math.sin((t - ts) * 9)) * .35 * Math.max(0, 1 - (t - ts) / 1.6) : 0; K.position.y = hop; if (t > ts) { st.legs[0].rotation.x = -1; st.arms.forEach(A => A.rotation.x = -3 + Math.sin(t * 18) * .3) }
      J.pose(t, { shake: t > ts + .2 });
      const q = ease(t, tn, ts); cam.position.set(...LERP3(W(kp, [3.4, 1.8, 4.6]), W(kp, [3.4, 1.7, 4.6]), q)); cam.lookAt(...LERP3(W(kp, [.6, 1.6, 0]), W(kp, [.1, .5, .1]), q));
      show(tg, seg(t, .3, .6) * (1 - seg(t, tn - .2, tn))); pulse(big, seg(t, ts + .15, ts + .45)) } };
  },
  B4_WARGA(s, root) {   // segmen tetap: WARGA DARI KOMEN (peran + nama disamarkan) di halaman balai pagi; lalu angka follow + like gabungan
    const sc = SIANG({ sky: ['#8FC0E6', '#F6E6C8'] }); const D = desaTerakhir(sc); const V = X.TL.vars; const bp = SPOT.balai;
    const A = warga(W(bp, [-1.4, 0, 8]), 3, { body: '#5E6E3A', pants: '#3E4A2A', hat: 'cap', hatC: '#4A5530' }); const Pm = warga(W(bp, [0, 0, 8.3]), 1, { s: .8, body: '#F4F2EC', pants: '#C8372D' }); const Ph = warga(W(bp, [1.4, 0, 8]), 4, { body: '#B89A5A' }); busur(Ph);
    Pm.userData.st.body.add(mesh(G.box(.12, .04, .02), '#C8372D', [0, .3, .11], { cast: false })); Pm.userData.st.body.add(mesh(G.box(.04, .12, .02), '#C8372D', [0, .3, .11], { cast: false }));
    const ppl = [A, Pm, Ph]; ppl.forEach(p => sc.add(p)); const cam = camera(42); const ic = ['🪖', '⛑', '🏹'];
    const box = X.ab({ left: 90, top: 290, width: 900, fontFamily: FONT, color: BONE, background: 'rgba(30,42,28,.95)', borderRadius: '16px', padding: '14px 28px 18px', borderBottom: `9px solid ${AMBER}`, opacity: 0 }, root,
      `<div style="font-size:38px;font-weight:800;color:${AMBER};letter-spacing:3px;text-align:center">💬 WARGA DARI KOMEN</div>` + V.warga.map(([r, n], i) => `<div class="it" style="display:flex;justify-content:space-between;font-size:44px;font-weight:800;margin-top:8px;opacity:0"><span>${ic[i]} ${r}</span><span style="color:${AMBER}">${n}</span></div>`).join(''));
    const its = box.querySelectorAll('.it'); const L = V.lk;
    const card = X.ab({ left: 90, top: 290, width: 900, fontFamily: FONT, color: BONE, background: 'rgba(30,42,28,.95)', borderRadius: '16px', padding: '14px 28px 18px', borderBottom: `9px solid ${AMBER}`, opacity: 0, textAlign: 'center' }, root,
      `<div style="font-size:52px;font-weight:800">🧍 +${V.follow} penyintas <span style="font-size:30px;color:${AMBER}">(follow)</span></div><div style="font-size:30px;font-weight:800;color:${AMBER};margin-top:10px;letter-spacing:1px">❤️ LIKE GABUNGAN TIKTOK + IG + YOUTUBE</div>` +
      `<div style="font-size:40px;font-weight:700">${L.tt} + ${L.ig} + ${L.yt} = ${V.like}</div><div style="font-size:56px;font-weight:800;color:${AMBER}">= ${V.unit} karung & ikat</div>`);
    return { scene: sc, cam, upd(t, dur) { const tw = [at(s, 'army', 1.5), at(s, 'anak', 2.2), at(s, 'pemanah', 3)], tf = at(s, 'Follow', dur * .5);
      ppl.forEach((p, i) => p.pose(t, { cheer: t > tw[i] && t < tw[i] + 1.2 })); Ph.userData.st.arms[1].rotation.x = t > tw[2] ? -1.5 : Ph.userData.st.arms[1].rotation.x;
      const p = ease(t, 0, tf), q = ease(t, tf - .3, tf + .9); cam.position.set(...LERP3(LERP3(W(bp, [0, 2.2, 18]), W(bp, [0, 2, 16.5]), p), W(bp, [6, 5, 20]), q)); cam.lookAt(...LERP3(W(bp, [0, 1.3, 8]), W(bp, [0, 2, 0]), q));
      show(box, seg(t, .1, .4) * (1 - seg(t, tf - .3, tf))); its.forEach((e, i) => e.style.opacity = seg(t, tw[i] - .1, tw[i] + .2)); show(card, seg(t, tf, tf + .4)) } };
  },
  B4_AJAK(s, root) {   // POV menara utara malam: bukit gelap, gerombolan kecil di kejauhan; hitung mundur + A/B; tanya "berapa lawan berapa"
    const sc = MALAM({ sky: ['#141E50', '#4E4A8A'], fog: ['#2E3670', 50, 230] }); const D = desaTerakhir(sc); D.obor(1); const G1 = gerombolan(sc, 900, [0, 0, -86], 80, 22);
    const cam = camera(44); const bw = new THREE.Mesh(new THREE.TorusGeometry(.5, .025, 6, 24, Math.PI), new THREE.MeshStandardMaterial({ color: grade('#7A4E2A') })); cam.add(bw); sc.add(cam); bw.scale.setScalar(.6); bw.position.set(.62, -.62, -1.5); bw.rotation.set(0, 0, Math.PI / 2);
    const cd = X.ab({ left: 0, top: 260, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, color: '#FFB4A8', fontSize: '54px', textShadow: '0 4px 14px #000', opacity: 0 }, root, '⏳ SERANGAN: 2 MALAM LAGI');
    const card = (k, t, c) => `<div style="background:rgba(30,42,28,.95);border-radius:16px;padding:14px 18px 18px;border-bottom:9px solid ${c};width:440px;box-shadow:0 14px 30px #0008"><div style="font-size:92px;font-weight:800;color:${c};line-height:1">${k}</div><div style="font-size:40px;font-weight:800;color:${BONE};line-height:1.1">${t}</div></div>`;
    const ab = X.ab({ left: 60, top: 350, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', textAlign: 'center', fontFamily: FONT, opacity: 0 }, root, card('A', '🔭 KIRIM PENGINTAI KE UTARA', '#9AD07A') + card('B', '🚪 TUTUP SEMUA, PERKUAT GERBANG', '#FFB4A8'));
    const end = BIG(root, 'kali ini<br>BERAPA LAWAN BERAPA?', { top: 680, fontSize: '70px', color: AMBER, lineHeight: '1.05' });
    return { scene: sc, cam, upd(t, dur) { G1.upd(t); const ta = at(s, 'A,', dur * .35), tk = at(s, 'Kali', dur * .8);
      cam.position.set(Math.sin(t * .6) * .1, 7.5, -RF + 5); cam.lookAt(lerp(-2, 2, ease(t, 0, dur)), 19, -100);
      show(cd, seg(t, .2, .6)); show(ab, seg(t, ta, ta + .4)); pulse(end, seg(t, tk, tk + .35)) } };
  },
};
