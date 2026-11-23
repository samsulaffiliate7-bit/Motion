// Shot Desa Terakhir S1 Ep 3 "Dua Kelompok" (lihat STORYBOARD.md).
import { THREE, lerp, seg, E, mesh, G, group, camera, grade } from '../../../engine/w3d/kit.js';
import { X, at } from '../../../engine/w3d/desa3d.js';
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

export const SHOTS = {
  B3_HOOK(s, root) {   // detik 0: kentongan + EPISODE 3 · KALIAN PILIH DUA-DUANYA; alun-alun terbelah dua kelompok (A biru, B kuning)
    const sc = SENJA({ sky: ['#7C8EC4', '#F6C08E'], sunPos: [-18, 14, 12] }); const D = desaTerakhir(sc, { hole: (x, z) => Math.abs(x) < 16 && z > 6 && z < 22 }); D.gate.userData.set(0);
    const A = kerumunan(sc, 170, [-6, 0, 14], 8, 10, CA, 3), B = kerumunan(sc, 170, [6, 0, 14], 8, 10, CB, 9); sc.add(mesh(G.box(.25, .05, 13), BONE, [0, .05, 14], { cast: false }));
    const J = gilang([0, 0, 7.5]); J.rotation.y = 0; sc.add(J); const cam = camera(42); const mA = group(sc, [-6, 0, 11]), mB = group(sc, [6, 0, 11]);
    const ep = X.ab({ left: 0, top: 250, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '50px', color: '#1E2A1C', letterSpacing: '6px' }, root, `<span style="background:${AMBER};padding:8px 26px;border-radius:10px">EPISODE 3</span>`);
    const big = BIG(root, 'KALIAN PILIH<br>DUA-DUANYA', { top: 340, fontSize: '112px', lineHeight: '1.02' }); big.style.opacity = 1;
    const jam = X.ab({ left: 0, top: 590, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '44px', color: BONE, textShadow: '0 4px 14px #000' }, root, 'HARI KE-3 · 16.40');
    const la = pin(root, '🅰 GALI PARIT', { borderLeft: `8px solid #5E9AC4` }), lb = pin(root, '🅱 MENARA PANAH', { borderLeft: `8px solid ${AMBER}` });
    return { scene: sc, cam, upd(t, dur) { A.upd(t); B.upd(t); J.pose(t, { talk: true, point: t > 2 }); const tb = at(s, 'dibelah', dur * .5);
      const p = E.out(seg(t, 0, dur)); cam.position.set(lerp(2, 0, p), lerp(30, 20, p), lerp(42, 34, p)); cam.lookAt(0, 0, lerp(11, 13, p));
      const k = seg(t, tb, tb + .4); la.e.style.opacity = lb.e.style.opacity = k; la.at(mA, cam, [0, 2, 0]); lb.at(mB, cam, [0, 2, 0]);
      const m = D.menara.userData.kentongan; m.rotation.z = Math.sin(t * 14) * .25 * Math.max(0, 1 - t / 2.2); jam.style.opacity = 1; big.style.opacity = 1 - seg(t, dur - .35, dur) } };
  },
  B3_KENAPA(s, root) {   // penjelas 1 kalimat: zombie menyeret di sawah, desa = satu-satunya lingkaran pagar; lalu angka penyintas
    const sc = SIANG({ sky: ['#86B6DE', '#F0E2C6'], fog: ['#E8E0CC', 120, 380] }); const D = desaTerakhir(sc); D.gate.userData.set(0);
    const Z = Array.from({ length: 22 }, (_, i) => { const a = Math.PI / 2 + .25 + (i - 11) * .07, d = RF + 10 + (i % 5) * 5 + (i * 7 % 3); const z = zombie([Math.cos(a) * d, 0, Math.sin(a) * d], i); z.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a)); sc.add(z); return { z, a, d } });
    const cam = camera(42); const V = X.TL.vars;
    const t1 = LABEL(root, '🧟 ZOMBIE DI LUAR', 'desa ini satu-satunya yang masih berpagar', 330, '#9AD07A');
    const num = BIG(root, '', { top: 320, fontSize: '128px' }); const sub = BIG(root, `+${V.follow} dari follow kalian`, { top: 480, fontSize: '50px', color: AMBER });
    return { scene: sc, cam, upd(t, dur) { const ts = at(s, 'Sekarang', dur * .7); Z.forEach(({ z, a, d }, i) => { const dd = d - t * .5; z.position.set(Math.cos(a) * dd, 0, Math.sin(a) * dd); z.shamble(t + i) });
      const p = ease(t, 0, ts); const q = ease(t, ts - .3, ts + 1); const c0 = LERP3([22, 6, RF + 44], [18, 40, RF + 58], p), c1 = [6, 4.5, RF + 22];
      cam.position.set(...LERP3(c0, c1, q)); const l0 = LERP3([0, 1, RF + 12], [0, 0, 6], p), l1 = [0, 2.2, RF]; cam.lookAt(...LERP3(l0, l1, q));
      show(t1, seg(t, .4, .8) * (1 - seg(t, ts - .5, ts - .1))); const n = Math.round(lerp(V.pen - V.follow, V.pen, E.out(seg(t, ts + .2, ts + 2)))); num.innerHTML = `🧍 ${n}`; D.posko.userData.setN(n); show(num, seg(t, ts, ts + .3)); show(sub, seg(t, ts + .6, ts + 1)) } };
  },
  B3_BANGUN(s, root) {   // A: gali parit di luar pagar (cangkul) -> B: menara panah sudut tenggara -> pramuka latihan memanah
    const sc = SIANG({ sky: ['#7DB8E0', '#F4E6CC'] }); const tw = [27, 0, 27]; const D = desaTerakhir(sc, { hole: (x, z) => Math.hypot(x - tw[0], z - tw[2]) < 15 }); D.gate.userData.set(Math.PI / 2 * .95);
    const PR = parit(sc); const aD = Math.PI / 2 - .32, gl = [];   // titik gali di luar pagar sebelah timur gerbang
    for (let i = 0; i < 5; i++) { const a = aD - i * .05, r = PR.r + (i % 2 ? .9 : -.9) * .6; const w = warga([Math.cos(a) * r, -.25, Math.sin(a) * r], i, { body: CA[i % 4] }); w.rotation.y = -a + (i % 2 ? Math.PI : 0); cangkul(w); sc.add(w); gl.push(w) }
    const M = menara(sc, tw); const bk = []; for (let i = 0; i < 4; i++) { const w = warga(W(tw, [-3 + i * 1.6, 0, -3.4 + (i % 2) * .6]), i + 2, { body: CB[i % 4] }); w.rotation.y = .2; sc.add(w); bk.push(w) }
    const ik = ikatBambu(sc, W(tw, [2.6, 0, -3]), .9); const tg = sasaran(sc, W(tw, [-12, 0, -1])); tg.rotation.y = Math.PI / 2;
    const kids = [0, 1, 2].map(i => { const k = warga(W(tw, [-4, 0, -4 + i * 1.3]), i, { s: .72, body: '#B89A5A', pants: '#6E5A3A' }); k.rotation.y = -Math.PI / 2; busur(k); sc.add(k); return k });
    const ar = [0, 1, 2].map(() => panah(sc)); const cam = camera(42);
    const ta = TAG(root, '🅰 KELOMPOK A · gali parit', { borderLeft: '8px solid #5E9AC4', left: 200 }), tb = TAG(root, '🅱 KELOMPOK B · menara panah', { left: 170 }), tp = TAG(root, '🏹 pramuka latihan memanah', { left: 210 });
    return { scene: sc, cam, upd(t, dur) { const tB = at(s, 'Kelompok B', dur * .35), tP = at(s, 'Anak pramuka', dur * .7);
      PR.set(.1 + .06 * E.out(seg(t, 0, tB)) + .1 * seg(t, tB, dur));
      gl.forEach((w, i) => { w.pose(t); const st = w.userData.st; const sw = Math.sin(t * 5 + i * 1.3); st.arms[1].rotation.x = -1.4 + sw * .9; st.arms[0].rotation.x = -1.2 + sw * .7; st.body.rotation.x = .25 + sw * .12 });
      bk.forEach((w, i) => { w.pose(t, { cheer: i % 2 === 0 && Math.sin(t * 2 + i) > .3, walk: 0 }); w.userData.st.arms.forEach(A => A.rotation.x = -2.6 + Math.sin(t * 3 + i) * .2) });
      M.position.y = lerp(-6.4, 0, E.out(seg(t, tB, tB + 1.6))); ik.position.y = 0;
      kids.forEach((k, i) => { k.pose(t); const st = k.userData.st; st.arms[1].rotation.x = -1.5; st.arms[0].rotation.x = -1.5 + Math.sin(t * 2 + i) * .1 });
      ar.forEach((a, i) => { const per = 1.1, u = ((t - tP - i * .35) % per + per) % per / per, on = t > tP + i * .35; const p0 = W(kids[i].position.toArray(), [-.3, 1.1, -.3]), p1 = W(tg.position.toArray(), [0, 1.2, 0]);
        a.visible = on; a.position.set(lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u) + Math.sin(u * Math.PI) * 1.2, lerp(p0[2], p1[2], u)); a.lookAt(p1[0], p1[1], p1[2]); a.rotateY(-Math.PI / 2) });
      let cp, cl; const gp = [Math.cos(aD - .1) * PR.r, 0, Math.sin(aD - .1) * PR.r];
      if (t < tB) { const p = ease(t, 0, tB); cp = W(gp, [lerp(10, 8, p), lerp(5.5, 4.5, p), lerp(12, 10, p)]); cl = W(gp, [-2, .4, -1]) }
      else if (t < tP) { const p = ease(t, tB, tB + 1.2); cp = LERP3(W(gp, [8, 4.5, 10]), W(tw, [-13, 6.5, -15]), p); cl = LERP3(W(gp, [-2, .4, -1]), W(tw, [0, 3.4, 0]), p) }
      else { const p = ease(t, tP - .1, tP + 1); cp = LERP3(W(tw, [-13, 6.5, -15]), W(tw, [-7, 2.6, -8]), p); cl = LERP3(W(tw, [0, 3.4, 0]), W(tw, [-8, 1, -2]), p) }
      cam.position.set(...cp); cam.lookAt(...cl);
      show(ta, seg(t, .3, .6) * (1 - seg(t, tB - .3, tB))); show(tb, seg(t, tB + .2, tB + .5) * (1 - seg(t, tP - .3, tP))); show(tp, seg(t, tP + .2, tP + .5)) } };
  },
  B3_LIKE(s, root) {   // gudang: kartu LIKE GABUNGAN TIKTOK + IG + YOUTUBE dengan rincian; karung & ikat bertambah
    const sc = SIANG(); const D = desaTerakhir(sc, { hole: (x, z) => x > -20 && x < 0 && z > -22 && z < -2 }); const gp = SPOT.gudang;
    const st = []; for (let i = 0; i < 26; i++) { const r = i % 6, c = Math.floor(i / 6) % 2, h = Math.floor(i / 12); const p = [gp[0] + 3.2 + c * 1.4 + h * .4, h * .75, gp[2] - 3.5 + r * 1.2]; st.push(i % 2 ? ikatBambu(sc, p, .8) : karung(sc, p, 1)) }
    const S = sinta([gp[0] + 7.5, 0, gp[2] - .5]); S.rotation.y = -2; sc.add(S); const K = gilang([gp[0] + 8.5, 0, gp[2] + .8]); K.rotation.y = -2.3; sc.add(K); const cam = camera(42); const V = X.TL.vars, L = V.lk;
    const row = (ic, nm, n) => `<div style="display:flex;justify-content:space-between;font-size:44px;font-weight:700;padding:6px 0;border-bottom:2px dashed #F3E9D244"><span>${ic} ${nm}</span><span style="color:${AMBER}">${n}</span></div>`;
    const card = X.ab({ left: 150, top: 300, width: 780, fontFamily: FONT, color: BONE, background: 'rgba(30,42,28,.95)', borderRadius: '16px', padding: '22px 34px 24px', boxShadow: '0 16px 34px #0008', borderBottom: `9px solid ${AMBER}`, opacity: 0 }, root,
      `<div style="font-size:36px;font-weight:800;letter-spacing:2px;color:${AMBER};text-align:center">❤️ LIKE GABUNGAN</div><div style="font-size:34px;font-weight:800;text-align:center;margin-bottom:8px">TIKTOK + IG + YOUTUBE</div>` +
      row('🎵', 'TikTok', L.tt) + row('📸', 'Instagram', L.ig) + row('▶️', 'YouTube', L.yt) + `<div style="display:flex;justify-content:space-between;font-size:54px;font-weight:800;padding-top:10px"><span>TOTAL</span><span style="color:${AMBER}">${V.like}</span></div>`);
    const res = BIG(root, `= ${V.unit} karung & ikat`, { top: 960, fontSize: '68px', color: AMBER });
    return { scene: sc, cam, upd(t, dur) { S.pose(t, { point: true, talk: true }); K.pose(t, { nod: true }); const tj = at(s, 'Jadi', dur * .6);
      st.forEach((g, i) => { g.visible = i < 13 || t > tj + (i - 13) * .08 }); const z = ease(t, tj - .4, tj + .8);
      cam.position.set(...LERP3([gp[0] + 14, 3.2, gp[2] + 6], [gp[0] + 11, 2.4, gp[2] + 3.5], z)); cam.lookAt(...LERP3([gp[0] + 5, 1.2, gp[2] - 1], [gp[0] + 4, .8, gp[2] - 1.5], z));
      show(card, seg(t, .2, .5)); show(res, seg(t, tj, tj + .35)) } };
  },
  B3_LUCU(s, root) {   // parit jadi; Pak Kardi bangga ngetes duluan, kepeleset, BYUR ke parit buatannya sendiri
    const sc = SIANG({ sky: ['#7DB8E0', '#F2E2C6'] }); const D = desaTerakhir(sc); D.gate.userData.set(Math.PI / 2 * .95); const PR = parit(sc); PR.set(.33);
    const a0 = Math.PI / 2 - .2, r0 = PR.r - 2.2, kp = [Math.cos(a0) * r0, 0, Math.sin(a0) * r0]; const K = kardi(kp); K.rotation.y = -a0 + Math.PI / 2 + Math.PI; sc.add(K);
    const J = gilang([Math.cos(a0 + .05) * (r0 - 1), 0, Math.sin(a0 + .05) * (r0 - 1)]); J.rotation.y = K.rotation.y + .5; sc.add(J); const Y = yati([Math.cos(a0 - .05) * (r0 - 1.3), 0, Math.sin(a0 - .05) * (r0 - 1.3)]); Y.rotation.y = K.rotation.y - .4; sc.add(Y);
    const spl = []; for (let i = 0; i < 14; i++) { const m = mesh(G.sph(.06, 6, 5), '#FFFFFF', [0, 0, 0], { cast: false, mat: { emissive: '#CFEFFF', emissiveIntensity: .6 } }); m.visible = false; sc.add(m); spl.push(m) }
    const cam = camera(42); const kk = TAG(root, '🫡 "saya yang ngetes duluan!"', { left: 180 }); const by = BIG(root, 'BYUR!', { top: 330, fontSize: '150px', color: '#BFE6FF' }); const sub = BIG(root, 'parit buatannya sendiri', { top: 500, fontSize: '52px', color: AMBER });
    const out = [Math.cos(a0) * PR.r, 0, Math.sin(a0) * PR.r];
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'Pak Kardi', dur * .35), tj = at(s, 'Jatuh', dur * .6); J.pose(t, { look: .3 }); Y.pose(t, { shake: t > tj + .3 });
      const w = seg(t, tk, tj), f = E.in(seg(t, tj - .05, tj + .35)); const p = LERP3(kp, out, w); K.position.set(p[0], -f * .95, p[2]); K.pose(t, { walk: w > 0 && w < 1 ? 1.4 : 0, cheer: t > tk - .3 && t < tk + .5 }); K.rotation.x = -f * .9; K.userData.st.arms.forEach(A => { if (f > 0) A.rotation.x = -3 + Math.sin(t * 20) * .3 });
      spl.forEach((m, i) => { const u = seg(t, tj + .25, tj + 1.1); m.visible = u > 0 && u < 1; const a = i / 14 * 6.28; m.position.set(out[0] + Math.cos(a) * u * 1.4, Math.sin(u * Math.PI) * (1 + (i % 3) * .4), out[2] + Math.sin(a) * u * 1.4) });
      const q = ease(t, 0, dur); cam.position.set(...LERP3(W(out, [-4.5, 2.6, 5]), W(out, [-3.5, 2, 3.8]), q)); cam.lookAt(...LERP3(W(kp, [0, 1, 0]), W(out, [0, .4, 0]), ease(t, tk, tj)));
      show(kk, seg(t, tk, tk + .3) * (1 - seg(t, tj - .2, tj))); pulse(by, seg(t, tj + .2, tj + .5)); show(sub, seg(t, tj + .6, tj + 1)) } };
  },
  B3_KETUK(s, root) {   // tengah malam: gerbang tertutup, sosok dari hutan bambu mengetuk; lengan dibalut kain
    const sc = MALAM(); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(0); const PR = parit(sc); PR.set(.12);
    const R = warga([.4, 0, RF + 1.1], 7); R.rotation.y = Math.PI; perban(R, 0); sc.add(R); const cam = camera(42);
    const tok = BIG(root, 'TOK · TOK · TOK', { top: 330, fontSize: '104px' }); const jam = TAG(root, '🕛 TENGAH MALAM · 00.12', { left: 260 }); const pb = pin(root, '🩹 lengannya dibalut kain', { fontSize: '38px' });
    return { scene: sc, cam, upd(t, dur) { const tt = at(s, 'Tok', 1), tb = at(s, 'balik', dur * .55), tl = at(s, 'Lengannya', dur * .75); R.pose(t);
      const st = R.userData.st, kn = t > tt && t < tt + 1.1; st.arms[1].rotation.x = kn ? -1.6 + Math.abs(Math.sin((t - tt) * Math.PI / .34)) * .5 : 0; st.arms[0].rotation.x = -.5; st.arms[0].userData.elbow.rotation.x = -1.2;
      let cp, cl; if (t < tb) { const p = ease(t, 0, tb); cp = LERP3([2, 7, RF + 16], [1.8, 2.2, RF + 6], p); cl = LERP3([0, 2, RF], [.3, 1.6, RF + 1], p) }
      else { const p = ease(t, tb, tl + .4); cp = LERP3([1.8, 2.2, RF + 6], [2.3, 1.7, RF + 4.2], p); cl = LERP3([.3, 1.6, RF + 1], [.1, 1.2, RF + 1.1], p) }
      cam.position.set(...cp); cam.lookAt(...cl); show(jam, seg(t, .1, .4) * (1 - seg(t, tt - .2, tt))); pulse(tok, seg(t, tt, tt + .3) * (1 - seg(t, tb - .3, tb)));
      pb.e.style.opacity = seg(t, tl, tl + .3); pb.at(st.arms[0].userData.elbow, cam, [0, .2, 0]) } };
  },
  B3_AJAK(s, root) {   // POV penjaga menara gerbang: busur di depan, sosok berperban di bawah; A/B besar; akhir nyambung ke awal
    const sc = MALAM(); const D = desaTerakhir(sc); D.obor(1); D.gate.userData.set(0); const PR = parit(sc); PR.set(.12);
    const R = warga([.2, 0, RF + 2.4], 7); R.rotation.y = Math.PI; perban(R, 0); sc.add(R); const cam = camera(50);
    const bw = new THREE.Mesh(new THREE.TorusGeometry(.5, .025, 6, 24, Math.PI), new THREE.MeshStandardMaterial({ color: grade('#7A4E2A') })); const ar = panah(sc); cam.add(bw); cam.add(ar); sc.add(cam);
    bw.scale.setScalar(.6); ar.scale.setScalar(.6); bw.position.set(.62, -.62, -1.5); bw.rotation.set(0, 0, Math.PI / 2); ar.position.set(.4, -.62, -1.5); ar.rotation.set(0, Math.PI / 2 + .2, 0);
    const pov = X.ab({ left: 0, top: 260, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '46px', color: BONE, textShadow: '0 4px 14px #000', opacity: 0 }, root, 'POV: kamu penjaga menara malam ini');
    const card = (k, t, c) => `<div style="background:rgba(30,42,28,.95);border-radius:16px;padding:14px 20px 18px;border-bottom:9px solid ${c};width:440px;box-shadow:0 14px 30px #0008"><div style="font-size:92px;font-weight:800;color:${c};line-height:1">${k}</div><div style="font-size:42px;font-weight:800;color:${BONE};line-height:1.1">${t}</div></div>`;
    const ab = X.ab({ left: 60, top: 340, width: 960, display: 'flex', gap: '24px', justifyContent: 'center', textAlign: 'center', fontFamily: FONT, opacity: 0 }, root, card('A', '🚪 BUKA GERBANG', '#9AD07A') + card('B', '🏹 TEMBAK PANAH PERINGATAN', '#FFB4A8'));
    const end = BIG(root, 'kali ini<br>NGGAK BISA DUA-DUANYA', { top: 640, fontSize: '70px', color: AMBER, lineHeight: '1.05' });
    return { scene: sc, cam, upd(t, dur) { const ta = at(s, 'A,', dur * .3), tk = at(s, 'Kali', dur * .8); R.pose(t, { look: Math.sin(t) * .4 }); R.userData.st.head.rotation.x = -.5;
      cam.position.set(1.5 + Math.sin(t * .7) * .04, 9, RF - 2); cam.lookAt(lerp(.5, .2, ease(t, 0, dur)), .2, RF + 3); ar.position.z = -1.5 + Math.sin(t * 1.5) * .02;
      show(pov, seg(t, .1, .5)); show(ab, seg(t, ta, ta + .4)); pulse(end, seg(t, tk, tk + .35)) } };
  },
};
