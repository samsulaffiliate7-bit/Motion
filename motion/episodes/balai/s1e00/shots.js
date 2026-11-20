// Shot Desa Terakhir S1 Ep 0 "Hari ke-0" (lihat STORYBOARD.md). Tiap adegan = lokasi/kamera berbeda.
import { THREE, lerp, seg, E, mesh, G, group, camera, miniStick } from '../../../engine/w3d/kit.js';
import { X, at, canvasPlane } from '../../../engine/w3d/desa3d.js';
import { SENJA, MALAM, gilang, yati, kardi, sinta, kades, warga, zombie, desaTerakhir, SPOT, RF, motorDinas, teropong, kabut, gerobak, karung, ikatBambu,
  BIG, TAG, show, pulse, ease, labelDesa, FONT, BONE, AMBER, RUST } from '../_s1/dunia.js';

const W = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
function debu(sc, n = 18, col = '#CDB892') { const d = Array.from({ length: n }, () => { const m = mesh(G.sph(.16, 8, 6), col, [0, -5, 0], { cast: false, mat: { transparent: true, opacity: .5 } }); sc.add(m); return m });
  return (t, t0, p, dur = 1.4) => d.forEach((m, i) => { const q = ((t - t0) / dur - i / n * .6); m.visible = q > 0 && q < 1; const a = i * 2.4; m.position.set(p[0] + Math.cos(a) * q * 1.4, .15 + q * .7 + Math.sin(i) * .15, p[2] - q * 1.5 + Math.sin(a) * .5); m.scale.setScalar(.5 + q * 1.8) }) }
// tag yang menempel di atas kepala tokoh
function tagAt(root, html, css = {}) { const w = X.ab({ left: 0, top: 0 }, root); const e = TAG(w, html, Object.assign({ position: 'relative', left: 0, top: 0, transform: 'translate(-50%,-100%)', fontSize: '34px' }, css));
  return (obj, cam, off, p) => { const [x, y] = X.proj(obj, cam, off); w.style.left = Math.max(250, Math.min(830, x)) + 'px'; w.style.top = y + 'px'; e.style.opacity = Math.max(0, Math.min(1, p)); e.style.transform = `translate(-50%,-100%) scale(${.8 + .2 * E.back(Math.max(0, Math.min(1, p)))})` } }
// obor menyala berurutan dari gerbang
const oborDari = (D, q) => D.obor((k, p) => { const a = Math.atan2(p[2], p[0]), d = Math.abs(Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2))) / Math.PI; return Math.max(.001, E.back(Math.max(0, Math.min(1, (q - d) * 6)))) });
function kerumunan(sc, n, cx, cz, r, seed = 3) { let s = seed; const R = () => (s = (s * 16807) % 2147483647) / 2147483647; const C = ['#B5452B', '#3E86B0', '#E8B94A', '#6E9A5C', '#8A5A9A', '#D9774A', '#F2EFE6'];
  return Array.from({ length: n }, (_, i) => { const a = R() * 6.28, d = Math.sqrt(R()) * r; const m = miniStick(sc, [cx + Math.cos(a) * d, 0, cz + Math.sin(a) * d], C[i % 7]); m.scale.setScalar(1.35); m.rotation.y = R() * 6; return m }) }

export const SHOTS = {
  B0_KENTONGAN(s, root) {   // frame 1 aksi: Gilang memukul kentongan di menara, obor menyala berurutan, kamera tarik mundur ke atas
    const sc = SENJA({ sky: ['#5E6FAE', '#F2A47A'] }); const D = desaTerakhir(sc); const M = D.menara, mp = SPOT.menara;
    const J = gilang([.15, M.userData.floor, .3], { parent: M }); J.rotation.y = -.15; const ken = M.userData.kentongan;
    kerumunan(sc, 26, 0, 4, 9); const cam = camera(42);
    const h = BIG(root, 'HARI KE-0', { top: 330 }), sub = BIG(root, 'DESA TERAKHIR', { top: 500, fontSize: '56px', fontWeight: 700, letterSpacing: '10px', color: AMBER, textShadow: '0 4px 14px rgba(0,0,0,.7)' });
    const tok = BIG(root, 'TONG! TONG! TONG!', { top: 760, fontSize: '62px', color: '#FFE2A0', fontStyle: 'italic' });
    return { scene: sc, cam, upd(t, dur) {
      const hit = Math.abs(Math.sin(t * 7.5)); J.pose(t, { talk: t > 1.5 }); const A = J.userData.st.arms[1]; A.rotation.x = -1.6 + hit * .9; A.userData.elbow.rotation.x = -.6 + hit * .4; J.userData.st.arms[0].rotation.z = -.4;
      ken.rotation.z = Math.sin(t * 7.5) * .12; oborDari(D, seg(t, .2, dur * .8));
      const p = E.inout(seg(t, 1.2, dur)); const tgt = W(mp, [lerp(.25, 0, p), lerp(5.05, 1, p), lerp(.5, -10, p)]);
      cam.position.set(...W(mp, [lerp(-.55, 14, p), lerp(5.25, 24, p), lerp(3.3, 30, p)])); cam.lookAt(...tgt);
      pulse(h, seg(t, .15, .5)); show(sub, seg(t, .5, .9)); show(tok, seg(t, .05, .3) * (1 - seg(t, 1.6, 2))) } };
  },
  B0_UDARA(s, root) {   // drone tinggi di atas desa bundar + bukit, label bangunan, turun ke Gilang di dekat posko
    const sc = SENJA({ fog: ['#EBC3A6', 120, 420] }); const D = desaTerakhir(sc); oborDari(D, 1); const J = gilang([.7, 0, 29.5]); J.rotation.y = .1; sc.add(J); kerumunan(sc, 40, 0, -2, 10); kerumunan(sc, 10, 6, 34, 4, 9);
    const lab = labelDesa(root, D); const cam = camera(42); const V = X.TL.vars;
    const luas = BIG(root, `${Math.floor(D.rumah / 50) * 50}+ rumah`, { top: 330, fontSize: '84px' }), org = BIG(root, `tinggal ${V.penyintas} orang`, { top: 440, fontSize: '64px', color: AMBER });
    const nm = tagAt(root, 'GILANG · 24 · ketua karang taruna');
    return { scene: sc, cam, upd(t, dur) { J.pose(t, { wave: t > dur * .7, talk: true });
      const a = E.inout(seg(t, 0, dur * .82)); const ang = lerp(.55, .05, a);
      const far = [Math.sin(ang) * 120, 92, Math.cos(ang) * 120 + 10], near = [1.6, 2.1, 35.4];
      cam.position.set(lerp(far[0], near[0], E.in(a)), lerp(far[1], near[1], a), lerp(far[2], near[2], Math.pow(a, 1.6))); cam.lookAt(lerp(0, .7, a), lerp(0, 1.35, a), lerp(-12, 29.5, Math.pow(a, 1.3)));
      lab(cam, 1 - seg(t, dur * .4, dur * .52)); show(luas, seg(t, .2, .6) * (1 - seg(t, dur * .5, dur * .58))); const tp = at(s, 'tinggal', 3); show(org, seg(t, tp, tp + .4) * (1 - seg(t, dur * .5, dur * .58)));
      nm(J, cam, [0, 2.3, 0], seg(t, dur * .78, dur * .86)) } };
  },
  B0_KABUR(s, root) {   // motor dinas pelat merah melesat keluar gerbang; lalu spanduk "bantuan kota" di balai
    const sc = SENJA(); const D = desaTerakhir(sc); oborDari(D, 1); D.gate.userData.set(Math.PI / 2 * .95);
    const mo = motorDinas(sc, [0, 0, 40]); mo.rotation.y = -Math.PI / 2; const K = kades([-.15, .3, 0], { parent: mo }); K.rotation.y = Math.PI / 2;
    K.userData.st.legs.forEach(L => { L.rotation.x = -1.2; L.userData.knee.rotation.x = 1.3 }); K.userData.st.arms.forEach(A => { A.rotation.x = -1.2; A.userData.elbow.rotation.x = -.2 });
    mo.add(mesh(G.box(.5, .4, .4), '#C9A86A', [-.62, 1, 0])); const dust = debu(sc, 22);
    const J = gilang([1.4, 0, 0]), S = sinta([-1, 0, .2]); const bp = SPOT.balai; J.position.set(bp[0] + 1.6, 0, bp[2] + 9.6); S.position.set(bp[0] - 1.4, 0, bp[2] + 10.4); J.rotation.y = Math.PI + .2; S.rotation.y = Math.PI - .2; sc.add(J); sc.add(S);
    const sp = D.balai.userData.spanduk; const cam = camera(42);
    const stamp = X.ab({ left: 300, top: 420, border: `8px solid ${RUST}`, color: RUST, background: 'rgba(243,233,210,.92)', borderRadius: '12px', padding: '8px 26px', fontFamily: FONT, fontWeight: 800, fontSize: '64px', transform: 'rotate(-10deg)', opacity: 0 }, root, 'KADES: KABUR');
    const plat = TAG(root, 'pelat merah 🔴', { left: 600, top: 640, fontSize: '34px' });
    return { scene: sc, cam, upd(t, dur) { const tc = at(s, 'Yang ditinggal', dur * .55) - .1;
      if (t < tc) { const q = E.in(seg(t, .2, 3.2)); mo.position.z = lerp(42, 92, q); mo.position.x = Math.sin(t * 9) * .05; mo.children.slice(0, 2).forEach(w => w.rotation.y = t * 20); dust(t, .5, [0, 0, mo.position.z - .8], 1.6);
        K.userData.st.head.rotation.y = Math.sin(t * 3) * .3; const p = ease(t, 0, tc);
        cam.position.set(lerp(3.2, 2.6, p), lerp(.9, 1.2, p), lerp(58, 60, p)); cam.lookAt(lerp(0, 0, p), lerp(1.2, 1, p), lerp(46, mo.position.z, Math.min(1, q * 1.1)));
        const ts = at(s, 'kabur duluan', 2); pulse(stamp, seg(t, ts, ts + .3)); show(plat, seg(t, at(s, 'motor dinas', 3.4), at(s, 'motor dinas', 3.4) + .3)); stamp.style.display = plat.style.display = 'block' }
      else { stamp.style.display = plat.style.display = 'none'; const u = t - tc; sp.rotation.x = Math.sin(t * 2.4) * .08; sp.position.z = 5.2 + Math.sin(t * 2.4) * .05;
        J.pose(t, { shake: u > 1.2 }); S.pose(t, { point: u < 2.2, look: -.3 }); const p = ease(u, 0, dur - tc);
        cam.position.set(...W(bp, [lerp(-.4, 0, p), lerp(1.8, 2.1, p), lerp(22.5, 21.5, p)])); cam.lookAt(...W(bp, [0, lerp(2.1, 2.3, p), 5.2])) } } };
  },
  B0_TIM(s, root) {   // dolly menyamping melewati Bu Yati, Pak Kardi, Sinta di depan posko
    const sc = SENJA({ sky: ['#6574B2', '#F3A378'] }); const D = desaTerakhir(sc, { hole: (x, z) => z > 22 && x > -6 && x < 18 }); oborDari(D, 1); const pp = SPOT.posko;
    const J = gilang(W(pp, [-5.2, 0, -4.4])); J.rotation.y = Math.PI - .6; const Y = yati(W(pp, [-2.4, 0, -3.6])); Y.rotation.y = Math.PI - .1; const K = kardi(W(pp, [.2, 0, -4.2])); K.rotation.y = Math.PI + .15;
    const drum = mesh(G.cyl(.4, .4, .95, 14), '#3E6E4A', W(pp, [3, .47, -3.6])); sc.add(drum); const S = sinta(W(pp, [3, .95, -3.6])); S.rotation.y = .2; [J, Y, K, S].forEach(p => sc.add(p));
    const tp = teropong(S.userData.st.head); tp.position.set(0, .02, .25);
    const cam = camera(40); const tY = tagAt(root, 'BU YATI · bidan · paling tenang'), tK = tagAt(root, 'PAK KARDI · mantan hansip'), tS = tagAt(root, 'SINTA · 12 th · paling pinter');
    const berani = TAG(root, '"berani" 😅', { left: 380, top: 600, fontSize: '40px' });
    return { scene: sc, cam, upd(t, dur) { const cy = at(s, 'Bu Yati', 1.2), ck = at(s, 'Pak Kardi', 4.4), cs = at(s, 'Sinta', 8.4), cb = at(s, 'ngakunya', ck + 1.6);
      J.pose(t, { talk: t < cy }); Y.pose(t, { hold: true, nod: t > cy && t < ck }); S.pose(t, { look: Math.sin(t) * .3 }); S.userData.st.arms.forEach(A => { A.rotation.x = -1.35; A.userData.elbow.rotation.x = -1.3; A.rotation.z = (A === S.userData.st.arms[0] ? .35 : -.35) });
      const hide = E.inout(seg(t, cb + .5, cb + 1.3)); K.position.x = pp[0] + lerp(.2, -2.0, hide); K.position.z = pp[2] - lerp(4.2, 2.7, hide); K.pose(t, { cheer: t > ck && t < cb + .4, shake: hide > .5, walk: hide > 0 && hide < 1 ? 1 : 0 });
      const x = lerp(-3.8, 3.2, ease(t, .3, dur - .6)); cam.position.set(pp[0] + x, 2.0, pp[2] - 10.8); cam.lookAt(pp[0] + x * .82, 1.35, pp[2] - 3.6);
      tY(Y, cam, [0, 2.15, 0], seg(t, cy, cy + .3) * (1 - seg(t, ck - .2, ck))); tK(K, cam, [0, 2.3, 0], seg(t, ck, ck + .3) * (1 - seg(t, cs - .2, cs))); tS(S, cam, [0, 1.9, 0], seg(t, cs, cs + .3)); show(berani, seg(t, cb, cb + .3) * (1 - seg(t, cs - .3, cs))) } };
  },
  B0_SAWAH(s, root) {   // POV menara gerbang: siluet zombie keluar dari kabut di ujung sawah, makin banyak
    const sc = SENJA({ sky: ['#7A6FA8', '#F0A27E'], fog: ['#E6BFA8', 60, 230], sunI: 2.2 }); const D = desaTerakhir(sc); oborDari(D, 1); D.gate.userData.set(Math.PI / 2 * .95);
    const S = sinta([1.75, 2.98, RF - .4]); S.rotation.y = .1; const pf = group(sc, [1.75, 0, RF - .4]); pf.add(mesh(G.box(1.5, .14, 1.3), '#9C7A46', [0, 2.9, 0])); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => pf.add(mesh(G.cyl(.07, .07, 2.9, 6), '#B89E5A', [x * .65, 1.45, z * .55]))); sc.add(S); const tp = teropong(S.userData.st.head); tp.position.set(0, .02, .25);
    const Z = Array.from({ length: 24 }, (_, i) => { const z = zombie([((i * 37) % 44) - 22 + (i % 2 ? 2 : -2), 0, 74 + ((i * 53) % 26)], i); z.rotation.y = Math.PI + ((i * 13) % 10 - 5) * .04; sc.add(z); z.userData.t0 = i < 3 ? 0 : i < 12 ? 2.5 + (i - 3) * .25 : 4.6 + (i - 12) * .18; return z });
    const fog = kabut(sc, 14, [90, 40], [0, 0, 98], '#F6E6DA', .5); const cam = camera(36);
    const cnt = X.ab({ left: 0, top: 360, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: '96px', color: '#D9F0B0', textShadow: '0 6px 0 #2E3A22, 0 14px 30px rgba(0,0,0,.6)', opacity: 0 }, root, '');
    return { scene: sc, cam, upd(t, dur) { const n = Z.filter(z => t > z.userData.t0).length;
      Z.forEach((z, i) => { const on = t > z.userData.t0; z.visible = on; const u = t - z.userData.t0; z.position.z = 74 + ((i * 53) % 26) - Math.max(0, u) * .45; z.shamble(t, 1); z.scale.setScalar(Math.min(1, .2 + u * 2)) });
      S.pose(t); S.userData.st.arms.forEach((A, k) => { A.rotation.x = -1.35; A.userData.elbow.rotation.x = -1.3; A.rotation.z = k ? -.35 : .35 }); fog(t, cam);
      const p = ease(t, 0, dur); cam.position.set(2.4, 4.7, lerp(42.4, 42.8, p)); cam.lookAt(lerp(.2, -1, p), lerp(2.4, 1.3, p), lerp(70, 86, p)); cam.fov = lerp(40, 31, E.inout(seg(t, 1.5, dur))); cam.updateProjectionMatrix();
      cnt.innerHTML = `👁 ${n >= 20 ? '20+' : n}`; show(cnt, seg(t, .4, .8)) } };
  },
  B0_GERBANG(s, root) {   // Gilang mendorong daun gerbang, engsel karatan macet setengah jalan
    const sc = SENJA({ sky: ['#4E5A9A', '#D88E7E'], sunI: 2, hemi: 1.35 }); const D = desaTerakhir(sc); oborDari(D, 1); const g = D.gate, L = g.userData.leaves[0];
    const J = gilang([0, 0, 0]); sc.add(J); const S = sinta([1.4, 0, RF - 3.4]); S.rotation.y = Math.PI * .85; sc.add(S); const K = kardi([3.2, 0, RF - 4.6]); K.rotation.y = -2.6; sc.add(K);
    const Z = Array.from({ length: 10 }, (_, i) => { const z = zombie([((i * 29) % 24) - 12, 0, 72 + ((i * 41) % 18)], i + 2); z.rotation.y = Math.PI; sc.add(z); return z }); const warm = new THREE.PointLight('#FFB25A', 18, 14, 1.4); warm.position.set(0, 4, RF - 2); sc.add(warm);
    const cam = camera(42); const kr = BIG(root, 'KRIEEET...', { top: 420, fontSize: '104px', color: '#FFD3A0', fontStyle: 'italic' }); const lab = TAG(root, '⚙ ENGSEL KARATAN', { left: 290, top: 600, fontSize: '44px' });
    const nb = BIG(root, 'nggak bisa ditutup', { top: 420, fontSize: '76px' });
    const OPEN = Math.PI / 2 * .95;
    return { scene: sc, cam, upd(t, dur) { const tk = at(s, 'karatan', 3), tn = at(s, 'nggak bisa', dur - 2.2);
      const run = seg(t, 0, 1.4); let a = OPEN; if (t > 1.4) { a = lerp(OPEN, .78, E.out(seg(t, 1.4, tk - .2))); if (t > tk - .2) a = .78 + Math.sin(t * 40) * .012 * (1 - seg(t, tk + 1.2, tk + 1.6)) } g.userData.set(a); g.userData.leaves[1].rotation.y = -OPEN;
      const pv = [-2.95, 0, RF], u = [Math.cos(a), 0, -Math.sin(a)], nrm = [-Math.sin(a), 0, -Math.cos(a)]; const gp = [pv[0] + u[0] * 2.3 + nrm[0] * .6, 0, pv[2] + u[2] * 2.3 + nrm[2] * .6];
      if (t < 1.4) { J.position.set(lerp(2.5, gp[0], E.inout(run)), 0, lerp(RF - 8, gp[2], E.inout(run))); J.rotation.y = lerp(-2.4, a, run); J.pose(t, { walk: 1.4 }) }
      else { J.position.set(gp[0], 0, gp[2]); J.rotation.y = a; J.pose(t, { shake: t > tk + .6 }); J.userData.st.arms.forEach(A => { A.rotation.x = -1.4; A.userData.elbow.rotation.x = -.3 }); J.userData.st.body.rotation.x = .25 }
      S.pose(t, { point: t > tk - .3, talk: t > tk + .2 }); K.pose(t, { shake: true }); Z.forEach((z, i) => { z.shamble(t); z.position.z = 72 + ((i * 41) % 18) - t * .4 });
      const hz = E.inout(seg(t, tk - .5, tk + .2)) * (1 - E.inout(seg(t, tn - .6, tn + .2)));
      const base = [lerp(4.6, 3.8, ease(t, 0, dur)), 2.4, RF - 10.5], hinge = [-1.25, 1.8, RF - 2.2];
      cam.position.set(lerp(base[0], hinge[0], hz), lerp(base[1], hinge[1], hz), lerp(base[2], hinge[2], hz));
      const lk0 = [-1.2, 1.6, RF + 1], lk1 = [-2.95, 1.55, RF]; cam.lookAt(lerp(lk0[0], lk1[0], hz), lerp(lk0[1], lk1[1], hz), lerp(lk0[2], lk1[2], hz));
      pulse(kr, seg(t, tk - .1, tk + .25) * (1 - seg(t, tk + 1.6, tk + 2))); show(lab, seg(t, tk + .2, tk + .5) * (1 - seg(t, tn - .4, tn))); pulse(nb, seg(t, tn, tn + .3)) } };
  },
  B0_AJAK(s, root) {   // malam terang: papan aturan di dekat gerbang, zombie mendekat di jalan sawah, tiga pilihan
    const sc = MALAM(); const D = desaTerakhir(sc, { hole: (x, z) => z > 20 && Math.abs(x) < 13 }); oborDari(D, 1); D.gate.userData.set(.78); D.gate.userData.leaves[1].rotation.y = -Math.PI / 2 * .95;
    sc.userData.warm.position.set(1, 5, RF - 3); sc.userData.warm.intensity = 30;
    const P = papanAturan(sc, [-3.2, 0, RF - 9.5], [['FOLLOW', '= 1 penyintas datang'], ['LIKE', '10 = 1 karung / ikat bambu'], ['KOMEN', '= rencana bertahan']]); P.rotation.y = Math.PI + .3; P.scale.setScalar(.72);
    const J = gilang([.6, 0, RF - 10]); J.rotation.y = Math.PI - .5; sc.add(J); const Y = yati([2.6, 0, RF - 8.2]); Y.rotation.y = Math.PI * .9; const K = kardi([3.8, 0, RF - 9.6]); K.rotation.y = -2.4; const S = sinta([1.7, 0, RF - 7.6]); S.rotation.y = Math.PI * .95; [Y, K, S].forEach(p => sc.add(p));
    gerobak(sc, [4.8, 0, RF - 4]); const Z = Array.from({ length: 18 }, (_, i) => { const z = zombie([((i * 31) % 36) - 18, 0, 60 + ((i * 47) % 26)], i + 5); z.rotation.y = Math.PI; sc.add(z); return z });
    const cam = camera(44);
    const q = X.ab({ left: 50, top: 1180, width: 980, textAlign: 'center', opacity: 0, fontFamily: FONT }, root,
      `<div style="font-size:34px;font-weight:800;color:${BONE};letter-spacing:3px;text-shadow:0 4px 14px #000">GERBANG MACET. MALAM INI KITA:</div><div style="display:flex;gap:10px;justify-content:center;margin-top:16px">` +
      ['🛒 GANJAL GEROBAK', '🔥 BAKAR JERAMI', '🏛 NAIK KE BALAI'].map(x => `<div style="background:rgba(30,42,28,.95);color:${BONE};font-size:31px;font-weight:800;padding:12px 16px;border-radius:12px;border-bottom:6px solid ${AMBER};box-shadow:0 10px 24px #00000070;white-space:nowrap">${x}</div>`).join('') + '</div>');
    return { scene: sc, cam, upd(t, dur) { ['Follow', 'Like', 'Komen'].forEach((w, i) => { const tc = at(s, w, 1 + i * 2); P.userData.plates[i].scale.setScalar(Math.max(.001, E.back(seg(t, tc - .1, tc + .35)))) });
      const tq = at(s, 'Gerbangnya', dur - 5); J.pose(t, { point: t > at(s, 'Follow', 1) - .2 && t < tq, talk: true, look: t > tq ? .5 : 0 }); Y.pose(t, { hold: true }); K.pose(t, { shake: true }); S.pose(t, { look: .4 });
      Z.forEach((z, i) => { z.shamble(t); z.position.z = 60 + ((i * 47) % 26) - t * .35 }); sc.userData.warm.intensity = 30 + Math.sin(t * 13) * 3;
      const p = ease(t, 0, dur), w = ease(t, tq - .3, tq + 1.5); cam.position.set(lerp(-1.2, -.6, p), lerp(4.2, 3.6, p) - w * .4, lerp(RF - 22.5, RF - 21.5, p) - w * 1.2); cam.lookAt(lerp(-.8, -.4, p), lerp(1.2, .5, p) - w * .3, RF - 4 + w * 2);
      show(q, seg(t, tq - .2, tq + .3)) } };
  },
};
export function papanAturan(parent, p, items) {   // papan bambu berisi pelat aturan (muncul satu-satu)
  const g = group(parent, p); [-1, 1].forEach(x => g.add(mesh(G.cyl(.1, .11, 3.8, 7), '#B89E5A', [x * 2.5, 1.9, 0]))); g.add(mesh(G.box(5.2, 2.9, .12), '#5A3E22', [0, 2.35, 0]));
  const r = new THREE.Mesh(new THREE.CylinderGeometry(0, 1, 1, 4, 1), new THREE.MeshStandardMaterial({ color: '#B89A5A', flatShading: true })); r.scale.set(4.1, .7, 1); r.rotation.y = Math.PI / 4; r.position.y = 4.15; g.add(r);
  const plates = items.map(([a, b], i) => { const m = canvasPlane(4.7, .78, (x, Wd, H) => { x.fillStyle = '#F3E9D2'; x.fillRect(0, 0, Wd, H); x.fillStyle = '#B5452B'; x.fillRect(0, 0, 16, H); x.fillStyle = '#1E2A1C'; x.textBaseline = 'middle';
    x.font = `800 ${Math.round(H * .4)}px Poppins`; x.fillText(a, 34, H / 2 + 2); x.textAlign = 'right'; x.fillStyle = '#8A3A22'; x.font = `700 ${Math.round(H * .28)}px Poppins`; x.fillText(b, Wd - 20, H / 2 + 2) }, 760); m.position.set(0, 3.3 - i * .92, .08); g.add(m); m.scale.setScalar(.001); return m });
  g.userData.plates = plates; return g;
}
