// Shot Kades S1 Ep 3 "Pipa dari Bukit" (lihat STORYBOARD.md). Detik 0 = kran menyembur + teks hasil besar; akhir kembali ke kran (loop).
import { THREE, lerp, seg, E, mesh, G, group, camera, island, tree, person, miniStick } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { SORE, SIANG, juara, darmo, wati, bejo, desaBesar, balai, BIG, show, pulse } from '../_s1/dunia.js';

const ease = (t, a, b) => E.inout(seg(t, a, b));
const PANEL = 'rgba(21,53,42,.94)', AIR = '#5FB4E6';
const chip = (root, html, css = {}) => X.ab(Object.assign({ left: 60, top: 360, background: PANEL, color: '#F4EBD3', fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '42px', padding: '12px 28px', borderRadius: '16px', border: '1px solid #ffffff2a', boxShadow: '0 12px 28px #0000005c', opacity: 0, whiteSpace: 'nowrap' }, css), root, html);
const center = (root, html, top, css = {}) => X.ab(Object.assign({ left: 0, top, width: 1080, textAlign: 'center', opacity: 0, fontFamily: 'Poppins,sans-serif' }, css), root, html);
const BAJU = ['#3E86B0', '#C65B4B', '#D8A84A', '#4E8B6A', '#8E44AD', '#2E7D5B', '#E07B39'], KULIT = ['#C98E64', '#E2A97E', '#B97A52'];
const kerumunan = (sc, n, f) => Array.from({ length: n }, (_, i) => { const g = group(sc, f(i)); miniStick(g, [0, 0, 0], BAJU[i % 7], KULIT[i % 3]); return g });
const airMat = () => new THREE.MeshStandardMaterial({ color: AIR, transparent: true, opacity: .75, roughness: .15, metalness: .1 });
// butiran air (instanced): set(i, x, y, z, s)
function butir(sc, n, r = .05) { const m = new THREE.InstancedMesh(new THREE.SphereGeometry(r, 6, 5), airMat(), n); sc.add(m); const O = new THREE.Object3D();
  return { m, set(i, x, y, z, s = 1) { O.position.set(x, y, z); O.scale.setScalar(Math.max(.001, s)); O.updateMatrix(); m.setMatrixAt(i, O.matrix) }, done() { m.instanceMatrix.needsUpdate = true } } }

// kran umum desa: tiang pipa + mulut kran + keran merah + ember; semburan air dari mulut kran ke ember
function kranDesa(sc) {
  const g = group(sc, [0, 0, 0]); g.add(mesh(G.box(1.1, .3, 1.1), '#A8A49A', [0, .15, 0])); g.add(mesh(G.cyl(.08, .08, 1.3, 10), '#8C9196', [0, .95, -.3]));
  g.add(mesh(G.cyl(.07, .07, .5, 10), '#8C9196', [0, 1.55, -.08], { rot: [Math.PI / 2, 0, 0] })); g.add(mesh(G.cyl(.09, .06, .14, 10), '#8C9196', [0, 1.5, .18]));
  const kn = group(g, [0, 1.7, -.08]); kn.add(mesh(G.box(.34, .05, .05), '#C9472F', [0, 0, 0])); kn.add(mesh(G.cyl(.03, .03, .14, 6), '#C9472F', [0, -.07, 0]));
  g.add(mesh(G.cyl(.32, .26, .45, 16), '#3E86B0', [0, .52, .2])); const muka = mesh(G.cyl(.29, .29, .02, 16), airMat(), [0, .3, .2], { cast: false }); g.add(muka);
  const pancur = mesh(G.cyl(.06, .09, 1, 10), airMat(), [0, 1.0, .2], { cast: false }); g.add(pancur);
  const B = butir(sc, 40, .05);
  return { g, kn, upd(t, on = 1) { pancur.scale.set(1 + Math.sin(t * 40) * .15, on, 1 + Math.cos(t * 37) * .15); pancur.position.y = 1.44 - .5 * on; muka.position.y = .3 + .44 * Math.min(1, t * .25) * on;
    for (let i = 0; i < 40; i++) { const q = (t * 1.6 + i / 40) % 1, a = i * 2.4; B.set(i, Math.cos(a) * (.2 + q * .7), .8 + Math.sin(q * Math.PI) * .55, .2 + Math.sin(a) * (.2 + q * .7), on * (1 - q)) } B.done(); kn.rotation.y = on * 1.3 } };
}
function lokasiKran(sc) {   // halaman kecil di tengah desa: kran + warga antre bawa ember
  desaBesar(sc, { hole: (x, z) => Math.abs(x) < 9 && Math.abs(z) < 8 }); island(sc, 16, 14, '#8FB45A', '#7A5C3E');
  sc.add(mesh(G.box(3.4, .04, 3.4), '#B9A274', [0, .02, 0], { cast: false })); tree(sc, [-3.2, 0, -3], 1.4, '#5E8F3A'); tree(sc, [3.6, 0, -4], 1.2, '#5E8F3A', 'palm');
  const K = kranDesa(sc);
  const crowd = kerumunan(sc, 26, i => [-2.6 + (i % 9) * .65 + Math.sin(i) * .15, 0, -1.6 - Math.floor(i / 9) * .8]);
  crowd.forEach((g, i) => { if (i % 2 === 0) g.add(mesh(G.cyl(.12, .1, .2, 8), BAJU[(i + 3) % 7], [.16, .5, .08], { cast: false })) });
  return { K, crowd };
}

export const SHOTS = {
  K3_KRAN(s, root) {   // FRAME 1: kran menyembur, warga sorak; teks hasil besar langsung tampil
    const sc = SIANG(); const L = lokasiKran(sc); const V = X.TL.vars;
    const J = juara([-.95, 0, .5]); sc.add(J); J.rotation.y = .5; const M = darmo([1.0, 0, .3]); sc.add(M); M.rotation.y = -.6; const cam = camera(42);
    const ep = center(root, `<span style="display:inline-block;background:#C9472F;color:#FFF;font-size:40px;font-weight:800;letter-spacing:6px;padding:8px 26px;border-radius:12px;box-shadow:0 8px 20px #0006">EPISODE 3</span>`, 250, { opacity: 1 });
    const big = BIG(root, `💧 AIR MENGALIR<br>KE ${V.pulang} WARGA!`, { top: 330, fontSize: '104px', lineHeight: 1.08, opacity: 1 });
    const slo = center(root, `<span style="display:inline-block;background:${PANEL};color:#E8B94A;font-size:36px;font-weight:800;letter-spacing:3px;padding:10px 26px;border-radius:14px">KOMEN KALIAN, DESA KITA.</span>`, 590, { opacity: 1 });
    return { scene: sc, cam, upd(t, dur) { L.K.upd(t, 1); L.crowd.forEach((g, i) => { g.position.y = Math.abs(Math.sin(t * 7 + i)) * .14; g.rotation.y = Math.sin(t * 3 + i) * .4 });
      J.pose(t, { cheer: true, bounce: true }); M.pose(t, { cheer: t > 1.2, nod: t <= 1.2 }); const p = ease(t, 0, dur);
      cam.position.set(lerp(1.5, 2.3, p), lerp(1.35, 1.9, p), lerp(4.6, 5.6, p)); cam.lookAt(lerp(.1, 0, p), lerp(1.15, 1.05, p), 0); big.style.transform = `scale(${1 + .03 * Math.sin(t * 5)})` } };
  },
  K3_REKAP(s, root) {   // papan dana naik; rincian vote + follow + like gabungan per platform
    const sc = SORE(); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); island(sc, 16, 12, '#8FB45A', '#7A5C3E'); balai(sc, [0, 0, -2]); const V = X.TL.vars;
    const J = juara([-1.4, 0, 1.4]); sc.add(J); J.rotation.y = .6; const cam = camera(42);
    const papan = canvasPlane(2.6, 1.4, () => { }, 600); papan.position.set(.9, 1.5, 1.2); papan.rotation.y = -.15; sc.add(papan); [-1, 1].forEach(x => sc.add(mesh(G.box(.1, 1.6, .1), '#6E4A2C', [.9 + x * 1.2, .8, 1.15])));
    const draw = v => papan.userData.redraw((x, W, H) => { x.fillStyle = '#2E4A3A'; x.fillRect(0, 0, W, H); x.strokeStyle = '#8A6A3A'; x.lineWidth = 14; x.strokeRect(0, 0, W, H); x.fillStyle = '#E9DFC2'; x.textAlign = 'center';
      x.font = `700 ${Math.round(H * .14)}px Poppins`; x.fillText('DANA DESA', W / 2, H * .3); x.fillStyle = '#E8B94A'; x.font = `800 ${Math.round(H * .17)}px Poppins`; x.fillText('Rp' + v.toLocaleString('id-ID'), W / 2, H * .7) });
    const vote = chip(root, `⛰️ PIPA ${V.vote.pipa} · 🕳️ SUMUR ${V.vote.sumur} · 🌧️ TANDON ${V.vote.tandon}`, { top: 330, fontSize: '36px' });
    const fol = chip(root, `🚉 +${V.follow} PULANG → <span style="color:#E8B94A">${V.pulang} WARGA</span>`, { top: 425, fontSize: '38px' });
    const lk = chip(root, `<div style="font-size:30px;letter-spacing:2px;color:#E8B94A">👍 LIKE GABUNGAN TIKTOK + IG + YOUTUBE</div><div style="font-size:38px;margin-top:4px">TT ${V.like_tt} + IG ${V.like_ig} + YT ${V.like_yt} = ${V.like}</div>`, { top: 520, whiteSpace: 'normal', width: 840 });
    let last = -1;
    return { scene: sc, cam, upd(t, dur) { const tl = at(s, 'Like', dur * .35), td = at(s, 'Dana', dur * .7); const v = Math.floor(E.out(seg(t, td - .3, td + 2)) * (V.dana - V.prev_sisa) / 10000) * 10000 + V.prev_sisa; if (v !== last) { draw(v); last = v }
      show(vote, seg(t, 0, .3)); show(fol, seg(t, .3, .7)); show(lk, seg(t, tl - .2, tl + .2)); J.pose(t, { point: t > tl, talk: true, cheer: t > dur - 1 });
      const p = ease(t, 0, dur); cam.position.set(lerp(-.4, -.6, p), lerp(1.8, 1.7, p), lerp(10.5, 9.6, p)); cam.lookAt(-.2, 1.2, .3) } };
  },
  K3_GOTONG(s, root) {   // drone: pipa ditarik dari mata air di puncak bukit, menuruni lereng ke desa; warga berbaris memikul
    const sc = SIANG({ fog: ['#F0E6D0', 70, 240] }); island(sc, 60, 70, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => z < 10 && Math.abs(x) < 30 }); const V = X.TL.vars;
    sc.add(mesh(G.cyl(3, 22, 14, 18), '#7FA65E', [0, 7, -40])); sc.add(mesh(G.cyl(2, 2, .1, 16), AIR, [0, 14.05, -40], { cast: false, mat: { roughness: .2 } }));
    [[-2.6, -41], [2.4, -39], [1, -42.5]].forEach(([x, z]) => sc.add(mesh(G.ico(.7, 0), '#9A968C', [x, 14.2, z])));
    for (let k = 0; k < 18; k++) { const a = k * .9, r = 8 + (k % 5) * 2.5; const y = 14 * (1 - (r - 3) / 19); tree(sc, [Math.cos(a) * r * 1.4, y, -40 + Math.sin(a) * r], 1.3, '#4E8F3A') }
    const tdn = group(sc, [0, 0, -3]); [[-.7, -.7], [.7, -.7], [-.7, .7], [.7, .7]].forEach(([x, z]) => tdn.add(mesh(G.box(.14, 3, .14), '#6E6A5E', [x, 1.5, z]))); tdn.add(mesh(G.cyl(1, 1, 1.6, 16), '#2E6FB0', [0, 3.8, 0]));
    const slope = z => 14 * (1 - (z + 40 - 3) / 19);
    const pts = [[0, 14.2, -38], [.8, slope(-33) + .2, -33], [-.6, slope(-28) + .2, -28], [.6, slope(-23) + .2, -23], [0, .25, -18.5], [-1.4, .2, -12], [-.5, .2, -6.5], [0, 3.3, -3.4]].map(p => new THREE.Vector3(...p));
    const curve = new THREE.CatmullRomCurve3(pts); const tube = new THREE.TubeGeometry(curve, 240, .26, 8); const pipa = mesh(tube, '#DADDE2', [0, 0, 0]); sc.add(pipa); const NI = tube.index.count;
    const W = kerumunan(sc, 22, () => [0, 0, 0]); const IC = ['👮', '👩‍🏫', '🚒', '🌾'];
    const tags = IC.map(ic => X.ab({ left: 0, top: 0, fontSize: '56px', opacity: 0, transform: 'translate(-50%,-100%)' }, root, ic));
    const cost = chip(root, `🧾 pipa: ${V.biaya_rp}`, { top: 340, fontSize: '40px' }); const cam = camera(44);
    return { scene: sc, cam, upd(t, dur) { const r = E.inout(seg(t, .2, dur - .6)); tube.setDrawRange(0, Math.floor(r * NI / 48) * 48);
      W.forEach((g, i) => { const u = Math.max(.002, r - .01 - i * .009); const p = curve.getPointAt(Math.min(.999, u)), d = curve.getTangentAt(Math.min(.999, u)); g.position.set(p.x + (i % 2 ? .35 : -.35), p.y - .2, p.z); g.rotation.y = Math.atan2(d.x, d.z); g.children[0].rotation.z = Math.sin(t * 9 + i) * .12; g.visible = r > .01 + i * .009 });
      const f = curve.getPointAt(Math.min(.999, Math.max(.05, r - .06))); const k = ease(t, 0, dur); cam.position.set(f.x + lerp(7, 9, k), f.y + lerp(5, 7, k), f.z + lerp(7, 9, k)); cam.lookAt(f.x, f.y + .4, f.z - 1);
      tags.forEach((e, k) => { const g = W[k * 4 + 1]; const [x, y, z] = X.proj(g, cam, [0, 1.4, 0]); e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.opacity = g.visible && z < 1 && t < dur - .4 ? seg(t, .6 + k * .4, .9 + k * .4) : 0 });
      const tc = at(s, 'Biayanya', dur * .65); show(cost, seg(t, tc - .2, tc + .2)) } };
  },
  K3_BEJO(s, root) {   // GAGAL LUCU: Bejo menggigit pipa, air muncrat ke Mbah Darmo
    const sc = SORE(); island(sc, 16, 14, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); tree(sc, [-2.8, 0, -2.6], 1.3, '#5E8F3A');
    sc.add(mesh(G.cyl(.16, .16, 14, 10), '#E8E2D2', [0, .17, 0], { rot: [0, 0, Math.PI / 2] }));
    const B = bejo(sc, [.15, 0, .62]); B.rotation.y = Math.PI / 2; const M = darmo([1.25, 0, -.55]); sc.add(M); M.rotation.y = -.5;
    const J = juara([-.85, 0, .4]); sc.add(J); J.rotation.y = .4; const S = butir(sc, 70, .06); const cam = camera(42);
    const kaget = chip(root, '💦 MANDI GRATIS', { top: 360, left: 0, width: 1080, textAlign: 'center', background: 'transparent', border: 'none', boxShadow: 'none', fontSize: '84px', color: '#E9F6FF', textShadow: '0 6px 0 #1E4E7A, 0 14px 30px #0008' });
    const ups = chip(root, '🐐 BEJO: GIGIT PIPA', { top: 340, fontSize: '40px' });
    return { scene: sc, cam, upd(t, dur) { const tg = at(s, 'gigit', dur * .45), tm = at(s, 'Mandi', dur * .75); const bite = seg(t, tg - .3, tg);
      B.userData.hd.rotation.z = -.7 * bite + (t < tg - .3 ? Math.sin(t * 6) * .1 : Math.sin(t * 20) * .05);
      const on = t > tg; for (let i = 0; i < 70; i++) { const q = (t * 1.8 + i / 70) % 1, j = Math.sin(i * 12.9) * .18; S.set(i, lerp(.15, 1.25, q) + j, .2 + q * 1.55 + Math.sin(q * Math.PI) * .6 - q * q * .3, lerp(.05, -.5, q) + Math.cos(i * 7.3) * .15, on ? 1 : 0) } S.done();
      M.pose(t, { shake: on, cheer: on && t > tm }); J.pose(t, { point: !on && t > .6, talk: !on, look: on ? .6 : 0 }); show(ups, seg(t, tg - .1, tg + .2) * (1 - seg(t, tm - .3, tm)));
      pulse(kaget, seg(t, tm - .1, tm + .3)); const p = ease(t, 0, dur); const sh = on ? Math.sin(t * 50) * .03 * (1 - seg(t, tg, tg + .5)) : 0;
      cam.position.set(lerp(.3, .5, p) + sh, lerp(1.5, 1.6, p), lerp(6.4, 5.6, p)); cam.lookAt(.3, .85, 0) } };
  },
  K3_TANDON(s, root) {   // pipa ditambal, air masuk tandon; meteran penuh
    const sc = SIANG(); island(sc, 18, 14, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); const V = X.TL.vars;
    const T = group(sc, [1.2, 0, -1]); [[-.8, -.8], [.8, -.8], [-.8, .8], [.8, .8]].forEach(([x, z]) => T.add(mesh(G.box(.14, 3, .14), '#6E6A5E', [x, 1.5, z]))); T.add(mesh(G.box(2, .14, 2), '#6E6A5E', [0, 3, 0]));
    T.add(mesh(G.cyl(1, 1, 1.7, 18), '#2E6FB0', [0, 3.92, 0])); T.add(mesh(G.cyl(1.03, 1.03, .1, 18), '#1F4E80', [0, 4.8, 0]));
    sc.add(mesh(G.cyl(.14, .14, 8, 10), '#E8E2D2', [-4.6, .17, -1], { rot: [0, 0, Math.PI / 2] })); sc.add(mesh(G.cyl(.14, .14, 4.6, 10), '#E8E2D2', [.4, 2.45, -1.8]));
    const tambal = mesh(G.cyl(.2, .2, .5, 10), '#C9CED6', [-3, .17, -1], { rot: [0, 0, Math.PI / 2] }); sc.add(tambal);
    const B = bejo(sc, [-3.4, 0, .6]); B.rotation.y = -.4; const J = juara([-1.2, 0, .9]); sc.add(J); J.rotation.y = .3;
    const crowd = kerumunan(sc, 10, i => [-.8 + (i % 5) * .7, 0, 1.6 + Math.floor(i / 5) * .6]); const cam = camera(42);
    const gauge = X.ab({ left: 860, top: 330, width: 140, height: 420, borderRadius: '20px', background: '#15352AEE', border: '6px solid #F4EBD3', overflow: 'hidden', opacity: 0 }, root, `<div class="lv" style="position:absolute;bottom:0;left:0;width:100%;height:0;background:linear-gradient(#8FD3F5,#2E86C9)"></div><div style="position:absolute;top:10px;width:100%;text-align:center;font:800 26px Poppins;color:#F4EBD3">TANDON</div>`);
    const lv = gauge.querySelector('.lv'); const pen = chip(root, '✅ PENUH!', { top: 330, fontSize: '64px', color: '#BFF0C8' }); const sisa = chip(root, `💰 sisa: ${V.sisa_rp}`, { top: 470, fontSize: '40px', color: '#E8B94A' });
    return { scene: sc, cam, upd(t, dur) { const tp = at(s, 'penuh', dur * .45), ts = at(s, 'Sisa', dur * .7); show(gauge, seg(t, .2, .5)); lv.style.height = (100 * E.out(seg(t, .5, tp + .2))) + '%';
      tambal.scale.setScalar(Math.max(.01, E.back(seg(t, .1, .6)))); pulse(pen, seg(t, tp, tp + .3)); show(sisa, seg(t, ts - .2, ts + .2)); if (t > ts - .2) pen.style.opacity = 1 - seg(t, ts - .2, ts);
      const ok = t > tp; J.pose(t, { cheer: ok, point: !ok }); crowd.forEach((g, i) => g.position.y = ok ? Math.abs(Math.sin(t * 7 + i)) * .14 : 0); B.userData.hd.rotation.z = Math.sin(t * 2) * .2;
      const p = ease(t, 0, dur); cam.position.set(lerp(1.6, .6, p), lerp(1.6, 3.4, p), lerp(9.8, 10.6, p)); cam.lookAt(lerp(-.6, .2, p), lerp(1.4, 2.6, p), -.5) } };
  },
  K3_POHON(s, root) {   // cameo penonton: guru SLB pulang kampung mengajar anak-anak di bawah pohon
    const sc = SORE({ sky: ['#7FB6DA', '#FBDDB5'] }); island(sc, 16, 14, '#8FB45A', '#7A5C3E'); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 });
    tree(sc, [-2.2, 0, -3.4], 2.4, '#4E8F3A'); const L = person(sc, [-.7, 0, -.3], { body: '#F2E6C8', pants: '#3B3B4F', skin: '#E2A97E' }); L.rotation.y = .35;
    { const h = L.userData.st.head; h.add(mesh(G.sph(.238, 20, 16), '#2E7D5B', [0, .07, -.06], { mat: { flatShading: false } })); h.add(mesh(G.cone(.27, .3, 20), '#2E7D5B', [0, -.17, -.05], { mat: { flatShading: false } })) }
    const papan = canvasPlane(1.1, .75, (x, W, H) => { x.fillStyle = '#2B3A33'; x.fillRect(0, 0, W, H); x.strokeStyle = '#8A6A3A'; x.lineWidth = 12; x.strokeRect(0, 0, W, H); x.fillStyle = '#F4F4EC'; x.textAlign = 'center';
      x.font = `700 ${Math.round(H * .26)}px Poppins`; x.fillText('A  B  C', W / 2, H * .42); x.fillText('1 + 2 = 3', W / 2, H * .78) }, 500); papan.position.set(.55, 1.15, -.35); papan.rotation.y = -.2; sc.add(papan);
    [-1, 1].forEach(k => sc.add(mesh(G.box(.05, 1.4, .05), '#6E4A2C', [.55 + k * .45, .7, -.42], { rot: [-.12, 0, 0] })));
    const anak = kerumunan(sc, 9, i => [-.9 + (i % 5) * .45 + Math.floor(i / 5) * .2, 0, .9 + Math.floor(i / 5) * .55]); anak.forEach(g => { g.scale.setScalar(.72); g.rotation.y = Math.PI });
    const tag = chip(root, '👩‍🏫 BU LARAS · GURU SLB', { top: 340, fontSize: '40px' }), tut = chip(root, '🏫 SEKOLAH DESA: <span style="color:#FF8A75">TUTUP</span>', { top: 440, fontSize: '40px' }); const cam = camera(42);
    return { scene: sc, cam, upd(t, dur) { const tl = at(s, 'Laras', 1), tt = at(s, 'tutup', dur - 1.4); show(tag, seg(t, tl - .2, tl + .2)); show(tut, seg(t, tt - .2, tt + .2));
      L.pose(t, { talk: true, point: Math.sin(t * 1.3) > 0 }); anak.forEach((g, i) => { g.position.y = (i % 3 === 0 && Math.sin(t * 2 + i) > .7) ? .08 : 0; g.children[0].rotation.z = Math.sin(t * 2.4 + i) * .08 });
      const p = ease(t, 0, dur); cam.position.set(lerp(2.6, 1.4, p), lerp(1.7, 1.5, p), lerp(5.8, 5.0, p)); cam.lookAt(lerp(-.1, -.2, p), .95, -.2) } };
  },
  K3_RAPOR(s, root) {   // cliff: Bu Wati membawa rapor; tanpa sekolah & kesehatan = merah
    const sc = SORE({ sky: ['#6E9CC8', '#F6C9A0'] }); desaBesar(sc, { hole: (x, z) => Math.abs(x) < 10 && Math.abs(z) < 9 }); island(sc, 16, 12, '#8FB45A', '#7A5C3E'); balai(sc, [0, 0, -2.4]); const V = X.TL.vars;
    const J = juara([-.7, 0, 1.2]); sc.add(J); J.rotation.y = .5; const W = wati([5, 0, 1.4]); sc.add(W); W.rotation.y = -Math.PI / 2; const cam = camera(42);
    const rap = X.ab({ left: 120, top: 320, width: 840, background: '#FBF7EC', borderRadius: '14px', padding: '24px 40px', fontFamily: 'Poppins,sans-serif', color: '#2A2A2A', boxShadow: '0 18px 40px rgba(0,0,0,.5)', opacity: 0, textAlign: 'center' }, root,
      `<div style="font-size:24px;letter-spacing:4px;color:#8A4B32;font-weight:700">KECAMATAN · MASA PERCOBAAN</div><div style="height:3px;background:#B5302A;margin:10px 0 14px"></div><div style="font-size:54px;font-weight:800">RAPOR PERTAMA</div><div style="font-size:50px;font-weight:800;color:#B5302A">${V.rapor} HARI LAGI</div>` +
      `<div class="rw" style="display:flex;justify-content:center;gap:30px;margin-top:16px;font-size:36px;font-weight:700;opacity:0"><span>🏫 Sekolah ❌</span><span>🏥 Kesehatan ❌</span></div>`);
    const rw = rap.querySelector('.rw'); const merah = center(root, `<span style="display:inline-block;border:10px solid #C62828;color:#C62828;background:#FFFFFFE6;font-size:96px;font-weight:900;padding:4px 36px;border-radius:18px;transform:rotate(-8deg)">NILAI MERAH</span>`, 720);
    return { scene: sc, cam, upd(t, dur) { const q = ease(t, 0, 1.6); W.position.x = lerp(5, .75, q); W.pose(t, { walk: q > 0 && q < 1 ? 1 : 0, talk: q >= 1 }); const tr = at(s, 'Rapor', 1.6), tk = at(s, 'tanpa', dur * .55), tm = at(s, 'merah', dur - 1);
      show(rap, seg(t, tr - .2, tr + .2)); rw.style.opacity = seg(t, tk, tk + .3); pulse(merah, seg(t, tm - .05, tm + .3)); J.pose(t, { shake: t > tm, look: -.5 });
      const p = ease(t, 0, dur); const sh = t > tm ? Math.sin(t * 60) * .025 * (1 - seg(t, tm, tm + .6)) : 0; cam.position.set(lerp(.3, .1, p) + sh, lerp(2.0, 1.8, p), lerp(8.4, 7.6, p)); cam.lookAt(0, 1.0, 0) } };
  },
  K3_AJAK(s, root) {   // A/B besar di layar; kembali ke kran (loop ke detik 0)
    const sc = SIANG(); const L = lokasiKran(sc); const J = juara([-.95, 0, .5]); sc.add(J); J.rotation.y = .5; const cam = camera(42);
    const card = (k, ic, tx, c, top) => center(root, `<span style="display:inline-flex;align-items:center;gap:22px;background:${c};color:#FFF;font-size:66px;font-weight:900;padding:16px 44px;border-radius:24px;border:5px solid #FFFFFFAA;box-shadow:0 14px 30px #0007;min-width:640px;justify-content:center"><span style="background:#FFF;color:${c};border-radius:14px;padding:0 20px">${k}</span>${ic} ${tx}</span>`, top);
    const A = card('A', '🏫', 'SEKOLAH', '#2E6FB0', 330), Bc = card('B', '🏥', 'PUSKESMAS', '#C9472F', 490);
    const q = center(root, `<span style="font-size:40px;font-weight:800;color:#F4EBD3;text-shadow:0 4px 14px #000">DANA CUMA CUKUP SATU</span>`, 260);
    const slo = center(root, `<span style="display:inline-block;background:${PANEL};color:#E8B94A;font-size:36px;font-weight:800;letter-spacing:3px;padding:10px 26px;border-radius:14px">KOMEN KALIAN, DESA KITA.</span>`, 660);
    return { scene: sc, cam, upd(t, dur) { L.K.upd(t, 1); L.crowd.forEach((g, i) => g.rotation.y = Math.sin(t + i) * .3); const ta = at(s, 'sekolah', 1.2), tb = at(s, 'puskesmas', 2.4), tk = at(s, 'kalian', dur - 1.6);
      show(q, seg(t, 0, .3)); pulse(A, seg(t, ta - .3, ta)); pulse(Bc, seg(t, tb - .3, tb)); show(slo, seg(t, tk - .2, tk + .2)); J.pose(t, { talk: t < tk + 1, point: t > ta && t < tb + .8, wave: t > tk });
      const p = ease(t, 0, dur); cam.position.set(lerp(2.6, 1.5, p), lerp(2.0, 1.35, p), lerp(6.0, 4.6, p)); cam.lookAt(lerp(-.1, .1, p), lerp(1.0, 1.15, p), 0) } };
  },
};
