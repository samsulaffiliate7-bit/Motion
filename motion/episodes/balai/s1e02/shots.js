// Shot Desa Terakhir S1 Ep 2 "Karantina" (lihat STORYBOARD.md).
import { THREE, lerp, seg, E, mesh, G, group, camera, grade } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane, cat } from '../../../engine/w3d/desa3d.js';
import { SIANG, SENJA, gilang, yati, kardi, sinta, warga, desaTerakhir, SPOT, RF, karung, ikatBambu, bambu, BIG, TAG, show, pulse, ease, FONT, BONE, AMBER, RUST } from '../_s1/dunia.js';

const W = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
const M4 = new THREE.Matrix4(), Q = new THREE.Quaternion(), V3 = new THREE.Vector3(), S3 = new THREE.Vector3(), COL = new THREE.Color();
// antrean ratusan penyintas (InstancedMesh: badan kapsul + kepala), dari gerbang menyusuri jalan sawah
function antrean(sc, n = 520, z0 = RF + 2.5) {
  const body = new THREE.InstancedMesh(new THREE.CapsuleGeometry(.17, .75, 3, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .7 }), n);
  const head = new THREE.InstancedMesh(new THREE.SphereGeometry(.17, 10, 8), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .6 }), n);
  const C = ['#B5452B', '#3E86B0', '#E8B94A', '#6E9A5C', '#8A5A9A', '#D9774A', '#F2EFE6', '#5E7A8A'], K = ['#E2A97E', '#C98E64', '#B97A52'];
  const P = Array.from({ length: n }, (_, i) => { const row = Math.floor(i / 2), side = i % 2 ? .55 : -.55; const z = z0 + row * .62 + Math.sin(i * 1.7) * .08, x = side + Math.sin(row * .23) * 1.3 + Math.sin(i) * .1; return [x, z] });
  P.forEach(([x, z], i) => { M4.compose(V3.set(x, .72, z), Q.identity(), S3.set(1, 1, 1)); body.setMatrixAt(i, M4); body.setColorAt(i, COL.set(grade(C[i % 8])));
    M4.compose(V3.set(x, 1.42, z), Q, S3.set(1, 1, 1)); head.setMatrixAt(i, M4); head.setColorAt(i, COL.set(grade(K[i % 3]))) });
  body.castShadow = head.castShadow = true; sc.add(body); sc.add(head);
  return { P, body, head, sway: t => { P.forEach(([x, z], i) => { const y = Math.abs(Math.sin(t * 3 + i)) * .04; M4.compose(V3.set(x, .72 + y, z), Q.identity(), S3.set(1, 1, 1)); body.setMatrixAt(i, M4); M4.compose(V3.set(x, 1.42 + y, z), Q, S3.set(1, 1, 1)); head.setMatrixAt(i, M4) }); body.instanceMatrix.needsUpdate = head.instanceMatrix.needsUpdate = true } };
}
// hutan bambu (instanced batang tinggi + daun) di barat daya luar pagar
function hutanBambu(sc, cx = -34, cz = RF + 26, r = 16, n = 700) {
  const st = new THREE.InstancedMesh(new THREE.CylinderGeometry(.09, .11, 1, 6), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .8, flatShading: true }), n);
  const lf = new THREE.InstancedMesh(new THREE.ConeGeometry(.7, 1.6, 6), new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: .8, flatShading: true }), n);
  let s = 5; const R = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < n; i++) { const a = R() * 6.28, d = Math.sqrt(R()) * r, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d * .8, h = 6 + R() * 5, lean = (R() - .5) * .25;
    Q.setFromEuler(new THREE.Euler(lean, 0, lean)); M4.compose(V3.set(x, h / 2, z), Q, S3.set(1, h, 1)); st.setMatrixAt(i, M4); st.setColorAt(i, COL.set(grade(['#8FB04A', '#A6BE5A', '#7A9A3E'][i % 3])));
    M4.compose(V3.set(x, h, z), Q, S3.set(1, 1, 1)); lf.setMatrixAt(i, M4); lf.setColorAt(i, COL.set(grade(['#5E9A3E', '#6EA848', '#4E8A3A'][i % 3]))) }
  st.castShadow = lf.castShadow = true; sc.add(st); sc.add(lf); return { cx, cz };
}
function barak(parent, p, n = 6) {   // barak karantina: deret bilik bambu bernomor, papan "1 KAMAR 1 ORANG"
  const g = group(parent, p);
  for (let i = 0; i < n; i++) { const b = group(g, [i * 2.2, 0, 0]); b.add(mesh(G.box(2, 2.2, 2), '#D6BE7A', [0, 1.1, 0])); b.add(mesh(G.box(.9, 1.6, .05), '#5A3E22', [0, .8, 1.01], { cast: false }));
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), new THREE.MeshStandardMaterial({ color: grade('#B89A5A'), flatShading: true })); r.scale.set(1.7, .8, 1.7); r.rotation.y = Math.PI / 4; r.position.y = 2.6; r.castShadow = true; b.add(r);
    const no = canvasPlane(.5, .4, (x, W2, H) => { x.fillStyle = '#F3E9D2'; x.fillRect(0, 0, W2, H); x.fillStyle = '#B5452B'; x.font = `800 ${H * .7}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(i + 1), W2 / 2, H / 2 + 2) }, 120); no.position.set(0, 1.85, 1.03); b.add(no) }
  const pp = canvasPlane(4.4, .8, (x, W2, H) => { x.fillStyle = '#1E2A1C'; x.fillRect(0, 0, W2, H); x.fillStyle = '#F2B33D'; x.font = `800 ${H * .5}px Poppins`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('KARANTINA · 1 KAMAR 1 ORANG', W2 / 2, H / 2 + 3) }, 700);
  pp.position.set((n - 1) * 1.1, 3.4, 1.1); g.add(pp); return g;
}
function meja(parent, p) { const g = group(parent, p); g.add(mesh(G.box(2, .1, 1), '#9C7A46', [0, .9, 0])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => g.add(mesh(G.box(.08, .9, .08), '#7A5E30', [x * .9, .45, z * .42]))); g.add(mesh(G.box(.35, .02, .45), '#FFFFFF', [.4, .96, 0], { cast: false })); return g }
function senter(person) { const k = group(person.userData.st.arms[1].userData.elbow, [0, -.31, 0]); k.add(mesh(G.cyl(.04, .05, .2, 10), '#3A3A44', [0, -.08, .06], { rot: [1.3, 0, 0] })); const b = new THREE.Mesh(new THREE.ConeGeometry(.25, 1.1, 14, 1, true), new THREE.MeshBasicMaterial({ color: '#FFF6C8', transparent: true, opacity: .35, depthWrite: false, side: THREE.DoubleSide })); b.rotation.x = -Math.PI / 2 + 1.3; b.position.set(0, -.04, .7); k.add(b); return b }
function ayam(parent, p) { const g = group(parent, p); g.add(mesh(G.sph(.28, 10, 8), '#F4F0E6', [0, .4, 0], { s: [1.2, 1, 1] })); g.add(mesh(G.sph(.15, 8, 6), '#F4F0E6', [.3, .7, 0])); g.add(mesh(G.cone(.05, .12, 4), '#E8A030', [.47, .7, 0], { rot: [0, 0, -Math.PI / 2] }));
  g.add(mesh(G.box(.1, .12, .04), '#D93B3B', [.3, .88, 0])); g.add(mesh(G.cone(.18, .3, 5), '#F4F0E6', [-.38, .55, 0], { rot: [0, 0, .9] })); [-1, 1].forEach(z => g.add(mesh(G.cyl(.02, .02, .25, 4), '#E8A030', [0, .12, z * .1]))); return g }
const LABEL = (root, a, b, top = 330) => X.ab({ left: 60, top, width: 960, textAlign: 'center', opacity: 0, fontFamily: FONT }, root,
  `<div style="display:inline-block;background:rgba(30,42,28,.94);color:${BONE};border-radius:12px;padding:12px 30px 16px;box-shadow:0 12px 28px #0000005c;border-bottom:8px solid ${AMBER}"><div style="font-size:58px;font-weight:800;color:${AMBER}">${a}</div><div style="font-size:38px;font-weight:700">${b}</div></div>`);

export const SHOTS = {
  B2_ANTRE(s, root) {   // frame 1: antrean ratusan orang mengular dari ujung sawah ke gerbang; papan posko 72 -> 765
    const sc = SIANG({ sky: ['#78B4E2', '#F2E6CC'], fog: ['#EDE4CE', 120, 360] }); const D = desaTerakhir(sc); D.gate.userData.set(Math.PI / 2 * .95); const A = antrean(sc); const V = X.TL.vars; const cam = camera(42);
    const big = BIG(root, '', { top: 330, fontSize: '110px' }); const sub = BIG(root, 'antre di gerbang', { top: 470, fontSize: '54px', color: AMBER });
    return { scene: sc, cam, upd(t, dur) { A.sway(t); const n = Math.round(lerp(V.pen0, V.pen, E.out(seg(t, 0, dur - .8)))); big.innerHTML = `🧍 ${n}`; D.posko.userData.setN(n);
      const p = E.inout(seg(t, 0, dur)); cam.position.set(lerp(6, 4, p), lerp(9, 4.5, p), lerp(RF + 120, RF + 14, p)); cam.lookAt(0, lerp(1, 1.6, p), lerp(RF + 80, RF, p)); big.style.opacity = 1; show(sub, seg(t, .3, .7)) } };
  },
  B2_REKAP(s, root) {   // Gilang di gerbang dalam, rekap pilihan PERIKSA
    const sc = SIANG(); const D = desaTerakhir(sc, { hole: (x, z) => z > 22 && Math.abs(x) < 14 }); D.gate.userData.set(Math.PI / 2 * .95); antrean(sc, 200); const J = gilang([1, 0, RF - 5]); J.rotation.y = Math.PI + .3; sc.add(J); const cam = camera(42);
    const l = LABEL(root, 'PILIHAN KALIAN: 🩺 PERIKSA', `penyintas sekarang ${X.TL.vars.pen}`);
    return { scene: sc, cam, upd(t, dur) { J.pose(t, { talk: true, point: t > 1 && t < 3 }); const p = ease(t, 0, dur); cam.position.set(lerp(2.4, 1.8, p), lerp(1.8, 1.7, p), lerp(RF - 10.5, RF - 9.5, p)); cam.lookAt(.5, 1.5, RF + 3); show(l, seg(t, .3, .7)) } };
  },
  B2_PERIKSA(s, root) {   // pos periksa: Bu Yati menyenter lengan, Sinta mencatat; barak karantina dijaga Pak Kardi
    const sc = SIANG({ sky: ['#7DB8E0', '#F4E4C8'] }); const D = desaTerakhir(sc, { hole: (x, z) => z > 22 && x < 16 && x > -18 }); D.gate.userData.set(Math.PI / 2 * .95);
    const mp = [-2, 0, RF - 8]; meja(sc, mp); const Y = yati(W(mp, [-1.1, 0, -.9])); Y.rotation.y = .7; const S = sinta(W(mp, [1.3, 0, -.9])); S.rotation.y = -.4; const P = warga(W(mp, [0, 0, 1.3]), 5); P.rotation.y = Math.PI; [Y, S, P].forEach(x => sc.add(x));
    const beam = senter(Y); const bk = barak(sc, [-14, 0, RF - 16]); const K = kardi([-8.5, 0, RF - 13]); K.rotation.y = .4; sc.add(K); const cam = camera(42);
    const t1 = TAG(root, '🔦 cek lengan · cek leher', { left: 260, top: 330, fontSize: '42px' }); const t2 = LABEL(root, '🏠 KARANTINA', '1 kamar · 1 orang · dijaga');
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'karantina', dur * .55); Y.pose(t, { hold: true, look: .3 }); beam.material.opacity = .25 + Math.sin(t * 5) * .08; S.pose(t, { nod: true }); P.pose(t); P.userData.st.arms[0].rotation.x = -1.2; K.pose(t, { look: Math.sin(t) * .5 });
      const z = ease(t, tk - .8, tk + .6); const c0 = W(mp, [2.8, 1.7, 4.2]), c1 = [-5, 3.4, RF - 4]; cam.position.set(lerp(c0[0], c1[0], z), lerp(c0[1], c1[1], z), lerp(c0[2], c1[2], z));
      const l0 = W(mp, [-.3, 1.2, 0]), l1 = [-9, 1.4, RF - 16]; cam.lookAt(lerp(l0[0], l1[0], z), lerp(l0[1], l1[1], z), lerp(l0[2], l1[2], z)); show(t1, seg(t, .5, .9) * (1 - seg(t, tk - .6, tk - .2))); show(t2, seg(t, tk, tk + .4)) } };
  },
  B2_GUDANG(s, root) {   // gudang penuh + papan usulan warga
    const sc = SIANG(); const D = desaTerakhir(sc, { hole: (x, z) => x > -20 && x < 0 && z > -22 && z < -2 }); const gp = SPOT.gudang;
    for (let i = 0; i < 24; i++) { const r = i % 6, c = Math.floor(i / 6) % 2, h = Math.floor(i / 12); const p = [gp[0] + 3.2 + c * 1.4 + h * .4, h * .75, gp[2] - 3.5 + r * 1.2]; i % 2 ? ikatBambu(sc, p, .8) : karung(sc, p, 1) }
    const pb = group(sc, [gp[0] + 9, 0, gp[2] - 3]); pb.rotation.y = .64; [-1, 1].forEach(x => pb.add(mesh(G.box(.12, 2.8, .12), '#5A3E22', [x * 1.4, 1.4, 0])));
    const board = canvasPlane(3, 2, (x, Wd, H) => { x.fillStyle = '#F3E9D2'; x.fillRect(0, 0, Wd, H); x.strokeStyle = '#5A3E22'; x.lineWidth = 14; x.strokeRect(0, 0, Wd, H); x.fillStyle = '#B5452B'; x.font = `800 ${H * .12}px Poppins`; x.textAlign = 'center'; x.fillText('USULAN WARGA', Wd / 2, H * .17);
      x.textAlign = 'left'; x.fillStyle = '#1E2A1C'; x.font = `700 ${H * .095}px Poppins`; ['• parit keliling', '• lonceng tanda bahaya', '• jaga bergilir', '• panah & bambu runcing', '• pagar bata / batu'].forEach((t, i) => x.fillText(t, Wd * .1, H * (.35 + i * .14))) }, 700);
    board.position.set(0, 1.9, .08); pb.add(board); const S = sinta([gp[0] + 7.5, 0, gp[2] - .5]); S.rotation.y = -2; sc.add(S); const cam = camera(42); const V = X.TL.vars;
    const c = X.ab({ left: 0, top: 560, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, color: BONE, textShadow: '0 4px 14px rgba(0,0,0,.85)', opacity: 0 }, root, `<div style="font-size:54px">❤️ ${V.like.toLocaleString('id-ID')} like</div><div style="font-size:72px;color:${AMBER}">= ${V.unit} karung & ikat</div>`);
    return { scene: sc, cam, upd(t, dur) { S.pose(t, { point: true, talk: true }); const tu = at(s, 'Usulan', dur * .5); const z = ease(t, tu - .6, tu + .6);
      const c0 = [gp[0] + 13, 3, gp[2] + 5.5], c1 = [gp[0] + 15.5, 2.4, gp[2] + 3]; cam.position.set(lerp(c0[0], c1[0], z), lerp(c0[1], c1[1], z), lerp(c0[2], c1[2], z)); cam.lookAt(lerp(gp[0] + 4, gp[0] + 9, z), lerp(.9, 1.8, z), lerp(gp[2] - 1, gp[2] - 3, z));
      show(c, seg(t, .3, .6) * (1 - seg(t, tu - .5, tu - .1))) } };
  },
  B2_LUCU(s, root) {   // usul "gigit balik zombie" dicap DITOLAK; Pak Kardi "kapten pedang" pingsan lihat ayam
    const sc = SIANG(); const D = desaTerakhir(sc, { hole: (x, z) => z > 22 && x < 16 && x > -18 }); const mp = [-2, 0, RF - 8]; meja(sc, mp);
    const Y = yati(W(mp, [-1, 0, -.9])); Y.rotation.y = .5; sc.add(Y); const K = kardi(W(mp, [3, 0, .5])); K.rotation.y = -1.2; sc.add(K); const A = ayam(sc, W(mp, [5.5, 0, 1])); A.rotation.y = Math.PI;
    const pedang = mesh(G.box(.05, .9, .02), '#C9CED6', [0, -.5, .1], { mat: { metalness: .7, roughness: .3 } }); K.userData.st.arms[1].userData.elbow.add(pedang); const cam = camera(42);
    const kertas = X.ab({ left: 170, top: 330, width: 740, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '46px', color: '#1E2A1C', background: '#FBF7EC', borderRadius: '12px', padding: '18px', boxShadow: '0 14px 30px #0008', opacity: 0 }, root, '💡 USUL: "gigit balik zombienya"');
    const cap = X.ab({ left: 380, top: 400, border: `8px solid ${RUST}`, color: RUST, borderRadius: '12px', padding: '4px 22px', fontFamily: FONT, fontWeight: 800, fontSize: '60px', transform: 'rotate(-10deg)', opacity: 0, background: 'rgba(251,247,236,.85)' }, root, 'DITOLAK');
    const kp = TAG(root, '⚔ "kapten pedang"', { left: 330, top: 330, fontSize: '44px' });
    return { scene: sc, cam, upd(t, dur) { const td = at(s, 'Ditolak', 2.6), tk = at(s, 'Pak Kardi', dur * .45), tp = at(s, 'pingsan', dur - 1.2);
      Y.pose(t, { shake: t > td && t < td + 1.2 }); const f = E.in(seg(t, tp - .2, tp + .4)); K.rotation.x = 0; K.rotation.z = f * 1.45; K.position.y = f * .1; K.pose(t, { cheer: t > tk && t < tp - .6 }); A.position.x = mp[0] + lerp(5.5, 4, seg(t, tp - 1.2, tp)); A.rotation.z = Math.sin(t * 12) * .1 * (t > tp - 1.2 ? 1 : 0);
      const z = ease(t, tk - .6, tk + .4); const c0 = W(mp, [.2, 1.8, 5.5]), c1 = W(mp, [3.8, 1.5, 6]); cam.position.set(lerp(c0[0], c1[0], z), lerp(c0[1], c1[1], z), lerp(c0[2], c1[2], z)); cam.lookAt(lerp(mp[0] - .4, mp[0] + 3.6, z), lerp(1.3, .9, z), mp[2] + .2);
      show(kertas, seg(t, .2, .5) * (1 - seg(t, tk - .5, tk - .1))); const c = seg(t, td - .1, td + .25); cap.style.opacity = c > 0 && t < tk - .1 ? 1 : 0; cap.style.transform = `rotate(-10deg) scale(${c > 0 ? 1.8 - .8 * E.out(c) : 1.8})`; show(kp, seg(t, tk, tk + .3) * (1 - seg(t, tp - .2, tp))) } };
  },
  B2_KABUR(s, root) {   // lega: cuma cakar kucing; lalu satu orang keluar antrean dan lari ke hutan bambu
    const sc = SENJA({ sky: ['#6C86C2', '#F6B884'] }); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(Math.PI / 2 * .95); const A = antrean(sc, 260); const H = hutanBambu(sc);
    const mp = [-2, 0, RF - 8]; meja(sc, mp); const Y = yati(W(mp, [-1, 0, -.9])); Y.rotation.y = .6; const P = warga(W(mp, [0, 0, 1.3]), 4); P.rotation.y = Math.PI; [Y, P].forEach(x => sc.add(x)); const C = cat(sc, W(mp, [1.6, 0, 1.6])); C.rotation.y = 2.4;
    const R = warga([.55, 0, RF + 20], 7); sc.add(R); const cam = camera(42); const rw = X.ab({ left: 0, top: 0 }, root); const re = TAG(rw, '⚠ nolak diperiksa', { position: 'relative', left: 0, top: 0, transform: 'translate(-50%,-100%)', fontSize: '34px' });
    const ok = LABEL(root, '✅ CUMA CAKAR KUCING', 'lega...'); const warn = BIG(root, '⚠ KABUR!', { top: 330, fontSize: '110px', color: '#FFB4A8' });
    return { scene: sc, cam, upd(t, dur) { A.sway(t); const tk = at(s, 'Tapi', dur * .45), tr = at(s, 'kabur', dur - 1.6); Y.pose(t, { nod: t < tk }); P.pose(t, { cheer: t > 1.5 && t < tk }); C.userData.tail.rotation.z = .6 + Math.sin(t * 6) * .3; C.position.x = mp[0] + 1.6 + Math.sin(t) * .3;
      const run = seg(t, tr - 1.2, dur); R.position.set(lerp(.55, H.cx + 8, E.in(run)), 0, lerp(RF + 20, H.cz - 4, run)); R.rotation.y = -2.2; R.pose(t, { walk: run > 0 ? 2.2 : 0, look: run > 0 ? 0 : .6 });
      if (t < tk) { const p = ease(t, 0, tk); cam.position.set(...W(mp, [lerp(2.6, 2, p), 1.6, lerp(4.2, 3.6, p)])); cam.lookAt(...W(mp, [.3, 1.1, .8])) }
      else { const p = ease(t, tk, dur); cam.position.set(lerp(9, 6, p), lerp(8, 6.5, p), lerp(RF + 4, RF + 6, p)); cam.lookAt(lerp(.5, -10, p), 1, lerp(RF + 20, RF + 22, p)) }
      show(ok, seg(t, .9, 1.3) * (1 - seg(t, tk - .3, tk))); pulse(warn, seg(t, tr - .2, tr + .2)); const [px, py] = X.proj(R, cam, [0, 2.2, 0]); rw.style.left = Math.max(200, Math.min(880, px)) + 'px'; rw.style.top = py + 'px'; re.style.opacity = t > tk + .3 ? 1 : 0 } };
  },
  B2_AJAK(s, root) {   // gerbang senja menghadap hutan bambu; tiga pilihan pertahanan
    const sc = SENJA({ sky: ['#5E6FAE', '#F0A07E'] }); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(Math.PI / 2 * .95); hutanBambu(sc);
    const J = gilang([-.6, 0, RF + 8.6]); J.rotation.y = -1.1; const S = sinta([-1.6, 0, RF + 9.2]); S.rotation.y = -2.1; const Y = yati([-2.4, 0, RF + 10.6]); Y.rotation.y = -2.2; [J, S, Y].forEach(p => sc.add(p)); const cam = camera(44);
    const q = X.ab({ left: 40, top: 1150, width: 1000, textAlign: 'center', opacity: 0, fontFamily: FONT }, root,
      `<div style="font-size:32px;font-weight:800;color:${BONE};letter-spacing:3px;text-shadow:0 4px 14px #000">BESOK (HARI KE-3) KITA BANGUN:</div><div style="display:flex;gap:10px;justify-content:center;margin-top:14px">` +
      ['🌊 PARIT KELILING', '🧱 TEMBOK BATA', '🏹 MENARA PANAH'].map(x => `<div style="background:rgba(30,42,28,.95);color:${BONE};font-size:32px;font-weight:800;padding:12px 16px;border-radius:12px;border-bottom:6px solid ${AMBER};white-space:nowrap">${x}</div>`).join('') + '</div>');
    return { scene: sc, cam, upd(t, dur) { const tq = at(s, 'Sebelum', 2); J.pose(t, { point: t > tq, talk: true }); S.pose(t, { look: -.3 }); Y.pose(t);
      const p = ease(t, 0, dur); cam.position.set(lerp(5.5, 4.5, p), lerp(2.6, 2.4, p), lerp(RF + 3.5, RF + 4.2, p)); cam.lookAt(lerp(-5, -9, p), 1.8, lerp(RF + 12, RF + 18, p)); show(q, seg(t, tq + .4, tq + .8)) } };
  },
};
